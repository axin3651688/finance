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
                header: 'Parent 1', items: [
                    { header: 'Child 1.1' },
                    { header: 'Child 1.2' },
                    { header: 'Child 1.3' }]
            },
            {
                header: 'Parent 2', items: [
                    { header: 'Child 2.1' },
                    { header: 'Child 2.2' }]
            },
            {
                header: 'Parent 3', items: [
                    { header: 'Child 3.1' }]
            }
        ];
    }

    getOptions(): string[] {
        return 'allowDragging,autoCollapse,expandOnClick,isAnimated,isReadOnly,showCheckboxes'.split(',');
    }
}