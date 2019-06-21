import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjcCore from '@grapecity/wijmo';
import * as wjcXlsx from '@grapecity/wijmo.xlsx';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.inputStyle = { width: '300px' };
        this.navContainerStyle = { marginTop: '40px' };
        this.state = {
            workbook: null,
            sheetIndex: -1
        };
    }
    componentDidMount() {
        document.getElementById('importFile').addEventListener('change', () => {
            this._loadWorkbook();
        });
    }
    drawSheet(sheetIndex) {
        let drawRoot = document.getElementById('tableHost');
        drawRoot.textContent = '';
        this.setState({ sheetIndex: sheetIndex });
        this._drawWorksheet(this.state.workbook, sheetIndex, drawRoot, 200, 100);
    }
    _loadWorkbook() {
        let reader = new FileReader();
        reader.onload = (e) => {
            let workbook = new wjcXlsx.Workbook();
            workbook.loadAsync(reader.result, (result) => {
                this.setState({ workbook: result });
                this.drawSheet(this.state.workbook.activeWorksheet || 0);
            });
        };
        let file = document.getElementById('importFile').files[0];
        if (file) {
            reader.readAsDataURL(file);
        }
    }
    _drawWorksheet(workbook, sheetIndex, rootElement, maxRows, maxColumns) {
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
                    this._importStyle(colEl.style, col.style);
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
                this._importStyle(rowEl.style, row.style);
                if (row.height != null) {
                    rowEl.style.height = row.height + 'px';
                }
                for (let c = 0; row.cells && c < row.cells.length; c++) {
                    let cell = row.cells[c], cellEl = document.createElement('td');
                    rowEl.appendChild(cellEl);
                    if (cell) {
                        this._importStyle(cellEl.style, cell.style);
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
    _importStyle(cssStyle, xlsxStyle) {
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
    render() {
        let lists = [];
        if (this.state.workbook != null) {
            lists = this.state.workbook.sheets.map((sheet, index) => {
                return <li role="presentation" className={index === this.state.sheetIndex ? 'active' : ''}><a href="#" onClick={this.drawSheet.bind(this, index)}>{sheet.name}</a></li>;
            });
        }
        return <div className="container-fluid">
                <div className="row">
					<input type="file" className="form-control" id="importFile" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel.sheet.macroEnabled.12" style={this.inputStyle}/>
				</div>

				<ul className="nav nav-tabs" style={this.navContainerStyle}>
					{lists}
				</ul>

				<div id="tableHost"></div>
            </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
