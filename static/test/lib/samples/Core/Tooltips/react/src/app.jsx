import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wijmo from '@grapecity/wijmo';
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    ;
    componentDidMount() {
        let tt = new wijmo.Tooltip();
        tt.setTooltip("#span1", "This is the <b>first</b> span.");
        tt.setTooltip("#span2", "#spanTooltip");
        tt.setTooltip("#btnAddNew", "Click to add 1,000 items using the <b>addNew</b> method.");
    }
    render() {
        return <div className="container-fluid">
            <p>
                This paragraph has a
                <b id='span1'>span with a tooltip</b>.
            </p>
            <p>
                This paragraph has a
                <b id='span2'>span with a tooltip</b>
                whose content is taken from another element.
            </p>
            <p>The button below also have tooltip:</p>
            <button id='btnAddNew' className="btn btn-default">addNew</button>

            <div id="spanTooltip" style={{ display: "none" }}>
                <div className="panel panel-info">
                    <div className="panel-heading">Title</div>
                    <div className="panel-body">This is the second span.</div>
                </div>
            </div>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
