import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, NgModule, AfterViewInit, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { DataService } from './app.data';
import * as wjCore from '@grapecity/wijmo';
import * as wjChart from '@grapecity/wijmo.chart';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent implements AfterViewInit {
    data: any[];
    zoom: any;
    @ViewChild('theChart') theChart: wjChart.FlexChart;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
        this.zoom = {
            ptStart: null,
            ptEnd: null,
            box: null
        };
    }
    //
    ngAfterViewInit() {
        let host = this.theChart.hostElement,
            zoom = this.zoom;
        host.addEventListener('mousedown', e => zoom.ptStart = e);
        host.addEventListener('mousemove', e => {
            if (zoom.ptStart) {
                zoom.ptEnd = e;
                this.updateZoomBox();
            }
        });
        host.addEventListener('mouseup', e => {
            this.applyZoom();
            zoom.ptStart = zoom.ptEnd = null;
            this.updateZoomBox();
        });
    }
    //
    updateZoomBox() {
        let zoom = this.zoom;
        if (!zoom.box) {
            zoom.box = wjCore.createElement('<div class="zoom-box"></div>', document.body);
        }
        if (!zoom.ptStart) {
            wjCore.setCss(zoom.box, {
                display: 'none'
            });
        } else {
            let x = Math.min(zoom.ptStart.pageX, zoom.ptEnd.pageX),
                y = Math.min(zoom.ptStart.pageY, zoom.ptEnd.pageY),
                w = Math.max(zoom.ptStart.pageX, zoom.ptEnd.pageX) - x,
                h = Math.max(zoom.ptStart.pageY, zoom.ptEnd.pageY) - y;
            //
            wjCore.setCss(zoom.box, {
                display: 'block',
                left: x,
                top: y,
                width: w,
                height: h
            });
        }
    }
    //
    applyZoom() {
        let zoom = this.zoom,
            xmin: any = null,
            ymin: any = null,
            xmax: any = null,
            ymax: any = null,
            chart = this.theChart;
        //
        // calculate custom zoom
        if (zoom.ptStart && zoom.ptEnd) {
            // get mouse position in control coordinates
            let rc = chart.hostElement.getBoundingClientRect();
            xmin = Math.min(zoom.ptStart.pageX, zoom.ptEnd.pageX) - rc.left,
                ymin = Math.min(zoom.ptStart.pageY, zoom.ptEnd.pageY) - rc.top,
                xmax = Math.max(zoom.ptStart.pageX, zoom.ptEnd.pageX) - rc.left,
                ymax = Math.max(zoom.ptStart.pageY, zoom.ptEnd.pageY) - rc.top;
            //
            // convert to chart coordinates
            let pMin = chart.pointToData(xmin, ymin),
                pMax = chart.pointToData(xmax, ymax);
            //
            xmin = Math.min(pMin.x, pMax.x);
            ymin = Math.min(pMin.y, pMax.y);
            xmax = Math.max(pMin.x, pMax.x);
            ymax = Math.max(pMin.y, pMax.y);
        }
        //
        // apply new ranges to the chart axes
        chart.deferUpdate(() => {
            chart.axisX.min = xmin;
            chart.axisY.min = ymin;
            chart.axisX.max = xmax;
            chart.axisY.max = ymax;
        });
    }
    //
    reset() {
        this.zoom.ptStart = this.zoom.ptEnd = null;
        this.updateZoomBox();
        this.applyZoom();
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

