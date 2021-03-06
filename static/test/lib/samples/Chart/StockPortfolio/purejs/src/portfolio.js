import * as core from '@grapecity/wijmo';
/**
 * Represents the period to be shown in the chart.
 */
export var ChartPeriod;
(function (ChartPeriod) {
    ChartPeriod[ChartPeriod["YTD"] = 0] = "YTD";
    ChartPeriod[ChartPeriod["m6"] = 1] = "m6";
    ChartPeriod[ChartPeriod["m12"] = 2] = "m12";
    ChartPeriod[ChartPeriod["m24"] = 3] = "m24";
    ChartPeriod[ChartPeriod["m36"] = 4] = "m36";
    ChartPeriod[ChartPeriod["All"] = 5] = "All"; /** Show all data. */
})(ChartPeriod || (ChartPeriod = {}));
/**
 * Represents a portfolio composed of items.
 * Each item corresponds to a company and includes the amount of shares
 * purchase and the purchase price.
 */
export class Portfolio {
    constructor() {
        this._chartPeriod = ChartPeriod.m12;
        // raise event when items change 
        // (on a timeout to avoid too many updates)
        this.itemsChanged = new core.Event();
        // initialize items collection/view
        this._items = new core.ObservableArray();
        this._cv = new core.CollectionView(this._items);
        this._cv.collectionChanged.addHandler(this.viewChanged.bind(this));
        // load the portfolio from storage
        this.loadItems();
        // if we have no items, add a few now
        if (this._items.length == 0) {
            this.addItem('AMZN', true, 10, 295);
            this.addItem('AAPL', true, 10, 570);
            this.addItem('GOOG', true, 10, 520);
            this.addItem('FB');
            this.addItem('GM');
        }
        // save portfolio when unloading
        var self = this;
        window.addEventListener('unload', function () {
            self.saveItems();
        });
    }
    viewChanged() {
        var self = this;
        if (!self._updating) {
            self._updating = true;
            if (self._toChange) {
                clearTimeout(self._toChange);
            }
            self._toChange = setTimeout(function () {
                self.updateChartData();
                self.itemsChanged.raise(self);
                self._cv.refresh();
                self._updating = false;
                //console.log('raised itemsChanged'); 
            }, 250);
        }
    }
    // gets the view with the portfolio items
    get view() {
        return this._cv;
    }
    // gets or sets the chart period
    get chartPeriod() {
        return this._chartPeriod;
    }
    set chartPeriod(value) {
        this._chartPeriod = value;
        this.updateChartData();
        this.viewChanged();
    }
    // gets the chart start date based on the current date and chart period
    getChartStartDate() {
        var dt = new Date();
        switch (this.chartPeriod) {
            case ChartPeriod.All:
                return new Date(2005, 1, 1);
            case ChartPeriod.YTD:
                return new Date(dt.getFullYear(), 0, 1);
            case ChartPeriod.m6:
                dt.setMonth(dt.getMonth() - 6);
                return dt;
            case ChartPeriod.m12:
                dt.setFullYear(dt.getFullYear() - 1);
                return dt;
            case ChartPeriod.m24:
                dt.setFullYear(dt.getFullYear() - 2);
                return dt;
            case ChartPeriod.m36:
                dt.setFullYear(dt.getFullYear() - 3);
                return dt;
        }
        // unknown period, use the last 12 months
        dt.setFullYear(dt.getFullYear() - 1);
        return dt;
    }
    // add new item
    addNewItem() {
        if (this.newItemSymbol != null) {
            this.addItem(this.newItemSymbol);
            this.newItemSymbol = null;
        }
    }
    canAddNewItem() {
        return this.newItemSymbol && this.indexOf(this.newItemSymbol) < 0;
    }
    get newItemSymbol() {
        return this._newItemSymbol;
    }
    set newItemSymbol(value) {
        this._newItemSymbol = value;
    }
    // gets the cost paid for the shares in the portfolio
    get cost() {
        var cost = 0, items = this._cv.items;
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var s = item.shares;
            var p = item.purchasePrice;
            if (s && p) {
                cost += s * p;
            }
        }
        return cost > 0 ? cost : null;
    }
    // gets the market value of the shares in the portfolio
    get value() {
        var value = 0, items = this._cv.items;
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var s = item.shares;
            var p = item.lastPrice;
            if (s && p) {
                value += s * p;
            }
        }
        return value > 0 ? value : null;
    }
    // gets the gain earned with the shares in the portfolio
    get gain() {
        var v = this.value;
        var c = this.cost;
        return v && c ? v - c : null;
    }
    // gets the percentage gain earned with the shares in the portfolio
    get gainPercent() {
        var v = this.value;
        var c = this.cost;
        return v && c ? v / c - 1 : null;
    }
    // load items from local storage
    loadItems() {
        try {
            var data = localStorage != null ? localStorage[Portfolio.STGKEY] : null;
            if (data != null && JSON != null) {
                data = JSON.parse(data);
                this.chartPeriod = data.chartPeriod;
                for (var i = 0; i < data.items.length; i++) {
                    var item = data.items[i];
                    this.addItem(item.symbol, item.chart, item.shares, item.purchasePrice);
                }
                if (data.sort) {
                    var sd = new core.SortDescription(data.sort.property, data.sort.ascending);
                    this.view.sortDescriptions.push(sd);
                }
            }
        }
        catch (err) { }
    }
    // save items to local storage
    saveItems() {
        try {
            if (localStorage != null && JSON != null) {
                var data = {
                    chartPeriod: this.chartPeriod,
                    sort: null,
                    items: [],
                };
                if (this.view.sortDescriptions.length > 0) {
                    var sd = this.view.sortDescriptions[0];
                    data.sort = { property: sd.property, ascending: sd.ascending };
                }
                for (var i = 0; i < this._cv.items.length; i++) {
                    var item = this._cv.items[i];
                    var newItem = {
                        symbol: item.symbol,
                        chart: item.chart,
                        shares: item.shares,
                        purchasePrice: item.purchasePrice
                    };
                    data.items.push(newItem);
                }
                localStorage[Portfolio.STGKEY] = JSON.stringify(data);
            }
        }
        catch (err) { }
    }
    // add an item to the portfolio
    addItem(symbol, chart = true, shares = null, purchasePrice = null) {
        if (symbol) {
            var index = this.indexOf(symbol);
            if (index < 0) {
                var item = new PortfolioItem(this, symbol, chart, shares, purchasePrice);
                this._items.push(item);
            }
        }
    }
    // remove an item from the portfolio
    removeItem(symbol) {
        var index = this.indexOf(symbol);
        if (index > -1) {
            this._items.splice(index, 1);
        }
    }
    // gets the index of an item in the portfolio given a symbol
    indexOf(symbol) {
        if (symbol) {
            symbol = symbol.toUpperCase();
            for (var i = 0; i < this._items.length; i++) {
                if (this._items[i].symbol == symbol) {
                    return i;
                }
            }
        }
        return -1;
    }
    // get a company from the global cache or load it if necessary
    getCompany(symbol) {
        var self = this, protocol = 'https', c = Portfolio._companyCache[symbol], url = '://www.quandl.com/api/v3/datasets/WIKI/', token = 'rX6NsszGKZp32RUbA7SR', startDate = core.Globalize.formatDate(new Date("01/01/2008"), "yyyy-MM-dd"), endDate = core.Globalize.formatDate(new Date(), "yyyy-MM-dd");
        if (navigator.appVersion.indexOf("MSIE 9.") != -1) {
            //$.support.cors = true;
            protocol = "http";
        }
        // company not in cache? create now
        if (c == null) {
            // create and store in cache
            c = new Company(symbol);
            Portfolio._companyCache[symbol] = c;
            // get company name
            core.httpRequest(protocol + url + symbol, {
                data: {
                    auth_token: token,
                    column_index: 11,
                    start_date: startDate,
                    end_date: endDate
                },
                //order: 'asc',
                success: function (result) {
                    let res = JSON.parse(result.response);
                    c.name = res.dataset.name.substring(0, res.dataset.name.indexOf('('));
                    self.viewChanged();
                    //console.log('got ' + c.symbol + 'name: ' + c.name);
                    // store prices
                    var lines = res.dataset.data;
                    for (var i = 0; i < lines.length; i++) {
                        var item = lines[i];
                        var date = new Date(item[0].trim().replace(/-/g, '/')), price = parseFloat(item[1]);
                        c.prices.push({ date: date, price: price });
                    }
                    self.viewChanged();
                    //console.log('got ' + c.prices.length + ' prices for ' + c.name);
                }
            });
        }
        return c;
    }
    // updates the chart data for all items
    updateChartData() {
        for (var i = 0; i < this._items.length; i++) {
            this._items[i].updateChartData();
        }
    }
}
Portfolio.STGKEY = 'invxItemsV2';
Portfolio._companyCache = {};
/**
 * Represents a portfolio item.
 * Each item corresponds to a company and includes the amount of shares
 * purchase and the purchase price.
 */
