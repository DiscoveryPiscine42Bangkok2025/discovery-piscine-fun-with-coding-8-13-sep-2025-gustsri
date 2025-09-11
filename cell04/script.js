// Portfolio Selection and Navigation JavaScript

// Global state
let currentPortfolio = 'selection';

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
    setupEventListeners();
    setupAnimations();
});

// Initialize portfolio
function initializePortfolio() {
    showSelection();
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a, button');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navigation background change on scroll
    window.addEventListener('scroll', handleScroll);
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(e) {
        if (e.state && e.state.portfolio) {
            currentPortfolio = e.state.portfolio;
            updatePortfolioDisplay();
        }
    });
}

// Handle scroll events
function handleScroll() {
    const nav = document.querySelector('nav');
    if (nav) {
        if (window.scrollY > 50) {
            nav.classList.add('bg-white/95', 'shadow-lg');
            nav.classList.remove('bg-white/90');
        } else {
            nav.classList.add('bg-white/90');
            nav.classList.remove('bg-white/95', 'shadow-lg');
        }
    }
}

// Show selection page
function showSelection() {
    currentPortfolio = 'selection';
    updatePortfolioDisplay();
    updateURL();
    document.title = 'Portfolio Showcase';
}

// Show specific portfolio
function showPortfolio(person) {
    currentPortfolio = person;
    updatePortfolioDisplay();
    updateURL();
    
    // Update page title
    if (person === 'kanitphong') {
        document.title = 'Kanitphong Sricharoen - Portfolio';
    } else if (person === 'jessada') {
        document.title = 'Jessada Taengsuwan - Portfolio';
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Update portfolio display
function updatePortfolioDisplay() {
    // Hide all sections
    const sections = document.querySelectorAll('.portfolio-section');
    sections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });
    
    // Show appropriate section
    let targetSection;
    if (currentPortfolio === 'selection') {
        targetSection = document.getElementById('selection');
    } else if (currentPortfolio === 'kanitphong') {
        targetSection = document.getElementById('kanitphong-portfolio');
    } else if (currentPortfolio === 'jessada') {
        targetSection = document.getElementById('jessada-portfolio');
    }
    
    if (targetSection) {
        targetSection.style.display = 'block';
        targetSection.classList.add('active');
        
        // Trigger fade-in animations
        setTimeout(() => {
            const fadeElements = targetSection.querySelectorAll('.fade-in-up');
            fadeElements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }, 50);
    }
    
    // Update navigation active states
    updateNavigationStates();
}

// Update URL without page reload
function updateURL() {
    const url = currentPortfolio === 'selection' ? '/' : `/${currentPortfolio}`;
    history.pushState({ portfolio: currentPortfolio }, '', url);
}

// Update navigation active states
function updateNavigationStates() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('text-purple-600', 'font-bold');
        link.classList.add('text-gray-700');
    });
    
    // Highlight active navigation
    if (currentPortfolio === 'selection') {
        const homeLinks = document.querySelectorAll('a[href="#selection"]');
        homeLinks.forEach(link => {
            link.classList.add('text-purple-600', 'font-bold');
            link.classList.remove('text-gray-700');
        });
    }
}

// Setup animations
function setupAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    setTimeout(() => {
        document.querySelectorAll('.fade-in-up').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });
    }, 100);
}

// Contact form handling (if needed in the future)
function handleContactForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Show success message
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            
            // Reset form
            form.reset();
        });
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg text-white font-semibold transition-all duration-300 transform translate-x-full`;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.classList.add('bg-green-500');
            break;
        case 'error':
            notification.classList.add('bg-red-500');
            break;
        case 'warning':
            notification.classList.add('bg-yellow-500');
            break;
        default:
            notification.classList.add('bg-blue-500');
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Utility functions
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerOffset = 80;
        const elementPosition = section.offsetTop;
        const offsetPosition = elementPosition - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // ESC key to go back to selection
    if (e.key === 'Escape' && currentPortfolio !== 'selection') {
        showSelection();
    }
    
    // Arrow keys for navigation (if on selection page)
    if (currentPortfolio === 'selection') {
        if (e.key === 'ArrowLeft') {
            showPortfolio('kanitphong');
        } else if (e.key === 'ArrowRight') {
            showPortfolio('jessada');
        }
    }
});

// Handle portfolio card clicks with smooth transition
function handlePortfolioCardClick(person) {
    const card = event.currentTarget;
    
    // Add click effect
    card.style.transform = 'scale(0.95)';
    setTimeout(() => {
        card.style.transform = 'scale(1.05)';
        setTimeout(() => {
            showPortfolio(person);
        }, 150);
    }, 100);
}

// Preload portfolio sections for smooth transitions
function preloadPortfolios() {
    const portfolios = ['kanitphong-portfolio', 'jessada-portfolio'];
    portfolios.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            // Preload images and content
            const images = section.querySelectorAll('img');
            images.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            });
        }
    });
}

// Initialize preloading after page load
window.addEventListener('load', preloadPortfolios);

// Handle window resize
window.addEventListener('resize', function() {
    // Close mobile menu on resize
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu && window.innerWidth >= 768) {
        mobileMenu.classList.add('hidden');
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handler
window.removeEventListener('scroll', handleScroll);
window.addEventListener('scroll', debounce(handleScroll, 10));

// Export functions for global use
window.showSelection = showSelection;
window.showPortfolio = showPortfolio;
window.scrollToTop = scrollToTop;
window.scrollToSection = scrollToSection;