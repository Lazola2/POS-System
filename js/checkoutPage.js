let checkoutData = JSON.parse(localStorage.getItem('checkout'));
let checkoutContainer = document.querySelector('.checkout-container');
let totalContainer = document.querySelector('.total-container');
let totalAmount = 0;


// handle the clear checkout button
const handleProceedToCheckout = () => {
    // clear the checkout in the local storage
    localStorage.setItem('checkout', JSON.stringify([]))

    // display a checkout message to the user
    checkoutContainer.innerHTML =
        `<div class="d-flex flex-column align-items-center message-holder p-5 rounded-5 mt-3">
            <h1 class="text-white display-1 mt-5">Thank you for shopping with us!</h1>
            <i class="bi bi-emoji-smile emoji text-white"></i>
        </div>`
}

// handle the clear checkout button
const handleClearCheckout = () => {
    // clear the checkout in the local storage
    localStorage.setItem('checkout', JSON.stringify([]))

    // display a checkout message to the user
    checkoutContainer.innerHTML =
            `<div class="d-flex flex-column align-items-center message-holder p-5 rounded-5 mt-3">
            <h1 class="text-white display-1 mt-5">No items on your checkout</h1>
            <i class="bi bi-emoji-frown text-white emoji"></i>
        </div>`
}

let removedCheckoutItem = false;

// function to remove an item in the checkout
function removeCheckoutItem(item) {
    // filtering the checkout to remove the item
    let newCheckout = checkoutData.filter(entry => entry.id !== item.id);
    // overwriting the local storage with new checkout data
    localStorage.setItem('checkout', JSON.stringify(newCheckout));
    checkoutData = newCheckout;

    // clear the checkout container
    checkoutContainer.innerHTML = ""
    renderCheckout();
}

function getTotalAmount(sum = 0){
    checkoutData.forEach(item => sum += item.price)
    return sum;
}

function renderCheckout() {
    // load the checkout content
    if (checkoutData.length !== 0) {
        checkoutData.forEach(checkoutItem => {
            let item = `
            <div class="checkout-item rounded-3  overflow-hidden my-3 d-flex align-items-center justify-content-between">
                <img src="${checkoutItem.imageLink}" class="ms-3">
                <div class="bg-dark content-holder me-1 rounded-2 overflow-hidden d-flex align-items-center justify-content-between">
                    <div class="content ms-2 me-2 rounded-1 text-white ps-3">
                        <p class=" mb-1brand p-0 m-0 fw-bold fs-5 mb-2">${checkoutItem.brand}</p>
                        <p class=" mb-1specifications p-0 m-0">Specification: ${checkoutItem.specifications}</p>
                        <p class=" mb-1total p-0 m-0">Price: R${checkoutItem.price}</p>
                    </div>
                    <button class="btn btn-danger btn-remove me-4" onclick='removeCheckoutItem(${JSON.stringify(checkoutItem)})'>Remove</button>
                </div>
            </div>`
            // console.log(item)
            checkoutContainer.innerHTML += item;
        })

        
        // display the checkout total
        checkoutContainer.innerHTML +=
            `<div class="checkout-total rounded-3 text-white d-flex flex-column justify-content-center ps-5">
                <p class="display-total">Amount due: R${getTotalAmount()}</p>
                <div class="checkout-buttons d-flex gap-3">
                    <button class="btn btn-success proceed-checkout" onclick="handleProceedToCheckout()">Proceed to checkout</button>
                    <button class="btn btn-danger clear-checkout" onclick="handleClearCheckout()">Clear checkout</button>
                </div>
            </div>`
    }
    else {
        checkoutContainer.innerHTML =
            `<div class="d-flex flex-column align-items-center message-holder p-5 rounded-5 mt-3">
            <h1 class="text-white display-1 mt-5">No items on your checkout</h1>
            <i class="bi bi-emoji-frown text-white emoji"></i>
        </div>`

    }

}



// call the displayCheckout function on default
document.addEventListener('DOMContentLoaded', () => {
    renderCheckout();
})
