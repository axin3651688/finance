/*!
    *
    * Wijmo Library 5.20191.603
    * http://wijmo.com/
    *
    * Copyright(c) GrapeCity, Inc.  All rights reserved.
    *
    * Licensed under the GrapeCity Commercial License.
    * sales@wijmo.com
    * wijmo.com/products/wijmo-5/license/
    *
    */
/**
 * {@module wijmo.grid.xlsx}
 * Extension that defines the {@link FlexGridXlsxConverter} class that provides
 * client-side Excel xlsx file save/load capabilities for the
 * {@link FlexGrid} control.
 */
/**
 *
 */
export declare var ___keepComment: any;
import { FlexGrid, GridPanel, Column, CellRange, CellRangeEventArgs } from 'wijmo/wijmo.grid';
import * as mDetail from 'wijmo/wijmo.grid.detail';
import * as mMultiRow from 'wijmo/wijmo.grid.multirow';
import * as mXlsx from 'wijmo/wijmo.xlsx';
export declare function softDetail(): typeof mDetail;
export declare function softMultiRow(): typeof mMultiRow;
/**
 * This class provides static <b>load</b> and <b>save</b> methods for loading
 * and saving {@link FlexGrid} controls from and to Excel xlsx files.
 *
 * The example below shows how you can use the {@link FlexGridXlsxConverter} to
 * export the content of a {@link FlexGrid} control to XLSX:
 *
 * {@sample Grid/ImportExportPrint/Excel/Async/purejs Example}
 */
