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
            script.onload = () => wijmo._updateCulture();
            //
            script.src = url;
            document.head.appendChild(script);
        }
    });
    //
    // parse dates
    document.querySelector('#dtBtn').addEventListener('click', () => {
        let text = document.querySelector('#dtIn').value, fmt = document.querySelector('#dtFmt').value, value = wijmo.Globalize.parseDate(text, fmt), output = document.querySelector('#dtOutput');
        //
        output.textContent = wijmo.isDate(value)
            ? 'Parsed OK: ' + wijmo.Globalize.format(value, fmt)
            : '** Could not parse date... **';
    });
    //
    // parse numbers
    document.querySelector('#numBtn').addEventListener('click', () => {
        let text = document.querySelector('#numIn').value, fmt = document.querySelector('#numFmt').value, value = wijmo.Globalize.parseFloat(text, fmt), output = document.querySelector('#numOutput');
        //
        output.textContent = wijmo.isNumber(value)
            ? 'Parsed OK: ' + wijmo.Globalize.format(value, fmt)
            : '** Could not parse number... **';
    });
}
