import { showLoadingState, showWarningState } from "./states.js";

export function getProductData(barcode) {
    showLoadingState();

    const baseURL = 'https://world.openfoodfacts.org/api/v0/product/'

    return fetch(baseURL + barcode)
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
                img: data.product.image_front_url || Object.values(data.product.selected_images.front.display)[0]
            }
            return product;
        } else {
            showWarningState()
        }
    })
    .catch((err) => { 
        console.warn(err);
    });
}