import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjCore from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.input';
import * as wjFlexSheet from '@grapecity/wijmo.grid.sheet';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // Format Sheet.
    let fonts = [{ name: 'Arial', value: 'Arial, Helvetica, sans-serif' },
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
    let fontSizeList = [{ name: '8', value: '8px' }, { name: '9', value: '9px' }, { name: '10', value: '10px' },
        { name: '11', value: '11px' }, { name: '12', value: '12px' }, { name: '14', value: '14px' },
        { name: '16', value: '16px' }, { name: '18', value: '18px' }, { name: '20', value: '20px' },
        { name: '22', value: '22px' }, { name: '24', value: '24px' }];
    let updatingSelection = false;
    let applyFillColor = false;
    let selectionFormatState = {};
    let formatSheet = new wjFlexSheet.FlexSheet('#formatSheet');
    let inputColor = new wjInput.ColorPicker('#inputColor');
    let formatMenu = new wjInput.Menu('#formatMenu', {
        header: 'Format',
        itemClicked: () => {
            formatSheet.applyCellsStyle({ format: formatMenu.selectedValue });
        }
    });
    let cboFontName = new wjInput.ComboBox('#fonts', {
        itemsSource: fonts,
        selectedIndex: 0,
        displayMemberPath: 'name',
        selectedValuePath: 'value',
        isEditable: false
    });
    let cboFontSize = new wjInput.ComboBox('#fontSize', {
        itemsSource: fontSizeList,
        selectedIndex: 0,
        displayMemberPath: 'name',
        selectedValuePath: 'value',
        isEditable: false
    });
    formatSheet.addUnboundSheet('Number', 20, 8);
    formatSheet.addUnboundSheet('Date', 20, 8);
    formatSheet.deferUpdate(() => {
        let sheetIdx, sheetName, colIdx, rowIdx, date;
        for (sheetIdx = formatSheet.sheets.length - 1; sheetIdx >= 0; sheetIdx--) {
            formatSheet.selectedSheetIndex = sheetIdx;
            sheetName = formatSheet.selectedSheet.name;
            for (colIdx = 0; colIdx < formatSheet.columns.length; colIdx++) {
                for (rowIdx = 0; rowIdx < formatSheet.rows.length; rowIdx++) {
                    if (sheetName === 'Number') {
                        formatSheet.setCellData(rowIdx, colIdx, colIdx + rowIdx);
                    }
                    else {
                        date = new Date(2018, colIdx, rowIdx + 1);
                        formatSheet.setCellData(rowIdx, colIdx, date);
                    }
                }
            }
        }
        updateSelection(formatSheet.selection);
    });
    formatSheet.selectionChanged.addHandler((sender, args) => {
        updateSelection(args.range);
        selectionFormatState = formatSheet.getSelectionFormatState();
        updateStyleButtonState();
    });
    let ua = window.navigator.userAgent, blurEvt = /firefox/i.test(ua) ? 'blur' : 'focusout';
    // Hide the color picker control when it lost the focus.
    inputColor.hostElement.addEventListener(blurEvt, function () {
        setTimeout(() => {
            if (!inputColor.containsFocus()) {
                applyFillColor = false;
                inputColor.hostElement.style.display = 'none';
            }
        }, 0);
    });
    // Initialize the value changed event handler for the color picker control.
    inputColor.valueChanged.addHandler(() => {
        if (applyFillColor) {
            formatSheet.applyCellsStyle({ backgroundColor: inputColor.value });
        }
        else {
            formatSheet.applyCellsStyle({ color: inputColor.value });
        }
    });
    cboFontName.selectedIndexChanged.addHandler(() => {
        // apply the font family for the selected cells
        if (!updatingSelection) {
            formatSheet.applyCellsStyle({ fontFamily: cboFontName.selectedItem.value });
        }
    });
    cboFontSize.selectedIndexChanged.addHandler(() => {
        // apply the font size for the selected cells
        if (!updatingSelection) {
            formatSheet.applyCellsStyle({ fontSize: cboFontSize.selectedItem.value });
        }
    });
    onClick('applyCellTextLeftAlign', () => {
        applyCellTextAlign('left');
    });
    onClick('applyCellTextCenterAlign', () => {
        applyCellTextAlign('center');
    });
    onClick('applyCellTextRightAlign', () => {
        applyCellTextAlign('right');
    });
    onClick('applyBoldStyle', (e) => {
        formatSheet.applyCellsStyle({ fontWeight: selectionFormatState.isBold ? 'none' : 'bold' });
        selectionFormatState.isBold = !selectionFormatState.isBold;
        if (selectionFormatState.isBold) {
            wjCore.addClass(e.target, 'active');
        }
        else {
            wjCore.removeClass(e.target, 'active');
        }
    });
    onClick('applyUnderlineStyle', (e) => {
        formatSheet.applyCellsStyle({ textDecoration: selectionFormatState.isUnderline ? 'none' : 'underline' });
        selectionFormatState.isUnderline = !selectionFormatState.isUnderline;
        if (selectionFormatState.isUnderline) {
            wjCore.addClass(e.target, 'active');
        }
        else {
            wjCore.removeClass(e.target, 'active');
        }
    });
    onClick('applyItalicStyle', (e) => {
        formatSheet.applyCellsStyle({ fontStyle: selectionFormatState.isItalic ? 'none' : 'italic' });
        selectionFormatState.isItalic = !selectionFormatState.isItalic;
        if (selectionFormatState.isItalic) {
            wjCore.addClass(e.target, 'active');
        }
        else {
            wjCore.removeClass(e.target, 'active');
        }
    });
    onClick('foreColor', (e) => {
        showColorPicker(e, false);
    });
    onClick('fillColor', (e) => {
        showColorPicker(e, true);
    });
    // apply the text alignment for the selected cells
    function applyCellTextAlign(textAlign) {
        formatSheet.applyCellsStyle({ textAlign: textAlign });
        selectionFormatState.textAlign = textAlign;
        updateTextAlignState(textAlign);
    }
    ;
    // show the color picker control.
    function showColorPicker(e, isFillColor) {
        let offset = cumulativeOffset(e.target);
        inputColor.hostElement.style.display = 'inline';
        inputColor.hostElement.style.left = offset.left + 'px';
        inputColor.hostElement.style.top = (offset.top - inputColor.hostElement.clientHeight - 5) + 'px';
        inputColor.hostElement.focus();
        applyFillColor = isFillColor;
    }
    ;
    // Update the selection object of the scope.
    function updateSelection(sel) {
        let rowCnt = formatSheet.rows.length, colCnt = formatSheet.columns.length, cellStyle, cellContent, cellFormat;
        updatingSelection = true;
        if (sel.row > -1 && sel.col > -1 && rowCnt > 0 && colCnt > 0
            && sel.col < colCnt && sel.col2 < colCnt
            && sel.row < rowCnt && sel.row2 < rowCnt) {
            cellContent = formatSheet.getCellData(sel.row, sel.col, false);
            cellStyle = formatSheet.selectedSheet.getCellStyle(sel.row, sel.col);
            if (cellStyle) {
                cboFontName.selectedIndex = checkFontfamily(cellStyle.fontFamily);
                cboFontSize.selectedIndex = checkFontSize(cellStyle.fontSize);
                cellFormat = cellStyle.format;
            }
            else {
                cboFontName.selectedIndex = 0;
                cboFontSize.selectedIndex = 5;
            }
            if (!cellFormat) {
                if (wjCore.isInt(cellContent)) {
                    cellFormat = '0';
                }
                else if (wjCore.isNumber(cellContent)) {
                    cellFormat = 'n2';
                }
                else if (wjCore.isDate(cellContent)) {
                    cellFormat = 'd';
                }
            }
            formatMenu.selectedValue = cellFormat;
        }
        updatingSelection = false;
    }
    ;
    function updateStyleButtonState() {
        let boldBtn = document.querySelector('#applyBoldStyle'), underlineBtn = document.querySelector('#applyUnderlineStyle'), italicBtn = document.querySelector('#applyItalicStyle');
        if (selectionFormatState.isBold) {
            wjCore.addClass(boldBtn, 'active');
        }
        else {
            wjCore.removeClass(boldBtn, 'active');
        }
        if (selectionFormatState.isUnderline) {
            wjCore.addClass(underlineBtn, 'active');
        }
        else {
            wjCore.removeClass(underlineBtn, 'active');
        }
        if (selectionFormatState.isItalic) {
            wjCore.addClass(italicBtn, 'active');
        }
        else {
            wjCore.removeClass(italicBtn, 'active');
        }
        updateTextAlignState(selectionFormatState.textAlign);
    }
    function updateTextAlignState(textAlign) {
        let leftBtn = document.querySelector('#applyCellTextLeftAlign'), centerBtn = document.querySelector('#applyCellTextCenterAlign'), rightBtn = document.querySelector('#applyCellTextRightAlign');
        wjCore.removeClass(leftBtn, 'active');
        wjCore.removeClass(centerBtn, 'active');
        wjCore.removeClass(rightBtn, 'active');
        switch (textAlign) {
            case 'left':
                wjCore.addClass(leftBtn, 'active');
                break;
            case 'center':
                wjCore.addClass(centerBtn, 'active');
                break;
            case 'right':
                wjCore.addClass(rightBtn, 'active');
                break;
        }
    }
    // check font family for the font name combobox of the ribbon.
    function checkFontfamily(fontFamily) {
        let fontIndex = 0, font;
        if (!fontFamily) {
            return fontIndex;
        }
        for (; fontIndex < fonts.length; fontIndex++) {
            font = fonts[fontIndex];
            if (font.name === fontFamily || font.value === fontFamily) {
                return fontIndex;
            }
        }
        return 0;
    }
    // check font size for the font size combobox of the ribbon.
    function checkFontSize(fontSize) {
        let index = 0, size;
        if (fontSize == null) {
            return 5;
        }
        for (; index < fontSizeList.length; index++) {
            size = fontSizeList[index];
            if (size.value === fontSize || size.name === fontSize) {
                return index;
            }
        }
        return 5;
    }
    ;
    // Get the absolute position of the dom element.
    function cumulativeOffset(element) {
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
    ;
    function onClick(id, fn) {
        document.querySelector('#' + id).addEventListener('click', fn);
    }
}
