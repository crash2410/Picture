const scrolling = (upSelector) => {
    const upElem = document.querySelector(upSelector);
    // Показ "стрелочки" при прокрутке определенного количества пикселей страницы
    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 1650) {
            upElem.classList.add('animated', 'fadeIn');
            upElem.classList.remove('fadeOut');
        } else {
            upElem.classList.add('fadeOut');
            upElem.classList.remove('fadeIn');
        }
    });

    let links = document.querySelectorAll('[href^="#"]'),
        speed = 0.2;

        links.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
    
                let widthTop = document.documentElement.scrollTop,
                    hash = this.hash,
                    toBlock = document.querySelector(hash).getBoundingClientRect().top,
                    start = null;
    
                requestAnimationFrame(step);
    
                function step(time) {
                    if (start === null) {
                        start = time;
                    }
    
                    let progress = time - start,
                        r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) : Math.min(widthTop + progress/speed, widthTop + toBlock));
    
                        document.documentElement.scrollTo(0, r);
    
                    if (r != widthTop + toBlock) {
                        requestAnimationFrame(step);
                    } else {
                        location.hash = hash;
                    }
                }
            });
        });


    // // Планый сколл на чистом JS
    // const element = document.documentElement,
    //     body = document.body;
    // // Подсчет количества пикселей которые нужно пролистать
    // const calcScroll = () => {
    //     upElem.addEventListener('click', function (e) {
    //         let scrollTop = Math.round(body.scrollTop || element.scrollTop);

    //         if (this.hash !== '') {
    //             e.preventDefault();
    //             let hashElement = document.querySelector(this.hash),
    //                 hashElementTop = 0;
    //             // Расчет пикселей
    //             while (hashElement.offsetParent) {
    //                 hashElementTop += hashElement.offsetTop;
    //                 hashElement = hashElement.offsetParent;
    //             }
    //             hashElementTop = Math.round(hashElementTop);
    //             smoothScroll(scrollTop, hashElementTop, this.hash);
    //         }
    //     });
    // };
    // // Скролл к элементу
    // const smoothScroll = (from, to, hash) => {
    //     let timeInterval = 1,
    //         prevSrollTop,
    //         speed;

    //     if (to > from) {
    //         speed = 300;
    //     } else {
    //         speed = -30;
    //     }

    //     // Анимация 
    //     let move = setInterval(function () {
    //         let scrollTop = Math.round(body.scrollTop || element.scrollTop);

    //         if (prevSrollTop === scrollTop || (to > from && scrollTop >= to) || (to < from && scrollTop <= to)) {
    //             clearInterval(move);
    //             history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
    //         } else {
    //             body.scrollTop += speed;
    //             element.scrollTop += speed;
    //             prevSrollTop = scrollTop;
    //         }
    //     }, timeInterval);
    // };

    // calcScroll();
};

export default scrolling;