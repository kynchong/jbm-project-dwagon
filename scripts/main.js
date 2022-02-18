/* SWIPER CONFIGURATION */
const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    /*
    scrollbar: {
        el: '.swiper-scrollbar',
    },
    */
});

/* EVENT DELEGATION HANDLER */
const main = document.querySelector("main");
const modal = document.querySelector(".carousel-modal");
const closeCarousel = document.querySelector(".carousel-modal-close");
const swiperWrapper = document.querySelector(".swiper-wrapper");
const selectedItem = "gallery-item-anchor";

// Swiper element
const getSwiperElement = (url, caption) => {
    let swiperDiv = document.createElement("div");
    let swiperDivImg = document.createElement("img");
    let swiperDivCaption = document.createElement("p");
    swiperDiv.classList.add("swiper-slide");
    swiperDivImg.src = url;
    swiperDivCaption.innerText = caption;
    swiperDiv.append(swiperDivImg);
    swiperDiv.append(swiperDivCaption);
    return swiperDiv;
}

// Toggles display of carousel modal and associated images
const toggleModal = (e) => {
    // Acquire links for carousel images
    if (e.target.className == selectedItem) {
        let target = e.target;
        let children = target.children;

        // reset swiper
        swiper.setProgress(0);
        swiper.slideReset();

        // Send image urls to get a swiper element to be appended to carousel
        for (child of children) {
            console.log(child);
            let src = child.getAttribute("data-src");
            let caption = child.getAttribute("alt");
            swiperWrapper.append(getSwiperElement(src, caption));
        }

        // shows modal
        modal.style.display = "flex";
    } else if (e.target == modal || e.target == closeCarousel) {
        // hides modal
        modal.style.display = "none";

        // resets modal html
        swiperWrapper.innerHTML = "";
    }
}

main.addEventListener('click', toggleModal);