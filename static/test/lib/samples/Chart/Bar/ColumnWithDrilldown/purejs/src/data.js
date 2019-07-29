// IMF estimates GDP(nominal) between 2020 and 2023
// https://en.wikipedia.org/wiki/List_of_countries_by_past_and_projected_GDP_(nominal)
import * as core from '@grapecity/wijmo';
export function getData() {
    let data = [
        { country: 'United States', continent: 'North America', year: 2020, gdp: 22289 },
        { country: 'United States', continent: 'North America', year: 2021, gdp: 23096 },
        { country: 'United States', continent: 'North America', year: 2022, gdp: 23874 },
        { country: 'United States', continent: 'North America', year: 2023, gdp: 24670 },
        { country: 'China', continent: 'Asia', year: 2020, gdp: 15461 },
        { country: 'China', continent: 'Asia', year: 2021, gdp: 16768 },
        { country: 'China', continent: 'Asia', year: 2022, gdp: 18131 },
        { country: 'China', continent: 'Asia', year: 2023, gdp: 19580 },
        { country: 'Japan', continent: 'Asia', year: 2020, gdp: 5371 },
        { country: 'Japan', continent: 'Asia', year: 2021, gdp: 5522 },
        { country: 'Japan', continent: 'Asia', year: 2022, gdp: 5714 },
        { country: 'Japan', continent: 'Asia', year: 2023, gdp: 5907 },
        { country: 'Gemany', continent: 'Europe', year: 2020, gdp: 4331 },
        { country: 'Gemany', continent: 'Europe', year: 2021, gdp: 4523 },
        { country: 'Gemany', continent: 'Europe', year: 2022, gdp: 4736 },
        { country: 'Gemany', continent: 'Europe', year: 2023, gdp: 4937 },
        { country: 'India', continent: 'Asia', year: 2020, gdp: 3258 },
        { country: 'India', continent: 'Asia', year: 2021, gdp: 3586 },
        { country: 'India', continent: 'Asia', year: 2022, gdp: 3941 },
        { country: 'India', continent: 'Asia', year: 2023, gdp: 4329 },
        { country: 'France', continent: 'Europe', year: 2020, gdp: 2979 },
        { country: 'France', continent: 'Europe', year: 2021, gdp: 3100 },
        { country: 'France', continent: 'Europe', year: 2022, gdp: 3234 },
        { country: 'France', continent: 'Europe', year: 2023, gdp: 3363 },
        { country: 'United Kindom', continent: 'Europe', year: 2020, gdp: 2912 },
        { country: 'United Kindom', continent: 'Europe', year: 2021, gdp: 3012 },
        { country: 'United Kindom', continent: 'Europe', year: 2022, gdp: 3135 },
        { country: 'United Kindom', continent: 'Europe', year: 2023, gdp: 3257 },
        { country: 'Italy', continent: 'Europe', year: 2020, gdp: 2191 },
        { country: 'Italy', continent: 'Europe', year: 2021, gdp: 2255 },
        { country: 'Italy', continent: 'Europe', year: 2022, gdp: 2329 },
        { country: 'Italy', continent: 'Europe', year: 2023, gdp: 2395 },
        { country: 'Brazil', continent: 'South America', year: 2020, gdp: 2027 },
        { country: 'Brazil', continent: 'South America', year: 2021, gdp: 2129 },
        { country: 'Brazil', continent: 'South America', year: 2022, gdp: 2237 },
        { country: 'Brazil', continent: 'South America', year: 2023, gdp: 2351 },
        { country: 'Canada', continent: 'North America', year: 2020, gdp: 1937 },
        { country: 'Canada', continent: 'North America', year: 2021, gdp: 2053 },
        { country: 'Canada', continent: 'North America', year: 2022, gdp: 2185 },
        { country: 'Canada', continent: 'North America', year: 2023, gdp: 2321 },
        { country: 'South Korea', continent: 'Asia', year: 2020, gdp: 1781 },
        { country: 'South Korea', continent: 'Asia', year: 2021, gdp: 1864 },
        { country: 'South Korea', continent: 'Asia', year: 2022, gdp: 1959 },
        { country: 'South Korea', continent: 'Asia', year: 2023, gdp: 2054 },
        { country: 'Russia', continent: 'Europe', year: 2020, gdp: 1683 },
        { country: 'Russia', continent: 'Europe', year: 2021, gdp: 1719 },
        { country: 'Russia', continent: 'Europe', year: 2022, gdp: 1757 },
        { country: 'Russia', continent: 'Europe', year: 2023, gdp: 1818 },
        { country: 'Spain', continent: 'Europe', year: 2020, gdp: 1550 },
        { country: 'Spain', continent: 'Europe', year: 2021, gdp: 1616 },
        { country: 'Spain', continent: 'Europe', year: 2022, gdp: 1690 },
        { country: 'Spain', continent: 'Europe', year: 2023, gdp: 1758 },
        { country: 'Australia', continent: 'Oceania', year: 2020, gdp: 1541 },
        { country: 'Australia', continent: 'Oceania', year: 2021, gdp: 1615 },
        { country: 'Australia', continent: 'Oceania', year: 2022, gdp: 1700 },
        { country: 'Australia', continent: 'Oceania', year: 2023, gdp: 1794 },
        { country: 'Mexico', continent: 'North America', year: 2020, gdp: 1306 },
        { country: 'Mexico', continent: 'North America', year: 2021, gdp: 1376 },
        { country: 'Mexico', continent: 'North America', year: 2022, gdp: 1449 },
        { country: 'Mexico', continent: 'North America', year: 2023, gdp: 1526 },
        { country: 'Indonesia', continent: 'Asia', year: 2020, gdp: 1175 },
        { country: 'Indonesia', continent: 'Asia', year: 2021, gdp: 1259 },
        { country: 'Indonesia', continent: 'Asia', year: 2022, gdp: 1349 },
        { country: 'Indonesia', continent: 'Asia', year: 2023, gdp: 1446 },
        { country: 'Netherlands', continent: 'Europe', year: 2020, gdp: 980 },
        { country: 'Netherlands', continent: 'Europe', year: 2021, gdp: 1021 },
        { country: 'Netherlands', continent: 'Europe', year: 2022, gdp: 1065 },
        { country: 'Netherlands', continent: 'Europe', year: 2023, gdp: 1106 },
        { country: 'Saudi Arabia', continent: 'Asia', year: 2020, gdp: 815 },
        { country: 'Saudi Arabia', continent: 'Asia', year: 2021, gdp: 835 },
        { country: 'Saudi Arabia', continent: 'Asia', year: 2022, gdp: 860 },
        { country: 'Saudi Arabia', continent: 'Asia', year: 2023, gdp: 889 },
        { country: 'Nigeria', continent: 'Africa', year: 2020, gdp: 504 },
        { country: 'Nigeria', continent: 'Africa', year: 2021, gdp: 572 },
        { country: 'Nigeria', continent: 'Africa', year: 2022, gdp: 649 },
        { country: 'Nigeria', continent: 'Africa', year: 2023, gdp: 736 },
        { country: 'Argentina', continent: 'South America', year: 2020, gdp: 444 },
        { country: 'Argentina', continent: 'South America', year: 2021, gdp: 476 },
        { country: 'Argentina', continent: 'South America', year: 2022, gdp: 508 },
        { country: 'Argentina', continent: 'South America', year: 2023, gdp: 540 },
        { country: 'South Africa', continent: 'South America', year: 2020, gdp: 403 },
        { country: 'South Africa', continent: 'South America', year: 2021, gdp: 419 },
        { country: 'South Africa', continent: 'South America', year: 2022, gdp: 438 },
        { country: 'South Africa', continent: 'South America', year: 2023, gdp: 456 },
        { country: 'Colombia', continent: 'South America', year: 2020, gdp: 367 },
        { country: 'Colombia', continent: 'South America', year: 2021, gdp: 382 },
        { country: 'Colombia', continent: 'South America', year: 2022, gdp: 400 },
        { country: 'Colombia', continent: 'South America', year: 2023, gdp: 422 },
        { country: 'Chile', continent: 'South America', year: 2020, gdp: 352 },
        { country: 'Chile', continent: 'South America', year: 2021, gdp: 378 },
        { country: 'Chile', continent: 'South America', year: 2022, gdp: 404 },
        { country: 'Chile', continent: 'South America', year: 2023, gdp: 433 },
        { country: 'Egypt', continent: 'Africa', year: 2020, gdp: 339 },
        { country: 'Egypt', continent: 'Africa', year: 2021, gdp: 359 },
        { country: 'Egypt', continent: 'Africa', year: 2022, gdp: 380 },
        { country: 'Egypt', continent: 'Africa', year: 2023, gdp: 414 },
        { country: 'Peru', continent: 'South America', year: 2020, gdp: 252 },
        { country: 'Peru', continent: 'South America', year: 2021, gdp: 266 },
        { country: 'Peru', continent: 'South America', year: 2022, gdp: 281 },
        { country: 'Peru', continent: 'South America', year: 2023, gdp: 297 },
        { country: 'New Zealand', continent: 'Oceania', year: 2020, gdp: 227 },
        { country: 'New Zealand', continent: 'Oceania', year: 2021, gdp: 242 },
        { country: 'New Zealand', continent: 'Oceania', year: 2022, gdp: 257 },
        { country: 'New Zealand', continent: 'Oceania', year: 2023, gdp: 272 },
        { country: 'Algeria', continent: 'Africa', year: 2020, gdp: 207 },
        { country: 'Algeria', continent: 'Africa', year: 2021, gdp: 212 },
        { country: 'Algeria', continent: 'Africa', year: 2022, gdp: 218 },
        { country: 'Algeria', continent: 'Africa', year: 2023, gdp: 228 }
    ];
    //
    return new core.CollectionView(data, {
        groupDescriptions: ['year', 'continent', 'country']
    });
}
//
// get the group data for a selected point
export function getGroupData(group) {
    // get items for this group, aggregate by sales
    let arr = [];
    //
    group.groups.forEach(g => {
        arr.push({
            name: g.name,
            gdp: g.getAggregate(core.Aggregate.Sum, 'gdp'),
            group: g
        });
    });
    //
    // return a new collection view sorted by sales
    return new core.CollectionView(arr, {
        sortDescriptions: [
            new core.SortDescription('gdp', false)
        ]
    });
}
