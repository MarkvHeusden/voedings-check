import { toggleDetails } from "./states.js";

// Display product data
export function showProductData(product) {
    const productMarkup = `
    <h1>${product.name}</h1>
    <img src="${product.img}" alt="${product.name}" />
    `;
    
    const detailsEl = document.querySelector('.details');
    detailsEl.addEventListener('click', toggleDetails);
    detailsEl.innerHTML = productMarkup;
    detailsEl.classList.add('result', 'open')
}
