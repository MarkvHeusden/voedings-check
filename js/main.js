//  insertAdjecent, activity diagram, product info, zoekfunctie, readme, format
import { handleRoutes } from "./modules/router.js"
import { showState } from "./modules/states.js"

handleRoutes()

// Check if Barcode Detector is available
if (!('BarcodeDetector' in window)) {
    showState('no-detector')
}