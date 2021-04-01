import {
    getResource
} from '../services/services';

const showMoreStyle = (trigger, wrapper) => {
    const btn = document.querySelector(trigger);
    
    // // Добавление анимации ко всем карточкам
    // cards.forEach(card => {
    //     card.classList.add('animated', 'fadeInUp');
    // });
    // // Показ скрытых карточек
    // btn.addEventListener('click', (e) => {
    //     cards.forEach(card => {
    //         card.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', "hidden-xs");
    //         card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
    //     });

    //     btn.remove();
    // });

    // Показ скрытых карточек
    btn.addEventListener('click', function () {
        getResource('http://localhost:3000/styles')
            .then(res => {
                // Получаем массив с объектами и создаем из данных карточки
                createCards(res);
            })
            .catch(error => console.log(error));
        // Удаляем кнопку
        this.remove();
    });

    // Создание карточек
    function createCards(response) {
        response.forEach(({
            src,
            title,
            link
        }) => {
            let card = document.createElement('div');

            card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');

            card.innerHTML = `
            <div class="styles-block">
     			<img src=${src} alt="style">
    			<h4>${title}</h4>
                <a href=${link}>Подробнее</a>
    		</div>
            `;

            document.querySelector(wrapper).appendChild(card);
        });
    }

};

export default showMoreStyle;