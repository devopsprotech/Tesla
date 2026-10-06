/**
 * GALLERY.JS — Управление каруселью изображений и интерактивным просмотром салона
 * Образовательный проект: Модель X
 *
 * Концепции:
 * 1. Управление состоянием слайдера (active index)
 * 2. Сенсорные жесты (Touch/Swipe) на мобильных устройствах
 * 3. Поддержка клавиатуры (стрелки влево / вправо) для доступности
 * 4. Плавное переключение ракурсов интерьера (crossfade)
 */

export function initGallery() {
  initCarousel();
  initInteriorViewer();
}

/**
 * 1. Карусель фотографий интерьера
 */
function initCarousel() {
  const slides = document.querySelectorAll('.gallery-slide');
  const dots = document.querySelectorAll('.gallery-dot');
  const btnPrev = document.querySelector('.gallery-btn-prev');
  const btnNext = document.querySelector('.gallery-btn-next');
  const stage = document.querySelector('.gallery-stage');

  if (!slides.length) return;

  let currentIndex = 0;

  function showSlide(index) {
    if (index < 0) {
      currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentIndex);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
      dot.setAttribute('aria-selected', i === currentIndex ? 'true' : 'false');
    });
  }

  btnPrev?.addEventListener('click', () => showSlide(currentIndex - 1));
  btnNext?.addEventListener('click', () => showSlide(currentIndex + 1));

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => showSlide(i));
  });

  // Навигация с клавиатуры
  stage?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      showSlide(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      showSlide(currentIndex + 1);
    }
  });

  // Сенсорные жесты (Свайп на сенсорных экранах)
  let touchStartX = 0;
  let touchEndX = 0;

  stage?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  stage?.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      showSlide(currentIndex + 1); // Свайп влево — следующий
    } else if (touchEndX > touchStartX + swipeThreshold) {
      showSlide(currentIndex - 1); // Свайп вправо — предыдущий
    }
  }
}

/**
 * 2. Интерактивный 3-позиционный просмотр салона (Передний, Второй, Третий ряд)
 */
function initInteriorViewer() {
  const segmentButtons = document.querySelectorAll('.segment-btn');
  const stageImages = document.querySelectorAll('.viewer-stage img');
  const infoText = document.querySelector('.viewer-info-panel-text');

  if (!segmentButtons.length) return;

  const rowDescriptions = {
    front: 'Передний ряд: Панорамное ветровое стекло, эргономичный штурвал управления и 17-дюймовый сенсорный кинематографический дисплей с разрешением 2200×1300.',
    second: 'Второй ряд: Раздельные представительские кресла с вентиляцией, индивидуальный мультимедийный дисплей для пассажиров и беспроводная зарядка для устройств.',
    third: 'Третий ряд: Просторная посадка для взрослых пассажиров, складывание сидений в ровный пол для максимального увеличения багажного объёма.',
  };

  segmentButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      segmentButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const targetRow = btn.getAttribute('data-row-target');

      stageImages.forEach((img) => {
        img.classList.toggle('active', img.getAttribute('data-row-view') === targetRow);
      });

      if (infoText && targetRow && rowDescriptions[targetRow]) {
        infoText.textContent = rowDescriptions[targetRow];
      }
    });
  });
}
