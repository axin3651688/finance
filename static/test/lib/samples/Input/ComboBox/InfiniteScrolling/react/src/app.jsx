import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjInput from '@grapecity/wijmo.react.input';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.initialized = (combo, e) => {
            combo.dropDown.addEventListener('scroll', e => {
                // stop adding items when the list reaches 2,000 items
                if (this.state.theList.length < 2000) {
                    let list = e.target;
                    // if the user scrolled near the bottom of the list
                    if (list.scrollTop + list.clientHeight + 100 > list.scrollHeight) {
                        // save scroll top, add items, refresh list, restore scroll top
                        let top = list.scrollTop;
                        this._loadItems(this.state.theList, 5);
                        combo.collectionView.refresh();
                        list.scrollTop = top;
                    }
                }
            });
        };
        this._loadItems = (arr, cnt) => {
            for (let i = 0; i < cnt; i++) {
                arr.push('item ' + (arr.length + 1));
            }
            return arr;
        };
        this.state = {
            theList: this._loadItems([], 10)
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <wjInput.ComboBox itemsSource={this.state.theList} initialized={this.initialized}>
            </wjInput.ComboBox>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
