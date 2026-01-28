document.addEventListener('DOMContentLoaded', function() {

  // Smooth scroll for anchor links
  document.addEventListener('click', function(e) {
    const target = e.target.closest('a[href^="#"]');
    if (target && target.getAttribute('href') !== '#') {
      e.preventDefault();
      const targetId = target.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });

  // Navbar scroll effect
  const navbar = document.querySelector('nav, .navbar, header');
  let lastScrollTop = 0;
  
  function handleNavbarScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (navbar) {
      if (scrollTop > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    
    lastScrollTop = scrollTop;
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // Form validation for contact form
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const formData = {};
      
      // Remove previous error messages
      contactForm.querySelectorAll('.error-message').forEach(function(el) {
        el.remove();
      });
      
      contactForm.querySelectorAll('input, textarea, select').forEach(function(field) {
        field.classList.remove('error');
        
        const value = field.value.trim();
        const fieldName = field.name || field.id;
        formData[fieldName] = value;
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
          isValid = false;
          field.classList.add('error');
          showError(field, 'This field is required');
        }
        
        // Email validation
        if (field.type === 'email' && value) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(value)) {
            isValid = false;
            field.classList.add('error');
            showError(field, 'Please enter a valid email address');
          }
        }
        
        // Phone validation (basic)
        if (field.type === 'tel' && value) {
          const phonePattern = /^[\d\s\-\+\(\)]+$/;
          if (!phonePattern.test(value) || value.length < 10) {
            isValid = false;
            field.classList.add('error');
            showError(field, 'Please enter a valid phone number');
          }
        }
        
        // Min length validation
        if (field.hasAttribute('minlength') && value) {
          const minLength = parseInt(field.getAttribute('minlength'));
          if (value.length < minLength) {
            isValid = false;
            field.classList.add('error');
            showError(field, 'Minimum ' + minLength + ' characters required');
          }
        }
      });
      
      if (isValid) {
        contactForm.classList.add('success');
        
        // You can add actual form submission here
        console.log('Form submitted:', formData);
        
        // Optional: Reset form after successful submission
        setTimeout(function() {
          contactForm.reset();
          contactForm.classList.remove('success');
        }, 3000);
      }
    });
    
    function showError(field, message) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.textContent = message;
      errorDiv.style.color = '#dc3545';
      errorDiv.style.fontSize = '0.875rem';
      errorDiv.style.marginTop = '0.25rem';
      
      if (field.parentNode) {
        field.parentNode.insertBefore(errorDiv, field.nextSibling);
      }
    }
  }

  // Scroll animations (fade-in on scroll)
  const animatedElements = document.querySelectorAll('.fade-in, .animate-on-scroll, [data-animate]');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated', 'visible');
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  animatedElements.forEach(function(element) {

    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
  });

});

/* Cookie Consent */

// Helper function to check cookie consent
function hasConsentFor(category) {
  if (typeof window.CookieConsent === 'undefined') {
    return false; // Default to no consent if cookie consent not loaded
  }
  
  return window.CookieConsent.validConsent(category);
}

// Helper function to execute code only with consent
function withConsent(category, callback) {
  if (hasConsentFor(category)) {
    callback();
  } else {
    console.log(`[WARNING] Skipping ${category} code - no user consent`);
  }
}

// Cookie Consent Initialization

