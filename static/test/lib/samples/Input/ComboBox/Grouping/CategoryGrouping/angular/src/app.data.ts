import { Injectable } from '@angular/core';
//
export type TDataItem = {
    header: string;
    category?: string;
}
//
@Injectable()
export class DataService {
    // get categorized list of options for the combo
    getOptions() {
        return <TDataItem[]>[
            { header: 'Colors', category: true },
            { header: 'Red' },
            { header: 'Green' },
            { header: 'Blue' },
            { header: 'White' },
            { header: 'Black' },
            { header: 'Purple' },
            { header: 'Flavors', category: true },
            { header: 'Chocolate' },
            { header: 'Vanilla' },
            { header: 'Rocky Road' },
            { header: 'Almond' },
            { header: 'Pineapple' },
            { header: 'Strawberry' },
            { header: 'Textures', category: true },
            { header: 'Smooth' },
            { header: 'Silky' },
            { header: 'Wavy' },
            { header: 'Rough' }
        ];
    }
}