import * as wijmo from '@grapecity/wijmo';
//
export class ItemEditor extends wijmo.Control {
    //
    constructor(element, view) {
        wijmo.assert(!!view, 'view must not be null.');
        //
        super(element);
        //
        this.applyTemplate('', this.getTemplate(), {
            _tbId: 'id',
            _tbCountry: 'country',
            _tbColor: 'color',
            _tbAmount: 'amount',
            _btnEdit: 'edit',
            _btnAdd: 'add',
            _btnDelete: 'delete',
            _btnCommit: 'commit',
            _btnCancel: 'cancel'
        });
        //
        this._btnEdit.addEventListener('click', () => this._edit());
        this._btnAdd.addEventListener('click', () => this._add());
        this._btnDelete.addEventListener('click', () => this._remove());
        this._btnCommit.addEventListener('click', () => this._commit());
        this._btnCancel.addEventListener('click', () => this._cancel());
        //
        this._view = view;
        this._view.currentChanged.addHandler(() => this.invalidate());
        //
        this.invalidate();
    }
    refresh() {
        super.refresh();
        //
        let cur = this._view.currentItem, edit = this._isEditing();
        //
        this._tbId.disabled = !edit;
        this._tbCountry.disabled = !edit;
        this._tbColor.disabled = !edit;
        this._tbAmount.disabled = !edit;
        //
        this._tbId.value = cur ? cur.id.toString() : '';
        this._tbCountry.value = cur ? cur.country.toString() : '';
        this._tbColor.value = cur ? cur.color.toString() : '';
        this._tbAmount.value = cur ? cur.amount.toString() : '';
        //
        let display = edit ? 'none' : '';
        this._btnEdit.style.display = display;
        this._btnAdd.style.display = display;
        this._btnDelete.style.display = display;
        //
        display = edit ? '' : 'none';
        this._btnCommit.style.display = display;
        this._btnCancel.style.display = display;
    }
    //
    _isEditing() {
        return this._view.isEditingItem || this._view.isAddingNew;
    }
    //
    _edit() {
        this._view.editItem(this._view.currentItem);
        this.invalidate();
    }
    //
    _add() {
        this._view.addNew();
    }
    //
    _remove() {
        this._view.remove(this._view.currentItem);
    }
    //
    _commit() {
        let cur = this._view.currentItem;
        //
        cur.id = this._tbId.value;
        cur.country = this._tbCountry.value;
        cur.color = this._tbColor.value;
        cur.amount = this._tbAmount.value;
        // 
        this._view.commitEdit();
        this._view.commitNew();
        this.invalidate();
    }
    //
    _cancel() {
        this._view.cancelEdit();
        this._view.cancelNew();
        this.invalidate();
    }
}
ItemEditor.controlTemplate = `<dl class="dl-horizontal">
            <dt>ID</dt>
            <dd>
                <input type="text" class="form-control" wj-part="id" />
            </dd>
            <dt>Country</dt>
            <dd>
                <input type="text" class="form-control" wj-part="country" />
            </dd>
            <dt>Color</dt>
            <dd>
                <input type="text" class="form-control" wj-part="color" />
            </dd>
            <dt>Amount</dt>
            <dd>
                <input type="number" class="form-control" wj-part="amount" />
            </dd>
            <dt></dt>
            <dd>
                <div class="btn-group data-btn-group">
                    <button class="btn btn-default btn-sm" wj-part="edit">Edit</button>
                    <button class="btn btn-default btn-sm" wj-part="add">Add</button>
                    <button class="btn btn-default btn-sm" wj-part="delete">Delete</button>
                    <button class="btn btn-default btn-sm" wj-part="commit">Commit</button>
                    <button class="btn btn-default btn-sm" wj-part="cancel">Cancel</button>
                </div>
            </dd>
        </dl>`;
