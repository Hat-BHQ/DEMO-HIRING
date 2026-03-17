// ============================================================
// Hero Slideshow
// ============================================================
(function () {
    const slides = document.querySelectorAll('.hero-slide');
    if (!slides.length) return;
    let current = 0;
    setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }, 5000);
})();

// ============================================================
// Jobs Data
// ============================================================
const jobsData = [
    {
        titleMatch: 'Full Stack Developer',
        icon: 'fas fa-laptop-code',
        badge: 'hot',
        company: 'Tech Innovation Corp',
        location: 'Hồ Chí Minh',
        salary: '2,000 - 3,500 USD',
        tags: ['Java', 'React', 'Spring Boot', 'MySQL'],
        type: { vi: 'Toàn thời gian', en: 'Full Time' },
        desc: {
            vi: 'Chúng tôi tìm kiếm Full Stack Developer có kinh nghiệm tham gia phát triển sản phẩm SaaS quy mô lớn. Bạn sẽ chịu trách nhiệm thiết kế kiến trúc hệ thống, phát triển API và xây dựng giao diện người dùng hiện đại, làm việc chặt chẽ với Product & Design.',
            en: 'We are looking for an experienced Full Stack Developer to join our large-scale SaaS product team. You will be responsible for system architecture design, API development and modern UI building, working closely with Product & Design teams.'
        },
        requirements: {
            vi: ['3+ năm kinh nghiệm Java / Spring Boot', 'Thành thạo React, Redux, TypeScript', 'Kinh nghiệm với MySQL, Redis', 'Hiểu biết về Docker, CI/CD', 'Kỹ năng làm việc nhóm Agile tốt'],
            en: ['3+ years Java / Spring Boot experience', 'Proficient in React, Redux, TypeScript', 'Experience with MySQL, Redis', 'Knowledge of Docker, CI/CD', 'Good Agile teamwork skills']
        },
        benefits: {
            vi: ['Lương cạnh tranh + thưởng hiệu suất quý', 'Bảo hiểm sức khỏe cao cấp cho gia đình', 'Làm việc hybrid 3 ngày/tuần', '15 ngày phép + sinh nhật có lương', 'Ngân sách đào tạo 10 triệu/năm'],
            en: ['Competitive salary + quarterly performance bonus', 'Premium family health insurance', 'Hybrid work 3 days/week', '15 days leave + paid birthday', 'Training budget 10M VND/year']
        }
    },
    {
        titleMatch: 'Digital Marketing Lead',
        icon: 'fas fa-bullhorn',
        badge: 'hot',
        company: 'MediaPlus Agency',
        location: 'Hà Nội',
        salary: '1,500 - 2,500 USD',
        tags: ['Google Ads', 'Facebook Ads', 'SEO', 'Analytics'],
        type: { vi: 'Toàn thời gian', en: 'Full Time' },
        desc: {
            vi: 'MediaPlus Agency cần tuyển Digital Marketing Lead dẫn dắt đội ngũ 5 người phụ trách toàn bộ chiến lược digital marketing cho các khách hàng tập đoàn lớn. Vị trí yêu cầu tư duy phân tích mạnh và khả năng báo cáo ROI chi tiết.',
            en: 'MediaPlus Agency is hiring a Digital Marketing Lead to lead a 5-person team managing full digital marketing strategies for large corporate clients. The role requires strong analytical thinking and detailed ROI reporting ability.'
        },
        requirements: {
            vi: ['4+ năm kinh nghiệm Digital Marketing', 'Thành thạo Google Ads, Meta Ads, TikTok Ads', 'Kinh nghiệm quản lý ngân sách >200 triệu/tháng', 'Kỹ năng phân tích dữ liệu với GA4, Looker Studio', 'Tiếng Anh đọc viết tốt'],
            en: ['4+ years Digital Marketing experience', 'Proficient in Google Ads, Meta Ads, TikTok Ads', 'Experience managing budgets >200M VND/month', 'Data analysis skills with GA4, Looker Studio', 'Good English reading and writing']
        },
        benefits: {
            vi: ['Thưởng dự án theo % doanh thu chiến dịch', 'Bảo hiểm sức khỏe & tai nạn', 'Du lịch team building 1 lần/năm', 'Phụ cấp ăn trưa 1.5 triệu/tháng', 'Môi trường sáng tạo, tự do ý tưởng'],
            en: ['Project bonus as % of campaign revenue', 'Health & accident insurance', 'Annual team building trip', 'Lunch allowance 1.5M VND/month', 'Creative, idea-free environment']
        }
    },
    {
        titleMatch: 'AI/ML Engineer',
        icon: 'fas fa-brain',
        badge: 'hot',
        company: 'AI Solutions Vietnam',
        location: 'Hồ Chí Minh',
        salary: '2,500 - 4,000 USD',
        tags: ['Python', 'TensorFlow', 'PyTorch', 'Deep Learning'],
        type: { vi: 'Toàn thời gian', en: 'Full Time' },
        desc: {
            vi: 'AI Solutions Vietnam tuyển AI/ML Engineer xây dựng các mô hình học sâu phục vụ bài toán Computer Vision và NLP cho khách hàng trong lĩnh vực tài chính và y tế. Bạn sẽ làm việc với tập dữ liệu lớn và triển khai mô hình trên hạ tầng đám mây.',
            en: 'AI Solutions Vietnam is hiring an AI/ML Engineer to build deep learning models for Computer Vision and NLP problems serving clients in finance and healthcare. You will work with large datasets and deploy models on cloud infrastructure.'
        },
        requirements: {
            vi: ['3+ năm kinh nghiệm Machine Learning/Deep Learning', 'Thành thạo Python, TensorFlow hoặc PyTorch', 'Kinh nghiệm triển khai model trên AWS/GCP', 'Bằng đại học chuyên ngành CNTT, Toán hoặc tương đương', 'Kinh nghiệm với MLOps là lợi thế'],
            en: ['3+ years Machine Learning/Deep Learning experience', 'Proficient in Python, TensorFlow or PyTorch', 'Experience deploying models on AWS/GCP', 'Degree in IT, Mathematics or equivalent', 'MLOps experience is a plus']
        },
        benefits: {
            vi: ['Mức lương Top 5% thị trường', 'Cổ phần nhân viên (ESOP) sau 1 năm', 'Ngân sách hội nghị quốc tế 30 triệu/năm', 'Trang thiết bị MacBook Pro + GPU workstation', 'Làm việc remote 100% khi cần'],
            en: ['Top 5% market salary', 'Employee stock options (ESOP) after 1 year', 'International conference budget 30M VND/year', 'MacBook Pro + GPU workstation equipment', '100% remote work when needed']
        }
    },
    {
        titleMatch: 'Cybersecurity Specialist',
        icon: 'fas fa-shield-alt',
        badge: 'hot',
        company: 'SecureBank Vietnam',
        location: 'Hà Nội',
        salary: '2,200 - 3,800 USD',
        tags: ['Network Security', 'Penetration Testing', 'CISSP'],
        type: { vi: 'Toàn thời gian', en: 'Full Time' },
        desc: {
            vi: 'SecureBank Vietnam tuyển Cybersecurity Specialist đảm bảo an toàn thông tin cho hệ thống ngân hàng lõi phục vụ 2 triệu khách hàng. Vị trí đòi hỏi kinh nghiệm thực chiến về pentest, phân tích lỗ hổng và xây dựng chính sách bảo mật theo chuẩn PCI-DSS.',
            en: 'SecureBank Vietnam is hiring a Cybersecurity Specialist to ensure information security for the core banking system serving 2 million customers. The role requires hands-on experience in pentest, vulnerability analysis and building PCI-DSS security policies.'
        },
        requirements: {
            vi: ['4+ năm kinh nghiệm bảo mật thông tin', 'Chứng chỉ CISSP, CEH hoặc OSCP', 'Kinh nghiệm Penetration Testing hệ thống tài chính', 'Hiểu biết sâu về OWASP Top 10, NIST Framework', 'Kỹ năng viết báo cáo bảo mật chuyên nghiệp'],
            en: ['4+ years information security experience', 'CISSP, CEH or OSCP certification', 'Penetration testing experience in financial systems', 'Deep understanding of OWASP Top 10, NIST Framework', 'Professional security report writing skills']
        },
        benefits: {
            vi: ['Phụ cấp bảo mật đặc thù 5 triệu/tháng', 'Ngân sách thi chứng chỉ bảo mật quốc tế', 'Bảo hiểm tai nạn 24/7 mức cao', 'Chương trình đào tạo nội bộ chuyên sâu', '13 tháng lương + thưởng cuối năm'],
            en: ['Security specialist allowance 5M VND/month', 'International security certification budget', 'High-level 24/7 accident insurance', 'In-depth internal training program', '13th month salary + year-end bonus']
        }
    },
    {
        titleMatch: 'Senior Product Designer',
        icon: 'fas fa-palette',
        badge: 'hot',
        company: 'DesignHub Studio',
        location: 'Đà Nẵng',
        salary: '1,800 - 3,000 USD',
        tags: ['Figma', 'UI/UX', 'Prototyping', 'Design System'],
        type: { vi: 'Toàn thời gian / Remote', en: 'Full Time / Remote' },
        desc: {
            vi: 'DesignHub Studio tìm kiếm Senior Product Designer đam mê xây dựng trải nghiệm người dùng xuất sắc cho các sản phẩm phần mềm B2B. Bạn sẽ dẫn dắt quá trình thiết kế từ nghiên cứu người dùng đến design system hoàn chỉnh.',
            en: 'DesignHub Studio is looking for a Senior Product Designer passionate about building outstanding user experiences for B2B software products. You will lead the design process from user research to complete design system.'
        },
        requirements: {
            vi: ['4+ năm kinh nghiệm Product Design', 'Thành thạo Figma, Adobe XD', 'Portfolio dự án thực tế chất lượng cao', 'Kinh nghiệm xây dựng Design System', 'Tư duy nghiên cứu người dùng (UX Research)'],
            en: ['4+ years Product Design experience', 'Proficient in Figma, Adobe XD', 'High-quality real project portfolio', 'Design System building experience', 'UX Research thinking skills']
        },
        benefits: {
            vi: ['Remote 100% hoặc văn phòng Đà Nẵng', 'Phụ cấp thiết bị màn hình 4K', 'Tham gia hội thảo design quốc tế', 'Thưởng dự án theo quý', 'Giờ làm việc linh hoạt'],
            en: ['100% remote or Da Nang office', '4K monitor equipment allowance', 'International design conference participation', 'Quarterly project bonus', 'Flexible working hours']
        }
    },
    {
        titleMatch: 'Senior Frontend Developer',
        icon: 'fas fa-code',
        badge: 'new',
        company: 'Tech Solutions Co.',
        location: 'Hồ Chí Minh',
        salary: '1,500 - 2,500 USD',
        tags: ['React', 'JavaScript', 'CSS'],
        type: { vi: 'Toàn thời gian', en: 'Full Time' },
        desc: {
            vi: 'Tech Solutions Co. cần tuyển Senior Frontend Developer xây dựng các ứng dụng web hiệu suất cao. Bạn sẽ làm việc trong môi trường Agile, tối ưu hóa trải nghiệm người dùng và cải thiện hiệu năng ứng dụng trên mọi thiết bị.',
            en: 'Tech Solutions Co. is hiring a Senior Frontend Developer to build high-performance web applications. You will work in an Agile environment, optimize user experience and improve app performance across all devices.'
        },
        requirements: {
            vi: ['3+ năm kinh nghiệm React / Vue.js', 'Kiến thức sâu về CSS, animation', 'Kinh nghiệm tối ưu Core Web Vitals', 'Quen thuộc Git, code review', 'Hiểu biết cơ bản về SEO kỹ thuật'],
            en: ['3+ years React / Vue.js experience', 'Deep knowledge of CSS, animations', 'Core Web Vitals optimization experience', 'Familiar with Git, code review', 'Basic technical SEO knowledge']
        },
        benefits: {
            vi: ['Lương review 6 tháng/lần', 'Bảo hiểm sức khỏe cá nhân', 'Làm việc hybrid linh hoạt', 'Câu lạc bộ thể thao nội bộ', 'Phụ cấp xăng xe 1 triệu/tháng'],
            en: ['Salary review every 6 months', 'Personal health insurance', 'Flexible hybrid work', 'Internal sports club', 'Fuel allowance 1M VND/month']
        }
    },
    {
        titleMatch: 'Marketing Manager',
        icon: 'fas fa-chart-line',
        badge: 'hot',
        company: 'Digital Marketing Agency',
        location: 'Hà Nội',
        salary: '1,000 - 1,800 USD',
        tags: ['SEO', 'Content', 'Analytics'],
        type: { vi: 'Toàn thời gian', en: 'Full Time' },
        desc: {
            vi: 'Digital Marketing Agency tuyển Marketing Manager quản lý toàn bộ chiến lược marketing online & offline cho công ty và khách hàng. Bạn sẽ xây dựng kế hoạch content, tổ chức sự kiện và quản lý đội ngũ 8 người.',
            en: 'Digital Marketing Agency is hiring a Marketing Manager to manage the full online & offline marketing strategy for the company and clients. You will develop content plans, organize events and manage a team of 8 people.'
        },
        requirements: {
            vi: ['5+ năm kinh nghiệm Marketing', 'Kinh nghiệm quản lý team 5+ người', 'Thành thạo Google Analytics, Semrush', 'Kỹ năng viết content tiếng Việt + Anh', 'Kinh nghiệm tổ chức sự kiện là lợi thế'],
            en: ['5+ years Marketing experience', 'Team management experience 5+ people', 'Proficient in Google Analytics, Semrush', 'Content writing in Vietnamese + English', 'Event management experience is a plus']
        },
        benefits: {
            vi: ['13 tháng lương cố định', 'Thưởng KPI hàng quý', 'Bảo hiểm sức khỏe mở rộng', 'Phụ cấp điện thoại 500k/tháng', 'Cơ hội thăng tiến lên Director sau 2 năm'],
            en: ['Fixed 13th month salary', 'Quarterly KPI bonus', 'Extended health insurance', 'Phone allowance 500K/month', 'Promotion to Director after 2 years']
        }
    },
    {
        titleMatch: 'UX/UI Designer',
        icon: 'fas fa-mobile-alt',
        badge: 'new',
        company: 'Creative Studio',
        location: 'Đà Nẵng',
        salary: '800 - 1,500 USD',
        tags: ['Figma', 'Sketch', 'Prototype'],
        type: { vi: 'Toàn thời gian', en: 'Full Time' },
        desc: {
            vi: 'Creative Studio tuyển UX/UI Designer thiết kế giao diện ứng dụng mobile và web cho các startup công nghệ. Bạn sẽ phối hợp trực tiếp với developer và product manager để đưa ra giải pháp thiết kế sáng tạo và khả thi.',
            en: 'Creative Studio is hiring a UX/UI Designer to design mobile and web application interfaces for tech startups. You will work directly with developers and product managers to deliver creative and feasible design solutions.'
        },
        requirements: {
            vi: ['2+ năm kinh nghiệm UI/UX Design', 'Thành thạo Figma, Principle hoặc ProtoPie', 'Portfolio đa dạng mobile + web', 'Hiểu biết về Atomic Design', 'Kỹ năng nhận feedback và cải thiện nhanh'],
            en: ['2+ years UI/UX Design experience', 'Proficient in Figma, Principle or ProtoPie', 'Diverse mobile + web portfolio', 'Understanding of Atomic Design', 'Quick feedback and improvement skills']
        },
        benefits: {
            vi: ['Môi trường startup năng động', 'Phụ cấp phần mềm thiết kế', 'Remote 2 ngày/tuần', 'Thưởng dự án', 'Cơ hội học hỏi từ Senior Designer'],
            en: ['Dynamic startup environment', 'Design software allowance', 'Remote 2 days/week', 'Project bonus', 'Learning from Senior Designer']
        }
    },
    {
        titleMatch: 'Data Analyst',
        icon: 'fas fa-database',
        badge: null,
        company: 'Finance Corporation',
        location: 'Hồ Chí Minh',
        salary: '900 - 1,600 USD',
        tags: ['SQL', 'Python', 'Excel'],
        type: { vi: 'Toàn thời gian', en: 'Full Time' },
        desc: {
            vi: 'Finance Corporation tuyển Data Analyst phân tích dữ liệu tài chính, xây dựng dashboard báo cáo và hỗ trợ ra quyết định kinh doanh. Bạn sẽ làm việc với tập dữ liệu lớn từ hệ thống ngân hàng và đầu tư.',
            en: 'Finance Corporation is hiring a Data Analyst to analyze financial data, build reporting dashboards and support business decision-making. You will work with large datasets from banking and investment systems.'
        },
        requirements: {
            vi: ['2+ năm kinh nghiệm Data Analysis', 'Thành thạo SQL, Python (Pandas, NumPy)', 'Kinh nghiệm Power BI hoặc Tableau', 'Kiến thức nền tài chính là lợi thế', 'Kỹ năng trình bày số liệu rõ ràng'],
            en: ['2+ years Data Analysis experience', 'Proficient in SQL, Python (Pandas, NumPy)', 'Power BI or Tableau experience', 'Finance background is a plus', 'Clear data presentation skills']
        },
        benefits: {
            vi: ['Thưởng hiệu suất 2 lần/năm', 'Bảo hiểm sức khỏe + tai nạn', 'Đào tạo CFA hỗ trợ 50%', 'Căng-tin công ty miễn phí', 'Xe đưa đón từ trung tâm TP'],
            en: ['Performance bonus twice/year', 'Health + accident insurance', '50% CFA training support', 'Free company cafeteria', 'Shuttle bus from city center']
        }
    },
    {
        titleMatch: 'Project Manager',
        icon: 'fas fa-project-diagram',
        badge: 'hot',
        company: 'Global Enterprises',
        location: 'Hà Nội',
        salary: '1,800 - 3,000 USD',
        tags: ['Agile', 'Scrum', 'Leadership'],
        type: { vi: 'Toàn thời gian', en: 'Full Time' },
        desc: {
            vi: 'Global Enterprises cần Project Manager dẫn dắt các dự án phần mềm quốc tế quy mô 15-30 người, phối hợp với khách hàng tại Nhật Bản và Hàn Quốc. Bạn sẽ chịu trách nhiệm toàn bộ vòng đời dự án từ ký hợp đồng đến bàn giao.',
            en: 'Global Enterprises needs a Project Manager to lead international software projects of 15-30 people, coordinating with clients in Japan and Korea. You will be responsible for the entire project lifecycle from contract signing to delivery.'
        },
        requirements: {
            vi: ['5+ năm kinh nghiệm Project Management phần mềm', 'Chứng chỉ PMP hoặc PSM', 'Kinh nghiệm làm việc với khách hàng Nhật/Hàn', 'Tiếng Anh giao tiếp thành thạo (IELTS 6.5+)', 'Kỹ năng quản lý rủi ro và xử lý khủng hoảng'],
            en: ['5+ years software Project Management experience', 'PMP or PSM certification', 'Experience working with Japanese/Korean clients', 'Fluent English (IELTS 6.5+)', 'Risk management and crisis handling skills']
        },
        benefits: {
            vi: ['Lương thưởng dự án theo % hợp đồng', 'Công tác Nhật Bản / Hàn Quốc 2 lần/năm', 'Bảo hiểm quốc tế toàn cầu', 'Laptop Dell XPS + điện thoại công ty', 'Lộ trình thăng tiến lên Director rõ ràng'],
            en: ['Project bonus as % of contract value', 'Business trips to Japan/Korea twice/year', 'Global international insurance', 'Dell XPS laptop + company phone', 'Clear promotion path to Director']
        }
    },
    {
        titleMatch: 'Senior Accountant',
        icon: 'fas fa-calculator',
        badge: null,
        company: 'Accounting Services Ltd.',
        location: 'Hồ Chí Minh',
        salary: '700 - 1,200 USD',
        tags: ['Tax', 'Audit', 'Financial'],
        type: { vi: 'Toàn thời gian', en: 'Full Time' },
        desc: {
            vi: 'Accounting Services Ltd. tuyển Senior Accountant phụ trách kế toán tổng hợp, báo cáo tài chính và quyết toán thuế cho 15 doanh nghiệp FDI. Vị trí phù hợp với ứng viên muốn phát triển chuyên sâu trong lĩnh vực kế toán quốc tế.',
            en: 'Accounting Services Ltd. is hiring a Senior Accountant responsible for general accounting, financial reporting and tax settlement for 15 FDI enterprises. The role suits candidates wanting to develop expertise in international accounting.'
        },
        requirements: {
            vi: ['3+ năm kinh nghiệm kế toán tổng hợp', 'Thành thạo phần mềm MISA, SAP hoặc Fast', 'Kinh nghiệm làm báo cáo tài chính theo VAS/IFRS', 'Chứng chỉ CPA/ACCA là lợi thế lớn', 'Tiếng Anh đủ đọc hợp đồng, trao đổi email'],
            en: ['3+ years general accounting experience', 'Proficient in MISA, SAP or Fast software', 'Financial reporting experience under VAS/IFRS', 'CPA/ACCA certificate is a big plus', 'English sufficient for contracts and emails']
        },
        benefits: {
            vi: ['Hỗ trợ 100% phí thi ACCA/CPA', 'Giờ làm linh hoạt 8h-17h hoặc 9h-18h', 'Thưởng lễ Tết đầy đủ', 'Bữa trưa miễn phí tại văn phòng', 'Môi trường chuyên nghiệp chuẩn quốc tế'],
            en: ['100% ACCA/CPA exam fee support', 'Flexible hours 8am-5pm or 9am-6pm', 'Full holiday bonuses', 'Free lunch at office', 'Professional international-standard environment']
        }
    }
];

