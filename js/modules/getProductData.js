import { showProductData } from "./showProductData.js";
import { showWarningState } from "./states.js";

export function getProductData(barcode) {
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
            showWarningState()
        }
    })
    .catch((err) => { 
        console.warn(err);
    });
}