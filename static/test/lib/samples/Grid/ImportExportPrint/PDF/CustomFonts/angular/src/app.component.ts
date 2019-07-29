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
            embeddedFonts: [
                {
                    source: 'resources/fira/FiraSans-Regular.ttf',
                    name: 'fira',
                    style: 'normal',
                    weight: 'normal',
                    sansSerif: true
                },
                {
                    source: 'resources/fira/FiraSans-Bold.ttf',
                    name: 'fira',
                    style: 'normal',
                    weight: 'bold',
                    sansSerif: true
                }
            ],
            styles: {
                cellStyle: {
                    backgroundColor: '#ffffff',
                    borderColor: '#c6c6c6',
                    font: {
                        family: 'fira'
                    }
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