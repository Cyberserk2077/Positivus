class DemoLinks {
  constructor() {
    document.addEventListener('click', this.preventPlaceholder)
    document.addEventListener('auxclick', this.preventPlaceholder)
  }

  preventPlaceholder = (event) => {
    if (event.target.closest('[data-demo-link]')) event.preventDefault()
  }
}

export default DemoLinks
