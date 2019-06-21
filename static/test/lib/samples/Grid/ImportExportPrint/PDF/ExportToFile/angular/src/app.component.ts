import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as grid from '@grapecity/wijmo.grid';
import * as pdf from '@grapecity/wijmo.pdf';
import * as gridPdf from '@grapecity/wijmo.grid.pdf';
//
import { AfterViewInit, Component, Inject, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { DataService } from './app.data';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent implements AfterViewInit {
    // Reference enumerations to use them in markup.
    ScaleModeEnum = gridPdf.ScaleMode;
    PdfPageOrientationEnum = pdf.PdfPageOrientation;
    ExportModeEnum = gridPdf.ExportMode;
    //
    scaleMode = gridPdf.ScaleMode.ActualSize;
    orientation = pdf.PdfPageOrientation.Portrait;
    exportMode = gridPdf.ExportMode.All;
    //
    data: any[];
    @ViewChild('flexGrid') flexGrid: grid.FlexGrid;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData(25);
    }
    //
    export() {
        gridPdf.FlexGridPdfConverter.export(this.flexGrid, 'FlexGrid.pdf', {
            maxPages: 10,
            exportMode: this.exportMode,
            scaleMode: this.scaleMode,
            documentOptions: {
                pageSettings: {
                    layout: this.orientation
                },
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
        });
    }
    //
    ngAfterViewInit() {
        if (this.flexGrid) {
            this._applyGroupBy(this.flexGrid);
        }
    }
    //
    private _applyGroupBy(flexGrid: grid.FlexGrid) {
        let groupNames = ['Product', 'Country', 'Amount'];
        //
        // get the collection view, start update
        let cv = flexGrid.collectionView;
        cv.beginUpdate();
        //
        // clear existing groups
        cv.groupDescriptions.clear();
        //
        // add new groups
        for (let i = 0; i < groupNames.length; i++) {
            let propName = groupNames[i].toLowerCase();
            //
            if (propName == 'amount') {
                // group amounts in ranges
                // (could use the mapping function to group countries into continents, 
                // names into initials, etc)
                let groupDesc = new wijmo.PropertyGroupDescription(propName, (item: any, prop: string) => {
                    let value = item[prop];
                    if (value > 1000) return 'Large Amounts';
                    if (value > 100) return 'Medium Amounts';
                    if (value > 0) return 'Small Amounts';
                    return 'Negative';
                });
                //
                cv.groupDescriptions.push(groupDesc);
            } else {
                if (propName) {
                    // group other properties by their specific values
                    let groupDesc = new wijmo.PropertyGroupDescription(propName);
                    cv.groupDescriptions.push(groupDesc);
                }
            }
        }
        //
        // done updating
        cv.endUpdate();
    }
}
//
@NgModule({
    imports: [WjInputModule, WjGridModule, BrowserModule],
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