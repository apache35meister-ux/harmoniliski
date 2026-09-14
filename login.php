<?php
require_once __DIR__ . '/config.php';

session_set_cookie_params([
    'httponly' => true,
    'secure'   => !empty($_SERVER['HTTPS']),
    'samesite' => 'Strict',
]);
session_start();
require_once __DIR__ . '/csrf.php';

if (!empty($_SESSION['is_admin'])) {
    header('Location: panel.php');
    exit;
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!verify_csrf_token($_POST['csrf_token'] ?? null)) {
        $error = 'Güvenlik doğrulaması başarısız oldu. Sayfayı yenileyip tekrar deneyin.';
    } else {
        $username = trim($_POST['username'] ?? '');
        $password = $_POST['password'] ?? '';

        if ($username === ADMIN_USER && verify_admin_password($password)) {
            session_regenerate_id(true);
            $_SESSION['is_admin']   = true;
            $_SESSION['admin_user'] = $username;
            header('Location: panel.php');
            exit;
        }
        $error = 'Kullanıcı adı veya parola hatalı.';
    }
}
?>
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Yönetim Girişi | MediPoint</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0f172a; color: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 1rem; }
    .box { background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 2rem; width: 100%; max-width: 360px; }
    h1 { font-size: 1.25rem; margin: 0 0 1.25rem; }
    label { display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.35rem; color: #94a3b8; }
    input { width: 100%; padding: 0.65rem; margin-bottom: 1rem; border-radius: 8px; border: 1px solid #334155; background: #0f172a; color: #f8fafc; box-sizing: border-box; }
    button { width: 100%; padding: 0.75rem; border: none; border-radius: 8px; background: #38bdf8; color: #0f172a; font-weight: 700; cursor: pointer; }
    .error { background: #3a1614; color: #ffb3ab; padding: 0.75rem; border-radius: 8px; font-size: 0.85rem; margin-bottom: 1rem; }
  </style>
</head>
<body>
  <div class="box">
    <h1>MediPoint Yönetim Girişi</h1>
    <?php if ($error): ?><div class="error"><?= htmlspecialchars($error) ?></div><?php endif; ?>
    <form method="POST">
      <input type="hidden" name="csrf_token" value="<?= htmlspecialchars(csrf_token()) ?>">
      <label for="username">Kullanıcı Adı</label>
      <input type="text" id="username" name="username" required autofocus>
      <label for="password">Parola</label>
      <input type="password" id="password" name="password" required>
      <button type="submit">Giriş Yap</button>
    </form>
  </div>
</body>
</html>