export declare class FlexGridXlsxConverter {
    private static hasCssText;
    /**
     * Save the {@link FlexGrid} instance to the {@link Workbook} instance.
     * This method works with JSZip 2.5.
     *
     * For example:
     * <pre>// This sample exports FlexGrid content to an xlsx file.
     * // click.
     * &nbsp;
     * // HTML
     * &lt;button
     *     onclick="saveXlsx('FlexGrid.xlsx')"&gt;
     *     Save
     * &lt;/button&gt;
     * &nbsp;
     * // JavaScript
     * function saveXlsx(fileName) {
     *     // Save the flexGrid to xlsx file.
     *     wijmo.grid.xlsx.FlexGridXlsxConverter.save(flexGrid,
     *             { includeColumnHeaders: true }, fileName);
     * }</pre>
     *
     * @param grid FlexGrid that will be saved.
     * @param options {@link IFlexGridXlsxOptions} object specifying the save options.
     * @param fileName Name of the file that will be generated.
     * @return A {@link Workbook} object that can be used to customize the workbook
     * before saving it (with the Workbook.save method).
     */
    static save(grid: FlexGrid, options?: IFlexGridXlsxOptions, fileName?: string): mXlsx.Workbook;
    /**
     * Asynchronously saves the content of a {@link FlexGrid} to a file.
     *
     * This method requires JSZip 3.0.
     *
     * @param grid FlexGrid that will be saved.
     * @param options {@link IFlexGridXlsxOptions} object specifying the save options.
     * @param fileName Name of the file that will be generated.
     * @param onSaved Callback invoked when the method finishes executing.
     * The callback provides access to the content of the saved workbook
     * (encoded as a base-64 string and passed as a parameter to the callback).
     * @param onError Callback invoked when there are errors saving the file.
     * The error is passed as a parameter to the callback.
     *
     * For example:
     * <pre>
     * wijmo.grid.xlsx.FlexGridXlsxConverter.saveAsync(flexGrid,
     *     { includeColumnHeaders: true }, // options
     *     'FlexGrid.xlsx', // filename
     *     function (base64) { // onSaved
     *         // User can access the base64 string in this callback.
     *         document.getElementByID('export').href = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' + 'base64,' + base64;
     *     },
     *     function (reason) { // onError
     *         // User can catch the failure reason in this callback.
     *         console.log('The reason of save failure is ' + reason);
     *     }
     *  );</pre>
     */
    static saveAsync(grid: FlexGrid, options?: IFlexGridXlsxOptions, fileName?: string, onSaved?: (base64: string) => any, onError?: (reason?: any) => any): mXlsx.Workbook;
    /**
     * Loads a {@link Workbook} instance or a Blob object containing xlsx
     * file content to the {@link FlexGrid} instance.
     * This method works with JSZip 2.5.
     *
     * For example:
     * <pre>// This sample opens an xlsx file chosen through Open File
     * // dialog and fills FlexGrid with the content of the first
     * // sheet.
     * &nbsp;
     * // HTML
     * &lt;input type="file"
     *     id="importFile"
     *     accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
     * /&gt;
     * &lt;div id="flexHost"&gt;&lt;/&gt;
     * &nbsp;
     * // JavaScript
     * var flexGrid = new wijmo.grid.FlexGrid("#flexHost"),
     *     importFile = document.getElementById('importFile');
     * &nbsp;
     * importFile.addEventListener('change', function () {
     *     loadWorkbook();
     * });
     * &nbsp;
     * function loadWorkbook() {
     *     var reader,
     *         file = importFile.files[0];
     *     if (file) {
     *         reader = new FileReader();
     *         reader.onload = function (e) {
     *             wijmo.grid.xlsx.FlexGridXlsxConverter.load(flexGrid, reader.result,
     *                 { includeColumnHeaders: true });
     *         };
     *         reader.readAsArrayBuffer(file);
     *     }
     * }</pre>
     *
     * @param grid {@link FlexGrid} that loads the {@link Workbook} object.
     * @param workbook A {@link Workbook}, Blob, base-64 string, or ArrayBuffer
     * containing the xlsx file content.
     * @param options {@link IFlexGridXlsxOptions} object specifying the load options.
     */
    static load(grid: FlexGrid, workbook: any, options?: IFlexGridXlsxOptions): void;
    /**
     * Asynchronously loads a {@link Workbook} or a Blob representing an xlsx file
     * into a {@link FlexGrid}.
     *
     * This method requires JSZip 3.0.
     *
     * @param grid {@link FlexGrid} that loads the {@link Workbook} object.
     * @param workbook {@link Workbook}, Blob, base-64 string, or ArrayBuffer
     * representing the xlsx file content.
     * @param options {@link IFlexGridXlsxOptions} object specifying the load options.
     * @param onLoaded Callback invoked when the method finishes executing.
     * The callback provides access to the workbook that was loaded
     * (passed as a parameter to the callback).
     * @param onError Callback invoked when there are errors saving the file.
     * The error is passed as a parameter to the callback.
     *
     * For example:
     * <pre>
     * wijmo.grid.xlsx.FlexGridXlsxConverter.loadAsync(grid, blob, null, function (workbook) {
     *      // user can access the loaded workbook instance in this callback.
     *      var app = worksheet.application ;
     *      ...
     * }, function (reason) {
     *      // User can catch the failure reason in this callback.
     *      console.log('The reason of save failure is ' + reason);
     * });
     * </pre>
     */
    static loadAsync(grid: FlexGrid, workbook: any, options?: IFlexGridXlsxOptions, onLoaded?: (workbook: mXlsx.Workbook) => void, onError?: (reason?: any) => any): void;
    private static _saveFlexGridToWorkbook;
    private static _loadToFlexGrid;
    private static _parseFlexGridRowToSheetRow;
    static _parseCellStyle(cellStyle: any, isTableStyle?: boolean): mXlsx.IWorkbookStyle;
    private static _parseBorder;
    private static _parseEgdeBorder;
    static _parseBorderStyle(borderStyle: mXlsx.BorderStyle, edge: string, cellStyle: any): void;
    private static _parseToExcelFontFamily;
    private static _parseToExcelFormula;
    private static _parseToTextRuns;
    private static _parseToTextRunFont;
    static _getMeasureCell(panel: GridPanel, colIndex: number, patternCell: HTMLDivElement, cellsCache: _CellsCache): HTMLDivElement;
    private static _getColumnSetting;
    private static _toExcelHAlign;
    private static _getColumnCount;
    private static _getRowCount;
    private static _numAlpha;
    private static _getItemType;
    private static _setColumn;
    private static _getItemValue;
    static _getCellStyle(panel: GridPanel, fakeCell: HTMLDivElement, r: number, c: number): any;
    private static _parseTextRunsToHTML;
    private static _extend;
    private static _checkParentCollapsed;
    private static _getColSpan;
    private static _getRenderColumn;
    private static _getMergedRange;
}
/**
 * Represents arguments of the IFlexGridXlsxOptions.formatItem callback.
 */
