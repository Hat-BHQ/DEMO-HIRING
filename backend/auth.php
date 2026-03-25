<?php
/**
 * Auth helpers - JWT token create/verify
 */

require_once __DIR__ . '/config.php';

function signPayload(string $encoded): string {
    return hash_hmac('sha256', $encoded, SECRET_KEY);
}

function createAccessToken(string $username, string $role): string {
    $payload = json_encode([
        'sub' => $username,
        'role' => $role,
        'exp' => time() + TOKEN_EXPIRE_MINUTES * 60,
    ]);
    $encoded = rtrim(strtr(base64_encode($payload), '+/', '-_'), '=');
    $signature = signPayload($encoded);
    return $encoded . '.' . $signature;
}

function verifyToken(string $token): array {
    $parts = explode('.', $token);
    if (count($parts) !== 2) {
        sendError(401, 'Invalid token');
    }
    [$encoded, $signature] = $parts;
    if (!hash_equals(signPayload($encoded), $signature)) {
        sendError(401, 'Invalid token');
    }
    $payload = json_decode(base64_decode(strtr($encoded, '-_', '+/')), true);
    if (!$payload || ($payload['exp'] ?? 0) < time()) {
        sendError(401, 'Token expired');
    }
    return $payload;
}

/**
 * Returns ['username' => ..., 'role' => ...]
 */
function getAuthAdmin(): array {
    $header = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (!preg_match('/^Bearer\s+(.+)$/i', $header, $m)) {
        sendError(401, 'Missing or invalid Authorization header');
    }
    $payload = verifyToken($m[1]);
    return ['username' => $payload['sub'], 'role' => $payload['role'] ?? 'employee'];
}

function requireSuperadmin(): void {
    $auth = getAuthAdmin();
    if ($auth['role'] !== 'superadmin') {
        sendError(403, 'Permission denied: superadmin only');
    }
}
