import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjChart from '@grapecity/wijmo.chart';
import * as wijmo from '@grapecity/wijmo';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let rendered = false, wjSelected = 'wj-state-selected', selections = [], mouseDown = false, start = null, end = null, selector = null, offset = null, mousePt = null, isTouch = false, items = [];
    //
    // create the chart
    let chart = new wjChart.FlexChart('#theChart', {
        chartType: 'Scatter',
        axisY: {
            axisLine: true
        },
        legend: {
            position: 'None'
        },
        tooltip: {
            content: ''
        },
        series: [
            {
                name: 'Experiment 1',
                itemsSource: getData(50, 0, 3),
                bindingX: 'x',
                binding: 'y'
            },
            {
                name: 'Experiment 2',
                itemsSource: getData(40, 100, 12),
                bindingX: 'x',
                binding: 'y'
            },
            {
                name: 'Experiment 3',
                itemsSource: getData(30, -100, 24),
                bindingX: 'x',
                binding: 'y'
            }
        ],
        rendered: (sender) => {
            if (!rendered) {
                sender.hostElement.addEventListener('mousedown', chartMouseDown);
                sender.hostElement.addEventListener('mousemove', chartMouseMove);
                sender.hostElement.addEventListener('mouseup', chartMouseUp);
                sender.hostElement.addEventListener('mouseleave', chartMouseLeave);
                sender.hostElement.addEventListener('click', chartClick);
                window.addEventListener('touchstart', () => isTouch = true, false);
                //
                // boolean flag - don't re-add event listener after resize
                rendered = true;
                //
                selector = document.querySelector('#plotSelection');
                sender.hostElement.appendChild(selector);
            }
            else {
                // *visually* restore selection after redraw (ex. resize browser, change chart type)
                restoreSelection();
            }
        }
    });
    //
    // helper for clearing chart selection
    function clearSelection() {
        selections.forEach(item => {
            let series = item.series, el = series.getPlotElement(item.pointIndex);
            //
            if (el) {
                wijmo.removeClass(el, wjSelected);
            }
        });
        //
        selections.length = 0;
    }
    //
    // helper for adding chart selection
    function addSelection(obj) {
        wijmo.addClass(obj.series.getPlotElement(obj.pointIndex), wjSelected);
        //
        selections.push({
            series: obj.series,
            pointIndex: obj.pointIndex
        });
    }
    //
    // helper for removing chart selection
    function removeSelection(ht) {
        let items = selections.filter(item => item.series === ht.series && item.pointIndex === ht.pointIndex), idx = items && items.length > 0 ? selections.indexOf(items[0]) : -1;
        //
        if (idx >= 0) {
            selections.splice(idx, 1);
            wijmo.removeClass(ht.series.getPlotElement(ht.pointIndex), wjSelected);
        }
    }
    //
    // finds selected plot elements after rendering and applies CSS to
    // visually represent selection
    function restoreSelection() {
        selections.forEach(item => {
            let series = item.series, el = series.getPlotElement(item.pointIndex);
            //
            if (el) {
                wijmo.addClass(el, wjSelected);
            }
        });
    }
    //
    // helper to hide the selector
    function hideSelector() {
        wijmo.setCss(selector, {
            'visibility': 'hidden',
            'width': 0,
            'height': 0,
            'left': 0,
            'top': 0
        });
    }
    //
    // selects plot elements within drawn rectangle
    function selectWithinRect(rect) {
        if (!rect || !chart) {
            return;
        }
        //
        chart.series.forEach((item) => {
            let pointCount = item._getLength();
            //
            for (let j = 0; j < pointCount; j++) {
                let el = item.getPlotElement(j);
                //
                if (elementInBounds(el, rect)) {
                    addSelection({
                        series: item,
                        pointIndex: j
                    });
                }
            }
        });
    }
    //
    // helper to determine if plot element is within the bounds
    // of the drawn rectangle
    function elementInBounds(el, rect) {
        let box = el.getBoundingClientRect();
        return !(box.left > rect.right || box.right < rect.left || box.top > rect.bottom || box.bottom < rect.top);
    }
    //
    // clear selection for button click
    function clear() {
        clearSelection();
        // update length for view
        items.length = 0;
    }
    //
    function chartClick(e) {
        if (mouseDown && !isTouch) {
            isTouch = false;
            return;
        }
        //
        let p = wijmo.mouseToPage(e);
        if (mousePt.x !== p.x || mousePt.y !== p.y) {
            return;
        }
        //
        let element = e.target, ht = chart.hitTest(e), selected = false, chartType = chart.chartType;
        //
        selected = selections.some(function (item) {
            return item.series === ht.series && item.pointIndex === ht.pointIndex;
        });
        //
        if (ht && ht.series && !selected && ((ht.distance <= 0 && (chartType == 0 || chartType == 1)) || ht.distance <= 15) && isTouch) {
            // remove selection
            if (wijmo.hasClass(element, wjSelected)) {
                removeSelection(ht);
            }
            // add selection
            else {
                addSelection(ht);
            }
        }
        else if (selected && ((ht.distance <= 0 && (chartType == 0 || chartType == 1)) || ht.distance <= 15) && isTouch) {
            removeSelection(ht);
        }
        else {
            clearSelection();
        }
        //
        isTouch = false;
        // update length for view
        items.length = 0;
        items.push.apply(items, selections);
    }
    //
    function chartMouseDown(e) {
        mousePt = wijmo.mouseToPage(e);
        mouseDown = true;
        e.preventDefault();
    }
    //
    function chartMouseUp(e) {
        if (start != null) {
            start = null;
        }
        //
        if (end != null) {
            let host = chart.hostElement;
            offset = wijmo.getElementRect(host);
            //
            let style = host.getAttribute('style');
            offset.left = offset.left + parseInt(style ? style['padding-left'].replace('px', '') : 0);
            offset.top = offset.top + parseInt(style ? style['padding-top'].replace('px', '') : 0);
            //
            end = start = null;
            //
            clear();
            selectWithinRect(selector.getBoundingClientRect());
            //
            // update length for view
            items.length = 0;
            items.push.apply(items, selections);
            //
            e.preventDefault();
        }
        //
        hideSelector();
        mouseDown = false;
    }
    //
    function chartMouseMove(e) {
        let p = wijmo.mouseToPage(e);
        if (!mouseDown || (mousePt.x == p.x && mousePt.y == p.y)) {
            return;
        }
        //
        let pt = e instanceof MouseEvent ? new wijmo.Point(e.pageX, e.pageY) : new wijmo.Point(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
        //
        if (start != null) {
            end = pt;
            //
            // update selector rectangle
            let w = pt.x - start.x, h = pt.y - start.y;
            //
            if (w >= 0) {
                wijmo.setCss(selector, {
                    'left': start.x - offset.left,
                    'width': w
                });
            }
            else {
                wijmo.setCss(selector, {
                    'left': pt.x - offset.left,
                    'width': -w
                });
            }
            //
            if (h >= 0) {
                wijmo.setCss(selector, {
                    'top': start.y - offset.top,
                    'height': h
                });
            }
            else {
                wijmo.setCss(selector, {
                    'top': pt.y - offset.top,
                    'height': -h
                });
            }
        }
        else {
            wijmo.setCss(selector, {
                'visibility': 'visible'
            });
            offset = wijmo.getElementRect(selector);
            //
            start = pt;
        }
        //
        e.preventDefault();
    }
    //
    function chartMouseLeave(e) {
        if (start) {
            start = end = null;
            mouseDown = false;
            hideSelector();
        }
    }
}
