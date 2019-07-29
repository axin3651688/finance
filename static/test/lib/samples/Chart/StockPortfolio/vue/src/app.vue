<template>
    <div class="container-fluid" v-show="portfolio">
        <div class="panel panel-default">
            <div class="panel-heading">Portfolio</div>
            <div class="table-responsive" style="overflow-y:visible">
                <table class="table table-condensed">
                    <thead>
                        <tr style="cursor:pointer">
                            <th class="text-left" style="width:23px;"><span>Name</span></th>
                            <th class="text-left"><span>Symbol</span></th>
                            <th class="text-center"><span>Chart</span></th>
                            <th class="text-right"><span>Last Price</span></th>
                            <th class="text-right"><span>Change</span></th>
                            <th class="text-right"><span>Shares</span></th>
                            <th class="text-right"><span>Price</span></th>
                            <th class="text-right"><span>Cost Basis</span></th>
                            <th class="text-right"><span>Market Value</span></th>
                            <th class="text-right"><span>Gain</span></th>
                            <th class="text-center">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="cursor: pointer" v-for="item in portfolio.view.items.slice()"
                                :class="{active: (item && item.symbol) == (portfolio.view.currentItem && portfolio.view.currentItem.symbol)}"
                                v-on:click="portfolio.view.moveCurrentTo(item)">
                            <td class="clipCell">
                                <span :style="{'background-color' : item.color}">
                                    &nbsp;&nbsp;&nbsp;
                                </span>
                                &nbsp;
                                {{item.name}}
                            </td>
                            <td>
                                <a :href="'https://www.quandl.com/data/WIKI/' + (item && item.symbol)" target="_blank">
                                    {{item && item.symbol}}
                                </a>
                            </td>
                            <td class="text-center">
                                <input type="checkbox" v-model="item.chart" />
                            </td>
                            <td class="text-right">
                                {{format(item.lastPrice, 'n2')}}
                            </td>
                            <td class="text-right">
                                <span :style="{color: getAmountColor(item.change)}">
                                    {{format(item.changePercent, 'p2')}}
                                </span>
                            </td>
                            <td class="text-right inputCell" style="padding: 2px;">
                                <wj-input-number :value="item.shares" :isRequired="false" :min="0" format="n0">
                                </wj-input-number>
                            </td>
                            <td class="text-right inputCell" style="padding: 2px;">
                                <wj-input-number :value="item.purchasePrice" :isRequired="false" :min="0" format="n2">
                                </wj-input-number>
                            </td>
                            <td class="text-right">
                                {{format(item.costBasis, 'n2')}}
                            </td>
                            <td class="text-right">
                                {{format(item.marketValue, 'n2')}}
                            </td>
                            <td class="text-right">
                                <span :style="{color: getAmountColor(item.gain)}">
                                    {{format(item.gainPercent, 'p2')}}
                                </span>
                            </td>
                            <td class="text-center">
                                <a  v-on:click="portfolio.removeItem(item&&item.symbol)">
                                    <span class="glyphicon glyphicon-remove" style="color:#D14836"></span>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr class="panel-footer" v-on:click="portfolio.view.moveCurrentTo(null)">
                            <td class="text-right">
                                <b>Add to portfolio:</b>
                            </td>
                            <td colspan="4">
                                <div class="input-group">
                                    <wj-auto-complete :itemsSourceFunction="searchCompany" displayMemberPath="symbolName" selectedValuePath="symbol"
                                        :selectedValue="selectedCompany" :showDropDownButton="false" placeholder="company name or symbol"
                                        :selectedIndexChanged="autoCompleteChanged" cssMatch="match">
                                    </wj-auto-complete>
                                    <span>
                                        <button type="button" class="btn btn-primary" v-on:click="addBtnClick" :disabled="addBtnDisabled">
                                            <span class="glyphicon glyphicon-plus"></span>
                                        </button>
                                    </span>
                                </div>
                            </td>
                            <td class="text-right" colspan="2">
                                <b>Total:</b>
                            </td>
                            <td class="text-right">
                                <b>{{format(portfolio.cost, 'n2')}}</b>
                            </td>
                            <td class="text-right">
                                <b>{{format(portfolio.value, 'n2')}}</b>
                            </td>
                            <td class="text-right">
                                <span :style="{color: getAmountColor(portfolio.gain)}">
                                    <b>{{format(portfolio.gainPercent, 'p2')}}</b>
                                </span>
                            </td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
        <!-- chart -->
        <div class="panel panel-default">
            <div class="panel-heading">
                Chart
                <div class="btn-group btn-group-xs pull-right">
                    <button type="button" style="visibility: hidden" class="btn btn-default" v-on:click="portfolio.chartPeriod=0" :class="{active: portfolio.chartPeriod == 0}">YTD</button>
                    <button type="button" style="visibility: hidden" class="btn btn-default" v-on:click="portfolio.chartPeriod=1" :class="{active: portfolio.chartPeriod == 1}">6m</button>
                    <button type="button" class="btn btn-default" v-on:click="portfolio.chartPeriod=2" :class="{active: portfolio.chartPeriod == 2}">12m</button>
                    <button type="button" class="btn btn-default" v-on:click="portfolio.chartPeriod=3" :class="{active: portfolio.chartPeriod == 3}">24m</button>
                    <button type="button" class="btn btn-default" v-on:click="portfolio.chartPeriod=4" :class="{active: portfolio.chartPeriod == 4}">36m</button>
                    <button type="button" class="btn btn-default" v-on:click="portfolio.chartPeriod=5" :class="{active: portfolio.chartPeriod == 5}">All</button>
                </div>
            </div>
            <wj-flex-chart binding="change" bindingX="date" chartType="Line" selectionMode="Series" :initialized="initializeChart"
                    :selectionChanged="selectionChanged" style="height:300px;margin:14px;border:none">
                <wj-flex-chart-series v-for="item in portfolio.view.items" :itemsSource="item.chartData" :name="item&&item.symbol"
                    :style="{ 'stroke' : item.color }" :visibility="item.chart ? 'Visible' : 'Hidden'">
                </wj-flex-chart-series>
                <wj-flex-chart-axis wjProperty="axisY" format="p0"></wj-flex-chart-axis>
                <wj-flex-chart-axis wjProperty="axisX" format="MMM-yyyy"></wj-flex-chart-axis>
                <wj-flex-chart-legend position="None"></wj-flex-chart-legend>
            </wj-flex-chart>
        </div>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';
    import '@grapecity/wijmo.vue2.chart';
    import { getCompany } from './data';
    import { Portfolio } from './portfolio';
    import * as wjChart from '@grapecity/wijmo.chart';
    import * as wjCore from '@grapecity/wijmo';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                portfolio: new Portfolio(),
                searchCompany: null,
                addBtnDisabled: true,
                selectedCompany: ''
            }
        },
        mounted: function() {
            this.initTableHeader();
            this.portfolio.view.currentChanged.addHandler(this._currentChanged, this);
            this.searchCompany = getCompany.bind(this);
        },
        methods: {
            addBtnClick: function() {
                this.portfolio.addNewItem();
                this.addBtnDisabled = true;
                this.selectedCompany = '';
            },
            initializeChart: function(flex) {
                this.theChart = flex;
            },
            format: function(value, format) {
                return wjCore.Globalize.format(value, format);
            },
            autoCompleteChanged: function(autoComplete) {
                if(autoComplete.selectedValue != null && autoComplete.selectedValue != '') {
                    this.portfolio.newItemSymbol = autoComplete.selectedValue;
                    this.selectedCompany = autoComplete.selectedValue;
                    this.addBtnDisabled = false;
                } else {
                    this.portfolio.newItemSymbol = '';
                    this.selectedCompany = '';
                    this.addBtnDisabled = true;
                }
            },
            // update chart selection to match portfolio selection
            _currentChanged: function() {
                var p = this.portfolio,
                    chart = this.theChart;
                if (chart && p) {
                    var symbol = p.view.currentItem ? p.view.currentItem.symbol : null,
                        selSeries = null;
                    for (var i = 0; i < chart.series.length; i++) {
                        if (chart.series[i].name == symbol) {
                            selSeries = chart.series[i];
                            break;
                        }
                    }
                    chart.selection = selSeries;
                }
            },
            // selection changed event handler for FlexChart
            selectionChanged: function(sender, args) {
                var chart = sender,
                    symbol = chart.selection ? chart.selection.name : null,
                    selSeries = null,
                    p = this.portfolio;
                //
                if(symbol == null) {
                    p.view.moveCurrentToPosition(-1);
                } else {
                    for (var i = 0; i < p.view.items.length; i++) {
                        if (p.view.items[i].symbol == symbol) {
                            p.view.moveCurrentToPosition(i);
                            break;
                        }
                    }
                }
            },
            getAmountColor(amount) {
                return amount < -0.01 ? '#9F3912' : amount > 0.01 ? '#217648' : '#b0b0b0';
            },
            initTableHeader: function() {
                let portfolio = this.portfolio,
                    ths = document.querySelectorAll('th'),
                    vals = ['name', 'symbol', 'chart', 'lastPrice', 'change', 'shares', 'purchasePrice', 'costBasis', 'marketValue', 'gain'],
                    names = ['Name', 'Symbol', 'Chart', 'Last Price', 'Change', 'Shares', 'Price', 'Cost Basis', 'Market Value', 'Gain'];
                //
                vals.forEach((v, i) => {
                    let th = ths[i],
                        name = names[i];
                    //
                    this.updateSortIndicator(portfolio.view, v, name, th.childNodes[0]);
                    portfolio.view.collectionChanged.addHandler(((view, binding, name, ele) => { return () => {
                        this.updateSortIndicator(view, binding, name, ele);
                    }})(portfolio.view, v, name, th.childNodes[0]));
                    th.addEventListener('click', ((view, binding) => { return args => {
                        this.applySort(view, binding, args);
                    }})(portfolio.view, v));
                });
            },
            updateSortIndicator: function(view, binding, header, element) {
                if (view) {
                    var sd = view.sortDescriptions,
                        sortIndicator = '';
                    if (sd.length > 0 && sd[0].property == binding) {
                        sortIndicator = sd[0].ascending ? ' ▲' : ' ▼';
                    }
                    element.innerText = header + sortIndicator;
                }
            },
            // apply/change/remove sort on this column
            applySort: function(view, binding, args) {
                if (view) {
                    var sd = view.sortDescriptions;
                    if (args.ctrlKey) { // clear sort on ctrl-click 
                        sd.clear();
                    } else { // add/reverse sort on clicked column
                        var ascending = true;
                        if (sd.length > 0 && sd[0].property == binding) {
                            ascending = !sd[0].ascending;
                        }
                        var sdNew = new wjCore.SortDescription(binding, ascending);
                        sd.splice(0, sd.length, sdNew);
                    }
                }
            }
        }
    })
