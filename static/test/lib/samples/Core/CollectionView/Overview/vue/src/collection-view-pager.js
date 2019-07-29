import { CollectionViewNavigatorBase } from './collection-view-navigator-base';
//
export class CollectionViewPager extends CollectionViewNavigatorBase {
    constructor(element, view) {
        super(element, view);
        this.view.pageChanged.addHandler(() => this.invalidate());
    }
    //
    refresh() {
        super.refresh();
        this._first.disabled = this._prev.disabled = this.view.pageIndex <= 0;
        this._next.disabled = this._last.disabled = this.view.pageIndex >= this.view.pageCount - 1;
        this._input.value = `${this.view.pageIndex + 1} / ${this.view.pageCount}`;
    }
    //
    _onFirstClick() {
        this.view.moveToFirstPage();
    }
    //
    _onPrevClick() {
        this.view.moveToPreviousPage();
    }
    //
    _onNextClick() {
        this.view.moveToNextPage();
    }
    //
    _onLastClick() {
        this.view.moveToLastPage();
    }
}
