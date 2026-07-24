# DigiKreis Technologies - Website

A professional, responsive website for DigiKreis Technologies - Premium Enterprise Training Provider.

## Project Structure

```
digikreis-pro/
├── index.html          # Main HTML file (Home, About, Courses, Contact pages)
├── css/
│   └── style.css       # All styling (responsive design)
├── js/
│   └── script.js       # JavaScript (page navigation, email functionality)
├── images/             # Image folder (for future use)
└── README.md           # This file
```

## Features

✅ **4 Complete Pages**
- Home: Hero, courses showcase, partners, delivery options, stats, testimonials
- About: Company overview, mission/vision, director profile, trust factors
- Courses: Detailed course grid, 2-column layout, partners, delivery options, enterprise tracks
- Contact: Contact form with email integration, contact info, support details

✅ **Email Functionality**
- Contact form sends emails to sumathi@digikreis.in
- Uses FormSubmit.co (free, no backend required)
- Real-time success/error messages
- No server configuration needed

✅ **Responsive Design**
- Mobile-friendly (768px breakpoint)
- Tablet optimized
- Desktop professional layout

✅ **Modern Tech Stack**
- Pure HTML5 (no frameworks)
- CSS3 with variables and media queries
- Vanilla JavaScript (no dependencies)
- Font: Inter (Google Fonts)

## Setup & Usage

### Option 1: Local File (Recommended for Testing)
1. Extract the ZIP file
2. Open `index.html` in any web browser
3. All functionality works offline except email (requires internet)

### Option 2: Deploy to Web Server
1. Upload all files to your hosting provider
2. Ensure folder structure is maintained (css/, js/ folders)
3. Contact form will work automatically

### Option 3: Development Mode
```bash
# If you have Python installed (local server)
python -m http.server 8000
# Then visit http://localhost:8000
```

## Email Configuration

The contact form uses **FormSubmit.co** - a free service that requires zero backend setup.

**Current Configuration:**
- Email: sumathi@digikreis.in
- No authentication needed
- Free tier: Unlimited submissions

**To change recipient email:**
1. Open `index.html`
2. Find the `<form id="contactForm">` tag
3. Change `sumathi@digikreis.in` in the fetch URL in `js/script.js` line 22

**Alternative Email Services (if needed):**
- EmailJS (client-side, free tier available)
- Formspree (similar to FormSubmit)
- Your own backend (PHP, Node.js, Python)

## Customization

### Colors
Edit `:root` variables in `css/style.css`:
```css
--gold: #c8860a;
--dark: #0e0900;
--text: #f5e6cc;
/* etc... */
```

### Content
- Edit page content directly in `index.html`
- Each page is wrapped in `<div id="page-NAME" class="page">`

### Fonts
- Google Fonts "Inter" is used
- Change in `<link>` tag in `<head>`

### Contact Information
- Update phone, email, address in Contact page and footer
- Located in `<div class="contact-info">` and `<footer>`

## Browser Support

✅ Chrome/Edge 90+
✅ Firefox 88+
✅ Safari 14+
✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Fully responsive SVG-free (emojis only)
- No external JavaScript libraries
- Fast loading (< 500KB)
- CSS Grid & Flexbox for modern layouts

## File Sizes

- index.html: ~45KB
- css/style.css: ~25KB
- js/script.js: ~2KB
- **Total: ~72KB** (highly optimized)

## SEO Optimization

✅ Meta tags included
✅ Semantic HTML structure
✅ Mobile viewport configured
✅ Fast load time
✅ Accessibility-friendly

## Troubleshooting

**Q: Contact form not sending emails?**
A: 
- Check internet connection
- Verify email in `js/script.js` is correct
- Check browser console for errors (F12)
- Ensure JavaScript is enabled

**Q: Pages not switching?**
A: 
- Verify `js/script.js` is linked correctly
- Check browser console for errors
- Clear browser cache

**Q: Styles not loading?**
A: 
- Verify `css/style.css` path in HTML
- Check folder structure matches
- Clear browser cache (Ctrl+Shift+R)

## License

© 2026 DigiKreis Technologies. All rights reserved.

## Contact

📧 Email: sumathi@digikreis.in
📱 Phone: +91 80958 19639
🌐 Website: Your domain here

---

**Last Updated:** June 2026
**Version:** 1.0
