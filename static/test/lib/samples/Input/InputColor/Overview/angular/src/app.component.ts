import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as input from '@grapecity/wijmo.input';
//
import { Component, enableProdMode, NgModule, Inject, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { DataService, TPalette } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    private _showAlphaChannel = true;
    //
    palettes: TPalette[];
    background: string;
    @ViewChild('theInputColorCst') theInputColorCst: input.InputColor;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.palettes = dataService.getPalettes();
    }
    //
    get showAlphaChannel() {
        return this._showAlphaChannel;
    }
    set showAlphaChannel(value: boolean) {
        if (value !== this._showAlphaChannel) {
            this._showAlphaChannel = value;
            this.theInputColorCst.colorPicker.showAlphaChannel = value;
        }
    }
    //
    changePalette(palette: TPalette) {
        this.theInputColorCst.colorPicker.palette = palette.colors;
    }
}
//
@NgModule({
    imports: [WjInputModule, FormsModule, BrowserModule],
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

