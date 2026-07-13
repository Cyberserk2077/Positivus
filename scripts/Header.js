class Header {
  selectors = {
    root: '[data-js-header]',
    overlay: '[data-js-header-overlay]',
    button: '[data-js-header-burger-button]',
  }

  stateClasses = {
    isActive: 'is-active',
    isLocked: 'is-locked',
  }

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root)
    this.overlayElement = this.rootElement.querySelector(this.selectors.overlay)
    this.buttonElement = this.rootElement.querySelector(this.selectors.button)

    this.bindEvents()
  }

  openMenu = () => {
    this.overlayElement.classList.add(this.stateClasses.isActive)
    this.buttonElement.classList.add(this.stateClasses.isActive)
    document.documentElement.classList.add(this.stateClasses.isLocked)

    this.buttonElement.setAttribute('aria-expanded', 'true')
  }

  closeMenu = () => {
    this.overlayElement.classList.remove(this.stateClasses.isActive)
    this.buttonElement.classList.remove(this.stateClasses.isActive)
    document.documentElement.classList.remove(this.stateClasses.isLocked)

    this.buttonElement.setAttribute('aria-expanded', 'false')
  }

  isMenuOpen = () => {
    return this.overlayElement.classList.contains(this.stateClasses.isActive)
  }

  onOverlayClick = (event) => {
    if (event.target === this.overlayElement) {
      this.closeMenu()
    }
  }

  onButtonClick = () => {
    const isActive = this.buttonElement.classList.contains(this.stateClasses.isActive)
    isActive ? this.closeMenu() : this.openMenu()
  }

  onTouchStart = (event) => {
    if (!this.isMenuOpen()) return
    this.touchStartX = event.changedTouches[0].screenX
    this.overlayElement.style.transition = 'none'
  }

  onTouchMove = (event) => {
    if (!this.isMenuOpen()) return
    const currentX = event.changedTouches[0].screenX
    const translateX = Math.max(0, currentX - this.touchStartX)
    this.overlayElement.style.translate = `${translateX}px`
  }

  onTouchEnd = (event) => {
    if (!this.isMenuOpen()) return
    const touchEndX = event.changedTouches[0].screenX
    const swipeDistance = touchEndX - this.touchStartX

    this.overlayElement.style.transition = ''
    this.overlayElement.style.translate = ''

    if (swipeDistance > 70) {
      this.closeMenu()
    }
  }

  bindEvents() {
    this.buttonElement.addEventListener('click', this.onButtonClick)
    this.overlayElement.addEventListener('click', this.onOverlayClick)

    this.overlayElement.addEventListener('touchstart', this.onTouchStart)
    this.overlayElement.addEventListener('touchmove', this.onTouchMove)
    this.overlayElement.addEventListener('touchend', this.onTouchEnd)
  }
}

export default Header

