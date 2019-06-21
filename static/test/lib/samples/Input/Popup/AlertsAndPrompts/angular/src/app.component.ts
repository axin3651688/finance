import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as input from '@grapecity/wijmo.input';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    showAlert(popup: input.Popup) {
        popup.show(true, (sender: input.Popup) => {
            alert('you entered: ' + sender.dialogResult);
        });
    }
    //
    showPrompt(popup: input.Popup) {
        popup.show(true, (sender: input.Popup) => {
            let result = sender.dialogResult.indexOf('ok') > -1
                ? popup.hostElement.querySelector('input').value
                : null;
            alert('you entered: ' + result);
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

