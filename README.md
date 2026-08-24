# Sunset 73 Burger

## Concept

Sunset 73 Burger is a fictional 1970s-inspired diner serving burgers, fries, and shakes. Its warm retro color palette represents a simpler time, creating a sense of nostalgia for some guests and a calm, welcoming atmosphere for others.

The website is designed to feel like a real restaurant experience. Guests can explore the full menu, read what makes each item special, customize their food, build an order, receive a pickup estimate, and follow their order from the kitchen to pickup.

## Links

- [Live Website](https://daxtonzimmerman.github.io/Sunset-73-Burger/)
- [GitHub Repository](https://github.com/DaxtonZimmerman/Sunset-73-Burger)

## Pages

- `index.html` - Home page with the restaurant hero, featured items, and brand intro.
- `menu.html` - Full 26-item menu with filters, product details, customizations, and add-to-order controls.
- `order.html` - Interactive cart with quantity controls, item removal, an 8% tax estimate, and order totals.
- `checkout.html` - Pickup checkout with an order-size-based time estimate and pay-at-pickup information.
- `confirmation.html` - Order receipt, pickup window, animated confirmation, and live order-status tracker.
- `contact.html` - General contact and large-order request form connected to a private Google Sheet.

## Features

- Menu categories for burgers, sandwiches, sides, shakes, floats, and desserts
- 1973-inspired prices and a complete retro diner design
- Product popups with ingredients, descriptions, customizations, extras, and quantity controls
- Cart data saved with `localStorage` so the order stays available between pages
- Realistic pickup estimates based on the number of items ordered
- A 30-item online ordering limit with a separate large-order request process
- Pay-at-pickup checkout with no real payment information collected
- Order confirmation receipt, celebration animation, and live kitchen-status updates
- Contact form submissions saved through Google Apps Script to Google Sheets

## Accessibility

- Semantic page landmarks and heading structure
- Descriptive image alternative text
- Skip links and clear keyboard focus styles
- Accessible form labels and status announcements
- Keyboard-friendly product dialog and ordering controls
- Reduced-motion support for visitors who prefer fewer animations
- High-contrast retro colors and responsive layouts

## Tech

- Semantic HTML5
- CSS box model, Flexbox, and Grid
- Responsive CSS media queries and animations
- JavaScript DOM events, functions, objects, arrays, and loops
- Browser `localStorage`
- Google Apps Script and Google Sheets

## Validation

Every HTML page passes the Nu HTML Checker, and `style.css` passes the W3C CSS Validator.

## Image Credits

The logo and all food images were generated specifically for this fictional class project using OpenAI image generation. No stock images or third-party restaurant images were used.

## Known Issues

None known.
