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
            customCellContent: false
        });
    }
    //
    export2() {
        gridPdf.FlexGridPdfConverter.export(this.flexGrid, 'FlexGrid.pdf', {
            customCellContent: true
        });
    }
    //
    export3() {
        gridPdf.FlexGridPdfConverter.export(this.flexGrid, 'FlexGrid.pdf', {
            customCellContent: false,
            formatItem: this.formatCountryCell
        });
    }
    //
    private formatCountryCell(args: gridPdf.PdfFormatItemEventArgs) {
        // if this is a regular grid cell...
        if (args.panel.cellType === grid.CellType.Cell) {
            // ... that belongs to the 'country' column
            if (args.panel.columns[args.col].binding === 'country') {
                let
                    // get cell with custom content produced by a cell template or grid.formatItem handler
                    cell = args.getFormattedCell(),
                    // bound rectangle of cell's content area
                    contentRect = args.contentRect,
                    // construct flag image url based on country name passed in args.data 
                    image = args.canvas.openImage(`resources/${args.data}.png`),
                    imageTop = contentRect.top + (contentRect.height - image.height) / 2;

                // draw flag image
                args.canvas.drawImage(image, contentRect.left, imageTop);
                // Draw custom cell text retrieved using the cell.textContent property,
                // right to the image and in the args.textTop vertical position. The latter
                // works because we draw text using default cell font.
                args.canvas.drawText(cell.textContent.trim(), contentRect.left + image.width + 3, args.textTop);
                // cancel standard cell content drawing
                args.cancel = true;
            }
        }
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