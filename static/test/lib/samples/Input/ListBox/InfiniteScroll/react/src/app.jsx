import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjInput from '@grapecity/wijmo.react.input';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.setupScrolling = (ctrl) => {
            // add elements when the user scrolls to the bottom of the list
            ctrl.hostElement.addEventListener('scroll', e => {
                let el = e.target;
                //
                // near the bottom?
                if (el.scrollTop + el.clientHeight > el.scrollHeight - 20) {
                    //
                    // add five elements to the list
                    let arr = ctrl.itemsSource;
                    for (let i = 0; i < 5; i++) {
                        arr.push('item ' + arr.length);
                    }
                    //
                    // refresh the list and keep the scroll top
                    let top = el.scrollTop;
                    ctrl.collectionView.refresh();
                    el.scrollTop = top;
                    //
                    // show how many items we have
                    let cnt = document.querySelector('#count');
                    cnt.textContent = `The list now has ${arr.length} items.`;
                }
            });
        };
        this.state = {
            data: getData()
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <wjInput.ListBox initialized={this.setupScrolling} itemsSource={this.state.data}>
            </wjInput.ListBox>
            <p id="count"></p>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
