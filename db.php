<?php
// ZENSPA VIP - PDO / SQLite Veritabanı Katmanı
// Claude Mimari Denetimi Doğrultusunda Geliştirilmiştir.

define('DB_FILE', __DIR__ . '/storage/platform.sqlite');

function get_pdo(): PDO {
    static $pdo = null;
    if ($pdo !== null) return $pdo;

    $storageDir = dirname(DB_FILE);
    if (!is_dir($storageDir)) {
        mkdir($storageDir, 0750, true);
    }

    $isNew = !file_exists(DB_FILE);

    $pdo = new PDO('sqlite:' . DB_FILE);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    $pdo->exec('PRAGMA foreign_keys = ON');

    if ($isNew) {
        db_init_schema($pdo);
        db_seed_from_therapists($pdo);
    }

    return $pdo;
}

function db_init_schema(PDO $pdo): void {
    // 1. Profil Tablosu
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS profiles (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            age INTEGER,
            city TEXT NOT NULL,
            district TEXT NOT NULL,
            gender TEXT NOT NULL,
            bio TEXT,
            price TEXT,
            whatsapp TEXT NOT NULL,
            vitrin INTEGER NOT NULL DEFAULT 1,
            active INTEGER NOT NULL DEFAULT 1,
            img TEXT,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
    ");

    // 2. WhatsApp ve Telefon Tıklama Sayaçları Tablosu (Claude P1 Mimari Çözümü)
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS contact_events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            profile_id INTEGER NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
            type TEXT NOT NULL CHECK(type IN ('whatsapp', 'call')),
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
    ");
    $pdo->exec("CREATE INDEX IF NOT EXISTS idx_contact_events_profile_type ON contact_events(profile_id, type)");
}

function db_seed_from_therapists(PDO $pdo): void {
    $jsonPath = __DIR__ . '/therapists.json';
    if (!file_exists($jsonPath)) return;

    $profiles = json_decode(file_get_contents($jsonPath), true) ?: [];
    $stmt = $pdo->prepare("
        INSERT OR REPLACE INTO profiles (id, name, age, city, district, gender, bio, price, whatsapp, vitrin, active, img)
        VALUES (:id, :name, :age, :city, :district, :gender, :bio, :price, :whatsapp, :vitrin, :active, :img)
    ");

    $pdo->beginTransaction();
    foreach ($profiles as $p) {
        $stmt->execute([
            ':id' => $p['id'] ?? time(),
            ':name' => $p['name'] ?? '',
            ':age' => $p['age'] ?? 24,
            ':city' => $p['city'] ?? '',
            ':district' => $p['district'] ?? '',
            ':gender' => $p['gender'] ?? 'Kadın',
            ':bio' => $p['bio'] ?? '',
            ':price' => $p['price'] ?? 'VIP',
            ':whatsapp' => $p['wa'] ?? ($p['whatsapp'] ?? ''),
            ':vitrin' => !empty($p['vitrin']) ? 1 : 0,
            ':active' => !empty($p['active']) ? 1 : 0,
            ':img' => $p['img'] ?? ''
        ]);
    }
    $pdo->commit();
}

function get_all_db_profiles(): array {
    $pdo = get_pdo();
    return $pdo->query("SELECT * FROM profiles WHERE active = 1 ORDER BY vitrin DESC, id DESC")->fetchAll();
}

function get_contact_counts(): array {
    $pdo = get_pdo();
    $rows = $pdo->query("
        SELECT profile_id, type, COUNT(*) AS cnt
        FROM contact_events
        GROUP BY profile_id, type
    ")->fetchAll();

    $counts = [];
    foreach ($rows as $r) {
        $counts[$r['profile_id']][$r['type']] = (int) $r['cnt'];
    }
    return $counts;
}
?>
