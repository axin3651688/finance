import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        var json = getData();
        this.state = {
            dataBad: JSON.parse(json),
            dataGood: JSON.parse(json, (key, value) => {
                if (typeof value === 'string') {
                    // Parse dates saved as JSON-strings
                    let m = value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/);
                    if (m) {
                        return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +m[6]));
                    }
                    //
                    // Parse dates saved as OData-style strings
                    m = value.match(/^\/Date\((\d+)\)$/);
                    if (m) {
                        return new Date(parseInt(m[1]));
                    }
                }
                return value;
            })
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <p>
                Here's an example: note how the "Date" column contains strings:
            </p>
            <wjGrid.FlexGrid itemsSource={this.state.dataBad}>
            </wjGrid.FlexGrid>

            <p>
                Here is a grid showing the same data, this time parsed with a date reviver function:
            </p>
            <wjGrid.FlexGrid itemsSource={this.state.dataGood}>
            </wjGrid.FlexGrid>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
