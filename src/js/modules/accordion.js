const accordion = (triggerSelector, itemsSelector) => {
    const btns = document.querySelectorAll(triggerSelector),
        blocks = document.querySelectorAll(itemsSelector);
    // Добавление анимации
    blocks.forEach(block => {
        block.classList.add('animated', 'fadeInDown');
    });
    // Открытие аккордиона при нажатии на кнопку
    btns.forEach(btn => {
        btn.addEventListener('click', function () {
            if (!this.classList.contains('active')) {
                btns.forEach(btn => {
                    btn.classList.remove('active', 'active-style');
                });
                this.classList.add('active', 'active-style');
            }
        });
    });
};

export default accordion;