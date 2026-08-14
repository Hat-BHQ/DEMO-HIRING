<?php
/**
 * Router for PHP built-in development server
 * Usage: php -S localhost:8081 router.php
 */

$uri = $_SERVER['REQUEST_URI'];
$path = parse_url($uri, PHP_URL_PATH);

// Serve static files only for specific extensions
if (preg_match('/\.(?:png|jpg|jpeg|gif|ico|css|js|svg|woff|woff2|ttf)$/', $path)) {
    return false; // Serve the file as-is
}

// Route all other requests through index.php
require __DIR__ . '/index.php';
