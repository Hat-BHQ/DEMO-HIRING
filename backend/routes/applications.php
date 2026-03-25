<?php
/**
 * Applications API routes (public)
 */

function handleSubmitApplication(): void {
    $db = getDB();

    $fullName = $_POST['full_name'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $jobId = $_POST['job_id'] ?? '';

    // Validate
    if (empty($fullName) || strlen($fullName) > 255) {
        sendError(400, 'Full name is required (max 255 chars)');
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendError(400, 'Invalid email');
    }
    if (!preg_match('/^[0-9\s+\-]{8,15}$/', $phone)) {
        sendError(400, 'Invalid phone number');
    }

    // Validate job exists
    $stmt = $db->prepare("SELECT id FROM jobs WHERE id = :id");
    $stmt->execute([':id' => $jobId]);
    if (!$stmt->fetch()) {
        sendError(400, 'Job not found');
    }

    // Handle file upload
    if (!isset($_FILES['cv']) || $_FILES['cv']['error'] !== UPLOAD_ERR_OK) {
        sendError(400, 'CV file is required');
    }

    $file = $_FILES['cv'];
    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $allowedExt = ['pdf', 'doc', 'docx'];
    if (!in_array($ext, $allowedExt, true)) {
        sendError(400, 'Only PDF, DOC, DOCX files are allowed');
    }
    if ($file['size'] > 10 * 1024 * 1024) {
        sendError(400, 'File size must be less than 10MB');
    }

    // Save file
    if (!is_dir(UPLOAD_DIR)) {
        mkdir(UPLOAD_DIR, 0755, true);
    }
    $safeFilename = bin2hex(random_bytes(16)) . '.' . $ext;
    $destPath = UPLOAD_DIR . '/' . $safeFilename;
    if (!move_uploaded_file($file['tmp_name'], $destPath)) {
        sendError(500, 'Failed to save uploaded file');
    }

    // Insert into DB
    $id = generateUUID();
    $now = date('Y-m-d H:i:s');
    $stmt = $db->prepare("INSERT INTO applications (id, full_name, email, phone, cv_filename, status, job_id, created_at) 
                           VALUES (:id, :full_name, :email, :phone, :cv_filename, 'pending', :job_id, :created_at)");
    $stmt->execute([
        ':id' => $id,
        ':full_name' => $fullName,
        ':email' => $email,
        ':phone' => $phone,
        ':cv_filename' => $safeFilename,
        ':job_id' => $jobId,
        ':created_at' => $now,
    ]);

    sendJSON([
        'id' => $id,
        'full_name' => $fullName,
        'email' => $email,
        'phone' => $phone,
        'cv_filename' => $safeFilename,
        'status' => 'pending',
        'job_id' => $jobId,
        'created_at' => $now,
    ], 201);
}
