import { Injectable } from '@angular/core';

import * as wjCore from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';

export interface SalesSlip {
    id: number;
    productId: string;
    productName: string;
    quantity: number;
    profitUnitPrice: number;
    unitPrice: number;
    totalProfit: number;
    salesAmount: number;
    profitRate: number;
    unit: string;
    marker: string;
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
    getSalesSlip(count: number): SalesSlip[] {
        let salseSlip = [];
        for (let i = 0; i < count; i++) {
            let product = products[Math.floor(Math.random() * 6)],
                quantity = randBetween(10, 50),
                profitUnitPrice = product.profitUnitPrice * 10,
                unitPrice = product.unitPrice * 10,
                salesAmount = unitPrice * quantity,
                totalProfit = profitUnitPrice * quantity;
            salseSlip[i] = {
                id: i + 1,
                productId: product.id,
                productName: product.name,
                quantity: quantity,
                profitUnitPrice: profitUnitPrice,
                unitPrice: unitPrice,
                totalProfit: totalProfit,
                salesAmount: salesAmount,
                profitRate: totalProfit / salesAmount,
                unit: 'box',
                marker: ''
            }
        }

        return salseSlip;
    }

    generateLayoutDef(): Line[] {
        return [
            {
                cells: [
                    { binding: 'id', header: 'No.', width: 60 }
                ]
            },
            {
                colspan: 5,
                cells: [
                    { binding: 'productId', header: 'Product ID', width: 80 },
                    { binding: 'productName', header: 'Product Name', colspan: 3 },
                    { binding: 'marker', header: 'Marker', align: 'center' },
                    { binding: 'quantity', header: 'Quantity', width: 80, align: 'right' },
                    { binding: 'unit', header: 'Unit' },
                    { binding: 'unitPrice', header: 'Unit Price', format: 'c2', colspan: 2 },
                    { binding: 'salesAmount', header: 'Sales Amount', format: 'c2', isReadOnly: true },
                    { binding: 'profitUnitPrice', header: 'Profit Unit Price', format: 'c2', colspan: 2 },
                    { binding: 'totalProfit', header: 'Total Profit', format: 'c2', colspan: 2, isReadOnly: true, cssClass: 'profit-cell' },
                    { binding: 'profitRate', header: 'Profit Rate', format: 'p2', isReadOnly: true, cssClass: 'profit-cell' }
                ]
            }
        ];
    }
}
