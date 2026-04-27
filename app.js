(function () {
    "use strict";

    const slideTimeout = 5000;

    const prev = document.querySelector('#prev');
    const next = document.querySelector('#next');
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.carousel-dots');

    let dots;
    let intervalId;
    let currentSlide = 0;

    function slideTo(index) {
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;

        currentSlide = index;

        slides.forEach(slide => {
            slide.style.transform = `translateX(-${currentSlide * 100}%)`;
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
            dot.classList.toggle('inactive', i !== currentSlide);
        });
    }

    function showSlide() {
        slideTo(currentSlide + 1);
    }

    // Criar dots
    let dotsHTML = '';
    for (let i = 0; i < slides.length; i++) {
        dotsHTML += `<span class="dot ${i === 0 ? 'active' : 'inactive'}"></span>`;
    }
    dotsContainer.innerHTML = dotsHTML;

    dots = document.querySelectorAll('.dot');

    // Eventos dos dots
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => slideTo(i));
    });

    // Botões
    prev.addEventListener('click', () => slideTo(currentSlide - 1));
    next.addEventListener('click', () => slideTo(currentSlide + 1));

    // Auto play
    intervalId = setInterval(showSlide, slideTimeout);

    // Interações
    slides.forEach(slide => {
        let startX = 0;
        let endX = 0;

        slide.addEventListener('mouseover', () => {
            clearInterval(intervalId);
        });

        slide.addEventListener('mouseout', () => {
            intervalId = setInterval(showSlide, slideTimeout);
        });

        slide.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        slide.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;

            if (startX > endX) {
                slideTo(currentSlide + 1);
            } else if (startX < endX) {
                slideTo(currentSlide - 1);
            }
        });
    });

})();