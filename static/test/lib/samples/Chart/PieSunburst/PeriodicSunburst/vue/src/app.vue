<template>
    <div class="container-fluid">
        <wj-sunburst :innerRadius=0.3 selectionMode="Point" :palette="SuperheroPalette"
            binding="value" :bindingName="['name', 'name', 'symbol']" :childItemsPath="['groups', 'items']"
            :itemsSource="data.groups" :initialized="initializedChart">
            <wj-flex-chart-legend position="None">
            </wj-flex-chart-legend>
            <wj-flex-pie-data-label position="Radial" content="{name}"></wj-flex-pie-data-label>

            <div id="properties-tile"></div>
        </wj-sunburst>
    </div>
</template>

<script>
    import '@grapecity/wijmo.styles/wijmo.css';
    import 'bootstrap.css';
    import * as wijmo from '@grapecity/wijmo';
    import * as chart from '@grapecity/wijmo.chart';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.chart';
    import '@grapecity/wijmo.vue2.chart.hierarchical';
    import { PropertiesTile } from './properties-tile';
    import { getData } from './data';
    //
    new Vue({
        el: '#app',
        data: {
            data: (() => {
                let data = getData();
                data.items.forEach(item => item.value = 1); // add the constant 'value' property to get equal arc angles for all element panels
                return data;
            })(),
            SuperheroPalette: chart.Palettes.superhero
        },
        methods: {
            initializedChart(ctrl) {
                let propTile = new PropertiesTile('#properties-tile', ctrl);
                //
                ctrl.hostElement.addEventListener('click', e => {
                    // If a panel is clicked, visually select it
                    this.$_markSelectedPanel(e.clientX, e.clientY);
                    // Perform a hit test to get a clicked panel's name then use it to set up the info panel via the ViewAdapter
                    propTile.showInfo(ctrl.hitTest(e.pageX, e.pageY).item);
                });
            },
            $_markSelectedPanel(panelX, panelY) {
                    // First, 'unselect' (restore the fill color of) the element that was selected last, if there is one
                    if (this._lastSelectedEle && this._lastSelectedEleFillColor) {
                        this._lastSelectedEle.setAttribute('fill', this._lastSelectedEleFillColor);
                    }
                    //
                    // Define our selected element and check to see if it's a panel that we can fill
                    let selectedElement = document.elementFromPoint(panelX, panelY);
                    //
                    if (selectedElement && selectedElement.hasAttribute('fill') && selectedElement.tagName === 'path') {
                        // Reset the lastSelectedEle and then change the fill color of the clicked panel
                        let fillColor = selectedElement.getAttribute('fill');
                        this._lastSelectedEle = selectedElement;
                        this._lastSelectedEleFillColor = fillColor;
                        //
                        let color = new wijmo.Color(fillColor);
                        color.a = 1;
                        selectedElement.setAttribute('fill', color.toString());
                        //
                        while (this._hiddenTextElements.length > 0) { // if we hid any text elements in the process, reshow them
                            this._hiddenTextElements.pop().style.display = 'block';
                        }
                    } else {
                        if (selectedElement && selectedElement.tagName === 'text') { // super hacky way to get the right panel if a data label is clicked
                            selectedElement.style.display = 'none'; // hide the data label
                            this._hiddenTextElements.push(selectedElement); // keep track of hidden text elements
                            this.$_markSelectedPanel(panelX, panelY); // run the method again with the data label hidden
                        }
                    }
                    //
                    return false;
                }
        },
        created() {
            this._lastSelectedEle = null;
            this._lastSelectedEleFillColor = null;
            // Keep track of any hidden text elements using an array
            // This has to be able to store multiple hidden text elements for the case where labels overlap
            this._hiddenTextElements = [];
        }
    });
</script>

<style>
    .container-fluid .wj-flexchart {
        width: 800px;
        height: 800px;
        margin: 0;
        display: block;
        position: relative;
        font-size: 0.75em;
        border: none;
        background: transparent;
        background-color: transparent;
    }

    .container-fluid .wj-flexchart .wj-state-selected {
        stroke-width: 3px;
        stroke-linecap: square;
        stroke-dasharray: 0;
    }

    .wj-tooltip {
        display: none;
    }

    .container-fluid .wj-flexchart .wj-data-labels .wj-data-label {
        fill: white;
    }

    /* The properties tile that goes in the center of the chart */

    .properties-tile {
        display: block;
        position: absolute;
        background: transparent;
        visibility: hidden;
        text-align: center;
    }

    .properties-tile > div > div {
        position: relative;
        padding: 0;
        margin: 0;
        border: none;
    }

    .properties-tile > div > div > span {
        display: block;
    } 

    /* Specific info pane styling */

    .element-symbol {
        font-size: 2em;
        margin-bottom: 5px;
    }

    .element-name {
        font-size: 1.25em;
        margin-bottom: 20px;
    }

    .group-name {
        font-size: 1.5em;
        margin-bottom: 20px;
    }

    .subgroups-title {
        font-weight: 500;
    }

    .num-elements {
        font-weight: 400;
    }

    .subGroup-name {
        font-size: 1.5em;
        margin-bottom: 5px;
    }

    .element-number-overview {
        font-weight: 500;
        margin-bottom: 15px;
    }

    .characteristics-title {
        font-weight: 500;
    }
</style>
