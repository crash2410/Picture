const accordion = (triggerSelector) => {
    const btns = document.querySelectorAll(triggerSelector);
    // Открытие/закрытие аккордиона при нажатии на кнопку
    btns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Открытие/закрытие блока аккордиона
            this.classList.toggle('active-style');
            this.nextElementSibling.classList.toggle('active-content');

            if (this.classList.contains('active-style')) {
                btns.forEach(btn => {
                    // Закрытие всех открытых блоков аккордиона
                    btn.classList.remove('active-style');
                    btn.nextElementSibling.classList.remove('active-content');
                    btn.nextElementSibling.style.maxHeight = '0px';
                });
                // Показ выбранного блока аккордиона 
                this.classList.add('active-style');
                this.nextElementSibling.classList.add('active-content');
                this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + 'px';
            } else {
                // Скрытие блока аккордиона при повторном нажатии
                this.nextElementSibling.style.maxHeight = '0px';
            }
        });
    });

    // ~~Реализация при помощи стилей~~
    // blocks = document.querySelectorAll(itemsSelector);
    // // Добавление анимации
    // blocks.forEach(block => {
    //     block.classList.add('animated', 'fadeInDown');
    // });
    // // Открытие аккордиона при нажатии на кнопку
    // btns.forEach(btn => {
    //     btn.addEventListener('click', function () {
    //         if (!this.classList.contains('active')) {
    //             btns.forEach(btn => {
    //                 btn.classList.remove('active', 'active-style');
    //             });
    //             this.classList.add('active', 'active-style');
    //         }
    //     });
    // });
};

export default accordion;