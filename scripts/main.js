import Header from './Header.js'
import Modal from './Modal.js'
import DemoForms from './DemoForms.js'
import DemoLinks from './DemoLinks.js'
import Team from './Team.js'
import ReviewsSlider from './ReviewsSlider.js'

document.documentElement.classList.add('has-js')

for (const Component of [DemoLinks, DemoForms, Header, Modal, Team]) {
  try {
    new Component()
  } catch (error) {
    console.error(`${Component.name} could not initialize`, error)
  }
}

const initReviews = () => {
  try {
    new ReviewsSlider()
  } catch (error) {
    console.warn('Reviews slider unavailable; showing all reviews.', error)
  }
}

if (typeof window.Swiper === 'function') initReviews()
else document.querySelector('[data-js-swiper]')?.addEventListener('load', initReviews, { once: true })
