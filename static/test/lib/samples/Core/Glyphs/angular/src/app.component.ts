import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    glyphs = ['asterisk', 'calendar', 'check', 'circle', 'clock', 'diamond', 'down',
        'down-left', 'down-right', 'file', 'filter', 'left', 'minus', 'pencil', 'plus', 'right',
        'square', 'step-backward', 'step-forward', 'up', 'up-left', 'up-right'];
}
//
@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

