(function () {

    "use strict"

    // constante duração de cada slide
    const slideTimeout = 5000;

    //botões de navegação
    const prev = document.querySelector('#prev');
    const next = document.querySelector('#next');

    // todos os elementos do tipo "slide"
    const $slides = document.querySelectorAll('.slide');

    let $dots;

    // variável para o intervalo de exibição dos slides
    let intervalId;

    // Inicialização do slide atual como 1
    let currentSlide = 1;

    function slideTo(index) {

        currentSlide = index >= $slides.length || index < 1 ? 0 : index;

        $slides.forEach($elt => $elt.style.transform = `translateX(-${currentSlide * 100}%)`);

        $dots.forEach(($elt, key) => $elt.classList = `dot ${key === currentSlide? 'active': 'inactive'}`);
    }

    // Função para exibir o próximo slide
    function showSlide() {
        slideTo(currentSlide);
        currentSlide++;
    }

    // Loop para criar os "dots" com base na quantidade de slides
    for (let i = 1; i <= $slides.length; i++) {
        let dotClass = i == currentSlide ? 'active' : 'inactive';
        let $dot = `<span data-slidId="${i}" class="dot ${dotClass}"></span>`;
        document.querySelector('.carousel-dots').innerHTML += $dot;
    }

    $dots = document.querySelectorAll('.dot');

    // Loop para adicionar eventos de clique
    $dots.forEach(($elt, key) => $elt.addEventListener('click', () => slideTo(key)));

    // Adiciona um evento de clique no botão "prev" para mostrar o slide anterior
    prev.addEventListener('click', () => slideTo(--currentSlide))

    // Adiciona um evento de clique no botão "next" para mostrar o próximo slide
    next.addEventListener('click', () => slideTo(++currentSlide))

    // Inicializa o intervalo para exibir os slides automaticamente
    intervalId = setInterval(showSlide, slideTimeout)

    // Loop em todos os slides para adicionar eventos de interação com mouse e toque
    $slides.forEach($elt => {

        let startX;
        let endX;

        $elt.addEventListener('mouseover', () => {
            clearInterval(intervalId);
        }, false)

        $elt.addEventListener('mouseout', () => {
            intervalId = setInterval(showSlide, slideTimeout);
        }, false);

        $elt.addEventListener('touchstart', (event) => {
            startX = event.touches[0].clientX;
        });

        $elt.addEventListener('touchend', (event) => {
            endX = event.changedTouches[0].clientX;

            if (startX > endX) {
                slideTo(currentSlide + 1);

            } else if (startX < endX) {
                slideTo(currentSlide - 1);
            }
        });
    })

})()
