import * as core from '@grapecity/wijmo';
import * as chart from '@grapecity/wijmo.chart';
import * as interaction from '@grapecity/wijmo.chart.interaction';
'use strict';
/**
 * The @see:AxisScrollbar control displays a scrollbar that allows the user to
 * choose the range of Axis.

    */
export class AxisScrollbar {
    /**
     * Initializes a new instance of the @see:AxisScrollbar control.
     *
     * @param axis The axis that displays scrollbar.
     * @param options A JavaScript object containing initialization data for the control.
     */
    constructor(axis, options) {
        // fields
        this._isVisible = true;
        this._min = null;
        this._max = null;
        this._buttonsVisible = true;
        //private _minScale: number = 0.01;
        this._minScale = 0;
        // host
        this._chart = null;
        this._axis = null;
        this._rangeSlider = null;
        // elements
        this._slbarContainer = null;
        this._isXAxis = true;
        this._chartRefreshDelay = null;
        if (!chart) {
            core.assert(false, 'The Axis cannot be null.');
        }
        this._axis = axis;
        this._chart = axis._chart;
        this._isXAxis = this._axis.axisType === chart.AxisType.X;
        core.copy(this, options);
        this._createScrollbar();
    }
    /**
     * Gets or sets the decrease button and increase button is visible or not.
     */
    get buttonsVisible() {
        return this._buttonsVisible;
    }
    set buttonsVisible(value) {
        if (value !== this._buttonsVisible) {
            this._buttonsVisible = core.asBoolean(value);
            if (!this._rangeSlider) {
                return;
            }
            this._rangeSlider.buttonsVisible = this._buttonsVisible;
        }
    }
    /**
     * Gets or sets the visibility of the Axis scrollbar.
     */
    get isVisible() {
        return this._isVisible;
    }
    set isVisible(value) {
        if (value != this._isVisible) {
            this._isVisible = core.asBoolean(value);
            if (!this._rangeSlider) {
                return;
            }
            this._rangeSlider.isVisible = value;
        }
    }
    set minPos(value) {
        if (value < 0 && value > 1 && value > this._rangeSlider._maxPos) {
            return;
        }
        this._rangeSlider._minPos = value;
        this._updateAxisRange();
    }
    set maxPos(value) {
        if (value < 0 && value > 1 && value < this._rangeSlider._minPos) {
            return;
        }
        this._rangeSlider._maxPos = value;
        this._updateAxisRange();
    }
    /**
     * Gets or sets the minimum range scale of the Axis scrollbar.
     * The minimum range scale should be greater than zero.
     */
    get minScale() {
        return this._minScale;
    }
    set minScale(value) {
        if (value > 0 && value != this._minScale) {
            this._minScale = core.asNumber(value);
            if (!this._rangeSlider) {
                return;
            }
            this._rangeSlider.minScale = value;
        }
    }
    /**
     * Removes the range selector from the chart.
     */
    remove() {
        if (this._slbarContainer) {
            this._chart.hostElement.removeChild(this._slbarContainer);
            this._switchEvent(false);
            this._slbarContainer = null;
        }
    }
    _createScrollbar() {
        var chart = this._chart, chartHostEle = chart.hostElement;
        this._slbarContainer = core.createElement('<div class="wj-axis-scrollbar-container"></div>');
        this._rangeSlider = new interaction._RangeSlider(this._slbarContainer, true, // has space click function
        true, // has dec and inc buttons
        {
            buttonsVisible: this._buttonsVisible,
            isHorizontal: this._isXAxis,
            isVisible: this._isVisible,
            minScale: this._minScale,
            seamless: true
        });
        chartHostEle.appendChild(this._slbarContainer);
        this._switchEvent(true);
    }
    _switchEvent(isOn) {
        var eventListener = isOn ? 'addEventListener' : 'removeEventListener', eventHandler = isOn ? 'addHandler' : 'removeHandler';
        if (this._chart.hostElement) {
            this._chart.rendered[eventHandler](this._refresh, this);
            this._rangeSlider.rangeChanged[eventHandler](this._updateAxisRange, this);
            this._rangeSlider.rangeChanging[eventHandler](this._updatingAxisRange, this);
        }
    }
    _refresh() {
        var chartHostEle = this._chart.hostElement, rangeSlider = this._rangeSlider, pa, pOffset, plotBox, axisRect = this._axis._axrect, axisEle, axisOffset, isBottom, isLeft, rsWidth, rOffset = core.getElementRect(this._slbarContainer);
        if (rangeSlider._isSliding) {
            return;
        }
        //init the scrollbar range
        if (this._min === null) {
            this._min = core.isDate(this._axis.actualMin) ? this._axis.actualMin.valueOf() : this._axis.actualMin;
        }
        if (this._max === null) {
            this._max = core.isDate(this._axis.actualMax) ? this._axis.actualMax.valueOf() : this._axis.actualMax;
        }
        pa = chartHostEle.querySelector('.' + chart.FlexChart._CSS_PLOT_AREA);
        pOffset = core.getElementRect(pa);
        plotBox = pa.getBBox(pa);
        //TODO: get the axis element when has multiple axes
        axisEle = chartHostEle.querySelector(this._isXAxis ? '.wj-axis-x' : '.wj-axis-y');
        axisOffset = core.getElementRect(axisEle);
        if (axisOffset.height === 0) {
            return;
        }
        if (this._isXAxis) {
            isBottom = this._axis.position === chart.Position.Bottom;
            rangeSlider._refresh({
                left: plotBox.x,
                top: isBottom ? axisOffset.top + axisOffset.height - rOffset.top :
                    axisOffset.top - rOffset.top - axisOffset.height,
                width: plotBox.width
            });
        }
        else {
            isLeft = this._axis.position === chart.Position.Left;
            rsWidth = rangeSlider._handleWidth;
            rangeSlider._refresh({
                left: isLeft ? axisOffset.left - rOffset.left - rsWidth :
                    axisOffset.left - rOffset.left + pOffset.width + this._axis._axrect.width,
                top: pOffset.top - rOffset.top,
                height: plotBox.height
            });
        }
    }
    _updateAxisRange() {
        var chart, axis, range, rangeSlider = this._rangeSlider;
        chart = this._chart;
        axis = this._axis;
        range = this._max - this._min;
        axis.min = this._min + rangeSlider._minPos * range;
        axis.max = this._min + rangeSlider._maxPos * range;
        chart.invalidate();
    }
    _updatingAxisRange() {
        var self = this;
        this._chartRefreshDelay = window.setTimeout(function () {
            if (self._chartRefreshDelay) {
                clearTimeout(self._chartRefreshDelay);
                self._chartRefreshDelay = null;
            }
            self._updateAxisRange();
        }, 200);
    }
}
