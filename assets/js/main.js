// Copied from Build/site/assets/js/main.js
(function(){
  const btn = document.getElementById('menuBtn');
  const nav = document.getElementById('mainNav');
  if(btn && nav){
    btn.addEventListener('click', () => nav.classList.toggle('open'));
  }
  const header = document.querySelector('.site-header');
  if(header && document.body.classList.contains('solutions-page')){
    const pageHeader = document.querySelector('.page-header');
    let threshold = 120;
    const computeThreshold = () => {
      if(pageHeader){
        threshold = Math.max(24, pageHeader.offsetHeight - header.offsetHeight);
      }
    };
    const updateHeaderState = () => {
      if(window.scrollY > threshold){
        header.classList.add('is-solid');
      }else{
        header.classList.remove('is-solid');
      }
    };
    computeThreshold();
    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, {passive:true});
    window.addEventListener('resize', () => {
      computeThreshold();
      updateHeaderState();
    });
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
