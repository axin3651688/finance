import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        alternatingRowStep: 0,
        showMarquee: true,
        itemsSource: getData(),
    });
    //
    // toggle marquee styling
    document.getElementById('showMarquee').addEventListener('click', function (e) {
        theGrid.showMarquee = e.target.checked;
        theGrid.focus();
    });
    document.getElementById('customMarquee').addEventListener('click', function (e) {
        wjCore.toggleClass(theGrid.hostElement, 'customMarquee', e.target.checked);
        theGrid.invalidate();
        theGrid.focus();
    });
    document.getElementById('highlightActive').addEventListener('click', function (e) {
        wjCore.toggleClass(theGrid.hostElement, 'highlightActive', e.target.checked);
        theGrid.focus();
    });
}
