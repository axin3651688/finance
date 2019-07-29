import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjInput from '@grapecity/wijmo.react.input';
class App extends React.Component {
    constructor(props) {
        super(props);
        let curr = new Date();
        this.state = {
            firstDay: new Date(curr.setDate(curr.getDate() - curr.getDay())),
            lastDay: new Date(curr.setDate(curr.getDate() - curr.getDay() + 6))
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <wjInput.Calendar showHeader={false} min={this.state.firstDay} max={this.state.lastDay}>
            </wjInput.Calendar>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
