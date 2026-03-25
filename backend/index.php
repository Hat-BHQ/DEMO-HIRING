<?php
/**
 * TOM Hiring - PHP Backend API Router
 * Entry point for all /api/* requests
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/database.php';
require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/auth.php';

// CORS headers
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, CORS_ORIGINS, true) || empty(CORS_ORIGINS)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    // Allow all origins for production (frontend same domain)
    header("Access-Control-Allow-Origin: *");
}
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json; charset=utf-8');

// Handle CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Parse route
$requestUri = $_SERVER['REQUEST_URI'] ?? '/';
$path = parse_url($requestUri, PHP_URL_PATH);
// Remove /api prefix
$path = preg_replace('#^/api#', '', $path);
$path = rtrim($path, '/') ?: '/';
$method = $_SERVER['REQUEST_METHOD'];

// ========== ROUTING ==========

// Health check
if ($path === '/health' && $method === 'GET') {
    sendJSON(['status' => 'ok']);
}

// --- Jobs ---
if ($path === '/jobs' && $method === 'GET') {
    require __DIR__ . '/routes/jobs.php';
    handleGetJobs();
}
if ($path === '/jobs/hot' && $method === 'GET') {
    require __DIR__ . '/routes/jobs.php';
    handleGetHotJobs();
}
if ($path === '/jobs/featured' && $method === 'GET') {
    require __DIR__ . '/routes/jobs.php';
    handleGetFeaturedJobs();
}
if ($path === '/jobs/locations' && $method === 'GET') {
    require __DIR__ . '/routes/jobs.php';
    handleGetLocations();
}
if (preg_match('#^/jobs/([a-zA-Z0-9\-]+)$#', $path, $m) && $method === 'GET') {
    require __DIR__ . '/routes/jobs.php';
    handleGetJob($m[1]);
}

// --- Applications ---
if ($path === '/applications' && $method === 'POST') {
    require __DIR__ . '/routes/applications.php';
    handleSubmitApplication();
}

// --- Admin Auth ---
if ($path === '/admin/login' && $method === 'POST') {
    require __DIR__ . '/routes/admin.php';
    handleAdminLogin();
}
if ($path === '/admin/me' && $method === 'GET') {
    require __DIR__ . '/routes/admin.php';
    handleAdminMe();
}

// --- Admin Dashboard ---
if ($path === '/admin/dashboard' && $method === 'GET') {
    require __DIR__ . '/routes/admin.php';
    handleDashboard();
}

// --- Admin Jobs ---
if ($path === '/admin/jobs' && $method === 'GET') {
    require __DIR__ . '/routes/admin.php';
    handleAdminListJobs();
}
if ($path === '/admin/jobs' && $method === 'POST') {
    require __DIR__ . '/routes/admin.php';
    handleAdminCreateJob();
}
if (preg_match('#^/admin/jobs/([a-zA-Z0-9\-]+)$#', $path, $m) && $method === 'GET') {
    require __DIR__ . '/routes/admin.php';
    handleAdminGetJob($m[1]);
}
if (preg_match('#^/admin/jobs/([a-zA-Z0-9\-]+)$#', $path, $m) && $method === 'PUT') {
    require __DIR__ . '/routes/admin.php';
    handleAdminUpdateJob($m[1]);
}
if (preg_match('#^/admin/jobs/([a-zA-Z0-9\-]+)$#', $path, $m) && $method === 'DELETE') {
    require __DIR__ . '/routes/admin.php';
    handleAdminDeleteJob($m[1]);
}

// --- Admin Companies ---
if ($path === '/admin/companies' && $method === 'GET') {
    require __DIR__ . '/routes/admin.php';
    handleAdminListCompanies();
}
if ($path === '/admin/companies' && $method === 'POST') {
    require __DIR__ . '/routes/admin.php';
    handleAdminCreateCompany();
}
if (preg_match('#^/admin/companies/([a-zA-Z0-9\-]+)$#', $path, $m) && $method === 'PUT') {
    require __DIR__ . '/routes/admin.php';
    handleAdminUpdateCompany($m[1]);
}
if (preg_match('#^/admin/companies/([a-zA-Z0-9\-]+)$#', $path, $m) && $method === 'DELETE') {
    require __DIR__ . '/routes/admin.php';
    handleAdminDeleteCompany($m[1]);
}

// --- Admin Applications ---
if ($path === '/admin/applications' && $method === 'GET') {
    require __DIR__ . '/routes/admin.php';
    handleAdminListApplications();
}
if (preg_match('#^/admin/applications/([a-zA-Z0-9\-]+)/status$#', $path, $m) && $method === 'PATCH') {
    require __DIR__ . '/routes/admin.php';
    handleAdminUpdateApplicationStatus($m[1]);
}
if (preg_match('#^/admin/applications/([a-zA-Z0-9\-]+)$#', $path, $m) && $method === 'DELETE') {
    require __DIR__ . '/routes/admin.php';
    handleAdminDeleteApplication($m[1]);
}

// --- Serve uploaded files ---
if (preg_match('#^/uploads/([a-zA-Z0-9_\-\.]+)$#', $path, $m)) {
    $filename = basename($m[1]);
    $file = UPLOAD_DIR . '/' . $filename;
    if (!file_exists($file)) {
        sendError(404, 'File not found');
    }
    $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
    $forceDownload = isset($_GET['download']);
    if ($ext === 'pdf' && !$forceDownload) {
        header('Content-Type: application/pdf');
        header('Content-Disposition: inline; filename="cv.pdf"');
    } else {
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="cv.' . $ext . '"');
    }
    header('Content-Length: ' . filesize($file));
    header('Cache-Control: private, max-age=3600');
    readfile($file);
    exit;
}

// 404
sendError(404, 'Not found');
