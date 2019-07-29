import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // AutoComplete with async search using OData source
    let theAutoComplete = new input.AutoComplete('#theAutoComplete', {
        placeholder: 'Product Name',
        displayMemberPath: 'ProductName',
        itemsSourceFunction: (query, max, callback) => {
            if (!query) {
                callback(null);
                return;
            }
            //
            wijmo.httpRequest('https://services.odata.org/Northwind/Northwind.svc/Products', {
                data: {
                    $format: 'json',
                    $select: 'ProductID,ProductName',
                    $filter: 'indexof(ProductName, \'' + query + '\') gt -1'
                },
                success: (xhr) => {
                    let response = JSON.parse(xhr.response);
                    callback(response.d ? response.d.results : response.value);
                }
            });
        },
        selectedIndexChanged: function () {
            let product = theAutoComplete.selectedItem;
            document.querySelector('#msg').textContent = product
                ? wijmo.format('{ProductName} (ID: {ProductID})', product)
                : 'None';
        }
    });
}
