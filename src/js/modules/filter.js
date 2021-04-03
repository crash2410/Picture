const filter = () => {
    const menu = document.querySelector('.portfolio-menu'),
        items = menu.querySelectorAll('li'),
        wrapper = document.querySelector('.portfolio-wrapper'),
        markAll = wrapper.querySelectorAll('.all'),
        no = document.querySelector('.portfolio-no');
    // Фильтрация эл-тов
    function typeFilter(markType) {
        markAll.forEach(item => {
            item.style.display = 'none';
            item.classList.remove('animated', 'fadeIn');
        });
        no.style.display = 'none';
        no.classList.remove('animated', 'fadeIn');
        // Фильтр по категории
        if (markType) {
            markType.forEach(item => {
                item.style.display = 'block';
                item.classList.add('animated', 'fadeIn');
            });
        }
        if (markType.length == 0) {
            no.style.display = 'block';
            no.classList.add('animated', 'fadeIn');
        }
    }
    // Активация фильтров по нажатию на кнопку
    menu.addEventListener('click', (e) => {
        let classSelect = e.target.classList[0];
        let allElems = wrapper.querySelectorAll(`.${classSelect}`);
        typeFilter(allElems);
    });
    // Переключение активного класса на кнопке
    menu.addEventListener('click', (e) => {
        let target = e.target;

        if (target && target.tagName == 'LI') {
            items.forEach(item => {
                item.classList.remove('active');
            });
            target.classList.add('active');
        }
    });
};

export default filter;