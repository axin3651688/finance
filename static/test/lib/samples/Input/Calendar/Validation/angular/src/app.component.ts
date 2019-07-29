import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';
//
import { Component, enableProdMode, NgModule, Inject } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { DataService } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    private _holidays: { [key: string]: string };
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this._holidays = dataService.getHolidays();
    }
    //
    formatItem(e: input.FormatItemEventArgs) {
        // apply styles to weekends and holidays
        let weekday = e.data.getDay(),
            holiday = this._getHoliday(e.data);
        //
        wijmo.toggleClass(e.item, 'date-weekend', weekday == 0 || weekday == 6);
        wijmo.toggleClass(e.item, 'date-holiday', holiday != null);
        e.item.title = holiday || '';
    }
    //
    validator = (date: Date) => {
        return (date.getDay() % 6 != 0) && !this._getHoliday(date);
    }
    //
    // gets the holiday for a given date
    private _getHoliday(date: Date) {
        let day = date.getDate(),
            month = date.getMonth() + 1,
            holiday = this._holidays[month + '/' + day];
        //
        if (!holiday) {
            let weekDay = date.getDay(),
                weekNum = Math.floor((day - 1) / 7) + 1;
            holiday = this._holidays[month + '/' + weekNum + '/' + weekDay];
        }
        //
        return holiday;
    }
}
//
@NgModule({
    imports: [WjInputModule, BrowserModule],
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

