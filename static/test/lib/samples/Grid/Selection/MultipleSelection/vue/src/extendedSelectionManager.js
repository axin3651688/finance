import * as wjCore from '@grapecity/wijmo';

export function ExtendedSelectionManager(flex){
    let _this = this;
    this._selRanges = new wjCore.ObservableArray();
    this._extending = false;
    // start/end extended selection mode
    flex.addEventListener(flex.hostElement, 'mousedown', function (e) {
        _this._extending = e.button == 0 && (e.ctrlKey || e.metaKey);
        if (!_this._extending && _this._selRanges.length) {
            _this._selRanges.clear();
        }
    }, true);
    // end extended selection mode
    flex.addEventListener(flex.hostElement, 'mouseup', function (e) {
        _this._extending = false;
    });
    // extend selection when selection is changing
    flex.selectionChanging.addHandler(function (s, e) {
        if (_this._extending) {
            var xrng = _this._selRanges, curr = e.range, last = xrng.length ? xrng[xrng.length - 1] : null;
            if (last && curr.intersects(last)) {
                xrng.setAt(xrng.length - 1, curr);
            }
            else {
                _this._selRanges.push(curr);
            }
        }
    });
    // clear extended selection after a selection change
    flex.selectionChanged.addHandler(function (s, e) {
        var xrng = _this._selRanges;
        if (!_this._extending && xrng.length) {
            xrng.clear();
        }
    });
    // apply selected style to a cell
    flex.formatItem.addHandler(function (s, e) {
        if (e.panel == flex.cells) {
            _this._updateCellStyle(e.row, e.col, e.cell);
        }
    });
    // update selection styles when extended selections change
    this._selRanges.collectionChanged.addHandler(function () {
        setTimeout(function () {
            var rng = flex.viewRange;
            for (var r = rng.row; r <= rng.row2; r++) {
                for (var c = rng.col; c <= rng.col2; c++) {
                    var cell = flex.cells.getCellElement(r, c);
                    _this._updateCellStyle(r, c, cell);
                }
            }
        });
    });
}
Object.defineProperty(ExtendedSelectionManager.prototype, "selectedRanges", {
    // gets the array of selected ranges
    get: function () {
        return this._selRanges;
    },
    enumerable: true,
    configurable: true
});
// update the selected style for a given cell
ExtendedSelectionManager.prototype._updateCellStyle = function (r, c, cell) {
    var selected = false;
    for (var i = 0; i < this._selRanges.length && !selected; i++) {
        selected = this._selRanges[i].contains(r, c);
    }
    wjCore.toggleClass(cell, 'extended-selection', selected);
};
