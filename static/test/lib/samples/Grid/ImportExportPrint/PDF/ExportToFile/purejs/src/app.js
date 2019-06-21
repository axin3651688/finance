import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wijmo from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';
import * as grid from '@grapecity/wijmo.grid';
import * as pdf from '@grapecity/wijmo.pdf';
import * as gridPdf from '@grapecity/wijmo.grid.pdf';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let scaleMode = gridPdf.ScaleMode.ActualSize, orientation = pdf.PdfPageOrientation.Portrait, exportMode = gridPdf.ExportMode.All;
    //
    new input.ComboBox('#cbScaleMode', {
        itemsSource: ['ActualSize', 'PageWidth', 'SinglePage'],
        textChanged: (s, _) => {
            scaleMode = wijmo.asEnum(s.selectedValue, gridPdf.ScaleMode);
        }
    });
    //
    new input.ComboBox('#cbOrientation', {
        itemsSource: ['Portrait', 'Landscape'],
        textChanged: (s, _) => {
            orientation = wijmo.asEnum(s.selectedValue, pdf.PdfPageOrientation);
        }
    });
    //
    new input.ComboBox('#cbExportMode', {
        itemsSource: ['All', 'Selection'],
        textChanged: (s, _) => {
            exportMode = wijmo.asEnum(s.selectedValue, gridPdf.ExportMode);
        }
    });
    //
    let flexGrid = new grid.FlexGrid('#flexGrid', {
        autoGenerateColumns: false,
        selectionMode: grid.SelectionMode.ListBox,
        headersVisibility: grid.HeadersVisibility.All,
        columns: [
            { header: 'ID', binding: 'id' },
            { header: 'Start Date', binding: 'start', format: 'd' },
            { header: 'End Date', binding: 'end', format: 'd' },
            { header: 'Country', binding: 'country' },
            { header: 'Product', binding: 'product' },
            { header: 'Amount', binding: 'amount', format: 'c', aggregate: 'Sum' },
            { header: 'Color', binding: 'color' },
            { header: 'Pending', binding: 'amount2', format: 'c2' },
            { header: 'Discount', binding: 'discount', format: 'p1' },
            { header: 'Active', binding: 'active' }
        ],
        itemsSource: getData(25)
    });
    //
    // set group setting for the flex grid
    setGrouping(flexGrid);
    //
    document.querySelector('#btnExport').addEventListener('click', () => {
        gridPdf.FlexGridPdfConverter.export(flexGrid, 'FlexGrid.pdf', {
            maxPages: 10,
            exportMode: exportMode,
            scaleMode: scaleMode,
            documentOptions: {
                pageSettings: {
                    layout: orientation
                },
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
            }
        });
    });
}
//
function setGrouping(flexGrid) {
    let groupNames = ['Product', 'Country', 'Amount'];
    //
    // get the collection view, start update
    let cv = flexGrid.collectionView;
    cv.beginUpdate();
    //
    // clear existing groups
    cv.groupDescriptions.clear();
    //
    // add new groups
    for (let i = 0; i < groupNames.length; i++) {
        let propName = groupNames[i].toLowerCase();
        //
        if (propName == 'amount') {
            // group amounts in ranges
            // (could use the mapping function to group countries into continents, 
            // names into initials, etc)
            let groupDesc = new wijmo.PropertyGroupDescription(propName, (item, prop) => {
                let value = item[prop];
                if (value > 1000)
                    return 'Large Amounts';
                if (value > 100)
                    return 'Medium Amounts';
                if (value > 0)
                    return 'Small Amounts';
                return 'Negative';
            });
            //
            cv.groupDescriptions.push(groupDesc);
        }
        else {
            if (propName) {
                // group other properties by their specific values
                let groupDesc = new wijmo.PropertyGroupDescription(propName);
                cv.groupDescriptions.push(groupDesc);
            }
        }
    }
    //
    // done updating
    cv.endUpdate();
}
