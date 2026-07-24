// Page Navigation
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  document.getElementById('nav-' + name).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Contact Form Submission with Email
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      const formData = new FormData(this);
      const successMsg = document.getElementById('formSuccess');
      const errorMsg = document.getElementById('formError');
      const submitBtn = this.querySelector('button[type="submit"]');

      // Reset messages
      successMsg.style.display = 'none';
      errorMsg.style.display = 'none';

      try {
        // Using FormSubmit.co - free service that sends emails without backend
        const response = await fetch('https://formsubmit.co/ajax/sumathi@digikreis.in', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          // Show success message
          successMsg.style.display = 'block';
          successMsg.textContent = '✓ Your message has been sent successfully! We will get back to you soon.';

          // Change button temporarily
          submitBtn.textContent = '✓ Message Sent!';
          submitBtn.style.background = '#2e6e2e';
          submitBtn.style.color = '#fff';

          // Reset form
          this.reset();

          // Restore button after 3 seconds
          setTimeout(() => {
            submitBtn.textContent = 'Send Message';
            submitBtn.style.background = '';
            submitBtn.style.color = '';
          }, 3000);
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        errorMsg.style.display = 'block';
        errorMsg.textContent = '⚠ Error sending message. Please try again or contact us directly at sumathi@digikreis.in';
        console.error('Form error:', error);
      }
    });
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});


function toggleCourses(button) {
    const card = button.closest('.catalog-card');

    card.classList.toggle('expanded');

    button.textContent = card.classList.contains('expanded')
        ? 'Show Less'
        : 'Show More';
}

document.querySelectorAll('.catalog-card').forEach(card => {
    const totalCourses = card.querySelectorAll('li').length;
    const button = card.querySelector('.show-toggle');

    if (button && totalCourses <= 5) {
        button.style.display = 'none';
    }
});

async function checkWebsiteStatus() {
  try {
    const response = await fetch(
      'https://websitechecker.wellstalliontechnologies.in/api/status.php?site=digikreis'
    );

    const data = await response.json();

    if (!data.websiteEnabled) {
      document.body.innerHTML = `
        <div style="
          height:100vh;
          display:flex;
          align-items:center;
          justify-content:center;
          background:#0e0900;
          color:#fff;
          font-family:Inter,sans-serif;
          flex-direction:column;
        ">
          <h1>Website Under Maintenance</h1>
          <p>Please check back later.</p>
        </div>
      `;
      return false;
    }

    return true;
  } catch (error) {
    console.error('Website status check failed', error);
    return true;
  }
}


/* ══════════════════════════════════════════════════════════
   DigiKreis Technologies — script.js
   Includes: page routing, form handling, domain detail page,
   course cards, global search, WhatsApp/Email nav icons
══════════════════════════════════════════════════════════ */

/* ── PAGE NAVIGATION ─────────────────────────────────── */
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));

  const target = document.getElementById('page-' + page);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const navLink = document.getElementById('nav-' + page);
  if (navLink) navLink.classList.add('active');
}

/* ── LEARNING PATH TOGGLE ────────────────────────────── */
function toggleCourses(btn) {
  const card = btn.closest('.catalog-card');
  const extras = card.querySelectorAll('.extra-course');
  const isHidden = extras.length > 0 && extras[0].style.display === 'none' || extras[0].style.display === '';

  if (isHidden) {
    extras.forEach(el => el.style.display = 'list-item');
    btn.textContent = 'Show Less';
  } else {
    extras.forEach(el => el.style.display = 'none');
    btn.textContent = 'Show More';
  }
}

/* ── CONTACT FORM ────────────────────────────────────── */
// function checkWebsiteStatus() {
//   const form = document.getElementById('contactForm');
//   if (!form) return;

//   form.addEventListener('submit', async function (e) {
//     e.preventDefault();
//     const successEl = document.getElementById('formSuccess');
//     const errorEl = document.getElementById('formError');
//     successEl.textContent = '';
//     errorEl.textContent = '';

//     const data = new FormData(form);
//     try {
//       const response = await fetch('https://formsubmit.co/sumathi@digikreis.in', {
//         method: 'POST',
//         body: data
//       });
//       if (response.ok) {
//         successEl.textContent = '✅ Message sent! We will get back to you shortly.';
//         form.reset();
//       } else {
//         errorEl.textContent = '❌ Something went wrong. Please try again.';
//       }
//     } catch (err) {
//       errorEl.textContent = '❌ Network error. Please check your connection.';
//     }
//   });
// }

/* ── INIT EXTRA COURSES (hide by default) ─────────────── */
function initExtraCourses() {
  document.querySelectorAll('.extra-course').forEach(el => {
    el.style.display = 'none';
  });
}

/* ══════════════════════════════════════════════════════════
   COURSE DATA — All 25 Domains × 30 Courses
   Source: Google Sheets (Market Demand 2026 + Duration)
══════════════════════════════════════════════════════════ */
const DIGIKREIS_COURSES = {
  "Artificial Intelligence": [
  ["Artificial Intelligence - Administration","High","30 Hours"],
  ["Artificial Intelligence - Advanced Concepts","Very High","24 Hours"],
  ["Artificial Intelligence - Agentic AI","Very High","24 Hours"],
  ["Artificial Intelligence - AI APIs","High","24 Hours"],
  ["Artificial Intelligence - AI Applications","Very High","40 Hours"],
  ["Artificial Intelligence - AI Capstone Project","Very High","30 Hours"],
  ["Artificial Intelligence - AI Case Studies","High","24 Hours"],
  ["Artificial Intelligence - AI Certification Bootcamp","Very High","50 Hours"],
  ["Artificial Intelligence - AI Compliance","Very High","60 Hours"],
  ["Artificial Intelligence - AI Deployment","Very High","80 Hours"],
  ["Artificial Intelligence - AI Ethics","High","30 Hours"],
  ["Artificial Intelligence - AI for Business","Very High","50 Hours"],
  ["Artificial Intelligence - AI for Finance","Very High","80 Hours"],
  ["Artificial Intelligence - AI for Healthcare","Very High","60 Hours"],
  ["Artificial Intelligence - AI Frameworks","Very High","30 Hours"],
  ["Artificial Intelligence - AI Governance Advanced","Very High","80 Hours"],
  ["Artificial Intelligence - AI Interview Preparation","Very High","40 Hours"],
  ["Artificial Intelligence - AI Masterclass","Very High","80 Hours"],
  ["Artificial Intelligence - AI Model Deployment","Very High","30 Hours"],
  ["Artificial Intelligence - AI Optimization","High","24 Hours"],
  ["Artificial Intelligence - AI Product Development","Very High","50 Hours"],
  ["Artificial Intelligence - AI Project Management","Very High","60 Hours"],
  ["Artificial Intelligence - AI Research Methods","Very High","60 Hours"],
  ["Artificial Intelligence - AI Solutions","Very High","50 Hours"],
  ["Artificial Intelligence - AI Workflow Automation","Very High","40 Hours"],
  ["Artificial Intelligence - Analytics","Very High","50 Hours"],
  ["Artificial Intelligence - API Development","Very High","80 Hours"],
  ["Artificial Intelligence - Architecture","Very High","50 Hours"],
  ["Artificial Intelligence - Automation","Very High","80 Hours"],
  ["Artificial Intelligence - Best Practices","Very High","80 Hours"],
  ["Artificial Intelligence - Certification Prep","Very High","60 Hours"],
  ["Artificial Intelligence - CI/CD","Very High","60 Hours"],
  ["Artificial Intelligence - Computer Vision","Very High","40 Hours"],
  ["Artificial Intelligence - Consulting","Very High","30 Hours"],
  ["Artificial Intelligence - Data Modeling","Very High","30 Hours"],
  ["Artificial Intelligence - Deep Learning","High","24 Hours"],
  ["Artificial Intelligence - Development","Very High","40 Hours"],
  ["Artificial Intelligence - Engineering","Very High","50 Hours"],
  ["Artificial Intelligence - Enterprise Solutions","Very High","24 Hours"],
  ["Artificial Intelligence - Explainable AI","Very High","40 Hours"],
  ["Artificial Intelligence - Fundamentals","Medium","24 Hours"],
  ["Artificial Intelligence - Governance","Very High","60 Hours"],
  ["Artificial Intelligence - Hands-on Labs","Very High","30 Hours"],
  ["Artificial Intelligence - Implementation","High","24 Hours"],
  ["Artificial Intelligence - Infrastructure","Very High","80 Hours"],
  ["Artificial Intelligence - Integration","Very High","30 Hours"],
  ["Artificial Intelligence - Migration","Very High","80 Hours"],
  ["Artificial Intelligence - Monitoring","Very High","40 Hours"],
  ["Artificial Intelligence - Natural Language Processing","Very High","50 Hours"],
  ["Artificial Intelligence - Neural Networks","Very High","30 Hours"],
  ["Artificial Intelligence - Operations","Very High","40 Hours"],
  ["Artificial Intelligence - Performance Tuning","Very High","60 Hours"],
  ["Artificial Intelligence - Prompt Engineering","Medium","24 Hours"],
  ["Artificial Intelligence - Reinforcement Learning","Very High","60 Hours"],
  ["Artificial Intelligence - Reporting","Very High","40 Hours"],
  ["Artificial Intelligence - Scripting","Very High","50 Hours"],
  ["Artificial Intelligence - Security","Very High","60 Hours"],
  ["Artificial Intelligence - Testing","Very High","50 Hours"],
  ["Artificial Intelligence - Troubleshooting","Very High","40 Hours"],
  ["Artificial Intelligence - Edge AI","Very High","80 Hours"]
],
  "Machine Learning": [
  ["Machine Learning - Administration","High","30 Hours"],
  ["Machine Learning - Advanced Concepts","Very High","24 Hours"],
  ["Machine Learning - Agentic AI","Very High","24 Hours"],
  ["Machine Learning - Analytics","Very High","50 Hours"],
  ["Machine Learning - API Development","Very High","80 Hours"],
  ["Machine Learning - Architecture","Very High","50 Hours"],
  ["Machine Learning - Automation","Very High","80 Hours"],
  ["Machine Learning - Best Practices","Very High","80 Hours"],
  ["Machine Learning - Certification Prep","Very High","60 Hours"],
  ["Machine Learning - CI/CD","Very High","60 Hours"],
  ["Machine Learning - Consulting","Very High","30 Hours"],
  ["Machine Learning - Data Modeling","Very High","30 Hours"],
  ["Machine Learning - Development","Very High","40 Hours"],
  ["Machine Learning - Engineering","Very High","50 Hours"],
  ["Machine Learning - Enterprise Solutions","Very High","24 Hours"],
  ["Machine Learning - Fundamentals","Medium","24 Hours"],
  ["Machine Learning - Governance","Very High","60 Hours"],
  ["Machine Learning - Hands-on Labs","Very High","30 Hours"],
  ["Machine Learning - Implementation","Very High","24 Hours"],
  ["Machine Learning - Infrastructure","Very High","80 Hours"],
  ["Machine Learning - Integration","Very High","30 Hours"],
  ["Machine Learning - Migration","Very High","80 Hours"],
  ["Machine Learning - Monitoring","Very High","40 Hours"],
  ["Machine Learning - Operations","Very High","40 Hours"],
  ["Machine Learning - Performance Tuning","Very High","60 Hours"],
  ["Machine Learning - Reporting","Very High","40 Hours"],
  ["Machine Learning - Scripting","Very High","50 Hours"],
  ["Machine Learning - Security","Very High","60 Hours"],
  ["Machine Learning - Testing","Very High","50 Hours"],
  ["Machine Learning - Troubleshooting","Very High","40 Hours"]
  ],
  "Generative AI": [
  ["Generative AI - Administration","High","30 Hours"],
  ["Generative AI - Advanced Concepts","Very High","24 Hours"],
  ["Generative AI - Agentic AI","Very High","24 Hours"],
  ["Generative AI - Analytics","Very High","50 Hours"],
  ["Generative AI - API Development","Very High","80 Hours"],
  ["Generative AI - Architecture","Very High","50 Hours"],
  ["Generative AI - Automation","Very High","80 Hours"],
  ["Generative AI - Best Practices","Very High","80 Hours"],
  ["Generative AI - Certification Prep","Very High","60 Hours"],
  ["Generative AI - CI/CD","Very High","60 Hours"],
  ["Generative AI - Consulting","Very High","30 Hours"],
  ["Generative AI - Data Modeling","Very High","30 Hours"],
  ["Generative AI - Development","Very High","40 Hours"],
  ["Generative AI - Engineering","Very High","50 Hours"],
  ["Generative AI - Enterprise Solutions","Very High","24 Hours"],
  ["Generative AI - Fundamentals","Medium","24 Hours"],
  ["Generative AI - Governance","Very High","60 Hours"],
  ["Generative AI - Hands-on Labs","Very High","30 Hours"],
  ["Generative AI - Implementation","Very High","24 Hours"],
  ["Generative AI - Infrastructure","Very High","80 Hours"],
  ["Generative AI - Integration","Very High","30 Hours"],
  ["Generative AI - Migration","Very High","80 Hours"],
  ["Generative AI - Monitoring","Very High","40 Hours"],
  ["Generative AI - Operations","Very High","40 Hours"],
  ["Generative AI - Performance Tuning","Very High","60 Hours"],
  ["Generative AI - Reporting","Very High","40 Hours"],
  ["Generative AI - Scripting","Very High","50 Hours"],
  ["Generative AI - Security","Very High","60 Hours"],
  ["Generative AI - Testing","Very High","50 Hours"],
  ["Generative AI - Troubleshooting","Very High","40 Hours"]
  ],
  "Data Science": [
    ["Data Science - Fundamentals","High","24 Hours"],
    ["Data Science - Administration","High","30 Hours"],
    ["Data Science - Development","High","40 Hours"],
    ["Data Science - Architecture","High","50 Hours"],
    ["Data Science - Security","High","60 Hours"],
    ["Data Science - Automation","High","80 Hours"],
    ["Data Science - Advanced Concepts","High","24 Hours"],
    ["Data Science - Integration","High","30 Hours"],
    ["Data Science - Monitoring","High","40 Hours"],
    ["Data Science - Analytics","High","50 Hours"],
    ["Data Science - Performance Tuning","High","60 Hours"],
    ["Data Science - Migration","High","80 Hours"],
    ["Data Science - Implementation","High","24 Hours"],
    ["Data Science - Consulting","High","30 Hours"],
    ["Data Science - Troubleshooting","High","40 Hours"],
    ["Data Science - Testing","High","50 Hours"],
    ["Data Science - Certification Prep","High","60 Hours"],
    ["Data Science - Best Practices","High","80 Hours"],
    ["Data Science - Enterprise Solutions","High","24 Hours"],
    ["Data Science - Hands-on Labs","High","30 Hours"],
    ["Data Science - Operations","High","40 Hours"],
    ["Data Science - Engineering","High","50 Hours"],
    ["Data Science - Governance","High","60 Hours"],
    ["Data Science - API Development","High","80 Hours"],
    ["Data Science - Agentic AI","High","24 Hours"],
    ["Data Science - Data Modeling","High","30 Hours"],
    ["Data Science - Reporting","High","40 Hours"],
    ["Data Science - Scripting","High","50 Hours"],
    ["Data Science - CI/CD","High","60 Hours"],
    ["Data Science - Infrastructure","High","80 Hours"]
  ],
  "Cloud Computing": [
    ["Cloud Computing - Fundamentals","Very High","24 Hours"],
    ["Cloud Computing - Administration","Very High","30 Hours"],
    ["Cloud Computing - Development","Very High","40 Hours"],
    ["Cloud Computing - Architecture","Very High","50 Hours"],
    ["Cloud Computing - Security","Very High","60 Hours"],
    ["Cloud Computing - Automation","Very High","80 Hours"],
    ["Cloud Computing - Advanced Concepts","Very High","24 Hours"],
    ["Cloud Computing - Integration","Very High","30 Hours"],
    ["Cloud Computing - Monitoring","Very High","40 Hours"],
    ["Cloud Computing - Analytics","Very High","50 Hours"],
    ["Cloud Computing - Performance Tuning","Very High","60 Hours"],
    ["Cloud Computing - Migration","Very High","80 Hours"],
    ["Cloud Computing - Implementation","Very High","24 Hours"],
    ["Cloud Computing - Consulting","Very High","30 Hours"],
    ["Cloud Computing - Troubleshooting","Very High","40 Hours"],
    ["Cloud Computing - Testing","Very High","50 Hours"],
    ["Cloud Computing - Certification Prep","Very High","60 Hours"],
    ["Cloud Computing - Best Practices","Very High","80 Hours"],
    ["Cloud Computing - Enterprise Solutions","Very High","24 Hours"],
    ["Cloud Computing - Hands-on Labs","Very High","30 Hours"],
    ["Cloud Computing - Operations","Very High","40 Hours"],
    ["Cloud Computing - Engineering","Very High","50 Hours"],
    ["Cloud Computing - Governance","Very High","60 Hours"],
    ["Cloud Computing - API Development","Very High","80 Hours"],
    ["Cloud Computing - Agentic AI","Very High","24 Hours"],
    ["Cloud Computing - Data Modeling","Very High","30 Hours"],
    ["Cloud Computing - Reporting","Very High","40 Hours"],
    ["Cloud Computing - Scripting","Very High","50 Hours"],
    ["Cloud Computing - CI/CD","Very High","60 Hours"],
    ["Cloud Computing - Infrastructure","Very High","80 Hours"]
  ],
  "AWS": [
    ["AWS - Fundamentals","Very High","24 Hours"],
    ["AWS - Administration","Very High","30 Hours"],
    ["AWS - Development","Very High","40 Hours"],
    ["AWS - Architecture","Very High","50 Hours"],
    ["AWS - Security","Very High","60 Hours"],
    ["AWS - Automation","Very High","80 Hours"],
    ["AWS - Advanced Concepts","Very High","24 Hours"],
    ["AWS - Integration","Very High","30 Hours"],
    ["AWS - Monitoring","Very High","40 Hours"],
    ["AWS - Analytics","Very High","50 Hours"],
    ["AWS - Performance Tuning","Very High","60 Hours"],
    ["AWS - Migration","Very High","80 Hours"],
    ["AWS - Implementation","Very High","24 Hours"],
    ["AWS - Consulting","Very High","30 Hours"],
    ["AWS - Troubleshooting","Very High","40 Hours"],
    ["AWS - Testing","Very High","50 Hours"],
    ["AWS - Certification Prep","Very High","60 Hours"],
    ["AWS - Best Practices","Very High","80 Hours"],
    ["AWS - Enterprise Solutions","Very High","24 Hours"],
    ["AWS - Hands-on Labs","Very High","30 Hours"],
    ["AWS - Operations","Very High","40 Hours"],
    ["AWS - Engineering","Very High","50 Hours"],
    ["AWS - Governance","Very High","60 Hours"],
    ["AWS - API Development","Very High","80 Hours"],
    ["AWS - Agentic AI","Very High","24 Hours"],
    ["AWS - Data Modeling","Very High","30 Hours"],
    ["AWS - Reporting","Very High","40 Hours"],
    ["AWS - Scripting","Very High","50 Hours"],
    ["AWS - CI/CD","Very High","60 Hours"],
    ["AWS - Infrastructure","Very High","80 Hours"]
  ],
  "Microsoft Azure": [
    ["Microsoft Azure - Fundamentals","Very High","24 Hours"],
    ["Microsoft Azure - Administration","Very High","30 Hours"],
    ["Microsoft Azure - Development","Very High","40 Hours"],
    ["Microsoft Azure - Architecture","Very High","50 Hours"],
    ["Microsoft Azure - Security","Very High","60 Hours"],
    ["Microsoft Azure - Automation","Very High","80 Hours"],
    ["Microsoft Azure - Advanced Concepts","Very High","24 Hours"],
    ["Microsoft Azure - Integration","Very High","30 Hours"],
    ["Microsoft Azure - Monitoring","Very High","40 Hours"],
    ["Microsoft Azure - Analytics","Very High","50 Hours"],
    ["Microsoft Azure - Performance Tuning","Very High","60 Hours"],
    ["Microsoft Azure - Migration","Very High","80 Hours"],
    ["Microsoft Azure - Implementation","Very High","24 Hours"],
    ["Microsoft Azure - Consulting","Very High","30 Hours"],
    ["Microsoft Azure - Troubleshooting","Very High","40 Hours"],
    ["Microsoft Azure - Testing","Very High","50 Hours"],
    ["Microsoft Azure - Certification Prep","Very High","60 Hours"],
    ["Microsoft Azure - Best Practices","Very High","80 Hours"],
    ["Microsoft Azure - Enterprise Solutions","Very High","24 Hours"],
    ["Microsoft Azure - Hands-on Labs","Very High","30 Hours"],
    ["Microsoft Azure - Operations","Very High","40 Hours"],
    ["Microsoft Azure - Engineering","Very High","50 Hours"],
    ["Microsoft Azure - Governance","Very High","60 Hours"],
    ["Microsoft Azure - API Development","Very High","80 Hours"],
    ["Microsoft Azure - Agentic AI","Very High","24 Hours"],
    ["Microsoft Azure - Data Modeling","Very High","30 Hours"],
    ["Microsoft Azure - Reporting","Very High","40 Hours"],
    ["Microsoft Azure - Scripting","Very High","50 Hours"],
    ["Microsoft Azure - CI/CD","Very High","60 Hours"],
    ["Microsoft Azure - Infrastructure","Very High","80 Hours"]
  ],
  "Google Cloud": [
    ["Google Cloud - Fundamentals","Very High","24 Hours"],
    ["Google Cloud - Administration","Very High","30 Hours"],
    ["Google Cloud - Development","Very High","40 Hours"],
    ["Google Cloud - Architecture","Very High","50 Hours"],
    ["Google Cloud - Security","Very High","60 Hours"],
    ["Google Cloud - Automation","Very High","80 Hours"],
    ["Google Cloud - Advanced Concepts","Very High","24 Hours"],
    ["Google Cloud - Integration","Very High","30 Hours"],
    ["Google Cloud - Monitoring","Very High","40 Hours"],
    ["Google Cloud - Analytics","Very High","50 Hours"],
    ["Google Cloud - Performance Tuning","Very High","60 Hours"],
    ["Google Cloud - Migration","Very High","80 Hours"],
    ["Google Cloud - Implementation","Very High","24 Hours"],
    ["Google Cloud - Consulting","Very High","30 Hours"],
    ["Google Cloud - Troubleshooting","Very High","40 Hours"],
    ["Google Cloud - Testing","Very High","50 Hours"],
    ["Google Cloud - Certification Prep","Very High","60 Hours"],
    ["Google Cloud - Best Practices","Very High","80 Hours"],
    ["Google Cloud - Enterprise Solutions","Very High","24 Hours"],
    ["Google Cloud - Hands-on Labs","Very High","30 Hours"],
    ["Google Cloud - Operations","Very High","40 Hours"],
    ["Google Cloud - Engineering","Very High","50 Hours"],
    ["Google Cloud - Governance","Very High","60 Hours"],
    ["Google Cloud - API Development","Very High","80 Hours"],
    ["Google Cloud - Agentic AI","Very High","24 Hours"],
    ["Google Cloud - Data Modeling","Very High","30 Hours"],
    ["Google Cloud - Reporting","Very High","40 Hours"],
    ["Google Cloud - Scripting","Very High","50 Hours"],
    ["Google Cloud - CI/CD","Very High","60 Hours"],
    ["Google Cloud - Infrastructure","Very High","80 Hours"]
  ],
  "Cybersecurity": [
  ["Cybersecurity - Administration","High","30 Hours"],
  ["Cybersecurity - Advanced Concepts","Very High","24 Hours"],
  ["Cybersecurity - API Development","High","40 Hours"],
  ["Cybersecurity - Agentic AI","Very High","24 Hours"],
  ["Cybersecurity - Analytics","Very High","50 Hours"],
  ["Cybersecurity - Architecture","Very High","50 Hours"],
  ["Cybersecurity - Automation","Very High","80 Hours"],
  ["Cybersecurity - Best Practices","Very High","80 Hours"],
  ["Cybersecurity - Certification Prep","Very High","60 Hours"],
  ["Cybersecurity - CI/CD","Very High","60 Hours"],
  ["Cybersecurity - Consulting","Very High","30 Hours"],
  ["Cybersecurity - Data Modeling","Very High","30 Hours"],
  ["Cybersecurity - Development","Very High","40 Hours"],
  ["Cybersecurity - Engineering","Very High","50 Hours"],
  ["Cybersecurity - Enterprise Solutions","Very High","24 Hours"],
  ["Cybersecurity - Fundamentals","Medium","24 Hours"],
  ["Cybersecurity - Governance","Very High","60 Hours"],
  ["Cybersecurity - Hands-on Labs","Very High","30 Hours"],
  ["Cybersecurity - Implementation","Very High","24 Hours"],
  ["Cybersecurity - Infrastructure","Very High","80 Hours"],
  ["Cybersecurity - Integration","Very High","30 Hours"],
  ["Cybersecurity - Migration","Very High","80 Hours"],
  ["Cybersecurity - Monitoring","Very High","40 Hours"],
  ["Cybersecurity - Operations","Very High","40 Hours"],
  ["Cybersecurity - Performance Tuning","Very High","60 Hours"],
  ["Cybersecurity - Reporting","Very High","40 Hours"],
  ["Cybersecurity - Scripting","Very High","50 Hours"],
  ["Cybersecurity - Security","Very High","60 Hours"],
  ["Cybersecurity - Testing","Very High","50 Hours"],
  ["Cybersecurity - Troubleshooting","Very High","40 Hours"]
  ],
  "DevOps": [
    ["DevOps - Fundamentals","Very High","24 Hours"],
    ["DevOps - Administration","Very High","30 Hours"],
    ["DevOps - Development","Very High","40 Hours"],
    ["DevOps - Architecture","Very High","50 Hours"],
    ["DevOps - Security","Very High","60 Hours"],
    ["DevOps - Automation","Very High","80 Hours"],
    ["DevOps - Advanced Concepts","Very High","24 Hours"],
    ["DevOps - Integration","Very High","30 Hours"],
    ["DevOps - Monitoring","Very High","40 Hours"],
    ["DevOps - Analytics","Very High","50 Hours"],
    ["DevOps - Performance Tuning","Very High","60 Hours"],
    ["DevOps - Migration","Very High","80 Hours"],
    ["DevOps - Implementation","Very High","24 Hours"],
    ["DevOps - Consulting","Very High","30 Hours"],
    ["DevOps - Troubleshooting","Very High","40 Hours"],
    ["DevOps - Testing","Very High","50 Hours"],
    ["DevOps - Certification Prep","Very High","60 Hours"],
    ["DevOps - Best Practices","Very High","80 Hours"],
    ["DevOps - Enterprise Solutions","Very High","24 Hours"],
    ["DevOps - Hands-on Labs","Very High","30 Hours"],
    ["DevOps - Operations","Very High","40 Hours"],
    ["DevOps - Engineering","Very High","50 Hours"],
    ["DevOps - Governance","Very High","60 Hours"],
    ["DevOps - API Development","Very High","80 Hours"],
    ["DevOps - Agentic AI","Very High","24 Hours"],
    ["DevOps - Data Modeling","Very High","30 Hours"],
    ["DevOps - Reporting","Very High","40 Hours"],
    ["DevOps - Scripting","Very High","50 Hours"],
    ["DevOps - CI/CD","Very High","60 Hours"],
    ["DevOps - Infrastructure","Very High","80 Hours"]
  ],
  "Kubernetes": [
    ["Kubernetes - Fundamentals","Very High","24 Hours"],
    ["Kubernetes - Administration","Very High","30 Hours"],
    ["Kubernetes - Development","Very High","40 Hours"],
    ["Kubernetes - Architecture","Very High","50 Hours"],
    ["Kubernetes - Security","Very High","60 Hours"],
    ["Kubernetes - Automation","Very High","80 Hours"],
    ["Kubernetes - Advanced Concepts","Very High","24 Hours"],
    ["Kubernetes - Integration","Very High","30 Hours"],
    ["Kubernetes - Monitoring","Very High","40 Hours"],
    ["Kubernetes - Analytics","Very High","50 Hours"],
    ["Kubernetes - Performance Tuning","Very High","60 Hours"],
    ["Kubernetes - Migration","Very High","80 Hours"],
    ["Kubernetes - Implementation","Very High","24 Hours"],
    ["Kubernetes - Consulting","Very High","30 Hours"],
    ["Kubernetes - Troubleshooting","Very High","40 Hours"],
    ["Kubernetes - Testing","Very High","50 Hours"],
    ["Kubernetes - Certification Prep","Very High","60 Hours"],
    ["Kubernetes - Best Practices","Very High","80 Hours"],
    ["Kubernetes - Enterprise Solutions","Very High","24 Hours"],
    ["Kubernetes - Hands-on Labs","Very High","30 Hours"],
    ["Kubernetes - Operations","Very High","40 Hours"],
    ["Kubernetes - Engineering","Very High","50 Hours"],
    ["Kubernetes - Governance","Very High","60 Hours"],
    ["Kubernetes - API Development","Very High","80 Hours"],
    ["Kubernetes - Agentic AI","Very High","24 Hours"],
    ["Kubernetes - Data Modeling","Very High","30 Hours"],
    ["Kubernetes - Reporting","Very High","40 Hours"],
    ["Kubernetes - Scripting","Very High","50 Hours"],
    ["Kubernetes - CI/CD","Very High","60 Hours"],
    ["Kubernetes - Infrastructure","Very High","80 Hours"]
  ],
  "Docker": [
    ["Docker - Fundamentals","High","24 Hours"],
    ["Docker - Administration","High","30 Hours"],
    ["Docker - Development","High","40 Hours"],
    ["Docker - Architecture","High","50 Hours"],
    ["Docker - Security","High","60 Hours"],
    ["Docker - Automation","High","80 Hours"],
    ["Docker - Advanced Concepts","High","24 Hours"],
    ["Docker - Integration","High","30 Hours"],
    ["Docker - Monitoring","High","40 Hours"],
    ["Docker - Analytics","High","50 Hours"],
    ["Docker - Performance Tuning","High","60 Hours"],
    ["Docker - Migration","High","80 Hours"],
    ["Docker - Implementation","High","24 Hours"],
    ["Docker - Consulting","High","30 Hours"],
    ["Docker - Troubleshooting","High","40 Hours"],
    ["Docker - Testing","High","50 Hours"],
    ["Docker - Certification Prep","High","60 Hours"],
    ["Docker - Best Practices","High","80 Hours"],
    ["Docker - Enterprise Solutions","High","24 Hours"],
    ["Docker - Hands-on Labs","High","30 Hours"],
    ["Docker - Operations","High","40 Hours"],
    ["Docker - Engineering","High","50 Hours"],
    ["Docker - Governance","High","60 Hours"],
    ["Docker - API Development","High","80 Hours"],
    ["Docker - Agentic AI","High","24 Hours"],
    ["Docker - Data Modeling","High","30 Hours"],
    ["Docker - Reporting","High","40 Hours"],
    ["Docker - Scripting","High","50 Hours"],
    ["Docker - CI/CD","High","60 Hours"],
    ["Docker - Infrastructure","High","80 Hours"]
  ],
  "SAP": [
    ["SAP - Fundamentals","Very High","24 Hours"],
    ["SAP - Administration","Very High","30 Hours"],
    ["SAP - Development","Very High","40 Hours"],
    ["SAP - Architecture","Very High","50 Hours"],
    ["SAP - Security","Very High","60 Hours"],
    ["SAP - Automation","Very High","80 Hours"],
    ["SAP - Advanced Concepts","Very High","24 Hours"],
    ["SAP - Integration","Very High","30 Hours"],
    ["SAP - Monitoring","Very High","40 Hours"],
    ["SAP - Analytics","Very High","50 Hours"],
    ["SAP - Performance Tuning","Very High","60 Hours"],
    ["SAP - Migration","Very High","80 Hours"],
    ["SAP - Implementation","Very High","24 Hours"],
    ["SAP - Consulting","Very High","30 Hours"],
    ["SAP - Troubleshooting","Very High","40 Hours"],
    ["SAP - Testing","Very High","50 Hours"],
    ["SAP - Certification Prep","Very High","60 Hours"],
    ["SAP - Best Practices","Very High","80 Hours"],
    ["SAP - Enterprise Solutions","Very High","24 Hours"],
    ["SAP - Hands-on Labs","Very High","30 Hours"],
    ["SAP - Operations","Very High","40 Hours"],
    ["SAP - Engineering","Very High","50 Hours"],
    ["SAP - Governance","Very High","60 Hours"],
    ["SAP - API Development","Very High","80 Hours"],
    ["SAP - Agentic AI","Very High","24 Hours"],
    ["SAP - Data Modeling","Very High","30 Hours"],
    ["SAP - Reporting","Very High","40 Hours"],
    ["SAP - Scripting","Very High","50 Hours"],
    ["SAP - CI/CD","Very High","60 Hours"],
    ["SAP - Infrastructure","Very High","80 Hours"]
  ],
  "Salesforce": [
    ["Salesforce - Fundamentals","High","24 Hours"],
    ["Salesforce - Administration","High","30 Hours"],
    ["Salesforce - Development","High","40 Hours"],
    ["Salesforce - Architecture","High","50 Hours"],
    ["Salesforce - Security","High","60 Hours"],
    ["Salesforce - Automation","High","80 Hours"],
    ["Salesforce - Advanced Concepts","High","24 Hours"],
    ["Salesforce - Integration","High","30 Hours"],
    ["Salesforce - Monitoring","High","40 Hours"],
    ["Salesforce - Analytics","High","50 Hours"],
    ["Salesforce - Performance Tuning","High","60 Hours"],
    ["Salesforce - Migration","High","80 Hours"],
    ["Salesforce - Implementation","High","24 Hours"],
    ["Salesforce - Consulting","High","30 Hours"],
    ["Salesforce - Troubleshooting","High","40 Hours"],
    ["Salesforce - Testing","High","50 Hours"],
    ["Salesforce - Certification Prep","High","60 Hours"],
    ["Salesforce - Best Practices","High","80 Hours"],
    ["Salesforce - Enterprise Solutions","High","24 Hours"],
    ["Salesforce - Hands-on Labs","High","30 Hours"],
    ["Salesforce - Operations","High","40 Hours"],
    ["Salesforce - Engineering","High","50 Hours"],
    ["Salesforce - Governance","High","60 Hours"],
    ["Salesforce - API Development","High","80 Hours"],
    ["Salesforce - Agentic AI","High","24 Hours"],
    ["Salesforce - Data Modeling","High","30 Hours"],
    ["Salesforce - Reporting","High","40 Hours"],
    ["Salesforce - Scripting","High","50 Hours"],
    ["Salesforce - CI/CD","High","60 Hours"],
    ["Salesforce - Infrastructure","High","80 Hours"]
  ],
  "Oracle": [
    ["Oracle - Fundamentals","High","24 Hours"],
    ["Oracle - Administration","High","30 Hours"],
    ["Oracle - Development","High","40 Hours"],
    ["Oracle - Architecture","High","50 Hours"],
    ["Oracle - Security","High","60 Hours"],
    ["Oracle - Automation","High","80 Hours"],
    ["Oracle - Advanced Concepts","High","24 Hours"],
    ["Oracle - Integration","High","30 Hours"],
    ["Oracle - Monitoring","High","40 Hours"],
    ["Oracle - Analytics","High","50 Hours"],
    ["Oracle - Performance Tuning","High","60 Hours"],
    ["Oracle - Migration","High","80 Hours"],
    ["Oracle - Implementation","High","24 Hours"],
    ["Oracle - Consulting","High","30 Hours"],
    ["Oracle - Troubleshooting","High","40 Hours"],
    ["Oracle - Testing","High","50 Hours"],
    ["Oracle - Certification Prep","High","60 Hours"],
    ["Oracle - Best Practices","High","80 Hours"],
    ["Oracle - Enterprise Solutions","High","24 Hours"],
    ["Oracle - Hands-on Labs","High","30 Hours"],
    ["Oracle - Operations","High","40 Hours"],
    ["Oracle - Engineering","High","50 Hours"],
    ["Oracle - Governance","High","60 Hours"],
    ["Oracle - API Development","High","80 Hours"],
    ["Oracle - Agentic AI","High","24 Hours"],
    ["Oracle - Data Modeling","High","30 Hours"],
    ["Oracle - Reporting","High","40 Hours"],
    ["Oracle - Scripting","High","50 Hours"],
    ["Oracle - CI/CD","High","60 Hours"],
    ["Oracle - Infrastructure","High","80 Hours"]
  ],
  "Java": [
    ["Java - Fundamentals","High","24 Hours"],
    ["Java - Administration","High","30 Hours"],
    ["Java - Development","High","40 Hours"],
    ["Java - Architecture","High","50 Hours"],
    ["Java - Security","High","60 Hours"],
    ["Java - Automation","High","80 Hours"],
    ["Java - Advanced Concepts","High","24 Hours"],
    ["Java - Integration","High","30 Hours"],
    ["Java - Monitoring","High","40 Hours"],
    ["Java - Analytics","High","50 Hours"],
    ["Java - Performance Tuning","High","60 Hours"],
    ["Java - Migration","High","80 Hours"],
    ["Java - Implementation","High","24 Hours"],
    ["Java - Consulting","High","30 Hours"],
    ["Java - Troubleshooting","High","40 Hours"],
    ["Java - Testing","High","50 Hours"],
    ["Java - Certification Prep","High","60 Hours"],
    ["Java - Best Practices","High","80 Hours"],
    ["Java - Enterprise Solutions","High","24 Hours"],
    ["Java - Hands-on Labs","High","30 Hours"],
    ["Java - Operations","High","40 Hours"],
    ["Java - Engineering","High","50 Hours"],
    ["Java - Governance","High","60 Hours"],
    ["Java - API Development","High","80 Hours"],
    ["Java - Agentic AI","High","24 Hours"],
    ["Java - Data Modeling","High","30 Hours"],
    ["Java - Reporting","High","40 Hours"],
    ["Java - Scripting","High","50 Hours"],
    ["Java - CI/CD","High","60 Hours"],
    ["Java - Infrastructure","High","80 Hours"]
  ],
  ".NET": [
    [".NET - Fundamentals","High","24 Hours"],
    [".NET - Administration","High","30 Hours"],
    [".NET - Development","High","40 Hours"],
    [".NET - Architecture","High","50 Hours"],
    [".NET - Security","High","60 Hours"],
    [".NET - Automation","High","80 Hours"],
    [".NET - Advanced Concepts","High","24 Hours"],
    [".NET - Integration","High","30 Hours"],
    [".NET - Monitoring","High","40 Hours"],
    [".NET - Analytics","High","50 Hours"],
    [".NET - Performance Tuning","High","60 Hours"],
    [".NET - Migration","High","80 Hours"],
    [".NET - Implementation","High","24 Hours"],
    [".NET - Consulting","High","30 Hours"],
    [".NET - Troubleshooting","High","40 Hours"],
    [".NET - Testing","High","50 Hours"],
    [".NET - Certification Prep","High","60 Hours"],
    [".NET - Best Practices","High","80 Hours"],
    [".NET - Enterprise Solutions","High","24 Hours"],
    [".NET - Hands-on Labs","High","30 Hours"],
    [".NET - Operations","High","40 Hours"],
    [".NET - Engineering","High","50 Hours"],
    [".NET - Governance","High","60 Hours"],
    [".NET - API Development","High","80 Hours"],
    [".NET - Agentic AI","High","24 Hours"],
    [".NET - Data Modeling","High","30 Hours"],
    [".NET - Reporting","High","40 Hours"],
    [".NET - Scripting","High","50 Hours"],
    [".NET - CI/CD","High","60 Hours"],
    [".NET - Infrastructure","High","80 Hours"]
  ],
  "Python": [
    ["Python - Fundamentals","Very High","24 Hours"],
    ["Python - Administration","Very High","30 Hours"],
    ["Python - Development","Very High","40 Hours"],
    ["Python - Architecture","Very High","50 Hours"],
    ["Python - Security","Very High","60 Hours"],
    ["Python - Automation","Very High","80 Hours"],
    ["Python - Advanced Concepts","Very High","24 Hours"],
    ["Python - Integration","Very High","30 Hours"],
    ["Python - Monitoring","Very High","40 Hours"],
    ["Python - Analytics","Very High","50 Hours"],
    ["Python - Performance Tuning","Very High","60 Hours"],
    ["Python - Migration","Very High","80 Hours"],
    ["Python - Implementation","Very High","24 Hours"],
    ["Python - Consulting","Very High","30 Hours"],
    ["Python - Troubleshooting","Very High","40 Hours"],
    ["Python - Testing","Very High","50 Hours"],
    ["Python - Certification Prep","Very High","60 Hours"],
    ["Python - Best Practices","Very High","80 Hours"],
    ["Python - Enterprise Solutions","Very High","24 Hours"],
    ["Python - Hands-on Labs","Very High","30 Hours"],
    ["Python - Operations","Very High","40 Hours"],
    ["Python - Engineering","Very High","50 Hours"],
    ["Python - Governance","Very High","60 Hours"],
    ["Python - API Development","Very High","80 Hours"],
    ["Python - Agentic AI","Very High","24 Hours"],
    ["Python - Data Modeling","Very High","30 Hours"],
    ["Python - Reporting","Very High","40 Hours"],
    ["Python - Scripting","Very High","50 Hours"],
    ["Python - CI/CD","Very High","60 Hours"],
    ["Python - Infrastructure","Very High","80 Hours"]
  ],
  "Data Engineering": [
    ["Data Engineering - Fundamentals","High","24 Hours"],
    ["Data Engineering - Administration","High","30 Hours"],
    ["Data Engineering - Development","High","40 Hours"],
    ["Data Engineering - Architecture","High","50 Hours"],
    ["Data Engineering - Security","High","60 Hours"],
    ["Data Engineering - Automation","High","80 Hours"],
    ["Data Engineering - Advanced Concepts","High","24 Hours"],
    ["Data Engineering - Integration","High","30 Hours"],
    ["Data Engineering - Monitoring","High","40 Hours"],
    ["Data Engineering - Analytics","High","50 Hours"],
    ["Data Engineering - Performance Tuning","High","60 Hours"],
    ["Data Engineering - Migration","High","80 Hours"],
    ["Data Engineering - Implementation","High","24 Hours"],
    ["Data Engineering - Consulting","High","30 Hours"],
    ["Data Engineering - Troubleshooting","High","40 Hours"],
    ["Data Engineering - Testing","High","50 Hours"],
    ["Data Engineering - Certification Prep","High","60 Hours"],
    ["Data Engineering - Best Practices","High","80 Hours"],
    ["Data Engineering - Enterprise Solutions","High","24 Hours"],
    ["Data Engineering - Hands-on Labs","High","30 Hours"],
    ["Data Engineering - Operations","High","40 Hours"],
    ["Data Engineering - Engineering","High","50 Hours"],
    ["Data Engineering - Governance","High","60 Hours"],
    ["Data Engineering - API Development","High","80 Hours"],
    ["Data Engineering - Agentic AI","High","24 Hours"],
    ["Data Engineering - Data Modeling","High","30 Hours"],
    ["Data Engineering - Reporting","High","40 Hours"],
    ["Data Engineering - Scripting","High","50 Hours"],
    ["Data Engineering - CI/CD","High","60 Hours"],
    ["Data Engineering - Infrastructure","High","80 Hours"]
  ],
  "Blockchain": [
    ["Blockchain - Fundamentals","Medium","24 Hours"],
    ["Blockchain - Administration","Medium","30 Hours"],
    ["Blockchain - Development","Medium","40 Hours"],
    ["Blockchain - Architecture","Medium","50 Hours"],
    ["Blockchain - Security","Medium","60 Hours"],
    ["Blockchain - Automation","Medium","80 Hours"],
    ["Blockchain - Advanced Concepts","Medium","24 Hours"],
    ["Blockchain - Integration","Medium","30 Hours"],
    ["Blockchain - Monitoring","Medium","40 Hours"],
    ["Blockchain - Analytics","Medium","50 Hours"],
    ["Blockchain - Performance Tuning","Medium","60 Hours"],
    ["Blockchain - Migration","Medium","80 Hours"],
    ["Blockchain - Implementation","Medium","24 Hours"],
    ["Blockchain - Consulting","Medium","30 Hours"],
    ["Blockchain - Troubleshooting","Medium","40 Hours"],
    ["Blockchain - Testing","Medium","50 Hours"],
    ["Blockchain - Certification Prep","Medium","60 Hours"],
    ["Blockchain - Best Practices","Medium","80 Hours"],
    ["Blockchain - Enterprise Solutions","Medium","24 Hours"],
    ["Blockchain - Hands-on Labs","Medium","30 Hours"],
    ["Blockchain - Operations","Medium","40 Hours"],
    ["Blockchain - Engineering","Medium","50 Hours"],
    ["Blockchain - Governance","Medium","60 Hours"],
    ["Blockchain - API Development","Medium","80 Hours"],
    ["Blockchain - Agentic AI","Medium","24 Hours"],
    ["Blockchain - Data Modeling","Medium","30 Hours"],
    ["Blockchain - Reporting","Medium","40 Hours"],
    ["Blockchain - Scripting","Medium","50 Hours"],
    ["Blockchain - CI/CD","Medium","60 Hours"],
    ["Blockchain - Infrastructure","Medium","80 Hours"]
  ],
  "RPA": [
    ["RPA - Fundamentals","High","24 Hours"],
    ["RPA - Administration","High","30 Hours"],
    ["RPA - Development","High","40 Hours"],
    ["RPA - Architecture","High","50 Hours"],
    ["RPA - Security","High","60 Hours"],
    ["RPA - Automation","High","80 Hours"],
    ["RPA - Advanced Concepts","High","24 Hours"],
    ["RPA - Integration","High","30 Hours"],
    ["RPA - Monitoring","High","40 Hours"],
    ["RPA - Analytics","High","50 Hours"],
    ["RPA - Performance Tuning","High","60 Hours"],
    ["RPA - Migration","High","80 Hours"],
    ["RPA - Implementation","High","24 Hours"],
    ["RPA - Consulting","High","30 Hours"],
    ["RPA - Troubleshooting","High","40 Hours"],
    ["RPA - Testing","High","50 Hours"],
    ["RPA - Certification Prep","High","60 Hours"],
    ["RPA - Best Practices","High","80 Hours"],
    ["RPA - Enterprise Solutions","High","24 Hours"],
    ["RPA - Hands-on Labs","High","30 Hours"],
    ["RPA - Operations","High","40 Hours"],
    ["RPA - Engineering","High","50 Hours"],
    ["RPA - Governance","High","60 Hours"],
    ["RPA - API Development","High","80 Hours"],
    ["RPA - Agentic AI","High","24 Hours"],
    ["RPA - Data Modeling","High","30 Hours"],
    ["RPA - Reporting","High","40 Hours"],
    ["RPA - Scripting","High","50 Hours"],
    ["RPA - CI/CD","High","60 Hours"],
    ["RPA - Infrastructure","High","80 Hours"]
  ],
  "IoT": [
    ["IoT - Fundamentals","Medium","24 Hours"],
    ["IoT - Administration","Medium","30 Hours"],
    ["IoT - Development","Medium","40 Hours"],
    ["IoT - Architecture","Medium","50 Hours"],
    ["IoT - Security","Medium","60 Hours"],
    ["IoT - Automation","Medium","80 Hours"],
    ["IoT - Advanced Concepts","Medium","24 Hours"],
    ["IoT - Integration","Medium","30 Hours"],
    ["IoT - Monitoring","Medium","40 Hours"],
    ["IoT - Analytics","Medium","50 Hours"],
    ["IoT - Performance Tuning","Medium","60 Hours"],
    ["IoT - Migration","Medium","80 Hours"],
    ["IoT - Implementation","Medium","24 Hours"],
    ["IoT - Consulting","Medium","30 Hours"],
    ["IoT - Troubleshooting","Medium","40 Hours"],
    ["IoT - Testing","Medium","50 Hours"],
    ["IoT - Certification Prep","Medium","60 Hours"],
    ["IoT - Best Practices","Medium","80 Hours"],
    ["IoT - Enterprise Solutions","Medium","24 Hours"],
    ["IoT - Hands-on Labs","Medium","30 Hours"],
    ["IoT - Operations","Medium","40 Hours"],
    ["IoT - Engineering","Medium","50 Hours"],
    ["IoT - Governance","Medium","60 Hours"],
    ["IoT - API Development","Medium","80 Hours"],
    ["IoT - Agentic AI","Medium","24 Hours"],
    ["IoT - Data Modeling","Medium","30 Hours"],
    ["IoT - Reporting","Medium","40 Hours"],
    ["IoT - Scripting","Medium","50 Hours"],
    ["IoT - CI/CD","Medium","60 Hours"],
    ["IoT - Infrastructure","Medium","80 Hours"]
  ],
  "Networking": [
    ["Networking - Fundamentals","High","24 Hours"],
    ["Networking - Administration","High","30 Hours"],
    ["Networking - Development","High","40 Hours"],
    ["Networking - Architecture","High","50 Hours"],
    ["Networking - Security","High","60 Hours"],
    ["Networking - Automation","High","80 Hours"],
    ["Networking - Advanced Concepts","High","24 Hours"],
    ["Networking - Integration","High","30 Hours"],
    ["Networking - Monitoring","High","40 Hours"],
    ["Networking - Analytics","High","50 Hours"],
    ["Networking - Performance Tuning","High","60 Hours"],
    ["Networking - Migration","High","80 Hours"],
    ["Networking - Implementation","High","24 Hours"],
    ["Networking - Consulting","High","30 Hours"],
    ["Networking - Troubleshooting","High","40 Hours"],
    ["Networking - Testing","High","50 Hours"],
    ["Networking - Certification Prep","High","60 Hours"],
    ["Networking - Best Practices","High","80 Hours"],
    ["Networking - Enterprise Solutions","High","24 Hours"],
    ["Networking - Hands-on Labs","High","30 Hours"],
    ["Networking - Operations","High","40 Hours"],
    ["Networking - Engineering","High","50 Hours"],
    ["Networking - Governance","High","60 Hours"],
    ["Networking - API Development","High","80 Hours"],
    ["Networking - Agentic AI","High","24 Hours"],
    ["Networking - Data Modeling","High","30 Hours"],
    ["Networking - Reporting","High","40 Hours"],
    ["Networking - Scripting","High","50 Hours"],
    ["Networking - CI/CD","High","60 Hours"],
    ["Networking - Infrastructure","High","80 Hours"]
  ],
  "UI/UX": [
    ["UI/UX - Fundamentals","High","24 Hours"],
    ["UI/UX - Administration","High","30 Hours"],
    ["UI/UX - Development","High","40 Hours"],
    ["UI/UX - Architecture","High","50 Hours"],
    ["UI/UX - Security","High","60 Hours"],
    ["UI/UX - Automation","High","80 Hours"],
    ["UI/UX - Advanced Concepts","High","24 Hours"],
    ["UI/UX - Integration","High","30 Hours"],
    ["UI/UX - Monitoring","High","40 Hours"],
    ["UI/UX - Analytics","High","50 Hours"],
    ["UI/UX - Performance Tuning","High","60 Hours"],
    ["UI/UX - Migration","High","80 Hours"],
    ["UI/UX - Implementation","High","24 Hours"],
    ["UI/UX - Consulting","High","30 Hours"],
    ["UI/UX - Troubleshooting","High","40 Hours"],
    ["UI/UX - Testing","High","50 Hours"],
    ["UI/UX - Certification Prep","High","60 Hours"],
    ["UI/UX - Best Practices","High","80 Hours"],
    ["UI/UX - Enterprise Solutions","High","24 Hours"],
    ["UI/UX - Hands-on Labs","High","30 Hours"],
    ["UI/UX - Operations","High","40 Hours"],
    ["UI/UX - Engineering","High","50 Hours"],
    ["UI/UX - Governance","High","60 Hours"],
    ["UI/UX - API Development","High","80 Hours"],
    ["UI/UX - Agentic AI","High","24 Hours"],
    ["UI/UX - Data Modeling","High","30 Hours"],
    ["UI/UX - Reporting","High","40 Hours"],
    ["UI/UX - Scripting","High","50 Hours"],
    ["UI/UX - CI/CD","High","60 Hours"],
    ["UI/UX - Infrastructure","High","80 Hours"]
  ],
  "Full Stack": [
    ["Full Stack - Fundamentals","Very High","24 Hours"],
    ["Full Stack - Administration","Very High","30 Hours"],
    ["Full Stack - Development","Very High","40 Hours"],
    ["Full Stack - Architecture","Very High","50 Hours"],
    ["Full Stack - Security","Very High","60 Hours"],
    ["Full Stack - Automation","Very High","80 Hours"],
    ["Full Stack - Advanced Concepts","Very High","24 Hours"],
    ["Full Stack - Integration","Very High","30 Hours"],
    ["Full Stack - Monitoring","Very High","40 Hours"],
    ["Full Stack - Analytics","Very High","50 Hours"],
    ["Full Stack - Performance Tuning","Very High","60 Hours"],
    ["Full Stack - Migration","Very High","80 Hours"],
    ["Full Stack - Implementation","Very High","24 Hours"],
    ["Full Stack - Consulting","Very High","30 Hours"],
    ["Full Stack - Troubleshooting","Very High","40 Hours"],
    ["Full Stack - Testing","Very High","50 Hours"],
    ["Full Stack - Certification Prep","Very High","60 Hours"],
    ["Full Stack - Best Practices","Very High","80 Hours"],
    ["Full Stack - Enterprise Solutions","Very High","24 Hours"],
    ["Full Stack - Hands-on Labs","Very High","30 Hours"],
    ["Full Stack - Operations","Very High","40 Hours"],
    ["Full Stack - Engineering","Very High","50 Hours"],
    ["Full Stack - Governance","Very High","60 Hours"],
    ["Full Stack - API Development","Very High","80 Hours"],
    ["Full Stack - Agentic AI","Very High","24 Hours"],
    ["Full Stack - Data Modeling","Very High","30 Hours"],
    ["Full Stack - Reporting","Very High","40 Hours"],
    ["Full Stack - Scripting","Very High","50 Hours"],
    ["Full Stack - CI/CD","Very High","60 Hours"],
    ["Full Stack - Infrastructure","Very High","80 Hours"]
  ]
};

const COURSE_DETAILS = {
  "Artificial Intelligence - Administration": {
    level: "Intermediate",
    scheduleDays: 5,
    prerequisites: "Basic understanding of Artificial Intelligence concepts, cloud computing, operating systems, and networking fundamentals.",
    overview: "The Artificial Intelligence – Administration course is designed for IT professionals, system administrators, cloud engineers, and AI platform administrators responsible for deploying, managing, monitoring, and securing AI environments. Participants will learn how to administer AI platforms, configure AI infrastructure, manage data pipelines, monitor model performance, implement security controls, and maintain AI services in production environments. The course combines theoretical concepts with practical administration tasks to prepare learners for managing enterprise AI solutions efficiently.",
    objectives: ["Understand AI infrastructure and administration concepts.","Configure AI environments and supporting services.","Manage AI models, datasets, and deployments.","Monitor AI workloads and system performance.","Implement AI security, governance, and compliance practices.","Troubleshoot AI platform issues and optimize performance.","Administer enterprise AI solutions in cloud and on-premises environments."],
    days: [
      { day: 1, title: "AI Administration Fundamentals", topics: ["Introduction to AI Administration","AI Infrastructure Components","AI Platforms and Ecosystem","AI Deployment Models","User & Role Management","Environment Setup and Configuration","AI Administration Best Practices"], handsOn: ["Setting up an AI environment","Configuring user access and permissions","Exploring AI administration dashboards"], outcome: "Understand the responsibilities of an AI administrator and configure a basic AI environment." },
      { day: 2, title: "Managing AI Resources & Data", topics: ["AI Data Management","Dataset Administration","Storage and Resource Allocation","Compute Resource Management","AI Model Versioning","Backup and Recovery","Data Governance Basics"], handsOn: ["Managing datasets","Configuring storage resources","Creating backup strategies"], outcome: "Learn to manage AI resources, datasets, and storage efficiently." },
      { day: 3, title: "AI Deployment & Monitoring", topics: ["AI Model Deployment","Deployment Pipelines","Monitoring AI Services","Performance Metrics","Logging and Alerts","Scaling AI Applications","Troubleshooting Deployment Issues"], handsOn: ["Deploying an AI model","Configuring monitoring tools","Reviewing logs and alerts"], outcome: "Deploy AI solutions and monitor system health using administration tools." },
      { day: 4, title: "AI Security & Governance", topics: ["Identity and Access Management (IAM)","AI Security Best Practices","Data Privacy","Compliance Requirements","AI Governance Frameworks","Risk Management","Responsible AI Administration"], handsOn: ["Configuring access controls","Applying security policies","Reviewing governance settings"], outcome: "Implement secure and compliant administration practices for enterprise AI environments." },
      { day: 5, title: "Maintenance, Optimization & Final Project", topics: ["AI Platform Maintenance","Performance Optimization","Capacity Planning","Troubleshooting Techniques","AI Operations (AIOps) Overview","Career Guidance","Certification Preparation"], handsOn: [], outcome: "" }
    ],
    tools: ["Microsoft Azure AI","AWS AI Services","Google Cloud AI Platform","Python (Basic Administration Tasks)","Docker","Kubernetes (Introduction)","Git","Monitoring & Logging Tools"],
    careers: ["AI Administrator","AI Platform Administrator","Cloud AI Administrator","AI Operations Engineer","Machine Learning Platform Engineer","AI Infrastructure Engineer","MLOps Associate","AI Support Engineer"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified AI Practitioner","Google Professional Machine Learning Engineer","IBM AI Engineering Professional Certificate"],
    realWorldCases: { intro: "Configure and administer an AI environment by:", bullets: ["Setting up users and permissions","Managing datasets and resources","Deploying an AI model","Monitoring performance","Applying security and governance policies"] },
    faqs: [
      { question: "Who should attend this course?", answer: "IT administrators, cloud engineers, AI support professionals, DevOps engineers, and anyone responsible for managing AI platforms." },
      { question: "Is programming mandatory?", answer: "Basic scripting knowledge is helpful but not mandatory for administration tasks." },
      { question: "Will practical labs be included?", answer: "Yes. Each day includes hands-on administrative exercises and real-world scenarios." },
      { question: "Which AI platforms are covered?", answer: "The course introduces administration concepts across Microsoft Azure AI, AWS AI, and Google Cloud AI services." },
      { question: "What skills will I gain?", answer: "You will learn AI environment setup, deployment, monitoring, security, governance, troubleshooting, and platform administration for enterprise AI solutions." }
    ]
  },
  "Artificial Intelligence - Advanced Concepts": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Knowledge of AI fundamentals, Machine Learning, Python programming, and basic Deep Learning concepts.",
    overview: "The Artificial Intelligence – Advanced Concepts course is designed for professionals and AI practitioners who want to deepen their understanding of cutting-edge AI technologies and advanced methodologies. Participants will explore advanced Machine Learning algorithms, Deep Learning architectures, Large Language Models (LLMs), Generative AI, Reinforcement Learning, Explainable AI (XAI), AI Agents, MLOps, and emerging AI trends. Through practical labs and real-world case studies, learners will develop the skills required to design and implement next-generation AI solutions.",
    objectives: ["Understand advanced AI concepts and architectures.","Build intelligent applications using advanced AI techniques.","Work with Generative AI, LLMs, and AI Agents.","Apply Explainable AI (XAI) and Responsible AI principles.","Deploy and optimize enterprise AI solutions.","Evaluate modern AI frameworks and tools.","Explore future trends in Artificial Intelligence."],
    days: [
      { day: 1, title: "Advanced AI Foundations", topics: ["Evolution of Modern AI","Advanced Machine Learning Techniques","Deep Learning Architectures","Transformer Models","Large Language Models (LLMs)","AI Research Trends","Enterprise AI Use Cases"], handsOn: ["Exploring pre-trained AI models","Working with LLM-based applications","AI model comparison"], outcome: "Understand modern AI architectures and the technologies driving today's intelligent applications." },
      { day: 2, title: "Generative AI & Intelligent Systems", topics: ["Generative AI Fundamentals","Prompt Engineering Basics","AI Agents","Retrieval-Augmented Generation (RAG)","Multimodal AI","AI Assistants","Intelligent Automation"], handsOn: ["Building prompts for AI models","Creating a simple AI assistant","Working with Generative AI tools"], outcome: "Develop practical skills in creating AI-powered assistants and Generative AI applications." },
      { day: 3, title: "Advanced Model Development", topics: ["Transfer Learning","Reinforcement Learning Overview","Fine-Tuning AI Models","Explainable AI (XAI)","Model Evaluation Techniques","AI Performance Optimization","Bias Detection & Mitigation"], handsOn: ["Fine-tuning a pre-trained model","Evaluating model performance","Implementing Explainable AI techniques"], outcome: "Learn how to improve AI models while ensuring transparency, fairness, and performance." },
      { day: 4, title: "AI Deployment & Enterprise Solutions", topics: ["MLOps Fundamentals","AI Model Deployment","Cloud AI Platforms","API Integration","AI Security","Monitoring & Model Lifecycle Management","Scalable AI Architectures"], handsOn: ["Deploying an AI model","Integrating AI APIs","Monitoring deployed AI applications"], outcome: "Deploy and manage enterprise-grade AI solutions using industry best practices." },
      { day: 5, title: "Emerging AI Technologies & Capstone Project", topics: ["Autonomous AI Systems","Edge AI","AI Governance","Responsible AI","Future of Artificial Intelligence","Career Roadmap","Certification Guidance"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","TensorFlow","PyTorch","Hugging Face","OpenAI APIs","LangChain","MLflow","Docker","Git & GitHub","Azure AI Services","Google Vertex AI"],
    careers: ["Senior AI Engineer","Machine Learning Engineer","Generative AI Developer","AI Solutions Architect","AI Research Engineer","LLM Engineer","AI Consultant","AI Innovation Specialist"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Google Professional Machine Learning Engineer","AWS Certified AI Practitioner","TensorFlow Developer Certificate","IBM AI Engineering Professional Certificate"],
    realWorldCases: { intro: "Design and present an AI solution using advanced concepts such as LLMs, Generative AI, AI Agents, or Explainable AI to solve a real-world business problem.", bullets: [] },
    faqs: [
      { question: "Who should attend this course?", answer: "AI developers, machine learning engineers, software professionals, researchers, and anyone looking to master advanced AI technologies." },
      { question: "Will the course cover Generative AI and LLMs?", answer: "Yes. The curriculum includes Generative AI, Large Language Models, AI Agents, Prompt Engineering, and Retrieval-Augmented Generation (RAG)." },
      { question: "Are practical labs included?", answer: "Yes. Every training day includes hands-on labs, AI model development, deployment exercises, and a capstone project." },
      { question: "Which tools will be used?", answer: "Participants will work with Python, TensorFlow, PyTorch, Hugging Face, OpenAI APIs, LangChain, and cloud AI platforms." },
      { question: "What skills will I gain?", answer: "You will learn advanced AI development, model optimization, enterprise AI deployment, Generative AI implementation, and modern AI architecture best practices." }
    ]
  },
  "Artificial Intelligence - Agentic AI": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Python programming, Machine Learning, APIs, and Large Language Models (LLMs).",
    overview: "The Artificial Intelligence – Agentic AI course is designed for AI developers, software engineers, automation specialists, and technology professionals who want to build intelligent AI agents capable of reasoning, planning, decision-making, and executing tasks autonomously. Participants will learn the fundamentals of Agentic AI, autonomous workflows, multi-agent systems, tool integration, memory management, planning strategies, and enterprise AI agent deployment. Through practical labs and real-world projects, learners will develop production-ready AI agents that can automate complex business processes.",
    objectives: ["Understand the architecture and principles of Agentic AI.","Build autonomous AI agents using modern frameworks.","Integrate AI agents with APIs, databases, and external tools.","Design multi-agent collaboration workflows.","Implement memory, planning, and reasoning capabilities.","Deploy secure and scalable AI agents.","Apply Agentic AI in real-world business scenarios."],
    days: [
      { day: 1, title: "Agentic AI Fundamentals", topics: ["Introduction to Agentic AI","AI Agents vs Traditional AI","Autonomous Decision-Making","Agent Architecture","Large Language Models (LLMs)","Agent Workflows","Agent Design Best Practices"], handsOn: ["Setting up the Agentic AI development environment","Building a basic AI agent","Creating simple autonomous workflows"], outcome: "Understand the core concepts of Agentic AI and build a foundational autonomous agent." },
      { day: 2, title: "Memory, Planning & Tool Integration", topics: ["Agent Memory Management","Short-Term & Long-Term Memory","Planning & Task Decomposition","Tool Calling","API Integration","Database Connectivity","Retrieval-Augmented Generation (RAG) Basics"], handsOn: ["Integrating APIs with AI agents","Implementing memory modules","Creating planning workflows"], outcome: "Enable AI agents to remember context, plan tasks, and interact with external systems effectively." },
      { day: 3, title: "Multi-Agent Systems & Automation", topics: ["Multi-Agent Collaboration","Agent Communication","Workflow Automation","Event-Driven AI","Human-in-the-Loop Systems","Agent Orchestration","Error Handling"], handsOn: ["Building multi-agent workflows","Automating business tasks","Testing agent collaboration"], outcome: "Develop collaborative AI agents capable of solving complex business problems through coordinated workflows." },
      { day: 4, title: "Deployment, Security & Monitoring", topics: ["Deploying AI Agents","Agent Security","Authentication & Authorization","Monitoring Agent Performance","Logging & Observability","Performance Optimization","Responsible AI Practices"], handsOn: ["Deploying AI agents to cloud platforms","Monitoring agent activity","Securing autonomous workflows"], outcome: "Deploy secure, scalable, and reliable Agentic AI solutions for enterprise environments." },
      { day: 5, title: "Enterprise Agentic AI Project & Assessment", topics: ["Enterprise Agent Architecture","AI Agent Governance","Business Use Cases","Future Trends in Agentic AI","Career Roadmap","Certification Guidance","Project Review"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","LangChain","LangGraph","CrewAI","AutoGen","OpenAI API","Hugging Face","FastAPI","Docker","Git & GitHub","Vector Databases (FAISS/ChromaDB)","Azure AI & Google Vertex AI (Overview)"],
    careers: ["Agentic AI Developer","Generative AI Engineer","AI Automation Engineer","LLM Application Developer","AI Solutions Engineer","AI Research Engineer","Prompt Engineer","AI Product Developer"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified AI Practitioner","Google Professional Machine Learning Engineer","LangChain for LLM Application Development (Industry Training)","OpenAI API & Generative AI Professional Programs"],
    realWorldCases: { intro: "Build a complete enterprise AI agent that includes:", bullets: ["Business Use Cases","Autonomous task planning","Memory management","API and database integration","Multi-agent collaboration","Deployment and performance evaluation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "AI developers, software engineers, automation specialists, solution architects, and professionals interested in building autonomous AI agents." },
      { question: "Do I need prior experience with LLMs?", answer: "Basic knowledge of AI and Python is recommended. The course introduces LLM concepts before progressing to Agentic AI development." },
      { question: "Are hands-on projects included?", answer: "Yes. Every day includes practical labs focused on building AI agents, integrating tools, implementing memory, automating workflows, and developing a complete enterprise Agentic AI solution." },
      { question: "Which frameworks and tools are covered?", answer: "Participants will work with LangChain, LangGraph, CrewAI, AutoGen, OpenAI API, Hugging Face, FastAPI, Docker, Git & GitHub, and vector databases such as FAISS and ChromaDB." },
      { question: "What skills will I gain?", answer: "You will learn autonomous AI agent development, workflow orchestration, multi-agent collaboration, memory management, API integration, deployment, monitoring, and enterprise implementation of Agentic AI systems." }
    ]
  },
  "Artificial Intelligence - AI APIs": {
    level: "Intermediate",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Python programming, REST APIs, JSON, and web development fundamentals.",
    overview: "The Artificial Intelligence – AI APIs course is designed for AI developers, software engineers, web developers, solution architects, and IT professionals who want to integrate AI capabilities into applications using modern AI APIs. The course covers AI API fundamentals, RESTful services, authentication, API integration, prompt engineering, chatbot APIs, image and speech AI services, deployment, security, monitoring, and best practices. Through hands-on labs and real-world projects, participants will learn how to build intelligent applications using cloud-based AI APIs and Large Language Models (LLMs).",
    objectives: ["Understand AI API architecture and communication workflows.","Integrate AI APIs into web and mobile applications.","Authenticate and securely access AI services.","Build AI-powered chatbots and intelligent assistants.","Work with text, image, speech, and multimodal AI APIs.","Monitor, optimize, and secure AI API integrations.","Develop scalable AI-powered business applications."],
    days: [
      { day: 1, title: "AI API Fundamentals", topics: ["Introduction to AI APIs","REST API Basics","API Requests & Responses","JSON Data Handling","Authentication Methods","API Documentation","Best Practices"], handsOn: ["Connecting to AI APIs","Sending API requests","Parsing JSON responses"], outcome: "Understand AI API architecture and build applications that communicate with AI services." },
      { day: 2, title: "AI API Integration & Development", topics: ["OpenAI API Integration","NLP APIs","Image Generation APIs","Speech AI APIs","FastAPI Basics","API Error Handling","Rate Limits & Usage"], handsOn: ["Building AI-powered chat applications","Integrating image and speech APIs","Handling API responses efficiently"], outcome: "Develop AI-enabled applications using multiple AI services and APIs." },
      { day: 3, title: "Security & Performance Optimization", topics: ["API Security","API Keys & Authentication","OAuth Overview","Request Optimization","Caching Strategies","Logging & Monitoring","Cost Optimization"], handsOn: ["Securing API integrations","Monitoring API usage","Optimizing application performance"], outcome: "Build secure, reliable, and cost-effective AI API solutions." },
      { day: 4, title: "Deployment & Enterprise Integration", topics: ["API Deployment","Cloud Integration","Microservices Architecture","CI/CD for APIs","AI Workflow Automation","Enterprise AI Integration","API Versioning"], handsOn: ["Deploying AI-powered APIs","Integrating APIs with enterprise applications","Automating AI workflows"], outcome: "Deploy AI APIs into scalable production environments and integrate them with enterprise systems." },
      { day: 5, title: "Enterprise AI API Project & Assessment", topics: ["End-to-End AI API Solution","Industry Case Studies","Documentation Standards","Future Trends in AI APIs","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","OpenAI API","FastAPI","REST APIs","JSON","Postman","Docker","Git & GitHub","Azure AI Services","Google Cloud Vertex AI","AWS AI Services","Jupyter Notebook"],
    careers: ["AI API Developer","AI Integration Engineer","AI Application Developer","Software Engineer (AI)","Full Stack AI Developer","AI Solutions Architect","Cloud AI Developer","API Integration Specialist"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified AI Practitioner","Google Professional Machine Learning Engineer","Postman API Fundamentals Student Expert","IBM AI Engineering Professional Certificate"],
    realWorldCases: { intro: "Develop a complete AI-powered application that includes:", bullets: ["Industry Case Studies","AI API integration","Authentication and security","Chatbot or intelligent assistant","Cloud deployment","Monitoring and documentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "AI developers, software engineers, web developers, API developers, cloud professionals, and anyone interested in integrating AI capabilities into applications." },
      { question: "Is programming knowledge required?", answer: "Yes. Basic Python programming, REST APIs, and JSON handling are recommended for completing the practical integration exercises." },
      { question: "Are practical API projects included?", answer: "Yes. Every training day includes hands-on exercises covering OpenAI API integration, chatbot development, FastAPI implementation, cloud deployment, API security, monitoring, and a comprehensive enterprise AI API capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Participants will work with Python, OpenAI API, FastAPI, REST APIs, JSON, Postman, Docker, Git & GitHub, Microsoft Azure AI Services, AWS AI Services, Google Cloud Vertex AI, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn AI API integration, RESTful service development, authentication, chatbot development, multimodal AI APIs, deployment, security, monitoring, workflow automation, and enterprise AI application development using industry-standard tools and platforms." }
    ]
  },
  "Artificial Intelligence - AI Applications": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Machine Learning, Python programming, and data analytics concepts.",
    overview: "The Artificial Intelligence – AI Applications course is designed for AI developers, data scientists, software engineers, business professionals, solution architects, and technology enthusiasts who want to develop practical AI solutions across multiple industries. The course covers real-world AI applications, intelligent automation, natural language processing, computer vision, recommendation systems, predictive analytics, Generative AI, and enterprise AI implementation. Through hands-on projects and industry case studies, participants will learn how AI is applied to solve business challenges and create innovative products.",
    objectives: ["Understand real-world AI applications across industries.","Build AI-powered applications using modern frameworks and tools.","Develop intelligent automation and decision-support systems.","Implement NLP, Computer Vision, and Generative AI solutions.","Integrate AI models into enterprise applications.","Evaluate AI performance, scalability, and business impact.","Apply AI best practices for production-ready solutions."],
    days: [
      { day: 1, title: "Foundations of AI Applications", topics: ["Introduction to AI Applications","AI Solution Lifecycle","Business Use Cases","AI Application Architecture","Data Collection & Preparation","AI Development Workflow","Responsible AI Practices"], handsOn: ["Identifying AI use cases","Designing AI application architecture","Preparing datasets for AI solutions"], outcome: "Understand the AI application development process and identify practical business opportunities for AI implementation." },
      { day: 2, title: "Natural Language Processing & Computer Vision", topics: ["Natural Language Processing (NLP)","Sentiment Analysis","Chatbots & Virtual Assistants","Computer Vision","Image Classification","Object Detection","OCR Applications"], handsOn: ["Building an AI chatbot","Creating image recognition models","Developing NLP-based applications"], outcome: "Develop AI applications that process text, speech, and images for real-world business scenarios." },
      { day: 3, title: "Intelligent Automation & Predictive AI", topics: ["Predictive Analytics","Recommendation Systems","Intelligent Automation","AI Decision Support","Time Series Forecasting","Fraud Detection","Generative AI Applications"], handsOn: ["Building predictive AI models","Developing recommendation systems","Automating business workflows"], outcome: "Create intelligent AI solutions that automate decision-making and improve business efficiency." },
      { day: 4, title: "Deployment, Integration & Optimization", topics: ["AI Deployment","API Integration","Cloud AI Services","Performance Optimization","AI Security","Monitoring & Maintenance","Scalability Best Practices"], handsOn: ["Deploying AI applications","Integrating AI APIs","Optimizing application performance"], outcome: "Deploy secure, scalable, and high-performing AI applications for enterprise environments." },
      { day: 5, title: "Enterprise AI Application Project & Assessment", topics: ["End-to-End AI Solution Development","Industry Case Studies","AI Product Demonstration","Future Trends in AI Applications","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","TensorFlow","PyTorch","Scikit-learn","OpenAI API","Hugging Face Transformers","FastAPI","Docker","Jupyter Notebook","Git & GitHub","Microsoft Azure AI Services","Google Cloud Vertex AI"],
    careers: ["AI Application Developer","Machine Learning Engineer","AI Solutions Architect","Data Scientist","Generative AI Engineer","NLP Engineer","Computer Vision Engineer","AI Consultant"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified AI Practitioner","Google Professional Machine Learning Engineer","TensorFlow Developer Certificate","IBM AI Engineering Professional Certificate"],
    realWorldCases: { intro: "Develop a complete AI application that includes:", bullets: ["Business Use Cases","Industry Case Studies","Data preparation","AI model development","Business workflow integration","API deployment","Performance evaluation and documentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "AI developers, software engineers, data scientists, business analysts, solution architects, and professionals interested in building practical AI-powered applications." },
      { question: "Is prior programming knowledge required?", answer: "Yes. Basic Python programming and familiarity with AI or machine learning concepts are recommended for hands-on exercises and projects." },
      { question: "Are real-world projects included?", answer: "Yes. Every training day includes practical labs, AI application development exercises, chatbot creation, computer vision tasks, predictive analytics projects, and a comprehensive enterprise AI application project." },
      { question: "Which tools and platforms are covered?", answer: "Participants will work with Python, TensorFlow, PyTorch, Scikit-learn, OpenAI API, Hugging Face Transformers, FastAPI, Docker, Jupyter Notebook, Git & GitHub, Microsoft Azure AI Services, and Google Cloud Vertex AI." },
      { question: "What skills will I gain?", answer: "You will learn AI application development, NLP, computer vision, predictive analytics, intelligent automation, API integration, deployment, performance optimization, cloud AI implementation, and enterprise AI solution development using industry-standard tools and frameworks." }
    ]
  },
  "Artificial Intelligence - AI Capstone Project": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Machine Learning, Python programming, data analysis, and completion of foundational AI concepts or equivalent experience.",
    overview: "The Artificial Intelligence – AI Capstone Project course is designed for AI engineers, machine learning practitioners, software developers, data scientists, students, and professionals who want to apply their AI knowledge to solve real-world business problems. This project-based course focuses on the complete AI development lifecycle, including problem identification, data preparation, model development, deployment, performance evaluation, documentation, and project presentation. Participants will build an end-to-end AI solution using industry-standard tools, best practices, and enterprise methodologies.",
    objectives: ["Design and develop an end-to-end AI project.","Identify business problems suitable for AI solutions.","Collect, prepare, and analyze datasets.","Build, train, evaluate, and optimize AI models.","Deploy AI models into production environments.","Document and present AI projects professionally.","Demonstrate practical AI development skills through a complete capstone project."],
    days: [
      { day: 1, title: "Project Planning & Problem Definition", topics: ["Introduction to AI Capstone Projects","Business Problem Identification","AI Project Lifecycle","Requirement Analysis","Dataset Selection","Project Planning","Risk Assessment"], handsOn: ["Selecting a real-world AI problem","Defining project objectives","Preparing project documentation"], outcome: "Develop a structured project plan by identifying business requirements, project scope, datasets, and implementation strategies." },
      { day: 2, title: "Data Preparation & Model Development", topics: ["Data Collection","Data Cleaning","Feature Engineering","Model Selection","Model Training","Hyperparameter Tuning","Model Evaluation"], handsOn: ["Preparing datasets","Training machine learning and AI models","Comparing model performance"], outcome: "Build accurate AI models using structured datasets and evaluate their effectiveness through performance metrics." },
      { day: 3, title: "Deployment & Integration", topics: ["AI Model Deployment","REST API Development","FastAPI Integration","Cloud Deployment","Docker Fundamentals","AI Workflow Integration","Model Versioning"], handsOn: ["Deploying trained AI models","Creating inference APIs","Integrating AI into applications"], outcome: "Deploy AI solutions into production-ready environments using modern deployment and integration techniques." },
      { day: 4, title: "Optimization, Monitoring & Documentation", topics: ["Performance Optimization","AI Monitoring","Logging & Metrics","Security Best Practices","Documentation Standards","Project Testing","Continuous Improvement"], handsOn: ["Optimizing deployed models","Preparing technical documentation","Testing AI applications"], outcome: "Improve AI solution performance, ensure reliability, and produce professional project documentation suitable for enterprise environments." },
      { day: 5, title: "Final Project Presentation & Assessment", topics: ["Project Demonstration","Enterprise Case Study Review","AI Ethics & Responsible AI","Future Trends in AI","Career Guidance","Interview Preparation","Final Assessment"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","TensorFlow","PyTorch","Scikit-learn","Pandas","NumPy","Jupyter Notebook","FastAPI","Docker","Git & GitHub","MLflow","Microsoft Azure AI Services"],
    careers: ["AI Engineer","Machine Learning Engineer","Data Scientist","AI Solutions Developer","AI Research Assistant","MLOps Engineer","AI Consultant","Software Engineer (AI)"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified AI Practitioner","Google Professional Machine Learning Engineer","IBM AI Engineering Professional Certificate","TensorFlow Developer Certificate"],
    realWorldCases: { intro: "Develop and present a complete AI solution that includes:", bullets: ["Enterprise Case Study Review","Business problem definition","Data preprocessing","AI model development","Deployment using APIs or cloud platforms","Performance evaluation","Technical documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "AI engineers, machine learning practitioners, software developers, students, data scientists, and professionals who want to build and showcase a complete AI project." },
      { question: "Is prior AI knowledge required?", answer: "Yes. Participants should have a basic understanding of AI, machine learning, Python programming, and model development concepts before starting this capstone course." },
      { question: "Are practical projects included?", answer: "Yes. The course is entirely project-oriented, with hands-on activities each day culminating in a complete end-to-end AI capstone project, including deployment, documentation, and presentation." },
      { question: "Which tools and technologies are covered?", answer: "Participants will work with Python, TensorFlow, PyTorch, Scikit-learn, Pandas, NumPy, Jupyter Notebook, FastAPI, Docker, Git & GitHub, MLflow, and Microsoft Azure AI Services." },
      { question: "What skills will I gain?", answer: "You will learn project planning, dataset preparation, AI model development, deployment, monitoring, documentation, presentation skills, performance optimization, and enterprise AI project management using industry-standard tools and best practices." }
    ]
  },
  "Artificial Intelligence - AI Case Studies": {
    level: "Intermediate",
    scheduleDays: 5,
    prerequisites: "Basic understanding of Artificial Intelligence, Machine Learning, Python programming, data analytics, and business processes.",
    overview: "The Artificial Intelligence – AI Case Studies course is designed for AI professionals, business analysts, data scientists, developers, managers, consultants, and students who want to understand how Artificial Intelligence is applied to solve real-world business and industry challenges. The course explores successful AI implementations across healthcare, finance, retail, manufacturing, education, cybersecurity, logistics, and customer service. Through practical analysis, hands-on exercises, and industry projects, participants will learn AI implementation strategies, project planning, performance evaluation, and best practices for deploying enterprise AI solutions.",
    objectives: ["Understand real-world AI applications across multiple industries.","Analyze successful AI implementation strategies and business outcomes.","Evaluate AI project planning, deployment, and ROI.","Identify challenges, risks, and best practices in AI adoption.","Design AI solutions for industry-specific business problems.","Develop enterprise AI implementation roadmaps.","Apply AI knowledge to practical business scenarios."],
    days: [
      { day: 1, title: "AI Fundamentals & Industry Applications", topics: ["Introduction to AI Case Studies","AI Project Lifecycle","AI Business Value","Industry Use Cases","AI Success Stories","AI Challenges","Emerging AI Trends"], handsOn: ["Reviewing real-world AI implementations","Identifying business opportunities","Analyzing project outcomes"], outcome: "Understand how AI delivers value across industries and identify the factors that contribute to successful AI adoption." },
      { day: 2, title: "AI Case Studies in Key Industries", topics: ["AI in Healthcare","AI in Finance","AI in Retail & E-commerce","AI in Manufacturing","AI in Logistics","AI in Education","AI in Customer Service"], handsOn: ["Evaluating industry case studies","Mapping AI solutions to business problems","Measuring business impact"], outcome: "Analyze AI solutions implemented across industries and understand their business benefits, challenges, and outcomes." },
      { day: 3, title: "AI Project Planning & Implementation", topics: ["AI Strategy Development","Data Preparation","Model Selection","AI Deployment Planning","Risk Management","Governance","Change Management"], handsOn: ["Designing AI implementation plans","Assessing project risks","Developing AI roadmaps"], outcome: "Learn how successful organizations plan, manage, and deploy AI initiatives using structured implementation methodologies." },
      { day: 4, title: "AI Performance, Ethics & Optimization", topics: ["AI Performance Metrics","ROI Evaluation","AI Ethics","Responsible AI","Compliance & Security","Continuous Improvement","AI Governance"], handsOn: ["Measuring AI project success","Evaluating ethical AI practices","Optimizing AI performance"], outcome: "Assess AI project effectiveness while ensuring responsible, secure, and compliant AI implementations." },
      { day: 5, title: "Enterprise AI Case Study Project & Assessment", topics: ["End-to-End AI Project Analysis","Enterprise Case Studies","Future AI Trends","Innovation & Digital Transformation","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Jupyter Notebook","Power BI","Microsoft Azure AI Services","Google Vertex AI","TensorFlow","PyTorch","Scikit-learn","ChatGPT","Microsoft Copilot","Git & GitHub","Excel"],
    careers: ["AI Business Analyst","AI Consultant","AI Project Coordinator","Digital Transformation Consultant","Business Intelligence Analyst","AI Solutions Consultant","Innovation Manager","AI Strategy Analyst"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified AI Practitioner","Google Professional Machine Learning Engineer","IBM AI Engineering Professional Certificate","Microsoft Power Platform Fundamentals (PL-900)"],
    realWorldCases: { intro: "Analyze and present a complete AI implementation case study that includes:", bullets: ["Introduction to AI Case Studies","Industry Use Cases","Enterprise Case Studies","Business problem identification","AI solution architecture","Implementation strategy","Risk assessment","ROI evaluation and recommendations"] },
    faqs: [
      { question: "Who should attend this course?", answer: "Business professionals, AI practitioners, project managers, consultants, developers, analysts, students, and anyone interested in understanding real-world AI implementations across industries." },
      { question: "Is programming experience required?", answer: "Basic knowledge of AI concepts is recommended. Programming exercises are included but the course primarily focuses on AI implementation strategies, business case studies, and practical applications." },
      { question: "Are practical case studies included?", answer: "Yes. Every training day includes analysis of real-world AI implementations, workshops, implementation planning exercises, ROI evaluation, and a comprehensive enterprise AI case study capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Participants will work with Python, Jupyter Notebook, Power BI, Microsoft Azure AI Services, Google Vertex AI, TensorFlow, PyTorch, Scikit-learn, ChatGPT, Microsoft Copilot, Git & GitHub, and Excel." },
      { question: "What skills will I gain?", answer: "You will learn AI project analysis, business problem identification, implementation planning, ROI evaluation, AI governance, risk management, digital transformation strategies, performance optimization, and enterprise AI solution design using real-world industry case studies." }
    ]
  },
  "Artificial Intelligence - AI Certification Bootcamp": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Machine Learning, Python programming, data analysis, and cloud computing fundamentals.",
    overview: "The Artificial Intelligence – AI Certification Bootcamp is an intensive training program designed for students, AI engineers, software developers, data scientists, cloud professionals, and IT practitioners preparing for globally recognized AI certification exams. The course covers AI fundamentals, machine learning, deep learning, Natural Language Processing (NLP), computer vision, generative AI, MLOps, cloud AI services, responsible AI, deployment strategies, and certification exam preparation. Through hands-on labs, mock exams, practical projects, and instructor-led sessions, participants will gain the knowledge and confidence required to pass leading AI certification exams and apply AI skills in real-world enterprise environments.",
    objectives: ["Master core Artificial Intelligence and Machine Learning concepts.","Build and evaluate machine learning and deep learning models.","Understand NLP, computer vision, and Generative AI applications.","Deploy AI solutions using cloud platforms and MLOps practices.","Prepare for AI certification exams through mock tests and practice labs.","Apply responsible AI, governance, and security principles.","Demonstrate industry-ready AI skills for enterprise environments."],
    days: [
      { day: 1, title: "AI Fundamentals & Machine Learning", topics: ["Introduction to Artificial Intelligence","Machine Learning Fundamentals","Data Preparation","Supervised & Unsupervised Learning","Model Evaluation","AI Project Lifecycle","Certification Exam Overview"], handsOn: ["Building basic AI models","Preparing datasets","Practice quiz and exam questions"], outcome: "Develop a strong foundation in AI concepts and understand the structure of major AI certification exams." },
      { day: 2, title: "Deep Learning & Generative AI", topics: ["Neural Networks","Deep Learning Fundamentals","Computer Vision","Natural Language Processing","Large Language Models (LLMs)","Prompt Engineering","Generative AI Applications"], handsOn: ["Training deep learning models","Building NLP applications","Exploring Generative AI tools"], outcome: "Gain practical experience with modern AI technologies used in certification exams and enterprise applications." },
      { day: 3, title: "Cloud AI, MLOps & Deployment", topics: ["Azure AI Services","AWS AI Services","Google Vertex AI","AI Model Deployment","Docker & Containers","MLOps Fundamentals","Monitoring & Optimization"], handsOn: ["Deploying AI models","Implementing MLOps workflows","Managing cloud AI services"], outcome: "Learn to deploy, monitor, and manage AI solutions using modern cloud platforms and MLOps best practices." },
      { day: 4, title: "Responsible AI & Certification Practice", topics: ["Responsible AI","AI Ethics","AI Governance","Security & Compliance","Certification Exam Strategies","Mock Test Discussions","Interview Preparation"], handsOn: ["Solving certification-style questions","Mock examinations","Reviewing incorrect answers and improvement strategies"], outcome: "Build confidence by practicing real certification scenarios while understanding ethical and responsible AI implementation." },
      { day: 5, title: "Final Assessment & Capstone Project", topics: ["End-to-End AI Project","Certification Readiness Assessment","Enterprise Case Studies","Career Roadmap","Resume & Portfolio Review","Final Presentation","Feedback Session"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","TensorFlow","PyTorch","Scikit-learn","Pandas","NumPy","Jupyter Notebook","Microsoft Azure AI Services","AWS AI Services","Google Vertex AI","Docker","Git & GitHub"],
    careers: ["AI Engineer","Machine Learning Engineer","Data Scientist","AI Solutions Architect","MLOps Engineer","AI Consultant","Cloud AI Engineer","Generative AI Developer"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified AI Practitioner","Google Professional Machine Learning Engineer","IBM AI Engineering Professional Certificate","TensorFlow Developer Certificate"],
    realWorldCases: { intro: "Develop and present a complete AI solution that includes:", bullets: ["Enterprise Case Studies","Data preprocessing","AI model development","Cloud deployment","Performance evaluation","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "Students, AI engineers, software developers, data scientists, cloud professionals, IT practitioners, and anyone preparing for globally recognized Artificial Intelligence certification exams." },
      { question: "Is programming experience required?", answer: "Yes. Basic knowledge of Python programming, machine learning, and AI concepts is recommended for successfully completing the hands-on labs and certification practice exercises." },
      { question: "Are mock exams and practical labs included?", answer: "Yes. The course includes daily hands-on labs, certification-style practice questions, mock exams, cloud deployment exercises, AI projects, and a comprehensive capstone project to ensure exam readiness." },
      { question: "Which tools and technologies are covered?", answer: "Participants will work with Python, TensorFlow, PyTorch, Scikit-learn, Pandas, NumPy, Jupyter Notebook, Microsoft Azure AI Services, AWS AI Services, Google Vertex AI, Docker, and Git & GitHub." },
      { question: "What skills will I gain?", answer: "You will gain expertise in AI fundamentals, machine learning, deep learning, NLP, Generative AI, cloud AI services, MLOps, model deployment, responsible AI, certification exam preparation, and enterprise AI solution development using industry-standard tools and best practices." }
    ]
  },
  "Artificial Intelligence - AI Compliance": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic understanding of Artificial Intelligence, data governance, cybersecurity, risk management, and regulatory compliance concepts.",
    overview: "The Artificial Intelligence – AI Compliance course is designed for AI professionals, compliance officers, governance specialists, risk managers, legal advisors, data protection officers, and business leaders responsible for ensuring AI systems comply with legal, ethical, and organizational standards. The course covers AI governance, regulatory frameworks, data privacy, risk management, responsible AI, audit processes, security controls, documentation, and compliance monitoring. Through practical case studies and enterprise projects, participants will learn how to implement compliant AI systems while minimizing legal and operational risks.",
    objectives: ["Understand global AI compliance frameworks and regulations.","Implement AI governance and responsible AI practices.","Ensure compliance with data privacy and security standards.","Perform AI risk assessments and compliance audits.","Develop AI compliance documentation and policies.","Monitor AI systems for regulatory adherence.","Build enterprise AI compliance strategies."],
    days: [
      { day: 1, title: "AI Compliance Fundamentals", topics: ["Introduction to AI Compliance","Responsible AI Principles","AI Governance Frameworks","Regulatory Landscape","AI Risk Management","Compliance Lifecycle","Ethical AI Standards"], handsOn: ["Identifying compliance requirements","Mapping AI governance frameworks","Assessing regulatory risks"], outcome: "Understand the core principles of AI compliance and establish governance frameworks for responsible AI implementation." },
      { day: 2, title: "Data Privacy & Regulatory Compliance", topics: ["Data Privacy Principles","Data Protection Regulations","Consent Management","Data Classification","AI Security Controls","Compliance Documentation","Cross-Border Data Governance"], handsOn: ["Conducting privacy assessments","Preparing compliance documentation","Reviewing AI data handling practices"], outcome: "Implement privacy, security, and regulatory controls for AI systems handling sensitive data." },
      { day: 3, title: "AI Risk Management & Auditing", topics: ["AI Risk Identification","Bias & Fairness Evaluation","Compliance Auditing","Model Validation","Explainability & Transparency","Internal Controls","Third-Party Risk Management"], handsOn: ["Performing AI risk assessments","Conducting compliance audits","Evaluating AI model transparency"], outcome: "Develop practical skills to audit AI systems and manage compliance risks throughout the AI lifecycle." },
      { day: 4, title: "Enterprise Governance & Monitoring", topics: ["AI Governance Policies","Compliance Monitoring","Incident Management","Reporting & Documentation","Vendor Compliance","Continuous Improvement","Enterprise AI Oversight"], handsOn: ["Designing governance policies","Monitoring AI compliance metrics","Creating executive compliance reports"], outcome: "Build governance programs that continuously monitor AI systems and maintain regulatory compliance." },
      { day: 5, title: "Enterprise AI Compliance Project & Assessment", topics: ["End-to-End Compliance Strategy","Industry Case Studies","Regulatory Readiness","Future AI Regulations","Career Roadmap","Certification Guidance","Final Project Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Microsoft Responsible AI Dashboard","IBM AI Fairness 360 (AIF360)","Azure AI Services","Microsoft Purview","Power BI","Python","Jupyter Notebook","Git & GitHub","Compliance Management Tools","Risk Assessment Frameworks"],
    careers: ["AI Compliance Officer","Responsible AI Specialist","AI Governance Consultant","AI Risk Manager","Data Protection Officer","AI Audit Analyst","AI Policy Advisor","Enterprise Compliance Manager"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Microsoft Certified: Security, Compliance, and Identity Fundamentals (SC-900)","Certified Information Systems Auditor (CISA)","Certified Information Privacy Professional (CIPP)","IBM AI Engineering Professional Certificate"],
    realWorldCases: { intro: "Develop a complete AI compliance framework that includes:", bullets: ["Industry Case Studies","Governance policies","Risk assessment and audit plan","Data privacy controls","Compliance monitoring dashboard","Documentation and regulatory reporting"] },
    faqs: [
      { question: "Who should attend this course?", answer: "AI professionals, compliance officers, governance specialists, legal advisors, auditors, risk managers, data protection officers, and business leaders involved in AI initiatives." },
      { question: "Does this course focus on legal and regulatory compliance?", answer: "Yes. It covers AI governance, privacy, security, responsible AI, auditing, documentation, risk management, and global regulatory compliance practices." },
      { question: "Are practical compliance exercises included?", answer: "Yes. Every training day includes hands-on governance workshops, compliance assessments, audit simulations, documentation exercises, and a comprehensive enterprise AI compliance project." },
      { question: "Which tools and frameworks are covered?", answer: "Participants will work with Microsoft Responsible AI Dashboard, IBM AI Fairness 360 (AIF360), Microsoft Purview, Azure AI Services, Power BI, Python, Jupyter Notebook, Git & GitHub, and enterprise compliance frameworks." },
      { question: "What skills will I gain?", answer: "You will learn AI governance, regulatory compliance, data privacy, responsible AI implementation, compliance auditing, risk assessment, policy development, documentation, monitoring, and enterprise AI compliance management using industry best practices." }
    ]
  },
  "Artificial Intelligence - AI Deployment": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Machine Learning, Python programming, cloud computing, Docker, Kubernetes, APIs, and software deployment concepts.",
    overview: "The Artificial Intelligence – AI Deployment course is designed for AI engineers, MLOps professionals, DevOps engineers, cloud architects, software developers, and IT professionals who want to deploy AI models into production environments. The course covers deployment strategies, model serving, API development, cloud deployment, containerization, orchestration, CI/CD integration, monitoring, security, scaling, and lifecycle management. Through practical labs and enterprise projects, participants will gain hands-on experience in deploying secure, scalable, and production-ready AI solutions.",
    objectives: ["Understand AI deployment architectures and workflows.","Deploy AI models using APIs, containers, and cloud platforms.","Implement MLOps practices for production AI systems.","Secure AI deployments using authentication and access controls.","Monitor AI model performance and system health.","Scale AI applications for enterprise workloads.","Manage the complete lifecycle of deployed AI solutions."],
    days: [
      { day: 1, title: "AI Deployment Fundamentals", topics: ["Introduction to AI Deployment","AI Deployment Architectures","Model Packaging","Environment Configuration","REST API Fundamentals","FastAPI for AI Services","Deployment Best Practices"], handsOn: ["Preparing AI models for deployment","Building REST APIs for model inference","Configuring deployment environments"], outcome: "Understand the deployment lifecycle and prepare AI models for production-ready environments." },
      { day: 2, title: "Containerization & Cloud Deployment", topics: ["Docker Fundamentals","Kubernetes Orchestration","Cloud AI Services","Deployment Pipelines","Infrastructure as Code (IaC)","Resource Management","Load Balancing"], handsOn: ["Containerizing AI applications","Deploying AI services on Kubernetes","Publishing AI applications to cloud platforms"], outcome: "Deploy AI applications using modern container and cloud-native technologies." },
      { day: 3, title: "MLOps, Automation & CI/CD", topics: ["MLOps Fundamentals","MLflow","Model Versioning","CI/CD Pipelines","Automated Testing","Continuous Deployment","Release Management"], handsOn: ["Creating MLOps workflows","Automating AI deployments","Managing model versions"], outcome: "Build automated deployment pipelines that streamline AI model delivery and maintenance." },
      { day: 4, title: "Monitoring, Security & Optimization", topics: ["AI Monitoring","Logging & Observability","Performance Optimization","Auto Scaling","Authentication & Authorization","Security Best Practices","Disaster Recovery"], handsOn: ["Monitoring deployed AI models","Configuring security policies","Optimizing AI application performance"], outcome: "Maintain secure, reliable, and high-performing AI deployments in production environments." },
      { day: 5, title: "Enterprise AI Deployment Project & Assessment", topics: ["End-to-End AI Deployment Strategy","Production Readiness Assessment","Documentation Standards","Governance & Compliance","Future Deployment Trends","Career Roadmap","Certification Guidance"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","FastAPI","Docker","Kubernetes","MLflow","Git & GitHub","Azure AI Services","AWS AI Services","Google Cloud Vertex AI","Terraform","Prometheus","Grafana"],
    careers: ["AI Deployment Engineer","MLOps Engineer","AI DevOps Engineer","Cloud AI Engineer","Machine Learning Engineer","AI Platform Engineer","AI Infrastructure Engineer","AI Solutions Architect"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified AI Practitioner","Google Professional Machine Learning Engineer","Microsoft Azure DevOps Engineer Expert (AZ-400)","Certified Kubernetes Application Developer (CKAD)"],
    realWorldCases: { intro: "Develop and deploy a complete enterprise AI solution that includes:", bullets: ["AI model packaging","API development","Docker & Kubernetes deployment","Cloud hosting","Monitoring, scaling, and documentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "AI engineers, MLOps professionals, DevOps engineers, cloud architects, software developers, and IT professionals responsible for deploying and managing AI applications." },
      { question: "Is this course focused on production AI deployments?", answer: "Yes. The course covers end-to-end deployment of AI models, including packaging, API development, cloud deployment, monitoring, security, scaling, and lifecycle management." },
      { question: "Are practical deployment labs included?", answer: "Yes. Every training day includes hands-on exercises covering Docker, Kubernetes, FastAPI, MLflow, CI/CD, cloud deployment, monitoring, and enterprise AI deployment projects." },
      { question: "Which tools and platforms are covered?", answer: "Participants will work with Python, FastAPI, Docker, Kubernetes, MLflow, Git & GitHub, Terraform, Prometheus, Grafana, Microsoft Azure, AWS, and Google Cloud Vertex AI." },
      { question: "What skills will I gain?", answer: "You will learn AI model deployment, API development, containerization, cloud deployment, MLOps automation, monitoring, security, scaling, disaster recovery, and enterprise AI deployment best practices." }
    ]
  },
  "Artificial Intelligence - AI Ethics": {
    level: "Intermediate",
    scheduleDays: 5,
    prerequisites: "Basic understanding of Artificial Intelligence, Machine Learning, data privacy, and technology fundamentals.",
    overview: "The Artificial Intelligence – AI Ethics course is designed for AI professionals, data scientists, software developers, business leaders, policymakers, compliance officers, and researchers who want to develop and deploy AI responsibly. This course explores ethical principles, fairness, transparency, accountability, privacy, bias mitigation, responsible AI governance, legal considerations, and global AI regulations. Through real-world case studies and practical exercises, participants will learn how to build trustworthy AI systems that align with ethical standards and societal values.",
    objectives: ["Understand the principles of ethical AI and responsible innovation.","Identify and mitigate bias in AI systems.","Apply fairness, transparency, and explainability techniques.","Implement privacy and data protection practices.","Develop AI governance and accountability frameworks.","Evaluate ethical risks in AI applications.","Design AI solutions that comply with industry regulations and ethical standards."],
    days: [
      { day: 1, title: "Foundations of AI Ethics", topics: ["Introduction to AI Ethics","Responsible AI Principles","Ethical Decision-Making","Human-Centered AI","AI and Society","Ethical Frameworks","Global Perspectives on AI Ethics"], handsOn: ["Analyzing ethical AI case studies","Identifying ethical challenges in AI projects","Evaluating responsible AI practices"], outcome: "Understand the importance of ethics in AI development and identify key ethical considerations in real-world applications." },
      { day: 2, title: "Fairness, Bias & Explainability", topics: ["Algorithmic Bias","Fairness in AI","Explainable AI (XAI)","Transparency Techniques","Inclusive AI Design","Data Bias Detection","Bias Mitigation Strategies"], handsOn: ["Detecting bias in datasets","Evaluating AI fairness metrics","Interpreting AI model decisions"], outcome: "Learn how to build fair, transparent, and explainable AI systems that reduce discrimination and improve trust." },
      { day: 3, title: "Privacy, Security & Legal Compliance", topics: ["AI Privacy Principles","Data Protection","Consent Management","AI Security Risks","Regulatory Compliance","Intellectual Property in AI","Ethical Data Governance"], handsOn: ["Conducting privacy impact assessments","Reviewing AI compliance requirements","Developing secure AI data handling practices"], outcome: "Apply privacy, security, and legal compliance principles to AI development and deployment." },
      { day: 4, title: "Governance & Responsible AI Implementation", topics: ["AI Governance Frameworks","Accountability & Oversight","AI Risk Management","Ethical AI Policies","Responsible AI Lifecycle","Monitoring Ethical Performance","Organizational AI Governance"], handsOn: ["Designing AI governance policies","Assessing AI risks","Creating responsible AI implementation plans"], outcome: "Develop governance strategies that ensure ethical, transparent, and accountable AI systems within organizations." },
      { day: 5, title: "Enterprise AI Ethics Project & Assessment", topics: ["Ethical AI Strategy","Industry Case Studies","Emerging Ethical Challenges","Future of Responsible AI","Career Roadmap","Certification Guidance","Project Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python (Overview)","IBM AI Fairness 360 (AIF360)","Microsoft Responsible AI Dashboard","Google What-If Tool","Azure AI Services","Power BI","Jupyter Notebook","Git & GitHub","Data Governance Frameworks","Explainable AI (XAI) Tools"],
    careers: ["AI Ethics Consultant","Responsible AI Specialist","AI Governance Analyst","AI Compliance Officer","AI Risk Manager","Data Governance Consultant","AI Policy Advisor","AI Strategy Consultant"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Microsoft Certified: Security, Compliance, and Identity Fundamentals (SC-900)","AWS Certified AI Practitioner","Google Professional Machine Learning Engineer","IBM AI Engineering Professional Certificate"],
    realWorldCases: { intro: "Develop a comprehensive AI Ethics framework that includes:", bullets: ["Industry Case Studies","Ethical risk assessment","Bias mitigation strategy","Privacy and compliance measures","Governance and accountability plan","Responsible AI implementation roadmap"] },
    faqs: [
      { question: "Who should attend this course?", answer: "AI developers, data scientists, compliance officers, business leaders, policymakers, researchers, and professionals involved in designing, deploying, or governing AI systems." },
      { question: "Is this course technical or non-technical?", answer: "The course combines technical concepts with ethical, legal, and governance perspectives, making it suitable for both technical and business professionals." },
      { question: "Are real-world case studies included?", answer: "Yes. Every training day includes practical exercises, ethical case studies, governance assessments, and a final enterprise AI Ethics project." },
      { question: "Which tools and frameworks are covered?", answer: "Participants will work with IBM AI Fairness 360 (AIF360), Microsoft Responsible AI Dashboard, Google What-If Tool, Azure AI Services, Jupyter Notebook, Power BI, Git & GitHub, and Explainable AI (XAI) tools." },
      { question: "What skills will I gain?", answer: "You will learn ethical AI principles, fairness evaluation, bias detection and mitigation, explainable AI, privacy and compliance practices, AI governance, responsible AI implementation, and enterprise ethics frameworks for trustworthy AI systems." }
    ]
  },
  "Artificial Intelligence - AI for Business": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic understanding of Artificial Intelligence, business operations, digital transformation, data analysis, and management concepts.",
    overview: "The Artificial Intelligence – AI for Business course is designed for business leaders, managers, entrepreneurs, consultants, analysts, and technology professionals who want to leverage AI to improve business performance and drive innovation. The course covers AI fundamentals, business strategy, process automation, predictive analytics, customer experience, marketing intelligence, finance, HR, supply chain optimization, AI governance, and implementation strategies. Through practical workshops, business case studies, and real-world projects, participants will learn how to successfully integrate AI into business operations and decision-making.",
    objectives: ["Understand AI concepts and their business applications.","Identify opportunities for AI-driven business transformation.","Implement AI solutions across various business functions.","Improve decision-making using predictive analytics and AI insights.","Automate business processes with AI-powered tools.","Develop AI adoption strategies while ensuring governance and compliance.","Lead AI initiatives that enhance organizational efficiency and growth."],
    days: [
      { day: 1, title: "AI Fundamentals for Business", topics: ["Introduction to Artificial Intelligence","AI in Modern Business","Digital Transformation","Business Value of AI","AI Adoption Strategy","AI Technologies Overview","Industry Trends"], handsOn: ["Identifying AI opportunities in business","Mapping AI use cases","Evaluating business challenges"], outcome: "Understand how AI creates value across industries and identify practical business use cases." },
      { day: 2, title: "AI Applications Across Business Functions", topics: ["AI in Marketing","AI in Sales","AI in Customer Service","AI in Human Resources","AI in Finance","AI in Supply Chain","AI in Operations"], handsOn: ["Designing AI-powered business workflows","Building customer analytics models","Automating business processes"], outcome: "Apply AI solutions to optimize business operations, customer engagement, and organizational productivity." },
      { day: 3, title: "Data Analytics & Intelligent Decision-Making", topics: ["Business Intelligence","Predictive Analytics","Data Visualization","Forecasting","Recommendation Systems","KPI Monitoring","AI Dashboards"], handsOn: ["Building predictive business models","Creating AI-powered dashboards","Analyzing business performance"], outcome: "Use AI-driven insights to support strategic planning and informed business decisions." },
      { day: 4, title: "AI Strategy, Governance & Implementation", topics: ["AI Project Planning","AI Governance","Responsible AI","Risk Management","Change Management","AI Security","Enterprise AI Deployment"], handsOn: ["Developing AI implementation roadmaps","Assessing project risks","Designing governance frameworks"], outcome: "Plan and implement AI initiatives with proper governance, security, and organizational alignment." },
      { day: 5, title: "Enterprise AI Business Project & Assessment", topics: ["End-to-End AI Business Strategy","Industry Case Studies","ROI Measurement","Future Trends in Business AI","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Microsoft Copilot","ChatGPT","Power BI","Microsoft Power Automate","Excel","Python (Basics)","Azure AI Services","Google Vertex AI","OpenAI API","CRM & ERP AI Integrations","Jupyter Notebook","Git & GitHub"],
    careers: ["AI Business Consultant","Business Intelligence Analyst","Digital Transformation Consultant","AI Strategy Manager","Product Manager (AI)","Business Process Consultant","Innovation Manager","Enterprise AI Advisor"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Microsoft Power Platform Fundamentals (PL-900)","AWS Certified AI Practitioner","Google Professional Machine Learning Engineer","IBM AI Engineering Professional Certificate"],
    realWorldCases: { intro: "Develop a complete AI business transformation plan that includes:", bullets: ["Industry Case Studies","Business problem analysis","AI solution design","Process automation strategy","ROI estimation","Implementation roadmap and governance framework"] },
    faqs: [
      { question: "Who should attend this course?", answer: "Business leaders, entrepreneurs, managers, consultants, analysts, project managers, and technology professionals who want to integrate AI into business operations and strategy." },
      { question: "Is programming knowledge required?", answer: "No. Basic business knowledge is sufficient. Simple Python demonstrations are included, but the course primarily focuses on business applications and AI implementation strategies." },
      { question: "Are practical business projects included?", answer: "Yes. Every training day includes workshops, business case studies, AI implementation exercises, process automation activities, ROI analysis, and a comprehensive enterprise AI business transformation capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Participants will work with Microsoft Copilot, ChatGPT, Power BI, Microsoft Power Automate, Excel, Azure AI Services, Google Vertex AI, OpenAI API, CRM/ERP AI integrations, Jupyter Notebook, and Git & GitHub." },
      { question: "What skills will I gain?", answer: "You will learn AI strategy, business process automation, predictive analytics, customer intelligence, AI governance, digital transformation, ROI evaluation, implementation planning, and enterprise AI adoption using industry-standard tools and best practices." }
    ]
  },
  "Artificial Intelligence - AI for Finance": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Machine Learning, Python programming, finance fundamentals, statistics, and data analytics.",
    overview: "The Artificial Intelligence – AI for Finance course is designed for finance professionals, data analysts, AI engineers, fintech developers, investment analysts, risk managers, banking professionals, and business leaders who want to leverage Artificial Intelligence in financial services. The course covers AI applications in banking, investment management, fraud detection, credit scoring, algorithmic trading, financial forecasting, risk management, regulatory compliance, customer analytics, and intelligent financial automation. Through hands-on labs, real-world case studies, and enterprise projects, participants will gain practical expertise in building AI-powered financial solutions that improve efficiency, accuracy, security, and decision-making.",
    objectives: ["Understand AI applications across the financial industry.","Build predictive models for financial forecasting and risk analysis.","Develop AI-powered fraud detection and credit scoring systems.","Apply machine learning to investment and trading strategies.","Automate financial operations using AI and intelligent workflows.","Implement secure, compliant, and ethical AI solutions for finance.","Deploy enterprise-grade AI applications in banking and fintech environments."],
    days: [
      { day: 1, title: "AI Fundamentals in Finance", topics: ["Introduction to AI in Finance","Financial Data Sources","Banking & FinTech Ecosystem","AI Use Cases in Financial Services","Financial Data Preparation","AI Adoption Strategies","Industry Trends"], handsOn: ["Exploring financial datasets","Identifying AI opportunities in finance","Preparing financial data for AI models"], outcome: "Understand how Artificial Intelligence is transforming banking, insurance, investment, and financial services through intelligent automation and predictive analytics." },
      { day: 2, title: "Predictive Analytics & Financial Intelligence", topics: ["Financial Forecasting","Credit Risk Analysis","Credit Scoring Models","Customer Segmentation","Fraud Detection","Portfolio Analysis","Financial Dashboards"], handsOn: ["Building credit scoring models","Developing fraud detection systems","Creating predictive financial dashboards"], outcome: "Develop AI models that improve financial forecasting, customer analysis, fraud prevention, and credit risk assessment." },
      { day: 3, title: "AI for Banking, Investment & Trading", topics: ["Algorithmic Trading","Robo-Advisors","Investment Portfolio Optimization","Recommendation Systems","AI for Wealth Management","Market Trend Analysis","Sentiment Analysis for Finance"], handsOn: ["Designing investment recommendation models","Building trading prediction systems","Analyzing financial market sentiment"], outcome: "Implement AI-driven investment strategies and intelligent financial advisory solutions using machine learning and predictive analytics." },
      { day: 4, title: "Governance, Security & Enterprise Deployment", topics: ["AI Governance in Finance","Regulatory Compliance","Financial Data Privacy","AI Ethics","Cybersecurity for Financial AI","Cloud Deployment","Model Monitoring & Optimization"], handsOn: ["Deploying AI financial applications","Implementing secure AI environments","Monitoring production AI models"], outcome: "Deploy secure, compliant, and scalable AI solutions that meet financial industry regulations and enterprise requirements." },
      { day: 5, title: "Enterprise Finance AI Project & Assessment", topics: ["End-to-End Financial AI Solution","Banking & FinTech Case Studies","ROI Measurement","Emerging Trends in AI for Finance","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","TensorFlow","PyTorch","Scikit-learn","Pandas","NumPy","Jupyter Notebook","Power BI","Microsoft Azure AI Services","Google Vertex AI","MLflow","Git & GitHub"],
    careers: ["AI Engineer – Financial Services","FinTech AI Developer","Financial Data Scientist","Quantitative Analyst","Risk Analytics Specialist","Fraud Detection Analyst","Investment Analytics Consultant","AI Solutions Architect (Finance)"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified AI Practitioner","Google Professional Machine Learning Engineer","IBM AI Engineering Professional Certificate","Financial Risk Manager (FRM)"],
    realWorldCases: { intro: "Develop a complete AI-powered financial solution that includes:", bullets: ["Banking & FinTech Case Studies","Financial data preprocessing","Predictive analytics or fraud detection model","Investment or credit scoring application","Cloud deployment","Performance evaluation and documentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "Finance professionals, AI engineers, banking professionals, fintech developers, investment analysts, data scientists, risk managers, and business leaders looking to implement AI in financial services." },
      { question: "Is finance experience required?", answer: "Basic knowledge of finance concepts is recommended, but the course also introduces essential financial workflows and terminology before moving into AI implementation." },
      { question: "Are practical finance projects included?", answer: "Yes. Every training day includes hands-on labs covering financial forecasting, fraud detection, credit scoring, algorithmic trading concepts, AI deployment, and a comprehensive enterprise finance AI capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Participants will work with Python, TensorFlow, PyTorch, Scikit-learn, Pandas, NumPy, Jupyter Notebook, Power BI, Microsoft Azure AI Services, Google Vertex AI, MLflow, and Git & GitHub." },
      { question: "What skills will I gain?", answer: "You will learn financial data analysis, predictive analytics, fraud detection, credit scoring, portfolio optimization, algorithmic trading fundamentals, AI governance, financial compliance, cloud deployment, and enterprise AI solution development for banking and fintech industries." }
    ]
  },
  "Artificial Intelligence - AI for Healthcare": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Machine Learning, healthcare systems, Python programming, and data analytics concepts.",
    overview: "The Artificial Intelligence – AI for Healthcare course is designed for healthcare professionals, AI engineers, data scientists, medical researchers, health informatics specialists, and technology professionals who want to leverage Artificial Intelligence to improve patient care, diagnostics, clinical decision-making, and healthcare operations. The course covers AI fundamentals in healthcare, medical data analysis, predictive analytics, medical imaging, Natural Language Processing (NLP), clinical decision support systems, healthcare automation, AI ethics, regulatory compliance, and deployment of healthcare AI solutions. Through hands-on labs, case studies, and real-world healthcare projects, participants will gain practical experience in developing secure, reliable, and ethical AI-powered healthcare applications.",
    objectives: ["Understand AI applications across the healthcare industry.","Analyze and process healthcare data using AI techniques.","Develop AI models for disease prediction and clinical decision support.","Apply computer vision for medical image analysis.","Implement NLP solutions for electronic health records (EHRs).","Ensure regulatory compliance, privacy, and ethical AI practices.","Deploy AI-powered healthcare solutions in clinical environments."],
    days: [
      { day: 1, title: "AI Fundamentals in Healthcare", topics: ["Introduction to AI in Healthcare","Healthcare Data Sources","Electronic Health Records (EHR)","Medical Terminology","Healthcare AI Use Cases","AI Adoption Challenges","Healthcare Regulations Overview"], handsOn: ["Exploring healthcare datasets","Identifying AI use cases","Preparing healthcare data for analysis"], outcome: "Understand the role of AI in modern healthcare and prepare medical data for intelligent applications." },
      { day: 2, title: "Predictive Analytics & Clinical Decision Support", topics: ["Predictive Healthcare Models","Disease Risk Prediction","Clinical Decision Support Systems (CDSS)","Patient Outcome Prediction","AI for Personalized Medicine","Healthcare Data Visualization","Performance Evaluation"], handsOn: ["Building predictive healthcare models","Creating patient risk assessment dashboards","Evaluating AI model performance"], outcome: "Develop AI solutions that assist clinicians in diagnosis, treatment planning, and patient care optimization." },
      { day: 3, title: "Medical Imaging & Natural Language Processing", topics: ["AI in Medical Imaging","Computer Vision for Radiology","Image Classification & Segmentation","NLP for Clinical Documentation","Medical Chatbots","Healthcare Text Analytics","Large Language Models (LLMs) in Healthcare"], handsOn: ["Developing medical image analysis models","Extracting insights from clinical notes","Building AI-powered healthcare assistants"], outcome: "Apply computer vision and NLP techniques to enhance diagnostics, documentation, and patient interaction." },
      { day: 4, title: "AI Governance, Security & Deployment", topics: ["AI Ethics in Healthcare","Patient Data Privacy","HIPAA & Healthcare Compliance Overview","AI Governance","Healthcare Cybersecurity","Model Deployment","Monitoring & Continuous Improvement"], handsOn: ["Implementing privacy and security controls","Deploying healthcare AI applications","Monitoring deployed AI systems"], outcome: "Deploy secure, ethical, and compliant AI solutions that protect patient data and meet healthcare standards." },
      { day: 5, title: "Enterprise Healthcare AI Project & Assessment", topics: ["End-to-End Healthcare AI Solution","Industry Case Studies","Future Trends in Healthcare AI","AI for Telemedicine","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","TensorFlow","PyTorch","Scikit-learn","OpenCV","Hugging Face Transformers","Jupyter Notebook","FastAPI","Power BI","Azure AI Services","Google Cloud Healthcare AI","Git & GitHub"],
    careers: ["Healthcare AI Engineer","Clinical Data Scientist","Medical AI Researcher","Health Informatics Specialist","AI Solutions Architect (Healthcare)","Medical Imaging AI Engineer","Healthcare Data Analyst","Digital Health Consultant"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Google Professional Machine Learning Engineer","AWS Certified AI Practitioner","IBM AI Engineering Professional Certificate","Certified Professional in Healthcare Information and Management Systems (CPHIMS)"],
    realWorldCases: { intro: "Develop a complete AI-powered healthcare solution that includes:", bullets: ["Industry Case Studies","Medical data preprocessing","Disease prediction or medical image analysis","Clinical decision support integration","Secure deployment","Performance evaluation and documentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "Healthcare professionals, AI engineers, medical researchers, data scientists, health informatics specialists, software developers, and technology professionals interested in healthcare AI solutions." },
      { question: "Is healthcare experience required?", answer: "No. Basic knowledge of AI and data analysis is recommended. Healthcare concepts and workflows are introduced during the course to help learners understand domain-specific applications." },
      { question: "Are practical healthcare projects included?", answer: "Yes. Every training day includes hands-on labs covering healthcare data analysis, predictive modeling, medical imaging, NLP for clinical records, AI deployment, and a comprehensive enterprise healthcare AI capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Participants will work with Python, TensorFlow, PyTorch, Scikit-learn, OpenCV, Hugging Face Transformers, Jupyter Notebook, FastAPI, Power BI, Azure AI Services, Google Cloud Healthcare AI, and Git & GitHub." },
      { question: "What skills will I gain?", answer: "You will learn healthcare data analytics, disease prediction, medical image analysis, clinical decision support systems, NLP for healthcare, AI governance, patient data privacy, secure deployment, and enterprise healthcare AI solution development using industry-standard AI frameworks and tools." }
    ]
  },
  "Artificial Intelligence - AI Frameworks": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Machine Learning, Python programming, data structures, and software development fundamentals.",
    overview: "The Artificial Intelligence – AI Frameworks course is designed for AI developers, machine learning engineers, data scientists, software engineers, and researchers who want to build intelligent applications using modern AI frameworks. The course covers popular AI and deep learning frameworks, model development, training pipelines, deployment integration, framework comparison, optimization techniques, and enterprise implementation. Through hands-on labs and real-world projects, participants will gain practical experience using industry-standard AI frameworks to develop scalable and production-ready AI solutions.",
    objectives: ["Understand the architecture and ecosystem of leading AI frameworks.","Build AI and machine learning models using industry-standard tools.","Compare and select the right framework for different AI projects.","Develop, train, evaluate, and optimize AI models.","Deploy AI solutions using framework-specific tools.","Integrate AI frameworks into enterprise applications.","Apply best practices for scalable AI development."],
    days: [
      { day: 1, title: "AI Framework Fundamentals", topics: ["Introduction to AI Frameworks","AI Development Lifecycle","Python for AI Frameworks","Framework Architecture","Environment Setup","Package Management","AI Development Best Practices"], handsOn: ["Installing AI frameworks","Configuring development environments","Building a simple AI model"], outcome: "Understand the fundamentals of AI frameworks and prepare a development environment for AI applications." },
      { day: 2, title: "Machine Learning & Deep Learning Frameworks", topics: ["TensorFlow Fundamentals","PyTorch Basics","Scikit-learn","Keras","Model Training","Model Evaluation","Transfer Learning"], handsOn: ["Building machine learning models","Training deep learning models","Comparing framework performance"], outcome: "Develop AI models using leading machine learning and deep learning frameworks." },
      { day: 3, title: "Advanced Frameworks & AI Integration", topics: ["Hugging Face Transformers","LangChain","OpenAI API Integration","AI Pipelines","Natural Language Processing Frameworks","Computer Vision Libraries","Framework Selection Strategies"], handsOn: ["Integrating Large Language Models (LLMs)","Building AI workflows","Creating framework-based applications"], outcome: "Implement advanced AI solutions using modern frameworks and enterprise integrations." },
      { day: 4, title: "Deployment, Optimization & MLOps", topics: ["Model Deployment","ONNX Runtime","Docker Integration","MLflow","Performance Optimization","Model Monitoring","Framework Security Best Practices"], handsOn: ["Deploying AI models","Optimizing framework performance","Monitoring deployed applications"], outcome: "Deploy, optimize, and manage AI models using modern MLOps and deployment practices." },
      { day: 5, title: "Enterprise AI Framework Project & Assessment", topics: ["Enterprise AI Architecture","Framework Comparison","AI Solution Design","Documentation Standards","Future Trends in AI Frameworks","Career Roadmap","Certification Guidance"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","TensorFlow","PyTorch","Scikit-learn","Keras","Hugging Face Transformers","LangChain","OpenAI API","MLflow","Docker","ONNX Runtime","Git & GitHub"],
    careers: ["AI Developer","Machine Learning Engineer","Deep Learning Engineer","AI Research Engineer","Generative AI Engineer","AI Solutions Architect","NLP Engineer","Computer Vision Engineer"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified AI Practitioner","Google Professional Machine Learning Engineer","TensorFlow Developer Certificate","IBM AI Engineering Professional Certificate"],
    realWorldCases: { intro: "Develop a complete AI application using modern frameworks that includes:", bullets: ["Data preprocessing","Model development","Framework integration","Deployment pipeline","Performance evaluation and documentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "AI developers, machine learning engineers, software developers, data scientists, researchers, and professionals interested in mastering modern AI development frameworks." },
      { question: "Is prior programming experience required?", answer: "Yes. Basic Python programming and familiarity with machine learning concepts are recommended for understanding framework implementation and practical exercises." },
      { question: "Are practical labs included?", answer: "Yes. Every training day includes hands-on exercises covering TensorFlow, PyTorch, Scikit-learn, Hugging Face, LangChain, Docker, MLflow, OpenAI API integration, and a comprehensive enterprise AI framework project." },
      { question: "Which AI frameworks are covered?", answer: "Participants will work with TensorFlow, PyTorch, Scikit-learn, Keras, Hugging Face Transformers, LangChain, OpenAI API, MLflow, Docker, ONNX Runtime, Git & GitHub." },
      { question: "What skills will I gain?", answer: "You will learn AI framework selection, model development, deep learning, LLM integration, deployment, MLOps, performance optimization, framework comparison, and enterprise AI application development using industry-standard technologies." }
    ]
  },
  "Artificial Intelligence - AI Governance Advanced": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, AI governance, risk management, compliance, data privacy, and enterprise IT governance concepts.",
    overview: "The Artificial Intelligence – AI Governance Advanced course is designed for AI governance professionals, enterprise architects, compliance officers, risk managers, AI leaders, policymakers, and senior technology professionals responsible for governing large-scale AI initiatives. The course focuses on advanced AI governance frameworks, enterprise risk management, regulatory compliance, responsible AI, model lifecycle governance, auditing, ethics, security, policy implementation, and strategic AI oversight. Through hands-on workshops, enterprise case studies, and governance projects, participants will learn how to establish comprehensive AI governance programs for complex organizational environments.",
    objectives: ["Design enterprise-wide AI governance frameworks.","Implement advanced AI risk management strategies.","Develop AI governance policies and operating models.","Manage AI compliance across multiple regulatory frameworks.","Govern AI model lifecycles from development to retirement.","Conduct governance audits and performance assessments.","Build trustworthy, secure, and responsible enterprise AI ecosystems."],
    days: [
      { day: 1, title: "Enterprise AI Governance Foundations", topics: ["Advanced AI Governance Concepts","Enterprise Governance Frameworks","AI Governance Operating Models","Organizational Roles & Responsibilities","AI Policy Development","Strategic AI Planning","Governance Best Practices"], handsOn: ["Designing AI governance structures","Defining governance roles","Developing enterprise AI policies"], outcome: "Establish a comprehensive governance foundation for managing enterprise AI initiatives effectively." },
      { day: 2, title: "Risk, Compliance & Responsible AI", topics: ["Enterprise AI Risk Management","Regulatory Compliance Frameworks","Responsible AI Principles","Bias & Fairness Governance","Privacy & Data Protection","AI Security Governance","Third-Party AI Risk Management"], handsOn: ["Performing enterprise risk assessments","Evaluating compliance requirements","Developing responsible AI strategies"], outcome: "Implement governance practices that ensure ethical, compliant, and secure AI systems across the organization." },
      { day: 3, title: "AI Lifecycle Governance & Auditing", topics: ["AI Model Lifecycle Governance","Model Inventory & Documentation","Validation & Approval Processes","AI Auditing Techniques","Monitoring & Reporting","Incident Management","Governance Automation"], handsOn: ["Auditing AI systems","Creating governance dashboards","Monitoring AI lifecycle performance"], outcome: "Develop governance processes for continuous oversight, auditing, and lifecycle management of AI models." },
      { day: 4, title: "Enterprise Governance Operations", topics: ["Governance Committees","AI Portfolio Management","Vendor Governance","Performance Metrics & KPIs","Governance Reporting","Business Continuity Planning","Governance Maturity Assessment"], handsOn: ["Managing AI governance operations","Measuring governance effectiveness","Preparing executive governance reports"], outcome: "Operate enterprise AI governance programs using measurable performance indicators and organizational best practices." },
      { day: 5, title: "Enterprise AI Governance Capstone Project & Assessment", topics: ["End-to-End Governance Framework Implementation","Industry Case Studies","Emerging AI Regulations","Future of AI Governance","Career Roadmap","Certification Guidance","Executive Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Microsoft Responsible AI Dashboard","Microsoft Purview","IBM AI Fairness 360 (AIF360)","Azure AI Services","Power BI","Python","Jupyter Notebook","Git & GitHub","Governance, Risk & Compliance (GRC) Platforms","AI Model Monitoring Tools"],
    careers: ["AI Governance Manager","Enterprise AI Governance Consultant","Responsible AI Lead","AI Risk & Compliance Manager","AI Policy Advisor","Chief AI Governance Officer","AI Audit Manager","Enterprise AI Strategy Consultant"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Microsoft Certified: Security, Compliance, and Identity Fundamentals (SC-900)","Certified Information Systems Auditor (CISA)","Certified Information Security Manager (CISM)","IBM AI Engineering Professional Certificate"],
    realWorldCases: { intro: "Design a comprehensive enterprise AI governance program that includes:", bullets: ["Industry Case Studies","Governance framework and operating model","Risk management strategy","Compliance and audit plan","AI lifecycle governance","Executive governance dashboard and documentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "AI governance professionals, compliance officers, enterprise architects, AI leaders, risk managers, policymakers, auditors, and senior technology professionals responsible for enterprise AI oversight." },
      { question: "Does this course focus on enterprise governance?", answer: "Yes. It covers enterprise AI governance frameworks, policy development, risk management, compliance, lifecycle governance, auditing, strategic oversight, and governance operations." },
      { question: "Are practical governance workshops included?", answer: "Yes. Every training day includes governance planning exercises, policy development workshops, audit simulations, compliance assessments, executive reporting, and a comprehensive enterprise AI governance capstone project." },
      { question: "Which tools and frameworks are covered?", answer: "Participants will work with Microsoft Responsible AI Dashboard, Microsoft Purview, IBM AI Fairness 360 (AIF360), Azure AI Services, Power BI, Python, Jupyter Notebook, Git & GitHub, Governance, Risk & Compliance (GRC) platforms, and AI model monitoring tools." },
      { question: "What skills will I gain?", answer: "You will learn enterprise AI governance, policy development, regulatory compliance, responsible AI implementation, AI lifecycle governance, risk management, auditing, governance reporting, strategic oversight, and governance maturity assessment using industry-standard frameworks and tools." }
    ]
  },
  "Artificial Intelligence - AI Interview Preparation": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Machine Learning, Python programming, data structures, algorithms, and software development concepts.",
    overview: "The Artificial Intelligence – AI Interview Preparation course is designed for students, fresh graduates, AI engineers, machine learning professionals, software developers, and job seekers preparing for AI-related technical interviews. The course covers AI fundamentals, machine learning concepts, deep learning, NLP, computer vision, Python coding, system design, MLOps basics, behavioral interview preparation, resume building, mock interviews, and real-world case studies. Through practical coding exercises, interview simulations, and technical discussions, participants will build the confidence and skills needed to succeed in AI job interviews.",
    objectives: ["Master commonly asked AI and Machine Learning interview questions.","Strengthen Python programming and problem-solving skills.","Explain AI concepts with confidence during interviews.","Solve coding and machine learning challenges.","Prepare professional AI resumes and project portfolios.","Perform well in technical, behavioral, and HR interview rounds.","Build confidence through mock interviews and practical assessments."],
    days: [
      { day: 1, title: "AI Fundamentals & Technical Concepts", topics: ["Artificial Intelligence Fundamentals","Machine Learning Basics","Deep Learning Concepts","Supervised & Unsupervised Learning","NLP & Computer Vision Overview","AI Terminologies","Frequently Asked Interview Questions"], handsOn: ["AI concept revision","Technical discussion sessions","AI quiz and practice questions"], outcome: "Develop a strong understanding of core AI concepts commonly tested in technical interviews." },
      { day: 2, title: "Python, Coding & Problem Solving", topics: ["Python for AI Interviews","Data Structures","Algorithms","NumPy & Pandas Basics","Coding Challenges","SQL Basics","Problem-Solving Techniques"], handsOn: ["Solving coding questions","Python programming exercises","Algorithm practice sessions"], outcome: "Improve coding proficiency and analytical thinking required for AI technical assessments." },
      { day: 3, title: "Machine Learning, Deep Learning & MLOps", topics: ["Machine Learning Algorithms","Model Evaluation Metrics","Deep Learning Frameworks","Neural Networks","Model Deployment Basics","MLOps Fundamentals","AI Project Discussions"], handsOn: ["Model implementation exercises","Reviewing AI project case studies","Explaining technical projects"], outcome: "Strengthen practical AI knowledge and confidently explain projects during technical interviews." },
      { day: 4, title: "System Design, Resume & Mock Interviews", topics: ["AI System Design Basics","AI Architecture Questions","Resume Building","Portfolio Preparation","Behavioral Interview Questions","HR Interview Preparation","Communication Skills"], handsOn: ["Resume review","AI system design exercises","Mock HR and technical interviews"], outcome: "Prepare a professional AI profile and improve communication, presentation, and interview performance." },
      { day: 5, title: "Final Assessment & Career Preparation", topics: ["Complete Mock Interview","AI Case Study Discussion","Technical Presentation","Career Planning","Job Search Strategies","Certification Guidance","Final Feedback Session"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Jupyter Notebook","TensorFlow","PyTorch","Scikit-learn","NumPy","Pandas","SQL","Git & GitHub","VS Code","LeetCode","Kaggle"],
    careers: ["AI Engineer","Machine Learning Engineer","Data Scientist","NLP Engineer","Computer Vision Engineer","AI Research Associate","MLOps Engineer","AI Software Developer"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Google Professional Machine Learning Engineer","AWS Certified AI Practitioner","IBM AI Engineering Professional Certificate","TensorFlow Developer Certificate"],
    realWorldCases: { intro: "Complete an interview-ready AI portfolio that includes:", bullets: ["AI Case Study Discussion","AI project presentation","Technical documentation","GitHub project showcase","Resume and portfolio review","Mock technical interview evaluation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "Students, fresh graduates, AI engineers, software developers, machine learning professionals, and anyone preparing for AI-related technical interviews." },
      { question: "Is programming knowledge required?", answer: "Yes. Basic knowledge of Python, machine learning concepts, and problem-solving is recommended to get the maximum benefit from the practical interview exercises." },
      { question: "Are mock interviews included?", answer: "Yes. The course includes technical interviews, coding assessments, HR interview practice, resume reviews, portfolio evaluations, and real-world AI interview simulations." },
      { question: "Which tools and technologies are covered?", answer: "Participants will work with Python, Jupyter Notebook, TensorFlow, PyTorch, Scikit-learn, NumPy, Pandas, SQL, Git & GitHub, VS Code, LeetCode, and Kaggle." },
      { question: "What skills will I gain?", answer: "You will strengthen AI fundamentals, coding skills, machine learning concepts, deep learning knowledge, system design, resume preparation, technical communication, mock interview performance, and overall interview readiness for AI and machine learning roles." }
    ]
  },
  "Artificial Intelligence - AI Masterclass": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Machine Learning, Python programming, mathematics, statistics, and deep learning fundamentals.",
    overview: "The Artificial Intelligence – AI Masterclass is a comprehensive, industry-focused program designed for AI engineers, machine learning professionals, software developers, data scientists, researchers, solution architects, and technology leaders who want to master Artificial Intelligence from fundamentals to advanced enterprise applications. The course covers machine learning, deep learning, Natural Language Processing (NLP), Computer Vision, Generative AI, Large Language Models (LLMs), AI agents, MLOps, cloud AI services, AI governance, deployment strategies, and enterprise AI architecture. Through extensive hands-on labs, real-world projects, and case studies, participants will gain the expertise required to design, develop, deploy, and manage enterprise-grade AI solutions.",
    objectives: ["Master core and advanced Artificial Intelligence concepts.","Design and develop machine learning and deep learning models.","Build AI applications using NLP, Computer Vision, and Generative AI.","Develop AI agents and intelligent automation solutions.","Deploy AI models using MLOps and cloud platforms.","Implement responsible AI, governance, security, and compliance practices.","Build scalable, production-ready AI solutions for enterprise environments."],
    days: [
      { day: 1, title: "AI Foundations & Machine Learning", topics: ["Introduction to Artificial Intelligence","Machine Learning Fundamentals","Data Preparation & Feature Engineering","Supervised & Unsupervised Learning","Model Evaluation Techniques","AI Project Lifecycle","Industry Use Cases"], handsOn: ["Data preprocessing","Building machine learning models","Evaluating model performance"], outcome: "Develop a strong foundation in AI and machine learning while understanding how intelligent systems solve real-world business problems." },
      { day: 2, title: "Deep Learning, NLP & Computer Vision", topics: ["Neural Networks","Deep Learning Architectures","Computer Vision","Natural Language Processing","Transformer Models","Large Language Models (LLMs)","Generative AI Fundamentals"], handsOn: ["Training deep learning models","Building NLP applications","Developing computer vision solutions"], outcome: "Gain practical expertise in developing intelligent AI applications using deep learning, NLP, computer vision, and modern Generative AI technologies." },
      { day: 3, title: "AI Agents, MLOps & Cloud AI", topics: ["AI Agents","Prompt Engineering","AI Workflow Automation","MLOps Fundamentals","Docker & Kubernetes","Cloud AI Services","Model Deployment"], handsOn: ["Building AI agents","Deploying AI models","Automating AI workflows"], outcome: "Learn to deploy, manage, and scale AI applications using cloud platforms, automation frameworks, and modern MLOps practices." },
      { day: 4, title: "Enterprise AI Architecture & Governance", topics: ["Enterprise AI Architecture","Responsible AI","AI Ethics","Security & Compliance","AI Governance","Performance Optimization","Monitoring & Continuous Improvement"], handsOn: ["Designing enterprise AI architectures","Implementing governance frameworks","Optimizing production AI systems"], outcome: "Design secure, scalable, and compliant enterprise AI solutions aligned with industry best practices." },
      { day: 5, title: "Enterprise AI Capstone Project & Assessment", topics: ["End-to-End AI Solution Development","Industry Case Studies","AI Innovation & Future Trends","Career Roadmap","Certification Guidance","Project Presentation","Final Assessment"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","TensorFlow","PyTorch","Scikit-learn","Hugging Face Transformers","LangChain","OpenAI API","Docker","Kubernetes","MLflow","Microsoft Azure AI Services","AWS AI Services","Google Vertex AI","Git & GitHub","Jupyter Notebook"],
    careers: ["AI Engineer","Machine Learning Engineer","Generative AI Engineer","NLP Engineer","Computer Vision Engineer","MLOps Engineer","AI Solutions Architect","AI Research Scientist"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified AI Practitioner","Google Professional Machine Learning Engineer","IBM AI Engineering Professional Certificate","TensorFlow Developer Certificate"],
    realWorldCases: { intro: "Design and develop a complete enterprise AI solution that includes:", bullets: ["Industry Use Cases","Industry Case Studies","Business problem analysis","Data preparation","AI model development","AI agent or Generative AI integration","Cloud deployment","Performance evaluation","Technical documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "AI engineers, machine learning professionals, software developers, data scientists, researchers, solution architects, cloud professionals, and anyone seeking advanced, end-to-end expertise in Artificial Intelligence." },
      { question: "Is prior AI experience required?", answer: "Yes. Participants should have a foundational understanding of AI, Python programming, machine learning, and basic deep learning concepts to fully benefit from this advanced masterclass." },
      { question: "Are practical projects included?", answer: "Yes. Every training day includes hands-on labs, enterprise case studies, AI model development, deployment exercises, AI agent implementation, and a comprehensive enterprise AI capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Participants will work with Python, TensorFlow, PyTorch, Scikit-learn, Hugging Face Transformers, LangChain, OpenAI API, Docker, Kubernetes, MLflow, Microsoft Azure AI Services, AWS AI Services, Google Vertex AI, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will master machine learning, deep learning, NLP, computer vision, Generative AI, AI agents, prompt engineering, MLOps, cloud deployment, enterprise AI architecture, AI governance, performance optimization, and end-to-end AI solution development using industry-standard tools and best practices." }
    ]
  },
  "Artificial Intelligence - AI Model Deployment": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Machine Learning, Python programming, REST APIs, Docker, and cloud computing concepts.",
    overview: "The Artificial Intelligence – AI Model Deployment course is designed for AI engineers, machine learning engineers, MLOps professionals, software developers, DevOps engineers, and cloud architects who want to deploy machine learning and deep learning models into production environments. The course covers model packaging, API development, containerization, cloud deployment, model serving, monitoring, versioning, security, scalability, and lifecycle management. Through hands-on labs and enterprise projects, participants will learn how to deploy reliable, secure, and scalable AI models for real-world applications.",
    objectives: ["Understand the AI model deployment lifecycle.","Prepare and package AI models for production.","Build REST APIs for model inference.","Deploy AI models using Docker and cloud platforms.","Monitor model performance and manage versioning.","Implement security and scalability best practices.","Maintain enterprise-grade AI deployment environments."],
    days: [
      { day: 1, title: "AI Model Deployment Fundamentals", topics: ["Introduction to AI Model Deployment","Model Serialization","Deployment Architectures","REST API Basics","FastAPI for AI Services","Deployment Planning","Best Practices"], handsOn: ["Exporting trained AI models","Building inference APIs","Preparing deployment environments"], outcome: "Understand the fundamentals of deploying AI models and preparing them for production use." },
      { day: 2, title: "Containerization & Cloud Deployment", topics: ["Docker Fundamentals","Kubernetes Overview","Cloud AI Deployment","Infrastructure Setup","Model Serving","Load Balancing","Resource Management"], handsOn: ["Containerizing AI applications","Deploying models to cloud platforms","Managing deployment resources"], outcome: "Deploy AI models using container technologies and cloud infrastructure." },
      { day: 3, title: "MLOps & Automation", topics: ["MLOps Fundamentals","Model Versioning","MLflow","CI/CD Pipelines","Automated Deployment","Rollback Strategies","Release Management"], handsOn: ["Creating automated deployment pipelines","Managing model versions","Implementing CI/CD workflows"], outcome: "Automate AI model deployment and efficiently manage model lifecycle operations." },
      { day: 4, title: "Monitoring, Security & Optimization", topics: ["Model Monitoring","Logging & Metrics","Performance Optimization","Auto Scaling","API Security","Authentication & Authorization","Disaster Recovery"], handsOn: ["Monitoring deployed models","Optimizing inference performance","Securing deployment environments"], outcome: "Maintain secure, scalable, and high-performing AI model deployments in production." },
      { day: 5, title: "Enterprise AI Deployment Project & Assessment", topics: ["End-to-End AI Deployment Strategy","Production Readiness Assessment","Documentation Standards","Industry Case Studies","Future Trends in AI Deployment","Career Roadmap","Certification Guidance"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","FastAPI","Docker","Kubernetes","MLflow","Git & GitHub","Azure AI Services","AWS AI Services","Google Cloud Vertex AI","TensorFlow Serving","Prometheus","Grafana"],
    careers: ["AI Deployment Engineer","MLOps Engineer","Machine Learning Engineer","AI Platform Engineer","Cloud AI Engineer","DevOps Engineer (AI)","AI Solutions Architect","AI Infrastructure Engineer"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified AI Practitioner","Google Professional Machine Learning Engineer","Microsoft Azure DevOps Engineer Expert (AZ-400)","Certified Kubernetes Application Developer (CKAD)"],
    realWorldCases: { intro: "Develop and deploy a complete AI model solution that includes:", bullets: ["Industry Case Studies","Model packaging","API development","Docker deployment","Cloud hosting","Monitoring and performance evaluation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "AI engineers, machine learning engineers, MLOps professionals, software developers, DevOps engineers, cloud architects, and IT professionals responsible for deploying AI models into production." },
      { question: "Is this course focused on production deployments?", answer: "Yes. The course focuses on real-world AI model deployment, including packaging, API development, cloud deployment, monitoring, security, scalability, and lifecycle management." },
      { question: "Are practical deployment projects included?", answer: "Yes. Every training day includes hands-on labs covering Docker, FastAPI, MLflow, cloud deployment, monitoring, CI/CD, and a comprehensive enterprise AI model deployment capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Participants will work with Python, FastAPI, Docker, Kubernetes, MLflow, TensorFlow Serving, Git & GitHub, Microsoft Azure AI Services, AWS AI Services, Google Cloud Vertex AI, Prometheus, and Grafana." },
      { question: "What skills will I gain?", answer: "You will learn AI model packaging, API development, containerization, cloud deployment, MLOps automation, model versioning, monitoring, security, scalability, disaster recovery, and enterprise AI deployment best practices using industry-standard tools and technologies." }
    ]
  },
  "Artificial Intelligence - AI Optimization": {
    level: "Intermediate",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Machine Learning, Python programming, and model development concepts.",
    overview: "The Artificial Intelligence – AI Optimization course is designed for AI engineers, machine learning developers, data scientists, MLOps professionals, and software engineers who want to improve the efficiency, speed, accuracy, and scalability of AI models and applications. The course covers model optimization techniques, hyperparameter tuning, performance evaluation, inference optimization, resource utilization, deployment optimization, and monitoring. Through practical labs and real-world case studies, participants will learn how to optimize AI solutions for enterprise-scale production environments.",
    objectives: ["Understand AI optimization principles and performance metrics.","Optimize machine learning models for speed and accuracy.","Apply hyperparameter tuning techniques.","Improve inference performance and resource utilization.","Optimize AI deployment and scalability.","Monitor and troubleshoot performance bottlenecks.","Implement optimization best practices for enterprise AI systems."],
    days: [
      { day: 1, title: "AI Optimization Fundamentals", topics: ["Introduction to AI Optimization","Performance Metrics","Model Evaluation","Resource Management","Optimization Strategies","AI Performance Bottlenecks","Best Practices"], handsOn: ["Measuring model performance","Identifying optimization opportunities","Evaluating AI workloads"], outcome: "Understand AI optimization concepts and identify performance improvement opportunities." },
      { day: 2, title: "Model & Algorithm Optimization", topics: ["Hyperparameter Tuning","Feature Selection","Model Compression","Pruning Techniques","Quantization","Ensemble Optimization","Training Performance"], handsOn: ["Tuning model parameters","Applying pruning techniques","Optimizing training workflows"], outcome: "Improve AI model accuracy and efficiency through advanced optimization techniques." },
      { day: 3, title: "Deployment & Inference Optimization", topics: ["Inference Optimization","GPU & CPU Optimization","Batch Processing","Edge AI Optimization","API Performance","Container Optimization","Scaling AI Services"], handsOn: ["Optimizing model inference","Improving API response times","Configuring scalable AI deployments"], outcome: "Deploy optimized AI models that deliver fast, scalable, and reliable predictions." },
      { day: 4, title: "Monitoring, Automation & Troubleshooting", topics: ["AI Performance Monitoring","Logging & Metrics","Automated Optimization","Bottleneck Analysis","Error Handling","Continuous Performance Improvement","AI Lifecycle Optimization"], handsOn: ["Monitoring AI applications","Troubleshooting performance issues","Automating optimization workflows"], outcome: "Monitor, analyze, and continuously improve AI system performance in production environments." },
      { day: 5, title: "Enterprise AI Optimization Project & Assessment", topics: ["End-to-End AI Optimization Strategy","Enterprise Performance Benchmarking","Optimization Documentation","Future Trends in AI Optimization","Career Roadmap","Certification Guidance","Project Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","TensorFlow","PyTorch","Scikit-learn","Optuna","MLflow","ONNX Runtime","Docker","Jupyter Notebook","Git & GitHub","NVIDIA TensorRT (Overview)"],
    careers: ["AI Optimization Engineer","Machine Learning Engineer","MLOps Engineer","AI Performance Engineer","AI Solutions Architect","Data Scientist","AI Infrastructure Engineer","Deep Learning Engineer"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified AI Practitioner","Google Professional Machine Learning Engineer","NVIDIA Deep Learning Institute Certifications","IBM AI Engineering Professional Certificate"],
    realWorldCases: { intro: "Develop an AI optimization solution that includes:", bullets: ["Model performance evaluation","Hyperparameter tuning","Inference optimization","Deployment optimization","Performance monitoring dashboard"] },
    faqs: [
      { question: "Who should attend this course?", answer: "AI engineers, machine learning developers, data scientists, MLOps professionals, software engineers, and AI architects seeking to improve AI model performance and scalability." },
      { question: "Is programming experience required?", answer: "Yes. Basic Python programming and familiarity with machine learning concepts are recommended to perform the optimization labs and practical exercises." },
      { question: "Are practical optimization labs included?", answer: "Yes. Every training day includes hands-on exercises for hyperparameter tuning, model optimization, inference performance, deployment optimization, and a comprehensive enterprise AI optimization project." },
      { question: "Which tools and technologies are covered?", answer: "Participants will work with Python, TensorFlow, PyTorch, Scikit-learn, Optuna, MLflow, ONNX Runtime, Docker, Jupyter Notebook, Git & GitHub, and NVIDIA TensorRT." },
      { question: "What skills will I gain?", answer: "You will learn model optimization, hyperparameter tuning, pruning, quantization, inference acceleration, deployment optimization, performance monitoring, troubleshooting, and enterprise AI optimization best practices." }
    ]
  },
  "Artificial Intelligence - AI Product Development": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Machine Learning, Python programming, software development, and product management concepts.",
    overview: "The Artificial Intelligence – AI Product Development course is designed for AI product managers, software engineers, AI developers, entrepreneurs, business analysts, and technology professionals who want to design, build, launch, and manage AI-powered products. The course covers product lifecycle management, AI product strategy, user research, model integration, product architecture, deployment, monitoring, governance, and continuous improvement. Through practical labs and real-world case studies, participants will learn how to transform AI ideas into scalable, market-ready products.",
    objectives: ["Understand the AI product development lifecycle.","Identify business opportunities for AI-powered products.","Design user-centric AI product strategies.","Integrate AI models into scalable software products.","Deploy, monitor, and improve AI applications.","Apply responsible AI and governance principles.","Lead successful AI product development initiatives."],
    days: [
      { day: 1, title: "AI Product Strategy & Planning", topics: ["Introduction to AI Product Development","AI Product Lifecycle","Market Research","User Persona Development","Problem Identification","Product Vision & Roadmap","Product Requirements Documentation (PRD)"], handsOn: ["Defining AI product ideas","Creating user personas","Developing an AI product roadmap"], outcome: "Learn how to identify business opportunities and define a strategic roadmap for AI-powered products." },
      { day: 2, title: "Designing & Building AI Products", topics: ["AI Solution Architecture","Data Collection & Preparation","Model Selection","UX/UI Considerations for AI","API Integration","Prototype Development","MVP Design"], handsOn: ["Designing AI product architecture","Developing an AI prototype","Integrating AI models with applications"], outcome: "Build functional AI product prototypes with a strong focus on usability and scalability." },
      { day: 3, title: "Deployment, Testing & Optimization", topics: ["AI Product Deployment","Cloud Integration","Testing AI Features","Performance Optimization","User Feedback Analysis","A/B Testing","Product Iteration"], handsOn: ["Deploying AI products","Conducting product testing","Improving product performance"], outcome: "Deploy AI products successfully while continuously improving quality through testing and user feedback." },
      { day: 4, title: "Governance, Security & Product Scaling", topics: ["Responsible AI","Product Security","AI Governance","Privacy & Compliance","Scalability Planning","Monitoring Product Performance","Business Metrics & KPIs"], handsOn: ["Designing governance strategies","Monitoring AI product metrics","Scaling AI product infrastructure"], outcome: "Develop secure, compliant, and scalable AI products ready for enterprise and commercial deployment." },
      { day: 5, title: "AI Product Launch & Capstone Project", topics: ["Product Launch Strategy","Go-to-Market Planning","Product Documentation","Stakeholder Communication","Future AI Product Trends","Career Roadmap","Certification Guidance"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","OpenAI API","TensorFlow","Scikit-learn","FastAPI","Docker","Git & GitHub","Jira","Figma","Azure AI Services","Google Cloud Vertex AI","Power BI"],
    careers: ["AI Product Manager","AI Product Owner","AI Solutions Architect","AI Software Engineer","AI Consultant","Product Strategy Manager","Machine Learning Engineer","AI Startup Founder"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified AI Practitioner","Google Professional Machine Learning Engineer","Certified Scrum Product Owner (CSPO)","IBM AI Engineering Professional Certificate"],
    realWorldCases: { intro: "Develop and present a complete AI product that includes:", bullets: ["Product strategy and roadmap","AI model integration","Prototype development","Deployment strategy","Product launch plan and performance metrics"] },
    faqs: [
      { question: "Who should attend this course?", answer: "AI product managers, software developers, entrepreneurs, business analysts, AI engineers, startup founders, and professionals interested in building AI-powered products." },
      { question: "Does this course cover both technical and business aspects?", answer: "Yes. The course combines AI technology, product management, UX design, deployment, governance, and go-to-market strategies." },
      { question: "Are practical projects included?", answer: "Yes. Every training day includes hands-on activities such as product planning, AI integration, prototyping, testing, deployment, and a comprehensive AI product capstone project." },
      { question: "Which tools and platforms are covered?", answer: "Participants will work with Python, OpenAI API, TensorFlow, Scikit-learn, FastAPI, Docker, Git & GitHub, Jira, Figma, Azure AI Services, Google Cloud Vertex AI, and Power BI." },
      { question: "What skills will I gain?", answer: "You will learn AI product strategy, roadmap planning, user research, AI integration, prototype development, deployment, product scaling, governance, performance monitoring, and AI product lifecycle management for enterprise and commercial applications." }
    ]
  },
  "Artificial Intelligence - AI Project Management": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, project management principles, software development lifecycle (SDLC), and business processes.",
    overview: "The Artificial Intelligence – AI Project Management course is designed for project managers, AI team leads, product managers, business analysts, solution architects, and technology professionals responsible for planning and managing AI initiatives. The course covers AI project lifecycle management, Agile and Scrum methodologies, stakeholder management, AI solution planning, risk management, budgeting, governance, deployment, and performance monitoring. Through practical case studies and hands-on exercises, participants will learn how to successfully manage AI projects from ideation to production while ensuring quality, compliance, and business value.",
    objectives: ["Understand the complete AI project lifecycle.","Plan and execute AI projects using Agile and traditional methodologies.","Manage project scope, budget, timelines, and resources.","Coordinate AI development, deployment, and testing activities.","Identify and mitigate project risks.","Implement governance and compliance throughout AI projects.","Deliver AI projects aligned with business objectives and stakeholder expectations."],
    days: [
      { day: 1, title: "AI Project Planning & Initiation", topics: ["Introduction to AI Project Management","AI Project Lifecycle","Business Requirement Analysis","Feasibility Assessment","Stakeholder Identification","Project Scope Definition","Project Charter & Planning"], handsOn: ["Creating an AI project charter","Defining project objectives","Developing project schedules"], outcome: "Learn how to initiate and plan AI projects with clear goals, scope, and stakeholder alignment." },
      { day: 2, title: "Agile AI Development & Team Management", topics: ["Agile & Scrum for AI Projects","Sprint Planning","Resource Allocation","Team Collaboration","AI Development Workflow","Project Communication","Quality Assurance"], handsOn: ["Planning AI project sprints","Managing Agile boards","Coordinating AI development teams"], outcome: "Manage AI development projects efficiently using Agile methodologies and collaborative workflows." },
      { day: 3, title: "Risk, Governance & Compliance", topics: ["AI Project Risk Management","Responsible AI","Data Privacy & Security","Regulatory Compliance","AI Governance","Vendor & Resource Management","Change Management"], handsOn: ["Performing project risk assessments","Developing governance plans","Managing project changes"], outcome: "Identify project risks, ensure compliance, and implement governance strategies for AI initiatives." },
      { day: 4, title: "Deployment, Monitoring & Performance Management", topics: ["AI Deployment Planning","MLOps Coordination","Project Monitoring","KPI Tracking","Performance Reporting","Budget Management","Continuous Improvement"], handsOn: ["Monitoring project performance","Tracking project KPIs","Preparing executive project reports"], outcome: "Monitor AI projects effectively while managing budgets, quality, timelines, and stakeholder expectations." },
      { day: 5, title: "Enterprise AI Project & Assessment", topics: ["End-to-End AI Project Execution","Project Documentation","Executive Presentation","Lessons Learned","Future AI Project Trends","Career Roadmap","Certification Guidance"], handsOn: [], outcome: "" }
    ],
    tools: ["Jira","Microsoft Project","Trello","Asana","Azure DevOps","Git & GitHub","Microsoft Excel","Microsoft Power BI","OpenAI API (Overview)","Agile & Scrum Frameworks","Microsoft Teams"],
    careers: ["AI Project Manager","Technical Project Manager (AI)","AI Program Manager","AI Product Manager","Scrum Master (AI Projects)","AI Delivery Manager","AI Solutions Consultant","Digital Transformation Manager"],
    certifications: ["Project Management Professional (PMP)","Certified ScrumMaster (CSM)","Professional Scrum Master (PSM)","Microsoft Azure AI Engineer Associate (AI-102)","PMI Agile Certified Practitioner (PMI-ACP)"],
    realWorldCases: { intro: "Develop a comprehensive AI project plan that includes:", bullets: ["Project charter and scope","Agile sprint planning","Budget and resource allocation","Risk management and governance","Deployment strategy and stakeholder presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "Project managers, AI team leads, product managers, business analysts, solution architects, consultants, and professionals managing AI initiatives." },
      { question: "Is technical programming knowledge required?", answer: "No. Basic understanding of AI concepts is helpful, but the course primarily focuses on project planning, execution, governance, and stakeholder management rather than coding." },
      { question: "Are real-world projects included?", answer: "Yes. Every training day includes practical planning exercises, Agile project simulations, governance workshops, reporting activities, and a comprehensive enterprise AI project." },
      { question: "Which project management tools are covered?", answer: "Participants will work with Jira, Microsoft Project, Trello, Asana, Azure DevOps, Microsoft Power BI, Microsoft Excel, Git & GitHub, and Agile/Scrum frameworks." },
      { question: "What skills will I gain?", answer: "You will learn AI project planning, Agile project management, budgeting, resource management, risk assessment, governance, deployment coordination, stakeholder communication, performance monitoring, and enterprise AI project delivery best practices." }
    ]
  },
  "Artificial Intelligence - AI Research Methods": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Machine Learning, Python programming, statistics, mathematics, and data analysis.",
    overview: "The Artificial Intelligence – AI Research Methods course is designed for AI researchers, data scientists, postgraduate students, PhD scholars, machine learning engineers, and technology professionals who want to conduct high-quality AI research and develop innovative AI solutions. The course covers research methodology, literature review techniques, experimental design, dataset preparation, model development, statistical evaluation, research ethics, scientific writing, reproducibility, and publication strategies. Through practical research projects and case studies, participants will gain hands-on experience in designing, conducting, evaluating, and publishing AI research.",
    objectives: ["Understand scientific research methodologies for AI.","Conduct effective literature reviews and identify research gaps.","Design AI experiments and evaluate research outcomes.","Develop reproducible AI models and research workflows.","Apply statistical techniques for AI research validation.","Write high-quality research papers and technical reports.","Present AI research findings professionally."],
    days: [
      { day: 1, title: "Research Fundamentals & Literature Review", topics: ["Introduction to AI Research","Research Methodologies","Research Problem Identification","Literature Review Techniques","Research Gap Analysis","Research Planning","Ethical Research Practices"], handsOn: ["Reviewing AI research papers","Identifying research gaps","Preparing research proposals"], outcome: "Develop the ability to identify meaningful AI research problems and create structured research plans." },
      { day: 2, title: "Experimental Design & Data Preparation", topics: ["Research Dataset Collection","Data Cleaning & Preprocessing","Experimental Design","Hypothesis Formulation","Feature Engineering","Model Selection","Reproducible Research"], handsOn: ["Preparing research datasets","Designing AI experiments","Building baseline AI models"], outcome: "Design reliable AI experiments using structured methodologies and high-quality datasets." },
      { day: 3, title: "Model Development & Research Evaluation", topics: ["Machine Learning Research","Deep Learning Research","Performance Metrics","Statistical Validation","Hyperparameter Optimization","Benchmarking","Error Analysis"], handsOn: ["Training AI research models","Comparing experimental results","Evaluating model performance"], outcome: "Develop and evaluate AI models using rigorous scientific methods and statistical validation techniques." },
      { day: 4, title: "Scientific Writing & Publication", topics: ["Research Paper Structure","Technical Writing","Citation & Referencing","Research Documentation","Peer Review Process","Conference & Journal Publication","Research Presentation Skills"], handsOn: ["Writing AI research papers","Preparing technical reports","Creating research presentations"], outcome: "Produce high-quality AI research papers and effectively communicate research findings for academic and industry audiences." },
      { day: 5, title: "AI Research Project & Assessment", topics: ["End-to-End AI Research Project","Industry & Academic Case Studies","Emerging AI Research Trends","Responsible AI Research","Career Roadmap","Publication Strategy","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","TensorFlow","PyTorch","Scikit-learn","Pandas","NumPy","Jupyter Notebook","Google Colab","MLflow","Git & GitHub","LaTeX (Basics)","Zotero / Mendeley"],
    careers: ["AI Research Scientist","Machine Learning Research Engineer","Data Scientist","AI Innovation Specialist","Research Associate","PhD Researcher","AI Consultant","Applied AI Engineer"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Google Professional Machine Learning Engineer","AWS Certified AI Practitioner","IBM AI Engineering Professional Certificate","TensorFlow Developer Certificate"],
    realWorldCases: { intro: "Conduct a complete AI research study that includes:", bullets: ["Industry & Academic Case Studies","Research problem definition","Literature review","Experimental design","Model development and evaluation","Research paper and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "AI researchers, postgraduate students, PhD scholars, machine learning engineers, data scientists, software developers, and professionals interested in advanced AI research and innovation." },
      { question: "Is prior research experience required?", answer: "No. Basic knowledge of AI, machine learning, statistics, and Python is recommended. The course introduces research methodologies before progressing to advanced experimental design and publication techniques." },
      { question: "Are practical research projects included?", answer: "Yes. Every training day includes hands-on research activities, literature reviews, experimental design exercises, AI model development, research paper writing, and a comprehensive AI research capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Participants will work with Python, TensorFlow, PyTorch, Scikit-learn, Pandas, NumPy, Jupyter Notebook, Google Colab, MLflow, Git & GitHub, LaTeX, and reference management tools such as Zotero and Mendeley." },
      { question: "What skills will I gain?", answer: "You will learn AI research methodology, literature review techniques, experimental design, model development, statistical evaluation, reproducible AI research, scientific writing, publication strategies, technical presentation, and enterprise-grade AI research practices." }
    ]
  },
  "Artificial Intelligence - AI Solutions": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Machine Learning, Python programming, cloud computing, and software development concepts.",
    overview: "The Artificial Intelligence – AI Solutions course is designed for AI engineers, solution architects, developers, consultants, business analysts, and IT professionals who want to design, implement, and manage end-to-end AI solutions for enterprise environments. The course covers AI solution architecture, business requirement analysis, data pipelines, model integration, cloud deployment, automation, security, governance, and performance optimization. Through hands-on labs and real-world case studies, participants will learn how to develop scalable AI solutions that address complex business challenges across multiple industries.",
    objectives: ["Understand the AI solution development lifecycle.","Design scalable AI solution architectures.","Integrate machine learning and Generative AI models into business applications.","Deploy AI solutions using cloud and container technologies.","Implement AI governance, security, and compliance.","Optimize AI solutions for performance and scalability.","Deliver enterprise-grade AI solutions aligned with business objectives."],
    days: [
      { day: 1, title: "AI Solution Design & Planning", topics: ["Introduction to AI Solutions","Business Requirement Analysis","AI Solution Lifecycle","Solution Architecture","Data Strategy","AI Technology Selection","Solution Planning Best Practices"], handsOn: ["Identifying AI business use cases","Designing AI solution architecture","Preparing solution requirement documents"], outcome: "Understand how to analyze business needs and design effective AI solution architectures." },
      { day: 2, title: "AI Development & Integration", topics: ["Data Pipelines","Machine Learning Integration","Generative AI Applications","API Development","Workflow Automation","Database Integration","Cloud AI Services"], handsOn: ["Building AI workflows","Integrating AI APIs","Connecting AI models with enterprise systems"], outcome: "Develop integrated AI solutions that combine data, models, and enterprise applications." },
      { day: 3, title: "Deployment, Security & Governance", topics: ["AI Deployment Strategies","Containerization","Cloud Deployment","Security Best Practices","Identity & Access Management","AI Governance","Compliance & Risk Management"], handsOn: ["Deploying AI solutions","Configuring security controls","Implementing governance frameworks"], outcome: "Deploy secure, compliant, and production-ready AI solutions using enterprise standards." },
      { day: 4, title: "Performance Optimization & Monitoring", topics: ["Performance Tuning","Scalability Planning","AI Monitoring","Logging & Observability","Model Lifecycle Management","Cost Optimization","Disaster Recovery"], handsOn: ["Monitoring AI solution performance","Optimizing resource utilization","Configuring backup and recovery strategies"], outcome: "Build high-performing and scalable AI solutions capable of supporting enterprise workloads." },
      { day: 5, title: "Enterprise AI Solution Project & Assessment", topics: ["End-to-End AI Solution Implementation","Enterprise Architecture Review","Documentation Standards","Industry Case Studies","Future Trends in AI Solutions","Career Roadmap","Certification Guidance"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","TensorFlow","PyTorch","OpenAI API","FastAPI","Docker","Kubernetes","Git & GitHub","Microsoft Azure AI Services","AWS AI Services","Google Cloud Vertex AI","MLflow"],
    careers: ["AI Solutions Architect","AI Consultant","Machine Learning Engineer","AI Developer","Cloud AI Engineer","MLOps Engineer","AI Integration Engineer","Enterprise AI Architect"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified AI Practitioner","Google Professional Machine Learning Engineer","Microsoft Azure Solutions Architect Expert (AZ-305)","IBM AI Engineering Professional Certificate"],
    realWorldCases: { intro: "Develop a complete enterprise AI solution that includes:", bullets: ["Industry Case Studies","Business requirement analysis","AI architecture design","Model integration and API development","Cloud deployment and security","Performance monitoring and project documentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "AI engineers, solution architects, software developers, consultants, business analysts, cloud professionals, and IT leaders responsible for delivering AI-based business solutions." },
      { question: "Does this course cover end-to-end AI solution development?", answer: "Yes. It covers the complete AI solution lifecycle, from business analysis and architecture design to deployment, governance, monitoring, and optimization." },
      { question: "Are practical projects included?", answer: "Yes. Every training day includes hands-on labs, AI integration exercises, cloud deployment tasks, architecture design activities, and a comprehensive enterprise AI solution capstone project." },
      { question: "Which tools and platforms are covered?", answer: "Participants will work with Python, TensorFlow, PyTorch, OpenAI API, FastAPI, Docker, Kubernetes, MLflow, Git & GitHub, Microsoft Azure AI Services, AWS AI Services, and Google Cloud Vertex AI." },
      { question: "What skills will I gain?", answer: "You will learn AI solution architecture, business analysis, model integration, cloud deployment, API development, security, governance, performance optimization, MLOps practices, and enterprise AI solution implementation using industry-standard technologies." }
    ]
  },
  "Artificial Intelligence - AI Workflow Automation": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Python programming, APIs, automation concepts, cloud computing, and business process management.",
    overview: "The Artificial Intelligence – AI Workflow Automation course is designed for AI developers, automation engineers, business analysts, DevOps professionals, solution architects, and IT professionals who want to automate business processes using Artificial Intelligence. The course covers workflow automation fundamentals, AI-powered decision-making, process orchestration, robotic process automation (RPA), Large Language Models (LLMs), AI agents, API integration, workflow monitoring, and enterprise automation strategies. Through hands-on labs and real-world projects, participants will learn to build intelligent workflows that improve efficiency, reduce manual effort, and enhance business productivity.",
    objectives: ["Understand AI workflow automation concepts and architectures.","Design intelligent workflows for business processes.","Integrate AI models, APIs, and automation platforms.","Build AI-powered chatbots, assistants, and AI agents.","Implement workflow monitoring, logging, and optimization.","Deploy secure and scalable automation solutions.","Develop enterprise-grade AI automation strategies."],
    days: [
      { day: 1, title: "Workflow Automation Fundamentals", topics: ["Introduction to AI Workflow Automation","Business Process Automation","Workflow Design Principles","AI Decision Engines","APIs & Integrations","Automation Lifecycle","Best Practices"], handsOn: ["Designing automated workflows","Connecting AI services through APIs","Creating simple automation pipelines"], outcome: "Understand workflow automation fundamentals and design AI-powered business processes." },
      { day: 2, title: "AI Integration & Intelligent Automation", topics: ["AI Model Integration","Large Language Models (LLMs)","Prompt Engineering","AI Agents","Robotic Process Automation (RPA)","Event-Driven Automation","Workflow Orchestration"], handsOn: ["Building AI-powered automation workflows","Integrating LLMs with business processes","Automating repetitive business tasks"], outcome: "Develop intelligent automation solutions using AI models, agents, and workflow orchestration tools." },
      { day: 3, title: "Enterprise Automation Platforms", topics: ["Microsoft Power Automate","Zapier","n8n","Make (Integromat)","FastAPI Integration","Database Connectivity","Cloud Automation"], handsOn: ["Creating enterprise automation flows","Integrating multiple business applications","Developing API-driven workflows"], outcome: "Build enterprise workflow automation solutions using leading automation platforms and AI services." },
      { day: 4, title: "Monitoring, Security & Optimization", topics: ["Workflow Monitoring","Error Handling","Logging & Notifications","Automation Security","Access Control","Performance Optimization","Governance & Compliance"], handsOn: ["Monitoring workflow execution","Implementing secure automation practices","Optimizing workflow performance"], outcome: "Deploy secure, reliable, and optimized AI workflow automation solutions for enterprise environments." },
      { day: 5, title: "Enterprise AI Workflow Project & Assessment", topics: ["End-to-End Automation Solution Design","Industry Use Cases","Documentation Standards","Future Trends in AI Automation","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","OpenAI API","LangChain","FastAPI","Microsoft Power Automate","Zapier","n8n","Make (Integromat)","Docker","Git & GitHub","PostgreSQL","Jupyter Notebook"],
    careers: ["AI Automation Engineer","Workflow Automation Developer","AI Solutions Architect","Business Process Automation Consultant","RPA Developer","AI Integration Engineer","Intelligent Automation Specialist","DevOps Automation Engineer"],
    certifications: ["Microsoft Power Platform Functional Consultant Associate (PL-200)","Microsoft Azure AI Engineer Associate (AI-102)","UiPath Certified Professional","Automation Anywhere Certified Advanced RPA Professional","AWS Certified AI Practitioner"],
    realWorldCases: { intro: "Develop a complete AI workflow automation solution that includes:", bullets: ["Industry Use Cases","Workflow design","AI model and API integration","Automation platform implementation","Monitoring dashboard","Documentation and deployment"] },
    faqs: [
      { question: "Who should attend this course?", answer: "AI developers, automation engineers, business analysts, RPA developers, solution architects, DevOps professionals, and anyone interested in automating business processes using AI." },
      { question: "Is programming knowledge required?", answer: "Yes. Basic knowledge of Python, APIs, and workflow automation concepts is recommended for completing the practical exercises." },
      { question: "Are practical automation projects included?", answer: "Yes. Every training day includes hands-on labs covering AI workflow design, API integration, LLM implementation, automation platforms, monitoring, deployment, and a comprehensive enterprise AI workflow automation capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Participants will work with Python, OpenAI API, LangChain, FastAPI, Microsoft Power Automate, Zapier, n8n, Make (Integromat), Docker, PostgreSQL, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn AI workflow design, intelligent process automation, AI agent integration, LLM-powered automation, API orchestration, workflow monitoring, security, governance, deployment, and enterprise automation best practices using modern AI and automation platforms." }
    ]
  },
  "Artificial Intelligence - Analytics": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Machine Learning, Python, statistics, and data analytics concepts.",
    overview: "The Artificial Intelligence – Analytics course is designed for data analysts, AI professionals, business intelligence specialists, and decision-makers who want to leverage AI for advanced analytics. Participants will learn how to collect, process, analyze, and visualize data using AI-powered techniques to generate actionable business insights. The course covers predictive analytics, prescriptive analytics, data visualization, AI-driven reporting, forecasting, anomaly detection, and real-world business intelligence applications through hands-on projects.",
    objectives: ["Understand AI-powered analytics and business intelligence concepts.","Perform data preparation, exploration, and visualization.","Build predictive and prescriptive analytics models.","Analyze business trends using AI algorithms.","Develop interactive dashboards and analytical reports.","Apply AI techniques for forecasting and anomaly detection.","Deploy AI analytics solutions for enterprise decision-making."],
    days: [
      { day: 1, title: "AI Analytics Fundamentals", topics: ["Introduction to AI Analytics","Business Intelligence vs AI Analytics","Data Collection & Data Sources","Data Cleaning & Preparation","Exploratory Data Analysis (EDA)","AI Analytics Workflow","Analytics Best Practices"], handsOn: ["Importing and preparing datasets","Performing exploratory data analysis","Identifying business insights"], outcome: "Understand AI analytics workflows and prepare data for meaningful analysis." },
      { day: 2, title: "Predictive Analytics & Machine Learning", topics: ["Predictive Analytics Concepts","Regression Models","Classification Techniques","Clustering Algorithms","Feature Engineering","Model Evaluation","Business Forecasting"], handsOn: ["Building predictive models","Evaluating model accuracy","Forecasting business trends"], outcome: "Develop AI models capable of predicting future business outcomes and customer behavior." },
      { day: 3, title: "AI Visualization & Business Intelligence", topics: ["Data Visualization Principles","Interactive Dashboards","KPI Monitoring","AI-Powered Reporting","Trend Analysis","Customer Segmentation","Decision Support Systems"], handsOn: ["Creating dashboards","Visualizing business metrics","Building AI-powered reports"], outcome: "Transform complex datasets into interactive dashboards and actionable business insights." },
      { day: 4, title: "Advanced Analytics & Optimization", topics: ["Prescriptive Analytics","Time Series Forecasting","Anomaly Detection","Recommendation Systems","AI Optimization Techniques","Model Performance Analysis","Analytics Governance"], handsOn: ["Detecting anomalies","Building recommendation models","Optimizing analytical workflows"], outcome: "Apply advanced AI techniques to improve decision-making and operational efficiency." },
      { day: 5, title: "Enterprise Analytics Project & Deployment", topics: ["Enterprise AI Analytics Architecture","Analytics Deployment Strategies","Performance Monitoring","Data Security & Compliance","Future Trends in AI Analytics","Career Roadmap","Certification Guidance"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Pandas","NumPy","Scikit-learn","Jupyter Notebook","Power BI","Tableau","Matplotlib","MLflow","SQL","Git & GitHub"],
    careers: ["AI Data Analyst","AI Analytics Engineer","Business Intelligence Analyst","Data Scientist","Machine Learning Analyst","AI Reporting Specialist","Analytics Consultant","Decision Intelligence Specialist"],
    certifications: ["Microsoft Power BI Data Analyst Associate (PL-300)","Google Data Analytics Professional Certificate","Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified AI Practitioner","IBM Data Science Professional Certificate"],
    realWorldCases: { intro: "Develop a complete AI analytics solution that includes:", bullets: ["Data preparation and visualization","Predictive analytics model","Business intelligence dashboard","Forecasting and reporting","Executive presentation of insights"] },
    faqs: [
      { question: "Who should attend this course?", answer: "Data analysts, AI professionals, business intelligence specialists, developers, and managers looking to use AI for business analytics." },
      { question: "Will this course include predictive analytics?", answer: "Yes. The curriculum covers predictive modeling, forecasting, anomaly detection, recommendation systems, and AI-powered reporting." },
      { question: "Are practical projects included?", answer: "Yes. Every training day includes hands-on labs, dashboard development, analytics exercises, and a final enterprise analytics project." },
      { question: "Which tools will be covered?", answer: "Participants will work with Python, Power BI, Tableau, Pandas, Scikit-learn, SQL, MLflow, and visualization libraries." },
      { question: "What skills will I gain?", answer: "You will learn data preparation, predictive analytics, dashboard development, business intelligence, AI-powered reporting, forecasting, and enterprise analytics deployment." }
    ]
  },
  "Artificial Intelligence - API Development": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Python programming, REST APIs, web development, and machine learning concepts.",
    overview: "The Artificial Intelligence – API Development course is designed for AI engineers, software developers, backend developers, MLOps professionals, and solution architects who want to build, deploy, and manage AI-powered APIs. This course covers API architecture, AI model integration, RESTful services, authentication, cloud deployment, API security, monitoring, versioning, and performance optimization. Participants will gain hands-on experience in exposing AI models as scalable APIs that can be integrated into enterprise applications and cloud platforms.",
    objectives: ["Design and develop AI-powered REST APIs.","Integrate machine learning models into API services.","Secure APIs using authentication and authorization mechanisms.","Deploy AI APIs using containers and cloud platforms.","Monitor, test, and optimize API performance.","Implement API versioning and lifecycle management.","Build scalable enterprise-grade AI API solutions."],
    days: [
      { day: 1, title: "AI API Fundamentals", topics: ["Introduction to AI APIs","API Architecture","RESTful API Principles","HTTP Methods & Status Codes","Python for API Development","FastAPI Framework","API Documentation with OpenAPI"], handsOn: ["Setting up an API development environment","Creating basic REST APIs","Documenting APIs using Swagger/OpenAPI"], outcome: "Understand API architecture and build well-structured AI-ready RESTful services." },
      { day: 2, title: "AI Model Integration & Backend Development", topics: ["Machine Learning Model Integration","AI Inference APIs","Database Integration","File Handling","Background Tasks","API Error Handling","Request & Response Validation"], handsOn: ["Integrating trained AI models into APIs","Connecting APIs with databases","Building inference endpoints"], outcome: "Develop AI APIs capable of serving machine learning predictions efficiently and reliably." },
      { day: 3, title: "Security, Deployment & Cloud Integration", topics: ["API Authentication (JWT, OAuth2)","Authorization","API Security Best Practices","Docker Containerization","Kubernetes Deployment","Cloud AI API Deployment","CI/CD Pipelines"], handsOn: ["Securing API endpoints","Deploying APIs with Docker","Publishing APIs to cloud platforms"], outcome: "Deploy secure and scalable AI APIs using modern DevOps and cloud technologies." },
      { day: 4, title: "Performance, Monitoring & Optimization", topics: ["API Performance Tuning","Load Balancing","Caching Strategies","API Monitoring","Logging & Debugging","Rate Limiting","API Versioning"], handsOn: ["Optimizing API response time","Monitoring API health","Managing API versions"], outcome: "Ensure AI APIs deliver high performance, reliability, and scalability in production environments." },
      { day: 5, title: "Enterprise AI API Project & Assessment", topics: ["End-to-End AI API Development","Enterprise API Architecture","API Lifecycle Management","Documentation Standards","Future API Trends","Career Roadmap","Certification Guidance"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","FastAPI","Flask (Overview)","REST APIs","OpenAPI (Swagger)","Docker","Kubernetes","PostgreSQL","Git & GitHub","Azure AI Services","AWS AI Services","Google Cloud Vertex AI"],
    careers: ["AI API Developer","AI Backend Engineer","AI Software Engineer","Machine Learning Engineer","MLOps Engineer","Cloud AI Developer","AI Integration Engineer","AI Solutions Architect"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified AI Practitioner","Google Professional Machine Learning Engineer","Microsoft Azure Developer Associate (AZ-204)","Certified Kubernetes Application Developer (CKAD)"],
    realWorldCases: { intro: "Design and deploy a complete AI API solution that includes:", bullets: ["AI model integration","Secure authentication","Database connectivity","Cloud deployment","Monitoring, documentation, and performance optimization"] },
    faqs: [
      { question: "Who should attend this course?", answer: "Backend developers, AI engineers, software developers, MLOps professionals, cloud engineers, and solution architects who want to build AI-powered APIs." },
      { question: "Does this course include API development from scratch?", answer: "Yes. The course covers API design, implementation, AI model integration, security, deployment, testing, and lifecycle management from the ground up." },
      { question: "Are practical coding exercises included?", answer: "Yes. Every training day includes hands-on coding labs, API development projects, deployment exercises, and a comprehensive capstone project." },
      { question: "Which tools and frameworks are covered?", answer: "Participants will work with Python, FastAPI, Flask, Docker, Kubernetes, PostgreSQL, Git & GitHub, OpenAPI (Swagger), and cloud AI services from Microsoft Azure, AWS, and Google Cloud." },
      { question: "What skills will I gain?", answer: "You will learn REST API development, AI model integration, API security, cloud deployment, performance optimization, monitoring, documentation, and enterprise API engineering best practices." }
    ]
  },
  "Artificial Intelligence - Architecture": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Machine Learning, cloud computing, Python, and software architecture.",
    overview: "The Artificial Intelligence – Architecture course is designed for solution architects, AI engineers, cloud professionals, and technical leads who want to design scalable, secure, and high-performance AI systems. Participants will learn AI architecture principles, data pipelines, model lifecycle management, cloud-native AI solutions, MLOps architecture, integration strategies, and enterprise AI deployment patterns. Through real-world case studies and hands-on labs, learners will gain the skills to architect production-ready AI solutions that meet business, security, and performance requirements.",
    objectives: ["Understand enterprise AI architecture principles.","Design scalable AI and Machine Learning solutions.","Build AI data pipelines and model workflows.","Implement MLOps architecture for model lifecycle management.","Integrate AI services with enterprise applications.","Design secure, reliable, and cloud-native AI platforms.","Apply architecture best practices for production AI systems."],
    days: [
      { day: 1, title: "AI Architecture Fundamentals", topics: ["Introduction to AI Architecture","AI System Components","Enterprise AI Architecture Patterns","AI Solution Design Principles","AI Infrastructure Overview","Cloud vs On-Premises AI Architecture","AI Architecture Best Practices"], handsOn: ["Designing a basic AI architecture diagram","Identifying AI system components","Selecting the right deployment architecture"], outcome: "Understand the core building blocks of enterprise AI architecture and solution design." },
      { day: 2, title: "Data & Model Architecture", topics: ["AI Data Pipelines","Data Storage Strategies","Data Processing Architecture","Feature Engineering Pipelines","Model Training Architecture","Model Registry & Versioning","AI Workflow Design"], handsOn: ["Designing an AI data pipeline","Creating a model lifecycle workflow","Managing datasets and model versions"], outcome: "Design efficient data pipelines and structured AI model workflows." },
      { day: 3, title: "Cloud AI & MLOps Architecture", topics: ["Cloud AI Services","MLOps Fundamentals","Continuous Integration & Deployment (CI/CD) for AI","Containerization with Docker","Kubernetes for AI Workloads","Model Deployment Strategies","Infrastructure Automation"], handsOn: ["Deploying AI workloads using containers","Designing an MLOps pipeline","Implementing automated deployment workflows"], outcome: "Build scalable, cloud-native AI architectures with automated deployment capabilities." },
      { day: 4, title: "Security, Integration & Performance", topics: ["AI Security Architecture","Identity & Access Management (IAM)","Data Privacy & Compliance","API Integration","Microservices Architecture","Performance Optimization","High Availability & Disaster Recovery"], handsOn: ["Securing AI services","Integrating AI APIs into enterprise applications","Optimizing architecture for performance and scalability"], outcome: "Design secure, resilient, and high-performing AI solutions for enterprise environments." },
      { day: 5, title: "Enterprise AI Solution Design & Capstone Project", topics: ["End-to-End AI Solution Architecture","AI Governance","Architecture Documentation","Cost Optimization","Monitoring & Maintenance","Future AI Architecture Trends","Certification & Career Guidance"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Azure AI Services","AWS AI Services","Google Cloud AI Platform","Docker","Kubernetes","MLflow","Git & GitHub","TensorFlow","FastAPI (Introduction)","REST APIs"],
    careers: ["AI Solution Architect","Enterprise AI Architect","AI Infrastructure Architect","Cloud AI Architect","MLOps Architect","Machine Learning Architect","AI Technical Consultant","AI Platform Architect"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified AI Practitioner","Google Professional Machine Learning Engineer","Microsoft Azure Solutions Architect Expert","TensorFlow Developer Certificate"],
    realWorldCases: { intro: "Design and present an enterprise AI architecture that includes:", bullets: ["Data ingestion and processing pipeline","AI model training and deployment workflow","Cloud infrastructure design","Security and governance controls","Monitoring and scalability strategy"] },
    faqs: [
      { question: "Who should attend this course?", answer: "AI engineers, solution architects, cloud professionals, technical leads, and developers involved in designing enterprise AI systems." },
      { question: "Will this course cover cloud-based AI architectures?", answer: "Yes. The course includes architecture concepts for Microsoft Azure, AWS, and Google Cloud AI platforms." },
      { question: "Are practical architecture labs included?", answer: "Yes. Every training day includes architecture design exercises, deployment labs, and real-world case studies." },
      { question: "What skills will I gain?", answer: "You will learn to design scalable AI architectures, build data pipelines, implement MLOps, secure AI platforms, and deploy enterprise AI solutions." },
      { question: "Is this course suitable for enterprise AI projects?", answer: "Yes. The curriculum is focused on production-ready AI architecture and enterprise implementation best practices." }
    ]
  },
  "Artificial Intelligence - Automation": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Python programming, automation concepts, APIs, and cloud platforms.",
    overview: "The Artificial Intelligence – Automation course is designed for professionals who want to automate business processes using AI technologies. The program covers intelligent automation, AI-driven workflows, Robotic Process Automation (RPA), Generative AI, AI agents, workflow orchestration, predictive automation, and enterprise integration. Participants will gain hands-on experience in designing, deploying, and managing AI-powered automation solutions that improve efficiency, reduce manual effort, and enhance business productivity.",
    objectives: ["Understand AI-powered automation concepts and architectures.","Design intelligent business workflows using AI.","Integrate AI with enterprise applications and APIs.","Develop AI-driven automation solutions using modern tools.","Implement RPA and AI agents for repetitive task automation.","Monitor, optimize, and secure automated AI workflows.","Deploy scalable automation solutions for enterprise environments."],
    days: [
      { day: 1, title: "AI Automation Fundamentals", topics: ["Introduction to AI Automation","Intelligent Process Automation (IPA)","AI vs Traditional Automation","AI Workflow Fundamentals","Business Process Automation","Automation Use Cases","AI Automation Best Practices"], handsOn: ["Mapping business processes","Creating AI workflow diagrams","Exploring automation platforms"], outcome: "Understand AI automation concepts and identify opportunities for automating business processes." },
      { day: 2, title: "AI Workflows & Intelligent Automation", topics: ["Workflow Design","AI Decision Engines","Robotic Process Automation (RPA)","AI Chatbots & Virtual Assistants","AI Agents","API-Based Automation","Event-Driven Automation"], handsOn: ["Building an AI-powered workflow","Integrating APIs into automation processes","Creating a simple AI chatbot"], outcome: "Develop intelligent workflows using AI services, APIs, and automation tools." },
      { day: 3, title: "AI Integration & Enterprise Automation", topics: ["Enterprise AI Integration","Cloud Automation Services","AI Model Integration","Workflow Orchestration","Data Pipelines","Notification & Scheduling Systems","Automation Security"], handsOn: ["Connecting AI services with enterprise applications","Automating data processing tasks","Configuring workflow triggers"], outcome: "Integrate AI solutions with enterprise systems and automate end-to-end business operations." },
      { day: 4, title: "Monitoring, Optimization & AI Agents", topics: ["AI Workflow Monitoring","Performance Optimization","Logging & Reporting","AI Agent Design","Generative AI for Automation","Error Handling","AI Governance & Compliance"], handsOn: ["Monitoring automated workflows","Optimizing AI-driven processes","Configuring AI agents for task execution"], outcome: "Monitor, optimize, and manage enterprise AI automation solutions for maximum efficiency." },
      { day: 5, title: "Enterprise Automation Project & Deployment", topics: ["End-to-End AI Automation Architecture","Secure Deployment","Automation Testing","Scalability & Maintenance","Future Trends in AI Automation","Career Roadmap","Certification Guidance"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","OpenAI APIs","LangChain (Introduction)","Microsoft Power Automate","UiPath (Overview)","Automation Anywhere (Overview)","Google Cloud AI Services","Azure AI Services","Docker","Git & GitHub","REST APIs"],
    careers: ["AI Automation Engineer","Intelligent Automation Developer","RPA Developer","AI Solutions Engineer","AI Integration Engineer","Workflow Automation Specialist","AI Process Consultant","Enterprise Automation Architect"],
    certifications: ["Microsoft Power Platform Fundamentals (PL-900)","UiPath Certified Professional Associate","Automation Anywhere Certified Advanced RPA Professional","Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified AI Practitioner"],
    realWorldCases: { intro: "Design and deploy an AI-powered automation solution that includes:", bullets: ["Business workflow automation","AI decision-making","API integration","AI agent implementation","Monitoring and reporting dashboard"] },
    faqs: [
      { question: "Who should attend this course?", answer: "Software developers, automation engineers, RPA professionals, AI engineers, and IT professionals looking to build intelligent automation solutions." },
      { question: "Does this course include RPA concepts?", answer: "Yes. The course introduces Robotic Process Automation (RPA) and its integration with AI-driven workflows." },
      { question: "Are hands-on projects included?", answer: "Yes. Participants will work on workflow automation, AI agents, API integrations, and a final enterprise automation project." },
      { question: "Which tools are covered?", answer: "The course includes Python, OpenAI APIs, Microsoft Power Automate, UiPath, Automation Anywhere, LangChain, Azure AI, and cloud-based automation services." },
      { question: "What skills will I gain?", answer: "You will learn to design, develop, integrate, deploy, and optimize AI-powered automation solutions for enterprise and business applications." }
    ]
  },
  "Artificial Intelligence - Best Practices": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Machine Learning, Python programming, cloud computing, and AI deployment concepts.",
    overview: "The Artificial Intelligence – Best Practices course is designed for AI engineers, solution architects, data scientists, project managers, and technology leaders who want to build secure, scalable, reliable, and ethical AI solutions. This course focuses on industry-proven methodologies, governance frameworks, responsible AI principles, MLOps, security, performance optimization, documentation, and enterprise deployment standards. Through real-world case studies and hands-on projects, participants will learn how to implement AI solutions following global best practices throughout the AI lifecycle.",
    objectives: ["Apply industry best practices across the AI development lifecycle.","Build secure, scalable, and production-ready AI systems.","Implement responsible AI and governance frameworks.","Improve AI model quality, performance, and reliability.","Establish MLOps and continuous improvement workflows.","Manage AI projects using enterprise standards.","Deliver AI solutions aligned with business and compliance requirements."],
    days: [
      { day: 1, title: "AI Development Best Practices", topics: ["Introduction to AI Best Practices","AI Project Lifecycle","Business Requirement Analysis","Data Collection & Preparation Standards","Model Development Guidelines","Documentation Standards","Version Control & Collaboration"], handsOn: ["Organizing AI project repositories","Creating project documentation","Managing datasets and model versions"], outcome: "Understand standardized development practices that improve AI project quality and collaboration." },
      { day: 2, title: "Model Quality, Security & Responsible AI", topics: ["Model Validation Techniques","Explainable AI (XAI)","Bias Detection & Fairness","Responsible AI Principles","AI Security Best Practices","Privacy & Data Protection","Compliance & Risk Management"], handsOn: ["Evaluating model fairness","Implementing security controls","Performing AI risk assessments"], outcome: "Build trustworthy AI systems that are secure, transparent, ethical, and compliant." },
      { day: 3, title: "Deployment, MLOps & Automation", topics: ["Production Deployment Strategies","MLOps Best Practices","CI/CD for AI","Containerization with Docker","Kubernetes for AI Applications","Monitoring & Logging","Workflow Automation"], handsOn: ["Deploying AI models","Creating CI/CD pipelines","Monitoring production environments"], outcome: "Deploy and manage enterprise AI applications using modern MLOps and automation practices." },
      { day: 4, title: "Performance Optimization & Enterprise Governance", topics: ["Performance Benchmarking","Model Optimization","Resource Management","AI Governance Frameworks","Cost Optimization","Disaster Recovery Planning","Enterprise AI Architecture"], handsOn: ["Optimizing AI models","Creating governance policies","Evaluating system performance"], outcome: "Improve AI performance while maintaining governance, reliability, and operational excellence." },
      { day: 5, title: "Enterprise AI Best Practices Project", topics: ["End-to-End AI Project Review","AI Audit & Quality Assurance","Production Readiness Checklist","Future Trends in AI","Career Roadmap","Certification Guidance","Continuous Improvement Strategies"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","TensorFlow","PyTorch","Scikit-learn","MLflow","Docker","Kubernetes","Git & GitHub","Azure AI Services","AWS AI Services","Google Cloud Vertex AI","OpenAI APIs"],
    careers: ["AI Solutions Architect","Senior AI Engineer","Machine Learning Engineer","MLOps Engineer","AI Governance Specialist","AI Consultant","Enterprise AI Architect","AI Technical Lead"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified AI Practitioner","Google Professional Machine Learning Engineer","TensorFlow Developer Certificate","IBM AI Engineering Professional Certificate"],
    realWorldCases: { intro: "Design and implement an enterprise AI solution that includes:", bullets: ["AI project planning","Responsible AI implementation","Secure deployment","Performance optimization","Monitoring, governance, and documentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "AI engineers, data scientists, solution architects, MLOps professionals, project managers, and IT leaders responsible for designing and managing enterprise AI solutions." },
      { question: "What best practices are covered in this course?", answer: "The course covers AI development standards, model validation, responsible AI, governance, MLOps, security, deployment, monitoring, performance optimization, and enterprise AI management." },
      { question: "Are practical projects included?", answer: "Yes. Every training day includes hands-on exercises, real-world case studies, governance activities, deployment labs, and a comprehensive capstone project." },
      { question: "Which tools and platforms are covered?", answer: "Participants will work with Python, TensorFlow, PyTorch, MLflow, Docker, Kubernetes, Git, OpenAI APIs, and cloud AI services from Microsoft Azure, AWS, and Google Cloud." },
      { question: "What skills will I gain?", answer: "You will learn how to design, deploy, secure, optimize, govern, and maintain enterprise AI solutions using globally recognized best practices and industry standards." }
    ]
  },
  "Artificial Intelligence - Certification Prep": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic understanding of Artificial Intelligence, Machine Learning, Python programming, and cloud computing concepts.",
    overview: "The Artificial Intelligence – Certification Prep course is designed to help learners prepare for globally recognized AI certification exams. The program combines theoretical knowledge, practical labs, mock examinations, and real-world projects to strengthen core AI concepts, machine learning, deep learning, Generative AI, MLOps, cloud AI services, and responsible AI practices. Participants will receive exam-focused guidance, hands-on experience, and proven strategies to confidently clear leading AI certification exams.",
    objectives: ["Master core Artificial Intelligence and Machine Learning concepts.","Build and deploy AI models using industry-standard tools.","Prepare for leading AI certification exams.","Practice real-world AI implementation scenarios.","Understand cloud AI services and AI deployment.","Strengthen problem-solving and exam preparation techniques.","Develop confidence through mock tests and practical assessments."],
    days: [
      { day: 1, title: "AI Fundamentals & Exam Foundations", topics: ["Artificial Intelligence Fundamentals","Machine Learning Basics","Deep Learning Overview","Generative AI Concepts","AI Terminology","AI Ethics & Responsible AI","Certification Exam Structure"], handsOn: ["AI environment setup","Basic AI model implementation","Practice quiz and concept review"], outcome: "Build a strong foundation in AI concepts aligned with certification exam objectives." },
      { day: 2, title: "Model Development & Cloud AI", topics: ["Data Preparation","Model Training & Evaluation","Model Deployment Basics","Azure AI Services","AWS AI Services","Google Cloud Vertex AI","AI APIs & Integration"], handsOn: ["Building and evaluating AI models","Working with cloud AI platforms","Integrating AI APIs"], outcome: "Develop practical skills in AI model development and cloud-based AI services." },
      { day: 3, title: "Advanced AI Concepts & MLOps", topics: ["Deep Learning Fundamentals","Large Language Models (LLMs)","Prompt Engineering","MLOps Basics","AI Monitoring","Model Optimization","AI Security"], handsOn: ["Deploying AI models","Monitoring model performance","Optimizing AI workflows"], outcome: "Understand advanced AI topics and production-ready AI practices commonly covered in certification exams." },
      { day: 4, title: "Mock Exams & Practical Assessment", topics: ["Certification Practice Questions","Case Study Discussions","Scenario-Based Problem Solving","AI Troubleshooting","Performance Optimization","Revision Sessions","Time Management Techniques"], handsOn: ["Full-length mock examination","Practical AI lab assessment","Performance analysis and feedback"], outcome: "Strengthen exam readiness through practical exercises, mock tests, and targeted revision." },
      { day: 5, title: "Final Revision & Certification Readiness", topics: ["Complete AI Concept Revision","Advanced Problem Solving","Exam Strategy & Tips","Interview Preparation","Resume Building","Career Roadmap","Certification Guidance"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","TensorFlow","PyTorch","Scikit-learn","OpenAI APIs","Hugging Face","MLflow","Azure AI Services","AWS AI Services","Google Cloud Vertex AI","Git & GitHub"],
    careers: ["AI Engineer","Machine Learning Engineer","Generative AI Developer","AI Solutions Architect","AI Consultant","MLOps Engineer","Data Scientist","AI Research Associate"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified AI Practitioner","Google Professional Machine Learning Engineer","TensorFlow Developer Certificate","IBM AI Engineering Professional Certificate"],
    realWorldCases: { intro: "Develop and present an end-to-end AI solution that includes:", bullets: ["Case Study Discussions","Data preparation","AI model development","Cloud deployment","Performance evaluation","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "Students, developers, AI professionals, cloud engineers, and IT professionals preparing for Artificial Intelligence certification exams." },
      { question: "Which certification exams does this course support?", answer: "The curriculum aligns with concepts commonly covered in Microsoft Azure AI Engineer (AI-102), AWS Certified AI Practitioner, Google Professional Machine Learning Engineer, TensorFlow Developer, and IBM AI Engineering certifications." },
      { question: "Are mock tests included?", answer: "Yes. The course includes practice quizzes, scenario-based exercises, full-length mock exams, and hands-on lab assessments." },
      { question: "Is practical training included?", answer: "Absolutely. Every training day includes practical labs, cloud AI exercises, model development, deployment tasks, and a capstone project." },
      { question: "What skills will I gain?", answer: "You will strengthen your AI fundamentals, machine learning, cloud AI, Generative AI, MLOps, model deployment, exam preparation strategies, and practical problem-solving skills needed for certification success." }
    ]
  },
  "Artificial Intelligence - CI/CD": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Machine Learning, Python programming, Git, Docker, cloud computing, and software development lifecycle concepts.",
    overview: "The Artificial Intelligence – CI/CD course is designed for AI engineers, MLOps professionals, DevOps engineers, software developers, and cloud architects who want to automate the development, testing, deployment, and maintenance of AI applications. The course covers Continuous Integration (CI), Continuous Delivery/Deployment (CD), MLOps pipelines, model versioning, automated testing, infrastructure automation, cloud deployment, monitoring, and rollback strategies. Through hands-on labs and enterprise projects, participants will learn how to build reliable, scalable, and automated AI delivery pipelines.",
    objectives: ["Understand CI/CD concepts for AI and MLOps.","Build automated pipelines for AI development and deployment.","Implement model versioning and artifact management.","Automate testing, validation, and deployment workflows.","Deploy AI applications using containers and cloud platforms.","Monitor AI pipelines and manage production releases.","Apply DevOps and MLOps best practices to enterprise AI projects."],
    days: [
      { day: 1, title: "CI/CD Fundamentals for AI", topics: ["Introduction to CI/CD","DevOps vs MLOps","AI Development Lifecycle","Git & Version Control","Branching Strategies","CI/CD Architecture","Pipeline Best Practices"], handsOn: ["Setting up Git repositories","Creating a basic CI pipeline","Managing source code versions"], outcome: "Understand the fundamentals of CI/CD and establish a structured AI development workflow." },
      { day: 2, title: "Continuous Integration & Automated Testing", topics: ["Build Automation","Unit Testing","Integration Testing","Model Validation","Automated Code Quality Checks","Artifact Management","Pipeline Automation"], handsOn: ["Creating automated build pipelines","Running AI model validation tests","Managing build artifacts"], outcome: "Automate code integration, testing, and validation for AI applications." },
      { day: 3, title: "Continuous Deployment & Cloud Delivery", topics: ["Continuous Deployment","Docker Containerization","Kubernetes Deployment","Cloud AI Deployment","Infrastructure as Code (IaC)","Rollback Strategies","Release Management"], handsOn: ["Deploying AI applications with Docker","Managing Kubernetes deployments","Automating cloud releases"], outcome: "Deploy AI solutions automatically using cloud-native technologies and deployment pipelines." },
      { day: 4, title: "Monitoring, Security & Optimization", topics: ["Pipeline Monitoring","Logging & Observability","Security Scanning","Secrets Management","Performance Optimization","Compliance & Governance","Disaster Recovery"], handsOn: ["Monitoring CI/CD pipelines","Configuring security checks","Optimizing deployment performance"], outcome: "Build secure, monitored, and highly optimized AI deployment pipelines for production environments." },
      { day: 5, title: "Enterprise AI CI/CD Project & Assessment", topics: ["End-to-End AI Pipeline Implementation","MLOps Workflow Automation","Production Readiness","Documentation Standards","Future Trends in AI DevOps","Career Roadmap","Certification Guidance"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Git & GitHub","GitHub Actions","Jenkins","Docker","Kubernetes","MLflow","Terraform","Azure DevOps","AWS CodePipeline","Google Cloud Build","Prometheus & Grafana"],
    careers: ["MLOps Engineer","AI DevOps Engineer","AI Platform Engineer","Machine Learning Engineer","Cloud AI Engineer","DevOps Engineer","AI Infrastructure Engineer","AI Release Engineer"],
    certifications: ["Microsoft Azure DevOps Engineer Expert (AZ-400)","Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified DevOps Engineer – Professional","Google Professional Cloud DevOps Engineer","Certified Kubernetes Application Developer (CKAD)"],
    realWorldCases: { intro: "Build a complete enterprise AI CI/CD pipeline that includes:", bullets: ["Source code management","Automated testing","AI model validation","Docker & Kubernetes deployment","Pipeline monitoring and release automation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "AI engineers, MLOps professionals, DevOps engineers, software developers, cloud architects, and infrastructure teams responsible for AI deployment and automation." },
      { question: "Does this course focus on MLOps as well as DevOps?", answer: "Yes. It combines DevOps principles with MLOps workflows, including model versioning, automated testing, CI/CD pipelines, deployment, monitoring, and lifecycle management." },
      { question: "Are practical labs included?", answer: "Yes. Every training day includes hands-on exercises for Git, GitHub Actions, Jenkins, Docker, Kubernetes, MLflow, Terraform, cloud deployment, and pipeline automation." },
      { question: "Which tools and platforms are covered?", answer: "Participants will work with Git, GitHub Actions, Jenkins, Docker, Kubernetes, MLflow, Terraform, Azure DevOps, AWS CodePipeline, Google Cloud Build, Prometheus, and Grafana." },
      { question: "What skills will I gain?", answer: "You will learn CI/CD pipeline development, MLOps automation, AI deployment, infrastructure management, security integration, monitoring, release management, and enterprise DevOps best practices for AI applications." }
    ]
  },
  "Artificial Intelligence - Computer Vision": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Machine Learning, Python programming, image processing fundamentals, and linear algebra.",
    overview: "The Artificial Intelligence – Computer Vision course is designed for AI developers, machine learning engineers, data scientists, software engineers, robotics professionals, and researchers who want to build intelligent systems capable of interpreting images and videos. The course covers image processing, feature extraction, object detection, image classification, segmentation, facial recognition, optical character recognition (OCR), video analytics, deep learning for computer vision, and deployment of vision-based AI applications. Through hands-on labs and real-world projects, participants will gain practical experience in developing enterprise-grade computer vision solutions.",
    objectives: ["Understand the fundamentals of computer vision and digital image processing.","Develop AI models for image classification and object detection.","Implement deep learning techniques for computer vision applications.","Build OCR, facial recognition, and video analytics solutions.","Optimize and deploy computer vision models in production.","Evaluate model accuracy and improve performance.","Design scalable AI-powered vision applications for real-world use cases."],
    days: [
      { day: 1, title: "Computer Vision Fundamentals", topics: ["Introduction to Computer Vision","Digital Image Processing","Image Representation","Color Spaces","Image Filtering","Feature Extraction","Computer Vision Workflow"], handsOn: ["Reading and processing images","Applying image transformations","Extracting image features"], outcome: "Understand the fundamentals of computer vision and perform basic image processing operations." },
      { day: 2, title: "Image Recognition & Object Detection", topics: ["Image Classification","Convolutional Neural Networks (CNNs)","Object Detection","Object Tracking","Image Segmentation","Transfer Learning","Performance Metrics"], handsOn: ["Building image classification models","Detecting objects in images","Evaluating model performance"], outcome: "Develop AI models capable of recognizing, detecting, and classifying objects accurately." },
      { day: 3, title: "Advanced Computer Vision Applications", topics: ["Facial Recognition","Optical Character Recognition (OCR)","Video Analytics","Pose Estimation","Medical Image Analysis","Industrial Vision Systems","Edge AI for Vision"], handsOn: ["Developing OCR solutions","Implementing facial recognition","Creating video analysis applications"], outcome: "Build advanced computer vision solutions for healthcare, manufacturing, security, and automation." },
      { day: 4, title: "Deployment, Optimization & Monitoring", topics: ["Model Deployment","ONNX Runtime","TensorRT Overview","API Integration","Performance Optimization","AI Monitoring","Security Best Practices"], handsOn: ["Deploying computer vision models","Optimizing inference speed","Monitoring production applications"], outcome: "Deploy optimized computer vision solutions with efficient monitoring and enterprise-level performance." },
      { day: 5, title: "Enterprise Computer Vision Project & Assessment", topics: ["End-to-End Computer Vision Solution","Industry Case Studies","Documentation Standards","Future Trends in Computer Vision","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","OpenCV","TensorFlow","PyTorch","Keras","YOLO","Detectron2","OpenVINO","ONNX Runtime","Jupyter Notebook","Git & GitHub","Google Colab"],
    careers: ["Computer Vision Engineer","AI Engineer","Machine Learning Engineer","Robotics Engineer","Deep Learning Engineer","Image Processing Engineer","AI Research Scientist","Autonomous Systems Engineer"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Google Professional Machine Learning Engineer","AWS Certified AI Practitioner","TensorFlow Developer Certificate","IBM AI Engineering Professional Certificate"],
    realWorldCases: { intro: "Develop a complete computer vision application that includes:", bullets: ["Industry Case Studies","Image preprocessing","Object detection or image classification","OCR or facial recognition integration","Deployment and optimization","Performance evaluation and project documentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "AI developers, machine learning engineers, software developers, robotics professionals, data scientists, and researchers interested in computer vision technologies." },
      { question: "Is programming knowledge required?", answer: "Yes. Basic Python programming and familiarity with machine learning concepts are recommended for practical exercises and projects." },
      { question: "Are practical computer vision projects included?", answer: "Yes. Every training day includes hands-on labs covering image processing, object detection, OCR, facial recognition, video analytics, deployment, and a comprehensive enterprise computer vision capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Participants will work with Python, OpenCV, TensorFlow, PyTorch, Keras, YOLO, Detectron2, OpenVINO, ONNX Runtime, Jupyter Notebook, Git & GitHub, and Google Colab." },
      { question: "What skills will I gain?", answer: "You will learn image processing, object detection, image classification, facial recognition, OCR, video analytics, model deployment, performance optimization, and enterprise computer vision application development using industry-standard AI frameworks and tools." }
    ]
  },
  "Artificial Intelligence - Consulting": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, business processes, cloud technologies, and AI implementation concepts.",
    overview: "The Artificial Intelligence – Consulting course is designed for AI consultants, business analysts, solution architects, project managers, and technology professionals who want to advise organizations on adopting AI solutions. Participants will learn how to assess business requirements, identify AI opportunities, design implementation strategies, manage stakeholder expectations, evaluate AI platforms, and deliver successful AI transformation projects. Through real-world case studies and consulting exercises, learners will develop the technical and business skills required to become trusted AI consultants.",
    objectives: ["Understand the role of an AI consultant in digital transformation.","Analyze business challenges and identify AI opportunities.","Recommend suitable AI technologies and implementation strategies.","Design AI solution roadmaps aligned with business goals.","Manage AI project planning, governance, and risk assessment.","Communicate technical AI concepts to business stakeholders.","Deliver enterprise AI consulting engagements successfully."],
    days: [
      { day: 1, title: "AI Consulting Fundamentals", topics: ["Introduction to AI Consulting","AI Business Transformation","Understanding Client Requirements","AI Opportunity Assessment","Industry Use Cases","AI Consulting Frameworks","Consulting Best Practices"], handsOn: ["Conducting a business needs assessment","Identifying AI use cases","Preparing an AI consulting checklist"], outcome: "Understand the AI consulting lifecycle and evaluate business opportunities for AI adoption." },
      { day: 2, title: "Solution Design & Technology Selection", topics: ["AI Solution Architecture","AI Platform Evaluation","Cloud AI Services","Vendor Comparison","Build vs Buy Decisions","Cost Estimation","AI Roadmap Planning"], handsOn: ["Comparing AI platforms","Designing an AI solution roadmap","Preparing technology recommendations"], outcome: "Design business-focused AI solutions and recommend the most suitable technologies." },
      { day: 3, title: "Implementation Strategy & Governance", topics: ["AI Implementation Planning","Change Management","AI Governance","Risk Assessment","Compliance & Ethics","Stakeholder Communication","Project Documentation"], handsOn: ["Creating an implementation strategy","Performing AI risk analysis","Preparing governance documentation"], outcome: "Develop implementation strategies that ensure secure, compliant, and successful AI adoption." },
      { day: 4, title: "Business Value & Performance Evaluation", topics: ["AI ROI Measurement","KPI Definition","Performance Monitoring","AI Adoption Metrics","Business Process Optimization","Executive Reporting","Continuous Improvement"], handsOn: ["Measuring AI project success","Building executive dashboards","Evaluating business impact"], outcome: "Assess AI performance and demonstrate measurable business value to stakeholders." },
      { day: 5, title: "Enterprise Consulting Project & Assessment", topics: ["End-to-End AI Consulting Engagement","Proposal Development","Client Presentation Techniques","Future AI Trends","Career Roadmap","Certification Guidance","Consulting Best Practices"], handsOn: [], outcome: "" }
    ],
    tools: ["Python (Overview)","Microsoft Azure AI","AWS AI Services","Google Cloud Vertex AI","Power BI","Microsoft Visio / Lucidchart","Jira","Git & GitHub","Microsoft Excel","AI Business Assessment Frameworks"],
    careers: ["AI Consultant","AI Solutions Consultant","Digital Transformation Consultant","AI Business Analyst","AI Strategy Consultant","Enterprise AI Advisor","AI Project Consultant","Technology Consulting Specialist"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified AI Practitioner","Google Professional Machine Learning Engineer","Microsoft Certified: Power Platform Fundamentals (PL-900)","PMI Project Management Professional (PMP) (Recommended for consulting professionals)"],
    realWorldCases: { intro: "Prepare a complete AI consulting proposal that includes:", bullets: ["Industry Use Cases","Business requirement analysis","AI opportunity assessment","Solution architecture recommendation","Implementation roadmap","Cost-benefit analysis and executive presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "Business analysts, consultants, solution architects, project managers, AI professionals, and technology advisors involved in AI transformation projects." },
      { question: "Is this course technical or business-focused?", answer: "It combines both technical and business perspectives, helping participants bridge the gap between AI technology and business strategy." },
      { question: "Are practical consulting exercises included?", answer: "Yes. The course includes case studies, consulting simulations, business assessments, and a capstone consulting proposal." },
      { question: "Which industries are covered?", answer: "The course explores AI consulting scenarios across healthcare, finance, retail, manufacturing, education, logistics, and government sectors." },
      { question: "What skills will I gain?", answer: "You will learn business analysis, AI strategy, solution recommendation, project planning, stakeholder management, ROI evaluation, and enterprise AI consulting best practices." }
    ]
  },
  "Artificial Intelligence - Data Modeling": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Machine Learning, Python programming, SQL, and database fundamentals.",
    overview: "The Artificial Intelligence – Data Modeling course is designed for AI engineers, data scientists, machine learning engineers, data analysts, and database professionals who want to build efficient data models for AI applications. The course covers data modeling principles, data architecture, feature engineering, relational and non-relational databases, data pipelines, data governance, and AI-ready datasets. Through hands-on labs and real-world projects, participants will learn how to design, optimize, and manage data models that improve AI model accuracy, scalability, and performance.",
    objectives: ["Understand data modeling concepts for AI and machine learning.","Design structured and unstructured data models.","Build AI-ready datasets through preprocessing and feature engineering.","Implement relational and NoSQL database models.","Develop scalable data pipelines for AI applications.","Apply data governance, quality, and security standards.","Optimize data models for enterprise AI solutions."],
    days: [
      { day: 1, title: "Data Modeling Fundamentals", topics: ["Introduction to Data Modeling","AI Data Lifecycle","Structured vs Unstructured Data","Data Modeling Techniques","Entity Relationship (ER) Modeling","Normalization & Denormalization","Data Modeling Best Practices"], handsOn: ["Designing ER diagrams","Creating logical data models","Preparing AI-ready datasets"], outcome: "Understand the fundamentals of data modeling and create efficient data structures for AI projects." },
      { day: 2, title: "Database Design & Feature Engineering", topics: ["Relational Database Design","NoSQL Databases","Data Warehousing","Feature Engineering","Data Transformation","Metadata Management","Data Validation"], handsOn: ["Designing relational schemas","Building feature datasets","Validating transformed data"], outcome: "Design optimized databases and engineer high-quality features for machine learning models." },
      { day: 3, title: "Data Pipelines & AI Integration", topics: ["Data Ingestion","ETL & ELT Processes","Data Pipelines","AI Data Integration","Batch & Real-Time Processing","Data Versioning","Workflow Automation"], handsOn: ["Building ETL pipelines","Automating data workflows","Integrating datasets into AI applications"], outcome: "Develop scalable data pipelines that support reliable AI model training and deployment." },
      { day: 4, title: "Governance, Security & Performance", topics: ["Data Governance","Data Privacy","Data Security","Data Quality Management","Performance Optimization","Backup & Recovery","Compliance Standards"], handsOn: ["Implementing governance policies","Optimizing database performance","Securing AI datasets"], outcome: "Manage AI data securely while ensuring quality, compliance, and optimal performance." },
      { day: 5, title: "Enterprise Data Modeling Project & Assessment", topics: ["Enterprise Data Architecture","AI Data Strategy","Documentation Standards","Performance Benchmarking","Future Trends in AI Data Modeling","Career Roadmap","Certification Guidance"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","SQL","PostgreSQL","MySQL","MongoDB","Pandas","Apache Spark (Overview)","Apache Airflow (Overview)","Jupyter Notebook","Git & GitHub","Microsoft Power BI"],
    careers: ["AI Data Engineer","Data Modeler","Machine Learning Engineer","Data Architect","AI Solutions Engineer","Data Analyst","ETL Developer","AI Database Specialist"],
    certifications: ["Microsoft Azure Data Fundamentals (DP-900)","Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified Data Engineer – Associate","Google Professional Data Engineer","IBM Data Engineering Professional Certificate"],
    realWorldCases: { intro: "Design an enterprise AI data model that includes:", bullets: ["Database schema design","Feature engineering workflow","ETL pipeline implementation","Data governance framework","Performance optimization and documentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "AI engineers, data scientists, database administrators, data analysts, machine learning engineers, and professionals responsible for designing AI-ready data systems." },
      { question: "Does this course focus on AI-specific data modeling?", answer: "Yes. The curriculum emphasizes data modeling techniques specifically for AI and machine learning applications, including feature engineering and AI data pipelines." },
      { question: "Are practical labs included?", answer: "Yes. Every training day includes hands-on exercises in database design, ETL pipelines, feature engineering, governance, and enterprise data modeling." },
      { question: "Which tools and databases are covered?", answer: "Participants will work with Python, SQL, PostgreSQL, MySQL, MongoDB, Pandas, Apache Spark, Apache Airflow, Power BI, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn AI data architecture, database design, feature engineering, ETL pipeline development, data governance, security, performance optimization, and enterprise data modeling best practices." }
    ]
  },
  "Artificial Intelligence - Deep Learning": {
    level: "Intermediate",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Machine Learning, Python programming, linear algebra, and statistics.",
    overview: "The Artificial Intelligence – Deep Learning course is designed for AI developers, machine learning engineers, data scientists, researchers, and software professionals who want to build intelligent systems using deep neural networks. The course covers deep learning fundamentals, neural network architectures, convolutional neural networks (CNNs), recurrent neural networks (RNNs), transfer learning, model optimization, and deployment techniques. Through practical labs and real-world projects, participants will gain hands-on experience in developing and deploying deep learning models for image, text, and predictive analytics applications.",
    objectives: ["Understand the fundamentals of deep learning and neural networks.","Build and train deep learning models using industry-standard frameworks.","Apply CNNs and RNNs for computer vision and sequence modeling.","Optimize model performance using advanced training techniques.","Evaluate, deploy, and monitor deep learning models.","Implement best practices for scalable and efficient AI solutions.","Develop real-world deep learning applications across multiple industries."],
    days: [
      { day: 1, title: "Deep Learning Fundamentals", topics: ["Introduction to Deep Learning","Artificial Neural Networks (ANNs)","Perceptrons and Activation Functions","Forward & Backpropagation","Loss Functions","Optimizers","Deep Learning Workflow"], handsOn: ["Building a basic neural network","Training simple deep learning models","Evaluating model performance"], outcome: "Understand the core concepts of deep learning and develop simple neural network models." },
      { day: 2, title: "Convolutional & Recurrent Neural Networks", topics: ["Convolutional Neural Networks (CNNs)","Image Classification","Feature Extraction","Recurrent Neural Networks (RNNs)","LSTM & GRU Networks","Sequence Modeling","Transfer Learning"], handsOn: ["Building CNN image classifiers","Developing sequence prediction models","Applying transfer learning techniques"], outcome: "Develop deep learning models for image recognition and sequential data processing." },
      { day: 3, title: "Advanced Deep Learning Techniques", topics: ["Hyperparameter Tuning","Regularization Techniques","Batch Normalization","Dropout","Attention Mechanisms","Transformer Basics","Model Optimization"], handsOn: ["Optimizing neural network performance","Experimenting with training strategies","Improving model accuracy"], outcome: "Apply advanced optimization techniques to build accurate and efficient deep learning models." },
      { day: 4, title: "Deployment & Production Deep Learning", topics: ["Model Evaluation","Model Deployment","TensorFlow Serving","ONNX Runtime","GPU Acceleration","Monitoring Deep Learning Models","MLOps Overview"], handsOn: ["Deploying trained models","Monitoring model performance","Optimizing inference speed"], outcome: "Deploy production-ready deep learning models and monitor their performance effectively." },
      { day: 5, title: "Enterprise Deep Learning Project & Assessment", topics: ["End-to-End Deep Learning Workflow","Industry Case Studies","Emerging Deep Learning Trends","Career Roadmap","Certification Guidance","Documentation","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","TensorFlow","Keras","PyTorch","Scikit-learn","Jupyter Notebook","OpenCV","ONNX Runtime","Git & GitHub","Google Colab","NVIDIA CUDA (Overview)"],
    careers: ["Deep Learning Engineer","Machine Learning Engineer","AI Research Scientist","Computer Vision Engineer","NLP Engineer","AI Developer","Data Scientist","AI Solutions Architect"],
    certifications: ["TensorFlow Developer Certificate","Microsoft Azure AI Engineer Associate (AI-102)","Google Professional Machine Learning Engineer","AWS Certified AI Practitioner","IBM AI Engineering Professional Certificate"],
    realWorldCases: { intro: "Develop a complete deep learning solution that includes:", bullets: ["Industry Case Studies","Data preprocessing","Neural network development","Model training and optimization","Deployment","Performance evaluation and documentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "AI developers, machine learning engineers, data scientists, researchers, software engineers, and professionals interested in advanced deep learning techniques." },
      { question: "Is prior machine learning knowledge required?", answer: "Yes. Basic understanding of machine learning, Python programming, and mathematics is recommended for successfully completing the practical exercises." },
      { question: "Are practical deep learning projects included?", answer: "Yes. Every training day includes hands-on coding labs, neural network development, CNN and RNN implementation, deployment exercises, and a comprehensive enterprise deep learning capstone project." },
      { question: "Which tools and frameworks are covered?", answer: "Participants will work with Python, TensorFlow, Keras, PyTorch, Scikit-learn, OpenCV, ONNX Runtime, Jupyter Notebook, Google Colab, Git & GitHub, and NVIDIA CUDA." },
      { question: "What skills will I gain?", answer: "You will learn neural network design, CNNs, RNNs, transfer learning, model optimization, deployment, performance monitoring, deep learning workflows, and enterprise AI solution development using modern deep learning frameworks." }
    ]
  },
  "Artificial Intelligence - Development": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Python programming, mathematics, statistics, and Artificial Intelligence fundamentals.",
    overview: "The Artificial Intelligence – Development course is designed for developers, software engineers, data professionals, and AI enthusiasts who want to build intelligent applications using modern AI technologies. Participants will learn the complete AI development lifecycle, from data preparation and model building to training, evaluation, deployment, and optimization. The course covers Machine Learning, Deep Learning, Natural Language Processing (NLP), Computer Vision, Generative AI fundamentals, and real-world AI development practices through hands-on projects.",
    objectives: ["Understand the AI development lifecycle.","Develop Machine Learning and Deep Learning models.","Build AI-powered applications using Python.","Implement NLP and Computer Vision solutions.","Train, evaluate, and optimize AI models.","Deploy AI models for production environments.","Follow AI security and ethical development practices."],
    days: [
      { day: 1, title: "AI Development Fundamentals", topics: ["Introduction to AI Development","AI Development Lifecycle","Python for AI Development","Data Collection & Preprocessing","Feature Engineering Basics","AI Development Tools & Frameworks","Setting Up the Development Environment"], handsOn: ["Installing Python libraries","Preparing datasets","Exploring Google Colab/Jupyter Notebook"], outcome: "Understand AI development fundamentals and prepare data for building intelligent applications." },
      { day: 2, title: "Machine Learning Model Development", topics: ["Supervised Learning","Unsupervised Learning","Model Selection","Model Training","Model Evaluation","Hyperparameter Tuning","Performance Metrics"], handsOn: ["Build a classification model","Train and evaluate Machine Learning algorithms","Analyze model performance"], outcome: "Develop and evaluate Machine Learning models using real-world datasets." },
      { day: 3, title: "Deep Learning, NLP & Computer Vision", topics: ["Introduction to Deep Learning","Neural Networks","Convolutional Neural Networks (CNN)","Natural Language Processing (NLP)","Computer Vision Fundamentals","Generative AI Overview","AI APIs & Pre-trained Models"], handsOn: ["Image classification demo","Text sentiment analysis","Working with pre-trained AI models"], outcome: "Build AI applications using Deep Learning, NLP, and Computer Vision techniques." },
      { day: 4, title: "AI Deployment & Integration", topics: ["Model Deployment Strategies","REST APIs for AI Applications","Cloud AI Services","AI Application Integration","Model Monitoring","Security Best Practices","Version Control & Collaboration"], handsOn: ["Deploy an AI model","Create an API for predictions","Integrate AI into a sample application"], outcome: "Deploy AI solutions and integrate them into production-ready applications." },
      { day: 5, title: "AI Project, Optimization & Best Practices", topics: ["Model Optimization Techniques","AI Performance Improvement","Explainable AI (XAI)","Responsible AI Development","Debugging & Troubleshooting","Career Roadmap","Certification Guidance"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Google Colab","Jupyter Notebook","NumPy","Pandas","Scikit-learn","TensorFlow","Keras","OpenCV","Hugging Face","Git & GitHub","FastAPI/Flask (Introduction)"],
    careers: ["AI Developer","Machine Learning Engineer","AI Software Engineer","Deep Learning Engineer","NLP Developer","Computer Vision Engineer","AI Application Developer","Generative AI Developer"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Google Professional Machine Learning Engineer","AWS Certified AI Practitioner","IBM AI Engineering Professional Certificate","TensorFlow Developer Certificate"],
    realWorldCases: { intro: "Develop an end-to-end AI application by:", bullets: ["Preparing data","Training an AI model","Evaluating performance","Deploying the solution","Presenting project outcomes"] },
    faqs: [
      { question: "Who should attend this course?", answer: "Software developers, Python programmers, data professionals, and anyone interested in building AI-powered applications." },
      { question: "Is prior programming knowledge required?", answer: "Yes. Basic Python programming knowledge is recommended for this development-focused course." },
      { question: "Will the course include practical projects?", answer: "Yes. Every training day includes hands-on labs, and the course concludes with a capstone AI development project." },
      { question: "Which frameworks will be covered?", answer: "Participants will work with TensorFlow, Scikit-learn, Keras, OpenCV, Hugging Face, and other popular AI development tools." },
      { question: "What skills will I gain?", answer: "You will learn how to design, develop, train, evaluate, deploy, and maintain AI applications using industry-standard tools and best practices." }
    ]
  },
  "Artificial Intelligence - Engineering": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Machine Learning, Python programming, software engineering principles, and cloud computing.",
    overview: "The Artificial Intelligence – Engineering course is designed for software engineers, AI developers, machine learning engineers, and technical professionals who want to build, deploy, and maintain enterprise-grade AI applications. This course focuses on AI software engineering practices, model development, scalable architectures, MLOps, API development, cloud deployment, testing, security, and performance optimization. Through practical labs and real-world engineering projects, participants will gain the skills required to develop reliable, scalable, and production-ready AI solutions.",
    objectives: ["Apply software engineering principles to AI development.","Design, build, and deploy AI-powered applications.","Develop scalable AI architectures and APIs.","Implement MLOps workflows and CI/CD pipelines.","Test, monitor, and optimize AI systems.","Secure AI applications and enterprise deployments.","Deliver production-ready AI engineering solutions."],
    days: [
      { day: 1, title: "AI Engineering Fundamentals", topics: ["Introduction to AI Engineering","AI Software Development Lifecycle (AI SDLC)","AI System Architecture","Python for AI Engineering","Development Environment Setup","Version Control with Git","Engineering Best Practices"], handsOn: ["Setting up an AI engineering workspace","Creating project repositories","Developing a basic AI application structure"], outcome: "Understand AI engineering principles and establish a structured development workflow." },
      { day: 2, title: "AI Model Development & API Engineering", topics: ["Data Preparation","Machine Learning Model Development","Model Evaluation","REST API Development","FastAPI Integration","Database Connectivity","AI Service Integration"], handsOn: ["Training AI models","Building AI-powered REST APIs","Connecting AI services with databases"], outcome: "Develop AI models and expose them as scalable APIs for enterprise applications." },
      { day: 3, title: "Deployment, MLOps & Cloud Engineering", topics: ["AI Model Deployment","Docker Containerization","Kubernetes Orchestration","CI/CD for AI","Cloud AI Platforms","Infrastructure Automation","AI Pipeline Management"], handsOn: ["Deploying AI applications","Building CI/CD pipelines","Managing containerized AI services"], outcome: "Deploy AI solutions using cloud-native engineering and MLOps best practices." },
      { day: 4, title: "Testing, Security & Performance Engineering", topics: ["AI Testing Strategies","Performance Optimization","AI Security","Authentication & Authorization","Monitoring & Logging","Debugging AI Applications","Reliability Engineering"], handsOn: ["Testing AI APIs","Optimizing model performance","Implementing security controls"], outcome: "Build secure, high-performance, and reliable AI applications suitable for enterprise environments." },
      { day: 5, title: "Enterprise AI Engineering Project", topics: ["End-to-End AI Solution Development","Architecture Review","Deployment Validation","Documentation Standards","Code Quality & Maintenance","Career Roadmap","Certification Guidance"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","TensorFlow","PyTorch","Scikit-learn","FastAPI","Docker","Kubernetes","MLflow","Git & GitHub","Azure AI Services","AWS AI Services","Google Cloud Vertex AI"],
    careers: ["AI Engineer","Machine Learning Engineer","AI Software Engineer","MLOps Engineer","AI Platform Engineer","AI Solutions Engineer","Cloud AI Engineer","AI Technical Lead"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified AI Practitioner","Google Professional Machine Learning Engineer","TensorFlow Developer Certificate","Microsoft Azure DevOps Engineer Expert (AZ-400)"],
    realWorldCases: { intro: "Develop and deploy a complete AI application that includes:", bullets: ["Data preprocessing","Machine learning model development","API implementation","Cloud deployment","Monitoring, testing, and documentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "Software engineers, AI developers, machine learning engineers, DevOps professionals, and cloud engineers building AI applications." },
      { question: "Does this course include software engineering concepts?", answer: "Yes. The curriculum combines AI development with software engineering practices, including architecture, version control, testing, deployment, and CI/CD." },
      { question: "Are practical engineering projects included?", answer: "Yes. Every training day includes coding exercises, deployment labs, API development, and a comprehensive capstone engineering project." },
      { question: "Which tools will I use during the training?", answer: "Participants will work with Python, TensorFlow, PyTorch, FastAPI, Docker, Kubernetes, MLflow, Git, and major cloud AI platforms." },
      { question: "What skills will I gain?", answer: "You will learn AI application development, API engineering, cloud deployment, MLOps, testing, security, performance optimization, and enterprise AI software engineering best practices." }
    ]
  },
  "Artificial Intelligence - Enterprise Solutions": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Machine Learning, cloud computing, enterprise applications, and software architecture.",
    overview: "The Artificial Intelligence – Enterprise Solutions course is designed for AI engineers, solution architects, business analysts, IT managers, and technology leaders who want to implement AI across enterprise environments. The course covers enterprise AI strategy, scalable solution architecture, intelligent business automation, cloud AI services, data integration, governance, security, and AI-driven decision-making. Through practical exercises and real-world business scenarios, participants will learn how to design, deploy, and manage AI solutions that improve operational efficiency and drive digital transformation.",
    objectives: ["Understand enterprise AI architecture and implementation strategies.","Design AI-powered business solutions for large organizations.","Integrate AI with ERP, CRM, and enterprise applications.","Deploy scalable and secure AI solutions in cloud environments.","Implement AI governance, compliance, and risk management.","Monitor and optimize enterprise AI systems.","Lead AI-driven digital transformation initiatives."],
    days: [
      { day: 1, title: "Enterprise AI Fundamentals", topics: ["Introduction to Enterprise AI","Enterprise AI Strategy","AI Transformation Roadmap","Business Process Analysis","AI Use Cases Across Industries","Enterprise Architecture Overview","AI Adoption Best Practices"], handsOn: ["Identifying enterprise AI opportunities","Designing a business transformation roadmap","Evaluating enterprise AI use cases"], outcome: "Understand how AI supports enterprise innovation, business growth, and digital transformation." },
      { day: 2, title: "Enterprise Integration & Solution Design", topics: ["AI Solution Architecture","ERP & CRM Integration","API-Based AI Services","Cloud AI Platforms","Data Pipelines","Intelligent Automation","Workflow Optimization"], handsOn: ["Integrating AI with enterprise systems","Designing AI workflows","Building scalable solution architectures"], outcome: "Design enterprise-ready AI solutions integrated with business applications and cloud services." },
      { day: 3, title: "Security, Governance & Compliance", topics: ["AI Security Frameworks","Identity & Access Management","Data Privacy","Responsible AI","Enterprise AI Governance","Regulatory Compliance","Risk Management"], handsOn: ["Implementing security controls","Performing governance assessments","Evaluating compliance requirements"], outcome: "Build secure, compliant, and trustworthy enterprise AI solutions." },
      { day: 4, title: "Deployment, Monitoring & Optimization", topics: ["AI Deployment Strategies","MLOps Fundamentals","AI Monitoring","Performance Optimization","Cost Management","Disaster Recovery","Continuous Improvement"], handsOn: ["Deploying AI solutions","Monitoring production environments","Optimizing enterprise AI performance"], outcome: "Deploy and manage AI solutions with high availability, scalability, and operational efficiency." },
      { day: 5, title: "Enterprise AI Project & Assessment", topics: ["End-to-End Enterprise AI Implementation","AI Project Management","Business Value Measurement","Executive Reporting","Future Enterprise AI Trends","Career Roadmap","Certification Guidance"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Azure AI Services","AWS AI Services","Google Cloud Vertex AI","OpenAI APIs","Docker","Kubernetes","MLflow","Power BI","Git & GitHub","REST APIs"],
    careers: ["Enterprise AI Architect","AI Solutions Architect","AI Consultant","AI Transformation Manager","Enterprise AI Engineer","Digital Transformation Specialist","AI Project Manager","Cloud AI Solutions Engineer"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified AI Practitioner","Google Professional Machine Learning Engineer","Microsoft Azure Solutions Architect Expert","IBM AI Engineering Professional Certificate"],
    realWorldCases: { intro: "Design and present an enterprise AI solution that includes:", bullets: ["Business requirements analysis","AI architecture design","ERP/CRM integration","Security and governance framework","Deployment and monitoring strategy"] },
    faqs: [
      { question: "Who should attend this course?", answer: "AI engineers, solution architects, IT managers, business analysts, cloud professionals, and enterprise technology leaders responsible for AI initiatives." },
      { question: "What enterprise solutions are covered?", answer: "The course covers AI integration with ERP, CRM, cloud platforms, business automation, governance, deployment, monitoring, and enterprise architecture." },
      { question: "Are practical projects included?", answer: "Yes. Every day includes hands-on labs, enterprise case studies, architecture design exercises, and a capstone implementation project." },
      { question: "Which tools will I learn?", answer: "Participants will work with Python, Azure AI, AWS AI Services, Google Cloud Vertex AI, OpenAI APIs, Docker, Kubernetes, MLflow, Power BI, Git, and REST APIs." },
      { question: "What skills will I gain?", answer: "You will learn enterprise AI strategy, solution architecture, cloud integration, governance, deployment, monitoring, and AI-driven business transformation using industry best practices." }
    ]
  },
  "Artificial Intelligence - Explainable AI": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Machine Learning, Python programming, statistics, and model development concepts.",
    overview: "The Artificial Intelligence – Explainable AI (XAI) course is designed for AI engineers, machine learning engineers, data scientists, researchers, compliance professionals, and business analysts who want to understand, interpret, and explain AI model decisions. The course covers Explainable AI concepts, model interpretability techniques, feature importance analysis, bias detection, fairness evaluation, visualization tools, regulatory compliance, and responsible AI practices. Through hands-on labs and real-world case studies, participants will learn how to build transparent and trustworthy AI systems suitable for enterprise environments.",
    objectives: ["Understand the principles of Explainable AI (XAI).","Interpret predictions made by machine learning models.","Apply local and global explanation techniques.","Detect bias and evaluate fairness in AI models.","Use XAI tools for visualization and decision analysis.","Improve AI transparency for regulatory compliance.","Build trustworthy AI solutions for enterprise applications."],
    days: [
      { day: 1, title: "Explainable AI Fundamentals", topics: ["Introduction to Explainable AI (XAI)","Importance of AI Transparency","Black-Box vs White-Box Models","Model Interpretability Concepts","Explainability Frameworks","Responsible AI Principles","Business Use Cases for XAI"], handsOn: ["Exploring explainable AI examples","Comparing interpretable and black-box models","Evaluating model transparency"], outcome: "Understand the foundations of Explainable AI and the importance of transparency in AI systems." },
      { day: 2, title: "Model Interpretation Techniques", topics: ["Feature Importance","SHAP (SHapley Additive Explanations)","LIME (Local Interpretable Model-Agnostic Explanations)","Partial Dependence Plots","Individual Prediction Analysis","Model Confidence Scores","Decision Visualization"], handsOn: ["Applying SHAP and LIME","Visualizing feature importance","Explaining individual model predictions"], outcome: "Interpret AI model behavior using industry-standard Explainable AI techniques and visualization tools." },
      { day: 3, title: "Fairness, Bias & Responsible AI", topics: ["Bias Detection","Fairness Metrics","Ethical AI","Responsible AI Frameworks","Data Bias Analysis","Model Auditing","AI Risk Assessment"], handsOn: ["Measuring fairness in AI models","Identifying biased predictions","Conducting AI model audits"], outcome: "Evaluate AI systems for fairness, bias, and ethical compliance using responsible AI methodologies." },
      { day: 4, title: "Enterprise XAI Implementation", topics: ["Explainability in Production","Regulatory Compliance","AI Governance","XAI Dashboards","Monitoring Model Drift","Documentation Standards","Performance Optimization"], handsOn: ["Building explainability dashboards","Monitoring model performance","Preparing compliance reports"], outcome: "Deploy Explainable AI solutions in enterprise environments while ensuring transparency, governance, and compliance." },
      { day: 5, title: "Explainable AI Project & Assessment", topics: ["End-to-End Explainable AI Workflow","Enterprise Case Studies","Future Trends in XAI","Career Roadmap","Certification Guidance","Project Documentation","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Scikit-learn","SHAP","LIME","IBM AI Fairness 360 (AIF360)","TensorFlow","Jupyter Notebook","Pandas","Matplotlib","Microsoft Responsible AI Dashboard","Git & GitHub"],
    careers: ["Explainable AI Engineer","Machine Learning Engineer","AI Research Scientist","Responsible AI Specialist","AI Governance Consultant","Data Scientist","AI Risk Analyst","AI Compliance Consultant"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified AI Practitioner","Google Professional Machine Learning Engineer","IBM AI Engineering Professional Certificate","Microsoft Applied Skills: Responsible AI"],
    realWorldCases: { intro: "Develop an Explainable AI solution that includes:", bullets: ["Business Use Cases for XAI","Enterprise Case Studies","Machine learning model development","Feature importance analysis","SHAP and LIME implementation","Bias evaluation","Explainability dashboard and documentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "AI engineers, machine learning engineers, data scientists, researchers, AI governance professionals, compliance officers, and business analysts working with AI systems." },
      { question: "Do I need prior machine learning experience?", answer: "Yes. Basic knowledge of machine learning concepts and Python programming is recommended to fully benefit from this course." },
      { question: "Are practical labs included?", answer: "Yes. Every training day includes hands-on labs using SHAP, LIME, fairness assessment tools, model interpretation exercises, dashboards, and a comprehensive Explainable AI project." },
      { question: "Which tools and frameworks are covered?", answer: "Participants will work with Python, Scikit-learn, SHAP, LIME, TensorFlow, IBM AI Fairness 360 (AIF360), Microsoft Responsible AI Dashboard, Pandas, Jupyter Notebook, Git & GitHub, and Matplotlib." },
      { question: "What skills will I gain?", answer: "You will learn model interpretability, feature importance analysis, explainability techniques, fairness evaluation, bias detection, responsible AI implementation, regulatory compliance, and enterprise Explainable AI best practices." }
    ]
  },
  "Artificial Intelligence - Fundamentals": {
    level: "Beginner",
    scheduleDays: 5,
    prerequisites: "Basic computer knowledge and logical thinking. No prior programming or AI experience is required.",
    overview: "Artificial Intelligence (AI) is transforming industries by enabling machines to perform tasks that traditionally require human intelligence. This course introduces learners to the core concepts of AI, including machine learning, deep learning, natural language processing, computer vision, expert systems, and ethical AI. Through interactive sessions, demonstrations, and hands-on exercises, participants will understand how AI works and how it is applied in real-world business scenarios.",
    objectives: ["Understand the fundamentals of Artificial Intelligence.","Differentiate between AI, Machine Learning, and Deep Learning.","Explore common AI technologies and tools.","Understand AI workflows and data requirements.","Build simple AI models using beginner-friendly tools.","Identify real-world AI applications across industries.","Learn AI ethics, security, and responsible AI practices."],
    days: [
      { day: 1, title: "Introduction to Artificial Intelligence", topics: ["What is Artificial Intelligence?","History and Evolution of AI","Types of Artificial Intelligence","Narrow AI","General AI","Super AI","AI vs Machine Learning vs Deep Learning","AI Terminologies","AI Applications Across Industries","AI Career Opportunities"], handsOn: ["Exploring AI-powered applications","Understanding AI use cases","Introduction to Google Colab"], outcome: "Participants will understand AI fundamentals, terminology, evolution, and industry applications." },
      { day: 2, title: "AI Technologies and Machine Learning Basics", topics: ["Introduction to Machine Learning","Types of Machine Learning","Supervised Learning","Unsupervised Learning","Reinforcement Learning","Introduction to Neural Networks","Data Collection and Data Preparation","Feature Engineering Basics","AI Development Lifecycle"], handsOn: ["Dataset exploration","Building a simple Machine Learning workflow","Data visualization basics"], outcome: "Participants will understand how AI models are trained using data." },
      { day: 3, title: "Deep Learning, NLP and Computer Vision", topics: ["Introduction to Deep Learning","Artificial Neural Networks","Computer Vision Fundamentals","Natural Language Processing (NLP)","Speech Recognition","Recommendation Systems","Generative AI Overview","AI Chatbots and Virtual Assistants"], handsOn: ["Image recognition demo","Sentiment analysis example","Exploring Generative AI tools"], outcome: "Participants will gain exposure to advanced AI technologies and practical business applications." },
      { day: 4, title: "AI Development Process and Industry Applications", topics: ["AI Project Lifecycle","Data Collection Techniques","Model Training","Model Evaluation","AI Deployment Basics","AI in Healthcare","AI in Banking","AI in Retail","AI in Manufacturing","AI in Education","AI in Cybersecurity"], handsOn: ["AI model demonstration","Predictive analytics example","AI-powered automation exercise"], outcome: "Participants will understand how AI projects are developed and deployed in real-world environments." },
      { day: 5, title: "Responsible AI, Mini Project and Assessment", topics: ["AI Ethics","Bias in Artificial Intelligence","Explainable AI (XAI)","Responsible AI Practices","AI Security Basics","Future of Artificial Intelligence","AI Trends","Career Roadmap","AI Certifications"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Google Colab","Jupyter Notebook","Anaconda","NumPy","Pandas","Matplotlib","Scikit-learn","OpenAI APIs (Introduction)","Hugging Face (Introduction)"],
    careers: ["AI Associate","Artificial Intelligence Analyst","Machine Learning Intern","AI Support Engineer","Junior Data Analyst","AI Research Assistant","AI Solutions Consultant (Entry Level)","Intelligent Automation Associate"],
    certifications: ["Microsoft Azure AI Fundamentals (AI-900)","Google AI Essentials","IBM AI Foundations","AWS AI Practitioner (Foundational)","Oracle AI Foundations Associate"],
    realWorldCases: { intro: "Develop a simple AI-based solution using a beginner-friendly dataset to:", bullets: ["AI-powered Chatbots","Fraud Detection","Personalized Recommendations","Virtual Assistants","Image Recognition","Predictive Maintenance","Medical Diagnosis Support","Smart Manufacturing","Customer Service Automation","Intelligent Search Systems","Prepare the data","Train a basic model","Evaluate the model","Present the results"] },
    faqs: [
      { question: "Is programming experience required?", answer: "No. This course is designed for beginners, though basic computer knowledge is helpful." },
      { question: "Will there be practical sessions?", answer: "Yes. Each day includes demonstrations and hands-on exercises." },
      { question: "What tools will be used?", answer: "Google Colab, Python, Jupyter Notebook, and introductory AI libraries." },
      { question: "Is this course suitable for students and working professionals?", answer: "Yes. It is ideal for students, fresh graduates, IT professionals, and anyone interested in starting a career in AI." },
      { question: "Will I receive a certificate?", answer: "Yes, participants can receive a course completion certificate based on the training provider's certification policy." }
    ]
  },
  "Artificial Intelligence - Governance": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Machine Learning, data governance, risk management, and enterprise IT systems.",
    overview: "The Artificial Intelligence – Governance course is designed for AI leaders, compliance officers, solution architects, data scientists, risk managers, and technology professionals responsible for governing AI systems in enterprise environments. The course covers AI governance frameworks, responsible AI, regulatory compliance, risk management, model governance, data governance, security, ethics, and organizational policies. Participants will learn how to establish governance structures that ensure AI systems are secure, transparent, compliant, and aligned with business objectives.",
    objectives: ["Understand AI governance principles and frameworks.","Develop AI governance policies and operating models.","Implement responsible AI and ethical AI practices.","Manage AI risks, compliance, and regulatory requirements.","Govern AI models throughout their lifecycle.","Establish enterprise AI controls and monitoring processes.","Build trustworthy, transparent, and accountable AI systems."],
    days: [
      { day: 1, title: "AI Governance Fundamentals", topics: ["Introduction to AI Governance","AI Governance Frameworks","Responsible AI Principles","AI Lifecycle Governance","Roles & Responsibilities","AI Policy Development","Governance Best Practices"], handsOn: ["Assessing AI governance maturity","Developing governance policies","Creating governance checklists"], outcome: "Understand the foundations of AI governance and establish effective governance frameworks for enterprise AI initiatives." },
      { day: 2, title: "Data Governance, Ethics & Compliance", topics: ["Data Governance Principles","Data Privacy & Protection","AI Ethics","Bias & Fairness","Explainable AI (XAI)","Regulatory Compliance","Responsible Data Management"], handsOn: ["Performing ethical AI assessments","Evaluating data governance controls","Identifying compliance requirements"], outcome: "Develop governance strategies that ensure ethical, transparent, and compliant AI systems." },
      { day: 3, title: "Model Governance & Risk Management", topics: ["AI Model Governance","Model Validation","Model Version Control","Risk Identification","Risk Assessment","AI Audit Frameworks","Third-Party AI Risk Management"], handsOn: ["Reviewing AI models for governance","Conducting AI risk assessments","Preparing AI audit documentation"], outcome: "Manage AI models effectively while minimizing operational, legal, and regulatory risks." },
      { day: 4, title: "Enterprise Governance & Operational Controls", topics: ["AI Governance Operating Model","Security Governance","Identity & Access Management","Monitoring & Reporting","Incident Response","Governance Automation","Continuous Compliance"], handsOn: ["Designing governance workflows","Implementing monitoring controls","Preparing governance dashboards"], outcome: "Implement operational governance processes that ensure continuous compliance and secure AI operations." },
      { day: 5, title: "Enterprise AI Governance Project & Assessment", topics: ["End-to-End AI Governance Strategy","AI Governance Documentation","Executive Reporting","Future AI Regulations","AI Governance Maturity Models","Career Roadmap","Certification Guidance"], handsOn: [], outcome: "" }
    ],
    tools: ["Python (Overview)","Microsoft Purview","Azure AI Services","AWS AI Services","Google Cloud Vertex AI","MLflow","Power BI","Microsoft Excel","Git & GitHub","Governance & Risk Management Frameworks"],
    careers: ["AI Governance Specialist","AI Risk & Compliance Manager","Responsible AI Consultant","AI Policy Advisor","Enterprise AI Governance Lead","AI Program Manager","Data Governance Manager","AI Compliance Consultant"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Microsoft Certified: Security, Compliance, and Identity Fundamentals (SC-900)","AWS Certified AI Practitioner","Google Professional Machine Learning Engineer","Certified Information Systems Auditor (CISA) (Recommended)"],
    realWorldCases: { intro: "Develop a comprehensive AI governance framework that includes:", bullets: ["AI governance policies","Data governance strategy","Risk management plan","Compliance and security controls","Executive governance presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "AI leaders, compliance officers, governance professionals, risk managers, data scientists, solution architects, and enterprise technology teams responsible for AI governance." },
      { question: "What governance topics are covered?", answer: "The course covers AI governance frameworks, responsible AI, ethics, data governance, model governance, compliance, security, risk management, monitoring, and enterprise governance strategies." },
      { question: "Are practical governance exercises included?", answer: "Yes. Every training day includes governance assessments, policy development, risk analysis, compliance reviews, and a final enterprise governance project." },
      { question: "Which tools and platforms are covered?", answer: "Participants will work with Microsoft Purview, Azure AI Services, AWS AI Services, Google Cloud Vertex AI, MLflow, Power BI, Git & GitHub, and governance management frameworks." },
      { question: "What skills will I gain?", answer: "You will learn to establish AI governance policies, manage AI risks, ensure regulatory compliance, implement responsible AI practices, govern AI models, and build secure, transparent, and trustworthy enterprise AI systems." }
    ]
  },
  "Artificial Intelligence - Hands-on Labs": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Python programming, Machine Learning concepts, and cloud computing fundamentals.",
    overview: "The Artificial Intelligence – Hands-on Labs course is a practical, project-based training program designed to help learners apply AI concepts in real-world scenarios. Instead of focusing primarily on theory, this course emphasizes coding, experimentation, model building, deployment, debugging, and optimization through guided laboratory sessions. Participants will build AI applications, train machine learning models, integrate Generative AI APIs, and deploy production-ready solutions while gaining confidence through continuous hands-on practice.",
    objectives: ["Set up AI development environments and tools.","Build, train, evaluate, and deploy AI models.","Work with Generative AI APIs and Large Language Models (LLMs).","Perform data preprocessing and feature engineering.","Deploy AI applications using cloud platforms and containers.","Monitor, debug, and optimize AI solutions.","Complete real-world AI projects with confidence."],
    days: [
      { day: 1, title: "AI Development Environment & Data Labs", topics: ["AI Development Environment Setup","Python for AI","Jupyter Notebook","Dataset Collection","Data Cleaning & Preprocessing","Exploratory Data Analysis (EDA)","Feature Engineering Basics"], handsOn: ["Installing AI development tools","Importing and cleaning datasets","Performing exploratory data analysis","Preparing data for machine learning"], outcome: "Develop the skills to prepare datasets and configure a professional AI development environment." },
      { day: 2, title: "Machine Learning Model Labs", topics: ["Supervised Learning","Classification Models","Regression Models","Model Evaluation","Hyperparameter Tuning","Model Saving & Versioning","Performance Metrics"], handsOn: ["Building classification models","Training regression models","Evaluating model performance","Saving trained models"], outcome: "Gain practical experience in building and evaluating machine learning models using real datasets." },
      { day: 3, title: "Deep Learning & Generative AI Labs", topics: ["Neural Networks","Deep Learning Basics","Large Language Models (LLMs)","Prompt Engineering","Generative AI APIs","AI Chatbots","AI Assistants"], handsOn: ["Building a simple neural network","Working with LLM APIs","Creating an AI chatbot","Developing a prompt-based assistant"], outcome: "Apply modern AI technologies to develop intelligent applications powered by deep learning and Generative AI." },
      { day: 4, title: "Deployment & Integration Labs", topics: ["Model Deployment","FastAPI Integration","REST APIs","Docker Containers","Cloud AI Deployment","Monitoring AI Applications","Security Best Practices"], handsOn: ["Deploying AI models as APIs","Containerizing AI applications","Integrating AI services with web applications","Monitoring deployed models"], outcome: "Learn how to deploy AI solutions into production-ready environments with secure integrations." },
      { day: 5, title: "Capstone Lab Project", topics: ["End-to-End AI Application Development","Testing & Debugging","Performance Optimization","Documentation","Project Presentation","Career Guidance","Certification Preparation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Jupyter Notebook","Scikit-learn","TensorFlow","PyTorch (Introduction)","OpenAI APIs","Hugging Face","FastAPI","Docker","Git & GitHub","Azure AI Services"],
    careers: ["AI Engineer","Machine Learning Engineer","AI Application Developer","Generative AI Developer","Data Scientist","MLOps Associate","AI Solutions Engineer","AI Research Assistant"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified AI Practitioner","Google Professional Machine Learning Engineer","TensorFlow Developer Certificate","IBM AI Engineering Professional Certificate"],
    realWorldCases: { intro: "Develop a complete AI application that includes:", bullets: ["Data preprocessing","Machine learning or Generative AI implementation","API integration","Deployment using Docker","Performance evaluation and project presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "Students, developers, AI enthusiasts, machine learning engineers, and professionals who want extensive practical experience in Artificial Intelligence." },
      { question: "Is this course mostly practical?", answer: "Yes. The course is heavily focused on hands-on labs, coding exercises, real-world projects, and guided implementation with minimal theory." },
      { question: "Which tools will I use during the labs?", answer: "Participants will work with Python, Jupyter Notebook, Scikit-learn, TensorFlow, Hugging Face, OpenAI APIs, FastAPI, Docker, GitHub, and Azure AI Services." },
      { question: "Will I build real AI projects?", answer: "Yes. Throughout the course, you will build machine learning models, AI chatbots, API-based AI applications, and a complete end-to-end capstone project." },
      { question: "What skills will I gain?", answer: "You will gain practical expertise in AI development, model training, Generative AI integration, deployment, debugging, optimization, and building production-ready AI applications using industry-standard tools." }
    ]
  },
  "Artificial Intelligence - Implementation": {
    level: "Intermediate",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Machine Learning, Python, and software development concepts.",
    overview: "The Artificial Intelligence – Implementation course is designed for developers, AI engineers, solution architects, and IT professionals who want to successfully implement AI solutions in real-world business environments. Participants will learn how to transform AI concepts into production-ready applications by implementing machine learning models, integrating AI services, managing deployments, ensuring security, and following industry best practices. Through hands-on exercises and practical projects, learners will gain the skills required to implement scalable and reliable AI solutions.",
    objectives: ["Understand the AI implementation lifecycle.","Implement AI models in real-world applications.","Integrate AI services with enterprise systems.","Deploy AI applications securely and efficiently.","Monitor, maintain, and optimize AI implementations.","Follow AI governance and implementation best practices.","Deliver production-ready AI solutions."],
    days: [
      { day: 1, title: "AI Implementation Fundamentals", topics: ["Introduction to AI Implementation","AI Project Planning","Business Requirement Analysis","AI Solution Design","Development Environment Setup","AI Implementation Lifecycle","Implementation Best Practices"], handsOn: ["Setting up the AI development environment","Planning an AI implementation project","Preparing datasets and project structure"], outcome: "Understand the complete AI implementation process from planning to deployment." },
      { day: 2, title: "Model Development & Integration", topics: ["AI Model Development","Data Preparation","Model Training & Validation","AI API Integration","Database Connectivity","Enterprise Application Integration","Error Handling"], handsOn: ["Training an AI model","Integrating AI APIs","Connecting AI applications with databases"], outcome: "Implement AI models and integrate them into enterprise applications." },
      { day: 3, title: "Deployment & Security", topics: ["AI Model Deployment","Cloud Deployment Options","Containerization with Docker","AI Security Best Practices","Authentication & Authorization","Performance Optimization","Version Control"], handsOn: ["Deploying an AI application","Securing AI APIs","Managing application versions"], outcome: "Deploy secure and scalable AI applications using modern deployment techniques." },
      { day: 4, title: "Testing, Monitoring & Maintenance", topics: ["AI Application Testing","Performance Monitoring","Logging & Debugging","Model Updates","Troubleshooting","Maintenance Strategies","Compliance & Governance"], handsOn: ["Testing AI applications","Monitoring system performance","Resolving implementation issues"], outcome: "Maintain reliable AI applications through continuous monitoring and optimization." },
      { day: 5, title: "Enterprise AI Project & Assessment", topics: ["End-to-End AI Implementation","Deployment Validation","Documentation","Production Readiness Checklist","Future AI Trends","Career Roadmap","Certification Guidance"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Scikit-learn","TensorFlow","FastAPI","Docker","Git & GitHub","Azure AI Services","AWS AI Services","Google Cloud Vertex AI","Jupyter Notebook"],
    careers: ["AI Implementation Engineer","AI Developer","Machine Learning Engineer","AI Solutions Engineer","MLOps Associate","AI Deployment Engineer","AI Consultant","Enterprise AI Engineer"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified AI Practitioner","Google Professional Machine Learning Engineer","IBM AI Engineering Professional Certificate"],
    realWorldCases: { intro: "Implement a complete AI solution by:", bullets: ["Preparing and training a model","Integrating AI with an application","Deploying the solution","Testing performance and security","Presenting the implementation workflow"] },
    faqs: [
      { question: "Who should attend this course?", answer: "Developers, AI engineers, software professionals, and IT teams responsible for implementing AI solutions." },
      { question: "Are practical implementation projects included?", answer: "Yes. Every day includes hands-on implementation exercises, and the course concludes with an end-to-end AI implementation project." },
      { question: "Which deployment platforms are covered?", answer: "The course introduces deployment concepts for Azure AI, AWS AI Services, and Google Cloud Vertex AI." },
      { question: "What tools will I use during the training?", answer: "Participants will work with Python, TensorFlow, Scikit-learn, Docker, FastAPI, Git, and cloud AI platforms." },
      { question: "What skills will I gain?", answer: "You will learn AI implementation planning, model deployment, enterprise integration, security, monitoring, testing, and production-ready AI solution development." }
    ]
  },
  "Artificial Intelligence - Infrastructure": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, cloud computing, networking, Linux administration, virtualization, containers, and machine learning fundamentals.",
    overview: "The Artificial Intelligence – Infrastructure course is designed for AI infrastructure engineers, cloud architects, MLOps professionals, DevOps engineers, system administrators, and enterprise IT professionals responsible for building and managing AI platforms. The course covers AI infrastructure architecture, cloud environments, GPU computing, storage systems, networking, container orchestration, infrastructure automation, security, monitoring, and high-availability deployments. Participants will gain practical experience in designing and operating scalable, secure, and production-ready AI infrastructure for enterprise applications.",
    objectives: ["Design enterprise AI infrastructure architectures.","Configure compute, storage, and networking resources for AI workloads.","Deploy AI infrastructure using cloud and on-premises platforms.","Manage containerized AI environments with Kubernetes.","Implement Infrastructure as Code (IaC) and automation.","Secure, monitor, and optimize AI infrastructure.","Build highly available and scalable AI platforms."],
    days: [
      { day: 1, title: "AI Infrastructure Fundamentals", topics: ["Introduction to AI Infrastructure","AI Infrastructure Architecture","Compute Resources (CPU, GPU, TPU)","Storage Systems","Networking Fundamentals","Virtualization","Infrastructure Planning"], handsOn: ["Setting up AI infrastructure environments","Configuring compute and storage resources","Planning enterprise AI architecture"], outcome: "Understand the core components required to build scalable AI infrastructure." },
      { day: 2, title: "Cloud Infrastructure & Container Platforms", topics: ["Cloud AI Infrastructure","Microsoft Azure AI Infrastructure","AWS AI Infrastructure","Google Cloud AI Infrastructure","Docker Containers","Kubernetes Clusters","Resource Management"], handsOn: ["Deploying AI workloads on cloud platforms","Containerizing AI applications","Managing Kubernetes clusters"], outcome: "Deploy AI infrastructure using cloud-native technologies and container orchestration." },
      { day: 3, title: "Automation, MLOps & Infrastructure Management", topics: ["Infrastructure as Code (IaC)","Terraform","Ansible Fundamentals","CI/CD Integration","MLOps Infrastructure","Resource Scaling","Configuration Management"], handsOn: ["Automating infrastructure provisioning","Managing AI deployment pipelines","Scaling infrastructure resources"], outcome: "Automate AI infrastructure deployment and management using modern DevOps and MLOps practices." },
      { day: 4, title: "Security, Monitoring & High Availability", topics: ["Infrastructure Security","Identity & Access Management (IAM)","Network Security","Monitoring & Logging","Performance Optimization","Backup & Disaster Recovery","High Availability & Load Balancing"], handsOn: ["Implementing infrastructure security controls","Configuring monitoring dashboards","Optimizing infrastructure performance"], outcome: "Build secure, resilient, and high-performing AI infrastructure suitable for enterprise production environments." },
      { day: 5, title: "Enterprise AI Infrastructure Project & Assessment", topics: ["End-to-End Infrastructure Design","Enterprise AI Platform Architecture","Infrastructure Documentation","Capacity Planning","Future Infrastructure Trends","Career Roadmap","Certification Guidance"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Linux","Docker","Kubernetes","Terraform","Ansible","Git & GitHub","Microsoft Azure","Amazon Web Services (AWS)","Google Cloud Platform (GCP)","Prometheus","Grafana"],
    careers: ["AI Infrastructure Engineer","Cloud AI Architect","MLOps Engineer","DevOps Engineer","AI Platform Engineer","Cloud Infrastructure Engineer","Site Reliability Engineer (SRE)","Enterprise AI Solutions Architect"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Microsoft Azure Administrator Associate (AZ-104)","AWS Certified Solutions Architect – Associate","Google Professional Cloud Architect","Certified Kubernetes Administrator (CKA)"],
    realWorldCases: { intro: "Design and deploy a complete AI infrastructure solution that includes:", bullets: ["Cloud resource provisioning","Kubernetes cluster deployment","Infrastructure automation","Security implementation","Monitoring and performance optimization"] },
    faqs: [
      { question: "Who should attend this course?", answer: "AI infrastructure engineers, cloud architects, MLOps professionals, DevOps engineers, system administrators, and IT professionals responsible for deploying and managing AI platforms." },
      { question: "Does this course cover both cloud and on-premises AI infrastructure?", answer: "Yes. The course includes enterprise AI infrastructure design for cloud, hybrid, and on-premises environments with a focus on scalability and reliability." },
      { question: "Are practical labs included?", answer: "Yes. Every training day includes hands-on labs covering infrastructure provisioning, Kubernetes deployment, automation, security, monitoring, and enterprise AI platform implementation." },
      { question: "Which tools and platforms are covered?", answer: "Participants will work with Linux, Docker, Kubernetes, Terraform, Ansible, Git & GitHub, Microsoft Azure, AWS, Google Cloud Platform (GCP), Prometheus, and Grafana." },
      { question: "What skills will I gain?", answer: "You will learn AI infrastructure architecture, cloud deployment, infrastructure automation, container orchestration, monitoring, security, disaster recovery, scalability, and enterprise infrastructure management using industry-standard tools and best practices." }
    ]
  },
  "Artificial Intelligence - Integration": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, APIs, cloud platforms, Python, and software integration concepts.",
    overview: "The Artificial Intelligence – Integration course focuses on integrating AI capabilities into enterprise applications, business workflows, cloud platforms, and third-party systems. Participants will learn how to connect AI models with APIs, databases, web applications, ERP/CRM platforms, and cloud services while ensuring scalability, security, and high performance. Through hands-on labs and real-world integration scenarios, learners will gain practical experience in building AI-powered enterprise solutions.",
    objectives: ["Understand AI integration architectures and workflows.","Integrate AI models with web, mobile, and enterprise applications.","Build AI-powered REST APIs and microservices.","Connect AI solutions with cloud platforms and databases.","Implement secure and scalable AI integrations.","Monitor and optimize integrated AI applications.","Deploy AI solutions in production environments."],
    days: [
      { day: 1, title: "AI Integration Fundamentals", topics: ["Introduction to AI Integration","Enterprise AI Architecture","AI Integration Patterns","APIs and Web Services","AI Application Workflows","Cloud Integration Basics","Integration Best Practices"], handsOn: ["Setting up an AI integration environment","Connecting AI services to sample applications","Exploring API endpoints"], outcome: "Understand the fundamentals of integrating AI solutions into enterprise applications." },
      { day: 2, title: "API & Application Integration", topics: ["REST APIs for AI","AI SDKs and Libraries","Database Connectivity","Web & Mobile Integration","Authentication & Authorization","Event-Driven Integration","API Testing"], handsOn: ["Building an AI-powered REST API","Integrating AI with a web application","Testing API responses"], outcome: "Develop secure AI APIs and connect AI models with business applications." },
      { day: 3, title: "Cloud & Enterprise Integration", topics: ["Microsoft Azure AI Services","AWS AI Services","Google Cloud AI","ERP & CRM Integration","AI Workflow Automation","Message Queues","Data Synchronization"], handsOn: ["Integrating cloud AI services","Connecting AI with enterprise platforms","Automating AI workflows"], outcome: "Integrate AI solutions with cloud platforms and enterprise business systems." },
      { day: 4, title: "Security, Monitoring & Performance", topics: ["AI Integration Security","API Security","Identity & Access Management","Logging & Monitoring","Performance Optimization","Error Handling","Scalability Best Practices"], handsOn: ["Securing AI APIs","Monitoring integrated AI services","Optimizing application performance"], outcome: "Implement secure, reliable, and scalable AI integrations for production environments." },
      { day: 5, title: "Enterprise Integration Project & Deployment", topics: ["End-to-End AI Integration Strategy","Deployment Planning","Integration Testing","Troubleshooting Techniques","Maintenance & Updates","Future AI Integration Trends","Certification & Career Guidance"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","FastAPI","Flask","REST APIs","OpenAI APIs","Azure AI Services","AWS AI Services","Google Cloud AI","Docker","Git & GitHub","Postman"],
    careers: ["AI Integration Engineer","AI Application Developer","AI Solutions Engineer","Cloud AI Engineer","API Developer","Enterprise Integration Specialist","AI Platform Engineer","Technical Consultant"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified AI Practitioner","Google Professional Machine Learning Engineer","Microsoft Azure Developer Associate (AZ-204)"],
    realWorldCases: { intro: "Design and implement an enterprise AI integration solution by:", bullets: ["Connecting an AI model with a business application","Developing secure REST APIs","Integrating cloud AI services","Implementing monitoring and logging","Deploying the integrated solution"] },
    faqs: [
      { question: "Who should attend this course?", answer: "Developers, AI engineers, cloud professionals, API developers, and IT professionals involved in enterprise application integration." },
      { question: "Will this course cover API development?", answer: "Yes. Participants will learn to develop and secure REST APIs for integrating AI models with web, mobile, and enterprise applications." },
      { question: "Are hands-on labs included?", answer: "Yes. Every training day includes practical integration exercises, API development, cloud connectivity, and a final enterprise integration project." },
      { question: "Which platforms are covered?", answer: "The course includes Microsoft Azure AI, AWS AI Services, Google Cloud AI, OpenAI APIs, and enterprise integration concepts." },
      { question: "What skills will I gain?", answer: "You will learn AI integration architecture, API development, cloud integration, enterprise connectivity, security, deployment, and monitoring of AI-powered applications." }
    ]
  },
  "Artificial Intelligence - Migration": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, cloud computing, data migration, APIs, and enterprise IT infrastructure.",
    overview: "The Artificial Intelligence – Migration course is designed for AI engineers, cloud architects, MLOps professionals, and IT teams responsible for migrating AI applications, machine learning models, datasets, and infrastructure across on-premises, cloud, or hybrid environments. Participants will learn migration planning, data and model migration, cloud adoption strategies, deployment automation, security, validation, and post-migration optimization through practical labs and enterprise case studies.",
    objectives: ["Understand AI migration strategies and methodologies.","Plan and execute AI application and model migrations.","Migrate datasets, pipelines, and AI workloads securely.","Deploy AI solutions across cloud and hybrid environments.","Validate and optimize migrated AI systems.","Minimize downtime and migration risks.","Apply enterprise migration best practices."],
    days: [
      { day: 1, title: "AI Migration Planning", topics: ["Introduction to AI Migration","Migration Assessment & Readiness","AI Infrastructure Analysis","Cloud vs On-Premises Migration","Migration Strategies","Risk Assessment","Migration Best Practices"], handsOn: ["Assessing an AI environment","Preparing a migration roadmap","Identifying migration dependencies"], outcome: "Understand migration planning, assessment techniques, and strategy selection for AI environments." },
      { day: 2, title: "Data & Model Migration", topics: ["Dataset Migration","AI Model Migration","Feature Store Migration","Data Validation","Model Versioning","Backup & Recovery","Migration Security"], handsOn: ["Migrating datasets","Transferring AI models","Validating migrated data and models"], outcome: "Learn secure migration of AI datasets, models, and supporting resources." },
      { day: 3, title: "Cloud & Infrastructure Migration", topics: ["Cloud AI Migration","Hybrid AI Environments","Container Migration","Kubernetes Workloads","Infrastructure as Code (IaC)","Deployment Automation","AI Pipeline Migration"], handsOn: ["Migrating AI workloads to the cloud","Containerizing AI applications","Automating deployment pipelines"], outcome: "Successfully migrate AI infrastructure and workloads to cloud-native environments." },
      { day: 4, title: "Testing, Security & Optimization", topics: ["Migration Testing","Performance Validation","Security & Compliance","Identity & Access Management","Cost Optimization","Troubleshooting Migration Issues","Monitoring Post-Migration"], handsOn: ["Testing migrated AI applications","Resolving migration issues","Monitoring system performance"], outcome: "Validate, secure, and optimize AI environments after migration." },
      { day: 5, title: "Enterprise Migration Project & Best Practices", topics: ["End-to-End AI Migration Strategy","Disaster Recovery Planning","Rollback Strategies","Documentation & Governance","Future Migration Trends","Career Roadmap","Certification Guidance"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Docker","Kubernetes","MLflow","Azure AI Services","AWS AI Services","Google Cloud Vertex AI","Terraform (Introduction)","Git & GitHub","REST APIs"],
    careers: ["AI Migration Engineer","Cloud AI Engineer","MLOps Engineer","AI Infrastructure Engineer","AI Solutions Architect","Cloud Migration Consultant","Enterprise AI Consultant","DevOps Engineer (AI)"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified AI Practitioner","Google Professional Machine Learning Engineer","Microsoft Azure Solutions Architect Expert","HashiCorp Terraform Associate"],
    realWorldCases: { intro: "Plan and execute an enterprise AI migration by:", bullets: ["Assessing the existing AI environment","Migrating datasets and AI models","Deploying workloads to the cloud","Validating performance and security","Presenting the migration strategy and outcomes"] },
    faqs: [
      { question: "Who should attend this course?", answer: "AI engineers, cloud architects, MLOps professionals, DevOps engineers, and IT teams involved in migrating AI systems and workloads." },
      { question: "What migration scenarios are covered?", answer: "The course includes on-premises to cloud, cloud-to-cloud, hybrid cloud, AI model migration, dataset migration, and infrastructure migration." },
      { question: "Are hands-on migration labs included?", answer: "Yes. Every day includes practical migration exercises, validation tasks, cloud deployment, and a capstone migration project." },
      { question: "Which tools will be used?", answer: "Participants will work with Docker, Kubernetes, MLflow, Azure AI, AWS AI Services, Google Cloud Vertex AI, Terraform, Git, and REST APIs." },
      { question: "What skills will I gain?", answer: "You will learn migration planning, AI workload migration, cloud deployment, security validation, performance optimization, and enterprise AI migration best practices." }
    ]
  },
  "Artificial Intelligence - Monitoring": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Machine Learning, cloud platforms, Python, and AI deployment concepts.",
    overview: "The Artificial Intelligence – Monitoring course is designed for AI engineers, MLOps professionals, DevOps engineers, and IT administrators responsible for monitoring AI applications in production environments. Participants will learn how to track model performance, monitor data quality, detect model drift, manage system health, configure alerts, analyze logs, and ensure the reliability of enterprise AI solutions. The course combines industry best practices with hands-on labs to help learners maintain secure, scalable, and high-performing AI systems.",
    objectives: ["Understand AI monitoring frameworks and best practices.","Monitor AI models, infrastructure, and application performance.","Detect data drift, concept drift, and model degradation.","Configure logging, alerting, and performance dashboards.","Troubleshoot AI system issues and optimize performance.","Implement AI observability and governance strategies.","Maintain reliable and production-ready AI environments."],
    days: [
      { day: 1, title: "AI Monitoring Fundamentals", topics: ["Introduction to AI Monitoring","AI Lifecycle Monitoring","Key Performance Indicators (KPIs)","Model Health Monitoring","Infrastructure Monitoring","Monitoring Architecture","AI Monitoring Best Practices"], handsOn: ["Setting up monitoring dashboards","Tracking AI system health","Exploring monitoring metrics"], outcome: "Understand the importance of monitoring AI systems and measuring operational performance." },
      { day: 2, title: "Model Performance & Data Monitoring", topics: ["Model Performance Metrics","Data Quality Monitoring","Data Drift Detection","Concept Drift Analysis","Prediction Accuracy","Model Validation","Continuous Evaluation"], handsOn: ["Monitoring model predictions","Detecting data drift","Evaluating model performance over time"], outcome: "Learn to identify performance issues and maintain AI model accuracy in production." },
      { day: 3, title: "Logging, Alerts & Observability", topics: ["AI Logging Strategies","Event Monitoring","Alert Configuration","AI Observability","Dashboard Creation","Root Cause Analysis","Incident Management"], handsOn: ["Configuring alerts","Analyzing logs","Creating monitoring dashboards"], outcome: "Build observability solutions that enable proactive monitoring and faster issue resolution." },
      { day: 4, title: "Security, Governance & Optimization", topics: ["Monitoring AI Security","Compliance Monitoring","AI Governance","Resource Utilization","Performance Optimization","Capacity Planning","Monitoring Best Practices"], handsOn: ["Monitoring resource usage","Reviewing security events","Optimizing AI workloads"], outcome: "Implement secure, compliant, and efficient monitoring strategies for enterprise AI platforms." },
      { day: 5, title: "Enterprise Monitoring Project & Automation", topics: ["End-to-End AI Monitoring Strategy","Monitoring Automation","Predictive Monitoring","AI Operations (AIOps)","Troubleshooting Production Issues","Future Trends in AI Observability","Certification & Career Guidance"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","MLflow","Prometheus","Grafana","Azure Monitor","AWS CloudWatch","Google Cloud Monitoring","Docker","Kubernetes","Git & GitHub"],
    careers: ["AI Monitoring Engineer","MLOps Engineer","AI Operations Engineer","Machine Learning Platform Engineer","DevOps Engineer (AI)","Cloud AI Engineer","AI Reliability Engineer","AI Support Engineer"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified AI Practitioner","Google Professional Machine Learning Engineer","Microsoft Azure Administrator Associate (AZ-104)"],
    realWorldCases: { intro: "Design and implement a complete AI monitoring solution by:", bullets: ["Monitoring model performance","Detecting data drift","Configuring dashboards and alerts","Automating monitoring workflows","Preparing monitoring reports"] },
    faqs: [
      { question: "Who should attend this course?", answer: "AI engineers, MLOps professionals, DevOps engineers, cloud administrators, and IT professionals responsible for managing AI applications in production." },
      { question: "What monitoring topics are covered?", answer: "The course covers model monitoring, data drift detection, observability, logging, dashboards, alerting, performance optimization, governance, and AIOps." },
      { question: "Are practical labs included?", answer: "Yes. Every day includes hands-on exercises using monitoring tools, dashboards, logging systems, and real-world production scenarios." },
      { question: "Which tools will I learn?", answer: "Participants will work with MLflow, Prometheus, Grafana, Azure Monitor, AWS CloudWatch, Google Cloud Monitoring, Docker, and Kubernetes." },
      { question: "What skills will I gain?", answer: "You will learn to monitor AI models, detect performance issues, automate monitoring processes, troubleshoot production environments, and ensure the reliability of enterprise AI systems." }
    ]
  },
  "Artificial Intelligence - Natural Language Processing": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Machine Learning, Python programming, data structures, and statistics.",
    overview: "The Artificial Intelligence – Natural Language Processing (NLP) course is designed for AI developers, machine learning engineers, data scientists, software engineers, researchers, and business professionals who want to build intelligent applications capable of understanding and generating human language. The course covers text preprocessing, linguistic analysis, machine learning for NLP, transformer models, Large Language Models (LLMs), sentiment analysis, text classification, named entity recognition, machine translation, chatbots, and enterprise NLP deployment. Through practical labs and real-world projects, participants will gain hands-on experience in developing production-ready NLP solutions.",
    objectives: ["Understand the fundamentals of Natural Language Processing.","Process, analyze, and transform textual data efficiently.","Build NLP applications using machine learning and deep learning techniques.","Implement transformer-based models and Large Language Models (LLMs).","Develop chatbots, virtual assistants, and text analytics solutions.","Deploy and monitor NLP models in production environments.","Apply NLP best practices to solve real-world business challenges."],
    days: [
      { day: 1, title: "NLP Fundamentals", topics: ["Introduction to Natural Language Processing","Text Preprocessing","Tokenization","Stemming & Lemmatization","Stop Words & Text Cleaning","Feature Engineering","NLP Workflow"], handsOn: ["Cleaning text datasets","Tokenizing and preprocessing text","Creating NLP pipelines"], outcome: "Understand NLP fundamentals and prepare textual data for AI model development." },
      { day: 2, title: "Machine Learning for NLP", topics: ["Text Vectorization","Bag of Words","TF-IDF","Word Embeddings","Text Classification","Sentiment Analysis","Named Entity Recognition (NER)"], handsOn: ["Building sentiment analysis models","Performing text classification","Extracting named entities"], outcome: "Develop intelligent NLP models capable of understanding and classifying textual information." },
      { day: 3, title: "Deep Learning & Large Language Models", topics: ["Recurrent Neural Networks (RNNs)","LSTM & GRU Networks","Attention Mechanisms","Transformers","BERT","GPT Models","Prompt Engineering Fundamentals"], handsOn: ["Fine-tuning transformer models","Building LLM-powered applications","Implementing prompt engineering techniques"], outcome: "Create advanced NLP applications using transformer architectures and Large Language Models." },
      { day: 4, title: "Enterprise NLP Applications", topics: ["Chatbots & Virtual Assistants","Machine Translation","Text Summarization","Question Answering Systems","Speech-to-Text Overview","NLP Model Deployment","Monitoring & Optimization"], handsOn: ["Developing AI chatbots","Deploying NLP APIs","Monitoring model performance"], outcome: "Build enterprise-grade NLP applications for customer support, automation, and business intelligence." },
      { day: 5, title: "Enterprise NLP Project & Assessment", topics: ["End-to-End NLP Solution Design","Industry Case Studies","Documentation Standards","Future Trends in NLP & Generative AI","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","NLTK","spaCy","Hugging Face Transformers","TensorFlow","PyTorch","Scikit-learn","OpenAI API","LangChain","FastAPI","Jupyter Notebook","Git & GitHub"],
    careers: ["NLP Engineer","AI Engineer","Machine Learning Engineer","Generative AI Engineer","Data Scientist","Conversational AI Developer","AI Solutions Architect","AI Research Scientist"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Google Professional Machine Learning Engineer","AWS Certified AI Practitioner","TensorFlow Developer Certificate","IBM AI Engineering Professional Certificate"],
    realWorldCases: { intro: "Develop a complete NLP solution that includes:", bullets: ["Industry Case Studies","Text preprocessing","NLP model development","Transformer or LLM integration","API deployment","Performance evaluation and documentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "AI developers, machine learning engineers, software developers, data scientists, researchers, business analysts, and professionals interested in building intelligent language-based AI applications." },
      { question: "Is Python programming required?", answer: "Yes. Basic Python programming and familiarity with machine learning concepts are recommended for completing the practical labs and projects." },
      { question: "Are practical NLP projects included?", answer: "Yes. Every training day includes hands-on exercises covering text preprocessing, sentiment analysis, transformer models, chatbots, LLM integration, deployment, and a comprehensive enterprise NLP capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Participants will work with Python, NLTK, spaCy, Hugging Face Transformers, TensorFlow, PyTorch, Scikit-learn, OpenAI API, LangChain, FastAPI, Jupyter Notebook, and Git & GitHub." },
      { question: "What skills will I gain?", answer: "You will learn text preprocessing, text classification, sentiment analysis, named entity recognition, transformer models, Large Language Models (LLMs), chatbot development, API deployment, performance optimization, and enterprise NLP application development using modern AI frameworks." }
    ]
  },
  "Artificial Intelligence - Neural Networks": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Machine Learning, Python programming, linear algebra, probability, and statistics.",
    overview: "The Artificial Intelligence – Neural Networks course is designed for AI developers, machine learning engineers, data scientists, software professionals, and researchers who want to master artificial neural networks for solving complex real-world problems. The course covers neural network fundamentals, network architectures, supervised and unsupervised learning, deep neural networks, optimization algorithms, training techniques, performance evaluation, and deployment. Through hands-on labs and enterprise projects, participants will gain practical experience in building intelligent systems using modern neural network frameworks.",
    objectives: ["Understand the architecture and working principles of artificial neural networks.","Build and train neural network models using industry-standard frameworks.","Apply different neural network architectures to real-world AI problems.","Optimize training using advanced algorithms and regularization techniques.","Evaluate and improve neural network performance.","Deploy neural network models for production environments.","Implement best practices for scalable AI solutions."],
    days: [
      { day: 1, title: "Neural Network Fundamentals", topics: ["Introduction to Neural Networks","Biological vs Artificial Neurons","Perceptrons","Activation Functions","Feedforward Neural Networks","Loss Functions","Training Workflow"], handsOn: ["Building a simple neural network","Implementing activation functions","Training basic models"], outcome: "Understand the foundations of neural networks and create basic feedforward models." },
      { day: 2, title: "Training & Optimization Techniques", topics: ["Backpropagation","Gradient Descent Algorithms","Weight Initialization","Batch Processing","Regularization Techniques","Hyperparameter Tuning","Performance Evaluation"], handsOn: ["Training neural networks","Optimizing learning parameters","Evaluating model accuracy"], outcome: "Develop efficient neural network models using modern optimization and training techniques." },
      { day: 3, title: "Advanced Neural Network Architectures", topics: ["Deep Neural Networks (DNNs)","Convolutional Neural Networks (CNNs)","Recurrent Neural Networks (RNNs)","LSTM & GRU","Autoencoders","Transformer Fundamentals","Transfer Learning"], handsOn: ["Building CNN models","Developing sequence prediction models","Applying transfer learning"], outcome: "Implement advanced neural network architectures for image, text, and sequential data processing." },
      { day: 4, title: "Deployment & Model Management", topics: ["Model Evaluation","TensorFlow Serving","ONNX Runtime","API Integration","Performance Optimization","Monitoring Neural Networks","MLOps Basics"], handsOn: ["Deploying trained models","Monitoring prediction performance","Optimizing inference speed"], outcome: "Deploy production-ready neural network models with efficient monitoring and optimization strategies." },
      { day: 5, title: "Enterprise Neural Network Project & Assessment", topics: ["End-to-End Neural Network Development","Enterprise AI Case Studies","Model Documentation","Emerging AI Trends","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","TensorFlow","Keras","PyTorch","Scikit-learn","Jupyter Notebook","OpenCV","ONNX Runtime","Git & GitHub","Google Colab","NVIDIA CUDA (Overview)"],
    careers: ["Neural Network Engineer","Deep Learning Engineer","Machine Learning Engineer","AI Research Scientist","Computer Vision Engineer","NLP Engineer","AI Developer","Data Scientist"],
    certifications: ["TensorFlow Developer Certificate","Microsoft Azure AI Engineer Associate (AI-102)","Google Professional Machine Learning Engineer","AWS Certified AI Practitioner","IBM AI Engineering Professional Certificate"],
    realWorldCases: { intro: "Develop a complete neural network solution that includes:", bullets: ["Enterprise AI Case Studies","Data preprocessing","Neural network architecture design","Model training and optimization","Deployment","Performance evaluation and documentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "AI developers, machine learning engineers, data scientists, software professionals, researchers, and anyone interested in mastering neural network technologies." },
      { question: "Is prior programming experience required?", answer: "Yes. Basic Python programming and familiarity with machine learning concepts are recommended for the practical coding exercises." },
      { question: "Are practical labs included?", answer: "Yes. Every training day includes hands-on exercises covering neural network design, model training, optimization, deployment, and a comprehensive enterprise neural network capstone project." },
      { question: "Which tools and frameworks are covered?", answer: "Participants will work with Python, TensorFlow, Keras, PyTorch, Scikit-learn, OpenCV, ONNX Runtime, Jupyter Notebook, Google Colab, Git & GitHub, and NVIDIA CUDA." },
      { question: "What skills will I gain?", answer: "You will learn neural network architecture design, deep learning techniques, model optimization, CNNs, RNNs, transformer fundamentals, deployment, performance monitoring, and enterprise AI application development using modern AI frameworks." }
    ]
  },
  "Artificial Intelligence - Operations": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Machine Learning, Python programming, cloud platforms, and AI deployment concepts.",
    overview: "The Artificial Intelligence – Operations course is designed for AI engineers, MLOps professionals, DevOps engineers, IT administrators, and operations teams responsible for managing AI systems in production. The course covers AI operational workflows, model lifecycle management, infrastructure management, monitoring, incident response, automation, governance, and continuous improvement. Participants will gain hands-on experience in operating, maintaining, and optimizing enterprise AI environments for reliability, scalability, and business continuity.",
    objectives: ["Understand AI operations and MLOps workflows.","Manage AI models throughout their production lifecycle.","Monitor AI applications and infrastructure.","Automate operational tasks and deployment processes.","Handle incidents, troubleshooting, and disaster recovery.","Implement AI governance, compliance, and operational security.","Optimize AI environments for performance and scalability."],
    days: [
      { day: 1, title: "AI Operations Fundamentals", topics: ["Introduction to AI Operations","AI Lifecycle Management","MLOps Fundamentals","AI Infrastructure Components","Production AI Workflows","Operational Best Practices","AI Service Management"], handsOn: ["Setting up an AI operations environment","Managing AI workflows","Reviewing operational dashboards"], outcome: "Understand the operational processes required to manage AI systems effectively in production." },
      { day: 2, title: "Model Deployment & Infrastructure Management", topics: ["AI Model Deployment","Infrastructure Provisioning","Containerization with Docker","Kubernetes Basics","Cloud AI Operations","Version Management","Configuration Management"], handsOn: ["Deploying AI models","Managing containers","Configuring cloud infrastructure"], outcome: "Deploy and manage AI applications using modern infrastructure and cloud technologies." },
      { day: 3, title: "Monitoring, Incident Management & Automation", topics: ["AI Performance Monitoring","Logging & Observability","Alert Management","Incident Response","Root Cause Analysis","Workflow Automation","AI Operations Dashboards"], handsOn: ["Configuring monitoring tools","Investigating operational incidents","Automating operational workflows"], outcome: "Monitor AI systems, resolve operational issues, and automate routine maintenance tasks." },
      { day: 4, title: "Security, Governance & Optimization", topics: ["AI Operations Security","Identity & Access Management","Compliance & Governance","Backup & Disaster Recovery","Resource Optimization","Cost Management","High Availability Strategies"], handsOn: ["Implementing operational security","Configuring backup strategies","Optimizing AI resource utilization"], outcome: "Operate secure, compliant, and cost-effective AI environments with high availability." },
      { day: 5, title: "Enterprise AI Operations Project & Assessment", topics: ["End-to-End AI Operations Management","Production Readiness Review","Operational Documentation","AI Service Level Management","Future Trends in AIOps","Career Roadmap","Certification Guidance"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","MLflow","Docker","Kubernetes","Git & GitHub","Azure AI Services","AWS AI Services","Google Cloud Vertex AI","Prometheus","Grafana","Azure Monitor","REST APIs"],
    careers: ["AI Operations Engineer","MLOps Engineer","AI Platform Engineer","DevOps Engineer (AI)","Cloud AI Operations Specialist","AI Infrastructure Engineer","AI Support Engineer","Site Reliability Engineer (AI)"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified AI Practitioner","Google Professional Machine Learning Engineer","Microsoft Azure Administrator Associate (AZ-104)","Certified Kubernetes Application Developer (CKAD)"],
    realWorldCases: { intro: "Design and manage a production AI operations environment by:", bullets: ["Deploying AI models","Monitoring infrastructure and model performance","Automating operational workflows","Managing incidents and recovery","Presenting an enterprise AI operations strategy"] },
    faqs: [
      { question: "Who should attend this course?", answer: "AI engineers, MLOps professionals, DevOps engineers, cloud administrators, IT operations teams, and infrastructure engineers managing AI systems." },
      { question: "Is this course focused on production AI environments?", answer: "Yes. It emphasizes real-world AI operations, monitoring, deployment, governance, automation, and maintenance in enterprise production environments." },
      { question: "Are practical labs included?", answer: "Yes. Every day includes hands-on exercises covering deployment, monitoring, incident response, automation, and enterprise AI operations management." },
      { question: "Which tools will I learn?", answer: "Participants will work with Python, MLflow, Docker, Kubernetes, Prometheus, Grafana, Azure Monitor, Git & GitHub, and major cloud AI platforms." },
      { question: "What skills will I gain?", answer: "You will learn AI lifecycle management, production deployment, infrastructure management, monitoring, automation, incident handling, security, governance, and operational best practices for enterprise AI systems." }
    ]
  },
  "Artificial Intelligence - Performance Tuning": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Machine Learning, Python, model deployment, and cloud computing.",
    overview: "The Artificial Intelligence – Performance Tuning course is designed for AI engineers, MLOps professionals, data scientists, and solution architects who want to optimize AI models and production environments for maximum efficiency. Participants will learn techniques to improve model accuracy, reduce inference latency, optimize resource utilization, fine-tune hyperparameters, accelerate model deployment, and enhance the scalability of enterprise AI applications through practical labs and real-world case studies.",
    objectives: ["Understand AI model performance optimization techniques.","Fine-tune machine learning and deep learning models.","Improve inference speed and reduce latency.","Optimize AI infrastructure and resource utilization.","Monitor and benchmark AI model performance.","Scale AI applications for enterprise workloads.","Apply performance tuning best practices in production environments."],
    days: [
      { day: 1, title: "AI Performance Fundamentals", topics: ["Introduction to AI Performance Tuning","Performance Metrics & KPIs","Model Accuracy vs Speed","CPU, GPU & TPU Optimization","Resource Utilization","Performance Benchmarking","Optimization Best Practices"], handsOn: ["Measuring model performance","Benchmarking AI workloads","Identifying performance bottlenecks"], outcome: "Understand key performance metrics and identify optimization opportunities in AI systems." },
      { day: 2, title: "Model Optimization Techniques", topics: ["Hyperparameter Tuning","Feature Selection","Model Compression","Quantization","Pruning Techniques","Transfer Learning Optimization","Efficient Training Strategies"], handsOn: ["Fine-tuning AI models","Applying model compression","Comparing optimized model performance"], outcome: "Improve model accuracy and efficiency using advanced optimization techniques." },
      { day: 3, title: "Infrastructure & Deployment Optimization", topics: ["AI Infrastructure Optimization","Container Optimization","Kubernetes Scaling","Cloud Performance Tuning","Distributed Training","Load Balancing","Auto Scaling"], handsOn: ["Optimizing AI deployments","Configuring scalable infrastructure","Testing load balancing strategies"], outcome: "Optimize AI infrastructure to support scalable, high-performance deployments." },
      { day: 4, title: "Monitoring & Troubleshooting Performance", topics: ["AI Performance Monitoring","Logging & Profiling","Latency Analysis","Memory Optimization","Throughput Optimization","Root Cause Analysis","Continuous Performance Improvement"], handsOn: ["Monitoring production AI systems","Profiling model execution","Resolving performance bottlenecks"], outcome: "Monitor, troubleshoot, and continuously improve AI application performance." },
      { day: 5, title: "Enterprise Optimization Project & Best Practices", topics: ["End-to-End Performance Optimization Strategy","Performance Testing","AI Cost Optimization","Security & Performance Balance","Future Trends in AI Optimization","Career Roadmap","Certification Guidance"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","TensorFlow","PyTorch","Scikit-learn","MLflow","Docker","Kubernetes","NVIDIA CUDA (Introduction)","Azure AI Services","AWS AI Services","Google Cloud Vertex AI"],
    careers: ["AI Performance Engineer","Machine Learning Engineer","MLOps Engineer","AI Infrastructure Engineer","AI Solutions Architect","Cloud AI Engineer","Deep Learning Engineer","AI Optimization Specialist"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Google Professional Machine Learning Engineer","AWS Certified AI Practitioner","TensorFlow Developer Certificate","NVIDIA Deep Learning Institute Certifications"],
    realWorldCases: { intro: "Optimize an enterprise AI application by:", bullets: ["Benchmarking model performance","Fine-tuning hyperparameters","Reducing inference latency","Optimizing infrastructure resources","Presenting performance improvements"] },
    faqs: [
      { question: "Who should attend this course?", answer: "AI engineers, data scientists, MLOps professionals, cloud engineers, and developers responsible for optimizing AI applications." },
      { question: "What optimization techniques are covered?", answer: "The course covers hyperparameter tuning, model compression, pruning, quantization, benchmarking, latency reduction, infrastructure optimization, and performance monitoring." },
      { question: "Are practical labs included?", answer: "Yes. Every day includes hands-on optimization exercises, benchmarking activities, deployment tuning, and a capstone performance improvement project." },
      { question: "Which tools will be used?", answer: "Participants will work with TensorFlow, PyTorch, Scikit-learn, MLflow, Docker, Kubernetes, NVIDIA CUDA, and major cloud AI platforms." },
      { question: "What skills will I gain?", answer: "You will learn to optimize AI models, improve inference speed, reduce operational costs, scale AI deployments, and maintain high-performing enterprise AI systems." }
    ]
  },
  "Artificial Intelligence - Prompt Engineering": {
    level: "Beginner to Intermediate",
    scheduleDays: 5,
    prerequisites: "Basic understanding of Artificial Intelligence, computer fundamentals, and familiarity with Generative AI tools is recommended but not mandatory.",
    overview: "The Artificial Intelligence – Prompt Engineering course is designed for AI enthusiasts, developers, content creators, business professionals, researchers, and technology teams who want to master the art of communicating effectively with Large Language Models (LLMs). The course covers prompt design principles, prompt optimization, reasoning techniques, context management, AI workflows, prompt security, and enterprise applications. Through hands-on exercises and real-world projects, participants will learn how to create high-quality prompts that generate accurate, efficient, and reliable AI outputs across multiple business domains.",
    objectives: ["Understand the fundamentals of Prompt Engineering.","Design effective prompts for Large Language Models.","Apply advanced prompting techniques for different use cases.","Build AI workflows using prompt chaining and automation.","Improve response quality through prompt optimization.","Implement prompt security and responsible AI practices.","Develop enterprise-ready prompt solutions for business applications."],
    days: [
      { day: 1, title: "Prompt Engineering Fundamentals", topics: ["Introduction to Prompt Engineering","Understanding Large Language Models (LLMs)","Prompt Structure and Components","Types of Prompts","Zero-shot, One-shot & Few-shot Prompting","Role-based Prompting","Prompt Design Best Practices"], handsOn: ["Creating effective prompts","Comparing different prompting techniques","Improving AI response quality"], outcome: "Understand the fundamentals of prompt engineering and create structured prompts for various AI applications." },
      { day: 2, title: "Advanced Prompting Techniques", topics: ["Chain-of-Thought Prompting","Prompt Chaining","Context Management","Instruction Tuning","Output Formatting","Prompt Templates","AI Content Generation"], handsOn: ["Designing advanced prompts","Building reusable prompt templates","Optimizing prompts for accuracy"], outcome: "Develop advanced prompting strategies that improve AI reasoning, consistency, and response quality." },
      { day: 3, title: "Prompt Automation & AI Integration", topics: ["Prompt Automation","AI Workflow Design","API-Based Prompting","Prompt Libraries","Multi-step AI Workflows","Retrieval-Augmented Generation (RAG) Basics","Business Process Automation"], handsOn: ["Automating prompt workflows","Integrating prompts with AI APIs","Building reusable AI assistants"], outcome: "Create automated prompt-driven AI workflows that integrate with business applications and external services." },
      { day: 4, title: "Prompt Security, Testing & Optimization", topics: ["Prompt Security","Prompt Injection Attacks","AI Safety & Responsible AI","Prompt Testing & Evaluation","Performance Optimization","Bias Reduction","Prompt Version Management"], handsOn: ["Testing prompts for reliability","Improving prompt performance","Identifying prompt vulnerabilities"], outcome: "Build secure, optimized, and reliable prompts while minimizing risks and improving AI performance." },
      { day: 5, title: "Enterprise Prompt Engineering Project & Assessment", topics: ["Enterprise Prompt Design","AI Productivity Workflows","Industry Use Cases","Future Trends in Prompt Engineering","Career Roadmap","Certification Guidance","Project Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["ChatGPT","OpenAI API","Microsoft Copilot","Google Gemini","Claude AI","LangChain","LangGraph","Python","Jupyter Notebook","Git & GitHub","Prompt Management Tools"],
    careers: ["Prompt Engineer","Generative AI Specialist","AI Content Strategist","AI Automation Engineer","Conversational AI Developer","LLM Application Developer","AI Consultant","AI Solutions Architect"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified AI Practitioner","Google Professional Machine Learning Engineer","Microsoft Applied Skills: Build AI Apps with Azure AI","OpenAI & Generative AI Professional Training Programs"],
    realWorldCases: { intro: "Design a complete Prompt Engineering solution that includes:", bullets: ["Industry Use Cases","Prompt templates for multiple business scenarios","AI workflow automation","Prompt optimization and testing","Security and governance considerations","Final presentation and documentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "Developers, AI enthusiasts, content creators, business professionals, educators, researchers, and anyone interested in working effectively with Generative AI and Large Language Models." },
      { question: "Do I need programming experience?", answer: "No. Basic computer knowledge is sufficient. While some automation exercises use Python and APIs, the course starts with beginner-friendly prompt engineering concepts." },
      { question: "Are practical exercises included?", answer: "Yes. Every training day includes hands-on prompt design, optimization, automation, security testing, and a final enterprise prompt engineering project." },
      { question: "Which AI platforms and tools are covered?", answer: "Participants will work with ChatGPT, OpenAI API, Microsoft Copilot, Google Gemini, Claude AI, LangChain, LangGraph, Python, Jupyter Notebook, Git & GitHub, and prompt management tools." },
      { question: "What skills will I gain?", answer: "You will learn prompt design, advanced prompting techniques, AI workflow automation, prompt security, optimization, testing, enterprise prompt management, and best practices for building reliable Generative AI applications." }
    ]
  },
  "Artificial Intelligence - Reinforcement Learning": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Machine Learning, Python programming, probability, linear algebra, and deep learning fundamentals.",
    overview: "The Artificial Intelligence – Reinforcement Learning course is designed for AI engineers, machine learning engineers, data scientists, robotics developers, researchers, and software professionals who want to build intelligent systems capable of learning through interaction with their environment. The course covers reinforcement learning fundamentals, Markov Decision Processes (MDPs), value-based methods, policy optimization, Deep Reinforcement Learning (DRL), multi-agent systems, robotics applications, and enterprise deployment. Through practical labs and real-world projects, participants will gain hands-on experience in designing, training, and deploying reinforcement learning models for complex decision-making problems.",
    objectives: ["Understand the principles of reinforcement learning and sequential decision-making.","Build reinforcement learning agents using modern algorithms.","Implement value-based and policy-based reinforcement learning techniques.","Apply Deep Reinforcement Learning to real-world AI applications.","Train and evaluate reinforcement learning models in simulation environments.","Deploy reinforcement learning solutions for enterprise and robotics applications.","Optimize AI agents for performance, scalability, and reliability."],
    days: [
      { day: 1, title: "Reinforcement Learning Fundamentals", topics: ["Introduction to Reinforcement Learning","Agents and Environments","Rewards and Policies","Markov Decision Processes (MDPs)","Bellman Equation","Exploration vs Exploitation","Reinforcement Learning Workflow"], handsOn: ["Setting up RL environments","Creating basic AI agents","Running simple reinforcement learning experiments"], outcome: "Understand the core concepts of reinforcement learning and develop simple intelligent agents." },
      { day: 2, title: "Value-Based Reinforcement Learning", topics: ["Dynamic Programming","Monte Carlo Methods","Temporal Difference Learning","Q-Learning","SARSA","Experience Replay","Hyperparameter Tuning"], handsOn: ["Building Q-Learning agents","Training agents using SARSA","Comparing value-based algorithms"], outcome: "Develop reinforcement learning agents capable of solving sequential decision-making problems using value-based techniques." },
      { day: 3, title: "Policy Optimization & Deep Reinforcement Learning", topics: ["Policy Gradient Methods","Actor-Critic Algorithms","Deep Q Networks (DQN)","Proximal Policy Optimization (PPO)","Advantage Actor-Critic (A2C)","Deep Deterministic Policy Gradient (DDPG)","Model-Based Reinforcement Learning"], handsOn: ["Training Deep Q Networks","Implementing PPO agents","Optimizing reinforcement learning performance"], outcome: "Build advanced reinforcement learning models using deep learning techniques and modern policy optimization algorithms." },
      { day: 4, title: "Enterprise Applications & Deployment", topics: ["Robotics Applications","Autonomous Systems","Recommendation Systems","Game AI","Financial Decision Models","RL Deployment Strategies","Monitoring & Performance Optimization"], handsOn: ["Developing RL-based recommendation systems","Deploying reinforcement learning models","Monitoring AI agent performance"], outcome: "Apply reinforcement learning to solve enterprise, robotics, gaming, and automation challenges." },
      { day: 5, title: "Enterprise Reinforcement Learning Project & Assessment", topics: ["End-to-End RL Solution Development","Industry Case Studies","AI Ethics in Reinforcement Learning","Future Trends in RL","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","OpenAI Gym / Gymnasium","Stable-Baselines3","TensorFlow","PyTorch","RLlib","NumPy","Jupyter Notebook","Git & GitHub","Google Colab","MLflow","Docker"],
    careers: ["Reinforcement Learning Engineer","AI Research Scientist","Machine Learning Engineer","Robotics Engineer","Autonomous Systems Engineer","AI Solutions Architect","Deep Learning Engineer","Data Scientist"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Google Professional Machine Learning Engineer","AWS Certified AI Practitioner","TensorFlow Developer Certificate","IBM AI Engineering Professional Certificate"],
    realWorldCases: { intro: "Develop a complete reinforcement learning solution that includes:", bullets: ["Industry Case Studies","Environment design","Agent development","Model training and optimization","Deployment strategy","Performance evaluation and documentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "AI engineers, machine learning engineers, researchers, robotics developers, software engineers, and professionals interested in advanced reinforcement learning techniques." },
      { question: "Is prior deep learning knowledge required?", answer: "Yes. Basic understanding of deep learning, Python programming, probability, and machine learning concepts is recommended for successfully completing the practical exercises." },
      { question: "Are practical reinforcement learning projects included?", answer: "Yes. Every training day includes hands-on labs covering Q-Learning, SARSA, Deep Q Networks (DQN), PPO, RL deployment, robotics simulations, and a comprehensive enterprise reinforcement learning capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Participants will work with Python, OpenAI Gym/Gymnasium, Stable-Baselines3, TensorFlow, PyTorch, RLlib, NumPy, Jupyter Notebook, Git & GitHub, Google Colab, MLflow, and Docker." },
      { question: "What skills will I gain?", answer: "You will learn reinforcement learning fundamentals, value-based learning, policy optimization, Deep Reinforcement Learning (DRL), AI agent development, robotics applications, deployment strategies, performance optimization, and enterprise RL solution development using modern AI frameworks." }
    ]
  },
  "Artificial Intelligence - Reporting": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, data analysis, Python programming, SQL, and business intelligence concepts.",
    overview: "The Artificial Intelligence – Reporting course is designed for AI professionals, data analysts, business intelligence developers, project managers, and decision-makers who want to create meaningful reports and dashboards from AI-driven insights. The course covers AI reporting frameworks, data visualization, KPI design, automated reporting, model performance reporting, business intelligence integration, executive dashboards, and governance. Through practical labs and enterprise case studies, participants will learn how to transform AI outputs into actionable business reports for stakeholders.",
    objectives: ["Understand AI reporting concepts and reporting frameworks.","Design business-focused AI dashboards and reports.","Monitor AI model performance using KPIs and metrics.","Automate AI reporting workflows.","Integrate AI reports with BI platforms.","Communicate AI insights effectively to stakeholders.","Build enterprise-ready AI reporting solutions."],
    days: [
      { day: 1, title: "AI Reporting Fundamentals", topics: ["Introduction to AI Reporting","Reporting Lifecycle","Business Requirements Analysis","AI Metrics & KPIs","Report Design Principles","Data Preparation","Reporting Best Practices"], handsOn: ["Defining reporting requirements","Preparing AI datasets","Designing report layouts"], outcome: "Understand how to design clear, accurate, and business-oriented AI reports." },
      { day: 2, title: "Data Visualization & Dashboard Development", topics: ["Data Visualization Principles","Dashboard Design","AI Model Performance Reporting","Interactive Charts","Business Intelligence Integration","Executive Reporting","Report Customization"], handsOn: ["Creating AI dashboards","Building KPI scorecards","Designing executive reports"], outcome: "Develop interactive dashboards that communicate AI insights effectively." },
      { day: 3, title: "Automated Reporting & AI Monitoring", topics: ["Automated Report Generation","Scheduled Reporting","AI Monitoring Dashboards","Alerting & Notifications","Data Refresh Strategies","API-Based Reporting","Report Distribution"], handsOn: ["Automating report generation","Configuring alerts","Publishing reports to stakeholders"], outcome: "Implement automated reporting systems for continuous AI performance tracking." },
      { day: 4, title: "Governance, Security & Performance", topics: ["Reporting Governance","Data Security","Privacy & Compliance","Access Control","Report Optimization","Performance Monitoring","Audit & Documentation"], handsOn: ["Applying report security controls","Optimizing dashboard performance","Preparing governance documentation"], outcome: "Develop secure, compliant, and optimized reporting solutions for enterprise AI environments." },
      { day: 5, title: "Enterprise AI Reporting Project & Assessment", topics: ["End-to-End Reporting Solution","Executive Presentation Techniques","AI Business Insights","Future Trends in AI Reporting","Career Roadmap","Certification Guidance","Project Review"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","SQL","Microsoft Power BI","Tableau","Microsoft Excel","Jupyter Notebook","Pandas","Matplotlib","Azure AI Services","Git & GitHub","REST APIs"],
    careers: ["AI Reporting Analyst","Business Intelligence Developer","AI Data Analyst","AI Dashboard Developer","Reporting Specialist","AI Business Consultant","Data Visualization Engineer","AI Performance Analyst"],
    certifications: ["Microsoft Power BI Data Analyst Associate (PL-300)","Microsoft Azure AI Engineer Associate (AI-102)","Tableau Certified Data Analyst","AWS Certified AI Practitioner","Google Professional Data Analytics Certificate"],
    realWorldCases: { intro: "Develop a complete AI reporting solution that includes:", bullets: ["AI performance dashboard","Business KPI reporting","Automated report generation","Executive-level visualization","Governance and documentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "AI professionals, data analysts, BI developers, project managers, business analysts, and decision-makers responsible for reporting AI performance and business insights." },
      { question: "Does this course focus on business reporting?", answer: "Yes. It covers technical AI reporting as well as executive dashboards, KPI reporting, business intelligence integration, and automated reporting." },
      { question: "Are practical reporting projects included?", answer: "Yes. Every training day includes hands-on dashboard development, automated reporting exercises, visualization labs, and a final enterprise reporting project." },
      { question: "Which reporting tools are covered?", answer: "Participants will work with Power BI, Tableau, Microsoft Excel, Python, SQL, Pandas, Matplotlib, Jupyter Notebook, Git & GitHub, and Azure AI Services." },
      { question: "What skills will I gain?", answer: "You will learn AI reporting frameworks, dashboard development, KPI tracking, automated reporting, business intelligence integration, data visualization, governance, and enterprise reporting best practices." }
    ]
  },
  "Artificial Intelligence - Scripting": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Python programming, programming fundamentals, and machine learning concepts.",
    overview: "The Artificial Intelligence – Scripting course is designed for AI developers, machine learning engineers, automation specialists, data scientists, and software professionals who want to develop efficient scripts for AI workflows and automation. The course covers Python scripting for AI, data processing, model automation, API integration, task scheduling, workflow automation, debugging, and script optimization. Through practical coding exercises and real-world projects, participants will learn how to automate repetitive AI tasks and build scalable scripting solutions for enterprise AI applications.",
    objectives: ["Develop Python scripts for AI and machine learning workflows.","Automate data collection, preprocessing, and model execution.","Integrate AI scripts with APIs, databases, and cloud services.","Build reusable and maintainable automation scripts.","Debug, optimize, and secure AI scripts.","Schedule and monitor AI automation tasks.","Apply scripting best practices in enterprise AI environments."],
    days: [
      { day: 1, title: "AI Scripting Fundamentals", topics: ["Introduction to AI Scripting","Python Programming for AI","Variables, Functions & Modules","File Handling","Exception Handling","Code Organization","Scripting Best Practices"], handsOn: ["Writing Python scripts","Automating file operations","Creating reusable functions"], outcome: "Build a strong foundation in Python scripting for AI development and automation." },
      { day: 2, title: "Data Processing & AI Automation", topics: ["Data Collection","Data Cleaning","Data Transformation","Feature Engineering","Script Automation","Batch Processing","Workflow Scheduling"], handsOn: ["Automating dataset preparation","Building preprocessing scripts","Scheduling automated tasks"], outcome: "Develop scripts that automate data preparation and AI workflows efficiently." },
      { day: 3, title: "API Integration & Model Automation", topics: ["REST API Integration","AI Model Execution","Database Connectivity","Cloud Service Integration","Script-Based Deployments","Logging","Configuration Management"], handsOn: ["Integrating AI APIs","Automating model inference","Connecting scripts to databases"], outcome: "Create intelligent automation scripts that integrate seamlessly with AI services and enterprise systems." },
      { day: 4, title: "Optimization, Security & Testing", topics: ["Script Performance Optimization","Debugging Techniques","Unit Testing","Secure Coding Practices","Error Monitoring","Version Control","Documentation Standards"], handsOn: ["Optimizing Python scripts","Testing AI automation scripts","Implementing secure coding techniques"], outcome: "Develop reliable, secure, and high-performance AI scripts suitable for production environments." },
      { day: 5, title: "Enterprise AI Scripting Project & Assessment", topics: ["End-to-End AI Automation Workflow","Script Deployment","Project Documentation","Continuous Improvement","Future AI Automation Trends","Career Roadmap","Certification Guidance"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Jupyter Notebook","Pandas","NumPy","Scikit-learn","Requests API","FastAPI","Git & GitHub","Docker","Apache Airflow (Overview)","Azure AI Services"],
    careers: ["AI Automation Engineer","AI Developer","Python Developer (AI)","Machine Learning Engineer","AI Integration Engineer","MLOps Engineer","Data Engineer","AI Solutions Developer"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Python Institute PCAP Certification","AWS Certified AI Practitioner","Google Professional Machine Learning Engineer","IBM AI Engineering Professional Certificate"],
    realWorldCases: { intro: "Develop an enterprise AI scripting solution that includes:", bullets: ["Automated data processing","AI model execution","API integration","Scheduled workflow automation","Monitoring and documentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "AI developers, Python programmers, machine learning engineers, automation specialists, and software professionals interested in AI workflow automation." },
      { question: "Is programming experience required?", answer: "Basic Python programming knowledge is recommended. The course gradually progresses to advanced AI scripting and automation techniques." },
      { question: "Are practical coding exercises included?", answer: "Yes. Every training day includes hands-on scripting labs, automation projects, API integration exercises, and a final enterprise AI scripting project." },
      { question: "Which tools and technologies are covered?", answer: "Participants will work with Python, Jupyter Notebook, Pandas, NumPy, Scikit-learn, FastAPI, Docker, Git & GitHub, Apache Airflow, and Azure AI Services." },
      { question: "What skills will I gain?", answer: "You will learn Python scripting, AI workflow automation, API integration, model execution, debugging, testing, optimization, secure coding, and enterprise AI automation best practices." }
    ]
  },
  "Artificial Intelligence - Security": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Machine Learning, cybersecurity fundamentals, cloud computing, and networking.",
    overview: "The Artificial Intelligence – Security course focuses on protecting AI systems, machine learning models, and sensitive data from cyber threats and adversarial attacks. Participants will learn how to secure AI applications throughout the development lifecycle, implement robust access controls, safeguard training datasets, detect model vulnerabilities, and ensure compliance with industry security standards. Through practical labs and real-world scenarios, learners will gain the expertise required to build and maintain secure, trustworthy AI solutions for enterprise environments.",
    objectives: ["Understand AI-specific security risks and threats.","Secure AI models, datasets, and infrastructure.","Implement identity, access, and data protection controls.","Detect and mitigate adversarial attacks on AI systems.","Apply AI governance, compliance, and ethical security practices.","Monitor, audit, and respond to AI security incidents.","Design secure AI deployment architectures."],
    days: [
      { day: 1, title: "AI Security Fundamentals", topics: ["Introduction to AI Security","AI Threat Landscape","AI Security Principles","Security in AI Development Lifecycle","AI Infrastructure Security","AI Risk Assessment","Security Best Practices"], handsOn: ["Identifying AI security risks","AI environment security assessment","Configuring basic security controls"], outcome: "Understand the security challenges associated with AI systems and establish a secure AI environment." },
      { day: 2, title: "Data & Model Security", topics: ["Data Privacy and Protection","Secure Data Collection","Dataset Integrity","AI Model Security","Model Poisoning Attacks","Adversarial Machine Learning","Secure Model Storage"], handsOn: ["Securing training datasets","Identifying model vulnerabilities","Implementing encryption techniques"], outcome: "Protect AI data and models against unauthorized access and manipulation." },
      { day: 3, title: "Identity, Access & Secure Deployment", topics: ["Identity and Access Management (IAM)","Authentication & Authorization","API Security","Secure AI Deployment","Container Security","Cloud AI Security","DevSecOps for AI"], handsOn: ["Configuring IAM policies","Securing AI APIs","Deploying AI applications with security controls"], outcome: "Implement secure deployment strategies and access management for AI applications." },
      { day: 4, title: "Monitoring, Compliance & Incident Response", topics: ["AI Security Monitoring","Logging & Auditing","Threat Detection","AI Compliance Standards","AI Governance","Incident Response Planning","Security Testing"], handsOn: ["Monitoring AI security events","Reviewing audit logs","Responding to simulated security incidents"], outcome: "Monitor AI environments, detect threats, and respond effectively to security incidents." },
      { day: 5, title: "Enterprise AI Security & Capstone Project", topics: ["Zero Trust for AI Systems","AI Security Architecture","Secure MLOps","AI Governance Frameworks","Performance & Security Optimization","Future AI Security Trends","Certification & Career Guidance"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Microsoft Azure AI Security","AWS AI Services","Google Cloud Vertex AI","Docker","Kubernetes","MLflow","Git & GitHub","OWASP AI Security Guidelines","SIEM & Monitoring Tools"],
    careers: ["AI Security Engineer","AI Security Analyst","Machine Learning Security Engineer","Cloud AI Security Specialist","AI Risk & Compliance Consultant","AI Governance Specialist","DevSecOps Engineer (AI)","Enterprise AI Security Architect"],
    certifications: ["Microsoft Azure Security Engineer Associate (AZ-500)","Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified Security – Specialty","Google Professional Cloud Security Engineer","ISC² Certified in Cybersecurity (CC)"],
    realWorldCases: { intro: "Design and secure an enterprise AI solution by:", bullets: ["Performing risk assessment","Securing datasets and AI models","Implementing IAM and API security","Configuring monitoring and auditing","Presenting a secure AI architecture"] },
    faqs: [
      { question: "Who should attend this course?", answer: "Cybersecurity professionals, AI engineers, cloud architects, DevSecOps engineers, and IT administrators responsible for securing AI environments." },
      { question: "Will the course include practical security labs?", answer: "Yes. Every day includes hands-on exercises covering AI security, threat detection, secure deployment, and incident response." },
      { question: "What security topics are covered?", answer: "The course includes adversarial AI, model security, data protection, IAM, API security, compliance, governance, monitoring, and secure AI deployment." },
      { question: "Is cloud AI security included?", answer: "Yes. Security concepts for Microsoft Azure, AWS, and Google Cloud AI platforms are covered." },
      { question: "What skills will I gain?", answer: "You will learn to secure AI models, protect data, implement AI security controls, monitor AI systems, respond to threats, and build secure enterprise AI solutions." }
    ]
  },
  "Artificial Intelligence - Testing": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Machine Learning, Python programming, software testing, and AI deployment concepts.",
    overview: "The Artificial Intelligence – Testing course is designed for AI engineers, QA professionals, MLOps engineers, developers, and software testers who want to validate the quality, reliability, and performance of AI applications. Participants will learn testing methodologies for machine learning models, AI-powered applications, APIs, data pipelines, and production deployments. The course also covers model validation, bias testing, performance testing, security testing, and automated testing using industry-standard tools and best practices.",
    objectives: ["Understand AI testing methodologies and frameworks.","Validate AI models, datasets, and prediction accuracy.","Perform functional, performance, and security testing.","Test AI APIs and enterprise integrations.","Automate AI testing workflows and reporting.","Detect bias, drift, and reliability issues in AI systems.","Ensure production-ready AI deployments through comprehensive testing."],
    days: [
      { day: 1, title: "AI Testing Fundamentals", topics: ["Introduction to AI Testing","Software Testing vs AI Testing","AI Testing Lifecycle","Testing Strategies","Dataset Validation","Test Planning","Testing Best Practices"], handsOn: ["Setting up a testing environment","Preparing AI test cases","Validating datasets"], outcome: "Understand the complete AI testing lifecycle and prepare effective test plans for AI applications." },
      { day: 2, title: "Model Validation & Functional Testing", topics: ["Model Accuracy Testing","Functional Testing","Classification & Regression Validation","Bias Detection","Fairness Testing","Explainability Validation","Acceptance Testing"], handsOn: ["Evaluating AI model performance","Detecting model bias","Performing functional validation"], outcome: "Validate AI model behavior, fairness, and prediction quality before deployment." },
      { day: 3, title: "API, Integration & Performance Testing", topics: ["AI API Testing","Integration Testing","Load Testing","Stress Testing","Scalability Testing","Latency Measurement","Resource Utilization Testing"], handsOn: ["Testing AI APIs","Measuring inference latency","Conducting performance tests"], outcome: "Ensure AI applications perform reliably under different workloads and integration scenarios." },
      { day: 4, title: "Security & Automated Testing", topics: ["AI Security Testing","Adversarial Testing","Data Privacy Validation","Automated Testing Frameworks","Continuous Testing in MLOps","Regression Testing","Compliance Testing"], handsOn: ["Automating AI test cases","Performing security validation","Running regression test suites"], outcome: "Implement automated, secure, and repeatable testing processes for enterprise AI applications." },
      { day: 5, title: "Enterprise Testing Project & Quality Assurance", topics: ["End-to-End AI Quality Assurance","Production Readiness Assessment","Test Reporting & Documentation","Risk Assessment","Future Trends in AI Testing","Career Roadmap","Certification Guidance"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","PyTest","Selenium (Overview)","Postman","Jupyter Notebook","MLflow","Scikit-learn","TensorFlow","Docker","Git & GitHub","Azure DevOps"],
    careers: ["AI Test Engineer","AI Quality Assurance Engineer","Machine Learning Validation Engineer","MLOps Engineer","AI Automation Test Engineer","AI Reliability Engineer","Software Test Engineer (AI)","AI Quality Consultant"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","ISTQB Certified Tester Foundation Level (CTFL)","AWS Certified AI Practitioner","Google Professional Machine Learning Engineer","Microsoft Azure DevOps Engineer Expert (AZ-400)"],
    realWorldCases: { intro: "Design and execute a complete AI testing strategy by:", bullets: ["Validating datasets and AI models","Testing APIs and integrations","Performing performance and security testing","Automating test execution","Preparing a comprehensive quality assurance report"] },
    faqs: [
      { question: "Who should attend this course?", answer: "AI engineers, QA professionals, software testers, MLOps engineers, developers, and DevOps professionals responsible for validating AI systems." },
      { question: "What testing techniques are covered?", answer: "The course covers functional testing, model validation, API testing, performance testing, security testing, bias detection, automated testing, and regression testing." },
      { question: "Are practical testing labs included?", answer: "Yes. Every training day includes hands-on testing exercises, automation tasks, performance validation, and a final enterprise AI testing project." },
      { question: "Which tools will I use during the training?", answer: "Participants will work with Python, PyTest, Postman, MLflow, TensorFlow, Scikit-learn, Docker, Azure DevOps, Git, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn AI quality assurance, model validation, API testing, automated testing, performance optimization, security validation, and production readiness assessment for enterprise AI solutions." }
    ]
  },
  "Artificial Intelligence - Troubleshooting": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Machine Learning, Python, APIs, model deployment, and cloud platforms.",
    overview: "The Artificial Intelligence – Troubleshooting course is designed for AI engineers, MLOps professionals, developers, system administrators, and support engineers responsible for maintaining AI applications. Participants will learn systematic approaches to diagnosing and resolving issues related to AI models, data pipelines, APIs, infrastructure, deployments, and production environments. Through hands-on labs and real-world troubleshooting scenarios, learners will develop practical skills to quickly identify root causes, minimize downtime, and maintain reliable AI solutions.",
    objectives: ["Diagnose common AI application and model issues.","Troubleshoot data quality and pipeline failures.","Resolve model performance and prediction problems.","Debug AI APIs, integrations, and deployment issues.","Monitor AI systems and perform root cause analysis.","Optimize AI applications for stability and reliability.","Apply enterprise troubleshooting best practices."],
    days: [
      { day: 1, title: "AI Troubleshooting Fundamentals", topics: ["Introduction to AI Troubleshooting","AI System Components","Common AI Failures","Troubleshooting Methodologies","Root Cause Analysis","Log Analysis","Troubleshooting Best Practices"], handsOn: ["Identifying AI application issues","Reviewing logs and error messages","Performing root cause analysis"], outcome: "Develop a structured approach to diagnosing and resolving AI-related issues." },
      { day: 2, title: "Data & Model Troubleshooting", topics: ["Data Quality Issues","Missing & Corrupted Data","Model Training Failures","Prediction Errors","Model Drift","Feature Engineering Problems","Validation & Testing"], handsOn: ["Resolving dataset issues","Debugging model predictions","Improving model accuracy"], outcome: "Identify and resolve problems affecting AI model accuracy and reliability." },
      { day: 3, title: "Deployment & Integration Troubleshooting", topics: ["API Debugging","AI Deployment Failures","Container Troubleshooting","Cloud Service Issues","Database Connectivity","Network Configuration","Version Compatibility"], handsOn: ["Debugging AI APIs","Resolving deployment failures","Troubleshooting cloud integrations"], outcome: "Maintain stable AI deployments and resolve integration challenges across enterprise environments." },
      { day: 4, title: "Performance & Security Troubleshooting", topics: ["Performance Bottlenecks","Memory & Resource Issues","Latency Analysis","AI Security Incidents","Authentication Problems","Monitoring & Alerting","Preventive Maintenance"], handsOn: ["Optimizing AI performance","Investigating security-related issues","Configuring monitoring alerts"], outcome: "Improve AI system performance while identifying and mitigating operational and security issues." },
      { day: 5, title: "Enterprise Troubleshooting Project & Assessment", topics: ["End-to-End AI Incident Management","Disaster Recovery Planning","Troubleshooting Documentation","Knowledge Base Creation","Future Trends in AI Operations","Career Roadmap","Certification Guidance"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Jupyter Notebook","MLflow","Docker","Kubernetes","FastAPI","Git & GitHub","Azure Monitor","AWS CloudWatch","Google Cloud Operations Suite","Postman"],
    careers: ["AI Support Engineer","AI Operations Engineer","MLOps Engineer","Machine Learning Engineer","AI Reliability Engineer","DevOps Engineer (AI)","Cloud AI Support Specialist","AI Infrastructure Engineer"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified AI Practitioner","Google Professional Machine Learning Engineer","Microsoft Azure Administrator Associate (AZ-104)"],
    realWorldCases: { intro: "Troubleshoot and resolve a production AI environment by:", bullets: ["Investigating system failures","Identifying data and model issues","Fixing deployment and API problems","Optimizing performance","Presenting the complete troubleshooting process"] },
    faqs: [
      { question: "Who should attend this course?", answer: "AI engineers, developers, MLOps professionals, cloud administrators, DevOps engineers, and technical support professionals responsible for maintaining AI systems." },
      { question: "What troubleshooting areas are covered?", answer: "The course covers AI models, datasets, APIs, cloud services, deployments, containers, performance issues, security incidents, and monitoring." },
      { question: "Are hands-on troubleshooting labs included?", answer: "Yes. Every training day includes practical troubleshooting scenarios, debugging exercises, deployment issue resolution, and a final enterprise troubleshooting project." },
      { question: "Which tools will I use during the training?", answer: "Participants will work with Python, MLflow, Docker, Kubernetes, FastAPI, Azure Monitor, AWS CloudWatch, Google Cloud Operations Suite, Git, and Postman." },
      { question: "What skills will I gain?", answer: "You will learn root cause analysis, AI debugging, deployment troubleshooting, performance optimization, monitoring, incident management, and enterprise AI support best practices." }
    ]
  },
  "Artificial Intelligence - Edge AI": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Artificial Intelligence, Machine Learning, Python programming, embedded systems, IoT fundamentals, cloud computing, and deep learning concepts.",
    overview: "The Artificial Intelligence – Edge AI course is designed for AI engineers, IoT developers, embedded systems engineers, robotics professionals, solution architects, and technology professionals who want to deploy AI models directly on edge devices. The course covers Edge AI architecture, TinyML, model optimization, embedded AI deployment, computer vision at the edge, IoT integration, edge security, performance optimization, and enterprise Edge AI solutions. Through hands-on labs and real-world projects, participants will gain practical experience in developing intelligent applications that run efficiently on resource-constrained devices with minimal latency.",
    objectives: ["Understand Edge AI architecture and deployment models.","Build and optimize AI models for edge devices.","Deploy AI applications using TinyML and embedded AI frameworks.","Integrate AI with IoT and smart devices.","Implement real-time computer vision and sensor-based AI applications.","Secure and monitor Edge AI deployments.","Design scalable enterprise Edge AI solutions."],
    days: [
      { day: 1, title: "Edge AI Fundamentals", topics: ["Introduction to Edge AI","Edge Computing Architecture","Edge vs Cloud AI","AI Model Lifecycle","Embedded Systems Overview","TinyML Fundamentals","Edge AI Best Practices"], handsOn: ["Setting up Edge AI development environments","Running AI models on edge hardware","Comparing edge and cloud inference"], outcome: "Understand the fundamentals of Edge AI and prepare AI models for execution on embedded devices." },
      { day: 2, title: "Model Development & Optimization", topics: ["TensorFlow Lite","ONNX Runtime","Model Quantization","Model Pruning","Hardware Acceleration","Resource Optimization","Edge AI Performance Metrics"], handsOn: ["Optimizing AI models for edge deployment","Converting models for embedded devices","Benchmarking inference performance"], outcome: "Optimize AI models for faster inference, lower memory usage, and improved energy efficiency on edge hardware." },
      { day: 3, title: "Edge AI Applications & IoT Integration", topics: ["Computer Vision at the Edge","Sensor Data Processing","Edge AI for IoT","Robotics & Automation","Smart Manufacturing","Smart Cities","Predictive Maintenance"], handsOn: ["Developing vision-based edge applications","Integrating AI with IoT sensors","Building predictive maintenance solutions"], outcome: "Develop intelligent Edge AI applications for industrial automation, IoT, robotics, and smart environments." },
      { day: 4, title: "Deployment, Security & Monitoring", topics: ["Edge Device Deployment","OTA (Over-the-Air) Updates","Device Management","Edge Security","Authentication & Encryption","Monitoring Edge AI Systems","Performance Optimization"], handsOn: ["Deploying AI models to edge devices","Configuring secure edge environments","Monitoring deployed AI applications"], outcome: "Deploy and manage secure, scalable, and high-performing Edge AI systems in production environments." },
      { day: 5, title: "Enterprise Edge AI Project & Assessment", topics: ["End-to-End Edge AI Solution Design","Industry Case Studies","Documentation Standards","Future Trends in Edge AI","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","TensorFlow Lite","TensorFlow","PyTorch","ONNX Runtime","OpenCV","Raspberry Pi","NVIDIA Jetson","Arduino (AI Integration)","Edge Impulse","Docker","Git & GitHub"],
    careers: ["Edge AI Engineer","Embedded AI Engineer","IoT AI Developer","Machine Learning Engineer","Robotics Engineer","Computer Vision Engineer","AI Solutions Architect","Smart Systems Engineer"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified AI Practitioner","Google Professional Machine Learning Engineer","NVIDIA Deep Learning Institute Certifications","Edge Impulse Edge AI Certification"],
    realWorldCases: { intro: "Develop a complete Edge AI solution that includes:", bullets: ["Industry Case Studies","AI model optimization","Deployment on an edge device","IoT integration","Real-time monitoring","Performance evaluation and documentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "AI engineers, embedded systems developers, IoT professionals, robotics engineers, software developers, and technology professionals interested in deploying AI on edge devices." },
      { question: "Is programming experience required?", answer: "Yes. Basic Python programming, machine learning concepts, and familiarity with embedded systems or IoT are recommended for hands-on implementation." },
      { question: "Are practical Edge AI projects included?", answer: "Yes. Every training day includes hands-on labs covering model optimization, TensorFlow Lite deployment, Raspberry Pi and NVIDIA Jetson implementation, IoT integration, Edge AI security, and a comprehensive enterprise Edge AI capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Participants will work with Python, TensorFlow Lite, TensorFlow, PyTorch, ONNX Runtime, OpenCV, Raspberry Pi, NVIDIA Jetson, Arduino, Edge Impulse, Docker, and Git & GitHub." },
      { question: "What skills will I gain?", answer: "You will learn Edge AI architecture, TinyML concepts, AI model optimization, embedded AI deployment, IoT integration, real-time computer vision, edge security, monitoring, performance optimization, and enterprise Edge AI solution development using industry-standard tools and platforms." }
    ]
  },
  "Cybersecurity - Administration": {
    level: "Intermediate",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of cybersecurity concepts, operating systems, networking, and system administration.",
    overview: "The Cybersecurity – Administration course is designed for IT administrators, security administrators, system engineers, and technology professionals responsible for managing secure IT environments. The course covers security administration, identity and access management, endpoint protection, network security, user management, policy implementation, vulnerability management, compliance, monitoring, and administrative best practices. Through hands-on labs, enterprise scenarios, and practical exercises, participants will gain the skills required to administer and maintain secure enterprise systems.",
    objectives: ["Administer enterprise security environments.","Manage users, identities, and access controls.","Configure endpoint and network security.","Implement security policies and compliance.","Monitor security events and system health.","Perform vulnerability and patch management.","Apply cybersecurity administration best practices."],
    days: [
      { day: 1, title: "Security Administration Fundamentals", topics: ["Introduction to Security Administration","Security Policies","User & Group Management","Administrative Controls","Security Baselines","System Hardening","Administrative Best Practices"], handsOn: ["Configuring security settings","Managing user accounts","Applying security baselines"], outcome: "Understand the responsibilities and best practices of administering secure enterprise environments." },
      { day: 2, title: "Identity & Access Management", topics: ["Identity & Access Management (IAM)","Authentication Methods","Multi-Factor Authentication (MFA)","Role-Based Access Control (RBAC)","Privileged Access Management (PAM)","Password Policies","Access Auditing"], handsOn: ["Configuring MFA","Managing user permissions","Implementing RBAC"], outcome: "Secure enterprise resources using effective identity, authentication, and access management techniques." },
      { day: 3, title: "Network & Endpoint Administration", topics: ["Firewall Administration","Endpoint Protection","Antivirus & EDR","Network Security Policies","Patch Management","Device Security","Secure Remote Access"], handsOn: ["Configuring endpoint protection","Managing firewall rules","Deploying security updates"], outcome: "Administer secure networks and endpoints while protecting enterprise systems from common threats." },
      { day: 4, title: "Monitoring, Compliance & Risk Management", topics: ["Security Monitoring","Log Management","Vulnerability Management","Compliance Standards","Risk Assessment","Incident Reporting","Audit Preparation"], handsOn: ["Reviewing security logs","Performing vulnerability scans","Assessing compliance status"], outcome: "Monitor enterprise security, manage vulnerabilities, and maintain compliance with industry standards." },
      { day: 5, title: "Enterprise Administration Project & Assessment", topics: ["Enterprise Administration Case Studies","Security Administration Review","Operational Best Practices","Future Trends in Cybersecurity","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Microsoft Active Directory","Microsoft Defender","Microsoft Entra ID","Kali Linux","Wireshark","Nmap","Nessus Essentials","Windows Server","Linux Administration Tools","Cisco Packet Tracer","Git & GitHub","OpenSSL"],
    careers: ["Cybersecurity Administrator","IT Security Administrator","System Administrator","Identity & Access Administrator","Security Operations Analyst","Network Security Administrator","Infrastructure Security Engineer","Information Security Specialist"],
    certifications: ["CompTIA Security+","Microsoft Certified: Security Operations Analyst (SC-200)","Microsoft Certified: Identity and Access Administrator (SC-300)","Cisco Certified CyberOps Associate","ISC² Certified in Cybersecurity (CC)"],
    realWorldCases: { intro: "Develop a cybersecurity administration plan that includes:", bullets: ["Enterprise Administration Case Studies","User and access management","Endpoint security configuration","Network security controls","Vulnerability management","Compliance checklist","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for system administrators, IT professionals, and security administrators." },
      { question: "Is prior cybersecurity experience required?", answer: "Basic knowledge of networking, operating systems, and cybersecurity fundamentals is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes administration labs, security exercises, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Active Directory, Microsoft Defender, Entra ID, Kali Linux, Wireshark, Nmap, Nessus, Windows Server, Linux tools, and Cisco Packet Tracer." },
      { question: "What skills will I gain?", answer: "You will learn security administration, IAM, endpoint protection, network security, compliance, monitoring, and vulnerability management." }
    ]
  },
  "Cybersecurity - Advanced Concepts": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of cybersecurity, networking, operating systems, security tools, and enterprise security concepts.",
    overview: "The Cybersecurity – Advanced Concepts course is designed for cybersecurity professionals, SOC analysts, security engineers, penetration testers, and IT specialists who want to master advanced security techniques. The course covers advanced threat detection, Zero Trust Architecture, threat intelligence, malware analysis, digital forensics, cloud security, red team vs blue team operations, security automation, and emerging cyber defense strategies. Through hands-on labs, enterprise case studies, and practical projects, participants will gain the expertise needed to secure modern enterprise environments.",
    objectives: ["Implement advanced cybersecurity strategies.","Analyze sophisticated cyber threats.","Apply Zero Trust security principles.","Perform malware and forensic investigations.","Strengthen cloud and enterprise security.","Improve incident detection and response.","Build resilient cyber defense solutions."],
    days: [
      { day: 1, title: "Advanced Security Foundations", topics: ["Advanced Cyber Threats","Zero Trust Architecture","MITRE ATT&CK Framework","Cyber Kill Chain","Threat Modeling","Attack Surface Analysis","Security Architecture Review"], handsOn: ["Mapping attack techniques","Analyzing enterprise threats","Performing security assessments"], outcome: "Understand advanced cyber threats and build proactive security strategies." },
      { day: 2, title: "Threat Intelligence & Malware Analysis", topics: ["Threat Intelligence","Indicators of Compromise (IoCs)","Malware Analysis","Ransomware Defense","Phishing Investigation","Threat Hunting","Security Analytics"], handsOn: ["Investigating malware samples","Identifying IoCs","Performing threat hunting"], outcome: "Develop the skills to detect, investigate, and mitigate sophisticated cyber attacks." },
      { day: 3, title: "Cloud Security & Digital Forensics", topics: ["Cloud Security Architecture","Identity Security","Digital Forensics","Evidence Collection","Log Analysis","Incident Investigation","Data Recovery"], handsOn: ["Analyzing forensic evidence","Investigating cloud incidents","Reviewing security logs"], outcome: "Secure cloud environments and conduct digital forensic investigations using industry best practices." },
      { day: 4, title: "Offensive & Defensive Security", topics: ["Penetration Testing Concepts","Red Team vs Blue Team","Security Automation","SIEM & SOAR","Vulnerability Management","Incident Response","Security Hardening"], handsOn: ["Simulating attack scenarios","Automating security tasks","Strengthening system defenses"], outcome: "Improve enterprise security through offensive testing and defensive security operations." },
      { day: 5, title: "Enterprise Security Project & Assessment", topics: ["Enterprise Security Case Studies","End-to-End Security Strategy","Emerging Cybersecurity Trends","Career Roadmap","Certification Guidance","Final Review","Project Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Kali Linux","Metasploit Framework","Wireshark","Burp Suite","Microsoft Sentinel","Splunk","Wazuh","Zeek","Suricata","Nessus","Volatility","Git & GitHub"],
    careers: ["Senior Cybersecurity Analyst","Security Engineer","Threat Hunter","Incident Response Analyst","Digital Forensics Analyst","SOC Engineer","Penetration Tester","Cybersecurity Consultant"],
    certifications: ["Certified Ethical Hacker (CEH)","CompTIA CySA+","GIAC Certified Incident Handler (GCIH)","GIAC Certified Forensic Analyst (GCFA)","CISSP"],
    realWorldCases: { intro: "Develop an advanced cybersecurity solution that includes:", bullets: ["Enterprise Security Case Studies","Threat assessment","Security architecture review","Threat intelligence integration","Incident response planning","Security monitoring","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for security professionals, SOC analysts, and penetration testers." },
      { question: "Is prior cybersecurity knowledge required?", answer: "Yes. Basic knowledge of cybersecurity and networking is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes practical labs, threat analysis, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Kali Linux, Metasploit, Wireshark, Burp Suite, Splunk, Sentinel, Wazuh, Zeek, Suricata, Nessus, and Volatility." },
      { question: "What skills will I gain?", answer: "You will learn threat intelligence, malware analysis, digital forensics, cloud security, threat hunting, and enterprise cyber defense." }
    ]
  },
  "Cybersecurity - Agentic AI": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of cybersecurity, artificial intelligence, Python programming, cloud computing, and security operations.",
    overview: "The Cybersecurity – Agentic AI course is designed for cybersecurity professionals, SOC analysts, AI engineers, security architects, and DevSecOps teams who want to leverage autonomous AI agents for modern security operations. The course covers AI agents, LLM-powered security assistants, threat detection automation, incident response, security orchestration, retrieval-augmented generation (RAG), multi-agent workflows, governance, and responsible AI practices. Through hands-on labs, enterprise use cases, and practical projects, participants will learn how to design, deploy, and manage intelligent AI agents for cybersecurity.",
    objectives: ["Understand Agentic AI concepts in cybersecurity.","Build AI-powered security assistants.","Automate threat detection and incident response.","Integrate AI agents with enterprise security tools.","Implement secure and responsible AI practices.","Monitor AI agent performance and governance.","Develop enterprise-ready AI security workflows."],
    days: [
      { day: 1, title: "Agentic AI Foundations", topics: ["Introduction to Agentic AI","Large Language Models (LLMs)","AI Agents for Cybersecurity","Prompt Engineering","RAG Fundamentals","Security Use Cases","Responsible AI"], handsOn: ["Creating AI security assistants","Designing prompts","Building knowledge retrieval workflows"], outcome: "Understand the fundamentals of Agentic AI and its role in modern cybersecurity operations." },
      { day: 2, title: "AI-Powered Threat Detection", topics: ["Threat Intelligence","AI-Based Log Analysis","Malware Classification","Phishing Detection","SIEM Integration","Alert Prioritization","Automated Investigations"], handsOn: ["Analyzing security logs with AI","Detecting suspicious activities","Automating alert triage"], outcome: "Use AI agents to improve threat detection, investigation, and security monitoring." },
      { day: 3, title: "Incident Response & Security Automation", topics: ["AI-Driven Incident Response","SOAR Integration","Workflow Automation","Security Playbooks","Multi-Agent Systems","Risk Assessment","Compliance Automation"], handsOn: ["Automating incident response","Building security workflows","Integrating AI with SOAR platforms"], outcome: "Design intelligent security workflows that accelerate response times and reduce manual effort." },
      { day: 4, title: "Governance & Enterprise Deployment", topics: ["AI Governance","Data Privacy","AI Security Risks","Model Evaluation","Enterprise Deployment","Monitoring & Optimization","Future Trends"], handsOn: ["Evaluating AI agent performance","Monitoring AI workflows","Applying governance controls"], outcome: "Deploy secure, compliant, and reliable AI agents within enterprise cybersecurity environments." },
      { day: 5, title: "Enterprise Agentic AI Project & Assessment", topics: ["Enterprise AI Security Case Studies","End-to-End Agentic AI Solution","Project Review","Emerging AI Security Trends","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","OpenAI API","LangChain","LangGraph","Microsoft Copilot for Security","Microsoft Sentinel","Splunk Enterprise","Elastic Security","Docker","Git & GitHub","FAISS / ChromaDB","VS Code"],
    careers: ["AI Security Engineer","Cybersecurity AI Specialist","SOC Automation Engineer","Security Operations Analyst","AI Solutions Architect","DevSecOps Engineer","Security Consultant","Cybersecurity Research Engineer"],
    certifications: ["Microsoft Certified: Security Operations Analyst (SC-200)","Microsoft Applied Skills: Build AI Apps","CompTIA Security+","Certified Ethical Hacker (CEH)","Google Professional Machine Learning Engineer"],
    realWorldCases: { intro: "Develop a complete Agentic AI cybersecurity solution that includes:", bullets: ["Enterprise AI Security Case Studies","AI-powered threat detection","Automated incident response","RAG-enabled knowledge assistant","Multi-agent security workflow","Governance and monitoring","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for cybersecurity professionals, AI engineers, SOC analysts, and DevSecOps teams." },
      { question: "Is programming knowledge required?", answer: "Yes. Basic knowledge of Python and cybersecurity fundamentals is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes practical AI labs, enterprise security scenarios, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, OpenAI API, LangChain, LangGraph, Microsoft Copilot for Security, Microsoft Sentinel, Splunk, Elastic Security, Docker, FAISS/ChromaDB, GitHub, and VS Code." },
      { question: "What skills will I gain?", answer: "You will learn AI agent development, security automation, RAG implementation, threat detection, incident response automation, AI governance, and enterprise Agentic AI deployment." }
    ]
  },
  "Cybersecurity - Analytics": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of cybersecurity, networking, SIEM platforms, log analysis, and security operations.",
    overview: "The Cybersecurity – Analytics course is designed for SOC analysts, threat hunters, security engineers, incident responders, and cybersecurity professionals who want to analyze security data and identify cyber threats using advanced analytics techniques. The course covers security analytics, log analysis, threat intelligence, behavioral analytics, SIEM reporting, anomaly detection, risk analysis, and data-driven security operations. Through hands-on labs, enterprise case studies, and practical projects, participants will gain the skills needed to transform security data into actionable insights.",
    objectives: ["Analyze enterprise security data.","Detect threats using security analytics.","Correlate events across multiple sources.","Perform behavioral and risk analysis.","Build SIEM dashboards and reports.","Improve incident investigations.","Support proactive cyber defense strategies."],
    days: [
      { day: 1, title: "Security Analytics Fundamentals", topics: ["Introduction to Security Analytics","Security Data Sources","Log Collection","Event Correlation","Security Metrics","Risk Indicators","Analytics Best Practices"], handsOn: ["Collecting security logs","Exploring analytics dashboards","Reviewing security events"], outcome: "Understand the fundamentals of cybersecurity analytics and analyze enterprise security data effectively." },
      { day: 2, title: "Threat Intelligence & Behavioral Analytics", topics: ["Threat Intelligence","Indicators of Compromise (IoCs)","User & Entity Behavior Analytics (UEBA)","Threat Hunting","MITRE ATT&CK Framework","Anomaly Detection","Attack Pattern Analysis"], handsOn: ["Investigating suspicious behavior","Correlating threat indicators","Detecting anomalies"], outcome: "Identify advanced threats using behavioral analytics and threat intelligence techniques." },
      { day: 3, title: "SIEM Analytics & Incident Investigation", topics: ["SIEM Analytics","Search Queries","Alert Correlation","Security Dashboards","Incident Investigation","Root Cause Analysis","Security Reporting"], handsOn: ["Creating SIEM dashboards","Investigating security incidents","Building custom reports"], outcome: "Analyze security events efficiently and improve incident investigations using SIEM platforms." },
      { day: 4, title: "Risk Analytics & Automation", topics: ["Risk Scoring","Vulnerability Analytics","Compliance Analytics","Automated Analytics","Security KPIs","Executive Reporting","Continuous Improvement"], handsOn: ["Performing risk analysis","Automating security reports","Measuring security performance"], outcome: "Use analytics to evaluate cyber risks, automate reporting, and improve organizational security posture." },
      { day: 5, title: "Enterprise Analytics Project & Assessment", topics: ["Enterprise Analytics Case Studies","End-to-End Security Analytics","Operational Review","Future Trends in Cybersecurity Analytics","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Splunk Enterprise","Microsoft Sentinel","Elastic Security","IBM QRadar","Wazuh","Microsoft Defender XDR","Wireshark","Zeek","Sysmon","Power BI","Python","Git & GitHub"],
    careers: ["Cybersecurity Analyst","SOC Analyst","Security Analytics Engineer","Threat Intelligence Analyst","Threat Hunter","SIEM Engineer","Incident Response Analyst","Security Consultant"],
    certifications: ["CompTIA CySA+","Microsoft Certified: Security Operations Analyst (SC-200)","Splunk Core Certified Power User","IBM Certified Analyst – QRadar","GIAC Certified Intrusion Analyst (GCIA)"],
    realWorldCases: { intro: "Develop a complete cybersecurity analytics solution that includes:", bullets: ["Enterprise Analytics Case Studies","Security data collection","Threat intelligence integration","SIEM dashboards","Risk analysis","Executive reporting","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for SOC analysts, security engineers, and threat hunters." },
      { question: "Is prior analytics experience required?", answer: "Basic knowledge of cybersecurity, SIEM, and log analysis is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes analytics labs, SIEM exercises, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Splunk, Microsoft Sentinel, Elastic Security, IBM QRadar, Wazuh, Defender XDR, Wireshark, Zeek, Sysmon, Power BI, and Python." },
      { question: "What skills will I gain?", answer: "You will learn security analytics, threat detection, behavioral analysis, SIEM reporting, incident investigation, and risk analysis." }
    ]
  },
  "Cybersecurity - Architecture": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of cybersecurity, networking, cloud computing, enterprise IT infrastructure, and security principles.",
    overview: "The Cybersecurity – Architecture course is designed for security architects, solution architects, cloud engineers, IT managers, and cybersecurity professionals who want to design secure enterprise infrastructures. The course covers security architecture frameworks, Zero Trust Architecture, network segmentation, cloud security, identity management, secure system design, infrastructure protection, governance, and enterprise security strategies. Through hands-on labs, enterprise case studies, and practical projects, participants will gain the skills required to design resilient and scalable cybersecurity architectures.",
    objectives: ["Design enterprise cybersecurity architectures.","Implement Zero Trust security models.","Secure cloud and hybrid infrastructures.","Develop identity and access architectures.","Protect enterprise networks and applications.","Apply security architecture frameworks.","Build resilient and scalable security solutions."],
    days: [
      { day: 1, title: "Security Architecture Fundamentals", topics: ["Introduction to Security Architecture","Security Design Principles","Enterprise Architecture","Defense in Depth","Zero Trust Concepts","Security Frameworks","Architecture Best Practices"], handsOn: ["Designing secure architectures","Evaluating enterprise environments","Applying security frameworks"], outcome: "Understand the core principles of cybersecurity architecture and enterprise security design." },
      { day: 2, title: "Network & Infrastructure Security", topics: ["Network Segmentation","Firewall Architecture","Secure Network Design","DMZ Architecture","VPN Security","Infrastructure Protection","High Availability"], handsOn: ["Designing secure networks","Configuring segmented environments","Reviewing infrastructure security"], outcome: "Design secure network infrastructures that improve resilience and reduce attack surfaces." },
      { day: 3, title: "Identity, Cloud & Application Security", topics: ["Identity & Access Architecture","Zero Trust Access","Cloud Security Architecture","Secure Application Design","API Security","Encryption Architecture","Key Management"], handsOn: ["Designing IAM solutions","Securing cloud resources","Implementing encryption strategies"], outcome: "Build secure identity, cloud, and application architectures using modern cybersecurity practices." },
      { day: 4, title: "Governance, Risk & Monitoring", topics: ["Risk Management","Security Governance","Compliance Standards","Security Monitoring","Logging Architecture","Incident Response Design","Business Continuity"], handsOn: ["Conducting risk assessments","Designing monitoring solutions","Planning disaster recovery"], outcome: "Develop governance-driven security architectures that support monitoring, compliance, and business resilience." },
      { day: 5, title: "Enterprise Architecture Project & Assessment", topics: ["Enterprise Security Architecture Case Studies","End-to-End Architecture Design","Security Review","Future Trends in Cybersecurity","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Microsoft Defender XDR","Microsoft Entra ID","Microsoft Sentinel","AWS Security Hub","Azure Security Center","Wireshark","Nmap","Cisco Packet Tracer","VMware","Kali Linux","Git & GitHub","Draw.io"],
    careers: ["Cybersecurity Architect","Enterprise Security Architect","Cloud Security Architect","Security Consultant","Infrastructure Security Engineer","Information Security Manager","Security Solutions Architect","Cybersecurity Engineer"],
    certifications: ["CISSP (Certified Information Systems Security Professional)","Certified Cloud Security Professional (CCSP)","Microsoft Certified: Cybersecurity Architect Expert (SC-100)","AWS Certified Security – Specialty","SABSA Foundation Certification"],
    realWorldCases: { intro: "Develop a complete cybersecurity architecture that includes:", bullets: ["Enterprise Security Architecture Case Studies","Enterprise security design","Zero Trust implementation","Identity and access architecture","Cloud security framework","Monitoring strategy","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for security architects, cloud engineers, and cybersecurity professionals." },
      { question: "Is prior cybersecurity experience required?", answer: "Yes. Basic knowledge of networking, cloud computing, and cybersecurity fundamentals is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes architecture design labs, enterprise case studies, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Microsoft Defender XDR, Entra ID, Sentinel, AWS Security Hub, Azure Security Center, Wireshark, Nmap, Cisco Packet Tracer, VMware, and Kali Linux." },
      { question: "What skills will I gain?", answer: "You will learn security architecture, Zero Trust, cloud security, IAM, risk management, governance, and enterprise security design." }
    ]
  },
  "Cybersecurity - Automation": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of cybersecurity, Python scripting, networking, Linux administration, SIEM concepts, and security operations.",
    overview: "The Cybersecurity – Automation course is designed for SOC analysts, security engineers, DevSecOps professionals, automation specialists, and cybersecurity practitioners who want to automate security operations and incident response. The course covers security orchestration, automated threat detection, SOAR platforms, scripting, vulnerability management, log analysis, cloud security automation, and AI-assisted security workflows. Through hands-on labs, enterprise case studies, and practical projects, participants will learn how to improve security efficiency and reduce response time using automation technologies.",
    objectives: ["Automate cybersecurity operations and workflows.","Develop security automation scripts.","Implement SOAR solutions for incident response.","Automate vulnerability management processes.","Integrate SIEM and security tools.","Optimize threat detection and response.","Build scalable enterprise security automation solutions."],
    days: [
      { day: 1, title: "Security Automation Fundamentals", topics: ["Introduction to Security Automation","Security Operations Center (SOC)","SOAR Concepts","Automation Workflows","Python for Security","API Fundamentals","Automation Best Practices"], handsOn: ["Creating automation workflows","Writing Python security scripts","Automating routine security tasks"], outcome: "Understand the fundamentals of cybersecurity automation and automate repetitive security operations." },
      { day: 2, title: "Threat Detection & Incident Automation", topics: ["SIEM Integration","Log Collection","Threat Intelligence","Automated Alerting","Incident Response Automation","Playbooks","Case Management"], handsOn: ["Automating threat detection","Creating response playbooks","Managing security incidents"], outcome: "Build automated workflows that detect, investigate, and respond to security incidents efficiently." },
      { day: 3, title: "Vulnerability & Cloud Security Automation", topics: ["Vulnerability Scanning","Patch Automation","Cloud Security Monitoring","Identity Automation","Compliance Automation","Security Policies","Risk Management"], handsOn: ["Automating vulnerability scans","Configuring cloud security workflows","Implementing compliance checks"], outcome: "Automate vulnerability management and cloud security operations while maintaining compliance." },
      { day: 4, title: "DevSecOps & Security Orchestration", topics: ["DevSecOps Automation","CI/CD Security","Container Security","Infrastructure as Code (IaC)","Secrets Management","Security Orchestration","Performance Optimization"], handsOn: ["Securing CI/CD pipelines","Automating container security","Integrating security into DevOps workflows"], outcome: "Implement automated security controls across software development and infrastructure environments." },
      { day: 5, title: "Enterprise Automation Project & Assessment", topics: ["Enterprise Automation Case Studies","End-to-End Security Automation","Operational Review","Future Trends in Security Automation","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Splunk","Microsoft Sentinel","Cortex XSOAR","Shuffle SOAR","TheHive","Wazuh","Wireshark","Nmap","Nessus","Docker","Git & GitHub","Kali Linux"],
    careers: ["Security Automation Engineer","SOC Automation Engineer","SOAR Engineer","Cybersecurity Engineer","DevSecOps Engineer","Incident Response Engineer","Security Operations Analyst","Security Consultant"],
    certifications: ["CompTIA CySA+","Certified Ethical Hacker (CEH)","Microsoft Certified: Security Operations Analyst (SC-200)","GIAC Certified Incident Handler (GCIH)","Splunk Core Certified Power User"],
    realWorldCases: { intro: "Develop a complete cybersecurity automation solution that includes:", bullets: ["Enterprise Automation Case Studies","Security workflow automation","SIEM and SOAR integration","Incident response playbooks","Vulnerability management automation","Compliance monitoring","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for SOC analysts, security engineers, DevSecOps professionals, and automation specialists." },
      { question: "Is prior scripting knowledge required?", answer: "Yes. Basic knowledge of Python scripting and cybersecurity concepts is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes automation labs, SOAR exercises, enterprise scenarios, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, Splunk, Microsoft Sentinel, Cortex XSOAR, Shuffle SOAR, TheHive, Wazuh, Nessus, Nmap, Docker, and Kali Linux." },
      { question: "What skills will I gain?", answer: "You will learn security automation, SOAR implementation, incident response automation, SIEM integration, DevSecOps security, and enterprise workflow automation." }
    ]
  },
  "Cybersecurity - Best Practices": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of cybersecurity, networking, cloud computing, operating systems, and enterprise IT security.",
    overview: "The Cybersecurity – Best Practices course is designed for security professionals, IT managers, system administrators, SOC analysts, and compliance teams who want to implement industry-recognized cybersecurity standards across enterprise environments. The course covers security frameworks, Zero Trust principles, identity management, network protection, cloud security, risk management, incident response, compliance, governance, and operational best practices. Through hands-on labs, enterprise case studies, and practical projects, participants will learn how to build resilient, secure, and compliant IT infrastructures.",
    objectives: ["Apply cybersecurity best practices across enterprise environments.","Implement Zero Trust security principles.","Strengthen network, endpoint, and cloud security.","Improve governance, risk management, and compliance.","Develop effective incident response strategies.","Enhance security monitoring and operations.","Build secure and resilient enterprise infrastructures."],
    days: [
      { day: 1, title: "Security Foundations & Governance", topics: ["Cybersecurity Principles","Defense in Depth","Zero Trust Architecture","Security Governance","Risk Management","Security Policies","Industry Best Practices"], handsOn: ["Assessing security posture","Developing security policies","Performing risk assessments"], outcome: "Understand cybersecurity best practices and establish strong governance for enterprise security." },
      { day: 2, title: "Network, Endpoint & Identity Security", topics: ["Network Security","Firewall Best Practices","Endpoint Protection","Identity & Access Management (IAM)","Multi-Factor Authentication (MFA)","Privileged Access Management (PAM)","Secure Remote Access"], handsOn: ["Configuring security controls","Implementing IAM policies","Securing enterprise endpoints"], outcome: "Apply best practices to protect enterprise networks, identities, and endpoints." },
      { day: 3, title: "Cloud Security & Compliance", topics: ["Cloud Security Best Practices","Data Protection","Encryption","Compliance Standards","Security Auditing","Backup & Recovery","Business Continuity"], handsOn: ["Securing cloud resources","Performing compliance reviews","Configuring encryption policies"], outcome: "Implement secure cloud environments while meeting regulatory and compliance requirements." },
      { day: 4, title: "Security Operations & Incident Response", topics: ["Security Monitoring","SIEM Best Practices","Threat Intelligence","Vulnerability Management","Incident Response","Security Automation","Continuous Improvement"], handsOn: ["Monitoring security events","Responding to incidents","Optimizing security operations"], outcome: "Strengthen enterprise security operations through proactive monitoring and effective incident response." },
      { day: 5, title: "Enterprise Best Practices Project & Assessment", topics: ["Enterprise Security Case Studies","End-to-End Security Strategy","Security Review","Emerging Cybersecurity Trends","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Microsoft Defender XDR","Microsoft Sentinel","Splunk Enterprise","Microsoft Entra ID","AWS Security Hub","Azure Security Center","Wireshark","Nessus","Nmap","Kali Linux","Cisco Secure Firewall","Git & GitHub"],
    careers: ["Cybersecurity Engineer","Security Consultant","Information Security Manager","SOC Analyst","Cloud Security Engineer","Governance, Risk & Compliance (GRC) Specialist","Security Architect","IT Security Administrator"],
    certifications: ["CISSP (Certified Information Systems Security Professional)","CompTIA Security+","CompTIA CySA+","Certified Information Security Manager (CISM)","Microsoft Certified: Cybersecurity Architect Expert (SC-100)"],
    realWorldCases: { intro: "Develop a complete cybersecurity best practices framework that includes:", bullets: ["Enterprise Security Case Studies","Security governance","Identity and access controls","Cloud and network security","Incident response plan","Compliance validation","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for security professionals, IT managers, SOC analysts, and administrators." },
      { question: "Is prior cybersecurity experience required?", answer: "Yes. Basic knowledge of cybersecurity, networking, and cloud security is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes practical labs, enterprise case studies, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Microsoft Defender XDR, Sentinel, Splunk, Entra ID, AWS Security Hub, Azure Security Center, Wireshark, Nessus, Nmap, Kali Linux, and Cisco Secure Firewall." },
      { question: "What skills will I gain?", answer: "You will learn security governance, Zero Trust, cloud security, risk management, compliance, incident response, and enterprise cybersecurity best practices." }
    ]
  },
  "Cybersecurity - Certification Prep": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of cybersecurity, networking, operating systems, cloud computing, and security fundamentals.",
    overview: "The Cybersecurity – Certification Prep course is designed for IT professionals, security analysts, engineers, and aspiring cybersecurity experts preparing for globally recognized cybersecurity certifications. The course covers core security concepts, network security, identity management, cloud security, incident response, risk management, governance, compliance, security operations, and exam-focused practice. Through hands-on labs, mock exams, and real-world scenarios, participants will strengthen both technical knowledge and exam readiness.",
    objectives: ["Master core cybersecurity concepts.","Prepare for leading cybersecurity certification exams.","Apply security best practices in real-world scenarios.","Strengthen incident response and risk management skills.","Perform security assessments and monitoring.","Improve exam confidence through practice tests.","Develop enterprise-ready cybersecurity expertise."],
    days: [
      { day: 1, title: "Cybersecurity Foundations & Exam Domains", topics: ["Security Fundamentals","Network Security","Threat Landscape","Identity & Access Management","Cryptography Basics","Security Frameworks","Exam Strategies"], handsOn: ["Reviewing exam objectives","Practicing security scenarios","Solving domain-based questions"], outcome: "Build a strong foundation in cybersecurity concepts and understand certification exam requirements." },
      { day: 2, title: "Security Operations & Risk Management", topics: ["Security Operations Center (SOC)","Incident Response","Vulnerability Management","Risk Assessment","Compliance Standards","Security Governance","Business Continuity"], handsOn: ["Performing risk analysis","Responding to simulated incidents","Reviewing compliance controls"], outcome: "Develop practical skills in security operations, governance, and enterprise risk management." },
      { day: 3, title: "Cloud, Application & Infrastructure Security", topics: ["Cloud Security","Application Security","API Security","Infrastructure Security","Endpoint Protection","Data Security","Secure Configuration"], handsOn: ["Securing cloud environments","Reviewing application security","Implementing security controls"], outcome: "Understand modern security technologies commonly covered in certification exams." },
      { day: 4, title: "Advanced Topics & Mock Exams", topics: ["Threat Intelligence","Security Monitoring","Digital Forensics","Penetration Testing Concepts","Security Analytics","Mock Exams","Exam Review"], handsOn: ["Completing full-length practice exams","Reviewing incorrect answers","Strengthening weak domains"], outcome: "Improve exam performance through practice tests and focused technical review." },
      { day: 5, title: "Final Review & Capstone Assessment", topics: ["Comprehensive Revision","Enterprise Security Case Studies","Exam Readiness Assessment","Certification Roadmap","Career Planning","Interview Preparation","Final Discussion"], handsOn: [], outcome: "" }
    ],
    tools: ["Kali Linux","Microsoft Defender XDR","Microsoft Sentinel","Splunk Enterprise","Wireshark","Nmap","Nessus","Burp Suite","Metasploit Framework","AWS Security Hub","Microsoft Entra ID","Git & GitHub"],
    careers: ["Cybersecurity Analyst","Security Engineer","SOC Analyst","Network Security Engineer","Cloud Security Engineer","Information Security Specialist","Security Consultant","Incident Response Analyst"],
    certifications: ["CompTIA Security+","Certified Ethical Hacker (CEH)","CompTIA CySA+","CISSP (Certified Information Systems Security Professional)","Microsoft Certified: Security Operations Analyst (SC-200)"],
    realWorldCases: { intro: "Complete a comprehensive cybersecurity assessment that includes:", bullets: ["Enterprise Security Case Studies","Security analysis","Risk assessment","Incident response planning","Security recommendations","Technical documentation","Final presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for professionals preparing for cybersecurity certification exams." },
      { question: "Is prior cybersecurity knowledge required?", answer: "Yes. Basic knowledge of networking and cybersecurity fundamentals is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes practical labs, mock exams, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Kali Linux, Microsoft Defender XDR, Sentinel, Splunk, Wireshark, Nmap, Nessus, Burp Suite, Metasploit, AWS Security Hub, and Entra ID." },
      { question: "What skills will I gain?", answer: "You will strengthen cybersecurity fundamentals, incident response, cloud security, risk management, security operations, and certification exam readiness." }
    ]
  },
  "Cybersecurity - CI/CD": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of cybersecurity, DevOps, Git, software development, Linux, cloud platforms, and container technologies.",
    overview: "The Cybersecurity – CI/CD course is designed for DevSecOps engineers, security engineers, software developers, cloud engineers, and IT professionals who want to integrate security into Continuous Integration and Continuous Deployment (CI/CD) pipelines. The course covers secure software delivery, DevSecOps practices, automated security testing, Infrastructure as Code (IaC) security, container security, secrets management, compliance automation, and pipeline monitoring. Through hands-on labs, enterprise case studies, and practical projects, participants will gain the skills to build secure, automated, and scalable CI/CD pipelines.",
    objectives: ["Build secure CI/CD pipelines.","Integrate automated security testing.","Implement DevSecOps best practices.","Secure containers and Infrastructure as Code.","Manage secrets and credentials securely.","Automate compliance and policy enforcement.","Monitor and optimize secure software delivery."],
    days: [
      { day: 1, title: "DevSecOps & CI/CD Fundamentals", topics: ["CI/CD Architecture","DevSecOps Principles","Secure SDLC","Git Workflows","Pipeline Design","Security Integration","Best Practices"], handsOn: ["Creating CI/CD pipelines","Configuring Git workflows","Implementing security checkpoints"], outcome: "Understand CI/CD architecture and integrate security into every stage of the software development lifecycle." },
      { day: 2, title: "Secure Code & Automated Testing", topics: ["Static Application Security Testing (SAST)","Dynamic Application Security Testing (DAST)","Software Composition Analysis (SCA)","Dependency Scanning","Code Quality","Unit Testing","Security Gates"], handsOn: ["Running SAST scans","Performing dependency analysis","Configuring security gates"], outcome: "Automate code quality and security validation within CI/CD pipelines." },
      { day: 3, title: "Containers, Cloud & Infrastructure Security", topics: ["Docker Security","Kubernetes Security","Infrastructure as Code (IaC)","Terraform Security","Secrets Management","Cloud Security Integration","Image Scanning"], handsOn: ["Securing container images","Scanning Kubernetes workloads","Managing secrets securely"], outcome: "Secure cloud-native applications, containers, and infrastructure throughout the deployment lifecycle." },
      { day: 4, title: "Compliance, Monitoring & Automation", topics: ["Compliance Automation","Policy as Code","Pipeline Monitoring","Security Logging","Incident Response","Performance Optimization","Continuous Improvement"], handsOn: ["Automating compliance checks","Monitoring pipeline security","Optimizing deployment workflows"], outcome: "Implement automated governance, monitoring, and optimization across enterprise CI/CD environments." },
      { day: 5, title: "Enterprise DevSecOps Project & Assessment", topics: ["Enterprise CI/CD Case Studies","End-to-End Secure Pipeline Design","Security Review","Future Trends in DevSecOps","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Git & GitHub","GitHub Actions","Jenkins","GitLab CI/CD","Docker","Kubernetes","Terraform","SonarQube","OWASP ZAP","Trivy","HashiCorp Vault","Microsoft Defender for Cloud"],
    careers: ["DevSecOps Engineer","Cybersecurity Engineer","CI/CD Security Engineer","Cloud Security Engineer","Platform Engineer","Security Automation Engineer","Infrastructure Engineer","Application Security Engineer"],
    certifications: ["Certified Kubernetes Security Specialist (CKS)","GitHub Actions Certification","HashiCorp Terraform Associate","Microsoft Certified: DevOps Engineer Expert (AZ-400)","CompTIA Security+"],
    realWorldCases: { intro: "Develop a secure CI/CD pipeline that includes:", bullets: ["Enterprise CI/CD Case Studies","Source code management","Automated security testing","Container security","IaC validation","Compliance automation","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for DevSecOps engineers, software developers, cloud engineers, and cybersecurity professionals." },
      { question: "Is prior DevOps knowledge required?", answer: "Yes. Basic knowledge of Git, CI/CD concepts, containers, and software development is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes CI/CD pipeline labs, DevSecOps exercises, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "GitHub, GitHub Actions, Jenkins, GitLab CI/CD, Docker, Kubernetes, Terraform, SonarQube, OWASP ZAP, Trivy, HashiCorp Vault, and Microsoft Defender for Cloud." },
      { question: "What skills will I gain?", answer: "You will learn secure CI/CD pipeline development, DevSecOps practices, automated security testing, container security, Infrastructure as Code security, compliance automation, and pipeline monitoring." }
    ]
  },
  "Cybersecurity - Consulting": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of cybersecurity, networking, cloud computing, risk management, and enterprise IT environments.",
    overview: "The Cybersecurity – Consulting course is designed for cybersecurity consultants, security architects, IT managers, auditors, and technology professionals who advise organizations on improving their security posture. The course covers security assessments, risk management, compliance frameworks, governance, security strategy, client engagement, security audits, cloud security consulting, and enterprise cybersecurity planning. Through hands-on case studies, consulting scenarios, and practical projects, participants will develop the expertise needed to deliver professional cybersecurity consulting services.",
    objectives: ["Conduct cybersecurity assessments.","Develop enterprise security strategies.","Perform risk and compliance evaluations.","Recommend security controls and solutions.","Advise clients on governance and best practices.","Prepare security audit reports.","Deliver professional cybersecurity consulting services."],
    days: [
      { day: 1, title: "Cybersecurity Consulting Fundamentals", topics: ["Introduction to Security Consulting","Consulting Lifecycle","Client Requirement Analysis","Security Assessments","Business Risk Analysis","Security Roadmaps","Consulting Best Practices"], handsOn: ["Conducting client interviews","Preparing assessment checklists","Identifying business risks"], outcome: "Understand the consulting process and assess enterprise cybersecurity requirements effectively." },
      { day: 2, title: "Risk, Compliance & Governance", topics: ["Risk Management","ISO/IEC 27001","NIST Cybersecurity Framework","CIS Controls","Security Policies","Governance Models","Compliance Audits"], handsOn: ["Performing compliance reviews","Mapping security controls","Conducting risk assessments"], outcome: "Evaluate organizational risks and recommend governance and compliance improvements." },
      { day: 3, title: "Security Solutions & Cloud Consulting", topics: ["Enterprise Security Architecture","Cloud Security","Identity & Access Management","Zero Trust Architecture","Security Tool Selection","Vendor Evaluation","Cost Optimization"], handsOn: ["Designing security solutions","Evaluating security products","Developing cloud security strategies"], outcome: "Recommend enterprise security solutions that align with business objectives and industry standards." },
      { day: 4, title: "Auditing, Reporting & Client Engagement", topics: ["Security Auditing","Gap Analysis","Executive Reporting","Remediation Planning","Presentation Skills","Stakeholder Communication","Project Documentation"], handsOn: ["Preparing audit reports","Presenting security findings","Developing remediation plans"], outcome: "Create professional cybersecurity reports and communicate security recommendations to stakeholders." },
      { day: 5, title: "Enterprise Consulting Project & Assessment", topics: ["Enterprise Consulting Case Studies","End-to-End Security Assessment","Consulting Review","Future Trends in Cybersecurity","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Microsoft Defender XDR","Microsoft Sentinel","Splunk Enterprise","Nessus","Nmap","Wireshark","CIS Benchmarks","NIST CSF","ISO/IEC 27001 Controls","AWS Security Hub","Microsoft Entra ID","Git & GitHub"],
    careers: ["Cybersecurity Consultant","Information Security Consultant","Security Risk Consultant","Governance, Risk & Compliance (GRC) Consultant","Security Architect","Cloud Security Consultant","IT Security Advisor","Cybersecurity Auditor"],
    certifications: ["CISSP (Certified Information Systems Security Professional)","Certified Information Security Manager (CISM)","ISO/IEC 27001 Lead Implementer","Microsoft Certified: Cybersecurity Architect Expert (SC-100)","CompTIA Security+"],
    realWorldCases: { intro: "Develop a complete cybersecurity consulting engagement that includes:", bullets: ["Enterprise Consulting Case Studies","Security assessment","Risk analysis","Compliance review","Security recommendations","Executive report","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for security consultants, IT managers, auditors, and cybersecurity professionals." },
      { question: "Is prior cybersecurity experience required?", answer: "Yes. Basic knowledge of cybersecurity and enterprise IT environments is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes consulting scenarios, security assessments, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Microsoft Defender XDR, Sentinel, Splunk, Nessus, Nmap, Wireshark, CIS Benchmarks, NIST CSF, ISO 27001 Controls, AWS Security Hub, and Entra ID." },
      { question: "What skills will I gain?", answer: "You will learn security consulting, risk assessment, compliance auditing, governance, security strategy, reporting, and client engagement." }
    ]
  },
  "Cybersecurity - Data Modeling": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of cybersecurity, databases, networking, data management, and security concepts.",
    overview: "The Cybersecurity – Data Modeling course is designed for cybersecurity analysts, data engineers, security architects, SOC professionals, and IT specialists who work with security data. The course covers security data models, log management, threat intelligence data, SIEM data architecture, data classification, secure database design, compliance, and analytics. Through hands-on labs, enterprise case studies, and practical projects, participants will learn how to structure, manage, and secure cybersecurity data for efficient analysis and decision-making.",
    objectives: ["Design secure cybersecurity data models.","Organize security logs and event data.","Build scalable SIEM data architectures.","Apply data classification and governance.","Secure enterprise databases and repositories.","Support threat intelligence and analytics.","Improve security reporting and compliance."],
    days: [
      { day: 1, title: "Security Data Fundamentals", topics: ["Data Modeling Concepts","Security Data Sources","Log Management","Data Classification","Database Fundamentals","Data Governance","Security Best Practices"], handsOn: ["Designing security data models","Classifying sensitive data","Organizing security logs"], outcome: "Understand cybersecurity data structures and build secure data models for enterprise environments." },
      { day: 2, title: "SIEM & Threat Intelligence Data", topics: ["SIEM Data Architecture","Event Correlation","Threat Intelligence Feeds","Log Normalization","Data Pipelines","Security Metadata","Data Retention"], handsOn: ["Building SIEM data pipelines","Normalizing log data","Integrating threat intelligence"], outcome: "Develop structured security data models that support monitoring and threat detection." },
      { day: 3, title: "Secure Database Design", topics: ["Database Security","Access Control","Data Encryption","Backup & Recovery","Secure Storage","Audit Logging","Compliance Requirements"], handsOn: ["Securing databases","Implementing encryption","Configuring audit logs"], outcome: "Protect enterprise security data using secure storage, encryption, and access controls." },
      { day: 4, title: "Analytics & Data Governance", topics: ["Security Analytics","Data Visualization","Compliance Reporting","Data Quality","Governance Frameworks","Performance Optimization","Continuous Monitoring"], handsOn: ["Creating security dashboards","Validating data quality","Monitoring data integrity"], outcome: "Use structured security data for analytics, compliance, and enterprise reporting." },
      { day: 5, title: "Enterprise Data Modeling Project & Assessment", topics: ["Enterprise Security Data Case Studies","End-to-End Data Model Design","Project Review","Future Trends in Security Data","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Microsoft Sentinel","Splunk Enterprise","Elastic Stack (ELK)","Microsoft Defender XDR","SQL Server","MongoDB","PostgreSQL","Azure Data Explorer","Python","Grafana","Git & GitHub","Docker"],
    careers: ["Cybersecurity Data Engineer","Security Analyst","SIEM Engineer","Security Architect","SOC Analyst","Threat Intelligence Analyst","Security Consultant","Data Security Specialist"],
    certifications: ["Microsoft Certified: Security Operations Analyst (SC-200)","CompTIA CySA+","CompTIA Security+","Splunk Core Certified Power User","Certified Information Systems Security Professional (CISSP)"],
    realWorldCases: { intro: "Develop a complete cybersecurity data model that includes:", bullets: ["Enterprise Security Data Case Studies","Security log architecture","Threat intelligence integration","Secure database design","Compliance reporting","Analytics dashboard","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for cybersecurity analysts, data engineers, SIEM engineers, and security architects." },
      { question: "Is prior database knowledge required?", answer: "Yes. Basic knowledge of databases, networking, and cybersecurity fundamentals is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes practical data modeling labs, SIEM exercises, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Microsoft Sentinel, Splunk, Elastic Stack (ELK), Microsoft Defender XDR, SQL Server, MongoDB, PostgreSQL, Azure Data Explorer, Python, Grafana, Docker, and GitHub." },
      { question: "What skills will I gain?", answer: "You will learn security data modeling, SIEM architecture, database security, threat intelligence integration, compliance reporting, analytics, and enterprise data governance." }
    ]
  },
  "Cybersecurity - Development": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of cybersecurity, programming (Python or Java), networking, web technologies, and secure software development concepts.",
    overview: "The Cybersecurity – Development course is designed for software developers, security engineers, DevSecOps professionals, and technology experts who want to build secure applications and integrate security throughout the software development lifecycle (SDLC). The course covers secure coding practices, application security, API security, authentication, encryption, OWASP Top 10, DevSecOps, vulnerability remediation, and secure deployment. Through hands-on labs, real-world case studies, and practical projects, participants will gain the skills needed to develop secure enterprise applications.",
    objectives: ["Develop secure software applications.","Apply secure coding standards.","Protect APIs and web applications.","Implement authentication and encryption.","Identify and remediate security vulnerabilities.","Integrate security into the SDLC.","Follow DevSecOps best practices."],
    days: [
      { day: 1, title: "Secure Development Fundamentals", topics: ["Secure SDLC","Secure Coding Principles","Threat Modeling","OWASP Top 10","Input Validation","Error Handling","Security by Design"], handsOn: ["Reviewing vulnerable code","Implementing secure coding practices","Performing threat modeling"], outcome: "Understand secure software development principles and minimize application security risks." },
      { day: 2, title: "Web & API Security", topics: ["Web Application Security","REST API Security","Authentication & Authorization","OAuth 2.0","JWT Security","Session Management","Secure API Design"], handsOn: ["Securing REST APIs","Implementing authentication","Testing API security"], outcome: "Develop secure web applications and APIs using modern authentication and authorization techniques." },
      { day: 3, title: "Encryption & Vulnerability Management", topics: ["Cryptography Basics","Data Encryption","Secure Password Storage","Vulnerability Assessment","Static Application Security Testing (SAST)","Dynamic Application Security Testing (DAST)","Secure Dependency Management"], handsOn: ["Encrypting application data","Running vulnerability scans","Fixing security issues"], outcome: "Protect sensitive data and identify vulnerabilities before software reaches production." },
      { day: 4, title: "DevSecOps & Security Automation", topics: ["DevSecOps Fundamentals","CI/CD Security","Container Security","Secrets Management","Security Automation","Compliance Checks","Secure Deployment"], handsOn: ["Integrating security into CI/CD","Scanning application containers","Automating security testing"], outcome: "Integrate security throughout the software development lifecycle using DevSecOps practices." },
      { day: 5, title: "Secure Application Project & Assessment", topics: ["Enterprise Security Case Studies","Secure Application Review","Future Trends in Application Security","Career Roadmap","Certification Guidance","Final Review","Project Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Java","OWASP ZAP","Burp Suite Community Edition","SonarQube","Git & GitHub","GitHub Actions","Docker","Postman","OpenSSL","Visual Studio Code","Kali Linux"],
    careers: ["Secure Software Developer","Application Security Engineer","DevSecOps Engineer","Cybersecurity Developer","Security Software Engineer","API Security Engineer","Web Security Specialist","Security Consultant"],
    certifications: ["Certified Secure Software Lifecycle Professional (CSSLP)","CompTIA Security+","Certified Ethical Hacker (CEH)","GIAC Secure Software Programmer (GSSP)","Microsoft Certified: DevOps Engineer Expert"],
    realWorldCases: { intro: "Develop a secure web application that includes:", bullets: ["Enterprise Security Case Studies","Secure authentication","API protection","Encryption implementation","Vulnerability assessment","DevSecOps integration","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for developers, security engineers, and DevSecOps professionals." },
      { question: "Is programming knowledge required?", answer: "Yes. Basic knowledge of Python, Java, or similar programming languages is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes secure coding labs, security testing exercises, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, Java, OWASP ZAP, Burp Suite, SonarQube, Docker, GitHub Actions, Postman, OpenSSL, and Kali Linux." },
      { question: "What skills will I gain?", answer: "You will learn secure coding, application security, API security, encryption, DevSecOps, vulnerability management, and secure software development." }
    ]
  },
  "Cybersecurity - Engineering": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of cybersecurity, networking, Linux/Windows administration, cloud computing, and enterprise IT infrastructure.",
    overview: "The Cybersecurity – Engineering course is designed for security engineers, infrastructure engineers, DevSecOps professionals, and IT specialists who want to design, deploy, and manage enterprise security solutions. The course covers network security engineering, endpoint protection, identity management, cloud security, SIEM deployment, infrastructure hardening, automation, and secure system design. Through hands-on labs, enterprise case studies, and practical projects, participants will gain the technical expertise needed to build and maintain secure enterprise environments.",
    objectives: ["Design and implement enterprise security solutions.","Engineer secure network and endpoint environments.","Deploy identity and access management systems.","Configure SIEM and security monitoring platforms.","Secure cloud infrastructure and workloads.","Automate security operations.","Apply security engineering best practices."],
    days: [
      { day: 1, title: "Security Engineering Fundamentals", topics: ["Security Engineering Principles","Secure Infrastructure Design","Defense in Depth","Zero Trust Architecture","Security Baselines","Risk Assessment","Engineering Best Practices"], handsOn: ["Designing secure infrastructure","Applying security baselines","Assessing enterprise risks"], outcome: "Understand the core principles of cybersecurity engineering and secure infrastructure design." },
      { day: 2, title: "Network & Endpoint Security Engineering", topics: ["Firewall Engineering","Network Segmentation","Endpoint Protection","IDS/IPS Deployment","Secure Remote Access","Wireless Security","Network Hardening"], handsOn: ["Configuring enterprise firewalls","Deploying endpoint security","Hardening network devices"], outcome: "Engineer secure enterprise networks and endpoint protection solutions." },
      { day: 3, title: "Identity, Cloud & Infrastructure Security", topics: ["Identity & Access Management","Microsoft Entra ID","Cloud Security Engineering","Infrastructure Hardening","Encryption","Key Management","Secure Configuration"], handsOn: ["Configuring IAM policies","Securing cloud environments","Implementing encryption"], outcome: "Build secure identity, cloud, and infrastructure solutions using industry best practices." },
      { day: 4, title: "Security Monitoring & Automation", topics: ["SIEM Deployment","Threat Detection","Security Automation","SOAR Fundamentals","Vulnerability Management","Compliance Monitoring","Performance Optimization"], handsOn: ["Deploying SIEM solutions","Automating security workflows","Monitoring enterprise security"], outcome: "Implement monitoring and automation solutions that improve operational efficiency and threat detection." },
      { day: 5, title: "Enterprise Engineering Project & Assessment", topics: ["Enterprise Security Engineering Case Studies","End-to-End Security Deployment","Engineering Review","Future Trends in Cybersecurity","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Microsoft Defender XDR","Microsoft Sentinel","Microsoft Entra ID","Splunk Enterprise","Cisco Secure Firewall","Wireshark","Nmap","Nessus","Docker","VMware","Git & GitHub","Kali Linux"],
    careers: ["Cybersecurity Engineer","Security Infrastructure Engineer","Network Security Engineer","Cloud Security Engineer","DevSecOps Engineer","Security Architect","SOC Engineer","Information Security Engineer"],
    certifications: ["CISSP (Certified Information Systems Security Professional)","Microsoft Certified: Cybersecurity Architect Expert (SC-100)","CompTIA Security+","CompTIA CySA+","AWS Certified Security – Specialty"],
    realWorldCases: { intro: "Develop a complete cybersecurity engineering solution that includes:", bullets: ["Enterprise Security Engineering Case Studies","Secure infrastructure design","Network and endpoint protection","Cloud security implementation","SIEM deployment","Security automation","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for security engineers, DevSecOps professionals, and infrastructure engineers." },
      { question: "Is prior cybersecurity knowledge required?", answer: "Yes. Basic knowledge of networking, cloud computing, and cybersecurity concepts is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes engineering labs, deployment exercises, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Microsoft Defender XDR, Microsoft Sentinel, Entra ID, Splunk, Cisco Secure Firewall, Wireshark, Nmap, Nessus, Docker, VMware, Kali Linux, and GitHub." },
      { question: "What skills will I gain?", answer: "You will learn security engineering, infrastructure protection, cloud security, SIEM deployment, automation, identity management, and enterprise security implementation." }
    ]
  },
  "Cybersecurity - Enterprise Solutions": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of cybersecurity, networking, cloud computing, enterprise IT infrastructure, and security fundamentals.",
    overview: "The Cybersecurity – Enterprise Solutions course is designed for security architects, IT managers, system administrators, and cybersecurity professionals who want to implement enterprise-grade security solutions. The course covers enterprise security architecture, identity and access management, cloud security, endpoint protection, network security, SIEM, compliance, governance, and security operations. Through hands-on labs, real-world case studies, and practical projects, participants will gain the expertise required to secure large-scale enterprise environments.",
    objectives: ["Design enterprise cybersecurity solutions.","Implement identity and access management.","Secure enterprise networks and cloud platforms.","Deploy monitoring and threat detection solutions.","Apply governance and compliance controls.","Improve enterprise security operations.","Build resilient security architectures."],
    days: [
      { day: 1, title: "Enterprise Security Foundations", topics: ["Enterprise Security Architecture","Security Frameworks","Zero Trust Principles","Risk Management","Governance","Security Policies","Infrastructure Planning"], handsOn: ["Assessing enterprise environments","Designing security architecture","Reviewing security policies"], outcome: "Understand enterprise cybersecurity requirements and design secure organizational environments." },
      { day: 2, title: "Identity, Network & Cloud Security", topics: ["Identity & Access Management","Multi-Factor Authentication","Network Security","Firewall Management","Cloud Security","Endpoint Protection","Data Protection"], handsOn: ["Configuring identity services","Securing cloud resources","Implementing network controls"], outcome: "Deploy enterprise security controls across users, networks, endpoints, and cloud platforms." },
      { day: 3, title: "Security Operations & Monitoring", topics: ["SIEM Fundamentals","Security Monitoring","Threat Intelligence","Incident Response","Vulnerability Management","Security Automation","Compliance Monitoring"], handsOn: ["Configuring SIEM","Monitoring security events","Responding to incidents"], outcome: "Strengthen enterprise security operations through continuous monitoring and automated response." },
      { day: 4, title: "Governance & Business Continuity", topics: ["Compliance Standards","Security Auditing","Business Continuity","Disaster Recovery","Security Reporting","Operational Best Practices","Risk Mitigation"], handsOn: ["Conducting compliance reviews","Developing recovery plans","Preparing security reports"], outcome: "Implement governance, compliance, and continuity strategies that support enterprise resilience." },
      { day: 5, title: "Enterprise Security Project & Assessment", topics: ["Enterprise Security Case Studies","End-to-End Security Solution Design","Solution Review","Future Trends in Cybersecurity","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Microsoft Defender XDR","Microsoft Sentinel","Microsoft Entra ID","Splunk Enterprise","AWS Security Hub","Azure Security Center","Cisco Secure Firewall","Wireshark","Nessus","Kali Linux","VMware","Git & GitHub"],
    careers: ["Enterprise Security Engineer","Cybersecurity Architect","Cloud Security Engineer","Security Operations Manager","Information Security Specialist","Security Consultant","Infrastructure Security Engineer","IT Security Manager"],
    certifications: ["CISSP (Certified Information Systems Security Professional)","Microsoft Certified: Cybersecurity Architect Expert (SC-100)","CompTIA Security+","AWS Certified Security – Specialty","Certified Information Security Manager (CISM)"],
    realWorldCases: { intro: "Develop a complete enterprise cybersecurity solution that includes:", bullets: ["Enterprise Security Case Studies","Security architecture","Identity management","Network and cloud protection","Security monitoring","Compliance framework","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for security architects, IT managers, and cybersecurity professionals." },
      { question: "Is prior cybersecurity knowledge required?", answer: "Yes. Basic knowledge of networking, cloud computing, and cybersecurity fundamentals is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes enterprise security labs, case studies, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Microsoft Defender XDR, Sentinel, Entra ID, Splunk, AWS Security Hub, Azure Security Center, Cisco Secure Firewall, Wireshark, Nessus, Kali Linux, VMware, and GitHub." },
      { question: "What skills will I gain?", answer: "You will learn enterprise security architecture, cloud security, identity management, SIEM, governance, compliance, and security operations." }
    ]
  },
  "Cybersecurity - Fundamentals": {
    level: "Beginner to Intermediate",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of computers, operating systems, networking concepts, and internet technologies.",
    overview: "The Cybersecurity – Fundamentals course is designed for students, IT professionals, system administrators, network engineers, and technology enthusiasts who want to build a strong foundation in cybersecurity. The course covers core security concepts, cyber threats, network security, identity and access management, cryptography, endpoint protection, risk management, incident response, and security best practices. Through hands-on labs, practical exercises, and real-world case studies, participants will gain the essential skills required to secure modern IT environments.",
    objectives: ["Understand cybersecurity principles and terminology.","Identify common cyber threats and attack techniques.","Apply basic network and endpoint security controls.","Understand authentication and access management.","Implement cybersecurity best practices.","Recognize security risks and vulnerabilities.","Build a strong foundation for advanced cybersecurity learning."],
    days: [
      { day: 1, title: "Cybersecurity Fundamentals", topics: ["Introduction to Cybersecurity","CIA Triad","Cyber Threat Landscape","Types of Cyber Attacks","Security Terminology","Cybersecurity Frameworks","Security Best Practices"], handsOn: ["Identifying cyber threats","Analyzing attack scenarios","Exploring security frameworks"], outcome: "Understand the core principles of cybersecurity and recognize common threats affecting modern organizations." },
      { day: 2, title: "Network & Endpoint Security", topics: ["Network Security Basics","Firewalls","Intrusion Detection Systems (IDS)","Endpoint Security","Antivirus & EDR","Secure Network Design","Wireless Security"], handsOn: ["Configuring firewall rules","Monitoring network traffic","Securing endpoints"], outcome: "Learn how to secure networks and endpoints against common cyber attacks." },
      { day: 3, title: "Identity, Access & Data Security", topics: ["Identity & Access Management (IAM)","Authentication Methods","Multi-Factor Authentication (MFA)","Password Security","Cryptography Basics","Data Protection","Secure Data Handling"], handsOn: ["Configuring MFA","Encrypting sensitive data","Managing user access"], outcome: "Protect organizational data using authentication, access control, and encryption techniques." },
      { day: 4, title: "Risk Management & Incident Response", topics: ["Risk Assessment","Vulnerability Management","Security Policies","Incident Response Process","Malware Protection","Social Engineering","Security Awareness"], handsOn: ["Performing basic risk assessments","Responding to security incidents","Identifying phishing attacks"], outcome: "Develop the ability to identify risks and respond effectively to cybersecurity incidents." },
      { day: 5, title: "Enterprise Security Project & Assessment", topics: ["Enterprise Security Case Studies","Security Implementation Overview","Emerging Cybersecurity Trends","Career Roadmap","Certification Guidance","Final Review","Project Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Kali Linux","Wireshark","Nmap","Microsoft Defender","Windows Security","Linux Security Tools","OpenSSL","VirtualBox","Git & GitHub","OWASP WebGoat","Burp Suite Community Edition","Cisco Packet Tracer"],
    careers: ["Cybersecurity Analyst","Security Operations Center (SOC) Analyst","IT Security Administrator","Network Security Engineer","Information Security Analyst","Technical Support Engineer","Junior Penetration Tester","Security Consultant"],
    certifications: ["CompTIA Security+","Certified Ethical Hacker (CEH)","Cisco Certified CyberOps Associate","Microsoft Certified: Security, Compliance, and Identity Fundamentals (SC-900)","ISC² Certified in Cybersecurity (CC)"],
    realWorldCases: { intro: "Develop a basic cybersecurity implementation plan that includes:", bullets: ["Enterprise Security Case Studies","Risk identification","Network security measures","Access control strategy","Endpoint protection","Incident response plan","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for beginners, students, IT professionals, and aspiring cybersecurity specialists." },
      { question: "Is prior cybersecurity experience required?", answer: "No. Basic computer and networking knowledge is sufficient." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes practical labs, security exercises, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Kali Linux, Wireshark, Nmap, Burp Suite, Microsoft Defender, OpenSSL, Cisco Packet Tracer, and VirtualBox." },
      { question: "What skills will I gain?", answer: "You will learn cybersecurity fundamentals, network security, endpoint protection, IAM, risk management, incident response, and security best practices." }
    ]
  },
  "Cybersecurity - Governance": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of cybersecurity, risk management, IT governance, compliance frameworks, and enterprise security concepts.",
    overview: "The Cybersecurity – Governance course is designed for security managers, GRC professionals, compliance officers, auditors, IT managers, and cybersecurity leaders responsible for establishing governance frameworks and security policies. The course covers cybersecurity governance, risk management, regulatory compliance, security frameworks, policy development, audit management, business continuity, third-party risk, and enterprise security strategy. Through hands-on workshops, case studies, and practical projects, participants will learn how to align cybersecurity programs with business objectives while ensuring compliance and operational resilience.",
    objectives: ["Establish cybersecurity governance frameworks.","Manage enterprise security risks.","Develop security policies and standards.","Implement compliance and regulatory controls.","Conduct governance audits and assessments.","Strengthen business continuity and resilience.","Align cybersecurity strategy with business goals."],
    days: [
      { day: 1, title: "Governance Fundamentals", topics: ["Cybersecurity Governance Principles","Governance Frameworks","Security Policies & Standards","Organizational Roles","Risk Management Basics","Regulatory Landscape","Governance Best Practices"], handsOn: ["Developing governance policies","Identifying governance gaps","Assessing organizational risks"], outcome: "Understand governance principles and establish a strong foundation for enterprise cybersecurity management." },
      { day: 2, title: "Risk Management & Compliance", topics: ["Enterprise Risk Management","ISO/IEC 27001","NIST Cybersecurity Framework","CIS Controls","Regulatory Compliance","Internal Audits","Third-Party Risk"], handsOn: ["Performing risk assessments","Mapping compliance requirements","Conducting audit reviews"], outcome: "Develop practical skills in managing cybersecurity risks and maintaining regulatory compliance." },
      { day: 3, title: "Security Strategy & Business Continuity", topics: ["Cybersecurity Strategy","Security Program Management","Business Continuity Planning","Disaster Recovery","Incident Governance","Vendor Risk Management","Executive Reporting"], handsOn: ["Creating business continuity plans","Developing security roadmaps","Preparing governance reports"], outcome: "Design governance strategies that support organizational resilience and long-term security objectives." },
      { day: 4, title: "Audit, Monitoring & Continuous Improvement", topics: ["Governance Auditing","Security Metrics","Performance Monitoring","Compliance Reporting","Continuous Improvement","Security Awareness","Operational Reviews"], handsOn: ["Conducting governance audits","Monitoring compliance metrics","Reviewing security performance"], outcome: "Evaluate governance effectiveness and continuously improve enterprise cybersecurity programs." },
      { day: 5, title: "Enterprise Governance Project & Assessment", topics: ["Enterprise Governance Case Studies","End-to-End Governance Framework","Strategic Review","Future Trends in Cybersecurity Governance","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Microsoft Purview","Microsoft Defender XDR","Microsoft Sentinel","Microsoft Entra ID","ServiceNow GRC","Splunk Enterprise","ISO/IEC 27001 Framework","NIST Cybersecurity Framework","CIS Controls","AWS Security Hub","Git & GitHub","Microsoft Compliance Manager"],
    careers: ["Cybersecurity Governance Manager","GRC Consultant","Information Security Manager","Compliance Officer","Security Auditor","Risk Management Specialist","Cybersecurity Consultant","Chief Information Security Officer (CISO) Support"],
    certifications: ["Certified Information Security Manager (CISM)","Certified in Risk and Information Systems Control (CRISC)","CISSP (Certified Information Systems Security Professional)","ISO/IEC 27001 Lead Implementer","Microsoft Certified: Cybersecurity Architect Expert (SC-100)"],
    realWorldCases: { intro: "Develop a complete cybersecurity governance framework that includes:", bullets: ["Enterprise Governance Case Studies","Governance policies","Risk management strategy","Compliance mapping","Business continuity plan","Executive reporting","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for GRC professionals, security managers, compliance officers, auditors, and cybersecurity leaders." },
      { question: "Is prior cybersecurity experience required?", answer: "Yes. Basic knowledge of cybersecurity, risk management, and compliance concepts is recommended." },
      { question: "Are hands-on workshops included?", answer: "Yes. The course includes governance workshops, compliance assessments, case studies, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Microsoft Purview, Microsoft Defender XDR, Microsoft Sentinel, Microsoft Entra ID, ServiceNow GRC, Splunk Enterprise, Microsoft Compliance Manager, ISO/IEC 27001, NIST CSF, CIS Controls, AWS Security Hub, and GitHub." },
      { question: "What skills will I gain?", answer: "You will learn cybersecurity governance, risk management, compliance, policy development, audit management, business continuity planning, and enterprise security strategy." }
    ]
  },
  "Cybersecurity - Hands-on Labs": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of cybersecurity, networking, operating systems, Linux, and enterprise security concepts.",
    overview: "The Cybersecurity – Hands-on Labs course is designed for security analysts, penetration testers, SOC professionals, system administrators, and IT engineers who want practical experience with cybersecurity tools and techniques. The course focuses on real-world lab exercises covering network security, vulnerability assessment, penetration testing, incident response, SIEM monitoring, cloud security, and threat analysis. Through guided labs and enterprise scenarios, participants will develop job-ready cybersecurity skills.",
    objectives: ["Perform practical cybersecurity tasks.","Conduct vulnerability assessments.","Monitor and investigate security events.","Secure networks and endpoints.","Respond to cyber incidents.","Use industry-standard security tools.","Apply cybersecurity best practices in real environments."],
    days: [
      { day: 1, title: "Security & Network Labs", topics: ["Security Fundamentals","Network Scanning","Port Enumeration","Firewall Basics","Traffic Analysis","Security Hardening","Lab Environment Setup"], handsOn: ["Scanning networks with Nmap","Capturing traffic using Wireshark","Configuring firewall rules"], outcome: "Gain practical experience in securing and analyzing enterprise networks." },
      { day: 2, title: "Vulnerability & Web Security Labs", topics: ["Vulnerability Assessment","Web Application Security","OWASP Top 10","API Security","Password Security","Authentication Testing","Secure Configurations"], handsOn: ["Running Nessus scans","Testing applications with Burp Suite","Identifying common vulnerabilities"], outcome: "Develop hands-on skills in identifying and validating security weaknesses." },
      { day: 3, title: "SIEM & Incident Response Labs", topics: ["SIEM Monitoring","Log Analysis","Threat Detection","Alert Investigation","Incident Response","Malware Indicators","Security Reporting"], handsOn: ["Monitoring logs in Splunk","Investigating security alerts","Responding to simulated incidents"], outcome: "Learn to monitor, investigate, and respond to cybersecurity incidents effectively." },
      { day: 4, title: "Cloud & Endpoint Security Labs", topics: ["Cloud Security","Identity Management","Endpoint Protection","Multi-Factor Authentication","Vulnerability Remediation","Security Policies","Compliance Validation"], handsOn: ["Securing cloud resources","Configuring Microsoft Defender","Implementing identity controls"], outcome: "Strengthen cloud and endpoint security through practical implementation exercises." },
      { day: 5, title: "Enterprise Security Challenge & Assessment", topics: ["Enterprise Lab Scenarios","Security Investigation","End-to-End Security Testing","Operational Review","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Kali Linux","Nmap","Wireshark","Nessus","Burp Suite","OWASP ZAP","Splunk Enterprise","Microsoft Defender XDR","Microsoft Sentinel","Metasploit Framework","Git & GitHub","Docker"],
    careers: ["Cybersecurity Analyst","SOC Analyst","Penetration Tester","Security Engineer","Incident Response Analyst","Vulnerability Assessment Engineer","Security Consultant","Network Security Engineer"],
    certifications: ["CompTIA Security+","Certified Ethical Hacker (CEH)","CompTIA CySA+","CompTIA PenTest+","Microsoft Certified: Security Operations Analyst (SC-200)"],
    realWorldCases: { intro: "Complete a practical cybersecurity challenge that includes:", bullets: ["Network assessment","Vulnerability scanning","Incident investigation","Security monitoring","Final security report","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for security analysts, penetration testers, and IT professionals." },
      { question: "Is prior cybersecurity knowledge required?", answer: "Yes. Basic knowledge of networking, Linux, and cybersecurity fundamentals is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The entire course is built around practical labs, enterprise exercises, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Kali Linux, Nmap, Wireshark, Nessus, Burp Suite, OWASP ZAP, Splunk, Microsoft Defender XDR, Sentinel, Metasploit, Docker, and GitHub." },
      { question: "What skills will I gain?", answer: "You will gain practical experience in vulnerability assessment, penetration testing, SIEM monitoring, incident response, cloud security, and enterprise cybersecurity operations." }
    ]
  },
  "Cybersecurity - Implementation": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of cybersecurity, networking, operating systems, cloud computing, and enterprise IT infrastructure.",
    overview: "The Cybersecurity – Implementation course is designed for security engineers, system administrators, network engineers, and IT professionals responsible for deploying cybersecurity solutions in enterprise environments. The course focuses on implementing security controls, network protection, endpoint security, identity management, cloud security, vulnerability management, monitoring, and compliance. Through hands-on labs, real-world implementation scenarios, and practical projects, participants will gain the skills required to deploy and manage secure enterprise infrastructures.",
    objectives: ["Implement enterprise cybersecurity solutions.","Deploy identity and access controls.","Configure network and endpoint security.","Implement cloud security services.","Apply security monitoring and compliance.","Perform vulnerability management.","Secure enterprise IT environments."],
    days: [
      { day: 1, title: "Security Implementation Fundamentals", topics: ["Cybersecurity Implementation Overview","Security Policies","Infrastructure Hardening","Identity & Access Management","Security Baselines","Risk Assessment","Deployment Best Practices"], handsOn: ["Applying security baselines","Configuring security settings","Reviewing deployment plans"], outcome: "Understand the core processes involved in implementing enterprise cybersecurity solutions." },
      { day: 2, title: "Network & Endpoint Security Implementation", topics: ["Firewall Configuration","Network Segmentation","Endpoint Protection","Antivirus & EDR Deployment","Secure Remote Access","Email Security","Wireless Security"], handsOn: ["Configuring firewalls","Deploying endpoint protection","Securing enterprise networks"], outcome: "Implement effective network and endpoint security controls to protect enterprise systems." },
      { day: 3, title: "Cloud Security & Identity Implementation", topics: ["Cloud Security Services","Microsoft Entra ID","Multi-Factor Authentication (MFA)","Privileged Access Management (PAM)","Data Encryption","Backup & Recovery","Compliance Controls"], handsOn: ["Configuring MFA","Securing cloud resources","Implementing encryption"], outcome: "Deploy secure identity and cloud security solutions while protecting organizational data." },
      { day: 4, title: "Monitoring & Vulnerability Management", topics: ["Security Monitoring","SIEM Configuration","Vulnerability Assessment","Patch Management","Incident Response","Log Management","Security Auditing"], handsOn: ["Configuring SIEM","Running vulnerability scans","Monitoring security events"], outcome: "Implement monitoring and vulnerability management processes to maintain a secure environment." },
      { day: 5, title: "Enterprise Implementation Project & Assessment", topics: ["Enterprise Deployment Case Studies","End-to-End Security Implementation","Operational Review","Future Trends in Cybersecurity","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Microsoft Defender XDR","Microsoft Entra ID","Microsoft Sentinel","Kali Linux","Wireshark","Nessus","Nmap","Cisco Secure Firewall","AWS Security Hub","Azure Security Center","Git & GitHub","VMware"],
    careers: ["Cybersecurity Engineer","Security Implementation Engineer","Network Security Engineer","System Security Administrator","Cloud Security Engineer","SOC Analyst","Infrastructure Security Engineer","Security Consultant"],
    certifications: ["CompTIA Security+","Microsoft Certified: Security Operations Analyst (SC-200)","Microsoft Certified: Cybersecurity Architect Expert (SC-100)","AWS Certified Security – Specialty","Certified Ethical Hacker (CEH)"],
    realWorldCases: { intro: "Develop a complete cybersecurity implementation plan that includes:", bullets: ["Enterprise Deployment Case Studies","Network security deployment","Identity management","Endpoint protection","Security monitoring","Compliance validation","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for security engineers, system administrators, and IT professionals." },
      { question: "Is prior cybersecurity knowledge required?", answer: "Yes. Basic knowledge of networking, operating systems, and cybersecurity concepts is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes implementation labs, deployment exercises, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Microsoft Defender XDR, Entra ID, Sentinel, Kali Linux, Wireshark, Nessus, Nmap, Cisco Secure Firewall, AWS Security Hub, Azure Security Center, and VMware." },
      { question: "What skills will I gain?", answer: "You will learn security implementation, endpoint protection, cloud security, identity management, SIEM deployment, vulnerability management, and compliance." }
    ]
  },
  "Cybersecurity - Infrastructure": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of networking, operating systems (Linux/Windows), virtualization, cloud computing, cybersecurity fundamentals, and enterprise IT infrastructure.",
    overview: "The Cybersecurity – Infrastructure course is designed for infrastructure engineers, cybersecurity engineers, cloud administrators, network engineers, DevSecOps professionals, and IT architects responsible for securing enterprise infrastructure. The course covers secure infrastructure design, network security, server hardening, cloud security, virtualization security, endpoint protection, identity management, Zero Trust architecture, Infrastructure as Code (IaC), monitoring, disaster recovery, and infrastructure automation. Through hands-on labs, enterprise case studies, and a comprehensive capstone project, participants will gain the expertise to design, deploy, and manage secure enterprise infrastructure.",
    objectives: ["Design secure enterprise infrastructure.","Implement Zero Trust security architecture.","Secure servers, networks, and endpoints.","Protect cloud and hybrid environments.","Configure identity and access management.","Monitor and automate infrastructure security.","Build resilient, highly available, and compliant infrastructure."],
    days: [
      { day: 1, title: "Secure Infrastructure Foundations", topics: ["Enterprise Infrastructure Architecture","Cybersecurity Principles","Defense in Depth","Zero Trust Architecture","Network Segmentation","Infrastructure Risk Assessment","Security Baselines"], handsOn: ["Designing secure infrastructure","Performing risk assessments","Implementing baseline configurations"], outcome: "Understand secure infrastructure architecture and establish strong security foundations for enterprise environments." },
      { day: 2, title: "Network, Server & Endpoint Security", topics: ["Network Security","Firewall Configuration","IDS/IPS Deployment","Secure DNS & DHCP","Windows Server Hardening","Linux Server Hardening","Endpoint Protection"], handsOn: ["Configuring enterprise firewalls","Hardening Windows and Linux servers","Deploying endpoint security solutions"], outcome: "Secure enterprise networks, operating systems, and endpoint devices using industry best practices." },
      { day: 3, title: "Cloud, Identity & Virtualization Security", topics: ["Cloud Infrastructure Security","Microsoft Azure Security","AWS Security","Identity & Access Management (IAM)","Microsoft Entra ID","VMware Security","Container Security"], handsOn: ["Configuring cloud security policies","Implementing IAM and MFA","Securing virtual machines and containers"], outcome: "Protect hybrid and cloud-native infrastructures using modern identity, virtualization, and cloud security controls." },
      { day: 4, title: "Infrastructure Monitoring & Automation", topics: ["SIEM Integration","Infrastructure Monitoring","Log Management","Security Automation","Infrastructure as Code (IaC)","Compliance Monitoring","Performance Optimization"], handsOn: ["Deploying SIEM monitoring","Automating infrastructure security","Managing compliance policies"], outcome: "Implement continuous monitoring, automated security, and governance across enterprise infrastructure." },
      { day: 5, title: "Enterprise Infrastructure Security Project & Assessment", topics: ["Enterprise Infrastructure Case Studies","End-to-End Infrastructure Security Design","Disaster Recovery & Business Continuity","Infrastructure Security Review","Future Trends in Infrastructure Security","Career Roadmap","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Microsoft Defender for Endpoint","Microsoft Defender for Cloud","Microsoft Sentinel","Microsoft Entra ID","Azure Security Center","AWS Security Hub","VMware vSphere","Docker","Kubernetes","Terraform","Cisco Secure Firewall","Palo Alto Networks NGFW","Wireshark","Nmap","Nessus","Splunk Enterprise","Linux (Ubuntu/RHEL)","Windows Server","Git & GitHub"],
    careers: ["Infrastructure Security Engineer","Cybersecurity Infrastructure Architect","Cloud Security Engineer","Systems Security Engineer","Network Security Engineer","DevSecOps Engineer","Enterprise Infrastructure Architect","Security Consultant","Platform Security Engineer"],
    certifications: ["CISSP (Certified Information Systems Security Professional)","Microsoft Certified: Cybersecurity Architect Expert (SC-100)","Microsoft Certified: Azure Security Engineer Associate (AZ-500)","AWS Certified Security – Specialty","Certified Kubernetes Security Specialist (CKS)","CompTIA Security+","Cisco Certified CyberOps Professional"],
    realWorldCases: { intro: "Design and implement a secure enterprise infrastructure that includes:", bullets: ["Enterprise Infrastructure Case Studies","Secure network architecture","Server and endpoint hardening","Cloud and hybrid infrastructure security","Identity and access management","SIEM monitoring and automation","Disaster recovery planning","Documentation and executive presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for infrastructure engineers, cybersecurity engineers, cloud administrators, DevSecOps professionals, network engineers, and IT architects." },
      { question: "Is prior infrastructure experience required?", answer: "Yes. Participants should have a working knowledge of networking, Linux/Windows administration, virtualization, cloud platforms, and cybersecurity fundamentals." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes extensive practical labs, infrastructure deployment exercises, enterprise security scenarios, and a comprehensive capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Microsoft Defender for Endpoint, Microsoft Defender for Cloud, Microsoft Sentinel, Microsoft Entra ID, Azure Security Center, AWS Security Hub, VMware vSphere, Docker, Kubernetes, Terraform, Cisco Secure Firewall, Palo Alto Networks NGFW, Wireshark, Nmap, Nessus, Splunk Enterprise, Linux, Windows Server, Git, and GitHub." },
      { question: "What skills will I gain?", answer: "You will gain expertise in enterprise infrastructure security, Zero Trust implementation, network and server hardening, cloud and hybrid security, identity management, SIEM integration, Infrastructure as Code (IaC), automation, disaster recovery, compliance, and operational resilience." }
    ]
  },
  "Cybersecurity - Integration": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of cybersecurity, networking, APIs, cloud platforms, operating systems, and enterprise security concepts.",
    overview: "The Cybersecurity – Integration course is designed for security engineers, DevSecOps professionals, cloud architects, SOC analysts, and IT administrators who want to integrate cybersecurity across enterprise systems and applications. The course covers security tool integration, SIEM and SOAR connectivity, identity integration, API security, cloud security integration, threat intelligence platforms, automation workflows, and enterprise security orchestration. Through hands-on labs, real-world scenarios, and practical projects, participants will gain the skills needed to build connected and secure cybersecurity ecosystems.",
    objectives: ["Integrate enterprise security solutions.","Connect SIEM, SOAR, and security tools.","Secure APIs and third-party integrations.","Implement identity and access integration.","Automate security workflows.","Integrate cloud security services.","Build unified security operations."],
    days: [
      { day: 1, title: "Integration Fundamentals", topics: ["Cybersecurity Integration Concepts","Enterprise Security Architecture","Security APIs","Authentication Protocols","Identity Federation","Integration Best Practices","Security Standards"], handsOn: ["Connecting security services","Configuring authentication","Testing secure integrations"], outcome: "Understand the principles of integrating cybersecurity technologies across enterprise environments." },
      { day: 2, title: "SIEM, SOAR & Threat Intelligence", topics: ["SIEM Integration","SOAR Platforms","Log Aggregation","Threat Intelligence Feeds","Security Event Correlation","Incident Automation","Alert Management"], handsOn: ["Integrating SIEM platforms","Configuring SOAR playbooks","Managing security events"], outcome: "Integrate security monitoring and automation platforms for efficient threat detection and response." },
      { day: 3, title: "Cloud & API Security Integration", topics: ["Cloud Security Services","API Security","IAM Integration","Zero Trust Access","Secure Data Exchange","Webhooks","Cloud Monitoring"], handsOn: ["Integrating cloud security tools","Securing REST APIs","Managing identity services"], outcome: "Build secure integrations between cloud platforms, APIs, and enterprise identity systems." },
      { day: 4, title: "Automation & Compliance Integration", topics: ["Security Automation","DevSecOps Integration","Compliance Monitoring","Vulnerability Management","Configuration Management","Security Dashboards","Workflow Optimization"], handsOn: ["Automating compliance checks","Integrating vulnerability scanners","Building security workflows"], outcome: "Automate enterprise security processes while maintaining compliance and operational efficiency." },
      { day: 5, title: "Enterprise Integration Project & Assessment", topics: ["Enterprise Integration Case Studies","End-to-End Security Integration","Operational Review","Future Trends in Cybersecurity","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Microsoft Sentinel","Splunk","Cortex XSOAR","Microsoft Entra ID","Okta","Postman","REST APIs","Wazuh","Git & GitHub","Docker","AWS Security Hub","Microsoft Defender XDR"],
    careers: ["Security Integration Engineer","Cybersecurity Engineer","SIEM Engineer","SOAR Engineer","DevSecOps Engineer","Cloud Security Engineer","Security Architect","Security Consultant"],
    certifications: ["Microsoft Certified: Security Operations Analyst (SC-200)","Microsoft Certified: Cybersecurity Architect Expert (SC-100)","CompTIA CySA+","Certified Ethical Hacker (CEH)","Splunk Core Certified Power User"],
    realWorldCases: { intro: "Develop a complete cybersecurity integration solution that includes:", bullets: ["Enterprise Integration Case Studies","SIEM and SOAR integration","API security implementation","Identity integration","Cloud security connectivity","Automated security workflows","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for security engineers, SOC analysts, and DevSecOps professionals." },
      { question: "Is prior cybersecurity experience required?", answer: "Yes. Basic knowledge of cybersecurity, APIs, and cloud technologies is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes integration labs, automation exercises, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Microsoft Sentinel, Splunk, Cortex XSOAR, Entra ID, Okta, Postman, REST APIs, Docker, Wazuh, AWS Security Hub, and Defender XDR." },
      { question: "What skills will I gain?", answer: "You will learn security integration, SIEM/SOAR connectivity, API security, cloud integration, identity management, and security automation." }
    ]
  },
  "Cybersecurity - Migration": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of cybersecurity, cloud computing, networking, system administration, enterprise IT infrastructure, and security management.",
    overview: "The Cybersecurity – Migration course is designed for security engineers, cloud architects, system administrators, IT managers, and cybersecurity professionals responsible for migrating security infrastructure and services. The course covers migration planning, cloud security migration, identity migration, firewall migration, SIEM migration, endpoint security transition, data protection, compliance, risk management, and post-migration validation. Through hands-on labs, enterprise case studies, and real-world migration projects, participants will gain the expertise to execute secure and seamless cybersecurity migrations.",
    objectives: ["Plan secure cybersecurity migration projects.","Migrate enterprise security platforms.","Transition identity and access systems securely.","Migrate SIEM and monitoring solutions.","Protect sensitive data during migration.","Validate security controls after migration.","Ensure business continuity throughout migration."],
    days: [
      { day: 1, title: "Migration Planning & Assessment", topics: ["Cybersecurity Migration Fundamentals","Infrastructure Assessment","Risk Analysis","Migration Strategy","Security Architecture Review","Compliance Planning","Migration Best Practices"], handsOn: ["Assessing migration readiness","Creating migration plans","Evaluating security risks"], outcome: "Understand migration planning methodologies and prepare secure migration strategies for enterprise environments." },
      { day: 2, title: "Identity & Infrastructure Migration", topics: ["Identity & Access Migration","Active Directory Migration","Cloud Identity Services","Firewall Migration","Network Security Migration","Endpoint Migration","Secure Configuration"], handsOn: ["Migrating user identities","Reconfiguring security devices","Validating access controls"], outcome: "Successfully migrate identity services and security infrastructure while maintaining operational security." },
      { day: 3, title: "SIEM, Cloud & Data Migration", topics: ["SIEM Migration","Log Migration","Cloud Security Migration","Data Protection","Encryption During Migration","Backup & Recovery","Security Validation"], handsOn: ["Migrating SIEM data","Securing cloud workloads","Validating migrated resources"], outcome: "Securely migrate enterprise security platforms, cloud resources, and critical data with minimal disruption." },
      { day: 4, title: "Testing, Monitoring & Optimization", topics: ["Post-Migration Testing","Security Monitoring","Vulnerability Assessment","Performance Optimization","Compliance Verification","Incident Response Validation","Operational Readiness"], handsOn: ["Performing security testing","Monitoring migrated systems","Optimizing security configurations"], outcome: "Validate, optimize, and monitor migrated cybersecurity environments to ensure long-term stability and protection." },
      { day: 5, title: "Enterprise Migration Project & Assessment", topics: ["Enterprise Migration Case Studies","End-to-End Migration Project","Migration Review","Future Trends in Security Migration","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Microsoft Entra ID","Microsoft Sentinel","Microsoft Defender XDR","Splunk Enterprise","AWS Security Hub","Azure Security Center","VMware","Cisco Secure Firewall","Nessus","Wireshark","Git & GitHub","Kali Linux"],
    careers: ["Cybersecurity Migration Engineer","Security Consultant","Cloud Security Engineer","Infrastructure Security Engineer","Security Architect","SOC Engineer","Systems Security Administrator","Information Security Specialist"],
    certifications: ["Microsoft Certified: Cybersecurity Architect Expert (SC-100)","Microsoft Certified: Security Operations Analyst (SC-200)","AWS Certified Security – Specialty","CompTIA Security+","CISSP (Certified Information Systems Security Professional)"],
    realWorldCases: { intro: "Develop a complete cybersecurity migration solution that includes:", bullets: ["Enterprise Migration Case Studies","Migration planning","Identity and infrastructure migration","SIEM and cloud migration","Security validation","Post-migration optimization","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for security engineers, cloud architects, and IT administrators." },
      { question: "Is prior migration experience required?", answer: "Basic knowledge of cybersecurity, cloud platforms, and enterprise infrastructure is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes migration labs, enterprise scenarios, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Microsoft Entra ID, Sentinel, Defender XDR, Splunk, AWS Security Hub, Azure Security Center, VMware, Cisco Secure Firewall, Nessus, Wireshark, and Kali Linux." },
      { question: "What skills will I gain?", answer: "You will learn security migration planning, cloud migration, SIEM migration, identity migration, validation, compliance, and post-migration optimization." }
    ]
  },
  "Cybersecurity - Monitoring": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of cybersecurity, networking, operating systems, SIEM concepts, and security operations.",
    overview: "The Cybersecurity – Monitoring course is designed for SOC analysts, security engineers, incident responders, and IT professionals who want to monitor enterprise environments for cyber threats. The course covers security monitoring, SIEM platforms, log management, threat detection, endpoint monitoring, cloud security monitoring, alert management, incident response, and security analytics. Through hands-on labs, enterprise scenarios, and practical projects, participants will gain the skills needed to detect and respond to security events in real time.",
    objectives: ["Monitor enterprise security environments.","Collect and analyze security logs.","Detect cyber threats using SIEM tools.","Investigate security alerts efficiently.","Monitor cloud and endpoint security.","Improve incident response processes.","Build effective security monitoring strategies."],
    days: [
      { day: 1, title: "Security Monitoring Fundamentals", topics: ["Introduction to Security Monitoring","Security Operations Center (SOC)","Log Management","Event Collection","SIEM Fundamentals","Monitoring Best Practices","Security Metrics"], handsOn: ["Collecting security logs","Configuring monitoring dashboards","Reviewing security events"], outcome: "Understand the fundamentals of enterprise security monitoring and log management." },
      { day: 2, title: "Threat Detection & SIEM", topics: ["Threat Detection","Event Correlation","Alert Management","Threat Intelligence","SIEM Rules","MITRE ATT&CK Mapping","Incident Prioritization"], handsOn: ["Creating SIEM rules","Investigating alerts","Mapping attack techniques"], outcome: "Detect and prioritize security threats using SIEM platforms and threat intelligence." },
      { day: 3, title: "Endpoint & Cloud Monitoring", topics: ["Endpoint Detection & Response (EDR)","Network Monitoring","Cloud Security Monitoring","Identity Monitoring","User Activity Monitoring","Vulnerability Monitoring","Compliance Monitoring"], handsOn: ["Monitoring endpoints","Tracking cloud security events","Reviewing user activities"], outcome: "Monitor endpoints, cloud resources, and user activities to strengthen enterprise security." },
      { day: 4, title: "Incident Response & Automation", topics: ["Incident Response Workflow","Security Automation","SOAR Basics","Threat Hunting","Malware Detection","Reporting","Continuous Monitoring"], handsOn: ["Responding to incidents","Automating security tasks","Performing threat hunting"], outcome: "Improve incident response through automation and proactive threat monitoring." },
      { day: 5, title: "Enterprise Monitoring Project & Assessment", topics: ["Enterprise Monitoring Case Studies","Security Operations Review","Monitoring Optimization","Future Trends in SOC","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Microsoft Sentinel","Splunk Enterprise","Wazuh","Elastic Security","Microsoft Defender XDR","Wireshark","Zeek","Suricata","Sysmon","Nmap","Git & GitHub","Kali Linux"],
    careers: ["SOC Analyst","Security Monitoring Engineer","Cybersecurity Analyst","Incident Response Analyst","Threat Hunter","Security Operations Engineer","SIEM Engineer","Blue Team Analyst"],
    certifications: ["Microsoft Certified: Security Operations Analyst (SC-200)","CompTIA CySA+","GIAC Certified Incident Handler (GCIH)","Splunk Core Certified Power User","Cisco Certified CyberOps Associate"],
    realWorldCases: { intro: "Develop a complete cybersecurity monitoring solution that includes:", bullets: ["Enterprise Monitoring Case Studies","SIEM deployment","Security dashboard creation","Threat detection rules","Alert management","Incident response workflow","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for SOC analysts, security engineers, and IT professionals." },
      { question: "Is prior monitoring experience required?", answer: "Basic knowledge of cybersecurity and networking is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes SIEM labs, monitoring exercises, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Microsoft Sentinel, Splunk, Wazuh, Elastic Security, Defender XDR, Wireshark, Zeek, Suricata, Sysmon, and Kali Linux." },
      { question: "What skills will I gain?", answer: "You will learn SIEM monitoring, threat detection, log analysis, incident response, threat hunting, and security operations." }
    ]
  },
  "Cybersecurity - Operations": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of cybersecurity, networking, operating systems, cloud computing, and security operations.",
    overview: "The Cybersecurity – Operations course is designed for SOC analysts, security engineers, IT administrators, and cybersecurity professionals responsible for managing day-to-day security operations. The course covers Security Operations Center (SOC) processes, SIEM management, incident response, threat intelligence, vulnerability management, endpoint security, cloud security operations, and operational best practices. Through hands-on labs, enterprise case studies, and practical projects, participants will gain the skills needed to maintain secure and resilient enterprise environments.",
    objectives: ["Manage enterprise security operations.","Monitor and investigate security events.","Respond to cybersecurity incidents.","Perform vulnerability management.","Operate SIEM and security monitoring tools.","Secure cloud and endpoint environments.","Improve operational security efficiency."],
    days: [
      { day: 1, title: "Security Operations Fundamentals", topics: ["Security Operations Center (SOC)","Security Policies","Incident Lifecycle","SIEM Fundamentals","Threat Landscape","Operational Procedures","Security Best Practices"], handsOn: ["Configuring SOC workflows","Reviewing security events","Managing operational tasks"], outcome: "Understand core security operations processes and daily SOC activities." },
      { day: 2, title: "Monitoring & Threat Detection", topics: ["Log Management","Threat Detection","Alert Correlation","Threat Intelligence","Endpoint Monitoring","Network Monitoring","Security Dashboards"], handsOn: ["Monitoring SIEM alerts","Investigating threats","Creating dashboards"], outcome: "Detect and analyze security threats using enterprise monitoring solutions." },
      { day: 3, title: "Incident Response & Vulnerability Management", topics: ["Incident Response","Digital Forensics Basics","Vulnerability Assessment","Patch Management","Malware Analysis","Risk Mitigation","Security Reporting"], handsOn: ["Responding to security incidents","Running vulnerability scans","Preparing incident reports"], outcome: "Handle security incidents effectively while reducing enterprise risk through proactive vulnerability management." },
      { day: 4, title: "Cloud Security & Operational Automation", topics: ["Cloud Security Operations","Identity & Access Management","Security Automation","SOAR Basics","Compliance Monitoring","Operational Metrics","Continuous Improvement"], handsOn: ["Securing cloud resources","Automating security workflows","Monitoring compliance"], outcome: "Improve operational efficiency by integrating cloud security and automation into daily security operations." },
      { day: 5, title: "Enterprise Operations Project & Assessment", topics: ["Enterprise Operations Case Studies","End-to-End SOC Operations","Operational Review","Future Trends in Cybersecurity","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Microsoft Sentinel","Microsoft Defender XDR","Splunk Enterprise","Wazuh","Wireshark","Nessus","Nmap","Microsoft Entra ID","AWS Security Hub","Docker","Git & GitHub","Kali Linux"],
    careers: ["SOC Analyst","Cybersecurity Operations Engineer","Security Engineer","Incident Response Analyst","Threat Hunter","Cloud Security Engineer","Information Security Specialist","Security Operations Manager"],
    certifications: ["Microsoft Certified: Security Operations Analyst (SC-200)","CompTIA CySA+","CompTIA Security+","GIAC Certified Incident Handler (GCIH)","Cisco Certified CyberOps Associate"],
    realWorldCases: { intro: "Develop a complete cybersecurity operations solution that includes:", bullets: ["Enterprise Operations Case Studies","Security monitoring","Incident response workflow","Vulnerability management","Cloud security operations","Operational reporting","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for SOC analysts, security engineers, and IT administrators." },
      { question: "Is prior cybersecurity knowledge required?", answer: "Yes. Basic knowledge of networking, operating systems, and cybersecurity concepts is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes SOC labs, incident response exercises, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Microsoft Sentinel, Defender XDR, Splunk, Wazuh, Wireshark, Nessus, Nmap, Microsoft Entra ID, AWS Security Hub, Docker, Kali Linux, and GitHub." },
      { question: "What skills will I gain?", answer: "You will learn SOC operations, SIEM monitoring, incident response, vulnerability management, cloud security operations, automation, and enterprise security management." }
    ]
  },
  "Cybersecurity - Performance Tuning": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of cybersecurity, networking, system administration, SIEM platforms, cloud security, and enterprise IT infrastructure.",
    overview: "The Cybersecurity – Performance Tuning course is designed for security engineers, SOC analysts, infrastructure administrators, and cybersecurity professionals who want to optimize the performance of enterprise security systems. The course covers security infrastructure optimization, SIEM tuning, endpoint performance, firewall optimization, network security tuning, cloud security optimization, alert reduction, threat detection efficiency, and performance monitoring. Through hands-on labs, enterprise case studies, and practical projects, participants will learn how to maximize security effectiveness while maintaining high system performance.",
    objectives: ["Optimize enterprise security infrastructure.","Tune SIEM and security monitoring platforms.","Improve firewall and network performance.","Enhance endpoint security efficiency.","Reduce false positives and alert fatigue.","Optimize cloud security services.","Monitor and improve overall security performance."],
    days: [
      { day: 1, title: "Security Performance Fundamentals", topics: ["Performance Tuning Concepts","Security Infrastructure Assessment","Performance Metrics","Resource Utilization","Capacity Planning","Performance Baselines","Optimization Best Practices"], handsOn: ["Measuring system performance","Creating performance baselines","Identifying bottlenecks"], outcome: "Understand performance optimization techniques and evaluate enterprise security environments effectively." },
      { day: 2, title: "SIEM & Network Performance Tuning", topics: ["SIEM Optimization","Log Collection Tuning","Alert Correlation","Firewall Optimization","IDS/IPS Performance","Network Traffic Analysis","Event Filtering"], handsOn: ["Tuning SIEM rules","Optimizing firewall policies","Reducing unnecessary alerts"], outcome: "Improve the efficiency of SIEM platforms and network security devices through advanced tuning techniques." },
      { day: 3, title: "Endpoint & Cloud Optimization", topics: ["Endpoint Security Performance","EDR Optimization","Cloud Security Performance","Identity Services Optimization","Vulnerability Scan Tuning","Resource Allocation","Policy Optimization"], handsOn: ["Optimizing endpoint protection","Configuring cloud security policies","Improving scan performance"], outcome: "Enhance endpoint and cloud security performance while maintaining strong protection." },
      { day: 4, title: "Monitoring & Continuous Improvement", topics: ["Performance Monitoring","Security Dashboards","Threat Detection Optimization","Automation","Incident Response Efficiency","Compliance Performance","Continuous Improvement"], handsOn: ["Monitoring optimized environments","Automating routine tasks","Evaluating performance metrics"], outcome: "Continuously monitor and optimize cybersecurity operations to improve reliability and operational efficiency." },
      { day: 5, title: "Enterprise Performance Project & Assessment", topics: ["Enterprise Optimization Case Studies","End-to-End Security Performance Review","Operational Best Practices","Future Trends in Cybersecurity","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Microsoft Sentinel","Splunk Enterprise","IBM QRadar","Microsoft Defender XDR","Wireshark","Zeek","Suricata","Wazuh","Nessus","Cisco Secure Firewall","Grafana","Git & GitHub"],
    careers: ["Cybersecurity Performance Engineer","Security Operations Engineer","SIEM Engineer","Security Infrastructure Engineer","SOC Analyst","Network Security Engineer","Cloud Security Engineer","Security Consultant"],
    certifications: ["CompTIA CySA+","Microsoft Certified: Security Operations Analyst (SC-200)","Splunk Enterprise Certified Admin","Cisco CyberOps Professional","GIAC Certified Intrusion Analyst (GCIA)"],
    realWorldCases: { intro: "Develop a complete cybersecurity performance optimization solution that includes:", bullets: ["Enterprise Optimization Case Studies","SIEM performance tuning","Firewall and network optimization","Endpoint security improvements","Cloud security optimization","Monitoring dashboard","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for security engineers, SOC analysts, and infrastructure professionals." },
      { question: "Is prior cybersecurity experience required?", answer: "Yes. Basic knowledge of cybersecurity, networking, and SIEM platforms is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes performance tuning labs, optimization exercises, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Microsoft Sentinel, Splunk, QRadar, Defender XDR, Wireshark, Zeek, Suricata, Wazuh, Nessus, Cisco Secure Firewall, and Grafana." },
      { question: "What skills will I gain?", answer: "You will learn SIEM tuning, network optimization, endpoint performance, cloud security optimization, monitoring, and security performance management." }
    ]
  },
  "Cybersecurity - Reporting": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of cybersecurity, security operations, compliance, SIEM platforms, and data analysis.",
    overview: "The Cybersecurity – Reporting course is designed for SOC analysts, security engineers, compliance officers, auditors, and cybersecurity professionals responsible for creating operational and executive security reports. The course covers security metrics, SIEM reporting, incident reporting, compliance reporting, risk dashboards, vulnerability reporting, executive communication, and data visualization. Through hands-on labs, enterprise case studies, and real-world projects, participants will learn how to transform security data into meaningful reports that support informed business decisions.",
    objectives: ["Design professional cybersecurity reports.","Create executive and operational dashboards.","Analyze security metrics and KPIs.","Prepare compliance and audit reports.","Report security incidents and vulnerabilities.","Visualize security data effectively.","Improve organizational security decision-making."],
    days: [
      { day: 1, title: "Security Reporting Fundamentals", topics: ["Introduction to Security Reporting","Security Metrics & KPIs","Report Types","Data Collection","Security Dashboards","Reporting Standards","Best Practices"], handsOn: ["Collecting security data","Designing report templates","Defining key performance metrics"], outcome: "Understand the purpose of cybersecurity reporting and build meaningful reporting structures." },
      { day: 2, title: "SIEM & Operational Reporting", topics: ["SIEM Reporting","Log Analysis","Incident Reporting","Threat Intelligence Reports","Vulnerability Reports","Operational Dashboards","Alert Summaries"], handsOn: ["Creating SIEM reports","Building operational dashboards","Reporting security events"], outcome: "Generate operational reports that provide visibility into enterprise security activities." },
      { day: 3, title: "Compliance & Executive Reporting", topics: ["Compliance Reporting","Audit Documentation","Risk Reporting","Executive Dashboards","Data Visualization","Governance Reporting","Stakeholder Communication"], handsOn: ["Preparing compliance reports","Designing executive dashboards","Presenting security findings"], outcome: "Develop clear, concise reports for executives, auditors, and regulatory stakeholders." },
      { day: 4, title: "Automation & Advanced Reporting", topics: ["Automated Report Generation","Scheduled Reporting","Security Analytics","Performance Metrics","Trend Analysis","Report Optimization","Continuous Improvement"], handsOn: ["Automating report creation","Analyzing security trends","Optimizing dashboards"], outcome: "Automate reporting workflows and deliver accurate, data-driven security insights." },
      { day: 5, title: "Enterprise Reporting Project & Assessment", topics: ["Enterprise Reporting Case Studies","End-to-End Reporting Solution","Project Review","Future Trends in Security Analytics","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Microsoft Sentinel","Splunk Enterprise","Microsoft Defender XDR","Power BI","Grafana","Kibana","Microsoft Excel","SQL Server","Python","Git & GitHub","Microsoft Purview","Azure Monitor"],
    careers: ["Cybersecurity Analyst","SOC Analyst","Security Reporting Analyst","GRC Analyst","Compliance Analyst","Security Operations Engineer","Information Security Consultant","Risk & Compliance Specialist"],
    certifications: ["CompTIA CySA+","Microsoft Certified: Security Operations Analyst (SC-200)","CompTIA Security+","Certified Information Security Manager (CISM)","CISSP (Certified Information Systems Security Professional)"],
    realWorldCases: { intro: "Develop a complete cybersecurity reporting solution that includes:", bullets: ["Enterprise Reporting Case Studies","Executive dashboard","Incident reporting","Compliance reporting","Security metrics and KPIs","Automated reporting workflow","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for SOC analysts, compliance professionals, security engineers, and cybersecurity managers." },
      { question: "Is prior cybersecurity knowledge required?", answer: "Yes. Basic knowledge of security operations, SIEM platforms, and reporting concepts is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes dashboard creation, reporting exercises, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Microsoft Sentinel, Splunk Enterprise, Microsoft Defender XDR, Power BI, Grafana, Kibana, Excel, SQL Server, Python, Azure Monitor, Microsoft Purview, and GitHub." },
      { question: "What skills will I gain?", answer: "You will learn security reporting, dashboard development, SIEM reporting, compliance reporting, KPI analysis, report automation, and executive communication." }
    ]
  },
  "Cybersecurity - Scripting": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of cybersecurity, networking, Linux, Windows administration, and programming fundamentals.",
    overview: "The Cybersecurity – Scripting course is designed for cybersecurity professionals, SOC analysts, security engineers, penetration testers, and system administrators who want to automate security tasks using scripting. The course covers Python, PowerShell, Bash scripting, log analysis, security automation, API integration, vulnerability scanning, incident response automation, and DevSecOps scripting. Through hands-on labs, enterprise scenarios, and practical projects, participants will develop scripts that improve security operations and reduce manual effort.",
    objectives: ["Develop scripts for cybersecurity automation.","Automate security monitoring and incident response.","Perform log analysis using scripting.","Integrate security tools with APIs.","Automate vulnerability assessment tasks.","Improve SOC and DevSecOps workflows.","Build reusable security automation solutions."],
    days: [
      { day: 1, title: "Scripting Fundamentals", topics: ["Python for Cybersecurity","PowerShell Basics","Bash Scripting","Variables & Functions","File Handling","Error Handling","Scripting Best Practices"], handsOn: ["Writing basic security scripts","Automating file operations","Creating reusable functions"], outcome: "Understand scripting fundamentals and build scripts for common cybersecurity tasks." },
      { day: 2, title: "Log Analysis & Automation", topics: ["Log Parsing","Event Analysis","Regular Expressions","Threat Detection","File Integrity Monitoring","Task Automation","Scheduled Jobs"], handsOn: ["Parsing security logs","Automating alert generation","Monitoring system events"], outcome: "Use scripting to analyze security events and automate repetitive operational tasks." },
      { day: 3, title: "API Integration & Security Tools", topics: ["REST APIs","JSON Processing","API Authentication","SIEM Integration","Vulnerability Scanner APIs","Threat Intelligence APIs","Secure API Requests"], handsOn: ["Connecting to security APIs","Automating SIEM tasks","Retrieving threat intelligence"], outcome: "Integrate enterprise security tools and services through secure scripting techniques." },
      { day: 4, title: "Incident Response & DevSecOps Automation", topics: ["Incident Response Automation","Security Playbooks","CI/CD Security Scripts","Infrastructure Automation","Cloud Automation","Script Testing","Performance Optimization"], handsOn: ["Automating incident response","Building security playbooks","Validating automation workflows"], outcome: "Develop automation scripts that improve security operations, DevSecOps processes, and incident handling." },
      { day: 5, title: "Enterprise Automation Project & Assessment", topics: ["Enterprise Automation Case Studies","End-to-End Security Automation","Project Review","Future Trends in Security Automation","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","PowerShell","Bash","Visual Studio Code","Git & GitHub","Microsoft Sentinel","Splunk Enterprise","Microsoft Defender XDR","Postman","Docker","Linux","Windows Server"],
    careers: ["Cybersecurity Automation Engineer","Security Engineer","SOC Analyst","DevSecOps Engineer","Penetration Tester","Security Operations Engineer","Infrastructure Security Engineer","Security Consultant"],
    certifications: ["CompTIA Security+","CompTIA CySA+","Microsoft Certified: Security Operations Analyst (SC-200)","Certified Ethical Hacker (CEH)","Python Institute PCEP/PCAP"],
    realWorldCases: { intro: "Develop a complete cybersecurity scripting solution that includes:", bullets: ["Enterprise Automation Case Studies","Log analysis automation","API integration","Incident response scripting","Security reporting","Workflow automation","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for cybersecurity professionals, SOC analysts, DevSecOps engineers, and system administrators." },
      { question: "Is programming knowledge required?", answer: "Basic programming knowledge is recommended, but the course begins with scripting fundamentals before progressing to advanced automation." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes scripting labs, automation projects, API integration exercises, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, PowerShell, Bash, Visual Studio Code, Microsoft Sentinel, Splunk, Microsoft Defender XDR, Postman, Docker, GitHub, Linux, and Windows Server." },
      { question: "What skills will I gain?", answer: "You will learn Python, PowerShell, Bash scripting, security automation, API integration, log analysis, incident response automation, and DevSecOps scripting." }
    ]
  },
  "Cybersecurity - Security": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of cybersecurity, networking, operating systems, cloud computing, and enterprise IT infrastructure.",
    overview: "The Cybersecurity – Security course is designed for security analysts, network engineers, system administrators, SOC professionals, and cybersecurity specialists who want to strengthen enterprise security operations. The course covers network security, endpoint protection, cloud security, identity management, threat detection, vulnerability management, incident response, security monitoring, and defense strategies. Through hands-on labs, enterprise case studies, and practical projects, participants will gain the expertise required to secure modern IT environments against evolving cyber threats.",
    objectives: ["Implement enterprise security controls.","Protect networks, endpoints, and cloud environments.","Detect and respond to cyber threats.","Manage vulnerabilities and security risks.","Apply Zero Trust security principles.","Secure enterprise identities and data.","Strengthen organizational cyber resilience."],
    days: [
      { day: 1, title: "Enterprise Security Fundamentals", topics: ["Cybersecurity Principles","Defense in Depth","Zero Trust Security","Security Policies","Threat Landscape","Security Frameworks","Enterprise Best Practices"], handsOn: ["Assessing security posture","Configuring security controls","Reviewing enterprise policies"], outcome: "Understand enterprise security concepts and establish strong defensive strategies against cyber threats." },
      { day: 2, title: "Network & Endpoint Protection", topics: ["Network Security","Firewalls","Intrusion Detection & Prevention (IDS/IPS)","Endpoint Detection & Response (EDR)","Email Security","Wireless Security","Secure Remote Access"], handsOn: ["Configuring firewall policies","Monitoring endpoint security","Securing network infrastructure"], outcome: "Protect enterprise networks and endpoints using modern security technologies and monitoring techniques." },
      { day: 3, title: "Identity, Cloud & Data Security", topics: ["Identity & Access Management (IAM)","Multi-Factor Authentication (MFA)","Privileged Access Management (PAM)","Cloud Security","Data Encryption","Key Management","Data Loss Prevention (DLP)"], handsOn: ["Managing user identities","Implementing encryption","Securing cloud resources"], outcome: "Secure identities, sensitive data, and cloud environments using industry-standard cybersecurity practices." },
      { day: 4, title: "Threat Detection & Incident Response", topics: ["Security Monitoring","SIEM Fundamentals","Threat Intelligence","Vulnerability Management","Incident Response","Digital Forensics Basics","Malware Analysis"], handsOn: ["Investigating security alerts","Performing vulnerability scans","Responding to cyber incidents"], outcome: "Detect, investigate, and respond effectively to cybersecurity threats while minimizing business impact." },
      { day: 5, title: "Enterprise Security Project & Assessment", topics: ["Enterprise Security Case Studies","End-to-End Security Strategy","Security Audit Review","Future Trends in Cybersecurity","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Kali Linux","Wireshark","Nmap","Metasploit Framework","Burp Suite Professional/Community","Microsoft Defender XDR","Microsoft Sentinel","Splunk","Nessus","Cisco Packet Tracer","Git & GitHub","OpenSSL"],
    careers: ["Cybersecurity Engineer","Security Analyst","SOC Analyst","Network Security Engineer","Incident Response Analyst","Vulnerability Management Engineer","Information Security Specialist","Security Consultant"],
    certifications: ["CompTIA Security+","Certified Ethical Hacker (CEH)","CompTIA CySA+","GIAC Security Essentials (GSEC)","Microsoft Certified: Security Operations Analyst (SC-200)"],
    realWorldCases: { intro: "Develop a comprehensive cybersecurity solution that includes:", bullets: ["Enterprise Security Case Studies","Network security implementation","Endpoint protection strategy","Identity and access controls","Threat detection and monitoring","Incident response plan","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for security analysts, network engineers, SOC professionals, and IT administrators." },
      { question: "Is prior cybersecurity experience required?", answer: "Yes. Basic knowledge of networking, operating systems, and cybersecurity concepts is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes practical security labs, threat analysis exercises, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Kali Linux, Wireshark, Nmap, Metasploit, Burp Suite, Microsoft Defender XDR, Sentinel, Splunk, Nessus, and Cisco Packet Tracer." },
      { question: "What skills will I gain?", answer: "You will learn enterprise security, threat detection, endpoint protection, cloud security, SIEM, incident response, and vulnerability management." }
    ]
  },
  "Cybersecurity - Testing": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of cybersecurity, networking, operating systems, web applications, and security concepts.",
    overview: "The Cybersecurity – Testing course is designed for security testers, penetration testers, QA engineers, SOC analysts, and cybersecurity professionals who want to assess the security of enterprise systems and applications. The course covers vulnerability assessment, penetration testing, web application security testing, network security testing, API testing, cloud security validation, compliance testing, and security reporting. Through hands-on labs, real-world attack simulations, and practical projects, participants will gain the skills required to identify, validate, and remediate security vulnerabilities.",
    objectives: ["Perform cybersecurity testing.","Conduct vulnerability assessments.","Execute penetration testing engagements.","Test web applications and APIs securely.","Validate cloud security configurations.","Prepare professional security reports.","Improve enterprise security posture."],
    days: [
      { day: 1, title: "Security Testing Fundamentals", topics: ["Introduction to Security Testing","Testing Methodologies","Vulnerability Assessment","Threat Modeling","Risk Analysis","Security Standards","Testing Best Practices"], handsOn: ["Planning security tests","Identifying attack surfaces","Performing vulnerability scans"], outcome: "Understand security testing methodologies and prepare effective testing strategies." },
      { day: 2, title: "Network & Web Application Testing", topics: ["Network Security Testing","Port Scanning","Firewall Validation","Web Application Testing","OWASP Top 10","Authentication Testing","Session Security"], handsOn: ["Testing network services","Assessing web application security","Validating authentication controls"], outcome: "Identify and assess vulnerabilities in enterprise networks and web applications." },
      { day: 3, title: "API & Cloud Security Testing", topics: ["REST API Security Testing","Authentication & Authorization Testing","Cloud Security Validation","Identity Testing","Data Protection","Secure Configuration Review","Compliance Testing"], handsOn: ["Testing REST APIs","Validating cloud security","Reviewing access controls"], outcome: "Evaluate API and cloud security controls to ensure secure enterprise deployments." },
      { day: 4, title: "Exploitation & Reporting", topics: ["Penetration Testing","Exploit Validation","Privilege Escalation","Post-Exploitation Concepts","Security Reporting","Remediation Planning","Executive Communication"], handsOn: ["Executing controlled penetration tests","Documenting findings","Preparing remediation reports"], outcome: "Validate security weaknesses and communicate findings through professional reports." },
      { day: 5, title: "Enterprise Testing Project & Assessment", topics: ["Enterprise Testing Case Studies","End-to-End Security Assessment","Operational Review","Future Trends in Security Testing","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Kali Linux","Nmap","Wireshark","Burp Suite","OWASP ZAP","Metasploit Framework","Nessus","Nikto","Postman","Microsoft Defender XDR","Git & GitHub","Docker"],
    careers: ["Penetration Tester","Security Tester","Cybersecurity Analyst","Vulnerability Assessment Engineer","Application Security Engineer","SOC Analyst","Security Consultant","Ethical Hacker"],
    certifications: ["Certified Ethical Hacker (CEH)","CompTIA PenTest+","CompTIA Security+","GIAC Penetration Tester (GPEN)","Offensive Security Certified Professional (OSCP)"],
    realWorldCases: { intro: "Develop a complete cybersecurity testing engagement that includes:", bullets: ["Enterprise Testing Case Studies","Vulnerability assessment","Network and web application testing","API security validation","Security report","Remediation recommendations","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for penetration testers, security analysts, QA engineers, and cybersecurity professionals." },
      { question: "Is prior cybersecurity knowledge required?", answer: "Yes. Basic knowledge of networking, operating systems, and cybersecurity concepts is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes penetration testing labs, vulnerability assessments, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Kali Linux, Nmap, Wireshark, Burp Suite, OWASP ZAP, Metasploit, Nessus, Nikto, Postman, Microsoft Defender XDR, Docker, and GitHub." },
      { question: "What skills will I gain?", answer: "You will learn vulnerability assessment, penetration testing, web and API security testing, cloud security validation, remediation planning, and security reporting." }
    ]
  },
  "Cybersecurity - Troubleshooting": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of cybersecurity, networking, operating systems, security tools, and enterprise IT infrastructure.",
    overview: "The Cybersecurity – Troubleshooting course is designed for security engineers, SOC analysts, system administrators, network engineers, and IT professionals responsible for identifying and resolving cybersecurity issues. The course covers troubleshooting security incidents, network and endpoint issues, firewall configuration, SIEM troubleshooting, identity management, cloud security, vulnerability remediation, and performance optimization. Through hands-on labs, real-world scenarios, and practical projects, participants will gain the skills needed to diagnose and resolve enterprise security problems efficiently.",
    objectives: ["Troubleshoot enterprise security issues.","Resolve network and endpoint security problems.","Diagnose SIEM and monitoring failures.","Fix identity and access issues.","Resolve cloud security configuration errors.","Perform vulnerability remediation.","Improve overall security system reliability."],
    days: [
      { day: 1, title: "Troubleshooting Fundamentals", topics: ["Troubleshooting Methodology","Security Incident Analysis","Log Analysis","Root Cause Analysis","Security Documentation","Diagnostic Tools","Best Practices"], handsOn: ["Investigating security issues","Reviewing system logs","Identifying root causes"], outcome: "Understand structured troubleshooting methods and identify common cybersecurity issues." },
      { day: 2, title: "Network & Endpoint Troubleshooting", topics: ["Firewall Issues","Network Connectivity","IDS/IPS Troubleshooting","Endpoint Security","Antivirus & EDR Issues","VPN Problems","DNS & Network Services"], handsOn: ["Resolving firewall errors","Troubleshooting endpoints","Diagnosing network issues"], outcome: "Resolve common network and endpoint security issues affecting enterprise environments." },
      { day: 3, title: "SIEM, Cloud & Identity Troubleshooting", topics: ["SIEM Troubleshooting","Alert Failures","Identity & Access Issues","Cloud Security Problems","Authentication Errors","Log Collection Failures","Security Policy Conflicts"], handsOn: ["Fixing SIEM configurations","Resolving authentication issues","Troubleshooting cloud security"], outcome: "Diagnose and resolve monitoring, cloud, and identity-related security problems." },
      { day: 4, title: "Vulnerability Management & Optimization", topics: ["Vulnerability Assessment","Patch Management","Security Configuration Review","Performance Optimization","Compliance Validation","Security Auditing","Preventive Maintenance"], handsOn: ["Fixing vulnerabilities","Optimizing security settings","Validating compliance"], outcome: "Improve system stability through vulnerability remediation and security optimization." },
      { day: 5, title: "Enterprise Troubleshooting Project & Assessment", topics: ["Enterprise Troubleshooting Case Studies","End-to-End Security Investigation","Operational Review","Future Trends in Cybersecurity","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Microsoft Sentinel","Microsoft Defender XDR","Splunk Enterprise","Wireshark","Nmap","Nessus","Wazuh","Sysmon","Kali Linux","Cisco Secure Firewall","Git & GitHub","VMware"],
    careers: ["Cybersecurity Engineer","Security Operations Analyst","SOC Analyst","Incident Response Engineer","Network Security Engineer","System Security Administrator","Security Consultant","Infrastructure Security Engineer"],
    certifications: ["CompTIA Security+","CompTIA CySA+","Microsoft Certified: Security Operations Analyst (SC-200)","Certified Ethical Hacker (CEH)","GIAC Certified Incident Handler (GCIH)"],
    realWorldCases: { intro: "Develop a complete cybersecurity troubleshooting solution that includes:", bullets: ["Enterprise Troubleshooting Case Studies","Incident investigation","Network troubleshooting","SIEM issue resolution","Vulnerability remediation","Performance optimization","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for security engineers, SOC analysts, and IT administrators." },
      { question: "Is prior cybersecurity knowledge required?", answer: "Yes. Basic knowledge of networking and cybersecurity fundamentals is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes troubleshooting labs, incident investigations, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Microsoft Sentinel, Defender XDR, Splunk, Wireshark, Nmap, Nessus, Wazuh, Sysmon, Cisco Secure Firewall, Kali Linux, and VMware." },
      { question: "What skills will I gain?", answer: "You will learn incident troubleshooting, network security diagnostics, SIEM troubleshooting, vulnerability remediation, cloud security troubleshooting, and performance optimization." }
    ]
  },
  "Generative AI - Administration": {
    level: "Intermediate",
    scheduleDays: 5,
    prerequisites: "Basic understanding of Artificial Intelligence, Generative AI concepts, cloud computing, and familiarity with AI platforms or APIs is recommended.",
    overview: "The Generative AI – Administration course is designed for AI administrators, cloud engineers, IT professionals, system administrators, and technology managers responsible for managing Generative AI platforms in enterprise environments. The course focuses on AI platform administration, user and access management, model governance, infrastructure management, security, monitoring, cost optimization, and operational best practices. Through hands-on labs and enterprise scenarios, participants will learn how to administer, maintain, and optimize Generative AI environments efficiently.",
    objectives: ["Understand Generative AI platform administration.","Manage users, permissions, and AI resources.","Configure enterprise AI environments.","Monitor AI services and system performance.","Apply governance, security, and compliance controls.","Optimize operational costs and resource utilization.","Maintain reliable and scalable AI platforms."],
    days: [
      { day: 1, title: "Generative AI Administration Fundamentals", topics: ["Introduction to AI Administration","Enterprise AI Platforms","User & Role Management","Workspace Configuration","AI Resource Management","Access Control","Administrative Best Practices"], handsOn: ["Configuring AI workspaces","Managing users and permissions","Creating administrative policies"], outcome: "Understand the responsibilities of administering enterprise Generative AI platforms and managing organizational resources." },
      { day: 2, title: "AI Infrastructure & Model Management", topics: ["Model Management","API Administration","Deployment Configuration","Cloud AI Services","Storage Management","Model Version Control","Resource Allocation"], handsOn: ["Managing AI models","Configuring deployment environments","Monitoring resource utilization"], outcome: "Learn how to manage AI models and infrastructure for reliable enterprise operations." },
      { day: 3, title: "Security, Governance & Compliance", topics: ["AI Security Fundamentals","Identity & Access Management","API Key Management","Data Privacy","Responsible AI Policies","Compliance Requirements","Governance Frameworks"], handsOn: ["Configuring security settings","Managing API credentials","Applying governance controls"], outcome: "Implement secure and compliant administration practices for enterprise Generative AI environments." },
      { day: 4, title: "Monitoring, Optimization & Automation", topics: ["Platform Monitoring","Usage Analytics","Cost Optimization","Performance Monitoring","Alert Management","Administrative Automation","Backup & Recovery"], handsOn: ["Monitoring AI platform health","Automating administrative tasks","Optimizing AI resource usage"], outcome: "Monitor, automate, and optimize enterprise AI environments to improve efficiency and reduce operational costs." },
      { day: 5, title: "Enterprise Administration Project & Assessment", topics: ["Enterprise Administration Case Studies","AI Platform Audit","Administration Best Practices","Future Trends in AI Operations","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["OpenAI API","Microsoft Azure AI Foundry","Google Vertex AI","AWS Bedrock","Anthropic Claude","LangChain","MLflow","Docker","Git & GitHub","Python","Jupyter Notebook","Grafana"],
    careers: ["Generative AI Administrator","AI Platform Administrator","AI Operations Engineer","Cloud AI Administrator","AI Infrastructure Engineer","MLOps Engineer","AI Support Engineer","AI Systems Administrator"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Google Professional Machine Learning Engineer","AWS Certified AI Practitioner","AWS Certified Machine Learning Engineer – Associate","Microsoft Azure AI Fundamentals (AI-900)"],
    realWorldCases: { intro: "Develop an enterprise Generative AI administration solution that includes:", bullets: ["Enterprise Administration Case Studies","User and role management","AI platform configuration","Security implementation","Performance monitoring","Governance documentation","Administrative reporting and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for AI administrators, cloud engineers, IT professionals, and AI operations teams." },
      { question: "Is prior Generative AI experience required?", answer: "Basic knowledge of AI concepts and cloud platforms is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes administration exercises, platform configuration labs, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "OpenAI API, Azure AI Foundry, Google Vertex AI, AWS Bedrock, Claude, LangChain, MLflow, Docker, Python, Grafana, Git & GitHub." },
      { question: "What skills will I gain?", answer: "You will learn AI platform administration, user management, security, governance, monitoring, resource optimization, and enterprise AI operations." }
    ]
  },
  "Generative AI - Advanced Concepts": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Generative AI, Python programming, Large Language Models (LLMs), prompt engineering, APIs, and familiarity with AI development frameworks.",
    overview: "The Generative AI – Advanced Concepts course is designed for AI engineers, Machine Learning engineers, software developers, researchers, and technology professionals who want to master advanced Generative AI techniques. The course covers advanced prompt engineering, Retrieval-Augmented Generation (RAG), fine-tuning strategies, AI agents, multimodal AI, reasoning models, Model Context Protocol (MCP), Agent-to-Agent (A2A) communication, AI governance, and production-ready GenAI architectures. Through hands-on labs, enterprise case studies, and practical projects, participants will gain the expertise required to build intelligent and scalable Generative AI applications.",
    objectives: ["Apply advanced Generative AI techniques to enterprise applications.","Build RAG-based and knowledge-driven AI solutions.","Develop intelligent AI agents and multi-agent workflows.","Explore fine-tuning and model optimization techniques.","Implement multimodal AI applications.","Deploy secure and scalable Generative AI systems.","Apply governance and Responsible AI best practices."],
    days: [
      { day: 1, title: "Advanced LLMs & Prompt Engineering", topics: ["Advanced LLM Architecture","Prompt Engineering Strategies","Chain-of-Thought Prompting","ReAct Framework","Structured Output Generation","Context Window Management","Prompt Optimization"], handsOn: ["Designing advanced prompts","Optimizing LLM responses","Comparing prompting techniques"], outcome: "Master advanced prompting strategies to improve reasoning, accuracy, and consistency in LLM applications." },
      { day: 2, title: "RAG, Fine-Tuning & Knowledge Systems", topics: ["Advanced RAG Architecture","Embeddings","Vector Databases","Fine-Tuning Concepts","LoRA & QLoRA Overview","Semantic Search","Knowledge Management"], handsOn: ["Building advanced RAG pipelines","Creating embedding-based search","Evaluating retrieval quality"], outcome: "Develop knowledge-driven AI applications using RAG architectures and modern model customization techniques." },
      { day: 3, title: "AI Agents & Intelligent Automation", topics: ["AI Agents","Multi-Agent Systems","LangGraph Workflows","Model Context Protocol (MCP)","Agent-to-Agent (A2A) Communication","Tool Calling","Autonomous Decision Making"], handsOn: ["Developing AI agents","Building multi-agent workflows","Integrating external tools"], outcome: "Create autonomous AI systems capable of collaborating, reasoning, and executing complex workflows." },
      { day: 4, title: "Multimodal AI, Security & Governance", topics: ["Multimodal AI Models","Vision-Language Models","AI Safety","Guardrails","Responsible AI","Governance Frameworks","Performance Optimization"], handsOn: ["Exploring multimodal AI applications","Implementing AI guardrails","Evaluating model safety"], outcome: "Build secure, multimodal Generative AI applications while applying Responsible AI and governance principles." },
      { day: 5, title: "Enterprise GenAI Project & Assessment", topics: ["Enterprise GenAI Case Studies","End-to-End AI Solution","Production Readiness Review","Future Trends in Generative AI","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","OpenAI API","Google Gemini API","Anthropic Claude API","LangChain","LangGraph","LlamaIndex","Hugging Face Transformers","Pinecone","ChromaDB","FAISS","MLflow","Docker","Git & GitHub","Jupyter Notebook"],
    careers: ["Senior Generative AI Engineer","LLM Engineer","AI Solutions Architect","AI Research Engineer","Generative AI Consultant","Machine Learning Engineer","AI Platform Engineer","Applied AI Engineer"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Google Professional Machine Learning Engineer","AWS Certified AI Practitioner","IBM Generative AI Engineering Professional Certificate","TensorFlow Developer Certificate"],
    realWorldCases: { intro: "Develop an advanced Generative AI solution that includes:", bullets: ["Enterprise GenAI Case Studies","Advanced prompt engineering","RAG implementation","AI agent workflow","Multimodal AI integration","Governance and security controls","Documentation and project presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for AI engineers, ML engineers, software developers, and professionals working with LLMs." },
      { question: "Is prior Generative AI experience required?", answer: "Yes. Participants should have knowledge of Python, APIs, prompt engineering, and Generative AI fundamentals." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes advanced AI labs, RAG implementation, AI agent development, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, OpenAI API, Gemini API, Claude API, LangChain, LangGraph, LlamaIndex, Hugging Face, Pinecone, ChromaDB, FAISS, MLflow, Docker, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn advanced prompting, RAG development, AI agents, multimodal AI, model optimization, governance, and enterprise Generative AI solution development." }
    ]
  },
  "Generative AI - Agentic AI": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Generative AI, Python programming, APIs, prompt engineering, and familiarity with Large Language Models (LLMs).",
    overview: "The Generative AI – Agentic AI course is designed for AI engineers, developers, solution architects, and technology professionals who want to build autonomous AI agents capable of planning, reasoning, decision-making, and task execution. The course focuses on AI agent architectures, multi-agent systems, memory management, tool usage, workflow automation, Retrieval-Augmented Generation (RAG), security, and enterprise deployment. Through hands-on labs and real-world projects, participants will learn how to develop intelligent AI agents for business automation and enterprise applications.",
    objectives: ["Understand Agentic AI architecture and workflows.","Build autonomous AI agents using modern frameworks.","Implement planning, reasoning, and memory capabilities.","Integrate AI agents with enterprise tools and APIs.","Develop multi-agent collaboration systems.","Apply security and Responsible AI practices.","Deploy production-ready AI agents."],
    days: [
      { day: 1, title: "Agentic AI Fundamentals", topics: ["Introduction to Agentic AI","AI Agent Architecture","Agent Lifecycle","Prompt Engineering","Planning & Reasoning","Memory Concepts","Agent Design Principles"], handsOn: ["Building a basic AI agent","Creating reasoning workflows","Configuring agent memory"], outcome: "Understand how autonomous AI agents think, plan, and execute tasks using modern AI architectures." },
      { day: 2, title: "Intelligent Agents & Tool Integration", topics: ["LangChain Agents","LangGraph","Function Calling","Tool Integration","API Connectivity","Task Automation","Workflow Orchestration"], handsOn: ["Developing AI agents","Integrating external APIs","Automating business workflows"], outcome: "Develop intelligent AI agents capable of interacting with external tools and enterprise systems." },
      { day: 3, title: "Multi-Agent Systems & RAG", topics: ["Multi-Agent Collaboration","Agent Communication","Retrieval-Augmented Generation (RAG)","Embeddings","Vector Databases","Knowledge Retrieval","Decision Making"], handsOn: ["Building multi-agent systems","Developing RAG-powered agents","Implementing collaborative workflows"], outcome: "Create advanced AI agents that collaborate, retrieve enterprise knowledge, and solve complex business tasks." },
      { day: 4, title: "Deployment, Security & Optimization", topics: ["Agent Deployment","FastAPI","Docker","AI Security","Responsible AI","Performance Optimization","Monitoring"], handsOn: ["Deploying AI agents","Securing agent workflows","Optimizing agent performance"], outcome: "Deploy secure, scalable, and efficient AI agents for enterprise production environments." },
      { day: 5, title: "Enterprise Agentic AI Project & Assessment", topics: ["Enterprise Agent Case Studies","End-to-End AI Agent Development","Future Trends in Agentic AI","Career Roadmap","Certification Guidance","Final Review","Project Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","OpenAI API","Google Gemini API","Anthropic Claude API","LangChain","LangGraph","CrewAI","AutoGen","LlamaIndex","Pinecone","FastAPI","Docker","Git & GitHub","Jupyter Notebook"],
    careers: ["Agentic AI Engineer","Generative AI Engineer","AI Solutions Architect","LLM Engineer","AI Application Developer","AI Automation Engineer","MLOps Engineer","AI Consultant"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Google Professional Machine Learning Engineer","AWS Certified AI Practitioner","IBM Generative AI Engineering Professional Certificate","Google Professional Cloud Developer"],
    realWorldCases: { intro: "Develop a complete Agentic AI solution that includes:", bullets: ["Enterprise Agent Case Studies","Autonomous AI agent","Multi-agent collaboration","RAG implementation","Enterprise API integration","Secure deployment","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for AI engineers, developers, architects, and automation professionals." },
      { question: "Is prior Generative AI experience required?", answer: "Yes. Basic knowledge of Python, APIs, and Generative AI concepts is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes AI agent labs, enterprise exercises, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, OpenAI API, Gemini API, Claude API, LangChain, LangGraph, CrewAI, AutoGen, LlamaIndex, Pinecone, FastAPI, Docker, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn autonomous AI agent development, multi-agent systems, RAG implementation, workflow automation, deployment, security, and enterprise Agentic AI engineering." }
    ]
  },
  "Generative AI - Analytics": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Generative AI, Python programming, APIs, data analytics, cloud platforms, and familiarity with Large Language Models (LLMs).",
    overview: "The Generative AI – Analytics course is designed for AI engineers, data analysts, business intelligence professionals, data scientists, and technology experts who want to analyze and optimize Generative AI applications. The course focuses on AI performance analytics, prompt analytics, user behavior analysis, token usage, model evaluation, business intelligence dashboards, cost analysis, operational insights, and data-driven decision-making. Through hands-on labs, enterprise case studies, and practical projects, participants will gain expertise in measuring and improving Generative AI performance across enterprise environments.",
    objectives: ["Analyze the performance of Generative AI applications.","Measure prompt quality and LLM response effectiveness.","Track token usage, costs, and user engagement.","Build AI analytics dashboards and reports.","Evaluate model performance using analytical metrics.","Generate business insights from AI usage data.","Optimize AI systems through data-driven decisions."],
    days: [
      { day: 1, title: "Generative AI Analytics Fundamentals", topics: ["Introduction to AI Analytics","AI Performance Metrics","LLM Usage Analytics","Data Collection Methods","Analytics Architecture","Business KPIs","Reporting Fundamentals"], handsOn: ["Collecting AI usage data","Defining performance metrics","Exploring analytics dashboards"], outcome: "Understand how analytics supports the measurement and continuous improvement of enterprise Generative AI solutions." },
      { day: 2, title: "Prompt & User Analytics", topics: ["Prompt Analytics","User Interaction Analysis","Token Consumption","Response Quality Metrics","Conversation Analytics","Usage Trends","Behavioral Insights"], handsOn: ["Analyzing prompts","Measuring user engagement","Evaluating AI responses"], outcome: "Learn how to evaluate prompt effectiveness and user interactions to improve AI response quality." },
      { day: 3, title: "Model Evaluation & Cost Analytics", topics: ["Model Performance Evaluation","Accuracy Assessment","Latency Analysis","Cost Optimization","Resource Utilization","AI Benchmarking","Comparative Analytics"], handsOn: ["Evaluating LLM performance","Comparing AI models","Optimizing operational costs"], outcome: "Analyze model performance, operational efficiency, and cost metrics to maximize business value." },
      { day: 4, title: "Dashboards, Visualization & Business Insights", topics: ["AI Dashboard Design","Data Visualization","Operational Reporting","Executive Dashboards","Trend Analysis","Predictive Analytics","Decision Support Systems"], handsOn: ["Building analytics dashboards","Visualizing AI metrics","Generating business reports"], outcome: "Create meaningful dashboards and reports that support business decisions and AI optimization." },
      { day: 5, title: "Enterprise Analytics Project & Assessment", topics: ["Enterprise Analytics Case Studies","End-to-End Analytics Solution","Performance Review","Future Trends in AI Analytics","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","OpenAI API","Google Gemini API","LangSmith","Langfuse","MLflow","Power BI","Tableau","Grafana","Prometheus","Pandas","Jupyter Notebook","Git & GitHub"],
    careers: ["Generative AI Analyst","AI Data Analyst","AI Business Intelligence Analyst","AI Performance Engineer","MLOps Engineer","AI Operations Analyst","Data Scientist","AI Solutions Consultant"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Google Professional Machine Learning Engineer","AWS Certified AI Practitioner","Microsoft Power BI Data Analyst Associate (PL-300)","IBM Generative AI Engineering Professional Certificate"],
    realWorldCases: { intro: "Develop a complete Generative AI analytics solution that includes:", bullets: ["Enterprise Analytics Case Studies","AI usage data collection","Prompt and model performance analysis","Dashboard creation","Cost and usage reporting","Business insights generation","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for AI engineers, data analysts, BI professionals, and AI operations teams." },
      { question: "Is prior Generative AI experience required?", answer: "Yes. Basic knowledge of Generative AI, Python, APIs, and analytics concepts is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes analytics exercises, dashboard development, reporting labs, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, OpenAI API, Gemini API, LangSmith, Langfuse, MLflow, Power BI, Tableau, Grafana, Prometheus, Pandas, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn AI performance analytics, prompt evaluation, dashboard development, cost analysis, reporting, business intelligence, and enterprise Generative AI optimization." }
    ]
  },
  "Generative AI - API Development": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Python programming, REST APIs, cloud platforms, Generative AI concepts, and familiarity with Large Language Models (LLMs).",
    overview: "The Generative AI – API Development course is designed for AI engineers, backend developers, software architects, and technology professionals who want to build secure, scalable, and enterprise-ready AI APIs. The course covers LLM API integration, RESTful API development, Retrieval-Augmented Generation (RAG), AI agents, authentication, security, deployment, monitoring, versioning, and API lifecycle management. Through hands-on labs, enterprise case studies, and practical projects, participants will gain the skills required to develop and deploy production-ready Generative AI APIs.",
    objectives: ["Design and develop Generative AI APIs.","Integrate LLMs with enterprise applications.","Build RAG-enabled API services.","Secure AI APIs using authentication and authorization.","Deploy scalable API services on cloud platforms.","Monitor and optimize API performance.","Manage the complete AI API lifecycle."],
    days: [
      { day: 1, title: "API Development Fundamentals", topics: ["Introduction to AI APIs","REST API Fundamentals","API Design Principles","FastAPI Framework","Request & Response Models","API Documentation","Development Best Practices"], handsOn: ["Building REST APIs","Creating API endpoints","Testing API requests"], outcome: "Understand the fundamentals of designing and developing secure and scalable Generative AI APIs." },
      { day: 2, title: "LLM Integration & AI Services", topics: ["OpenAI API Integration","Google Gemini API","Anthropic Claude API","Prompt Engineering","Function Calling","AI Agents","Workflow Integration"], handsOn: ["Integrating LLM APIs","Building AI-powered services","Developing intelligent API workflows"], outcome: "Develop AI-powered APIs that leverage modern LLMs for intelligent enterprise applications." },
      { day: 3, title: "RAG, Security & Authentication", topics: ["Retrieval-Augmented Generation (RAG)","Embeddings","Vector Databases","JWT Authentication","OAuth 2.0","API Security","Rate Limiting"], handsOn: ["Building secure RAG APIs","Implementing authentication","Protecting API endpoints"], outcome: "Build secure AI APIs with enterprise authentication, retrieval capabilities, and access control." },
      { day: 4, title: "Deployment, Monitoring & Optimization", topics: ["Docker Deployment","Kubernetes","API Monitoring","Logging","Performance Optimization","Versioning","CI/CD for APIs"], handsOn: ["Deploying AI APIs","Monitoring API performance","Optimizing response times"], outcome: "Deploy and manage production-ready AI APIs with high availability, scalability, and performance." },
      { day: 5, title: "Enterprise API Project & Assessment", topics: ["Enterprise API Case Studies","End-to-End AI API Development","API Review & Optimization","Future Trends in AI APIs","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","FastAPI","OpenAI API","Google Gemini API","Anthropic Claude API","LangChain","LlamaIndex","Pinecone","ChromaDB","Docker","Kubernetes","Postman","Git & GitHub","Jupyter Notebook"],
    careers: ["Generative AI API Developer","AI Backend Engineer","AI Software Engineer","LLM Application Developer","AI Solutions Architect","MLOps Engineer","Cloud AI Engineer","Full Stack AI Developer"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Google Professional Machine Learning Engineer","AWS Certified AI Practitioner","Google Professional Cloud Developer","IBM Generative AI Engineering Professional Certificate"],
    realWorldCases: { intro: "Develop a complete enterprise Generative AI API that includes:", bullets: ["Enterprise API Case Studies","REST API development","LLM integration","RAG implementation","Secure authentication","Cloud deployment","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for backend developers, AI engineers, software architects, and API developers." },
      { question: "Is prior API development experience required?", answer: "Yes. Basic knowledge of Python, REST APIs, and Generative AI concepts is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes API development labs, deployment exercises, enterprise projects, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, FastAPI, OpenAI API, Gemini API, Claude API, LangChain, LlamaIndex, Pinecone, ChromaDB, Docker, Kubernetes, Postman, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn AI API development, LLM integration, RAG implementation, authentication, deployment, monitoring, optimization, and enterprise API engineering." }
    ]
  },
  "Generative AI - Architecture": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Generative AI, Python programming, cloud computing, APIs, Machine Learning concepts, and familiarity with Large Language Models (LLMs).",
    overview: "The Generative AI – Architecture course is designed for AI architects, solution architects, Machine Learning engineers, cloud architects, and technology professionals who want to design scalable and enterprise-ready Generative AI solutions. The course covers AI architecture patterns, LLM ecosystems, RAG architecture, multi-agent systems, vector databases, cloud-native AI platforms, deployment strategies, security, governance, and enterprise integration. Through practical labs, architectural design exercises, and real-world projects, participants will learn how to build robust, secure, and scalable Generative AI systems.",
    objectives: ["Design enterprise-grade Generative AI architectures.","Build scalable LLM and RAG-based solutions.","Design AI agent and multi-agent architectures.","Select appropriate AI infrastructure and deployment models.","Implement secure and governed AI architectures.","Integrate Generative AI with enterprise systems.","Build production-ready AI solution architectures."],
    days: [
      { day: 1, title: "Generative AI Architecture Fundamentals", topics: ["Introduction to AI Architecture","Enterprise AI Architecture Principles","Foundation Models","LLM Architecture","AI Solution Components","Architecture Patterns","Scalability Planning"], handsOn: ["Designing AI solution architecture","Evaluating architecture patterns","Creating architecture diagrams"], outcome: "Understand the foundational architecture required to build scalable and maintainable Generative AI solutions." },
      { day: 2, title: "RAG & Knowledge Architecture", topics: ["Retrieval-Augmented Generation (RAG)","Embedding Models","Vector Databases","Knowledge Bases","Semantic Search","Context Management","Data Flow Design"], handsOn: ["Designing RAG architecture","Integrating vector databases","Building knowledge retrieval workflows"], outcome: "Design efficient knowledge-driven AI architectures using RAG and vector search technologies." },
      { day: 3, title: "AI Agents & Enterprise Integration", topics: ["AI Agent Architecture","Multi-Agent Systems","Model Context Protocol (MCP)","Agent-to-Agent (A2A) Communication","API Integration","Enterprise Application Integration","Workflow Orchestration"], handsOn: ["Designing AI agent workflows","Integrating enterprise systems","Building multi-agent architectures"], outcome: "Develop intelligent AI architectures capable of autonomous decision-making and seamless enterprise integration." },
      { day: 4, title: "Security, Deployment & Governance", topics: ["AI Security Architecture","Identity & Access Management","Responsible AI","Governance Frameworks","Cloud AI Architecture","Deployment Strategies","Monitoring & Observability"], handsOn: ["Designing secure AI architectures","Deploying cloud-based AI solutions","Configuring monitoring frameworks"], outcome: "Build secure, scalable, and governed Generative AI architectures suitable for enterprise production environments." },
      { day: 5, title: "Enterprise Architecture Project & Assessment", topics: ["Enterprise AI Case Studies","End-to-End Architecture Design","Architecture Review","Performance Optimization","Future Trends in Generative AI","Career Roadmap","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["OpenAI API","Google Gemini API","Anthropic Claude API","LangChain","LangGraph","LlamaIndex","Pinecone","ChromaDB","FAISS","Docker","Kubernetes","FastAPI","AWS Bedrock","Azure AI Foundry","Google Vertex AI","Git & GitHub"],
    careers: ["Generative AI Architect","AI Solutions Architect","Enterprise AI Architect","LLM Solutions Engineer","AI Platform Architect","Machine Learning Architect","Cloud AI Architect","AI Consultant"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Google Professional Machine Learning Engineer","AWS Certified AI Practitioner","AWS Certified Machine Learning Engineer – Associate","Google Professional Cloud Architect"],
    realWorldCases: { intro: "Develop a complete Generative AI architecture that includes:", bullets: ["Enterprise AI Case Studies","Enterprise architecture design","RAG implementation","Multi-agent workflow","Cloud deployment strategy","Security and governance framework","Technical documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for AI architects, ML engineers, solution architects, cloud engineers, and technical consultants." },
      { question: "Is prior Generative AI experience required?", answer: "Yes. Participants should have knowledge of Python, LLMs, APIs, and Generative AI fundamentals." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes architecture design workshops, enterprise labs, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "OpenAI API, Gemini API, Claude API, LangChain, LangGraph, LlamaIndex, Pinecone, ChromaDB, FAISS, Docker, Kubernetes, FastAPI, AWS Bedrock, Azure AI Foundry, Google Vertex AI, and Git & GitHub." },
      { question: "What skills will I gain?", answer: "You will learn enterprise AI architecture, RAG design, AI agents, cloud deployment, security, governance, and scalable Generative AI solution architecture." }
    ]
  },
  "Generative AI - Automation": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Generative AI, Python programming, APIs, workflow automation, cloud computing, and familiarity with Large Language Models (LLMs).",
    overview: "The Generative AI – Automation course is designed for AI developers, automation engineers, software engineers, MLOps professionals, and technology leaders who want to automate business processes using Generative AI. The course focuses on AI-powered workflow automation, intelligent agents, RAG pipelines, function calling, tool integration, business process automation, orchestration frameworks, enterprise deployments, and operational best practices. Through hands-on labs, real-world use cases, and enterprise projects, participants will learn how to build scalable, intelligent, and production-ready AI automation solutions.",
    objectives: ["Design AI-powered automation workflows.","Build intelligent AI agents for business automation.","Integrate LLMs with enterprise applications and APIs.","Develop Retrieval-Augmented Generation (RAG) pipelines.","Automate document processing and decision-making.","Deploy scalable AI automation solutions.","Implement secure and governed AI automation practices."],
    days: [
      { day: 1, title: "Generative AI Automation Fundamentals", topics: ["Introduction to AI Automation","Automation Architecture","LLM-Powered Workflows","Prompt Engineering for Automation","Workflow Design Principles","Enterprise Automation Use Cases","Automation Best Practices"], handsOn: ["Designing AI automation workflows","Creating prompt-driven processes","Exploring business automation scenarios"], outcome: "Understand how Generative AI automates business operations through intelligent workflows and decision-making." },
      { day: 2, title: "AI Agents & Workflow Orchestration", topics: ["AI Agents","Multi-Agent Systems","LangChain Automation","LangGraph Workflows","Function Calling","Tool Integration","Workflow Orchestration"], handsOn: ["Building AI agents","Connecting external tools","Automating multi-step workflows"], outcome: "Develop autonomous AI agents capable of executing complex business tasks using modern orchestration frameworks." },
      { day: 3, title: "RAG, Knowledge Automation & Enterprise Integration", topics: ["Retrieval-Augmented Generation (RAG)","Vector Databases","Embeddings","Enterprise Knowledge Bases","API Integration","CRM & ERP Automation","Document Intelligence"], handsOn: ["Building RAG pipelines","Automating document processing","Integrating enterprise systems"], outcome: "Build AI automation solutions that retrieve enterprise knowledge and integrate seamlessly with business applications." },
      { day: 4, title: "Deployment, Monitoring & Governance", topics: ["FastAPI Development","Docker Deployment","Kubernetes Orchestration","Monitoring & Logging","AI Governance","Security Best Practices","Performance Optimization"], handsOn: ["Deploying AI automation services","Monitoring workflow performance","Implementing governance controls"], outcome: "Deploy, monitor, and govern enterprise AI automation systems while ensuring security, scalability, and operational efficiency." },
      { day: 5, title: "Enterprise Automation Project & Assessment", topics: ["Enterprise Automation Case Studies","End-to-End AI Automation Solution","Performance Evaluation","Future Trends in AI Automation","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","OpenAI API","Google Gemini API","Anthropic Claude API","LangChain","LangGraph","LlamaIndex","FastAPI","Pinecone","ChromaDB","FAISS","Docker","Kubernetes","Git & GitHub","Apache Airflow","Jupyter Notebook"],
    careers: ["Generative AI Automation Engineer","AI Solutions Engineer","AI Workflow Developer","LLM Engineer","AI Application Developer","MLOps Engineer","Intelligent Automation Consultant","Enterprise AI Architect"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Google Professional Machine Learning Engineer","AWS Certified AI Practitioner","AWS Certified Machine Learning Engineer – Associate","IBM Generative AI Engineering Professional Certificate"],
    realWorldCases: { intro: "Develop a complete Generative AI automation solution that includes:", bullets: ["Enterprise Automation Case Studies","AI agent workflow","RAG implementation","API and tool integration","Automated document processing","Deployment and monitoring","Documentation and project presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for AI developers, automation engineers, MLOps professionals, and software engineers." },
      { question: "Is prior Generative AI experience required?", answer: "Yes. Basic knowledge of Python, APIs, and Generative AI concepts is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes AI workflow labs, automation projects, RAG implementation, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, OpenAI API, Gemini API, Claude API, LangChain, LangGraph, LlamaIndex, Pinecone, ChromaDB, FAISS, FastAPI, Docker, Kubernetes, Apache Airflow, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn AI workflow automation, intelligent agents, RAG development, API integration, orchestration, deployment, monitoring, and enterprise Generative AI automation." }
    ]
  },
  "Generative AI - Best Practices": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Generative AI, Python programming, APIs, cloud platforms, Large Language Models (LLMs), and AI application development.",
    overview: "The Generative AI – Best Practices course is designed for AI engineers, solution architects, developers, MLOps professionals, technology consultants, and enterprise teams who want to build reliable, secure, scalable, and responsible Generative AI solutions. The course focuses on industry best practices for prompt engineering, LLM application design, Retrieval-Augmented Generation (RAG), AI agents, security, governance, monitoring, deployment, optimization, and operational excellence. Through hands-on labs, enterprise case studies, and practical projects, participants will gain the skills required to develop production-ready Generative AI applications following modern industry standards.",
    objectives: ["Apply industry best practices for Generative AI development.","Design scalable and maintainable AI applications.","Implement secure and Responsible AI solutions.","Optimize prompts, RAG pipelines, and AI workflows.","Establish governance and monitoring strategies.","Improve AI performance and operational reliability.","Deliver enterprise-grade AI solutions."],
    days: [
      { day: 1, title: "Foundations & Prompt Engineering Best Practices", topics: ["Generative AI Design Principles","Prompt Engineering Standards","Context Management","Model Selection","Workflow Planning","Documentation Standards","Development Best Practices"], handsOn: ["Designing effective prompts","Structuring AI workflows","Reviewing development standards"], outcome: "Understand the core principles and development standards required for building reliable Generative AI applications." },
      { day: 2, title: "RAG, AI Agents & Integration Best Practices", topics: ["RAG Architecture","Embedding Strategies","Vector Database Optimization","AI Agent Design","LangChain Best Practices","API Integration","Enterprise Connectivity"], handsOn: ["Building optimized RAG pipelines","Designing AI agent workflows","Integrating enterprise systems"], outcome: "Develop efficient AI solutions using proven practices for retrieval, automation, and enterprise integration." },
      { day: 3, title: "Security, Governance & Responsible AI", topics: ["AI Security","Prompt Injection Protection","Data Privacy","Responsible AI","Governance Frameworks","Compliance Standards","Risk Management"], handsOn: ["Implementing AI guardrails","Performing governance reviews","Assessing AI risks"], outcome: "Implement secure, compliant, and ethical AI systems using enterprise governance frameworks." },
      { day: 4, title: "Deployment, Monitoring & Optimization", topics: ["Deployment Strategies","Docker & Kubernetes","Monitoring & Logging","Performance Optimization","Cost Management","Incident Response","Continuous Improvement"], handsOn: ["Deploying AI applications","Monitoring production workloads","Optimizing performance and costs"], outcome: "Deploy, monitor, and continuously improve enterprise Generative AI solutions using operational best practices." },
      { day: 5, title: "Enterprise Best Practices Project & Assessment", topics: ["Enterprise AI Case Studies","End-to-End Best Practices Implementation","Solution Review","Future Trends in Generative AI","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","OpenAI API","Google Gemini API","Anthropic Claude API","LangChain","LangGraph","LlamaIndex","Pinecone","ChromaDB","Docker","Kubernetes","MLflow","Git & GitHub","Jupyter Notebook"],
    careers: ["Generative AI Engineer","AI Solutions Architect","LLM Engineer","MLOps Engineer","AI Platform Engineer","AI Consultant","Enterprise AI Developer","AI Technology Lead"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Google Professional Machine Learning Engineer","AWS Certified AI Practitioner","IBM Generative AI Engineering Professional Certificate","Google Professional Cloud Architect"],
    realWorldCases: { intro: "Develop a production-ready Generative AI solution that includes:", bullets: ["Enterprise AI Case Studies","Prompt engineering standards","RAG implementation","AI agent integration","Security and governance controls","Deployment and monitoring","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for AI engineers, developers, architects, consultants, and enterprise technology teams." },
      { question: "Is prior Generative AI experience required?", answer: "Yes. Basic knowledge of Python, APIs, and Generative AI concepts is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes practical labs, enterprise case studies, deployment exercises, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, OpenAI API, Gemini API, Claude API, LangChain, LangGraph, LlamaIndex, Pinecone, ChromaDB, Docker, Kubernetes, MLflow, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn prompt engineering, RAG optimization, AI security, governance, deployment, monitoring, performance optimization, and enterprise Generative AI best practices." }
    ]
  },
  "Generative AI - Certification Prep": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Generative AI, Python programming, APIs, cloud platforms, Large Language Models (LLMs), and AI application development.",
    overview: "The Generative AI – Certification Prep course is designed for AI engineers, developers, cloud professionals, solution architects, and technology enthusiasts preparing for leading Generative AI and AI cloud certifications. The course covers Generative AI fundamentals, LLMs, prompt engineering, RAG, AI agents, model deployment, Responsible AI, security, governance, and exam-oriented practice. Through hands-on labs, mock assessments, and real-world projects, participants will strengthen both practical skills and certification readiness.",
    objectives: ["Master core Generative AI concepts for certification exams.","Build and deploy LLM-powered AI applications.","Apply prompt engineering and RAG techniques.","Understand AI governance and Responsible AI principles.","Practice exam-style scenarios and mock tests.","Implement enterprise AI best practices.","Prepare confidently for industry-recognized certifications."],
    days: [
      { day: 1, title: "Generative AI Foundations Review", topics: ["Generative AI Fundamentals","Large Language Models (LLMs)","Prompt Engineering","AI Applications","Model Selection","Responsible AI","Exam Preparation Strategy"], handsOn: ["Reviewing AI concepts","Practicing prompt engineering","Solving certification questions"], outcome: "Build a strong foundation in Generative AI concepts commonly covered in certification exams." },
      { day: 2, title: "LLMs, RAG & AI Development", topics: ["OpenAI API","Google Gemini API","Retrieval-Augmented Generation (RAG)","Embeddings","Vector Databases","LangChain","AI Application Development"], handsOn: ["Building RAG applications","Integrating AI APIs","Developing AI workflows"], outcome: "Gain practical experience in building enterprise AI solutions aligned with certification objectives." },
      { day: 3, title: "AI Deployment, Security & Governance", topics: ["AI Deployment","FastAPI","Docker","AI Security","AI Governance","Compliance","Performance Optimization"], handsOn: ["Deploying AI applications","Implementing security controls","Reviewing governance practices"], outcome: "Understand secure deployment, governance, and operational practices required for enterprise AI certifications." },
      { day: 4, title: "Mock Exams & Practical Assessment", topics: ["Certification Exam Patterns","Practice Questions","Case Studies","Performance Evaluation","Troubleshooting","Revision Sessions","Exam Strategies"], handsOn: ["Attempting mock exams","Solving case studies","Reviewing incorrect answers"], outcome: "Improve exam readiness through realistic practice tests and technical problem-solving exercises." },
      { day: 5, title: "Capstone Project & Final Review", topics: ["Enterprise AI Project","Final Technical Review","Best Practices","Career Roadmap","Certification Guidance","Interview Preparation","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","OpenAI API","Google Gemini API","Anthropic Claude API","LangChain","LangGraph","LlamaIndex","FastAPI","ChromaDB","Docker","Git & GitHub","Jupyter Notebook"],
    careers: ["Generative AI Engineer","LLM Engineer","AI Solutions Engineer","AI Application Developer","MLOps Engineer","AI Consultant","Cloud AI Engineer","Machine Learning Engineer"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Google Professional Machine Learning Engineer","AWS Certified AI Practitioner","IBM Generative AI Engineering Professional Certificate","Microsoft Azure AI Fundamentals (AI-900)"],
    realWorldCases: { intro: "Develop a complete Generative AI solution that includes:", bullets: ["Case Studies","Prompt engineering","RAG implementation","AI API integration","Secure deployment","Documentation and presentation","Certification-style technical review"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for professionals preparing for Generative AI and cloud AI certifications." },
      { question: "Is prior Generative AI experience required?", answer: "Yes. Basic knowledge of Python, APIs, and Generative AI concepts is recommended." },
      { question: "Are mock exams included?", answer: "Yes. The course includes mock certification exams, hands-on labs, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, OpenAI API, Gemini API, Claude API, LangChain, LangGraph, LlamaIndex, FastAPI, ChromaDB, Docker, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn LLM development, prompt engineering, RAG, deployment, governance, exam strategies, and enterprise Generative AI best practices." }
    ]
  },
  "Generative AI - CI/CD": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Python programming, Git, DevOps concepts, cloud platforms, Generative AI, and familiarity with Large Language Models (LLMs).",
    overview: "The Generative AI – CI/CD course is designed for AI engineers, DevOps professionals, MLOps engineers, software developers, and cloud engineers who want to automate the development, testing, deployment, and maintenance of Generative AI applications. The course focuses on CI/CD pipelines, LLM deployment, automated testing, containerization, infrastructure automation, monitoring, rollback strategies, security, and enterprise DevOps best practices. Through hands-on labs, enterprise case studies, and practical projects, participants will gain the skills required to build reliable and automated AI delivery pipelines.",
    objectives: ["Build CI/CD pipelines for Generative AI applications.","Automate AI testing and deployment.","Manage containerized AI workloads.","Implement Infrastructure as Code (IaC).","Monitor AI applications after deployment.","Secure AI delivery pipelines.","Deliver production-ready AI solutions efficiently."],
    days: [
      { day: 1, title: "CI/CD Fundamentals", topics: ["Introduction to CI/CD","DevOps for Generative AI","Git Workflow","Version Control","Build Automation","CI Pipeline Design","DevOps Best Practices"], handsOn: ["Creating Git repositories","Designing CI workflows","Automating builds"], outcome: "Understand CI/CD principles and create automated development workflows for Generative AI projects." },
      { day: 2, title: "Automated Testing & Deployment", topics: ["AI Application Testing","Prompt Validation","API Testing","Docker","Kubernetes","Deployment Strategies","Rollback Planning"], handsOn: ["Automating application testing","Deploying AI services","Managing release pipelines"], outcome: "Implement reliable deployment pipelines with automated testing and controlled release strategies." },
      { day: 3, title: "Infrastructure Automation & Security", topics: ["Infrastructure as Code (IaC)","Terraform Basics","Cloud Deployment","Secrets Management","Pipeline Security","Access Control","Compliance"], handsOn: ["Automating infrastructure","Securing CI/CD pipelines","Managing cloud deployments"], outcome: "Build secure and automated infrastructure that supports scalable AI application deployment." },
      { day: 4, title: "Monitoring & Performance Optimization", topics: ["Pipeline Monitoring","Logging","Performance Optimization","Incident Management","Cost Optimization","Continuous Delivery","Operational Best Practices"], handsOn: ["Monitoring deployment pipelines","Optimizing application performance","Resolving deployment issues"], outcome: "Monitor and optimize AI delivery pipelines to ensure high availability, stability, and operational efficiency." },
      { day: 5, title: "Enterprise CI/CD Project & Assessment", topics: ["Enterprise DevOps Case Studies","End-to-End AI Delivery Pipeline","Production Readiness Review","Future Trends in AI DevOps","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Git & GitHub","GitHub Actions","Jenkins","Docker","Kubernetes","Terraform","FastAPI","OpenAI API","LangChain","Prometheus","Grafana","Jupyter Notebook"],
    careers: ["AI DevOps Engineer","MLOps Engineer","Generative AI Engineer","Cloud DevOps Engineer","AI Platform Engineer","Site Reliability Engineer (SRE)","AI Infrastructure Engineer","DevSecOps Engineer"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified AI Practitioner","Google Professional Cloud DevOps Engineer","HashiCorp Terraform Associate","GitHub Actions Certification"],
    realWorldCases: { intro: "Develop a complete CI/CD pipeline for a Generative AI application that includes:", bullets: ["Enterprise DevOps Case Studies","Source code management","Automated testing","Containerized deployment","Infrastructure automation","Monitoring and security","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for DevOps engineers, AI engineers, MLOps professionals, and cloud developers." },
      { question: "Is prior CI/CD experience required?", answer: "Basic knowledge of Git, Python, DevOps, and Generative AI concepts is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes CI/CD labs, deployment exercises, automation projects, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, Git, GitHub Actions, Jenkins, Docker, Kubernetes, Terraform, FastAPI, OpenAI API, LangChain, Prometheus, Grafana, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn CI/CD pipeline development, automated testing, AI deployment, Infrastructure as Code, monitoring, security, and enterprise AI DevOps practices." }
    ]
  },
  "Generative AI - Consulting": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Generative AI, Python programming, business processes, cloud platforms, and familiarity with Large Language Models (LLMs).",
    overview: "The Generative AI – Consulting course is designed for AI consultants, solution architects, business analysts, technology advisors, and IT professionals who want to help organizations adopt and implement Generative AI successfully. The course focuses on business consulting, AI strategy, solution design, use case identification, technology selection, governance, implementation planning, stakeholder management, and enterprise transformation. Through hands-on workshops, consulting scenarios, and practical case studies, participants will learn how to deliver business-focused Generative AI consulting services.",
    objectives: ["Assess business readiness for Generative AI adoption.","Identify high-value AI use cases.","Design enterprise AI solution strategies.","Recommend suitable AI platforms and architectures.","Develop implementation and transformation roadmaps.","Apply governance and Responsible AI practices.","Deliver successful AI consulting engagements."],
    days: [
      { day: 1, title: "AI Consulting Fundamentals", topics: ["Introduction to AI Consulting","Business Discovery","AI Opportunity Assessment","Client Requirement Analysis","Industry Use Cases","AI Value Proposition","Consulting Best Practices"], handsOn: ["Conducting client assessments","Identifying AI opportunities","Preparing consulting recommendations"], outcome: "Understand the consulting process and identify business opportunities where Generative AI can deliver measurable value." },
      { day: 2, title: "Solution Strategy & Architecture", topics: ["AI Solution Design","LLM Selection","RAG Strategy","AI Platform Comparison","Enterprise Architecture","Cost Estimation","Project Planning"], handsOn: ["Designing AI solution strategies","Comparing AI platforms","Creating implementation roadmaps"], outcome: "Develop strategic AI solutions aligned with client objectives, technical requirements, and budget considerations." },
      { day: 3, title: "Governance, Security & Change Management", topics: ["Responsible AI","AI Governance","Risk Assessment","Compliance Requirements","Data Privacy","Change Management","Stakeholder Communication"], handsOn: ["Preparing governance frameworks","Performing AI risk assessments","Developing change management plans"], outcome: "Implement governance, security, and organizational change strategies for successful AI adoption." },
      { day: 4, title: "Implementation & Business Transformation", topics: ["AI Implementation Planning","Enterprise Integration","ROI Measurement","KPI Development","Adoption Strategy","Operational Readiness","Continuous Improvement"], handsOn: ["Planning AI implementation","Measuring business impact","Creating transformation strategies"], outcome: "Guide organizations through AI implementation while maximizing business value and long-term adoption." },
      { day: 5, title: "Enterprise Consulting Project & Assessment", topics: ["Enterprise Consulting Case Studies","End-to-End AI Consulting Engagement","Executive Presentation","Future Trends in Generative AI","Career Roadmap","Certification Guidance","Final Review"], handsOn: [], outcome: "" }
    ],
    tools: ["OpenAI API","Google Gemini API","Anthropic Claude API","LangChain","LlamaIndex","Microsoft Copilot","ChatGPT","Azure AI Foundry","AWS Bedrock","Google Vertex AI","Microsoft Power BI","Git & GitHub"],
    careers: ["Generative AI Consultant","AI Solutions Consultant","AI Strategy Consultant","Enterprise AI Advisor","Solution Architect","Digital Transformation Consultant","AI Business Consultant","Technology Consultant"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Google Professional Machine Learning Engineer","AWS Certified AI Practitioner","Google Professional Cloud Architect","IBM Generative AI Engineering Professional Certificate"],
    realWorldCases: { intro: "Develop a complete Generative AI consulting proposal that includes:", bullets: ["Industry Use Cases","Enterprise Consulting Case Studies","Business assessment","AI use case analysis","Solution architecture","Implementation roadmap","Governance strategy","Executive presentation and documentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for consultants, solution architects, business analysts, and AI professionals." },
      { question: "Is prior Generative AI experience required?", answer: "Yes. Basic knowledge of Generative AI, cloud platforms, and business processes is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes consulting workshops, strategy development, enterprise case studies, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "OpenAI API, Gemini API, Claude API, LangChain, LlamaIndex, ChatGPT, Microsoft Copilot, Azure AI Foundry, AWS Bedrock, Google Vertex AI, Power BI, and Git & GitHub." },
      { question: "What skills will I gain?", answer: "You will learn AI consulting, business strategy, solution architecture, governance, implementation planning, stakeholder management, and enterprise AI transformation." }
    ]
  },
  "Generative AI - Data Modeling": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Generative AI, Python programming, databases, data processing concepts, and familiarity with Large Language Models (LLMs).",
    overview: "The Generative AI – Data Modeling course is designed for AI engineers, data engineers, data scientists, solution architects, and technology professionals who want to design efficient data models for Generative AI applications. The course focuses on structured and unstructured data modeling, embeddings, vector databases, Retrieval-Augmented Generation (RAG), knowledge graphs, data pipelines, governance, and enterprise data architecture. Through hands-on labs, enterprise case studies, and practical projects, participants will learn how to prepare and manage high-quality data for scalable AI solutions.",
    objectives: ["Design data models for Generative AI applications.","Prepare structured and unstructured datasets.","Build embedding and vector database solutions.","Implement RAG-ready data architectures.","Manage enterprise knowledge repositories.","Apply data governance and quality standards.","Optimize AI data pipelines for production."],
    days: [
      { day: 1, title: "Data Modeling Fundamentals", topics: ["Introduction to AI Data Modeling","Structured Data","Unstructured Data","Data Architecture","Data Preparation","Metadata Management","Data Modeling Best Practices"], handsOn: ["Designing AI data models","Organizing enterprise datasets","Creating metadata structures"], outcome: "Understand the foundations of data modeling for building reliable and scalable Generative AI applications." },
      { day: 2, title: "Embeddings & Vector Databases", topics: ["Embedding Models","Vector Databases","Semantic Search","Data Chunking","Indexing Strategies","Similarity Search","Data Retrieval"], handsOn: ["Creating embeddings","Building vector indexes","Implementing semantic search"], outcome: "Develop efficient vector-based data models to support Retrieval-Augmented Generation (RAG) applications." },
      { day: 3, title: "RAG & Knowledge Management", topics: ["Retrieval-Augmented Generation (RAG)","Knowledge Bases","Document Processing","Data Pipelines","Knowledge Graphs","Data Integration","Enterprise Content Management"], handsOn: ["Building RAG datasets","Processing enterprise documents","Managing knowledge repositories"], outcome: "Design enterprise knowledge systems that improve AI accuracy through effective data organization and retrieval." },
      { day: 4, title: "Governance & Data Optimization", topics: ["Data Governance","Data Privacy","Data Quality","Performance Optimization","Monitoring","Security","Lifecycle Management"], handsOn: ["Validating data quality","Optimizing AI datasets","Monitoring data pipelines"], outcome: "Maintain secure, high-quality, and optimized AI data environments for enterprise deployments." },
      { day: 5, title: "Enterprise Data Modeling Project & Assessment", topics: ["Enterprise Data Architecture","End-to-End Data Modeling","Performance Review","Future Trends in AI Data Management","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","OpenAI Embeddings","Google Gemini API","LangChain","LlamaIndex","Pinecone","ChromaDB","FAISS","PostgreSQL","MongoDB","Pandas","Git & GitHub","Jupyter Notebook"],
    careers: ["AI Data Engineer","Generative AI Engineer","Data Architect","AI Solutions Architect","Data Scientist","Machine Learning Engineer","AI Platform Engineer","Knowledge Engineer"],
    certifications: ["Google Professional Machine Learning Engineer","Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified AI Practitioner","IBM Generative AI Engineering Professional Certificate","Google Professional Cloud Database Engineer"],
    realWorldCases: { intro: "Develop a complete Generative AI data model that includes:", bullets: ["Enterprise data architecture","Embedding generation","Vector database implementation","RAG-ready knowledge base","Data governance framework","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for AI engineers, data engineers, architects, and data scientists." },
      { question: "Is prior data modeling experience required?", answer: "Basic knowledge of databases, Python, and Generative AI concepts is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes practical labs, enterprise exercises, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, OpenAI Embeddings, Gemini API, LangChain, LlamaIndex, Pinecone, ChromaDB, FAISS, PostgreSQL, MongoDB, Pandas, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn AI data modeling, embeddings, vector databases, RAG implementation, knowledge management, data governance, and enterprise AI data architecture." }
    ]
  },
  "Generative AI - Development": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Python programming, APIs, Artificial Intelligence, Machine Learning concepts, and familiarity with Large Language Models (LLMs) is recommended.",
    overview: "The Generative AI – Development course is designed for AI developers, software engineers, Machine Learning engineers, and technology professionals who want to build modern Generative AI applications. The course covers LLM integration, prompt engineering, Retrieval-Augmented Generation (RAG), AI agents, vector databases, API development, workflow automation, model deployment, and production-ready AI application development. Through hands-on labs, enterprise projects, and real-world use cases, participants will gain practical experience in developing scalable and intelligent Generative AI solutions.",
    objectives: ["Build Generative AI applications using modern AI frameworks.","Integrate LLMs through APIs and SDKs.","Develop RAG-based AI applications.","Create intelligent AI agents and workflows.","Work with vector databases and embeddings.","Deploy production-ready AI applications.","Apply secure and scalable AI development practices."],
    days: [
      { day: 1, title: "Generative AI Development Fundamentals", topics: ["Introduction to Generative AI Development","LLM Architecture","OpenAI API","Prompt Engineering","AI Application Design","Python for AI Development","Development Best Practices"], handsOn: ["Setting up the development environment","Building prompt-based applications","Connecting to LLM APIs"], outcome: "Understand the core principles of Generative AI development and build basic AI-powered applications." },
      { day: 2, title: "RAG & Knowledge-Based Applications", topics: ["Retrieval-Augmented Generation (RAG)","Embeddings","Vector Databases","Document Processing","Knowledge Retrieval","Semantic Search","Context Management"], handsOn: ["Building a RAG application","Creating embeddings","Connecting vector databases"], outcome: "Develop AI applications capable of retrieving and generating accurate responses from enterprise knowledge sources." },
      { day: 3, title: "AI Agents & Workflow Automation", topics: ["AI Agents","LangChain Fundamentals","LangGraph Workflows","Tool Calling","Function Calling","Multi-Agent Systems","Workflow Automation"], handsOn: ["Building AI agents","Integrating external tools","Creating automated AI workflows"], outcome: "Develop intelligent AI agents that perform autonomous tasks using modern orchestration frameworks." },
      { day: 4, title: "Deployment, Security & Optimization", topics: ["FastAPI Development","Docker Deployment","AI Application Security","Authentication & Authorization","Performance Optimization","Monitoring & Logging","Cloud Deployment"], handsOn: ["Deploying AI applications","Securing API endpoints","Monitoring application performance"], outcome: "Deploy secure, scalable, and optimized Generative AI applications for enterprise production environments." },
      { day: 5, title: "Enterprise Development Project & Assessment", topics: ["Enterprise AI Development Case Studies","End-to-End AI Application","Production Readiness Review","Future Trends in Generative AI","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","OpenAI API","Google Gemini API","Anthropic Claude API","LangChain","LangGraph","LlamaIndex","Hugging Face Transformers","ChromaDB","Pinecone","FAISS","FastAPI","Docker","Git & GitHub","Jupyter Notebook"],
    careers: ["Generative AI Developer","AI Application Developer","LLM Engineer","AI Software Engineer","Prompt Engineer","AI Solutions Engineer","Machine Learning Engineer","AI Consultant"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Google Professional Machine Learning Engineer","AWS Certified AI Practitioner","IBM Generative AI Engineering Professional Certificate","TensorFlow Developer Certificate"],
    realWorldCases: { intro: "Develop a complete Generative AI application that includes:", bullets: ["Enterprise AI Development Case Studies","LLM integration","Prompt engineering","RAG implementation","AI agent workflow","API deployment","Documentation and project presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for AI developers, software engineers, ML engineers, and developers building Generative AI applications." },
      { question: "Is prior programming experience required?", answer: "Yes. Basic knowledge of Python programming and APIs is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes coding exercises, AI application development labs, and an enterprise capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, OpenAI API, Gemini API, Claude API, LangChain, LangGraph, LlamaIndex, ChromaDB, Pinecone, FAISS, FastAPI, Docker, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn LLM integration, RAG development, AI agent creation, prompt engineering, API development, deployment, and enterprise Generative AI application development." }
    ]
  },
  "Generative AI - Engineering": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Generative AI, Python programming, APIs, cloud platforms, software engineering principles, and familiarity with Large Language Models (LLMs).",
    overview: "The Generative AI – Engineering course is designed for AI engineers, software developers, solution architects, MLOps professionals, and technology experts who want to engineer enterprise-grade Generative AI applications. The course covers LLM application development, prompt engineering, Retrieval-Augmented Generation (RAG), AI agents, software architecture, deployment, optimization, security, and engineering best practices. Through hands-on labs, enterprise case studies, and real-world projects, participants will gain practical expertise in building scalable, secure, and production-ready Generative AI systems.",
    objectives: ["Engineer enterprise-grade Generative AI applications.","Design scalable LLM-based architectures.","Develop RAG-powered AI solutions.","Build intelligent AI agents and workflows.","Integrate AI with enterprise systems and APIs.","Deploy secure and optimized AI applications.","Apply software engineering best practices for AI."],
    days: [
      { day: 1, title: "AI Engineering Foundations", topics: ["Generative AI Architecture","Software Engineering Principles","LLM Fundamentals","Prompt Engineering","System Design","Project Structure","Engineering Best Practices"], handsOn: ["Designing AI architectures","Creating prompt workflows","Structuring AI projects"], outcome: "Build a strong engineering foundation for developing scalable and maintainable Generative AI applications." },
      { day: 2, title: "AI Application Development", topics: ["OpenAI API","Google Gemini API","LangChain","LangGraph","AI Agents","Function Calling","Workflow Automation"], handsOn: ["Developing AI applications","Building AI agents","Integrating external APIs"], outcome: "Develop intelligent AI applications capable of automating business processes and solving real-world problems." },
      { day: 3, title: "RAG & Enterprise Integration", topics: ["Retrieval-Augmented Generation (RAG)","Embeddings","Vector Databases","Enterprise Knowledge Bases","FastAPI","Database Integration","Enterprise Connectivity"], handsOn: ["Building RAG applications","Connecting enterprise systems","Developing AI APIs"], outcome: "Engineer AI applications that retrieve enterprise knowledge and integrate seamlessly with business platforms." },
      { day: 4, title: "Deployment, Security & Optimization", topics: ["Docker","Kubernetes","AI Security","Authentication","Monitoring","Performance Optimization","Cost Management"], handsOn: ["Deploying AI applications","Securing AI services","Optimizing performance"], outcome: "Deploy secure, scalable, and optimized AI solutions for enterprise production environments." },
      { day: 5, title: "Enterprise Engineering Project & Assessment", topics: ["Enterprise Engineering Case Studies","End-to-End AI Solution","Code Review","Future Trends in AI Engineering","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","OpenAI API","Google Gemini API","Anthropic Claude API","LangChain","LangGraph","LlamaIndex","FastAPI","Pinecone","ChromaDB","Docker","Kubernetes","Git & GitHub","Jupyter Notebook"],
    careers: ["Generative AI Engineer","LLM Engineer","AI Software Engineer","AI Solutions Architect","MLOps Engineer","AI Platform Engineer","AI Application Developer","Machine Learning Engineer"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Google Professional Machine Learning Engineer","AWS Certified AI Practitioner","IBM Generative AI Engineering Professional Certificate","Google Professional Cloud Developer"],
    realWorldCases: { intro: "Develop a complete Generative AI engineering solution that includes:", bullets: ["Enterprise Engineering Case Studies","LLM integration","RAG implementation","AI agent workflow","API development","Secure deployment","Documentation and project presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for AI engineers, software developers, architects, and MLOps professionals." },
      { question: "Is prior Generative AI experience required?", answer: "Yes. Basic knowledge of Python, APIs, software engineering, and AI concepts is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes development labs, engineering exercises, enterprise projects, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, OpenAI API, Gemini API, Claude API, LangChain, LangGraph, LlamaIndex, FastAPI, Pinecone, ChromaDB, Docker, Kubernetes, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn LLM engineering, RAG development, AI agents, API integration, deployment, security, optimization, and enterprise AI engineering best practices." }
    ]
  },
  "Generative AI - Enterprise Solutions": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Generative AI, Python programming, APIs, cloud platforms, enterprise applications, and familiarity with Large Language Models (LLMs).",
    overview: "The Generative AI – Enterprise Solutions course is designed for AI engineers, solution architects, enterprise developers, technology consultants, and business leaders who want to implement Generative AI across enterprise environments. The course focuses on enterprise AI architecture, LLM integration, Retrieval-Augmented Generation (RAG), AI agents, workflow automation, governance, security, scalability, and business transformation. Through hands-on labs, enterprise case studies, and practical projects, participants will learn how to design and deploy secure, scalable, and business-ready Generative AI solutions.",
    objectives: ["Design enterprise-grade Generative AI solutions.","Integrate LLMs with enterprise applications.","Build RAG-enabled business solutions.","Develop AI-powered workflow automation.","Apply governance and security controls.","Deploy scalable AI solutions for organizations.","Solve real-world enterprise business challenges."],
    days: [
      { day: 1, title: "Enterprise AI Foundations", topics: ["Enterprise AI Overview","Business Use Cases","Enterprise Architecture","LLM Selection","AI Adoption Strategy","Solution Planning","Best Practices"], handsOn: ["Identifying enterprise AI use cases","Designing AI solution architecture","Planning implementation strategies"], outcome: "Understand how Generative AI supports enterprise transformation through scalable and business-focused solutions." },
      { day: 2, title: "AI Integration & Workflow Automation", topics: ["OpenAI API Integration","RAG Architecture","Enterprise Knowledge Bases","AI Agents","Workflow Automation","API Connectivity","Business Process Integration"], handsOn: ["Building AI-powered workflows","Integrating enterprise systems","Developing RAG applications"], outcome: "Develop enterprise AI applications that automate workflows and improve business productivity." },
      { day: 3, title: "Security, Governance & Scalability", topics: ["AI Security","Identity & Access Management","Responsible AI","Governance Frameworks","Compliance","Performance Optimization","Scalability Planning"], handsOn: ["Securing enterprise AI solutions","Applying governance controls","Optimizing AI performance"], outcome: "Implement secure, compliant, and scalable Generative AI solutions for enterprise environments." },
      { day: 4, title: "Deployment & Operations", topics: ["AI Deployment","Docker Fundamentals","Cloud AI Services","Monitoring","Logging","Cost Optimization","Operational Best Practices"], handsOn: ["Deploying AI applications","Monitoring enterprise workloads","Optimizing cloud resources"], outcome: "Deploy and manage enterprise AI applications while maintaining operational efficiency and reliability." },
      { day: 5, title: "Enterprise AI Project & Assessment", topics: ["Enterprise AI Case Studies","End-to-End Solution Development","Solution Review","Future Trends in Enterprise AI","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","OpenAI API","Google Gemini API","Anthropic Claude API","LangChain","LangGraph","LlamaIndex","FastAPI","Pinecone","Docker","Azure AI Foundry","AWS Bedrock","Git & GitHub","Jupyter Notebook"],
    careers: ["Enterprise AI Engineer","Generative AI Solutions Architect","AI Application Developer","AI Consultant","MLOps Engineer","AI Platform Engineer","Enterprise Solutions Engineer","Digital Transformation Consultant"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Google Professional Machine Learning Engineer","AWS Certified AI Practitioner","IBM Generative AI Engineering Professional Certificate","Google Professional Cloud Architect"],
    realWorldCases: { intro: "Develop a complete enterprise Generative AI solution that includes:", bullets: ["Business Use Cases","Enterprise AI Case Studies","Enterprise architecture design","LLM and RAG integration","AI workflow automation","Security and governance implementation","Deployment strategy","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for AI engineers, solution architects, enterprise developers, and technology consultants." },
      { question: "Is prior Generative AI experience required?", answer: "Yes. Basic knowledge of Python, APIs, cloud computing, and Generative AI is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes enterprise labs, AI integration exercises, deployment activities, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, OpenAI API, Gemini API, Claude API, LangChain, LangGraph, LlamaIndex, FastAPI, Pinecone, Docker, Azure AI Foundry, AWS Bedrock, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn enterprise AI architecture, RAG implementation, workflow automation, AI security, governance, deployment, and scalable Generative AI solution development." }
    ]
  },
  "Generative AI - Fundamentals": {
    level: "Beginner to Intermediate",
    scheduleDays: 5,
    prerequisites: "Basic computer knowledge, familiarity with Python is helpful but not mandatory, and an interest in Artificial Intelligence and Machine Learning.",
    overview: "The Generative AI – Fundamentals course is designed for beginners, software developers, AI enthusiasts, business professionals, and technology learners who want to understand the fundamentals of Generative AI and Large Language Models (LLMs). The course introduces core concepts such as foundation models, prompt engineering, text and image generation, Retrieval-Augmented Generation (RAG), AI agents, responsible AI, and practical business applications. Through hands-on labs and real-world examples, participants will gain the knowledge required to start building Generative AI solutions using modern tools and platforms.",
    objectives: ["Understand the fundamentals of Generative AI and LLMs.","Differentiate between traditional AI, Machine Learning, and Generative AI.","Write effective prompts for AI models.","Explore text, image, and code generation capabilities.","Build basic Generative AI applications.","Understand Responsible AI and ethical considerations.","Identify enterprise use cases for Generative AI."],
    days: [
      { day: 1, title: "Introduction to Generative AI", topics: ["Introduction to Artificial Intelligence","Evolution of Generative AI","Machine Learning vs Generative AI","Foundation Models","Large Language Models (LLMs)","Popular Generative AI Platforms","Business Applications"], handsOn: ["Exploring ChatGPT and Gemini","Identifying AI use cases","Comparing different AI models"], outcome: "Understand the fundamentals of Generative AI, its evolution, and how modern AI models solve real-world business problems." },
      { day: 2, title: "Prompt Engineering & Content Generation", topics: ["Prompt Engineering Basics","Prompt Design Techniques","Zero-shot Prompting","Few-shot Prompting","Chain-of-Thought Prompting","Text Generation","Code & Image Generation Overview"], handsOn: ["Writing effective prompts","Generating business content","Comparing prompt results"], outcome: "Learn how to communicate effectively with AI models using professional prompt engineering techniques." },
      { day: 3, title: "LLM Applications & RAG Fundamentals", topics: ["LLM Applications","Retrieval-Augmented Generation (RAG)","Vector Databases Overview","Embeddings Fundamentals","AI Assistants","Knowledge-Based Chatbots","API Integration Basics"], handsOn: ["Building a simple AI chatbot","Exploring embeddings","Using OpenAI APIs"], outcome: "Understand how LLMs retrieve knowledge and power intelligent business applications." },
      { day: 4, title: "Responsible AI & AI Agents", topics: ["Responsible AI Principles","AI Ethics","Bias & Hallucinations","AI Safety","Introduction to AI Agents","Workflow Automation","Enterprise AI Adoption"], handsOn: ["Evaluating AI responses","Identifying AI risks","Building a basic AI agent workflow"], outcome: "Learn responsible AI practices while exploring intelligent AI agents for business automation." },
      { day: 5, title: "Generative AI Project & Assessment", topics: ["Enterprise Generative AI Use Cases","End-to-End AI Application","Future Trends in Generative AI","Career Roadmap","Certification Guidance","Project Review","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["ChatGPT","Google Gemini","Microsoft Copilot","OpenAI API","Python","Jupyter Notebook","Hugging Face","LangChain (Introduction)","ChromaDB (Introduction)","Git & GitHub"],
    careers: ["Generative AI Developer","AI Prompt Engineer","AI Application Developer","AI Business Analyst","AI Solutions Consultant","Junior AI Engineer","AI Content Specialist","Innovation Consultant"],
    certifications: ["Microsoft Azure AI Fundamentals (AI-900)","Google Generative AI Learning Path","AWS AI Practitioner","IBM Generative AI Engineering Professional Certificate","OpenAI API Fundamentals"],
    realWorldCases: { intro: "Develop a basic Generative AI solution that includes:", bullets: ["Business Applications","Prompt engineering","LLM integration","AI-powered content generation","Basic chatbot workflow","Responsible AI considerations","Project documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "Anyone interested in learning Generative AI, including students, developers, business professionals, and AI enthusiasts." },
      { question: "Is coding experience required?", answer: "No. Basic computer knowledge is sufficient, although Python knowledge is helpful." },
      { question: "Are practical labs included?", answer: "Yes. Every day includes hands-on exercises, AI demonstrations, and a capstone project." },
      { question: "Which tools are covered?", answer: "ChatGPT, Gemini, Copilot, OpenAI API, Hugging Face, LangChain, ChromaDB, Python, Git & GitHub." },
      { question: "What skills will I gain?", answer: "You will learn prompt engineering, LLM fundamentals, AI applications, RAG basics, AI agents, and responsible AI practices." }
    ]
  },
  "Generative AI - Governance": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Generative AI, Python programming, cloud platforms, AI development, security concepts, and familiarity with Large Language Models (LLMs).",
    overview: "The Generative AI – Governance course is designed for AI leaders, solution architects, compliance professionals, security specialists, risk managers, and technology professionals responsible for governing enterprise AI systems. The course focuses on AI governance frameworks, Responsible AI, regulatory compliance, data privacy, risk management, security controls, policy development, auditing, monitoring, and enterprise governance strategies. Through hands-on labs, governance workshops, and real-world case studies, participants will learn how to establish secure, ethical, and compliant Generative AI environments.",
    objectives: ["Build enterprise AI governance frameworks.","Apply Responsible AI principles.","Manage AI risks and compliance requirements.","Protect sensitive enterprise data.","Develop AI policies and governance standards.","Monitor AI systems for compliance and accountability.","Implement secure and ethical AI practices."],
    days: [
      { day: 1, title: "AI Governance Foundations", topics: ["Introduction to AI Governance","Responsible AI Principles","Governance Frameworks","AI Policies","Risk Identification","Compliance Overview","Governance Best Practices"], handsOn: ["Designing governance frameworks","Identifying AI risks","Creating governance policies"], outcome: "Understand the principles of AI governance and establish a strong governance framework for enterprise AI." },
      { day: 2, title: "Compliance, Privacy & Security", topics: ["AI Regulations","Data Privacy","Data Protection","Identity & Access Management","AI Security Controls","Ethical AI","Regulatory Compliance"], handsOn: ["Performing compliance assessments","Securing AI systems","Reviewing privacy controls"], outcome: "Implement governance controls that ensure secure, compliant, and responsible AI operations." },
      { day: 3, title: "Risk Management & AI Auditing", topics: ["AI Risk Management","Bias Detection","Fairness Evaluation","Explainability","AI Auditing","Documentation Standards","Governance Reporting"], handsOn: ["Conducting AI audits","Evaluating model fairness","Preparing governance reports"], outcome: "Assess AI risks, improve model transparency, and perform governance audits using industry best practices." },
      { day: 4, title: "Monitoring & Governance Operations", topics: ["AI Monitoring","Policy Enforcement","Incident Management","Continuous Compliance","Governance Dashboards","Performance Monitoring","Operational Governance"], handsOn: ["Monitoring AI compliance","Managing governance incidents","Building governance dashboards"], outcome: "Monitor enterprise AI environments while maintaining governance, compliance, and operational accountability." },
      { day: 5, title: "Enterprise Governance Project & Assessment", topics: ["Enterprise Governance Case Studies","End-to-End Governance Strategy","Policy Review","Future Trends in AI Governance","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","OpenAI API","Google Gemini API","Anthropic Claude API","Microsoft Purview","Azure AI Foundry","AWS Bedrock","LangSmith","MLflow","Grafana","Git & GitHub","Jupyter Notebook"],
    careers: ["AI Governance Specialist","Responsible AI Consultant","AI Risk Manager","AI Compliance Officer","AI Security Consultant","Enterprise AI Architect","AI Policy Advisor","AI Program Manager"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Microsoft Certified: Cybersecurity Architect Expert","Google Professional Machine Learning Engineer","AWS Certified AI Practitioner","IBM Generative AI Engineering Professional Certificate"],
    realWorldCases: { intro: "Develop a complete AI governance framework that includes:", bullets: ["Enterprise Governance Case Studies","Governance policy development","Risk assessment","Compliance planning","Security controls","Monitoring strategy","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for AI leaders, governance professionals, architects, compliance teams, and security specialists." },
      { question: "Is prior Generative AI experience required?", answer: "Yes. Basic knowledge of AI, cloud platforms, security, and compliance concepts is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes governance workshops, compliance labs, enterprise case studies, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, OpenAI API, Gemini API, Claude API, Microsoft Purview, Azure AI Foundry, AWS Bedrock, LangSmith, MLflow, Grafana, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn AI governance, Responsible AI, compliance, risk management, auditing, policy development, monitoring, and enterprise governance implementation." }
    ]
  },
  "Generative AI - Hands-on Labs": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Generative AI, Python programming, APIs, prompt engineering, and familiarity with Large Language Models (LLMs).",
    overview: "The Generative AI – Hands-on Labs course is designed for AI developers, software engineers, data scientists, and technology professionals who want to gain practical experience in building Generative AI applications. The course emphasizes real-world labs covering LLM integration, prompt engineering, Retrieval-Augmented Generation (RAG), AI agents, workflow automation, deployment, monitoring, and enterprise use cases. Through guided exercises and practical projects, participants will build production-ready AI solutions using modern Generative AI tools and frameworks.",
    objectives: ["Build real-world Generative AI applications.","Develop prompt-driven AI solutions.","Implement RAG-based knowledge assistants.","Create AI agents and workflow automation.","Integrate LLM APIs with enterprise applications.","Deploy and monitor AI solutions.","Solve business problems using Generative AI."],
    days: [
      { day: 1, title: "LLM Development Labs", topics: ["Generative AI Fundamentals","OpenAI API","Google Gemini API","Prompt Engineering","Context Management","AI Chatbot Development","Best Practices"], handsOn: ["Building AI chatbots","Creating optimized prompts","Testing LLM responses"], outcome: "Develop practical skills in creating prompt-based AI applications using modern LLM platforms." },
      { day: 2, title: "RAG & Knowledge Assistant Labs", topics: ["Retrieval-Augmented Generation (RAG)","Embeddings","Vector Databases","LangChain","LlamaIndex","Document Processing","Semantic Search"], handsOn: ["Building RAG applications","Creating document assistants","Implementing semantic search"], outcome: "Build AI applications capable of retrieving and generating accurate responses from enterprise knowledge sources." },
      { day: 3, title: "AI Agents & Workflow Automation Labs", topics: ["AI Agents","LangGraph","Function Calling","Tool Integration","Workflow Automation","Multi-Agent Systems","Business Automation"], handsOn: ["Developing AI agents","Automating business workflows","Integrating external tools"], outcome: "Create intelligent AI agents that automate tasks and interact with enterprise systems." },
      { day: 4, title: "Deployment & Monitoring Labs", topics: ["FastAPI Development","Docker Deployment","Monitoring","Logging","AI Security","Performance Optimization","Troubleshooting"], handsOn: ["Deploying AI applications","Monitoring AI services","Optimizing application performance"], outcome: "Deploy, monitor, and optimize enterprise-ready AI applications using modern deployment practices." },
      { day: 5, title: "Enterprise Lab Project & Assessment", topics: ["Enterprise AI Case Studies","End-to-End AI Application","Performance Review","Future Trends in Generative AI","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","OpenAI API","Google Gemini API","Anthropic Claude API","LangChain","LangGraph","LlamaIndex","FastAPI","Pinecone","ChromaDB","Docker","Git & GitHub","Jupyter Notebook"],
    careers: ["Generative AI Developer","LLM Engineer","AI Application Developer","AI Solutions Engineer","MLOps Engineer","AI Consultant","Machine Learning Engineer","AI Platform Engineer"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Google Professional Machine Learning Engineer","AWS Certified AI Practitioner","IBM Generative AI Engineering Professional Certificate","TensorFlow Developer Certificate"],
    realWorldCases: { intro: "Develop a complete Generative AI application that includes:", bullets: ["Enterprise AI Case Studies","LLM integration","Prompt engineering","RAG implementation","AI agent workflow","Deployment and monitoring","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for developers, AI engineers, data scientists, and technology professionals." },
      { question: "Is prior Generative AI experience required?", answer: "Yes. Basic knowledge of Python, APIs, and Generative AI fundamentals is recommended." },
      { question: "Are practical labs included?", answer: "Yes. Every session includes hands-on labs, enterprise exercises, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, OpenAI API, Gemini API, Claude API, LangChain, LangGraph, LlamaIndex, FastAPI, Pinecone, ChromaDB, Docker, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn LLM development, RAG implementation, AI agents, deployment, monitoring, workflow automation, and enterprise Generative AI application development." }
    ]
  },
  "Generative AI - Implementation": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Generative AI, Python programming, APIs, cloud platforms, and familiarity with Large Language Models (LLMs).",
    overview: "The Generative AI – Implementation course is designed for AI developers, solution architects, software engineers, technology consultants, and IT professionals who want to successfully implement Generative AI solutions in enterprise environments. The course focuses on implementation planning, LLM integration, RAG deployment, AI agents, enterprise workflows, security, governance, testing, and production rollout. Through hands-on labs, practical exercises, and real-world implementation scenarios, participants will learn how to deploy scalable and business-ready Generative AI applications.",
    objectives: ["Plan and implement Generative AI solutions.","Deploy LLM-powered enterprise applications.","Integrate AI with business systems and workflows.","Build RAG-enabled AI applications.","Apply security and governance during implementation.","Validate AI solutions before production.","Deliver enterprise-ready AI deployments."],
    days: [
      { day: 1, title: "Implementation Planning & Design", topics: ["Introduction to AI Implementation","Business Requirement Analysis","Solution Planning","Architecture Overview","LLM Selection","Deployment Strategy","Implementation Best Practices"], handsOn: ["Planning AI implementation","Designing solution workflows","Selecting suitable AI models"], outcome: "Understand how to plan and design successful Generative AI implementations aligned with business objectives." },
      { day: 2, title: "AI Development & Integration", topics: ["OpenAI API Integration","Prompt Engineering","RAG Implementation","AI Agent Integration","Enterprise API Connectivity","Workflow Automation","Data Integration"], handsOn: ["Developing AI applications","Integrating enterprise systems","Building RAG workflows"], outcome: "Implement intelligent AI applications integrated with enterprise data sources and business processes." },
      { day: 3, title: "Deployment, Security & Validation", topics: ["Application Deployment","Docker Fundamentals","AI Security","Authentication & Authorization","Governance Framework","Testing & Validation","Performance Optimization"], handsOn: ["Deploying AI applications","Validating AI performance","Implementing security controls"], outcome: "Deploy secure and validated Generative AI solutions ready for production environments." },
      { day: 4, title: "Monitoring & Operational Readiness", topics: ["AI Monitoring","Logging & Alerts","Performance Tracking","Cost Optimization","Incident Management","User Adoption","Operational Best Practices"], handsOn: ["Monitoring AI applications","Configuring alerts","Optimizing operational performance"], outcome: "Prepare AI solutions for reliable enterprise operations through monitoring, optimization, and operational readiness." },
      { day: 5, title: "Enterprise Implementation Project & Assessment", topics: ["Enterprise Implementation Case Studies","End-to-End AI Solution","Production Readiness Review","Future Trends in Generative AI","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","OpenAI API","Google Gemini API","Anthropic Claude API","LangChain","LangGraph","LlamaIndex","FastAPI","ChromaDB","Docker","Git & GitHub","Jupyter Notebook"],
    careers: ["Generative AI Engineer","AI Implementation Specialist","AI Solutions Developer","LLM Application Developer","AI Consultant","MLOps Engineer","AI Platform Engineer","Machine Learning Engineer"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Google Professional Machine Learning Engineer","AWS Certified AI Practitioner","IBM Generative AI Engineering Professional Certificate","Google Professional Cloud Developer"],
    realWorldCases: { intro: "Develop a complete Generative AI implementation that includes:", bullets: ["Enterprise Implementation Case Studies","Business requirement analysis","LLM integration","RAG deployment","Security implementation","Monitoring strategy","Documentation and project presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for AI developers, solution architects, consultants, and software engineers." },
      { question: "Is prior Generative AI experience required?", answer: "Yes. Basic knowledge of Python, APIs, and Generative AI concepts is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes implementation labs, deployment exercises, enterprise scenarios, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, OpenAI API, Gemini API, Claude API, LangChain, LangGraph, LlamaIndex, FastAPI, ChromaDB, Docker, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn AI implementation planning, LLM integration, RAG deployment, enterprise integration, security, monitoring, and production-ready Generative AI deployment." }
    ]
  },
  "Generative AI - Infrastructure": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Python programming, cloud computing, networking, DevOps concepts, containers, and familiarity with Generative AI and Large Language Models (LLMs).",
    overview: "The Generative AI – Infrastructure course is designed for AI engineers, cloud architects, infrastructure engineers, DevOps professionals, and IT administrators responsible for building and managing enterprise AI platforms. The course covers AI infrastructure architecture, cloud deployment, GPU computing, Kubernetes, storage, networking, Infrastructure as Code (IaC), monitoring, security, scalability, disaster recovery, and operational best practices. Through hands-on labs, enterprise case studies, and practical projects, participants will gain the expertise required to design, deploy, and maintain high-performance infrastructure for Generative AI workloads.",
    objectives: ["Design scalable infrastructure for Generative AI applications.","Deploy AI workloads across cloud and hybrid environments.","Manage GPU-enabled computing resources.","Implement Infrastructure as Code (IaC) for automation.","Secure enterprise AI infrastructure.","Monitor and optimize infrastructure performance.","Build highly available and resilient AI platforms."],
    days: [
      { day: 1, title: "AI Infrastructure Foundations", topics: ["Introduction to AI Infrastructure","Enterprise AI Architecture","Compute Resources","GPU Infrastructure","Networking Fundamentals","Storage Architecture","Infrastructure Planning"], handsOn: ["Designing AI infrastructure","Planning compute resources","Configuring networking basics"], outcome: "Understand the core components required to build reliable and scalable infrastructure for enterprise Generative AI applications." },
      { day: 2, title: "Cloud Infrastructure & Containerization", topics: ["Cloud AI Platforms","Virtual Machines","Docker","Kubernetes","Container Orchestration","Load Balancing","Auto Scaling"], handsOn: ["Deploying containerized AI applications","Configuring Kubernetes clusters","Managing scalable cloud infrastructure"], outcome: "Deploy and manage cloud-native infrastructure capable of supporting enterprise AI workloads efficiently." },
      { day: 3, title: "Infrastructure Automation & Security", topics: ["Infrastructure as Code (IaC)","Terraform","Configuration Management","Identity & Access Management","Infrastructure Security","Backup & Recovery","Compliance"], handsOn: ["Automating infrastructure deployment","Implementing security controls","Configuring backup strategies"], outcome: "Build secure and automated AI infrastructure while ensuring compliance, availability, and operational resilience." },
      { day: 4, title: "Monitoring, Performance & Optimization", topics: ["Infrastructure Monitoring","Logging","Performance Tuning","GPU Optimization","Resource Utilization","Cost Optimization","Capacity Planning"], handsOn: ["Monitoring infrastructure health","Optimizing AI resources","Improving infrastructure performance"], outcome: "Monitor, optimize, and maintain enterprise AI infrastructure for maximum performance and cost efficiency." },
      { day: 5, title: "Enterprise Infrastructure Project & Assessment", topics: ["Enterprise Infrastructure Case Studies","End-to-End AI Platform Deployment","Infrastructure Review","Future Trends in AI Infrastructure","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Docker","Kubernetes","Terraform","OpenAI API","Google Gemini API","NVIDIA CUDA","Prometheus","Grafana","AWS","Microsoft Azure","Google Cloud Platform (GCP)","Git & GitHub"],
    careers: ["AI Infrastructure Engineer","Cloud AI Architect","MLOps Engineer","DevOps Engineer","Platform Engineer","Site Reliability Engineer (SRE)","Cloud Solutions Architect","AI Systems Engineer"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified AI Practitioner","Google Professional Cloud Architect","Google Professional Cloud DevOps Engineer","HashiCorp Terraform Associate"],
    realWorldCases: { intro: "Develop a complete Generative AI infrastructure solution that includes:", bullets: ["Enterprise Infrastructure Case Studies","Enterprise infrastructure architecture","Kubernetes deployment","Infrastructure automation","Security implementation","Monitoring and optimization","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for cloud architects, infrastructure engineers, AI engineers, and DevOps professionals." },
      { question: "Is prior infrastructure experience required?", answer: "Yes. Basic knowledge of cloud platforms, containers, networking, and Generative AI concepts is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes infrastructure labs, cloud deployment exercises, enterprise projects, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, Docker, Kubernetes, Terraform, OpenAI API, Gemini API, NVIDIA CUDA, Prometheus, Grafana, AWS, Microsoft Azure, GCP, and Git & GitHub." },
      { question: "What skills will I gain?", answer: "You will learn AI infrastructure design, cloud deployment, container orchestration, Infrastructure as Code, monitoring, security, GPU optimization, and enterprise AI platform management." }
    ]
  },
  "Generative AI - Integration": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Generative AI, Python programming, REST APIs, cloud platforms, and familiarity with Large Language Models (LLMs).",
    overview: "The Generative AI – Integration course is designed for AI developers, software engineers, solution architects, integration specialists, and technology professionals who want to integrate Generative AI into enterprise applications and business workflows. The course covers API integration, LLM connectivity, Retrieval-Augmented Generation (RAG), enterprise systems, AI agents, cloud services, security, and deployment strategies. Through hands-on labs, enterprise scenarios, and practical projects, participants will learn how to seamlessly connect Generative AI with modern business applications.",
    objectives: ["Integrate LLMs with enterprise applications.","Develop AI-powered APIs and services.","Build Retrieval-Augmented Generation (RAG) integrations.","Connect AI with databases and business platforms.","Secure AI integrations using enterprise best practices.","Deploy scalable AI integration solutions.","Automate workflows using AI agents."],
    days: [
      { day: 1, title: "Integration Fundamentals", topics: ["Introduction to AI Integration","REST API Fundamentals","OpenAI API Integration","Authentication Methods","API Keys & Security","Enterprise Integration Patterns","Integration Best Practices"], handsOn: ["Connecting to AI APIs","Creating API requests","Testing AI integrations"], outcome: "Understand the core principles of integrating Generative AI with enterprise applications using secure API-based communication." },
      { day: 2, title: "RAG & Enterprise Connectivity", topics: ["Retrieval-Augmented Generation (RAG)","Embeddings","Vector Databases","Database Integration","CRM & ERP Integration","Document Processing","Knowledge Retrieval"], handsOn: ["Building RAG workflows","Connecting enterprise databases","Integrating business applications"], outcome: "Develop knowledge-driven AI integrations capable of accessing enterprise data efficiently and accurately." },
      { day: 3, title: "AI Agents & Workflow Integration", topics: ["AI Agents","LangChain Integration","LangGraph Workflows","Function Calling","Tool Integration","MCP Overview","Workflow Automation"], handsOn: ["Building AI agent workflows","Connecting external tools","Automating business processes"], outcome: "Create intelligent AI workflows that integrate with multiple systems and automate enterprise operations." },
      { day: 4, title: "Deployment, Security & Monitoring", topics: ["FastAPI Development","Docker Deployment","Cloud Integration","API Security","Monitoring & Logging","Performance Optimization","Error Handling"], handsOn: ["Deploying AI integration services","Monitoring API performance","Securing AI endpoints"], outcome: "Deploy secure and scalable AI integration services with effective monitoring and operational controls." },
      { day: 5, title: "Enterprise Integration Project & Assessment", topics: ["Enterprise Integration Case Studies","End-to-End AI Integration Solution","Performance Review","Future Trends in AI Integration","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","OpenAI API","Google Gemini API","Anthropic Claude API","LangChain","LangGraph","LlamaIndex","FastAPI","Pinecone","ChromaDB","FAISS","Docker","Postman","Git & GitHub","Jupyter Notebook"],
    careers: ["Generative AI Integration Engineer","AI Application Developer","AI Solutions Engineer","LLM Developer","API Developer","Machine Learning Engineer","AI Consultant","Integration Architect"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Google Professional Machine Learning Engineer","AWS Certified AI Practitioner","IBM Generative AI Engineering Professional Certificate","Google Professional Cloud Developer"],
    realWorldCases: { intro: "Develop a complete Generative AI integration solution that includes:", bullets: ["Enterprise Integration Case Studies","LLM API integration","RAG implementation","Enterprise system connectivity","AI agent workflow","Deployment and monitoring","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for AI developers, software engineers, integration specialists, and solution architects." },
      { question: "Is prior Generative AI experience required?", answer: "Yes. Basic knowledge of Python, APIs, and Generative AI concepts is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes API integration labs, RAG development, workflow automation, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, OpenAI API, Gemini API, Claude API, LangChain, LangGraph, LlamaIndex, FastAPI, Pinecone, ChromaDB, FAISS, Docker, Postman, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn AI integration, API development, RAG implementation, AI agents, enterprise connectivity, deployment, and secure Generative AI integration." }
    ]
  },
  "Generative AI - Migration": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Generative AI, Python programming, cloud computing, APIs, databases, Large Language Models (LLMs), and enterprise application development.",
    overview: "The Generative AI – Migration course is designed for AI engineers, cloud architects, solution architects, MLOps professionals, and enterprise technology teams responsible for modernizing AI systems. The course covers migration planning, legacy system modernization, LLM migration, RAG migration, data migration, model transition, cloud migration, deployment strategies, security, governance, and post-migration optimization. Through hands-on labs, enterprise case studies, and real-world migration projects, participants will learn how to successfully migrate enterprise applications to modern Generative AI platforms.",
    objectives: ["Plan and execute Generative AI migration projects.","Migrate legacy AI applications to modern LLM platforms.","Transition data and knowledge bases securely.","Modernize enterprise AI architectures.","Deploy cloud-native Generative AI solutions.","Validate migrated AI systems.","Optimize migrated environments for performance and scalability."],
    days: [
      { day: 1, title: "Migration Strategy & Assessment", topics: ["Introduction to AI Migration","Migration Planning","Legacy System Assessment","Migration Readiness","AI Architecture Review","Risk Assessment","Migration Roadmap"], handsOn: ["Assessing existing AI systems","Creating migration plans","Identifying migration risks"], outcome: "Understand how to evaluate existing AI environments and develop a structured migration strategy." },
      { day: 2, title: "Model & Data Migration", topics: ["LLM Migration","Prompt Migration","Knowledge Base Migration","Embedding Migration","Vector Database Migration","Data Validation","Migration Testing"], handsOn: ["Migrating AI models","Moving vector databases","Validating migrated datasets"], outcome: "Learn how to migrate AI models, prompts, and enterprise knowledge while maintaining data integrity." },
      { day: 3, title: "Cloud Migration & Enterprise Integration", topics: ["Cloud AI Platforms","API Migration","Application Integration","RAG Migration","Infrastructure Migration","Deployment Automation","Enterprise Connectivity"], handsOn: ["Migrating AI services to cloud platforms","Integrating enterprise systems","Automating migration workflows"], outcome: "Successfully migrate enterprise AI applications to scalable cloud environments with minimal disruption." },
      { day: 4, title: "Security, Governance & Optimization", topics: ["Migration Security","Identity & Access Management","Compliance Validation","AI Governance","Performance Optimization","Monitoring","Rollback Strategies"], handsOn: ["Securing migrated environments","Monitoring migration performance","Optimizing AI deployments"], outcome: "Ensure migrated AI systems remain secure, compliant, high-performing, and operationally reliable." },
      { day: 5, title: "Enterprise Migration Project & Assessment", topics: ["Enterprise Migration Case Studies","End-to-End Migration Project","Post-Migration Validation","Future Trends in AI Modernization","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","OpenAI API","Google Gemini API","Anthropic Claude API","LangChain","LlamaIndex","Pinecone","ChromaDB","FAISS","Docker","Kubernetes","AWS Bedrock","Azure AI Foundry","Google Vertex AI","Git & GitHub","Jupyter Notebook"],
    careers: ["Generative AI Migration Engineer","AI Solutions Architect","Cloud AI Engineer","MLOps Engineer","AI Platform Engineer","Enterprise AI Consultant","Machine Learning Engineer","AI Transformation Specialist"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Google Professional Machine Learning Engineer","AWS Certified AI Practitioner","AWS Certified Machine Learning Engineer – Associate","Google Professional Cloud Architect"],
    realWorldCases: { intro: "Develop a complete Generative AI migration solution that includes:", bullets: ["Enterprise Migration Case Studies","Migration assessment and planning","LLM and knowledge base migration","Cloud deployment strategy","Security and governance implementation","Performance validation","Documentation and project presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for AI engineers, cloud architects, solution architects, and MLOps professionals." },
      { question: "Is prior Generative AI experience required?", answer: "Yes. Participants should have knowledge of Python, APIs, cloud platforms, and Generative AI fundamentals." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes migration workshops, cloud deployment labs, validation exercises, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, OpenAI API, Gemini API, Claude API, LangChain, LlamaIndex, Pinecone, ChromaDB, FAISS, Docker, Kubernetes, AWS Bedrock, Azure AI Foundry, Google Vertex AI, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn migration planning, LLM modernization, RAG migration, cloud deployment, governance, security, performance optimization, and enterprise AI migration strategies." }
    ]
  },
  "Generative AI - Monitoring": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Generative AI, Python programming, APIs, cloud platforms, and familiarity with LLM-based applications.",
    overview: "The Generative AI – Monitoring course is designed for AI engineers, MLOps professionals, DevOps engineers, cloud administrators, and technology professionals responsible for monitoring enterprise Generative AI systems. The course focuses on LLM observability, performance monitoring, model evaluation, prompt analytics, logging, security monitoring, cost tracking, incident management, and operational best practices. Through hands-on labs, enterprise case studies, and real-world projects, participants will learn how to maintain reliable, secure, and high-performing AI applications.",
    objectives: ["Monitor Generative AI applications and services.","Track LLM performance and response quality.","Analyze prompts, token usage, and operational metrics.","Implement logging and observability frameworks.","Detect anomalies and troubleshoot AI systems.","Monitor AI security and compliance.","Optimize production AI environments."],
    days: [
      { day: 1, title: "Monitoring Fundamentals", topics: ["Introduction to AI Monitoring","LLM Observability","Monitoring Architecture","Logging Fundamentals","System Metrics","Performance Indicators","Monitoring Best Practices"], handsOn: ["Configuring monitoring tools","Collecting AI metrics","Monitoring application health"], outcome: "Understand how to monitor Generative AI systems and establish effective observability practices." },
      { day: 2, title: "Performance & Usage Monitoring", topics: ["Response Time Analysis","Token Usage Monitoring","Prompt Analytics","Latency Measurement","Resource Utilization","Cost Monitoring","User Activity Tracking"], handsOn: ["Measuring API performance","Analyzing prompt usage","Monitoring infrastructure costs"], outcome: "Monitor AI performance, usage patterns, and operational costs to improve efficiency and user experience." },
      { day: 3, title: "Security Monitoring & Model Evaluation", topics: ["Security Monitoring","Threat Detection","Prompt Injection Detection","AI Safety Monitoring","Model Evaluation","Response Quality Analysis","Compliance Monitoring"], handsOn: ["Monitoring security events","Evaluating model outputs","Reviewing compliance reports"], outcome: "Ensure Generative AI applications remain secure, compliant, and consistently deliver high-quality responses." },
      { day: 4, title: "Incident Management & Optimization", topics: ["Incident Detection","Alert Management","Root Cause Analysis","Error Tracking","Performance Optimization","Automated Monitoring","Operational Dashboards"], handsOn: ["Configuring alerts","Investigating AI incidents","Optimizing monitoring workflows"], outcome: "Detect, analyze, and resolve operational issues while improving the stability of enterprise AI environments." },
      { day: 5, title: "Enterprise Monitoring Project & Assessment", topics: ["Enterprise Monitoring Case Studies","End-to-End Monitoring Strategy","Operational Review","Future Trends in AI Observability","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","OpenAI API","Google Gemini API","LangSmith","Langfuse","MLflow","Prometheus","Grafana","Elasticsearch","Kibana","Docker","Kubernetes","Git & GitHub","Jupyter Notebook"],
    careers: ["Generative AI Monitoring Engineer","MLOps Engineer","AI Operations Engineer","AI Platform Engineer","DevOps Engineer","Cloud AI Engineer","AI Support Engineer","Site Reliability Engineer (AI)"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Google Professional Machine Learning Engineer","AWS Certified AI Practitioner","AWS Certified Machine Learning Engineer – Associate","Google Professional Cloud DevOps Engineer"],
    realWorldCases: { intro: "Develop a complete Generative AI monitoring solution that includes:", bullets: ["Enterprise Monitoring Case Studies","Performance monitoring dashboard","Token and usage analytics","Security monitoring","Alert and incident management","Operational reporting","Documentation and project presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for AI engineers, MLOps professionals, DevOps engineers, and cloud administrators." },
      { question: "Is prior Generative AI experience required?", answer: "Yes. Basic knowledge of Generative AI, APIs, and cloud platforms is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes monitoring labs, observability exercises, dashboard creation, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, OpenAI API, Gemini API, LangSmith, Langfuse, MLflow, Prometheus, Grafana, Elasticsearch, Kibana, Docker, Kubernetes, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn AI observability, LLM monitoring, prompt analytics, logging, security monitoring, incident management, and enterprise AI performance optimization." }
    ]
  },
  "Generative AI - Operations": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Generative AI, Python programming, APIs, cloud computing, DevOps concepts, and familiarity with Large Language Models (LLMs).",
    overview: "The Generative AI – Operations course is designed for AI engineers, MLOps professionals, DevOps engineers, cloud administrators, and IT professionals responsible for managing enterprise Generative AI environments. The course covers AI operations, deployment management, LLM lifecycle management, monitoring, incident response, security, governance, automation, scalability, and operational best practices. Through hands-on labs, enterprise case studies, and practical projects, participants will gain the skills required to operate, maintain, and optimize production-ready Generative AI systems.",
    objectives: ["Manage Generative AI applications in production.","Monitor AI performance and operational health.","Automate operational workflows and deployments.","Implement AI governance and security controls.","Troubleshoot operational issues effectively.","Optimize AI infrastructure and resource usage.","Maintain scalable and reliable AI environments."],
    days: [
      { day: 1, title: "AI Operations Fundamentals", topics: ["Introduction to AI Operations","LLM Lifecycle Management","Production Architecture","Operational Best Practices","Infrastructure Planning","Deployment Models","Service Management"], handsOn: ["Managing AI environments","Reviewing operational workflows","Planning production deployments"], outcome: "Understand the operational lifecycle of enterprise Generative AI applications and production environments." },
      { day: 2, title: "Deployment & Infrastructure Management", topics: ["Docker Deployment","Kubernetes Orchestration","Cloud AI Services","Infrastructure Scaling","Resource Management","Configuration Management","Backup & Recovery"], handsOn: ["Deploying AI applications","Managing cloud resources","Configuring scalable infrastructure"], outcome: "Deploy and manage scalable AI infrastructure while ensuring operational continuity and reliability." },
      { day: 3, title: "Monitoring, Security & Incident Response", topics: ["AI Monitoring","Logging & Observability","Security Operations","Identity & Access Management","Incident Response","Performance Analysis","Compliance Monitoring"], handsOn: ["Monitoring AI workloads","Investigating operational incidents","Implementing security controls"], outcome: "Maintain secure and stable AI environments through proactive monitoring and rapid incident resolution." },
      { day: 4, title: "Automation & Performance Optimization", topics: ["Workflow Automation","CI/CD for AI","Cost Optimization","Capacity Planning","Performance Tuning","Operational Dashboards","Continuous Improvement"], handsOn: ["Automating operational tasks","Optimizing AI workloads","Building monitoring dashboards"], outcome: "Improve operational efficiency through automation, optimization, and continuous performance management." },
      { day: 5, title: "Enterprise Operations Project & Assessment", topics: ["Enterprise Operations Case Studies","End-to-End AI Operations Strategy","Production Readiness Review","Future Trends in AI Operations","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","OpenAI API","Google Gemini API","Anthropic Claude API","Docker","Kubernetes","LangChain","LangSmith","Prometheus","Grafana","MLflow","Git & GitHub","Jupyter Notebook"],
    careers: ["Generative AI Operations Engineer","MLOps Engineer","AI Platform Engineer","DevOps Engineer","Cloud AI Engineer","Site Reliability Engineer (AI)","AI Infrastructure Engineer","AI Operations Consultant"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Google Professional Machine Learning Engineer","AWS Certified AI Practitioner","Google Professional Cloud DevOps Engineer","AWS Certified Machine Learning Engineer – Associate"],
    realWorldCases: { intro: "Develop a complete AI operations solution that includes:", bullets: ["Enterprise Operations Case Studies","Production deployment","Infrastructure management","Monitoring and logging","Security implementation","Automation strategy","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for AI engineers, MLOps professionals, DevOps engineers, and cloud administrators." },
      { question: "Is prior Generative AI experience required?", answer: "Yes. Basic knowledge of Python, cloud platforms, APIs, and AI fundamentals is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes deployment labs, monitoring exercises, automation tasks, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, OpenAI API, Gemini API, Claude API, Docker, Kubernetes, LangChain, LangSmith, Prometheus, Grafana, MLflow, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn AI operations, deployment management, monitoring, automation, infrastructure optimization, security, and enterprise AI operations best practices." }
    ]
  },
  "Generative AI - Performance Tuning": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Generative AI, Python programming, APIs, Large Language Models (LLMs), cloud platforms, and AI application development.",
    overview: "The Generative AI – Performance Tuning course is designed for AI engineers, LLM developers, MLOps professionals, solution architects, and technology experts who want to optimize the speed, accuracy, scalability, and cost-efficiency of Generative AI applications. The course covers prompt optimization, model tuning, Retrieval-Augmented Generation (RAG) optimization, inference performance, token management, caching, GPU optimization, monitoring, and enterprise performance best practices. Through hands-on labs, enterprise scenarios, and practical projects, participants will learn how to build high-performing and production-ready AI systems.",
    objectives: ["Optimize LLM performance and response quality.","Improve prompt efficiency and token utilization.","Tune RAG pipelines for better retrieval accuracy.","Reduce latency and operational costs.","Optimize inference and resource utilization.","Monitor and benchmark AI performance.","Build scalable and high-performance AI solutions."],
    days: [
      { day: 1, title: "Performance Optimization Fundamentals", topics: ["Introduction to AI Performance","Performance Metrics","Latency Analysis","Throughput Optimization","Token Management","Prompt Optimization","Benchmarking Techniques"], handsOn: ["Measuring model performance","Optimizing prompts","Benchmarking AI responses"], outcome: "Understand key performance metrics and optimize Generative AI applications for faster and more efficient responses." },
      { day: 2, title: "Model & RAG Optimization", topics: ["Model Selection","Inference Optimization","RAG Performance Tuning","Embedding Optimization","Vector Database Optimization","Context Window Management","Response Quality Improvement"], handsOn: ["Optimizing RAG pipelines","Improving retrieval accuracy","Fine-tuning inference settings"], outcome: "Improve AI response quality and retrieval efficiency through optimized models and knowledge pipelines." },
      { day: 3, title: "Infrastructure & Resource Optimization", topics: ["GPU Optimization","Memory Management","Model Quantization","Batch Processing","Caching Strategies","Load Balancing","Cloud Resource Optimization"], handsOn: ["Optimizing infrastructure","Implementing caching","Managing compute resources"], outcome: "Optimize infrastructure and resource utilization to achieve scalable and cost-effective AI deployments." },
      { day: 4, title: "Monitoring, Scaling & Cost Optimization", topics: ["Performance Monitoring","AI Observability","Auto Scaling","Cost Analysis","Capacity Planning","Performance Troubleshooting","Continuous Optimization"], handsOn: ["Monitoring AI workloads","Scaling AI services","Optimizing operational costs"], outcome: "Monitor and continuously improve AI application performance while maintaining operational efficiency and scalability." },
      { day: 5, title: "Enterprise Performance Project & Assessment", topics: ["Enterprise Performance Case Studies","End-to-End Optimization Strategy","Performance Review","Future Trends in AI Optimization","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","OpenAI API","Google Gemini API","Anthropic Claude API","LangChain","LangGraph","LlamaIndex","Pinecone","FAISS","ChromaDB","MLflow","Docker","Kubernetes","Grafana","Prometheus","Git & GitHub"],
    careers: ["Generative AI Performance Engineer","LLM Engineer","MLOps Engineer","AI Infrastructure Engineer","AI Solutions Architect","Machine Learning Engineer","AI Platform Engineer","Cloud AI Engineer"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Google Professional Machine Learning Engineer","AWS Certified Machine Learning Engineer – Associate","AWS Certified AI Practitioner","Google Professional Cloud DevOps Engineer"],
    realWorldCases: { intro: "Develop a high-performance Generative AI solution that includes:", bullets: ["Enterprise Performance Case Studies","Prompt optimization","RAG performance tuning","Infrastructure optimization","Monitoring and benchmarking","Cost optimization strategy","Documentation and project presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for AI engineers, LLM developers, MLOps professionals, and cloud engineers." },
      { question: "Is prior Generative AI experience required?", answer: "Yes. Basic knowledge of Python, LLMs, APIs, and AI development is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes optimization labs, benchmarking exercises, RAG tuning, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, OpenAI API, Gemini API, Claude API, LangChain, LangGraph, LlamaIndex, Pinecone, FAISS, ChromaDB, MLflow, Docker, Kubernetes, Grafana, Prometheus, and Git & GitHub." },
      { question: "What skills will I gain?", answer: "You will learn prompt optimization, RAG tuning, inference optimization, GPU utilization, monitoring, benchmarking, scalability, and enterprise AI performance optimization." }
    ]
  },
  "Generative AI - Reporting": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Generative AI, Python programming, data analysis, APIs, and familiarity with Large Language Models (LLMs).",
    overview: "The Generative AI – Reporting course is designed for AI engineers, business analysts, data professionals, solution architects, and technology specialists who want to create intelligent reporting solutions using Generative AI. The course focuses on AI-powered report generation, data summarization, Retrieval-Augmented Generation (RAG), dashboard integration, automated documentation, business insights, visualization, and enterprise reporting workflows. Through hands-on labs, real-world case studies, and practical projects, participants will learn how to generate accurate, interactive, and business-ready reports using modern AI technologies.",
    objectives: ["Build AI-powered reporting solutions.","Generate automated reports using LLMs.","Create business summaries and insights.","Integrate AI with reporting dashboards.","Implement RAG-based reporting systems.","Improve reporting accuracy and efficiency.","Deliver enterprise-ready reporting workflows."],
    days: [
      { day: 1, title: "AI Reporting Fundamentals", topics: ["Introduction to AI Reporting","Report Generation Concepts","Business Reporting","Data Summarization","Prompt Engineering","Report Templates","Reporting Best Practices"], handsOn: ["Creating AI-generated reports","Designing reporting templates","Summarizing business data"], outcome: "Understand how Generative AI simplifies report creation and business documentation through intelligent automation." },
      { day: 2, title: "AI Data Analysis & Report Automation", topics: ["LLM-Based Analysis","Business Insights","Automated Report Generation","API Integration","Workflow Automation","Document Generation","Report Customization"], handsOn: ["Automating business reports","Integrating AI APIs","Creating customized reports"], outcome: "Develop AI-powered reporting workflows that automatically generate accurate and meaningful business reports." },
      { day: 3, title: "RAG & Dashboard Integration", topics: ["Retrieval-Augmented Generation (RAG)","Enterprise Knowledge Bases","Dashboard Integration","Power BI Integration","Data Visualization","Interactive Reporting","Performance Monitoring"], handsOn: ["Building RAG reporting systems","Connecting reporting dashboards","Visualizing AI insights"], outcome: "Integrate enterprise data sources and dashboards to generate dynamic AI-powered reports." },
      { day: 4, title: "Security, Governance & Optimization", topics: ["Report Security","Data Privacy","Governance","Access Control","Report Validation","Performance Optimization","Reporting Standards"], handsOn: ["Securing AI reports","Optimizing reporting workflows","Validating generated content"], outcome: "Implement secure, compliant, and optimized AI reporting systems suitable for enterprise environments." },
      { day: 5, title: "Enterprise Reporting Project & Assessment", topics: ["Enterprise Reporting Case Studies","End-to-End AI Reporting Solution","Report Review","Future Trends in AI Reporting","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","OpenAI API","Google Gemini API","Anthropic Claude API","LangChain","LlamaIndex","FastAPI","Microsoft Power BI","Tableau","Pandas","Git & GitHub","Jupyter Notebook"],
    careers: ["AI Reporting Analyst","Business Intelligence Developer","Generative AI Engineer","Data Analyst","AI Solutions Consultant","Reporting Automation Specialist","Business Intelligence Consultant","AI Application Developer"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Microsoft Power BI Data Analyst Associate (PL-300)","Google Professional Machine Learning Engineer","AWS Certified AI Practitioner","IBM Generative AI Engineering Professional Certificate"],
    realWorldCases: { intro: "Develop a complete AI-powered reporting solution that includes:", bullets: ["Enterprise Reporting Case Studies","Automated report generation","Business data summarization","RAG integration","Dashboard connectivity","Security implementation","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for AI engineers, analysts, BI professionals, and developers." },
      { question: "Is prior reporting experience required?", answer: "Basic knowledge of Python, reporting concepts, and Generative AI is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes reporting labs, dashboard integration exercises, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, OpenAI API, Gemini API, Claude API, LangChain, LlamaIndex, FastAPI, Power BI, Tableau, Pandas, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn AI-powered reporting, automated report generation, RAG integration, dashboard connectivity, report security, and enterprise reporting automation." }
    ]
  },
  "Generative AI - Scripting": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Python programming, APIs, Generative AI concepts, automation, and familiarity with Large Language Models (LLMs).",
    overview: "The Generative AI – Scripting course is designed for AI engineers, software developers, automation specialists, DevOps professionals, and technology experts who want to build intelligent scripts powered by Generative AI. The course focuses on Python scripting, LLM integration, prompt engineering, API automation, workflow scripting, file processing, RAG integration, task automation, and enterprise scripting best practices. Through hands-on labs, real-world projects, and enterprise case studies, participants will gain practical experience in developing AI-driven automation scripts for business and technical workflows.",
    objectives: ["Develop AI-powered automation scripts.","Integrate LLM APIs into Python applications.","Automate business and IT workflows.","Build RAG-enabled scripting solutions.","Process documents and structured data.","Optimize and secure AI scripts.","Deploy production-ready automation solutions."],
    days: [
      { day: 1, title: "AI Scripting Fundamentals", topics: ["Introduction to AI Scripting","Python Automation","Prompt Engineering","OpenAI API Integration","Script Design","Error Handling","Scripting Best Practices"], handsOn: ["Writing AI-powered scripts","Automating repetitive tasks","Testing prompt-based scripts"], outcome: "Understand the fundamentals of AI scripting and build intelligent automation scripts using Python and LLMs." },
      { day: 2, title: "API Integration & Workflow Automation", topics: ["Google Gemini API","Anthropic Claude API","REST API Integration","Function Calling","Workflow Automation","Data Processing","File Handling"], handsOn: ["Integrating AI APIs","Automating file operations","Developing workflow scripts"], outcome: "Build automation scripts that integrate AI services with business applications and enterprise workflows." },
      { day: 3, title: "RAG & Enterprise Automation", topics: ["Retrieval-Augmented Generation (RAG)","LangChain","LlamaIndex","Embeddings","Vector Databases","Knowledge Retrieval","Batch Processing"], handsOn: ["Creating RAG scripts","Automating document retrieval","Building enterprise automation tools"], outcome: "Develop advanced AI scripts capable of retrieving enterprise knowledge and automating complex business processes." },
      { day: 4, title: "Deployment, Security & Optimization", topics: ["Script Deployment","Docker","Logging","Monitoring","Security Best Practices","Performance Optimization","Scheduling Automation"], handsOn: ["Deploying AI scripts","Monitoring automation workflows","Optimizing script performance"], outcome: "Deploy secure and optimized AI scripting solutions for enterprise environments." },
      { day: 5, title: "Enterprise Scripting Project & Assessment", topics: ["Enterprise Automation Case Studies","End-to-End AI Scripting Solution","Performance Review","Future Trends in AI Automation","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","OpenAI API","Google Gemini API","Anthropic Claude API","LangChain","LlamaIndex","FastAPI","Docker","Pinecone","ChromaDB","VS Code","Git & GitHub","Jupyter Notebook"],
    careers: ["AI Automation Engineer","Generative AI Developer","Python Developer","AI Solutions Engineer","Automation Specialist","DevOps Engineer","MLOps Engineer","AI Application Developer"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Google Professional Machine Learning Engineer","AWS Certified AI Practitioner","Python Institute PCAP Certification","IBM Generative AI Engineering Professional Certificate"],
    realWorldCases: { intro: "Develop a complete AI-powered scripting solution that includes:", bullets: ["Enterprise Automation Case Studies","LLM integration","Workflow automation","RAG implementation","File and API processing","Deployment strategy","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for Python developers, AI engineers, automation specialists, and DevOps professionals." },
      { question: "Is prior scripting experience required?", answer: "Yes. Basic knowledge of Python programming and Generative AI concepts is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes scripting labs, automation exercises, enterprise projects, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, OpenAI API, Gemini API, Claude API, LangChain, LlamaIndex, FastAPI, Docker, Pinecone, ChromaDB, VS Code, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn AI scripting, LLM integration, workflow automation, RAG implementation, deployment, optimization, and enterprise automation development." }
    ]
  },
  "Generative AI - Security": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Generative AI, Python programming, cloud computing, APIs, cybersecurity fundamentals, and familiarity with LLM-based applications.",
    overview: "The Generative AI – Security course is designed for AI engineers, cybersecurity professionals, cloud architects, MLOps engineers, and technology leaders who want to secure Generative AI applications and enterprise AI environments. The course covers AI security principles, LLM threats, prompt injection, adversarial attacks, model security, data protection, API security, AI governance, compliance, and secure deployment strategies. Through hands-on labs, enterprise case studies, and practical projects, participants will gain the skills required to protect Generative AI systems from modern security risks.",
    objectives: ["Understand security challenges in Generative AI.","Protect LLM applications from common attacks.","Secure AI APIs, models, and enterprise data.","Implement authentication and access controls.","Apply Responsible AI and governance practices.","Monitor and respond to AI security incidents.","Build secure enterprise Generative AI solutions."],
    days: [
      { day: 1, title: "Generative AI Security Fundamentals", topics: ["Introduction to AI Security","Threat Landscape","LLM Security Risks","AI Attack Surface","Security Architecture","Identity & Access Management","Security Best Practices"], handsOn: ["Identifying AI security risks","Configuring secure AI environments","Applying access control policies"], outcome: "Understand the security fundamentals required to protect enterprise Generative AI platforms and applications." },
      { day: 2, title: "LLM & API Security", topics: ["Prompt Injection Attacks","Jailbreak Techniques","API Security","Authentication & Authorization","Secret Management","Secure Prompt Design","Data Protection"], handsOn: ["Testing prompt injection scenarios","Securing AI APIs","Managing API credentials"], outcome: "Learn how to defend LLM applications against prompt-based attacks and secure AI APIs using enterprise security practices." },
      { day: 3, title: "Model Protection & Responsible AI", topics: ["Adversarial Attacks","Model Poisoning","Data Leakage Prevention","AI Bias & Fairness","Responsible AI","Explainability","Compliance Requirements"], handsOn: ["Evaluating AI risks","Implementing Responsible AI controls","Assessing model vulnerabilities"], outcome: "Protect AI models against threats while ensuring ethical, transparent, and compliant AI deployment." },
      { day: 4, title: "Monitoring, Governance & Incident Response", topics: ["AI Security Monitoring","Logging & Auditing","Threat Detection","Incident Response","AI Governance","Risk Management","Continuous Security Assessment"], handsOn: ["Monitoring AI security events","Performing security audits","Responding to simulated AI incidents"], outcome: "Monitor, detect, and respond to security incidents while maintaining governance and operational resilience." },
      { day: 5, title: "Enterprise Security Project & Assessment", topics: ["Enterprise AI Security Case Studies","End-to-End Security Architecture","Security Review","Future Trends in AI Security","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["OpenAI API","Google Gemini API","Anthropic Claude API","LangChain","LangGraph","OWASP Top 10 for LLM Applications","Microsoft Presidio","Azure AI Content Safety","Docker","Kubernetes","FastAPI","Git & GitHub","Python","Jupyter Notebook"],
    careers: ["AI Security Engineer","Generative AI Security Specialist","AI Risk Consultant","Cybersecurity Engineer (AI)","MLOps Security Engineer","Cloud Security Engineer","AI Governance Specialist","AI Solutions Architect"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Google Professional Machine Learning Engineer","AWS Certified AI Practitioner","Certified Information Systems Security Professional (CISSP)","Microsoft Security, Compliance, and Identity Fundamentals (SC-900)"],
    realWorldCases: { intro: "Develop a secure Generative AI solution that includes:", bullets: ["Enterprise AI Security Case Studies","Secure LLM integration","API authentication and authorization","Prompt injection protection","Monitoring and audit logging","Governance and compliance controls","Documentation and project presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for AI engineers, cybersecurity professionals, MLOps engineers, cloud architects, and security teams." },
      { question: "Is prior Generative AI experience required?", answer: "Yes. Participants should have knowledge of Generative AI, APIs, and basic cybersecurity concepts." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes AI security labs, attack simulations, governance exercises, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "OpenAI API, Gemini API, Claude API, LangChain, LangGraph, OWASP LLM Top 10, Microsoft Presidio, Azure AI Content Safety, Docker, Kubernetes, FastAPI, Python, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn LLM security, prompt injection defense, API protection, AI governance, threat monitoring, Responsible AI, and enterprise Generative AI security best practices." }
    ]
  },
  "Generative AI - Testing": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Generative AI, Python programming, APIs, software testing concepts, cloud platforms, and familiarity with Large Language Models (LLMs).",
    overview: "The Generative AI – Testing course is designed for AI engineers, QA professionals, software testers, MLOps engineers, and developers who want to validate the quality, security, and reliability of Generative AI applications. The course covers LLM evaluation, prompt testing, functional testing, RAG validation, API testing, security testing, performance testing, automation, and production readiness. Through hands-on labs, enterprise case studies, and practical projects, participants will learn how to test and validate enterprise-grade Generative AI solutions.",
    objectives: ["Test Generative AI applications and LLMs.","Validate prompts and AI-generated responses.","Perform functional and API testing.","Evaluate RAG pipelines and AI workflows.","Conduct security and performance testing.","Automate AI testing processes.","Deliver reliable and production-ready AI solutions."],
    days: [
      { day: 1, title: "AI Testing Fundamentals", topics: ["Introduction to AI Testing","Testing Lifecycle","Test Planning","Test Cases for LLMs","Functional Testing","Prompt Validation","Testing Best Practices"], handsOn: ["Creating AI test plans","Designing prompt test cases","Validating AI responses"], outcome: "Understand testing methodologies and build structured test plans for Generative AI applications." },
      { day: 2, title: "LLM, Prompt & API Testing", topics: ["Prompt Testing","Response Evaluation","API Testing","Authentication Testing","Integration Testing","Regression Testing","Error Handling Validation"], handsOn: ["Testing AI APIs","Validating prompt outputs","Performing integration testing"], outcome: "Validate LLM performance, API functionality, and application reliability through comprehensive testing." },
      { day: 3, title: "RAG, Security & Performance Testing", topics: ["RAG Validation","Retrieval Accuracy Testing","Hallucination Detection","Security Testing","Prompt Injection Testing","Load Testing","Performance Benchmarking"], handsOn: ["Evaluating RAG pipelines","Conducting security tests","Measuring application performance"], outcome: "Ensure Generative AI systems are secure, accurate, and capable of handling production workloads." },
      { day: 4, title: "Test Automation & Monitoring", topics: ["Automated AI Testing","Test Frameworks","CI/CD Testing","Monitoring Test Results","Defect Tracking","Quality Metrics","Continuous Validation"], handsOn: ["Automating AI test cases","Tracking defects","Monitoring quality metrics"], outcome: "Automate testing processes and establish continuous quality assurance for enterprise AI applications." },
      { day: 5, title: "Enterprise Testing Project & Assessment", topics: ["Enterprise Testing Case Studies","End-to-End AI Testing Strategy","Quality Review","Future Trends in AI Testing","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","OpenAI API","Google Gemini API","Anthropic Claude API","LangChain","LangSmith","Promptfoo","Postman","PyTest","Selenium","Docker","Git & GitHub","Jupyter Notebook"],
    careers: ["Generative AI Test Engineer","AI QA Engineer","AI Validation Engineer","MLOps Engineer","AI Quality Analyst","Software Test Engineer (AI)","AI Automation Tester","AI Solutions Engineer"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Google Professional Machine Learning Engineer","AWS Certified AI Practitioner","ISTQB Certified Tester Foundation Level (CTFL)","IBM Generative AI Engineering Professional Certificate"],
    realWorldCases: { intro: "Develop a complete Generative AI testing solution that includes:", bullets: ["Enterprise Testing Case Studies","Test planning","Prompt and API validation","RAG testing","Security and performance testing","Automated test execution","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for AI engineers, QA professionals, software testers, and MLOps engineers." },
      { question: "Is prior Generative AI experience required?", answer: "Yes. Basic knowledge of Python, APIs, software testing, and Generative AI is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes testing labs, automation exercises, AI validation tasks, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, OpenAI API, Gemini API, Claude API, LangChain, LangSmith, Promptfoo, Postman, PyTest, Selenium, Docker, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn AI testing, prompt validation, RAG evaluation, API testing, security testing, automation, quality assurance, and enterprise AI validation." }
    ]
  },
  "Generative AI - Troubleshooting": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Generative AI, Python programming, APIs, cloud platforms, LLMs, and AI application development.",
    overview: "The Generative AI – Troubleshooting course is designed for AI engineers, MLOps professionals, DevOps engineers, solution architects, and IT professionals responsible for maintaining Generative AI applications. The course focuses on diagnosing and resolving issues related to LLMs, prompts, RAG pipelines, APIs, infrastructure, security, performance, and enterprise deployments. Through hands-on troubleshooting labs, real-world scenarios, and practical projects, participants will develop the skills required to quickly identify root causes and restore reliable AI operations.",
    objectives: ["Identify common issues in Generative AI applications.","Troubleshoot LLM responses and prompt failures.","Resolve API, RAG, and integration problems.","Diagnose performance and infrastructure bottlenecks.","Monitor and analyze AI system logs.","Apply security troubleshooting techniques.","Maintain stable and reliable AI deployments."],
    days: [
      { day: 1, title: "Troubleshooting Fundamentals", topics: ["Introduction to AI Troubleshooting","Common AI Issues","Root Cause Analysis","Log Analysis","Error Classification","Debugging Techniques","Troubleshooting Best Practices"], handsOn: ["Identifying AI application errors","Reviewing logs","Diagnosing common failures"], outcome: "Understand systematic troubleshooting methods for identifying and resolving Generative AI issues." },
      { day: 2, title: "LLM, Prompt & API Troubleshooting", topics: ["Prompt Failures","Hallucination Analysis","API Errors","Authentication Issues","Rate Limits","Token Management","Integration Debugging"], handsOn: ["Resolving prompt issues","Debugging API integrations","Fixing authentication problems"], outcome: "Troubleshoot LLM behavior, API connectivity, and prompt-related issues to improve AI reliability." },
      { day: 3, title: "RAG, Infrastructure & Security Troubleshooting", topics: ["RAG Pipeline Issues","Embedding Errors","Vector Database Problems","Docker Troubleshooting","Kubernetes Diagnostics","Security Events","Access Control Issues"], handsOn: ["Debugging RAG workflows","Resolving deployment issues","Investigating security incidents"], outcome: "Diagnose enterprise infrastructure, retrieval systems, and security problems affecting AI applications." },
      { day: 4, title: "Performance Optimization & Monitoring", topics: ["Performance Bottlenecks","Latency Analysis","Monitoring Tools","Resource Utilization","Cost Optimization","Incident Response","Preventive Maintenance"], handsOn: ["Optimizing AI performance","Monitoring application health","Resolving operational incidents"], outcome: "Improve AI stability through proactive monitoring, performance tuning, and operational troubleshooting." },
      { day: 5, title: "Enterprise Troubleshooting Project & Assessment", topics: ["Enterprise Troubleshooting Case Studies","End-to-End Issue Resolution","Operational Review","Future Trends in AI Operations","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","OpenAI API","Google Gemini API","Anthropic Claude API","LangChain","LangSmith","Langfuse","LlamaIndex","Docker","Kubernetes","Grafana","Prometheus","Git & GitHub","Jupyter Notebook"],
    careers: ["Generative AI Support Engineer","AI Operations Engineer","MLOps Engineer","AI Platform Engineer","DevOps Engineer","AI Solutions Engineer","Cloud AI Engineer","Technical Support Specialist (AI)"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Google Professional Machine Learning Engineer","AWS Certified AI Practitioner","AWS Certified Machine Learning Engineer – Associate","Google Professional Cloud DevOps Engineer"],
    realWorldCases: { intro: "Develop a complete troubleshooting solution that includes:", bullets: ["Enterprise Troubleshooting Case Studies","Issue identification","Root cause analysis","Prompt and API debugging","RAG optimization","Performance improvements","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for AI engineers, MLOps professionals, DevOps engineers, and support teams." },
      { question: "Is prior Generative AI experience required?", answer: "Yes. Basic knowledge of Python, APIs, and LLM applications is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes debugging labs, troubleshooting exercises, enterprise case studies, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, OpenAI API, Gemini API, Claude API, LangChain, LangSmith, Langfuse, LlamaIndex, Docker, Kubernetes, Grafana, Prometheus, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn AI troubleshooting, root cause analysis, prompt debugging, RAG optimization, monitoring, incident response, and enterprise AI support." }
    ]
  },
  "Machine Learning - Administration": {
    level: "Intermediate",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Machine Learning concepts, Python programming, operating systems, cloud platforms, and data management.",
    overview: "The Machine Learning – Administration course is designed for Machine Learning administrators, IT professionals, DevOps engineers, cloud administrators, data engineers, and AI practitioners responsible for managing, maintaining, and supporting Machine Learning environments. The course covers ML infrastructure management, user and resource administration, data management, environment configuration, model lifecycle management, security, monitoring, governance, and cloud-based ML platform administration. Through hands-on labs and real-world scenarios, participants will learn how to efficiently administer enterprise Machine Learning environments while ensuring scalability, security, reliability, and compliance.",
    objectives: ["Understand Machine Learning platform administration concepts.","Configure and manage ML development environments.","Administer datasets, models, users, and compute resources.","Implement security, access control, and governance policies.","Monitor ML workloads and optimize infrastructure performance.","Manage model lifecycle, versioning, and deployment environments.","Support enterprise-scale Machine Learning operations."],
    days: [
      { day: 1, title: "Machine Learning Platform Administration", topics: ["Introduction to ML Administration","ML Infrastructure Overview","Environment Setup & Configuration","User & Role Management","Compute Resource Management","Storage Management","ML Platform Architecture"], handsOn: ["Configuring ML workspaces","Managing user access and permissions","Setting up compute environments"], outcome: "Understand the administrative responsibilities required to manage Machine Learning platforms and development environments." },
      { day: 2, title: "Data & Model Administration", topics: ["Dataset Management","Data Versioning","Model Registry","Model Version Control","Artifact Management","Storage Optimization","Backup & Recovery"], handsOn: ["Managing datasets and model repositories","Versioning machine learning models","Performing backup and recovery operations"], outcome: "Learn how to organize, manage, secure, and maintain datasets and machine learning models throughout their lifecycle." },
      { day: 3, title: "Security, Monitoring & Governance", topics: ["Identity & Access Management","Authentication & Authorization","ML Security Best Practices","Infrastructure Monitoring","Audit Logging","Governance Policies","Compliance Standards"], handsOn: ["Configuring role-based access control","Monitoring ML resources","Reviewing audit logs and compliance reports"], outcome: "Implement secure administrative practices while monitoring and governing enterprise Machine Learning environments." },
      { day: 4, title: "Deployment & Infrastructure Management", topics: ["Deployment Environment Management","Resource Scaling","Container Management","Cloud ML Services","Infrastructure Optimization","Cost Management","High Availability"], handsOn: ["Managing deployment environments","Scaling ML infrastructure","Optimizing resource utilization"], outcome: "Administer scalable, cost-effective, and highly available Machine Learning infrastructure for enterprise workloads." },
      { day: 5, title: "Enterprise Administration Project & Assessment", topics: ["End-to-End ML Administration","Enterprise Case Studies","Disaster Recovery Planning","Operational Best Practices","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Jupyter Notebook","MLflow","Kubeflow","Docker","Kubernetes","Microsoft Azure Machine Learning","AWS SageMaker","Google Vertex AI","Git & GitHub","Linux Administration","Prometheus & Grafana"],
    careers: ["Machine Learning Administrator","MLOps Administrator","AI Infrastructure Administrator","Cloud ML Administrator","DevOps Engineer (ML)","AI Platform Administrator","Data Platform Administrator","ML Operations Engineer"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","Microsoft Azure Administrator Associate (AZ-104)","AWS Certified Machine Learning Engineer – Associate","Google Professional Machine Learning Engineer","Certified Kubernetes Administrator (CKA)"],
    realWorldCases: { intro: "Configure and administer a complete Machine Learning environment that includes:", bullets: ["Enterprise Case Studies","User and role management","Dataset and model administration","Security implementation","Infrastructure monitoring","Deployment environment configuration","Backup and recovery planning"] },
    faqs: [
      { question: "Who should attend this course?", answer: "Machine Learning administrators, DevOps engineers, cloud administrators, IT professionals, AI engineers, data engineers, and anyone responsible for managing Machine Learning infrastructure and operations." },
      { question: "Is programming experience required?", answer: "Basic knowledge of Python, Machine Learning concepts, cloud platforms, and Linux administration is recommended for successfully completing the hands-on exercises." },
      { question: "Are practical labs included?", answer: "Yes. Every training day includes hands-on labs covering environment configuration, user management, dataset administration, model lifecycle management, monitoring, security implementation, and enterprise ML platform administration." },
      { question: "Which tools and technologies are covered?", answer: "Participants will work with Python, Jupyter Notebook, MLflow, Kubeflow, Docker, Kubernetes, Microsoft Azure Machine Learning, AWS SageMaker, Google Vertex AI, Git & GitHub, Linux Administration, and Prometheus & Grafana." },
      { question: "What skills will I gain?", answer: "You will learn Machine Learning platform administration, infrastructure management, user and resource administration, dataset and model management, security, governance, monitoring, deployment environment management, backup and recovery, and enterprise MLOps administration using industry-standard tools and best practices." }
    ]
  },
  "Machine Learning - Advanced Concepts": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Machine Learning, Python programming, statistics, linear algebra, probability, and experience with supervised and unsupervised learning algorithms.",
    overview: "The Machine Learning – Advanced Concepts course is designed for Machine Learning engineers, data scientists, AI developers, researchers, and technology professionals who want to deepen their understanding of advanced Machine Learning techniques and modern AI methodologies. The course explores advanced supervised and unsupervised learning, ensemble methods, deep learning fundamentals, reinforcement learning concepts, feature engineering, model optimization, explainability, transfer learning, and production-ready ML practices. Through hands-on labs, real-world case studies, and practical projects, participants will develop the skills needed to solve complex machine learning problems and build high-performance ML solutions.",
    objectives: ["Apply advanced Machine Learning algorithms to complex datasets.","Optimize model performance using advanced feature engineering and hyperparameter tuning.","Understand ensemble learning and advanced model architectures.","Explore transfer learning, reinforcement learning, and deep learning concepts.","Evaluate models using advanced validation and explainability techniques.","Build scalable and production-ready Machine Learning solutions.","Solve real-world business problems using advanced ML methodologies."],
    days: [
      { day: 1, title: "Advanced Machine Learning Foundations", topics: ["Advanced ML Workflow","Advanced Data Preprocessing","Feature Engineering Strategies","Feature Selection Techniques","Dimensionality Reduction","Principal Component Analysis (PCA)","Model Selection Strategies"], handsOn: ["Preparing complex datasets","Applying feature engineering techniques","Comparing multiple ML algorithms"], outcome: "Build a strong understanding of advanced Machine Learning workflows and improve model quality through effective data preparation and feature engineering." },
      { day: 2, title: "Advanced Algorithms & Ensemble Learning", topics: ["Decision Trees","Random Forest","Gradient Boosting","XGBoost Overview","Support Vector Machines","Ensemble Learning Techniques","Model Comparison"], handsOn: ["Developing ensemble models","Comparing algorithm performance","Optimizing predictive accuracy"], outcome: "Learn how advanced algorithms and ensemble techniques improve prediction accuracy and model robustness." },
      { day: 3, title: "Model Optimization & Explainability", topics: ["Hyperparameter Optimization","Cross Validation","Bias-Variance Analysis","Model Interpretability","Explainable Machine Learning","SHAP & LIME (Introduction)","Error Analysis"], handsOn: ["Hyperparameter tuning","Explaining model predictions","Performance evaluation"], outcome: "Optimize machine learning models while improving transparency, interpretability, and overall performance." },
      { day: 4, title: "Modern Machine Learning Techniques", topics: ["Transfer Learning","Deep Learning Fundamentals","Reinforcement Learning Concepts","Semi-Supervised Learning","Self-Supervised Learning","AutoML Overview","MLOps Best Practices"], handsOn: ["Exploring transfer learning models","Implementing AutoML workflows","Building scalable ML pipelines"], outcome: "Understand modern Machine Learning techniques and their role in solving advanced business and research problems." },
      { day: 5, title: "Advanced ML Project & Assessment", topics: ["Enterprise Machine Learning Case Studies","End-to-End Advanced ML Project","Model Deployment Overview","Future Trends in Machine Learning","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Scikit-learn","XGBoost","LightGBM","CatBoost","TensorFlow","PyTorch","Pandas","NumPy","SHAP","LIME","MLflow","Jupyter Notebook","Git & GitHub"],
    careers: ["Senior Machine Learning Engineer","Data Scientist","Applied AI Engineer","Machine Learning Research Engineer","AI Solutions Developer","MLOps Engineer","AI Consultant","Data Analytics Specialist"],
    certifications: ["Google Professional Machine Learning Engineer","Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified Machine Learning Engineer – Associate","IBM AI Engineering Professional Certificate","TensorFlow Developer Certificate"],
    realWorldCases: { intro: "Develop an advanced Machine Learning solution that includes:", bullets: ["Enterprise Machine Learning Case Studies","Complex dataset preprocessing","Advanced feature engineering","Ensemble model development","Model optimization and explainability","Performance evaluation","Technical documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "Machine Learning engineers, data scientists, AI developers, researchers, software engineers, and professionals looking to expand their expertise in advanced Machine Learning techniques." },
      { question: "Is prior Machine Learning experience required?", answer: "Yes. Participants should have a solid understanding of Machine Learning fundamentals, Python programming, statistics, and basic model development before enrolling." },
      { question: "Are practical projects included?", answer: "Yes. Every training day includes hands-on labs, advanced model development exercises, optimization techniques, explainability workshops, enterprise case studies, and a comprehensive capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Participants will work with Python, Scikit-learn, XGBoost, LightGBM, CatBoost, TensorFlow, PyTorch, Pandas, NumPy, SHAP, LIME, MLflow, Jupyter Notebook, and Git & GitHub." },
      { question: "What skills will I gain?", answer: "You will learn advanced feature engineering, ensemble learning, model optimization, explainable Machine Learning, transfer learning, AutoML concepts, performance evaluation, scalable ML workflows, and enterprise-grade Machine Learning development using modern tools and best practices." }
    ]
  },
  "Machine Learning - Agentic AI": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Machine Learning, Python programming, Large Language Models (LLMs), prompt engineering, APIs, and familiarity with AI frameworks.",
    overview: "The Machine Learning – Agentic AI course is designed for Machine Learning engineers, AI developers, data scientists, software engineers, and technology professionals who want to build intelligent AI agents capable of autonomous decision-making and task execution. The course covers Agentic AI fundamentals, autonomous workflows, reasoning techniques, planning, memory, tool integration, multi-agent systems, Retrieval-Augmented Generation (RAG), and deployment strategies. Through hands-on labs, real-world use cases, and an enterprise project, participants will learn how to design, develop, and deploy production-ready AI agents powered by modern Machine Learning and Generative AI technologies.",
    objectives: ["Understand Agentic AI architecture and workflows.","Build intelligent AI agents using modern frameworks.","Integrate LLMs with external tools and APIs.","Implement memory, reasoning, and planning capabilities.","Develop Retrieval-Augmented Generation (RAG) applications.","Design multi-agent collaboration workflows.","Deploy secure and scalable AI agent solutions."],
    days: [
      { day: 1, title: "Agentic AI Fundamentals", topics: ["Introduction to Agentic AI","AI Agents vs Traditional ML Models","Components of AI Agents","Prompt Engineering Basics","Agent Workflows","LLM Fundamentals","Agent Use Cases"], handsOn: ["Creating a simple AI agent","Designing prompts for agent tasks","Exploring real-world AI agent scenarios"], outcome: "Understand the core concepts of Agentic AI and build simple intelligent agents capable of performing basic tasks." },
      { day: 2, title: "Reasoning, Memory & Tool Integration", topics: ["Agent Reasoning","Planning Strategies","Memory Management","Tool Calling","API Integration","Function Calling","Context Management"], handsOn: ["Building agents with memory","Integrating external APIs","Implementing tool-based automation"], outcome: "Develop AI agents that can reason, retain context, and interact with external tools to solve complex problems." },
      { day: 3, title: "RAG & Multi-Agent Systems", topics: ["Retrieval-Augmented Generation (RAG)","Vector Databases","Knowledge Retrieval","Multi-Agent Collaboration","Agent Communication","Workflow Orchestration","Performance Optimization"], handsOn: ["Building a RAG application","Creating collaborative AI agents","Optimizing agent workflows"], outcome: "Implement advanced Agentic AI solutions using knowledge retrieval and coordinated multi-agent systems." },
      { day: 4, title: "Deployment, Monitoring & Security", topics: ["Agent Deployment","API-Based Agent Services","Monitoring Agent Performance","AI Safety","Security Best Practices","Responsible AI","Governance Overview"], handsOn: ["Deploying AI agents","Monitoring agent activities","Applying security controls"], outcome: "Deploy secure, scalable, and reliable AI agents while following responsible AI and operational best practices." },
      { day: 5, title: "Enterprise Agentic AI Project & Assessment", topics: ["Enterprise AI Agent Use Cases","End-to-End Agent Development","Performance Evaluation","Future of Agentic AI","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","LangChain","LangGraph","OpenAI API","Hugging Face Transformers","LlamaIndex","ChromaDB","FAISS","FastAPI","Docker","Git & GitHub","Jupyter Notebook"],
    careers: ["Agentic AI Engineer","Machine Learning Engineer","Generative AI Developer","AI Solutions Architect","LLM Engineer","AI Automation Engineer","Applied AI Engineer","AI Consultant"],
    certifications: ["Google Professional Machine Learning Engineer","Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified Machine Learning Engineer – Associate","OpenAI API Developer Certification (where applicable)","TensorFlow Developer Certificate"],
    realWorldCases: { intro: "Develop an enterprise Agentic AI solution that includes:", bullets: ["Intelligent task planning","LLM integration","Memory implementation","RAG-based knowledge retrieval","External tool integration","Deployment and project presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for ML engineers, AI developers, software engineers, and professionals interested in building intelligent AI agents." },
      { question: "Is prior Machine Learning experience required?", answer: "Yes. Basic knowledge of Machine Learning, Python, and APIs is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes practical labs, RAG implementation, agent-building exercises, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, LangChain, LangGraph, OpenAI API, Hugging Face, LlamaIndex, ChromaDB, FAISS, FastAPI, Docker, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn AI agent development, reasoning, memory management, RAG implementation, tool integration, multi-agent systems, and production deployment." }
    ]
  },
  "Machine Learning - Analytics": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Machine Learning, Python programming, statistics, data analysis, SQL, data visualization, and experience with supervised and unsupervised learning techniques.",
    overview: "The Machine Learning – Analytics course is designed for Machine Learning engineers, data scientists, AI developers, business intelligence professionals, analytics consultants, and technology specialists who want to leverage Machine Learning for advanced data analytics and business intelligence. The course covers predictive analytics, descriptive analytics, diagnostic analytics, prescriptive analytics, customer analytics, forecasting, anomaly detection, feature engineering, model interpretation, visualization, and analytics-driven decision-making. Participants will work with real-world datasets, build predictive models, develop interactive dashboards, and generate actionable business insights using modern Machine Learning and analytics platforms.",
    objectives: ["Understand the role of Machine Learning in modern business analytics.","Perform exploratory and advanced analytical techniques using ML models.","Build predictive, diagnostic, and prescriptive analytics solutions.","Apply feature engineering and statistical analysis to improve insights.","Develop business dashboards and visual analytics reports.","Interpret Machine Learning results for business decision-making.","Design end-to-end analytics solutions for enterprise environments."],
    days: [
      { day: 1, title: "Machine Learning Analytics Foundations", topics: ["Introduction to Machine Learning Analytics","Analytics Lifecycle","Business Problem Identification","Data Collection & Integration","Exploratory Data Analysis (EDA)","Statistical Foundations for Analytics","Data Preparation Best Practices"], handsOn: ["Importing and profiling business datasets","Performing exploratory data analysis","Identifying analytical opportunities"], outcome: "Build a strong foundation in Machine Learning-driven analytics by understanding business objectives, preparing data, and uncovering meaningful patterns." },
      { day: 2, title: "Predictive & Diagnostic Analytics", topics: ["Predictive Analytics Concepts","Regression-Based Analytics","Classification Analytics","Diagnostic Analytics","Root Cause Analysis","Customer Segmentation","Churn Prediction"], handsOn: ["Building predictive models","Performing customer segmentation","Evaluating predictive performance"], outcome: "Develop predictive and diagnostic Machine Learning models that help organizations forecast outcomes and identify key business drivers." },
      { day: 3, title: "Advanced Analytics & Business Intelligence", topics: ["Time Series Forecasting","Recommendation Systems","Anomaly Detection","Feature Engineering for Analytics","Model Explainability","Business KPI Analysis","Interactive Data Visualization"], handsOn: ["Developing forecasting models","Detecting anomalies in business data","Building analytics dashboards"], outcome: "Apply advanced Machine Learning techniques to generate actionable insights, identify anomalies, and support strategic business decisions." },
      { day: 4, title: "Enterprise Analytics & Decision Intelligence", topics: ["Prescriptive Analytics","Decision Intelligence","Real-Time Analytics","Big Data Analytics Concepts","Cloud-Based Analytics Platforms","Analytics Automation","Governance & Ethical AI"], handsOn: ["Designing real-time analytics workflows","Automating analytical pipelines","Creating decision-support models"], outcome: "Design scalable analytics solutions that combine Machine Learning, automation, and business intelligence to drive enterprise decision-making." },
      { day: 5, title: "Enterprise Analytics Project & Assessment", topics: ["Enterprise Analytics Case Studies","End-to-End Analytics Solution Design","Model Deployment for Analytics","Analytics Reporting & Storytelling","Future Trends in ML Analytics","Career Roadmap","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Scikit-learn","Pandas","NumPy","Matplotlib","Plotly","Power BI","Tableau","SQL","Jupyter Notebook","TensorFlow","PyTorch","MLflow","Apache Spark (MLlib)","Git & GitHub"],
    careers: ["Machine Learning Engineer","Data Scientist","Machine Learning Analytics Engineer","Business Intelligence Analyst","Predictive Analytics Specialist","AI Data Analyst","Decision Intelligence Consultant","Analytics Engineer","AI Solutions Consultant"],
    certifications: ["Google Professional Machine Learning Engineer","Microsoft Certified: Power BI Data Analyst Associate (PL-300)","AWS Certified Machine Learning Engineer – Associate","Microsoft Azure AI Engineer Associate (AI-102)","Tableau Certified Data Analyst","Databricks Certified Machine Learning Professional"],
    realWorldCases: { intro: "Develop a comprehensive Machine Learning analytics solution that includes:", bullets: ["Enterprise Analytics Case Studies","Business problem definition","Data acquisition and preprocessing","Predictive model development","Customer or operational analytics","Forecasting and anomaly detection","Interactive dashboard creation","Executive reporting and technical documentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for Machine Learning engineers, data scientists, AI developers, business analysts, BI professionals, analytics consultants, and IT professionals who want to use Machine Learning for advanced business analytics and decision intelligence." },
      { question: "Is prior Machine Learning experience required?", answer: "Yes. Participants should have knowledge of Python programming, statistics, data analysis, SQL, and Machine Learning fundamentals before enrolling." },
      { question: "Are practical projects included?", answer: "Yes. Every training day includes hands-on analytics exercises, predictive modeling labs, forecasting activities, dashboard development, enterprise case studies, and a comprehensive capstone project focused on real-world business analytics." },
      { question: "Which tools and technologies are covered?", answer: "Participants will work with Python, Scikit-learn, Pandas, NumPy, Matplotlib, Plotly, Power BI, Tableau, SQL, TensorFlow, PyTorch, MLflow, Apache Spark (MLlib), Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn to perform exploratory data analysis, build predictive and prescriptive analytics models, develop forecasting and anomaly detection solutions, create interactive business dashboards, interpret Machine Learning results, and deliver enterprise-grade analytics solutions that support data-driven decision-making." }
    ]
  },
  "Machine Learning - API Development": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Machine Learning, Python programming, REST APIs, model development, web development concepts, and familiarity with Scikit-learn, TensorFlow, or PyTorch.",
    overview: "The Machine Learning – API Development course is designed for Machine Learning engineers, AI developers, backend developers, MLOps engineers, and software professionals who want to build secure, scalable, and production-ready APIs for Machine Learning applications. The course covers API architecture, model serving, RESTful services, authentication, request handling, deployment, API security, versioning, monitoring, and cloud integration. Through practical labs, enterprise use cases, and a comprehensive capstone project, participants will gain the skills required to expose Machine Learning models as high-performance APIs for real-world business applications.",
    objectives: ["Design RESTful APIs for Machine Learning models.","Build secure and scalable inference services.","Integrate ML APIs with enterprise applications.","Implement authentication, validation, and versioning.","Deploy APIs using containers and cloud platforms.","Monitor API performance and reliability.","Develop production-ready Machine Learning API solutions."],
    days: [
      { day: 1, title: "Machine Learning API Fundamentals", topics: ["Introduction to ML APIs","REST API Architecture","API Design Principles","HTTP Methods & Status Codes","Request & Response Handling","Data Serialization","API Documentation"], handsOn: ["Designing REST API endpoints","Creating request-response schemas","Documenting APIs with OpenAPI"], outcome: "Understand the fundamentals of API architecture and design efficient interfaces for Machine Learning applications." },
      { day: 2, title: "Building Model Inference APIs", topics: ["FastAPI Development","Flask API Development","Model Loading","Prediction Endpoints","Input Validation","Error Handling","API Testing"], handsOn: ["Building prediction APIs","Testing endpoints using Postman","Handling validation and exceptions"], outcome: "Develop reliable Machine Learning APIs capable of serving real-time predictions with proper validation and error handling." },
      { day: 3, title: "Security & Enterprise Integration", topics: ["API Authentication","Authorization","JWT Security","Rate Limiting","Database Integration","Cloud Storage Integration","Third-Party API Integration"], handsOn: ["Securing ML APIs","Integrating APIs with databases","Connecting enterprise applications"], outcome: "Implement secure Machine Learning APIs that integrate seamlessly with enterprise systems and external services." },
      { day: 4, title: "Deployment, Scaling & Monitoring", topics: ["Docker for API Deployment","Kubernetes Deployment","CI/CD Pipelines","API Versioning","Monitoring & Logging","Performance Optimization","High Availability Strategies"], handsOn: ["Containerizing ML APIs","Deploying scalable services","Monitoring API performance"], outcome: "Deploy scalable, highly available Machine Learning APIs with effective monitoring and operational best practices." },
      { day: 5, title: "Enterprise API Development Project & Assessment", topics: ["Enterprise API Architecture","End-to-End ML Service Development","Production Readiness Review","API Performance Benchmarking","Future Trends in AI APIs","Career Roadmap","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","FastAPI","Flask","Scikit-learn","TensorFlow","PyTorch","Docker","Kubernetes","Postman","OpenAPI (Swagger)","MLflow","Git & GitHub","PostgreSQL","Redis","Jupyter Notebook"],
    careers: ["Machine Learning API Developer","Machine Learning Engineer","AI Backend Developer","AI Solutions Engineer","MLOps Engineer","Software Engineer (AI)","Cloud AI Engineer","AI Platform Developer"],
    certifications: ["Google Professional Machine Learning Engineer","AWS Certified Machine Learning Engineer – Associate","Microsoft Azure AI Engineer Associate (AI-102)","TensorFlow Developer Certificate","Certified Kubernetes Application Developer (CKAD)"],
    realWorldCases: { intro: "Develop an enterprise Machine Learning API solution that includes:", bullets: ["Model inference API","Authentication and authorization","Database integration","Docker-based deployment","API monitoring and logging","Technical documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for ML engineers, AI developers, backend developers, MLOps engineers, and software professionals building AI-powered APIs." },
      { question: "Is prior Machine Learning experience required?", answer: "Yes. Participants should have basic knowledge of Machine Learning, Python, and REST API concepts." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes API development labs, deployment exercises, security implementation, and an enterprise capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, FastAPI, Flask, Scikit-learn, TensorFlow, PyTorch, Docker, Kubernetes, Postman, OpenAPI, MLflow, PostgreSQL, Redis, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn API development, model serving, authentication, deployment, cloud integration, performance optimization, and enterprise Machine Learning API management." }
    ]
  },
  "Machine Learning - Architecture": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Machine Learning, Python programming, software architecture, cloud computing, databases, and distributed systems.",
    overview: "The Machine Learning – Architecture course is designed for Machine Learning engineers, AI architects, solution architects, software engineers, cloud professionals, and technology leaders who want to design scalable, secure, and production-ready ML architectures. The course covers ML system design, data pipelines, feature stores, model lifecycle management, MLOps architecture, cloud-native ML solutions, distributed computing, security, governance, and enterprise deployment strategies. Through hands-on architecture design exercises and real-world case studies, participants will learn how to build robust Machine Learning platforms capable of supporting enterprise-scale AI applications.",
    objectives: ["Understand enterprise Machine Learning architecture principles.","Design scalable ML pipelines and model-serving infrastructures.","Build secure and cloud-native Machine Learning solutions.","Implement MLOps architecture and model lifecycle management.","Design feature stores, data pipelines, and inference systems.","Apply security, governance, and high-availability practices.","Develop enterprise-grade ML architecture solutions."],
    days: [
      { day: 1, title: "Machine Learning Architecture Fundamentals", topics: ["Introduction to ML Architecture","Enterprise ML Architecture","ML System Components","Data Flow Design","Compute Infrastructure","Storage Architecture","Cloud-Native ML Platforms"], handsOn: ["Designing ML system architecture","Planning data and compute resources","Creating architecture diagrams"], outcome: "Understand the core building blocks of scalable Machine Learning architectures and their role in enterprise AI systems." },
      { day: 2, title: "Data Engineering & Model Lifecycle Architecture", topics: ["Data Pipelines","Feature Stores","Data Versioning","Model Registry","Experiment Tracking","Model Lifecycle Management","Workflow Orchestration"], handsOn: ["Designing data pipelines","Creating feature management workflows","Planning model lifecycle architecture"], outcome: "Build efficient data and model management architectures that support continuous machine learning development and deployment." },
      { day: 3, title: "MLOps & Deployment Architecture", topics: ["MLOps Architecture","CI/CD for Machine Learning","Containerization","Kubernetes for ML","Model Serving","API Gateway Integration","Distributed Inference"], handsOn: ["Designing deployment pipelines","Creating model-serving architecture","Integrating CI/CD workflows"], outcome: "Design automated deployment architectures for scalable, reliable, and maintainable machine learning applications." },
      { day: 4, title: "Security, Governance & Performance", topics: ["ML Security Architecture","Identity & Access Management","Data Privacy","Compliance Standards","Monitoring & Logging","Performance Optimization","Disaster Recovery"], handsOn: ["Implementing security controls","Designing monitoring strategies","Optimizing ML infrastructure"], outcome: "Develop secure, compliant, and high-performance Machine Learning architectures suitable for enterprise environments." },
      { day: 5, title: "Enterprise ML Architecture Project & Assessment", topics: ["Enterprise Architecture Case Studies","End-to-End ML Platform Design","Best Practices","Future ML Architecture Trends","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Scikit-learn","TensorFlow","PyTorch","MLflow","Kubeflow","Docker","Kubernetes","Apache Airflow","Apache Kafka","Microsoft Azure Machine Learning","AWS SageMaker","Google Vertex AI","Git & GitHub"],
    careers: ["Machine Learning Architect","AI Solutions Architect","Enterprise AI Architect","MLOps Architect","Cloud AI Architect","Machine Learning Engineer","AI Infrastructure Architect","Technical Solution Architect"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified Machine Learning Engineer – Associate","Google Professional Machine Learning Engineer","Microsoft Azure Solutions Architect Expert (AZ-305)","Certified Kubernetes Administrator (CKA)"],
    realWorldCases: { intro: "Design a complete enterprise Machine Learning architecture that includes:", bullets: ["Enterprise Architecture Case Studies","Data ingestion pipeline","Feature store design","Model training infrastructure","MLOps pipeline","Model deployment architecture","Monitoring and governance framework"] },
    faqs: [
      { question: "Who should attend this course?", answer: "Machine Learning engineers, AI architects, cloud professionals, software architects, solution architects, MLOps engineers, and technical leaders responsible for designing enterprise ML platforms." },
      { question: "Is prior Machine Learning experience required?", answer: "Yes. Participants should have a solid understanding of Machine Learning concepts, Python programming, cloud computing, and software architecture before attending this advanced course." },
      { question: "Are practical architecture exercises included?", answer: "Yes. The course includes architecture design workshops, enterprise case studies, infrastructure planning exercises, MLOps pipeline design, deployment strategies, and a comprehensive enterprise architecture capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Participants will work with Python, Scikit-learn, TensorFlow, PyTorch, MLflow, Kubeflow, Docker, Kubernetes, Apache Airflow, Apache Kafka, Microsoft Azure Machine Learning, AWS SageMaker, Google Vertex AI, and Git & GitHub." },
      { question: "What skills will I gain?", answer: "You will learn enterprise Machine Learning architecture, data pipeline design, feature store implementation, MLOps architecture, model lifecycle management, cloud-native deployment, infrastructure security, governance, monitoring, performance optimization, and scalable AI platform design using industry-standard tools and best practices." }
    ]
  },
  "Machine Learning - Automation": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Machine Learning, Python programming, data science, cloud computing, APIs, and software development concepts.",
    overview: "The Machine Learning – Automation course is designed for Machine Learning engineers, MLOps engineers, AI developers, DevOps professionals, data scientists, automation engineers, and cloud architects who want to automate the complete machine learning lifecycle. The course covers automated data pipelines, AutoML, feature engineering, model training, model validation, deployment automation, CI/CD for ML, workflow orchestration, monitoring, retraining, and enterprise MLOps. Through hands-on labs and real-world automation projects, participants will learn how to build scalable, reliable, and fully automated Machine Learning workflows for production environments.",
    objectives: ["Understand Machine Learning automation concepts and workflows.","Build automated data ingestion and preprocessing pipelines.","Implement AutoML and automated model training.","Automate model testing, validation, deployment, and monitoring.","Design CI/CD pipelines for Machine Learning projects.","Deploy scalable MLOps solutions using cloud platforms.","Develop enterprise-grade automated Machine Learning systems."],
    days: [
      { day: 1, title: "Machine Learning Automation Fundamentals", topics: ["Introduction to ML Automation","Machine Learning Lifecycle","Workflow Automation","Data Pipeline Automation","Environment Configuration","AutoML Fundamentals","MLOps Overview"], handsOn: ["Setting up ML automation environments","Building automated data pipelines","Exploring AutoML workflows"], outcome: "Understand the fundamentals of Machine Learning automation and create automated workflows for ML development." },
      { day: 2, title: "Automated Data Processing & Model Development", topics: ["Automated Data Collection","Data Validation","Data Preprocessing Automation","Feature Engineering Automation","Automated Model Training","Hyperparameter Optimization","Experiment Tracking"], handsOn: ["Automating data preprocessing","Running automated model training","Tracking ML experiments"], outcome: "Develop automated pipelines for preparing datasets and training machine learning models efficiently." },
      { day: 3, title: "CI/CD, Deployment & Orchestration", topics: ["CI/CD for Machine Learning","Model Packaging","Docker & Containers","Kubernetes for ML","Workflow Orchestration","Model Deployment Automation","API Automation"], handsOn: ["Creating ML CI/CD pipelines","Deploying models using containers","Automating model-serving APIs"], outcome: "Implement continuous integration, deployment, and orchestration strategies for production Machine Learning applications." },
      { day: 4, title: "Monitoring, Retraining & Enterprise Automation", topics: ["Model Monitoring","Data Drift Detection","Performance Monitoring","Automated Model Retraining","Logging & Alerting","Cost Optimization","Governance & Compliance"], handsOn: ["Monitoring deployed models","Configuring automated retraining pipelines","Implementing enterprise monitoring dashboards"], outcome: "Build intelligent automation systems capable of monitoring, maintaining, and continuously improving Machine Learning models." },
      { day: 5, title: "Enterprise Automation Project & Assessment", topics: ["End-to-End ML Automation","Enterprise Case Studies","Automation Best Practices","Scalable ML Architecture","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Scikit-learn","TensorFlow","PyTorch","MLflow","Kubeflow","Apache Airflow","Docker","Kubernetes","Jenkins","GitHub Actions","FastAPI","Microsoft Azure Machine Learning","AWS SageMaker","Google Vertex AI","Git & GitHub"],
    careers: ["MLOps Engineer","Machine Learning Automation Engineer","AI Automation Engineer","Machine Learning Engineer","DevOps Engineer (AI/ML)","Cloud AI Engineer","AI Platform Engineer","ML Infrastructure Engineer"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified Machine Learning Engineer – Associate","Google Professional Machine Learning Engineer","Certified Kubernetes Administrator (CKA)","HashiCorp Terraform Associate"],
    realWorldCases: { intro: "Develop a fully automated Machine Learning solution that includes:", bullets: ["Enterprise Case Studies","Automated data ingestion","Data preprocessing pipeline","AutoML model training","CI/CD deployment pipeline","Monitoring and retraining workflow","Documentation and project presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "Machine Learning engineers, MLOps engineers, DevOps professionals, AI developers, cloud engineers, automation specialists, and data scientists responsible for building and maintaining automated ML workflows." },
      { question: "Is prior Machine Learning experience required?", answer: "Yes. Participants should have a working knowledge of Machine Learning, Python programming, cloud computing, and software development concepts before enrolling." },
      { question: "Are practical automation projects included?", answer: "Yes. The course includes hands-on labs covering automated data pipelines, AutoML, CI/CD implementation, deployment automation, monitoring, retraining, workflow orchestration, and a comprehensive enterprise automation capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Participants will work with Python, Scikit-learn, TensorFlow, PyTorch, MLflow, Kubeflow, Apache Airflow, Docker, Kubernetes, Jenkins, GitHub Actions, FastAPI, Microsoft Azure Machine Learning, AWS SageMaker, Google Vertex AI, and Git & GitHub." },
      { question: "What skills will I gain?", answer: "You will learn automated data processing, AutoML, workflow orchestration, CI/CD for Machine Learning, model deployment automation, monitoring, automated retraining, MLOps implementation, cloud-based ML automation, and enterprise Machine Learning lifecycle management using industry-standard tools and best practices." }
    ]
  },
  "Machine Learning - Best Practices": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Machine Learning, Python programming, statistics, model development, data preprocessing, model deployment, and familiarity with Scikit-learn, TensorFlow, or PyTorch.",
    overview: "The Machine Learning – Best Practices course is designed for Machine Learning engineers, AI developers, data scientists, MLOps engineers, solution architects, and IT professionals who want to build reliable, scalable, and production-ready Machine Learning solutions using industry-standard methodologies. This course focuses on best practices across the complete Machine Learning lifecycle, including data management, feature engineering, model development, validation, deployment, monitoring, governance, security, documentation, collaboration, and continuous improvement. Through hands-on labs, enterprise case studies, and a comprehensive capstone project, participants will learn proven techniques for developing high-quality Machine Learning systems that meet business, technical, and operational requirements.",
    objectives: ["Apply industry best practices throughout the ML lifecycle.","Build reliable, scalable, and maintainable ML solutions.","Improve data quality and feature engineering workflows.","Implement secure, reproducible, and version-controlled ML projects.","Deploy and monitor production-ready Machine Learning models.","Follow governance, compliance, and documentation standards.","Deliver enterprise-grade Machine Learning solutions using modern development practices."],
    days: [
      { day: 1, title: "Machine Learning Development Best Practices", topics: ["ML Project Lifecycle","Business Requirement Analysis","Data Collection Standards","Data Cleaning Best Practices","Feature Engineering Guidelines","Experiment Management","Project Documentation"], handsOn: ["Organizing ML project structure","Preparing high-quality datasets","Managing ML experiments"], outcome: "Learn how to establish a structured and repeatable Machine Learning development process using industry best practices." },
      { day: 2, title: "Model Development & Quality Best Practices", topics: ["Model Selection Guidelines","Hyperparameter Optimization","Cross Validation","Model Evaluation Standards","Bias & Fairness","Explainable AI","Reproducible Machine Learning"], handsOn: ["Evaluating multiple ML models","Improving model reliability","Implementing reproducible workflows"], outcome: "Develop high-quality Machine Learning models that are accurate, transparent, and reproducible." },
      { day: 3, title: "Deployment & MLOps Best Practices", topics: ["Model Deployment Strategies","CI/CD for Machine Learning","Model Versioning","Containerization","Infrastructure Automation","Monitoring & Logging","Incident Management"], handsOn: ["Deploying production-ready models","Managing model versions","Configuring monitoring workflows"], outcome: "Implement deployment and operational best practices that improve scalability, reliability, and maintainability." },
      { day: 4, title: "Security, Governance & Collaboration", topics: ["Secure ML Development","Data Privacy","AI Governance","Regulatory Compliance","Team Collaboration","Git Workflow","Documentation Standards"], handsOn: ["Applying security controls","Managing collaborative ML projects","Creating governance documentation"], outcome: "Build secure and compliant Machine Learning systems while following professional collaboration and governance standards." },
      { day: 5, title: "Enterprise Best Practices Project & Assessment", topics: ["Enterprise ML Case Studies","End-to-End Best Practice Implementation","Operational Excellence","Continuous Improvement","Future Trends in Machine Learning","Career Roadmap","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Scikit-learn","TensorFlow","PyTorch","MLflow","DVC","Docker","Kubernetes","Git & GitHub","Apache Airflow","FastAPI","Pandas","NumPy","Jupyter Notebook"],
    careers: ["Senior Machine Learning Engineer","MLOps Engineer","AI Solutions Architect","Data Scientist","AI Platform Engineer","Machine Learning Consultant","AI Technical Lead","Enterprise AI Engineer"],
    certifications: ["Google Professional Machine Learning Engineer","AWS Certified Machine Learning Engineer – Associate","Microsoft Azure AI Engineer Associate (AI-102)","TensorFlow Developer Certificate","Databricks Certified Machine Learning Professional"],
    realWorldCases: { intro: "Develop an enterprise Machine Learning solution that includes:", bullets: ["Enterprise ML Case Studies","Data preparation and validation","Feature engineering","Model development and optimization","Secure deployment","Monitoring and governance","Complete technical documentation","Project presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for ML engineers, AI developers, MLOps professionals, solution architects, and data scientists looking to follow industry best practices." },
      { question: "Is prior Machine Learning experience required?", answer: "Yes. Participants should have knowledge of Machine Learning fundamentals, Python programming, and model development." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes practical labs, enterprise case studies, deployment exercises, and a comprehensive capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, Scikit-learn, TensorFlow, PyTorch, MLflow, DVC, Docker, Kubernetes, Apache Airflow, Git & GitHub, FastAPI, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn industry best practices for data management, model development, deployment, monitoring, governance, collaboration, and production-ready Machine Learning solutions." }
    ]
  },
  "Machine Learning - Certification Prep": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Machine Learning, Python programming, statistics, supervised and unsupervised learning, model development, and familiarity with Scikit-learn or TensorFlow.",
    overview: "The Machine Learning – Certification Prep course is designed for Machine Learning engineers, AI developers, data scientists, software engineers, and IT professionals preparing for globally recognized Machine Learning certifications. This course provides a structured review of core Machine Learning concepts, advanced algorithms, feature engineering, model evaluation, MLOps fundamentals, deployment strategies, and exam-focused best practices. Participants will strengthen both theoretical knowledge and practical implementation skills through hands-on labs, mock assessments, real-world case studies, and certification-oriented projects. By the end of the training, learners will be well-prepared to confidently attempt leading Machine Learning certification exams while gaining practical skills applicable to enterprise AI and Machine Learning projects.",
    objectives: ["Master key Machine Learning concepts covered in certification exams.","Build, evaluate, and optimize Machine Learning models.","Apply feature engineering and model selection techniques.","Understand MLOps, deployment, and monitoring fundamentals.","Solve certification-style practical and theoretical questions.","Develop confidence through mock exams and hands-on exercises.","Prepare for globally recognized Machine Learning certifications."],
    days: [
      { day: 1, title: "Machine Learning Fundamentals Revision", topics: ["Machine Learning Lifecycle","Types of Machine Learning","Data Collection & Preparation","Feature Engineering","Supervised Learning Review","Unsupervised Learning Review","Exam Preparation Strategy"], handsOn: ["Data preprocessing exercises","Feature engineering practice","ML workflow revision labs"], outcome: "Refresh core Machine Learning concepts and establish a strong foundation for certification preparation." },
      { day: 2, title: "Algorithms & Model Optimization", topics: ["Regression Algorithms","Classification Algorithms","Clustering Techniques","Ensemble Learning","Hyperparameter Tuning","Cross Validation","Model Evaluation Metrics"], handsOn: ["Building ML models","Hyperparameter optimization","Model performance comparison"], outcome: "Strengthen knowledge of Machine Learning algorithms and optimization techniques commonly covered in certification exams." },
      { day: 3, title: "Deep Learning, MLOps & Deployment", topics: ["Deep Learning Fundamentals","TensorFlow & PyTorch Overview","Model Deployment Basics","REST API Integration","MLflow & Experiment Tracking","Model Monitoring","MLOps Best Practices"], handsOn: ["Deploying ML models","Tracking experiments","Creating simple inference APIs"], outcome: "Understand deployment workflows and MLOps concepts required for modern Machine Learning certification exams." },
      { day: 4, title: "Mock Labs & Exam Readiness", topics: ["Certification Practice Questions","Case Study Analysis","Performance Optimization","Error Troubleshooting","Time Management Techniques","Exam Strategies","Technical Documentation"], handsOn: ["Solving mock exam scenarios","Practical troubleshooting","Full-length lab exercises"], outcome: "Develop confidence by solving certification-style challenges and improving practical problem-solving skills." },
      { day: 5, title: "Certification Assessment & Capstone Project", topics: ["End-to-End Machine Learning Project","Comprehensive Technical Review","Mock Certification Assessment","Career Roadmap","Certification Guidance","Interview Preparation","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Scikit-learn","TensorFlow","PyTorch","Pandas","NumPy","MLflow","FastAPI","Docker","Git & GitHub","Jupyter Notebook","Google Colab"],
    careers: ["Machine Learning Engineer","AI Engineer","Data Scientist","MLOps Engineer","AI Solutions Developer","Applied AI Engineer","Machine Learning Consultant","AI Research Associate"],
    certifications: ["Google Professional Machine Learning Engineer","AWS Certified Machine Learning Engineer – Associate","Microsoft Azure AI Engineer Associate (AI-102)","TensorFlow Developer Certificate","IBM AI Engineering Professional Certificate"],
    realWorldCases: { intro: "Develop a complete Machine Learning solution that includes:", bullets: ["Case Study Analysis","Data preprocessing","Feature engineering","Model development","Performance optimization","Model deployment","Documentation and project presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for professionals preparing for Machine Learning certification exams and advancing their AI careers." },
      { question: "Is prior Machine Learning experience required?", answer: "Yes. Participants should have basic knowledge of Python, Machine Learning concepts, and model development." },
      { question: "Are hands-on labs and mock exams included?", answer: "Yes. The course includes practical labs, certification-style exercises, mock assessments, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, Scikit-learn, TensorFlow, PyTorch, MLflow, FastAPI, Docker, Git & GitHub, Jupyter Notebook, and Google Colab." },
      { question: "What skills will I gain?", answer: "You will strengthen Machine Learning fundamentals, improve practical implementation skills, prepare for certification exams, and gain confidence in solving real-world ML challenges." }
    ]
  },
  "Machine Learning - CI/CD": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Machine Learning, Python programming, Git, Linux, model deployment, Docker, and familiarity with DevOps or MLOps concepts.",
    overview: "The Machine Learning – CI/CD course is designed for Machine Learning engineers, MLOps engineers, AI developers, DevOps professionals, and cloud engineers who want to automate the development, testing, deployment, and monitoring of Machine Learning applications. The course focuses on Continuous Integration (CI), Continuous Delivery/Deployment (CD), pipeline automation, model versioning, infrastructure automation, testing, release management, and deployment strategies. Through hands-on labs, real-world projects, and enterprise use cases, participants will learn how to build reliable and automated Machine Learning delivery pipelines using modern MLOps practices.",
    objectives: ["Understand CI/CD principles for Machine Learning.","Build automated pipelines for ML development and deployment.","Implement version control for code, data, and models.","Automate testing and model validation.","Deploy Machine Learning applications using CI/CD workflows.","Monitor releases and manage rollback strategies.","Apply enterprise MLOps and DevOps best practices."],
    days: [
      { day: 1, title: "CI/CD Fundamentals for Machine Learning", topics: ["Introduction to CI/CD","MLOps Lifecycle","Git Workflow","Version Control","Repository Management","Branching Strategies","Pipeline Fundamentals"], handsOn: ["Managing Git repositories","Creating CI workflows","Organizing ML project repositories"], outcome: "Understand the foundations of CI/CD and establish version-controlled Machine Learning development workflows." },
      { day: 2, title: "Continuous Integration Pipelines", topics: ["Automated Builds","Code Quality Checks","Unit Testing","Data Validation","Model Validation","Dependency Management","Artifact Management"], handsOn: ["Creating automated build pipelines","Running validation tests","Managing ML artifacts"], outcome: "Build automated CI pipelines that improve code quality and ensure reliable Machine Learning development." },
      { day: 3, title: "Continuous Deployment & Infrastructure", topics: ["Docker Containerization","Kubernetes Deployment","Model Serving","Infrastructure as Code","Cloud Deployment","Release Strategies","Rollback Management"], handsOn: ["Deploying ML applications","Managing containers","Implementing deployment strategies"], outcome: "Deploy Machine Learning solutions efficiently using automated deployment pipelines and scalable infrastructure." },
      { day: 4, title: "Monitoring, Automation & Security", topics: ["Pipeline Monitoring","Model Monitoring","Logging & Alerts","Security Scanning","Secret Management","Workflow Automation","Performance Optimization"], handsOn: ["Monitoring deployment pipelines","Automating release workflows","Securing CI/CD environments"], outcome: "Monitor, secure, and optimize Machine Learning CI/CD pipelines to ensure reliable production operations." },
      { day: 5, title: "Enterprise CI/CD Project & Assessment", topics: ["Enterprise MLOps Case Studies","End-to-End CI/CD Pipeline","Production Readiness Review","Performance Evaluation","Future Trends in ML Automation","Career Roadmap","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Git & GitHub","GitHub Actions","Jenkins","Docker","Kubernetes","MLflow","DVC","FastAPI","Terraform","Prometheus","Grafana","Jupyter Notebook"],
    careers: ["MLOps Engineer","Machine Learning Engineer","DevOps Engineer (AI/ML)","AI Platform Engineer","Cloud AI Engineer","ML Infrastructure Engineer","Automation Engineer","AI Solutions Architect"],
    certifications: ["Google Professional Machine Learning Engineer","AWS Certified Machine Learning Engineer – Associate","Microsoft Azure AI Engineer Associate (AI-102)","Certified Kubernetes Application Developer (CKAD)","HashiCorp Terraform Associate"],
    realWorldCases: { intro: "Develop a complete Machine Learning CI/CD pipeline that includes:", bullets: ["Enterprise MLOps Case Studies","Source code management","Automated testing","Model validation","Containerized deployment","Pipeline monitoring","Documentation and project presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for ML engineers, MLOps engineers, DevOps professionals, AI developers, and cloud engineers." },
      { question: "Is prior Machine Learning experience required?", answer: "Yes. Basic knowledge of Python, Git, Docker, and Machine Learning deployment is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes CI/CD pipeline development, deployment automation, monitoring exercises, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, GitHub Actions, Jenkins, Docker, Kubernetes, MLflow, DVC, Terraform, Prometheus, Grafana, FastAPI, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn CI/CD pipeline development, automated testing, model deployment, infrastructure automation, release management, monitoring, and enterprise MLOps best practices." }
    ]
  },
  "Machine Learning - Consulting": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Machine Learning, Python programming, data analytics, business processes, ML model development, and solution design concepts.",
    overview: "The Machine Learning – Consulting course is designed for Machine Learning engineers, AI consultants, data scientists, solution architects, technology advisors, and IT professionals who want to deliver strategic Machine Learning consulting services. The course focuses on client engagement, business problem analysis, AI opportunity assessment, solution design, project planning, stakeholder communication, ROI analysis, governance, implementation strategies, and enterprise consulting best practices. Through real-world case studies, consulting simulations, and practical workshops, participants will learn how to recommend, design, and deliver successful Machine Learning solutions for organizations across various industries.",
    objectives: ["Understand the Machine Learning consulting lifecycle.","Analyze business problems and identify AI opportunities.","Design enterprise Machine Learning solution strategies.","Prepare project proposals, roadmaps, and implementation plans.","Communicate technical concepts to business stakeholders.","Evaluate project risks, ROI, and business value.","Deliver professional Machine Learning consulting engagements."],
    days: [
      { day: 1, title: "Machine Learning Consulting Fundamentals", topics: ["Introduction to ML Consulting","Consulting Lifecycle","Understanding Client Requirements","Business Process Analysis","AI Opportunity Identification","Industry Use Cases","Consulting Best Practices"], handsOn: ["Conducting client requirement analysis","Identifying ML use cases","Preparing a consulting checklist"], outcome: "Understand the fundamentals of Machine Learning consulting and identify business opportunities where ML can deliver measurable value." },
      { day: 2, title: "Solution Design & Strategy", topics: ["Enterprise ML Solution Design","Technology Selection","Data Readiness Assessment","Architecture Planning","Project Scope Definition","Roadmap Development","Resource Planning"], handsOn: ["Designing an ML solution architecture","Creating a project roadmap","Evaluating implementation strategies"], outcome: "Design scalable Machine Learning solutions aligned with business objectives and technical requirements." },
      { day: 3, title: "Business Value & Client Communication", topics: ["ROI Analysis","Cost Estimation","Risk Assessment","Stakeholder Management","Proposal Development","Executive Presentations","Change Management"], handsOn: ["Preparing an ROI report","Developing a consulting proposal","Delivering a client presentation"], outcome: "Build strong consulting and communication skills to present Machine Learning solutions effectively to business leaders." },
      { day: 4, title: "Project Delivery & Governance", topics: ["ML Project Governance","Implementation Planning","Quality Assurance","Compliance & Ethics","Vendor Evaluation","Project Monitoring","Success Metrics"], handsOn: ["Creating a governance framework","Developing project documentation","Monitoring project milestones"], outcome: "Manage Machine Learning consulting projects using structured governance, quality standards, and delivery methodologies." },
      { day: 5, title: "Enterprise Consulting Project & Assessment", topics: ["Enterprise Consulting Case Studies","End-to-End Consulting Engagement","Project Review","Future Trends in AI Consulting","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Scikit-learn","TensorFlow","PyTorch","MLflow","Jupyter Notebook","Microsoft Visio","Draw.io","Microsoft Power BI","Microsoft Excel","Git & GitHub"],
    careers: ["Machine Learning Consultant","AI Consultant","Machine Learning Solution Architect","Data Science Consultant","AI Strategy Consultant","Technology Consultant","AI Project Manager","Enterprise AI Advisor"],
    certifications: ["Google Professional Machine Learning Engineer","Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified Machine Learning Engineer – Associate","IBM AI Engineering Professional Certificate","PMI Project Management Professional (PMP)"],
    realWorldCases: { intro: "Develop a complete Machine Learning consulting proposal that includes:", bullets: ["Industry Use Cases","Enterprise Consulting Case Studies","Business requirement analysis","AI opportunity assessment","Solution architecture","Implementation roadmap","ROI and risk analysis","Executive presentation and documentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for ML engineers, AI consultants, solution architects, data scientists, and technology professionals involved in AI consulting projects." },
      { question: "Is prior Machine Learning experience required?", answer: "Yes. Participants should have basic knowledge of Machine Learning, Python, and business solution development." },
      { question: "Are hands-on activities included?", answer: "Yes. The course includes consulting workshops, business case studies, proposal development exercises, and a capstone consulting project." },
      { question: "Which tools and technologies are covered?", answer: "Python, Scikit-learn, TensorFlow, PyTorch, MLflow, Power BI, Microsoft Visio, Draw.io, Excel, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn business analysis, AI solution design, consulting methodologies, project planning, ROI evaluation, stakeholder communication, and enterprise Machine Learning consulting best practices." }
    ]
  },
  "Machine Learning - Data Modeling": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Machine Learning, Python programming, statistics, SQL, data preprocessing, and familiarity with Scikit-learn or similar ML frameworks.",
    overview: "The Machine Learning – Data Modeling course is designed for Machine Learning engineers, data scientists, AI developers, data engineers, and analytics professionals who want to build effective data models for Machine Learning applications. The course focuses on data modeling techniques, feature engineering, schema design, data relationships, feature stores, data quality, preprocessing strategies, and model-ready datasets. Through practical labs, enterprise datasets, and real-world projects, participants will learn how to structure, prepare, and optimize data for accurate, scalable, and production-ready Machine Learning solutions.",
    objectives: ["Understand data modeling concepts for Machine Learning.","Design efficient data models and feature structures.","Apply feature engineering and feature selection techniques.","Build high-quality datasets for ML model training.","Improve data consistency, quality, and scalability.","Manage feature stores and data pipelines.","Prepare enterprise-ready datasets for Machine Learning projects."],
    days: [
      { day: 1, title: "Data Modeling Fundamentals", topics: ["Introduction to Data Modeling","Types of Data Models","Structured vs Unstructured Data","Data Relationships","Entity Modeling","Schema Design","Data Modeling Best Practices"], handsOn: ["Designing logical data models","Creating entity relationships","Building ML-ready schemas"], outcome: "Understand the fundamentals of data modeling and design efficient data structures for Machine Learning applications." },
      { day: 2, title: "Feature Engineering & Dataset Design", topics: ["Feature Engineering","Feature Selection","Feature Encoding","Handling Missing Values","Data Transformation","Feature Scaling","Dataset Versioning"], handsOn: ["Engineering new features","Optimizing datasets","Preparing training datasets"], outcome: "Build clean, optimized, and feature-rich datasets that improve Machine Learning model performance." },
      { day: 3, title: "Data Pipelines & Feature Stores", topics: ["Data Pipelines","Feature Store Concepts","Data Integration","Data Validation","Metadata Management","Data Lineage","Pipeline Automation"], handsOn: ["Building feature pipelines","Managing feature stores","Validating datasets"], outcome: "Develop scalable data pipelines and manage reusable features for enterprise Machine Learning workflows." },
      { day: 4, title: "Model-Ready Data & Optimization", topics: ["Data Quality Assessment","Sampling Techniques","Dimensionality Reduction","Data Balancing","Dataset Optimization","Performance Improvement","Governance Considerations"], handsOn: ["Optimizing large datasets","Improving data quality","Preparing production-ready datasets"], outcome: "Optimize datasets for better accuracy, reliability, and scalability in Machine Learning solutions." },
      { day: 5, title: "Enterprise Data Modeling Project & Assessment", topics: ["Enterprise Data Modeling Case Studies","End-to-End Data Preparation","Dataset Review","Documentation Standards","Future Trends in Data Engineering","Career Roadmap","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Pandas","NumPy","Scikit-learn","SQL","Apache Spark","Feature Store (Feast)","MLflow","Jupyter Notebook","Git & GitHub","PostgreSQL","Apache Airflow"],
    careers: ["Machine Learning Engineer","Data Scientist","Data Engineer","AI Developer","Feature Engineering Specialist","MLOps Engineer","Data Architect","Analytics Engineer"],
    certifications: ["Google Professional Machine Learning Engineer","AWS Certified Machine Learning Engineer – Associate","Microsoft Azure AI Engineer Associate (AI-102)","Databricks Certified Data Engineer Associate","IBM AI Engineering Professional Certificate"],
    realWorldCases: { intro: "Develop a Machine Learning data model that includes:", bullets: ["Enterprise Data Modeling Case Studies","Data schema design","Feature engineering","Data validation","Pipeline development","Dataset optimization","Documentation and project presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for ML engineers, data scientists, data engineers, AI developers, and analytics professionals." },
      { question: "Is prior Machine Learning experience required?", answer: "Yes. Basic knowledge of Python, data preprocessing, SQL, and Machine Learning is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes practical data modeling exercises, feature engineering labs, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, Pandas, NumPy, Scikit-learn, SQL, Apache Spark, Feast, MLflow, Apache Airflow, PostgreSQL, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn data modeling, feature engineering, dataset optimization, pipeline development, feature store management, and enterprise data preparation for Machine Learning." }
    ]
  },
  "Machine Learning - Development": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Python programming, Machine Learning concepts, statistics, data structures, and mathematics.",
    overview: "The Machine Learning – Development course is designed for software developers, data scientists, AI engineers, ML practitioners, and technology professionals who want to build intelligent machine learning applications from scratch. The course covers the complete machine learning development lifecycle, including data preprocessing, feature engineering, model development, algorithm selection, model evaluation, optimization, deployment, and production best practices. Participants will gain hands-on experience in building scalable ML solutions using industry-standard tools and frameworks through practical labs and real-world projects.",
    objectives: ["Understand the complete Machine Learning development lifecycle.","Prepare and transform datasets for model development.","Build supervised and unsupervised machine learning models.","Optimize model performance using feature engineering and hyperparameter tuning.","Deploy machine learning models for real-world applications.","Apply MLOps principles for model management and version control.","Develop production-ready machine learning solutions."],
    days: [
      { day: 1, title: "Machine Learning Development Fundamentals", topics: ["Introduction to ML Development","ML Development Lifecycle","Data Collection & Exploration","Python for Machine Learning","Data Preprocessing","Feature Engineering","Development Environment Setup"], handsOn: ["Configuring the ML development environment","Exploring and cleaning datasets","Performing exploratory data analysis (EDA)"], outcome: "Build a solid foundation in machine learning development by preparing data and establishing efficient development workflows." },
      { day: 2, title: "Model Development & Training", topics: ["Supervised Learning Algorithms","Unsupervised Learning Algorithms","Model Selection","Training Machine Learning Models","Classification Techniques","Regression Techniques","Clustering Algorithms"], handsOn: ["Developing classification models","Building regression solutions","Implementing clustering techniques"], outcome: "Develop machine learning models using appropriate algorithms to solve different business and analytical problems." },
      { day: 3, title: "Model Evaluation & Optimization", topics: ["Model Evaluation Metrics","Cross Validation","Hyperparameter Tuning","Feature Selection","Model Optimization","Bias-Variance Tradeoff","Ensemble Learning"], handsOn: ["Comparing multiple models","Optimizing model accuracy","Evaluating model performance"], outcome: "Improve model quality through systematic evaluation, optimization, and performance tuning techniques." },
      { day: 4, title: "Model Deployment & MLOps", topics: ["Model Serialization","API Development","Model Deployment","Docker for ML","CI/CD for Machine Learning","MLflow","Model Monitoring Basics"], handsOn: ["Deploying trained models","Building REST APIs","Managing model versions using MLflow"], outcome: "Deploy production-ready machine learning models while implementing version control and deployment best practices." },
      { day: 5, title: "Enterprise ML Project & Assessment", topics: ["End-to-End ML Solution Development","Enterprise Case Studies","Project Documentation","Performance Review","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Jupyter Notebook","Scikit-learn","TensorFlow","PyTorch","Pandas","NumPy","Matplotlib","MLflow","FastAPI","Docker","Git & GitHub"],
    careers: ["Machine Learning Engineer","AI Developer","Data Scientist","ML Software Engineer","AI Solutions Developer","MLOps Engineer","Python Developer (Machine Learning)","Applied AI Engineer"],
    certifications: ["Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified Machine Learning Engineer – Associate","Google Professional Machine Learning Engineer","IBM AI Engineering Professional Certificate","TensorFlow Developer Certificate"],
    realWorldCases: { intro: "Develop a complete machine learning application that includes:", bullets: ["Enterprise Case Studies","Data preprocessing","Feature engineering","Model development","Model optimization","API deployment","Documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "Software developers, AI engineers, data scientists, Python developers, ML practitioners, students, and professionals who want to build and deploy machine learning applications." },
      { question: "Is programming experience required?", answer: "Yes. Basic knowledge of Python programming, mathematics, and machine learning concepts is recommended to fully benefit from the practical development exercises." },
      { question: "Are practical projects included?", answer: "Yes. The course includes daily hands-on labs, real-world development exercises, model building, deployment tasks, and a comprehensive end-to-end machine learning capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Participants will work with Python, Jupyter Notebook, Scikit-learn, TensorFlow, PyTorch, Pandas, NumPy, Matplotlib, MLflow, FastAPI, Docker, and Git & GitHub." },
      { question: "What skills will I gain?", answer: "You will learn dataset preparation, feature engineering, model development, supervised and unsupervised learning, model optimization, API development, deployment, MLOps fundamentals, version control, and production-ready machine learning application development using industry-standard tools and best practices." }
    ]
  },
  "Machine Learning - Engineering": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Machine Learning, Python programming, data structures, software engineering principles, statistics, and experience with Scikit-learn or TensorFlow.",
    overview: "The Machine Learning – Engineering course is designed for Machine Learning engineers, AI developers, software engineers, data scientists, and technical professionals who want to build robust, scalable, and production-ready Machine Learning systems. The course focuses on engineering principles for ML applications, including data pipelines, feature engineering, model architecture, software design, distributed computing, model serving, infrastructure optimization, and engineering best practices. Through hands-on labs, enterprise case studies, and an end-to-end engineering project, participants will develop the practical skills required to design, develop, and maintain enterprise Machine Learning solutions.",
    objectives: ["Design scalable Machine Learning systems using engineering best practices.","Build efficient data pipelines and feature engineering workflows.","Develop maintainable and reusable ML applications.","Implement model serving and inference architectures.","Optimize infrastructure and system performance.","Apply software engineering principles to ML development.","Deliver production-ready Machine Learning solutions."],
    days: [
      { day: 1, title: "Machine Learning Engineering Foundations", topics: ["Introduction to ML Engineering","ML System Architecture","Software Engineering for ML","Data Pipeline Design","Feature Engineering Workflows","Code Organization","Version Control Best Practices"], handsOn: ["Designing an ML system architecture","Building reusable project structures","Creating data processing pipelines"], outcome: "Understand the engineering principles required to build maintainable and scalable Machine Learning applications." },
      { day: 2, title: "Data Pipelines & Model Development", topics: ["Data Pipeline Automation","Data Validation","Feature Store Concepts","Model Development Workflow","Experiment Tracking","Model Versioning","Code Optimization"], handsOn: ["Building automated data pipelines","Managing ML experiments","Versioning Machine Learning models"], outcome: "Develop efficient Machine Learning workflows using structured pipelines and version-controlled development practices." },
      { day: 3, title: "Model Serving & Scalable Infrastructure", topics: ["Model Serving Architecture","REST API Development","Batch & Real-Time Inference","Containerization","Kubernetes for ML","Distributed Computing","Infrastructure Scaling"], handsOn: ["Deploying model inference APIs","Containerizing ML services","Scaling prediction workloads"], outcome: "Build scalable Machine Learning services capable of handling enterprise-level production workloads." },
      { day: 4, title: "Performance, Reliability & Security", topics: ["Performance Engineering","Infrastructure Monitoring","Fault Tolerance","Security Best Practices","Logging & Observability","Resource Optimization","CI/CD for ML Engineering"], handsOn: ["Monitoring ML services","Optimizing infrastructure performance","Automating deployment pipelines"], outcome: "Improve the reliability, security, and operational efficiency of Machine Learning engineering solutions." },
      { day: 5, title: "Enterprise Engineering Project & Assessment", topics: ["Enterprise ML Engineering Case Studies","End-to-End System Development","Production Readiness Review","Architecture Evaluation","Future Trends in ML Engineering","Career Roadmap","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Scikit-learn","TensorFlow","PyTorch","MLflow","Docker","Kubernetes","Apache Airflow","FastAPI","DVC","Git & GitHub","Pandas","NumPy","Jupyter Notebook"],
    careers: ["Machine Learning Engineer","Senior ML Engineer","AI Software Engineer","MLOps Engineer","AI Platform Engineer","Applied AI Engineer","Machine Learning Solutions Architect","AI Infrastructure Engineer"],
    certifications: ["Google Professional Machine Learning Engineer","AWS Certified Machine Learning Engineer – Associate","Microsoft Azure AI Engineer Associate (AI-102)","TensorFlow Developer Certificate","Databricks Certified Machine Learning Professional"],
    realWorldCases: { intro: "Develop an enterprise Machine Learning engineering solution that includes:", bullets: ["Enterprise ML Engineering Case Studies","Automated data pipeline","Feature engineering workflow","Model development and serving","Containerized deployment","Infrastructure monitoring","Technical documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for ML engineers, software engineers, AI developers, and data scientists building production-ready ML systems." },
      { question: "Is prior Machine Learning experience required?", answer: "Yes. Participants should have knowledge of Python, Machine Learning fundamentals, and software development." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes engineering labs, deployment exercises, infrastructure projects, and an enterprise capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, Scikit-learn, TensorFlow, PyTorch, MLflow, Docker, Kubernetes, FastAPI, Apache Airflow, DVC, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn ML system design, data pipeline engineering, model serving, infrastructure scaling, automation, monitoring, and enterprise Machine Learning engineering best practices." }
    ]
  },
  "Machine Learning - Enterprise Solutions": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Machine Learning, Python programming, data analytics, cloud platforms, enterprise applications, and familiarity with ML model development.",
    overview: "The Machine Learning – Enterprise Solutions course is designed for Machine Learning engineers, AI developers, solution architects, enterprise architects, technical consultants, and IT professionals who want to implement Machine Learning across enterprise environments. The course focuses on enterprise solution architecture, business use cases, system integration, scalable deployments, governance, security, and operational best practices. Through practical labs, real-world case studies, and a capstone project, participants will learn how to design and deliver Machine Learning solutions that align with organizational goals and business processes.",
    objectives: ["Design enterprise-grade Machine Learning solutions.","Align ML initiatives with business objectives.","Integrate ML models with enterprise applications.","Build secure and scalable ML architectures.","Apply governance and operational best practices.","Evaluate enterprise AI use cases and implementation strategies.","Deliver production-ready Machine Learning solutions."],
    days: [
      { day: 1, title: "Enterprise ML Strategy & Architecture", topics: ["Introduction to Enterprise AI","Enterprise ML Architecture","Business Requirements Analysis","AI Use Case Identification","Solution Design Principles","Scalability Planning","Enterprise Best Practices"], handsOn: ["Identifying enterprise ML opportunities","Designing solution architecture","Mapping business requirements"], outcome: "Understand how to align Machine Learning solutions with enterprise goals and business requirements." },
      { day: 2, title: "Integration & Solution Development", topics: ["Enterprise Data Integration","API-Based Integration","Cloud ML Services","Workflow Automation","Enterprise Applications","Model Deployment","Solution Validation"], handsOn: ["Integrating ML models with business systems","Deploying enterprise solutions","Validating application workflows"], outcome: "Develop integrated Machine Learning solutions that connect seamlessly with enterprise platforms and applications." },
      { day: 3, title: "Security, Governance & Operations", topics: ["Enterprise Security","Identity & Access Management","Data Governance","Compliance Requirements","Model Monitoring","Risk Management","Operational Support"], handsOn: ["Implementing security controls","Monitoring deployed solutions","Creating governance documentation"], outcome: "Build secure, compliant, and well-governed Machine Learning environments for enterprise deployment." },
      { day: 4, title: "Business Value & Performance Optimization", topics: ["ROI Measurement","KPI Monitoring","Performance Optimization","Cost Management","High Availability","Business Continuity","Success Metrics"], handsOn: ["Measuring business impact","Optimizing enterprise deployments","Evaluating solution performance"], outcome: "Measure and improve the business value, efficiency, and reliability of enterprise Machine Learning solutions." },
      { day: 5, title: "Enterprise Solution Project & Assessment", topics: ["Enterprise Case Studies","End-to-End Solution Design","Architecture Review","Future Trends in Enterprise AI","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Scikit-learn","TensorFlow","MLflow","FastAPI","Docker","Kubernetes","AWS SageMaker","Azure Machine Learning","Google Vertex AI","Git & GitHub","Jupyter Notebook"],
    careers: ["Enterprise Machine Learning Engineer","AI Solutions Architect","Machine Learning Consultant","AI Platform Engineer","Enterprise AI Developer","MLOps Engineer","Technical Solution Architect","AI Transformation Consultant"],
    certifications: ["Google Professional Machine Learning Engineer","AWS Certified Machine Learning Engineer – Associate","Microsoft Azure AI Engineer Associate (AI-102)","Google Professional Cloud Architect","IBM AI Engineering Professional Certificate"],
    realWorldCases: { intro: "Develop a complete enterprise Machine Learning solution that includes:", bullets: ["Enterprise Case Studies","Business requirement analysis","Solution architecture design","Enterprise system integration","Deployment strategy","Governance and security planning","Documentation and executive presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for ML engineers, solution architects, AI consultants, and IT professionals implementing enterprise AI solutions." },
      { question: "Is prior Machine Learning experience required?", answer: "Yes. Participants should have basic knowledge of Machine Learning, Python, and enterprise application concepts." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes enterprise case studies, integration labs, architecture design exercises, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, Scikit-learn, TensorFlow, MLflow, FastAPI, Docker, Kubernetes, AWS SageMaker, Azure Machine Learning, Google Vertex AI, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn enterprise solution architecture, ML integration, deployment strategies, governance, security, scalability, and business-focused AI implementation." }
    ]
  },
  "Machine Learning - Fundamentals": {
    level: "Beginner to Intermediate",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of mathematics, statistics, Python programming, and computer fundamentals is recommended.",
    overview: "The Machine Learning – Fundamentals course is designed for students, software developers, data analysts, business professionals, and aspiring AI engineers who want to build a strong foundation in Machine Learning. This course introduces the core concepts of machine learning, including supervised and unsupervised learning, data preprocessing, feature engineering, model training, evaluation techniques, and practical implementation using Python and industry-standard libraries. Through hands-on exercises and real-world case studies, participants will learn how machine learning models are developed, evaluated, and applied to solve business problems.",
    objectives: ["Understand the fundamentals of Machine Learning and its real-world applications.","Differentiate between supervised, unsupervised, and reinforcement learning.","Prepare and preprocess datasets for machine learning models.","Build and evaluate basic machine learning algorithms.","Apply feature engineering and model optimization techniques.","Interpret model performance using evaluation metrics.","Develop simple end-to-end machine learning projects."],
    days: [
      { day: 1, title: "Introduction to Machine Learning", topics: ["Introduction to Machine Learning","Types of Machine Learning","Machine Learning Workflow","Data Collection & Preparation","Python for Machine Learning","Industry Applications","ML Project Lifecycle"], handsOn: ["Setting up the ML development environment","Exploring sample datasets","Building a simple data analysis workflow"], outcome: "Understand the fundamentals of Machine Learning, common workflows, and industry use cases." },
      { day: 2, title: "Data Preprocessing & Supervised Learning", topics: ["Data Cleaning","Feature Engineering","Handling Missing Values","Data Scaling & Normalization","Regression Algorithms","Classification Algorithms","Train-Test Split"], handsOn: ["Cleaning real-world datasets","Building regression and classification models","Evaluating prediction accuracy"], outcome: "Learn how to prepare datasets and develop supervised learning models for prediction and classification tasks." },
      { day: 3, title: "Unsupervised Learning & Model Evaluation", topics: ["Clustering Techniques","Dimensionality Reduction","Principal Component Analysis (PCA)","Model Evaluation Metrics","Cross Validation","Bias & Variance","Hyperparameter Basics"], handsOn: ["Implementing clustering algorithms","Evaluating machine learning models","Comparing algorithm performance"], outcome: "Develop unsupervised learning models and evaluate machine learning performance using standard metrics." },
      { day: 4, title: "Model Optimization & Deployment Basics", topics: ["Feature Selection","Hyperparameter Tuning","Pipeline Creation","Model Persistence","Introduction to MLOps","Model Deployment Basics","ML Best Practices"], handsOn: ["Optimizing machine learning models","Saving and loading trained models","Creating basic ML pipelines"], outcome: "Improve model performance and understand the fundamentals of deploying machine learning solutions." },
      { day: 5, title: "Machine Learning Project & Assessment", topics: ["End-to-End ML Project","Real-world Case Studies","Business Problem Solving","Project Documentation","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Jupyter Notebook","Scikit-learn","Pandas","NumPy","Matplotlib","TensorFlow (Introduction)","Google Colab","Git & GitHub","VS Code"],
    careers: ["Machine Learning Engineer (Entry Level)","Data Analyst","Junior Data Scientist","AI & ML Developer","Business Intelligence Analyst","Python Developer","Research Assistant","Data Engineer (Junior)"],
    certifications: ["Microsoft Azure AI Fundamentals (AI-900)","AWS Certified AI Practitioner","Google Professional Machine Learning Engineer","IBM Machine Learning Professional Certificate","TensorFlow Developer Certificate"],
    realWorldCases: { intro: "Develop a complete machine learning solution that includes:", bullets: ["Industry Applications","Real-world Case Studies","Dataset collection and preprocessing","Feature engineering","Model development","Performance evaluation","Final documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "Students, software developers, data analysts, business professionals, and anyone interested in starting a career in Machine Learning or Artificial Intelligence." },
      { question: "Is prior programming experience required?", answer: "Basic knowledge of Python programming is recommended, but key programming concepts required for machine learning are reviewed during the course." },
      { question: "Are practical projects included?", answer: "Yes. Each training day includes hands-on exercises, real-world datasets, model development activities, and a final capstone project to reinforce practical learning." },
      { question: "Which tools and technologies are covered?", answer: "Participants will work with Python, Jupyter Notebook, Scikit-learn, Pandas, NumPy, Matplotlib, TensorFlow (Introduction), Google Colab, Git & GitHub, and VS Code." },
      { question: "What skills will I gain?", answer: "You will learn data preprocessing, feature engineering, supervised and unsupervised learning, model evaluation, basic model optimization, machine learning workflows, and practical implementation of ML solutions using industry-standard tools." }
    ]
  },
  "Machine Learning - Governance": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Machine Learning, Python programming, data governance, model development, cloud platforms, and familiarity with MLOps and enterprise AI concepts.",
    overview: "The Machine Learning – Governance course is designed for Machine Learning engineers, AI architects, MLOps engineers, data governance professionals, compliance officers, and technology leaders who want to establish responsible and well-governed Machine Learning environments. The course covers AI governance frameworks, model governance, data governance, regulatory compliance, risk management, ethical AI, audit processes, model lifecycle governance, and organizational policies. Through practical exercises, enterprise case studies, and governance planning workshops, participants will learn how to build secure, transparent, and compliant Machine Learning solutions for enterprise environments.",
    objectives: ["Understand Machine Learning governance principles and frameworks.","Establish governance policies across the ML lifecycle.","Manage model risk, compliance, and regulatory requirements.","Implement responsible AI and ethical ML practices.","Monitor governance controls and audit ML systems.","Manage documentation, approvals, and model versioning.","Build enterprise governance frameworks for Machine Learning."],
    days: [
      { day: 1, title: "Machine Learning Governance Fundamentals", topics: ["Introduction to ML Governance","Governance Frameworks","AI Policies & Standards","Roles & Responsibilities","Model Lifecycle Governance","Governance Maturity Models","Enterprise Governance Strategy"], handsOn: ["Assessing governance maturity","Defining governance roles","Creating governance policies"], outcome: "Understand governance principles and establish a structured framework for managing Machine Learning initiatives." },
      { day: 2, title: "Data Governance & Compliance", topics: ["Data Governance Principles","Data Privacy","Data Classification","Regulatory Compliance","Data Lineage","Metadata Management","Data Quality Controls"], handsOn: ["Classifying enterprise datasets","Creating compliance checklists","Managing data lineage"], outcome: "Implement effective data governance practices that improve compliance, quality, and trust in Machine Learning systems." },
      { day: 3, title: "Model Governance & Risk Management", topics: ["Model Risk Assessment","Model Validation","Bias Detection","Fairness Evaluation","Explainable AI","Model Documentation","Approval Workflows"], handsOn: ["Evaluating model risks","Preparing model documentation","Designing approval workflows"], outcome: "Develop governance processes that ensure Machine Learning models remain reliable, transparent, and compliant." },
      { day: 4, title: "Monitoring, Audit & Responsible AI", topics: ["Governance Monitoring","Audit Readiness","Model Monitoring","Incident Reporting","Responsible AI Practices","Continuous Compliance","Governance Automation"], handsOn: ["Conducting governance audits","Monitoring compliance metrics","Automating governance reports"], outcome: "Monitor governance controls, perform audits, and implement responsible AI practices across production Machine Learning systems." },
      { day: 5, title: "Enterprise Governance Project & Assessment", topics: ["Enterprise Governance Case Studies","Governance Framework Design","Compliance Review","Risk Mitigation Planning","Future Trends in AI Governance","Career Roadmap","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","MLflow","TensorFlow","Scikit-learn","Evidently AI","Great Expectations","Apache Atlas","Microsoft Purview","Git & GitHub","Jupyter Notebook","Power BI","Microsoft Excel"],
    careers: ["AI Governance Specialist","Machine Learning Governance Engineer","AI Compliance Consultant","Data Governance Manager","Responsible AI Consultant","MLOps Engineer","AI Risk Analyst","Enterprise AI Architect"],
    certifications: ["Google Professional Machine Learning Engineer","Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified Machine Learning Engineer – Associate","Microsoft Certified: Azure Data Fundamentals (DP-900)","CertNexus Certified Ethical Emerging Technologist (CEET)"],
    realWorldCases: { intro: "Develop an enterprise Machine Learning governance framework that includes:", bullets: ["Enterprise Governance Case Studies","Governance policy development","Data governance controls","Model risk assessment","Compliance checklist","Audit documentation","Governance reporting and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for ML engineers, AI architects, governance professionals, compliance teams, and technology leaders managing enterprise AI." },
      { question: "Is prior Machine Learning experience required?", answer: "Yes. Participants should have basic knowledge of Machine Learning, Python, and model development." },
      { question: "Are hands-on activities included?", answer: "Yes. The course includes governance workshops, compliance exercises, enterprise case studies, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, MLflow, TensorFlow, Scikit-learn, Evidently AI, Great Expectations, Apache Atlas, Microsoft Purview, Git & GitHub, Power BI, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn AI governance, compliance management, model risk assessment, responsible AI practices, audit readiness, and enterprise governance implementation." }
    ]
  },
  "Machine Learning - Hands-on Labs": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Machine Learning, Python programming, statistics, data preprocessing, and familiarity with Scikit-learn or TensorFlow.",
    overview: "The Machine Learning – Hands-on Labs course is designed for Machine Learning engineers, AI developers, data scientists, students, and IT professionals who want to strengthen their practical Machine Learning skills through intensive lab sessions. The course emphasizes real-world implementation, model building, evaluation, deployment, and optimization using modern Machine Learning tools and industry datasets. Participants will complete guided exercises, practical assignments, and an enterprise-level capstone project to gain hands-on experience in solving real business problems.",
    objectives: ["Build Machine Learning models using real-world datasets.","Perform data preprocessing and feature engineering.","Train, evaluate, and optimize ML models.","Implement deployment-ready Machine Learning workflows.","Apply industry-standard tools and best practices.","Solve practical business problems using Machine Learning.","Gain confidence through extensive hands-on lab experience."],
    days: [
      { day: 1, title: "Data Preparation & Machine Learning Fundamentals Lab", topics: ["Machine Learning Workflow","Data Collection","Data Cleaning","Exploratory Data Analysis","Feature Engineering","Dataset Splitting","Project Setup"], handsOn: ["Cleaning raw datasets","Performing EDA","Creating training and testing datasets"], outcome: "Develop a strong foundation in preparing high-quality datasets for Machine Learning model development." },
      { day: 2, title: "Model Development Lab", topics: ["Regression Models","Classification Models","Clustering Techniques","Model Training","Cross Validation","Model Evaluation","Performance Metrics"], handsOn: ["Building regression models","Developing classification models","Comparing multiple algorithms"], outcome: "Gain practical experience in building and evaluating Machine Learning models for different business scenarios." },
      { day: 3, title: "Model Optimization & Deployment Lab", topics: ["Hyperparameter Tuning","Model Optimization","Feature Selection","REST API Deployment","Model Versioning","Inference Testing","Deployment Best Practices"], handsOn: ["Optimizing model performance","Deploying prediction APIs","Testing deployed models"], outcome: "Learn how to optimize and deploy Machine Learning models for production-ready applications." },
      { day: 4, title: "MLOps & Automation Lab", topics: ["MLflow Experiment Tracking","Docker Basics","CI/CD Concepts","Model Monitoring","Workflow Automation","Logging","Production Best Practices"], handsOn: ["Tracking ML experiments","Containerizing ML applications","Monitoring deployed models"], outcome: "Implement modern MLOps practices for managing and maintaining Machine Learning solutions efficiently." },
      { day: 5, title: "Enterprise Hands-on Project & Assessment", topics: ["Enterprise ML Case Study","End-to-End ML Workflow","Model Presentation","Performance Review","Career Guidance","Certification Roadmap","Final Demonstration"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Scikit-learn","TensorFlow","PyTorch","Pandas","NumPy","Matplotlib","Jupyter Notebook","MLflow","FastAPI","Docker","Git & GitHub"],
    careers: ["Machine Learning Engineer","AI Developer","Data Scientist","MLOps Engineer","Applied AI Engineer","Machine Learning Consultant","AI Solutions Developer"],
    certifications: ["Google Professional Machine Learning Engineer","AWS Certified Machine Learning Engineer – Associate","Microsoft Azure AI Engineer Associate (AI-102)","TensorFlow Developer Certificate","IBM AI Engineering Professional Certificate"],
    realWorldCases: { intro: "Develop a complete Machine Learning application that includes:", bullets: ["Enterprise ML Case Study","Data preprocessing","Feature engineering","Model development","Performance optimization","API deployment","Technical documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for students, ML engineers, AI developers, and data scientists seeking practical Machine Learning experience." },
      { question: "Is prior Machine Learning experience required?", answer: "Yes. Basic knowledge of Python and Machine Learning concepts is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. Every session includes practical lab exercises, real-world datasets, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, Scikit-learn, TensorFlow, PyTorch, MLflow, FastAPI, Docker, Git & GitHub, Pandas, NumPy, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will gain practical skills in data preparation, model development, optimization, deployment, and MLOps using industry-standard Machine Learning tools." }
    ]
  },
  "Machine Learning - Implementation": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Machine Learning, Python programming, statistics, data preprocessing, model development, and familiarity with Scikit-learn or TensorFlow.",
    overview: "The Machine Learning – Implementation course is designed for Machine Learning engineers, AI developers, data scientists, software engineers, and IT professionals who want to successfully implement Machine Learning solutions in real-world business environments. The course covers solution planning, data preparation, model implementation, workflow automation, deployment strategies, testing, optimization, and production readiness. Through hands-on labs, enterprise scenarios, and an end-to-end implementation project, participants will gain practical experience in delivering scalable and business-ready Machine Learning applications.",
    objectives: ["Understand the complete Machine Learning implementation lifecycle.","Prepare data and build production-ready ML solutions.","Implement Machine Learning models using industry best practices.","Integrate ML solutions with business applications.","Validate and optimize implemented models.","Deploy scalable Machine Learning applications.","Execute enterprise Machine Learning implementation projects."],
    days: [
      { day: 1, title: "Machine Learning Implementation Fundamentals", topics: ["Introduction to ML Implementation","Business Requirements Analysis","ML Project Lifecycle","Data Collection & Preparation","Feature Engineering Basics","Model Selection","Implementation Best Practices"], handsOn: ["Preparing business datasets","Defining ML project requirements","Building an implementation plan"], outcome: "Understand the planning and preparation required to successfully implement Machine Learning solutions." },
      { day: 2, title: "Model Development & Implementation", topics: ["Data Preprocessing","Model Development","Supervised Learning Implementation","Unsupervised Learning Implementation","Model Training","Performance Evaluation","Model Validation"], handsOn: ["Developing ML models","Training and validating models","Comparing model performance"], outcome: "Implement Machine Learning models using structured development and validation techniques." },
      { day: 3, title: "Deployment & Integration", topics: ["Model Deployment Basics","API Integration","Batch & Real-Time Predictions","Cloud Deployment Overview","Model Versioning","Security Considerations","Deployment Best Practices"], handsOn: ["Deploying an ML model","Creating prediction APIs","Testing deployed applications"], outcome: "Deploy and integrate Machine Learning models into production-ready environments." },
      { day: 4, title: "Optimization & Operations", topics: ["Performance Optimization","Monitoring Basics","Error Handling","Model Maintenance","Automation Concepts","Documentation Standards","Operational Best Practices"], handsOn: ["Optimizing deployed models","Monitoring predictions","Documenting implementation workflows"], outcome: "Maintain and optimize Machine Learning implementations for reliable business operations." },
      { day: 5, title: "Enterprise Implementation Project & Assessment", topics: ["Enterprise Implementation Case Studies","End-to-End ML Solution Development","Project Review","Future Implementation Trends","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Scikit-learn","TensorFlow","PyTorch","Pandas","NumPy","FastAPI","MLflow","Docker","Git & GitHub","Jupyter Notebook"],
    careers: ["Machine Learning Engineer","AI Developer","Data Scientist","MLOps Engineer","AI Solutions Developer","Software Engineer (AI)","Machine Learning Consultant"],
    certifications: ["Google Professional Machine Learning Engineer","Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified Machine Learning Engineer – Associate","TensorFlow Developer Certificate","IBM AI Engineering Professional Certificate"],
    realWorldCases: { intro: "Develop a complete Machine Learning implementation that includes:", bullets: ["Enterprise Implementation Case Studies","Business problem analysis","Data preprocessing","Model development and validation","API deployment","Performance optimization","Technical documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for Machine Learning engineers, AI developers, software engineers, data scientists, and IT professionals implementing ML solutions." },
      { question: "Is prior Machine Learning experience required?", answer: "Yes. Participants should have basic knowledge of Machine Learning, Python programming, and model development." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes implementation labs, deployment exercises, enterprise case studies, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, Scikit-learn, TensorFlow, PyTorch, FastAPI, MLflow, Docker, Pandas, NumPy, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn ML implementation, model deployment, API integration, optimization, monitoring, and enterprise implementation best practices." }
    ]
  },
  "Machine Learning - Infrastructure": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Machine Learning, Python programming, Linux, cloud computing, networking, Docker, Kubernetes, and MLOps fundamentals.",
    overview: "The Machine Learning – Infrastructure course is designed for Machine Learning engineers, MLOps engineers, cloud architects, DevOps professionals, and AI infrastructure specialists responsible for designing and managing enterprise Machine Learning platforms. The course focuses on infrastructure planning, compute resources, cloud environments, containerization, orchestration, storage, networking, GPU management, infrastructure automation, security, and operational best practices. Through hands-on labs, enterprise case studies, and a comprehensive infrastructure project, participants will gain practical experience in building scalable, secure, and high-performance Machine Learning environments.",
    objectives: ["Design scalable infrastructure for Machine Learning workloads.","Configure cloud and on-premises ML environments.","Deploy containerized Machine Learning applications.","Manage compute, storage, and networking resources.","Automate infrastructure provisioning and management.","Implement security, monitoring, and disaster recovery strategies.","Build enterprise-grade Machine Learning infrastructure."],
    days: [
      { day: 1, title: "Machine Learning Infrastructure Fundamentals", topics: ["Introduction to ML Infrastructure","Infrastructure Architecture","Compute Resources","CPU vs GPU Workloads","Storage Architecture","Networking Fundamentals","Infrastructure Planning"], handsOn: ["Designing ML infrastructure architecture","Configuring compute resources","Planning storage requirements"], outcome: "Understand the core components required to build scalable Machine Learning infrastructure for enterprise environments." },
      { day: 2, title: "Cloud Platforms & Container Infrastructure", topics: ["AWS ML Infrastructure","Microsoft Azure ML Infrastructure","Google Cloud AI Infrastructure","Docker Containers","Kubernetes Orchestration","Cluster Management","Container Networking"], handsOn: ["Deploying ML workloads using Docker","Managing Kubernetes clusters","Configuring cloud infrastructure"], outcome: "Deploy Machine Learning workloads across cloud platforms using modern containerization and orchestration technologies." },
      { day: 3, title: "Infrastructure Automation & Resource Management", topics: ["Infrastructure as Code (IaC)","Terraform Fundamentals","Resource Provisioning","Auto Scaling","Load Balancing","GPU Resource Management","Infrastructure Optimization"], handsOn: ["Automating infrastructure deployment","Managing scalable compute resources","Optimizing GPU utilization"], outcome: "Automate Machine Learning infrastructure deployment and optimize resource utilization for high-performance workloads." },
      { day: 4, title: "Security, Monitoring & Business Continuity", topics: ["Infrastructure Security","Identity & Access Management","Secrets Management","Infrastructure Monitoring","Logging & Alerting","Backup & Disaster Recovery","Cost Optimization"], handsOn: ["Securing ML infrastructure","Configuring monitoring dashboards","Implementing backup strategies"], outcome: "Build secure, monitored, and resilient Machine Learning infrastructure capable of supporting production AI workloads." },
      { day: 5, title: "Enterprise Infrastructure Project & Assessment", topics: ["Enterprise Infrastructure Case Studies","End-to-End Infrastructure Deployment","High Availability Design","Infrastructure Performance Review","Future Trends in AI Infrastructure","Career Roadmap","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Docker","Kubernetes","Terraform","MLflow","Apache Airflow","AWS SageMaker","Azure Machine Learning","Google Vertex AI","Prometheus","Grafana","Linux","Git & GitHub","Jupyter Notebook"],
    careers: ["Machine Learning Infrastructure Engineer","MLOps Engineer","Cloud AI Engineer","AI Platform Engineer","DevOps Engineer (AI/ML)","Machine Learning Engineer","Cloud Solutions Architect","AI Infrastructure Architect"],
    certifications: ["Google Professional Machine Learning Engineer","AWS Certified Machine Learning Engineer – Associate","Microsoft Azure AI Engineer Associate (AI-102)","Certified Kubernetes Administrator (CKA)","HashiCorp Terraform Associate"],
    realWorldCases: { intro: "Develop a complete Machine Learning infrastructure solution that includes:", bullets: ["Enterprise Infrastructure Case Studies","Infrastructure architecture design","Cloud resource provisioning","Docker and Kubernetes deployment","Infrastructure automation using Terraform","Monitoring and security implementation","Technical documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for ML engineers, MLOps engineers, cloud architects, and DevOps professionals managing AI infrastructure." },
      { question: "Is prior Machine Learning experience required?", answer: "Yes. Participants should have basic knowledge of Machine Learning, Linux, cloud platforms, and container technologies." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes infrastructure deployment labs, cloud exercises, automation tasks, and a comprehensive capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, Docker, Kubernetes, Terraform, MLflow, Apache Airflow, AWS SageMaker, Azure Machine Learning, Google Vertex AI, Prometheus, Grafana, Linux, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn infrastructure architecture, cloud deployment, container orchestration, infrastructure automation, monitoring, security, and enterprise Machine Learning platform management." }
    ]
  },
  "Machine Learning - Integration": {
    level: "Intermediate to Advanced",
    scheduleDays: 5,
    prerequisites: "Basic understanding of Machine Learning concepts, Python programming, REST APIs, data preprocessing, model development, and familiarity with cloud platforms or application development.",
    overview: "The Machine Learning – Integration course is designed for Machine Learning engineers, AI developers, software engineers, data scientists, solution architects, and IT professionals who want to integrate Machine Learning models into enterprise applications, cloud platforms, business systems, and production environments. Participants will learn how to deploy ML models as APIs, integrate models with web and mobile applications, connect Machine Learning workflows with enterprise data sources, automate inference pipelines, and implement scalable, secure, and reliable ML integrations. Through practical labs, enterprise use cases, and hands-on projects, learners will gain the skills required to build end-to-end integrated Machine Learning solutions.",
    objectives: ["Understand Machine Learning integration architecture and deployment workflows.","Integrate trained ML models into web, mobile, and enterprise applications.","Build RESTful APIs for Machine Learning inference.","Connect ML models with databases, cloud storage, and business applications.","Implement scalable integration using containers and cloud services.","Secure Machine Learning APIs and integration pipelines.","Build production-ready end-to-end Machine Learning integration solutions."],
    days: [
      { day: 1, title: "Machine Learning Integration Fundamentals", topics: ["Introduction to ML Integration Architecture","Machine Learning Deployment Lifecycle","Batch vs Real-Time Inference","API-Based Machine Learning","Data Flow for ML Applications","Enterprise Integration Patterns","Integration Design Best Practices"], handsOn: ["Designing an ML integration workflow","Preparing a trained model for deployment","Mapping application-to-model communication"], outcome: "Understand how Machine Learning models interact with enterprise applications and design scalable integration workflows for production environments." },
      { day: 2, title: "API Development & Application Integration", topics: ["REST API Fundamentals","FastAPI for Machine Learning","Flask API Development","JSON Request & Response Handling","API Testing Techniques","Integrating ML with Web Applications","Mobile Application Integration Concepts"], handsOn: ["Building a Machine Learning REST API","Testing prediction endpoints","Connecting a web application to an ML model"], outcome: "Develop secure and efficient Machine Learning APIs that enable seamless integration with web and mobile applications." },
      { day: 3, title: "Enterprise & Cloud Integration", topics: ["Database Integration","Cloud Storage Integration","ML Integration with AWS Services","ML Integration with Microsoft Azure","Google Cloud AI Integration","Event-Driven Machine Learning","Workflow Automation"], handsOn: ["Connecting ML models with cloud storage","Reading data from enterprise databases","Building automated prediction workflows"], outcome: "Integrate Machine Learning solutions with enterprise databases, cloud services, and automated workflows for real-world business applications." },
      { day: 4, title: "Scalable Deployment & Secure Integration", topics: ["Docker for Machine Learning Deployment","Kubernetes Deployment Overview","CI/CD for ML Integration","Authentication & Authorization","API Security Best Practices","Logging & Monitoring","Performance Optimization"], handsOn: ["Containerizing an ML application","Securing Machine Learning APIs","Monitoring API performance and logs"], outcome: "Deploy secure, scalable, and highly available Machine Learning services capable of supporting enterprise workloads." },
      { day: 5, title: "Enterprise ML Integration Project & Assessment", topics: ["End-to-End Integration Architecture","Enterprise Integration Case Studies","Model Versioning & Updates","Production Deployment Strategies","Future Trends in ML Integration","Career Roadmap","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Scikit-learn","FastAPI","Flask","REST APIs","Docker","Kubernetes","MLflow","Git & GitHub","PostgreSQL","MongoDB","Redis","AWS AI Services","Microsoft Azure Machine Learning","Google Cloud Vertex AI","Postman","Jupyter Notebook"],
    careers: ["Machine Learning Integration Engineer","Machine Learning Engineer","AI Solutions Developer","AI Application Developer","MLOps Engineer","Cloud AI Engineer","Software Engineer (AI Integration)","Enterprise AI Consultant","Data Platform Engineer"],
    certifications: ["Google Professional Machine Learning Engineer","Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified Machine Learning Engineer – Associate","TensorFlow Developer Certificate","Docker Certified Associate","Kubernetes and Cloud Native Associate (KCNA)"],
    realWorldCases: { intro: "Design and implement a complete Machine Learning integration solution that includes:", bullets: ["Enterprise Integration Case Studies","Training or importing an ML model","Developing a REST API for inference","Integrating with a relational database","Deploying the application using Docker","Implementing authentication and logging","Connecting the solution to a cloud platform","Technical documentation and project presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for Machine Learning engineers, AI developers, software engineers, cloud engineers, solution architects, MLOps professionals, and anyone responsible for deploying and integrating Machine Learning solutions into enterprise systems." },
      { question: "Is prior Machine Learning experience required?", answer: "Yes. Participants should have experience with Python programming, Machine Learning fundamentals, model training, and basic API or application development concepts." },
      { question: "Are practical projects included?", answer: "Yes. Every training day includes hands-on integration exercises, API development labs, cloud deployment activities, enterprise case studies, and a comprehensive capstone project focused on production-ready Machine Learning integration." },
      { question: "Which tools and technologies are covered?", answer: "Participants will work with Python, Scikit-learn, FastAPI, Flask, Docker, Kubernetes, MLflow, PostgreSQL, MongoDB, Redis, AWS AI Services, Microsoft Azure Machine Learning, Google Cloud Vertex AI, Postman, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn to deploy Machine Learning models as APIs, integrate AI solutions with enterprise applications and cloud platforms, implement secure and scalable deployment architectures, automate ML workflows, manage production integrations, and build enterprise-grade Machine Learning systems using modern industry best practices." }
    ]
  },
  "Machine Learning - Migration": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Machine Learning, Python programming, model deployment, cloud computing, databases, MLOps concepts, and experience with ML frameworks such as Scikit-learn, TensorFlow, or PyTorch.",
    overview: "The Machine Learning – Migration course is designed for Machine Learning engineers, AI architects, MLOps engineers, cloud engineers, data scientists, and technology professionals responsible for migrating Machine Learning solutions across platforms, cloud environments, frameworks, and production infrastructures. Participants will learn migration planning, model portability, framework migration, cloud migration, data migration, pipeline modernization, deployment strategies, validation, rollback planning, and post-migration optimization. Through enterprise case studies, hands-on labs, and migration projects, learners will gain practical expertise in executing secure, scalable, and low-risk Machine Learning migrations.",
    objectives: ["Understand Machine Learning migration strategies and planning.","Migrate ML models between frameworks and cloud platforms.","Modernize ML pipelines and deployment architectures.","Validate model performance after migration.","Minimize migration risks through testing and rollback strategies.","Optimize migrated ML systems for production environments.","Execute enterprise-scale Machine Learning migration projects."],
    days: [
      { day: 1, title: "Machine Learning Migration Planning", topics: ["Introduction to ML Migration","Migration Lifecycle","Infrastructure Assessment","Model Inventory & Dependency Analysis","Migration Strategies","Risk Assessment & Mitigation","Migration Roadmap Development"], handsOn: ["Assessing an existing ML environment","Creating a migration roadmap","Identifying migration risks"], outcome: "Understand how to evaluate existing Machine Learning environments and create a structured migration strategy for enterprise projects." },
      { day: 2, title: "Model & Data Migration", topics: ["Model Portability","Framework Migration","Dataset Migration","Feature Store Migration","Metadata Migration","Model Version Migration","Data Validation Techniques"], handsOn: ["Migrating trained models","Validating migrated datasets","Testing model compatibility"], outcome: "Learn to migrate Machine Learning models, datasets, and metadata while maintaining consistency, compatibility, and prediction quality." },
      { day: 3, title: "Cloud & Pipeline Migration", topics: ["Cloud Migration Strategies","AWS ML Migration","Azure Machine Learning Migration","Google Cloud Vertex AI Migration","CI/CD Pipeline Migration","Container Migration","Workflow Automation"], handsOn: ["Migrating ML workloads to the cloud","Updating deployment pipelines","Automating migration workflows"], outcome: "Successfully migrate Machine Learning workloads, deployment pipelines, and automation processes across modern cloud platforms." },
      { day: 4, title: "Validation, Security & Optimization", topics: ["Post-Migration Validation","Performance Benchmarking","Security Validation","Compliance Verification","Infrastructure Optimization","Cost Optimization","Rollback & Disaster Recovery Planning"], handsOn: ["Comparing pre- and post-migration performance","Security validation exercises","Infrastructure optimization"], outcome: "Validate migrated Machine Learning systems, ensure security and compliance, and optimize infrastructure for long-term production success." },
      { day: 5, title: "Enterprise Migration Project & Assessment", topics: ["Enterprise Migration Case Studies","End-to-End Migration Execution","Production Cutover Strategy","Operational Readiness Review","Future Trends in ML Modernization","Career Roadmap","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Scikit-learn","TensorFlow","PyTorch","ONNX","MLflow","Kubeflow","Docker","Kubernetes","Apache Airflow","AWS SageMaker","Microsoft Azure Machine Learning","Google Cloud Vertex AI","Git & GitHub","Jupyter Notebook"],
    careers: ["Machine Learning Engineer","MLOps Engineer","AI Migration Consultant","Cloud AI Engineer","Machine Learning Architect","AI Platform Engineer","Data Migration Specialist","Enterprise AI Consultant","AI Solutions Architect"],
    certifications: ["Google Professional Machine Learning Engineer","AWS Certified Machine Learning Engineer – Associate","Microsoft Azure AI Engineer Associate (AI-102)","TensorFlow Developer Certificate","Certified Kubernetes Application Developer (CKAD)","Databricks Certified Machine Learning Professional"],
    realWorldCases: { intro: "Develop a complete Machine Learning migration solution that includes:", bullets: ["Enterprise Migration Case Studies","Migration planning and assessment","Model and dataset migration","Cloud platform migration","CI/CD pipeline modernization","Performance validation","Security verification","Technical documentation and migration presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for ML engineers, MLOps professionals, cloud engineers, AI architects, and data scientists involved in Machine Learning migration projects." },
      { question: "Is prior Machine Learning experience required?", answer: "Yes. Participants should have knowledge of Machine Learning, Python, model deployment, and cloud platforms." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes migration planning labs, cloud migration exercises, validation activities, and a comprehensive enterprise capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, TensorFlow, PyTorch, Scikit-learn, ONNX, MLflow, Kubeflow, Docker, Kubernetes, AWS SageMaker, Azure Machine Learning, Vertex AI, and Git." },
      { question: "What skills will I gain?", answer: "You will learn migration planning, framework migration, cloud migration, pipeline modernization, validation, performance optimization, and enterprise ML migration best practices." }
    ]
  },
  "Machine Learning - Monitoring": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Machine Learning, Python programming, model deployment, REST APIs, cloud platforms, data engineering fundamentals, and familiarity with MLOps concepts.",
    overview: "The Machine Learning – Monitoring course is designed for Machine Learning engineers, MLOps engineers, AI developers, data scientists, DevOps professionals, and cloud engineers who want to monitor, maintain, and optimize Machine Learning models in production environments. The course focuses on model performance monitoring, data quality monitoring, model drift detection, concept drift analysis, infrastructure monitoring, logging, observability, alerting, automated retraining, governance, and production incident management. Through hands-on labs, enterprise scenarios, and real-world projects, participants will learn how to build reliable, scalable, and continuously monitored Machine Learning systems that deliver consistent business value.",
    objectives: ["Understand the principles of Machine Learning monitoring and observability.","Monitor model performance, prediction quality, and inference latency.","Detect data drift, concept drift, and model degradation.","Implement logging, dashboards, and alerting mechanisms.","Monitor ML infrastructure, APIs, and production pipelines.","Automate model retraining and performance validation.","Build enterprise-grade monitoring solutions using modern MLOps practices."],
    days: [
      { day: 1, title: "Machine Learning Monitoring Fundamentals", topics: ["Introduction to ML Monitoring","Production ML Lifecycle","Monitoring Architecture","Model Health Metrics","Data Quality Monitoring","Business KPI Monitoring","Monitoring Best Practices"], handsOn: ["Setting up a model monitoring environment","Tracking prediction metrics","Creating monitoring dashboards"], outcome: "Understand the importance of continuous monitoring and establish a strong foundation for maintaining reliable Machine Learning systems in production." },
      { day: 2, title: "Model Performance & Drift Monitoring", topics: ["Model Performance Evaluation","Prediction Confidence Analysis","Data Drift Detection","Concept Drift Detection","Feature Distribution Monitoring","Label Distribution Analysis","Drift Mitigation Strategies"], handsOn: ["Detecting feature drift","Monitoring model accuracy over time","Comparing production and training datasets"], outcome: "Learn how to identify performance degradation and detect changes in production data that impact Machine Learning model accuracy." },
      { day: 3, title: "Infrastructure Monitoring & Observability", topics: ["Infrastructure Health Monitoring","API Monitoring","Latency & Throughput Analysis","Resource Utilization Monitoring","Logging Strategies","Distributed Tracing","Observability Frameworks"], handsOn: ["Monitoring API response times","Configuring centralized logging","Building infrastructure dashboards"], outcome: "Monitor the health of Machine Learning infrastructure and gain complete visibility into production services through logs, metrics, and traces." },
      { day: 4, title: "Alerting, Automation & MLOps Monitoring", topics: ["Alert Management","Automated Notifications","Model Retraining Pipelines","CI/CD Monitoring","ML Pipeline Monitoring","Experiment Tracking","Governance & Compliance Monitoring"], handsOn: ["Creating automated alerts","Configuring retraining workflows","Tracking experiments and model versions"], outcome: "Implement automated monitoring workflows that proactively detect issues, trigger alerts, and maintain production-ready Machine Learning pipelines." },
      { day: 5, title: "Enterprise Monitoring Project & Assessment", topics: ["Enterprise Monitoring Architecture","Production Incident Management","Root Cause Analysis","Monitoring Case Studies","Future Trends in AI Observability","Career Roadmap","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Scikit-learn","MLflow","Evidently AI","WhyLabs","Prometheus","Grafana","OpenTelemetry","Docker","Kubernetes","FastAPI","TensorFlow","PyTorch","Apache Airflow","Git & GitHub","Jupyter Notebook"],
    careers: ["MLOps Engineer","Machine Learning Engineer","AI Platform Engineer","ML Monitoring Engineer","Site Reliability Engineer (AI/ML)","Cloud AI Engineer","AI Operations Engineer","DevOps Engineer (Machine Learning)","AI Solutions Architect"],
    certifications: ["Google Professional Machine Learning Engineer","Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified Machine Learning Engineer – Associate","TensorFlow Developer Certificate","Certified Kubernetes Application Developer (CKAD)","Databricks Certified Machine Learning Professional"],
    realWorldCases: { intro: "Develop a complete Machine Learning monitoring solution that includes:", bullets: ["Monitoring Case Studies","Production model deployment","Data quality monitoring","Drift detection implementation","Performance dashboard creation","Automated alert configuration","Model retraining workflow","Monitoring documentation and project presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for Machine Learning engineers, MLOps professionals, AI developers, DevOps engineers, cloud engineers, data scientists, and IT professionals responsible for operating and maintaining production Machine Learning systems." },
      { question: "Is prior Machine Learning experience required?", answer: "Yes. Participants should have practical experience with Machine Learning fundamentals, Python programming, model deployment, and basic cloud or MLOps concepts." },
      { question: "Are practical projects included?", answer: "Yes. Each training day includes hands-on monitoring labs, drift detection exercises, dashboard creation, alert configuration, enterprise case studies, and a comprehensive capstone project based on production Machine Learning monitoring." },
      { question: "Which tools and technologies are covered?", answer: "Participants will work with Python, Scikit-learn, MLflow, Evidently AI, WhyLabs, Prometheus, Grafana, OpenTelemetry, Docker, Kubernetes, FastAPI, TensorFlow, PyTorch, Apache Airflow, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn to monitor Machine Learning models in production, detect data and concept drift, build observability dashboards, configure automated alerts, monitor infrastructure and APIs, implement automated retraining workflows, and manage enterprise-scale Machine Learning systems using modern MLOps best practices." }
    ]
  },
  "Machine Learning - Operations": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Machine Learning, Python programming, model deployment, cloud computing, Linux fundamentals, and familiarity with MLOps concepts.",
    overview: "The Machine Learning – Operations course is designed for Machine Learning engineers, MLOps engineers, AI developers, cloud engineers, and IT professionals responsible for managing Machine Learning solutions in production. The course focuses on operational workflows, infrastructure management, model lifecycle management, deployment operations, automation, monitoring, incident response, and operational governance. Through hands-on labs, enterprise scenarios, and production-based projects, participants will gain practical experience in operating reliable, scalable, and efficient Machine Learning environments.",
    objectives: ["Understand Machine Learning operational workflows.","Manage production ML environments and model lifecycles.","Automate deployment and operational processes.","Monitor system health and model performance.","Handle operational incidents and recovery procedures.","Implement governance and operational best practices.","Support enterprise Machine Learning operations effectively."],
    days: [
      { day: 1, title: "Machine Learning Operations Fundamentals", topics: ["Introduction to ML Operations","ML Operations Lifecycle","Production Environment Setup","Infrastructure Planning","Model Lifecycle Management","Resource Management","Operational Best Practices"], handsOn: ["Setting up an ML operations environment","Managing model versions","Configuring operational workflows"], outcome: "Understand the core operational processes required to manage Machine Learning solutions in production." },
      { day: 2, title: "Deployment & Infrastructure Operations", topics: ["Deployment Operations","Container Management","Kubernetes Operations","Cloud Infrastructure","Configuration Management","Storage Management","Backup & Recovery"], handsOn: ["Deploying ML applications","Managing containers","Performing backup and recovery tasks"], outcome: "Learn how to manage production infrastructure and maintain highly available Machine Learning services." },
      { day: 3, title: "Monitoring, Automation & Incident Management", topics: ["Operational Monitoring","Alert Management","Workflow Automation","Incident Detection","Root Cause Analysis","Service Recovery","Performance Tracking"], handsOn: ["Configuring monitoring dashboards","Automating operational tasks","Resolving production incidents"], outcome: "Monitor Machine Learning environments proactively and respond effectively to operational issues." },
      { day: 4, title: "Governance & Operational Excellence", topics: ["Operational Governance","Security Controls","Compliance Management","SLA & KPI Monitoring","Capacity Planning","Cost Optimization","Documentation Standards"], handsOn: ["Creating operational documentation","Monitoring service KPIs","Optimizing infrastructure utilization"], outcome: "Implement governance frameworks and operational standards to improve reliability, compliance, and efficiency." },
      { day: 5, title: "Enterprise Operations Project & Assessment", topics: ["Enterprise Operations Case Studies","End-to-End Operations Workflow","Production Readiness Review","Operational Audit","Future Trends in MLOps","Career Roadmap","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","MLflow","Docker","Kubernetes","Apache Airflow","Prometheus","Grafana","FastAPI","Git & GitHub","Linux","AWS SageMaker","Azure Machine Learning","Jupyter Notebook"],
    careers: ["MLOps Engineer","Machine Learning Operations Engineer","Machine Learning Engineer","AI Platform Engineer","Cloud AI Engineer","DevOps Engineer (AI/ML)","AI Infrastructure Engineer","Site Reliability Engineer (AI)"],
    certifications: ["Google Professional Machine Learning Engineer","AWS Certified Machine Learning Engineer – Associate","Microsoft Azure AI Engineer Associate (AI-102)","Certified Kubernetes Application Developer (CKAD)","TensorFlow Developer Certificate"],
    realWorldCases: { intro: "Develop a Machine Learning operations solution that includes:", bullets: ["Enterprise Operations Case Studies","Production environment setup","Model deployment workflow","Infrastructure monitoring","Incident response planning","Backup and recovery implementation","Operational documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for MLOps engineers, ML engineers, cloud professionals, and IT teams managing production Machine Learning systems." },
      { question: "Is prior Machine Learning experience required?", answer: "Yes. Participants should have basic knowledge of Machine Learning, Python, and deployment concepts." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes operational labs, deployment exercises, monitoring activities, and a real-world capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, MLflow, Docker, Kubernetes, Apache Airflow, Prometheus, Grafana, FastAPI, AWS SageMaker, Azure Machine Learning, Git & GitHub, and Linux." },
      { question: "What skills will I gain?", answer: "You will learn ML operations, deployment management, infrastructure monitoring, automation, incident handling, governance, and production support best practices." }
    ]
  },
  "Machine Learning - Performance Tuning": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Solid understanding of Machine Learning fundamentals, Python programming, statistics, feature engineering, model development, and experience with Scikit-learn, TensorFlow, or PyTorch.",
    overview: "The Machine Learning – Performance Tuning course is designed for Machine Learning engineers, AI developers, data scientists, MLOps engineers, and technical professionals who want to optimize Machine Learning models for maximum accuracy, scalability, efficiency, and production performance. This course focuses on advanced optimization strategies, hyperparameter tuning, feature optimization, model compression, inference acceleration, distributed training, GPU optimization, resource utilization, and production performance engineering. Through extensive hands-on labs, benchmarking exercises, and enterprise case studies, participants will learn how to build highly optimized Machine Learning systems capable of handling real-world production workloads.",
    objectives: ["Optimize Machine Learning models for speed, accuracy, and scalability.","Perform advanced hyperparameter optimization using modern techniques.","Improve feature quality through engineering and feature selection.","Reduce model complexity using pruning, quantization, and compression.","Optimize training and inference performance on CPU and GPU platforms.","Benchmark, profile, and troubleshoot ML performance bottlenecks.","Deploy high-performance Machine Learning models for enterprise applications."],
    days: [
      { day: 1, title: "Machine Learning Performance Fundamentals", topics: ["Introduction to Performance Engineering","Machine Learning Performance Metrics","Training vs Inference Performance","Profiling ML Workloads","Data Pipeline Optimization","Feature Engineering Optimization","Performance Benchmarking Fundamentals"], handsOn: ["Measuring model performance","Profiling training workflows","Optimizing data preprocessing pipelines"], outcome: "Understand the key factors affecting Machine Learning performance and establish performance baselines for model optimization." },
      { day: 2, title: "Hyperparameter & Model Optimization", topics: ["Hyperparameter Tuning Strategies","Grid Search","Random Search","Bayesian Optimization","Cross Validation Optimization","Ensemble Optimization","Automated Hyperparameter Tuning"], handsOn: ["Optimizing multiple ML algorithms","Comparing tuning strategies","Evaluating optimized model performance"], outcome: "Learn how to improve model accuracy and efficiency using advanced hyperparameter optimization techniques." },
      { day: 3, title: "Training & Inference Acceleration", topics: ["GPU Acceleration Fundamentals","Distributed Model Training","Parallel Processing Techniques","Mixed Precision Training","Batch Size Optimization","Inference Optimization","Hardware-Aware Machine Learning"], handsOn: ["Accelerating model training","Optimizing inference latency","Benchmarking CPU vs GPU execution"], outcome: "Develop high-performance Machine Learning models by leveraging hardware acceleration and optimized training techniques." },
      { day: 4, title: "Model Compression & Production Optimization", topics: ["Model Pruning","Model Quantization","Knowledge Distillation","ONNX Optimization","TensorRT Overview","Production Performance Monitoring","Scalable Model Deployment"], handsOn: ["Compressing trained models","Optimizing inference pipelines","Deploying lightweight ML models"], outcome: "Optimize Machine Learning models for production deployment while reducing resource consumption and maintaining prediction quality." },
      { day: 5, title: "Enterprise Performance Engineering Project & Assessment", topics: ["Enterprise Performance Case Studies","End-to-End Performance Optimization","Capacity Planning","Performance Troubleshooting","Cost Optimization Strategies","Future Trends in ML Optimization","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Scikit-learn","TensorFlow","PyTorch","Optuna","Ray Tune","MLflow","ONNX Runtime","TensorRT","NVIDIA CUDA","Pandas","NumPy","Docker","Kubernetes","Jupyter Notebook","Git & GitHub"],
    careers: ["Senior Machine Learning Engineer","Performance Optimization Engineer","AI Performance Engineer","MLOps Engineer","AI Infrastructure Engineer","Machine Learning Platform Engineer","Applied AI Engineer","Cloud AI Performance Specialist","AI Solutions Architect"],
    certifications: ["Google Professional Machine Learning Engineer","AWS Certified Machine Learning Engineer – Associate","Microsoft Azure AI Engineer Associate (AI-102)","TensorFlow Developer Certificate","NVIDIA Certified AI Infrastructure Professional","Databricks Certified Machine Learning Professional"],
    realWorldCases: { intro: "Design and optimize an enterprise Machine Learning solution that includes:", bullets: ["Enterprise Performance Case Studies","Performance benchmarking","Feature optimization","Hyperparameter tuning","Distributed training implementation","Model compression and acceleration","Production inference optimization","Technical documentation and performance report"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is designed for Machine Learning engineers, AI developers, data scientists, MLOps engineers, cloud engineers, and technical professionals responsible for optimizing Machine Learning models and production AI systems." },
      { question: "Is prior Machine Learning experience required?", answer: "Yes. Participants should have hands-on experience with Machine Learning model development, Python programming, and familiarity with frameworks such as Scikit-learn, TensorFlow, or PyTorch." },
      { question: "Are practical projects included?", answer: "Yes. Every training day includes performance benchmarking labs, optimization exercises, GPU acceleration tasks, model compression activities, enterprise case studies, and a comprehensive capstone project focused on production performance tuning." },
      { question: "Which tools and technologies are covered?", answer: "Participants will work with Python, Scikit-learn, TensorFlow, PyTorch, Optuna, Ray Tune, MLflow, ONNX Runtime, TensorRT, NVIDIA CUDA, Pandas, NumPy, Docker, Kubernetes, Jupyter Notebook, and Git & GitHub." },
      { question: "What skills will I gain?", answer: "You will learn to optimize Machine Learning models using advanced hyperparameter tuning, accelerate training and inference, compress models for efficient deployment, benchmark production performance, leverage GPU acceleration, reduce infrastructure costs, and build scalable, enterprise-grade AI systems using modern performance engineering best practices." }
    ]
  },
  "Machine Learning - Reporting": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Machine Learning, Python programming, data analysis, statistics, visualization techniques, and familiarity with Machine Learning workflows.",
    overview: "The Machine Learning – Reporting course is designed for Machine Learning engineers, data scientists, AI developers, business analysts, and reporting professionals who want to create meaningful reports and dashboards from Machine Learning models. The course covers model performance reporting, prediction analysis, visualization techniques, KPI reporting, explainable AI reporting, automated report generation, and executive dashboards. Through hands-on labs, enterprise case studies, and practical projects, participants will learn how to communicate Machine Learning insights effectively to technical teams and business stakeholders.",
    objectives: ["Create professional Machine Learning reports and dashboards.","Visualize model performance and prediction results.","Build KPI-driven reporting frameworks.","Generate automated reports using Python.","Present ML insights for technical and business audiences.","Develop explainable AI reports for decision-making.","Deliver enterprise-ready reporting solutions."],
    days: [
      { day: 1, title: "Machine Learning Reporting Fundamentals", topics: ["Introduction to ML Reporting","Reporting Lifecycle","Business Reporting Requirements","Key Performance Indicators (KPIs)","Data Visualization Principles","Reporting Best Practices","Report Planning"], handsOn: ["Defining reporting requirements","Creating KPI reports","Designing report layouts"], outcome: "Understand how Machine Learning reports support business decisions through clear visualization and performance tracking." },
      { day: 2, title: "Model Performance & Prediction Reporting", topics: ["Accuracy Reporting","Confusion Matrix Reporting","ROC & AUC Visualization","Regression Performance Reports","Prediction Analysis","Error Reporting","Explainability Reports"], handsOn: ["Building model evaluation reports","Visualizing prediction results","Preparing explainability summaries"], outcome: "Generate detailed reports that evaluate model performance and clearly explain prediction outcomes." },
      { day: 3, title: "Dashboard Development & Automation", topics: ["Interactive Dashboards","Power BI Integration","Tableau Integration","Python Reporting Libraries","Automated Report Generation","Scheduling Reports","Report Distribution"], handsOn: ["Creating interactive dashboards","Automating report generation","Publishing business reports"], outcome: "Develop automated dashboards and reporting workflows for continuous monitoring of Machine Learning projects." },
      { day: 4, title: "Enterprise Reporting & Governance", topics: ["Executive Reporting","Operational Dashboards","Model Monitoring Reports","Governance Reporting","Audit Reports","Compliance Documentation","Report Security"], handsOn: ["Designing executive dashboards","Preparing governance reports","Securing reporting workflows"], outcome: "Create enterprise reporting solutions that support governance, compliance, and executive decision-making." },
      { day: 5, title: "Enterprise Reporting Project & Assessment", topics: ["Enterprise Reporting Case Studies","End-to-End Reporting Workflow","Dashboard Review","Presentation Best Practices","Future Trends in AI Reporting","Career Roadmap","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Pandas","NumPy","Matplotlib","Plotly","Scikit-learn","Power BI","Tableau","Jupyter Notebook","Microsoft Excel","Git & GitHub","MLflow"],
    careers: ["Machine Learning Engineer","Data Scientist","AI Reporting Specialist","Business Intelligence Analyst","Data Analyst","AI Consultant","Reporting Analyst","Analytics Engineer"],
    certifications: ["Google Professional Machine Learning Engineer","Microsoft Power BI Data Analyst Associate (PL-300)","Tableau Certified Data Analyst","AWS Certified Machine Learning Engineer – Associate","Microsoft Azure AI Engineer Associate (AI-102)"],
    realWorldCases: { intro: "Develop a complete Machine Learning reporting solution that includes:", bullets: ["Enterprise Reporting Case Studies","KPI dashboard creation","Model performance reporting","Prediction visualization","Automated report generation","Executive reporting","Documentation and project presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for ML engineers, data scientists, analysts, AI developers, and reporting professionals." },
      { question: "Is prior Machine Learning experience required?", answer: "Yes. Basic knowledge of Machine Learning, Python, and data analysis is recommended." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes dashboard development, reporting automation, visualization exercises, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, Pandas, NumPy, Matplotlib, Plotly, Scikit-learn, Power BI, Tableau, MLflow, Excel, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn ML reporting, dashboard creation, visualization, automated reporting, KPI tracking, and executive reporting using modern analytics tools." }
    ]
  },
  "Machine Learning - Scripting": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Machine Learning, Python programming, data structures, automation concepts, and familiarity with Machine Learning libraries such as Scikit-learn or TensorFlow.",
    overview: "The Machine Learning – Scripting course is designed for Machine Learning engineers, AI developers, data scientists, automation engineers, and software professionals who want to develop efficient scripts for automating Machine Learning workflows. The course covers Python scripting, data processing automation, feature engineering scripts, model training automation, inference scripting, task scheduling, workflow orchestration, logging, error handling, and script optimization. Through practical coding exercises, real-world automation scenarios, and an enterprise project, participants will gain the skills to build reusable and production-ready Machine Learning scripts.",
    objectives: ["Develop reusable Python scripts for Machine Learning tasks.","Automate data preparation and preprocessing workflows.","Create scripts for model training and evaluation.","Build inference and prediction automation scripts.","Implement logging, scheduling, and error handling.","Optimize scripting workflows for production environments.","Manage Machine Learning automation using scripting best practices."],
    days: [
      { day: 1, title: "Python Scripting for Machine Learning", topics: ["Python Scripting Fundamentals","Project Structure","Variables & Functions","File Handling","Command-Line Arguments","Configuration Files","Coding Best Practices"], handsOn: ["Writing reusable Python scripts","Managing project configurations","Reading and processing datasets"], outcome: "Build well-structured Python scripts that support efficient Machine Learning development and automation." },
      { day: 2, title: "Data Processing & Automation Scripts", topics: ["Data Loading Automation","Data Cleaning Scripts","Feature Engineering Automation","Data Validation","Batch Processing","Scheduling Tasks","Workflow Automation"], handsOn: ["Automating preprocessing tasks","Creating scheduled data pipelines","Validating datasets through scripts"], outcome: "Automate repetitive data preparation tasks to improve consistency and development efficiency." },
      { day: 3, title: "Model Training & Inference Automation", topics: ["Automated Model Training","Model Evaluation Scripts","Hyperparameter Automation","Prediction Scripts","Batch Inference","Experiment Tracking","Result Logging"], handsOn: ["Automating model training","Building inference scripts","Recording experiment results"], outcome: "Develop automated workflows for training, evaluating, and deploying Machine Learning models." },
      { day: 4, title: "Production Scripting & Workflow Management", topics: ["Error Handling","Logging Frameworks","API Integration","Script Optimization","CI/CD Integration","Containerized Scripts","Security Best Practices"], handsOn: ["Optimizing Python scripts","Integrating scripts with APIs","Deploying automated workflows"], outcome: "Create reliable, secure, and production-ready Machine Learning scripts that integrate with enterprise environments." },
      { day: 5, title: "Enterprise Scripting Project & Assessment", topics: ["Enterprise Automation Case Studies","End-to-End Workflow Development","Code Review Techniques","Performance Optimization","Future Trends in ML Automation","Career Roadmap","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Scikit-learn","TensorFlow","PyTorch","Pandas","NumPy","MLflow","Apache Airflow","FastAPI","Docker","Git & GitHub","Jupyter Notebook"],
    careers: ["Machine Learning Engineer","AI Developer","Automation Engineer","MLOps Engineer","Data Scientist","Python Developer (AI/ML)","AI Solutions Engineer","ML Automation Specialist"],
    certifications: ["Google Professional Machine Learning Engineer","AWS Certified Machine Learning Engineer – Associate","Microsoft Azure AI Engineer Associate (AI-102)","TensorFlow Developer Certificate","Python Institute PCPP Certification"],
    realWorldCases: { intro: "Develop a complete Machine Learning automation solution that includes:", bullets: ["Enterprise Automation Case Studies","Data preprocessing scripts","Feature engineering automation","Model training and evaluation scripts","Prediction automation","Logging and scheduling","Technical documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for ML engineers, AI developers, automation engineers, and Python developers working with Machine Learning." },
      { question: "Is prior Machine Learning experience required?", answer: "Yes. Participants should have basic knowledge of Python programming and Machine Learning concepts." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes scripting exercises, automation labs, workflow development, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, Scikit-learn, TensorFlow, PyTorch, Pandas, NumPy, MLflow, Apache Airflow, FastAPI, Docker, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn Python scripting, ML workflow automation, data processing, model training automation, logging, scheduling, and production-ready scripting practices." }
    ]
  },
  "Machine Learning - Security": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Machine Learning, Python programming, cybersecurity fundamentals, cloud computing, networking, and data protection concepts.",
    overview: "The Machine Learning – Security course is designed for Machine Learning engineers, cybersecurity professionals, AI practitioners, cloud engineers, DevSecOps engineers, data scientists, and IT professionals responsible for securing ML systems and AI applications. This course focuses on protecting machine learning models, datasets, APIs, infrastructure, and deployment environments against security threats and vulnerabilities. Participants will learn secure ML development practices, adversarial machine learning, model protection, data privacy, identity management, compliance, monitoring, incident response, and enterprise security strategies through hands-on labs and real-world security scenarios.",
    objectives: ["Understand security risks in Machine Learning systems.","Protect datasets, models, and ML pipelines from cyber threats.","Implement secure authentication and authorization mechanisms.","Detect and mitigate adversarial machine learning attacks.","Secure ML APIs, cloud platforms, and deployment environments.","Apply governance, compliance, and data privacy best practices.","Build secure and resilient enterprise Machine Learning solutions."],
    days: [
      { day: 1, title: "Machine Learning Security Fundamentals", topics: ["Introduction to ML Security","Threat Landscape for ML Systems","Security Principles","ML Attack Surface","Identity & Access Management","Secure Development Lifecycle","Risk Assessment"], handsOn: ["Identifying ML security risks","Configuring secure development environments","Performing security assessments"], outcome: "Understand common security challenges in Machine Learning environments and establish secure development practices." },
      { day: 2, title: "Data & Model Security", topics: ["Data Protection","Data Encryption","Secure Data Storage","Model Security","Model Version Control","Intellectual Property Protection","Secure Model Distribution"], handsOn: ["Encrypting datasets","Securing model repositories","Managing secure model access"], outcome: "Learn how to secure datasets and machine learning models throughout the development and deployment lifecycle." },
      { day: 3, title: "Adversarial Machine Learning & Infrastructure Security", topics: ["Adversarial Machine Learning","Data Poisoning Attacks","Model Evasion Techniques","Secure API Development","Cloud Security","Container Security","Infrastructure Hardening"], handsOn: ["Simulating adversarial attacks","Securing ML APIs","Hardening deployment environments"], outcome: "Protect Machine Learning systems against adversarial attacks and infrastructure-level security threats." },
      { day: 4, title: "Monitoring, Governance & Compliance", topics: ["Security Monitoring","Logging & Auditing","Threat Detection","Incident Response","AI Governance","Regulatory Compliance","Disaster Recovery Planning"], handsOn: ["Monitoring ML environments","Reviewing audit logs","Creating incident response plans"], outcome: "Implement continuous security monitoring, governance, and compliance strategies for enterprise Machine Learning environments." },
      { day: 5, title: "Enterprise ML Security Project & Assessment", topics: ["Enterprise Security Architecture","End-to-End ML Security Implementation","Security Best Practices","Emerging AI Security Trends","Career Roadmap","Certification Guidance","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Scikit-learn","TensorFlow","PyTorch","MLflow","Docker","Kubernetes","Microsoft Azure Machine Learning","AWS SageMaker","Google Vertex AI","HashiCorp Vault","OWASP ZAP","Git & GitHub","Prometheus & Grafana"],
    careers: ["Machine Learning Security Engineer","AI Security Engineer","DevSecOps Engineer","Cloud Security Engineer","MLOps Security Specialist","Cybersecurity Consultant (AI/ML)","AI Risk & Compliance Analyst","Security Architect (AI Systems)"],
    certifications: ["Microsoft Azure Security Engineer Associate (AZ-500)","Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified Security – Specialty","Google Professional Cloud Security Engineer","Certified Information Systems Security Professional (CISSP)"],
    realWorldCases: { intro: "Design and implement a secure Machine Learning environment that includes:", bullets: ["Secure data pipeline","Model protection mechanisms","Role-based access control","API and infrastructure security","Monitoring and incident response","Compliance and governance framework"] },
    faqs: [
      { question: "Who should attend this course?", answer: "Machine Learning engineers, AI professionals, cybersecurity specialists, DevSecOps engineers, cloud administrators, data scientists, and IT professionals responsible for securing ML systems and AI applications." },
      { question: "Is prior security experience required?", answer: "Basic knowledge of Machine Learning, Python programming, networking, and cybersecurity concepts is recommended to successfully complete the practical security exercises." },
      { question: "Are practical labs included?", answer: "Yes. The course includes hands-on labs covering secure ML development, adversarial attack simulations, API security, cloud security, monitoring, governance, compliance, and enterprise security implementation." },
      { question: "Which tools and technologies are covered?", answer: "Participants will work with Python, Scikit-learn, TensorFlow, PyTorch, MLflow, Docker, Kubernetes, Microsoft Azure Machine Learning, AWS SageMaker, Google Vertex AI, HashiCorp Vault, OWASP ZAP, Git & GitHub, and Prometheus & Grafana." },
      { question: "What skills will I gain?", answer: "You will learn secure Machine Learning development, data and model protection, adversarial ML defense, API security, cloud security, identity and access management, governance, compliance, monitoring, incident response, and enterprise-grade ML security using industry-standard tools and best practices." }
    ]
  },
  "Machine Learning - Testing": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Machine Learning, Python programming, model development, software testing fundamentals, data preprocessing, and familiarity with Scikit-learn, TensorFlow, or PyTorch.",
    overview: "The Machine Learning – Testing course is designed for Machine Learning engineers, AI developers, MLOps engineers, QA engineers, data scientists, and software professionals responsible for validating Machine Learning systems before production deployment. The course covers ML testing methodologies, data validation, feature testing, model validation, pipeline testing, API testing, performance testing, security testing, bias testing, regression testing, and continuous testing within MLOps environments. Through hands-on labs, enterprise scenarios, and real-world testing projects, participants will learn how to ensure the quality, reliability, fairness, and performance of Machine Learning applications.",
    objectives: ["Understand Machine Learning testing methodologies and lifecycle.","Validate datasets, features, and ML pipelines.","Test model accuracy, reliability, and robustness.","Perform API, performance, and security testing.","Detect bias, drift, and data quality issues.","Automate ML testing within CI/CD pipelines.","Build enterprise-grade testing strategies for Machine Learning solutions."],
    days: [
      { day: 1, title: "Machine Learning Testing Fundamentals", topics: ["Introduction to ML Testing","ML Testing Lifecycle","Data Validation","Feature Validation","Data Quality Testing","Unit Testing for ML Code","Testing Best Practices"], handsOn: ["Validating datasets","Writing unit tests for ML workflows","Testing feature engineering pipelines"], outcome: "Understand the fundamentals of Machine Learning testing and validate data quality before model development." },
      { day: 2, title: "Model Validation & Functional Testing", topics: ["Model Accuracy Testing","Cross Validation","Regression Testing","Classification Testing","Error Analysis","Bias & Fairness Testing","Explainability Validation"], handsOn: ["Evaluating trained models","Testing prediction consistency","Performing fairness analysis"], outcome: "Validate Machine Learning models for accuracy, consistency, fairness, and business requirements." },
      { day: 3, title: "Integration & Performance Testing", topics: ["API Testing","Pipeline Testing","Integration Testing","Load Testing","Stress Testing","Inference Performance Testing","Scalability Validation"], handsOn: ["Testing prediction APIs","Measuring inference latency","Performing load testing"], outcome: "Ensure Machine Learning applications perform reliably under real-world workloads and production conditions." },
      { day: 4, title: "Security, Automation & MLOps Testing", topics: ["Security Testing","Adversarial Testing","Model Drift Testing","Continuous Testing","CI/CD Integration","Automated Test Pipelines","Test Reporting"], handsOn: ["Automating ML test cases","Detecting model drift","Building CI/CD testing workflows"], outcome: "Implement automated testing processes that improve reliability, security, and deployment confidence." },
      { day: 5, title: "Enterprise Testing Project & Assessment", topics: ["Enterprise Testing Case Studies","End-to-End ML Validation","Production Readiness Review","Test Documentation","Future Trends in ML Quality Assurance","Career Roadmap","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Scikit-learn","TensorFlow","PyTorch","PyTest","Great Expectations","MLflow","Evidently AI","FastAPI","Postman","Docker","Git & GitHub","Jupyter Notebook","Pandas","NumPy"],
    careers: ["Machine Learning Engineer","MLOps Engineer","AI QA Engineer","Machine Learning Test Engineer","AI Validation Engineer","Data Scientist","AI Solutions Engineer","Quality Assurance Engineer (AI/ML)"],
    certifications: ["Google Professional Machine Learning Engineer","AWS Certified Machine Learning Engineer – Associate","Microsoft Azure AI Engineer Associate (AI-102)","TensorFlow Developer Certificate","Databricks Certified Machine Learning Professional"],
    realWorldCases: { intro: "Develop a complete Machine Learning testing framework that includes:", bullets: ["Enterprise Testing Case Studies","Data validation","Model accuracy testing","API and pipeline testing","Performance benchmarking","Security and bias testing","Automated test reporting","Technical documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for ML engineers, QA professionals, MLOps engineers, AI developers, and data scientists involved in testing ML solutions." },
      { question: "Is prior Machine Learning experience required?", answer: "Yes. Participants should have basic knowledge of Machine Learning, Python, and model development." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes testing labs, validation exercises, API testing, automation activities, and an enterprise capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, Scikit-learn, TensorFlow, PyTorch, PyTest, Great Expectations, MLflow, Evidently AI, FastAPI, Postman, Docker, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn data validation, model testing, API testing, performance benchmarking, security testing, automated ML testing, and enterprise quality assurance practices." }
    ]
  },
  "Machine Learning - Troubleshooting": {
    level: "Advanced",
    scheduleDays: 5,
    prerequisites: "Basic knowledge of Machine Learning, Python programming, model development, data preprocessing, model deployment, and familiarity with Scikit-learn, TensorFlow, or PyTorch.",
    overview: "The Machine Learning – Troubleshooting course is designed for Machine Learning engineers, AI developers, MLOps engineers, data scientists, DevOps professionals, and IT teams responsible for diagnosing and resolving issues in Machine Learning solutions. The course covers debugging data pipelines, model failures, training issues, inference errors, deployment problems, performance bottlenecks, infrastructure challenges, monitoring insights, logging techniques, and root cause analysis. Through hands-on troubleshooting labs, real-world production scenarios, and enterprise case studies, participants will gain the practical skills required to identify, analyze, and resolve Machine Learning issues efficiently.",
    objectives: ["Identify common Machine Learning implementation and production issues.","Troubleshoot data quality, feature engineering, and model training problems.","Diagnose deployment and inference failures.","Analyze performance bottlenecks and optimize ML workflows.","Implement logging, monitoring, and debugging best practices.","Perform root cause analysis and corrective actions.","Resolve enterprise Machine Learning production incidents."],
    days: [
      { day: 1, title: "Machine Learning Troubleshooting Fundamentals", topics: ["Introduction to ML Troubleshooting","ML System Architecture Review","Common ML Failure Scenarios","Data Quality Issues","Data Validation Techniques","Feature Engineering Errors","Troubleshooting Methodology"], handsOn: ["Identifying data quality issues","Debugging preprocessing pipelines","Performing root cause analysis"], outcome: "Understand common Machine Learning problems and develop a structured approach to diagnosing data and workflow issues." },
      { day: 2, title: "Model Training & Validation Issues", topics: ["Training Failures","Overfitting & Underfitting","Hyperparameter Issues","Model Convergence Problems","Validation Errors","Evaluation Metric Analysis","Experiment Tracking"], handsOn: ["Resolving training failures","Optimizing model performance","Comparing validation results"], outcome: "Troubleshoot model training challenges and improve model reliability through effective validation and optimization techniques." },
      { day: 3, title: "Deployment & Inference Troubleshooting", topics: ["Deployment Failures","API Errors","Model Version Conflicts","Dependency Management","Inference Latency","Container Troubleshooting","Cloud Deployment Issues"], handsOn: ["Debugging deployment issues","Resolving API failures","Troubleshooting inference performance"], outcome: "Diagnose and resolve deployment, API, and inference issues affecting production Machine Learning applications." },
      { day: 4, title: "Monitoring, Logging & Performance Analysis", topics: ["Log Analysis","Monitoring Dashboards","Data Drift Detection","Concept Drift Analysis","Infrastructure Monitoring","Performance Bottleneck Identification","Incident Response Best Practices"], handsOn: ["Analyzing production logs","Monitoring model health","Investigating performance degradation"], outcome: "Use monitoring and logging tools to quickly identify production issues and maintain reliable Machine Learning systems." },
      { day: 5, title: "Enterprise Troubleshooting Project & Assessment", topics: ["Enterprise Incident Case Studies","End-to-End Troubleshooting Workflow","Recovery & Rollback Strategies","Preventive Maintenance","Future Trends in AI Operations","Career Roadmap","Final Presentation"], handsOn: [], outcome: "" }
    ],
    tools: ["Python","Scikit-learn","TensorFlow","PyTorch","MLflow","Evidently AI","Docker","Kubernetes","FastAPI","Prometheus","Grafana","Git & GitHub","Jupyter Notebook","Pandas","NumPy"],
    careers: ["Machine Learning Engineer","MLOps Engineer","AI Support Engineer","AI Operations Engineer","Machine Learning Platform Engineer","DevOps Engineer (AI/ML)","AI Solutions Consultant","Data Scientist"],
    certifications: ["Google Professional Machine Learning Engineer","Microsoft Azure AI Engineer Associate (AI-102)","AWS Certified Machine Learning Engineer – Associate","TensorFlow Developer Certificate","Databricks Certified Machine Learning Professional"],
    realWorldCases: { intro: "Develop a complete Machine Learning troubleshooting solution that includes:", bullets: ["Enterprise Incident Case Studies","Data pipeline issue diagnosis","Model training error resolution","Deployment troubleshooting","Performance optimization","Monitoring and log analysis","Root cause documentation and presentation"] },
    faqs: [
      { question: "Who should attend this course?", answer: "This course is ideal for ML engineers, MLOps professionals, AI developers, data scientists, and IT teams managing production ML systems." },
      { question: "Is prior Machine Learning experience required?", answer: "Yes. Participants should have knowledge of Machine Learning fundamentals, Python, and model deployment." },
      { question: "Are hands-on labs included?", answer: "Yes. The course includes troubleshooting labs, production issue simulations, enterprise case studies, and a capstone project." },
      { question: "Which tools and technologies are covered?", answer: "Python, Scikit-learn, TensorFlow, PyTorch, MLflow, Docker, Kubernetes, Prometheus, Grafana, FastAPI, Git & GitHub, and Jupyter Notebook." },
      { question: "What skills will I gain?", answer: "You will learn to diagnose ML failures, resolve deployment issues, optimize model performance, analyze logs, monitor production systems, and troubleshoot enterprise Machine Learning environments." }
    ]
  }
};

/* ══════════════════════════════════════════════════════════
   DOMAIN DETAIL PAGE — View More, Course Cards & Search
══════════════════════════════════════════════════════════ */

// ── Domain icons
const DOMAIN_ICONS = {
  "Artificial Intelligence":"🤖","Machine Learning":"🧠","Generative AI":"✨",
  "Cybersecurity":"🔒","Cloud Computing":"☁️","AWS":"☁️","Microsoft Azure":"🔷",
  "Google Cloud":"☁️","DevOps":"⚙️","Kubernetes":"⎈","Docker":"🐳",
  "Data Science":"📊","Data Engineering":"🔧","Python":"🐍","Java":"☕",
  ".NET":"🔷","Full Stack":"💻","SAP":"📈","Oracle":"🗄️","Salesforce":"☁️",
  "Networking":"🌐","Blockchain":"⛓️","RPA":"🤖","IoT":"📡","UI/UX":"🎨"
};

// ── Course icon helper
function getCourseIcon(name) {
  const n = name.toLowerCase();
  const map = {
    'fundamentals':'📖','administration':'⚙️','development':'💻','architecture':'🏗️',
    'security':'🔒','automation':'🤖','advanced':'🚀','integration':'🔗',
    'monitoring':'📊','analytics':'📈','performance':'⚡','migration':'🔄',
    'implementation':'🛠️','consulting':'💼','troubleshooting':'🔧','best practices':'✅',
    'enterprise':'🏢','certification':'🎓','hands-on':'🧪','hands on':'🧪',
    'operations':'⚙️','engineering':'🛠️','governance':'📜','api':'🔌',
    'agentic':'🤖','data model':'🗃️','reporting':'📑','scripting':'📝',
    'ci/cd':'🔃','infrastructure':'🏗️','testing':'🧪','cost':'💰',
    'scalability':'📡','real-world':'🌍'
  };
  for (const [key, icon] of Object.entries(map)) {
    if (n.includes(key)) return icon;
  }
  return '📚';
}

// ── Demand badge
function getDemandBadge(demand) {
  const d = (demand || '').toLowerCase().replace(/\s/g, '-');
  let cls = 'demand-medium';
  if (d.includes('very-high')) cls = 'demand-very-high';
  else if (d.includes('high')) cls = 'demand-high';
  else if (d.includes('low')) cls = 'demand-low';
  return `<span class="demand-badge ${cls}">${demand || 'N/A'}</span>`;
}

// ── Render course cards
function renderDomainCourses(courses) {
  const grid = document.getElementById('dd-courses-grid');
  const noResults = document.getElementById('dd-no-results');
  if (!courses || courses.length === 0) {
    if (grid) grid.innerHTML = '';
    if (noResults) noResults.style.display = 'block';
    return;
  }
  if (noResults) noResults.style.display = 'none';
  const domainName = window._currentDomainName || '';
  grid.innerHTML = courses.map((c) => {
    const originalIndex = (window._currentDomainCourses || courses).indexOf(c);
    return `
    <div class="course-card-dk">
      <span class="cc-num">${originalIndex + 1}</span>
      <div class="cc-icon">${getCourseIcon(c[0])}</div>
      <div class="cc-title">${c[0]}</div>
      <div class="cc-meta">
        ${getDemandBadge(c[1])}
        <span class="duration-chip">⏱ ${c[2]}</span>
      </div>
      <div class="cc-footer">
        <a class="cc-enroll-btn" href="course-detail.html?domain=${encodeURIComponent(domainName)}&idx=${originalIndex}">View More →</a>
      </div>
    </div>
  `;
  }).join('');
}

// ── Market-rate pricing model (INR) based on demand level + duration
function getCoursePricing(demand, durationText) {
  const hours = parseInt(durationText, 10) || 24;
  const rateByDemand = {
    'very high': 900,
    'high': 700,
    'medium': 550,
    'low': 400
  };
  const key = (demand || '').toLowerCase();
  const rate = rateByDemand[key] || rateByDemand['medium'];

  const rawPrice = rate * hours;
  // Round to a "market style" price ending in 499/999
  const price = Math.max(4999, Math.round(rawPrice / 500) * 500 - 1);
  const discountPercent = 35;
  const originalPrice = Math.round((price / (1 - discountPercent / 100)) / 100) * 100 - 1;

  return { price, originalPrice, discountPercent };
}

function formatINR(n) {
  return '₹' + Number(n).toLocaleString('en-IN');
}

// ── Course timeline generator — breaks the course into weekly milestones
const COURSE_TIMELINE_TEMPLATE = [
  { title: 'Orientation & Environment Setup', desc: 'Kick-off session, tool/environment setup, and a walkthrough of the course roadmap.' },
  { title: 'Foundational Concepts', desc: 'Core theory, terminology, and the fundamental building blocks for this topic.' },
  { title: 'Guided Practice', desc: 'Instructor-led exercises and walkthroughs applied to real-world scenarios.' },
  { title: 'Applied Techniques', desc: 'Deeper dive into intermediate techniques, tools, and industry best practices.' },
  { title: 'Hands-on Project Work', desc: 'Build a mini project that applies everything learned so far.' },
  { title: 'Advanced Concepts', desc: 'Advanced patterns, optimization strategies, and enterprise use-cases.' },
  { title: 'Capstone Project', desc: 'End-to-end capstone project mirroring a real enterprise requirement.' },
  { title: 'Review & Certification', desc: 'Mock assessment, doubt-clearing session, and the certification exam.' }
];

function pickEven(arr, n) {
  if (n >= arr.length) return arr.slice();
  if (n <= 1) return [arr[0]];
  const result = [];
  for (let i = 0; i < n; i++) {
    const idx = Math.round((i * (arr.length - 1)) / (n - 1));
    result.push(arr[idx]);
  }
  return result;
}

function getCourseTimeline(durationText) {
  const hours = parseInt(durationText, 10) || 24;
  const weeks = Math.max(3, Math.min(8, Math.round(hours / 10)));
  const steps = pickEven(COURSE_TIMELINE_TEMPLATE, weeks);
  const hoursPerWeek = Math.round(hours / weeks);
  return steps.map((step, i) => ({
    week: `Week ${i + 1}`,
    hours: i === steps.length - 1 ? (hours - hoursPerWeek * (steps.length - 1)) : hoursPerWeek,
    title: step.title,
    desc: step.desc
  }));
}

// ── Open course detail page (called by View More buttons on course cards)
function showCourseDetail(domainName, courseIndex) {
  const courses = DIGIKREIS_COURSES[domainName] || [];
  const course = courses[courseIndex];
  if (!course || !document.getElementById('cdp-course-name')) return;

  const [name, demand, duration] = course;
  const icon = DOMAIN_ICONS[domainName] || '📚';
  const real = COURSE_DETAILS[name];

  document.getElementById('cdp-breadcrumb').textContent = icon + ' ' + domainName;
  document.getElementById('cdp-course-name').textContent = name;
  document.getElementById('cdp-hero-icon').textContent = getCourseIcon(name);
  document.getElementById('cdp-hero-badges').innerHTML =
    `${getDemandBadge(demand)}<span class="duration-chip">⏱ ${duration}</span>` +
    (real ? `<span class="duration-chip">🎯 ${real.level}</span>` : '');
  document.getElementById('cdp-hero-desc').textContent = real
    ? real.overview
    : `Part of our ${domainName} curriculum, this course is built to take you from core concepts to job-ready, hands-on proficiency in ${name.split(' - ')[1] || name}.`;

  const { price, originalPrice, discountPercent } = getCoursePricing(demand, duration);
  document.getElementById('cdp-price-new').textContent = formatINR(price);
  document.getElementById('cdp-price-old').textContent = formatINR(originalPrice);
  document.getElementById('cdp-discount-tag').textContent = discountPercent + '% OFF';

  if (real && real.days && real.days.length) {
    const hoursPerDay = Math.round((parseInt(duration, 10) || 0) / (real.scheduleDays || real.days.length));
    document.getElementById('cdp-timeline').innerHTML = real.days.map(d => `
      <div class="cdp-timeline-item">
        <div class="cdp-timeline-marker">
          <div class="cdp-timeline-dot"></div>
          <div class="cdp-timeline-line"></div>
        </div>
        <div class="cdp-timeline-body">
          <div class="cdp-timeline-week">Day ${d.day} <span class="cdp-timeline-day-hours">&middot; ${hoursPerDay} Hrs</span></div>
          <div class="cdp-timeline-title">${d.title}</div>
          ${d.topics && d.topics.length ? `<div class="cdp-timeline-topics">${d.topics.map(t => `<span class="cdp-topic-tag">${t}</span>`).join('')}</div>` : ''}
          ${d.handsOn && d.handsOn.length ? `<div class="cdp-timeline-handson">🧪 Hands-on: ${d.handsOn.join(', ')}</div>` : ''}
          ${d.outcome ? `<div class="cdp-timeline-desc">${d.outcome}</div>` : ''}
        </div>
      </div>
    `).join('');
  } else {
    const timeline = getCourseTimeline(duration);
    document.getElementById('cdp-timeline').innerHTML = timeline.map((t) => `
      <div class="cdp-timeline-item">
        <div class="cdp-timeline-marker">
          <div class="cdp-timeline-dot"></div>
          <div class="cdp-timeline-line"></div>
        </div>
        <div class="cdp-timeline-body">
          <div class="cdp-timeline-week">${t.week} &middot; ${t.hours} Hrs</div>
          <div class="cdp-timeline-title">${t.title}</div>
          <div class="cdp-timeline-desc">${t.desc}</div>
        </div>
      </div>
    `).join('');
  }

  const extraGrid = document.getElementById('cdp-extra-grid');
  if (real && ((real.tools && real.tools.length) || (real.careers && real.careers.length))) {
    extraGrid.style.display = 'grid';
    document.getElementById('cdp-tools-chips').innerHTML = (real.tools || []).map(t => `<span class="cdp-chip">${t}</span>`).join('');
    document.getElementById('cdp-careers-chips').innerHTML = (real.careers || []).map(c => `<span class="cdp-chip">${c}</span>`).join('');
  } else {
    extraGrid.style.display = 'none';
  }

  const extraGrid2 = document.getElementById('cdp-extra-grid2');
  if (real && ((real.objectives && real.objectives.length) || (real.certifications && real.certifications.length))) {
    extraGrid2.style.display = 'grid';
    document.getElementById('cdp-objectives-list').innerHTML = (real.objectives || []).map(o => `<li>${o}</li>`).join('');
    document.getElementById('cdp-certs-chips').innerHTML = (real.certifications || []).map(c => `<span class="cdp-chip">${c}</span>`).join('');
  } else {
    extraGrid2.style.display = 'none';
  }

  const casesCard = document.getElementById('cdp-cases-card');
  if (real && real.realWorldCases && (real.realWorldCases.intro || (real.realWorldCases.bullets && real.realWorldCases.bullets.length))) {
    casesCard.style.display = 'block';
    document.getElementById('cdp-cases-intro').textContent = real.realWorldCases.intro || '';
    document.getElementById('cdp-cases-chips').innerHTML = (real.realWorldCases.bullets || []).map(b => `<span class="cdp-chip">${b}</span>`).join('');
  } else {
    casesCard.style.display = 'none';
  }

  const faqCard = document.getElementById('cdp-faq-card');
  if (real && real.faqs && real.faqs.length) {
    faqCard.style.display = 'block';
    document.getElementById('cdp-faq-list').innerHTML = real.faqs.map(f => `
      <details class="cdp-faq-item">
        <summary>${f.question}</summary>
        <p class="cdp-faq-answer">${f.answer}</p>
      </details>
    `).join('');
  } else {
    faqCard.style.display = 'none';
  }

  const goEnroll = function (e) {
    e.preventDefault();
    window.location.href = 'contact.html';
  };
  document.getElementById('cdp-contact-btn').onclick = goEnroll;
  document.getElementById('cdp-price-cta').onclick = goEnroll;

  // Back to Courses should return to this domain's course list, not the top-level domain grid
  const backBtn = document.getElementById('cdp-back-btn');
  if (backBtn) backBtn.href = 'courses.html?domain=' + encodeURIComponent(domainName);

  window._currentCourseDetail = { domainName, name, demand, duration, price, originalPrice, discountPercent, real };
}

// ── Download a plain-text brochure of everything shown on the course detail page
function downloadCourseDetails() {
  const c = window._currentCourseDetail;
  if (!c) return;
  const { domainName, name, demand, duration, price, originalPrice, discountPercent, real } = c;
  const line = '─'.repeat(60);
  const lines = [];

  lines.push(line);
  lines.push(name);
  lines.push(line);
  lines.push(`Domain: ${domainName}`);
  lines.push(`Duration: ${duration}   |   Demand: ${demand}${real ? `   |   Level: ${real.level}` : ''}`);
  lines.push('');

  lines.push('COURSE FEE — 2026 Market Rate');
  lines.push(`  ${formatINR(price)}  (was ${formatINR(originalPrice)}, ${discountPercent}% off)`);
  lines.push('  Indicative pricing benchmarked against current industry training rates for this domain, demand level & duration.');
  lines.push('  • Live instructor-led sessions');
  lines.push('  • Hands-on projects & assignments');
  lines.push('  • Completion certificate');
  lines.push('  • Placement & interview assistance');
  lines.push('');

  const overviewEl = document.getElementById('cdp-hero-desc');
  lines.push('COURSE OVERVIEW');
  lines.push((overviewEl && overviewEl.textContent.trim()) || (real ? real.overview : ''));
  lines.push('');

  if (real && real.objectives && real.objectives.length) {
    lines.push('LEARNING OBJECTIVES');
    real.objectives.forEach(o => lines.push(`  • ${o}`));
    lines.push('');
  }

  lines.push('COURSE TIMELINE');
  if (real && real.days && real.days.length) {
    real.days.forEach(d => {
      lines.push(`  Day ${d.day} — ${d.title}`);
      if (d.topics && d.topics.length) lines.push(`    Topics: ${d.topics.join(', ')}`);
      if (d.handsOn && d.handsOn.length) lines.push(`    Hands-on: ${d.handsOn.join(', ')}`);
      if (d.outcome) lines.push(`    Outcome: ${d.outcome}`);
    });
  } else {
    getCourseTimeline(duration).forEach(t => {
      lines.push(`  ${t.week} (${t.hours} Hrs) — ${t.title}`);
      lines.push(`    ${t.desc}`);
    });
  }
  lines.push('');

  if (real && real.tools && real.tools.length) {
    lines.push('TOOLS & TECHNOLOGIES');
    lines.push(`  ${real.tools.join(', ')}`);
    lines.push('');
  }

  if (real && real.realWorldCases && (real.realWorldCases.intro || (real.realWorldCases.bullets || []).length)) {
    lines.push('REAL-WORLD CASE STUDIES');
    if (real.realWorldCases.intro) lines.push(`  ${real.realWorldCases.intro}`);
    (real.realWorldCases.bullets || []).forEach(b => lines.push(`  • ${b}`));
    lines.push('');
  }

  if (real && real.careers && real.careers.length) {
    lines.push('CAREER OPPORTUNITIES');
    real.careers.forEach(c2 => lines.push(`  • ${c2}`));
    lines.push('');
  }

  if (real && real.certifications && real.certifications.length) {
    lines.push('RECOMMENDED CERTIFICATIONS');
    real.certifications.forEach(c2 => lines.push(`  • ${c2}`));
    lines.push('');
  }

  if (real && real.faqs && real.faqs.length) {
    lines.push('FREQUENTLY ASKED QUESTIONS');
    real.faqs.forEach((f, i) => {
      lines.push(`  ${i + 1}. ${f.question}`);
      lines.push(`     ${f.answer}`);
    });
    lines.push('');
  }

  lines.push(line);
  lines.push('DigiKreis Technologies  |  sumathi@digikreis.in  |  +91 80958 19639');
  lines.push('https://digikreis.in');

  const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name.replace(/[^a-z0-9]+/gi, '_') + '_Course_Details.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ── Close domain detail overlay
function closeDomainDetail() {
  const page = document.getElementById('domain-detail-page');
  if (page) {
    page.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ── Open domain detail (called by View More buttons in HTML)
function showDomainDetail(domainName) {
  const courses = DIGIKREIS_COURSES[domainName] || [];
  const page = document.getElementById('domain-detail-page');
  if (!page) return;

  const icon = DOMAIN_ICONS[domainName] || '📚';
  document.getElementById('dd-domain-name').textContent = icon + ' ' + domainName;
  document.getElementById('dd-domain-meta').textContent = courses.length + ' Courses · Market Demand 2026 Data';

  const searchInput = document.getElementById('dd-search-input');
  if (searchInput) searchInput.value = '';
  const searchCount = document.getElementById('dd-search-count');
  if (searchCount) searchCount.textContent = '';

  window._currentDomainName = domainName;
  window._currentDomainCourses = courses;
  renderDomainCourses(courses);

  const contactBtn = document.getElementById('dd-contact-btn');
  if (contactBtn) {
    contactBtn.onclick = function (e) {
      e.preventDefault();
      window.location.href = 'contact.html';
    };
  }

  page.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// ── Global search across domains + courses
function performGlobalSearch(query) {
  const q = query.trim().toLowerCase();
  const dropdown = document.getElementById('search-results-dropdown');
  if (!dropdown) return;
  if (!q || q.length < 2) { dropdown.style.display = 'none'; return; }

  const domainMatches = [], courseMatches = [];

  Object.keys(DIGIKREIS_COURSES).forEach(domain => {
    if (domain.toLowerCase().includes(q)) {
      domainMatches.push({ domain, count: DIGIKREIS_COURSES[domain].length });
    }
  });

  Object.entries(DIGIKREIS_COURSES).forEach(([domain, courses]) => {
    if (courseMatches.length >= 10) return;
    courses.forEach((c, ci) => {
      if (courseMatches.length >= 10) return;
      if (c[0].toLowerCase().includes(q)) {
        courseMatches.push({ name: c[0], domain, demand: c[1], duration: c[2], index: ci });
      }
    });
  });

  let html = '';
  if (domainMatches.length > 0) {
    html += `<div class="sr-section-label">📁 Domains (${domainMatches.length})</div>`;
    domainMatches.forEach(r => {
      const icon = DOMAIN_ICONS[r.domain] || '📚';
      html += `<div class="sr-item" onclick="showDomainDetail('${r.domain.replace(/'/g, "\\'")}');document.getElementById('search-results-dropdown').style.display='none';">
        <span class="sr-item-icon">${icon}</span>
        <div class="sr-item-text">
          <div class="sr-item-name">${r.domain}</div>
          <div class="sr-item-sub">${r.count} Courses</div>
        </div>
        <span class="sr-item-badge">Domain</span>
      </div>`;
    });
  }
  if (courseMatches.length > 0) {
    html += `<div class="sr-section-label">📚 Courses</div>`;
    courseMatches.forEach(r => {
      const icon = DOMAIN_ICONS[r.domain] || '📚';
      const demandColor = r.demand === 'Very High' ? '#4ade80' : r.demand === 'High' ? '#60a5fa' : '#f5a623';
      html += `<div class="sr-item" onclick="window.location.href='course-detail.html?domain=${encodeURIComponent(r.domain)}&idx=${r.index}';">
        <span class="sr-item-icon">${icon}</span>
        <div class="sr-item-text">
          <div class="sr-item-name">${r.name}</div>
          <div class="sr-item-sub">${r.domain} · ${r.duration}</div>
        </div>
        <span class="sr-item-badge" style="color:${demandColor}">${r.demand}</span>
      </div>`;
    });
  }
  if (!html) {
    html = `<div class="sr-no-results">No results found for "<strong>${query}</strong>"</div>`;
  }
  dropdown.innerHTML = html;
  dropdown.style.display = 'block';
}

// ── Wire up all event listeners on DOM ready
document.addEventListener('DOMContentLoaded', function () {

  // Back button
  const backBtn = document.getElementById('dd-back-btn');
  if (backBtn) backBtn.addEventListener('click', closeDomainDetail);

  // courses.html reached via "Back to Courses" from a course page (?domain=...):
  // reopen that domain's course list instead of landing on the top-level domain grid.
  if (document.getElementById('domain-detail-page')) {
    const params = new URLSearchParams(window.location.search);
    const domainName = params.get('domain');
    if (domainName && DIGIKREIS_COURSES[domainName]) {
      showDomainDetail(domainName);
    }
  }

  // Standalone course-detail.html: read ?domain=&idx= from the URL and render
  if (document.body.dataset.page === 'course-detail') {
    const params = new URLSearchParams(window.location.search);
    const domainName = params.get('domain') || '';
    const idx = parseInt(params.get('idx'), 10) || 0;
    showCourseDetail(domainName, idx);

    const downloadBtn = document.getElementById('cdp-download-btn');
    if (downloadBtn) downloadBtn.addEventListener('click', downloadCourseDetails);
  }

  // Domain search input (inside detail page)
  const ddInput = document.getElementById('dd-search-input');
  if (ddInput) {
    ddInput.addEventListener('input', function () {
      const q = this.value.trim().toLowerCase();
      const all = window._currentDomainCourses || [];
      const filtered = q ? all.filter(c => c[0].toLowerCase().includes(q)) : all;
      renderDomainCourses(filtered);
      const cnt = document.getElementById('dd-search-count');
      if (cnt) cnt.textContent = q ? (filtered.length + ' of ' + all.length + ' courses match') : '';
    });
    ddInput.addEventListener('keydown', e => { if (e.key === 'Escape') closeDomainDetail(); });
  }

  // Global search input (on courses page)
  const gsInput = document.getElementById('gs-input');
  if (gsInput) {
    gsInput.addEventListener('input', function () { performGlobalSearch(this.value); });
    gsInput.addEventListener('keydown', function (e) {
      const dropdown = document.getElementById('search-results-dropdown');
      if (e.key === 'Enter') {
        const first = dropdown ? dropdown.querySelector('.sr-item') : null;
        if (first) first.click();
      }
      if (e.key === 'Escape' && dropdown) dropdown.style.display = 'none';
    });
  }

  // Global search button
  const gsBtn = document.getElementById('gs-search-btn');
  if (gsBtn) {
    gsBtn.addEventListener('click', function () {
      const inp = document.getElementById('gs-input');
      if (inp) performGlobalSearch(inp.value);
    });
  }

  // Close dropdown on outside click
  document.addEventListener('click', function (e) {
    const bar = document.getElementById('global-search-bar');
    const drop = document.getElementById('search-results-dropdown');
    if (bar && drop && !bar.contains(e.target)) drop.style.display = 'none';
  });

  // Escape key closes overlay
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      const page = document.getElementById('domain-detail-page');
      if (page && page.classList.contains('active')) closeDomainDetail();
    }
  });
});


checkWebsiteStatus();