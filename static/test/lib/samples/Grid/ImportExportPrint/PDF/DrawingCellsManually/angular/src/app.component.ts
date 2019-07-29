import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as grid from '@grapecity/wijmo.grid';
import * as gridPdf from '@grapecity/wijmo.grid.pdf';
//
import { Component, Inject, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { DataService } from './app.data';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];
    @ViewChild('flexGrid') flexGrid: grid.FlexGrid;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData(5);
    }
    //
    export() {
        gridPdf.FlexGridPdfConverter.export(this.flexGrid, 'FlexGrid.pdf', {
            maxPages: 10,
            documentOptions: {
                header: {
                    declarative: {
                        text: '\t&[Page]\\&[Pages]'
                    }
                },
                footer: {
                    declarative: {
                        text: '\t&[Page]\\&[Pages]'
                    }
                }
            },
            customCellContent: true,
            formatItem: (args: gridPdf.PdfFormatItemEventArgs) => {
                if (args.panel.cellType === grid.CellType.Cell) {
                    if (args.panel.columns[args.col].binding === 'country') {
                        let r = args.contentRect,
                            sz = args.canvas.measureText(args.data, args.style.font, {
                                height: r.height,
                                width: r.width
                            }),
                            image = args.canvas.openImage(`resources/${args.data}.png`),
                            imageTop = r.top + (r.height - image.height) / 2,
                            textTop = r.top + (r.height - sz.size.height) / 2;
                        //
                        // draw flag image
                        args.canvas.drawImage(image, r.left, imageTop);
                        //
                        // draw text
                        args.canvas.drawText(args.data, r.left + image.width + 3, textTop, {
                            brush: args.style.color,
                            font: args.style.font,
                            height: r.height,
                            width: r.width
                        });
                        //
                        // cancel standard cell content drawing
                        args.cancel = true;
                    }
                }
            }
        });
    }
}
//
@NgModule({
    imports: [WjGridModule, BrowserModule],
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