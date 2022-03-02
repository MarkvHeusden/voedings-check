export function showProductData(product) {
    const productMarkup = `
    <h1>${product.name}</h1>
    <img src="${product.img}" alt="${product.name}" />
    `;
    
    const detailsEl = document.querySelector('.details');
    detailsEl.addEventListener('click', () => detailsEl.classList.toggle('open'));
    detailsEl.innerHTML = productMarkup;
    detailsEl.classList.add('result', 'open')
}