const mask = (selector) => {
    // Установка позиции курсора
    let setCursorPosition = (position, element) => {
        element.focus();

        if (element.setSelectionRange) {
            element.setSelectionRange(position, position);
        } else if (element.createTextRange) {
            let range = element.createTextRange();

            range.collapse(true);
            range.moveEnd('character', position);
            range.moveStart('character', position);
            range.select();
        }
    };

    // Маска для ввода номера телефона
    function mask(event) {
        let matrix = '+7 (___) ___ __ __',
            i = 0,
            def = matrix.replace(/\D/g, ''),
            value = this.value.replace(/\D/g, '');
        // Запрещаем пользователю удалять шаблон ввода номера
        if (def.length >= value.length) {
            value = def;
        }
        // Настройка заполнения шаблона вводимыми данными
        this.value = matrix.replace(/./g, function (a) {
            // Заменяем "__" в шаблоне на вводимые пользователем данные
            return /[_\d]/.test(a) && i < value.length ? value.charAt(i++) : i >= value.length ? '' : a;
        });
        // Если маска пустая и пользователь нажал за поле ввода, то поле ввода номера очищается
        if (event.type === 'blur') {
            if (this.value.length == 2) {
                this.value = '';
            }
        } else {
            /* Если пользователь ввел номер телефоне не полностью и нажал за заполе ввода
             и потом вернулся, курсор устанавливается в нужное место */
            setCursorPosition(this.value.length, this);
        }
    }

    let inputs = document.querySelectorAll(selector);

    inputs.forEach(item => {
        item.addEventListener('input', mask);
        item.addEventListener('focus', mask);
        item.addEventListener('blur', mask);
    });
};

export default mask;