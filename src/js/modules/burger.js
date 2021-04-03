const burger = (menuSelector, burgerSelector) => {
    const menuElement = document.querySelector(menuSelector),
        burgerElement = document.querySelector(burgerSelector);

    // Скрываем бургер меню
    menuElement.style.display = 'none';
    // Открытие меню при ширине экрана в 992 пикселей и ниже
    burgerElement.addEventListener('click', () => {
        if (menuElement.style.display == 'none' && window.screen.availWidth < 993) {
            menuElement.style.display = 'block';
        } else {
            menuElement.style.display = 'none';
        }
    });
    // Закрытие меню при увеличении ширины экрана
    window.addEventListener('resize', () => {
        if (window.screen.availWidth > 992) {
            menuElement.style.display = 'none';
        }
    });
};

export default burger;