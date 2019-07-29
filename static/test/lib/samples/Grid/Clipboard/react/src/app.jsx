import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import * as wjcCore from '@grapecity/wijmo';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData()
        };
    }
    render() {
        return <div className="container-fluid">
            <wjGrid.FlexGrid alternatingRowStep={0} itemsSource={this.state.data}>
            </wjGrid.FlexGrid>
            <h2>Custom Behaviors</h2>
            <wjGrid.FlexGrid alternatingRowStep={0} initialized={this.initializeCustomGrid.bind(this)} itemsSource={this.state.data}>
            </wjGrid.FlexGrid>
        </div>;
    }
    initializeCustomGrid(flex) {
        flex.copying.addHandler((s, e) => {
            // // add headers to clip string
            let text = s.getClipString(), sel = s.selection, hdr = "";
            for (let c = sel.leftCol; c <= sel.rightCol; c++) {
                if (hdr) {
                    hdr += "\t";
                }
                hdr += s.columns[c].header;
            }
            text = hdr + "\r\n" + text;
            // put text with headers on the clipboard
            wjcCore.Clipboard.copy(text);
            // prevent the grid from overwriting our clipboard content
            e.cancel = true;
        });
        flex.pasting.addHandler((s, e) => {
            e.cancel = true; // prevent pasting data with headers
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
