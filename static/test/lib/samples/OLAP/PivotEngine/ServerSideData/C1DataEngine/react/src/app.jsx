import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as Olap from '@grapecity/wijmo.react.olap';
import * as wjcOlap from '@grapecity/wijmo.olap';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ngCube: new wjcOlap.PivotEngine({
                // connect to ComponentOne Data Service
                itemsSource: 'https://demos.componentone.com/ASPNET/c1webapi/4.0.20173.114/api/dataengine/complex10',
                // build default view
                valueFields: ['Sales', 'Downloads'],
                rowFields: ['Country', 'Product']
            })
        };
    }
    render() {
        return (<div className="container-fluid">
                <div className="row">
                    <div className="col-xs-6">
                        <p>
                            Drag and drop fields to build views:
                        </p>
                        <Olap.PivotPanel itemsSource={this.state.ngCube}></Olap.PivotPanel>
                    </div>
                    <div className="col-xs-6">
                        <p>
                            Summary for the current view definition:
                        </p>
                        <Olap.PivotGrid itemsSource={this.state.ngCube}></Olap.PivotGrid>
                    </div>
                </div>
            </div>);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
