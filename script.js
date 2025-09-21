// Filtering and lightbox behavior
document.addEventListener('DOMContentLoaded', function(){
  const btnAll = document.getElementById('filter-all');
  const btnPhotos = document.getElementById('filter-photos');
  const btnVideos = document.getElementById('filter-videos');
  const cards = Array.from(document.querySelectorAll('.card'));
  const filters = {all:()=>true, photo:(c)=>c.dataset.type==='photo', video:(c)=>c.dataset.type==='video'};
  const buttons = [btnAll, btnPhotos, btnVideos];
  function setFilter(type){
    buttons.forEach(b=>b.classList.remove('active'));
    if(type==='all') btnAll.classList.add('active');
    if(type==='photo') btnPhotos.classList.add('active');
    if(type==='video') btnVideos.classList.add('active');
    cards.forEach(c=> c.style.display = filters[type](c) ? '' : 'none');
  }
  btnAll.addEventListener('click', ()=> setFilter('all'));
  btnPhotos.addEventListener('click', ()=> setFilter('photo'));
  btnVideos.addEventListener('click', ()=> setFilter('video'));

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxMedia = document.getElementById('lightbox-media');
  const closeBtn = document.getElementById('lightbox-close');
  document.querySelectorAll('.view-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const type = btn.dataset.type;
      const src = btn.dataset.src;
      lightboxMedia.innerHTML = '';
      if(type==='photo'){
        const img = document.createElement('img'); img.src = src; img.alt='Preview'; lightboxMedia.appendChild(img);
      } else {
        const iframe = document.createElement('iframe'); iframe.src = src + '?autoplay=1'; iframe.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'; lightboxMedia.appendChild(iframe);
      }
      lightbox.style.display = 'flex'; lightbox.setAttribute('aria-hidden','false');
    });
  });
  closeBtn.addEventListener('click', ()=>{ lightbox.style.display='none'; lightbox.setAttribute('aria-hidden','true'); lightboxMedia.innerHTML=''; });
  lightbox.addEventListener('click', (e)=>{ if(e.target===lightbox) { lightbox.style.display='none'; lightbox.setAttribute('aria-hidden','true'); lightboxMedia.innerHTML=''; } });

  // Contact form simple demo behavior
  document.getElementById('contactForm').addEventListener('submit', function(e){
    e.preventDefault();
    alert('Thanks! Message received. I will contact you soon.');
    this.reset();
  });
});