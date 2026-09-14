<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

require_once dirname(__DIR__) . '/config/config.php';

$all = get_all_therapists();
$city = $_GET['city'] ?? '';

if (!empty($city)) {
    $city = mb_strtolower(trim($city), 'UTF-8');
    $filtered = array_filter($all, function($t) use ($city) {
        $tCity = mb_strtolower($t['city'] ?? '', 'UTF-8');
        return (strpos($tCity, $city) !== false || strpos($city, $tCity) !== false);
    });
    echo json_encode(array_values($filtered) ?: $all);
    exit;
}

echo json_encode($all);
?>