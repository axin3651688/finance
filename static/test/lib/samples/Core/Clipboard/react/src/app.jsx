import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wijmo from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.copying = (sender, args) => {
            this.setState({ hasHeaders: false });
            if (this.state.includeHeaders) {
                let text = sender.getClipString(), sel = sender.selection, hdr = '';
                //
                for (let c = sel.leftCol; c <= sel.rightCol; c++) {
                    if (hdr)
                        hdr += '\t';
                    hdr += sender.columns[c].header;
                }
                text = hdr + '\r\n' + text;
                //
                // put text with headers on the clipboard
                wijmo.Clipboard.copy(text);
                this.setState({ hasHeaders: true });
                //
                // prevent the grid from overwriting our clipboard content
                args.cancel = true;
            }
        };
        this.pasting = (sender, args) => {
            if (this.state.hasHeaders) {
                args.cancel = true;
            }
        };
        this.updateIncludeHeadersStatus = (target) => {
            this.setState({ includeHeaders: target.checked });
        };
        this.state = {
            data: getData(),
            includeHeaders: true,
            hasHeaders: false
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <div className="form-check">
                <label htmlFor="includeHeaders" className="form-check-label">Include Headers</label>
                <input id="includeHeaders" type="checkbox" className="form-check-input" defaultChecked={true} onChange={e => this.updateIncludeHeadersStatus(e.target)}/>
            </div>

            <wjGrid.FlexGrid itemsSource={this.state.data} copying={this.copying} pasting={this.pasting}>
            </wjGrid.FlexGrid>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
