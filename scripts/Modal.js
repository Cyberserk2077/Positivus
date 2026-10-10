import Overlay from './Overlay.js'

class Modal {
  constructor() {
    this.rootElement = document.querySelector('[data-js-modal]')
    if (!this.rootElement) return
    document.querySelectorAll('[data-js-modal-button]').forEach((button) => { button.disabled = false })
    this.background = [...document.body.children].filter((element) => element !== this.rootElement && !['SCRIPT', 'STYLE'].includes(element.tagName))
    document.addEventListener('click', (event) => {
      const button = event.target.closest('[data-js-modal-button]')
      if (button) this.openModal(button.dataset.jsModalButton)
      if (event.target.closest('[data-js-modal-button-close]') || event.target === this.rootElement) this.closeModal()
    })
    document.addEventListener('keydown', (event) => {
      if (!this.currentWindow) return
      if (event.key === 'Escape') this.closeModal()
      else Overlay.trap(event, Overlay.focusable(this.currentWindow), this.currentWindow)
    })
  }

  openModal(key) {
    const target = [...this.rootElement.querySelectorAll('[data-js-modal-window]')]
      .find((element) => element.dataset.jsModalWindow === key)
    if (!target) return
    if (!this.currentWindow) this.lastFocusedElement = document.activeElement
    document.dispatchEvent(new Event('overlay:open'))
    this.currentWindow?.classList.remove('is-open')
    this.currentWindow = target
    this.inertState ??= this.background.map((element) => element.inert)
    this.background.forEach((element) => { element.inert = true })
    this.rootElement.classList.add('is-open')
    target.classList.add('is-open')
    this.rootElement.scrollTop = 0
    Overlay.lock(this, true)
    const first = Overlay.focusable(target)[0] || target
    first.focus()
  }

  closeModal() {
    if (!this.currentWindow) return
    this.currentWindow.classList.remove('is-open')
    this.rootElement.classList.remove('is-open')
    this.background.forEach((element, index) => { element.inert = this.inertState[index] })
    this.inertState = null
    this.currentWindow = null
    Overlay.lock(this, false)
    this.lastFocusedElement?.focus()
  }
}

export default Modal
