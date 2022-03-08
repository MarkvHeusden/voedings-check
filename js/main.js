//  activity diagram, product info, zoekfunctie, readme, switch case states
import { showErrorState } from "./modules/states.js"
import { handleRoutes } from "./modules/router.js"

handleRoutes()

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