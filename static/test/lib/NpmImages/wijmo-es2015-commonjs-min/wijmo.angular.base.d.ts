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
* {@module wijmo.angular.base}
 * Contains base classes for all Wijmo for AngularJS directives.
 */
/**
 *
 */
export declare var ___keepComment: any;
import { Control } from 'wijmo/wijmo';
import { ControlMetaFactory, PropertyType, EventDescBase, ComplexPropDescBase, PropDescBase, MetaDataBase } from 'wijmo/wijmo.meta';
import * as wjcInput from 'wijmo/wijmo.input';
import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcGridFilter from 'wijmo/wijmo.grid.filter';
import * as wjcGridGrouppanel from 'wijmo/wijmo.grid.grouppanel';
import * as wjcGridDetail from 'wijmo/wijmo.grid.detail';
import * as wjcGridSheet from 'wijmo/wijmo.grid.sheet';
import * as wjcGridMultirow from 'wijmo/wijmo.grid.multirow';
import * as wjcChart from 'wijmo/wijmo.chart';
import * as wjcChartHierarchical from 'wijmo/wijmo.chart.hierarchical';
import * as wjcChartAnnotation from 'wijmo/wijmo.chart.annotation';
import * as wjcChartInteraction from 'wijmo/wijmo.chart.interaction';
import * as wjcChartAnimation from 'wijmo/wijmo.chart.animation';
import * as wjcChartFinance from 'wijmo/wijmo.chart.finance';
import * as wjcChartRadar from 'wijmo/wijmo.chart.radar';
import * as wjcChartAnalytics from 'wijmo/wijmo.chart.analytics';
import * as wjcChartFinanceAnalytics from 'wijmo/wijmo.chart.finance.analytics';
import * as wjcGauge from 'wijmo/wijmo.gauge';
import * as wjcOlap from 'wijmo/wijmo.olap';
import * as wjcViewer from 'wijmo/wijmo.viewer';
import * as wjcNav from 'wijmo/wijmo.nav';
export declare class MetaFactory extends ControlMetaFactory {
    static CreateProp(propertyName: string, propertyType: PropertyType, changeEvent?: string, enumType?: any, isNativeControlProperty?: boolean, priority?: number): PropDesc;
    static CreateEvent(eventName: string, isPropChanged?: boolean): EventDesc;
    static CreateComplexProp(propertyName: string, isArray: boolean, ownsObject?: boolean): ComplexPropDesc;
    static findProp(propName: string, props: PropDesc[]): PropDesc;
    static findEvent(eventName: string, events: EventDesc[]): EventDesc;
    static findComplexProp(propName: string, props: ComplexPropDesc[]): ComplexPropDesc;
}
export declare class PropDesc extends PropDescBase {
    private _scopeBindingMode;
    private _customHandler;
    constructor(propertyName: string, propertyType: PropertyType, changeEvent?: string, enumType?: any, isNativeControlProperty?: boolean, priority?: number);
    scopeBindingMode: string;
    customHandler: (scope: any, control: Control, value: any, oldValue: any, link: WjLink) => any;
}
export declare class EventDesc extends EventDescBase {
}
export declare class ComplexPropDesc extends ComplexPropDescBase {
}
export declare function _registerNgModule(name: string): any;
/**
 * Returns an array of all registered so far Wijmo Angular module names.
 * These are the names of Angular modules that allows you to obtain a module
 * reference using the <b>angular.module(moduleName)</b> function.
 */
