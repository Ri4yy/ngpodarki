if (typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    gsap.defaults({ duration: 0.8, ease: 'power2.out' });

    // Проверка: запускать анимации только на десктопе
    function isDesktop() {
        return window.innerWidth > 991;
    }

    // Header intro animation
    (function () {
        if (!isDesktop()) return;
        const menuItems = document.querySelectorAll('.menu-nav > li');
        const contacts = document.querySelector('.header__contacts');
        if (!menuItems || menuItems.length === 0) return;

        const tl = gsap.timeline();
        gsap.set(menuItems, { y: -16, autoAlpha: 0 });
        if (contacts) gsap.set(contacts, { autoAlpha: 0 });

        tl.to(menuItems, {
            y: 0,
            autoAlpha: 1,
            stagger: 0.08,
            duration: 0.8
        });

        if (contacts) {
            tl.to(contacts, { autoAlpha: 1, duration: 0.4 }, '+=0.05');
        }
    })();

    // Hero title typing animation
    (function () {
        if (!isDesktop()) return;
        const title = document.querySelector('.hero__title');
        if (!title) return;
        if (title.dataset.typed === 'true') return;

        const originalText = (title.textContent || '').trim();
        if (!originalText) return;
        title.textContent = '';
        title.dataset.typed = 'true';

        const textWrap = document.createElement('span');
        textWrap.className = 'hero__title-typed';
        textWrap.style.whiteSpace = 'pre-wrap';

        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.setAttribute('aria-hidden', 'true');
        cursor.style.display = 'inline-block';
        cursor.style.width = '1px';
        cursor.style.height = '1em';
        cursor.style.marginLeft = '2px';
        cursor.style.background = 'currentColor';
        cursor.style.verticalAlign = '-0.15em';

        title.appendChild(textWrap);
        title.appendChild(cursor);

        const chars = [];
        for (const ch of originalText) {
            const span = document.createElement('span');
            span.textContent = ch;
            span.style.opacity = '0';
            textWrap.appendChild(span);
            chars.push(span);
        }

        // Start after header menu animation roughly finishes
        const menuCount = document.querySelectorAll('.menu-nav > li').length;

        const tl = gsap.timeline({ delay: 0 });
        tl.to(chars, {
            opacity: 1,
            duration: 0.05,
            stagger: 0.035,
            ease: 'none'
        });

        gsap.to(cursor, { autoAlpha: 0, repeat: -1, yoyo: true, duration: 0.5, ease: 'none' });
    })();

    // Hero content (form + image) animations
    (function () {
        if (!isDesktop()) return;
        const form = document.querySelector('.form-hero');
        const formFields = form ? form.querySelectorAll('.form__area, .custom-checkbox, .form-hero__btn') : null;
        const imageContainer = document.querySelector('.hero__content-image');
        const image = imageContainer ? imageContainer.querySelector('img') : null;

        const tl = gsap.timeline({ delay: 0.1 });

        if (form && formFields && formFields.length) {
            gsap.set(formFields, { y: 20, autoAlpha: 0 });
            tl.to(formFields, {
                y: 0,
                autoAlpha: 1,
                duration: 0.5,
                stagger: 0.08,
                ease: 'power2.out'
            });
        }

        if (imageContainer) {
            gsap.set(imageContainer, { x: 40, autoAlpha: 0 });
            tl.to(imageContainer, { x: 0, autoAlpha: 1, duration: 0.7, ease: 'power2.out' }, form ? '>-0.2' : 0);

            if (image) {
                gsap.to(image, {
                    y: '+=8',
                    rotation: 1,
                    transformOrigin: '50% 100%',
                    duration: 2.6,
                    yoyo: true,
                    repeat: -1,
                    ease: 'sine.inOut'
                });

                if (typeof ScrollTrigger !== 'undefined') {
                    gsap.to(imageContainer, {
                        y: -30,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: '.section--hero',
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true
                        }
                    });
                }
            }
        }
    })();

    // Typing effect for hero form title
    (function () {
        if (!isDesktop()) return;
        const title = document.querySelector('.hero__content-form-title');
        if (!title) return;
        if (title.dataset.typed === 'true') return;

        const originalText = (title.textContent || '').trim();
        if (!originalText) return;
        title.textContent = '';
        title.dataset.typed = 'true';

        const textWrap = document.createElement('span');
        textWrap.className = 'hero__content-form-title-typed';
        textWrap.style.whiteSpace = 'pre-wrap';

        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.setAttribute('aria-hidden', 'true');
        cursor.style.display = 'inline-block';
        cursor.style.width = '1px';
        cursor.style.height = '1em';
        cursor.style.marginLeft = '2px';
        cursor.style.background = 'currentColor';
        cursor.style.verticalAlign = '-0.15em';

        title.appendChild(textWrap);
        title.appendChild(cursor);

        const chars = [];
        for (const ch of originalText) {
            const span = document.createElement('span');
            span.textContent = ch;
            span.style.opacity = '0';
            textWrap.appendChild(span);
            chars.push(span);
        }

        const tl = gsap.timeline({ delay: 0 });
        tl.to(chars, {
            opacity: 1,
            duration: 0.05,
            stagger: 0.03,
            ease: 'none'
        });

        gsap.to(cursor, { autoAlpha: 0, repeat: -1, yoyo: true, duration: 0.5, ease: 'none' });
    })();

    // Анимация для блока hero-advantages
    (function () {
        if (!isDesktop()) return;
        const section = document.querySelector('.hero-advantages');
        if (!section) return;

        const items = section.querySelectorAll('.hero-advantages__item');
        if (!items.length) return;

        // GSAP timeline с ScrollTrigger
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        items.forEach((item, i) => {
            const image = item.querySelector('.hero-advantages__item-image');
            const content = item.querySelector('.hero-advantages__item-content span');
            if (!image || !content) return;

            // Анимация bounce для картинки
            tl.from(image, {
                y: 60,
                autoAlpha: 0,
                scale: 0.7,
                ease: 'bounce.out',
                duration: 0.7
            }, i * 0.5);

            // Простая анимация fade для текста
            tl.from(content, {
                autoAlpha: 0,
                duration: 0.5,
                ease: 'power2.out'
            }, i * 0.5 + 0.4); // запускать после bounce
        });
    })();

    // Анимация для блока "Акции"
    (function () {
        if (!isDesktop()) return;
        const section = document.querySelector('.section--promo');
        if (!section) return;

        const title = section.querySelector('h2');

        // Подготовка: скрываем текст заголовка и сохраняем оригинал
        if (title && !title.dataset.original) {
            title.dataset.original = title.textContent;
            title.textContent = '';
        }

        // GSAP timeline с ScrollTrigger
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        });

        // Анимация печати для заголовка
        if (title) {
            tl.add(() => {
                if (title.dataset.typed === 'true') return;
                const text = title.dataset.original || '';
                title.textContent = '';
                title.dataset.typed = 'true';

                const chars = [];
                for (const ch of text) {
                    const span = document.createElement('span');
                    span.textContent = ch;
                    span.style.opacity = '0';
                    title.appendChild(span);
                    chars.push(span);
                }
                gsap.to(chars, {
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.03,
                    ease: 'none'
                });
            }, 0);
        }

        const slides = gsap.utils.toArray('.swiper-promo__item');
        slides.forEach((slide, i) => {
            gsap.from(slide, {
                autoAlpha: 0,
                y: 40,
                scale: 0.92,
                duration: 0.7,
                delay: i * 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: slide,
                    start: 'top 70%',
                    toggleActions: 'play none none none'
                }
            });
        });

    })();

    (function () {
        if (!isDesktop()) return;
        const section = document.querySelector('.section--catalog');
        if (!section) return;

        const title = section.querySelector('h2');
        if (title && !title.dataset.original) {
            title.dataset.original = title.textContent;
            title.textContent = '';
        }

        // Анимация печати для заголовка каталога
        if (title) {
            gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                }
            }).add(() => {
                if (title.dataset.typed === 'true') return;
                const text = title.dataset.original || '';
                title.textContent = '';
                title.dataset.typed = 'true';

                const chars = [];
                for (const ch of text) {
                    const span = document.createElement('span');
                    span.textContent = ch;
                    span.style.opacity = '0';
                    title.appendChild(span);
                    chars.push(span);
                }
                gsap.to(chars, {
                    opacity: 1,
                    duration: 0.05,
                    stagger: 0.03,
                    ease: 'none'
                });
            }, 0);
        }

        // Анимация появления карточек каталога
        const cards = gsap.utils.toArray('.catalog-sections__item');
        cards.forEach((card, i) => {
            gsap.from(card, {
                autoAlpha: 0,
                y: 40,
                scale: 0.92,
                duration: 0.7,
                delay: i * 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 50%',
                    toggleActions: 'play none none none'
                }
            });
        });
    })();

    (function () {
        if (!isDesktop()) return;
        const section = document.querySelector('.feedback-form');
        if (!section) return;

        const form = section.querySelector('.form-feedback');
        const formFields = form ? form.querySelectorAll('.form__area, .custom-checkbox, .form-feedback__btn') : null;
        const imageContainer = section.querySelector('.feedback-form__wrapper-image');
        const image = imageContainer ? imageContainer.querySelector('img') : null;

        // GSAP timeline с ScrollTrigger
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: '95% 80%',
                toggleActions: 'play none none none',
            }
        });

        if (form && formFields && formFields.length) {
            gsap.set(formFields, { y: 20, autoAlpha: 0 });
            tl.to(formFields, {
                y: 0,
                autoAlpha: 1,
                duration: 1,
                stagger: 0.08,
                ease: 'power2.out'
            });
        }

        if (imageContainer) {
            gsap.set(imageContainer, { x: 40, autoAlpha: 0 });
            tl.to(imageContainer, { x: 0, autoAlpha: 1, duration: 0.7, ease: 'power2.out' }, form ? '0' : 0);
        }
    })();

    (function () {
        if (!isDesktop()) return;
        const section = document.querySelector('.section--advantages');
        if (!section) return;

        const title = section.querySelector('h2');
        const items = section.querySelectorAll('.advantages__item');
        if (!items.length) return;

        // Подготовка: скрываем текст заголовка и сохраняем оригинал
        if (title && !title.dataset.original) {
            title.dataset.original = title.textContent;
            title.textContent = '';
        }
        // Подготовка: скрываем текст и сохраняем оригинал для карточек
        items.forEach(item => {
            const content = item.querySelector('.advantages__item-right span');
            if (content && !content.dataset.original) {
                content.dataset.original = content.textContent;
                content.textContent = '';
            }
        });

        // GSAP timeline с ScrollTrigger
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none',
            }
        });

        // Анимация печати для заголовка
        if (title) {
            tl.add(() => {
                if (title.dataset.typed === 'true') return;
                const text = title.dataset.original || '';
                title.textContent = '';
                title.dataset.typed = 'true';

                const chars = [];
                for (const ch of text) {
                    const span = document.createElement('span');
                    span.textContent = ch;
                    span.style.opacity = '0';
                    title.appendChild(span);
                    chars.push(span);
                }
                gsap.to(chars, {
                    opacity: 1,
                    duration: 0.05,
                    stagger: 0.03,
                    ease: 'none'
                });
            }, 0);
        }

        items.forEach((item, i) => {
            const image = item.querySelector('.advantages__item-left-icon');
            const content = item.querySelector('.advantages__item-right span');
            if (!image || !content) return;

            // Анимация bounce для картинки
            tl.from(image, {
                y: 60,
                autoAlpha: 0,
                scale: 0.7,
                ease: 'bounce.out',
                duration: 0.7
            }, i * 0.5 + 0.5);

            // Анимация печати для текста
            tl.add(() => {
                if (content.dataset.typed === 'true') return;
                const text = content.dataset.original || '';
                content.textContent = '';
                content.dataset.typed = 'true';

                const chars = [];
                for (const ch of text) {
                    const span = document.createElement('span');
                    span.textContent = ch;
                    span.style.opacity = '0';
                    content.appendChild(span);
                    chars.push(span);
                }
                gsap.to(chars, {
                    opacity: 1,
                    duration: 0.04,
                    stagger: 0.025,
                    ease: 'none'
                });
            }, i * 0.5 + 0.9);
        });
    })();

    (function () {
        if (!isDesktop()) return;
        const section = document.querySelector('.section--partners');
        if (!section) return;

        const title = section.querySelector('h2');
        const slides = section.querySelectorAll('.swiper-partners__slide');

        // Подготовка: скрываем текст заголовка и сохраняем оригинал
        if (title && !title.dataset.original) {
            title.dataset.original = title.textContent;
            title.textContent = '';
        }

        // Анимация печати для заголовка
        if (title) {
            gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }).add(() => {
                if (title.dataset.typed === 'true') return;
                const text = title.dataset.original || '';
                title.textContent = '';
                title.dataset.typed = 'true';

                const chars = [];
                for (const ch of text) {
                    const span = document.createElement('span');
                    span.textContent = ch;
                    span.style.opacity = '0';
                    title.appendChild(span);
                    chars.push(span);
                }
                gsap.to(chars, {
                    opacity: 1,
                    duration: 0.05,
                    stagger: 0.03,
                    ease: 'none'
                });
            }, 0);
        }

        // Анимация появления слайдов
        slides.forEach((slide, i) => {
            gsap.from(slide, {
                autoAlpha: 0,
                y: 40,
                scale: 0.92,
                duration: 0.7,
                delay: i * 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: slide,
                    start: 'top 60%',
                    toggleActions: 'play none none none'
                }
            });
        });
    })();

    (function () {
        if (!isDesktop()) return;
        const section = document.querySelector('.section--swiper-reviews');
        if (!section) return;

        const title = section.querySelector('h2');
        const slides = section.querySelectorAll('.swiper-reviews__item');

        // Подготовка: скрываем текст заголовка и сохраняем оригинал
        if (title && !title.dataset.original) {
            title.dataset.original = title.textContent;
            title.textContent = '';
        }

        // Анимация печати для заголовка
        if (title) {
            gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }).add(() => {
                if (title.dataset.typed === 'true') return;
                const text = title.dataset.original || '';
                title.textContent = '';
                title.dataset.typed = 'true';

                const chars = [];
                for (const ch of text) {
                    const span = document.createElement('span');
                    span.textContent = ch;
                    span.style.opacity = '0';
                    title.appendChild(span);
                    chars.push(span);
                }
                gsap.to(chars, {
                    opacity: 1,
                    duration: 0.05,
                    stagger: 0.03,
                    ease: 'none'
                });
            }, 0);
        }

        // Анимация появления слайдов
        slides.forEach((slide, i) => {
            gsap.from(slide, {
                autoAlpha: 0,
                y: 40,
                scale: 0.92,
                duration: 0.9,
                delay: i * 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: slide,
                    start: 'top 50%',
                    toggleActions: 'play none none none'
                }
            });
        });
    })();

    (function () {
        if (!isDesktop()) return;
        const section = document.querySelector('.section--review');
        if (!section) return;

        const form = section.querySelector('.form-reviews');
        const formFields = form ? form.querySelectorAll('.form__area, .custom-checkbox, .form-reviews__btn') : null;
        const imageContainer = section.querySelector('.reviews-form__inner-image');
        const image = imageContainer ? imageContainer.querySelector('img') : null;

        // GSAP timeline с ScrollTrigger
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top 70%',
                toggleActions: 'play none none none',
            }
        });

        if (form && formFields && formFields.length) {
            gsap.set(formFields, { y: 20, autoAlpha: 0 });
            tl.to(formFields, {
                y: 0,
                autoAlpha: 1,
                duration: 0.5,
                stagger: 0.08,
                ease: 'power2.out'
            });
        }

        if (imageContainer) {
            gsap.set(imageContainer, { x: 40, autoAlpha: 0 });
            tl.to(imageContainer, { x: 0, autoAlpha: 1, duration: 0.7, ease: 'power2.out' }, form ? '>-0.2' : 0);

            if (image) {
                tl.add(() => {
                    gsap.to(image, {
                        y: '+=8',
                        rotation: 1,
                        transformOrigin: '50% 100%',
                        duration: 2.6,
                        yoyo: true,
                        repeat: -1,
                        ease: 'sine.inOut'
                    });
                }, '>-0.1');
            }
        }
    })();

    
}