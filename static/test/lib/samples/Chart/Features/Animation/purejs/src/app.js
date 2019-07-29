import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as chart from '@grapecity/wijmo.chart';
import * as input from '@grapecity/wijmo.input';
import * as animation from '@grapecity/wijmo.chart.animation';
import { getData, getRandomData, getRandomValue } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    var flexChartPoints = 10;
    // create a chart
    // create FlexChart, InputNumbers and Menus
    var flexChart = new chart.FlexChart('#theChart'), chartType = new input.Menu('#chartType'), chartAnimationMode = new input.Menu('#chartAnimationMode'), chartEasing = new input.Menu('#chartEasing'), chartDuration = new input.InputNumber('#chartDuration'), chartAddMenu = new input.Menu('#chartAddMenu'), chartRemoveMenu = new input.Menu('#chartRemoveMenu');
    //flex chart
    flexChart.beginUpdate();
    flexChart.chartType = chart.ChartType.Line;
    flexChart.itemsSource = getData(flexChartPoints);
    flexChart.bindingX = 'x';
    // create data series
    for (var i = 0; i < 3; i++) {
        var series = new chart.Series();
        series.binding = 'y' + i;
        flexChart.series.push(series);
    }
    flexChart.palette = getRandomPalette();
    flexChart.endUpdate();
    var chartAnimation = new animation.ChartAnimation(flexChart, {
        animationMode: animation.AnimationMode.All,
        easing: animation.Easing.Swing,
        duration: 400
    });
    //Chart Type
    chartType.selectedValue = 'Line';
    chartType.textChanged.addHandler(function (sender) {
        if (!sender.selectedValue)
            return;
        flexChart.chartType = chart.ChartType[sender.selectedValue];
        updateMenuHeader(chartType, '<b>ChartType</b>: ', sender.text);
    });
    updateMenuHeader(chartType, '<b>ChartType</b>: ', chartType.text);
    //Chart Animation Mode
    chartAnimationMode.selectedValue = 'All';
    chartAnimationMode.textChanged.addHandler(function (sender) {
        if (!sender.selectedValue)
            return;
        chartAnimation.animationMode = animation.AnimationMode[sender.selectedValue];
        chartAnimation.animate();
        updateMenuHeader(chartAnimationMode, '<b>Animation Mode</b>: ', sender.text);
    });
    updateMenuHeader(chartAnimationMode, '<b>Animation Mode</b>: ', chartAnimationMode.text);
    //Chart Easing
    chartEasing.selectedValue = 'Swing';
    chartEasing.textChanged.addHandler(function (sender) {
        if (!sender.selectedValue)
            return;
        chartAnimation.easing = animation.Easing[sender.selectedValue];
        chartAnimation.animate();
        updateMenuHeader(chartEasing, '<b>Easing</b>: ', sender.text);
    });
    updateMenuHeader(chartEasing, '<b>Easing</b>: ', chartEasing.text);
    //Chart Duration
    chartDuration.value = 400;
    chartDuration.min = 200;
    chartDuration.max = 5000;
    chartDuration.step = 200;
    chartDuration.format = 'n0';
    chartDuration.valueChanged.addHandler(function (sender) {
        if (sender.value < sender.min || sender.value > sender.max) {
            return;
        }
        chartAnimation.duration = sender.value;
        chartAnimation.animate();
    });
    //Chart Reset Data
    document.getElementById("chartResetData").addEventListener("click", function () {
        if (flexChart) {
            flexChart.itemsSource = getData(flexChartPoints);
        }
    });
    //Chart Adds
    chartAddMenu.itemClicked.addHandler(function (sender) {
        if (!sender.selectedValue)
            return;
        chartChange[sender.selectedValue]();
    });
    updateMenuHeader(chartAddMenu, 'Add', '');
    //Chart Removes
    chartRemoveMenu.itemClicked.addHandler(function (sender) {
        if (!sender.selectedValue)
            return;
        chartChange[sender.selectedValue]();
    });
    updateMenuHeader(chartRemoveMenu, 'Remove', '');
    var chartChange = {
        addSeries: function () {
            var len = flexChart.series.length;
            if (len >= 5) {
                return;
            }
            var series = new chart.Series();
            series.binding = 'y' + len;
            flexChart.series.push(series);
        },
        addFirstPoint: function () {
            flexChart.itemsSource.insert(0, getRandomData('added' + getRandomValue(1000)));
        },
        addLastPoint: function () {
            flexChart.itemsSource.push(getRandomData('added' + getRandomValue(1000)));
        },
        removeSeries: function () {
            if (flexChart.series.length <= 0) {
                return;
            }
            flexChart.series.pop();
        },
        removeFirstPoint: function () {
            if (flexChart.itemsSource.length) {
                flexChart.itemsSource.removeAt(0);
            }
        },
        removeLastPoint: function () {
            if (flexChart.itemsSource.length) {
                flexChart.itemsSource.pop();
            }
        }
    };
}
//
function getRandomPalette() {
    let palettes = Object.getOwnPropertyNames(chart.Palettes)
        .filter(prop => typeof chart.Palettes[prop] === "object" && prop !== 'prototype');
    let rand = Math.floor(Math.random() * palettes.length);
    //
    return chart.Palettes[palettes[rand]];
}
//
function updateMenuHeader(menu, prefix, text) {
    menu.header = prefix + text;
}
