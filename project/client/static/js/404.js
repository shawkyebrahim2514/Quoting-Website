window.addEventListener('load', loadErrorImage);

function loadErrorImage() {
    fetch('/image/404.svg')
        .then(response => response.text())
        .then(svgContent => {
            console.log('SVG content:', svgContent);
            const svgContainer = document.querySelector('svg.error-image');
            svgContainer.innerHTML = svgContent;
        })
        .catch(error => {
            console.error('Error fetching SVG:', error);
        });
}
