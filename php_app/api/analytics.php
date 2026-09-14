<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once dirname(__DIR__) . '/config/config.php';

$stats = get_analytics();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $raw = file_get_contents('php://input');
    $input = json_decode($raw, true) ?: $_POST;
    
    if (isset($input['action']) && $input['action'] === 'reset') {
        $stats = [
            'totalWaClicks' => 0,
            'totalCalls' => 0,
            'totalViews' => 0,
            'recentLogs' => [],
            'lastUpdated' => time() * 1000
        ];
        save_analytics($stats);
        echo json_encode(['success' => true, 'stats' => $stats]);
        exit;
    }
    
    $type = $input['type'] ?? 'view';
    $name = $input['name'] ?? 'Bilinmeyen';
    $city = $input['city'] ?? 'Genel';
    
    if ($type === 'whatsapp') {
        $stats['totalWaClicks'] = ($stats['totalWaClicks'] ?? 0) + 1;
    } elseif ($type === 'call') {
        $stats['totalCalls'] = ($stats['totalCalls'] ?? 0) + 1;
    } elseif ($type === 'view') {
        $stats['totalViews'] = ($stats['totalViews'] ?? 0) + 1;
    }
    
    $log = [
        'time' => date('H:i:s'),
        'name' => $name,
        'city' => $city,
        'type' => ($type === 'whatsapp') ? 'WhatsApp Randevu' : (($type === 'call') ? 'Telefon Arama' : 'Profil Görüntüleme')
    ];
    
    array_unshift($stats['recentLogs'], $log);
    $stats['recentLogs'] = array_slice($stats['recentLogs'], 0, 50);
    $stats['lastUpdated'] = time() * 1000;
    
    save_analytics($stats);
    echo json_encode(['success' => true, 'stats' => $stats]);
    exit;
}

echo json_encode($stats);
?>