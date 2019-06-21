import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import * as wjcGrid from '@grapecity/wijmo.grid';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
//
@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];

    constructor() {
        this.data = this._getData();
    }

    initializeGrid(flex: wjcGrid.FlexGrid) {
        flex.formatItem.addHandler((s: any, e: wjcGrid.FormatItemEventArgs) => {
            if (e.panel == s.cells) {
                var item = s.rows[e.row].dataItem;
                switch (s.columns[e.col].binding) {
                    case 'rating':
                        this._formatRatingCell(e.cell, item.rating);
                    break;
                    case 'attendance':
                        this._formatAttendanceCell(e.cell, item.attendance);
                    break;
                    case 'revenue':
                        this._formatRevenueCell(e.cell, item.revenue);
                    break;
                }
            }
        });
    }

    private _formatRatingCell(cell: HTMLElement, rating: number) {
        let html = '<div aria-label="rating:' + rating + ' stars">';
        for (let i = 0; i < rating; i++) {
            html += '<span class="glyphicon glyphicon-star"></span>';
        }
        html += '</div>';
        cell.innerHTML = html;
    }
    private _formatAttendanceCell(cell: HTMLElement, data: number[]) {
        cell.innerHTML = this._getSparklines(data)
    }
    private _formatRevenueCell(cell: HTMLElement, data: number[]) {
        cell.innerHTML = this._getSparkbars(data)
    }

    // generate sparklines as SVG
    private _getSparklines(data: number[]) {
        let svg = '',
            min = Math.min.apply(Math, data),
            max = Math.max.apply(Math, data),
            x1 = 0,
            y1 = this._scaleY(data[0], min, max),
            x2, y2;
        for (let i = 1; i < data.length; i++) {
            x2 = Math.round((i) / (data.length - 1) * 100);
            y2 = this._scaleY(data[i], min, max);
            svg += '<line x1=' + x1 + '% y1=' + y1 + '% x2=' + x2 + '% y2=' + y2 + '% />';
            x1 = x2;
            y1 = y2;
        }
        return this._wrapSvg(svg, 'sparklines');
    }
    private _getSparkbars (data: number[]) {
        let svg = '',
            min = Math.min.apply(Math, data),
            max = Math.max.apply(Math, data),
            base = Math.min(max, Math.max(min, 0)),
            basey = this._scaleY(base, min, max),
            w = Math.round(100 / data.length) - 2,
            x, y;
        for (let i = 0; i < data.length; i++) {
            x = i * Math.round(100 / data.length) + 1;
            y = this._scaleY(data[i], min, max);
            svg += '<rect x=' + x + '% width=' + w + '% y=' + Math.min(y, basey) + '% height=' + Math.abs(y - basey) + '% />';
        }
        svg += '<rect x=0% width=100% height=1 y=' + basey + '% opacity=.5 />';
        return this._wrapSvg(svg, 'sparkbars');
    }
    private _scaleY(value: number, min: number, max: number) {
        return 100 - Math.round((value - min) / (max - min) * 100);
    }
    private _wrapSvg(svg: string, title: string) {
        return '<div aria-label="' + title + '" ' +
            'style="width:100%;height:100%;box-sizing:border-box;padding:4px">' +
            '<svg width="100%" height="100%" style="stroke:currentColor;"><g>' +
            svg +
            '</g></svg></div>';
    }

    private _getData() {
        return [
            { rank: 1, title: 'The Wizard of Oz', rating: 4, attendance: this._getArr(40), revenue: this._getArr(20) },
            { rank: 2, title: 'Citizen Kane', rating: 5, attendance: this._getArr(40), revenue: this._getArr(20) },
            { rank: 3, title: 'The Godfather', rating: 5, attendance: this._getArr(40), revenue: this._getArr(20) },
            { rank: 4, title: 'Metropolis', rating: 4, attendance: this._getArr(40), revenue: this._getArr(20) },
            { rank: 5, title: 'Singing\' in the Rain', rating: 2, attendance: this._getArr(40), revenue: this._getArr(20) },
            { rank: 6, title: 'Casablanca', rating: 3, attendance: this._getArr(40), revenue: this._getArr(20) },
            { rank: 7, title: 'Alien', rating: 5, attendance: this._getArr(40), revenue: this._getArr(20) },
            { rank: 8, title: 'Vertigo', rating: 2, attendance: this._getArr(40), revenue: this._getArr(20) },
            { rank: 9, title: 'Gone with the Wind', rating: 4, attendance: this._getArr(40), revenue: this._getArr(20) },
            { rank: 10, title: 'Chinatown', rating: 2, attendance: this._getArr(40), revenue: this._getArr(20) }
        ]
    }

    private _getArr(len: number) {
        let arr = [];
        for (let i = 0; i < len; i++) {
            arr.push(Math.round(Math.random() * 100));
        }
        return arr;
    }

}
//
@NgModule({
  imports: [WjGridModule, BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

