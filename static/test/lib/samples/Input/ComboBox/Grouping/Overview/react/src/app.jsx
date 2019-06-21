import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wijmo from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.react.input';
import { getData, getCountryCode } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.formatGroupHeader = (sender, e) => {
            if (this.state.formatGroupHeaders && e.index < 0 && e.data instanceof wijmo.CollectionViewGroup) {
                let group = e.data, code = getCountryCode(group.name);
                //
                if (code) {
                    e.item.innerHTML = `<span class="flag-icon flag-icon-${code}"></span> ${group.name}`;
                }
            }
        };
        this.updateFormatGroupHeaderStatus = (e) => {
            this.setState({ formatGroupHeaders: e.target.checked }, () => {
                this.state.data.refresh();
            });
        };
        this.updateShowGroupsStatus = (e) => {
            this.setState({ showGroups: e.target.checked });
        };
        this.updateShowCheckboxesStatus = (e) => {
            this.setState({ showCheckBoxes: e.target.checked });
        };
        this.state = {
            data: getData(),
            formatGroupHeaders: true,
            showGroups: true,
            showCheckBoxes: false
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <label>
                Show Groups
                <input id="showGroups" type="checkbox" onChange={this.updateShowGroupsStatus.bind(this)} defaultChecked={this.state.showGroups}/>
            </label>
            <label>
                Format Group Headers
                <input id="formatItem" type="checkbox" onChange={this.updateFormatGroupHeaderStatus.bind(this)} defaultChecked={this.state.formatGroupHeaders}/>
            </label>
            <label>
                Show Checkboxes
                <input id="checkBoxes" type="checkbox" onChange={this.updateShowCheckboxesStatus.bind(this)} defaultChecked={this.state.showCheckBoxes}/>
            </label>

            <div className="row">
                <div className="col-xs-6">
                    <h4>ComboBox</h4>
                    <wjInput.ComboBox showGroups={this.state.showGroups} formatItem={this.formatGroupHeader} displayMemberPath="city" itemsSource={this.state.data}>
                    </wjInput.ComboBox>
                </div>
                <div className="col-xs-6">
                    <h4>ListBox</h4>
                    <wjInput.ListBox showGroups={this.state.showGroups} formatItem={this.formatGroupHeader} displayMemberPath="city" checkedMemberPath={this.state.showCheckBoxes ? 'checked' : ''} itemsSource={this.state.data}>
                    </wjInput.ListBox>
                </div>
            </div>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
