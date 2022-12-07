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
    });
    tableBody.innerHTML += item;
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

// call the displayCheckout function on default
// displayTableContent();

