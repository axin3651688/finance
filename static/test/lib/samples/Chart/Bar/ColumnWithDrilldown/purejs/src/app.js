import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as core from '@grapecity/wijmo';
import * as chart from '@grapecity/wijmo.chart';
import * as animation from '@grapecity/wijmo.chart.animation';
import { getData, getGroupData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
var barchart;
var view;
//
function init() {
    view = getData();
    barchart = new chart.FlexChart('#chart', {
        legend: {
            position: chart.Position.None
        },
        bindingX: 'name',
        series: [{
                binding: 'gdp',
                name: 'GDP'
            }],
        axisX: {
            title: 'Year'
        },
        axisY: {
            title: 'GDP (US$ in billions)'
        },
        tooltip: { content: '' },
        selectionMode: chart.SelectionMode.Point,
        selectionChanged: (s) => {
            if (s.selection) {
                let point = s.selection.collectionView.currentItem;
                if (point && point.group && !point.group.isBottomLevel) {
                    showGroup(point.group);
                }
            }
        },
        itemsSource: getGroupData(view),
        palette: ['rgba(45,159,199,1)', 'rgba(236,153,60,1)', 'rgba(137,194,53,1)', 'rgba(227,119,164,1)',
            'rgba(166,137,49,1)', 'rgba(166,114,166,1)', 'rgba(208,192,65,1)', 'rgba(227,88,85,1)', 'rgba(104,112,106,1)']
    });
    //
    let ani = new animation.ChartAnimation(barchart);
}
//
function showGroup(group) {
    // update titles
    updateChartHeader(group);
    let level = 'level' in group ? group.level + 1 : 0;
    barchart.axisX.title = core.toHeaderCase(view.groupDescriptions[level].propertyName);
    //
    // update the series color (use a different one for each level)
    let palette = barchart.palette || chart.Palettes.standard;
    barchart.series[0].style = {
        fill: palette[level],
        stroke: palette[level]
    };
    //
    // update data
    barchart.itemsSource = getGroupData(group);
    barchart.selection = null;
}
//
// update the chart header element
var header = document.getElementById('header');
function updateChartHeader(group) {
    let item = group.items[0], path = '', headers = [];
    //
    for (let i = 0; i <= group.level; i++) {
        let prop = view.groupDescriptions[i].propertyName, hdr = core.format('<a href="#{path}">{prop}</a>: {value}', {
            path: path,
            prop: core.toHeaderCase(prop),
            value: item[prop]
        });
        //
        headers.push(hdr);
        path += '/' + item[prop];
    }
    //
    header.innerHTML = headers.length > 0
        ? 'IMF estimates GDP(nominal) GDP for ' + headers.join(', ')
        : 'IMF estimates GDP(nominal) GDP';
}
//
// handle clicks on chart's header element to navigate back up
header.addEventListener('click', function (e) {
    if (e.target instanceof HTMLAnchorElement) {
        e.preventDefault();
        //
        // get the link path
        let path = e.target.href;
        path = path.substr(path.lastIndexOf('#') + 1);
        let paths = path.split('/');
        //
        // find the group that matches the path
        let src = view;
        for (let i = 1; i < paths.length; i++) {
            for (let j = 0; j < src.groups.length; j++) {
                let group = src.groups[j];
                if (group.name == paths[i]) {
                    src = group;
                    break;
                }
            }
        }
        // show the selected group
        showGroup(src);
    }
});
