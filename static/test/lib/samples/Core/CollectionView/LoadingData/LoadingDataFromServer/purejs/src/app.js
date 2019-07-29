import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as wijmo from '@grapecity/wijmo';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create an empty CollectionView
    let view = new wijmo.CollectionView();
    view.collectionChanged.addHandler(() => {
        // show the view's data
        let list = document.querySelector('#list');
        list.innerHTML = '';
        view.items.forEach(item => {
            let html = wijmo.format('<li>{CategoryID} <b>{CategoryName}</b> {Description}</li>', item);
            list.appendChild(wijmo.createElement(html));
        });
    });
    //
    // populate it with data from a server
    wijmo.httpRequest('https://services.odata.org/Northwind/Northwind.svc/Categories', {
        data: {
            $format: 'json',
            $select: 'CategoryID,CategoryName,Description'
        },
        success: (xhr) => {
            // got the data, assign it to the CollectionView
            let response = JSON.parse(xhr.response);
            let data = response.d ? response.d.results : response.value;
            //
            // use the result as the sourceCollection
            view.sourceCollection = data;
        }
    });
}
