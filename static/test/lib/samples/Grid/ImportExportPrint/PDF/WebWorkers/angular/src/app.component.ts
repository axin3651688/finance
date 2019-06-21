import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as chart from '@grapecity/wijmo.chart';
import '@grapecity/wijmo.chart.render';
import * as grid from '@grapecity/wijmo.grid';
import * as pdf from '@grapecity/wijmo.pdf';
import * as gridPdf from '@grapecity/wijmo.grid.pdf';
//
import { Component, Inject, enableProdMode, NgModule, OnDestroy, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { IExpense, DataService } from './app.data';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
//
interface IContext {
    exporting: boolean,
    progress: number,
    preparing: boolean,
    worker: Worker
}
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent implements OnDestroy {
    private readonly docName = 'FlexGrid.pdf';
    private readonly gridExportSettings: gridPdf.IFlexGridExportSettings = {
        styles: {
            cellStyle: {
                backgroundColor: '#ffffff',
                borderColor: '#c6c6c6'
            },
            altCellStyle: {
                backgroundColor: '#f9f9f9'
            },
            groupCellStyle: {
                backgroundColor: '#dddddd'
            },
            headerCellStyle: {
                backgroundColor: '#eaeaea'
            }
        }
    };
    //
    data: any[];
    totals: any;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData(1500);
        //
        this.totals = ((totals: IExpense) => [
            { name: 'Hotel', value: totals.hotel },
            { name: 'Transport', value: totals.transport },
            { name: 'Meal', value: totals.meal },
            { name: 'Fuel', value: totals.fuel },
            { name: 'Misc', value: totals.Misc }
        ])(dataService.getExpenses().totals);
    }
    //
    //
    @ViewChild('flexGrid') flexGrid: grid.FlexGrid;
    ctx1: IContext = {
        exporting: false,
        progress: 0,
        preparing: false,
        worker: null
    };
    //
    export1(ctx: IContext) {
        if (!ctx.exporting) {
            this.start(ctx, './export-grid', () => {
                gridPdf.PdfWebWorkerClient.exportGrid(ctx.worker, this.flexGrid, this.docName, this.gridExportSettings, null, (progress: number) => {
                    this.progress(ctx, progress);
                });
            });
        } else {
            this.cancel(ctx);
        }
    }
    //
    //
    @ViewChild('flexGrid2') flexGrid2: grid.FlexGrid;
    @ViewChild('flexPie') flexPie: chart.FlexPie;
    ctx2: IContext = {
        exporting: false,
        progress: 0,
        preparing: false,
        worker: null
    };
    //
    export2(ctx: IContext) {
        if (!ctx.exporting) {
            this.start(ctx, './export', () => {
                gridPdf.PdfWebWorkerClient.addString(ctx.worker, 'Title', 'title');
                gridPdf.PdfWebWorkerClient.addImage(ctx.worker, 'resources/canada.png', 'flag', null);
                this.flexPie.saveImageToDataUrl(chart.ImageFormat.Svg, (url: string) => {
                    gridPdf.PdfWebWorkerClient.addImage(ctx.worker, url, 'chart', null);
                });
                gridPdf.PdfWebWorkerClient.addGrid(ctx.worker, this.flexGrid2, 'grid', this.gridExportSettings);
                //
                gridPdf.PdfWebWorkerClient.export(ctx.worker, null,
                    (data: gridPdf.PdfWebWorkerExportDoneEventArgs) => pdf.saveBlob(data.blob, this.docName),
                    (progress: number) => this.progress(ctx, progress)
                );
            });
        } else {
            this.cancel(ctx);
        }
    }
    //
    //
    @ViewChild('flexGrid3') flexGrid3: grid.FlexGrid;
    ctx3: IContext = {
        exporting: false,
        progress: 0,
        preparing: false,
        worker: null
    };
    //
    export3(ctx: IContext) {
        if (!ctx.exporting) {
            this.start(ctx, './api', () => {
                ctx.worker.addEventListener('message', (e) => {
                    if (e.data.type === 'progress') {
                        this.progress(ctx, e.data.value);
                    } else {
                        pdf.saveBlob(new Blob([new Uint8Array(e.data.data)], { type: 'application/pdf' }), this.docName);
                    }
                });
                //
                var gridData = gridPdf.PdfWebWorkerClient.serializeGrid(this.flexGrid3, this.gridExportSettings);
                // Send gridData as a tranferable object
                ctx.worker.postMessage({ grid: gridData, settings: JSON.stringify(this.gridExportSettings) }, [gridData]);
            });
        } else {
            this.cancel(ctx);
        }
    }
    //
    /**
     * Creates web worker that executes the module from the specified URL.
     * @param url The module URL, relative to the src/workers directory.
     * @param ready
     */
    private loadWorker(url: string, ready: Function) {
        let worker = new Worker('src/workers/worker-loader.js');
        //
        worker.addEventListener('message', (e) => {
            if (e.data === '#ready#') {
                ready();
            }
        });
        //
        worker.postMessage({ url: url });
        //
        return worker;
    }
    //
    private start(ctx: IContext, url: string, ready: Function) {
        ctx.preparing = true;
        ctx.progress = 0;
        ctx.worker = this.loadWorker(url, () => ready());
    }
    //
    private progress(ctx: IContext, progress: number) {
        if (progress === 0 || progress === 1) {
            ctx.preparing = false;
            ctx.exporting = progress === 0;
        }
        ctx.progress = progress;
    }
    //
    private cancel(ctx: IContext) {
        ctx.worker.terminate();
        ctx.exporting = false;
        ctx.progress = 0;
        ctx.worker = null;
    }
    //
    ngOnDestroy() {
        if (this.ctx1.worker) {
            this.ctx1.worker.terminate();
            this.ctx1.worker = null;
        }
        //
        if (this.ctx2.worker) {
            this.ctx2.worker.terminate();
            this.ctx2.worker = null;
        }
        //
        if (this.ctx3.worker) {
            this.ctx3.worker.terminate();
            this.ctx3.worker = null;
        }
    }
}
//
@NgModule({
    imports: [WjGridModule, WjChartModule, BrowserModule],
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