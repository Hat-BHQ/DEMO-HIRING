<?php
/**
 * Jobs API routes (public)
 */

function jobBaseQuery(): string {
    return "SELECT j.*, 
            c.name AS company_name, c.icon AS company_icon, c.created_at AS company_created_at
            FROM jobs j 
            LEFT JOIN companies c ON j.company_id = c.id";
}

function handleGetJobs(): void {
    $db = getDB();
    $where = ['j.is_active = 1'];
    $params = [];

    $search = getQueryParam('search');
    if ($search) {
        $where[] = '(j.title LIKE :search OR j.tags LIKE :search2)';
        $params[':search'] = "%$search%";
        $params[':search2'] = "%$search%";
    }

    $location = getQueryParam('location');
    if ($location) {
        $where[] = 'j.location = :location';
        $params[':location'] = $location;
    }

    $salaryMin = getQueryParam('salary_min');
    if ($salaryMin !== null) {
        $where[] = 'j.salary_max >= :salary_min';
        $params[':salary_min'] = (int)$salaryMin;
    }

    $salaryMax = getQueryParam('salary_max');
    if ($salaryMax !== null) {
        $where[] = 'j.salary_min <= :salary_max';
        $params[':salary_max'] = (int)$salaryMax;
    }

    $isHot = getQueryParam('is_hot');
    if ($isHot !== null) {
        $where[] = 'j.is_hot = :is_hot';
        $params[':is_hot'] = filter_var($isHot, FILTER_VALIDATE_BOOLEAN) ? 1 : 0;
    }

    $isFeatured = getQueryParam('is_featured');
    if ($isFeatured !== null) {
        $where[] = 'j.is_featured = :is_featured';
        $params[':is_featured'] = filter_var($isFeatured, FILTER_VALIDATE_BOOLEAN) ? 1 : 0;
    }

    $whereSql = implode(' AND ', $where);
    $page = getQueryInt('page', 1);
    $pageSize = min(getQueryInt('page_size', 12), 50);
    $offset = ($page - 1) * $pageSize;

    // Count
    $countStmt = $db->prepare("SELECT COUNT(*) FROM jobs j WHERE $whereSql");
    $countStmt->execute($params);
    $total = (int)$countStmt->fetchColumn();

    // Fetch
    $sql = jobBaseQuery() . " WHERE $whereSql ORDER BY j.created_at DESC LIMIT :limit OFFSET :offset";
    $stmt = $db->prepare($sql);
    foreach ($params as $k => $v) {
        $stmt->bindValue($k, $v);
    }
    $stmt->bindValue(':limit', $pageSize, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();
    $rows = $stmt->fetchAll();

    sendJSON([
        'items' => array_map('formatJob', $rows),
        'total' => $total,
        'page' => $page,
        'page_size' => $pageSize,
    ]);
}

function handleGetHotJobs(): void {
    $db = getDB();
    $limit = min(getQueryInt('limit', 5), 20);
    $sql = jobBaseQuery() . " WHERE j.is_active = 1 AND j.is_hot = 1 ORDER BY j.created_at DESC LIMIT :limit";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->execute();
    sendJSON(array_map('formatJob', $stmt->fetchAll()));
}

function handleGetFeaturedJobs(): void {
    $db = getDB();
    $limit = min(getQueryInt('limit', 6), 20);
    $sql = jobBaseQuery() . " WHERE j.is_active = 1 AND j.is_featured = 1 ORDER BY j.created_at DESC LIMIT :limit";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->execute();
    sendJSON(array_map('formatJob', $stmt->fetchAll()));
}

function handleGetLocations(): void {
    $db = getDB();
    $stmt = $db->query("SELECT DISTINCT location FROM jobs WHERE is_active = 1 ORDER BY location");
    $locations = $stmt->fetchAll(PDO::FETCH_COLUMN);
    sendJSON($locations);
}

function handleGetJob(string $jobId): void {
    $db = getDB();
    $sql = jobBaseQuery() . " WHERE j.id = :id AND j.is_active = 1";
    $stmt = $db->prepare($sql);
    $stmt->execute([':id' => $jobId]);
    $row = $stmt->fetch();
    if (!$row) {
        sendError(404, 'Job not found');
    }
    sendJSON(formatJob($row));
}
