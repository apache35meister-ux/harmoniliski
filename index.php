<?php
require_once __DIR__ . '/php_app/config/config.php';

$therapists = get_all_therapists();
$stats = get_analytics();

// Render with index.html structure
include __DIR__ . '/index.html';
?>