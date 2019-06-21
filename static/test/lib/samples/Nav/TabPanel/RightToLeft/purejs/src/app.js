import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjNav from '@grapecity/wijmo.nav';
// 
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    new wjNav.TabPanel('#theTabPanel');
}
