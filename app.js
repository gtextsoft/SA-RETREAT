// ═══════════════════════════════════════════════════════════════
// SA EVENTS — App Logic
// ═══════════════════════════════════════════════════════════════

// Initialize Lucide Icons
lucide.createIcons();

// ──────────────── Theme Toggle ────────────────
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

const getTheme = () => localStorage.getItem('theme') || 'light';
const setTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
};

themeToggle.addEventListener('click', () => {
    const currentTheme = getTheme();
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
});

// Set initial theme
setTheme(getTheme());

// ──────────────── Header Scroll Effect ────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ──────────────── Mobile Menu Toggle ────────────────
const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');

mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    const isMenuOpen = navMenu.classList.contains('active');
    icon.setAttribute('data-lucide', isMenuOpen ? 'x' : 'menu');
    lucide.createIcons();
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    });
});

// ──────────────── Filtering Logic ────────────────
// Handles both featured cards and event list rows
const filterButtons = document.querySelectorAll('.pill');
const eventRows = document.querySelectorAll('.event-row');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        eventRows.forEach(row => {
            if (filter === 'all' || row.dataset.category === filter) {
                row.style.display = '';
                row.style.opacity = '0';
                setTimeout(() => row.style.opacity = '1', 20);
            } else {
                row.style.opacity = '0';
                setTimeout(() => row.style.display = 'none', 300);
            }
        });
    });
});

// ──────────────── Modal Logic ────────────────
const modal = document.getElementById('retreat-modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');
const backdrop = document.querySelector('.modal-backdrop');

// Event details data for modals (featured cards)
const eventDetails = {
    'bgc-lagos': {
        title: "Business Growth Conference — Lagos",
        location: "Lagos, Nigeria",
        date: "February 14–15, 2026",
        category: "Conference",
        description: "Join the Business Growth Masterclass — a game-changing session for ambitious entrepreneurs. Master proven strategies to scale revenue, streamline operations, and build a thriving brand.",
        highlights: [
            "Proven strategies to scale revenue and streamline operations",
            "World-class speakers including Dr. Stephen Akintayo & industry leaders",
            "Networking with ambitious entrepreneurs and business owners",
            "Regular, Executive, and Virtual ticket packages available",
            "Executive dinner with Dr. Stephen Akintayo (Executive Access)",
            "Access to Stephen Akintayo University included"
        ],
        forWho: "Entrepreneurs, startup founders, business owners, CEOs, sales & marketing professionals ready to scale.",
        pricing: "Regular: ₦250,000 | Executive: ₦500,000 | Virtual: ₦150,000",
        link: "https://businessgrowthconference.org/nigeria"
    },
    'sales-masterclass': {
        title: "Sales Masterclass with Dr. Stephen Akintayo",
        location: "Lagos, Nigeria",
        date: "January 2026",
        category: "Masterclass",
        description: "Sales is not persuasion — it's clarity, structure, and trust. This focused, high-impact masterclass is designed for business owners serious about building profitable businesses, increasing deal flow, and selling with integrity.",
        highlights: [
            "How to sell without sounding desperate or aggressive",
            "Mindset shifts that separate top closers from average sellers",
            "Structuring conversations that lead naturally to decisions",
            "Pricing confidence and value positioning",
            "Building trust before asking for commitment",
            "Creating repeat buyers and long-term relationships"
        ],
        forWho: "Business owners, sales professionals, real estate practitioners, and founders who want predictable revenue.",
        pricing: "Contact for details",
        link: "https://stephenakintayo.com/salesmasterclass"
    },
    'kenya-retreat': {
        title: "Corporate Leadership Retreat — Kenya Edition",
        location: "Kenya, East Africa",
        date: "September 24–29, 2025",
        category: "Retreat",
        description: "A transformational leadership immersion in Kenya for CEOs, Executives & Visionary Teams. Build networks, scale across nations, and tour iconic landscapes while transforming your leadership capabilities.",
        highlights: [
            "Week-long intensive leadership transformation",
            "Strategic vision sessions with international mentors",
            "Networking with CEOs and executives from multiple countries",
            "Tour Kenya's most breathtaking landscapes",
            "Cross-border partnership opportunities",
            "Practical frameworks for scaling globally"
        ],
        forWho: "CEOs, executives, founders, and visionary team leaders seeking to transform their leadership and expand globally.",
        pricing: "Contact for retreat packages",
        link: "https://www.stephenakintayo.com/kenyaretreat"
    }
};

