let checkoutItems = [];

const addToCheckout = (checkoutItem) => {
    checkoutItems.unshift(checkoutItem);
    localStorage.setItem('checkout', JSON.stringify(checkoutItems));
    alert('Item added to checkout')
}

document.addEventListener('DOMContentLoaded', () => {
    let itemsContainer = document.querySelector('.items-container');
    let quantitySelected = 1;

    JSON.parse(localStorage.getItem('items')).forEach(item => {
        let card = `
        <div class="card mb-5 text-white" style="width: 18rem;">
            <img src="${item.imageLink}" class="card-img-top" alt="...">
            <div class="card-body">
                <div class="name-and-price d-flex justify-content-between">
                    <h5 class="card-title">${item.brand}</h5>
                    <h5 class="card-title">R${item.price}</h5>
                </div>
                <div class="name-and-price d-flex justify-content-between">
                    <p class="quantity">Quantity</p>
                    <div class="btn-group button-group rounded-1 overflow-hidden" role="group">
                        <button type="button" class="bg-white lbl-quantity d-flex align-items-center justify-content-center border-0">${quantitySelected}</button>
                        <button type="button" class="bg-white btn-increase d-flex align-items-center justify-content-center border-0 mx-1">+</button>
                        <button type="button" class="bg-white btn-decrease d-flex align-items-center justify-content-center border-0">-</button>
                    </div>
                </div>
                <p class="card-text text-center">${item.specifications.toString()}</p>
                <div class="button-holder d-flex justify-content-center">
                    <button class="btn add-btn w-50" onclick='addToCheckout(${JSON.stringify(item)})'>Add</button>
                </div>
            </div>
        </div>`
        itemsContainer.innerHTML += card;
    });

    // let addButtons = document.querySelectorAll('.add-btn');
    // addButtons.forEach(button => {
    //     button.addEventListener('click', () => {
    //         // let textCount = button.parentElement.parentElement.childNodes[3].childNodes[3].childNodes[1].textContent 
    //         // textCount.textContent = parseInt(textCount) + 1;
    //     });
    // })

    // let increaseButtons = document.querySelectorAll('.btn-increase');
    // let lblQuantity = document.querySelector('.lbl-quantity');
    // increaseButtons.forEach(increaseButton => {
    //     increaseButton.addEventListener('click', () => {
    //         lblQuantity.textContent = quantitySelected++;
    //     });
    // });

});
