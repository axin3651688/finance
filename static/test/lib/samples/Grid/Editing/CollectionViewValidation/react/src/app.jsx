import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import * as wjcCore from '@grapecity/wijmo';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.countries = ['US', 'Germany', 'UK', 'Japan', 'Sweden', 'Norway', 'Denmark'];
        this.state = {
            data: this.getData()
        };
    }
    render() {
        return <div className="container-fluid">
			<wjGrid.FlexGrid itemsSource={this.state.data}>
                <wjGrid.FlexGridColumn binding="id" header="ID" width={50}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="country" header="Country" isRequired={true}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="sales" header="Sales"></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="expenses" header="Expenses"></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="overdue" header="Overdue"></wjGrid.FlexGridColumn>
            </wjGrid.FlexGrid>
        </div>;
    }
    getData() {
        let data = [];
        for (let i = 0; i < this.countries.length; i++) {
            data.push({
                id: i,
                country: this.countries[i],
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000,
                overdue: i % 4 == 0
            });
        }
        let view = new wjcCore.CollectionView(data, {
            getError: (item, prop) => {
                if (prop == 'sales' && item.sales < 0) {
                    return 'Sales cannot be negative!';
                }
                if (prop == 'expenses' && item.expenses < 0) {
                    return 'Expenses cannot be negative!';
                }
            }
        });
        return view;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
