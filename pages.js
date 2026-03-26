const title = document.getElementById('mainTitle');
const section2 = document.getElementById('onduleur');

const observer2 = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      title.classList.add('left');
    } else {
      title.classList.remove('left');
    }
  });
}, {
  threshold: 0.5
});
observer2.observe(section2);


const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};




const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {

      const el = entry.target;
      // Prevent re-trigger
      if (el.classList.contains('visible')) return;

      let delay = 0;

      // Detect delay based on class
      if (el.classList.contains('animate-on-scroll-1')) {
        delay = 800;
      } else if (el.classList.contains('animate-on-scroll-2')) {
        delay = 1600;
      }

      setTimeout(() => {
        el.classList.add('visible');
      }, delay);

      // Optional: stop observing after animation
      observer.unobserve(el);
    }
  });
}, observerOptions);

// Observe ALL variants
document.querySelectorAll(
  '.animate-on-scroll, .animate-on-scroll-1, .animate-on-scroll-2, .reveal, .animate, .delay-1, .delay-2'
).forEach(el => {
  observer.observe(el);
});

window.addEventListener('scroll', () => {
  const trigger = section2.offsetTop;
  const scroll = window.scrollY;

  const progress = Math.min(Math.max((scroll - trigger + 300) / 400, 0), 1);

  title.style.left = (progress * 0) + 'px';
  title.style.right = ((1 - progress) * 0) + 'px';
  title.style.transform = `translateX(${(1 - progress) * 200}px)`;
});