import * as wjCore from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';
export class AccessibilityExtender {
    constructor(grid) {
        this._step = 5;
        this._g = grid;
        let host = grid.hostElement;
        grid.addEventListener(host, 'keydown', this._keydown.bind(this), true);
        grid.addEventListener(host, 'keypress', this._keypress.bind(this), true);
        this._alert = document.createElement('div');
        this._alert.setAttribute('role', 'alert');
        this._alert.setAttribute('aria-live', 'assertive');
        wjCore.setCss(this._alert, {
            position: 'fixed',
            top: -1000,
            left: -1000
        });
        host.appendChild(this._alert);
    }
    /**
     * Gets or sets a value that determines whether ARIA alerts should
     * be 'polite' or 'assertive'.
     */
    get polite() {
        return this._alert.getAttribute('aria-live') == 'polite';
    }
    set polite(value) {
        this._alert.setAttribute('aria-live', value ? 'polite' : 'assertive');
    }
    /**
     * Gets or sets the size of each resizing step applied when the user
     * presses the alt-left or alt-right keys.
     */
    get resizeStep() {
        return this._step;
    }
    set resizeStep(value) {
        this._step = value;
    }
    /**
     * Issues an ARIA alert.
     * @param msg Message to be issued.
     */
    alert(msg) {
        this._alert.textContent = msg;
    }
    // ** implementation
    // resize columns when the user presses the alt-left or alt-right keys
    _keydown(e) {
        var g = this._g;
        this._ignoreKeyPress = false;
        if (e.altKey && (g.allowResizing & wjGrid.AllowResizing.Columns)) {
            switch (e.keyCode) {
                case wjCore.Key.End: // alt-end auto-sizes selection
                case wjCore.Key.Left: // alt-left decreases width
                case wjCore.Key.Right: // alt-right increases width
                    var sel = g.selection;
                    if (sel.col > -1) {
                        var cols = g.columns, col = cols[sel.col], wid = col.renderWidth, step = this._step * (e.shiftKey ? 2 : 1);
                        if (e.keyCode == wjCore.Key.End) {
                            g.autoSizeColumns(sel.leftCol, sel.rightCol);
                        }
                        else {
                            if (e.keyCode == wjCore.Key.Left) {
                                wid = Math.round(Math.max(step, wid - step));
                            }
                            else if (e.keyCode == wjCore.Key.Right) {
                                wid = Math.round(wid + step);
                            }
                            for (var i = sel.leftCol; i <= sel.rightCol; i++) {
                                if (cols[i].allowResizing) {
                                    cols[i].width = wid;
                                }
                            }
                        }
                    }
                    this._ignoreKeyPress = true;
                    e.preventDefault();
                    break;
            }
        }
    }
    // prevent alt+num key composition
    _keypress(e) {
        if (this._ignoreKeyPress) {
            e.preventDefault();
            this._ignoreKeyPress = false;
        }
    }
}
