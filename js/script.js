(async () => {
const stream = await navigator.mediaDevices.getUserMedia({
    video: {
    facingMode: {
        ideal: "environment"
        }
    },
    audio: false
});
const camera = document.querySelector("video");
camera.srcObject = stream;
await camera.play();

const barcodeDetector = new BarcodeDetector({formats: ['ean_13']});
window.setInterval(async () => {
    const barcodes = await barcodeDetector.detect(camera);
    if (barcodes.length <= 0) {
        return 
    } else
        getProductData(barcodes[0].rawValue)
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
                <img src="${product.img}" alt="${product.name}" />
                <h1>${product.name}</h1>
                <ul>
                
                </ul>
                <form action="">
                    <input type="number" />
                    <input type="text" />
                </form>
                <h2>Ingredienten</h2>
                `;
    
                document.querySelector('.product').innerHTML = productMarkup;
            } else alert("Geen product info gevonden.");
        })
        .catch((err) => { 
            console.warn(err);
        });
}
