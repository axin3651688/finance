import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjInput from '@grapecity/wijmo.input';
import * as wjCore from '@grapecity/wijmo';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    var theListBox = new wjInput.ListBox('#theListBox', {
        displayMemberPath: 'country',
        selectedIndexChanged: (sender) => {
            let template = '<b>Selection:</b><br/>' +
                'Index: <b>{index}</b><br/>' +
                'Country: <b>{country}</b><br/>' +
                'GDP (US$M): <b>{gdp:n0}</b><br/>' +
                'Population: <b>{pop:n0}</b>';
            //
            let item = sender.selectedItem, html = wjCore.format(template, {
                index: sender.selectedIndex,
                country: item.country,
                gdp: item.gdpm,
                pop: item.popk * 1000
            });
            //
            document.querySelector('#selectedItem').innerHTML = html;
        },
        itemsSource: getData()
    });
}
