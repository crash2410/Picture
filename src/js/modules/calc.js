const calc = (size, material, options, promocod, result, state) => {
    const sizeBlock = document.querySelector(size),
        materialBlock = document.querySelector(material),
        optionsBlock = document.querySelector(options),
        promocodeBlock = document.querySelector(promocod),
        resultBlock = document.querySelector(result);

    let sum = 0;
    // Функция расчета суммы
    const calcFunc = () => {
        // Подсчет суммы
        sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));

        // Обязательнный выбор первых 2-х пунктов и если введен промокод, предоставить скидку
        if (sizeBlock.value == '' || materialBlock.value == '') {
            resultBlock.textContent = 'Пожалуйста, выберите размер и материал картины';
        } else if (promocodeBlock.value === 'IWANTPOPART') {
            resultBlock.textContent = Math.round(sum * 0.7);
            state['price'] = Math.round(sum * 0.7);
        } else {
            resultBlock.textContent = sum;
            state['price'] = sum;
        }
    };

    sizeBlock.addEventListener('change', calcFunc);
    materialBlock.addEventListener('change', calcFunc);
    optionsBlock.addEventListener('change', calcFunc);
    promocodeBlock.addEventListener('input', calcFunc);
};

export default calc;