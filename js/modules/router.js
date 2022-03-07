import { getCamera } from './barcodeDetector.js';
import { showScanningState } from './states.js'
import { getProductData } from './getProductData.js';
import { showProductData } from './showProductData.js';
import { Routie } from './vendor/routie.js';

export function handleRoutes() { 
    routie({
        'scanning': () => {
            getCamera()
            showScanningState()
        },
        'product/:barcode': barcode => {
            getProductData(barcode)
            .then(response => showProductData(response))
        }
    })
};