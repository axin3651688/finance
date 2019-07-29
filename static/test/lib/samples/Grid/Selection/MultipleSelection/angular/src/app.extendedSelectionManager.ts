import * as wjcCore from '@grapecity/wijmo';
import * as wjcGrid from '@grapecity/wijmo.grid';
//
// ** ExtendedSelectionManager
//
export class ExtendedSelectionManager {
    private _selRanges: wjcCore.ObservableArray;
    private _extending: boolean;
    constructor(flex: wjcGrid.FlexGrid) {
        this._selRanges = new wjcCore.ObservableArray();
        this._extending = false;
        // start/end extended selection mode
        flex.addEventListener(flex.hostElement, 'mousedown', (e: MouseEvent) => {
            this._extending = e.button == 0 && (e.ctrlKey || e.metaKey);
            if (!this._extending && this._selRanges.length) {
                this._selRanges.clear();
            }
        }, true);
        // end extended selection mode
        flex.addEventListener(flex.hostElement, 'mouseup', (e: MouseEvent) => {
            this._extending = false;
        });
        // extend selection when selection is changing
        flex.selectionChanging.addHandler((s: wjcGrid.FlexGrid, e: wjcGrid.CellRangeEventArgs) => {
            if (this._extending) {
                let xrng = this._selRanges, 
                    curr = e.range,
                    last = xrng.length ? xrng[xrng.length - 1] : null;
                if (last && curr.intersects(last)) {
                    xrng.setAt(xrng.length - 1, curr);
                }
                else {
                    this._selRanges.push(curr);
                }
            }
        });
        // clear extended selection after a selection change
        flex.selectionChanged.addHandler((s: wjcGrid.FlexGrid, e: wjcGrid.CellRangeEventArgs) => {
            let xrng = this._selRanges;
            if (!this._extending && xrng.length) {
                xrng.clear();
            }
        });
        // apply selected style to a cell
        flex.formatItem.addHandler((s: wjcGrid.FlexGrid, e: wjcGrid.FormatItemEventArgs) => {
            if (e.panel == flex.cells) {
                this._updateCellStyle(e.row, e.col, e.cell);
            }
        });
        // update selection styles when extended selections change
        this._selRanges.collectionChanged.addHandler(() => {
            setTimeout(() => {
                let rng = flex.viewRange;
                for (let r = rng.row; r <= rng.row2; r++) {
                    for (let c = rng.col; c <= rng.col2; c++) {
                        let cell = flex.cells.getCellElement(r, c);
                        this._updateCellStyle(r, c, cell);
                    }
                }
            });
        });
    }

    get selectedRanges(): wjcCore.ObservableArray {
        return this._selRanges;
    }
    // update the selected style for a given cell
    private _updateCellStyle(r: number, c: number, cell: HTMLElement) {
        var selected = false;
        for (var i = 0; i < this._selRanges.length && !selected; i++) {
            selected = this._selRanges[i].contains(r, c);
        }
        wjcCore.toggleClass(cell, 'extended-selection', selected);
    }
}