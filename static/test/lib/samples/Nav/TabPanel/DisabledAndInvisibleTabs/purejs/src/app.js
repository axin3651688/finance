import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjNav from '@grapecity/wijmo.nav';
// 
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    var theTabPanel = new wjNav.TabPanel('#theTabPanel');
    // toggle Europe's disabled state
    document.getElementById('disableEurope').addEventListener('click', function (e) {
        theTabPanel.getTab('tab-europe').isDisabled = e.target.checked;
    });
    // toggle Oceania's visibility
    document.getElementById('showOceania').addEventListener('click', function (e) {
        theTabPanel.getTab('tab-oceania').isVisible = e.target.checked;
    });
}
