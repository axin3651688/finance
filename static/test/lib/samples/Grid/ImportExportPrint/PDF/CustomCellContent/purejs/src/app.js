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
    var exportSettings = {
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
        }
    };
    //
    let flexGrid = new grid.FlexGrid('#flexGrid', {
        autoGenerateColumns: false,
        headersVisibility: grid.HeadersVisibility.All,
        selectionMode: grid.SelectionMode.ListBox,
        columns: [
            { header: 'ID', binding: 'id' },
            { header: 'Country', binding: 'country', width: "*", isReadOnly: true },
            { header: 'Product', binding: 'product' },
            { header: 'Color', binding: 'color' }
        ],
        formatItem: (sender, e) => {
            if (e.panel === sender.cells && sender.columns[e.col].binding === 'country') {
                let data = e.panel.rows[e.row].dataItem;
                //
                e.cell.textContent = '';
                //
                // add flag image
                let image = document.createElement('img');
                image.src = `resources/${data['country']}.png`;
                e.cell.appendChild(image);
                //
                // add non-breaking space
                e.cell.appendChild(document.createTextNode('\u00A0'));
                //
                // add text
                e.cell.appendChild(document.createTextNode(`${data['country']}-${data['capital']}`));
            }
        },
        itemsSource: getData(5)
    });
    //
    //
    document.querySelector('#btnExport1').addEventListener('click', () => {
        exportSettings.customCellContent = false;
        gridPdf.FlexGridPdfConverter.export(flexGrid, 'FlexGrid.pdf', exportSettings);
    });
    //
    document.querySelector('#btnExport2').addEventListener('click', () => {
        exportSettings.customCellContent = true;
        gridPdf.FlexGridPdfConverter.export(flexGrid, 'FlexGrid.pdf', exportSettings);
    });
    //
    document.querySelector('#btnExport3').addEventListener('click', () => {
        exportSettings.customCellContent = false;
        exportSettings.formatItem = formatCountryCell;
        gridPdf.FlexGridPdfConverter.export(flexGrid, 'FlexGrid.pdf', exportSettings);
        exportSettings.formatItem = null;
    });
    //
    function formatCountryCell(args) {
        // if this is a regular grid cell...
        if (args.panel.cellType === grid.CellType.Cell) {
            // ... that belongs to the 'country' column
            if (args.panel.columns[args.col].binding === 'country') {
                let 
                // get cell with custom content produced by a cell template or grid.formatItem handler
                cell = args.getFormattedCell(), 
                // bound rectangle of cell's content area
                contentRect = args.contentRect, 
                // construct flag image url based on country name passed in args.data 
                image = args.canvas.openImage(`resources/${args.data}.png`), imageTop = contentRect.top + (contentRect.height - image.height) / 2;
                // draw flag image
                args.canvas.drawImage(image, contentRect.left, imageTop);
                // Draw custom cell text retrieved using the cell.textContent property,
                // right to the image and in the args.textTop vertical position. The latter
                // works because we draw text using default cell font.
                args.canvas.drawText(cell.textContent.trim(), contentRect.left + image.width + 3, args.textTop);
                // cancel standard cell content drawing
                args.cancel = true;
            }
        }
    }
}
