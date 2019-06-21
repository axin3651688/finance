import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as chart from '@grapecity/wijmo.chart';
import * as hierarchical from '@grapecity/wijmo.chart.hierarchical';
import { getData } from './data';
import { PropertiesTile } from './properties-tile';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let data = getData();
    data.items.forEach(item => item.value = 1); // add the constant 'value' property to get equal arc angles for all element panels
    //
    let mySunburst = new hierarchical.Sunburst('#periodic-sunburst', {
        palette: chart.Palettes.superhero,
        legend: {
            position: chart.Position.None // hide the legend
        },
        innerRadius: 0.3,
        selectionMode: chart.SelectionMode.Point,
        dataLabel: {
            position: chart.PieLabelPosition.Radial,
            content: '{name}' // the panel should display its name (derived from bindingName property)
        },
        binding: 'value',
        bindingName: ['name', 'name', 'symbol'],
        childItemsPath: ['groups', 'items'],
        itemsSource: data.groups
    });
    //
    // Initialize the property tile
    let propTile = new PropertiesTile('#properties-tile');
    //
    // Set up a function to listen for click events on the Sunburst Chart's parent DOM element
    mySunburst.hostElement.addEventListener('click', e => {
        // If a panel is clicked, visually select it
        markSelectedPanel(e.clientX, e.clientY);
        // Perform a hit test to get a clicked panel's name then use it to set up the info panel via the ViewAdapter
        propTile.showInfo(mySunburst.hitTest(e.pageX, e.pageY).item);
    });
    //
    //
    // ** Logic to handle all chart clicks **
    //
    // Set selected element variables in this outer scope to preserve them
    let lastSelectedEle;
    let lastSelectedEleFillColor;
    //
    // Keep track of any hidden text elements using an array
    // This has to be able to store multiple hidden text elements for the case where labels overlap
    let hiddenTextElements = [];
    //
    // Visually marks a panel at the given coordinates as selected
    function markSelectedPanel(panelX, panelY) {
        // First, 'unselect' (restore the fill color of) the element that was selected last, if there is one
        if (lastSelectedEle && lastSelectedEleFillColor) {
            lastSelectedEle.setAttribute('fill', lastSelectedEleFillColor);
        }
        //
        // Define our selected element and check to see if it's a panel that we can fill
        let selectedElement = document.elementFromPoint(panelX, panelY);
        //
        if (selectedElement && selectedElement.hasAttribute('fill') && selectedElement.tagName === 'path') {
            // Reset the lastSelectedEle and then change the fill color of the clicked panel
            let fillColor = selectedElement.getAttribute('fill');
            lastSelectedEle = selectedElement;
            lastSelectedEleFillColor = fillColor;
            //
            let color = new wijmo.Color(fillColor);
            color.a = 1;
            selectedElement.setAttribute('fill', color.toString());
            //
            while (hiddenTextElements.length > 0) { // if we hid any text elements in the process, reshow them
                hiddenTextElements.pop().style.display = 'block';
            }
        }
        else {
            if (selectedElement && selectedElement.tagName === 'text') { // super hacky way to get the right panel if a data label is clicked
                selectedElement.style.display = 'none'; // hide the data label
                hiddenTextElements.push(selectedElement); // keep track of hidden text elements
                markSelectedPanel(panelX, panelY); // run the method again with the data label hidden
            }
        }
        //
        return false;
    }
}
