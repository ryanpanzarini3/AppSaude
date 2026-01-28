// Animações e efeitos gerais do site
document.addEventListener('DOMContentLoaded', function() {
    // Ícones Feather
    if (typeof feather !== 'undefined') {
        feather.replace();
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar cards
    document.querySelectorAll('.card, .quick-access-card').forEach(el => {
        observer.observe(el);
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

    // Add scroll shadow to navbar
    const navbar = document.querySelector('custom-navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 10) {
                navbar.style.boxShadow = '0 10px 30px rgba(15, 107, 255, 0.2)';
            } else {
                navbar.style.boxShadow = '0 4px 20px rgba(15, 107, 255, 0.2)';
            }
        });
    }

    // Ripple effect on buttons
    document.querySelectorAll('button, a.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Counter animation
    const counters = document.querySelectorAll('[data-target]');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        // Start animation when element comes into view
        observer.observe(counter);
    });

    // Mobile menu close on link click
    const navbar = document.querySelector('custom-navbar');
    if (navbar) {
        const shadowRoot = navbar.shadowRoot;
        if (shadowRoot) {
            const mobileMenu = shadowRoot.getElementById('mobileMenu');
            if (mobileMenu) {
                const links = mobileMenu.querySelectorAll('.nav-link');
                links.forEach(link => {
                    link.addEventListener('click', () => {
                        mobileMenu.classList.remove('active');
                    });
                });
            }
        }
    }
});

// Ripple effect styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    button, a.btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(rippleStyle);
