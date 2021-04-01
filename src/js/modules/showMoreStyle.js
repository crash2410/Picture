const showMoreStyle = (trigger, styles) => {
    const cards = document.querySelectorAll(styles),
        btn = document.querySelector(trigger);
    // Добавление анимации ко всем карточкам
    cards.forEach(card => {
        card.classList.add('animated', 'fadeInUp');
    });
    // Показ скрытых карточек
    btn.addEventListener('click', (e) => {
        cards.forEach(card => {
            card.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', "hidden-xs");
            card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
        });

        btn.remove();
    });
};

export default showMoreStyle;