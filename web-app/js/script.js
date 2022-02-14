window.onload = () => {
    detect();
  };
  
async function detect() {
const barcodeDetector = new BarcodeDetector();
const scanner = document.querySelector(".scanner");
let scannedBarcode = [];
const mediaStream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: "environment" }
});

const video = document.createElement("video");
video.srcObject = mediaStream;
video.autoplay = true

scanner.before(video);

function render() {
    barcodeDetector
    .detect(video)
    .then((barcodes) => {
        barcodes.forEach((barcode) => {
        if (!scannedBarcode.includes(barcode.rawValue)) {
            scannedBarcode.push(barcode.rawValue);
            const li = document.createElement("li");
            li.innerHTML = barcode.rawValue;
            scanner.appendChild(li);
        }
        });
    })
    .catch(console.error);
}

(function renderLoop() {
    requestAnimationFrame(renderLoop);
    render();
})();
}
  

function scan() {
    const baseURL = 'https://world.openfoodfacts.org/api/v0/product/'
    const productID = '8711200428953'

    fetch(baseURL + productID)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response);
            }
        })
        .then((data) => {
            console.log(data.product)

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

            // const productName = document.querySelector('.product h1');
            // productName.innerHTML = product.name;

            // const productImg = document.querySelector('.product img');
            // productImg.src = product.img;
        })
        .catch((err) => { 
            console.warn(err);
        });
}
