// ===== SMOOTH SCROLL & NAV INTERACTIONS =====
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scroll for all nav links
  const navLinks = document.querySelectorAll('.nav-menu a, .footer-links a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(href);
        
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.pushState(null, null, href);
        }
      }
    });
  });
});

// ===== CTA BUTTON SCROLL TO CONTACT =====
document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta');
  
  buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      if (!this.closest('form')) {
        e.preventDefault();
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
});

// ===== FORM SUBMISSION & VALIDATION =====
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.contact-form');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nameInput = form.querySelector('input[name="name"]');
      const emailInput = form.querySelector('input[name="email"]');
      const messageInput = form.querySelector('textarea[name="message"]');
      
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();
      
      // Validation
      if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
      }
      
      if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
      }
      
      // Simulate form submission
      const submitBtn = form.querySelector('.form-submit');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        showNotification(`Thank you, ${name}! We've received your message and will be in touch soon.`, 'success');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }
  
  // Email validation helper
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  // Notification system
  function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1.5rem 2rem;
      background: ${type === 'success' ? '#00d084' : '#ff6b6b'};
      color: ${type === 'success' ? '#050810' : '#fff'};
      border-radius: 10px;
      font-weight: 600;
      z-index: 2000;
      animation: slideInRight 0.4s ease-out;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.4s ease-out';
      setTimeout(() => notification.remove(), 400);
    }, 4000);
  }
});

// ===== SCROLL REVEAL ANIMATIONS =====
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
  const elementsToObserve = document.querySelectorAll(
    '.zone-card, .value-item, .sustainability-item, .investment-stat, .gallery-item, .about-text'
  );
  
  elementsToObserve.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
});

// ===== STAGGERED ANIMATION FOR CARDS =====
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.zone-card, .value-item');
  
  cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });
});

// ===== GALLERY INTERACTION =====
document.addEventListener('DOMContentLoaded', function() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      const label = this.querySelector('.gallery-overlay p');
      if (label) {
        console.log('Viewing:', label.textContent);
      }
    });
  });
});

// ===== MOBILE MENU TOGGLE (FUTURE ENHANCEMENT) =====
document.addEventListener('DOMContentLoaded', function() {
  // Can add hamburger menu here for mobile
  const nav = document.querySelector('nav');
  const mobileViewport = window.innerWidth <= 768;
  
  if (mobileViewport) {
    console.log('Mobile viewport detected');
  }
});

// ===== DYNAMIC STYLES & KEYFRAMES =====
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideOutRight {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(30px);
    }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(styleSheet);

// ===== SCROLL PROGRESS INDICATOR (OPTIONAL) =====
window.addEventListener('scroll', function() {
  const scrollProgress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  // Can use this for progress bar if added
});

// ===== LAZY LOAD IMAGES (PERFORMANCE) =====
document.addEventListener('DOMContentLoaded', function() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
});
