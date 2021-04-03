import modal from './modules/modal';
import slider from './modules/slider';
import forms from './modules/form';
import mask from './modules/mask';
import checkTextInputs from './modules/checkTextInputs';
import showMoreStyle from './modules/showMoreStyle';
import calc from './modules/calc';
import changeCalcState from './modules/changeCalcState';
import filter from './modules/filter';
import pictureSize from './modules/pictureSize';
import accordion from './modules/accordion';

window.addEventListener('DOMContentLoaded', () => {
    "use strict";
    let caclState = {};
    changeCalcState(caclState);

    modal('.button-design', '.popup-design', '.popup-content > button.popup-close');
    modal('.button-consultation', '.popup-consultation', '.popup-content > button.popup-close');
    modal('.fixed-gift', '.popup-gift', '.popup-content > button.popup-close', true);

    slider('.main-slider-item', 'vertical');
    slider('.feedback-slider-item', '', '.main-prev-btn', '.main-next-btn');

    forms('form', caclState);

    mask('[name="phone"]');
    checkTextInputs('[name="name"]');
    checkTextInputs('[name="message"]');

    showMoreStyle('.button-styles', '#styles .row');

    calc('#size', '#material', '#options', '.promocode', '.calc-price', caclState);

    filter();

    pictureSize('.sizes-block');

    accordion('.accordion-heading');
});