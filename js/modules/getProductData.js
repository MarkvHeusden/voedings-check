import { showProductData } from "./showProductData.js";
import { showLoadingState, showWarningState } from "./states.js";

export function getProductData(barcode) {
    showLoadingState();

    const baseURL = 'https://world.openfoodfacts.org/api/v0/product/'

    fetch(baseURL + barcode)
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
                barcode: barcode,
                name: data.product.product_name_nl || data.product.product_name,
                img: data.product.image_front_url
            }

            showProductData(product);
        } else {
            showWarningState()
        }
    })
    .catch((err) => { 
        console.warn(err);
    });
}