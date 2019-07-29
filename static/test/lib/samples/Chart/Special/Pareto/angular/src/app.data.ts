import { Injectable } from '@angular/core';
import * as wijmo from '@grapecity/wijmo';
//
export type TDataItem = {
    make: string;
    sales: number;
    cumSales?: number;
}
//
@Injectable()
export class DataService {
    getData() {
        // some raw data
        let data: TDataItem[] = [
            { make: 'Vokswagen', sales: 2532435 },
            { make: 'Toyota', sales: 2338453 },
            { make: 'Renault-Nissan', sales: 2336543 },
            { make: 'GM', sales: 2252543 },
            { make: 'Hyundai-Kia', sales: 1553547 },
            { make: 'Ford', sales: 1521153 },
            { make: 'Suzuki', sales: 739123 },
            { make: 'PSA', sales: 682121 },
            { make: 'Daimler', sales: 440234 },
            { make: 'BMW Group', sales: 586121 },
            { make: 'Geely', sales: 410353 },
            { make: 'Mazda', sales: 389243 },
            { make: 'Chang\'an', sales: 389323 },
            { make: 'Subaru', sales: 230221 },
            { make: 'Tata Group', sales: 242123 }
        ];
        //
        // created sorted view
        let view = new wijmo.CollectionView(data);
        view.sortDescriptions.push(new wijmo.SortDescription('sales', false));
        //
        // add cumulative sales
        this._updateCumSales(view);
        //
        // update cumulative sales when the data changes
        view.collectionChanged.addHandler(() => this._updateCumSales(view));
        //
        // done
        return view;
    }
    //
    // update cumulative sales
    private _updateCumSales(view: wijmo.CollectionView) {
        let totalSales = view.getAggregate(wijmo.Aggregate.Sum, 'sales'),
            cumSales = 0;
        //
        view.items.forEach((item) => {
            cumSales += item.sales;
            item.cumSales = cumSales / totalSales;
        });
    }
}