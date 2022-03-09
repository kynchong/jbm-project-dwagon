/* SWIPER IMAGE CAROUSEL CONFIGURATION */
const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,
    preloadImages: true,
    updateOnImagesReady: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        type: "fraction",
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
});


/* Elements */
const body = document.querySelector("body");
const main = document.querySelector("main");
const imageModal = document.querySelector(".carousel-modal");
const closeCarouselButton = document.querySelector(".carousel-modal-close");
const swiperWrapper = document.querySelector(".swiper .swiper-wrapper");
const selectedGalleryImage = "gallery-item-anchor";

/* Returns a "slide" to append to Swiper carousel */
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

/* Show/Hide image carousel modal */
const toggleModal = (interaction) => {

    // Determine if the element clicked was a gallery item
    if (interaction.target.className == selectedGalleryImage) {
        let target = interaction.target;
        let children = target.children;

        // Add images to carousel
        for (child of children) {
            let src = child.getAttribute("data-src");
            let caption = child.getAttribute("alt");
            swiperWrapper.append(getSwiperElement(src, caption));
        }

        // Update Swiper of images added
        swiper.update();

        // shows modal
        imageModal.style.display = "flex";
        body.classList.toggle("noscroll");

    } else if (interaction.target == imageModal || interaction.target == closeCarouselButton) {
        // hide modal
        imageModal.style.display = "none";
        body.classList.toggle("noscroll");

        // Update Swiper of images removed
        swiper.removeAllSlides();
        swiper.update();
    }
}

main.addEventListener('click', toggleModal, false);