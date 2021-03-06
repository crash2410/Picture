import {
    postData
} from '../services/services';
const drop = (state) => {
    // drag *
    // dragend *
    // dragenter - объект над dropArea
    // dragexit *
    // dragleave - объект за пределами dropArea
    // dragover - объект зависает над dropArea
    // dragstart *
    // drop - объект отправлен в dropArea
    const fileInputs = document.querySelectorAll('[name="upload"]');
    // Перенос файла в блок
    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
        });
    });
    // Отмена дефолтного поведения браузера
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    // Выделить блок при переносе файла
    function highlight(item) {
        item.closest('.file_upload').style.border = '5px solid yellow';
        item.closest('.file_upload').style.backgroundColor = 'rgba(0,0,0,0.7)';
    }
    // Убрать выделение блока при отмене переноса файла (переносимый файл находится вне зоны блока)
    function unhighlight(item) {
        item.closest('.file_upload').style.border = "none";
        if (item.closest('.calc_form')) {
            item.closest('.file_upload').style.backgroundColor = "#fff";
        } else {
            item.closest('.file_upload').style.backgroundColor = "#ededed";
        }
    }
    // ** Выделить блок при переносе файла в блок
    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highlight(input), false);
        });
    });
    // ** Убрать выделение блока при отмене переноса файла (переносимый файл находится вне зоны блока)
    ['dragleave', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unhighlight(input), false);
        });
    });
    // Добавление файла
    ['drop', 'input'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, (e) => {
                try {
                    input.files = e.dataTransfer.files;
                } catch (error) {}
                let dots;
                const arr = input.files[0].name.split('.');
                arr[0].length > 6 ? dots = "..." : dots = '.';
                const name = arr[0].substring(0, 6) + dots + arr[1];
                input.previousElementSibling.textContent = name;
                console.log(input.nodeName);
                // Отправка файлов на сервер сразу после drop/input (только в определенном блоке)
                if (input.getAttribute('data-upload')) {
                    e.preventDefault();
                    e.stopPropagation();
                    let formData = new FormData();
                    [...input.files].forEach(file => {
                        formData.append('image', file);
                        postData('assets/server.php', formData)
                            .then(res => {
                                console.log(res);
                                input.previousElementSibling.textContent = 'Отправлено';
                            })
                            .finally(() => {
                                setTimeout(() => {
                                    input.previousElementSibling.textContent = 'Файл не выбран';
                                }, 3000);
                            });
                    });
                }
            });
        });
    });
};

export default drop;