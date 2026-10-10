# Positivus

Responsive digital marketing agency landing page built with HTML, SCSS and vanilla JavaScript. The original English design and link hover effects are preserved.

## Live demo

[View website](https://cyberserk2077.github.io/positivus/)

## Features

- Responsive layout and reusable BEM components with SCSS mixins
- Keyboard accessible mobile navigation and modal dialogs
- Contact, quote, consultation and subscription form validation
- Expandable team section and reviews slider
- Anchor navigation, visible keyboard focus and reduced motion support
- All team members and reviews remain readable without JavaScript

## Run locally

Requires Node.js and npm.

```bash
git clone git@github.com:Cyberserk2077/positivus.git
cd positivus
npm ci
npm run sass:watch
```

Open the project with VS Code Live Server or another local static HTTP server. JavaScript modules require an HTTP URL; opening `index.html` directly with `file://` will not initialize them.

For a one-time CSS build:

```bash
npm run sass
```

Edit `scss/` source files and rebuild the generated `css/` files before committing. No frontend framework or application build step is required.

## Demo limitations

This is a portfolio frontend, with no backend or public API. Forms validate locally and never send or save personal details. Submit controls are disabled without JavaScript. Successful validation is a demonstration, not an actual request or subscription.

Links to unimplemented pages and social profiles remain styled anchors to demonstrate hover effects. They are marked as demo links and JavaScript prevents their navigation, including new-tab links. Email and phone links remain active.

Swiper is loaded from a CDN. If it is unavailable, all reviews are shown as a readable list and other components continue to work. Fonts, images and the main stylesheet are local.
