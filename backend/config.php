<?php
/**
 * Configuration - Cấu hình database và ứng dụng
 * Trên Hostinger: sửa các giá trị DB_* cho đúng với phpMyAdmin
 */

// Database
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_NAME', getenv('DB_NAME') ?: 'tom_hiring');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') ?: '');
define('DB_CHARSET', 'utf8mb4');

// Admin credentials
define('ADMIN_USERNAME', getenv('ADMIN_USERNAME') ?: 'admin');
define('ADMIN_PASSWORD', getenv('ADMIN_PASSWORD') ?: 'admin123');

// JWT
define('SECRET_KEY', getenv('SECRET_KEY') ?: 'tom-hiring-secret-key-change-in-production');
define('TOKEN_EXPIRE_MINUTES', 480);

// Upload
define('UPLOAD_DIR', __DIR__ . '/uploads');

// CORS - thêm domain của bạn vào đây
define('CORS_ORIGINS', [
    'http://localhost:5173',
    'http://localhost:3000',
]);
