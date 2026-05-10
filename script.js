document.addEventListener("DOMContentLoaded", () => {

    
    
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    
    
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    document.querySelectorAll('.glass-card, .service-card').forEach((el, i) => {
        el.classList.add('scroll-reveal');
        const delays = ['delay-100', 'delay-200', 'delay-300', 'delay-400', 'delay-500'];
        el.classList.add(delays[i % delays.length]);
        scrollObserver.observe(el);
    });

    
    
    
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

    
    
    
    window.toggleReadMore = function(button) {
        const contentDiv = button.parentElement.querySelector('.extended-content');
        const isShowing = contentDiv.classList.toggle('show');
        button.innerHTML = isShowing ? 'Read Less &uarr;' : 'Read More &darr;';
    };

    
    
    
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 300);
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    
    
    
    (function() {
        const bar = document.createElement('div');
        bar.id = 'scroll-progress';
        document.body.appendChild(bar);
        window.addEventListener('scroll', () => {
            const total = document.documentElement.scrollHeight - window.innerHeight;
            const pct   = total > 0 ? (window.scrollY / total) * 100 : 0;
            bar.style.width = pct + '%';
        }, { passive: true });
    })();

    
    
    
    (function() {
        if (!window.matchMedia("(pointer: fine)").matches) return;
        const TRAIL_COUNT = 12;
        const dots = [];
        for (let i = 0; i < TRAIL_COUNT; i++) {
            const d = document.createElement('div');
            d.className = 'cursor-trail-dot';
            d.style.opacity = (1 - i / TRAIL_COUNT) * 0.7;
            d.style.width = d.style.height = (8 - i * 0.4) + 'px';
            document.body.appendChild(d);
            dots.push({ el: d, x: 0, y: 0 });
        }
        let mouseX = 0, mouseY = 0;
        window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
        function animateTrail() {
            let x = mouseX, y = mouseY;
            dots.forEach((dot, i) => {
                dot.el.style.left = x + 'px';
                dot.el.style.top  = y + 'px';
                if (i < dots.length - 1) {
                    x += (dots[i + 1].x - x) * 0.4;
                    y += (dots[i + 1].y - y) * 0.4;
                }
                dot.x = parseFloat(dot.el.style.left);
                dot.y = parseFloat(dot.el.style.top);
            });
            requestAnimationFrame(animateTrail);
        }
        animateTrail();
    })();

    
    
    
    (function() {
        document.querySelectorAll('.photo-item img, .album-image, .gallery-item img').forEach(img => {
            if (img.complete) return;
            const parent = img.parentElement;
            parent.classList.add('skeleton-loading');
            img.addEventListener('load',  () => parent.classList.remove('skeleton-loading'));
            img.addEventListener('error', () => parent.classList.remove('skeleton-loading'));
        });
    })();

    
    
    


    
    
    
    function showEggToast(html, duration = 3500) {
        const toast = document.createElement('div');
        toast.innerHTML = html;
        Object.assign(toast.style, {
            position: 'fixed', bottom: '40px', left: '50%',
            transform: 'translateX(-50%) translateY(20px)',
            background: '#7B8CFF', color: '#04052E',
            fontFamily: "'Outfit', sans-serif", fontWeight: '700',
            fontSize: '0.95rem', letterSpacing: '0.5px',
            padding: '14px 28px', borderRadius: '40px',
            zIndex: '99999', opacity: '0',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
            whiteSpace: 'nowrap', boxShadow: '0 0 30px rgba(123,140,255,0.6)',
            pointerEvents: 'none'
        });
        document.body.appendChild(toast);
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) translateY(0)';
        });
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(20px)';
            setTimeout(() => toast.remove(), 400);
        }, duration);
    }

    
    
    
    
    (function() {
        const secret = 'ezra';
        let buffer = '';
        document.addEventListener('keypress', (e) => {
            buffer = (buffer + e.key).slice(-secret.length);
            if (buffer.toLowerCase() === secret) {
                buffer = '';
                document.body.style.transition = 'transform 0.6s cubic-bezier(.68,-0.55,.27,1.55)';
                document.body.style.transform = 'rotate(180deg)';
                showEggToast('🌀 Ezra flipped the world!');
                setTimeout(() => {
                    document.body.style.transform = 'rotate(0deg)';
                    setTimeout(() => { document.body.style.transition = ''; }, 600);
                }, 1800);
            }
        });
    })();

    
    
    
    
    (function() {
        let clickCount = 0;
        let clickTimer = null;

        document.querySelector('nav')?.addEventListener('click', () => {
            clickCount++;
            clearTimeout(clickTimer);
            clickTimer = setTimeout(() => { clickCount = 0; }, 500);
            if (clickCount >= 3) {
                clickCount = 0;
                showEggToast('👾 System override initiated…');
                launchMatrixRain();
            }
        });

        function launchMatrixRain() {
            const canvas = document.createElement('canvas');
            canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:99990;pointer-events:none;opacity:0;transition:opacity 0.5s ease;';
            document.body.appendChild(canvas);
            requestAnimationFrame(() => { canvas.style.opacity = '0.18'; });

            const ctx = canvas.getContext('2d');
            canvas.width  = window.innerWidth;
            canvas.height = window.innerHeight;

            const cols = Math.floor(canvas.width / 16);
            const drops = Array(cols).fill(1);
            const chars = 'EZRASTEVESIMAUW01アイウエオカキクケコ';

            const interval = setInterval(() => {
                ctx.fillStyle = 'rgba(2,1,10,0.08)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#7B8CFF';
                ctx.font = '14px monospace';
                drops.forEach((y, i) => {
                    const char = chars[Math.floor(Math.random() * chars.length)];
                    ctx.fillText(char, i * 16, y * 16);
                    if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
                    drops[i]++;
                });
            }, 50);

            setTimeout(() => {
                clearInterval(interval);
                canvas.style.opacity = '0';
                setTimeout(() => canvas.remove(), 500);
            }, 4000);
        }
    })();

    
    
    
    
    (function() {
        const footer = document.querySelector('footer');
        if (!footer) return;
        let holdTimer = null;

        const startHold = () => {
            holdTimer = setTimeout(() => {
                spawnMusicNotes();
                showEggToast('🎵 Music is the soul of everything.');
            }, 2000);
        };
        const cancelHold = () => clearTimeout(holdTimer);

        footer.addEventListener('mousedown',  startHold);
        footer.addEventListener('mouseup',    cancelHold);
        footer.addEventListener('mouseleave', cancelHold);
        footer.addEventListener('touchstart', startHold, { passive: true });
        footer.addEventListener('touchend',   cancelHold);

        function spawnMusicNotes() {
            if (!document.getElementById('note-float-style')) {
                const s = document.createElement('style');
                s.id = 'note-float-style';
                s.textContent = `@keyframes note-float {
                    0%   { transform: translateY(0)     rotate(0deg);   opacity: 1; }
                    100% { transform: translateY(-90vh) rotate(40deg);  opacity: 0; }
                }`;
                document.head.appendChild(s);
            }
            const notes = ['♩','♪','♫','♬','𝄞','🎵','🎶'];
            for (let i = 0; i < 40; i++) {
                const el = document.createElement('div');
                el.textContent = notes[Math.floor(Math.random() * notes.length)];
                const size     = Math.random() * 1.4 + 0.8;
                const startX   = Math.random() * window.innerWidth;
                const duration = Math.random() * 2000 + 1500;
                const delay    = Math.random() * 800;
                Object.assign(el.style, {
                    position: 'fixed', bottom: '0px', left: startX + 'px',
                    fontSize: size + 'rem', color: '#7B8CFF',
                    zIndex: '99997', pointerEvents: 'none', opacity: '1',
                    animation: `note-float ${duration}ms ${delay}ms ease-out forwards`,
                });
                document.body.appendChild(el);
                setTimeout(() => el.remove(), duration + delay + 100);
            }
        }
    })();

    
    
    
    
    (function() {
        let clicks = 0;
        let timer  = null;
        const btn  = document.getElementById('back-to-top');
        if (!btn) return;

        btn.addEventListener('click', (e) => {
            clicks++;
            clearTimeout(timer);
            timer = setTimeout(() => { clicks = 0; }, 1500);
            if (clicks >= 5) {
                clicks = 0;
                document.body.style.transition = 'transform 0.4s ease';
                document.body.style.transformOrigin = 'center center';
                document.body.style.transform = 'scale(1.15)';
                showEggToast('🚀 To infinity and beyond — Ezra.');
                setTimeout(() => {
                    document.body.style.transform = 'scale(1)';
                    setTimeout(() => { document.body.style.transition = ''; }, 400);
                }, 1200);
            }
        });
    })();



    /* ============================================
       HAMBURGER MENU
       ============================================ */
    (function() {
        const hamburger = document.querySelector('.hamburger');
        const navLinks  = document.querySelector('.nav-links');
        if (!hamburger || !navLinks) return;

        function closeMenu() {
            hamburger.classList.remove('open');
            navLinks.classList.remove('open');
        }

        function openMenu() {
            hamburger.classList.add('open');
            navLinks.classList.add('open');
        }

        // Toggle on hamburger click — stop propagation so the
        // document click listener doesn't immediately close it
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.contains('open') ? closeMenu() : openMenu();
        });

        // Close when a nav link is tapped
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close when tapping outside the overlay
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('open') &&
                !navLinks.contains(e.target) &&
                !hamburger.contains(e.target)) {
                closeMenu();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('open')) {
                closeMenu();
            }
        });
    })();

});


    /* ============================================
       SWIPE GESTURES + PINCH-TO-ZOOM (Album Lightbox)
       ============================================ */
    (function() {
        const modal    = document.getElementById('image-modal');
        const modalImg = document.getElementById('full-image');
        const prevBtn  = document.querySelector('.prev-btn');
        const nextBtn  = document.querySelector('.next-btn');
        if (!modal || !modalImg) return;

        // --- Swipe ---
        let touchStartX = 0;
        let touchStartY = 0;
        let isSwiping   = false;

        modal.addEventListener('touchstart', (e) => {
            if (e.touches.length !== 1) return;
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            isSwiping   = true;
        }, { passive: true });

        modal.addEventListener('touchend', (e) => {
            if (!isSwiping || e.changedTouches.length !== 1) return;
            const dx = e.changedTouches[0].clientX - touchStartX;
            const dy = e.changedTouches[0].clientY - touchStartY;
            isSwiping = false;

            // Only trigger swipe if horizontal movement dominates
            if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;

            if (dx < 0 && nextBtn) nextBtn.click(); // swipe left  → next
            if (dx > 0 && prevBtn) prevBtn.click(); // swipe right → prev
        }, { passive: true });

        // --- Pinch to Zoom ---
        let currentScale = 1;
        let lastScale    = 1;
        let originX      = 0;
        let originY      = 0;
        let isPinching   = false;

        function getDistance(t1, t2) {
            return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
        }
        function getMidpoint(t1, t2) {
            return {
                x: (t1.clientX + t2.clientX) / 2,
                y: (t1.clientY + t2.clientY) / 2,
            };
        }

        let pinchStartDist = 0;

        modalImg.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2) {
                isPinching     = true;
                pinchStartDist = getDistance(e.touches[0], e.touches[1]);
                const mid      = getMidpoint(e.touches[0], e.touches[1]);
                const rect     = modalImg.getBoundingClientRect();
                originX        = mid.x - rect.left;
                originY        = mid.y - rect.top;
                e.preventDefault();
            }
        }, { passive: false });

        modalImg.addEventListener('touchmove', (e) => {
            if (!isPinching || e.touches.length !== 2) return;
            e.preventDefault();
            const dist  = getDistance(e.touches[0], e.touches[1]);
            const ratio = dist / pinchStartDist;
            currentScale = Math.min(Math.max(lastScale * ratio, 1), 4);
            modalImg.style.transformOrigin = `${originX}px ${originY}px`;
            modalImg.style.transform       = `scale(${currentScale})`;
        }, { passive: false });

        modalImg.addEventListener('touchend', (e) => {
            if (e.touches.length < 2) {
                isPinching = false;
                lastScale  = currentScale;
                // Snap back to 1 if almost at base
                if (currentScale < 1.1) {
                    currentScale = 1;
                    lastScale    = 1;
                    modalImg.style.transform       = 'scale(1)';
                    modalImg.style.transformOrigin = 'center center';
                }
            }
        }, { passive: true });

        // Double-tap to reset zoom
        let lastTap = 0;
        modalImg.addEventListener('touchend', (e) => {
            const now = Date.now();
            if (now - lastTap < 300) {
                currentScale = 1;
                lastScale    = 1;
                modalImg.style.transform       = 'scale(1)';
                modalImg.style.transformOrigin = 'center center';
            }
            lastTap = now;
        }, { passive: true });

        // Reset zoom when navigating to a new image
        const resetZoom = () => {
            currentScale = 1;
            lastScale    = 1;
            modalImg.style.transform       = 'scale(1)';
            modalImg.style.transformOrigin = 'center center';
        };
        if (prevBtn) prevBtn.addEventListener('click', resetZoom);
        if (nextBtn) nextBtn.addEventListener('click', resetZoom);
    })();