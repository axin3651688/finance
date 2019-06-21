// Get random data.
import * as core from '@grapecity/wijmo';
export function getData() {
    var data = [];
    for (var i = 0; i < 1000; i++) {
        var catIndex = Math.floor(Math.random() * categories.length), subCategory = subCategories[catIndex], subIndex = Math.floor(Math.random() * subCategory.length);
        data.push({
            category: categories[catIndex],
            subCategory: subCategory[subIndex],
            sales: getSales()
        });
    }
    var cv = new core.CollectionView(data);
    cv.groupDescriptions.push(new core.PropertyGroupDescription('category'));
    cv.groupDescriptions.push(new core.PropertyGroupDescription('subCategory'));
    return cv;
}
// generate data for the sample
var categories = ['Beverages', 'Condiments', 'Confections', 'Dairy Products', 'Grains/Cereals', 'Meat/Poultry', 'Produce', 'Seafood'];
var subCategories = [
    ['Soft drinks', 'Coffees', 'Teas', 'Beers', 'Ales'],
    ['Sweet and Savory sauces', 'Relishes', 'Spreads', 'Seasonings'],
    ['Desserts', 'Candies', 'Sweet breads'],
    ['Cheeses'],
    ['Breads', 'Crackers', 'Pasta', 'Cereal'],
    ['Prepared meats'],
    ['Dried fruit', 'Bean curd'],
    ['Seaweed', 'Fish']
];
function getSales() {
    return Math.round(Math.random() * 100);
}
