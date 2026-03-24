"""Seed database with initial job data migrated from the original static HTML/JS site."""
from sqlalchemy import select
from app.core.database import async_session
from app.models.models import Company, Job


SEED_DATA = [
    {
        "company": {"name": "Tech Innovation Corp", "icon": "fas fa-laptop-code"},
        "job": {
            "title": "Full Stack Developer (Java/React)",
            "icon": "fas fa-laptop-code",
            "badge": "hot",
            "location": "Hồ Chí Minh",
            "salary_min": 2000, "salary_max": 3500,
            "tags": ["Java", "React", "Spring Boot", "MySQL"],
            "work_type_vi": "Toàn thời gian", "work_type_en": "Full Time",
            "is_hot": True, "is_featured": False,
            "description_vi": "Chúng tôi tìm kiếm Full Stack Developer có kinh nghiệm tham gia phát triển sản phẩm SaaS quy mô lớn. Bạn sẽ chịu trách nhiệm thiết kế kiến trúc hệ thống, phát triển API và xây dựng giao diện người dùng hiện đại, làm việc chặt chẽ với Product & Design.",
            "description_en": "We are looking for an experienced Full Stack Developer to join our large-scale SaaS product team. You will be responsible for system architecture design, API development and modern UI building, working closely with Product & Design teams.",
            "requirements_vi": ["3+ năm kinh nghiệm Java / Spring Boot", "Thành thạo React, Redux, TypeScript", "Kinh nghiệm với MySQL, Redis", "Hiểu biết về Docker, CI/CD", "Kỹ năng làm việc nhóm Agile tốt"],
            "requirements_en": ["3+ years Java / Spring Boot experience", "Proficient in React, Redux, TypeScript", "Experience with MySQL, Redis", "Knowledge of Docker, CI/CD", "Good Agile teamwork skills"],
            "benefits_vi": ["Lương cạnh tranh + thưởng hiệu suất quý", "Bảo hiểm sức khỏe cao cấp cho gia đình", "Làm việc hybrid 3 ngày/tuần", "15 ngày phép + sinh nhật có lương", "Ngân sách đào tạo 10 triệu/năm"],
            "benefits_en": ["Competitive salary + quarterly performance bonus", "Premium family health insurance", "Hybrid work 3 days/week", "15 days leave + paid birthday", "Training budget 10M VND/year"],
        },
    },
    {
        "company": {"name": "MediaPlus Agency", "icon": "fas fa-bullhorn"},
        "job": {
            "title": "Digital Marketing Lead",
            "icon": "fas fa-bullhorn",
            "badge": "hot",
            "location": "Hà Nội",
            "salary_min": 1500, "salary_max": 2500,
            "tags": ["Google Ads", "Facebook Ads", "SEO", "Analytics"],
            "work_type_vi": "Toàn thời gian", "work_type_en": "Full Time",
            "is_hot": True, "is_featured": False,
            "description_vi": "MediaPlus Agency cần tuyển Digital Marketing Lead dẫn dắt đội ngũ 5 người phụ trách toàn bộ chiến lược digital marketing cho các khách hàng tập đoàn lớn.",
            "description_en": "MediaPlus Agency is hiring a Digital Marketing Lead to lead a 5-person team managing full digital marketing strategies for large corporate clients.",
            "requirements_vi": ["4+ năm kinh nghiệm Digital Marketing", "Thành thạo Google Ads, Meta Ads, TikTok Ads", "Kinh nghiệm quản lý ngân sách >200 triệu/tháng", "Kỹ năng phân tích dữ liệu với GA4, Looker Studio", "Tiếng Anh đọc viết tốt"],
            "requirements_en": ["4+ years Digital Marketing experience", "Proficient in Google Ads, Meta Ads, TikTok Ads", "Experience managing budgets >200M VND/month", "Data analysis skills with GA4, Looker Studio", "Good English reading and writing"],
            "benefits_vi": ["Thưởng dự án theo % doanh thu chiến dịch", "Bảo hiểm sức khỏe & tai nạn", "Du lịch team building 1 lần/năm", "Phụ cấp ăn trưa 1.5 triệu/tháng", "Môi trường sáng tạo, tự do ý tưởng"],
            "benefits_en": ["Project bonus as % of campaign revenue", "Health & accident insurance", "Annual team building trip", "Lunch allowance 1.5M VND/month", "Creative, idea-free environment"],
        },
    },
    {
        "company": {"name": "AI Solutions Vietnam", "icon": "fas fa-brain"},
        "job": {
            "title": "AI/ML Engineer",
            "icon": "fas fa-brain",
            "badge": "hot",
            "location": "Hồ Chí Minh",
            "salary_min": 2500, "salary_max": 4000,
            "tags": ["Python", "TensorFlow", "PyTorch", "Deep Learning"],
            "work_type_vi": "Toàn thời gian", "work_type_en": "Full Time",
            "is_hot": True, "is_featured": False,
            "description_vi": "AI Solutions Vietnam tuyển AI/ML Engineer xây dựng các mô hình học sâu phục vụ bài toán Computer Vision và NLP cho khách hàng trong lĩnh vực tài chính và y tế.",
            "description_en": "AI Solutions Vietnam is hiring an AI/ML Engineer to build deep learning models for Computer Vision and NLP problems serving clients in finance and healthcare.",
            "requirements_vi": ["3+ năm kinh nghiệm Machine Learning/Deep Learning", "Thành thạo Python, TensorFlow hoặc PyTorch", "Kinh nghiệm triển khai model trên AWS/GCP", "Bằng đại học chuyên ngành CNTT, Toán hoặc tương đương", "Kinh nghiệm với MLOps là lợi thế"],
            "requirements_en": ["3+ years Machine Learning/Deep Learning experience", "Proficient in Python, TensorFlow or PyTorch", "Experience deploying models on AWS/GCP", "Degree in IT, Mathematics or equivalent", "MLOps experience is a plus"],
            "benefits_vi": ["Mức lương Top 5% thị trường", "Cổ phần nhân viên (ESOP) sau 1 năm", "Ngân sách hội nghị quốc tế 30 triệu/năm", "Trang thiết bị MacBook Pro + GPU workstation", "Làm việc remote 100% khi cần"],
            "benefits_en": ["Top 5% market salary", "Employee stock options (ESOP) after 1 year", "International conference budget 30M VND/year", "MacBook Pro + GPU workstation equipment", "100% remote work when needed"],
        },
    },
    {
        "company": {"name": "SecureBank Vietnam", "icon": "fas fa-shield-alt"},
        "job": {
            "title": "Cybersecurity Specialist",
            "icon": "fas fa-shield-alt",
            "badge": "hot",
            "location": "Hà Nội",
            "salary_min": 2200, "salary_max": 3800,
            "tags": ["Network Security", "Penetration Testing", "CISSP"],
            "work_type_vi": "Toàn thời gian", "work_type_en": "Full Time",
            "is_hot": True, "is_featured": False,
            "description_vi": "SecureBank Vietnam tuyển Cybersecurity Specialist đảm bảo an toàn thông tin cho hệ thống ngân hàng lõi phục vụ 2 triệu khách hàng.",
            "description_en": "SecureBank Vietnam is hiring a Cybersecurity Specialist to ensure information security for the core banking system serving 2 million customers.",
            "requirements_vi": ["4+ năm kinh nghiệm bảo mật thông tin", "Chứng chỉ CISSP, CEH hoặc OSCP", "Kinh nghiệm Penetration Testing hệ thống tài chính", "Hiểu biết sâu về OWASP Top 10, NIST Framework", "Kỹ năng viết báo cáo bảo mật chuyên nghiệp"],
            "requirements_en": ["4+ years information security experience", "CISSP, CEH or OSCP certification", "Penetration testing experience in financial systems", "Deep understanding of OWASP Top 10, NIST Framework", "Professional security report writing skills"],
            "benefits_vi": ["Phụ cấp bảo mật đặc thù 5 triệu/tháng", "Ngân sách thi chứng chỉ bảo mật quốc tế", "Bảo hiểm tai nạn 24/7 mức cao", "Chương trình đào tạo nội bộ chuyên sâu", "13 tháng lương + thưởng cuối năm"],
            "benefits_en": ["Security specialist allowance 5M VND/month", "International security certification budget", "High-level 24/7 accident insurance", "In-depth internal training program", "13th month salary + year-end bonus"],
        },
    },
    {
        "company": {"name": "DesignHub Studio", "icon": "fas fa-palette"},
        "job": {
            "title": "Senior Product Designer",
            "icon": "fas fa-palette",
            "badge": "hot",
            "location": "Đà Nẵng",
            "salary_min": 1800, "salary_max": 3000,
            "tags": ["Figma", "UI/UX", "Prototyping", "Design System"],
            "work_type_vi": "Toàn thời gian / Remote", "work_type_en": "Full Time / Remote",
            "is_hot": True, "is_featured": False,
            "description_vi": "DesignHub Studio tìm kiếm Senior Product Designer đam mê xây dựng trải nghiệm người dùng xuất sắc cho các sản phẩm phần mềm B2B.",
            "description_en": "DesignHub Studio is looking for a Senior Product Designer passionate about building outstanding user experiences for B2B software products.",
            "requirements_vi": ["4+ năm kinh nghiệm Product Design", "Thành thạo Figma, Adobe XD", "Portfolio dự án thực tế chất lượng cao", "Kinh nghiệm xây dựng Design System", "Tư duy nghiên cứu người dùng (UX Research)"],
            "requirements_en": ["4+ years Product Design experience", "Proficient in Figma, Adobe XD", "High-quality real project portfolio", "Design System building experience", "UX Research thinking skills"],
            "benefits_vi": ["Remote 100% hoặc văn phòng Đà Nẵng", "Phụ cấp thiết bị màn hình 4K", "Tham gia hội thảo design quốc tế", "Thưởng dự án theo quý", "Giờ làm việc linh hoạt"],
            "benefits_en": ["100% remote or Da Nang office", "4K monitor equipment allowance", "International design conference participation", "Quarterly project bonus", "Flexible working hours"],
        },
    },
    {
        "company": {"name": "Tech Solutions Co.", "icon": "fas fa-code"},
        "job": {
            "title": "Senior Frontend Developer",
            "icon": "fas fa-code",
            "badge": "new",
            "location": "Hồ Chí Minh",
            "salary_min": 1500, "salary_max": 2500,
            "tags": ["React", "JavaScript", "CSS"],
            "work_type_vi": "Toàn thời gian", "work_type_en": "Full Time",
            "is_hot": False, "is_featured": True,
            "description_vi": "Tech Solutions Co. cần tuyển Senior Frontend Developer xây dựng các ứng dụng web hiệu suất cao.",
            "description_en": "Tech Solutions Co. is hiring a Senior Frontend Developer to build high-performance web applications.",
            "requirements_vi": ["3+ năm kinh nghiệm React / Vue.js", "Kiến thức sâu về CSS, animation", "Kinh nghiệm tối ưu Core Web Vitals", "Quen thuộc Git, code review", "Hiểu biết cơ bản về SEO kỹ thuật"],
            "requirements_en": ["3+ years React / Vue.js experience", "Deep knowledge of CSS, animations", "Core Web Vitals optimization experience", "Familiar with Git, code review", "Basic technical SEO knowledge"],
            "benefits_vi": ["Lương review 6 tháng/lần", "Bảo hiểm sức khỏe cá nhân", "Làm việc hybrid linh hoạt", "Câu lạc bộ thể thao nội bộ", "Phụ cấp xăng xe 1 triệu/tháng"],
            "benefits_en": ["Salary review every 6 months", "Personal health insurance", "Flexible hybrid work", "Internal sports club", "Fuel allowance 1M VND/month"],
        },
    },
    {
        "company": {"name": "Digital Marketing Agency", "icon": "fas fa-chart-line"},
        "job": {
            "title": "Marketing Manager",
            "icon": "fas fa-chart-line",
            "badge": "hot",
            "location": "Hà Nội",
            "salary_min": 1000, "salary_max": 1800,
            "tags": ["SEO", "Content", "Analytics"],
            "work_type_vi": "Toàn thời gian", "work_type_en": "Full Time",
            "is_hot": False, "is_featured": True,
            "description_vi": "Digital Marketing Agency tuyển Marketing Manager quản lý toàn bộ chiến lược marketing online & offline cho công ty và khách hàng.",
            "description_en": "Digital Marketing Agency is hiring a Marketing Manager to manage the full online & offline marketing strategy for the company and clients.",
            "requirements_vi": ["5+ năm kinh nghiệm Marketing", "Kinh nghiệm quản lý team 5+ người", "Thành thạo Google Analytics, Semrush", "Kỹ năng viết content tiếng Việt + Anh", "Kinh nghiệm tổ chức sự kiện là lợi thế"],
            "requirements_en": ["5+ years Marketing experience", "Team management experience 5+ people", "Proficient in Google Analytics, Semrush", "Content writing in Vietnamese + English", "Event management experience is a plus"],
            "benefits_vi": ["13 tháng lương cố định", "Thưởng KPI hàng quý", "Bảo hiểm sức khỏe mở rộng", "Phụ cấp điện thoại 500k/tháng", "Cơ hội thăng tiến lên Director sau 2 năm"],
            "benefits_en": ["Fixed 13th month salary", "Quarterly KPI bonus", "Extended health insurance", "Phone allowance 500K/month", "Promotion to Director after 2 years"],
        },
    },
    {
        "company": {"name": "Creative Studio", "icon": "fas fa-mobile-alt"},
        "job": {
            "title": "UX/UI Designer",
            "icon": "fas fa-mobile-alt",
            "badge": "new",
            "location": "Đà Nẵng",
            "salary_min": 800, "salary_max": 1500,
            "tags": ["Figma", "Sketch", "Prototype"],
            "work_type_vi": "Toàn thời gian", "work_type_en": "Full Time",
            "is_hot": False, "is_featured": True,
            "description_vi": "Creative Studio tuyển UX/UI Designer thiết kế giao diện ứng dụng mobile và web cho các startup công nghệ.",
            "description_en": "Creative Studio is hiring a UX/UI Designer to design mobile and web application interfaces for tech startups.",
            "requirements_vi": ["2+ năm kinh nghiệm UI/UX Design", "Thành thạo Figma, Principle hoặc ProtoPie", "Portfolio đa dạng mobile + web", "Hiểu biết về Atomic Design", "Kỹ năng nhận feedback và cải thiện nhanh"],
            "requirements_en": ["2+ years UI/UX Design experience", "Proficient in Figma, Principle or ProtoPie", "Diverse mobile + web portfolio", "Understanding of Atomic Design", "Quick feedback and improvement skills"],
            "benefits_vi": ["Môi trường startup năng động", "Phụ cấp phần mềm thiết kế", "Remote 2 ngày/tuần", "Thưởng dự án", "Cơ hội học hỏi từ Senior Designer"],
            "benefits_en": ["Dynamic startup environment", "Design software allowance", "Remote 2 days/week", "Project bonus", "Learning from Senior Designer"],
        },
    },
    {
        "company": {"name": "Finance Corporation", "icon": "fas fa-database"},
        "job": {
            "title": "Data Analyst",
            "icon": "fas fa-database",
            "badge": None,
            "location": "Hồ Chí Minh",
            "salary_min": 900, "salary_max": 1600,
            "tags": ["SQL", "Python", "Excel"],
            "work_type_vi": "Toàn thời gian", "work_type_en": "Full Time",
            "is_hot": False, "is_featured": True,
            "description_vi": "Finance Corporation tuyển Data Analyst phân tích dữ liệu tài chính, xây dựng dashboard báo cáo và hỗ trợ ra quyết định kinh doanh.",
            "description_en": "Finance Corporation is hiring a Data Analyst to analyze financial data, build reporting dashboards and support business decision-making.",
            "requirements_vi": ["2+ năm kinh nghiệm Data Analysis", "Thành thạo SQL, Python (Pandas, NumPy)", "Kinh nghiệm Power BI hoặc Tableau", "Kiến thức nền tài chính là lợi thế", "Kỹ năng trình bày số liệu rõ ràng"],
            "requirements_en": ["2+ years Data Analysis experience", "Proficient in SQL, Python (Pandas, NumPy)", "Power BI or Tableau experience", "Finance background is a plus", "Clear data presentation skills"],
            "benefits_vi": ["Thưởng hiệu suất 2 lần/năm", "Bảo hiểm sức khỏe + tai nạn", "Đào tạo CFA hỗ trợ 50%", "Căng-tin công ty miễn phí", "Xe đưa đón từ trung tâm TP"],
            "benefits_en": ["Performance bonus twice/year", "Health + accident insurance", "50% CFA training support", "Free company cafeteria", "Shuttle bus from city center"],
        },
    },
    {
        "company": {"name": "Global Enterprises", "icon": "fas fa-project-diagram"},
        "job": {
            "title": "Project Manager",
            "icon": "fas fa-project-diagram",
            "badge": "hot",
            "location": "Hà Nội",
            "salary_min": 1800, "salary_max": 3000,
            "tags": ["Agile", "Scrum", "Leadership"],
            "work_type_vi": "Toàn thời gian", "work_type_en": "Full Time",
            "is_hot": False, "is_featured": True,
            "description_vi": "Global Enterprises cần Project Manager dẫn dắt các dự án phần mềm quốc tế quy mô 15-30 người.",
            "description_en": "Global Enterprises needs a Project Manager to lead international software projects of 15-30 people.",
            "requirements_vi": ["5+ năm kinh nghiệm Project Management phần mềm", "Chứng chỉ PMP hoặc PSM", "Kinh nghiệm làm việc với khách hàng Nhật/Hàn", "Tiếng Anh giao tiếp thành thạo (IELTS 6.5+)", "Kỹ năng quản lý rủi ro và xử lý khủng hoảng"],
            "requirements_en": ["5+ years software Project Management experience", "PMP or PSM certification", "Experience working with Japanese/Korean clients", "Fluent English (IELTS 6.5+)", "Risk management and crisis handling skills"],
            "benefits_vi": ["Lương thưởng dự án theo % hợp đồng", "Công tác Nhật Bản / Hàn Quốc 2 lần/năm", "Bảo hiểm quốc tế toàn cầu", "Laptop Dell XPS + điện thoại công ty", "Lộ trình thăng tiến lên Director rõ ràng"],
            "benefits_en": ["Project bonus as % of contract value", "Business trips to Japan/Korea twice/year", "Global international insurance", "Dell XPS laptop + company phone", "Clear promotion path to Director"],
        },
    },
    {
        "company": {"name": "Accounting Services Ltd.", "icon": "fas fa-calculator"},
        "job": {
            "title": "Senior Accountant",
            "icon": "fas fa-calculator",
            "badge": None,
            "location": "Hồ Chí Minh",
            "salary_min": 700, "salary_max": 1200,
            "tags": ["Tax", "Audit", "Financial"],
            "work_type_vi": "Toàn thời gian", "work_type_en": "Full Time",
            "is_hot": False, "is_featured": True,
            "description_vi": "Accounting Services Ltd. tuyển Senior Accountant phụ trách kế toán tổng hợp, báo cáo tài chính và quyết toán thuế cho 15 doanh nghiệp FDI.",
            "description_en": "Accounting Services Ltd. is hiring a Senior Accountant responsible for general accounting, financial reporting and tax settlement for 15 FDI enterprises.",
            "requirements_vi": ["3+ năm kinh nghiệm kế toán tổng hợp", "Thành thạo phần mềm MISA, SAP hoặc Fast", "Kinh nghiệm làm báo cáo tài chính theo VAS/IFRS", "Chứng chỉ CPA/ACCA là lợi thế lớn", "Tiếng Anh đủ đọc hợp đồng, trao đổi email"],
            "requirements_en": ["3+ years general accounting experience", "Proficient in MISA, SAP or Fast software", "Financial reporting experience under VAS/IFRS", "CPA/ACCA certificate is a big plus", "English sufficient for contracts and emails"],
            "benefits_vi": ["Hỗ trợ 100% phí thi ACCA/CPA", "Giờ làm linh hoạt 8h-17h hoặc 9h-18h", "Thưởng lễ Tết đầy đủ", "Bữa trưa miễn phí tại văn phòng", "Môi trường chuyên nghiệp chuẩn quốc tế"],
            "benefits_en": ["100% ACCA/CPA exam fee support", "Flexible hours 8am-5pm or 9am-6pm", "Full holiday bonuses", "Free lunch at office", "Professional international-standard environment"],
        },
    },
]


async def seed_data():
    """Insert seed data only if the jobs table is empty."""
    async with async_session() as session:
        result = await session.execute(select(Job).limit(1))
        if result.scalar_one_or_none() is not None:
            return  # already seeded

        for entry in SEED_DATA:
            company = Company(id=uuid.uuid4(), **entry["company"])
            session.add(company)
            await session.flush()

            job = Job(id=uuid.uuid4(), company_id=company.id, **entry["job"])
            session.add(job)

        await session.commit()
        print(f"[SEED] Inserted {len(SEED_DATA)} jobs with companies")
