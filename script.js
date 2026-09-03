// ===== Google Sheet backend =====
// Deploy google-apps-script.gs as a Web App (see instructions in that file)
// and paste the resulting /exec URL below.
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzoyXgua1yQLubyIwdCqT_l3kWzwnGqalFqlHDIvkqo6h2BSFqcis0MrTh-fFWqPspYPQ/exec';

function submitToSheet(data) {
    if (!SCRIPT_URL || SCRIPT_URL.indexOf('PASTE_YOUR') === 0) {
        return Promise.reject(new Error('SCRIPT_URL is not configured'));
    }
    return fetch(SCRIPT_URL, {
        method: 'POST',
        body: new URLSearchParams(data)
    }).then(res => {
        if (!res.ok) throw new Error('Request failed');
        return res.json();
    });
}

// ===== Cursor Glow =====
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
}

// ===== Navbar =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Mobile Menu =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    const isActive = navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isActive);
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

// ===== Active Nav Link =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const y = window.scrollY + 120;
    sections.forEach(sec => {
        const link = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
        if (!link) return;
        if (y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight) {
            document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

// ===== Scroll Animations =====
const animatedEls = document.querySelectorAll('[data-animate]');
const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay) || 0;
            setTimeout(() => entry.target.classList.add('animated'), delay);
            animObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

animatedEls.forEach(el => animObserver.observe(el));

// ===== Counter Animation =====
const counters = document.querySelectorAll('.counter');
const counted = new Set();

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counted.has(entry.target)) {
            counted.add(entry.target);
            const target = parseInt(entry.target.dataset.count);
            const start = performance.now();
            const duration = 2000;

            function tick(now) {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 4);
                entry.target.textContent = Math.floor(eased * target);
                if (progress < 1) requestAnimationFrame(tick);
                else entry.target.textContent = target;
            }
            requestAnimationFrame(tick);
        }
    });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

// ===== FinOps Mock Bar Fill Animation =====
const finopsMock = document.querySelector('.finops-mock');
if (finopsMock) {
    const mockObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.mock-fill').forEach((fill, i) => {
                    setTimeout(() => {
                        fill.style.width = fill.dataset.width + '%';
                        fill.classList.add('filled');
                    }, i * 180);
                });
                mockObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });
    mockObserver.observe(finopsMock);
}

// ===== Contact Form =====
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button');
    const orig = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = 'Sending...';

    submitToSheet({
        source: 'contact',
        name: form.name.value,
        email: form.email.value,
        subject: form.subject.value,
        message: form.message.value
    }).then(() => {
        btn.innerHTML = 'Message Sent! <i class="fas fa-check-circle"></i>';
        btn.style.background = '#17a5fb';
        btn.style.color = '#ffffff';
        setTimeout(() => {
            btn.disabled = false;
            btn.innerHTML = orig;
            btn.style.background = '';
            btn.style.color = '';
            form.reset();
        }, 3000);
    }).catch(() => {
        btn.disabled = false;
        btn.innerHTML = 'Something went wrong — try again <i class="fas fa-triangle-exclamation"></i>';
        setTimeout(() => { btn.innerHTML = orig; }, 3000);
    });
});

// ===== FinOps AI Waitlist Form =====
document.getElementById('waitlistForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button');
    const orig = btn.innerHTML;
    let note = form.nextElementSibling;

    const name = form.name.value;
    const company = form.company.value;
    const mobile = form.mobile.value;
    const email = form.email.value;

    btn.disabled = true;
    btn.innerHTML = 'Joining...';

    submitToSheet({
        source: 'waitlist',
        name: name,
        company: company,
        mobile: mobile,
        email: email
    }).then(() => {
        form.innerHTML = '<span class="waitlist-success"><i class="fas fa-check-circle"></i>&nbsp; ' + email + ' added to the waitlist</span>';
        if (note) note.textContent = "You're on the list. We'll email you the moment it's live.";
    }).catch(() => {
        btn.disabled = false;
        btn.innerHTML = orig;
        if (note) {
            note.textContent = 'Something went wrong — please try again.';
            note.classList.add('error');
        }
    });
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ===== Service Card Hover Effect =====
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(23, 165, 251, 0.08), var(--bg-card) 60%)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.background = '';
    });
});
