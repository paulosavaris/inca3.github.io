document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.galeria-carousel');
    let images = Array.from(carousel.querySelectorAll('img'));
    const total = images.length;
  
    // Número de imagens visíveis com base no tamanho da primeira imagem
    function getVisibleCount() {
      const containerWidth = carousel.offsetWidth;
      const imageWidth = images[0].clientWidth + 16;
      return Math.round(containerWidth / imageWidth);
    }
  
    // Clonar imagens visíveis nas pontas
    function cloneEdges(visibleCount) {
      const clonesBefore = images.slice(-visibleCount).map(img => img.cloneNode(true));
      const clonesAfter = images.slice(0, visibleCount).map(img => img.cloneNode(true));
  
      clonesBefore.forEach(clone => carousel.insertBefore(clone, images[0]));
      clonesAfter.forEach(clone => carousel.appendChild(clone));
  
      return {
        clonesBeforeCount: clonesBefore.length
      };
    }
  
    let visibleCount = getVisibleCount();
    const { clonesBeforeCount } = cloneEdges(visibleCount);
  
    const allImages = carousel.querySelectorAll('img');
    let index = clonesBeforeCount;
    let imageWidth = allImages[0].clientWidth + 16;
    let interval;
  
    // Posiciona no primeiro slide real
    carousel.style.transform = `translateX(-${imageWidth * index}px)`;
  
    function updateImageWidth() {
      imageWidth = allImages[0].clientWidth + 16;
      carousel.style.transition = 'none';
      carousel.style.transform = `translateX(-${imageWidth * index}px)`;
    }
  
    window.addEventListener('resize', () => {
      visibleCount = getVisibleCount();
      updateImageWidth();
    });
  
    function moveToIndex(i) {
      carousel.style.transition = 'transform 0.5s ease-in-out';
      carousel.style.transform = `translateX(-${imageWidth * i}px)`;
      index = i;
    }
  
    function next() {
      if (index >= allImages.length - visibleCount) return;
      moveToIndex(index + 1);
    }
  
    function prev() {
      if (index <= 0) return;
      moveToIndex(index - 1);
    }
  
    carousel.addEventListener('transitionend', () => {
      if (index >= allImages.length - visibleCount) {
        carousel.style.transition = 'none';
        index = clonesBeforeCount;
        carousel.style.transform = `translateX(-${imageWidth * index}px)`;
      }
      if (index < clonesBeforeCount) {
        carousel.style.transition = 'none';
        index = allImages.length - visibleCount * 2;
        carousel.style.transform = `translateX(-${imageWidth * index}px)`;
      }
    });
  
    document.querySelector('.galeria-btn.next').addEventListener('click', () => {
      next();
      restartAutoPlay();
    });
  
    document.querySelector('.galeria-btn.prev').addEventListener('click', () => {
      prev();
      restartAutoPlay();
    });
  
    // AutoPlay
    function startAutoPlay() {
      interval = setInterval(() => {
        next();
      }, 5000);
    }
  
    function stopAutoPlay() {
      clearInterval(interval);
    }
  
    function restartAutoPlay() {
      stopAutoPlay();
      startAutoPlay();
    }
  
    startAutoPlay();
  });
  