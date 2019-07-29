import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjGrid from '@grapecity/wijmo.react.grid';
import * as wijmo from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.react.input';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.initPopup = (popup) => {
            this.setState({ thePopup: popup });
        };
        this.initGrid = (grid) => {
            grid.hostElement.addEventListener('keydown', e => {
                let view = grid.collectionView;
                // looking for ctrl+Delete
                if (e.ctrlKey && e.keyCode == wijmo.Key.Delete && view.currentItem) {
                    // prevent the grid from getting the key
                    e.preventDefault();
                    // confirm row deletion
                    this.state.thePopup.show(true, (sender) => {
                        // delete the row
                        if (sender.dialogResult == 'wj-hide-ok') {
                            view.remove(view.currentItem);
                        }
                        // return focus to the grid
                        grid.focus();
                    });
                }
            }, true);
        };
        this.state = {
            data: getData(),
            thePopup: {},
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <wjGrid.FlexGrid allowAddNew={true} itemsSource={this.state.data} initialized={this.initGrid}>
            </wjGrid.FlexGrid>
            <wjInput.Popup initialized={this.initPopup}>
                <div className="wj-dialog-header">
                    Deleting Row
                </div>
                <div className="wj-dialog-body">
                    Do you really want to delete this row?
                </div>
                <div className="wj-dialog-footer">
                    <button className="btn btn-primary wj-hide-ok">Yes</button>
                    <button className="btn btn-default wj-hide">No</button>
                </div>
            </wjInput.Popup>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
