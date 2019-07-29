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
import { WjComponentBehavior, IPropsMeta } from 'wijmo/wijmo.webcomponents.base';
import * as wjcChartRadar from 'wijmo/wijmo.chart.radar';
export declare class WjcFlexRadar extends wjcChartRadar.FlexRadar {
    _wjBehaviour: WjComponentBehavior;
    constructor();
    static readonly observedAttributes: IPropsMeta;
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    disconnectedCallback(): void;
    addEventListener(...args: any[]): void;
}
export declare class WjcFlexRadarAxis extends HTMLElement {
    static wrappedClass: () => typeof wjcChartRadar.FlexRadarAxis;
    static parentProp: string;
    _wjBehaviour: WjComponentBehavior;
    constructor();
    static readonly observedAttributes: IPropsMeta;
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    disconnectedCallback(): void;
}
export declare class WjcFlexRadarSeries extends HTMLElement {
    static wrappedClass: () => typeof wjcChartRadar.FlexRadarSeries;
    static parentProp: string;
    static siblingId: string;
    _wjBehaviour: WjComponentBehavior;
    constructor();
    static readonly observedAttributes: IPropsMeta;
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    disconnectedCallback(): void;
}
