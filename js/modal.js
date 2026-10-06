/**
 * MODAL.JS — Управление модальным окном конфигуратора
 * Образовательный проект: Модель X
 *
 * Концепции:
 * 1. Управление модальным окном (Open/Close, A11y ARIA-диалог)
 * 2. Блокировка прокрутки основного содержимого страницы при открытом окне
 * 3. Закрытие по клавише Escape и клику по фоновой подложке (Backdrop)
 * 4. Завершение без сбора персональных данных (демонстрационный режим)
 */

import { resetConfig, updateConfigUI } from './configurator.js';

export function initModal() {
  const modal = document.querySelector('.modal-overlay');
  const openButtons = document.querySelectorAll('[data-open-modal="configurator"]');
  const closeBtn = document.querySelector('.modal-close-btn');
  const btnBack = document.querySelector('.modal-btn.back');
  const btnReset = document.querySelector('.modal-btn.reset');
  const btnFinish = document.querySelector('.modal-btn.finish');
  const btnCloseSuccess = document.querySelector('.btn-close-success');

  const modalBody = document.querySelector('.modal-body');
  const modalFooter = document.querySelector('.modal-footer');
  const successState = document.querySelector('.modal-success-state');

  if (!modal) return;

  function openModal() {
    modal.classList.add('is-active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Возврат в начальное состояние формы (если ранее было показано сообщение об успехе)
    if (modalBody) modalBody.style.display = 'grid';
    if (modalFooter) modalFooter.style.display = 'flex';
    if (successState) successState.classList.remove('active');

    updateConfigUI();
  }

  function closeModal() {
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  closeBtn?.addEventListener('click', closeModal);
  btnBack?.addEventListener('click', closeModal);
  btnCloseSuccess?.addEventListener('click', closeModal);

  // Клик по фону (Backdrop)
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Закрытие по Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });

  // Кнопка "СБРОСИТЬ"
  btnReset?.addEventListener('click', () => {
    resetConfig();
  });

  // Кнопка "ГОТОВО" — Демонстрационное завершение без отправки данных
  btnFinish?.addEventListener('click', () => {
    if (modalBody) modalBody.style.display = 'none';
    if (modalFooter) modalFooter.style.display = 'none';
    if (successState) successState.classList.add('active');
  });
}
