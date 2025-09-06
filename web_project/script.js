// script.js
document.addEventListener('DOMContentLoaded', function() {
  // Loading screen
  const loader = document.querySelector('.loader-container');
  window.addEventListener('load', function() {
    setTimeout(() => {
      loader.classList.add('hide');
    }, 500);
  });

  // Show navbar after loading
  const navbar = document.querySelector('.navbar');
  setTimeout(() => {
    navbar.classList.add('show');
  }, 1000);

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Explore Skills button
  const exploreBtn = document.getElementById('explore-skills');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', function() {
      const skillsSection = document.getElementById('skills');
      if (skillsSection) {
        window.scrollTo({
          top: skillsSection.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  }

  // Intersection Observer for scroll animations
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Animate project cards with delay
        if (entry.target.classList.contains('projek')) {
          const projectCards = entry.target.querySelectorAll('.project-card');
          projectCards.forEach((card, index) => {
            const delay = card.getAttribute('data-delay') || `${0.1 + index * 0.2}s`;
            setTimeout(() => {
              card.classList.add('visible');
            }, parseFloat(delay) * 1000);
          });
        }
        
        // Animate skill categories with delay
        if (entry.target.classList.contains('skills')) {
          const skillCategories = entry.target.querySelectorAll('.skill-category');
          skillCategories.forEach((category, index) => {
            const delay = category.getAttribute('data-delay') || `${0.1 + index * 0.2}s`;
            setTimeout(() => {
              category.classList.add('visible');
            }, parseFloat(delay) * 1000);
          });
        }
      } else {
        // Hide element when it's not in view (for scroll up animation)
        if (entry.target.classList.contains('projek') || entry.target.classList.contains('kontak') || entry.target.classList.contains('skills')) {
          entry.target.classList.remove('visible');
          
          if (entry.target.classList.contains('projek')) {
            const projectCards = entry.target.querySelectorAll('.project-card');
            projectCards.forEach(card => {
              card.classList.remove('visible');
            });
          }
          
          if (entry.target.classList.contains('skills')) {
            const skillCategories = entry.target.querySelectorAll('.skill-category');
            skillCategories.forEach(category => {
              category.classList.remove('visible');
            });
          }
        }
      }
    });
  }, { threshold: 0.1, rootMargin: '-100px 0px' });

  // Observe all sections
  document.querySelectorAll('.section').forEach(section => {
    sectionObserver.observe(section);
  });

  // Add active state to navigation based on scroll position
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  function activateNav() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', activateNav);
  window.addEventListener('load', activateNav);

  // Add hover effect to detail buttons
  const detailButtons = document.querySelectorAll('.btn-detail');
  detailButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const url = this.parentElement.getAttribute('href');
      if (url) {
        setTimeout(() => {
          window.open(url, '_blank', 'noopener noreferrer');
        }, 300);
      }
    });
  });

  // Add subtle animation to hero title
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    setTimeout(() => {
      heroTitle.style.opacity = '1';
      heroTitle.style.transform = 'translateY(0)';
    }, 1200);
  }

  // Enhanced parallax effect for background shapes
  const bgShapes = document.querySelectorAll('.bg-shape');
  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateBackgrounds() {
    const scrollY = window.scrollY;
    const totalScroll = document.body.scrollHeight - window.innerHeight;
    const scrollFraction = scrollY / totalScroll;
    
    bgShapes.forEach((shape, index) => {
      const speed = 0.02 + (index * 0.005);
      const rotationSpeed = 0.01 + (index * 0.002);
      const scaleBase = 1 + (Math.sin(scrollFraction * Math.PI * 2 + index) * 0.1);
      
      const translateX = Math.sin(scrollFraction * Math.PI * 2 + index) * 100 * speed;
      const translateY = Math.cos(scrollFraction * Math.PI * 3 + index) * 150 * speed;
      const rotate = scrollFraction * 360 * rotationSpeed;
      
      shape.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg) scale(${scaleBase})`;
    });
    
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateBackgrounds);
      ticking = true;
    }
  });

  // Mouse move parallax effect
  window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const x = clientX / window.innerWidth;
    const y = clientY / window.innerHeight;
    
    bgShapes.forEach((el, index) => {
      const speed = 0.03 + (index * 0.01);
      const transformX = (x - 0.5) * speed * 100 * (index + 1);
      const transformY = (y - 0.5) * speed * 100 * (index + 1);
      
      // Combine with scroll effect
      const currentTransform = el.style.transform;
      const transformParts = currentTransform.split(')');
      const baseTransform = transformParts[0];
      const additionalTransform = transformParts.slice(1).join(')');
      
      el.style.transform = `${baseTransform} translate(${transformX}px, ${transformY}px)${additionalTransform}`;
    });
  });

  // Initialize background animations
  updateBackgrounds();
});