class DemoForms {
  constructor() {
    document.querySelectorAll('[data-js-demo-form]').forEach((form) => {
      const button = form.querySelector('[data-js-submit]')
      const status = form.querySelector('[data-js-form-status]')
      form.addEventListener('submit', (event) => {
        event.preventDefault()
        if (!form.reportValidity()) return
        status.textContent = 'Form checked successfully. This is a demo; nothing has been sent or saved.'
      })
      form.addEventListener('input', () => { status.textContent = '' })
      form.querySelectorAll('[name="name"], textarea').forEach((field) => {
        field.addEventListener('input', () => {
          field.setCustomValidity(field.value && !field.value.trim() ? 'Please enter more than spaces.' : '')
        })
      })
      form.querySelectorAll('[data-js-form-field]').forEach((field) => { field.disabled = false })
      form.querySelectorAll('[type="tel"]').forEach((field) => {
        field.addEventListener('input', () => {
          const digits = field.value.replace(/\D/g, '').length
          field.setCustomValidity(field.value && (digits < 7 || digits > 15) ? 'Please enter a phone number containing 7–15 digits.' : '')
        })
      })
      button.type = 'submit'
      button.disabled = false
    })
  }
}

export default DemoForms
