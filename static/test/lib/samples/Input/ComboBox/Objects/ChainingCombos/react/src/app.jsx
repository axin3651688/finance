import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CollectionView } from '@grapecity/wijmo';
import { ComboBox } from '@grapecity/wijmo.react.input';
import { getCountries, getCities } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: new CollectionView(getCountries(), {
                currentChanged: (sender) => {
                    this.state.cities.refresh(); // apply the filte
                }
            }),
            cities: new CollectionView(getCities())
        };
        this.state.cities.filter = city => {
            return this.state.countries.currentItem.id == city.country;
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <ComboBox displayMemberPath="name" itemsSource={this.state.countries}/>
            <ComboBox displayMemberPath="name" itemsSource={this.state.cities}/>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
