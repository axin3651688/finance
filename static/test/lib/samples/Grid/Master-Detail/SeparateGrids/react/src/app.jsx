import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjCore from "@grapecity/wijmo";
import * as wjcGrid from "@grapecity/wijmo.react.grid";
import * as wjInput from "@grapecity/wijmo.react.input";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: "US,Germany,UK,Japan,Italy,Greece".split(","),
            products: "Phones,Cars,Stereos,Watches,Computers".split(","),
            gridData: [],
            detailView: null
        };
    }
    componentDidMount() {
        this.setState({
            gridData: this.getData(),
            detailView: new wjCore.CollectionView(this.getData(), {
                filter: (item) => {
                    return item.country === this.countriesCombo.text;
                }
            })
        });
    }
    render() {
        return <div className="container-fluid">
            <p>
                For example, the ComboBox below is used as a master
                control. Select a country from the combo and the
                grid below will show the items in that country:
            </p>
            <label>Select a country:
                <wjInput.ComboBox initialized={this.initCountriesCombo.bind(this)} itemsSource={this.state.countries} selectedIndexChanged={this.onCountriesSelectedIndexChanged.bind(this)}>
                </wjInput.ComboBox>
            </label>
            <wjcGrid.FlexGrid itemsSource={this.state.detailView}>
            </wjcGrid.FlexGrid>
            <p>
                In the next example, The FlexGrid is used as the master
                control. Select an item on the grid and see the details
                in the controls below:
            </p>
            <h3>Master</h3>
            <wjcGrid.FlexGrid initialized={this.initGridMaster.bind(this)} itemsSource={this.state.gridData} selectionMode={'Row'} isReadOnly={true} selectionChanged={this.onSelectionChanged.bind(this)}>
            </wjcGrid.FlexGrid>
            <h3>Detail</h3>
            <table className="tbl-spaced">
                <tr>
                    <td>Country:</td>
                    <td>
                        <wjInput.ComboBox itemsSource={this.state.countries} className="bnd-ctl" id="theCountry" textChanged={this.setProperty.bind(this, 'country')}>
                        </wjInput.ComboBox>
                    </td>
                </tr>
                <tr>
                    <td>Product:</td>
                    <td>
                        <wjInput.ComboBox itemsSource={this.state.products} className="bnd-ctl" id="theProduct" textChanged={this.setProperty.bind(this, 'product')}>
                        </wjInput.ComboBox>
                    </td>
                </tr>
                <tr>
                    <td>Date:</td>
                    <td>
                        <wjInput.InputDate className="bnd-ctl" id="theDate" textChanged={this.setProperty.bind(this, 'date')}>
                        </wjInput.InputDate>
                    </td>
                </tr>
                <tr>
                    <td>Sales:</td>
                    <wjInput.InputNumber className="bnd-ctl" id="theSales" format="'n2'" step={10} valueChanged={this.setProperty.bind(this, 'sales')}></wjInput.InputNumber>
                </tr>
                <tr>
                    <td>Expenses:</td>
                    <wjInput.InputNumber className="bnd-ctl" id="theExpenses" format="'n2'" step={10} valueChanged={this.setProperty.bind(this, 'expenses')}></wjInput.InputNumber>
                </tr>
            </table>
        </div>;
    }
    initCountriesCombo(countriesCombo) {
        this.countriesCombo = countriesCombo;
    }
    onCountriesSelectedIndexChanged() {
        this.state.detailView.refresh();
    }
    initGridMaster(theGridMaster) {
        this.theGridMaster = theGridMaster;
    }
    onSelectionChanged() {
        var item = this.theGridMaster.collectionView.currentItem;
        var bndCtls = document.querySelectorAll(".bnd-ctl");
        for (var i = 0; i < bndCtls.length; i++) {
            var host = bndCtls[i];
            var prop = host.id.substr(3).toLowerCase();
            var ctl = wjCore.Control.getControl(host);
            if (wjCore.isString(item[prop])) {
                ctl["text"] = item[prop];
            }
            else {
                ctl["value"] = item[prop];
            }
        }
    }
    setProperty(prop, sender) {
        var val = prop === "country" || prop === "product"
            ? sender.text
            : sender.value;
        var v = this.theGridMaster.collectionView;
        v.editItem(v.currentItem);
        v.currentItem[prop] = val;
        v.commitEdit();
    }
    getData() {
        var data = [];
        for (var i = 0; i < 50; i++) {
            data.push({
                id: i,
                country: this.state.countries[i % this.state.countries.length],
                product: this.state.products[i % this.state.products.length],
                date: wjCore.DateTime.addDays(new Date(), i),
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000
            });
        }
        return data;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
