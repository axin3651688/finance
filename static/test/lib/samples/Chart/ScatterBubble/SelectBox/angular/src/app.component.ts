import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjChart from '@grapecity/wijmo.chart';
import * as wjCore from '@grapecity/wijmo';
//
import { Component, Inject, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { DataService } from './app.data';
//
const wjSelected: string = 'wj-state-selected';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    @ViewChild('flexChart') chart: wjChart.FlexChart;
    series1: any[];
    series2: any[];
    series3: any[];
    private _rendered: boolean = false;
    private _selections: {
        series: wjChart.SeriesBase,
        pointIndex: number;
    }[] = [];
    private _mouseDown: boolean = false;
    private _start: wjCore.Point = null;
    private _end: wjCore.Point = null;
    private _selector: HTMLElement = null;
    private _offset: wjCore.Rect = null;
    private _mousePt: wjCore.Point = null;
    private _isTouch: boolean = false;
    private _items: {
        series: wjChart.SeriesBase,
        pointIndex: number;
    }[] = [];
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.series1 = dataService.getData(50, 0, 3);
        this.series2 = dataService.getData(40, 100, 12);
        this.series3 = dataService.getData(30, -100, 24);
    }
    //
    renderedEventHandler(flexChart: wjChart.FlexChart) {
        if (!this._rendered) {
            flexChart.hostElement.addEventListener('mousedown', this._chartMouseDown.bind(this));
            flexChart.hostElement.addEventListener('mousemove', this._chartMouseMove.bind(this));
            flexChart.hostElement.addEventListener('mouseup', this._chartMouseUp.bind(this));
            flexChart.hostElement.addEventListener('mouseleave', this._chartMouseLeave.bind(this));
            flexChart.hostElement.addEventListener('click', this._chartClick.bind(this));
            window.addEventListener('touchstart', () => this._isTouch = true, false);
            //
            // boolean flag - don't re-add event listener after resize
            this._rendered = true;
            //
            this._selector = document.querySelector('#plotSelection');
            flexChart.hostElement.appendChild(this._selector);
        } else {
            // *visually* restore selection after redraw (ex. resize browser, change chart type)
            this._restoreSelection();
        }
    }
    //
    // helper for clearing chart selection
    private _clearSelection() {
        this._selections.forEach(item => {
            let series = item.series,
                el = series.getPlotElement(item.pointIndex);
            //
            if (el) {
                wjCore.removeClass(el, wjSelected);
            }
        });
        //
        this._selections.length = 0;
    }
    //
    // helper for adding chart selection
    private _addSelection(ht: any) {
        wjCore.addClass(ht.series.getPlotElement(ht.pointIndex), wjSelected);
        this._selections.push({
            series: ht.series,
            pointIndex: ht.pointIndex
        });
    }
    //
    // helper for removing chart selection
    private _removeSelection(ht: any) {
        let items = this._selections.filter(item => item.series === ht.series && item.pointIndex === ht.pointIndex),
            idx = items && items.length > 0 ? this._selections.indexOf(items[0]) : -1;
        //
        if (idx >= 0) {
            this._selections.splice(idx, 1);
            wjCore.removeClass(ht.series.getPlotElement(ht.pointIndex), wjSelected);
        }
    }
    //
    // finds selected plot elements after rendering and applies CSS to visually represent selection
    private _restoreSelection() {
        this._selections.forEach(item => {
            let series = item.series,
                el = series.getPlotElement(item.pointIndex);
            //
            if (el) {
                wjCore.addClass(el, wjSelected);
            }
        });
    }
    //
    // helper to hide the selector
    private _hideSelector() {
        wjCore.setCss(this._selector, {
            'visibility': 'hidden',
            'width': 0,
            'height': 0,
            'left': 0,
            'top': 0
        });
    }
    //
    // selects plot elements within drawn rectangle
    private _selectWithinRect(rect: ClientRect) {
        if (!rect || !this.chart) {
            return;
        }
        //
        this.chart.series.forEach((item: wjChart.SeriesBase) => {
            let pointCount = item._getLength();
            //
            for (let j = 0; j < pointCount; j++) {
                let el = item.getPlotElement(j);
                //
                if (this._elementInBounds(el, rect)) {
                    this._addSelection({
                        series: item,
                        pointIndex: j
                    });
                }
            }
        });
    }
    //
    // helper to determine if plot element is within the bounds of the drawn rectangle
    private _elementInBounds(el: HTMLElement, rect: ClientRect) {
        let box = el.getBoundingClientRect();
        return !(box.left > rect.right || box.right < rect.left || box.top > rect.bottom || box.bottom < rect.top);
    }
    //
    // clear selection for button click
    private _clear() {
        this._clearSelection();
        // update length for view
        this._items.length = 0;
    }
    //
    private _chartClick(e: MouseEvent) {
        if (this._mouseDown && !this._isTouch) {
            this._isTouch = false;
            return;
        }
        //
        let p = wjCore.mouseToPage(e);
        if (this._mousePt.x !== p.x || this._mousePt.y !== p.y) {
            return;
        }
        //
        let element = <HTMLElement>e.target,
            ht = this.chart.hitTest(e),
            selected = false,
            chartType = this.chart.chartType;
        //
        selected = this._selections.some((item: any) => {
            return item.series === ht.series && item.pointIndex === ht.pointIndex;
        });
        //
        if (ht && ht.series && !selected && ((ht.distance <= 0 && (chartType == 0 || chartType == 1)) || ht.distance <= 15) && this._isTouch) {
            // remove selection
            if (wjCore.hasClass(element, wjSelected)) {
                this._removeSelection(ht);
            } else {
                // add selection
                this._addSelection(ht);
            }
        } else if (selected && ((ht.distance <= 0 && (chartType == 0 || chartType == 1)) || ht.distance <= 15) && this._isTouch) {
            this._removeSelection(ht);
        } else {
            this._clearSelection();
        }
        //
        this._isTouch = false;
        // update length for view
        this._items.length = 0;
        this._items.push.apply(this._items, this._selections);
    }
    //
    private _chartMouseDown(e: MouseEvent) {
        this._mousePt = wjCore.mouseToPage(e);
        this._mouseDown = true;
        e.preventDefault();
    }
    //
    private _chartMouseUp(e: MouseEvent) {
        if (this._start != null) {
            this._start = null
        }
        //
        if (this._end != null) {
            let host = this.chart.hostElement;
            this._offset = wjCore.getElementRect(host);
            let style = host.getAttribute('style');
            this._offset.left = this._offset.left + parseInt(style ? style['padding-left'].replace('px', '') : 0);
            this._offset.top = this._offset.top + parseInt(style ? style['padding-top'].replace('px', '') : 0);
            //
            this._end = this._start = null;
            //
            this._clear();
            this._selectWithinRect(this._selector.getBoundingClientRect());
            //
            // update length for view
            this._items.length = 0;
            this._items.push.apply(this._items, this._selections);
            //
            e.preventDefault();
        }
        //
        this._hideSelector();
        this._mouseDown = false;
    }
    //
    private _chartMouseMove(e: MouseEvent | TouchEvent) {
        let p = wjCore.mouseToPage(e);
        if (!this._mouseDown || (this._mousePt.x == p.x && this._mousePt.y == p.y)) {
            return;
        }
        //
        let pt = e instanceof MouseEvent ? new wjCore.Point(e.pageX, e.pageY) : new wjCore.Point(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
        //
        if (this._start != null) {
            this._end = pt;
            //
            // update selector rectangle
            let w = pt.x - this._start.x;
            let h = pt.y - this._start.y;
            //
            if (w >= 0) {
                wjCore.setCss(this._selector, {
                    'left': this._start.x - this._offset.left,
                    'width': w
                });
            } else {
                wjCore.setCss(this._selector, {
                    'left': pt.x - this._offset.left,
                    'width': -w
                });
            }
            //
            if (h >= 0) {
                wjCore.setCss(this._selector, {
                    'top': this._start.y - this._offset.top,
                    'height': h
                });
            } else {
                wjCore.setCss(this._selector, {
                    'top': pt.y - this._offset.top,
                    'height': -h
                });
            }
        } else {
            wjCore.setCss(this._selector, {
                'visibility': 'visible'
            });
            this._offset = wjCore.getElementRect(this._selector);
            //
            this._start = pt;
        }
        //
        e.preventDefault();
    }
    //
    private _chartMouseLeave(e: MouseEvent) {
        if (this._start) {
            this._start = this._end = null;
            this._mouseDown = false;
            this._hideSelector();
        }
    }
}
//
@NgModule({
    imports: [WjChartModule, BrowserModule],
    declarations: [AppComponent],
    providers: [DataService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);