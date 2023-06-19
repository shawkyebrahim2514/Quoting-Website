import { hideOverlay, addToggleNavbarLinks } from "./main.js";

window.addEventListener('load', () => {
    loadErrorImage();
    addToggleNavbarLinks();
    hideOverlay();
});

function loadErrorImage() {
    fetch('/image/404.svg')
        .then(response => response.text())
        .then(svgContent => {
            const svgContainer = document.querySelector('svg.error-image');
            svgContainer.innerHTML = svgContent;
        })
        .catch(error => {
            console.error('Error fetching SVG:', error);
        });
}
