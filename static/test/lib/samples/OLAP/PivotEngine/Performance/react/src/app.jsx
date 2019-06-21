import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as Olap from '@grapecity/wijmo.react.olap';
import * as wjcCore from '@grapecity/wijmo';
import * as wjcOlap from '@grapecity/wijmo.olap';
import { addData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this._start = 0;
        this.state = {
            ds10: addData([], 10e3),
            ds100: null,
            ds500: null,
            ds1M: null,
            enable100K: true,
            enable500K: true,
            enable1M: true,
            ng: new wjcOlap.PivotEngine({
                autoGenerateFields: false,
                fields: [
                    { binding: 'date', header: 'Date', format: 'yyyy' },
                    { binding: 'buyer', header: 'Person' },
                    { binding: 'type', header: 'Category' },
                    { binding: 'amount', header: 'Amount', format: 'c0', aggregate: 'Sum' }
                ],
                itemsSource: addData([], 10e3),
                showRowTotals: 'Subtotals',
                valueFields: ['Amount'],
                rowFields: ['Person', 'Category'],
                updatingView: () => {
                    if (this._start == 0) {
                        this._start = Date.now();
                    }
                },
                updatedView: (s) => {
                    let fmt = 'Summarized <b>{cnt:n0}</b> items in <b>{tm:n0}</b>ms';
                    let tm = Date.now() - this._start;
                    let result = wjcCore.format(fmt, {
                        cnt: s.itemsSource.length,
                        tm
                    });
                    this._result.innerHTML = result;
                    this._start = 0;
                }
            })
        };
    }
    onButtonClick(e) {
        switch (e.target.id) {
            case '10k':
                this.state.ng.itemsSource = this.state.ds10;
                break;
            case '100k':
                this.state.ng.itemsSource = this.state.ds100;
                break;
            case '500k':
                this.state.ng.itemsSource = this.state.ds500;
                break;
            case '1M':
                this.state.ng.itemsSource = this.state.ds1M;
                break;
        }
        this.setState({
            ng: this.state.ng
        });
    }
    _createDataAsync(cnt, callback) {
        let data = [];
        this._addDataAsync(data, cnt, () => {
            callback(data);
        });
    }
    _addDataAsync(data, cnt, callback) {
        setTimeout(() => {
            addData(data, Math.min(cnt - data.length, 1000));
            if (data.length == cnt) {
                callback(data);
            }
            else {
                this._addDataAsync(data, cnt, callback);
            }
        });
    }
    componentDidMount() {
        this._createDataAsync(100e3, (result) => {
            this.setState({
                ds100: result,
                enable100K: false
            });
        });
        this._createDataAsync(500e3, (result) => {
            this.setState({
                ds500: result,
                enable500K: false
            });
        });
        /*this._createDataAsync(1e6, (result) => {
            this.setState({
                ds1M: result,
                enable1M: false
            });
        });*/
    }
    render() {
        return (<div className="container-fluid">
                <div id="buttons" onClick={this.onButtonClick.bind(this)}>
                    <button id="10k" className="btn btn-primary">
                        10k items
                    </button>
                    <button id="100k" className="btn btn-primary" disabled={this.state.enable100K}>
                        100k items
                    </button>
                    <button id="500k" className="btn btn-primary" disabled={this.state.enable500K}>
                        500k items
                    </button>
                    <button id="1M" className="btn btn-primary" disabled={this.state.enable1M}>
                        One Million items
                    </button>
                </div>

                <p ref={el => this._result = el} id="result">
                </p>
                <div className="output">
                    <Olap.PivotGrid id="pivotGrid" itemsSource={this.state.ng}></Olap.PivotGrid>
                </div>

                <p>
                    If you deal with massive data sets, with millions of records,
                    you should consider using server-side OLAP providers like
                    SSAS cubes or ComponentOne Data Services.
                The <b>PivotEngine</b> can connect to either.
                </p>
            </div>);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
