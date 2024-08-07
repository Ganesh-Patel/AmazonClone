import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Tag } from 'primereact/tag';

export default function CircularDemo() {
    const [products, setProducts] = useState([]);
    const responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    const sampleData = [
        {
            id: 1,
            name: 'Product 1',
            price: 100,
            image: 'product1.jpg',
            inventoryStatus: 'INSTOCK'
        },
        {
            id: 2,
            name: 'Product 2',
            price: 200,
            image: 'product2.jpg',
            inventoryStatus: 'LOWSTOCK'
        },
        {
            id: 3,
            name: 'Product 3',
            price: 300,
            image: 'product3.jpg',
            inventoryStatus: 'OUTOFSTOCK'
        },
        {
            id: 4,
            name: 'Product 4',
            price: 400,
            image: 'product4.jpg',
            inventoryStatus: 'INSTOCK'
        },
        {
            id: 5,
            name: 'Product 5',
            price: 500,
            image: 'product5.jpg',
            inventoryStatus: 'INSTOCK'
        },  {
            id: 6,
            name: 'Product 6',
            price: 600,
            image: 'product6.jpg',
            inventoryStatus: 'LOWSTOCK'
        }
    ];

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    useEffect(() => {
        // Simulating data fetch
        setProducts(sampleData);
    }, []);

    const productTemplate = (product) => {
        return (
            <div className="border-1 surface-border border-round m-2 text-center py-5 px-3 w-full">
                <div style={{ width: '4rem', height: '4rem' }} className="mb-3">
                    <img  src={`https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg`} alt={product.name} className="w-6 shadow-2" />
                </div>
            </div>
        );
    };

    return (
        <div className="card">
            <Carousel value={products} numVisible={3} numScroll={1} responsiveOptions={responsiveOptions} className="custom-carousel" circular
            autoplayInterval={3000} itemTemplate={productTemplate} />
        </div>
    )
}
