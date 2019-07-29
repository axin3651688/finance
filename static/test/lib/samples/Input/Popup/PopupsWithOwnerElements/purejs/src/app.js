import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as input from '@grapecity/wijmo.input';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let popClickBlur = new input.Popup('#popClickBlur', {
        owner: document.getElementById('btnClickBlur'),
        showTrigger: 'Click',
        hideTrigger: 'Blur'
    });
    //
    let popClickClick = new input.Popup('#popClickClick', {
        owner: document.getElementById('btnClickClick'),
        showTrigger: 'Click',
        hideTrigger: 'Click'
    });
    //
    var popClickNone = new input.Popup('#popClickNone', {
        owner: document.getElementById('btnClickNone'),
        showTrigger: 'Click',
        hideTrigger: 'None'
    });
}
