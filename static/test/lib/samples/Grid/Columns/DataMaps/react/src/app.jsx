import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjcGrid from '@grapecity/wijmo.grid';
import * as wjGrid from '@grapecity/wijmo.react.grid';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            customerMap: null,
            countries: 'US,Germany,UK,Japan,Sweden,Norway,Denmark'.split(','),
            customers: [
                { id: 0, name: 'Paul Perkins', address: '123 Main St' },
                { id: 1, name: 'Susan Smith', address: '456 Grand Ave' },
                { id: 2, name: 'Joan Jett', address: '789 Broad St' },
                { id: 3, name: 'Don Davis', address: '321 Shattuck Ave' },
            ]
        };
    }
    render() {
        return <div className="container-fluid">
            <wjGrid.FlexGrid initialized={this.mainGridInitialized.bind(this)} itemsSource={this.state.data}>
                <wjGrid.FlexGridColumn header="Customer" binding="customer" width="1.5*" dataMap={this.state.customerMap}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn header="Country" binding="country" width="*" dataMap={this.state.countries}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn header="Downloads" binding="downloads" width="*" format="n0"></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn header="Sales" binding="sales" width="*" format="n0"></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn header="Expenses" binding="expenses" width="*" format="n0"></wjGrid.FlexGridColumn>
            </wjGrid.FlexGrid>
            
            <p>
			And here is another grid showing all the customers.
			If you edit their names, you will see the change in the
			top grid:
            </p>

            <wjGrid.FlexGrid initialized={this.dataMapGridInitialized.bind(this)} itemsSource={this.state.customers}>
            </wjGrid.FlexGrid>

        </div>;
    }
    mainGridInitialized(mainGrid) {
        this.mainGrid = mainGrid;
    }
    dataMapGridInitialized(flexGrid) {
        var data = this.getData();
        var customerMap = new wjcGrid.DataMap(this.state.customers, 'id', 'name');
        var _this = this;
        flexGrid.rowEditEnded.addHandler(() => {
            let column = this.mainGrid.getColumn('customer');
            if (column) {
                column.dataMap = new wjcGrid.DataMap(_this.state.customers, 'id', 'name');
            }
            this.mainGrid.refresh(); // update customer names on the main grid
        });
        this.setState({
            data: data,
            customerMap: customerMap
        });
    }
    getData() {
        let data = [];
        for (let i = 0; i < this.state.countries.length; i++) {
            data.push({
                id: i,
                country: this.state.countries[i],
                customer: this.state.customers[i % this.state.customers.length].id,
                active: i % 5 != 0,
                downloads: Math.round(Math.random() * 200000),
                sales: Math.random() * 100000,
                expenses: Math.random() * 50000
            });
        }
        return data;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
