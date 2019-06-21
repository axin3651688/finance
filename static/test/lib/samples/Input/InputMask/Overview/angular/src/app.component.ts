import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    overwrite = false;
    //
    constructor() {
        // enable overwrite mode on all input mask controls
        // https://stackoverflow.com/questions/2561110/javascript-to-make-input-field-in-edit-modeinsert-mode
        document.body.addEventListener('keypress', e => {
            if (this.overwrite) { // overwrite enabled
                let input = <HTMLInputElement>e.target;
                //
                if (input.tagName == 'INPUT') { // target is input element
                    if (wijmo.closest(input, '.wj-inputmask')) { // contained in an InputMask control
                        let value = input.value,
                            start = input.selectionStart;
                        //
                        input.value = value.substr(0, start) + value.substr(start + 1);
                        input.selectionEnd = start;
                    }
                }
            }
        });
    }
}
//
@NgModule({
    imports: [WjInputModule, FormsModule, BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

