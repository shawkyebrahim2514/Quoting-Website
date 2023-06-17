function hideOverlay() {
    document.querySelector('.overlay').classList.add('hide')
}

function AddToggleNavbarLinks() {
    const navBars = document.querySelector('nav .bars');
    navBars.addEventListener('click', function () {
        this.classList.toggle('active');
    });
}

AddToggleNavbarLinks();

export { hideOverlay }