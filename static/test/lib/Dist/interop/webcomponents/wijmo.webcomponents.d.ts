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
declare module wijmo.webcomponents {
    function softChart(): typeof wijmo.chart;
    function softChartAnalytics(): typeof wijmo.chart.analytics;
    function softChartAnimation(): typeof wijmo.chart.animation;
    function softChartAnnotation(): typeof wijmo.chart.annotation;
    function softChartFinance(): typeof wijmo.chart.finance;
    function softChartFinanceAnalytics(): typeof wijmo.chart.finance.analytics;
    function softChartHierarchical(): typeof wijmo.chart.hierarchical;
    function softChartInteraction(): typeof wijmo.chart.interaction;
    function softChartRadar(): typeof wijmo.chart.radar;
    function softGauge(): typeof wijmo.gauge;
    function softGrid(): typeof wijmo.grid;
    function softGridDetail(): typeof wijmo.grid.detail;
    function softGridFilter(): typeof wijmo.grid.filter;
    function softGridGrouppanel(): typeof wijmo.grid.grouppanel;
    function softGridMultirow(): typeof wijmo.grid.multirow;
    function softGridSheet(): typeof wijmo.grid.sheet;
    function softNav(): typeof wijmo.nav;
    function softOlap(): typeof wijmo.olap;
    function softViewer(): typeof wijmo.viewer;
    function softInput(): typeof wijmo.input;
}
declare module wijmo.webcomponents {
    class ControlMetaFactory {
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
    class PropDescBase {
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
    enum PropertyType {
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
    function isSimpleType(type: PropertyType): boolean;
    enum BindingMode {
        OneWay = 0,
        TwoWay = 1
    }
    class EventDescBase {
        private _eventName;
        private _isPropChanged;
        constructor(eventName: string, isPropChanged?: boolean);
        readonly eventName: string;
        readonly isPropChanged: boolean;
    }
    class ComplexPropDescBase {
        propertyName: string;
        isArray: boolean;
        private _ownsObject;
        constructor(propertyName: string, isArray: boolean, ownsObject?: boolean);
        readonly ownsObject: boolean;
    }
    class MetaDataBase {
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
}
declare module wijmo.webcomponents {
}
declare module wijmo.webcomponents {
    interface IPropsMeta {
        [name: string]: PropDescBase;
    }
    class WjComponentBehavior {
        private static readonly _typeSiblingIdAttr;
        static readonly _behClassProp = "_wjBehCl";
        static readonly _behProp = "_wjBehaviour";
        static readonly _beforeInitParent = "_beforeInitParent";
        static readonly _afterInitParent = "_afterInitParent";
        private static _siblingDirId;
        private static _cmpRegId;
        private static _registered;
        private _siblingId;
        private _isMounted;
        private _mountedCBs;
        private _isDomInitialized;
        private _initialValues;
        control: any;
        readonly component: HTMLElement;
        parentComponent: HTMLElement;
        ['constructor']: typeof WjComponentBehavior;
        static _attach(component: HTMLElement): WjComponentBehavior;
        constructor(component: any);
        static register(name: string, componentType: any): void;
        static getProps(componentType: any): IPropsMeta;
        static ensureNs(ns: string, ...symbolNames: string[]): boolean;
        readonly isWrapper: boolean;
        lhConnected(): void;
        lhDisconnected(): void;
        lhAttributeChanged(name: string, oldValue: string, newValue: string): void;
        private _initParent;
        private _prepareControl;
        _initDom(): void;
        private _createControl;
        private _initEvents;
        private _onAttributeChanged;
        private _flushInitialValues;
        private _isChild;
        private _isParentInCtor;
        private _getParentProp;
        private _getSiblingIndex;
        private _getElement;
        private static _getControlType;
        private static _getMetaDataId;
        private static _getMetaData;
        private static _getPropsMetaData;
        private static _ensureMetadata;
        private _callCmpMethod;
        static toCamelCase(s: string): string;
        static toDash(s: string): string;
    }
}
declare module wijmo.webcomponents {
}
declare module wijmo.webcomponents {
    class WjcFlexChartTrendLine extends HTMLElement {
        static wrappedClass: () => typeof chart.analytics.TrendLine;
        static parentProp: string;
        static siblingId: string;
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
    }
    class WjcFlexChartMovingAverage extends HTMLElement {
        static wrappedClass: () => typeof chart.analytics.MovingAverage;
        static parentProp: string;
        static siblingId: string;
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
    }
    class WjcFlexChartYFunctionSeries extends HTMLElement {
        static wrappedClass: () => typeof chart.analytics.YFunctionSeries;
        static parentProp: string;
        static siblingId: string;
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
    }
    class WjcFlexChartParametricFunctionSeries extends HTMLElement {
        static wrappedClass: () => typeof chart.analytics.ParametricFunctionSeries;
        static parentProp: string;
        static siblingId: string;
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
    }
    class WjcFlexChartWaterfall extends HTMLElement {
        static wrappedClass: () => typeof chart.analytics.Waterfall;
        static parentProp: string;
        static siblingId: string;
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
    }
    class WjcFlexChartBoxWhisker extends HTMLElement {
        static wrappedClass: () => typeof chart.analytics.BoxWhisker;
        static parentProp: string;
        static siblingId: string;
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
    }
    class WjcFlexChartErrorBar extends HTMLElement {
        static wrappedClass: () => typeof chart.analytics.ErrorBar;
        static parentProp: string;
        static siblingId: string;
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
    }
}
declare module wijmo.webcomponents {
}
declare module wijmo.webcomponents {
    class WjcFlexChartAnimation extends HTMLElement {
        static wrappedClass: () => typeof chart.animation.ChartAnimation;
        static parentInCtor: boolean;
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
    }
}
declare module wijmo.webcomponents {
}
declare module wijmo.webcomponents {
    class WjcFlexChartFibonacci extends HTMLElement {
        static wrappedClass: () => typeof chart.finance.analytics.Fibonacci;
        static parentProp: string;
        static siblingId: string;
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
    }
    class WjcFlexChartFibonacciArcs extends HTMLElement {
        static wrappedClass: () => typeof chart.finance.analytics.FibonacciArcs;
        static parentProp: string;
        static siblingId: string;
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
    }
    class WjcFlexChartFibonacciFans extends HTMLElement {
        static wrappedClass: () => typeof chart.finance.analytics.FibonacciFans;
        static parentProp: string;
        static siblingId: string;
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
    }
    class WjcFlexChartFibonacciTimeZones extends HTMLElement {
        static wrappedClass: () => typeof chart.finance.analytics.FibonacciTimeZones;
        static parentProp: string;
        static siblingId: string;
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
    }
    class WjcFlexChartAtr extends HTMLElement {
        static wrappedClass: () => typeof chart.finance.analytics.ATR;
        static parentProp: string;
        static siblingId: string;
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
    }
    class WjcFlexChartCci extends HTMLElement {
        static wrappedClass: () => typeof chart.finance.analytics.CCI;
        static parentProp: string;
        static siblingId: string;
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
    }
    class WjcFlexChartRsi extends HTMLElement {
        static wrappedClass: () => typeof chart.finance.analytics.RSI;
        static parentProp: string;
        static siblingId: string;
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
    }
    class WjcFlexChartWilliamsR extends HTMLElement {
        static wrappedClass: () => typeof chart.finance.analytics.WilliamsR;
        static parentProp: string;
        static siblingId: string;
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
    }
    class WjcFlexChartMacd extends HTMLElement {
        static wrappedClass: () => typeof chart.finance.analytics.Macd;
        static parentProp: string;
        static siblingId: string;
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
    }
    class WjcFlexChartMacdHistogram extends HTMLElement {
        static wrappedClass: () => typeof chart.finance.analytics.MacdHistogram;
        static parentProp: string;
        static siblingId: string;
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
    }
    class WjcFlexChartStochastic extends HTMLElement {
        static wrappedClass: () => typeof chart.finance.analytics.Stochastic;
        static parentProp: string;
        static siblingId: string;
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
    }
    class WjcFlexChartBollingerBands extends HTMLElement {
        static wrappedClass: () => typeof chart.finance.analytics.BollingerBands;
        static parentProp: string;
        static siblingId: string;
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
    }
    class WjcFlexChartEnvelopes extends HTMLElement {
        static wrappedClass: () => typeof chart.finance.analytics.Envelopes;
        static parentProp: string;
        static siblingId: string;
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
    }
}
declare module wijmo.webcomponents {
}
declare module wijmo.webcomponents {
    class WjcFinancialChart extends wijmo.chart.finance.FinancialChart {
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
        addEventListener(...args: any[]): void;
    }
    class WjcFinancialChartSeries extends HTMLElement {
        static wrappedClass: () => typeof chart.finance.FinancialSeries;
        static parentProp: string;
        static siblingId: string;
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
    }
}
declare module wijmo.webcomponents {
}
declare module wijmo.webcomponents {
    class WjcSunburst extends wijmo.chart.hierarchical.Sunburst {
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
        addEventListener(...args: any[]): void;
    }
    class WjcTreeMap extends wijmo.chart.hierarchical.TreeMap {
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
        addEventListener(...args: any[]): void;
    }
}
declare module wijmo.webcomponents {
}
declare module wijmo.webcomponents {
    class WjcFlexChartRangeSelector extends HTMLElement {
        static wrappedClass: () => typeof chart.interaction.RangeSelector;
        static parentInCtor: boolean;
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
    }
    class WjcFlexChartGestures extends HTMLElement {
        static wrappedClass: () => typeof chart.interaction.ChartGestures;
        static parentInCtor: boolean;
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
    }
}
declare module wijmo.webcomponents {
}
declare module wijmo.webcomponents {
    class WjcFlexRadar extends wijmo.chart.radar.FlexRadar {
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
        addEventListener(...args: any[]): void;
    }
    class WjcFlexRadarAxis extends HTMLElement {
        static wrappedClass: () => typeof chart.radar.FlexRadarAxis;
        static parentProp: string;
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
    }
    class WjcFlexRadarSeries extends HTMLElement {
        static wrappedClass: () => typeof chart.radar.FlexRadarSeries;
        static parentProp: string;
        static siblingId: string;
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
    }
}
declare module wijmo.webcomponents {
}
declare module wijmo.webcomponents {
    class WjcFlexChart extends wijmo.chart.FlexChart {
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
        addEventListener(...args: any[]): void;
    }
    class WjcFlexPie extends wijmo.chart.FlexPie {
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
        addEventListener(...args: any[]): void;
    }
    class WjcFlexChartAxis extends HTMLElement {
        static wrappedClass: () => typeof chart.Axis;
        static parentProp: string;
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
    }
    class WjcFlexChartLegend extends HTMLElement {
        static wrappedClass: () => typeof chart.Legend;
        static parentProp: string;
        static parentInCtor: boolean;
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
    }
    class WjcFlexChartDataLabel extends HTMLElement {
        static wrappedClass: () => typeof chart.DataLabel;
        static parentProp: string;
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
    }
    class WjcFlexPieDataLabel extends HTMLElement {
        static wrappedClass: () => typeof chart.PieDataLabel;
        static parentProp: string;
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
    }
    class WjcFlexChartSeries extends HTMLElement {
        static wrappedClass: () => typeof chart.Series;
        static parentProp: string;
        static siblingId: string;
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
    }
    class WjcFlexChartLineMarker extends HTMLElement {
        static wrappedClass: () => typeof chart.LineMarker;
        static parentInCtor: boolean;
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
    }
    class WjcFlexChartDataPoint extends HTMLElement {
        static wrappedClass: () => typeof chart.DataPoint;
        static parentProp: string;
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
    }
    class WjcFlexChartPlotArea extends HTMLElement {
        static wrappedClass: () => typeof chart.PlotArea;
        static parentProp: string;
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
    }
}
declare module wijmo.webcomponents {
}
declare module wijmo.webcomponents {
    class WjcLinearGauge extends wijmo.gauge.LinearGauge {
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
        addEventListener(...args: any[]): void;
    }
    class WjcBulletGraph extends wijmo.gauge.BulletGraph {
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
        addEventListener(...args: any[]): void;
    }
    class WjcRadialGauge extends wijmo.gauge.RadialGauge {
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
        addEventListener(...args: any[]): void;
    }
    class WjcRange extends HTMLElement {
        static wrappedClass: () => typeof gauge.Range;
        static parentProp: string;
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
    }
}
declare module wijmo.webcomponents {
}
declare module wijmo.webcomponents {
    class WjcFlexGridFilter extends HTMLElement {
        static wrappedClass: () => typeof grid.filter.FlexGridFilter;
        static parentInCtor: boolean;
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
    }
}
declare module wijmo.webcomponents {
}
declare module wijmo.webcomponents {
    class WjcGroupPanel extends wijmo.grid.grouppanel.GroupPanel {
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
        addEventListener(...args: any[]): void;
    }
}
declare module wijmo.webcomponents {
}
declare module wijmo.webcomponents {
    class WjcMultiRow extends wijmo.grid.multirow.MultiRow {
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
        addEventListener(...args: any[]): void;
    }
}
declare module wijmo.webcomponents {
}
declare module wijmo.webcomponents {
    class WjcFlexSheet extends wijmo.grid.sheet.FlexSheet {
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
        addEventListener(...args: any[]): void;
    }
    class WjcSheet extends HTMLElement {
        static wrappedClass: () => typeof grid.sheet.Sheet;
        static parentProp: string;
        static parentInCtor: boolean;
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
    }
}
declare module wijmo.webcomponents {
}
declare module wijmo.webcomponents {
    class WjcFlexGrid extends wijmo.grid.FlexGrid {
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
        addEventListener(...args: any[]): void;
    }
    class WjcFlexGridColumn extends HTMLElement {
        static wrappedClass: () => typeof grid.Column;
        static parentProp: string;
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
        _beforeInitParent(): void;
    }
}
declare module wijmo.webcomponents {
}
declare module wijmo.webcomponents {
    class WjcListBox extends wijmo.input.ListBox {
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
        addEventListener(...args: any[]): void;
    }
    class WjcComboBox extends wijmo.input.ComboBox {
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
        addEventListener(...args: any[]): void;
    }
    class WjcAutoComplete extends wijmo.input.AutoComplete {
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
        addEventListener(...args: any[]): void;
    }
    class WjcCalendar extends wijmo.input.Calendar {
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
        addEventListener(...args: any[]): void;
    }
    class WjcColorPicker extends wijmo.input.ColorPicker {
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
        addEventListener(...args: any[]): void;
    }
    class WjcInputMask extends wijmo.input.InputMask {
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
        addEventListener(...args: any[]): void;
    }
    class WjcInputColor extends wijmo.input.InputColor {
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
        addEventListener(...args: any[]): void;
    }
    class WjcMultiSelect extends wijmo.input.MultiSelect {
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
        addEventListener(...args: any[]): void;
    }
    class WjcMultiAutoComplete extends wijmo.input.MultiAutoComplete {
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
        addEventListener(...args: any[]): void;
    }
    class WjcInputNumber extends wijmo.input.InputNumber {
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
        addEventListener(...args: any[]): void;
    }
    class WjcInputDate extends wijmo.input.InputDate {
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
        addEventListener(...args: any[]): void;
    }
    class WjcInputTime extends wijmo.input.InputTime {
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
        addEventListener(...args: any[]): void;
    }
    class WjcInputDateTime extends wijmo.input.InputDateTime {
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
        addEventListener(...args: any[]): void;
    }
    class WjcMenu extends wijmo.input.Menu {
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
        addEventListener(...args: any[]): void;
    }
    class WjcPopup extends wijmo.input.Popup {
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
        addEventListener(...args: any[]): void;
    }
}
declare module wijmo.webcomponents {
}
declare module wijmo.webcomponents {
    class WjcPivotGrid extends wijmo.olap.PivotGrid {
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
        addEventListener(...args: any[]): void;
    }
    class WjcPivotChart extends wijmo.olap.PivotChart {
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
        addEventListener(...args: any[]): void;
    }
    class WjcPivotPanel extends wijmo.olap.PivotPanel {
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
        addEventListener(...args: any[]): void;
    }
    class WjcSlicer extends wijmo.olap.Slicer {
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
        addEventListener(...args: any[]): void;
    }
}
declare module wijmo.webcomponents {
}
declare module wijmo.webcomponents {
    class WjcReportViewer extends wijmo.viewer.ReportViewer {
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
        addEventListener(...args: any[]): void;
    }
    class WjcPdfViewer extends wijmo.viewer.PdfViewer {
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
        addEventListener(...args: any[]): void;
    }
}
declare module wijmo.webcomponents {
}
declare module wijmo.webcomponents {
    class WjcTreeView extends wijmo.nav.TreeView {
        _wjBehaviour: WjComponentBehavior;
        constructor();
        static readonly observedAttributes: IPropsMeta;
        connectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
        disconnectedCallback(): void;
        addEventListener(...args: any[]): void;
    }
}
declare module wijmo.webcomponents {
}
