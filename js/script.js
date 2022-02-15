async function getCamera() {
    const camera = await navigator.mediaDevices.getUserMedia({
        video: {
        facingMode: {
            ideal: "environment"
            }
        },
        audio: false
    });
    const video = document.querySelector("video");
    video.srcObject = camera;
    await video.play();

    detectBarcode(video)
}

function detectBarcode(video) {
    const barcodeDetector = new BarcodeDetector({formats: ['ean_13']});
    window.setInterval(async () => {
        const barcodes = await barcodeDetector.detect(video);
        if (barcodes.length <= 0) {
            return 
        } else {
            getProductData(barcodes[0].rawValue)
        }
    }, 1000)
}


// async function detectBarcode() {
//     const camera = await navigator.mediaDevices.getUserMedia({
//         video: {
//         facingMode: {
//             ideal: "environment"
//             }
//         },
//         audio: false
//     });
//     const video = document.querySelector("video");
//     video.srcObject = camera;
//     await video.play();

//     const barcodeDetector = new BarcodeDetector({formats: ['ean_13']});
//     window.setInterval(async () => {
//         const barcodes = await barcodeDetector.detect(video);
//         if (barcodes.length <= 0) {
//             return 
//         } else {
//             getProductData(barcodes[0].rawValue)
//         }
//     }, 1000)
// };
getCamera()
  

function getProductData(barcode) {
    const baseURL = 'https://world.openfoodfacts.org/api/v0/product/'
    const productID = barcode

    fetch(baseURL + productID)
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response);
        }
    })
    .then((data) => {
        if (data.status) {
            const product = {
                name: data.product.product_name_nl || data.product.product_name,
                img: data.product.image_front_url
            }
            showProductData(product);
        } else {
            showWarning()
        }
    })
    .catch((err) => { 
        console.warn(err);
    });
}

function showProductData(product) {
    const productMarkup = `
    <h1>${product.name}</h1>
    <img src="${product.img}" alt="${product.name}" />
    `;
    
    const detailsEl = document.querySelector('.details');
    detailsEl.innerHTML = productMarkup;
    detailsEl.classList.add('result', 'open')
}

function showWarning() {
    const warningMarkup = `
    <div class="failed warning">
        <img src="img/warn.svg" alt="warning" />
        <h1>Geen product info gevonden</h1>
    </div>
    <p>Er zijn geen gegevens beschikbaar voor dit product. Probeer een ander product.</p>
    `;

    const detailsEl = document.querySelector('.details');
    detailsEl.classList.remove('result', 'open')
    detailsEl.innerHTML = warningMarkup;
}

function showError() {
    const errorMarkup = `
    <div class="failed error">
        <img src="img/error.svg" alt="error" />
        <h1>Scanner niet beschikbaar</h1>
    </div>
    <p>Scanner niet beschikbaar. Update je device & browser of probeer een ander apparaat.</p>
    `;

    const detailsEl = document.querySelector('.details');
    detailsEl.classList.remove('result', 'open')
    detailsEl.innerHTML = errorMarkup;
}

if (!('BarcodeDetector' in window)) showError()

const detailsEl = document.querySelector('.details');
detailsEl.addEventListener('click', () => detailsEl.classList.toggle('open'));




// nutriments: {
//     kcal: data.product.nutriments.energy-kcal,
//     carb: data.product.nutriments.carbohydrates,
//     protein: data.product.nutriments.proteins,
//     fat: data.product.nutriments.fat,
//     sat_fat: data.product.nutriments.saturated-fat,
//     suger: data.product.nutriments.sugers,
//     salt: data.product.nutriments.salt
// }

// ${product.nutriments.map(nutri => `<li> </li>`)}