import { Injectable } from '@angular/core';
//
export class TreeItem {
    header: string;
    reload?: boolean;
    items?: TreeItem[] | any[]
}
//
@Injectable()
export class DataService {
    getData(): TreeItem[] {
        return [
            { header: 'Electronics <i>(reload when opening)</i>', items: [], reload: true },
            { header: 'Toys <i>(load once)</i>', items: [] },
            { header: 'Home <i>(load once)</i>', items: [] }
        ];
    }
}