export declare class XlsxFormatItemEventArgs extends CellRangeEventArgs {
    private _cell;
    private _patternCell;
    private _xlsxCell;
    private _cellsCache;
    constructor(panel: GridPanel, rng: CellRange, cell: HTMLDivElement, patternCell: HTMLDivElement, cellsCache: _CellsCache, xlsxCell: mXlsx.IWorkbookCell);
    /**
     * If IFlexGridXlsxOptions.includeCellStyles is set to true then contains a
     * reference to the element that represents the formatted grid cell; otherwise, a null value.
     *
     */
    readonly cell: HTMLElement;
    /**
     * Contains an exporting cell representation. Initially it contains a default cell representation created
     * by FlexGrid export, and can be modified by the event handler to customize its final content. For example,
     * the xlsxCell.value property can be updated to modify a cell content, xlsxCell.style to modify cell's style,
     * and so on.
     */
    xlsxCell: mXlsx.IWorkbookCell;
    /**
     * Returns a cell with a custom formatting applied (formatItem event, cell templates).
     * This method is useful when export of custom formatting is disabled
     * (IFlexGridXlsxOptions.includeCellStyles=false), but you need
     * to export a custom content and/or style for a certain cells.
     */
    getFormattedCell(): HTMLElement;
}
/**
 * Defines additional worksheet properties that can be accesses via the dynamic <b>wj_sheetInfo</b> property
 * of the {@link FlexGrid} instance.
 */
export interface IExtendedSheetInfo {
    /**
     * The sheet name.
     */
    name: string;
    /**
     * Sheet visibility.
     */
    visible: boolean;
    /**
     * Styled cells in the sheet
     */
    styledCells: any;
    /**
     * Merged ranges in the sheet
     */
    mergedRanges: CellRange[];
    /**
     * Contains an array of font names used in the sheet.
     */
    fonts: string[];
    /**
     * The tables in this worksheet.
     */
    tables: mXlsx.WorkbookTable[];
    /**
     * A function that evaluates the formula of cell.
     */
    evaluateFormula?: Function;
}
/**
 * FlexGrid Xlsx conversion options
 */
export interface IFlexGridXlsxOptions {
    /**
     * The index of the sheet in the workbook.  It indicates to import which sheet.
     */
    sheetIndex?: number;
    /**
     * The name of the sheet.
     * It indicates to import which sheet for importing.  If the sheetIndex and sheetName are both setting, the priority of sheetName is higher than sheetIndex.
     * It sets the name of worksheet for exporting.
     */
    sheetName?: string;
    /**
     * The visible of the sheet.
     */
    sheetVisible?: boolean;
    /**
     * Indicates whether to include column headers as first rows in the generated xlsx file.
     */
    includeColumnHeaders?: boolean;
    /**
     * Indicates whether to include column headers as first rows in the generated xlsx file.
     */
    includeRowHeaders?: boolean;
    /**
     * Indicates whether cells styling should be included in the generated xlsx file.
     */
    includeCellStyles?: boolean;
    /**
     * Index or name of the active sheet in the xlsx file.
     */
    activeWorksheet?: any;
    /**
     * A callback to indicate which columns of FlexGrid need be included or omitted during exporting.
     *
     * For example:
     * <pre>// This sample excludes the 'country' column from export.
     * &nbsp;
     * // JavaScript
     * wijmo.grid.xlsx.FlexGridXlsxConverter.save(grid, {
     *   includeColumns: function(column) {
     *      return column.binding !== 'country';
     *   }
     * }</pre>
     */
    includeColumns?: (column: Column) => boolean;
    /**
     * An optional callback which is called for every exported cell and allows to perform transformations
     * of exported cell value and style.
     * The callback is called irrespectively of the 'includeCellStyles' property value.
     * It has a single parameter of the {@link XlsxFormatItemEventArgs} type that
     * provides both information about the source grid cell and an {@link IWorkbookCell} object
     * defining its representation in the exported file, which can be customized in the callback.
     */
    formatItem?: (args: XlsxFormatItemEventArgs) => void;
}
export declare type _CellsCache = HTMLDivElement[][];
