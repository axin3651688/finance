
import * as wjcCore from '@grapecity/wijmo';

// Angular
import { Component, Input, Inject, ElementRef, AfterViewInit } from '@angular/core';

'use strict';

// The application root component.
@Component({
    selector: 'app-sorter',
    template: '<span><ng-content></ng-content></span>'
})
export class AppSorter implements AfterViewInit {
    @Input() view: any;
    @Input() binding: string;
    @Input() header: string;

    constructor( @Inject(ElementRef) public elRef: ElementRef) {
        var e = elRef.nativeElement;

        // make cursor a hand
        var p = e.parentElement;
        p.style.cursor = 'pointer';

        // change sort on click
        p.addEventListener('click', (args: any) => {
            if (this.view) {
                this.applySort(args);
            }
        });
    }

    ngAfterViewInit() {
        // save header to update on clicks
        if (!this.header) {
            this.header = this.elRef.nativeElement.textContent;
        }
        // show sort indicator
        this.updateSortIndicator(this.elRef.nativeElement);

        if (this.view) {
            this.view.collectionChanged.addHandler(() => {
                this.updateSortIndicator(this.elRef.nativeElement);
            });
        }
    }

    // update element content to show whether is the sorted column
    updateSortIndicator(element: HTMLElement) {
        if (this.view) {
            var sd = this.view.sortDescriptions,
                sortIndicator = '';
            if (sd.length > 0 && sd[0].property == this.binding) {
                sortIndicator = sd[0].ascending ? ' ▲' : ' ▼';
            }
            element.innerText = this.header + sortIndicator;
        }
    };

    // apply/change/remove sort on this column
    applySort(args: any) {
        if (this.view) {
            var sd = this.view.sortDescriptions;
            if (args.ctrlKey) { // clear sort on ctrl-click 
                sd.clear();
            } else { // add/reverse sort on clicked column
                var ascending = true;
                if (sd.length > 0 && sd[0].property == this.binding) {
                    ascending = !sd[0].ascending;
                }
                var sdNew = new wjcCore.SortDescription(this.binding, ascending);
                sd.splice(0, sd.length, sdNew);
            }
        }
    };
}

