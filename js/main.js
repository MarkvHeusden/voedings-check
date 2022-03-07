import { getCamera } from './modules/getCamera.js'
import { showScanningState, showErrorState } from './modules/states.js'
import { getProductData } from './modules/getProductData.js';
import { Routie } from './modules/routie.js';

routie({
    'scanning': () => {
        getCamera()
        showScanningState()
    },
    'product/:barcode': barcode => {
        getProductData(barcode)
    }
});

// activity diagram, product info, zoekfunctie, readme


if (!('BarcodeDetector' in window)) {
    showErrorState()
}



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