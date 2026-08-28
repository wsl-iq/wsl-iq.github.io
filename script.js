// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Redraw charts with new theme
    drawHeroLineChart();
    drawSkillsRadar();
    drawSpeedChart();
});

// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 1500;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(target * easeProgress);
            
            counter.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        }
        
        requestAnimationFrame(updateCounter);
    });
}

// Chart Drawing Functions (Pure Canvas)
function getThemeColors() {
    const isDark = htmlElement.getAttribute('data-theme') !== 'light';
    return {
        textColor: isDark ? '#e4e4e7' : '#1a1a2e',
        textMuted: isDark ? '#71717a' : '#8a8a9e',
        gridColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
        cyan: '#00d4ff',
        blue: '#3b82f6',
        purple: '#8b5cf6',
        green: '#10b981',
        orange: '#f59e0b'
    };
}

// Hero Line Chart
function drawHeroLineChart() {
    const canvas = document.getElementById('heroLineChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const colors = getThemeColors();
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Data points
    const data = [10, 20, 30, 25, 45, 60, 75, 85, 95, 100];
    const padding = 10;
    const chartWidth = width - (padding * 2);
    const chartHeight = height - (padding * 2);
    const stepX = chartWidth / (data.length - 1);
    
    // Draw gradient fill
    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    gradient.addColorStop(0, 'rgba(0, 212, 255, 0.2)');
    gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');
    
    // Draw filled area
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    
    data.forEach((value, index) => {
        const x = padding + (index * stepX);
        const y = height - padding - ((value / 100) * chartHeight);
        ctx.lineTo(x, y);
    });
    
    ctx.lineTo(width - padding, height - padding);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw line
    ctx.beginPath();
    data.forEach((value, index) => {
        const x = padding + (index * stepX);
        const y = height - padding - ((value / 100) * chartHeight);
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.strokeStyle = colors.cyan;
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.stroke();
    
    // Draw points
    data.forEach((value, index) => {
        const x = padding + (index * stepX);
        const y = height - padding - ((value / 100) * chartHeight);
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = colors.cyan;
        ctx.fill();
    });
}

// Skills Radar Chart
function drawSkillsRadar() {
    const canvas = document.getElementById('skillsRadar');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const colors = getThemeColors();
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 40;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Skills data
    const skills = [
        { label: 'Python', value: 90 },
        { label: 'JavaScript', value: 70 },
        { label: 'C/C++', value: 55 },
        { label: 'Bash', value: 80 },
        { label: 'GUI', value: 75 },
        { label: 'CLI', value: 85 }
    ];
    
    const numAxes = skills.length;
    const angleStep = (Math.PI * 2) / numAxes;
    const startAngle = -Math.PI / 2; // Start from top
    
    // Draw grid circles
    for (let level = 1; level <= 5; level++) {
        const gridRadius = (radius / 5) * level;
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, gridRadius, 0, Math.PI * 2);
        ctx.strokeStyle = colors.gridColor;
        ctx.lineWidth = 1;
        ctx.stroke();
    }
    
    // Draw axes
    for (let i = 0; i < numAxes; i++) {
        const angle = startAngle + (i * angleStep);
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = colors.gridColor;
        ctx.lineWidth = 1;
        ctx.stroke();
    }
    
    // Draw radar polygon
    ctx.beginPath();
    skills.forEach((skill, i) => {
        const angle = startAngle + (i * angleStep);
        const valueRadius = (radius / 100) * skill.value;
        const x = centerX + Math.cos(angle) * valueRadius;
        const y = centerY + Math.sin(angle) * valueRadius;
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.closePath();
    ctx.fillStyle = 'rgba(0, 212, 255, 0.2)';
    ctx.fill();
    ctx.strokeStyle = colors.cyan;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw data points
    skills.forEach((skill, i) => {
        const angle = startAngle + (i * angleStep);
        const valueRadius = (radius / 100) * skill.value;
        const x = centerX + Math.cos(angle) * valueRadius;
        const y = centerY + Math.sin(angle) * valueRadius;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = colors.cyan;
        ctx.fill();
    });
    
    // Draw labels
    ctx.font = 'bold 12px Cairo, sans-serif';
    ctx.fillStyle = colors.textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    skills.forEach((skill, i) => {
        const angle = startAngle + (i * angleStep);
        const labelRadius = radius + 25;
        const x = centerX + Math.cos(angle) * labelRadius;
        const y = centerY + Math.sin(angle) * labelRadius;
        
        ctx.fillText(skill.label, x, y);
    });
}

// Speed Chart
function drawSpeedChart() {
    const canvas = document.getElementById('speedChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const colors = getThemeColors();
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Download data
    const downloadData = [30, 45, 55, 70, 80, 85, 89];
    const uploadData = [15, 20, 28, 32, 38, 40, 42];
    
    const padding = 5;
    const chartWidth = width - (padding * 2);
    const chartHeight = height - (padding * 2);
    const stepX = chartWidth / (downloadData.length - 1);
    
    // Draw download line
    ctx.beginPath();
    downloadData.forEach((value, index) => {
        const x = padding + (index * stepX);
        const y = height - padding - ((value / 100) * chartHeight);
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.strokeStyle = colors.cyan;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw upload line
    ctx.beginPath();
    uploadData.forEach((value, index) => {
        const x = padding + (index * stepX);
        const y = height - padding - ((value / 100) * chartHeight);
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.strokeStyle = colors.purple;
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.id === 'about') {
                animateCounters();
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('تم استلام طلبك بنجاح! سأتواصل معك قريبًا لمناقشة المشروع.');
        contactForm.reset();
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set canvas sizes
    const heroCanvas = document.getElementById('heroLineChart');
    if (heroCanvas) {
        heroCanvas.width = heroCanvas.parentElement.offsetWidth;
        heroCanvas.height = 80;
    }
    
    const speedCanvas = document.getElementById('speedChart');
    if (speedCanvas) {
        speedCanvas.width = speedCanvas.parentElement.offsetWidth;
        speedCanvas.height = 60;
    }
    
    // Draw charts
    drawHeroLineChart();
    drawSkillsRadar();
    drawSpeedChart();
    
    // Redraw on resize
    window.addEventListener('resize', () => {
        if (heroCanvas) {
            heroCanvas.width = heroCanvas.parentElement.offsetWidth;
        }
        if (speedCanvas) {
            speedCanvas.width = speedCanvas.parentElement.offsetWidth;
        }
        
        drawHeroLineChart();
        drawSpeedChart();
    });
    
    // Navbar shadow on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
});