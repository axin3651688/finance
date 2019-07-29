<template>
    <div class="container-fluid">
        <!-- the flexsheet -->
        <wj-flex-sheet :initialized="initializeFlexSheet">
            <wj-sheet name="Number" :rowCount="20" :columnCount="8"></wj-sheet>
            <wj-sheet name="Date" :rowCount="20" :columnCount="8"></wj-sheet>
        </wj-flex-sheet>
        <wj-color-picker
            style="display:none;position:fixed;z-index:100"
            :initialized="colorPickerInit"
        ></wj-color-picker>
        <div class="well well-lg">
            <div>Format:
                <wj-menu
                    :header="'Format: <b>' + selectedItem.header + '</b>'"
                    :selectedItem="selectedItem"
                    :value="format"
                    :displayMemberPath="'header'"
                    :selectedValuePath="'value'"
                    :itemsSource="itemsSource"
                    :itemClicked="itemClicked"
                ></wj-menu>
            </div>
            <div>Font:
                <wj-combo-box
                    style="width:120px"
                    :itemsSource="fonts"
                    :selectedIndex="10"
                    :displayMemberPath="'name'"
                    :selectedValuePath="'value'"
                    :isEditable="false"
                    :initialized="cboFontNameInit"
                ></wj-combo-box>
                <wj-combo-box
                    style="width:80px"
                    :itemsSource="fontSizeList"
                    :selectedIndex="5"
                    :displayMemberPath="'name'"
                    :selectedValuePath="'value'"
                    :isEditable="false"
                    :initialized="cboFontSizeInit"
                ></wj-combo-box>
                <div class="btn-group">
                    <button
                        type="button"
                        class="btn btn-default {{selectionFormatState.isBold ? 'active' : ''}}"
                        @click="applyBoldStyle()"
                    >Bold</button>
                    <button
                        type="button"
                        class="btn btn-default {{selectionFormatState.isItalic ? 'active' : ''}}"
                        @click="applyItalicStyle()"
                    >Italic</button>
                    <button
                        type="button"
                        class="btn btn-default {{selectionFormatState.isUnderline ? 'active' : ''}}"
                        @click="applyUnderlineStyle()"
                    >Underline</button>
                </div>
            </div>
            <div>Color:
                <div class="btn-group">
                    <button
                        type="button"
                        class="btn btn-default"
                        @click="showColorPicker($event,false)"
                    >Fore Color</button>
                    <button
                        type="button"
                        class="btn btn-default"
                        @click="showColorPicker($event,true)"
                    >Fill Color</button>
                </div>Alignment:
                <div class="btn-group">
                    <button
                        type="button"
                        class="btn btn-default {{selectionFormatState.textAlign === 'left' ? 'active' : ''}}"
                        @click="applyCellTextAlign('left')"
                    >Left</button>
                    <button
                        type="button"
                        class="btn btn-default {{selectionFormatState.textAlign === 'center' ? 'active' : ''}}"
                        @click="applyCellTextAlign('center')"
                    >Center</button>
                    <button
                        type="button"
                        class="btn btn-default {{selectionFormatState.textAlign === 'right' ? 'active' : ''}}"
                        @click="applyCellTextAlign('right')"
                    >Right</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.core";
