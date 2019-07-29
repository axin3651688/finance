import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wijmo from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import * as wjInput from '@grapecity/wijmo.react.input';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.showPicker = (e) => {
            wijmo.showPopup(this.state.listbox.hostElement, e.target, false, true, false);
            this.state.listbox.focus();
            e.preventDefault();
        };
        this.hidePicker = () => {
            wijmo.hidePopup(this.state.listbox.hostElement);
        };
        this.initializedFlexGrid = (grid) => {
            this.setState({ grid: grid, columns: grid.columns });
        };
        this.saveLayout = () => {
            localStorage.setItem("myLayout", this.state.grid.columnLayout);
        };
        this.restoreLayout = () => {
            let layout = localStorage.getItem("myLayout");
            if (layout) {
                this.state.grid.columnLayout = layout;
            }
        };
        this.initializedListBox = (listbox) => {
            this.setState({ listbox: listbox });
        };
        this.formatItem = (sender, e) => {
            var self = this;
            if (e.panel == sender.topLeftCells) {
                var span = document.createElement("span");
                span.className = "column-picker-icon glyphicon glyphicon-cog";
                span.addEventListener('mousedown', function (e) {
                    self.showPicker(e);
                });
                e.cell.appendChild(span);
            }
        };
        this.state = {
            data: getData(),
            columns: [],
            grid: {},
            listbox: {}
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <wjGrid.FlexGrid ref="theGrid" initialized={this.initializedFlexGrid} formatItem={this.formatItem} itemsSource={this.state.data}>
            </wjGrid.FlexGrid>
            <div style={{ display: "none" }}>
                <wjInput.ListBox ref="picker" className="column-picker" itemsSource={this.state.columns} checkedMemberPath="visible" displayMemberPath="header" lostFocus={this.hidePicker} initialized={this.initializedListBox}></wjInput.ListBox>
            </div>
            <button className="btn btn-default" onClick={this.saveLayout}>Save Layout</button>
            <button className="btn btn-default" onClick={this.restoreLayout}>Restore Layout</button>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
