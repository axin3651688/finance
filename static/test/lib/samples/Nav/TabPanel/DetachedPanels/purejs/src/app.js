import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjNav from '@grapecity/wijmo.nav';
// 
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    var theTabPanel = new wjNav.TabPanel('#theTabPanel', {
        // show the content for the selected tab in a separate div
        selectedIndexChanged: function (s, e) {
            var div = document.getElementById('detachedContent');
            div.innerHTML = 'Content for tab <b>' +
                s.selectedTab.header.textContent +
                '</b>...';
        }
    });
    // hide the built-in content area
    theTabPanel.hostElement.querySelector('.wj-tabpanes').style.display = 'none';
}
