import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjGauge from '@grapecity/wijmo.react.gauge';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = [
            { heading: 'Revenue', sub: 'US$, thousands', max: 400, actual: 345, target: 340, bad: 210, good: 300 },
            { heading: 'Profit', sub: '%', max: 50, actual: 37, target: 32, bad: 20, good: 30 },
            { heading: 'Order Size', sub: 'US$, average', max: 600, actual: 320, target: 520, bad: 400, good: 500 },
            { heading: 'New Customers', sub: 'count', max: 1500, actual: 1100, target: 1000, bad: 600, good: 900 },
            { heading: 'Satisfaction', sub: '0 to 5', max: 5, actual: 4, target: 4.5, bad: 2.5, good: 4.5 },
        ];
    }
    renderSpan(item) {
        if (item.actual < item.target) {
            return <span className="glyphicon glyphicon-thumbs-down warning"></span>;
        }
        return;
    }
    renderTableTr(item) {
        return (<tr key={item.heading}>
                <td>
                    <div className="heading">{item.heading}</div>
                    <div className="sub">{item.sub}</div>
                </td>
                <td>
                    {this.renderSpan(item)}
                </td>
                <td>
                    <wjGauge.BulletGraph value={item.actual} target={item.target} max={item.max} bad={item.bad} good={item.good}></wjGauge.BulletGraph>
                </td>
                <td>
                    <div className="max">{item.max}</div>
                </td>
            </tr>);
    }
    renderTable() {
        let table = [];
        this.state.forEach(item => {
            table.push(this.renderTableTr(item));
        });
        return table;
    }
    render() {
        return (<div className="container-fluid">
                <div id="dashboard">
                    <table>
                        {this.renderTable()}
                    </table>
                </div>
            </div>);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
