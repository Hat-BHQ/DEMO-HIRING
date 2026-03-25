<?php
/**
 * Router for PHP built-in development server
 * Usage: php -S localhost:8080 router.php
 */

$uri = $_SERVER['REQUEST_URI'];
$path = parse_url($uri, PHP_URL_PATH);

// Serve static files if they exist
if ($path !== '/' && file_exists(__DIR__ . $path)) {
    return false;
}

// Route all /api requests through index.php
// Strip /api prefix since we're running from backend-php root
$_SERVER['REQUEST_URI'] = $uri;
require __DIR__ . '/index.php';
