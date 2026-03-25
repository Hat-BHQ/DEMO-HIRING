<?php
/**
 * Helper functions
 */

function sendJSON($data, int $code = 200): void {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function sendError(int $code, string $detail): void {
    http_response_code($code);
    echo json_encode(['detail' => $detail], JSON_UNESCAPED_UNICODE);
    exit;
}

function getJSONBody(): array {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function getQueryParam(string $name, $default = null) {
    return $_GET[$name] ?? $default;
}

function getQueryInt(string $name, int $default): int {
    $val = $_GET[$name] ?? null;
    return $val !== null ? max(1, (int)$val) : $default;
}

/**
 * Format a job row from DB into API response (with company)
 */
function formatJob(array $job): array {
    return [
        'id' => $job['id'],
        'title' => $job['title'],
        'icon' => $job['icon'],
        'badge' => $job['badge'],
        'location' => $job['location'],
        'salary_min' => (int)$job['salary_min'],
        'salary_max' => (int)$job['salary_max'],
        'salary_currency' => $job['salary_currency'],
        'tags' => json_decode($job['tags'] ?? '[]', true) ?: [],
        'work_type_vi' => $job['work_type_vi'],
        'work_type_en' => $job['work_type_en'],
        'description_vi' => $job['description_vi'],
        'description_en' => $job['description_en'],
        'requirements_vi' => json_decode($job['requirements_vi'] ?? '[]', true) ?: [],
        'requirements_en' => json_decode($job['requirements_en'] ?? '[]', true) ?: [],
        'benefits_vi' => json_decode($job['benefits_vi'] ?? '[]', true) ?: [],
        'benefits_en' => json_decode($job['benefits_en'] ?? '[]', true) ?: [],
        'is_hot' => (bool)$job['is_hot'],
        'is_featured' => (bool)$job['is_featured'],
        'is_active' => (bool)$job['is_active'],
        'company_id' => $job['company_id'],
        'company' => [
            'id' => $job['company_id'],
            'name' => $job['company_name'] ?? '',
            'icon' => $job['company_icon'] ?? 'fas fa-building',
            'created_at' => $job['company_created_at'] ?? $job['created_at'],
        ],
        'created_at' => $job['created_at'],
        'updated_at' => $job['updated_at'],
    ];
}

function formatApplication(array $app): array {
    return [
        'id' => $app['id'],
        'full_name' => $app['full_name'],
        'email' => $app['email'],
        'phone' => $app['phone'],
        'cv_filename' => $app['cv_filename'],
        'status' => $app['status'],
        'job_id' => $app['job_id'],
        'created_at' => $app['created_at'],
    ];
}
