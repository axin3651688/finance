import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wijmo from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: new wijmo.CollectionView(getData(), {
                sortDescriptions: ["country"],
                trackChanges: true
            })
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <wjGrid.FlexGrid itemsSource={this.state.view} allowAddNew={true} allowDelete={true}>
            </wjGrid.FlexGrid>

            <h3>Edited Items:</h3>
            <wjGrid.FlexGrid className="changed edited" itemsSource={this.state.view.itemsEdited} isReadOnly={true}>
            </wjGrid.FlexGrid>

            <h3>Added Items:</h3>
            <wjGrid.FlexGrid className="changed added" itemsSource={this.state.view.itemsAdded} isReadOnly={true}>
            </wjGrid.FlexGrid>

            <h3>Removed Items:</h3>
            <wjGrid.FlexGrid className="changed removed" itemsSource={this.state.view.itemsRemoved} isReadOnly={true}>
            </wjGrid.FlexGrid>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
