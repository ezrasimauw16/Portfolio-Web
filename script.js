document.addEventListener("DOMContentLoaded", () => {

    // ============================================
    // SCROLL REVEAL (.reveal classes)
    // ============================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // ============================================
    // SCROLL REVEAL FOR IMAGES & CARDS
    // ============================================
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    document.querySelectorAll('.photo-item, .album-card, .glass-card, .service-card').forEach((el, i) => {
        el.classList.add('scroll-reveal');
        const delays = ['delay-100', 'delay-200', 'delay-300', 'delay-400', 'delay-500'];
        el.classList.add(delays[i % delays.length]);
        scrollObserver.observe(el);
    });

    // ============================================
    // HOVER OVERLAY INJECTION
    // ============================================
    document.querySelectorAll('.photo-item').forEach(item => {
        if (item.querySelector('.hover-overlay')) return;
        if (item.classList.contains('no-overlay')) return;

        const img = item.querySelector('img');
        const altText = img ? img.alt : 'View';

        const overlay = document.createElement('div');
        overlay.classList.add('hover-overlay');

        const label = document.createElement('span');
        label.classList.add('hover-label');
        label.textContent = altText;

        overlay.appendChild(label);
        item.appendChild(overlay);
    });

    // ============================================
    // DARK / LIGHT MODE
    // ============================================
    const toggleSwitch = document.querySelector('#checkbox');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    document.documentElement.setAttribute('data-theme', currentTheme);

    if (toggleSwitch) {
        toggleSwitch.checked = currentTheme === 'light';
        toggleSwitch.addEventListener('change', (e) => {
            const theme = e.target.checked ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        });
    }

    // ============================================
    // TYPEWRITER
    // ============================================
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const textToType = typewriterElement.getAttribute('data-text');
        typewriterElement.innerHTML = '';
        let i = 0;

        function typeWriter() {
            if (i < textToType.length) {
                typewriterElement.innerHTML += textToType.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                typewriterElement.innerHTML += '<span class="blinking-cursor">|</span>';
            }
        }
        setTimeout(typeWriter, 600);
    }

    // ============================================
    // CUSTOM CURSOR (mouse/desktop only)
    // ============================================
    if (window.matchMedia("(pointer: fine)").matches) {
        const cursorDot = document.createElement('div');
        cursorDot.classList.add('custom-cursor-dot');
        document.body.appendChild(cursorDot);

        const cursorOutline = document.createElement('div');
        cursorOutline.classList.add('custom-cursor-outline');
        document.body.appendChild(cursorOutline);

        window.addEventListener('mousemove', (e) => {
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
            cursorOutline.animate(
                { left: e.clientX + 'px', top: e.clientY + 'px' },
                { duration: 500, fill: "forwards" }
            );
        });

        document.querySelectorAll('a, button, .gallery-item, .photo-item, .album-card').forEach(el => {
            el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover-active'));
            el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover-active'));
        });
    }

    // ============================================
    // PAGE TRANSITION
    // ============================================
    document.querySelectorAll('nav a, .back-link').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.target !== '_blank' && this.href.includes('.html')) {
                e.preventDefault();
                const targetUrl = this.href;
                document.body.classList.add('fade-out');
                setTimeout(() => { window.location.href = targetUrl; }, 400);
            }
        });
    });

    // ============================================
    // LIGHTBOX (index.html gallery section)
    // ============================================
    window.openLightbox = function(element) {
        const imgSrc = element.querySelector('img').src;
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        if (!lightbox || !lightboxImg) return;
        lightboxImg.src = imgSrc;
        lightbox.style.display = 'flex';
    };

    window.closeLightbox = function() {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) lightbox.style.display = 'none';
    };

    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) window.closeLightbox();
        });
    }

    // ============================================
    // READ MORE / READ LESS
    // ============================================
    window.toggleReadMore = function(button) {
        const contentDiv = button.parentElement.querySelector('.extended-content');
        const isShowing = contentDiv.classList.toggle('show');
        button.innerHTML = isShowing ? 'Read Less &uarr;' : 'Read More &darr;';
    };

    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 300);
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

});