import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // select culture
    let theCulture = new input.ComboBox('#theCulture', {
        displayMemberPath: 'name',
        itemsSource: [
            { name: 'English (US)', key: 'en' },
            { name: 'English (UK)', key: 'en-GB' },
            { name: 'Spanish', key: 'es' },
            { name: 'German', key: 'de' },
            { name: 'Italian', key: 'it' },
            { name: 'French', key: 'fr' },
            { name: 'Portuguese', key: 'pt' },
            { name: 'Russian', key: 'ru' },
            { name: 'Japanese', key: 'ja' },
            { name: 'Korean', key: 'ko' },
            { name: 'Chinese', key: 'zh' }
        ],
        selectedIndexChanged: (sender) => {
            // apply new culture to page
            let url = `node_modules/@grapecity/wijmo.cultures/wijmo.culture.${sender.selectedItem.key}.js`, scripts = document.getElementsByTagName('script');
            //
            for (let i = 0; i < scripts.length; i++) {
                let script = scripts[i];
                if (script.src.indexOf('/cultures/wijmo.culture.') > -1) {
                    script.parentElement.removeChild(script);
                    break;
                }
            }
            //
            let script = document.createElement('script');
            script.onload = () => {
                wijmo._updateCulture();
                updateTables();
            };
            script.src = url;
            //
            document.head.appendChild(script);
        }
    });
    //
    // initialize value and precision
    let theValue = new input.InputNumber('#theValue', {
        value: 1234.5678,
        step: 1,
        valueChanged: updateTables
    });
    let thePrecision = new input.InputNumber('#thePrecision', {
        value: 2,
        step: 1,
        min: 0,
        max: 10,
        valueChanged: updateTables
    });
    //
    // update the tables
    updateTables();
    //
    function updateTables() {
        // update dates
        let theDate = new Date(), rows = document.body.querySelectorAll('#tblDates tbody tr');
        //
        for (let i = 0; i < rows.length; i++) {
            let cells = rows[i].children, fmt = cells[0].textContent;
            //
            cells[2].textContent = wijmo.Globalize.format(theDate, fmt);
        }
        //
        // update numbers
        rows = document.body.querySelectorAll('#tblNumbers tbody tr');
        for (let i = 0; i < rows.length; i++) {
            let cells = rows[i].children, fmt = cells[0].textContent.replace('*', thePrecision.value.toString());
            //
            cells[2].textContent = wijmo.Globalize.format(theValue.value, fmt);
        }
    }
}
