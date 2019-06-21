import * as wjcCore from '@grapecity/wijmo';
import * as wjcGrid from '@grapecity/wijmo.grid';
import * as wjcInput from '@grapecity/wijmo.input';

//
// *** CustomGridEditor class (transpiled from TypeScript) ***
//
export class CustomGridEditor {
    _grid: wjcGrid.FlexGrid;
    _col: wjcGrid.Column;
    _ctl: wjcCore.Control;
    _openDropDown: boolean;
    _rng: wjcGrid.CellRange;

    static _isEditing: boolean; // true if any custom editor is active

    /**
     * Initializes a new instance of a CustomGridEditor.
     */
    constructor(flex: wjcGrid.FlexGrid, binding: string, edtClass: any, options: any) {

        // save references
        this._grid = flex;
        this._col = flex.columns.getColumn(binding);

        // create editor
        this._ctl = new edtClass(document.createElement('div'), options);

        // connect grid events
        flex.beginningEdit.addHandler(this._beginningEdit, this);
        flex.sortingColumn.addHandler(() => {
            this._commitRowEdits();
        })
        flex.scrollPositionChanged.addHandler(() => {
            if (this._ctl.containsFocus()) {
                flex.focus();
            }
        });
        flex.selectionChanging.addHandler((s, e: wjcGrid.CellRangeEventArgs) => {
            if (e.row != s.selection.row) {
                this._commitRowEdits();
            }
        });

        // connect editor events
        this._ctl.addEventListener(this._ctl.hostElement, 'keydown', (e: KeyboardEvent) => {
            switch (e.keyCode) {
                case wjcCore.Key.Tab:
                case wjcCore.Key.Enter:
                    e.preventDefault(); // TFS 255685
                    this._closeEditor(true);
                    this._grid.focus();

                    // forward event to the grid so it will move the selection
                    var evt = document.createEvent('HTMLEvents') as any;
                    evt.initEvent('keydown', true, true);
                    'altKey,metaKey,ctrlKey,shiftKey,keyCode'.split(',').forEach((prop) => {
                        evt[prop] = e[prop];
                    });
                    this._grid.hostElement.dispatchEvent(evt);
                    break;

                case wjcCore.Key.Escape:
                    this._closeEditor(false);
                    this._grid.focus();
                    break;
            }
        });

        // close the editor when it loses focus
        this._ctl.lostFocus.addHandler(() => {
            setTimeout(() => { // Chrome/FireFox need a timeOut here... (TFS 138985)
                if (!this._ctl.containsFocus()) {
                    this._closeEditor(true); // apply edits and close editor
                    this._grid.onLostFocus(); // commit item edits if the grid lost focus
                }
            });
        });

        // commit edits when grid loses focus
        this._grid.lostFocus.addHandler(() => {
            setTimeout(() => { // Chrome/FireFox need a timeOut here... (TFS 138985)
                if (!this._grid.containsFocus() && !CustomGridEditor._isEditing) {
                    this._commitRowEdits();
                }
            });
        });

        // open drop-down on f4/alt-down
        this._grid.addEventListener(this._grid.hostElement, 'keydown', (e: KeyboardEvent) => {

            // open drop-down on f4/alt-down
            this._openDropDown = false;
            if (e.keyCode == wjcCore.Key.F4 ||
                (e.altKey && (e.keyCode == wjcCore.Key.Down || e.keyCode == wjcCore.Key.Up))) {
                var colIndex = this._grid.selection.col;
                if (colIndex > -1 && this._grid.columns[colIndex] == this._col) {
                    this._openDropDown = true;
                    this._grid.startEditing(true);
                    e.preventDefault();
                }
            }

            // commit edits on Enter (in case we're at the last row, TFS 268944)
            if (e.keyCode == wjcCore.Key.Enter) {
                this._commitRowEdits();
            }
        }, true);

        // close editor when user resizes the window
        // REVIEW: hides editor when soft keyboard pops up (TFS 326875)
        window.addEventListener('resize', () => {
            if (this._ctl.containsFocus()) {
                this._closeEditor(true);
                this._grid.focus();
            }
        });
    }

    // gets an instance of the control being hosted by this grid editor
    get control() {
        return this._ctl;
    }

