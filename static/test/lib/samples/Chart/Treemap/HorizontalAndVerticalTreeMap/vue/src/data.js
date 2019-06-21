// Get random data.
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
export function getData() {
    var data = [];
    categories.forEach(function (category, index) {
        subCategories[index].forEach(function (subCategory) {
            data.push({
                category: category,
                subCategory: subCategory,
                sales: getSales()
            });
        });
    });
    return data;
}
