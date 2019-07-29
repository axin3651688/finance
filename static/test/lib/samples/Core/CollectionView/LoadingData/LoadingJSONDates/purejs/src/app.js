import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as grid from '@grapecity/wijmo.grid';
import { getData } from './data';
// 
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // Start with some data encoded as JSON (as it would arrive from a server)
    let json = getData();
    //
    // Decode the data
    // No special parsing for dates, the date field will contain strings
    let dataBad = JSON.parse(json);
    //
    // Show the bad data in a grid
    let theGridBad = new grid.FlexGrid('#theGridBad', {
        itemsSource: dataBad
    });
    //
    // Decode the data
    // Use with a Date reviver to restore date fields
    let dataGood = JSON.parse(json, (key, value) => {
        if (typeof value === 'string') {
            // Parse dates saved as JSON-strings
            let m = value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/);
            if (m) {
                return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +m[6]));
            }
            //
            // Parse dates saved as OData-style strings
            m = value.match(/^\/Date\((\d+)\)$/);
            if (m) {
                return new Date(parseInt(m[1]));
            }
        }
        return value;
    });
    //
    // Show the good data in a grid
    let theGridGood = new grid.FlexGrid('#theGridGood', {
        itemsSource: dataGood
    });
}
