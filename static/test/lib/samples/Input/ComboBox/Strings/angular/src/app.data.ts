import { Injectable } from '@angular/core';
//
@Injectable()
export class DataService {
    getCountries() {
        return ['Austria', 'Australia', 'Belgium', 'Brazil', 'Canada',
            'Chile', 'Denmark', 'Estonia', 'France', 'Germany',
            'Hungary', 'Italy', 'Israel', 'Japan', 'Korea',
            'Mexico', 'Norway', 'Oman', 'Poland', 'Qatar',
            'Russia', 'Sweden', 'Scotland', 'Turkey', 'United Kingdom',
            'United States', 'Vietnam', 'Yemen', 'Zambia'];
    }
}