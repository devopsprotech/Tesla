/**
 * NAVIGATION.JS — Управление шапкой, мобильным меню и навигацией
 * Образовательный проект: Модель X
 *
 * Концепции:
 * 1. Отслеживание события scroll с оптимизацией requestAnimationFrame
 * 2. Доступность (a11y): управление фокусом, закрытие по клавише Escape
 * 3. Переключение мобильного меню (drawer)
 */

export function initNavigation() {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileBackdrop = document.querySelector('.mobile-drawer-backdrop');
  const mobileCloseBtn = document.querySelector('.mobile-drawer-close');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const eduToggleBtn = document.querySelector('.edu-toggle-btn');

  // 1. Изменение прозрачности шапки при прокрутке страницы
  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateHeaderOnScroll() {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(updateHeaderOnScroll);
      ticking = true;
    }
  }, { passive: true });

  // Первоначальная проверка при загрузке
  updateHeaderOnScroll();

  // 2. Управление мобильным меню
  function openMobileMenu() {
    mobileDrawer?.classList.add('open');
    mobileBackdrop?.classList.add('open');
    mobileDrawer?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileDrawer?.classList.remove('open');
    mobileBackdrop?.classList.remove('open');
    mobileDrawer?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  menuToggle?.addEventListener('click', openMobileMenu);
  mobileCloseBtn?.addEventListener('click', closeMobileMenu);
  mobileBackdrop?.addEventListener('click', closeMobileMenu);

  // Закрытие меню клавишей Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer?.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  // Закрытие мобильного меню при клике по ссылке
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // 3. Переключатель "Режим обучения"
  eduToggleBtn?.addEventListener('click', () => {
    const isEduActive = document.body.classList.toggle('edu-mode-active');
    eduToggleBtn.classList.toggle('active', isEduActive);
    eduToggleBtn.setAttribute('aria-pressed', isEduActive ? 'true' : 'false');

    const badges = document.querySelectorAll('.edu-badge');
    badges.forEach((badge) => {
      badge.style.display = isEduActive ? 'inline-flex' : 'none';
    });
  });
}