/**
 * function init() {
    let tableBody = document.querySelector('tbody'),
        tableHead = document.querySelector('thead');
    //
    generageTableBody(tableBody, portfolio);
    generateChartSeries(theChart, portfolio);
    setTableFooterValues(portfolio);
    initBtnGroup(portfolio);
    initTableHead(portfolio);
    //
    portfolio.itemsChanged.addHandler(function () {
        generageTableBody(tableBody, portfolio);
        generateChartSeries(theChart, portfolio);
        setTableFooterValues(portfolio);
    });
    portfolio.view.currentChanged.addHandler(function() {
        if (theChart) {
            var symbol = portfolio.view.currentItem ? portfolio.view.currentItem.symbol : null,
                selSeries = null,
                chart = theChart;
            for (let i = 0; i < chart.series.length; i++) {
                if (chart.series[i].name == symbol) {
                    selSeries = chart.series[i];
                    break;
                }
            }
            chart.selection = selSeries;
        }
        if(tableBody) {
            let idx = -1;
            if(portfolio.view.currentItem) {
                idx = portfolio.view.items.indexOf(portfolio.view.currentItem);
            }
            tableBody.querySelectorAll('tr').forEach((tr, i) => {
                if(i == idx) {
                    core.addClass(tr, 'active');
                } else {
                    core.removeClass(tr, 'active');
                }
            });
        }
    });
}
// update element content to show whether is the sorted column
function updateSortIndicator(view, binding, header, element) {
    if (view) {
        var sd = view.sortDescriptions,
            sortIndicator = '';
        if (sd.length > 0 && sd[0].property == binding) {
            sortIndicator = sd[0].ascending ? ' ▲' : ' ▼';
        }
        element.innerText = header + sortIndicator;
    }
}
// apply/change/remove sort on this column
function applySort(view, binding, args) {
    if (view) {
        var sd = view.sortDescriptions;
        if (args.ctrlKey) { // clear sort on ctrl-click 
            sd.clear();
        } else { // add/reverse sort on clicked column
            var ascending = true;
            if (sd.length > 0 && sd[0].property == binding) {
                ascending = !sd[0].ascending;
            }
            var sdNew = new core.SortDescription(binding, ascending);
            sd.splice(0, sd.length, sdNew);
        }
    }
};

function initTableHead(portfolio: Portfolio) {
    let ths = document.querySelectorAll('th'),
        vals = ['name', 'symbol', 'chart', 'lastPrice', 'change', 'shares', 'purchasePrice', 'costBasis', 'marketValue', 'gain'],
        names = ['Name', 'Symbol', 'Chart', 'Last Price', 'Change', 'Shares', 'Price', 'Cost Basis', 'Market Value', 'Gain'];
    //
    vals.forEach((v, i) => {
        let th = ths[i],
            name = names[i];
        //
        updateSortIndicator(portfolio.view, v, name, th.childNodes[0]);
        portfolio.view.collectionChanged.addHandler(((view, binding, name, ele) => { return function () {
            updateSortIndicator(view, binding, name, ele);
        }})(portfolio.view, v, name, th.childNodes[0]));
        th.addEventListener('click', ((view, binding) => { return function (args) {
            applySort(view, binding, args);
        }})(portfolio.view, v));
    });
}
function setTableFooterValues(portfolio) {
    if(portfolio.cost != null) {
        document.querySelector('#tdCost').innerHTML = `<b>${core.Globalize.format(portfolio.cost, 'n2')}</b>`;
    }
    if(portfolio.value != null) {
        document.querySelector('#tdValue').innerHTML = `<b>${core.Globalize.format(portfolio.value, 'n2')}</b>`;
    }
    if(portfolio.gainPercent != null && portfolio.gain != null) {
        document.querySelector('#tdGain').innerHTML = `<span style="color: ${getAmountColor(portfolio.gain)}"><b>${core.Globalize.format(portfolio.gainPercent, 'p2')}</b></span>`;
    }
}
function initBtnGroup(portfolio: Portfolio) {
    let btnContainer = document.querySelector('.btn-group');
    btnContainer.querySelectorAll('button').forEach((btn, i) => {
        btn.addEventListener('click',(idx => { return function () {
            portfolio.chartPeriod = idx;
            activeBtnGroup(portfolio);
        }})(i));
    });
    activeBtnGroup(portfolio);
}
function activeBtnGroup(portfolio: Portfolio) {
    let btnContainer = document.querySelector('.btn-group');
    btnContainer.querySelectorAll('button').forEach((btn, i) => {
        if(i == portfolio.chartPeriod) {
            core.addClass(btn, 'active');
        } else {
            core.removeClass(btn, 'active');
        }
    });
}
function generateChartSeries(theChart: fChart.FinancialChart, portfolio) {
    theChart.beginUpdate();
    theChart.series.length = 0;
    for(let i = 0, len = portfolio.view.items.length; i < len; i++) {
        let item = portfolio.view.items[i];
        let s = new chart.Series();
        s.itemsSource = item.chartData;
        s.name = item.symbol;
        core.setCss(s.hostElement, {
            'stroke': item.color
        });
        s.visibility = item.chart ? chart.SeriesVisibility.Visible : chart.SeriesVisibility.Hidden;
        theChart.series.push(s);
    }
    theChart.endUpdate();
}
 */

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    body
    {
        font-family: 'Segoe UI', sans-serif;
    }

    .container-fluid th
    {
        font-size: 90%;
        color: #b0b0b0;
    }

    .container-fluid .header
    {
        background-color: #00C1D5;
        
        background-position: 0% 0%;
        background-repeat: repeat-x;
        padding: 12px 0px;
        margin-bottom: 14px;
        color: #dcf3f6;
    }

    .container-fluid .header h1 {
        font-size: 40px;
        color: #fff;
    }
    .container-fluid .header a
    {
        font-weight: bold;
        color: #e1d3f7;
    }

    .container-fluid .match
    {
        font-weight: bold;
        background-color: yellow;
        /*color: black;*/
    }

    /* remove borders and center-align table cells */
    .container-fluid .table> thead> tr> td, 
    .container-fluid .table> tbody> tr> td,
    .container-fluid  .table> tfoot> tr> td
    {
        border: none;
        vertical-align: middle;
    }

    /* clip cells with long content */
    .container-fluid .clipCell
    {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 200px;
        min-width: 100px;
    }

    /* remove borders/padding from input cells */
    .container-fluid .inputCell  {
        max-width: 80px;
        padding: 2px;
    }
    .container-fluid .inputCell .wj-inputnumber 
    {
        border: none;
        background-color: #f8f8fa;
        min-height: 20px;
    }

    /* customize appearance of the FlexGrid control */
    .container-fluid .wj-control {
        outline: 0;
    }
    .container-fluid .wj-header {
        background-color: #fff;
        color: #888;
        font-weight: normal;
    }
    .container-fluid .wj-colheaders .wj-header {
        background: linear-gradient(to bottom, #fff, #f4f4f4);
        border-bottom: 2px solid #e0e0e0;
        border-right: 1px solid #e0e0e0;
    }
    .container-fluid .wj-rowheaders .wj-header {
        background: linear-gradient(to right, #fff, #f4f4f4);
        border-right: 2px solid #e0e0e0;
        border-bottom: 1px solid #e0e0e0;
    }
    .container-fluid .wj-topleft .wj-header {
        background: linear-gradient(to bottom right, #fff, #f4f4f4);
        border-right: 1px solid #e0e0e0;
        border-bottom: 1px solid #e0e0e0;
    }
    .container-fluid .wj-cell {
        border: none;
    }
    .container-fluid .wj-alt:not(.wj-state-selected):not(.wj-state-multi-selected) {
        background: #fff;
    }
    .container-fluid .wj-state-selected {
        background: #e0e0e0;
        color: #000;
    }
    .container-fluid .wj-state-multi-selected {
        background: #f4f4f4;
        color: #000;
    }

    /* customize appearance of chart selection */
    .container-fluid .wj-flexchart .wj-state-selected {
        stroke-width: 6px;
    }

</style>