export class PortfolioItem {
    constructor(portfolio, symbol, chart, shares, purchasePrice) {
        this._chartData = [];
        this._portfolio = portfolio;
        this._chart = chart;
        this._shares = shares;
        this._purchasePrice = purchasePrice;
        this._company = portfolio.getCompany(symbol);
    }
    get symbol() {
        return this._company.symbol;
    }
    get name() {
        return this._company.name;
    }
    get color() {
        if (!this._company.color) {
            var xx = 'aha';
        }
        return this._company.color;
    }
    get chart() {
        return this._chart;
    }
    set chart(value) {
        if (this._chart != value) {
            this._chart = value;
            this._portfolio.viewChanged();
        }
    }
    get chartData() {
        return this._chartData;
    }
    get lastPrice() {
        if (this._company && this._company.prices && this._company.prices.length > 0) {
            var p = this._company.prices;
            return p[0].price;
        }
        return null;
    }
    get change() {
        if (this._company && this._company.prices && this._company.prices.length > 1) {
            var p = this._company.prices;
            return p[0].price - p[1].price;
        }
        return null;
    }
    get changePercent() {
        if (this._company && this._company.prices && this._company.prices.length > 1) {
            var p = this._company.prices;
            if (p[1].price != 0) {
                return p[0].price / p[1].price - 1;
            }
        }
        return null;
    }
    get shares() {
        return this._shares;
    }
    set shares(value) {
        value = value * 1;
        if (value <= 0 || isNaN(value)) {
            value = null;
        }
        this._shares = value;
    }
    get purchasePrice() {
        return this._purchasePrice;
    }
    set purchasePrice(value) {
        value = value * 1;
        if (value <= 0 || isNaN(value)) {
            value = null;
        }
        this._purchasePrice = value;
    }
    get costBasis() {
        var s = this._shares, p = this._purchasePrice;
        return s && p ? s * p : null;
    }
    get marketValue() {
        var s = this._shares, p = this.lastPrice;
        return s && p ? s * p : null;
    }
    get gain() {
        var c = this.costBasis, v = this.marketValue;
        return c && v ? v - c : null;
    }
    get gainPercent() {
        var v = this.marketValue, c = this.costBasis;
        return v && c ? v / c - 1 : null;
    }
    // updates the data to be shown on the chart
    updateChartData() {
        var firstValue = null, chartData = [], prices = this._company.prices, startDate = this._portfolio.getChartStartDate();
        // calculate prices as variation relative to the first value
        // note: prices array starts with the current date
        for (var i = prices.length - 1; i >= 0; i--) {
            var p = prices[i];
            // skip entries that are not within the period
            if (p.date.getTime() < startDate.getTime()) {
                continue;
            }
            // set price
            if (firstValue == null) {
                firstValue = p.price;
            }
            var change = (p.price / firstValue) - 1;
            chartData.push({ date: p.date, price: p.price, change: change });
        }
        // save chart data
        this._chartData = chartData;
        //console.log('updated chart data for ' + this.symbol + ' ' + this.chartData.length + ' items');
    }
}
/**
 * Represents a publicly traded company.
 * The class contains the company name, ticker symbol, price history,
 * and the color used to represent the company in the UI.
 */
