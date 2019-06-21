/*!
    *
    * Wijmo Library 5.20191.603
    * http://wijmo.com/
    *
    * Copyright(c) GrapeCity, Inc.  All rights reserved.
    *
    * Licensed under the GrapeCity Commercial License.
    * sales@wijmo.com
    * wijmo.com/products/wijmo-5/license/
    *
    */
/**
* {@module wijmo.angular2.grid.sheet}
* Contains Angular 2 components for the <b>wijmo.grid.sheet</b> module.
*
* <b>wijmo.angular2.grid.sheet</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjSheet from 'wijmo/wijmo.angular2.grid.sheet';
* &nbsp;
* &#64;Component({
*     directives: [wjSheet.WjFlexSheet],
*     template: `&lt;wj-flex-sheet&gt;&lt;/wj-flex-sheet&gt;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
* }</pre>
*
*/
/**
 *
 */
export declare var ___keepComment: any;
import { EventEmitter, AfterViewInit, ElementRef, Injector, OnInit, OnDestroy, SimpleChange } from '@angular/core';
import { IWjComponentMetadata, IWjComponentMeta } from 'wijmo/wijmo.angular2.directiveBase';
import * as wjcGridSheet from 'wijmo/wijmo.grid.sheet';
export declare var wjFlexSheetMeta: IWjComponentMeta;
/**
 * Angular 2 component for the {@link wijmo.grid.sheet.FlexSheet} control.
 *
 * Use the <b>wj-flex-sheet</b> component to add <b>FlexSheet</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="/wijmo/docs/GettingStarted/Angular-Components">Angular 2 Markup</a>.
 *
* The <b>WjFlexSheet</b> component is derived from the <b>FlexSheet</b> control and
 * inherits all its properties, events and methods.
 *
 * The <b>wj-flex-sheet</b> component may contain a {@link wijmo.angular2.grid.sheet.WjSheet} child component.
*/
export declare class WjFlexSheet extends wjcGridSheet.FlexSheet implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    /**
     * Indicates whether the component has been initialized by Angular.
     * Changes its value from false to true right before triggering the <b>initialized</b> event.
     */
    isInitialized: boolean;
    /**
     * This event is triggered after the component has been initialized by Angular, that is
     * all bound properties have been assigned and child components (if any) have been initialized.
     */
    initialized: EventEmitter<any>;
    /**
     * Defines a name of a property represented by [(ngModel)] directive (if specified).
     * Default value is ''.
     */
    wjModelProperty: string;
    /**
     * Allows you to override the global <b>WjOptions.asyncBindings</b> setting for this specific component.
     * See the <b>WjOptions.</b>{@link WjOptions.asyncBindings} property description for details.
     */
    asyncBindings: boolean;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>gotFocus</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>gotFocus</b> Wijmo event name.
     */
    gotFocusNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>lostFocus</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>lostFocus</b> Wijmo event name.
     */
    lostFocusNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>beginningEdit</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>beginningEdit</b> Wijmo event name.
     */
    beginningEditNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>cellEditEnded</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>cellEditEnded</b> Wijmo event name.
     */
    cellEditEndedNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>cellEditEnding</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>cellEditEnding</b> Wijmo event name.
     */
    cellEditEndingNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>prepareCellForEdit</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>prepareCellForEdit</b> Wijmo event name.
     */
    prepareCellForEditNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>formatItem</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>formatItem</b> Wijmo event name.
     */
    formatItemNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>resizingColumn</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>resizingColumn</b> Wijmo event name.
     */
    resizingColumnNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>resizedColumn</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>resizedColumn</b> Wijmo event name.
     */
    resizedColumnNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>autoSizingColumn</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>autoSizingColumn</b> Wijmo event name.
     */
    autoSizingColumnNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>autoSizedColumn</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>autoSizedColumn</b> Wijmo event name.
     */
    autoSizedColumnNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>draggingColumn</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>draggingColumn</b> Wijmo event name.
     */
    draggingColumnNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>draggingColumnOver</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>draggingColumnOver</b> Wijmo event name.
     */
    draggingColumnOverNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>draggedColumn</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>draggedColumn</b> Wijmo event name.
     */
    draggedColumnNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>sortingColumn</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>sortingColumn</b> Wijmo event name.
     */
    sortingColumnNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>sortedColumn</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>sortedColumn</b> Wijmo event name.
     */
    sortedColumnNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>resizingRow</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>resizingRow</b> Wijmo event name.
     */
    resizingRowNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>resizedRow</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>resizedRow</b> Wijmo event name.
     */
    resizedRowNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>autoSizingRow</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>autoSizingRow</b> Wijmo event name.
     */
    autoSizingRowNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>autoSizedRow</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>autoSizedRow</b> Wijmo event name.
     */
    autoSizedRowNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>draggingRow</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>draggingRow</b> Wijmo event name.
     */
    draggingRowNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>draggingRowOver</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>draggingRowOver</b> Wijmo event name.
     */
    draggingRowOverNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>draggedRow</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>draggedRow</b> Wijmo event name.
     */
    draggedRowNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>deletingRow</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>deletingRow</b> Wijmo event name.
     */
    deletingRowNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>deletedRow</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>deletedRow</b> Wijmo event name.
     */
    deletedRowNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>loadingRows</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>loadingRows</b> Wijmo event name.
     */
    loadingRowsNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>loadedRows</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>loadedRows</b> Wijmo event name.
     */
    loadedRowsNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>rowEditStarting</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>rowEditStarting</b> Wijmo event name.
     */
    rowEditStartingNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>rowEditStarted</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>rowEditStarted</b> Wijmo event name.
     */
    rowEditStartedNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>rowEditEnding</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>rowEditEnding</b> Wijmo event name.
     */
    rowEditEndingNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>rowEditEnded</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>rowEditEnded</b> Wijmo event name.
     */
    rowEditEndedNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>rowAdded</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>rowAdded</b> Wijmo event name.
     */
    rowAddedNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>groupCollapsedChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>groupCollapsedChanged</b> Wijmo event name.
     */
    groupCollapsedChangedNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>groupCollapsedChanging</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>groupCollapsedChanging</b> Wijmo event name.
     */
    groupCollapsedChangingNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>itemsSourceChanging</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>itemsSourceChanging</b> Wijmo event name.
     */
    itemsSourceChangingNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>itemsSourceChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>itemsSourceChanged</b> Wijmo event name.
     */
    itemsSourceChangedNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>selectionChanging</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>selectionChanging</b> Wijmo event name.
     */
    selectionChangingNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>selectionChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>selectionChanged</b> Wijmo event name.
     */
    selectionChangedNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>scrollPositionChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>scrollPositionChanged</b> Wijmo event name.
     */
    scrollPositionChangedNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>updatingView</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>updatingView</b> Wijmo event name.
     */
    updatingViewNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>updatedView</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>updatedView</b> Wijmo event name.
     */
    updatedViewNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>updatingLayout</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>updatingLayout</b> Wijmo event name.
     */
    updatingLayoutNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>updatedLayout</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>updatedLayout</b> Wijmo event name.
     */
    updatedLayoutNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>pasting</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>pasting</b> Wijmo event name.
     */
    pastingNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>pasted</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>pasted</b> Wijmo event name.
     */
    pastedNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>pastingCell</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>pastingCell</b> Wijmo event name.
     */
    pastingCellNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>pastedCell</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>pastedCell</b> Wijmo event name.
     */
    pastedCellNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>copying</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>copying</b> Wijmo event name.
     */
    copyingNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>copied</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>copied</b> Wijmo event name.
     */
    copiedNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>selectedSheetChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>selectedSheetChanged</b> Wijmo event name.
     */
    selectedSheetChangedNg: EventEmitter<any>;
    selectedSheetIndexChangePC: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>draggingRowColumn</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>draggingRowColumn</b> Wijmo event name.
     */
    draggingRowColumnNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>droppingRowColumn</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>droppingRowColumn</b> Wijmo event name.
     */
    droppingRowColumnNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>beginDroppingRowColumn</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>beginDroppingRowColumn</b> Wijmo event name.
     */
    beginDroppingRowColumnNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>endDroppingRowColumn</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>endDroppingRowColumn</b> Wijmo event name.
     */
    endDroppingRowColumnNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>loaded</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>loaded</b> Wijmo event name.
     */
    loadedNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>unknownFunction</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>unknownFunction</b> Wijmo event name.
     */
    unknownFunctionNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>sheetCleared</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>sheetCleared</b> Wijmo event name.
     */
    sheetClearedNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>prepareChangingRow</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>prepareChangingRow</b> Wijmo event name.
     */
    prepareChangingRowNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>prepareChangingColumn</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>prepareChangingColumn</b> Wijmo event name.
     */
    prepareChangingColumnNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>rowChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>rowChanged</b> Wijmo event name.
     */
    rowChangedNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>columnChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>columnChanged</b> Wijmo event name.
     */
    columnChangedNg: EventEmitter<any>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    created(): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    addEventListener(target: EventTarget, type: string, fn: any, capture?: boolean): void;
}
export declare var wjSheetMeta: IWjComponentMeta;
/**
 * Angular 2 component for the {@link wijmo.grid.sheet.Sheet} control.
 *
 * The <b>wj-sheet</b> component must be
 * contained in a {@link wijmo.angular2.grid.sheet.WjFlexSheet} component.
 *
 * Use the <b>wj-sheet</b> component to add <b>Sheet</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="/wijmo/docs/GettingStarted/Angular-Components">Angular 2 Markup</a>.
 *
* The <b>WjSheet</b> component is derived from the <b>Sheet</b> control and
 * inherits all its properties, events and methods.
*/
export declare class WjSheet extends wjcGridSheet.Sheet implements OnInit, OnDestroy, AfterViewInit {
    boundRowCount: number;
    boundColumnCount: number;
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    /**
     * Indicates whether the component has been initialized by Angular.
     * Changes its value from false to true right before triggering the <b>initialized</b> event.
     */
    isInitialized: boolean;
    /**
     * This event is triggered after the component has been initialized by Angular, that is
     * all bound properties have been assigned and child components (if any) have been initialized.
     */
    initialized: EventEmitter<any>;
    /**
     * Gets or sets a name of a property that this component is assigned to.
     * Default value is 'sheets'.
     */
    wjProperty: string;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>nameChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>nameChanged</b> Wijmo event name.
     */
    nameChangedNg: EventEmitter<any>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    created(): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): any;
}
export declare class WjGridSheetModule {
}
