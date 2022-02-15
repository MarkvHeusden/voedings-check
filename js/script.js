(async () => {
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

    const barcodeDetector = new BarcodeDetector({formats: ['ean_13']});
    window.setInterval(async () => {
        const barcodes = await barcodeDetector.detect(video);
        if (barcodes.length <= 0) {
            return 
        } else {
            getProductData(barcodes[0].rawValue)
        }
    }, 1000)
})();
  

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
                    img: data.product.image_front_url,
                    // nutriments: {
                    //     kcal: data.product.nutriments.energy-kcal,
                    //     carb: data.product.nutriments.carbohydrates,
                    //     protein: data.product.nutriments.proteins,
                    //     fat: data.product.nutriments.fat,
                    //     sat_fat: data.product.nutriments.saturated-fat,
                    //     suger: data.product.nutriments.sugers,
                    //     salt: data.product.nutriments.salt
                    // }
    
                }
    
                // ${product.nutriments.map(nutri => `<li> </li>`)}
    
                const productMarkup = `
                <h1>${product.name}</h1>
                <img src="${product.img}" alt="${product.name}" />
                `;
                
                const detailsEl = document.querySelector('.details');
                detailsEl.innerHTML = productMarkup;
                detailsEl.classList.add('result', 'open')

            } else {
                alert("Geen product info beschikbaar.");
                detailsEl.classList.remove('result', 'open')
            }
        })
        .catch((err) => { 
            console.warn(err);
        });
}

const detailsEl = document.querySelector('.details');
detailsEl.addEventListener('click', () => detailsEl.classList.toggle('open'));