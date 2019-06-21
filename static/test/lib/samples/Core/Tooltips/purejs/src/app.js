import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let tt = new wijmo.Tooltip();
    //
    tt.setTooltip('#span1', 'This is the <b>first</b> span.');
    tt.setTooltip('#span2', '#span2Tooltip');
    tt.setTooltip('#btnAddNew', 'Click to add 1,000 items using the <b>addNew</b> method.');
}