(function() {
  'use strict';
  
  let initAttempts = 0;
  const maxAttempts = 50; // 5 seconds max wait
  
  // Wait for DOM and vanilla-cookieconsent to be ready
  function initCookieConsent() {
    initAttempts++;
    
    
    if (typeof window.CookieConsent === 'undefined') {
      if (initAttempts < maxAttempts) {
        setTimeout(initCookieConsent, 100);
      } else {
      }
      return;
    }

    const cc = window.CookieConsent;
    
    
    // Initialize cookie consent
    try {
      cc.run({
  "autoShow": true,
  "mode": "opt-in",
  "revision": 0,
  "categories": {
    "necessary": {
      "enabled": true,
      "readOnly": true
    },
    "analytics": {
      "enabled": false,
      "readOnly": false,
      "autoClear": {
        "cookies": [
          {
            "name": "_ga"
          },
          {
            "name": "_ga_*"
          },
          {
            "name": "_gid"
          },
          {
            "name": "_gat"
          }
        ]
      }
    },
    "marketing": {
      "enabled": false,
      "readOnly": false,
      "autoClear": {
        "cookies": [
          {
            "name": "_fbp"
          },
          {
            "name": "_fbc"
          },
          {
            "name": "fr"
          }
        ]
      }
    }
  },
  "language": {
    "default": "he",
    "translations": {
      "he": {
        "consentModal": {
          "title": "אנחנו משתמשים בעוגיות 🍪",
          "description": "נדיר שירן משתמש בעוגיות כדי לשפר את החוויה שלך, לנתח שימוש באתר ולסייע במאמצי השיווק שלנו.",
          "acceptAllBtn": "אשר הכל",
          "acceptNecessaryBtn": "רק הכרחי",
          "showPreferencesBtn": "נהל העדפות",
          "footer": "<a href=\"#privacy-policy\">מדיניות פרטיות</a> | <a href=\"#terms-conditions\">תנאי שימוש</a>"
        },
        "preferencesModal": {
          "title": "העדפות עוגיות",
          "acceptAllBtn": "אשר הכל",
          "acceptNecessaryBtn": "רק הכרחי",
          "savePreferencesBtn": "שמור העדפות",
          "closeIconLabel": "סגור",
          "sections": [
            {
              "title": "עוגיות חיוניות",
              "description": "עוגיות אלה הכרחיות לתפקוד האתר ולא ניתן להשבית אותן.",
              "linkedCategory": "necessary"
            },
            {
              "title": "עוגיות ניתוח",
              "description": "עוגיות אלה עוזרות לנו להבין איך המבקרים מתקשרים עם האתר שלנו.",
              "linkedCategory": "analytics"
            },
            {
              "title": "עוגיות שיווקיות",
              "description": "עוגיות אלה משמשות להצגת פרסומות מותאמות אישית.",
              "linkedCategory": "marketing"
            }
          ]
        }
      }
    }
  },
  "guiOptions": {
    "consentModal": {
      "layout": "box",
      "position": "bottom right",
      "equalWeightButtons": true,
      "flipButtons": false
    },
    "preferencesModal": {
      "layout": "box",
      "equalWeightButtons": true,
      "flipButtons": false
    }
  }
});
      
      // Optional: Handle consent changes (check if onChange is available)
      if (typeof cc.onChange === 'function') {
        cc.onChange(function(cookie, changed_preferences) {
      
      // Enable/disable analytics based on consent
      if (changed_preferences.includes('analytics')) {
        if (cc.validConsent('analytics')) {
          // Enable analytics (e.g., Google Analytics)
          // Example: gtag('consent', 'update', { analytics_storage: 'granted' });
        } else {
          // Example: gtag('consent', 'update', { analytics_storage: 'denied' });
        }
      }
      
      // Enable/disable marketing based on consent
      if (changed_preferences.includes('marketing')) {
        if (cc.validConsent('marketing')) {
          // Example: gtag('consent', 'update', { ad_storage: 'granted' });
        } else {
          // Example: gtag('consent', 'update', { ad_storage: 'denied' });
        }
      }
        });
      } else {
      }

      // Note: Cookie Preferences button removed per marketing guidelines
      // Footer should be clean and minimal - users can manage cookies via banner
    } catch (error) {
    }
  }

  // Initialize when DOM is ready - multiple approaches for reliability
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookieConsent);
    // Backup timeout in case DOMContentLoaded doesn't fire
    setTimeout(initCookieConsent, 1000);
  } else if (document.readyState === 'interactive' || document.readyState === 'complete') {
    initCookieConsent();
  } else {
    // Fallback - try after a short delay
    setTimeout(initCookieConsent, 500);
  }
  
  // Additional fallback - try after page load
  if (typeof window !== 'undefined') {
    if (window.addEventListener) {
      window.addEventListener('load', initCookieConsent, { once: true });
    }
  }
})();

/* Accessibility Features */

/* Mickidum Accessibility Toolbar Initialization - Zappy Style */

window.onload = function() {
    
    try {
        window.micAccessTool = new MicAccessTool({
            buttonPosition: 'left', // Position on left side
            forceLang: 'he-IL', // Force language
            icon: {
                position: {
                    bottom: { size: 50, units: 'px' },
                    left: { size: 20, units: 'px' },
                    type: 'fixed'
                },
                backgroundColor: 'transparent', // Transparent to allow CSS styling
                color: 'transparent', // Let CSS handle coloring
                img: 'accessible',
                circular: false // Square button for consistent styling
            },
            menu: {
                dimensions: {
                    width: { size: 300, units: 'px' },
                    height: { size: 'auto', units: 'px' }
                }
            }
        });
        
    } catch (error) {
    }
    
    // Keyboard shortcut handler: ALT+A (Option+A on Mac) to toggle accessibility widget visibility (desktop only)
    document.addEventListener('keydown', function(event) {
        // Check if ALT+A is pressed (ALT on Windows/Linux, Option on Mac)
        var isAltOrOption = event.altKey;
        // Use event.code for reliable physical key detection (works regardless of Option key character output)
        var isAKey = event.code === 'KeyA' || event.keyCode === 65 || event.which === 65 || 
                      (event.key && (event.key.toLowerCase() === 'a' || event.key === 'å' || event.key === 'Å'));
        
        if (isAltOrOption && isAKey) {
            // Only work on desktop (screen width > 768px)
            if (window.innerWidth > 768) {
                event.preventDefault();
                event.stopPropagation();
                
                // Toggle visibility class on body
                var isVisible = document.body.classList.contains('accessibility-widget-visible');
                
                if (isVisible) {
                    // Hide the widget
                    document.body.classList.remove('accessibility-widget-visible');
                } else {
                    // Show the widget
                    document.body.classList.add('accessibility-widget-visible');
                    
                    // After a short delay, click the button to open the menu
                    setTimeout(function() {
                        var accessButton = document.getElementById('mic-access-tool-general-button');
                        if (accessButton) {
                            accessButton.click();
                        }
                    }, 200);
                }
            }
        }
    }, true);
};


