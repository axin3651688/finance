import { Injectable } from '@angular/core';
import * as wjGrid from '@grapecity/wijmo.grid';

export interface PurchaseSlip {
    productId: string;
    productName: string;
    color: string;
    packageUnit: number;
    size: string;
    case: number;
    quantity: number;
    deal: string;
    id: string;
    unitCost: number;
    cost: number;
    price: number;
    remarks: string;
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
}


@Injectable()
export class DataService {
    getPurchaseSlip(): PurchaseSlip[] {
        return [
            {
                productId: 'DC0001',
                productName: 'Chai',
                color: 'Red',
                packageUnit: 12,
                size: '40*30*20',
                case: 1,
                quantity: 15,
                deal: '',
                id: '',
                unitCost: 200,
                cost: 15 * 200,
                price: 15 * 200 * 1.35,
                remarks: ''
            },
            {
                productId: 'DC0002',
                productName: 'Chang',
                color: 'Blue',
                packageUnit: 16,
                size: '25*35*25',
                case: 0,
                quantity: 10,
                deal: '',
                id: '',
                unitCost: 180,
                cost: 10 * 180,
                price: 10 * 180 * 1.35,
                remarks: ''
            },
            {
                productId: 'DC0003',
                productName: 'Aniseed Syrup',
                color: 'Green',
                packageUnit: 10,
                size: '50*40*40',
                case: 2,
                quantity: 12,
                deal: '',
                id: '',
                unitCost: 150,
                cost: 12 * 150,
                price: 12 * 150 * 1.35,
                remarks: ''
            },
            {
                productId: 'DC0004',
                productName: 'Chef Anton\'s Gumbo Mix',
                color: 'Yellow',
                packageUnit: 24,
                size: '30*40*40',
                case: 1,
                quantity: 8,
                deal: '',
                id: '',
                unitCost: 220,
                cost: 8 * 220,
                price: 8 * 220 * 1.35,
                remarks: ''
            },
            {
                productId: 'DC0005',
                productName: 'Ikura',
                color: 'Black',
                packageUnit: 15,
                size: '20*20*30',
                case: 0,
                quantity: 5,
                deal: '',
                id: '',
                unitCost: 300,
                cost: 5 * 300,
                price: 5 * 300 * 1.35,
                remarks: ''
            },
            {
                productId: 'DC0006',
                productName: 'Mishi Kobe Niku',
                color: 'White',
                packageUnit: 18,
                size: '25*20*30',
                case: 0,
                quantity: 6,
                deal: '',
                id: '',
                unitCost: 360,
                cost: 8 * 360,
                price: 8 * 360 * 1.35,
                remarks: ''
            }
        ];
    }

    generateLayoutDef(): Line[] {
        let caseDataMap = buildDataMap('small,medium,large'.split(','));

        return [
            {
                cells: [
                    { binding: 'productName', header: 'Product Name', align: 'center', width: 200 }
                ]
            },
            {
                cells: [
                    { binding: 'productId', header: 'Product ID', width: 90 }
                ]
            },
            {
                cells: [
                    { binding: 'color', header: 'Color', align: 'center' },
                    { binding: 'packageUnit', header: 'Package Unit', align: 'center' }
                ]
            },
            {
                cells: [
                    { binding: 'size', header: 'Size', width: 80 },
                    { binding: 'case', header: 'Case', dataMap: caseDataMap, width: 80 }
                ]
            },
            {
                cells: [
                    { binding: 'quantity', header: 'Quantity', width: 65 }
                ]
            },
            {
                cells: [
                    { binding: 'deal', header: 'Deal', width: 60 },
                    { binding: 'id', header: 'ID', width: 60 }
                ]
            },
            {
                cells: [
                    { binding: 'unitCost', header: 'Unit Cost', width: 130, format: 'c2' }
                ]
            },
            {
                cells: [
                    { binding: 'cost', header: 'Cost', width: 90, format: 'c2', isReadOnly: true }
                ]
            },
            {
                cells: [
                    { binding: 'price', header: 'Price', width: 90, format: 'c2', isReadOnly: true }
                ]
            },
            {
                cells: [
                    { binding: 'remarks', header: 'Remarks', align: 'center' }
                ]
            }
        ];
    }
}

function buildDataMap(items: string[]) {
    let map = [];
    for (let i = 0; i < items.length; i++) {
        map.push({ key: i, value: items[i] });
    }
    return new wjGrid.DataMap(map, 'key', 'value');
}