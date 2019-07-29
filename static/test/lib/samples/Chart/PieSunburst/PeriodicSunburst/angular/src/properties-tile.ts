import * as wijmo from '@grapecity/wijmo'
import { TElementInfo } from './app.data';
//
export class PropertiesTile extends wijmo.Control {
    static controlTemplate =
        `<div wj-part="group-info">
            <span wj-part="group-name" class="group-name"></span>
            <span class="subgroups-title">Subgroups</span>
            <span wj-part="subGroup-listing"></span>
        </div>
        <div wj-part="subGroup-info">
            <span wj-part="subGroup-name" class="subGroup-name"></span>
            <span class="element-number-overview">No. of elements: <span wj-part="num-elements"
                class="num-elements"></span></span>
            <span class="characteristics-title">Characteristics</span>
            <span wj-part="characteristic-listing"></span>
        </div>
        <div wj-part="element-info">
            <span wj-part="element-symbol" class="element-symbol"></span>
            <span wj-part="element-name" class="element-name"></span>
            <span>Atomic number: <span wj-part="atomic-number"></span></span>
            <span>Atomic weight: <span wj-part="atomic-weight"></span></span>
        </div>`;
    //
    private readonly newLine = '<br />';
    //
    _groupInfo: HTMLElement;
    _groupName: HTMLElement;
    _subGroupListing: HTMLElement;
    _subGroupInfo: HTMLElement;
    _subGroupName: HTMLElement;
    _numElements: HTMLElement;
    _characteristicListing: HTMLElement;
    _elInfo: HTMLElement;
    _elSymbol: HTMLElement;
    _elName: HTMLElement;
    _atomicNumber: HTMLElement;
    _atomicWeight: HTMLElement;
    //
    private _owner: wijmo.Control;
    //
    constructor(element: any, owner: wijmo.Control) {
        super(element, null, true);
        //
        this._owner = owner;
        //
        this.applyTemplate('properties-tile', this.getTemplate(), {
            _groupInfo: 'group-info',
            _groupName: 'group-name',
            _subGroupListing: 'subGroup-listing',
            _subGroupInfo: 'subGroup-info',
            _subGroupName: 'subGroup-name',
            _numElements: 'num-elements',
            _characteristicListing: 'characteristic-listing',
            _elInfo: 'element-info',
            _elSymbol: 'element-symbol',
            _elName: 'element-name',
            _atomicNumber: 'atomic-number',
            _atomicWeight: 'atomic-weight'
        });
    }
    //
    showInfo(info: wijmo.CollectionViewGroup | TElementInfo) {
        if (!info) {
            // This will happen when the user clicks "randomly" on the page - hide the tile
            this._hide();
            return;
        }
        //
        // The user selected something on the chart, display the appropriate info
        // Hide all of the panes initially
        this._groupInfo.style.display = 'none';
        this._subGroupInfo.style.display = 'none';
        this._elInfo.style.display = 'none';
        //
        if (info instanceof wijmo.CollectionViewGroup) {
            if (info.groups.length) { // info object is a Group
                this._groupName.innerText = info.name;
                this._subGroupListing.innerHTML = '';
                //
                // Show all SubGroups and the number of elements in each
                info.groups.forEach(g => {
                    this._subGroupListing.innerHTML += `${g.name} (${g.items.length})${this.newLine}`;
                });
                //
                this._groupInfo.style.display = 'block'; // show the group info pane
            } else if (info.items) { // info object is a SubGroup so show the number of elements and properties
                this._subGroupName.innerText = info.name;
                this._numElements.innerText = info.items.length.toString();
                this._characteristicListing.innerHTML = '';
                //
                // Split the characteristics up so we can display them as a list
                (<string>(<any>info).elementProperties).split(',').forEach(str => {
                    this._characteristicListing.innerHTML += str + this.newLine;
                });
                //
                this._subGroupInfo.style.display = 'block'; // show the subGroup info pane
            }
        } else { // the info object is an Element, display its props
            this._elSymbol.innerText = info.symbol;
            this._elName.innerText = info.element;
            this._atomicNumber.innerText = info['atomic-number'];
            this._atomicWeight.innerText = Number(info['atomic-weight']).toFixed(2);
            this._elInfo.style.display = 'block'; // show element info pane
        }
        //
        this._centerInParent();
        this._show();
    }
    //
    protected _handleResize() {
        this._centerInParent();
    }
    //
    // Centers the properties tile element in its parent container
    private _centerInParent() {
        let host = this.hostElement,
            parent = this._owner.hostElement;
        //
        host.style.top = (parent.offsetHeight / 2) - (host.offsetHeight / 2) + 'px';
        host.style.left = (parent.offsetWidth / 2) - (host.offsetWidth / 2) + 'px';
    }
    //
    // Shows the properties tile element by changing its visibility style
    private _show() {
        this.hostElement.style.visibility = 'visible';
    }
    //
    // Hides the properties tile element by changing its visibility style
    private _hide() {
        this.hostElement.style.visibility = 'hidden';
    }
}