// Zappy Contact Form API Integration (Fallback)
(function() {
    if (window.zappyContactFormLoaded) {
        console.log('📧 Zappy contact form already loaded');
        return;
    }
    window.zappyContactFormLoaded = true;

    function initContactFormIntegration() {
        console.log('📧 Zappy: Initializing contact form API integration...');

        // Find the contact form (try multiple selectors for flexibility)
        const contactForm = document.querySelector('.contact-form') || 
                           document.querySelector('form[action*="contact"]') ||
                           document.querySelector('form#contact') ||
                           document.querySelector('form#contactForm') ||
                           document.getElementById('contactForm') ||
                           document.querySelector('section.contact form') ||
                           document.querySelector('section#contact form') ||
                           document.querySelector('form');
        
        if (!contactForm) {
            console.log('⚠️ Zappy: No contact form found on page');
            return;
        }
        
        console.log('✅ Zappy: Contact form found:', contactForm.className || contactForm.id || 'unnamed form');

        // Store original submit handler if exists
        const originalOnSubmit = contactForm.onsubmit;

    // Add Zappy API integration using capture phase to run before other handlers
    contactForm.addEventListener('submit', async function(e) {
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // Send to Zappy backend API (don't prevent default, let other handlers run)
        try {
            console.log('📧 Zappy: Sending contact form to backend API...');
            const response = await fetch('https://api.zappy5.com/api/email/contact-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    websiteId: '55c23b00-ac12-4bbd-8b73-04279255a290',
                    name: data.name || '',
                    email: data.email || '',
                    subject: data.subject || 'Contact Form Submission',
                    message: data.message || '',
                    phone: data.phone || null
                })
            });

            const result = await response.json();
            
            if (result.success) {
                console.log('✅ Zappy: Contact form data sent successfully to backend');
            } else {
                console.log('⚠️ Zappy: Backend returned error:', result.error);
            }
        } catch (error) {
            console.error('❌ Zappy: Failed to send to backend API:', error);
            // Don't break the existing form submission
        }
        }, true); // Use capture phase to run before other handlers

        console.log('✅ Zappy: Contact form API integration initialized');
    } // End of initContactFormIntegration
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initContactFormIntegration);
    } else {
        // DOM is already ready, initialize immediately
        initContactFormIntegration();
    }
})();


