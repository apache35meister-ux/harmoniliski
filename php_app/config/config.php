<?php
// ZENSPA VIP - PHP Sistem Yapılandırması
define('BASE_DIR', dirname(dirname(__DIR__)));
define('DATA_DIR', BASE_DIR);
define('SITE_URL', 'https://harmoniliski.com');
define('SITE_NAME', 'ZENSPA VIP');

// Güvenlik & Şifre Kuralı (GEMINI.md Protokolü)
define('ADMIN_PASSWORD_PRIMARY', 'hakan908558');
define('ADMIN_PASSWORD_BACKUP', 'hakan763');

// JSON Veri Dosyaları
define('THERAPISTS_FILE', DATA_DIR . '/therapists.json');
define('ANALYTICS_FILE', DATA_DIR . '/analytics.json');

// Yardımcı Fonksiyonlar
function get_all_therapists() {
    if (!file_exists(THERAPISTS_FILE)) return [];
    $json = file_get_contents(THERAPISTS_FILE);
    return json_decode($json, true) ?: [];
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
    $json = file_get_contents(ANALYTICS_FILE);
    return json_decode($json, true) ?: $default;
}

function save_analytics($data) {
    return file_put_contents(ANALYTICS_FILE, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}
?>