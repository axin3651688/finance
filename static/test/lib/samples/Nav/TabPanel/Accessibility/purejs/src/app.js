import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjNav from '@grapecity/wijmo.nav';
// 
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    var theTabPanel = new wjNav.TabPanel('#theTabPanel');
    // toggle autoSwitch property
    document.getElementById('autoSwitch').addEventListener('click', function (e) {
        theTabPanel.autoSwitch = e.target.checked;
    });
}
