class ReviewsSlider {
  selectors = {
    root: '[data-js-reviews-slider]',
    prevButton: '[data-js-reviews-slider-button-prev]',
    nextButton: '[data-js-reviews-slider-button-next]',
    pagination: '[data-js-reviews-slider-pagination]',
  }

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root)

    if (!this.rootElement || typeof window.Swiper !== 'function') return

    this.init()
  }

  init() {
    this.rootElement.closest('.reviews').classList.add('is-enhanced')
    try {
      this.swiper = new window.Swiper(this.rootElement, {

        speed: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 300,
        slidesPerView: 1,
        centeredSlides: true,
        loop: true,
        spaceBetween: 50,

        breakpoints: {
          768: {
            slidesPerView: 1.9,
            spaceBetween: 50,
          }
        },

        navigation: {
          prevEl: this.rootElement.closest('.reviews').querySelector(this.selectors.prevButton),
          nextEl: this.rootElement.closest('.reviews').querySelector(this.selectors.nextButton),
        },

        pagination: {
          el: this.rootElement.closest('.reviews').querySelector(this.selectors.pagination),
          clickable: true,
          bulletClass: 'pagination__button',
          bulletActiveClass: 'is-current',
          renderBullet: (index, className) => {
            return `
              <button class="${className}" type="button">
                <span class="visually-hidden">Slide ${index + 1}</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.0099 2.05941L14 0L11.9604 7.0099L14 14L7.0099 11.9604L0 14L2.05941 7.0099L0 0L7.0099 2.05941Z" fill="currentColor"/>
                </svg>
              </button>
            `
          },
        },

        keyboard: {
          enabled: true,
        },

        a11y: {
          prevSlideMessage: 'Previous slide',
          nextSlideMessage: 'Next slide',
        },
      })
    } catch (error) {
      this.rootElement.closest('.reviews').classList.remove('is-enhanced')
      this.rootElement.swiper?.destroy(true, true)
      throw error
    }
  }
}

export default ReviewsSlider
