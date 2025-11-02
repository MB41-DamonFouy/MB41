// petit comportement: formulaire local
document.addEventListener('DOMContentLoaded', ()=> {
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', e=>{
      e.preventDefault();
      alert('Formulaire simulé — configurez un backend ou utilisez le mailto dans la page de contact.');
      form.reset();
    });
  }

  // menu hamburger (mobile)
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.getElementById('mainNav');

  if(menuToggle && mainNav){
    menuToggle.addEventListener('click', ()=> {
      const isOpen = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      // changer le label pour accessibilité
      menuToggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    });

    // fermer le menu lors d'un clic sur un lien
    mainNav.addEventListener('click', (e)=>{
      if(e.target.tagName === 'A'){
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Ouvrir le menu');
      }
    });

    // fermer avec Escape
    document.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape' && mainNav.classList.contains('open')){
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Ouvrir le menu');
      }
    });
  }

  // --- galerie : images par catégorie (modifiez les noms selon vos fichiers) ---
  const galleries = {
    placo: ['images/placo-1.jpg','images/placo-2.jpg','images/placo-3.jpg','images/placo-4.jpg'],
    carrelage: ['images/carrelage-1.jpg','images/carrelage-2.jpg','images/carrelage-3.jpg','images/carrelage-4.jpg','images/carrelage-5.jpg'],
    parquet: ['images/parquet-1.jpg','images/parquet-2.jpg','images/parquet-3.jpg','images/parquet-4.jpg'],
    electricite: ['images/electricite-1.jpg','images/electricite-2.jpg'],
    plomberie: ['images/plomberie-1.jpg','images/plomberie-2.jpg'],
  };

  const serviceCards = document.querySelectorAll('.service-card[data-gallery]');
  const modal = document.getElementById('galleryModal');
  const modalImg = modal.querySelector('.gallery-image');
  const counterIndex = modal.querySelector('.gallery-index');
  const counterTotal = modal.querySelector('.gallery-total');
  const btnPrev = modal.querySelector('.gallery-prev');
  const btnNext = modal.querySelector('.gallery-next');
  const btnClose = modal.querySelector('.gallery-close');

  let currentGallery = null;
  let currentIndex = 0;

  function openGallery(id, index=0){
    const list = galleries[id] || [];
    if(!list.length) return;
    currentGallery = list;
    currentIndex = index;
    modalImg.src = currentGallery[currentIndex];
    modalImg.alt = id + ' image ' + (currentIndex+1);
    counterIndex.textContent = currentIndex + 1;
    counterTotal.textContent = currentGallery.length;
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }

  function closeGallery(){
    modal.setAttribute('aria-hidden','true');
    modalImg.src = '';
    currentGallery = null;
    document.body.style.overflow = '';
  }

  function showIndex(i){
    if(!currentGallery) return;
    currentIndex = (i + currentGallery.length) % currentGallery.length;
    modalImg.src = currentGallery[currentIndex];
    counterIndex.textContent = currentIndex + 1;
  }

  serviceCards.forEach(card=>{
    card.addEventListener('click', ()=>{
      const id = card.getAttribute('data-gallery');
      openGallery(id, 0);
    });
    card.addEventListener('keypress', (e)=>{
      if(e.key === 'Enter') card.click();
    });
  });

  btnPrev.addEventListener('click', ()=> showIndex(currentIndex - 1));
  btnNext.addEventListener('click', ()=> showIndex(currentIndex + 1));
  btnClose.addEventListener('click', closeGallery);

  // fermer au clic sur l'overlay (en dehors de l'image)
  modal.addEventListener('click', (e)=>{
    if(e.target === modal) closeGallery();
  });

  // clavier : ESC / flèches
  document.addEventListener('keydown', (e)=>{
    if(modal.getAttribute('aria-hidden') === 'false'){
      if(e.key === 'Escape') closeGallery();
      if(e.key === 'ArrowLeft') showIndex(currentIndex - 1);
      if(e.key === 'ArrowRight') showIndex(currentIndex + 1);
    }
  });

  // --- fin galerie ---
});