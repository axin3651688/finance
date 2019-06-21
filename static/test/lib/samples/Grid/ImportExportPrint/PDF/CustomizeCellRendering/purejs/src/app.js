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
            { header: 'Color', binding: 'color', isReadOnly: true }
        ],
        itemsSource: getData(5)
    });
    //
    document.querySelector('#btnExport').addEventListener('click', () => {
        gridPdf.FlexGridPdfConverter.export(flexGrid, 'FlexGrid.pdf', {
            maxPages: 10,
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
                }
            },
            formatItem: (args) => {
                if (args.panel.cellType === grid.CellType.RowHeader) {
                    args.data = (args.row + 1).toString();
                }
                else {
                    if (args.panel.cellType === grid.CellType.Cell && args.panel.columns[args.col].binding === 'color') {
                        args.style.backgroundColor = args.data;
                    }
                }
            }
        });
    });
}
