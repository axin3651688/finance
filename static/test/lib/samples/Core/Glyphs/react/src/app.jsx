import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            glyphs: [
                "asterisk",
                "calendar",
                "check",
                "circle",
                "clock",
                "diamond",
                "down",
                "down-left",
                "down-right",
                "file",
                "filter",
                "left",
                "minus",
                "pencil",
                "plus",
                "right",
                "square",
                "step-backward",
                "step-forward",
                "up",
                "up-left",
                "up-right"
            ]
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <table className="table table-condensed">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Glyph</th>
                        <th>Markup</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.glyphs.map(function (glyph, index) {
            return <tr>
                                <td>
                                    {glyph}
                                </td>
                                <td style={{ fontSize: "125%" }}>
                                    <span className={'wj-glyph-' + glyph}></span>
                                </td>
                                <td>
                                    <code>&lt;span class="wj-glyph-{glyph}"&gt;&lt;/span&gt;</code>
                                </td>
                            </tr>;
        })}
                </tbody>
            </table>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
