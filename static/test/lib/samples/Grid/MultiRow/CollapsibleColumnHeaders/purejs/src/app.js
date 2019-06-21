import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjInput from '@grapecity/wijmo.input';
import * as wjMultiRow from '@grapecity/wijmo.grid.multirow';
import { generateAppData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let appData = generateAppData();
    let chMultirow = new wjMultiRow.MultiRow('#chMultirow', {
        itemsSource: appData.orders,
        layoutDefinition: appData.ldThreeLines,
        collapsedHeaders: true,
        showHeaderCollapseButton: true,
        collapsedHeadersChanged: function (s, e) {
            cbCollapsedHeaders.selectedValue = s.collapsedHeaders;
        }
    });
    // handle combo
    let cbCollapsedHeaders = new wjInput.ComboBox('#cbCollapsedHeaders', {
        displayMemberPath: 'name',
        selectedValuePath: 'value',
        itemsSource: [
            { name: 'true', value: true },
            { name: 'false', value: false },
            { name: 'null', value: null }
        ],
        selectedValue: chMultirow.collapsedHeaders,
        selectedIndexChanged: function (s, e) {
            chMultirow.collapsedHeaders = s.selectedValue;
        }
    });
    // handle checkbox
    document.getElementById('cbshowHeaderCollapseButton').addEventListener('click', function (e) {
        chMultirow.showHeaderCollapseButton = e.target.checked;
    });
}
