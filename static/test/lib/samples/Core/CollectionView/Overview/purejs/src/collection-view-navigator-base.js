import * as wijmo from '@grapecity/wijmo';
export class CollectionViewNavigatorBase extends wijmo.Control {
    //
    constructor(element, view) {
        wijmo.assert(!!view, 'view must not be null.');
        //
        super(element);
        //
        this.applyTemplate('wj-control wj-content wj-pager', this.getTemplate(), {
            _first: 'first',
            _prev: 'prev',
            _next: 'next',
            _last: 'last',
            _input: 'input'
        });
        //
        this._first.addEventListener('click', () => this._onFirstClick());
        this._prev.addEventListener('click', () => this._onPrevClick());
        this._next.addEventListener('click', () => this._onNextClick());
        this._last.addEventListener('click', () => this._onLastClick());
        //
        this._view = view;
        this._view.collectionChanged.addHandler(() => this.invalidate());
        this.invalidate();
    }
    //
    get view() {
        return this._view;
    }
}
CollectionViewNavigatorBase.controlTemplate = `<div class="wj-input-group">
            <span class="wj-input-group-btn" >
                <button class="wj-btn wj-btn-default" type="button" wj-part="first">
                    <span class="wj-glyph-left" style="margin-right: -4px;"></span>
                    <span class="wj-glyph-left"></span>
                </button>
            </span>
            <span class="wj-input-group-btn" >
                <button class="wj-btn wj-btn-default" type="button" wj-part="prev">
                    <span class="wj-glyph-left"></span>
                </button>
            </span>
            <input type="text" class="wj-form-control" wj-part="input" disabled />
            <span class="wj-input-group-btn" >
                <button class="wj-btn wj-btn-default" type="button" wj-part="next">
                    <span class="wj-glyph-right"></span>
                </button>
            </span>
            <span class="wj-input-group-btn" >
                <button class="wj-btn wj-btn-default" type="button" wj-part="last">
                    <span class="wj-glyph-right"></span>
                    <span class="wj-glyph-right" style="margin-left: -4px;"></span>
                </button>
            </span>
        </div>`;
