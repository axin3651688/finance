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
                // specify the fields to use (no auto-generate)
                autoGenerateFields: false,
                fields: [{
                        header: 'Customer Location',
                        dimensionType: 0,
                        subFields: [{
                                binding: '[Customer].[Country]',
                                header: 'Country',
                                dataType: 1,
                                dimensionType: 6
                            },
                            {
                                binding: '[Customer].[State-Province]',
                                header: 'State-Province',
                                dataType: 1,
                                dimensionType: 6
                            }]
                    },
                    {
                        header: 'Product Information',
                        dimensionType: 0,
                        subFields: [{
                                binding: '[Product].[Product]',
                                header: 'Product',
                                dataType: 1,
                                dimensionType: 6
                            },
                            {
                                binding: '[Product].[Model Name]',
                                header: 'Model',
                                dataType: 1,
                                dimensionType: 6
                            },
                            {
                                binding: '[Product].[Style]',
                                header: 'Style',
                                dataType: 1,
                                dimensionType: 6
                            },
                            {
                                binding: '[Product].[Category]',
                                header: 'Category',
                                dataType: 1,
                                dimensionType: 6
                            },
                            {
                                binding: '[Product].[Product Line]',
                                header: 'Line',
                                dataType: 1,
                                dimensionType: 6
                            }]
                    },
                    {
                        header: 'Internet Sales',
                        dimensionType: 0,
                        subFields: [{
                                binding: '[Measures].[Internet Sales Amount]',
                                header: 'Amount',
                                dataType: 2,
                                aggregate: 1,
                                format: 'n0',
                                dimensionType: 1
                            },
                            {
                                binding: '[Measures].[Internet Order Quantity]',
                                header: 'Order Quantity',
                                dataType: 2,
                                aggregate: 1,
                                format: 'n0',
                                dimensionType: 1
                            },
                            {
                                binding: '[Measures].[Internet Extended Amount]',
                                header: 'Extended Amount',
                                dataType: 2,
                                aggregate: 1,
                                format: 'n0',
                                dimensionType: 1
                            },
                            {
                                binding: '[Measures].[Internet Freight Cost]',
                                header: 'Freight Cost',
                                dataType: 2,
                                aggregate: 1,
                                format: 'n0',
                                dimensionType: 1
                            },
                            {
                                binding: '[Measures].[Internet Total Product Cost]',
                                header: 'Total Cost',
                                dataType: 2,
                                aggregate: 1,
                                format: 'n0',
                                dimensionType: 1
                            },
                            {
                                binding: '[Measures].[Internet Gross Profit]',
                                header: 'Gross Profit',
                                dataType: 2,
                                aggregate: 1,
                                format: 'n0',
                                dimensionType: 1
                            },
                            {
                                binding: '[Measures].[Internet Gross Profit Margin]',
                                header: 'Gross Profit Margin',
                                dataType: 2,
                                aggregate: 1,
                                format: 'p2',
                                dimensionType: 1
                            }]
                    }],
                // build default view
                valueFields: ['[Measures].[Internet Sales Amount]'],
                rowFields: ['[Customer].[Country]'],
                // connect to cube
                itemsSource: {
                    url: 'https://ssrs.componentone.com/OLAP/msmdpump.dll',
                    cube: 'Adventure Works'
                }
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
