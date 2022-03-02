import { getProductData } from "./getProductData.js";

export function detectBarcode(video) {
    const barcodeDetector = new BarcodeDetector({formats: ['ean_13']});

    window.setInterval(async () => {
        const barcodes = await barcodeDetector.detect(video);
        if (barcodes.length <= 0) {
            return 
        } else {
            console.log('Fetching..')
            getProductData(barcodes[0].rawValue)
        }
    }, 1000)
}