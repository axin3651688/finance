import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as core from '@grapecity/wijmo';
import * as chart from '@grapecity/wijmo.chart';
import * as gauge from '@grapecity/wijmo.gauge';
import { getSales } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let data = getSales();
    let bullets = [];
    var barChart = new chart.FlexChart('#chart', {
        header: '2018 Annual Sales',
        legend: {
            position: chart.Position.None
        },
        bindingX: 'month',
        series: [{
                binding: 'actual',
                name: 'Sales'
            }],
        selectionMode: chart.SelectionMode.Point,
        itemsSource: data.month,
        selectionChanged: function (sender, args) {
            var selIndex = sender._selectionIndex;
            //
            if (selIndex == null || selIndex == -1) {
                pieChart.itemsSource = data.category;
                pieChart.header = '2018 Product Sales';
                setBullets(bullets, data.category);
            }
            else {
                let d = data.month[selIndex];
                pieChart.itemsSource = d.items;
                pieChart.header = d.month + ' Product Sales';
                setBullets(bullets, d.items);
            }
        }
    });
    //
    var pieChart = new chart.FlexPie('#pie', {
        header: '2018 Product Sales',
        legend: {
            position: chart.Position.Bottom
        },
        bindingName: 'category',
        binding: 'actual',
        itemsSource: data.category,
        dataLabel: {
            content: function (ht) {
                let sum = ht.chart.itemsSource.map(c => c.actual).reduce((sum, cur) => sum + cur);
                return `${core.Globalize.format(ht.value / sum, 'p0')}`;
            }
        }
    });
    createBullets(bullets, data.category);
}
//
function createBullets(bullets, categories) {
    let bulletsContainer = document.querySelector('.bullets');
    categories.forEach(category => {
        let li = document.createElement('li');
        bulletsContainer.appendChild(li);
        let bulletLable = document.createElement('label');
        bulletLable.innerHTML = category.category;
        li.appendChild(bulletLable);
        let bulletEle = document.createElement('div');
        li.appendChild(bulletEle);
        let bullet = new gauge.BulletGraph(bulletEle, {
            showText: gauge.ShowText.Value
        });
        bullets.push(bullet);
    });
    setBullets(bullets, categories);
}
function setBullets(bullets, categories) {
    categories.forEach((cat, i) => {
        let bullet = bullets[i];
        bullet.target = cat.target;
        bullet.max = cat.max;
        bullet.good = cat.good;
        bullet.bad = cat.bad;
        bullet.value = cat.actual;
    });
}
