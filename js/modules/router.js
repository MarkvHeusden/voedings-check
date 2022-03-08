import { getCamera } from './barcodeDetector.js';
import { showScanningState, showLoadingState } from './states.js'
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
            showLoadingState();
            getProductData(barcode)
            .then(data => showProductData(data))
        }
    })
};