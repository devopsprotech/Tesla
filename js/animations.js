/**
 * ANIMATIONS.JS — Анимации прокрутки, счётчиков и интерактивных компонентов
 * Образовательный проект: Модель X
 *
 * Концепции:
 * 1. IntersectionObserver — высокопроизводительное отслеживание видимости элементов
 * 2. Анимация числовых значений (Counter Animation) через requestAnimationFrame
 * 3. Интерактивные демонстрации: двери Falcon Wing, грузовой отсек и симулятор зарядки
 */

export function initAnimations() {
  initScrollReveal();
  initCounters();
  initFalconDoors();
  initUtilityCargo();
  initChargingSimulation();
}

/**
 * 1. Плавное появление элементов при прокрутке экрана
 */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target); // Срабатывает один раз для экономии ресурсов
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.15,
  });

  elements.forEach((el) => observer.observe(el));
}

/**
 * 2. Анимация счётчиков характеристик (Range 352, Acceleration 2.5)
 */
function initCounters() {
  const specSection = document.querySelector('.specs-section');
  const perfSection = document.querySelector('.perf-section');
  const counterElements = document.querySelectorAll('[data-counter-target]');

  if (!counterElements.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        animateAllCounters(counterElements);

        // Также запускаем заполнение полосы разгона
        const perfBar = document.querySelector('.perf-bar-fill');
        if (perfBar) perfBar.classList.add('active');
      }
    });
  }, { threshold: 0.2 });

  if (specSection) observer.observe(specSection);
  if (perfSection) observer.observe(perfSection);
}

function animateAllCounters(elements) {
  elements.forEach((el) => {
    const target = parseFloat(el.getAttribute('data-counter-target') || '0');
    const isDecimal = target % 1 !== 0;
    const duration = 1800; // 1.8 секунды
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Плавное замедление (ease-out cubic)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = easeProgress * target;

      el.textContent = isDecimal ? currentValue.toFixed(1) : Math.floor(currentValue).toString();

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = isDecimal ? target.toFixed(1) : target.toString();
      }
    }

    requestAnimationFrame(step);
  });
}

/**
 * 3. Интерактивная демонстрация подъёмных дверей Falcon Wing
 */
function initFalconDoors() {
  const doorContainer = document.querySelector('.falcon-interactive-container');
  const doorBtn = document.querySelector('.falcon-action-btn');
  if (!doorContainer || !doorBtn) return;

  let isOpen = false;

  doorBtn.addEventListener('click', () => {
    isOpen = !isOpen;
    doorContainer.classList.toggle('doors-open', isOpen);
    doorBtn.textContent = isOpen ? 'ЗАКРЫТЬ ДВЕРИ' : 'ОТКРЫТЬ ДВЕРИ';
    doorBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

/**
 * 4. Переключатель багажного отделения: СТАНДАРТ / РАСШИРЕННЫЙ
 */
function initUtilityCargo() {
  const toggleButtons = document.querySelectorAll('.cargo-toggle-btn');
  const metricNumber = document.querySelector('.cargo-metric-callout');
  const metricSub = document.querySelector('.cargo-metric-sub');
  const diagramVisual = document.querySelector('.cargo-diagram-rect');

  if (!toggleButtons.length) return;

  toggleButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      toggleButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const mode = btn.getAttribute('data-cargo-mode');
      if (mode === 'expanded') {
        if (metricNumber) metricNumber.textContent = '2 614 л';
        if (metricSub) metricSub.textContent = 'Максимальный объём при сложенных сиденьях';
        if (diagramVisual) diagramVisual.style.transform = 'scale(1.18)';
      } else {
        if (metricNumber) metricNumber.textContent = '1 050 л';
        if (metricSub) metricSub.textContent = 'Стандартное багажное отделение за вторым рядом';
        if (diagramVisual) diagramVisual.style.transform = 'scale(1)';
      }
    });
  });
}

/**
 * 5. Симулятор зарядки электромобиля (0% -> 80%)
 */
function initChargingSimulation() {
  const percentText = document.querySelector('.battery-percentage');
  const rangeAddText = document.querySelector('.battery-range-add');
  const circleBar = document.querySelector('.battery-circle-bar');
  const btnStart = document.querySelector('[data-charge-action="start"]');
  const btnPause = document.querySelector('[data-charge-action="pause"]');
  const btnReset = document.querySelector('[data-charge-action="reset"]');

  if (!percentText || !circleBar) return;

  const totalLength = 565; // Длина окружности SVG (2 * PI * r = 2 * 3.14159 * 90)
  const targetPercent = 80;
  let currentPercent = 0;
  let animationId = null;
  let isCharging = false;

  function updateCircle(percent) {
    const offset = totalLength - (totalLength * (percent / 100));
    circleBar.style.strokeDashoffset = offset.toString();
    percentText.textContent = `${Math.round(percent)}%`;

    const addedMiles = Math.round((percent / 80) * 200);
    if (rangeAddText) {
      rangeAddText.textContent = `+${addedMiles} миль за 15 мин`;
    }
  }

  function chargeLoop() {
    if (!isCharging) return;

    if (currentPercent < targetPercent) {
      currentPercent += 0.35;
      updateCircle(currentPercent);
      animationId = requestAnimationFrame(chargeLoop);
    } else {
      currentPercent = targetPercent;
      updateCircle(currentPercent);
      isCharging = false;
      if (btnStart) btnStart.textContent = 'Зарядка завершена';
    }
  }

  btnStart?.addEventListener('click', () => {
    if (currentPercent >= targetPercent) {
      currentPercent = 0;
    }
    isCharging = true;
    btnStart.textContent = 'Идёт зарядка...';
    circleBar.classList.add('charging-active');
    cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame(chargeLoop);
  });

  btnPause?.addEventListener('click', () => {
    isCharging = false;
    circleBar.classList.remove('charging-active');
    cancelAnimationFrame(animationId);
    if (btnStart) btnStart.textContent = 'Продолжить';
  });

  btnReset?.addEventListener('click', () => {
    isCharging = false;
    cancelAnimationFrame(animationId);
    currentPercent = 0;
    circleBar.classList.remove('charging-active');
    updateCircle(0);
    if (btnStart) btnStart.textContent = 'Начать зарядку';
  });

  // Инициализация нулевой шкалы
  updateCircle(0);
}
