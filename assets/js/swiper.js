const swiperPartners = new Swiper('.swiper-partners', {
    // Optional parameters
    spaceBetween: 20,
    enabled: true,

    breakpoints: {
        0: {
            allowTouchMove: true,
            slidesPerView: 2,
            grid: {
                rows: 2,
                fill: "row",
            }
        },
        481: {
            allowTouchMove: true,
            slidesPerView: 3
        },
        768: {
            allowTouchMove: true,
            slidesPerView: 4
        },
        1025: {
            allowTouchMove: true,
            slidesPerView: 5
        },
        1921: {
            allowTouchMove: true,
            slidesPerView: 6
        },
    },
  
    navigation: {
      nextEl: '.partners__btn--next',
      prevEl: '.partners__btn--prev',
    },
});

const swiperReviews = new Swiper('.swiper-reviews', {
    // Optional parameters
    spaceBetween: 20,
    enabled: true,

    breakpoints: {
        0: {
            allowTouchMove: true,
            slidesPerView: 1
        },
        600: {
            allowTouchMove: true,
            slidesPerView: 2
        },
        900: {
            allowTouchMove: true,
            slidesPerView: 3
        },
        1280: {
            allowTouchMove: true,
            slidesPerView: 3
        },
    },
  
    navigation: {
      nextEl: '.reviews-btn-next',
      prevEl: '.reviews-btn-prev',
    },
    pagination: {
        el: '.reviews-pagination',
        clickable: true,
    },
});

const swiperPromo = new Swiper('.swiper-promo', {
    // Optional parameters
    enabled: true,

    breakpoints: {
        0: {
            allowTouchMove: true,
            slidesPerView: 1
        },
        480: {
            allowTouchMove: true,
            slidesPerView: 2
        },
        768: {
            allowTouchMove: true,
            spaceBetween: 16,
            slidesPerView: 2
        },
        1025: {
            allowTouchMove: true,
            spaceBetween: 20,
            slidesPerView: 3
        },
    },
  
    navigation: {
      nextEl: '.promo-btn-next',
      prevEl: '.promo-btn-prev',
    },
    pagination: {
        el: '.promo-pagination',
        clickable: true,
    },
});

const catalogSectionsSwiper = new Swiper('.catalog-sections-swiper', {
    // Optional parameters
    enabled: true,

    breakpoints: {
        0: {
            allowTouchMove: true,
            spaceBetween: 10,
            slidesPerView: 2,
            grid: {
                rows: 2,
                fill: "row",
            }
        },
        481: {
            allowTouchMove: true,
            spaceBetween: 10,
            slidesPerView: 2,
        },
        769: {
            allowTouchMove: true,
            spaceBetween: 10,
            slidesPerView: 3,
        },
        1025: {
            allowTouchMove: true,
            spaceBetween: 14,
            slidesPerView: 4
        },
        1281: {
            allowTouchMove: true,
            spaceBetween: 20,
            slidesPerView: 4
        },
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.catalog-sections__btn-next',
      prevEl: '.catalog-sections__btn-prev',
    },
});

const swiperDeclaration = new Swiper('.swiper-declaration', {
    // Optional parameters
    spaceBetween: 20,
    enabled: true,

    breakpoints: {
        0: {
            allowTouchMove: true,
            slidesPerView: 1
        },
        481: {
            allowTouchMove: true,
            slidesPerView: 2
        },
        769: {
            allowTouchMove: true,
            slidesPerView: 3
        },
        1025: {
            allowTouchMove: true,
            slidesPerView: 4
        },
        1921: {
            allowTouchMove: true,
            slidesPerView: 5
        },
    },
  
    navigation: {
      nextEl: '.declaration__btns-btn-next',
      prevEl: '.declaration__btns-btn-prev',
    },
});