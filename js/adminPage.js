let items = JSON.parse(localStorage.getItem('items'));
let tableBody = document.querySelector('.table-body');

document.addEventListener('DOMContentLoaded', () => {
    renderTableContent();
});

// handle the event for the delete button
const handleDelete = (item) => {
    let updatedData = items.filter(entry => entry.id !== item.id);
    items = updatedData;
    localStorage.setItem('items', JSON.stringify(updatedData));

    // update the table
    tableBody.innerHTML = '';
    renderTableContent();
    displayTableContent();
}

// handle the event for the edit button
const handleEdit = () => {
    alert('Edit button clicked');
}

const renderTableContent = () => {
    // load the table content
    items.forEach(item => {
        tableBody.innerHTML +=
            `<tr>
                <th scope="row">${items.indexOf(item) + 1}</th>
                <td>${item.brand}</td>
                <td>${item.price}</td>
                <td>${item.specifications.toString()}</td>
                <td class="d-flex gap-2">
                    <button class="rounded-1 btn-primary border-0 bg-primary text-white" onclick="handleEdit()">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="rounded-1 btn-danger border-0 bg-danger text-white" onclick='handleDelete(${JSON.stringify(item)})'>
                        <i class="bi bi-trash3"></i>
                    </button>
                </td>
            </tr>`
            // tableBody.innerHTML += item;   
    });
    
}

function displayTableContent() {
    try {
        document.addEventListener('DOMContentLoaded', () => {
            renderTableContent();
        });
    }
    catch (e) {
        console.log('Error: ', e)
    }

}

// modal script

// creating a constructor function for a new product
function product(_id_, _brand_, _specifications_, _price_, _color_, _imageLink_){
    // properties of the product
    return {
        id :_id_,
        brand: _brand_,
        price: _price_,
        specifications: _specifications_,
        color: _color_,
        imageLink: _imageLink_
    }
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
});

// complete add button
let btnCompleteAdd = document.querySelector('.btn-complete-add');
btnCompleteAdd.addEventListener('click', () => {
    // generate new id
    const generateId = () => items[items.length-1].id + 1;    
    let brand = inpBrand.value;
    let price = inpPrice.value;
    let specifications = inpSpecifications.value;
    let color = inpColor.value;
    let imageLink = inpImageLink.value;
    let newProduct = product(generateId(), brand, specifications, price, color, imageLink);
    
    let updatedItems = [...items, newProduct];

    try{
        localStorage.setItem('items', JSON.stringify(updatedItems));
        alert('Item successfully added')
        // update the table
        tableBody.innerHTML = '';
        renderTableContent();
        displayTableContent();
    }
    catch(e){
        console.log(e);
        alert(e.message)
    }
});

// cancel button on modal
let btnCancel = document.querySelector('.btn-cancel');
btnCancel.addEventListener('click', () => {
    // alert('cancel button clicked');
    modalItem.style.display = 'none';
});
