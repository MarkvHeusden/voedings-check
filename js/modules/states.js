import { toggleDetails } from "./toggleDetails.js";

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
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin:auto;background:#fff;display:block;" width="201px" height="201px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <g transform="rotate(0 50 50)">
            <rect x="47" y="26" rx="3" ry="3.6" width="6" height="12" fill="#696d6f">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.6949152542372883s" begin="-1.5065913370998119s" repeatCount="indefinite"></animate>
            </rect>
            </g><g transform="rotate(40 50 50)">
            <rect x="47" y="26" rx="3" ry="3.6" width="6" height="12" fill="#696d6f">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.6949152542372883s" begin="-1.3182674199623352s" repeatCount="indefinite"></animate>
            </rect>
            </g><g transform="rotate(80 50 50)">
            <rect x="47" y="26" rx="3" ry="3.6" width="6" height="12" fill="#696d6f">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.6949152542372883s" begin="-1.1299435028248588s" repeatCount="indefinite"></animate>
            </rect>
            </g><g transform="rotate(120 50 50)">
            <rect x="47" y="26" rx="3" ry="3.6" width="6" height="12" fill="#696d6f">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.6949152542372883s" begin="-0.9416195856873824s" repeatCount="indefinite"></animate>
            </rect>
            </g><g transform="rotate(160 50 50)">
            <rect x="47" y="26" rx="3" ry="3.6" width="6" height="12" fill="#696d6f">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.6949152542372883s" begin="-0.7532956685499059s" repeatCount="indefinite"></animate>
            </rect>
            </g><g transform="rotate(200 50 50)">
            <rect x="47" y="26" rx="3" ry="3.6" width="6" height="12" fill="#696d6f">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.6949152542372883s" begin="-0.5649717514124294s" repeatCount="indefinite"></animate>
            </rect>
            </g><g transform="rotate(240 50 50)">
            <rect x="47" y="26" rx="3" ry="3.6" width="6" height="12" fill="#696d6f">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.6949152542372883s" begin="-0.37664783427495296s" repeatCount="indefinite"></animate>
            </rect>
            </g><g transform="rotate(280 50 50)">
            <rect x="47" y="26" rx="3" ry="3.6" width="6" height="12" fill="#696d6f">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.6949152542372883s" begin="-0.18832391713747648s" repeatCount="indefinite"></animate>
            </rect>
            </g><g transform="rotate(320 50 50)">
            <rect x="47" y="26" rx="3" ry="3.6" width="6" height="12" fill="#696d6f">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.6949152542372883s" begin="0s" repeatCount="indefinite"></animate>
            </rect>
            </g>
</svg>
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