import "@grapecity/wijmo.vue2.input";
import "@grapecity/wijmo.vue2.grid.sheet";

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            fonts: [
                { name: "Arial", value: "Arial, Helvetica, sans-serif" },
                {
                    name: "Arial Black",
                    value: '"Arial Black", Gadget, sans-serif'
                },
                {
                    name: "Comic Sans MS",
                    value: '"Comic Sans MS", cursive, sans-serif'
                },
                {
                    name: "Courier New",
                    value: '"Courier New", Courier, monospace'
                },
                { name: "Georgia", value: "Georgia, serif" },
                { name: "Impact", value: "Impact, Charcoal, sans-serif" },
                {
                    name: "Lucida Console",
                    value: '"Lucida Console", Monaco, monospace'
                },
                {
                    name: "Lucida Sans Unicode",
                    value: '"Lucida Sans Unicode", "Lucida Grande", sans-serif'
                },
                {
                    name: "Palatino Linotype",
                    value:
                        '"Palatino Linotype", "Book Antiqua", Palatino, serif'
                },
                { name: "Tahoma", value: "Tahoma, Geneva, sans-serif" },
                { name: "Segoe UI", value: '"Segoe UI", "Roboto", sans-serif' },
                {
                    name: "Times New Roman",
                    value: '"Times New Roman", Times, serif'
                },
                {
                    name: "Trebuchet MS",
                    value: '"Trebuchet MS", Helvetica, sans-serif'
                },
                { name: "Verdana", value: "Verdana, Geneva, sans-serif" }
            ],
            fontSizeList: [
                { name: "8", value: "8px" },
                { name: "9", value: "9px" },
                { name: "10", value: "10px" },
                { name: "11", value: "11px" },
                { name: "12", value: "12px" },
                { name: "14", value: "14px" },
                { name: "16", value: "16px" },
                { name: "18", value: "18px" },
                { name: "20", value: "20px" },
                { name: "22", value: "22px" },
                { name: "24", value: "24px" }
            ],
            itemsSource: [
                { header: "Decimal Format", value: 0 },
                { header: "Number Format", value: "n2" },
                {
                    header: "Percentage Format",
                    value: "p2"
                },
                {
                    header: "Currency Format",
                    value: "c2"
                },
                { header: '<div class="wj-separator"></div>', value: "" },
                { header: "Short Date", value: "d" },
                { header: "Long Date", value: "D" },
                {
                    header: "Full Date/TIme (short time)",
                    value: "f"
                },
                {
                    header: "Full Date/TIme (long time)",
                    value: "F"
                }
            ],
            selection: {
                content: "",
                position: "",
                fontFamily: "Arial, Helvetica, sans-serif",
                fontSize: "8px"
            },
            selectedItem: {
                header: "Decimal Format",
                value: 0
            },
            selectionFormatState: {},
            _updatingSelection: false,
            _applyFillColor: false,
            _format: "0",
            flex: {},
            cboFontName: {},
            cboFontSize: {},
            cboTableStyles: {},
            colorPicker: {},
            format: ""
        };
    },
    methods: {
        initializeFlexSheet: function(flex) {
            flex.deferUpdate(() => {
                let sheetIdx, sheetName, colIdx, rowIdx, date;

                for (sheetIdx = 0; sheetIdx < flex.sheets.length; sheetIdx++) {
                    flex.selectedSheetIndex = sheetIdx;
                    sheetName = flex.selectedSheet.name;
                    for (colIdx = 0; colIdx < flex.columns.length; colIdx++) {
                        for (rowIdx = 0; rowIdx < flex.rows.length; rowIdx++) {
                            if (sheetName === "Number") {
                                flex.setCellData(
                                    rowIdx,
                                    colIdx,
                                    colIdx + rowIdx
                                );
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

            flex.selectionChanged.addHandler((sender, args) => {
                this._updateSelection(flex, args.range);
                this.selectionFormatState = flex.getSelectionFormatState();
            });

            this.flex = flex;
        },

        cboFontNameInit: function(cboFontName) {
            if (cboFontName) {
                cboFontName.selectedIndexChanged.addHandler(() => {
                    // apply the font family for the selected cells
                    if (!this._updatingSelection) {
                        this.flex.applyCellsStyle({
                            fontFamily: cboFontName.selectedItem.value
                        });
                    }
                });
            }
            this.cboFontName = cboFontName;
        },

        cboFontSizeInit: function(cboFontSize) {
            if (cboFontSize) {
                cboFontSize.selectedIndexChanged.addHandler(() => {
                    // apply the font size for the selected cells
                    if (!this._updatingSelection) {
                        this.flex.applyCellsStyle({
                            fontSize: cboFontSize.selectedItem.value
                        });
                    }
                });
            }
            this.cboFontSize = cboFontSize;
        },

        colorPickerInit: function(colorPicker) {
            let ua = window.navigator.userAgent,
                blurEvt;

            if (colorPicker) {
                // if the browser is firefox, we should bind the blur event. (TFS #124387)
                // if the browser is IE, we should bind the focusout event. (TFS #124500)
                blurEvt = /firefox/i.test(ua) ? "blur" : "focusout";
                // Hide the color picker control when it lost the focus.
                colorPicker.hostElement.addEventListener(blurEvt, () => {
                    setTimeout(() => {
                        if (!colorPicker.containsFocus()) {
                            this._applyFillColor = false;
                            colorPicker.hostElement.style.display = "none";
                        }
                    }, 0);
                });

                // Initialize the value changed event handler for the color picker control.
                colorPicker.valueChanged.addHandler(() => {
                    if (this._applyFillColor) {
                        this.flex.applyCellsStyle({
                            backgroundColor: colorPicker.value
                        });
                    } else {
                        this.flex.applyCellsStyle({ color: colorPicker.value });
                    }
                });
            }
            this.colorPicker = colorPicker;
        },

        itemClicked: function(sender) {
            this.selectedItem = sender.selectedItem;
            this.flex.applyCellsStyle({ format: sender.selectedValue });
        },

        // apply the text alignment for the selected cells
        applyCellTextAlign: function(textAlign) {
            if (this.flex) {
                this.flex.applyCellsStyle({ textAlign: textAlign });
                this.selectionFormatState.textAlign = textAlign;
            }
        },

        // apply the bold font weight for the selected cells
        applyBoldStyle: function() {
            if (this.flex) {
                this.flex.applyCellsStyle({
                    fontWeight: this.selectionFormatState.isBold
                        ? "none"
                        : "bold"
                });
                this.selectionFormatState.isBold = !this.selectionFormatState
                    .isBold;
            }
        },

        // apply the underline text decoration for the selected cells
        applyUnderlineStyle: function() {
            if (this.flex) {
                this.flex.applyCellsStyle({
                    textDecoration: this.selectionFormatState.isUnderline
                        ? "none"
                        : "underline"
                });
                this.selectionFormatState.isUnderline = !this
                    .selectionFormatState.isUnderline;
            }
        },

        // apply the italic font style for the selected cells
        applyItalicStyle: function() {
            if (this.flex) {
                this.flex.applyCellsStyle({
                    fontStyle: this.selectionFormatState.isItalic
                        ? "none"
                        : "italic"
                });
                this.selectionFormatState.isItalic = !this.selectionFormatState
                    .isItalic;
            }
        },

        // show the color picker control.
        showColorPicker: function(e, isFillColor) {
            let offset = this._cumulativeOffset(e.target);

            if (this.colorPicker) {
                this.colorPicker.hostElement.style.display = "inline";
                this.colorPicker.hostElement.style.left = offset.left + "px";
                this.colorPicker.hostElement.style.top =
                    offset.top -
                    this.colorPicker.hostElement.clientHeight -
                    5 +
                    "px";
                this.colorPicker.hostElement.focus();
            }

            this._applyFillColor = isFillColor;
        },

        // Update the selection object of the scope.
        _updateSelection: function(flexSheet, sel) {
            let row = flexSheet.rows[sel.row],
                rowCnt = flexSheet.rows.length,
                colCnt = flexSheet.columns.length,
                r,
                c,
                cellStyle,
                cellContent,
                cellFormat;

            this._updatingSelection = true;
            if (
                sel.row > -1 &&
                sel.col > -1 &&
                rowCnt > 0 &&
                colCnt > 0 &&
                sel.col < colCnt &&
                sel.col2 < colCnt &&
                sel.row < rowCnt &&
                sel.row2 < rowCnt
            ) {
                r = sel.row >= rowCnt ? rowCnt - 1 : sel.row;
                c = sel.col >= colCnt ? colCnt - 1 : sel.col;
                cellContent = flexSheet.getCellData(sel.row, sel.col, false);
                cellStyle = flexSheet.selectedSheet.getCellStyle(
                    sel.row,
                    sel.col
                );
                if (cellStyle) {
                    this.cboFontName.selectedIndex = this._checkFontfamily(
                        cellStyle.fontFamily
                    );
                    this.cboFontSize.selectedIndex = this._checkFontSize(
                        cellStyle.fontSize
                    );
                    cellFormat = cellStyle.format;
                } else {
                    this.cboFontName.selectedIndex = 0;
                    this.cboFontSize.selectedIndex = 5;
                }

                if (!!cellFormat) {
                    this.format = cellFormat;
                } else {
                    if (wijmo.isInt(cellContent)) {
                        this.format = "0";
                    } else if (wijmo.isNumber(cellContent)) {
                        this.format = "n2";
                    } else if (wijmo.isDate(cellContent)) {
                        this.format = "d";
                    }
                }
            }
            this._updatingSelection = false;
        },

        // check font family for the font name combobox of the ribbon.
        _checkFontfamily: function(fontFamily) {
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
        },

        // check font size for the font size combobox of the ribbon.
        _checkFontSize: function(fontSize) {
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
        },

        // Get the absolute position of the dom element.
        _cumulativeOffset: function(element) {
            let top = 0,
                left = 0,
                scrollTop = 0,
                scrollLeft = 0;

            do {
                top += element.offsetTop || 0;
                left += element.offsetLeft || 0;
                scrollTop += element.scrollTop || 0;
                scrollLeft += element.scrollLeft || 0;
                element = element.offsetParent;
            } while (element && !(element instanceof HTMLBodyElement));

            scrollTop +=
                document.body.scrollTop || document.documentElement.scrollTop;
            scrollLeft +=
                document.body.scrollLeft || document.documentElement.scrollLeft;

            return {
                top: top - scrollTop,
                left: left - scrollLeft
            };
        }
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.container-fluid .wj-flexsheet {
    height: 400px;
    margin: 6px 0;
}
</style>
