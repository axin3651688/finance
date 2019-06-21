import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as input from '@grapecity/wijmo.input';
//
import { Directive, forwardRef, Attribute, Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Validator, AbstractControl, NG_VALIDATORS, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    onSubmit(popup: input.Popup) {
        alert('form submitted');
        popup.hide();
    }
}
//
// EqualValidator
@Directive({
    selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualValidator), multi: true }
    ]
})
export class EqualValidator implements Validator {
    constructor(@Attribute('validateEqual') public validateEqual: string) { }
    //
    validate(c: AbstractControl): { [key: string]: any } {
        // self value (e.g. retype password)
        let v = c.value;
        // control value (e.g. password)
        let e = c.root.get(this.validateEqual);
        //
        // value not equal
        if (e && v !== e.value) return {
            validateEqual: false
        }
        //
        return null;
    }
}
//
@NgModule({
    imports: [WjInputModule, FormsModule, BrowserModule],
    declarations: [EqualValidator, AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

