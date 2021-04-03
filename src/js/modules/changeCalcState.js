const changeCalcState = (state) => {
    const caclSize = document.querySelector('#size'),
        calcMaterial = document.querySelector('#material'),
        calcOptions = document.querySelector('#options'),
        calcPromocode = document.querySelector('.promocode');

    // Функция добавления выбранный/вводимых данных в объект caclState
    function bindActionToElems(event, elem, prop) {
        elem.addEventListener(event, (e) => {
            e.preventDefault();
            switch (elem.nodeName) {
                case 'SELECT':
                    // Выбираем размер, материалы, доп. опции
                    if (elem.options[elem.selectedIndex].index == 0) {
                        delete state[prop];
                    } else {
                        state[prop] = elem.options[elem.selectedIndex].text;
                    }
                    break;
                case 'INPUT':
                    // Ввод промокода
                    if (elem.value != 'IWANTPOPART') {
                        delete state[prop];
                    } else {
                        state[prop] = elem.value;
                    }
                    break;

            }
        });
    }

    bindActionToElems('change', caclSize, 'size');
    bindActionToElems('change', calcMaterial, 'material');
    bindActionToElems('change', calcOptions, 'options');
    bindActionToElems('change', calcPromocode, 'promocode');
};
export default changeCalcState;