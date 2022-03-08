export function getProductData(barcode) {
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
            const productData = createProductObject(data)
            console.log(productData);
            return productData;
        } else {
            return Promise.reject('no-info');
        }
    })
}

function createProductObject(data) {
    const productData = {
        name: data['product']['product_name_nl'] || data['product']['product_name'],
        img: data['product']['image_front_url'] || Object.values(data['product']['selected_images']['front']['display'])[0],
        nutriments: {  
            kcal: {
                name: 'Calorieën',
                value: data['product']['nutriments']['energy-kcal_100g'],
                unit: data['product']['nutriments']['energy-kcal_unit']
            },
            carbs: {
                name: 'Koolhydraten',
                value: data['product']['nutriments']['carbohydrates_100g'],
                unit: data['product']['nutriments']['carbohydrates_unit']
            },
            fat: {
                name: 'Vetten',
                value: data['product']['nutriments']['fat_100g'],
                unit: data['product']['nutriments']['fat_unit']
            },
            sat_fat: {
                name: 'Verz. vet',
                value: data['product']['nutriments']['saturated-fat_100g'],
                unit: data['product']['nutriments']['saturated-fat_unit']
            },
            fiber: {
                name: 'Vezels',
                value: data['product']['nutriments']['fiber_100g'],
                unit: data['product']['nutriments']['fiber_unit']
            },
            protein: {
                name: 'Eiwitten',
                value: data['product']['nutriments']['proteins_100g'],
                unit: data['product']['nutriments']['proteins_unit']
            },
            salt: {
                name: 'Zout',
                value: data['product']['nutriments']['salt_100g'],
                unit: data['product']['nutriments']['salt_unit']
            },
            suger: {
                name: 'Suiker',
                value: data['product']['nutriments']['sugars_100g'],
                unit: data['product']['nutriments']['sugars_unit']
            }
        }
    }
    return productData
}