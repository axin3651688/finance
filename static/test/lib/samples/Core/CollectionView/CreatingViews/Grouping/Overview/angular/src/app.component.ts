import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
//
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { DataService, TDataItem } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    private view: wijmo.CollectionView;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.view = new wijmo.CollectionView(dataService.getData(), {
            currentItem: null,
            sortDescriptions: [new wijmo.SortDescription('sales', false)]
        });
        //
        // change the grouping
        document.addEventListener('change', e => {
            // remove the old groups
            this.view.groupDescriptions.clear();
            //
            // add the new groups
            let filter = e.target as HTMLInputElement;
            if (filter.value) {
                filter.value.split(',').forEach((prop: string) => {
                    // group sales by value ranges
                    let pgd: wijmo.PropertyGroupDescription;
                    if (prop == 'sales') {
                        pgd = new wijmo.PropertyGroupDescription(prop, (item: TDataItem) => {
                            if (item.sales > 8000) return 'High';
                            if (item.sales > 4000) return 'Medium';
                            return 'Low';
                        });
                    } else { // group others by value
                        pgd = new wijmo.PropertyGroupDescription(prop);
                    }
                    this.view.groupDescriptions.push(pgd);
                });
            }
        });
    }
    //
    dumpData() {
        if (!this.view.groups) {
            console.log('*** no groups');
        } else {
            console.log('*** ' + this.view.groups.length + ' groups:');
            this.view.groups.forEach(group => this.dumpGroup(group, ''));
        }
    }
    //
    private dumpGroup(group: wijmo.CollectionViewGroup, level: string) {
        // show information for this group
        let propName = group.groupDescription['propertyName'],
            groupName = group.name,
            groupInfo = propName + ' > ' + groupName; // group summary
        //
        groupInfo += ' (' + group.items.length + ' items)'; // item count
        groupInfo += ' total sales: ' + wijmo.Globalize.format(group.getAggregate(wijmo.Aggregate.Sum, 'sales'), 'c2');
        console.log(level + groupInfo);
        //
        // show subgroups
        if (group.groups) {
            group.groups.forEach(child => this.dumpGroup(child, level + '  '));
        }
    }
}
//
@NgModule({
    imports: [WjGridModule, BrowserModule],
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

