/**
 * CONFIGURATOR.JS — Интерактивный конфигуратор автомобиля
 * Образовательный проект: Модель X
 *
 * Концепции:
 * 1. Единый источник правды (Single Source of Truth) для состояния конфигурации
 * 2. Реактивное обновление интерфейса при изменении параметров
 * 3. Динамические визуальные CSS-фильтры для демонстрации цветов кузова
 */

export const configState = {
  model: 'Модель X',
  color: 'Перламутровый белый',
  colorKey: 'white',
  wheels: '20″ Sport',
  seats: '5 мест',
};

const COLOR_MAP = {
  white: { name: 'Перламутровый белый', filterClass: 'filter-white', hex: '#f2f2f4' },
  black: { name: 'Чёрный', filterClass: 'filter-black', hex: '#121214' },
  silver: { name: 'Тёмно-серый', filterClass: 'filter-silver', hex: '#4a4d53' },
  blue: { name: 'Тёмно-синий', filterClass: 'filter-blue', hex: '#1c2e4a' },
  red: { name: 'Красный', filterClass: 'filter-red', hex: '#9e1319' },
};

export function initConfigurator() {
  bindColorControls();
  bindWheelControls();
  bindSeatControls();
  updateConfigUI();
}

/**
 * Привязка переключателей цвета кузова
 */
function bindColorControls() {
  const swatchButtons = document.querySelectorAll('.swatch-btn');
  swatchButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const colorKey = btn.getAttribute('data-color-key');
      if (colorKey && COLOR_MAP[colorKey]) {
        configState.colorKey = colorKey;
        configState.color = COLOR_MAP[colorKey].name;

        swatchButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        updateConfigUI();
      }
    });
  });
}

/**
 * Привязка селектора дисков
 */
function bindWheelControls() {
  const wheelButtons = document.querySelectorAll('.wheel-option-btn');
  wheelButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const wheelVal = btn.getAttribute('data-wheel-name');
      if (wheelVal) {
        configState.wheels = wheelVal;
        wheelButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        updateConfigUI();
      }
    });
  });
}

/**
 * Привязка селектора количества мест в салоне
 */
function bindSeatControls() {
  const seatButtons = document.querySelectorAll('.seat-option-btn');
  seatButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const seatVal = btn.getAttribute('data-seat-name');
      if (seatVal) {
        configState.seats = seatVal;
        seatButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        updateConfigUI();
      }
    });
  });
}

/**
 * Обновление всех элементов интерфейса на основе текущего состояния
 */
export function updateConfigUI() {
  // 1. Обновление визуального стиля изображения автомобиля
  const previewImages = document.querySelectorAll('.config-vehicle-img');
  previewImages.forEach((img) => {
    img.className = 'config-vehicle-img';
    const activeColorConfig = COLOR_MAP[configState.colorKey];
    if (activeColorConfig) {
      img.classList.add(activeColorConfig.filterClass);
    }
  });

  // 2. Обновление текстовых меток цвета
  const activeColorLabels = document.querySelectorAll('.active-color-name-display');
  activeColorLabels.forEach((label) => {
    label.textContent = configState.color;
  });

  // 3. Обновление сводки конфигурации на странице и в модальном окне
  const summaryModel = document.querySelectorAll('.summary-model-val');
  const summaryColor = document.querySelectorAll('.summary-color-val');
  const summaryWheels = document.querySelectorAll('.summary-wheels-val');
  const summarySeats = document.querySelectorAll('.summary-seats-val');

  summaryModel.forEach((el) => { el.textContent = configState.model; });
  summaryColor.forEach((el) => { el.textContent = configState.color; });
  summaryWheels.forEach((el) => { el.textContent = configState.wheels; });
  summarySeats.forEach((el) => { el.textContent = configState.seats; });
}

/**
 * Сброс параметров конфигурации к значениям по умолчанию
 */
export function resetConfig() {
  configState.color = 'Перламутровый белый';
  configState.colorKey = 'white';
  configState.wheels = '20″ Sport';
  configState.seats = '5 мест';

  // Синхронизация активных кнопок
  document.querySelectorAll('.swatch-btn').forEach((b) => {
    b.classList.toggle('active', b.getAttribute('data-color-key') === 'white');
  });

  document.querySelectorAll('.wheel-option-btn').forEach((b) => {
    b.classList.toggle('active', b.getAttribute('data-wheel-name') === '20″ Sport');
  });

  document.querySelectorAll('.seat-option-btn').forEach((b) => {
    b.classList.toggle('active', b.getAttribute('data-seat-name') === '5 мест');
  });

  updateConfigUI();
}
