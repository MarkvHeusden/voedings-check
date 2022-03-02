// import { Routie } from './routie.js'
import { getCamera } from './modules/getCamera.js'
import { showScanningState, showErrorState } from './modules/states.js'


// routie('test', function() {
//     console.log('hoi')
// });

if (!('BarcodeDetector' in window)) {
    showErrorState()
}

const startBtn = document.querySelector('button');
startBtn.addEventListener('click', function() {
    getCamera()
    showScanningState()
});


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