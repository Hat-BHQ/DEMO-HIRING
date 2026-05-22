<?php
/**
 * Database connection using PDO
 */

require_once __DIR__ . '/config.php';

function getDB(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $driver = strtolower(DB_DRIVER);
        if ($driver === 'pgsql' || $driver === 'postgres' || $driver === 'postgresql') {
            $port = DB_PORT > 0 ? DB_PORT : 5432;
            $dsn = 'pgsql:host=' . DB_HOST . ';port=' . $port . ';dbname=' . DB_NAME;
        } else {
            $port = DB_PORT > 0 ? DB_PORT : 3306;
            $dsn = 'mysql:host=' . DB_HOST . ';port=' . $port . ';dbname=' . DB_NAME . ';charset=' . DB_CHARSET;
        }

        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    }
    return $pdo;
}

function generateUUID(): string {
    $data = random_bytes(16);
    $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80);
    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}
