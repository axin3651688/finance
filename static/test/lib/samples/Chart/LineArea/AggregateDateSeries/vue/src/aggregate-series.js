import * as wijmo from '@grapecity/wijmo';
import * as chart from '@grapecity/wijmo.chart';
//
export class AggregateSeries extends chart.Series {
    constructor() {
        super();
        this._autoInterval = false;
        this._autoGroupIntervals = ['ss', '10ss', '30ss', 'mm', '10mm', '30mm', 'hh', 'DD', 'WW', 'MM', 'YYYY'];
        this._autoMaxGroupings = 150;
        this._groupInterval = null;
        this._groupAggregate = wijmo.Aggregate.Avg;
        this._isGrouped = false;
        this._rcHandlerAdded = false;
        // event to notify subscribers that the event changed
        this.groupChanged = new wijmo.Event();
    }
    //
    // gets/sets whether the interval is calculated automatically based on the displayed range
    // currently, we try to display the largest amount of data possible for the displayed range
    // that meets the autoMaxGroupings requirement
    get autoInterval() {
        return this._autoInterval;
    }
    set autoInterval(value) {
        if (this._autoInterval !== value) {
            this._autoInterval = wijmo.asBoolean(value, false);
            this._clearValues();
            this._invalidate();
        }
    }
    //
    // gets/sets the group intervals when autoInterval=true
    // note that these are calculated in advance and should be limited to
    // what's necessary for performance reasons.  these values should also make sense
    // for the provided data set: it doesn't make sense to group by minutes or seconds
    // when providing daily or weekly data
    get autoGroupIntervals() {
        return this._autoGroupIntervals;
    }
    set autoGroupIntervals(value) {
        if (this._autoGroupIntervals !== value) {
            value = wijmo.asArray(value, false);
            value.forEach(val => wijmo.assert(this._isValidInterval(wijmo.asString(val, false)), 'Invalid autoGroupIntervals'), this);
            this._autoGroupIntervals = value;
            this._clearValues();
            this._invalidate();
        }
    }
    //
    // gets/sets the maximum number of groupings, as a positive integer, when autoInterval=true
    // when this value is exceeded, the next interval is applied
    // if set to zero, no grouping will be applied
    get autoMaxGroupings() {
        return this._autoMaxGroupings;
    }
    set autoMaxGroupings(value) {
        if (this._autoMaxGroupings !== value) {
            this._autoMaxGroupings = wijmo.asInt(value, false, true);
            this._clearValues();
            this._invalidate();
        }
    }
    //
    // gets/sets the group interval when autoInterval=false
    // null or 'null' string literal will clear the groups
    get groupInterval() {
        return this._groupInterval;
    }
    set groupInterval(value) {
        if (this._groupInterval !== value) {
            if (value !== null && value !== 'null') {
                wijmo.assert(this._isValidInterval(wijmo.asString(value, true)), 'Invalid groupInterval');
            }
            this._groupInterval = wijmo.asString(value, true);
            this._clearValues();
            this._invalidate();
        }
    }
    //
    // gets/sets the aggregate for groups
    get groupAggregate() {
        return this._groupAggregate;
    }
    set groupAggregate(value) {
        value = wijmo.asEnum(value, wijmo.Aggregate, false);
        if (this._groupAggregate !== value) {
            this._groupAggregate = value;
            this._clearValues();
            this._invalidate();
        }
    }
    // fires group changed event
    onGroupChanged() {
        let lbls = this._allAxisLabels[this._currentInterval],
            len = lbls.length;
        let args = {
            aggregate: this.groupAggregate,
            interval: this._currentInterval,
            count: len,
            start: lbls[0],
            end: lbls[len - 1]
        };
        //
        if (this.groupChanged.hasHandlers) {
            this.groupChanged.raise(this, args);
        }
    }
    //
    getValues(dim) {
        this._addRangeChangedHandler();
        this._group();
        //
        // verify grouping has been applied and return as normal if not
        if (!this._isGrouped || !this._currentInterval) {
            return super.getValues(dim);
        }
        //
        let values = this._allValues[this._currentInterval],
            propName = dim === 0 ? this._getBinding(0) : this.bindingX;
        //
        return values.map(item => {
            if (wijmo.isDate(item[propName])) {
                return item[propName].valueOf();
            } else {
                return item[propName];
            }
        });
    }
    //
    _getBindingValues(index) {
        this._addRangeChangedHandler();
        this._group();
        //
        // verify grouping has been applied and return as normal if not
        if (!this._isGrouped || !this._currentInterval) {
            return super._getBindingValues(index);
        }
        //
        let values = this._allValues[this._currentInterval],
            propName = this._getBinding(index);
        //
        return values.map(item => item[propName]);
    }
    //
    _clearValues() {
        this._isGrouped = false;
        this._allValues = null;
        this._allAxisLabels = null;
        this._currentInterval = null;
        //
        // remove axisX.rangeChanged handler and reset axisX.itemsSource
        let ax = this._getAxisX();
        if (ax && this._rcHandlerAdded) {
            ax.rangeChanged.removeHandler(this._rangeChangedHandler, this);
            this._rcHandlerAdded = false;
        }
        //
        if (ax && ax.itemsSource) {
            ax.itemsSource = null;
        }
        //
        // restore bounds
        let ay = this._getAxisY();
        if (ay) {
            ay.min = null;
            ay.max = null;
        }
    }
    //
    // override for hit testing and financial chart types
    _getItem(index) {
        this._addRangeChangedHandler();
        this._group();

        let retval = null;
        if (this._isGrouped && this._allValues[this._currentInterval].length > index) {
            retval = this._allValues[this._currentInterval][index];
        } else {
            retval = super._getItem(index);
        }
        return retval;
    }
    //
    // helper to add range changed event handler
    _addRangeChangedHandler() {
        if (!this._rcHandlerAdded) {
            let ax = this._getAxisX();
            if (!ax) { return; }
            //
            // add handler and update boolean flag
            ax.rangeChanged.addHandler(this._rangeChangedHandler, this);
            this._rcHandlerAdded = true;
        }
    }
    //
    // event handler for axisX.rangeChanged when autoInterval=true
    _rangeChangedHandler(sender) {
        if (this.autoInterval) {
            let min = sender.actualMin,
                max = sender.actualMax;

            // get ms representation of dates
            if (wijmo.isDate(min)) {
                min = min.valueOf();
            }
            if (wijmo.isDate(max)) {
                max = max.valueOf();
            }

            this._selectInterval(min, max);
        }
    }
    //
    // acts as a controller to apply groupings and etc. based on autoInterval state
    _group() {
        if (this._isGrouped || !this._canGroup()) { return; }
        //
        let ax = this._getAxisX();
        //
        this._allValues = {};
        this._allAxisLabels = {};
        //
        if (this.autoInterval) {
            let i = 0, interval;
            for (i = 0; i < this.autoGroupIntervals.length; i++) {
                interval = this.autoGroupIntervals[i];
                this._applyGroup(interval, this.groupAggregate);
            }
        } else {
            this._applyGroup(this.groupInterval, this.groupAggregate);
            this._currentInterval = this.groupInterval;
        }
        //
        this._isGrouped = true;
        //
        if (this.autoInterval) {
            ax.onRangeChanged();
        } else {
            this._updateAxes(false);
            this.onGroupChanged();
        }
    }
    //
    // responsible for creating a single group when autoInterval=false
    _applyGroup(key, aggregate) {
        let cv = new wijmo.CollectionView(this.collectionView.items),
            match,
            gd,
            bindings = this.binding.split(','),
            interval,
            subInterval,
            row = 0,
            col = 0,
            item;
        //
        // split interval string
        match = this._splitIntervalString(key);
        if (match.length > 1) {
            subInterval = parseInt(match[0]);
            interval = match[1];
        } else {
            subInterval = 1;
            interval = match[0];
        }
        //
        // handle grouping values
        this._allValues[key] = [];
        gd = this._getGroupDescription(this.bindingX, interval, subInterval);
        cv.groupDescriptions.push(gd);
        for (row = 0; row < cv.groups.length; row++) {
            item = {};
            //
            // handle y bindings
            for (col = 0; col < bindings.length; col++) {
                item[bindings[col]] = cv.groups[row].getAggregate(aggregate, bindings[col]);
            }
            //
            // handle x binding - dates only at the moment
            item[this.bindingX] = new Date(cv.groups[row].name);
            //
            this._allValues[key].push(item);
        }
        //
        // handle axis labels
        this._allAxisLabels[key] = [];
        for (row = 0; row < this._allValues[key].length; row++) {
            this._allAxisLabels[key].push({
                value: this._allValues[key][row][this.bindingX].valueOf(),
                text: wijmo.Globalize.formatDate(this._allValues[key][row][this.bindingX], this._getFormatX(interval))
            });
        }
    }
    //
    // gets the appropriate key (i.e. derived data set) based on given range
    _selectInterval(xmin, xmax) {
        if (!this._autoInterval || !this._isGrouped || (!isFinite(xmin) || !wijmo.isNumber(xmin)) || (!isFinite(xmax) || !wijmo.isNumber(xmax))) {
            return;
        }
        //
        let len = this.autoGroupIntervals.length,
            rangeVals,
            labels,
            counts = {},
            key;
        //
        // find visible range for each grouped set
        for (let i = 0; i < len; i++) {
            key = this._autoGroupIntervals[i];
            labels = this._allAxisLabels[key];
            rangeVals = this._getValuesInXRange(labels, 'value', xmin, xmax);
            counts[key] = rangeVals.length;
        }
        key = null;
        //
        // find largest visible range less than maxGroupings
        let temp = 0;
        for (let i = 0; i < len; i++) {
            if (counts[this._autoGroupIntervals[i]] > temp && counts[this._autoGroupIntervals[i]] <= this.autoMaxGroupings) {
                temp = counts[this._autoGroupIntervals[i]];
                key = this._autoGroupIntervals[i];
            }
        }
        //
        // change current key
        if (key && key !== this._currentInterval) {
            this._currentInterval = key;

            // fire event
            this.onGroupChanged();
        }
        //
        // update axes
        if (this._currentInterval) {
            this._updateAxes(true);
        }
    }
    //
    // updates axisX.itemsSource and axisY.[min/max]
    // subset determines if the data is filtered to the current range or not
    _updateAxes(subset) {
        let ay = this._getAxisY(),
            ax = this._getAxisX(),
            ymin = Number.MAX_VALUE,
            ymax = Number.MIN_VALUE,
            xmin = ax.actualMin,
            xmax = ax.actualMax,
            bindings = this.binding.split(','),
            values,
            propVal;
        //
        values = subset
            ? this._getValuesInXRange(this._allValues[this._currentInterval], this.bindingX, xmin, xmax)
            : this._allValues[this._currentInterval];
        //
        // find ymin/ymax for visible x range for all bound y-values
        for (let i = 0; i < values.length; i++) {
            for (let j = 0; j < bindings.length; j++) {
                propVal = values[i][bindings[j]];

                if (propVal < ymin) {
                    ymin = propVal;
                }
                if (ymax < propVal) {
                    ymax = propVal;
                }
            }
        }
        //
        this.chart.beginUpdate();
        //
        // update axisY limits
        if (isFinite(ymin) && wijmo.isNumber(ymin) && ymin !== Number.MAX_VALUE) {
            ay.min = ymin;
        }
        if (isFinite(ymax) && wijmo.isNumber(ymax) && ymax !== Number.MIN_VALUE) {
            ay.max = ymax;
        }
        //
        // update axisX.itemsSource for current interval
        this._getAxisX().itemsSource = this._allAxisLabels[this._currentInterval];
        //
        this.chart.endUpdate();
    }
    //
    // helper to filter _allValues and _allAxisLabels for visible x-range
    _getValuesInXRange(values, propName, xmin, xmax) {
        if (wijmo.isDate(xmin)) {
            xmin = xmin.valueOf();
        }
        if (wijmo.isDate(xmax)) {
            xmax = xmax.valueOf();
        }
        //
        return values.filter(item => {
            let prop = item[propName];
            if (wijmo.isDate(prop)) {
                prop = prop.valueOf();
            }
            return xmin <= prop && prop <= xmax;
        });
    }
    //
    // gets the group description
    _getGroupDescription(bindingX, interval, subInterval = 1) {
        let fn = null;
        subInterval = subInterval || 1;
        switch (interval) {
            case 'YYYY':
                fn = (item, propName) => {
                    let year = wijmo.asDate(item[propName]).getFullYear();
                    return new Date(year, 0, 1);
                };
                break;
            case 'MM':
                fn = (item, propName) => {
                    let d = wijmo.asDate(item[propName]),
                        month = d.getMonth(),
                        year = d.getFullYear();
                    return new Date(year, month, 1);
                };
                break;
            case 'WW':
                fn = (item, propName) => {
                    let d = wijmo.asDate(item[propName]),
                        month = d.getMonth(),
                        dayOfWeek = d.getDay(),
                        day = d.getDate(),
                        year = d.getFullYear();
                    return new Date(year, month, day - dayOfWeek);
                };
                break;
            case 'DD':
                fn = (item, propName) => {
                    let d = wijmo.asDate(item[propName]),
                        month = d.getMonth(),
                        date = d.getDate(),
                        year = d.getFullYear();
                    return new Date(year, month, date);
                };
                break;
            case 'hh':
                fn = (item, propName) => {
                    let d = wijmo.asDate(item[propName]),
                        month = d.getMonth(),
                        date = d.getDate(),
                        year = d.getFullYear(),
                        hour = d.getHours();
                    return new Date(year, month, date, hour - (hour % subInterval));
                };
                break;
            case 'mm':
                fn = (item, propName) => {
                    let d = wijmo.asDate(item[propName]),
                        month = d.getMonth(),
                        date = d.getDate(),
                        year = d.getFullYear(),
                        hour = d.getHours(),
                        minute = d.getMinutes();
                    return new Date(year, month, date, hour, minute - (minute % subInterval));
                };
                break;
            case 'ss':
                fn = (item, propName) => {
                    let d = wijmo.asDate(item[propName]),
                        month = d.getMonth(),
                        date = d.getDate(),
                        year = d.getFullYear(),
                        hour = d.getHours(),
                        minute = d.getMinutes(),
                        second = d.getSeconds();
                    return new Date(year, month, date, hour, minute, second - (second % subInterval));
                };
                break;
            default:
                wijmo.assert(false, 'Invalid groupInterval');
                break;
        }
        //
        return new wijmo.PropertyGroupDescription(bindingX, fn);
    }
    //
    // parse a given interval string, returning interval (ex. seconds) and sub-interval (ex. 30 seconds);
    _splitIntervalString(value) {
        return value ? value.match(/[a-zA-Z\.]+|[0-9?(\.0-9)]+/g) : [];
    }
    //
    // determines whether grouping can be applied based on the current series configuration
    _canGroup() {
        let retval = wijmo.isString(this.binding) && wijmo.isString(this.bindingX) && this.groupAggregate !== wijmo.Aggregate.None && this.collectionView !== null && !wijmo.isUndefined(this.collectionView);
        //
        if (this.autoInterval) {
            retval = retval && this.autoGroupIntervals && this.autoMaxGroupings ? true : false;
        } else {
            retval = retval && this._isValidInterval(this.groupInterval);
        }
        return retval;
    }
    //
    // determine if a given interval (and optional sub-interval) is valid
    _isValidInterval(interval) {
        let match = this._splitIntervalString(interval),
            subInterval = 1;
        //
        if (match.length !== 1 && match.length !== 2) {
            return false;
        }
        //
        interval = match.length > 1 ? match[1] : match[0];
        subInterval = match.length > 1 ? +match[0] : subInterval;
        //
        return ['ss', 'mm', 'hh', 'DD', 'WW', 'MM', 'YYYY'].indexOf(interval) >= 0 && wijmo.isInt(subInterval);
    }
    //
    // gets the format string for a given interval unless axisX.format is set
    _getFormatX(interval) {
        let retval = this._getAxisX().format;
        if (retval) {
            return retval;
        }
        //
        switch (interval) {
            case 'YYYY':
                retval = 'yyyy';
                break;
            case 'MM':
                retval = 'MMM yyyy';
                break;
            case 'hh':
            case 'mm':
                retval = 'g';
                break;
            case 'ss':
                retval = 'G';
                break;
            case 'DD':
            case 'WW':
            default:
                retval = 'd';
                break;
        }
        //
        return retval;
    }
}