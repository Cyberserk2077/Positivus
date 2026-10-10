class Team {
  constructor() {
    this.button = document.querySelector('[data-js-team-button]')
    if (!this.button) return
    this.items = [...document.querySelectorAll('.team__item')].slice(3)
    this.button.hidden = false
    this.setExpanded(false)
    this.button.addEventListener('click', () => this.setExpanded(!this.expanded))
  }

  setExpanded(expanded) {
    this.expanded = expanded
    this.items.forEach((item) => { item.hidden = !expanded })
    this.button.textContent = expanded ? 'Show less' : 'See all team'
    this.button.setAttribute('aria-expanded', String(expanded))
  }
}

export default Team
