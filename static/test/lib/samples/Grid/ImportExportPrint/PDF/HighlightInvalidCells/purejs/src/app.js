import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as grid from '@grapecity/wijmo.grid';
import * as gridPdf from '@grapecity/wijmo.grid.pdf';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let flexGrid = new grid.FlexGrid('#flexGrid', {
        autoGenerateColumns: false,
        selectionMode: grid.SelectionMode.ListBox,
        headersVisibility: grid.HeadersVisibility.All,
        showErrors: true,
        columns: [
            { header: 'ID', binding: 'id' },
            { header: 'Country', binding: 'country' },
            { header: 'Product', binding: 'product' },
            { header: 'Amount', binding: 'amount', format: 'c' },
            { header: 'Active', binding: 'active' }
        ],
        itemsSource: getData(10)
    });
    //
    document.querySelector('#cbShowErrors').addEventListener('change', (e) => {
        flexGrid.showErrors = e.target.checked;
    });
    //
    document.querySelector('#btnExport').addEventListener('click', () => {
        gridPdf.FlexGridPdfConverter.export(flexGrid, 'FlexGrid.pdf', {
            styles: {
                cellStyle: {
                    backgroundColor: '#ffffff',
                    borderColor: '#c6c6c6'
                },
                altCellStyle: {
                    backgroundColor: '#f9f9f9'
                },
                groupCellStyle: {
                    backgroundColor: '#dddddd'
                },
                headerCellStyle: {
                    backgroundColor: '#eaeaea'
                },
                errorCellStyle: {
                    backgroundColor: 'rgba(255, 0, 0, 0.3)'
                }
            }
        });
    });
}
