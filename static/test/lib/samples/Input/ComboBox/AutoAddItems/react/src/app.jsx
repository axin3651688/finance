import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wijmo from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.react.input';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.lostFocus = (sender) => {
            let item = sender.text;
            if (item && this.state.countries.indexOf(item) < 0) {
                this.state.countries.push(item);
            }
        };
        this.state = {
            countries: new wijmo.ObservableArray(['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'])
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <h3>ComboBox</h3>
            <p>Type an item that is not on the list and move the focus to another
            control to add an item.</p>
            <wjInput.ComboBox itemsSource={this.state.countries} isEditable={true} lostFocus={this.lostFocus}>
            </wjInput.ComboBox>

            <h3>AutoComplete</h3>
            <p>Type an item that is not on the list and move the focus to another
            control to add an item.</p>
            <wjInput.AutoComplete itemsSource={this.state.countries} lostFocus={this.lostFocus}>
            </wjInput.AutoComplete>

            <h3>Options</h3>
            <p>Here is the option list (it is updated as items are added to the list):</p>
            <wjInput.ListBox itemsSource={this.state.countries}>
            </wjInput.ListBox>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
