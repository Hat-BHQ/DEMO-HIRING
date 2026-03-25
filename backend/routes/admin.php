<?php
/**
 * Admin API routes (protected)
 */

// ========== AUTH ==========

function handleAdminLogin(): void {
    $data = getJSONBody();
    $username = $data['username'] ?? '';
    $password = $data['password'] ?? '';

    if (!hash_equals(ADMIN_USERNAME, $username) || !hash_equals(ADMIN_PASSWORD, $password)) {
        sendError(401, 'Invalid credentials');
    }

    $token = createAccessToken($username);
    sendJSON(['access_token' => $token, 'token_type' => 'bearer']);
}

function handleAdminMe(): void {
    $admin = getAuthAdmin();
    sendJSON(['username' => $admin]);
}

// ========== DASHBOARD ==========

function handleDashboard(): void {
    getAuthAdmin();
    $db = getDB();

    $totalJobs = (int)$db->query("SELECT COUNT(*) FROM jobs")->fetchColumn();
    $activeJobs = (int)$db->query("SELECT COUNT(*) FROM jobs WHERE is_active = 1")->fetchColumn();
    $totalApps = (int)$db->query("SELECT COUNT(*) FROM applications")->fetchColumn();
    $pendingApps = (int)$db->query("SELECT COUNT(*) FROM applications WHERE status = 'pending'")->fetchColumn();

    sendJSON([
        'total_jobs' => $totalJobs,
        'active_jobs' => $activeJobs,
        'total_applications' => $totalApps,
        'pending_applications' => $pendingApps,
    ]);
}

// ========== JOBS CRUD ==========