export class Company {
    constructor(symbol) {
        this.prices = [];
        this.symbol = symbol;
        this.color = Company._palette[Company._ctr % Company._palette.length];
        Company._ctr++;
    }
}
Company._palette = [
    // Google
    '#3366CC', '#DC3912', '#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6',
    '#DD4477', '#66AA00', '#B82E2E', '#316395', '#994499', '#22AA99', '#AAAA11',
    '#6633CC', '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC', '#000000',
    // Office
    '#FFBE00', '#94D752', '#00B652', '#00B6EF', '#0075C6', '#002263', '#73359C',
    '#B53D9C', '#BD3D6B', '#AD65BD', '#DE6D33', '#FFB638', '#CE6DA5', '#FF8E38',
    '#525D6B', '#FF8633', '#739ADE', '#B52B15', '#F7CF2B', '#ADBAD6', '#737D84',
    '#424452', '#737DA5', '#9CBACE', '#D6DB7B', '#FFDB7B', '#BD8673', '#8C726B',
    '#424C22', '#A5B694', '#F7A642', '#E7BE2B', '#D692A5', '#9C86C6', '#849EC6',
    '#4A2215', '#3892A5', '#FFBA00', '#C62B2B', '#84AA33', '#944200', '#42598C',
    '#383838', '#6BA2B5', '#CEAE00', '#8C8AA5', '#738663', '#9C9273', '#7B868C',
    '#15487B', '#4A82BD', '#C6504A', '#9CBA5A', '#8465A5', '#4AAEC6', '#F79642',
    '#6B656B', '#CEBA63', '#9CB284', '#6BB2CE', '#6386CE', '#7B69CE', '#A578BD',
    '#332E33', '#F77D00', '#382733', '#15597B', '#4A8642', '#63487B', '#C69A5A',
    '#636984', '#D6604A', '#CEB600', '#28AEAD', '#8C7873', '#8CB28C', '#0E924A' // Civic
];
Company._ctr = 0;
