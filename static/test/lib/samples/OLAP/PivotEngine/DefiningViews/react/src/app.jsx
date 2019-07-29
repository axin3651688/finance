import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as Olap from '@grapecity/wijmo.react.olap';
import * as wjcOlap from '@grapecity/wijmo.olap';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ng: new wjcOlap.PivotEngine({
                autoGenerateFields: false,
                fields: [
                    { binding: 'date', header: 'Date', format: 'yyyy' },
                    { binding: 'date', header: 'Quarter', format: '"Q"q' },
                    { binding: 'buyer', header: 'Person' },
                    { binding: 'type', header: 'Category' },
                    { binding: 'amount', header: 'Amount', format: 'c0', aggregate: 'Sum' }
                ],
                itemsSource: getData(10000),
                showRowTotals: 'Subtotals',
                valueFields: ['Amount'],
                rowFields: ['Person']
            })
        };
    }
    onSaveClick() {
        localStorage.viewDefinition = this.state.ng.viewDefinition;
    }
    onLoadClick() {
        if (localStorage.viewDefinition) {
            this.state.ng.viewDefinition = localStorage.viewDefinition;
        }
    }
    onButtonClick(e) {
        var ng = this.state.ng;
        switch (e.target.id) {
            case 'who':
                ng.rowFields.clear();
                ng.rowFields.push('Person');
                break;
            case 'what':
                ng.rowFields.clear();
                ng.rowFields.push('Category');
                break;
            case 'who-what':
                ng.rowFields.clear();
                ng.rowFields.push('Person', 'Category');
                break;
            case 'when':
                ng.rowFields.clear();
                ng.rowFields.push('Date');
                ng.rowFields.push('Quarter');
                break;
        }
    }
    render() {
        return (<div className="container-fluid">
                <div id="buttons" className="buttons" onClick={this.onButtonClick.bind(this)}>
                    <button id="who" className="btn">
                        How much was spent by each person?
                </button>
                    <button id="what" className="btn">
                        How much was spent on each expense type?
                </button>
                    <button id="who-what" className="btn">
                        What did each person spend money on?
                </button>
                    <button id="when" className="btn">
                        When were these expenses made?
                </button>
                </div>

                <p>
                    Use these buttons to save and load views:
            </p>
                <div className="buttons">
                    <button id="save" className="btn btn-primary" onClick={this.onSaveClick.bind(this)}>
                        Save View
                </button>
                    <button id="load" className="btn btn-primary" onClick={this.onLoadClick.bind(this)}>
                        Load View
                </button>
                </div>

                <div className="row">
                    <div className="col-xs-6">
                        <p>
                            Use the <b>PivotPanel</b> control to edit the view:
                    </p>
                        <Olap.PivotPanel itemsSource={this.state.ng}></Olap.PivotPanel>
                    </div>
                    <div className="col-xs-6">
                        <p>
                            Use the <b>PivotGrid</b> control to see the results:
                    </p>
                        <Olap.PivotGrid itemsSource={this.state.ng}></Olap.PivotGrid>
                    </div>
                </div>
            </div>);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
