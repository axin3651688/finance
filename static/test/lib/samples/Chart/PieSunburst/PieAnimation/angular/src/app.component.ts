import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as chart from '@grapecity/wijmo.chart';
import { ChartAnimation } from '@grapecity/wijmo.chart.animation';
//
import { Component, Inject, enableProdMode, ViewChild, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { WjChartAnimationModule } from '@grapecity/wijmo.angular2.chart.animation';
import { DataService } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    @ViewChild('pieAnimation') pieAnimation: ChartAnimation;
    @ViewChild('pieChart') pieChart: chart.FlexPie;
    data: wijmo.ObservableArray;
    palette: string[];
    //
    private _insertPieIdx = 1;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
        this.palette = this._getRandomPalette();
    }
    //
    private _animationMode = 'All';
    get animationMode() {
        return this._animationMode;
    }
    set animationMode(value: string) {
        if (this._animationMode !== value) {
            this._animationMode = value;
            this.pieAnimation.animate();
        }
    }
    //
    private _easing = 'Swing';
    get easing() {
        return this._easing;
    }
    set easing(value: string) {
        if (this._easing !== value) {
            this._easing = value;
            this.pieAnimation.animate();
        }
    }
    //
    private _duration = 400;
    get duration() {
        return this._duration;
    }
    set duration(value: number) {
        if (this._duration !== value) {
            this._duration = value;
            this.pieAnimation.animate();
        }
    }
    //
    resetData() {
        this.data = this.dataService.getData();
        this._insertPieIdx = 1;
    }
    //
    addSlice() {
        this.data.push(this.dataService.getRandomData('added' + this._insertPieIdx));
        this._insertPieIdx++;
    }
    //
    removeSlice() {
        if (this.data.length) {
            this.data.pop();
            this._insertPieIdx = this._insertPieIdx <= 1 ? 1 : this._insertPieIdx--;
        }
    }
    //
    private _getRandomPalette() {
        let palettes = Object.getOwnPropertyNames(chart.Palettes)
            .filter(prop => typeof chart.Palettes[prop] === 'object' && prop !== 'prototype');
        let rand = Math.floor(Math.random() * palettes.length);
        //
        return chart.Palettes[palettes[rand]];
    }
}
//
@NgModule({
    imports: [WjInputModule, WjChartModule, WjChartAnimationModule, BrowserModule],
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