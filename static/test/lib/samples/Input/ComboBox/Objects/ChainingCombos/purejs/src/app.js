import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as input from '@grapecity/wijmo.input';
import { getCountries, getCities } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create country and city combos
    let cmbCountry = new input.ComboBox('#cmbCountry', {
        displayMemberPath: 'name',
        itemsSource: getCountries()
    });
    let cmbCity = new input.ComboBox('#cmbCity', {
        displayMemberPath: 'name',
        itemsSource: getCities()
    });
    // filter city view based on currently selected country
    cmbCity.collectionView.filter = (city) => {
        return city.country === cmbCountry.collectionView.currentItem.id;
    };
    cmbCountry.collectionView.currentChanged.addHandler(() => {
        cmbCity.collectionView.refresh(); // apply the filter
    });
}
