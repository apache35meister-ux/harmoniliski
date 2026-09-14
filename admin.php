<?php
session_start();
require_once __DIR__ . '/php_app/config/config.php';

// Auth check via PHP if form posted
$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['admin_password'])) {
    $pass = strtolower(trim($_POST['admin_password']));
    if ($pass === ADMIN_PASSWORD_PRIMARY || $pass === ADMIN_PASSWORD_BACKUP) {
        $_SESSION['admin_logged_in'] = true;
    } else {
        $error = '❌ Hatalı şifre!';
    }
}

// Serve panel.html
include __DIR__ . '/panel.html';
?>