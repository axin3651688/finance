import { CollectionViewNavigatorBase } from './collection-view-navigator-base';
//
export class CollectionViewNavigator extends CollectionViewNavigatorBase {
    constructor(element, view) {
        super(element, view);
        this.view.currentChanged.addHandler(() => this.invalidate());
    }
    //
    refresh() {
        super.refresh();
        this._first.disabled = this._prev.disabled = this.view.currentPosition <= 0;
        this._next.disabled = this._last.disabled = this.view.currentPosition >= this.view.itemCount - 1;
        this._input.value = `${this.view.currentPosition + 1} / ${this.view.itemCount}`;
    }
    //
    _onFirstClick() {
        this.view.moveCurrentToFirst();
    }
    //
    _onPrevClick() {
        this.view.moveCurrentToPrevious();
    }
    //
    _onNextClick() {
        this.view.moveCurrentToNext();
    }
    //
    _onLastClick() {
        this.view.moveCurrentToLast();
    }
}
