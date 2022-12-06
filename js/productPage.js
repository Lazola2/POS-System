document.addEventListener('DOMContentLoaded', () => {
    let itemsContainer = document.querySelector('.items-container');
    JSON.parse(localStorage.getItem('items')).forEach(item => {
        let card = `
        <div class="card" style="width: 18rem;">
            <img src="${item.imageLink}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${item.brand}</h5>
                <p class="card-text">${item.specifications.toString()}</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>`
        itemsContainer.innerHTML += card;
    });
});