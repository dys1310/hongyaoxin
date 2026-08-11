document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  const slides = Array.from(document.querySelectorAll('.hero-slide'));
  const dots = Array.from(document.querySelectorAll('.slider-dots .dot'));
  let activeIndex = 0;

  const showSlide = (index) => {
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('active', slideIndex === index);
    });
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === index);
    });
  };

  if (slides.length) {
    setInterval(() => {
      activeIndex = (activeIndex + 1) % slides.length;
      showSlide(activeIndex);
    }, 4000);
  }

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      activeIndex = Number(dot.dataset.index);
      showSlide(activeIndex);
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (form && status) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = form.querySelector('#name').value.trim();
      const phone = form.querySelector('#phone').value.trim();
      if (!name || !phone) {
        status.textContent = '请填写姓名和联系电话，方便我们尽快联系您。';
        return;
      }
      status.textContent = `感谢 ${name}，我们会尽快安排客服与您联系。`;
      form.reset();
    });
  }

  const bannerImages = [
    'images/Banner/Banner1.png',
    'images/Banner/Banner2.png',
    'images/Banner/Banner3.png',
    'images/Banner/Banner4.png',
  ];
  const heroBg = document.querySelector('.hero-bg');
  let heroBgIndex = 0;

  const updateHeroBg = (index) => {
    if (!heroBg) return;
    heroBg.style.backgroundImage = `url(${bannerImages[index]})`;
  };

  if (heroBg && bannerImages.length) {
    updateHeroBg(heroBgIndex);
    setInterval(() => {
      heroBgIndex = (heroBgIndex + 1) % bannerImages.length;
      updateHeroBg(heroBgIndex);
    }, 5000);
  }

  // Banner 轮播逻辑（针对 index-en.html 中的 .banner-carousel）
  const bannerCarousel = document.getElementById('banner-carousel');
  if (bannerCarousel) {
    const slideImgs = Array.from(bannerCarousel.querySelectorAll('.slides img'));
    const dots = Array.from(bannerCarousel.querySelectorAll('.dot'));
    const btnPrev = bannerCarousel.querySelector('.prev');
    const btnNext = bannerCarousel.querySelector('.next');
    let current = 0;
    let intervalId = null;

    const show = (index) => {
      if (!slideImgs.length) return;
      current = (index + slideImgs.length) % slideImgs.length;
      slideImgs.forEach((img, i) => img.classList.toggle('active', i === current));
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    };

    const start = (ms = 4000) => {
      stop();
      intervalId = setInterval(() => show(current + 1), ms);
    };
    const stop = () => { if (intervalId) { clearInterval(intervalId); intervalId = null; } };

    btnPrev && btnPrev.addEventListener('click', () => { show(current - 1); });
    btnNext && btnNext.addEventListener('click', () => { show(current + 1); });
    dots.forEach((d) => d.addEventListener('click', () => { show(Number(d.dataset.index)); }));

    bannerCarousel.addEventListener('mouseenter', stop);
    bannerCarousel.addEventListener('mouseleave', () => start(4000));

    show(0);
    start(4000);
  }

  const yearNode = document.getElementById('year');
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }
});
