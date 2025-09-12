
document.addEventListener('DOMContentLoaded', function () {
    if (!('scrollBehavior' in document.documentElement.style)) {
        const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
        smoothScrollLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
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
    }
    document.addEventListener('click', function (event) {
        const mobileToggle = document.getElementById('mobile-menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');

        if (mobileToggle && mobileMenu && mobileToggle.checked) {
            if (!event.target.closest('nav')) {
                mobileToggle.checked = false;
            }
        }
    });
});
window.scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });