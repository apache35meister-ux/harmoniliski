<?php
// WhatsApp / Hemen Ara butonlarına tıklamayı SQLite tablosuna işler.
// assets/app.js içerisindeki navigator.sendBeacon ile buraya POST atar.
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once dirname(__DIR__) . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'method_not_allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$input = json_decode($raw, true) ?: $_POST;

$profileId = (int) ($input['profile_id'] ?? ($input['doctor_id'] ?? 0));
$type = $input['type'] ?? 'whatsapp';

if ($profileId <= 0 || !in_array($type, ['whatsapp', 'call'], true)) {
    http_response_code(422);
    echo json_encode(['error' => 'invalid_payload']);
    exit;
}

$pdo = get_pdo();
$stmt = $pdo->prepare("INSERT INTO contact_events (profile_id, type) VALUES (:profile_id, :type)");
$stmt->execute([':profile_id' => $profileId, ':type' => $type]);

$countStmt = $pdo->prepare("SELECT COUNT(*) FROM contact_events WHERE profile_id = :id AND type = :type");
$countStmt->execute([':id' => $profileId, ':type' => $type]);

echo json_encode(['ok' => true, 'count' => (int) $countStmt->fetchColumn()]);
?>
