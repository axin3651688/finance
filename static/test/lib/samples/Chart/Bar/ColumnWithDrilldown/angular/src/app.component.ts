import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as chart from '@grapecity/wijmo.chart';
//
import { Component, Inject, enableProdMode, NgModule, ViewChild, OnInit, ElementRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { WjChartAnimationModule } from '@grapecity/wijmo.angular2.chart.animation';
import { DataService } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent implements OnInit {
    @ViewChild('flexChart') private _flexChart: chart.FlexChart;
    @ViewChild('header') private _header: ElementRef;
    private _view: wijmo.CollectionView;
    //
    groupedView: wijmo.CollectionView;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this._view = dataService.getData();
        this.groupedView = dataService.getGroupData(this._view);
    }
    //
    ngOnInit() {
        this._header.nativeElement.addEventListener('click', (e: MouseEvent) => this._onHeaderClick(e));
    }
    //
    selectionChanged(flexChart: chart.FlexChart) {
        if (flexChart.selection) {
            let point = flexChart.selection.collectionView.currentItem;
            if (point && point.group && !point.group.isBottomLevel) {
                this.showGroup(point.group);
            }
        }
    }
    //
    showGroup(group: wijmo.CollectionViewGroup) {
        // update titles
        this._updateChartHeader(group);
        var level = 'level' in group ? group.level + 1 : 0;
        this._flexChart.axisX.title = wijmo.toHeaderCase(this._view.groupDescriptions[level].propertyName);
        //
        // update the series color (use a different one for each level)
        var palette = this._flexChart.palette || chart.Palettes.standard;
        this._flexChart.series[0].style = {
            fill: palette[level],
            stroke: palette[level]
        };
        //
        // update data
        this._flexChart.itemsSource = this.dataService.getGroupData(group);
        this._flexChart.selection = null;
    }
    //
    private _onHeaderClick(e: Event) {
        if (e.target instanceof HTMLAnchorElement) {
            e.preventDefault();
            //
            // get the link path
            let path = e.target.href;
            path = path.substr(path.lastIndexOf('#') + 1);
            let paths = path.split('/');
            //
            // find the group that matches the path
            let src: any = this._view;
            for (let i = 1; i < paths.length; i++) {
                for (let j = 0; j < src.groups.length; j++) {
                    let group = src.groups[j];
                    if (group.name == paths[i]) {
                        src = group;
                        break;
                    }
                }
            }
            // show the selected group
            this.showGroup(src);
        }
    }
    //
    private _updateChartHeader(group: wijmo.CollectionViewGroup) {
        let item = group.items[0],
            path = '',
            headers = [];
        //
        for (let i = 0; i <= group.level; i++) {
            let prop = this._view.groupDescriptions[i].propertyName,
                hdr = wijmo.format('<a href="#{path}">{prop}</a>: {value}', {
                    path: path,
                    prop: wijmo.toHeaderCase(prop),
                    value: item[prop]
                });
            headers.push(hdr);
            path += '/' + item[prop];
        }
        //
        this._header.nativeElement.innerHTML = headers.length > 0
            ? 'IMF estimates GDP(nominal) GDP for ' + headers.join(', ')
            : 'IMF estimates GDP(nominal) GDP';
    }
}
//
@NgModule({
    imports: [WjChartModule, WjChartAnimationModule, BrowserModule],
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