function findJob(title) {
    return jobsData.find(j => title.toLowerCase().includes(j.titleMatch.toLowerCase()));
}

// ============================================================
// Modal Logic
// ============================================================
const overlay   = document.getElementById('jobModal');
const modalClose = document.getElementById('modalClose');
const btnModalClose = document.getElementById('btnModalClose');

function openJobModal(cardEl) {
    const title = cardEl.querySelector('h3')?.textContent?.trim() || '';
    const job = findJob(title);
    if (!job) return;

    const lang = currentLang;

    // Icon
    const iconEl = document.querySelector('#modalIcon i');
    iconEl.className = job.icon;

    // Badge
    const badge = document.getElementById('modalBadge');
    if (job.badge) {
        badge.textContent = job.badge === 'hot' ? 'Hot' : translations[lang].badgeNew;
        badge.className = 'job-badge' + (job.badge === 'hot' ? ' hot' : '');
        badge.style.display = 'inline-block';
    } else {
        badge.style.display = 'none';
    }

    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalCompany').querySelector('span').textContent = job.company;
    document.getElementById('modalLocation').querySelector('span').textContent = job.location;
    document.getElementById('modalSalary').querySelector('span').textContent = job.salary;
    document.getElementById('modalType').querySelector('span').textContent = job.type[lang];

    // Tags
    const tagsEl = document.getElementById('modalTags');
    tagsEl.innerHTML = job.tags.map(t => `<span class="tag">${t}</span>`).join('');

    // Body
    document.getElementById('modalDesc').textContent = job.desc[lang];

    const reqEl = document.getElementById('modalRequirements');
    reqEl.innerHTML = job.requirements[lang].map(r => `<li>${r}</li>`).join('');

    const benEl = document.getElementById('modalBenefits');
    benEl.innerHTML = job.benefits[lang].map(b => `<li>${b}</li>`).join('');

    // Update static i18n inside modal
    overlay.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) el.innerHTML = translations[lang][key];
    });

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeJobModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeJobModal);
btnModalClose.addEventListener('click', closeJobModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeJobModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeJobModal(); });

