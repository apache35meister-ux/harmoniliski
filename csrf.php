<?php
// Tüm formlarda ortak kullanılan CSRF token üretim/doğrulama yardımcıları.
// Kullanım: <input type="hidden" name="csrf_token" value="<?= htmlspecialchars(csrf_token()) ?>">
//           if (!verify_csrf_token($_POST['csrf_token'] ?? null)) { ... }

function csrf_token(): string {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function verify_csrf_token(?string $token): bool {
    return !empty($_SESSION['csrf_token']) && !empty($token) && hash_equals($_SESSION['csrf_token'], $token);
}