function handleAdminListJobs(): void {
    getAuthAdmin();
    $db = getDB();

    $page = getQueryInt('page', 1);
    $pageSize = min(getQueryInt('page_size', 20), 100);
    $offset = ($page - 1) * $pageSize;
    $search = getQueryParam('search');

    $where = '1=1';
    $params = [];
    if ($search) {
        $where = '(j.title LIKE :search OR j.location LIKE :search2)';
        $params[':search'] = "%$search%";
        $params[':search2'] = "%$search%";
    }

    $countStmt = $db->prepare("SELECT COUNT(*) FROM jobs j WHERE $where");
    $countStmt->execute($params);
    $total = (int)$countStmt->fetchColumn();

    $sql = "SELECT j.*, c.name AS company_name, c.icon AS company_icon, c.created_at AS company_created_at
            FROM jobs j LEFT JOIN companies c ON j.company_id = c.id
            WHERE $where ORDER BY j.created_at DESC LIMIT :limit OFFSET :offset";
    $stmt = $db->prepare($sql);
    foreach ($params as $k => $v) {
        $stmt->bindValue($k, $v);
    }
    $stmt->bindValue(':limit', $pageSize, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();

    sendJSON([
        'items' => array_map('formatJob', $stmt->fetchAll()),
        'total' => $total,
        'page' => $page,
        'page_size' => $pageSize,
    ]);
}

function handleAdminGetJob(string $jobId): void {
    getAuthAdmin();
    $db = getDB();

    $sql = "SELECT j.*, c.name AS company_name, c.icon AS company_icon, c.created_at AS company_created_at
            FROM jobs j LEFT JOIN companies c ON j.company_id = c.id WHERE j.id = :id";
    $stmt = $db->prepare($sql);
    $stmt->execute([':id' => $jobId]);
    $row = $stmt->fetch();
    if (!$row) {
        sendError(404, 'Job not found');
    }
    sendJSON(formatJob($row));
}

function handleAdminCreateJob(): void {
    getAuthAdmin();
    $db = getDB();
    $data = getJSONBody();

    $id = generateUUID();
    $now = date('Y-m-d H:i:s');

    $stmt = $db->prepare("INSERT INTO jobs (id, title, icon, badge, location, salary_min, salary_max, salary_currency,
        tags, work_type_vi, work_type_en, description_vi, description_en, 
        requirements_vi, requirements_en, benefits_vi, benefits_en,
        is_hot, is_featured, is_active, company_id, created_at, updated_at)
        VALUES (:id, :title, :icon, :badge, :location, :salary_min, :salary_max, :salary_currency,
        :tags, :work_type_vi, :work_type_en, :description_vi, :description_en,
        :requirements_vi, :requirements_en, :benefits_vi, :benefits_en,
        :is_hot, :is_featured, :is_active, :company_id, :created_at, :updated_at)");

    $stmt->execute([
        ':id' => $id,
        ':title' => $data['title'] ?? '',
        ':icon' => $data['icon'] ?? 'fas fa-briefcase',
        ':badge' => $data['badge'] ?? null,
        ':location' => $data['location'] ?? '',
        ':salary_min' => (int)($data['salary_min'] ?? 0),
        ':salary_max' => (int)($data['salary_max'] ?? 0),
        ':salary_currency' => $data['salary_currency'] ?? 'USD',
        ':tags' => json_encode($data['tags'] ?? [], JSON_UNESCAPED_UNICODE),
        ':work_type_vi' => $data['work_type_vi'] ?? 'Toàn thời gian',
        ':work_type_en' => $data['work_type_en'] ?? 'Full Time',
        ':description_vi' => $data['description_vi'] ?? '',
        ':description_en' => $data['description_en'] ?? '',
        ':requirements_vi' => json_encode($data['requirements_vi'] ?? [], JSON_UNESCAPED_UNICODE),
        ':requirements_en' => json_encode($data['requirements_en'] ?? [], JSON_UNESCAPED_UNICODE),
        ':benefits_vi' => json_encode($data['benefits_vi'] ?? [], JSON_UNESCAPED_UNICODE),
        ':benefits_en' => json_encode($data['benefits_en'] ?? [], JSON_UNESCAPED_UNICODE),
        ':is_hot' => !empty($data['is_hot']) ? 1 : 0,
        ':is_featured' => !empty($data['is_featured']) ? 1 : 0,
        ':is_active' => isset($data['is_active']) ? ($data['is_active'] ? 1 : 0) : 1,
        ':company_id' => $data['company_id'] ?? '',
        ':created_at' => $now,
        ':updated_at' => $now,
    ]);

    // Fetch and return
    handleAdminGetJobReturn($db, $id, 201);
}

function handleAdminUpdateJob(string $jobId): void {
    getAuthAdmin();
    $db = getDB();
    $data = getJSONBody();

    // Check exists
    $check = $db->prepare("SELECT id FROM jobs WHERE id = :id");
    $check->execute([':id' => $jobId]);
    if (!$check->fetch()) {
        sendError(404, 'Job not found');
    }

    $fields = [];
    $params = [':id' => $jobId];
    $allowedFields = [
        'title', 'icon', 'badge', 'location', 'salary_min', 'salary_max',
        'salary_currency', 'work_type_vi', 'work_type_en',
        'description_vi', 'description_en',
    ];
    $jsonFields = ['tags', 'requirements_vi', 'requirements_en', 'benefits_vi', 'benefits_en'];
    $boolFields = ['is_hot', 'is_featured', 'is_active'];
    $intFields = ['salary_min', 'salary_max'];

    foreach ($allowedFields as $f) {
        if (array_key_exists($f, $data)) {
            $fields[] = "$f = :$f";
            $params[":$f"] = in_array($f, $intFields) ? (int)$data[$f] : $data[$f];
        }
    }
    foreach ($jsonFields as $f) {
        if (array_key_exists($f, $data)) {
            $fields[] = "$f = :$f";
            $params[":$f"] = json_encode($data[$f], JSON_UNESCAPED_UNICODE);
        }
    }
    foreach ($boolFields as $f) {
        if (array_key_exists($f, $data)) {
            $fields[] = "$f = :$f";
            $params[":$f"] = $data[$f] ? 1 : 0;
        }
    }
    if (array_key_exists('company_id', $data)) {
        $fields[] = "company_id = :company_id";
        $params[':company_id'] = $data['company_id'];
    }

    if (empty($fields)) {
        sendError(400, 'No fields to update');
    }

    $fields[] = "updated_at = :updated_at";
    $params[':updated_at'] = date('Y-m-d H:i:s');

    $sql = "UPDATE jobs SET " . implode(', ', $fields) . " WHERE id = :id";
    $db->prepare($sql)->execute($params);

    handleAdminGetJobReturn($db, $jobId, 200);
}

function handleAdminDeleteJob(string $jobId): void {
    getAuthAdmin();
    $db = getDB();

    $stmt = $db->prepare("DELETE FROM jobs WHERE id = :id");
    $stmt->execute([':id' => $jobId]);
    if ($stmt->rowCount() === 0) {
        sendError(404, 'Job not found');
    }
    http_response_code(204);
    exit;
}

function handleAdminGetJobReturn(PDO $db, string $jobId, int $code): void {
    $sql = "SELECT j.*, c.name AS company_name, c.icon AS company_icon, c.created_at AS company_created_at
            FROM jobs j LEFT JOIN companies c ON j.company_id = c.id WHERE j.id = :id";
    $stmt = $db->prepare($sql);
    $stmt->execute([':id' => $jobId]);
    $row = $stmt->fetch();
    sendJSON(formatJob($row), $code);
}

// ========== COMPANIES ==========

function handleAdminListCompanies(): void {
    getAuthAdmin();
    $db = getDB();
    $stmt = $db->query("SELECT * FROM companies ORDER BY name");
    $companies = [];
    foreach ($stmt->fetchAll() as $row) {
        $companies[] = [
            'id' => $row['id'],
            'name' => $row['name'],
            'icon' => $row['icon'],
            'created_at' => $row['created_at'],
        ];
    }
    sendJSON($companies);
}

function handleAdminCreateCompany(): void {
    getAuthAdmin();
    $db = getDB();
    $data = getJSONBody();

    $id = generateUUID();
    $now = date('Y-m-d H:i:s');
    $name = $data['name'] ?? '';
    $icon = $data['icon'] ?? 'fas fa-building';

    if (empty($name)) {
        sendError(400, 'Company name is required');
    }

    $stmt = $db->prepare("INSERT INTO companies (id, name, icon, created_at) VALUES (:id, :name, :icon, :created_at)");
    $stmt->execute([':id' => $id, ':name' => $name, ':icon' => $icon, ':created_at' => $now]);

    sendJSON(['id' => $id, 'name' => $name, 'icon' => $icon, 'created_at' => $now], 201);
}

function handleAdminUpdateCompany(string $companyId): void {
    getAuthAdmin();
    $db = getDB();
    $data = getJSONBody();

    $check = $db->prepare("SELECT id FROM companies WHERE id = :id");
    $check->execute([':id' => $companyId]);
    if (!$check->fetch()) {
        sendError(404, 'Company not found');
    }

    $name = $data['name'] ?? '';
    $icon = $data['icon'] ?? 'fas fa-building';
    $stmt = $db->prepare("UPDATE companies SET name = :name, icon = :icon WHERE id = :id");
    $stmt->execute([':name' => $name, ':icon' => $icon, ':id' => $companyId]);

    $fetch = $db->prepare("SELECT * FROM companies WHERE id = :id");
    $fetch->execute([':id' => $companyId]);
    $row = $fetch->fetch();
    sendJSON(['id' => $row['id'], 'name' => $row['name'], 'icon' => $row['icon'], 'created_at' => $row['created_at']]);
}

function handleAdminDeleteCompany(string $companyId): void {
    getAuthAdmin();
    $db = getDB();

    $stmt = $db->prepare("DELETE FROM companies WHERE id = :id");
    $stmt->execute([':id' => $companyId]);
    if ($stmt->rowCount() === 0) {
        sendError(404, 'Company not found');
    }
    http_response_code(204);
    exit;
}

// ========== APPLICATIONS ==========

function handleAdminListApplications(): void {
    getAuthAdmin();
    $db = getDB();

    $page = getQueryInt('page', 1);
    $pageSize = min(getQueryInt('page_size', 20), 100);
    $offset = ($page - 1) * $pageSize;

    $total = (int)$db->query("SELECT COUNT(*) FROM applications")->fetchColumn();

    $stmt = $db->prepare("SELECT a.*, j.title AS job_title 
                           FROM applications a 
                           LEFT JOIN jobs j ON a.job_id = j.id 
                           ORDER BY a.created_at DESC LIMIT :limit OFFSET :offset");
    $stmt->bindValue(':limit', $pageSize, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();

    $items = [];
    foreach ($stmt->fetchAll() as $row) {
        $item = formatApplication($row);
        $item['job_title'] = $row['job_title'] ?? null;
        $items[] = $item;
    }

    sendJSON([
        'items' => $items,
        'total' => $total,
        'page' => $page,
        'page_size' => $pageSize,
    ]);
}

function handleAdminUpdateApplicationStatus(string $appId): void {
    getAuthAdmin();
    $db = getDB();
    $data = getJSONBody();

    $status = $data['status'] ?? '';
    if (!in_array($status, ['pending', 'reviewed', 'accepted', 'rejected'], true)) {
        sendError(400, 'Invalid status');
    }

    $check = $db->prepare("SELECT id FROM applications WHERE id = :id");
    $check->execute([':id' => $appId]);
    if (!$check->fetch()) {
        sendError(404, 'Application not found');
    }

    $db->prepare("UPDATE applications SET status = :status WHERE id = :id")
       ->execute([':status' => $status, ':id' => $appId]);

    $fetch = $db->prepare("SELECT * FROM applications WHERE id = :id");
    $fetch->execute([':id' => $appId]);
    sendJSON(formatApplication($fetch->fetch()));
}

function handleAdminDeleteApplication(string $appId): void {
    getAuthAdmin();
    $db = getDB();

    $stmt = $db->prepare("DELETE FROM applications WHERE id = :id");
    $stmt->execute([':id' => $appId]);
    if ($stmt->rowCount() === 0) {
        sendError(404, 'Application not found');
    }
    http_response_code(204);
    exit;
}
