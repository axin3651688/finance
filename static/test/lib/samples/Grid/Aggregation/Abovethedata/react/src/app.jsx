import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjcCore from "@grapecity/wijmo";
import * as wjGrid from '@grapecity/wijmo.react.grid';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: new wjcCore.CollectionView(getData(), {
                groupDescriptions: [new wjcCore.PropertyGroupDescription('Grand Totals', () => {
                        return '';
                    })]
            })
        };
    }
    render() {
        return <div className="container-fluid">
            <wjGrid.FlexGrid frozenRows={1} itemsSource={this.state.data}>
                <wjGrid.FlexGridColumn binding="id" header="ID" width={60} isReadOnly={true}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="country" header="Country"></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="product" header="Product"></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="sales" header="Sales" aggregate="Sum"></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="expenses" header="Expenses" aggregate="Sum"></wjGrid.FlexGridColumn>
            </wjGrid.FlexGrid>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
