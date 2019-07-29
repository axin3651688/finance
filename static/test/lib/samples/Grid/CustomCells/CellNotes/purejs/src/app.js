import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Tooltip, toggleClass } from '@grapecity/wijmo';
import { FlexGrid } from '@grapecity/wijmo.grid';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    var tooltip = new Tooltip();
    new FlexGrid('#theGrid', {
        alternatingRowStep: 0,
        autoGenerateColumns: false,
        columns: [
            { binding: 'country', header: 'Country' },
            { binding: 'downloads', header: 'Downloads', format: 'n0' },
            { binding: 'active', header: 'Active' },
            { binding: 'sales', header: 'Sales', format: 'n0' },
            { binding: 'expenses', header: 'Expenses', format: 'n0' }
        ],
        itemsSource: getData(200),
        // add the wj-has-notes class to cells that have notes and
        // add a tooltip to the cell element.
        formatItem: function (s, e) {
            if (e.panel == s.cells) {
                var item = s.rows[e.row].dataItem, binding = s.columns[e.col].binding, note = item.notes ? item.notes[binding] : null;
                toggleClass(e.cell, 'wj-has-notes', note != null);
                if (note != null) {
                    tooltip.setTooltip(e.cell, '<b>Note:</b><br/>' + note);
                }
            }
        },
        // clear all tooltips when updating the view
        updatingView: function () {
            tooltip.dispose();
        }
    });
    // get some data with notes
    function getData(cnt) {
        var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','), data = [];
        // create the data
        for (var i = 0; i < cnt; i++) {
            data.push({
                country: countries[i % countries.length],
                active: i % 5 != 0,
                downloads: Math.round(Math.random() * 200000),
                sales: Math.random() * 100000,
                expenses: Math.random() * 50000
            });
        }
        // add some notes
        for (var i = 0; i < data.length; i++) {
            var item = data[i], notes = {};
            if (item.sales < 5000) {
                notes.sales = 'What\'s going on in <b>' + item.country + '</b>?';
            }
            if (item.downloads < 20000) {
                notes.downloads = 'Too few downloads, check adwords...';
            }
            if (item.expenses > 40000) {
                notes.expenses = 'We\'re spending too much here!';
            }
            if (item.country == countries[0] && !item.active) {
                notes.country = 'Why isn\'t this active?';
            }
            if (Object.keys(notes).length) {
                item.notes = notes;
            }
        }
        // done
        return data;
    }
}
