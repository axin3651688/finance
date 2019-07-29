import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridSheetModule } from '@grapecity/wijmo.angular2.grid.sheet';
import * as wjcSheet from '@grapecity/wijmo.grid.sheet';

@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    initializeFlexSheet(flex: wjcSheet.FlexSheet) {
        flex.addFunction('customSumProduct', (...params: any[][][]) => {
            let result = 0,
                range1 = params[0],
                range2 = params[1];
    
            if (range1.length > 0 && range1.length === range2.length && range1[0].length === range2[0].length) {
                for (let i = 0; i < range1.length; i++) {
                    for (let j = 0; j < range1[0].length; j++) {
                        result += range1[i][j] * range2[i][j];
                    }
                }
            }
            return result;
        }, 'Custom SumProduct Function', 2, 2);
    
        flex.unknownFunction.addHandler((sender, e: wjcSheet.UnknownFunctionEventArgs) => {
            let result = '';
            if (e.params) {
                for (let i = 0; i < e.params.length; i++) {
                    result += e.params[i];
                }
            }
            e.value = result;
        });
    
        flex.deferUpdate(() => {
            for (let i = flex.sheets.length - 1; i >= 0; i--) {
                flex.sheets.selectedIndex = i;
                switch (flex.sheets[i].name) {
                    case 'Custom Function':
                        flex.setCellData(0, 0, '=customSumProduct(Data!A1:B5, Data!B1:C5)');
                        flex.setCellData(1, 0, '=customFunc(1, "B", 3)');
                        break;
                    case 'Data':
                        for (let ri = 0; ri < flex.rows.length; ri++) {
                            for (let ci = 0; ci < 3; ci++) {
                                flex.setCellData(ri, ci, ri + ci);
                            }
                        }
                        break;
                }
            }
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

