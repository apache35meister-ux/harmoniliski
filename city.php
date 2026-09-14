<?php
require_once __DIR__ . '/php_app/config/config.php';

$slug = $_GET['slug'] ?? 'izmir-eskort';
$slug = str_replace('.html', '', strtolower(trim($slug)));

// Look for existing static HTML in legacy archive or root
$static_file = __DIR__ . '/' . $slug . '.html';
if (file_exists($static_file)) {
    include $static_file;
    exit;
}

$archive_file = __DIR__ . '/legacy_archive/' . $slug . '.html';
if (file_exists($archive_file)) {
    include $archive_file;
    exit;
}

// Fallback to izmir-eskort or 404
if (file_exists(__DIR__ . '/izmir-eskort.html')) {
    include __DIR__ . '/izmir-eskort.html';
} else {
    include __DIR__ . '/404.html';
}
?>