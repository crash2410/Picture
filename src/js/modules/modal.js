const modal = (triggerSelector, modalSelector, closeModalSelector, destroy = false) => {
    // Modal
    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector),
        closeModal = document.querySelectorAll(closeModalSelector),
        windows = document.querySelectorAll('[data-modal]'),
        scroll = calcScroll();
    let btnPressed;

    // Открытие модального окна по кнопкам
    modalTrigger.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            btnPressed = true;
            if (destroy) {
                item.remove();
            }
            openModal(modal, showModalByTime, scroll);
        });
    });
    // Закрытие модального окна
    closeModal.forEach(closeItem => {
        closeItem.addEventListener("click", (e) => {
            closeModals(modal);
        });
    });
    // Закрытие модального окна за его пределами
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            windows.forEach(item => {
                item.style.display = 'none';
            });

            closeModals(modal);
        }
    });
    // Вызываем функцию открытия модального окна при сколее на футере сайта
    openByScroll(btnPressed,'.fixed-gift');
};
// Функция открытия окна
function openModal(modal, showModalByTime, scroll) {
    const windows = document.querySelectorAll('[data-modal]');
    windows.forEach(item => {
        item.style.display = 'none';
        item.classList.add('animated', 'fadeIn');
    });

    modal.style.display = 'block';
    document.body.style.overflow = "hidden";
    document.body.style.marginRight = `${scroll}px`;

    if (showModalByTime) {
        clearInterval(showModalByTime);
    }
}
// Функция закрытия окна
function closeModals(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = "";
    document.body.style.marginRight = `0px`;
}
// Вычисляем размер скоролла, чтобы убрать дергание экрана при открытии модального окна
function calcScroll() {
    let div = document.createElement('div');
    // Задаем стили 
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);
    // Вычисляем размер прокрутки
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
}
// Показ модального окна после 60 сек 
const showModalByTime = setTimeout(() => {
    document.querySelector('.popup-consultation').style.display = 'block';
    document.body.style.overflow = "hidden";
    let scroll = calcScroll();
    document.body.style.marginRight = `${scroll}px`;
}, 60000);
// Открытие модального окна при достижении футера
function openByScroll (btnPressed, selector) {
    window.addEventListener('scroll', () => {
        /* Проверяем были ли нажаты до этого кнопки с модальными окнами.
            Проверям долистал ли пользователь до конца сайта путем вычисления
        */
        if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1)){
            document.querySelector(selector).click();
        }
    });
}



export default modal;