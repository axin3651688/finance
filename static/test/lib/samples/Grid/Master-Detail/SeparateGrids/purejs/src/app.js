import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjCore from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.input';
import * as wjGrid from '@grapecity/wijmo.grid';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // create some random data
    var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(',');
    var products = 'Phones,Cars,Stereos,Watches,Computers'.split(',');
    var data = [];
    for (var i = 0; i < 50; i++) {
        data.push({
            id: i,
            country: countries[i % countries.length],
            product: products[i % products.length],
            date: wjCore.DateTime.addDays(new Date(), i),
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000,
        });
    }
    //
    // show countries in combo
    var theCombo = new wjInput.ComboBox('#theCombo', {
        itemsSource: countries,
        selectedIndexChanged: function () {
            view.refresh(); // refresh view to filter by country
        }
    });
    //
    // create CollectionView to show items for the selected country
    var view = new wjCore.CollectionView(data, {
        filter: function (item) {
            return item.country == theCombo.text;
        }
    });
    //
    // show items for the selected country in the detail grid
    var theGridDetail = new wjGrid.FlexGrid('#theGridDetail', {
        itemsSource: view
    });
    //
    // using a grid as the master
    var theGridMaster = new wjGrid.FlexGrid('#theGridMaster', {
        itemsSource: data,
        selectionMode: 'Row',
        isReadOnly: true,
        selectionChanged: function (s, e) {
            updateDetailControls();
        }
    });
    //
    // update detail controls when selection changes
    function updateDetailControls() {
        var item = theGridMaster.collectionView.currentItem;
        var bndCtls = document.querySelectorAll('.bnd-ctl');
        for (var i = 0; i < bndCtls.length; i++) {
            var host = bndCtls[i];
            var prop = host.id.substr(3).toLowerCase();
            var ctl = wjCore.Control.getControl(host);
            if (wjCore.isString(item[prop])) {
                ctl['text'] = item[prop];
            }
            else {
                ctl['value'] = item[prop];
            }
        }
    }
    //
    // set a property on the current item
    function setProperty(prop, val) {
        var v = theGridMaster.collectionView;
        v.editItem(v.currentItem);
        v.currentItem[prop] = val;
        v.commitEdit();
    }
    //
    // define detail controls
    var theCountry = new wjInput.ComboBox('#theCountry', {
        itemsSource: countries,
        textChanged: function (s, e) {
            setProperty('country', s.text);
        }
    });
    var theProduct = new wjInput.ComboBox('#theProduct', {
        itemsSource: products,
        textChanged: function (s, e) {
            setProperty('product', s.text);
        }
    });
    var theDate = new wjInput.InputDate('#theDate', {
        valueChanged: function (s, e) {
            setProperty('date', s.value);
        }
    });
    var theSales = new wjInput.InputNumber('#theSales', {
        format: 'n2',
        step: 10,
        valueChanged: function (s, e) {
            setProperty('sales', s.value);
        }
    });
    var theExpenses = new wjInput.InputNumber('#theExpenses', {
        format: 'n2',
        step: 10,
        valueChanged: function (s, e) {
            setProperty('expenses', s.value);
        }
    });
}
