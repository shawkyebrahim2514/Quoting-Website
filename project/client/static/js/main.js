function hideOverlay() {
    document.querySelector('.overlay').classList.add('hide')
}

function addToggleNavbarLinks() {
    const navBars = document.querySelector('nav .bars');
    navBars.addEventListener('click', function () {
        this.classList.toggle('active');
    });
}

export { hideOverlay, addToggleNavbarLinks }