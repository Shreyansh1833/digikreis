# Quick Setup Guide

## 📦 What You Have

A fully functional, production-ready website with:
- ✅ 4 complete pages (Home, About, Courses, Contact)
- ✅ Email form that sends to sumathi@digikreis.in
- ✅ Responsive mobile design
- ✅ Professional dark theme with gold accents
- ✅ No backend required
- ✅ Zero dependencies (pure HTML/CSS/JS)

## 🚀 Getting Started (3 Steps)

### Step 1: Extract Files
Unzip `digikreis-pro-structured.zip` to get:
```
digikreis-pro/
├── index.html
├── css/style.css
├── js/script.js
├── README.md
└── images/
```

### Step 2: Open Website
Double-click `index.html` to open in browser. That's it!

### Step 3: Test Contact Form
- Go to Contact page
- Fill out form
- Click "Send Message"
- Check your email (sumathi@digikreis.in)

## 📧 Email Setup

The contact form uses **FormSubmit.co** (completely FREE, no setup needed).

When someone submits the form:
1. ✅ Form data is validated
2. ✅ Email sent to sumathi@digikreis.in
3. ✅ Success message shown to user
4. ✅ Form clears automatically

**That's it!** No server, no backend, no configuration.

### If You Want to Change Email
Edit `js/script.js` line 22:
```javascript
// Change this:
'https://formsubmit.co/ajax/sumathi@digikreis.in'

// To:
'https://formsubmit.co/ajax/YOUR_EMAIL@example.com'
```

## 🌐 Deploy to Web (Free Options)

### Option A: Netlify (Recommended)
1. Go to https://netlify.com
2. Drag & drop `digikreis-pro` folder
3. Done! Your site is live
4. Email form works automatically

### Option B: GitHub Pages
1. Upload to GitHub repository
2. Enable GitHub Pages in settings
3. Site goes live at yourusername.github.io/repo-name

### Option C: Traditional Hosting
1. Upload files via FTP
2. Keep folder structure intact
3. Point domain to hosting
4. Email form works automatically

## 🎨 Customization Tips

### Change Company Name
Search for "DigiKreis" in `index.html` and replace

### Change Email Address
- Update in Contact page
- Update in `js/script.js` (line 22)
- Update in footer

### Change Colors
Edit `css/style.css` top section:
```css
:root {
  --gold: #c8860a;        /* Main color */
  --dark: #0e0900;        /* Background */
  --text: #f5e6cc;        /* Text color */
}
```

### Add Your Logo
1. Save logo to `images/` folder
2. Add `<img>` tag in navbar
3. Style with CSS

### Update Courses
Edit course cards in `index.html`
- Change course names
- Change descriptions
- Add/remove courses

## 📱 Testing Checklist

✅ Open on phone - should be responsive
✅ Fill contact form - should send email
✅ Click navigation links - should switch pages
✅ Try on different browsers - works everywhere

## 🆘 Common Issues & Fixes

### Form not sending?
- Check internet connection
- Verify email is correct in js/script.js
- Open browser console (F12) - look for errors

### Page not loading styles?
- Make sure css/ folder exists
- Check file path in HTML
- Refresh browser (Ctrl+Shift+R)

### Links not working?
- Make sure js/script.js is loading
- Check browser console for errors
- JavaScript might be disabled

## 📋 Checklist Before Going Live

Before uploading to your domain:

- [ ] Update all contact info (phone, email, address)
- [ ] Change email in js/script.js
- [ ] Update company logo (optional)
- [ ] Review all content for accuracy
- [ ] Test contact form
- [ ] Test on mobile phone
- [ ] Check all links work
- [ ] Verify responsive layout

## 🔐 Security Notes

✅ Form uses HTTPS (secure)
✅ No sensitive data stored locally
✅ FormSubmit.co handles validation
✅ No database required
✅ No user tracking

## 📞 Support

If you need help:

1. **Check README.md** - Detailed docs
2. **Check js/script.js** - Code is well-commented
3. **Check css/style.css** - Variables at top for colors
4. **Google FormSubmit.co** - For form issues

## 🎯 Next Steps

1. ✅ Extract & open index.html
2. ✅ Test on your devices
3. ✅ Update contact information
4. ✅ Deploy to web (Netlify recommended)
5. ✅ Point your domain
6. ✅ Share with team!

---

**Version:** 1.0  
**Created:** June 2026  
**Updated:** Ready for deployment!

**Questions?** Check README.md for detailed documentation.
