import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjCore from '@grapecity/wijmo';
import * as wjNav from '@grapecity/wijmo.nav';
import * as wjInput from '@grapecity/wijmo.input';
// 
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    var theTabPanel = new wjNav.TabPanel('#theTabPanel');
    // change tab position
    var tabPosition = new wjInput.ComboBox('#tabPosition', {
        itemsSource: 'Left,Right,Above,Below'.split(','),
        selectedIndexChanged: function (s, e) {
            var host = theTabPanel.hostElement;
            s.itemsSource.forEach(function (pos, index) {
                var clsName = 'tabs-' + pos.toLowerCase();
                wjCore.toggleClass(host, clsName, index == s.selectedIndex);
            });
        },
        selectedIndex: 2,
    });
    // toggle animation
    document.getElementById('isAnimated').addEventListener('click', function (e) {
        theTabPanel.isAnimated = e.target.checked;
    });
    // toggle custom headers
    document.getElementById('customHeaders').addEventListener('click', function (e) {
        wjCore.toggleClass(theTabPanel.hostElement, 'custom-headers', e.target.checked);
    });
    //  change tab alignment
    var tabAlign = new wjInput.ComboBox('#tabAlign', {
        itemsSource: 'Left,Center,Right'.split(','),
        selectedIndexChanged: function (s, e) {
            var host = theTabPanel.hostElement, headers = host.querySelector('.wj-tabheaders');
            headers.style.textAlign = s.text;
        }
    });
}
