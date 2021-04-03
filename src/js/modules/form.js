import {
    postData
} from '../services/services';

const forms = (formSelector, state) => {
    const forms = document.querySelectorAll(formSelector),
        inputs = document.querySelectorAll('input'),
        upload = document.querySelectorAll('[name="upload"]');
    // Объект с состояниями отправки данных для пользователя
    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        error: 'Что-то пошло не так...',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };
    // Объект с путями для отправки данных на сервер
    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    };
    // Очистка полей ввода
    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
        document.querySelector('textarea[name="message"]').value = '';
        upload.forEach(item => {
            item.previousElementSibling.textContent = "Файл не выбран";
        });
    };
    // Добавление "..." если длинное название у файла
    upload.forEach(item => {
        item.addEventListener('input', () => {
            console.log(item.files[0]);
            let dots;
            // Разбиваем название файла на строки в массив
            const arr = item.files[0].name.split('.');
            // Добавляем "..." если название больше 6 символов
            arr[0].length > 6 ? dots = "..." : dots = '.';
            // Собираем редактированное название файла
            const name = arr[0].substring(0, 6) + dots + arr[1];
            // Устанавливаем название файла
            item.previousElementSibling.textContent = name;
        });
    });
    // Подключаем отправку форм ко всем формам на странице
    forms.forEach((item) => {
        bindPostData(item);
    });
    // Функция отправки данных с форм на сервер
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Создание и добавление блока с уведомлением для пользователя
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            form.parentNode.appendChild(statusMessage);
            // Добавление анимации
            form.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
                form.style.display = 'none';
            }, 400);
            // Создание изображения для отображения статуса отправки
            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.appendChild(statusImg);
            // Создание текста для отображения статуса отправки
            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);
            // Формирование данных с формы
            const formData = new FormData(form);
            console.log(formData);
            // ~~ Если это форма калькулятора, то к данным из формы добавляются данные с объекта state ~~
            if (form.classList.contains('calc_form')) {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }
            let api;
            // В зависимости от формы выбираем куда отправлять данные
            form.closest('.popup-design') || form.classList.contains('calc_form') ? api = path.designer : api = path.question;

            // Отправка данных с формы на сервер
            postData(api, formData)
                .then(data => {
                    statusImg.setAttribute('src', message.ok);
                    textMessage.textContent = message.success;
                    // Очистка объекта modalState
                    for (var key in state) {
                        delete state[key];
                    }
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail);
                    textMessage.textContent = message.error;
                })
                .finally(() => {
                    document.querySelector('.calc-price').textContent = 'Для расчета нужно выбрать размер картины и материал картины';
                    form.reset();
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        form.style.display = 'block';
                        form.classList.remove('fadeOutUp');
                        form.classList.add('fadeInUp');
                    }, 5000);
                });
        });
    }
};

export default forms;