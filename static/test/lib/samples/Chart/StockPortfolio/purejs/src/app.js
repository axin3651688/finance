import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as core from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';
import * as chart from '@grapecity/wijmo.chart';
import * as fChart from '@grapecity/wijmo.chart.finance';
import { getCompany } from './data';
import { Portfolio } from './portfolio';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    var portfolio = new Portfolio();
    let tableBody = document.querySelector('tbody'), tableHead = document.querySelector('thead');
    // create the chart
    let theChart = new fChart.FinancialChart('#theChart', {
        bindingX: 'date',
        binding: 'change',
        chartType: 'Line',
        selectionMode: 'Series',
        legend: {
            position: 'None'
        },
        axisX: {
            format: 'MMM-yyyy'
        },
        axisY: {
            format: 'p0'
        },
        selectionChanged: function (sender, args) {
            var chart = sender, symbol = chart.selection ? chart.selection.name : null, selSeries = null;
            if (symbol == null) {
                portfolio.view.moveCurrentToPosition(-1);
            }
            else {
                for (var i = 0; i < portfolio.view.items.length; i++) {
                    if (portfolio.view.items[i].symbol == symbol) {
                        portfolio.view.moveCurrentToPosition(i);
                        break;
                    }
                }
            }
        }
    });
    theChart.palette = getRandomPalette();
    //
    let autoComplete = new input.AutoComplete('#searchCompany', {
        itemsSourceFunction: getCompany,
        displayMemberPath: 'symbolName',
        selectedValuePath: 'symbol',
        showDropDownButton: false,
        placeholder: 'company name or symbol',
        cssMatch: 'match'
    });
    let searchBtn = document.querySelector('#searchBtn');
    searchBtn.addEventListener('click', function () {
        portfolio.addNewItem();
        searchBtn.setAttribute('disabled', 'disabled');
        autoComplete.selectedValue = '';
    });
    autoComplete.selectedIndexChanged.addHandler(function () {
        let btn = document.querySelector('#searchBtn');
        if (autoComplete.selectedValue != null && autoComplete.selectedValue != '') {
            portfolio.newItemSymbol = autoComplete.selectedValue;
            btn.removeAttribute('disabled');
        }
        else {
            portfolio.newItemSymbol = '';
            btn.setAttribute('disabled', 'disabled');
        }
    });
    /**
                                    <wj-auto-complete items-source-function="searchCompany"
                                                        display-member-path="symbolName"
                                                        selected-value-path="symbol"
                                                        selected-value="portfolio.newItemSymbol"
                                                        show-drop-down-button="false"
                                                        placeholder="company name or symbol"
                                                        css-match="match">
                                    </wj-auto-complete> */
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
    portfolio.view.currentChanged.addHandler(function () {
        if (theChart) {
            var symbol = portfolio.view.currentItem ? portfolio.view.currentItem.symbol : null, selSeries = null, chart = theChart;
            for (let i = 0; i < chart.series.length; i++) {
                if (chart.series[i].name == symbol) {
                    selSeries = chart.series[i];
                    break;
                }
            }
            chart.selection = selSeries;
        }
        if (tableBody) {
            let idx = -1;
            if (portfolio.view.currentItem) {
                idx = portfolio.view.items.indexOf(portfolio.view.currentItem);
            }
            tableBody.querySelectorAll('tr').forEach((tr, i) => {
                if (i == idx) {
                    core.addClass(tr, 'active');
                }
                else {
                    core.removeClass(tr, 'active');
                }
            });
        }
    });
}
// update element content to show whether is the sorted column
function updateSortIndicator(view, binding, header, element) {
    if (view) {
        var sd = view.sortDescriptions, sortIndicator = '';
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
        }
        else { // add/reverse sort on clicked column
            var ascending = true;
            if (sd.length > 0 && sd[0].property == binding) {
                ascending = !sd[0].ascending;
            }
            var sdNew = new core.SortDescription(binding, ascending);
            sd.splice(0, sd.length, sdNew);
        }
    }
}
;
function initTableHead(portfolio) {
    let ths = document.querySelectorAll('th'), vals = ['name', 'symbol', 'chart', 'lastPrice', 'change', 'shares', 'purchasePrice', 'costBasis', 'marketValue', 'gain'], names = ['Name', 'Symbol', 'Chart', 'Last Price', 'Change', 'Shares', 'Price', 'Cost Basis', 'Market Value', 'Gain'];
    //
    vals.forEach((v, i) => {
        let th = ths[i], name = names[i];
        //
        updateSortIndicator(portfolio.view, v, name, th.childNodes[0]);
        portfolio.view.collectionChanged.addHandler(((view, binding, name, ele) => {
            return function () {
                updateSortIndicator(view, binding, name, ele);
            };
        })(portfolio.view, v, name, th.childNodes[0]));
        th.addEventListener('click', ((view, binding) => {
            return function (args) {
                applySort(view, binding, args);
            };
        })(portfolio.view, v));
    });
}
function setTableFooterValues(portfolio) {
    if (portfolio.cost != null) {
        document.querySelector('#tdCost').innerHTML = `<b>${core.Globalize.format(portfolio.cost, 'n2')}</b>`;
    }
    if (portfolio.value != null) {
        document.querySelector('#tdValue').innerHTML = `<b>${core.Globalize.format(portfolio.value, 'n2')}</b>`;
    }
    if (portfolio.gainPercent != null && portfolio.gain != null) {
        document.querySelector('#tdGain').innerHTML = `<span style="color: ${getAmountColor(portfolio.gain)}"><b>${core.Globalize.format(portfolio.gainPercent, 'p2')}</b></span>`;
    }
}
function initBtnGroup(portfolio) {
    let btnContainer = document.querySelector('.btn-group');
    btnContainer.querySelectorAll('button').forEach((btn, i) => {
        btn.addEventListener('click', (idx => {
            return function () {
                portfolio.chartPeriod = idx;
                activeBtnGroup(portfolio);
            };
        })(i));
    });
    activeBtnGroup(portfolio);
}
function activeBtnGroup(portfolio) {
    let btnContainer = document.querySelector('.btn-group');
    btnContainer.querySelectorAll('button').forEach((btn, i) => {
        if (i == portfolio.chartPeriod) {
            core.addClass(btn, 'active');
        }
        else {
            core.removeClass(btn, 'active');
        }
    });
}
function generateChartSeries(theChart, portfolio) {
    theChart.beginUpdate();
    theChart.series.length = 0;
    for (let i = 0, len = portfolio.view.items.length; i < len; i++) {
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
var genTableTOID = null;
function generageTableBody(tableBody, portfolio) {
    if (genTableTOID != null) {
        clearTimeout(genTableTOID);
    }
    genTableTOID = setTimeout(() => {
        let view = portfolio.view;
        tableBody.innerHTML = '';
        for (let i = 0; i < view.items.length; i++) {
            let item = view.items[i];
            let tr = document.createElement('tr');
            core.setCss(tr, {
                cursor: 'pointer'
            });
            if (item.symbol === (view.currentItem && view.currentItem.symbol)) {
                tr.setAttribute('class', 'active');
            }
            tr.addEventListener('click', ((it) => {
                return function () {
                    view.moveCurrentTo(it);
                };
            })(item));
            tableBody.appendChild(tr);
            //append tds
            let clipCell = document.createElement('td');
            tr.appendChild(clipCell);
            core.addClass(clipCell, 'clipCell');
            clipCell.innerHTML = `<span style="background-color:${item.color}">&nbsp;&nbsp;&nbsp;</span>&nbsp;${item.name || ""}`;
            let symbolCell = document.createElement('td');
            tr.appendChild(symbolCell);
            symbolCell.innerHTML = `<a href="https://www.quandl.com/data/WIKI/${item.symbol}" target="_blank">${item.symbol}</a>`;
            let checkBoxCell = document.createElement('td');
            core.addClass(checkBoxCell, 'text-center');
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = !!item.chart;
            checkbox.addEventListener('change', ((it, chk) => {
                return function () {
                    it.chart = chk.checked;
                };
            })(item, checkbox));
            checkBoxCell.appendChild(checkbox);
            tr.appendChild(checkBoxCell);
            let lastPriceCell = document.createElement('td');
            tr.appendChild(lastPriceCell);
            core.addClass(lastPriceCell, 'text-right');
            lastPriceCell.innerHTML = `${core.Globalize.format(item.lastPrice, 'n2')}`;
            let changeCell = document.createElement('td');
            tr.appendChild(changeCell);
            core.addClass(changeCell, 'text-right');
            changeCell.innerHTML = `<span style="color:${getAmountColor(item.change)}">${core.Globalize.format(item.changePercent, 'p2')}</span>`;
            let inputSharesCell = document.createElement('td');
            tr.appendChild(inputSharesCell);
            core.addClass(inputSharesCell, 'text-right inputCell');
            core.setCss(inputSharesCell, {
                padding: '2px'
            });
            inputSharesCell.innerHTML = `<input id="iptShares${i.toString()}" />`;
            let inputShares = new input.InputNumber(`#iptShares${i.toString()}`, {
                isRequired: false,
                min: 0,
                format: 'n0'
            });
            if (!isNaN(item.shares)) {
                inputShares.value = item.shares;
            }
            let inputPurchasePriceCell = document.createElement('td');
            tr.appendChild(inputPurchasePriceCell);
            core.addClass(inputPurchasePriceCell, 'text-right inputCell');
            core.setCss(inputPurchasePriceCell, {
                padding: '2px'
            });
            inputPurchasePriceCell.innerHTML = `<input id="iptPurchasePrice${i.toString()}" />`;
            let inputPurchasePrice = new input.InputNumber(`#iptPurchasePrice${i.toString()}`, {
                isRequired: false,
                min: 0,
                format: 'n2'
            });
            if (!isNaN(item.purchasePrice)) {
                inputPurchasePrice.value = item.purchasePrice;
            }
            let costBasisCell = document.createElement('td');
            tr.appendChild(costBasisCell);
            core.addClass(costBasisCell, 'text-right');
            costBasisCell.innerHTML = core.Globalize.format(item.costBasis, 'n2');
            let marketValueCell = document.createElement('td');
            tr.appendChild(marketValueCell);
            core.addClass(marketValueCell, 'text-right');
            marketValueCell.innerHTML = core.Globalize.format(item.marketValue, 'n2');
            let gainPercentCell = document.createElement('td');
            tr.appendChild(gainPercentCell);
            core.addClass(gainPercentCell, 'text-right');
            gainPercentCell.innerHTML = `<span style="color:${getAmountColor(item.gain)}">${core.Globalize.format(item.gainPercent, 'p2')}</span>`;
            let removeCell = document.createElement('td');
            tr.appendChild(removeCell);
            core.addClass(removeCell, 'text-center');
            let removeBtn = document.createElement('a');
            removeBtn.innerHTML = '<span class="glyphicon glyphicon-remove" style="color:#D14836"></span>';
            removeBtn.addEventListener('click', ((it) => {
                return function () {
                    portfolio.removeItem(it.symbol);
                };
            })(item));
            removeCell.appendChild(removeBtn);
        }
        genTableTOID = null;
    }, 100);
}
//
// show positive values in green, negative in red
function getAmountColor(amount) {
    return amount < -0.01 ? '#9F3912' : amount > 0.01 ? '#217648' : '#b0b0b0';
}
;
//
function getRandomPalette() {
    let palettes = Object.getOwnPropertyNames(chart.Palettes)
        .filter(prop => typeof chart.Palettes[prop] === "object" && prop !== 'prototype');
    let rand = Math.floor(Math.random() * palettes.length);
    //
    return chart.Palettes[palettes[rand]];
}
