// Modal
let modal = document.getElementById('modal')
let modalImage = document.getElementById('modal-image');
let modalCaption = document.getElementById('modal-caption');

// Handle Image Clicks
let modalInteract = (e) => {
    e.preventDefault();
    if (e.target.className == 'item-image') {
        console.log("Interacted");
        let imgsrc = e.target.style.backgroundImage;
        let imgcap = e.target.getAttribute('alt')
        modalImage.srcset = imgsrc.split(/"/)[1];
        modalCaption.innerText = imgcap;
        modal.style.display = "flex";

        setTimeout(() => {
            modal.style.opacity = "1";
        }, 0);
        
    } else if (modal.style.opacity == "1") {
        console.log("Else event fired.");
        modal.style.opacity = "0";
        setTimeout(() => {
            modal.style.display = "none";
        }, 200);
        
    }
}

window.addEventListener('click', modalInteract);
window.addEventListener('touchend', modalInteract);