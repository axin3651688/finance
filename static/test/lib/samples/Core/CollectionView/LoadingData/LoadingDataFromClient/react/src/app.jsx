import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wijmo from '@grapecity/wijmo';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.formatData = (value, fmt) => {
            return wijmo.Globalize.format(value, fmt);
        };
        this.state = {
            data: new wijmo.CollectionView(getData(), {
                sortDescriptions: ['country'] // sort by country
            })
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <ul>
                {this.state.data.items.map((item) => {
            return <li key={item.id}>
                            <b>{item.country}</b> sales: {this.formatData(item.sales, 'n*')} (id: {item.id})
                        </li>;
        })}
            </ul>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
