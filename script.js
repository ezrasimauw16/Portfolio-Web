document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
});

function openLightbox(element) {
    const imgSrc = element.querySelector('img').src;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    lightboxImg.src = imgSrc;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

function toggleReadMore(button) {
    const contentDiv = button.parentElement.querySelector('.extended-content');
    
    if (contentDiv.classList.contains('show')) {
        contentDiv.classList.remove('show');
        button.innerHTML = 'Read More &darr;';
    } else {
        contentDiv.classList.add('show');
        button.innerHTML = 'Read Less &uarr;';
    }
}

document.addEventListener('DOMContentLoaded', () => {

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
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
            
            cursorOutline.animate({
                left: `${e.clientX}px`,
                top: `${e.clientY}px`
            }, { duration: 500, fill: "forwards" });
        });

        const hoverElements = document.querySelectorAll('a, button, .gallery-item');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover-active'));
            el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover-active'));
        });
    }

    const links = document.querySelectorAll('nav a, .back-link');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.target !== '_blank' && this.href.includes('.html')) {
                e.preventDefault();
                const targetUrl = this.href;
                
                document.body.classList.add('fade-out');
                
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 400); 
            }
        });
    });
});