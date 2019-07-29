<template>
    <div class="container-fluid">
        <h4 id="header">IMF estimates GDP(nominal) GDP</h4>
        <wj-flex-chart bindingX="name" selectionMode="Point" :itemsSource="groupedViewData" :selectionChanged="selectionChanged" 
            :initialized="initializeChart" tooltipContent=""
            :palette="['rgba(45,159,199,1)', 'rgba(236,153,60,1)', 'rgba(137,194,53,1)', 'rgba(227,119,164,1)', 'rgba(166,137,49,1)', 'rgba(166,114,166,1)', 'rgba(208,192,65,1)', 'rgba(227,88,85,1)', 'rgba(104,112,106,1)']">
            <wj-flex-chart-legend position="None"></wj-flex-chart-legend>
            <wj-flex-chart-series name="GDP" binding="gdp"></wj-flex-chart-series>
            <wj-flex-chart-axis wjProperty="axisX" title="Year"></wj-flex-chart-axis>
            <wj-flex-chart-axis wjProperty="axisY" title="GDP (US$ in billions)"></wj-flex-chart-axis>
            <wj-flex-chart-animation></wj-flex-chart-animation>
        </wj-flex-chart>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.chart';
    import '@grapecity/wijmo.vue2.chart.animation';
    import { getData, getGroupData } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData(),
                 groupedViewData: null
            }
        },
        methods: {
            initializeChart(flex) {
                this.theChart = flex;
                this.header = document.querySelector('#header');
                this.header.addEventListener('click', e => this._onHeaderClick(e));
                this.groupedViewData = getGroupData(this.data);
            },
            selectionChanged() {
                if (this.theChart.selection) {
                    let point = this.theChart.selection.collectionView.currentItem;
                    if (point && point.group && !point.group.isBottomLevel) {
                        this.showGroup(point.group);
                    }
                }
            },
            _onHeaderClick(e) {
                if (e.target instanceof HTMLAnchorElement) {
                    e.preventDefault();
                    //
                    // get the link path
                    let path = e.target.href;
                    path = path.substr(path.lastIndexOf('#') + 1);
                    let paths = path.split('/');
                    //
                    // find the group that matches the path
                    let src = this.data;
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
                    this.showGroup(src);
                }
            },
            showGroup(group) {
                // update titles
                this._updateChartHeader(group);
                var level = 'level' in group ? group.level + 1 : 0;
                this.theChart.axisX.title = wijmo.toHeaderCase(this.data.groupDescriptions[level].propertyName);
                //
                // update the series color (use a different one for each level)
                var palette = this.theChart.palette || chart.Palettes.standard;
                this.theChart.series[0].style = {
                    fill: palette[level],
                    stroke: palette[level]
                };
                //
                // update data
                this.theChart.itemsSource = getGroupData(group);
                this.theChart.selection = null;
            },
            _updateChartHeader(group) {
                let item = group.items[0],
                    path = '',
                    headers = [];
                //
                for (let i = 0; i <= group.level; i++) {
                    let prop = this.data.groupDescriptions[i].propertyName,
                        hdr = wijmo.format('<a href="#{path}">{prop}</a>: {value}', {
                            path: path,
                            prop: wijmo.toHeaderCase(prop),
                            value: item[prop]
                        });
                    headers.push(hdr);
                    path += '/' + item[prop];
                }
                //
                this.header.innerHTML = headers.length > 0
                    ? 'IMF estimates GDP(nominal) GDP for ' + headers.join(', ')
                    : 'IMF estimates GDP(nominal) GDP';
            }
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    body {
        margin-bottom: 24px;
    }

    .container h4 {
        text-align: center;
    }

    .container a {
        cursor: pointer;
    }

    .container .wj-flexchart {
        border: none;
    }

    .container {
        border: 1px solid #e4e4e4;
    }
</style>
