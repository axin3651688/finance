import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import * as wjcCore from '@grapecity/wijmo';
import * as wjcXlsx from '@grapecity/wijmo.xlsx';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    let workbook;
    document.querySelector('#importFile').addEventListener('change', () => {
        loadWorkbook();
    });
    document.querySelector('#sheetNav').addEventListener('click', (e) => {
        let navEle = e.target.parentElement;
        let activeIndex = toggleNavActiveStatus(navEle);
        if (activeIndex !== -1) {
            drawSheet(activeIndex);
        }
    });
    function loadWorkbook() {
        let reader = new FileReader();
        reader.onload = (e) => {
            let tmp = new wjcXlsx.Workbook();
            tmp.loadAsync(reader.result, (result) => {
                workbook = result;
                drawSheetNav(workbook.activeWorksheet || 0);
                drawSheet(workbook.activeWorksheet || 0);
            });
        };
        let file = document.getElementById('importFile').files[0];
        if (file) {
            reader.readAsDataURL(file);
        }
    }
    function drawSheet(sheetIndex) {
        let drawRoot = document.getElementById('tableHost');
        drawRoot.textContent = '';
        drawWorksheet(workbook, sheetIndex, drawRoot, 200, 100);
    }
    function drawSheetNav(activeIndex) {
        let contianer = document.querySelector('#sheetNav');
        contianer.innerHTML = '';
        let navItem = '';
        for (let i = 0; i < workbook.sheets.length; i++) {
            let sheet = workbook.sheets[i];
            navItem += `<li role="presentation" class="${i === activeIndex ? 'active' : ''}"><a href="#">${sheet.name}</a></li>`;
        }
        contianer.innerHTML = navItem;
    }
    function drawWorksheet(workbook, sheetIndex, rootElement, maxRows, maxColumns) {
        //NOTES:
        //Empty cells' values are numeric NaN, format is "General"
        //
        //Excessive empty properties:
        //fill.color = undefined
        //
        // netFormat should return '' for ''. What is 'General'?
        // font.color should start with '#'?
        // Column/row styles are applied to each cell style, this is convenient, but Column/row style info should be kept,
        // for column/row level styling
        // formats conversion is incorrect - dates and virtually everything; netFormat - return array of formats?
        // ?row heights - see hello.xlsx
        if (!workbook || !workbook.sheets || sheetIndex < 0 || workbook.sheets.length == 0) {
            return;
        }
        sheetIndex = Math.min(sheetIndex, workbook.sheets.length - 1);
        if (maxRows == null) {
            maxRows = 200;
        }
        if (maxColumns == null) {
            maxColumns = 100;
        }
        // Namespace and XlsxConverter shortcuts.
        let sheet = workbook.sheets[sheetIndex];
        let defaultRowHeight = 20, defaultColumnWidth = 60;
        let tableEl = document.createElement('table');
        tableEl.border = '1';
        tableEl.style.borderCollapse = 'collapse';
        let maxRowCells = 0;
        for (let r = 0; sheet.rows && r < sheet.rows.length; r++) {
            if (sheet.rows[r] && sheet.rows[r].cells) {
                maxRowCells = Math.max(maxRowCells, sheet.rows[r].cells.length);
            }
        }
        // add columns
        let columnCount = 0;
        if (sheet.columns) {
            columnCount = sheet.columns.length;
            maxRowCells = Math.min(Math.max(maxRowCells, columnCount), maxColumns);
            for (let c = 0; c < maxRowCells; c++) {
                let col = c < columnCount ? sheet.columns[c] : null, colEl = document.createElement('col');
                tableEl.appendChild(colEl);
                let colWidth = defaultColumnWidth + 'px';
                if (col) {
                    importStyle(colEl.style, col.style);
                    if (col.autoWidth) {
                        colWidth = '';
                    }
                    else if (col.width != null) {
                        colWidth = col.width + 'px';
                    }
                }
                colEl.style.width = colWidth;
            }
        }
        // generate rows
        let rowCount = Math.min(maxRows, sheet.rows.length);
        for (let r = 0; sheet.rows && r < rowCount; r++) {
            let row = sheet.rows[r], rowEl = document.createElement('tr');
            tableEl.appendChild(rowEl);
            if (row) {
                importStyle(rowEl.style, row.style);
                if (row.height != null) {
                    rowEl.style.height = row.height + 'px';
                }
                for (let c = 0; row.cells && c < row.cells.length; c++) {
                    let cell = row.cells[c], cellEl = document.createElement('td');
                    rowEl.appendChild(cellEl);
                    if (cell) {
                        importStyle(cellEl.style, cell.style);
                        let value = cell.value;
                        if (!(value == null || value !== value)) { // TBD: check for NaN should be eliminated
                            let netFormat = '';
                            if (cell.style && cell.style.format) {
                                netFormat = wjcXlsx.Workbook.fromXlsxFormat(cell.style.format)[0];
                            }
                            let fmtValue = netFormat ? wjcCore.Globalize.format(value, netFormat) : value;
                            cellEl.innerHTML = wjcCore.escapeHtml(fmtValue);
                        }
                        if (cell.colSpan && cell.colSpan > 1) {
                            cellEl.colSpan = cell.colSpan;
                            c += cellEl.colSpan - 1;
                        }
                    }
                }
            }
            // pad with empty cells
            let padCellsCount = maxRowCells - (row && row.cells ? row.cells.length : 0);
            for (let i = 0; i < padCellsCount; i++) {
                rowEl.appendChild(document.createElement('td'));
            }
            if (!rowEl.style.height) {
                rowEl.style.height = defaultRowHeight + 'px';
            }
        }
        // do it at the end for performance
        rootElement.appendChild(tableEl);
    }
    function importStyle(cssStyle, xlsxStyle) {
        if (!xlsxStyle) {
            return;
        }
        if (xlsxStyle.fill) {
            if (xlsxStyle.fill.color) {
                cssStyle.backgroundColor = xlsxStyle.fill.color;
            }
        }
        if (xlsxStyle.hAlign && xlsxStyle.hAlign != wjcXlsx.HAlign.Fill) {
            cssStyle.textAlign = wjcXlsx.HAlign[xlsxStyle.hAlign].toLowerCase();
        }
        let font = xlsxStyle.font;
        if (font) {
            if (font.family) {
                cssStyle.fontFamily = font.family;
            }
            if (font.bold) {
                cssStyle.fontWeight = 'bold';
            }
            if (font.italic) {
                cssStyle.fontStyle = 'italic';
            }
            if (font.size != null) {
                cssStyle.fontSize = font.size + 'px';
            }
            if (font.underline) {
                cssStyle.textDecoration = 'underline';
            }
            if (font.color) {
                cssStyle.color = font.color;
            }
        }
    }
    function toggleNavActiveStatus(navEle) {
        let activeIndex = -1;
        let navEles = document.querySelectorAll('#sheetNav li');
        for (let i = 0; i < navEles.length; i++) {
            let currentItem = navEles[i];
            wjcCore.removeClass(currentItem, 'active');
            if (currentItem === navEle) {
                wjcCore.addClass(currentItem, 'active');
                activeIndex = i;
            }
        }
        return activeIndex;
    }
}
