import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wijmo from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import { getData, countries } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this._theItem = {};
        this._validateForm = (input) => {
            let propName = input.id, value = input.value;
            this._theItem[propName] = value;
            input.setCustomValidity(this._view.getError(this._theItem, propName));
        };
        this._view = new wijmo.CollectionView(getData(), {
            sortDescriptions: ['country'],
            getError: (item, propName) => {
                switch (propName) {
                    case 'country':
                        return countries.indexOf(item.country) < 0
                            ? 'Invalid Country'
                            : '';
                    case 'downloads':
                    case 'sales':
                    case 'expenses':
                        return item[propName] < 0 ? 'Negative values not allowed!' : '';
                    case 'active':
                        return item.active && item.country.match(/^(US|UK)$/)
                            ? 'Active items not allowed in the US or UK!'
                            : '';
                }
                return null;
            }
        });
    }
    ;
    render() {
        return <div className="container-fluid">
            <h2>FlexGrid Validation</h2>
            <p>
                The <b>FlexGrid</b> uses the<b>CollectionView.getError </b> property by default. Try entering an invalid country or a negative number to see how the grid identifies the error and prevents the invalid entry from being committed:
            </p>
            <wjGrid.FlexGrid itemsSource={this._view}>
            </wjGrid.FlexGrid>

            <h2>Forms Validation</h2>
            <p>
                You can use the the
                <b>CollectionView.getError</b> property to validate forms as well. Simply call the function
                    and apply the result to the appropriate input element using the
                <b>setCustomValidity</b> method that is part of
                    the HTML5 validation API:
            </p>
            <form id="theForm" className="form-inline" onInput={e => this._validateForm(e.target)} onSubmit={e => e.preventDefault()}>
                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input id="country" type="text" className="form-control" required defaultValue="US"/>
                </div>

                <div className="form-group">
                    <label htmlFor="downloads">Downloads</label>
                    <input id="downloads" type="number" className="form-control" required defaultValue="123"/>
                </div>

                <div className="form-group">
                    <label htmlFor="sales">Sales</label>
                    <input id="sales" type="number" className="form-control" required defaultValue="123"/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
