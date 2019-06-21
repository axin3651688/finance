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
    constructor(@Inject(DataService) private dataService: DataService) {
        // change InpuDate icon to a calendar instead of a down arrow (applies to all InputDate controls)
        input.InputDate.controlTemplate = '<div style="position:relative" class="wj-template">' +
            '<div class="wj-input">' +
            '<div class="wj-input-group wj-input-btn-visible">' +
            '<input wj-part="input" type="text" class="wj-form-control" />' +
            '<span wj-part="btn" class="wj-input-group-btn" tabindex="-1">' +
            '<button class="wj-btn wj-btn-default" type="button" tabindex="-1">' +
            '<span class="wj-glyph-calendar"></span>' +
            '</button>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '<div wj-part="dropdown" class="wj-content wj-dropdown-panel" ' +
            'style="display:none;position:absolute;z-index:100">' +
            '</div>' +
            '</div>';
        //
        // change the format used to show current month/year (affects all InputDate and Calendar controls)
        wijmo.culture.Globalize.calendar.patterns['y'] = 'MMMM yyyy';
    }
    //
    customizeCalendar(calendar: input.Calendar) {
        calendar.formatItem.addHandler((sender: input.Calendar, e: input.FormatItemEventArgs) => {
            let weekday = e.data.getDay(),
                holiday = this.dataService.getHoliday(e.data);
            //
            wijmo.toggleClass(e.item, 'date-weekend', weekday == 0 || weekday == 6);
            wijmo.toggleClass(e.item, 'date-holiday', holiday != null);
            e.item.title = holiday || '';
        });
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

