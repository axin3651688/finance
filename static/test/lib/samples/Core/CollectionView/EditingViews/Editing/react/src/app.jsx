import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
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
                sortDescriptions: ["country"]
            })
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <wjGrid.FlexGrid itemsSource={this.state.view}>
            </wjGrid.FlexGrid>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
