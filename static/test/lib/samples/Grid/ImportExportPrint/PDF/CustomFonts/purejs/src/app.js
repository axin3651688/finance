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
        columns: [
            { header: 'ID', binding: 'id' },
            { header: 'Country', binding: 'country' },
            { header: 'Product', binding: 'product' },
            { header: 'Active', binding: 'active' }
        ],
        itemsSource: getData(5)
    });
    //
    document.querySelector('#btnExport').addEventListener('click', () => {
        gridPdf.FlexGridPdfConverter.export(flexGrid, 'FlexGrid.pdf', {
            documentOptions: {
                header: {
                    declarative: {
                        text: '\t&[Page]\\&[Pages]'
                    }
                },
                footer: {
                    declarative: {
                        text: '\t&[Page]\\&[Pages]'
                    }
                }
            },
            embeddedFonts: [
                {
                    source: 'resources/fira/FiraSans-Regular.ttf',
                    name: 'fira',
                    style: 'normal',
                    weight: 'normal',
                    sansSerif: true
                },
                {
                    source: 'resources/fira/FiraSans-Bold.ttf',
                    name: 'fira',
                    style: 'normal',
                    weight: 'bold',
                    sansSerif: true
                }
            ],
            styles: {
                cellStyle: {
                    backgroundColor: '#ffffff',
                    borderColor: '#c6c6c6',
                    font: {
                        family: 'fira'
                    }
                },
                altCellStyle: {
                    backgroundColor: '#f9f9f9'
                },
                groupCellStyle: {
                    backgroundColor: '#dddddd'
                },
                headerCellStyle: {
                    backgroundColor: '#eaeaea'
                }
            }
        });
    });
}
