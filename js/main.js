/**
 * MAIN.JS — Главная точка входа образовательного проекта
 * Образовательный проект: Модель X
 *
 * Архитектура:
 * - Модульная структура на нативном ES6+
 * - Централизованная конфигурация медиаресурсов (MEDIA)
 * - Инициализация компонентов после загрузки DOM
 */

import { initNavigation } from './navigation.js';
import { initAnimations } from './animations.js';
import { initGallery } from './gallery.js';
import { initConfigurator } from './configurator.js';
import { initModal } from './modal.js';

/**
 * ЦЕНТРАЛЬНАЯ КОНФИГУРАЦИЯ МЕДИА-РЕСУРСОВ
 * Любой разработчик или студент может легко заменить ссылки или файлы
 */
export const MEDIA = {
  hero: './assets/images/hero.jpg',
  interiorFront: './assets/images/interior-front.jpg',
  interiorSecondRow: './assets/images/interior-second-row.jpg',
  interiorThirdRow: './assets/images/interior-front.jpg',
  exteriorFalcon: './assets/images/exterior-falcon.jpg',
  charging: './assets/images/charging.jpg',
};

// Запуск приложения после готовности DOM дерева
document.addEventListener('DOMContentLoaded', () => {
  // Инициализация подсистем
  initNavigation();
  initAnimations();
  initGallery();
  initConfigurator();
  initModal();

  // Привязка кнопки "Узнать больше" (Плавная прокрутка к следующему разделу)
  const exploreBtn = document.querySelector('[data-scroll-to]');
  exploreBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = exploreBtn.getAttribute('data-scroll-to');
    const targetEl = document.querySelector(targetId || '#specs');
    targetEl?.scrollIntoView({ behavior: 'smooth' });
  });

  // Привязка кнопки "Вернуться к началу"
  const scrollToTopBtn = document.querySelector('[data-scroll-top]');
  scrollToTopBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  console.info('Модель X — Образовательный концепт успешно инициализирован.');
});
