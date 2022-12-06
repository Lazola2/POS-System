document.addEventListener('DOMContentLoaded', () => {
    let tableBody = document.querySelector('.table-body');
    JSON.parse(localStorage.getItem('items')).forEach(item => {
        tableBody.innerHTML += 
        `<tr>
            <th scope="row">${item.id}</th>
            <td>${item.brand}</td>
            <td>${item.price}</td>
            <td>${item.specifications.toString()}</td>
            <td>Null for now</td>
        </tr>`
    });
});
