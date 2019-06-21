import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import * as wjGridGrouppanelModule from '@grapecity/wijmo.react.grid.grouppanel';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            flex: null
        };
    }
    render() {
        return <div className="container-fluid">
            <wjGridGrouppanelModule.GroupPanel grid={this.state.flex} placeholder="Drag columns here to create groups">
            </wjGridGrouppanelModule.GroupPanel>

            <wjGrid.FlexGrid initialized={this.initializedGrid.bind(this)} itemsSource={this.state.data}>
                <wjGrid.FlexGridColumn binding="id" header="ID" width={60} isReadOnly={true}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="country" header="Country"></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="product" header="Product"></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="sales" header="Sales" aggregate="Sum"></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="expenses" header="Expenses" aggregate="Sum"></wjGrid.FlexGridColumn>
            </wjGrid.FlexGrid>
        </div>;
    }
    initializedGrid(ctl) {
        this.setState({
            flex: ctl
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
