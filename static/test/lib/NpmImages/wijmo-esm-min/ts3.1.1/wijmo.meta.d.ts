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
export declare function softChart(): typeof wjcChart;
export declare function softChartAnalytics(): typeof wjcChartAnalytics;
export declare function softChartAnimation(): typeof wjcChartAnimation;
export declare function softChartAnnotation(): typeof wjcChartAnnotation;
export declare function softChartFinance(): typeof wjcChartFinance;
export declare function softChartFinanceAnalytics(): typeof wjcChartFinanceAnalytics;
export declare function softChartHierarchical(): typeof wjcChartHierarchical;
export declare function softChartInteraction(): typeof wjcChartInteraction;
export declare function softChartRadar(): typeof wjcChartRadar;
export declare function softGauge(): typeof wjcGauge;
export declare function softGrid(): typeof wjcGrid;
export declare function softGridDetail(): typeof wjcGridDetail;
export declare function softGridFilter(): typeof wjcGridFilter;
export declare function softGridGrouppanel(): typeof wjcGridGrouppanel;
export declare function softGridMultirow(): typeof wjcGridMultirow;
export declare function softGridSheet(): typeof wjcGridSheet;
export declare function softNav(): typeof wjcNav;
export declare function softOlap(): typeof wjcOlap;
export declare function softViewer(): typeof wjcViewer;
export declare function softInput(): typeof wjcInput;
export declare class ControlMetaFactory {
    static CreateProp(propertyName: string, propertyType: PropertyType, changeEvent?: string, enumType?: any, isNativeControlProperty?: boolean, priority?: number): PropDescBase;
    static CreateEvent(eventName: string, isPropChanged?: boolean): EventDescBase;
    static CreateComplexProp(propertyName: string, isArray: boolean, ownsObject?: boolean): ComplexPropDescBase;
    static findProp(propName: string, props: PropDescBase[]): PropDescBase;
    static findEvent(eventName: string, events: EventDescBase[]): EventDescBase;
    static findComplexProp(propName: string, props: ComplexPropDescBase[]): ComplexPropDescBase;
    static getMetaData(metaDataId: any): MetaDataBase;
    static getClassName(classRef: any): string;
    static toCamelCase(s: any): any;
    private static findInArr;
}
export declare class PropDescBase {
    private _propertyName;
    private _propertyType;
    private _changeEvent;
    private _enumType;
    private _isNativeControlProperty;
    private _priority;
    constructor(propertyName: string, propertyType: PropertyType, /*bindingMode: BindingMode = BindingMode.OneWay*/ changeEvent?: string, enumType?: any, isNativeControlProperty?: boolean, priority?: number);
    readonly propertyName: string;
    readonly propertyType: PropertyType;
    readonly changeEvent: string;
    readonly enumType: any;
    readonly bindingMode: BindingMode;
    readonly isNativeControlProperty: boolean;
    readonly priority: number;
    readonly shouldUpdateSource: boolean;
    initialize(options: any): void;
    castValueToType(value: any): any;
    private _parseDate;
}
export declare enum PropertyType {
    Boolean = 0,
    Number = 1,
    Date = 2,
    String = 3,
    AnyPrimitive = 4,
    Enum = 5,
    Function = 6,
    EventHandler = 7,
    Any = 8
}
export declare function isSimpleType(type: PropertyType): boolean;
export declare enum BindingMode {
    OneWay = 0,
    TwoWay = 1
}
export declare class EventDescBase {
    private _eventName;
    private _isPropChanged;
    constructor(eventName: string, isPropChanged?: boolean);
    readonly eventName: string;
    readonly isPropChanged: boolean;
}
export declare class ComplexPropDescBase {
    propertyName: string;
    isArray: boolean;
    private _ownsObject;
    constructor(propertyName: string, isArray: boolean, ownsObject?: boolean);
    readonly ownsObject: boolean;
}
export declare class MetaDataBase {
    private _props;
    private _events;
    private _complexProps;
    parentProperty: string;
    isParentPropertyArray: boolean;
    ownsObject: boolean;
    parentReferenceProperty: string;
    ngModelProperty: string;
    constructor(props: PropDescBase[], events?: EventDescBase[], complexProps?: ComplexPropDescBase[], parentProperty?: string, isParentPropertyArray?: boolean, ownsObject?: boolean, parentReferenceProperty?: string, ngModelProperty?: string);
    props: PropDescBase[];
    events: EventDescBase[];
    complexProps: ComplexPropDescBase[];
    add(props: PropDescBase[], events?: EventDescBase[], complexProps?: ComplexPropDescBase[], parentProperty?: string, isParentPropertyArray?: boolean, ownsObject?: boolean, parentReferenceProperty?: string, ngModelProperty?: string): MetaDataBase;
    addOptions(options: any): this;
    prepare(): void;
}
