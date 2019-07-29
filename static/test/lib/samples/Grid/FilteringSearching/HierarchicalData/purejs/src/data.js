// some hierarchical data
export function getData() {
    return [
        { name: 'Washington', type: 'state', population: 6971, cities: [
                { name: 'Seattle', type: 'city', population: 652 },
                { name: 'Spokane', type: 'city', population: 210 }
            ]
        },
        { name: 'Oregon', type: 'state', population: 3930, cities: [
                { name: 'Portland', type: 'city', population: 609 },
                { name: 'Eugene', type: 'city', population: 159 }
            ]
        },
        { name: 'California', type: 'state', population: 38330, cities: [
                { name: 'Los Angeles', type: 'city', population: 3884 },
                { name: 'San Diego', type: 'city', population: 1356 },
                { name: 'San Francisco', type: 'city', population: 837 }
            ]
        }
    ];
}