/* ZAPPY_PUBLISHED_LIGHTBOX_RUNTIME */
(function(){
  try {
    if (window.__zappyPublishedLightboxInit) return;
    window.__zappyPublishedLightboxInit = true;

    function safeText(s){ try { return String(s || '').replace(/"/g,'&quot;'); } catch(e){ return ''; } }

    function ensureOverlayForToggle(toggle){
      try {
        if (!toggle || !toggle.id) return;
        if (toggle.id.indexOf('zappy-lightbox-toggle-') !== 0) return;
        var elementId = toggle.id.replace('zappy-lightbox-toggle-','');
        var label = document.querySelector('label.zappy-lightbox-trigger[for="' + toggle.id + '"]');
        if (!label) return;

        // If toggle is inside the label (corrupted), move it before the label so the for attribute works consistently.
        try {
          if (label.contains(toggle) && label.parentNode) {
            label.parentNode.insertBefore(toggle, label);
          }
        } catch (e0) {}

        var lightboxId = 'zappy-lightbox-' + elementId;
        var lb = document.getElementById(lightboxId);
        if (lb && lb.parentNode !== document.body) {
          try { document.body.appendChild(lb); } catch (eMove) {}
        }

        if (!lb) {
          var img = null;
          try { img = label.querySelector('img'); } catch (eImg0) {}
          if (!img) {
            try { img = document.querySelector('img[data-element-id="' + elementId + '"]'); } catch (eImg1) {}
          }
          if (!img) return;

          lb = document.createElement('div');
          lb.id = lightboxId;
          lb.className = 'zappy-lightbox';
          lb.setAttribute('data-zappy-image-lightbox','true');
          lb.style.display = 'none';
          lb.innerHTML =
            '<label class="zappy-lightbox-backdrop" for="' + toggle.id + '" aria-label="Close"></label>' +
            '<div class="zappy-lightbox-content">' +
              '<label class="zappy-lightbox-close" for="' + toggle.id + '" aria-label="Close">×</label>' +
              '<img class="zappy-lightbox-image" src="' + safeText(img.currentSrc || img.src || img.getAttribute('src')) + '" alt="' + safeText(img.getAttribute('alt') || 'Image') + '">' +
            '</div>';
          document.body.appendChild(lb);
        }

        // Keep overlay image in sync at open time (in case src changed / responsive currentSrc)
        function syncOverlayImage(){
          try {
            var imgCur = label.querySelector('img');
            var imgLb = lb.querySelector('img');
            if (imgCur && imgLb) {
              imgLb.src = imgCur.currentSrc || imgCur.src || imgLb.src;
              imgLb.alt = imgCur.alt || imgLb.alt;
            }
          } catch (eSync) {}
        }

        if (!toggle.__zappyLbBound) {
          toggle.addEventListener('change', function(){
            if (toggle.checked) syncOverlayImage();
            lb.style.display = toggle.checked ? 'flex' : 'none';
          });
          toggle.__zappyLbBound = true;
        }

        if (!lb.__zappyLbBound) {
          lb.addEventListener('click', function(ev){
            try {
              var t = ev.target;
              if (!t) return;
              if (t.classList && (t.classList.contains('zappy-lightbox-backdrop') || t.classList.contains('zappy-lightbox-close'))) {
                ev.preventDefault();
                toggle.checked = false;
                lb.style.display = 'none';
              }
            } catch (e2) {}
          });
          lb.__zappyLbBound = true;
        }

        if (!label.__zappyLbClick) {
          label.addEventListener('click', function(ev){
            try {
              if (document.body && document.body.classList && document.body.classList.contains('zappy-edit-mode')) return;
              if (ev && ev.target && ev.target.closest && ev.target.closest('a[href],button,input,select,textarea')) return;
              ev.preventDefault();
              ev.stopPropagation();
              toggle.checked = true;
              syncOverlayImage();
              lb.style.display = 'flex';
            } catch (e3) {}
          }, true);
          label.__zappyLbClick = true;
        }
      } catch (e) {}
    }

    function initZappyPublishedLightboxes(){
      try {
        // Repair orphaned labels (label has for=toggleId but input is missing)
        var orphanLabels = document.querySelectorAll('label.zappy-lightbox-trigger[for^="zappy-lightbox-toggle-"]');
        for (var i=0;i<orphanLabels.length;i++){
          var lbl = orphanLabels[i];
          var forId = lbl && lbl.getAttribute ? lbl.getAttribute('for') : null;
          if (!forId) continue;
          if (!document.getElementById(forId)) {
            var t = document.createElement('input');
            t.type = 'checkbox';
            t.id = forId;
            t.className = 'zappy-lightbox-toggle';
            t.setAttribute('data-zappy-image-lightbox','true');
            if (lbl.parentNode) lbl.parentNode.insertBefore(t, lbl);
          }
        }

        var toggles = document.querySelectorAll('input.zappy-lightbox-toggle[id^="zappy-lightbox-toggle-"]');
        for (var j=0;j<toggles.length;j++){
          ensureOverlayForToggle(toggles[j]);
        }

        // Close on ESC if any lightbox is open
        if (!document.__zappyLbEscBound) {
          document.addEventListener('keydown', function(ev){
            try {
              if (!ev || ev.key !== 'Escape') return;
              var openLb = document.querySelector('.zappy-lightbox[style*="display: flex"]');
              if (openLb) {
                var openToggle = null;
                try {
                  var id = openLb.id || '';
                  if (id.indexOf('zappy-lightbox-') === 0) {
                    openToggle = document.getElementById('zappy-lightbox-toggle-' + id.replace('zappy-lightbox-',''));
                  }
                } catch (e4) {}
                if (openToggle) openToggle.checked = false;
                openLb.style.display = 'none';
              }
            } catch (e5) {}
          });
          document.__zappyLbEscBound = true;
        }
      } catch (eInit) {}
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initZappyPublishedLightboxes, { once: true });
    } else {
      initZappyPublishedLightboxes();
    }
  } catch (eOuter) {}
})();
/* END ZAPPY_PUBLISHED_LIGHTBOX_RUNTIME */