// Attach click to all job cards
document.querySelectorAll('.job-card, .hot-job-card').forEach(card => {
    card.addEventListener('click', e => {
        if (e.target.closest('.btn-apply')) return; // let apply button handle separately
        openJobModal(card);
    });
});

// ============================================================
// Translations
// ============================================================
const translations = {
  vi: {
    heroTitle: 'Tìm Kiếm Cơ Hội Nghề Nghiệp<br><span class="highlight">Hoàn Hảo</span> Của Bạn',
    heroSubtitle: 'Nơi kết nối tài năng với những cơ hội việc làm tốt nhất',
    statJobs: 'Việc làm',
    statCompanies: 'Công ty',
    statCandidates: 'Ứng viên',
    statSuccess: 'Tuyển dụng thành công',
    filterIndustry: 'Ngành nghề',
    placeholderSearch: 'Tìm kiếm',
    filterLocation: 'Địa điểm',
    btnSearch: 'Tìm kiếm',
    btnFilter: 'Bộ lọc',
    filterWorkType: 'Hình thức làm việc',
    optFullTime: 'Toàn thời gian',
    optPartTime: 'Bán thời gian',
    filterSector: 'Khối',
    optTech: 'Kỹ thuật',
    optBusiness: 'Kinh doanh',
    optOperations: 'Vận hành',
    filterSalary: 'Mức lương',
    optBelow500: 'Dưới 500 USD',
    opt500to1000: '500 - 1000 USD',
    opt1000to2000: '1000 - 2000 USD',
    optAbove2000: 'Trên 2000 USD',
    filterOption: 'Tuỳ chọn',
    optBonus: 'Có thưởng',
    optInsurance: 'Có bảo hiểm',
    optTravel: 'Du lịch',
    btnClearFilter: 'Xóa tất cả',
    optAccounting: 'Kế toán',
    optDesign: 'Thiết kế',
    hotJobsTitle: 'Việc Làm <span class="highlight">Hot</span>',
    hotJobsSubtitle: 'Những cơ hội việc làm được quan tâm nhiều nhất',
    btnApplyNow: 'Ứng tuyển ngay',
    btnSeeMoreHot: 'Xem thêm việc làm hot',
    featuredJobsTitle: 'Việc Làm <span class="highlight">Nổi Bật</span>',
    featuredJobsSubtitle: 'Cập nhật những cơ hội việc làm mới nhất',
    badgeNew: 'Mới',
    btnApply: 'Ứng tuyển',
    btnSeeMore: 'Xem thêm việc làm',
    ctaTitle: 'Bạn là nhà tuyển dụng?',
    ctaDesc: 'Đăng tin tuyển dụng và tìm kiếm ứng viên phù hợp cho doanh nghiệp của bạn',
    ctaBtn: 'Đăng tin tuyển dụng',
    footerDesc: 'Nền tảng tuyển dụng hàng đầu, kết nối nhà tuyển dụng với ứng viên tài năng.',
    footerAbout: 'Về chúng tôi',
    footerIntro: 'Giới thiệu',
    footerContact: 'Liên hệ',
    footerBlog: 'Blog',
    footerFaq: 'Hỏi đáp',
    footerForCandidate: 'Dành cho ứng viên',
    footerFindJob: 'Tìm việc làm',
    footerCompany: 'Công ty',
    footerCvGuide: 'Hướng dẫn viết CV',
    footerCareerGuide: 'Cẩm nang nghề nghiệp',
    footerForEmployer: 'Dành cho nhà tuyển dụng',
    footerPostJob: 'Đăng tin tuyển dụng',
    footerFindCandidate: 'Tìm ứng viên',
    footerPricing: 'Bảng giá',
    footerPartner: 'Liên hệ hợp tác',
    footerCopyright: '© 2026 TOM Organization. All rights reserved.',
    footerTerms: 'Điều khoản sử dụng',
    footerPrivacy: 'Chính sách bảo mật',
    modalDescTitle: 'Mô tả công việc',
    modalReqTitle: 'Yêu cầu ứng viên',
    modalBenTitle: 'Quyền lợi',
    btnClose: 'Đóng',
  },
  en: {
    heroTitle: 'Find Your Career<br><span class="highlight">Perfect Opportunity</span> Now',
    heroSubtitle: 'Where talent meets the best job opportunities',
    statJobs: 'Jobs',
    statCompanies: 'Companies',
    statCandidates: 'Candidates',
    statSuccess: 'Successful Hires',
    filterIndustry: 'Industry',
    placeholderSearch: 'Search',
    filterLocation: 'Location',
    btnSearch: 'Search',
    btnFilter: 'Filters',
    filterWorkType: 'Work Type',
    optFullTime: 'Full Time',
    optPartTime: 'Part Time',
    filterSector: 'Sector',
    optTech: 'Technology',
    optBusiness: 'Business',
    optOperations: 'Operations',
    filterSalary: 'Salary',
    optBelow500: 'Below 500 USD',
    opt500to1000: '500 - 1000 USD',
    opt1000to2000: '1000 - 2000 USD',
    optAbove2000: 'Above 2000 USD',
    filterOption: 'Options',
    optBonus: 'With Bonus',
    optInsurance: 'With Insurance',
    optTravel: 'Travel Benefits',
    btnClearFilter: 'Clear All',
    optAccounting: 'Accounting',
    optDesign: 'Design',
    hotJobsTitle: '<span class="highlight">Hot</span> Jobs',
    hotJobsSubtitle: 'The most sought-after job opportunities',
    btnApplyNow: 'Apply Now',
    btnSeeMoreHot: 'See more hot jobs',
    featuredJobsTitle: '<span class="highlight">Featured</span> Jobs',
    featuredJobsSubtitle: 'Updated with the latest job opportunities',
    badgeNew: 'New',
    btnApply: 'Apply',
    btnSeeMore: 'See more jobs',
    ctaTitle: 'Are you an employer?',
    ctaDesc: 'Post your job and find the right candidates for your business',
    ctaBtn: 'Post a Job',
    footerDesc: 'The leading recruitment platform, connecting employers with talented candidates.',
    footerAbout: 'About Us',
    footerIntro: 'About',
    footerContact: 'Contact',
    footerBlog: 'Blog',
    footerFaq: 'FAQ',
    footerForCandidate: 'For Candidates',
    footerFindJob: 'Find Jobs',
    footerCompany: 'Companies',
    footerCvGuide: 'CV Writing Guide',
    footerCareerGuide: 'Career Guide',
    footerForEmployer: 'For Employers',
    footerPostJob: 'Post a Job',
    footerFindCandidate: 'Find Candidates',
    footerPricing: 'Pricing',
    footerPartner: 'Partnership',
    footerCopyright: '© 2026 TOM Organization. All rights reserved.',
    footerTerms: 'Terms of Use',
    footerPrivacy: 'Privacy Policy',
    modalDescTitle: 'Job Description',
    modalReqTitle: 'Requirements',
    modalBenTitle: 'Benefits',
    btnClose: 'Close',
  }
};

// ============================================================
// Language
// ============================================================
let currentLang = localStorage.getItem('lang') || 'vi';

function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    const t = translations[lang];

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) el.innerHTML = t[key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key] !== undefined) el.placeholder = t[key];
    });

    const langToggle = document.getElementById('langToggle');
    if (langToggle) langToggle.textContent = lang === 'vi' ? 'EN' : 'VI';
}

document.getElementById('langToggle').addEventListener('click', () => {
    applyLang(currentLang === 'vi' ? 'en' : 'vi');
});

// ============================================================
// Theme
// ============================================================
let currentTheme = localStorage.getItem('theme') || 'light';

function applyTheme(theme) {
    currentTheme = theme;
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    const icon = document.querySelector('#themeToggle i');
    if (icon) icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

document.getElementById('themeToggle').addEventListener('click', () => {
    applyTheme(currentTheme === 'light' ? 'dark' : 'light');
});

// ============================================================
// Init
// ============================================================
applyTheme(currentTheme);
applyLang(currentLang);
