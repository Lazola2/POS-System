let closeButton = document.querySelector('.close-button');
let navigation = document.querySelector('.navigation');
let navigationLinks = document.querySelector('.nav-links');

closeButton.addEventListener('click', () => {
    navigation.classList.add('removed');
    // navigationLinks.classList.add('removed');
})