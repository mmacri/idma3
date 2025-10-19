// Copied from Build/site/assets/js/main.js
(function(){
  const btn = document.getElementById('menuBtn');
  const nav = document.getElementById('mainNav');
  if(btn && nav){
    btn.addEventListener('click', () => nav.classList.toggle('open'));
  }
  // Fallback for contact form if action not configured
  const form = document.getElementById('contactForm');
  if(form && form.action.includes('your-endpoint')){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const subject = encodeURIComponent('Website Contact Form');
      const body = encodeURIComponent(
        ['First name','Last name','Email','Phone','Message'].map(k => `${k}: ${data.get(k.toLowerCase().replace(' ','_'))||''}`).join('\n')
      );
      window.location.href = `mailto:contact@yourdomain.tld?subject=${subject}&body=${body}`;
    });
  }
})();
