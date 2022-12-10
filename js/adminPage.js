let items = JSON.parse(localStorage.getItem('items'));
let itemsContainer = document.querySelector('.items-container');
console.log(items);

// function to render the data into container
const renderData = (items) => {
    // load the table content
    itemsContainer.innerHTML = "";
    items.forEach(item => {
        itemsContainer.innerHTML +=
            // `<tr class="table-row">
            //     <th scope="row">${items.indexOf(item) + 1}</th>
            //     <td>${item.brand}</td>
            //     <td>${item.price}</td>
            //     <td>${item.specifications.toString()}</td>
            //     <td class="d-flex gap-2">
            //         <button class="rounded-1 btn-primary border-0 bg-primary text-white" onclick='showEditModal(${JSON.stringify(item)})'>
            //             <i class="bi bi-pencil pencil"></i>
            //         </button>
            //         <button class="rounded-1 btn-danger border-0 bg-danger text-white" onclick='handleDelete(${JSON.stringify(item)})'>
            //             <i class="bi bi-trash3"></i>
            //         </button>
            //     </td>
            // </tr>`
            `<div class="item-to-load py-3 bg-info">
                <h3 class="item-name">${item.brand}</h3>
                <h3 class="item-price">${item.price}</h3>
                <p class="item-specifications">${item.specifications}</p>
                <span class="buttons">
                    <button class="btn btn-primary">g</button>
                    <button class="btn btn-warning">g</button>
                </span>
             </div>`
        itemsContainer.innerHTML += item;   
    });

}

// load the items into the container
document.addEventListener('DOMContentLoaded', () => {
    renderData(items);
});
