import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wijmo from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.react.input';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        // create GroupDescription to group by initial
        let gdInitial = new wijmo.GroupDescription();
        gdInitial.groupNameFromItem = (item) => item[0];
        // get grouped CollectionView
        let data = new wijmo.CollectionView(getData(), {
            sortDescriptions: [''],
            groupDescriptions: [gdInitial],
            currentItem: null
        });
        this.state = {
            data: data,
            showGroups: true
        };
    }
    ;
    get showGroups() {
        return this.state.showGroups;
    }
    set showGroups(value) {
        if (this.state.showGroups !== value) {
            this.setState({ showGroups: value });
        }
    }
    toggleShowGroups() {
        this.showGroups = !this.showGroups;
    }
    render() {
        return <div className="container-fluid">
            <label>
                Show Groups
                <input type="checkbox" checked={this.state.showGroups} onChange={this.toggleShowGroups.bind(this)}/>
            </label>

            <div className="row">
                <div className="col-xs-6">
                    <h4>ComboBox</h4>
                    <wjInput.ComboBox showGroups={this.showGroups} itemsSource={this.state.data}>
                    </wjInput.ComboBox>
                </div>
                <div className="col-xs-6">
                    <h4>ListBox</h4>
                    <wjInput.ListBox showGroups={this.showGroups} itemsSource={this.state.data}>
                    </wjInput.ListBox>
                </div>
            </div>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
