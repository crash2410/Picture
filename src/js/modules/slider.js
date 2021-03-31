const slider = (slides, direction, prev, next) => {
    let slideIndex = 1,
        paused = false;
    const items = document.querySelectorAll(slides);

    // Показ нужного слайда
    function showSlides(n) {
        // Сбрасываем значение slideIndex, чтобы не сломать логику слайдера
        if (n > items.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = items.length;
        }
        // Скрытие всех слайдов
        items.forEach(item => {
            item.classList.add('animated');
            item.style.display = 'none';
        });
        // Показ нужного(начального) слайда
        items[slideIndex - 1].style.display = 'block';
    }
    showSlides(slideIndex);

    // Показ следующего слайда
    function nextSlide(n) {
        showSlides(slideIndex += n);
    }

    /*Чтобы не сломать код, при отсутствии переключателей для слайдера используется try..catch
      и настраиваем переключатели для слайдера(если они есть)  
    */
    try {
        const prevBtn = document.querySelector(prev),
            nextBtn = document.querySelector(next);
        // Кнопка "следующий" слайд
        prevBtn.addEventListener('click', () => {
            nextSlide(-1);
            items[slideIndex - 1].classList.remove('slideInLeft');
            items[slideIndex - 1].classList.add('slideInRight');
        });
        // Кнопка "предыдущий" слайд
        nextBtn.addEventListener('click', () => {
            nextSlide(1);
            items[slideIndex - 1].classList.add('slideInLeft');
            items[slideIndex - 1].classList.remove('slideInRight');
        });
    } catch (error) {}
    // Автоматические воспроизведение слайдера в зависимости от заданного направления
    function activateAnimation() {
        if (direction == 'vertical') {
            paused = setInterval(() => {
                nextSlide(1);
                items[slideIndex - 1].classList.add('slideInDown');
            }, 3000);
        } else {
            paused = setInterval(() => {
                nextSlide(1);
                items[slideIndex - 1].classList.add('slideInLeft');
                items[slideIndex - 1].classList.remove('slideInRight');
            }, 3000);
        }
    }
    activateAnimation();
    // Остановка/запуск автоматического слайдера при наведении на него
    items[0].parentNode.addEventListener('mouseenter', () => {
        clearInterval(paused);
    });
    items[0].parentNode.addEventListener('mouseleave', () => {
        activateAnimation();
    });
};

export default slider;