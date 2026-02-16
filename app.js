// Retreats Data
const retreatsData = {
    'dubai-2026': {
        title: "Wealth & Investment Tour",
        location: "Dubai, UAE",
        date: "April 2026",
        category: "Investment",
        description: "The ultimate guide to real estate and business expansion in the Middle East.",
        fullDetails: {
            gain: [
                "Direct access to off-plan real estate deals at developer prices",
                "Understand the legal framework for business setup in the UAE",
                "Exclusive networking with Dubai's top billionaire investors",
                "Personalized investment consultation with Stephen Akintayo"
            ],
            forWho: "Serious investors, real estate moguls, and business owners looking to diversify their portfolio into the Middle East.",
            included: "5-star luxury accommodation, private yacht networking session, VIP desert safari, guided investment tours, all meals during sessions.",
            link: "#apply"
        }
    },
    'london-2026': {
        title: "The Global Leader Mastermind",
        location: "London, UK",
        date: "July 2026",
        category: "Mastermind",
        description: "Scale your influence and operations with top-tier UK-based mentors.",
        fullDetails: {
            gain: [
                "Mastery of global team management and scaling systems",
                "Strategic insights into the UK financial markets and stock exchange",
                "High-level branding and positioning strategies for global authority",
                "One-on-one leadership audit with international mentors"
            ],
            forWho: "CEO's, founders of growth-stage startups, and established entrepreneurs seeking global dominance.",
            included: "Central London premium stay, curated dinners at historic venues, private boardroom sessions, luxury chauffeur services.",
            link: "#apply"
        }
    },
    'maldives-2026': {
        title: "Strategic Clarity Retreat",
        location: "Maldives",
        date: "Sept 2026",
        category: "Global Expansion",
        description: "Unhindered deep work and strategic planning in a luxury paradise.",
        fullDetails: {
            gain: [
                "12-month strategic roadmap for your business and wealth",
                "Deep-work sessions focused on core product development",
                "Mental clarity drills and high-performance lifestyle coaching",
                "Intimate bonding with a tiny cohort of high-net-worth peers"
            ],
            forWho: "Visionary leaders who need to step back from the 'daily grind' to work ON their business instead of IN it.",
            included: "Overwater villa stay, seaplane transfers, private beach brainstorming sessions, holistic wellness program.",
            link: "#apply"
        }
    },
    'past-dubai': {
        title: "Dubai 2024: The Investment Blueprint",
        recap: "A 5-day intensive tour that explored the fastest-growing real estate markets in Dubai, featuring sessions with industry giants.",
        outcomes: [
            "Over $12M in total investment commitments made by attendees",
            "4 multi-national partnerships formed on the final night",
            "3 attendees successfully incorporated UAE-based branches within 30 days"
        ],
        images: ["https://images.unsplash.com/photo-1582653280603-eb5209282302?auto=format&fit=crop&q=80&w=1000", "https://images.unsplash.com/photo-1512453979798-5ea4e73ad94d?auto=format&fit=crop&q=80&w=1000"]
    },
    'past-london': {
        title: "London 2025: Scaling Global",
        recap: "A high-powered mastermind focused on taking African and emerging market brands to the global stage.",
        outcomes: [
            "2 startups secured Series A funding intros",
            "Comprehensive scaling manual provided to every attendee",
            "Lifetime mastermind alumni access established"
        ],
        images: ["https://images.unsplash.com/photo-1543716627-839b56149544?auto=format&fit=crop&q=80&w=1000", "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=1000"]
    },
    'past-usa': {
        title: "USA Tour 2023: Market Entry",
        recap: "A multi-city tour through Houston, New York, and DC focusing on real estate and tech partnerships.",
        outcomes: [
            "Direct connections to US-based venture capital",
            "2,000+ total combined years of experience in the room",
            "A collaborative deal-flow network between US and African investors"
        ],
        images: ["https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000", "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1000"]
    }
};

// Initialize Lucide Icons
lucide.createIcons();

// Theme Toggle Logic
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

// Header Scroll Effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
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

// Filtering Logic
const filterButtons = document.querySelectorAll('.pill');
const retreatCards = document.querySelectorAll('.retreat-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        retreatCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
                setTimeout(() => card.style.opacity = '1', 10);
            } else {
                card.style.opacity = '0';
                setTimeout(() => card.style.display = 'none', 300);
            }
        });
    });
});

// Modal Logic
const modal = document.getElementById('retreat-modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');
const backdrop = document.querySelector('.modal-backdrop');

