import modal from './modules/modal';
import slider from './modules/slider';

window.addEventListener('DOMContentLoaded', () => {
    modal('.button-design', '.popup-design', '.popup-content > button.popup-close');
    modal('.button-consultation', '.popup-consultation', '.popup-content > button.popup-close');
    modal('.fixed-gift', '.popup-gift', '.popup-content > button.popup-close', true);

    slider('.main-slider-item', 'vertical');
    slider('.feedback-slider-item', '', '.main-prev-btn', '.main-next-btn');
});