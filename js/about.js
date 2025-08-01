// About Page JavaScript for 「慧视」AI金融洞察引擎

document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initTimelineAnimations();
    initEcosystemAnimation();
    initContactAnimations();
});

// Initialize scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
    
    // Observe journey items
    document.querySelectorAll('.journey-item').forEach(el => {
        observer.observe(el);
    });
    
    // Observe philosophy cards
    document.querySelectorAll('.philosophy-card').forEach(el => {
        observer.observe(el);
    });
    
    // Observe vision items
    document.querySelectorAll('.vision-item').forEach(el => {
        observer.observe(el);
    });
    
    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach(el => {
        observer.observe(el);
    });
}

// Timeline animations
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                const delay = Array.from(timelineItems).indexOf(item) * 200;
                
                setTimeout(() => {
                    item.classList.add('aos-animate');
                    
                    // Add special animation for active item
                    if (item.classList.contains('active')) {
                        const marker = item.querySelector('.timeline-marker');
                        marker.style.animation = 'pulse 2s ease-in-out infinite';
                    }
                }, delay);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// Web3 Ecosystem Animation
function initEcosystemAnimation() {
    const ecosystemCenter = document.querySelector('.ecosystem-center');
    const ecosystemNodes = document.querySelectorAll('.ecosystem-node');
    
    if (!ecosystemCenter) return;
    
    // Add hover effects to ecosystem nodes
    ecosystemNodes.forEach(node => {
        node.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 10px 25px rgba(79, 70, 229, 0.3)';
        });
        
        node.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Add click effect to center
    ecosystemCenter.addEventListener('click', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'centerPulse 2s ease-in-out infinite';
        }, 100);
    });
}

// Contact animations
function initContactAnimations() {
    const contactMethods = document.querySelectorAll('.contact-method');
    const floatingElements = document.querySelectorAll('.floating-element');
    
    // Contact method hover effects
    contactMethods.forEach(method => {
        method.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.contact-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        method.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.contact-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Floating elements interaction
    floatingElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'scale(1.2)';
            this.style.filter = 'drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3))';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = 'scale(1)';
            this.style.filter = 'none';
        });
    });
}

// Philosophy card interactions
document.addEventListener('DOMContentLoaded', function() {
    const philosophyCards = document.querySelectorAll('.philosophy-card');
    
    philosophyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.card-icon svg');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.card-icon svg');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
});

// Journey item progressive reveal
function initJourneyReveal() {
    const journeyItems = document.querySelectorAll('.journey-item');
    
    const journeyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                const index = Array.from(journeyItems).indexOf(item);
                
                setTimeout(() => {
                    item.classList.add('aos-animate');
                    
                    // Add typewriter effect to text
                    const text = item.querySelector('p');
                    if (text) {
                        text.style.opacity = '0';
                        setTimeout(() => {
                            text.style.opacity = '1';
                            text.style.transition = 'opacity 0.5s ease';
                        }, 300);
                    }
                }, index * 300);
            }
        });
    }, {
        threshold: 0.3
    });
    
    journeyItems.forEach(item => {
        journeyObserver.observe(item);
    });
}

// Initialize journey reveal
document.addEventListener('DOMContentLoaded', initJourneyReveal);

// Smooth scroll for internal links
document.addEventListener('DOMContentLoaded', function() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add parallax effect to hero section
document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.about-hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
});

// Brain nodes interaction
document.addEventListener('DOMContentLoaded', function() {
    const brainNodes = document.querySelectorAll('.brain-node');
    
    brainNodes.forEach((node, index) => {
        node.addEventListener('mouseenter', function() {
            // Pause animation and highlight
            this.style.animationPlayState = 'paused';
            this.style.transform = 'scale(1.2)';
            this.style.boxShadow = '0 0 30px rgba(79, 70, 229, 0.6)';
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: rgba(79, 70, 229, 0.3);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        node.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
        });
    });
});

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            width: 120px;
            height: 120px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Vision numbers animation
document.addEventListener('DOMContentLoaded', function() {
    const visionNumbers = document.querySelectorAll('.vision-number');
    
    visionNumbers.forEach(number => {
        number.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(360deg)';
            this.style.transition = 'transform 0.5s ease';
        });
        
        number.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});

// Add loading animation for the page
window.addEventListener('load', function() {
    document.body.classList.add('page-loaded');
});

// Add page loading styles
const pageLoadingStyle = document.createElement('style');
pageLoadingStyle.textContent = `
    body:not(.page-loaded) .about-hero .hero-content {
        opacity: 0;
        transform: translateY(50px);
    }
    
    body.page-loaded .about-hero .hero-content {
        opacity: 1;
        transform: translateY(0);
        transition: all 1s ease 0.3s;
    }
`;
document.head.appendChild(pageLoadingStyle);
