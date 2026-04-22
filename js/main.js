// ============================
// MK Detailling - Premium JS
// Loader, cursor, scroll reveal, parallax, magnetic buttons
// ============================

document.addEventListener('DOMContentLoaded', () => {

    // --- Loader ---
    const loader = document.getElementById('loader');
    document.body.style.overflow = 'hidden';

    function startLoader() {
        // Le texte s'affiche (CSS animations), puis on lance la sortie
        setTimeout(() => {
            loader.classList.add('exit');
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.style.overflow = '';
                revealHero();
            }, 1100);
        }, 2200);
    }

    window.addEventListener('load', startLoader);
    if (document.readyState === 'complete') {
        startLoader();
    }

    // --- Hero staggered reveal ---
    function revealHero() {
        const els = document.querySelectorAll('.hero [data-reveal]');
        els.forEach((el, i) => {
            setTimeout(() => el.classList.add('revealed'), 200 + i * 150);
        });
        // Show WhatsApp float after a delay
        setTimeout(() => {
            const waFloat = document.querySelector('.whatsapp-float');
            if (waFloat) waFloat.classList.add('visible');
        }, 3000);
    }

    // --- Custom Cursor ---
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');

    if (cursor && follower && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        let cx = 0, cy = 0, fx = 0, fy = 0;

        document.addEventListener('mousemove', (e) => {
            cx = e.clientX;
            cy = e.clientY;
            cursor.style.transform = `translate(${cx - 4}px, ${cy - 4}px)`;
        });

        function animateFollower() {
            fx += (cx - fx) * 0.12;
            fy += (cy - fy) * 0.12;
            follower.style.transform = `translate(${fx - 18}px, ${fy - 18}px)`;
            requestAnimationFrame(animateFollower);
        }
        animateFollower();

        // Hover effect on links/buttons
        const hoverTargets = document.querySelectorAll('a, button, .magnetic, .service-card, .contact-card, .galerie-item');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => follower.classList.add('hover'));
            el.addEventListener('mouseleave', () => follower.classList.remove('hover'));
        });
    }

    // --- Navbar scroll ---
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const sy = window.scrollY;
        navbar.classList.toggle('scrolled', sy > 60);
        lastScroll = sy;
    }, { passive: true });

    // --- Mobile menu ---
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('open');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // --- Active nav on scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    function updateActiveNav() {
        const scrollY = window.scrollY + 150;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollY >= top && scrollY < top + height) {
                navItems.forEach(item => {
                    item.classList.toggle('active', item.getAttribute('href') === '#' + id);
                });
            }
        });
    }
    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // --- Scroll Reveal with IntersectionObserver ---
    const revealElements = document.querySelectorAll('[data-reveal]:not(.hero [data-reveal])');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // --- Magnetic button effect ---
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        document.querySelectorAll('.magnetic').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
                btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                setTimeout(() => btn.style.transition = '', 400);
            });
        });
    }

    // --- Background orbs parallax on scroll ---
    const orbs = document.querySelectorAll('.bg-orb');
    if (orbs.length) {
        window.addEventListener('scroll', () => {
            const sy = window.scrollY;
            const speeds = [0.03, -0.02, 0.025, -0.015];
            orbs.forEach((orb, i) => {
                const speed = speeds[i] || 0.02;
                orb.style.transform = `translateY(${sy * speed}px)`;
            });
        }, { passive: true });
    }

    // --- Generate floating particles ---
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            const p = document.createElement('div');
            p.classList.add('particle');
            p.style.left = Math.random() * 100 + '%';
            p.style.top = Math.random() * 100 + '%';
            p.style.animationDuration = (12 + Math.random() * 20) + 's';
            p.style.animationDelay = (Math.random() * 15) + 's';
            p.style.width = (1 + Math.random() * 2) + 'px';
            p.style.height = p.style.width;
            p.style.opacity = (0.05 + Math.random() * 0.15);
            particlesContainer.appendChild(p);
        }
    }

    // --- Parallax hero gradient ---
    const heroGradient = document.querySelector('.hero-gradient');
    if (heroGradient) {
        window.addEventListener('scroll', () => {
            const sy = window.scrollY;
            if (sy < window.innerHeight) {
                heroGradient.style.transform = `translateY(${sy * 0.3}px) scale(${1 + sy * 0.0002})`;
            }
        }, { passive: true });
    }

    // --- Reel sound hint tooltip ---
    const reelVideoEls = document.querySelectorAll('.reel-video');
    if (reelVideoEls.length) {
        const hintObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('show-hint');
                    }, 1500);
                    hintObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        reelVideoEls.forEach(v => hintObserver.observe(v));
    }

    // --- Reel video sound toggle ---
    document.querySelectorAll('.reel-sound-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const reelVideo = btn.closest('.reel-video');
            const video = reelVideo.querySelector('video');
            // Mute all other videos first
            document.querySelectorAll('.reel-video video').forEach(v => {
                if (v !== video) {
                    v.muted = true;
                    v.closest('.reel-video').classList.remove('unmuted');
                }
            });
            // Toggle this one
            video.muted = !video.muted;
            reelVideo.classList.toggle('unmuted', !video.muted);
            // Hide all hints
            document.querySelectorAll('.reel-video.show-hint').forEach(el => el.classList.remove('show-hint'));
        });
    });

    // --- Pause videos not in viewport for performance ---
    const reelVideos = document.querySelectorAll('.reel-video video');
    if (reelVideos.length) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.play().catch(() => {});
                } else {
                    entry.target.pause();
                    entry.target.muted = true;
                    const wrapper = entry.target.closest('.reel-video');
                    if (wrapper) wrapper.classList.remove('unmuted');
                }
            });
        }, { threshold: 0.3 });
        reelVideos.forEach(v => videoObserver.observe(v));
    }

    // --- Timeline parcours client - se dessine au scroll ---
    const timeline = document.getElementById('parcoursTimeline');
    if (timeline) {
        const timelineLine = timeline.querySelector('.timeline-line');
        const steps = timeline.querySelectorAll('.parcours-step');
        const firstStep = steps[0];

        function updateTimeline() {
            if (!firstStep) return;
            const firstStepRect = firstStep.getBoundingClientRect();
            const lastStep = steps[steps.length - 1];
            const lastStepRect = lastStep.getBoundingClientRect();
            const windowH = window.innerHeight;

            // Ne commence que quand la première étape atteint le milieu de l'écran
            const triggerPoint = windowH * 0.55;
            const startY = firstStepRect.top;
            const endY = lastStepRect.top;
            const totalRange = endY - startY || 1;

            // Progress = 0 tant que la 1ère étape n'est pas au trigger point
            const scrolledPast = triggerPoint - startY;
            const progress = Math.max(0, Math.min(1, scrolledPast / (totalRange + 50)));

            // Draw the line
            if (timelineLine) {
                timelineLine.style.setProperty('--progress', progress * 100 + '%');
            }

            // Activate steps individually
            steps.forEach((step, i) => {
                const stepRect = step.getBoundingClientRect();
                if (stepRect.top < triggerPoint) {
                    step.classList.add('step-active');
                } else {
                    step.classList.remove('step-active');
                }
            });
        }

        // Set CSS variable for line progress
        const style = document.createElement('style');
        style.textContent = `.timeline-line::after { height: var(--progress, 0%) !important; }`;
        document.head.appendChild(style);

        window.addEventListener('scroll', updateTimeline, { passive: true });
        updateTimeline();
    }

    // --- Compteurs animés ---
    const counterEls = document.querySelectorAll('.counter-value[data-target]');
    if (counterEls.length) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.target);
                    const duration = 2000;
                    const start = performance.now();
                    function step(now) {
                        const t = Math.min(1, (now - start) / duration);
                        const eased = 1 - Math.pow(1 - t, 3);
                        el.textContent = Math.floor(eased * target);
                        if (t < 1) requestAnimationFrame(step);
                    }
                    requestAnimationFrame(step);
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        counterEls.forEach(el => counterObserver.observe(el));
    }

    // --- Sticky CTA mobile ---
    const stickyCta = document.getElementById('stickyCta');
    if (stickyCta) {
        window.addEventListener('scroll', () => {
            stickyCta.classList.toggle('visible', window.scrollY > window.innerHeight * 0.5);
        }, { passive: true });
    }

    // --- Parallaxe galerie ---
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const compSliders = document.querySelectorAll('.comparison-slider');
        window.addEventListener('scroll', () => {
            compSliders.forEach(slider => {
                const rect = slider.getBoundingClientRect();
                const center = rect.top + rect.height / 2;
                const offset = (center - window.innerHeight / 2) * 0.05;
                const imgs = slider.querySelectorAll('img');
                imgs.forEach(img => {
                    img.style.transform = `translateY(${offset}px) scale(1.05)`;
                });
            });
        }, { passive: true });
    }

    // --- Carousel auto "À propos" ---
    const aboutCarousel = document.getElementById('aboutCarousel');
    if (aboutCarousel) {
        const slides = aboutCarousel.querySelectorAll('.about-slide');
        const dots = aboutCarousel.querySelectorAll('.about-dot');
        let current = 0;
        const total = slides.length;

        function goTo(index) {
            slides[current].classList.remove('active');
            dots[current].classList.remove('active');
            current = index % total;
            slides[current].classList.add('active');
            dots[current].classList.add('active');
        }

        setInterval(() => goTo(current + 1), 4000);

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => goTo(i));
            dot.style.cursor = 'pointer';
        });
    }

    // --- Hero video 1 : démarre à 2.5s pour skipper le texte ---
    const heroVid1 = document.getElementById('heroVid1');
    if (heroVid1) {
        const startTime = parseFloat(heroVid1.dataset.start || '0');
        const skip = () => {
            try { heroVid1.currentTime = startTime; } catch(e) {}
        };
        heroVid1.addEventListener('loadedmetadata', skip);
        heroVid1.addEventListener('seeked', () => { heroVid1.play().catch(() => {}); }, { once: true });
        // Boucler à partir de startTime au lieu de 0
        heroVid1.addEventListener('timeupdate', () => {
            if (heroVid1.duration && heroVid1.currentTime >= heroVid1.duration - 0.1) {
                heroVid1.currentTime = startTime;
            }
        });
        heroVid1.removeAttribute('loop');
        heroVid1.addEventListener('ended', () => {
            heroVid1.currentTime = startTime;
            heroVid1.play().catch(() => {});
        });
    }

    // --- Reviews draggable carousel (style Webflow) ---
    const reviewsWrapper = document.getElementById('reviewsDrag');
    const reviewsTrack = document.getElementById('reviewsTrack');
    if (reviewsWrapper && reviewsTrack) {
        let isDown = false;
        let startX = 0;
        let startTranslate = 0;
        let currentTranslate = 0;
        let velocity = 0;
        let lastX = 0;
        let lastTime = 0;
        let rafId = null;

        function getMaxTranslate() {
            return Math.min(0, reviewsWrapper.clientWidth - reviewsTrack.scrollWidth);
        }

        function clamp(val) {
            const max = getMaxTranslate();
            return Math.max(max, Math.min(0, val));
        }

        function setTranslate(val, withTransition = false) {
            currentTranslate = clamp(val);
            if (withTransition) {
                reviewsTrack.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            } else {
                reviewsTrack.style.transition = 'none';
            }
            reviewsTrack.style.transform = `translateX(${currentTranslate}px)`;
        }

        function animateMomentum() {
            velocity *= 0.94;
            currentTranslate += velocity;
            const clamped = clamp(currentTranslate);
            if (clamped !== currentTranslate) {
                velocity = 0;
                currentTranslate = clamped;
            }
            reviewsTrack.style.transform = `translateX(${currentTranslate}px)`;
            if (Math.abs(velocity) > 0.5) {
                rafId = requestAnimationFrame(animateMomentum);
            }
        }

        function pointerDown(x) {
            isDown = true;
            reviewsWrapper.classList.add('dragging');
            startX = x;
            startTranslate = currentTranslate;
            velocity = 0;
            lastX = x;
            lastTime = performance.now();
            if (rafId) cancelAnimationFrame(rafId);
            reviewsTrack.style.transition = 'none';
        }

        function pointerMove(x) {
            if (!isDown) return;
            const delta = x - startX;
            currentTranslate = clamp(startTranslate + delta);
            reviewsTrack.style.transform = `translateX(${currentTranslate}px)`;

            const now = performance.now();
            const dt = now - lastTime;
            if (dt > 0) {
                velocity = (x - lastX) / dt * 16;
            }
            lastX = x;
            lastTime = now;
        }

        function pointerUp() {
            if (!isDown) return;
            isDown = false;
            reviewsWrapper.classList.remove('dragging');
            if (Math.abs(velocity) > 1) {
                rafId = requestAnimationFrame(animateMomentum);
            }
        }

        // Mouse
        reviewsWrapper.addEventListener('mousedown', (e) => {
            e.preventDefault();
            pointerDown(e.clientX);
        });
        window.addEventListener('mousemove', (e) => pointerMove(e.clientX));
        window.addEventListener('mouseup', pointerUp);

        // Touch
        reviewsWrapper.addEventListener('touchstart', (e) => pointerDown(e.touches[0].clientX), { passive: true });
        reviewsWrapper.addEventListener('touchmove', (e) => pointerMove(e.touches[0].clientX), { passive: true });
        reviewsWrapper.addEventListener('touchend', pointerUp);

        // Wheel horizontal scroll
        reviewsWrapper.addEventListener('wheel', (e) => {
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                e.preventDefault();
                setTranslate(currentTranslate - e.deltaX, false);
            }
        }, { passive: false });

        // Prevent drag of images
        reviewsTrack.querySelectorAll('*').forEach(el => {
            el.addEventListener('dragstart', e => e.preventDefault());
        });

        // Initial auto-slide hint (subtle nudge on load)
        setTimeout(() => {
            setTranslate(-60, true);
            setTimeout(() => setTranslate(0, true), 800);
        }, 2000);
    }

    // --- FAQ accordion ---
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const wasOpen = item.classList.contains('open');
            // Close all
            document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
            // Toggle clicked
            if (!wasOpen) item.classList.add('open');
        });
    });

    // --- Before/After comparison slider ---
    document.querySelectorAll('.comparison-slider').forEach(slider => {
        const before = slider.querySelector('.comparison-before');
        const handle = slider.querySelector('.comparison-handle');
        let isDragging = false;
        let userInteracted = false;
        let autoAnimId = null;

        // Block native image drag
        slider.querySelectorAll('img').forEach(img => {
            img.draggable = false;
            img.addEventListener('dragstart', e => e.preventDefault());
        });

        function setSliderPercent(percent) {
            percent = Math.max(2, Math.min(98, percent));
            before.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
            handle.style.left = percent + '%';
        }

        function updateSlider(clientX) {
            const rect = slider.getBoundingClientRect();
            const percent = ((clientX - rect.left) / rect.width) * 100;
            setSliderPercent(percent);
        }

        // Mouse events
        slider.addEventListener('mousedown', (e) => {
            e.preventDefault();
            isDragging = true;
            userInteracted = true;
            stopAutoAnim();
            updateSlider(e.clientX);
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            updateSlider(e.clientX);
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // Touch events
        slider.addEventListener('touchstart', (e) => {
            isDragging = true;
            userInteracted = true;
            stopAutoAnim();
            updateSlider(e.touches[0].clientX);
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            updateSlider(e.touches[0].clientX);
        }, { passive: true });

        window.addEventListener('touchend', () => {
            isDragging = false;
        });

        // Auto-animation: smooth oscillation until user interacts
        function startAutoAnim() {
            if (userInteracted) return;
            let start = null;
            function animate(ts) {
                if (userInteracted) return;
                if (!start) start = ts;
                const elapsed = (ts - start) / 1000;
                // Oscillate between 25% and 75% over 3 seconds
                const percent = 50 + 25 * Math.sin(elapsed * 1.2);
                setSliderPercent(percent);
                autoAnimId = requestAnimationFrame(animate);
            }
            autoAnimId = requestAnimationFrame(animate);
        }

        function stopAutoAnim() {
            if (autoAnimId) {
                cancelAnimationFrame(autoAnimId);
                autoAnimId = null;
            }
        }

        // Start auto-anim when slider enters viewport
        const sliderObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !userInteracted) {
                    startAutoAnim();
                } else {
                    stopAutoAnim();
                }
            });
        }, { threshold: 0.3 });
        sliderObserver.observe(slider);
    });

    // --- Easter Egg goutte d'eau ---
    const easterEgg = document.getElementById('easterEgg');
    const easterPopup = document.getElementById('easterPopup');
    const easterClose = document.getElementById('easterClose');

    if (easterEgg && easterPopup) {
        // Déplacer la goutte dans la section parcours
        const parcoursSection = document.querySelector('.parcours');
        if (parcoursSection) {
            parcoursSection.style.position = 'relative';
            parcoursSection.appendChild(easterEgg);
        }

        // Clic sur la goutte
        easterEgg.addEventListener('click', () => {
            easterPopup.classList.add('open');
        });

        // Fermer le pop-up
        easterClose.addEventListener('click', () => {
            easterPopup.classList.remove('open');
        });

        easterPopup.addEventListener('click', (e) => {
            if (e.target === easterPopup) {
                easterPopup.classList.remove('open');
            }
        });
    }

    // --- Easter Egg cadeau (réseaux sociaux) ---
    const easterGift = document.getElementById('easterGift');
    const giftPopup = document.getElementById('giftPopup');
    const giftClose = document.getElementById('giftClose');

    if (easterGift && giftPopup) {
        // Placer le cadeau après les vidéos
        const reelsRow = document.querySelector('.reels-row');
        if (reelsRow) {
            reelsRow.parentNode.insertBefore(easterGift, reelsRow.nextSibling);
        }

        easterGift.addEventListener('click', () => {
            giftPopup.classList.add('open');
        });

        giftClose.addEventListener('click', () => {
            giftPopup.classList.remove('open');
        });

        giftPopup.addEventListener('click', (e) => {
            if (e.target === giftPopup) {
                giftPopup.classList.remove('open');
            }
        });
    }

    // --- Tilt effect on comparison sliders ---
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        document.querySelectorAll('.comparison').forEach(item => {
            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                item.querySelector('.comparison-slider').style.transform = `perspective(800px) rotateY(${x * 3}deg) rotateX(${-y * 3}deg)`;
            });

            item.addEventListener('mouseleave', () => {
                const s = item.querySelector('.comparison-slider');
                s.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                s.style.transform = 'perspective(800px) rotateY(0) rotateX(0)';
                setTimeout(() => s.style.transition = '', 500);
            });
        });
    }
});