const openModal = (id) => {
    const data = retreatsData[id];
    if (!data) return;

    let content = '';

    if (data.fullDetails) {
        // Upcoming Retreat Template
        content = `
            <div class="modal-header">
                <div class="badge-row"><span class="badge">${data.category}</span></div>
                <h2 class="modal-title" style="font-size: 2.25rem; font-weight: 800; margin-bottom: 0.5rem;">${data.title}</h2>
                <div class="card-meta" style="color: var(--accent-primary); font-weight: 700; font-size: 0.9rem;">
                    <span>${data.location}</span>
                    <span class="dot"></span>
                    <span>${data.date}</span>
                </div>
            </div>
            <div class="modal-body-content">
                <p class="modal-description" style="font-size: 1.125rem; line-height: 1.8; color: var(--text-secondary); margin-bottom: 2.5rem;">${data.description}</p>
                
                <div class="modal-info-grid" style="display: grid; gap: 2.5rem;">
                    <div>
                        <h3 class="modal-sub" style="font-size: 1.25rem; font-weight: 800; margin-bottom: 1.25rem;">What you’ll gain</h3>
                        <ul class="why-list" style="margin-top: 0;">
                            ${data.fullDetails.gain.map(item => `
                                <li style="margin-bottom: 1.25rem;">
                                    <i data-lucide="check-circle" class="check-icon" style="color: var(--accent-primary);"></i> 
                                    <span style="font-size: 1.05rem; color: var(--text-secondary);">${item}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>

                    <div style="padding: 2rem; background-color: var(--bg-secondary); border-radius: var(--radius-lg); border: 1px solid var(--border-main);">
                        <h3 class="modal-sub" style="font-size: 1rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); margin-bottom: 1rem;">Who it’s for</h3>
                        <p style="font-weight: 600; color: var(--text-primary); font-size: 1.1rem; line-height: 1.6;">${data.fullDetails.forWho}</p>
                        
                        <div style="height: 1px; background-color: var(--border-main); margin: 1.5rem 0;"></div>
                        
                        <h3 class="modal-sub" style="font-size: 1rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); margin-bottom: 1rem;">What’s included</h3>
                        <p style="font-size: 0.95rem; color: var(--text-secondary);">${data.fullDetails.included}</p>
                    </div>
                </div>

                <div class="modal-footer" style="margin-top: 4rem;">
                    <a href="${data.fullDetails.link}" class="btn btn-primary btn-large btn-full">Submit Your Application</a>
                    <p style="text-align: center; font-size: 0.85rem; color: var(--text-muted); margin-top: 1rem; font-weight: 600;">Applications reviewed within 24–48 hours</p>
                </div>
            </div>
        `;
    } else {
        // Past Retreat Template
        content = `
            <div class="modal-header">
                <h2 class="modal-title" style="font-size: 2.25rem; font-weight: 800; margin-bottom: 1rem;">${data.title}</h2>
            </div>
            <div class="modal-body-content">
                <div class="modal-gallery" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 3rem;">
                    ${data.images.map(img => `<img src="${img}" alt="Gallery image" style="border-radius: 12px; aspect-ratio: 16/10; object-fit: cover; box-shadow: var(--shadow-sm);">`).join('')}
                </div>
                <div class="modal-info-grid" style="display: grid; gap: 2.5rem;">
                    <div>
                        <h3 class="modal-sub" style="font-size: 1.25rem; font-weight: 800; margin-bottom: 1rem;">Event Recap</h3>
                        <p style="font-size: 1.1rem; line-height: 1.7; color: var(--text-secondary);">${data.recap}</p>
                    </div>
                    <div>
                        <h3 class="modal-sub" style="font-size: 1.25rem; font-weight: 800; margin-bottom: 1.25rem;">Key Outcomes</h3>
                        <ul class="why-list" style="margin-top: 0;">
                            ${data.outcomes.map(item => `
                                <li style="margin-bottom: 1.25rem;">
                                    <i data-lucide="award" class="check-icon" style="color: var(--accent-primary);"></i> 
                                    <span style="font-size: 1.05rem; color: var(--text-secondary);">${item}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }

    modalBody.innerHTML = content;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    lucide.createIcons();
};

const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
};

// Event Listeners for Modal
document.addEventListener('click', (e) => {
    if (e.target.closest('.open-modal')) {
        const card = e.target.closest('.retreat-card');
        openModal(card.dataset.id);
    }
    if (e.target.closest('.past-card')) {
        openModal(e.target.closest('.past-card').dataset.id);
    }
});

modalClose.addEventListener('click', closeModal);
backdrop.addEventListener('click', closeModal);

// Back to Top Logic
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

// Scroll Reveal Animation (Intersection Observer)
const revealElements = document.querySelectorAll('[data-reveal]');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

// Add reveal attributes to sections dynamically for cleaner HTML
document.querySelectorAll('section, .retreat-card, .feature-card, .testimonial-card').forEach((el, i) => {
    el.setAttribute('data-reveal', '');
    observer.observe(el);
});
