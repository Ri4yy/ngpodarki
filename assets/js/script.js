document.addEventListener('DOMContentLoaded', () => {
    let menu = document.querySelector('.header-mobile'),
        btnMenu = document.querySelector('.btn-menu'),
        closeMenu = document.querySelector('.close-menu'),
        html = document.querySelector('html');

    btnMenu.addEventListener('click', (e) => {
        menu.classList.add('open')

        html.classList.add('no-scroll')
    })

    closeMenu.addEventListener('click', (e) => {
        menu.classList.remove('open')

        html.classList.remove('no-scroll')
    })

    function resize() {
        let width = window.innerWidth;

        if (width > 1024) {
            menu.classList.remove('open')
            html.classList.remove('no-scroll')
        } else {
            return
        }
    }

    window.addEventListener('resize', () => {
        resize()
    })
    resize()

    let vacanciesItems = document.querySelectorAll('.vacancies__item');

    if(vacanciesItems.length > 0) {
        vacanciesItems.forEach(item => {
            let btn = item.querySelector('.vacancies__item-bottom-btn');
            let body = item.querySelector('.vacancies__item-body');

            btn.addEventListener('click', () => {
                body.classList.toggle('is-open')
            })
        })
    }

    // Cookie
    function checkCookies(){
        let cookieDate = localStorage.getItem('cookieDate');
        let cookieNotification = document.getElementById('cookie_notification');
        let cookieBtn = cookieNotification.querySelector('.cookie__btn');
        
        if( !cookieDate || (+cookieDate + 31536000000) < Date.now() ){
            cookieNotification.classList.add('show');
        }
        
        cookieBtn.addEventListener('click', function(){
            localStorage.setItem( 'cookieDate', Date.now() );
            cookieNotification.classList.remove('show');
        })
    }
    checkCookies();

    const timer = document.querySelector('.timer');
    if (!timer) return;
    const numbers = timer.querySelectorAll('.timer__item-number');
    if (numbers.length < 4) return;

    function updateNewYearTimer() {
        const now = new Date();
        const nextYear = now.getFullYear() + 1;
        const newYear = new Date(`January 1, ${nextYear} 00:00:00`);
        const diff = newYear - now;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        numbers[0].textContent = days;
        numbers[1].textContent = hours.toString().padStart(2, '0');
        numbers[2].textContent = minutes.toString().padStart(2, '0');
        numbers[3].textContent = seconds.toString().padStart(2, '0');
    }

    updateNewYearTimer();
    setInterval(updateNewYearTimer, 1000);

    document.querySelectorAll('.snowflake').forEach(flake => {
        const delay = Math.random() * 4;
        const duration = 3 + Math.random() * 3; 
        flake.style.animationDelay = `${delay}s`;
        flake.style.animationDuration = `${duration}s`;
    });

    document.querySelectorAll('.reviews__item-bottom-link').forEach(btn => {
        btn.addEventListener('click', function () {
            const reviewItem = this.closest('.reviews__item');
            const reviewText = reviewItem.querySelector('.reviews__item-body p');
    
            if (reviewText.classList.contains('is-active')) {
                reviewText.classList.remove('is-active');
                this.textContent = 'Читать полностью';
            } else {
                reviewText.classList.add('is-active');
                this.textContent = 'Скрыть';
            }
        });
    });
})