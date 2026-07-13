class Modal {
  selectors = {
    root: '[data-js-modal]',
    window: '[data-js-modal-window]',
    openButton: '[data-js-modal-button]',
    closeButton: '[data-js-modal-button-close]',
  }

  stateClasses = {
    isOpen: 'is-open',
    isLocked: 'is-locked',
  }

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root)

    if (!this.rootElement) return

    this.currentWindow = null
    this.lastFocusedElement = null
    this.focusableSelectors = 'a[href], button, input, select, textarea, [tabindex]'

    this.bindEvents()
  }

  openModal(windowKey) {
    const targetWindow = this.rootElement.querySelector(
      `[data-js-modal-window="${windowKey}"]`
    )

    if (!targetWindow) return

    this.currentWindow = targetWindow
    this.lastFocusedElement = document.activeElement

    this.rootElement.classList.add(this.stateClasses.isOpen)
    this.currentWindow.classList.add(this.stateClasses.isOpen)
    document.documentElement.classList.add(this.stateClasses.isLocked)

    const firstFocusable = this.currentWindow.querySelector(this.focusableSelectors)
    firstFocusable?.focus()
  }

  closeModal() {
    if (!this.currentWindow) return

    this.rootElement.classList.remove(this.stateClasses.isOpen)
    this.currentWindow.classList.remove(this.stateClasses.isOpen)
    document.documentElement.classList.remove(this.stateClasses.isLocked)

    this.lastFocusedElement?.focus()
    this.currentWindow = null
  }

  onDocumentClick = (event) => {
    const openButton = event.target.closest(this.selectors.openButton)
    if (openButton) {
      const windowKey = openButton.dataset.jsModalButton
      this.openModal(windowKey)
      return
    }

    const closeButton = event.target.closest(this.selectors.closeButton)
    if (closeButton) {
      this.closeModal()
    }
  }

  onOverlayClick = (event) => {
    if (event.target === this.rootElement) {
      this.closeModal()
    }
  }

  onKeyDown = (event) => {
    if (!this.currentWindow) return

    if (event.key === 'Escape') {
      this.closeModal()
    }

    if (event.key === 'Tab') {
      this.trapFocus(event)
    }
  }

  trapFocus = (event) => {
    const focusable = Array.from(
      this.currentWindow.querySelectorAll(this.focusableSelectors)
    )
    const firstElement = focusable[0]
    const lastElement = focusable[focusable.length - 1]

    if (event.shiftKey && document.activeElement === firstElement) {
      lastElement.focus()
      event.preventDefault()
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
      firstElement.focus()
      event.preventDefault()
    }
  }

  bindEvents() {
    document.addEventListener('click', this.onDocumentClick)
    this.rootElement.addEventListener('click', this.onOverlayClick)
    document.addEventListener('keydown', this.onKeyDown)
  }
}

export default Modal
