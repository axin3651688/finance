import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridSheetModule } from '@grapecity/wijmo.angular2.grid.sheet';
import * as wjcGrid from '@grapecity/wijmo.grid';
import * as wjcSheet from '@grapecity/wijmo.grid.sheet';

@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    initializeFlexSheet(flex: wjcSheet.FlexSheet) {
        flex.deferUpdate(() => {
            let colIdx: number,
                rowIdx: number;

            for (colIdx = 0; colIdx < flex.columns.length; colIdx++) {
                for (rowIdx = 0; rowIdx < flex.rows.length; rowIdx++) {
                    flex.setCellData(rowIdx, colIdx, colIdx + rowIdx);
                }
            }
            flex.applyCellsStyle({ fontWeight: 'bold' }, [new wjcGrid.CellRange(0, 0, 5, 0),
                new wjcGrid.CellRange(6, 1, 11, 1)]);
            flex.applyCellsStyle({ textDecoration: 'underline' }, [new wjcGrid.CellRange(0, 2, 5, 2),
                new wjcGrid.CellRange(6, 3, 11, 3)]);
            flex.applyCellsStyle({ fontStyle: 'italic' }, [new wjcGrid.CellRange(0, 4, 5, 4),
                new wjcGrid.CellRange(6, 5, 11, 5)]);
            flex.applyCellsStyle({ format: 'c2' }, [new wjcGrid.CellRange(0, 0, 5, 7)]);
            flex.applyCellsStyle({ backgroundColor: '#4488CC' }, [new wjcGrid.CellRange(0, 0, 11, 0),
                new wjcGrid.CellRange(0, 2, 11, 2), new wjcGrid.CellRange(0, 4, 11, 4)]);
            flex.applyCellsStyle({ color: '#CC8844' }, [new wjcGrid.CellRange(0, 1, 11, 1),
                new wjcGrid.CellRange(0, 3, 11, 3), new wjcGrid.CellRange(0, 5, 11, 5)]);
            flex.applyCellsStyle({ color: '#336699' }, [new wjcGrid.CellRange(0, 6, 5, 7)]);
            flex.applyCellsStyle({ backgroundColor: '#996633' }, [new wjcGrid.CellRange(6, 6, 11, 7)]);
        });
    }
}

@NgModule({
  imports: [WjGridSheetModule, BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

