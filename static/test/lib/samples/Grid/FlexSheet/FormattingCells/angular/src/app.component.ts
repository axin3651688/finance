import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Component, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjGridSheetModule } from '@grapecity/wijmo.angular2.grid.sheet';
import * as wjcCore from '@grapecity/wijmo';
import * as wjcInput from '@grapecity/wijmo.input';
import * as wjcGrid from '@grapecity/wijmo.grid';
import * as wjcSheet from '@grapecity/wijmo.grid.sheet';

@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    fonts: any[];
    fontSizeList: any[];
    selectionFormatState: wjcSheet.IFormatState;
    selection: any = {
        content: '',
        position: '',
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '8px'
    };
    private _updatingSelection: boolean = false; 
    private _applyFillColor: boolean = false;
    private _format: string = '';

    @ViewChild('flex') flex: wjcSheet.FlexSheet;

    // references Combobox named 'cboFontName' in the view
    @ViewChild('cboFontName') cboFontName: wjcInput.ComboBox;

    // references Combobox named 'cboFontSize' in the view
    @ViewChild('cboFontSize') cboFontSize: wjcInput.ComboBox;

    // references Combobox named 'cboTableStyles' in the view
    @ViewChild('cboTableStyles') cboTableStyles: wjcInput.ComboBox;

    // references Combobox named 'cboFontSize' in the view
    @ViewChild('colorPicker') colorPicker: wjcInput.ColorPicker;

    // Gets or sets _format for the formatSheet.
    get format(): string {
        return this._format;
    }
    set format(value: string) {
        if (this._format !== value) {
            this._format = value;
            if (!this._updatingSelection) {
                this.flex.applyCellsStyle({ format: this._format });
            }
        }
    }

    constructor() {
        this.fonts = [{ name: 'Arial', value: 'Arial, Helvetica, sans-serif' },
            { name: 'Arial Black', value: '"Arial Black", Gadget, sans-serif' },
            { name: 'Comic Sans MS', value: '"Comic Sans MS", cursive, sans-serif' },
            { name: 'Courier New', value: '"Courier New", Courier, monospace' },
            { name: 'Georgia', value: 'Georgia, serif' },
            { name: 'Impact', value: 'Impact, Charcoal, sans-serif' },
            { name: 'Lucida Console', value: '"Lucida Console", Monaco, monospace' },
            { name: 'Lucida Sans Unicode', value: '"Lucida Sans Unicode", "Lucida Grande", sans-serif' },
            { name: 'Palatino Linotype', value: '"Palatino Linotype", "Book Antiqua", Palatino, serif' },
            { name: 'Tahoma', value: 'Tahoma, Geneva, sans-serif' },
            { name: 'Segoe UI', value: '"Segoe UI", "Roboto", sans-serif' },
            { name: 'Times New Roman', value: '"Times New Roman", Times, serif' },
            { name: 'Trebuchet MS', value: '"Trebuchet MS", Helvetica, sans-serif' },
            { name: 'Verdana', value: 'Verdana, Geneva, sans-serif' }];
        this.fontSizeList = [{ name: '8', value: '8px' }, { name: '9', value: '9px' }, { name: '10', value: '10px' },
            { name: '11', value: '11px' }, { name: '12', value: '12px' }, { name: '14', value: '14px' },
            { name: '16', value: '16px' }, { name: '18', value: '18px' }, { name: '20', value: '20px' },
            { name: '22', value: '22px' }, { name: '24', value: '24px' }];
        this.selectionFormatState = {};
    }

    initializeFlexSheet(flex: wjcSheet.FlexSheet) {
        flex.deferUpdate(() => {
            let sheetIdx,
                sheetName,
                colIdx,
                rowIdx,
                date;

            for (sheetIdx = 0; sheetIdx < flex.sheets.length; sheetIdx++) {
                flex.selectedSheetIndex = sheetIdx;
                sheetName = flex.selectedSheet.name;
                for (colIdx = 0; colIdx < flex.columns.length; colIdx++) {
                    for (rowIdx = 0; rowIdx < flex.rows.length; rowIdx++) {
                        if (sheetName === 'Number') {
                            flex.setCellData(rowIdx, colIdx, colIdx + rowIdx);
                        } else {
                            date = new Date(2015, colIdx, rowIdx + 1);
                            flex.setCellData(rowIdx, colIdx, date);
                        }
                    }
                }
            }
            flex.selectedSheetIndex = 0;
            this._updateSelection(flex, flex.selection);
        });

        flex.selectionChanged.addHandler((sender: any, args: wjcGrid.CellRangeEventArgs) => {
            this._updateSelection(flex, args.range);
            this.selectionFormatState = flex.getSelectionFormatState();
        });
    }

    cboFontNameInit(cboFontName: wjcInput.ComboBox) {
        if (cboFontName) {
            cboFontName.selectedIndexChanged.addHandler(() => {
                // apply the font family for the selected cells
                if (!this._updatingSelection) {
                    this.flex.applyCellsStyle({ fontFamily: cboFontName.selectedItem.value });
                }
            });
        }
    }

    cboFontSizeInit(cboFontSize: wjcInput.ComboBox) {
        if (cboFontSize) {
            cboFontSize.selectedIndexChanged.addHandler(() => {
                // apply the font size for the selected cells
                if (!this._updatingSelection) {
                    this.flex.applyCellsStyle({ fontSize: cboFontSize.selectedItem.value });
                }
            });
        }
    }

    colorPickerInit(colorPicker: wjcInput.ColorPicker) {
        let ua = window.navigator.userAgent,
            blurEvt: string;

        if (colorPicker) {
            // if the browser is firefox, we should bind the blur event. (TFS #124387)
            // if the browser is IE, we should bind the focusout event. (TFS #124500)
            blurEvt = /firefox/i.test(ua) ? 'blur' : 'focusout';
            // Hide the color picker control when it lost the focus.
            colorPicker.hostElement.addEventListener(blurEvt, () => {
                setTimeout(() => {
                    if (!colorPicker.containsFocus()) {
                        this._applyFillColor = false;
                        colorPicker.hostElement.style.display = 'none';
                    }
                }, 0);
            });

            // Initialize the value changed event handler for the color picker control.
            colorPicker.valueChanged.addHandler(() => {
                if (this._applyFillColor) {
                    this.flex.applyCellsStyle({ backgroundColor: colorPicker.value });
                } else {
                    this.flex.applyCellsStyle({ color: colorPicker.value });
                }
            });
        }
    }

    // apply the text alignment for the selected cells
    applyCellTextAlign(textAlign: string) {
        if (this.flex) {
            this.flex.applyCellsStyle({ textAlign: textAlign });
            this.selectionFormatState.textAlign = textAlign;
        }
    }

    // apply the bold font weight for the selected cells
    applyBoldStyle() {
        if (this.flex) {
            this.flex.applyCellsStyle({ fontWeight: this.selectionFormatState.isBold ? 'none' : 'bold' });
            this.selectionFormatState.isBold = !this.selectionFormatState.isBold;
        }
    }

    // apply the underline text decoration for the selected cells
    applyUnderlineStyle() {
        if (this.flex) {
            this.flex.applyCellsStyle({ textDecoration: this.selectionFormatState.isUnderline ? 'none' : 'underline' });
            this.selectionFormatState.isUnderline = !this.selectionFormatState.isUnderline;
        }
    }

    // apply the italic font style for the selected cells
    applyItalicStyle() {
        if (this.flex) {
            this.flex.applyCellsStyle({ fontStyle: this.selectionFormatState.isItalic ? 'none' : 'italic' });
            this.selectionFormatState.isItalic = !this.selectionFormatState.isItalic;
        }
    }

    // show the color picker control.
    showColorPicker (e: MouseEvent, isFillColor: boolean) {
        let offset = this._cumulativeOffset(e.target);

        if (this.colorPicker) {
            this.colorPicker.hostElement.style.display = 'inline';
            this.colorPicker.hostElement.style.left = offset.left + 'px';
            this.colorPicker.hostElement.style.top = (offset.top - this.colorPicker.hostElement.clientHeight - 5) + 'px';
            this.colorPicker.hostElement.focus();
        }

        this._applyFillColor = isFillColor;
    };

    // Update the selection object of the scope.
    private _updateSelection(flexSheet: wjcSheet.FlexSheet, sel: wjcGrid.CellRange) {
        let row = flexSheet.rows[sel.row],
            rowCnt = flexSheet.rows.length,
            colCnt = flexSheet.columns.length,
            r,
            c,
            cellStyle,
            cellContent,
            cellFormat;

        this._updatingSelection = true;
        if (sel.row > -1 && sel.col > -1 && rowCnt > 0 && colCnt > 0
            && sel.col < colCnt && sel.col2 < colCnt
            && sel.row < rowCnt && sel.row2 < rowCnt) {
            r = sel.row >= rowCnt ? rowCnt - 1 : sel.row;
            c = sel.col >= colCnt ? colCnt - 1 : sel.col;
            cellContent = flexSheet.getCellData(sel.row, sel.col, false);
            cellStyle = flexSheet.selectedSheet.getCellStyle(sel.row, sel.col);
            if (cellStyle) {
                this.cboFontName.selectedIndex = this._checkFontfamily(cellStyle.fontFamily);
                this.cboFontSize.selectedIndex = this._checkFontSize(cellStyle.fontSize);
                cellFormat = cellStyle.format;
            } else {
                this.cboFontName.selectedIndex = 0;
                this.cboFontSize.selectedIndex = 5;
            }

            if (!!cellFormat) {
               this.format = cellFormat;
            } else {
                if (wjcCore.isInt(cellContent)) {
                    this.format = '0';
                } else if (wjcCore.isNumber(cellContent)) {
                    this.format = 'n2';
                } else if (wjcCore.isDate(cellContent)) {
                    this.format = 'd';
                }
            }
        }
        this._updatingSelection = false;
    }

    // check font family for the font name combobox of the ribbon.
    private _checkFontfamily(fontFamily: string) {
        let fonts = this.fonts,
            fontIndex = 0,
            font;

        if (!fontFamily) {
            return fontIndex;
        }
        for (; fontIndex < fonts.length; fontIndex++) {
            font = fonts[fontIndex];
            if (font.name === fontFamily || font.value === fontFamily) {
                return fontIndex;
            }
        }
        return 10;
    }

    // check font size for the font size combobox of the ribbon.
    private _checkFontSize(fontSize: string) {
        let sizeList = this.fontSizeList,
            index = 0,
            size;

        if (fontSize == null) {
            return 5;
        }
        for (; index < sizeList.length; index++) {
            size = sizeList[index];
            if (size.value === fontSize || size.name === fontSize) {
                return index;
            }
        }
        return 5;
    }

    // Get the absolute position of the dom element.
    private _cumulativeOffset(element: any): any {
        let top = 0, left = 0, scrollTop = 0, scrollLeft = 0;

        do {
            top += element.offsetTop || 0;
            left += element.offsetLeft || 0;
            scrollTop += element.scrollTop || 0;
            scrollLeft += element.scrollLeft || 0;
            element = element.offsetParent;
        } while (element && !(element instanceof HTMLBodyElement));

        scrollTop += document.body.scrollTop || document.documentElement.scrollTop;
        scrollLeft += document.body.scrollLeft || document.documentElement.scrollLeft;

        return {
            top: top - scrollTop,
            left: left - scrollLeft
        };
    }
}

@NgModule({
  imports: [WjGridSheetModule, WjInputModule, BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

