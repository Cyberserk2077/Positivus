class Overlay {
  static owners = new Set()

  static lock(owner, active) {
    active ? this.owners.add(owner) : this.owners.delete(owner)
    document.documentElement.classList.toggle('is-locked', this.owners.size > 0)
  }

  static focusable(root) {
    return [...root.querySelectorAll('a[href], button, input, select, textarea, [tabindex]')]
      .filter((element) => !element.disabled && element.tabIndex >= 0 && !element.closest('[inert]') && element.getClientRects().length > 0)
  }

  static trap(event, elements, fallback) {
    if (event.key !== 'Tab') return
    const first = elements[0] || fallback
    const last = elements.at(-1) || fallback
    if (!elements.length || (event.shiftKey && document.activeElement === first) ||
      (!event.shiftKey && document.activeElement === last) || !elements.includes(document.activeElement)) {
      event.preventDefault()
      const target = event.shiftKey ? last : first
      target.focus()
    }
  }
}

export default Overlay
