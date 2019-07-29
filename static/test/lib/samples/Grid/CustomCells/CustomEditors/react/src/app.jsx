import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjFlexGrid from '@grapecity/wijmo.react.grid';
import * as wjcCore from '@grapecity/wijmo';
import * as wjcInput from '@grapecity/wijmo.input';
import { CustomGridEditor } from './custom-grid-editor';
class App extends React.Component {
    constructor(props) {
        super(props);
        this._countries = 'US,Germany,UK,Japan,Italy,Greece'.split(',');
        this._products = [
            { id: 0, name: 'Widget', unitPrice: 23.43 },
            { id: 1, name: 'Gadget', unitPrice: 12.33 },
            { id: 2, name: 'Doohickey', unitPrice: 53.07 }
        ];
        this.data = this._getData(200);
        this.initializeGrid = this.initializeGrid.bind(this);
    }
    initializeGrid(flex) {
        // add custom editors to the grid
        new CustomGridEditor(flex, 'date', wjcInput.InputDate, {
            format: 'd'
        });
        new CustomGridEditor(flex, 'time', wjcInput.InputTime, {
            format: 't',
            min: new Date(2000, 1, 1, 7, 0),
            max: new Date(2000, 1, 1, 22, 0),
            step: 30
        });
        new CustomGridEditor(flex, 'country', wjcInput.ComboBox, {
            itemsSource: this._countries
        });
        new CustomGridEditor(flex, 'amount', wjcInput.InputNumber, {
            format: 'n2',
            step: 10
        });
        //
        // create an editor based on a ComboBox
        let multiColumnEditor = new CustomGridEditor(flex, 'product', wjcInput.ComboBox, {
            headerPath: 'name',
            displayMemberPath: 'name',
            itemsSource: this._products
        });
        //
        // customize the ComboBox to show multiple columns
        let combo = multiColumnEditor.control;
        if (combo instanceof wjcInput.ComboBox) {
            combo.listBox.formatItem.addHandler((s, e) => {
                e.item.innerHTML = '<table><tr>' +
                    '<td style="width:30px;text-align:right;padding-right:6px">' + e.data.id + '</td>' +
                    '<td style="width:100px;padding-right:6px"><b>' + e.data.name + '</b></td>' +
                    '<td style="width:80px;text-align:right;padding-right:6px">' +
                    wjcCore.Globalize.format(e.data.unitPrice, 'c') +
                    '</td>' +
                    '</tr></table>';
            });
        }
    }
    _getData(cnt) {
        // generate some random data
        let data = [];
        let dt = new Date();
        for (let i = 0; i < 100; i++) {
            data.push({
                id: i,
                date: new Date(dt.getFullYear(), i % 12, 25, i % 24, i % 60, i % 60),
                time: new Date(dt.getFullYear(), i % 12, 25, i % 24, i % 60, i % 60),
                country: this._countries[Math.floor(Math.random() * this._countries.length)],
                product: this._products[Math.floor(Math.random() * this._products.length)].name,
                amount: Math.random() * 10000 - 5000,
                discount: Math.random() / 4
            });
        }
        return data;
    }
    render() {
        return <div className="container-fluid">
            <wjFlexGrid.FlexGrid keyActionTab="CycleOut" initialized={this.initializeGrid} itemsSource={this.data}>
                <wjFlexGrid.FlexGridColumn binding="id" header="ID" width={40} isReadOnly={true}></wjFlexGrid.FlexGridColumn>
                <wjFlexGrid.FlexGridColumn binding="date" header="Date" format="d"></wjFlexGrid.FlexGridColumn>
                <wjFlexGrid.FlexGridColumn binding="time" header="Time" format="t"></wjFlexGrid.FlexGridColumn>
                <wjFlexGrid.FlexGridColumn binding="country" header="Country"></wjFlexGrid.FlexGridColumn>
                <wjFlexGrid.FlexGridColumn binding="product" header="Product"></wjFlexGrid.FlexGridColumn>
                <wjFlexGrid.FlexGridColumn binding="amount" header="Amount" format="n2"></wjFlexGrid.FlexGridColumn>
            </wjFlexGrid.FlexGrid>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
