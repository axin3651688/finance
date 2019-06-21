import { Injectable } from '@angular/core';


export class TreeItem {
    header: string;
    items?: TreeItem[]
}


@Injectable()
export class DataService {
    getData(): TreeItem[] {
        return [
            {
                header: 'root 1', items: [
                    { header: 'Item 1.1' },
                    { header: 'Item 1.2' },
                    { header: 'Item 1.3' }]
            }
        ];
    }

    getAnotherData(): TreeItem[] {
        return [
            {
                header: 'root 2', items: [
                    { header: 'Item 2.1' },
                    { header: 'Item 2.2' },
                    { header: 'Item 2.3' }]
            }
        ]
    }
}