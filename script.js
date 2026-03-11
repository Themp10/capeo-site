/* ========================================
   CAPEO - Solar Panel Company Website
   JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
  
  // ---- Header Scroll Effect ----
  const header = document.getElementById('header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
  
  // ---- Mobile Menu Toggle ----
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const nav = document.getElementById('nav');
  
  mobileMenuBtn.addEventListener('click', function() {
    mobileMenuBtn.classList.toggle('active');
    nav.classList.toggle('mobile-active');
  });
  
  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
      if (nav.classList.contains('mobile-active')) {
        mobileMenuBtn.classList.remove('active');
        nav.classList.remove('mobile-active');
      }
    });
  });
  
  // Mobile dropdown toggle
  document.querySelectorAll('.nav-dropdown .dropdown-trigger').forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      if (window.innerWidth < 1024) {
        e.preventDefault();
        this.closest('.nav-dropdown').classList.toggle('active');
      }
    });
  });
  
  // ---- Smooth Scroll for Anchor Links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = header.offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ---- Scroll Animations (Intersection Observer) ----
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Stagger animations for multiple elements in same section
        const siblings = entry.target.parentElement.querySelectorAll('.animate-on-scroll');
        siblings.forEach((sibling, index) => {
          if (sibling.getBoundingClientRect().top < window.innerHeight) {
            setTimeout(() => {
              sibling.classList.add('visible');
            }, index * 100);
          }
        });
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
  
  // ---- Counter Animation ----
  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        element.textContent = target.toLocaleString() + suffix;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current).toLocaleString() + suffix;
      }
    }, 16);
  }
  
  // Observe stat values for counter animation
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  document.querySelectorAll('[data-count]').forEach(el => {
    statObserver.observe(el);
  });
  
  // ---- Create Floating Particles ----
  function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 3 + 's';
      particle.style.animationDuration = (3 + Math.random() * 2) + 's';
      particle.style.width = (4 + Math.random() * 4) + 'px';
      particle.style.height = particle.style.width;
      container.appendChild(particle);
    }
  }
  
  createParticles();
  
  // ---- Parallax Effect on Hero ----
  const heroVisual = document.querySelector('.hero-visual');
  
  if (heroVisual && window.innerWidth > 1024) {
    document.addEventListener('mousemove', function(e) {
      const x = (window.innerWidth / 2 - e.clientX) / 50;
      const y = (window.innerHeight / 2 - e.clientY) / 50;
      
      heroVisual.style.transform = `translate(${x}px, ${y}px)`;
    });
  }
  
  // ---- Form Submission ----
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      
      // Simple validation
      let isValid = true;
      const required = ['firstName', 'lastName', 'email', 'phone'];
      
      required.forEach(field => {
        const input = document.getElementById(field);
        if (!input.value.trim()) {
          input.style.borderColor = '#f43f5e';
          isValid = false;
        } else {
          input.style.borderColor = '';
        }
      });
      
      if (!isValid) {
        return;
      }
      
      // Simulate form submission
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = `
        <svg class="animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-dasharray="50" stroke-dashoffset="20"/>
        </svg>
        Envoi en cours...
      `;
      submitBtn.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        submitBtn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          Message envoyé !
        `;
        submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
        
        // Reset form after delay
        setTimeout(() => {
          contactForm.reset();
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }
  
  // ---- Active Navigation Highlight ----
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      
      if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.style.color = '';
        });
        navLink.style.color = 'var(--primary)';
      }
    });
  }
  
  window.addEventListener('scroll', highlightNav);
  
  // ---- Preloader (Optional) ----
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
  });
  
  // ---- Energy Flow Animation Enhancement ----
  function enhanceEnergyFlow() {
    const energyParticles = document.querySelectorAll('.energy-particle');
    energyParticles.forEach((particle, index) => {
      particle.style.left = (Math.random() * 20 - 10) + 'px';
    });
  }
  
  enhanceEnergyFlow();
  
  // ---- Testimonial Cards Hover Effect ----
  document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.borderColor = 'var(--primary)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.borderColor = 'var(--border)';
    });
  });
  
  // ---- Feature Cards Random Delay ----
  document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.style.transitionDelay = (index * 0.05) + 's';
  });
  
  // ---- Scroll to Top on Logo Click ----
  document.querySelectorAll('.logo').forEach(logo => {
    logo.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });
  
  // ---- Input Focus Effects ----
  document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
    });
  });
  
  // ---- Responsive Adjustments ----
  function handleResize() {
    if (window.innerWidth >= 1024) {
      nav.classList.remove('mobile-active');
      mobileMenuBtn.classList.remove('active');
    }
  }
  
  window.addEventListener('resize', handleResize);
  
  console.log('CAPEO Website initialized successfully!');
});



const scrollers = document.querySelectorAll(".scroller");

// If a user hasn't opted in for recuded motion, then we add the animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    // add data-animated="true" to every `.scroller` on the page
    scroller.setAttribute("data-animated", true);

    // Make an array from the elements within `.scroller-inner`
    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    // For each item in the array, clone it
    // add aria-hidden to it
    // add it into the `.scroller-inner`
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}
