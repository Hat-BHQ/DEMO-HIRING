-- ============================================================
-- TOM Hiring - Database Schema + Sample Data
-- Chạy lệnh: mysql -u root tom_hiring < database.sql
-- Hoặc import qua phpMyAdmin
-- ============================================================

CREATE DATABASE IF NOT EXISTS `tom_hiring` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `tom_hiring`;

-- ============================================================
-- TABLE: companies
-- ============================================================
CREATE TABLE IF NOT EXISTS `companies` (
  `id` VARCHAR(36) NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `icon` VARCHAR(100) NOT NULL DEFAULT 'fas fa-building',
  `created_at` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: jobs
-- ============================================================
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` VARCHAR(36) NOT NULL PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `icon` VARCHAR(100) NOT NULL DEFAULT 'fas fa-briefcase',
  `badge` VARCHAR(100) DEFAULT NULL,
  `location` VARCHAR(255) NOT NULL,
  `salary_min` INT NOT NULL DEFAULT 0,
  `salary_max` INT NOT NULL DEFAULT 0,
  `salary_currency` VARCHAR(10) NOT NULL DEFAULT 'VND',
  `tags` JSON,
  `work_type_vi` VARCHAR(100) NOT NULL DEFAULT 'Toàn thời gian',
  `work_type_en` VARCHAR(100) NOT NULL DEFAULT 'Full-time',
  `description_vi` TEXT,
  `description_en` TEXT,
  `requirements_vi` JSON,
  `requirements_en` JSON,
  `benefits_vi` JSON,
  `benefits_en` JSON,
  `is_hot` TINYINT(1) NOT NULL DEFAULT 0,
  `is_featured` TINYINT(1) NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `company_id` VARCHAR(36) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: applications
-- ============================================================
CREATE TABLE IF NOT EXISTS `applications` (
  `id` VARCHAR(36) NOT NULL PRIMARY KEY,
  `full_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `cv_filename` VARCHAR(255) NOT NULL,
  `status` ENUM('pending','reviewed','accepted','rejected') NOT NULL DEFAULT 'pending',
  `job_id` VARCHAR(36) NOT NULL,
  `created_at` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: locations
-- ============================================================
CREATE TABLE IF NOT EXISTS `locations` (
  `id` VARCHAR(36) NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: users
-- ============================================================
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(36) NOT NULL PRIMARY KEY,
  `username` VARCHAR(100) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `display_name` VARCHAR(255) NOT NULL DEFAULT '',
  `role` ENUM('superadmin','employee') NOT NULL DEFAULT 'employee',
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- SAMPLE DATA: Users
-- Mật khẩu: admin -> Hqsing@123 | employee1 -> Hqsing@user
-- ============================================================
INSERT INTO `users` (`id`, `username`, `password_hash`, `display_name`, `role`, `is_active`, `created_at`) VALUES
('u001-0000-0000-0000-000000000001', 'admin', '$2y$10$O94noMTG8lk9dCG84OkfCuXj6khDB7SbABvvMpM4jf2/Xe7AHPF2C', 'Super Admin', 'superadmin', 1, NOW()),
('u002-0000-0000-0000-000000000002', 'employee1', '$2y$10$ysL7KFcwQb6v7wr6tJaiYuSmzb7C33jfR3.CPeho5YbwaYUXeOfFm', 'Nhân viên HR', 'employee', 1, NOW());

-- ============================================================
-- SAMPLE DATA: Locations
-- ============================================================
INSERT INTO `locations` (`id`, `name`, `created_at`) VALUES
('loc1-0000-0000-0000-000000000001', 'Hồ Chí Minh', NOW()),
('loc2-0000-0000-0000-000000000002', 'Hà Nội', NOW()),
('loc3-0000-0000-0000-000000000003', 'Đà Nẵng', NOW()),
('loc4-0000-0000-0000-000000000004', 'Remote', NOW()),
('loc5-0000-0000-0000-000000000005', 'Hải Phòng', NOW()),
('loc6-0000-0000-0000-000000000006', 'Cần Thơ', NOW());

-- ============================================================
-- SAMPLE DATA: Companies
-- ============================================================
INSERT INTO `companies` (`id`, `name`, `icon`, `created_at`) VALUES
('c001-0000-0000-0000-000000000001', 'TOM Group', 'fas fa-star', NOW()),
('c002-0000-0000-0000-000000000002', 'Tech Solutions', 'fas fa-laptop-code', NOW()),
('c003-0000-0000-0000-000000000003', 'FinanceVN', 'fas fa-chart-line', NOW()),
('c004-0000-0000-0000-000000000004', 'MediaPro', 'fas fa-photo-video', NOW());

-- ============================================================
-- SAMPLE DATA: Jobs
-- ============================================================
INSERT INTO `jobs` (
  `id`, `title`, `icon`, `badge`, `location`,
  `salary_min`, `salary_max`, `salary_currency`,
  `tags`, `work_type_vi`, `work_type_en`,
  `description_vi`, `description_en`,
  `requirements_vi`, `requirements_en`,
  `benefits_vi`, `benefits_en`,
  `is_hot`, `is_featured`, `is_active`, `company_id`, `created_at`, `updated_at`
) VALUES

-- Job 1
('j001-0000-0000-0000-000000000001',
 'Lập trình viên Frontend React',
 'fab fa-react', 'HOT', 'Hà Nội',
 15000000, 30000000, 'VND',
 '["React","TypeScript","CSS","Git"]',
 'Toàn thời gian', 'Full-time',
 'Chúng tôi tìm kiếm lập trình viên Frontend có kinh nghiệm với React và TypeScript để xây dựng các sản phẩm web hiện đại, hiệu suất cao.',
 'We are looking for a Frontend Developer with experience in React and TypeScript to build modern, high-performance web products.',
 '["Tối thiểu 2 năm kinh nghiệm với React","Thành thạo TypeScript","Hiểu biết về CSS/SCSS","Kinh nghiệm với Git"]',
 '["Minimum 2 years experience with React","Proficient in TypeScript","Good knowledge of CSS/SCSS","Experience with Git"]',
 '["Lương cạnh tranh 15-30 triệu","Thưởng dự án","Bảo hiểm sức khỏe","Làm việc hybrid"]',
 '["Competitive salary 15-30M VND","Project bonuses","Health insurance","Hybrid work"]',
 1, 1, 1, 'c001-0000-0000-0000-000000000001', NOW(), NOW()),

-- Job 2
('j002-0000-0000-0000-000000000002',
 'Backend Developer PHP',
 'fab fa-php', NULL, 'TP. Hồ Chí Minh',
 18000000, 35000000, 'VND',
 '["PHP","Laravel","MySQL","REST API"]',
 'Toàn thời gian', 'Full-time',
 'Tham gia đội ngũ phát triển backend để xây dựng và duy trì các API hiệu suất cao phục vụ hàng triệu người dùng.',
 'Join our backend development team to build and maintain high-performance APIs serving millions of users.',
 '["Tối thiểu 2 năm kinh nghiệm PHP","Thành thạo Laravel","Kinh nghiệm với MySQL/Redis","Hiểu biết RESTful API"]',
 '["Minimum 2 years PHP experience","Proficient in Laravel","Experience with MySQL/Redis","Understanding of RESTful API"]',
 '["Lương 18-35 triệu","Cổ phần công ty","Remote 2 ngày/tuần","Đào tạo chuyên sâu"]',
 '["Salary 18-35M VND","Company equity","Remote 2 days/week","Deep training programs"]',
 1, 0, 1, 'c002-0000-0000-0000-000000000002', NOW(), NOW()),

-- Job 3
('j003-0000-0000-0000-000000000003',
 'Chuyên viên Phân tích Tài chính',
 'fas fa-chart-bar', 'URGENT', 'Hà Nội',
 20000000, 40000000, 'VND',
 '["Excel","Power BI","Tài chính","Phân tích dữ liệu"]',
 'Toàn thời gian', 'Full-time',
 'Phân tích dữ liệu tài chính, lập báo cáo và đề xuất chiến lược đầu tư cho ban lãnh đạo.',
 'Analyze financial data, prepare reports and propose investment strategies for senior management.',
 '["Tốt nghiệp Đại học chuyên ngành Tài chính","Thành thạo Excel và Power BI","Tối thiểu 3 năm kinh nghiệm","Kỹ năng phân tích tốt"]',
 '["Bachelor degree in Finance","Proficient in Excel and Power BI","Minimum 3 years experience","Strong analytical skills"]',
 '["Lương 20-40 triệu","Thưởng KPI hàng quý","Bảo hiểm toàn diện","Xe đưa đón"]',
 '["Salary 20-40M VND","Quarterly KPI bonus","Comprehensive insurance","Shuttle service"]',
 0, 1, 1, 'c003-0000-0000-0000-000000000003', NOW(), NOW()),

-- Job 4
('j004-0000-0000-0000-000000000004',
 'Thiết kế UI/UX',
 'fas fa-paint-brush', NULL, 'Đà Nẵng',
 12000000, 22000000, 'VND',
 '["Figma","Adobe XD","UI Design","User Research"]',
 'Bán thời gian', 'Part-time',
 'Thiết kế giao diện người dùng trực quan và trải nghiệm sử dụng tuyệt vời cho các sản phẩm digital.',
 'Design intuitive user interfaces and excellent user experiences for digital products.',
 '["Thành thạo Figma hoặc Adobe XD","Portfolio thiết kế đẹp","Hiểu biết về User Research","Tối thiểu 1 năm kinh nghiệm"]',
 '["Proficient in Figma or Adobe XD","Strong design portfolio","Understanding of User Research","Minimum 1 year experience"]',
 '["Lương 12-22 triệu","Làm remote hoàn toàn","Giờ làm việc linh hoạt","Ngân sách học tập"]',
 '["Salary 12-22M VND","Fully remote","Flexible working hours","Learning budget"]',
 0, 1, 1, 'c004-0000-0000-0000-000000000004', NOW(), NOW()),

-- Job 5
('j005-0000-0000-0000-000000000005',
 'DevOps Engineer',
 'fas fa-server', 'HOT', 'TP. Hồ Chí Minh',
 25000000, 50000000, 'VND',
 '["Docker","Kubernetes","AWS","CI/CD","Linux"]',
 'Toàn thời gian', 'Full-time',
 'Xây dựng và vận hành hạ tầng cloud, tự động hóa quy trình triển khai phần mềm.',
 'Build and operate cloud infrastructure, automate software deployment processes.',
 '["3+ năm kinh nghiệm DevOps","Thành thạo Docker và Kubernetes","Kinh nghiệm AWS/GCP","Hiểu biết CI/CD pipeline"]',
 '["3+ years DevOps experience","Proficient in Docker and Kubernetes","AWS/GCP experience","Understanding of CI/CD pipeline"]',
 '["Lương 25-50 triệu","Stock options","Bảo hiểm cao cấp","Ngân sách thiết bị 20 triệu"]',
 '["Salary 25-50M VND","Stock options","Premium insurance","20M VND equipment budget"]',
 1, 1, 1, 'c001-0000-0000-0000-000000000001', NOW(), NOW()),

-- Job 6
('j006-0000-0000-0000-000000000006',
 'Content Marketing Manager',
 'fas fa-pen-fancy', NULL, 'Hà Nội',
 15000000, 25000000, 'VND',
 '["SEO","Content Strategy","Social Media","Copywriting"]',
 'Toàn thời gian', 'Full-time',
 'Xây dựng chiến lược nội dung, quản lý team content và tối ưu SEO để tăng trưởng organic traffic.',
 'Build content strategy, manage the content team and optimize SEO to grow organic traffic.',
 '["Tối thiểu 3 năm kinh nghiệm Content Marketing","Hiểu biết sâu về SEO","Kỹ năng viết xuất sắc","Kinh nghiệm quản lý team"]',
 '["Minimum 3 years Content Marketing experience","Deep SEO knowledge","Excellent writing skills","Team management experience"]',
 '["Lương 15-25 triệu","Thưởng hiệu suất","Phụ cấp điện thoại","Nghỉ phép 15 ngày/năm"]',
 '["Salary 15-25M VND","Performance bonus","Phone allowance","15 days annual leave"]',
 0, 0, 1, 'c004-0000-0000-0000-000000000004', NOW(), NOW());

-- ============================================================
-- TABLE: users (2-tier admin roles)
-- ============================================================
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(36) NOT NULL PRIMARY KEY,
  `username` VARCHAR(100) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `display_name` VARCHAR(255) NOT NULL DEFAULT '',
  `role` ENUM('superadmin','employee') NOT NULL DEFAULT 'employee',
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sample users: password = "password" (bcrypt)
INSERT IGNORE INTO `users` (`id`, `username`, `password_hash`, `display_name`, `role`, `is_active`, `created_at`) VALUES
('u001-0000-0000-0000-000000000001', 'admin',     '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Super Admin',  'superadmin', 1, NOW()),
('u002-0000-0000-0000-000000000002', 'employee1', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Nhân viên HR', 'employee',   1, NOW());