    // handle the grid's beginningEdit event by canceling the built-in editor,
    // initializing the custom editor and giving it the focus.
    _beginningEdit(grid: wjcGrid.FlexGrid, args: wjcGrid.CellRangeEventArgs) {

        // check that this is our column
        if (grid.columns[args.col] != this._col) {
            return;
        }

        // check that this is not the Delete key
        // (which is used to clear cells and should not be messed with)
        var evt = args.data;
        if (evt && evt.keyCode == wjcCore.Key.Delete) {
            return;
        }

        // cancel built-in editor
        args.cancel = true;

        // save cell being edited
        this._rng = args.range;
        CustomGridEditor._isEditing = true;

        // initialize editor host
        var rcCell = grid.getCellBoundingRect(args.row, args.col),
            rcBody = document.body.getBoundingClientRect(),
            ptOffset = new wjcCore.Point(-rcBody.left, -rcBody.top),
            zIndex = (args.row < grid.frozenRows || args.col < grid.frozenColumns) ? '3' : '';
            wjcCore.setCss(this._ctl.hostElement, {
            position: 'absolute',
            left: rcCell.left - 1 + ptOffset.x,
            top: rcCell.top - 1 + ptOffset.y,
            width: rcCell.width + 1,
            height: grid.rows[args.row].renderHeight + 1,
            borderRadius: '0px',
            zIndex: zIndex, // TFS 291852
        });

        // initialize editor content
        if (!wjcCore.isUndefined(this._ctl['text'])) {
            this._ctl['text'] = grid.getCellData(this._rng.row, this._rng.col, true);
        } else {
            throw 'Can\'t set editor value/text...';
        }

        // start editing item
        var ecv = grid.editableCollectionView,
            item = grid.rows[args.row].dataItem;
        if (ecv && item && item != ecv.currentEditItem) {
            setTimeout(function () {
                grid.onRowEditStarting(args);
                ecv.editItem(item);
                grid.onRowEditStarted(args);
            }, 50); // wait for the grid to commit edits after losing focus
        }

        // activate editor
        document.body.appendChild(this._ctl.hostElement);
        this._ctl.focus();
        setTimeout(() => {

            // get the key that triggered the editor
            var key = (evt && evt.charCode > 32)
                ? String.fromCharCode(evt.charCode)
                : null;

            // get input element in the control
            var input = <HTMLInputElement>this._ctl.hostElement.querySelector('input');

            // send key to editor
            if (input) {
                if (key) {
                    input.value = key;
                    wjcCore.setSelectionRange(input, key.length, key.length);
                    var evtInput = document.createEvent('HTMLEvents');
                    evtInput.initEvent('input', true, false);
                    input.dispatchEvent(evtInput);
                } else {
                    input.select();
                }
            }

            // give the control focus
            if (!input && !this._openDropDown) {
                this._ctl.focus();
            }

            // open drop-down on F4/alt-down
            if (this._openDropDown && this._ctl instanceof wjcInput.DropDown) {
                this._ctl.isDroppedDown = true;
                this._ctl.dropDown.focus();
            }

        }, 50);
    }

    // close the custom editor, optionally saving the edits back to the grid
    _closeEditor(saveEdits: boolean) {
        if (this._rng) {
            var flexGrid = this._grid,
                ctl = this._ctl,
                host = ctl.hostElement;

            // raise grid's cellEditEnding event
            var e = new wjcGrid.CellEditEndingEventArgs(flexGrid.cells, this._rng);
            flexGrid.onCellEditEnding(e);

            // save editor value into grid
            if (saveEdits) {
                if (!wjcCore.isUndefined(ctl['value'])) {
                    this._grid.setCellData(this._rng.row, this._rng.col, ctl['value']);
                } else if (!wjcCore.isUndefined(ctl['text'])) {
                    this._grid.setCellData(this._rng.row, this._rng.col, ctl['text']);
                } else {
                    throw 'Can\'t get editor value/text...';
                }
                this._grid.invalidate();
            }

            // close editor and remove it from the DOM
            if (ctl instanceof wjcInput.DropDown) {
                ctl.isDroppedDown = false;
            }
            host.parentElement.removeChild(host);
            this._rng = null;
            CustomGridEditor._isEditing = false;

            // raise grid's cellEditEnded event
            flexGrid.onCellEditEnded(e);
        }
    }

    // commit row edits, fire row edit end events (TFS 339615)
    _commitRowEdits() {
        var flexGrid = this._grid,
            ecv = flexGrid.editableCollectionView;
        this._closeEditor(true);
        if (ecv && ecv.currentEditItem) {
            var e = new wjcGrid.CellEditEndingEventArgs(flexGrid.cells, flexGrid.selection);
            ecv.commitEdit();
            setTimeout(() => { // let cell edit events fire first
                flexGrid.onRowEditEnding(e);
                flexGrid.onRowEditEnded(e);
                flexGrid.invalidate();
            });
        }
    }
}