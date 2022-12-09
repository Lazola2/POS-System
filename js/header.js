let closeButton = document.querySelector('.close-button');
let menuButton = document.querySelector('.menu-icon');

let navigation = document.querySelector('.navigation');
let navigationLinks = document.querySelector('.nav-links');

menuButton.addEventListener('click', () => {
    navigation.classList.remove('removed');
})

closeButton.addEventListener('click', () => {
    navigation.classList.add('removed');
})
