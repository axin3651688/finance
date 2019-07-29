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
            { header: 'Country', binding: 'country', isReadOnly: true },
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
                e.cell.appendChild(document.createTextNode(`${data['country']}`));
            }
        },
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
            customCellContent: true,
            formatItem: (args) => {
                if (args.panel.cellType === grid.CellType.Cell) {
                    if (args.panel.columns[args.col].binding === 'country') {
                        let r = args.contentRect, sz = args.canvas.measureText(args.data, args.style.font, {
                            height: r.height,
                            width: r.width
                        }), image = args.canvas.openImage(`resources/${args.data}.png`), imageTop = r.top + (r.height - image.height) / 2, textTop = r.top + (r.height - sz.size.height) / 2;
                        //
                        // draw flag image
                        args.canvas.drawImage(image, r.left, imageTop);
                        //
                        // draw text
                        args.canvas.drawText(args.data, r.left + image.width + 3, textTop, {
                            brush: args.style.color,
                            font: args.style.font,
                            height: r.height,
                            width: r.width
                        });
                        //
                        // cancel standard cell content drawing
                        args.cancel = true;
                    }
                }
            }
        });
    });
}
