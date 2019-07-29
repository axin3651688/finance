import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as core from '@grapecity/wijmo';
import * as wjChart from '@grapecity/wijmo.chart';
import * as wjGauge from '@grapecity/wijmo.gauge';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // nation data
    let yrMin = 1800, yrMax = 2009, year = yrMin, animLength = 15000, // 15s for the full animation
    animating = 0, data = getData();
    //
    // create the chart
    let theChart = new wjChart.FlexChart('#theChart', {
        itemsSource: data,
        chartType: 'Bubble',
        bindingX: 'yearIncome',
        series: [
            { binding: 'yearLifeExpectancy,yearPopulation' }
        ],
        legend: {
            position: 'None'
        },
        tooltip: {
            content: '<b>{item.name}</b><br/>{yearPopulation:g1,,} million people'
        },
        selectionMode: 'Point',
        axisX: {
            title: 'income per capita (inflation-adjusted US dollars)',
            majorGrid: false,
            axisLine: true,
            max: 100000,
            logBase: 10,
            min: 300
        },
        options: {
            bubble: {
                minSize: 5,
                maxSize: 100
            }
        },
        axisY: {
            title: 'life expectancy (years)',
            majorGrid: false,
            axisLine: true,
            max: 85,
            majorUnit: 10,
            min: 20
        },
        // color bubbles by region
        itemFormatter: (engine, hitTestInfo, defaultFormat) => {
            if (hitTestInfo.chartElement == wjChart.ChartElement.SeriesSymbol) {
                let fill = 'black', stroke = 'black';
                //
                switch (hitTestInfo.item.region) {
                    case 'Sub-Saharan Africa':
                        fill = '#1F77B4';
                        break;
                    case 'South Asia':
                        fill = '#FF7F0E';
                        break;
                    case 'Middle East & North Africa':
                        fill = '#2CA02C';
                        break;
                    case 'America':
                        fill = '#D62728';
                        break;
                    case 'Europe & Central Asia':
                        fill = '#9467BD';
                        break;
                    case 'East Asia & Pacific':
                        fill = '#8C564B';
                        break;
                }
                //
                engine.fill = fill;
                engine.stroke = stroke;
                engine.strokeWidth = 1;
                //
                defaultFormat();
            }
        }
    });
    //
    theChart.hostElement.addEventListener('mousedown', () => stopAnimation());
    //
    let gauge = new wjGauge.LinearGauge('#linearGauge', {
        value: 1800,
        min: 1800,
        max: 2009,
        isReadOnly: false,
        isAnimated: false,
        thumbSize: 30,
        face: {
            thickness: 0.08
        },
        pointer: {
            thickness: 0.08
        },
        valueChanged: (sender) => {
            year = sender.value;
            updateData(year);
        }
    });
    gauge.hostElement.addEventListener('mousedown', () => stopAnimation());
    //
    let btn = document.getElementById('toggleAnimationBtn');
    btn.addEventListener('click', () => toggleAnimation());
    //
    updateData(year);
    toggleAnimation();
    //
    function updateData(year) {
        let items = data.items;
        //
        items.forEach(item => {
            item.yearIncome = interpolate(item.income, year);
            item.yearLifeExpectancy = interpolate(item.lifeExpectancy, year);
            //
            let pop = interpolate(item.population, year);
            if (pop > 1000000)
                pop = Math.round(pop / 1000000) * 1000000;
            item.yearPopulation = pop;
        });
        //
        data.refresh();
        theChart.hostElement.querySelector('.watermark').innerHTML = year.toString();
        gauge.value = year;
    }
    //
    function interpolate(arr, year) {
        // binary search
        let min = 0, max = arr.length - 1, cur, item;
        //
        while (min <= max) {
            cur = (min + max) >>> 1;
            item = arr[cur];
            //
            if (item[0] > year) {
                max = cur - 1;
            }
            else if (item[0] < year) {
                min = cur + 1;
            }
            else {
                return item[1]; // found year, no need to interpolate
            }
        }
        //
        // before the first/after the last
        if (min == 0)
            return arr[min][1];
        if (min == arr.length)
            return arr[max][1];
        //
        // in range: interpolate
        let pct = (year - arr[max][0]) / (arr[min][0] - arr[max][0]);
        return arr[max][1] + pct * (arr[min][1] - arr[max][1]);
    }
    //
    function toggleAnimation() {
        if (animating) {
            clearInterval(animating);
            animating = null;
            toggleBtn(false);
        }
        else {
            let min = (year < yrMax - 10) ? year : yrMin, max = yrMax, duration = animLength * (max - min) / (yrMax - yrMin);
            //
            toggleBtn(true);
            animating = core.animate((pct) => {
                year = Math.round(min + (max - min) * pct);
                updateData(year);
                if (pct == 1) {
                    animating = null;
                    toggleBtn(false);
                    updateData(year);
                }
            }, duration);
        }
    }
    //
    function toggleBtn(isPlaying) {
        let ele = btn.querySelector('.glyphicon');
        //
        if (isPlaying) {
            ele.setAttribute('class', 'glyphicon glyphicon-stop');
        }
        else {
            ele.setAttribute('class', 'glyphicon glyphicon-play');
        }
    }
    //
    function stopAnimation() {
        if (animating) {
            toggleBtn(false);
            clearInterval(animating);
            animating = null;
        }
    }
}
