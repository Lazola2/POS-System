let items = JSON.parse(localStorage.getItem('items'));
let tableBody = document.querySelector('.table-body');

// sorting 
let ascending = true;
let sortElement = document.querySelector('.sort-element');
const handleSortOrder = () => {
    sortElement.innerHTML = ascending ?
        '<i class="bi bi-sort-numeric-down"></i>' :
        '<i class="bi bi-sort-numeric-up"></i>'
}
handleSortOrder();

sortElement.addEventListener('click', () => {
    ascending = !ascending;
    handleSortOrder();

    // sort by price
    let sorted = ascending ? 
        items.sort((a, b) => a.price - b.price):
        items.sort((a, b) => b.price - a.price);

    // render the table content that is sorted 
    renderTableContent(sorted);
});

document.addEventListener('DOMContentLoaded', () => {
    // when the DOM loads, render the table content for all items
    renderTableContent(items);
});

// handle the event for the delete button
const handleDelete = (item) => {
    let updatedData = items.filter(entry => entry.id !== item.id);
    items = updatedData;
    localStorage.setItem('items', JSON.stringify(updatedData));

    // update the table
    tableBody.innerHTML = '';
    renderTableContent(updatedData);
    displayTableContent(updatedData);
}

const renderTableContent = (_items_) => {
    // load the table content
    tableBody.innerHTML = "";
    _items_.forEach(item => {
        tableBody.innerHTML +=
            `<tr class="table-row">
                <th scope="row">${items.indexOf(item) + 1}</th>
                <td>${item.brand}</td>
                <td>${item.price}</td>
                <td>${item.specifications.toString()}</td>
                <td class="d-flex gap-2">
                    <button class="rounded-1 btn-primary border-0 bg-primary text-white" onclick='showEditModal(${JSON.stringify(item)})'>
                        <i class="bi bi-pencil pencil"></i>
                    </button>
                    <button class="rounded-1 btn-danger border-0 bg-danger text-white" onclick='handleDelete(${JSON.stringify(item)})'>
                        <i class="bi bi-trash3"></i>
                    </button>
                </td>
            </tr>`
        // tableBody.innerHTML += item;   
    });

}

function displayTableContent(data) {
    try {
        document.addEventListener('DOMContentLoaded', () => {
            renderTableContent(data);
        });
    }
    catch (e) {
        console.log('Error: ', e)
    }

}

// modal script
// creating a constructor function for a new product
function Product(id, brand, price, specifications, color, imageLink) {
    // properties of the product
    this.id = id;
    this.brand = brand.split(' ')[0];
    this.price = price;
    this.specifications = specifications;
    this.color = color;
    this.imageLink = imageLink;

    this.getItem = () => this.id;
    this.getBrand = () => this.brand;
    this.getPrice = () => this.price;
    this.getSpecifications = () => this.specifications;
    this.getColor = () => this.color;
    this.getImageLink = () => this.imageLink;
}

// modal item

// get the modal item
let modalItem = document.querySelector('.product-modal');

// get all the input data 
let inpBrand = document.querySelector('.brand-input');
let inpSpecifications = document.querySelector('.specs-input');
let inpPrice = document.querySelector('.price');
let inpColor = document.querySelector('.color');
let inpImageLink = document.querySelector('.image-link');

// show modal / add product button
let btnAddProduct = document.querySelector('.btn-add-product');
btnAddProduct.addEventListener('click', () => {
    modalItem.style.display = 'grid';
    inpSpecifications.value = "";
});

// complete add button
let btnCompleteAdd = document.querySelector('.btn-complete-add');
btnCompleteAdd.addEventListener('click', () => {
    // generate new id
    const generateId = () => items[items.length - 1].id + 1;
    let brand = inpBrand.value;
    let price = inpPrice.value;
    let specifications = inpSpecifications.value;
    let color = inpColor.value;
    let imageLink = inpImageLink.value;

    let product = new Product(generateId(), brand, price, specifications, color, imageLink);
    let updatedItems = [...items, product];

    try {
        localStorage.setItem('items', JSON.stringify(updatedItems));
        alert('Item successfully added')
        // update the table
        tableBody.innerHTML = '';
        renderTableContent(updatedItems);
        displayTableContent(updatedItems);
    }
    catch (e) {
        console.log(e);
        alert(e.message)
    }
    modalItem.style.display = 'none';
});

// cancel button on modal
let btnCancel = document.querySelector('.btn-cancel');
btnCancel.addEventListener('click', () => {
    modalItem.style.display = 'none';
});

// update modal
// get all the input data 
let inpBrandUpdate = document.querySelector('.brand-input-update');
let inpSpecificationsUpdate = document.querySelector('.specs-input-update');
let inpPriceUpdate = document.querySelector('.price-update');
let inpColorUpdate = document.querySelector('.color-update');
let inpImageLinkUpdate = document.querySelector('.image-link-update');

// show modal / add product button
// handle the event for the edit button
let productModalUpdate = document.querySelector('.product-modal-update');
let itemToUpdate;
const showEditModal = (item) => {  
   inpBrandUpdate.value = item.brand;
   inpSpecificationsUpdate.value = item.specifications;
   inpPriceUpdate.value = item.price;
   inpColorUpdate.value = item.color;
   inpImageLinkUpdate.value = item.imageLink;
   productModalUpdate.style.display = 'grid';
   itemToUpdate = item;
}

// cancel button on modal
let btnCancelUpdate = document.querySelector('.btn-cancel-update');
btnCancelUpdate.addEventListener('click', () => {
    productModalUpdate.style.display = 'none';
});

// cancel button on modal
let btnUpdate = document.querySelector('.btn-complete-update');
btnUpdate.addEventListener('click', () => {
    let updated = [...items];
    for (let i = 0; i < updated.length; i++){
        if (updated[i].id == itemToUpdate.id){ 
            let newItem = {
                id: updated[i].id,
                brand: inpBrandUpdate.value,
                price :inpPriceUpdate.value,
                specifications: inpSpecificationsUpdate.value.split(','),
                color: inpColorUpdate.value,
                imageLink: inpImageLinkUpdate.value
            }
            items[i] = newItem;
            console.log(items);
        }
    }

    items.forEach(item => {
        console.log(item.price)   
    })
    localStorage.setItem('items', JSON.stringify(items));
    renderTableContent(items);
    displayTableContent(items);
    productModalUpdate.style.display = 'none';
});