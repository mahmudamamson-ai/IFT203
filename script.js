document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const exploreBtn = document.querySelector('.active-link-trigger');

    // Section Switcher Router Engine
    function switchPage(targetId) {
        // Strip out the hash if it exists
        const id = targetId.replace('#', '');
        
        sections.forEach(section => {
            if(section.id === id) {
                section.classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                section.classList.remove('active');
            }
        });

        // Update Nav link visual treatments
        navLinks.forEach(link => {
            if(link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Sync Browser URL state history
        if(history.pushState) {
            history.pushState(null, null, `#${id}`);
        } else {
            location.hash = `#${id}`;
        }
    }

    // Nav Click Event Observers
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            switchPage(target);
            
            // Close responsive menu layer if open
            if(navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });

    // Landing Page Action Button Trigger Link
    if(exploreBtn) {
        exploreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            switchPage('#about');
        });
    }

    // Mobile Responsive Slide-out Overlay Menu Controller
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        if(navMenu.classList.contains('open')) {
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Deep Linking Engine Hook (Handles initial page refresh load states)
    if(window.location.hash) {
        const initialHash = window.location.hash;
        // Verify section target accurately matches layout
        if(document.querySelector(initialHash)) {
            switchPage(initialHash);
        }
    }
});
