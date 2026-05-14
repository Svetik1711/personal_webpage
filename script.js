// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
    });
}

// Close mobile menu when a nav link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active nav link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                    link.style.color = 'var(--accent)';
                } else {
                    link.style.color = '';
                }
            });
        }
    });
}

// Throttled scroll handler
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateActiveLink();
            ticking = false;
        });
        ticking = true;
    }
});

// Reveal animations on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply reveal animation to cards
document.querySelectorAll('.research-item, .pub-item, .cv-entry, .interest-card, .planned-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    observer.observe(el);
});

// Hover effect for research items
document.querySelectorAll('.research-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transition = 'all 0.2s ease';
    });
});

// Contact link hover animation
document.querySelectorAll('.contact-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        const arrow = link.querySelector('span:last-child');
        if (arrow) {
            arrow.style.transform = 'translateX(4px)';
            arrow.style.transition = 'transform 0.2s ease';
        }
    });

    link.addEventListener('mouseleave', () => {
        const arrow = link.querySelector('span:last-child');
        if (arrow) {
            arrow.style.transform = 'translateX(0)';
        }
    });
});

// Dynamic year in footer
const footerYear = document.querySelector('.footer-content p:first-child');
if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.textContent = `© ${currentYear} Svetlana Zubareva`;
}

// Console easter egg
console.log('%c SVETLANA ZUBAREVA ', 'background: #ff6b35; color: #0a0a0a; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c Mobility Data Science Researcher @ TUM ', 'color: #ff6b35; font-size: 12px;');
console.log('%c → https://www.mos.ed.tum.de/en/ftm/members/teams/svetlana-zubareva-msc/ ', 'color: #888; font-size: 10px;');
