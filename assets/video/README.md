# Папка для видеоматериалов (assets/video)

В этой папке можно разместить видеофайлы для фонового воспроизведения.

Например:
- `hero.mp4` — видеоролик для первого экрана (Hero Section).

Для использования видео в первом экране добавьте в `<div class="hero-media-wrapper">`:
```html
<video autoplay muted loop playsinline poster="./assets/images/hero.jpg" class="hero-video">
  <source src="./assets/video/hero.mp4" type="video/mp4" />
</video>
```
Если видеофайл отсутствует, сайт автоматически отображает высококачественное фоновое изображение `hero.jpg`.
