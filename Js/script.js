document.addEventListener('DOMContentLoaded', function () {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);
    updateToggleIcon(currentTheme);

    themeToggle.addEventListener('click', function () {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleIcon(newTheme);
    });

    function updateToggleIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
            themeToggle.title = 'Switch to Light Mode';
        } else {
            themeIcon.className = 'fas fa-moon';
            themeToggle.title = 'Switch to Dark Mode';
        }
    }

    // ACTIVE NAV LINKS
    function setActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200; // Account for fixed header
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // RESUME MODAL (your existing code)
    const resumeBtn = document.getElementById('resumeBtn');
    const modal = document.getElementById('resumeModal');
    const closeBtn = document.querySelector('.close');
    const readResumeBtn = document.getElementById('readResume');
    const downloadResumeBtn = document.getElementById('downloadResume');
    const resumeIframe = document.getElementById('resumeIframe');

    // Open modal
    if (resumeBtn) {
        resumeBtn.addEventListener('click', function (e) {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }

    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            modal.style.display = 'none';
            resumeIframe.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close on outside click
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            resumeIframe.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Read Resume
    if (readResumeBtn) {
        readResumeBtn.addEventListener('click', function () {
            const resumeUrl = 'resume/Talibs_Resume.pdf';  // ← CHANGE THIS
            resumeIframe.src = resumeUrl + '#view=FitH';
            resumeIframe.style.display = 'block';
        });
    }

    // Download Resume
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', function () {
            const resumeUrl = 'resume/Talibs_Resume.pdf';  // ← CHANGE THIS
            const link = document.createElement('a');
            link.href = resumeUrl;
            link.download = 'resume/Talibs_Resume.pdf';
            link.click();
        });
    }



    // Smooth scrolling + Active link
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Close mobile menu on click
                const mobileMenu = document.getElementById('mobileMenu');
                const mobileMenuBtn = document.getElementById('mobileMenuBtn');
                if (mobileMenu && mobileMenuBtn) {
                    mobileMenu.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            }
        });
    });

    // Scroll events for active nav
    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // Set initial active link
});

// Mobile Menu Toggle (keep your existing mobile menu code here)
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuCloseBtn = document.getElementById('menuCloseBtn');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function () {
        mobileMenu.classList.add('active');
        mobileMenuBtn.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (menuCloseBtn) {
    menuCloseBtn.addEventListener('click', function () {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

// Close on outside click
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});