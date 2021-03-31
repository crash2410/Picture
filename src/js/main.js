import modal from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
    modal('.button-design', '.popup-design', '.popup-content > button.popup-close');
    modal('.button-consultation', '.popup-consultation', '.popup-content > button.popup-close');
    modal('.fixed-gift', '.popup-gift', '.popup-content > button.popup-close', true);
});