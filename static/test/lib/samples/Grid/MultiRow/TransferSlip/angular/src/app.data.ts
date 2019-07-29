import { Injectable } from '@angular/core';
import * as wjGrid from '@grapecity/wijmo.grid';

export interface SlipData {
    items: SlipDataItem[];
    date: Date;
    slipNo: string;
    settlement: string;
}
export interface SlipDataItem {
    debtorAcc: number;
    debtorType: number;
    debtorAmt: number;
    debtorTax: number;
    creditorAcc: number;
    creditorType: number;
    creditorAmt: number;
    creditorTax: number;
    brief: string;
    note: string;
    debtorTaxCategrory: string;
    creditorTaxCategory: string;
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
    generateSlipData(count: number): SlipData {
        let slipData: any = {},
            items = [];

        for (let i = 0; i < count; i++) {
            let debtorAcc = Math.floor(5 * Math.random());
            let debtorType = 0;
            let debtorAmt = Math.round(10000 * Math.random());
            let creditorAcc = Math.floor(4 * Math.random());
            let creditorType = Math.floor(4 * Math.random());
            let creditorAmt = Math.round(10000 * Math.random());

            items.push({
                debtorAcc: debtorAcc,
                debtorType: debtorType,
                debtorAmt: debtorAmt,
                debtorTax: debtorAmt * 0.09,
                creditorAcc: creditorAcc,
                creditorType: creditorType,
                creditorAmt: creditorAmt,
                creditorTax: creditorAmt * 0.09,
                brief: '',
                note: '',
                debtorTaxCategrory: '',
                creditorTaxCategory: ''
            });
        }

        slipData.items = items;
        slipData.date = new Date();
        slipData.slipNo = 's128';
        slipData.settlement = 'Normal';

        return slipData;
    }

    generateLayoutDef(): Line[] {
        let debtorAccDataMap = buildDataMap('Saralies,Transport,Entertainment,Supplies,Fees'.split(',')),
            debtorTypeDataMap = buildDataMap(['(none)']),
            creditorAccDataMap = buildDataMap('Ordinary deposit,Deposits payable,Advance money,Accounts payable'.split(',')),
            creditorTypeDataMap = buildDataMap('Grape bank,Orange bank,Apple bank,Grape card'.split(','));

        return [
            {
                cells: [
                    { binding: 'debtorAcc', width: 125, header: 'Debtor Account', dataMap: debtorAccDataMap, align: 'center' },
                    { binding: 'debtorType', width: 125, header: 'Debtor Type', dataMap: debtorTypeDataMap, align: 'center' }
                ]
            },
            {
                cells: [
                    { binding: 'debtorAmt', width: 125, format: 'c2', header: 'Debtor Amount', align: 'center' },
                    { binding: 'debtorTax', width: 125, format: 'c2', header: 'Debtor Tax', align: 'center', isReadOnly: true }
                ]
            },
            {
                cells: [
                    { binding: 'creditorAcc', width: 125, header: 'Creditor Account', dataMap: creditorAccDataMap, align: 'center' },
                    { binding: 'creditorType', width: 125, header: 'Creditor Type', dataMap: creditorTypeDataMap, align: 'center' }
                ]
            },
            {

                cells: [
                    { binding: 'creditorAmt', width: 125, format: 'c2', header: 'Creditor Amount', align: 'center' },
                    { binding: 'creditorTax', width: 125, format: 'c2', header: 'Creditor Tax', align: 'center', isReadOnly: true }
                ]
            },
            {
                cells: [
                    { binding: 'brief', width: 210, header: 'Brief', align: 'center' },
                    { binding: 'note', width: 210, header: 'Note', align: 'center' }
                ]
            },
            {
                cells: [
                    { binding: 'debtorTaxCategrory', width: 230, header: 'Debtor Tax Category', align: 'center' },
                    { binding: 'creditorTaxCategory', width: 230, header: 'Creditor Tax Categoty', align: 'center' }
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