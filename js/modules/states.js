import { toggleDetails } from "./showProductData.js";

// Scanning state
export function showScanningState() {
    const scanningMarkup = `
        <h1>Richt je camera op een barcode...</h1>
        <img src="img/barcode.png" alt="barcode placeholder" />
    `;

    const detailsEl = document.querySelector('.details');
    detailsEl.classList.remove('open', 'result')
    detailsEl.innerHTML = scanningMarkup;
}

// Loading state
export function showLoadingState() {
    const scanningMarkup = `
        <h1>Product info ophalen...</h1>
        <img src="img/spinner.gif" />
    `;

    const detailsEl = document.querySelector('.details');
    detailsEl.classList.remove('open')
    detailsEl.innerHTML = scanningMarkup;
}

// No product info found
export function showWarningState() {
    const warningMarkup = `
    <div class="failed warning">
        <img src="img/warn.svg" alt="warning" />
        <h1>Geen product info gevonden</h1>
    </div>
    <p>Er zijn geen gegevens beschikbaar voor dit product. Probeer een ander product.</p>
    `;

    const detailsEl = document.querySelector('.details');
    detailsEl.removeEventListener('click', toggleDetails);
    detailsEl.classList.remove('result', 'open')
    detailsEl.innerHTML = warningMarkup;
}

// Scanner not available
export function showErrorState() {
    const errorMarkup = `
    <div class="failed error">
        <img src="img/error.svg" alt="error" />
        <h1>Scanner niet beschikbaar</h1>
    </div>
    <p>Scanner niet beschikbaar. Update je device & browser of probeer het op een ander apparaat.</p>
    `;

    const detailsEl = document.querySelector('.details');
    detailsEl.classList.remove('result', 'open')
    detailsEl.innerHTML = errorMarkup;
}