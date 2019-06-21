import * as wjcGrid from '@grapecity/wijmo.grid';

import { Pipe, NgModule } from '@angular/core';


// CellRange pipe
@Pipe({
    name: 'cellRange'
})
export class CellRangePipe {
    transform(value: any, args: string[]): any {
        var rng = '';
        if (value instanceof wjcGrid.CellRange) {
            rng = '(' + value.row + ';' + value.col + ')';
            if (!value.isSingleCell) {
                rng += '-(' + value.row2 + ';' + value.col2 + ')';
            }
        }
        return rng;
    }
}
//exports
@NgModule({
    //imports: [Pipe],
    declarations: [CellRangePipe],
    exports: [CellRangePipe],
})

export class AppPipesModule {
}