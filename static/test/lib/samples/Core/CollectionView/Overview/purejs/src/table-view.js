import * as wijmo from '@grapecity/wijmo';
//
export class TableView extends wijmo.Control {
    //
    constructor(selector, view, format) {
        super(selector);
        //
        this.applyTemplate('table-responsive', this.getTemplate(), {
            _table: 'table'
        });
        this._format = format || {};
        //
        this._view = view;
        this._view.collectionChanged.addHandler(() => this.invalidate());
        this._view.currentChanged.addHandler(() => this.invalidate());
        //
        this.invalidate();
    }
    //
    refresh() {
        this._table.innerHTML = '';
        //
        // create header
        if (this._view.itemCount > 0) {
            let item = this._view.items[0], head = this._table.createTHead(), row = head.insertRow();
            //
            row.className = 'active';
            Object.keys(item).forEach(key => {
                let cell = document.createElement('th');
                cell.className = 'text-center';
                //
                // header text
                let txt = document.createTextNode(wijmo.toHeaderCase(key) + '\u00A0'); // + &nbsp;
                cell.appendChild(txt);
                //
                // sort button
                let btn = document.createElement('button');
                btn.className = 'btn btn-default';
                btn.textContent = this._getSort(key);
                btn.addEventListener('click', () => this._toggleSort(key));
                cell.appendChild(btn);
                //
                row.appendChild(cell);
            });
        }
        //
        // create body
        let body = this._table.createTBody();
        this._view.items.forEach(item => {
            let row = body.insertRow();
            //
            if (item == this._view.currentItem) {
                row.className = 'success';
            }
            //
            row.addEventListener('click', () => this._moveCurrentTo(row, item));
            //
            Object.keys(item).forEach(key => {
                let cell = row.insertCell(), fmt = this._format[key], val = item[key];
                //
                cell.textContent = fmt ? wijmo.format(`{val:${fmt}}`, { val: val }) : val;
                cell.className = 'text-center';
            });
        });
    }
    //
    _moveCurrentTo(row, item) {
        if (!this._isEditingView && !this._isGroupRow(item)) {
            this._view.moveCurrentTo(item);
        }
    }
    //
    get _isEditingView() {
        return this._view.isEditingItem || this._view.isAddingNew;
    }
    //
    _isGroupRow(item) {
        return item instanceof wijmo.CollectionViewGroup;
    }
    //
    _getSort(field) {
        let sd = this._view.sortDescriptions;
        //
        if (sd.length > 0 && sd[0].property === field) {
            return sd[0].ascending ? '▲' : '▼';
        }
        //
        return '◇';
    }
    //
    _toggleSort(field) {
        let sd = this._view.sortDescriptions, ascending = true;
        //
        if (sd.length > 0 && sd[0].property === field) {
            ascending = !sd[0].ascending;
        }
        //
        // remove any old sort descriptors and add the new one
        sd.splice(0, sd.length, new wijmo.SortDescription(field, ascending));
    }
}
TableView.controlTemplate = '<table class="table table-condensed table-bordered" wj-part="table"></table>';
