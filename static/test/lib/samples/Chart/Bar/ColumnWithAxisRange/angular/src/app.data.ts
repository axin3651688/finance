import { Injectable } from '@angular/core';
//
@Injectable()
export class DataService {
    // World Population
    // https://en.wikipedia.org/wiki/World_population
    getData() {
        return [
            { year: '1975', population: 4061 },
            { year: '1980', population: 4440 },
            { year: '1985', population: 4853 },
            { year: '1990', population: 5310 },
            { year: '1995', population: 5735 },
            { year: '2000', population: 6127 },
            { year: '2005', population: 6520 },
            { year: '2010', population: 6930 },
            { year: '2015', population: 7349 }
        ];
    }
}