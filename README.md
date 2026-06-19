# wedepoe
Changes made:
1. Changed images locations from "/ROOT/", to "_images", so that they can load when using a different workspace.
2. Changed css link from "/ROOT/_css-assets/styles.css" to "<link rel="stylesheet" href="_css-assets/style.css">" .
3. [styles.css] Updated .card img, .menu-item img, and .about-content img to use height: auto and display: block. This ensures the images scale correctly with the width of their containers and removes extra spacing below them.
4. [index.html] Added srcset and sizes attributes to all three card images (menu.jpg, story.jpg, careers.jpg) to optimize loading for different screen sizes.
5. [about_us.html] Added srcset and sizes attributes to the history.jpg image to optimize loading for different screen sizes and viewports.
6. [menu.html] Added srcset and sizes attributes to all four menu item images (kfc_bucket.jpg, zinger_burger.jpg, hot_wings.jpeg, twister.webp) to optimize loading for the responsive grid layout.

Part_3
7. Added on-page SEO to all pages including meta descriptions, keywords, canonical URLs, heading hierarchy fixes, and enhanced alt tags with width, height, and lazy loading. Added Open Graph tags.
8. Added off-page SEO by putting social media links in the footer and created robots.txt and sitemap.xml.
9. Created main.js to add interactivity: a clickable lightbox image viewer on menu.html, an accordion timeline on about_us.html, and an auto-rotating testimonial section on index.html.
10. Added dynamic content by putting real-time search bars and category filter tabs on menu.html and careers.html to show and hide items using JavaScript.
11. Created enquiry.html for product enquiries. Added HTML5 and JavaScript client-side validation to all forms to show inline error and success messages without page reloads.
12. Added a .nojeky
