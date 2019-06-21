import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as chart from '@grapecity/wijmo.chart';
import * as hierChart from '@grapecity/wijmo.chart.hierarchical';
//
import { Component, Inject, enableProdMode, NgModule, OnInit, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { WjChartHierarchicalModule } from '@grapecity/wijmo.angular2.chart.hierarchical';
import { DataService } from './app.data';
import { PropertiesTile } from './properties-tile';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent implements OnInit {
    SuperheroPalette = chart.Palettes.superhero;
    data: wijmo.CollectionView;
    //
    @ViewChild('periodicSunburst') periodicSunburst: hierChart.Sunburst;
    private _lastSelectedEle: HTMLElement;
    private _lastSelectedEleFillColor: string;
    // Keep track of any hidden text elements using an array
    // This has to be able to store multiple hidden text elements for the case where labels overlap
    private _hiddenTextElements: HTMLElement[] = [];
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        let data = dataService.getData();
        data.items.forEach(item => item.value = 1); // add the constant 'value' property to get equal arc angles for all element panels
        this.data = data;
    }
    //
    ngOnInit() {
        let propTile = new PropertiesTile('#properties-tile', this.periodicSunburst);
        this.periodicSunburst.hostElement.addEventListener('click', e => {
            // If a panel is clicked, visually select it
            this._markSelectedPanel(e.clientX, e.clientY);
            // Perform a hit test to get a clicked panel's name then use it to set up the info panel via the ViewAdapter
            propTile.showInfo(this.periodicSunburst.hitTest(e.pageX, e.pageY).item);
        });
    }
    //
    // Visually marks a panel at the given coordinates as selected
    private _markSelectedPanel(panelX: number, panelY: number) {
        // First, 'unselect' (restore the fill color of) the element that was selected last, if there is one
        if (this._lastSelectedEle && this._lastSelectedEleFillColor) {
            this._lastSelectedEle.setAttribute('fill', this._lastSelectedEleFillColor);
        }
        //
        // Define our selected element and check to see if it's a panel that we can fill
        let selectedElement = <HTMLElement>document.elementFromPoint(panelX, panelY);
        //
        if (selectedElement && selectedElement.hasAttribute('fill') && selectedElement.tagName === 'path') {
            // Reset the lastSelectedEle and then change the fill color of the clicked panel
            let fillColor = selectedElement.getAttribute('fill');
            this._lastSelectedEle = selectedElement;
            this._lastSelectedEleFillColor = fillColor;
            //
            let color = new wijmo.Color(fillColor);
            color.a = 1;
            selectedElement.setAttribute('fill', color.toString());
            //
            while (this._hiddenTextElements.length > 0) { // if we hid any text elements in the process, reshow them
                this._hiddenTextElements.pop().style.display = 'block';
            }
        } else {
            if (selectedElement && selectedElement.tagName === 'text') { // super hacky way to get the right panel if a data label is clicked
                selectedElement.style.display = 'none'; // hide the data label
                this._hiddenTextElements.push(selectedElement); // keep track of hidden text elements
                this._markSelectedPanel(panelX, panelY); // run the method again with the data label hidden
            }
        }
        //
        return false;
    }
}
//
@NgModule({
    imports: [WjChartModule, WjChartHierarchicalModule, BrowserModule],
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