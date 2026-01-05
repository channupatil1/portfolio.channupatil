// --- SCROLL REVEAL EFFECT FOR LOGOS AND PORTFOLIO ITEMS ---
// Select all elements with the 'scroll-reveal' class
const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

// Function to handle the intersection of elements
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    // Check if the element is visible
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      // Stop observing after the animation has been triggered once
      observer.unobserve(entry.target);
    }
  });
}, {
  // Option: Trigger when 10% of the element is visible
  threshold: 0.1 
});

// Start observing all elements with the 'scroll-reveal' class
scrollRevealElements.forEach(el => {
  observer.observe(el);
});


// --- ANIMATE SOCIAL COUNTERS (Runs only on index.html where social-stat exists) ---
document.querySelectorAll('.social-stat').forEach(el=>{
  const target = +el.getAttribute('data-target') || 0;
  const start = 0;
  const duration = 1500;
  let startTime = null;
  function step(ts){
    if(!startTime) startTime = ts;
    const progress = Math.min((ts - startTime)/duration, 1);
    const eased = Math.pow(progress, 0.8);
    const current = Math.floor(start + (target - start) * eased);
    // friendly display
    if (target >= 1000000) el.innerText = (current/1000000).toFixed(2) + 'M';
    else if (target >= 1000) el.innerText = Math.floor(current/1000) + 'K';
    else el.innerText = current;
    if(progress < 1) requestAnimationFrame(step);
    else {
      // final formatted
      if (target >= 1000000) el.innerText = (target/1000000).toFixed(2) + 'M';
      else if (target >= 1000) el.innerText = Math.floor(target/1000) + 'K';
      else el.innerText = target;
    }
  }
  requestAnimationFrame(step);
});
