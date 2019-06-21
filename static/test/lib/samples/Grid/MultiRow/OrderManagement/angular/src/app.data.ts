import { Injectable } from '@angular/core';

import * as wjCore from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';

export interface Order {
    orderId: string;
    productId: string;
    productName: string;
    specialNote: string;
    quantity: number;
    unitPrice: number;
    shippingWarehouse: number;
    amount: number;
    onHold: boolean;
    orderDate: Date;
    deliveryDate: Date;
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
    dataMap?: wjGrid.DataMap;
}
export interface Line {
    cells: Cell[];
    header?: string;
    colspan?: number;
}


let products = [
    { id: 'D0001', name: 'Chai', unitPrice: 12, profitUnitPrice: 3.11 },
    { id: 'D0002', name: 'Chang', unitPrice: 8.5, profitUnitPrice: 2.03 },
    { id: 'D0003', name: 'Aniseed Syrup', unitPrice: 6.85, profitUnitPrice: 2.35 },
    { id: 'D0004', name: 'Chef Anton\'s Gumbo Mix', unitPrice: 17.25, profitUnitPrice: 3.3 },
    { id: 'D0005', name: 'Ikura', unitPrice: 20, profitUnitPrice: 2.95 },
    { id: 'D0006', name: 'Mishi Kobe Niku', unitPrice: 14, profitUnitPrice: 3 },
];

function randBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function buildDataMap(items: string[]): wjGrid.DataMap {
    let map = [];
    for (let i = 0; i < items.length; i++) {
        map.push({ key: i, value: items[i] });
    }
    return new wjGrid.DataMap(map, 'key', 'value');
}

@Injectable()
export class DataService {
    getOrders(count: number): Order[] {
        let orders = [];
        for (let i = 0; i < count; i++) {
            let product = products[Math.floor(Math.random() * 6)],
                quantity = randBetween(100, 999),
                orderDate = new Date(2016, i % 12, i % 28);
            orders[i] = {
                orderId: 'C' + wjCore.Globalize.format(i + 1, 'd4'),
                productId: product.id,
                productName: product.name,
                specialNote: '',
                quantity: quantity,
                unitPrice: product.unitPrice,
                shippingWarehouse: Math.floor(Math.random() * 4),
                amount: quantity * product.unitPrice,
                onHold: Math.random() > 0.5,
                orderDate: orderDate,
                deliveryDate: new Date(2016, orderDate.getMonth() + 1, orderDate.getDate() + 15)
            }
        }
        return orders;
    }

    generateLayoutDef(): Line[] {
        var warehouseDataMap = buildDataMap('Tokyo Warehouse, Kyoto Warehouse, Osaka Warehouse, Kyushu Warehouse'.split(','));

        return [
            {
                colspan: 3,
                cells: [
                    { binding: 'orderId', header: 'Order ID', width: 80 },
                    { binding: 'productId', header: 'Product ID', width: 80 },
                    { binding: 'productName', header: 'Product Name', width: 180 },
                    { binding: 'specialNote', header: 'Special Note', align: 'center', colspan: 3 }
                ]
            },
            {
                colspan: 3,
                cells: [
                    { binding: 'quantity', header: 'Quantity', width: 80 },
                    { binding: 'unitPrice', header: 'Unit Price', width: 80, format: 'c2' },
                    { binding: 'amount', header: 'Amount', isReadOnly: true, width: 80, format: 'c2' },
                    { binding: 'shippingWarehouse', header: 'Shipping Warehouse', dataMap: warehouseDataMap, align: 'center', colspan: 2 },
                    { binding: 'onHold', header: 'On Hold' },
                ]
            },
            {
                cells: [
                    { binding: 'orderDate', header: 'Order Date', format: 'yyyy/MM/dd' },
                    { binding: 'deliveryDate', header: 'Delivery Date', format: 'yyyy/MM/dd' }
                ]
            }
        ];
    }
}
