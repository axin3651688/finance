import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as gridFilter from '@grapecity/wijmo.grid.filter';
//
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjGridFilterModule } from '@grapecity/wijmo.angular2.grid.filter';
import { DataService } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
        //
        // customize grid filter conditions
        let filter = wijmo.culture.FlexGridFilter,
            Operator = gridFilter.Operator;
        //
        filter.stringOperators = [
            { name: '(not set)', op: null },
            { name: 'Same', op: Operator.EQ },
            { name: 'Different', op: Operator.NE },
            { name: 'Bigger', op: Operator.GT },
            { name: 'Smaller', op: Operator.LT }
        ];
        //
        filter.numberOperators = [
            { name: '(not set)', Operator: null },
            { name: 'Same', op: Operator.EQ },
            { name: 'Different', op: Operator.NE },
            { name: 'Bigger', op: Operator.GT },
            { name: 'Smaller', op: Operator.LT }
        ];
        //
        filter.dateOperators = [
            { name: '(not set)', op: null },
            { name: 'Same', op: Operator.EQ },
            { name: 'Earlier', op: Operator.LT },
            { name: 'Later', op: Operator.GT }
        ];
        //
        filter.booleanOperators = [
            { name: '(not set)', op: null },
            { name: 'Is', op: Operator.EQ },
            { name: 'Isn\'t', op: Operator.NE }
        ];
    }
}
//
@NgModule({
    imports: [WjGridModule, WjGridFilterModule, BrowserModule],
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

