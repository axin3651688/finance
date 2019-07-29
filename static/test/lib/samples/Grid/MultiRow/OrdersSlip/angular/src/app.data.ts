import { Injectable } from '@angular/core';

export interface OrdersSlipData {
    productId: number;
    productName: string;
    categoryId: number;
    categoryName: string;
    quantity: number;
    packageUnit: string;
    unitPrice: number;
    amount: number;
    shippingId: number;
    discontinued: boolean;
    remarks: string;
    description: string;
}
export interface Cell {
    binding: string;
    header: string;
    cssClass?: string;
    format?: string;
    isReadOnly?: boolean;
    wordWrap?: boolean;
    width?: number;
    colspan?: number;
    align?: string;
}
export interface Line {
    cells: Cell[];
    header?: string;
    colspan?: number;
}


@Injectable()
export class DataService {
    generateOrdersSlipData(): OrdersSlipData[] {
        return [
            {
                productId: 1,
                productName: 'Chai',
                categoryId: 1,
                categoryName: 'Beverages',
                quantity: 100,
                packageUnit: '10 boxes x 20 bags',
                unitPrice: 18,
                amount: 100 * 18,
                shippingId: 1,
                discontinued: false,
                remarks: '',
                description: 'Soft drinks, coffees, teas, beers, and ales'
            },
            {
                productId: 2,
                productName: 'Chang',
                categoryId: 1,
                categoryName: 'Beverages',
                quantity: 120,
                packageUnit: '24 - 12 oz bottles',
                unitPrice: 19,
                amount: 120 * 19,
                shippingId: 1,
                discontinued: false,
                remarks: '',
                description: 'Soft drinks, coffees, teas, beers, and ales'
            },
            {
                productId: 3,
                productName: 'Aniseed Syrup',
                categoryId: 2,
                categoryName: 'Condiments',
                quantity: 80,
                packageUnit: '12 - 550 ml bottles',
                unitPrice: 10,
                amount: 100 * 18,
                shippingId: 1,
                discontinued: false,
                remarks: '',
                description: ''
            },
            {
                productId: 4,
                productName: 'Chef Anton\'s Gumbo Mix',
                categoryId: 2,
                categoryName: 'Condiments',
                quantity: 125,
                packageUnit: '36 boxes',
                unitPrice: 21.35,
                amount: 125 * 21.35,
                shippingId: 2,
                discontinued: false,
                remarks: '',
                description: ''
            },
            {
                productId: 5,
                productName: 'Uncle Bob\'s Organic Dried Pears',
                categoryId: 7,
                categoryName: 'Produce',
                quantity: 60,
                packageUnit: '12 - 1 lb pkgs',
                unitPrice: 30,
                amount: 30 * 60,
                shippingId: 2,
                discontinued: false,
                remarks: '',
                description: 'Dried fruit and bean curd'
            },
            {
                productId: 6,
                productName: 'Mishi Kobe Niku',
                categoryId: 6,
                categoryName: 'Meat/Poultry',
                quantity: 25,
                packageUnit: '18 - 500 g pkgs',
                unitPrice: 97,
                amount: 25 * 97,
                shippingId: 4,
                discontinued: true,
                remarks: '',
                description: 'Prepared meats'
            },
            {
                productId: 7,
                productName: 'Ikura',
                categoryId: 8,
                categoryName: 'Seafood',
                quantity: 60,
                packageUnit: '12 - 200 ml jars',
                unitPrice: 31,
                amount: 60 * 31,
                shippingId: 4,
                discontinued: false,
                remarks: '',
                description: 'Seaweed and fish'
            },
            {
                productId: 8,
                productName: 'Queso Cabrales',
                categoryId: 4,
                categoryName: 'Dairy Products',
                quantity: 90,
                packageUnit: '1 kg pkg',
                unitPrice: 21,
                amount: 90 * 21,
                shippingId: 5,
                discontinued: false,
                remarks: '',
                description: 'Cheeses'
            }
        ]
    }
    generateLayoutDef(): Line[] {
        return [
            {
                colspan: 3,
                cells: [
                    { binding: 'productId', header: 'Product ID', width: 90 },
                    { binding: 'categoryId', header: 'Category ID', width: 90 },
                    { binding: 'categoryName', header: 'Category', width: 90 },
                    { binding: 'productName', header: 'Product Name', colspan: 3 }
                ]
            },
            {
                cells: [
                    { binding: 'quantity', header: 'Quantity', width: 140 },
                    { binding: 'packageUnit', header: 'Package Unit', width: 140 }
                ]
            },
            {
                cells: [
                    { binding: 'unitPrice', header: 'Unit Price', format: 'c2', width: 80 }
                ]
            },
            {
                cells: [
                    { binding: 'amount', header: 'Amount', isReadOnly: true, format: 'c2', width: 80 }
                ]
            },
            {
                cells: [
                    { binding: 'shippingId', header: 'Shipping ID', width: 100 },
                    { binding: 'discontinued', header: 'Discontinued', width: 100 }
                ]
            },
            {
                cells: [
                    { binding: 'remarks', header: 'Remarks', width: 280 },
                    { binding: 'description', header: 'Product Description', width: 280 }
                ]
            }
        ];
    }
}