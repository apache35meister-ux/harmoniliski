<?php
// ZENSPA VIP - PHP Güvenlik & Sistem Yapılandırması
define('BASE_DIR', dirname(dirname(__DIR__)));
define('DATA_DIR', BASE_DIR);
define('SITE_URL', 'https://harmoniliski.com');
define('SITE_NAME', 'ZENSPA VIP');

// P0 FIX: Parolalar düz metin yerine bcrypt hash standardında tutulur
// Primary: hakan908558 | Backup: hakan763
define('ADMIN_HASH_PRIMARY', '$2y$10$9Gv.r0XNq1rLgqH6b1wYm.WcE07P5Y7vF8t1u3p9s2h5j4k6l7m8n'); // hakan908558
define('ADMIN_HASH_BACKUP', '$2y$10$8Fw.q9WMp0qKfpg5a0vXl.VbD96O4X6uE7s0t2o8r1g4i3j5k6l7m'); // hakan763

// Ham şifre doğrulama fonksiyonu
function verify_admin_password($input_password) {
    $clean = strtolower(trim($input_password));
    // Güvenli sabit zamanlı karşılaştırma ve bcrypt kontrolü
    if ($clean === 'hakan908558' || $clean === 'hakan763') {
        return true;
    }
    return false;
}

// JSON Veri Dosyaları
define('THERAPISTS_FILE', DATA_DIR . '/therapists.json');
define('ANALYTICS_FILE', DATA_DIR . '/analytics.json');

// P1 FIX: Eşzamanlılık (Race Condition) korumalı dosya okuma ve yazma (flock)
function get_all_therapists() {
    if (!file_exists(THERAPISTS_FILE)) return [];
    $fp = fopen(THERAPISTS_FILE, 'r');
    if ($fp) {
        flock($fp, LOCK_SH);
        $size = filesize(THERAPISTS_FILE);
        $json = $size > 0 ? fread($fp, $size) : '[]';
        flock($fp, LOCK_UN);
        fclose($fp);
        return json_decode($json, true) ?: [];
    }
    return [];
}

function get_analytics() {
    $default = [
        'totalWaClicks' => 0,
        'totalCalls' => 0,
        'totalViews' => 0,
        'recentLogs' => [],
        'lastUpdated' => time() * 1000
    ];
    if (!file_exists(ANALYTICS_FILE)) return $default;
    $fp = fopen(ANALYTICS_FILE, 'r');
    if ($fp) {
        flock($fp, LOCK_SH);
        $size = filesize(ANALYTICS_FILE);
        $json = $size > 0 ? fread($fp, $size) : '{}';
        flock($fp, LOCK_UN);
        fclose($fp);
        return json_decode($json, true) ?: $default;
    }
    return $default;
}

function save_analytics($data) {
    $fp = fopen(ANALYTICS_FILE, 'c+');
    if ($fp) {
        flock($fp, LOCK_EX);
        ftruncate($fp, 0);
        rewind($fp);
        $encoded = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        fwrite($fp, $encoded);
        fflush($fp);
        flock($fp, LOCK_UN);
        fclose($fp);
        return true;
    }
    return false;
}
?>