let checkoutData = JSON.parse(localStorage.getItem('checkout'));
let checkoutContainer = document.querySelector('.checkout-container');
let totalContainer = document.querySelector('.total-container');
let totalAmount = 0;

// function to remove an item in the checkout
function removeCheckoutItem(item){
    // filtering the checkout to remove the item
    let newCheckout = checkoutData.filter(entry =>  entry.id !== item.id);
    // overwriting the local storage with new checkout data
    localStorage.setItem('checkout', JSON.stringify(newCheckout));
    checkoutData = newCheckout;
    
    checkoutContainer.innerHTML = ""
    // clear the checkout container
    renderCheckout();
    displayCheckout();
}


function renderCheckout() {
    // load the checkout content
    checkoutData.forEach(checkoutItem => {
        totalAmount += checkoutItem.price;
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
    }); 
    checkoutContainer.innerHTML += 
    `<div class="bg-info total-container">
        ${totalAmount}
    </div>
    `
}

function displayCheckout() {
    if (checkoutData.length !== 0) {    
        renderCheckout();         
        return;
    }
    checkoutContainer.innerHTML += 
        `<div class="d-flex flex-column align-items-center message-holder p-5 rounded-5 mt-3">
            <h1 class="text-white display-1 mt-5">No items on your checkout</h1>
            <i class="bi bi-emoji-frown text-white emoji"></i>
        </div>`
      
}
    
// call the displayCheckout function on default
document.addEventListener('DOMContentLoaded', () => {
    displayCheckout();
})
