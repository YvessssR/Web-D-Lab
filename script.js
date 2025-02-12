let currentIndex = 1;

function moveSlide(direction) {
    const images = document.querySelectorAll(".carousel-image");
    images[currentIndex].classList.remove("active");

    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    } else if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    images[currentIndex].classList.add("active");
}