const openModal = (id) => {
    const data = eventDetails[id];
    if (!data) return;

    const content = `
        <div class="modal-header">
            <div class="badge-row" style="margin-bottom:1rem"><span style="display:inline-flex;padding:0.3rem 0.8rem;border-radius:9999px;font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;background:var(--accent-glow);color:var(--accent-primary)">${data.category}</span></div>
            <h2 style="font-size:2rem;font-weight:800;margin-bottom:0.5rem;font-family:var(--font-heading);letter-spacing:-0.025em">${data.title}</h2>
            <div style="display:flex;align-items:center;gap:1rem;color:var(--accent-primary);font-weight:700;font-size:0.85rem;text-transform:uppercase;letter-spacing:0.06em">
                <span>${data.location}</span>
                <span style="width:4px;height:4px;border-radius:50%;background:var(--accent-primary)"></span>
                <span>${data.date}</span>
            </div>
        </div>
        <div>
            <p style="font-size:1.05rem;line-height:1.75;color:var(--text-secondary);margin:2rem 0">${data.description}</p>
            
            <div style="margin-bottom:2.5rem">
                <h3 style="font-size:1.15rem;font-weight:800;margin-bottom:1.25rem;font-family:var(--font-heading)">What you'll gain</h3>
                <ul style="list-style:none;display:flex;flex-direction:column;gap:0.85rem">
                    ${data.highlights.map(item => `
                        <li style="display:flex;gap:0.75rem;align-items:flex-start">
                            <i data-lucide="check-circle" style="width:20px;height:20px;color:var(--accent-primary);flex-shrink:0;margin-top:2px"></i> 
                            <span style="font-size:0.95rem;color:var(--text-secondary);line-height:1.5">${item}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>

            <div style="padding:1.75rem;background:var(--bg-secondary);border-radius:var(--radius-lg);border:1px solid var(--border-main);margin-bottom:2.5rem">
                <div style="margin-bottom:1.25rem">
                    <h4 style="font-size:0.75rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--text-muted);margin-bottom:0.5rem;font-weight:700">Who it's for</h4>
                    <p style="font-weight:600;color:var(--text-primary);font-size:1rem;line-height:1.6">${data.forWho}</p>
                </div>
                <div style="height:1px;background:var(--border-main);margin:1rem 0"></div>
                <div>
                    <h4 style="font-size:0.75rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--text-muted);margin-bottom:0.5rem;font-weight:700">Pricing</h4>
                    <p style="font-size:0.95rem;color:var(--text-secondary);font-weight:500">${data.pricing}</p>
                </div>
            </div>

            <div>
                <a href="${data.link}" target="_blank" class="btn btn-primary btn-large btn-full">Register Now</a>
                <p style="text-align:center;font-size:0.82rem;color:var(--text-muted);margin-top:0.75rem;font-weight:500">Opens registration page in a new tab</p>
            </div>
        </div>
    `;

    modalBody.innerHTML = content;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    lucide.createIcons();
};

const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
};

// Event Listeners for Modal (featured cards)
document.addEventListener('click', (e) => {
    const outlineBtn = e.target.closest('.retreat-card .btn-outline-sm');
    if (outlineBtn) {
        // If it's an actual link (has href with http), let it go through
        // Otherwise open modal
        e.preventDefault();
        const card = e.target.closest('.retreat-card');
        if (card) openModal(card.dataset.id);
    }
});

modalClose.addEventListener('click', closeModal);
backdrop.addEventListener('click', closeModal);

// Keyboard close
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// ──────────────── Back to Top ────────────────
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ──────────────── Scroll Reveal Animation ────────────────
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section, .retreat-card, .bento-card, .why-item, .event-row').forEach((el, i) => {
    el.setAttribute('data-reveal', '');
    el.style.transitionDelay = `${(i % 8) * 0.06}s`;
    observer.observe(el);
});

// ──────────────── Animated Stat Counter ────────────────
const statNumbers = document.querySelectorAll('.stat-number[data-target]');
let statsAnimated = false;

const animateStats = () => {
    if (statsAnimated) return;
    statsAnimated = true;
    statNumbers.forEach(el => {
        const target = parseInt(el.dataset.target);
        const duration = 2000;
        const startTime = performance.now();

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);

            const current = Math.floor(target * eased);
            // Format large numbers with commas
            el.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target.toLocaleString();
            }
        };
        requestAnimationFrame(update);
    });
};

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    statsObserver.observe(heroStats);
}

// ──────────────── Duplicate Testimonial Track ────────────────
const testimonialTrack = document.getElementById('testimonial-track');
if (testimonialTrack) {
    const cards = testimonialTrack.innerHTML;
    testimonialTrack.innerHTML = cards + cards;
}

// ──────────────── Event Row Opacity Transition ────────────────
document.querySelectorAll('.event-row').forEach(row => {
    row.style.transition = 'opacity 0.3s ease, padding 0.3s ease, background 0.3s ease';
});
