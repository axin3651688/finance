import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Globalize } from '@grapecity/wijmo';
import { ComboBox } from '@grapecity/wijmo.react.input';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.numbers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71];
        this.dates = [new Date(2019, 0, 1), new Date(2019, 1, 12), new Date(2019, 1, 22), new Date(2019, 4, 13), new Date(2019, 4, 24), new Date(2019, 8, 19)];
        this.state = {
            number: this.numbers[0],
            date: this.dates[0]
        };
    }
    render() {
        return <div className="container-fluid">
            <p>
                You can use ComboBoxes to select from lists of numbers:
            </p>
            <div className="form-group">
                <label>
                    Select a number:
                    <ComboBox itemsSource={this.numbers} selectedIndexChanged={sender => {
            this.setState({ number: sender.selectedItem });
        }}>
                    </ComboBox>
                </label>
            </div>
            <p>
                You have selected this number: <b>{this.state.number}</b>.
            </p>

            <hr />

            <p>
                You can use ComboBoxes to select from lists of dates.
                In this case, we use the <b>formatItem</b> event to format the date objects
                using Wijmo's <b>Globalize</b> class:
            </p>
            <div className="form-group">
                <label>
                    Select a date:
                    <ComboBox itemsSource={this.dates} formatItem={(sender, e) => {
            e.item.textContent = Globalize.format(e.data, 'd');
        }} selectedIndexChanged={sender => {
            this.setState({ date: sender.selectedItem });
        }}>
                    </ComboBox>
                </label>
            </div>
            <p>
                You have selected this date: <b>{Globalize.format(this.state.date, 'd')}</b>.
            </p>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
