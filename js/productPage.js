// load the checkout data
let checkoutItems = JSON.parse(localStorage.getItem('checkout'))?
    JSON.parse(localStorage.getItem('checkout')): [];  

let items = JSON.parse(localStorage.getItem('items'));
let itemsContainer = document.querySelector('.items-container');

const addToCheckout = (checkoutItem) => {
    // let itemsOnCheckout = JSON.parse(localStorage.getItem('checkout'));
    checkoutItems.unshift(checkoutItem);
    localStorage.setItem('checkout', JSON.stringify(checkoutItems));
}

// load products into the products page
const renderProducts = (_items_) =>{ 
    itemsContainer.innerHTML =  "";

    _items_.length === 0 ?
    itemsContainer.innerHTML = 
        `<div class="d-flex flex-column align-items-center">
            <h1 class="text-white">Sorry, the item you are looking for is out of stock</h1>
            <i class="bi bi-emoji-frown text-white emoji"></i>
        </div>`
    :
    _items_.forEach(item => {
        let card = `
        <div class="card mb-5 text-white" style="width: 18rem;">
            <img src="${item.imageLink}" class="card-img-top" alt="${item.brand}" loading="lazy">
            <div class="card-body">
                <div class="name-and-price d-flex justify-content-between">
                    <h5 class="card-title">${item.brand}</h5>
                    <h5 class="card-title">R${item.price}</h5>
                </div>
                
                <p class="card-text text-center">${item.specifications.toString()}</p>
                <div class="button-holder d-flex justify-content-center">
                    <button class="btn add-btn w-50" onclick='addToCheckout(${JSON.stringify(item)})'>Add</button>
                </div>
            </div>
        </div>`
        itemsContainer.innerHTML += card;
    });
}

document.addEventListener('DOMContentLoaded', () => {  
    renderProducts(items);
});

// handle the filter button
let btnFilter = document.querySelector('.btn-filter');
let minPrice = document.querySelector('.min-price');
let maxPrice = document.querySelector('.max-price');
let color = document.querySelector('.color-select');
let brand = document.querySelector('.brand-select');

btnFilter.addEventListener('click', (e) => {
    e.preventDefault();

    // filter by price
    let filteredByPrice = items.filter(item => ((item.price >= minPrice?.value) && (item.price <= maxPrice?.value)));
    let filteredByColor = items.filter(item => item.color.toLowerCase() === color.value.toLowerCase());
    let filteredByBrand = items.filter(item => item.brand === brand.value);

    let finalFilter = [];
    filteredByBrand.forEach(item => {
        if (filteredByColor.includes(item) && filteredByPrice.includes(item)) {
            finalFilter.push(item);
        }
    });
    console.log(finalFilter);
    renderProducts(finalFilter);
});


