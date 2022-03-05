/* SWIPER CONFIGURATION */
const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        type: "fraction",
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
const body = document.querySelector("body");
const main = document.querySelector("main");
const imageModal = document.querySelector(".carousel-modal");
const closeCarouselButton = document.querySelector(".carousel-modal-close");
const swiperWrapper = document.querySelector(".swiper-wrapper");
const selectedGalleryImage = "gallery-item-anchor";

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
const toggleModal = (touchEvent) => {
    touchEvent.preventDefault();
    // Acquire links for carousel images
    if (touchEvent.target.className == selectedGalleryImage) {
        let target = touchEvent.target;
        let children = target.children;

        // reset swiper
        swiper.removeAllSlides();

        // Send image urls to get a swiper element to be appended to carousel
        for (child of children) {
            let src = child.getAttribute("data-src");
            let caption = child.getAttribute("alt");
            swiperWrapper.append(getSwiperElement(src, caption));
        }

        // shows modal
        imageModal.style.display = "flex";
        body.classList.toggle("noscroll");

    } else if (touchEvent.target == imageModal || touchEvent.target == closeCarouselButton) {
        // hides modal
        imageModal.style.display = "none";

        // resets modal html
        swiperWrapper.innerHTML = "";
        body.classList.toggle("noscroll");
    }
}

main.addEventListener('click', toggleModal, false);