export declare function getNgModules(): string[];
export declare class WjDirective {
    static _versionOk(minVer: string): boolean;
    static _parPropAttr: string;
    static _wjModelPropAttr: string;
    static _initPropAttr: string;
    static _initEventAttr: string;
    static _cntrlScopeProp: string;
    static _elemScopeProp: string;
    static _cntrlLinkProp: string;
    static _scopeChildrenProp: string;
    static _dirIdAttr: string;
    static _optionalAttr: boolean;
    static _dynaTemplates: boolean;
    static _angStripPrefixes: string[];
    private static _dirIdCounter;
    link: (scope: any, templateElement: any, templateAttributes: any, controller: any) => any;
    controller: any;
    replace: boolean;
    require: any;
    restrict: string;
    scope: any;
    template: any;
    transclude: any;
    _property: string;
    _isPropertyArray: boolean;
    _ownObject: boolean;
    _parentReferenceProperty: string;
    _ngModelProperty: string;
    _isCustomParentInit: boolean;
    _props: PropDesc[];
    _events: EventDesc[];
    _complexProps: ComplexPropDesc[];
    _$parse: any;
    private _stripReq;
    private _dirId;
    readonly _controlConstructor: any;
    _getMetaDataId(): any;
    _getMetaData(): MetaDataBase;
    constructor();
    private _initDirective;
    _initSharedMeta(): void;
    _initProps(): void;
    _initEvents(): void;
    _createLink(): WjLink;
    _controllerImpl(controller: any, scope: any, tElement: any): void;
    _initControl(element: any): any;
    _isChild(): boolean;
    _isParentInitializer(): boolean;
    _isParentReferencer(): boolean;
    _scopeToAttrName(scopeName: string): string;
    _getComplexPropDesc(propName: string): ComplexPropDesc;
    private _initScopeEvents;
    private _initScopeDescription;
    _postLinkFn(): (scope: any, tElement: any, tAttrs: any, controller?: any) => void;
    private _prepareProps;
    private _stripRequire;
    _getId(): string;
    static _removeTransclude(html: string): string;
}
export declare class WjLink {
    directive: WjDirective;
    scope: any;
    tElement: any;
    tAttrs: any;
    controller: any;
    directiveTemplateElement: any;
    control: any;
    parent: WjLink;
    ngModel: any;
    private _ngModelPropDesc;
    private _nonAssignable;
    private _parentPropDesc;
    private _definedProps;
    private _definedEvents;
    private _oldValues;
    _isInitialized: boolean;
    private _hasTriggeredInitialized;
    private _isNgModelInitialized;
    private _scopeSuspend;
    private _suspendedEvents;
    private _siblingInsertedEH;
    private _destroyEhUnreg;
    _areChlildrenReady: boolean;
    _isDestroyed: boolean;
    constructor();
    _link(): void;
    _onChildrenReady(): void;
    private _createInstance;
    private _parentReady;
    _initParent(): void;
    _destroy(): void;
    private _siblingInserted;
    private _notifyReady;
    _initControl(): any;
    private _prepareControl;
    private _setupScopeWithControlProperties;
    private _initNonAssignable;
    _suspendScope(): void;
    _resumeScope(): void;
    _isScopeSuspended(): boolean;
    _isAttrDefined(name: string): boolean;
    private _isAppliedToParent;
    _childInitialized(child: WjLink): void;
    private _thisInitialized;
    _initialized(): void;
    private _appliedToParent;
    private _checkRaiseInitialized;
    private _addWatchers;
    private _addEventHandlers;
    private _addEventHandler;
    private _updateScope;
    private _ngModelRender;
    private _castValueToType;
    private _isChild;
    private _isParentInitializer;
    private _isParentReferencer;
    private _getParentProp;
    private _getParentReferenceProperty;
    private _useParentObj;
    private _isParentArray;
    private _parentInCtor;
    private _getNgModelProperty;
    private _updateNgModelPropDesc;
    _safeApply(scope: any, name: any, value: any): boolean;
    _shouldApply(scope: any, name: any, value: any): boolean;
    _canApply(scope: any, name: any): boolean;
    _nullOrValue(value: any): any;
    _getIndex(): number;
}
export declare function softRefChart(): typeof wjcChart;
export declare function softRefChartAnalytics(): typeof wjcChartAnalytics;
export declare function softRefChartAnimation(): typeof wjcChartAnimation;
export declare function softRefChartAnnotation(): typeof wjcChartAnnotation;
export declare function softRefChartFinance(): typeof wjcChartFinance;
export declare function softRefChartFinanceAnalytics(): typeof wjcChartFinanceAnalytics;
export declare function softRefChartHierarchical(): typeof wjcChartHierarchical;
export declare function softRefChartInteraction(): typeof wjcChartInteraction;
export declare function softRefChartRadar(): typeof wjcChartRadar;
export declare function softRefGauge(): typeof wjcGauge;
export declare function softRefGrid(): typeof wjcGrid;
export declare function softRefGridDetail(): typeof wjcGridDetail;
export declare function softRefGridFilter(): typeof wjcGridFilter;
export declare function softRefGridGrouppanel(): typeof wjcGridGrouppanel;
export declare function softRefGridMultirow(): typeof wjcGridMultirow;
export declare function softRefGridSheet(): typeof wjcGridSheet;
export declare function softRefNav(): typeof wjcNav;
export declare function softRefOlap(): typeof wjcOlap;
export declare function softRefViewer(): typeof wjcViewer;
export declare function softRefInput(): typeof wjcInput;
