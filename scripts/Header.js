import Overlay from './Overlay.js'

class Header {
  constructor() {
    this.rootElement = document.querySelector('[data-js-header]')
    if (!this.rootElement) return
    this.overlayElement = this.rootElement.querySelector('[data-js-header-overlay]')
    this.buttonElement = this.rootElement.querySelector('[data-js-header-burger-button]')
    this.mobile = window.matchMedia('(max-width: 767.98px)')
    this.background = [...document.querySelectorAll('main, footer, .header__logo, .header__button')]
    this.buttonElement.addEventListener('click', () => this.setOpen(!this.isOpen))
    this.overlayElement.addEventListener('click', (event) => {
      if (event.target.closest('a') || event.target === this.overlayElement) this.setOpen(false)
    })
    document.addEventListener('keydown', (event) => {
      if (!this.isOpen) return
      if (event.key === 'Escape') this.setOpen(false)
      Overlay.trap(event, [...Overlay.focusable(this.overlayElement), this.buttonElement], this.buttonElement)
    })
    document.addEventListener('overlay:open', () => this.setOpen(false, false))
    this.mobile.addEventListener('change', () => this.setOpen(false))
    this.setOpen(false, false)
  }

  setOpen(open, restore = true) {
    const wasOpen = this.isOpen
    this.isOpen = open && this.mobile.matches
    this.overlayElement.inert = this.mobile.matches && !this.isOpen
    this.overlayElement.classList.toggle('is-active', this.isOpen)
    this.buttonElement.classList.toggle('is-active', this.isOpen)
    this.buttonElement.setAttribute('aria-expanded', String(this.isOpen))
    this.buttonElement.setAttribute('aria-label', this.isOpen ? 'Close menu' : 'Open menu')
    if (wasOpen || this.isOpen) {
      this.background.forEach((element) => { element.inert = this.isOpen })
    }
    Overlay.lock(this, this.isOpen)
    if (this.isOpen) Overlay.focusable(this.overlayElement)[0]?.focus()
    else if (wasOpen && restore) {
      const target = this.mobile.matches ? this.buttonElement : Overlay.focusable(this.overlayElement)[0]
      target?.focus()
    }
  }
}

export default Header
