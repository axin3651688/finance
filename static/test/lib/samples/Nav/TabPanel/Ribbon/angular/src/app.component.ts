import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';
import * as nav from '@grapecity/wijmo.nav';
//
import { Component, enableProdMode, NgModule, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjNavModule } from '@grapecity/wijmo.angular2.nav';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent implements AfterViewInit {
    @ViewChild('ribbon') private _ribbon: nav.TabPanel;
    @ViewChild('editor') private _editor: ElementRef;
    private _selection: Range;
    //
    ngAfterViewInit() {
        this.execCommand('styleWithCSS', true);
        //
        if (localStorage.editorContent) {
            this._editor.nativeElement.innerHTML = localStorage.editorContent;
        }
        //
        // toggle ribbon content visibility on double-clicks, restore on clicks
        document.querySelector('.wj-tabheaders').addEventListener('dblclick', e => {
            if (!wijmo.hasClass(e.target as Element, 'wj-tabheader')) {
                wijmo.toggleClass(this._ribbon.hostElement, 'hide-content');
            }
        });
        document.querySelector('.wj-tabheaders').addEventListener('click', e => {
            if (wijmo.hasClass(e.target as Element, 'wj-tabheader')) {
                wijmo.toggleClass(this._ribbon.hostElement, 'hide-content', false);
            }
        });
        //
        this._addTooltips(this._ribbon);
        //
        // save/restore editor selection on focus changes
        this._editor.nativeElement.addEventListener('keyup', () => this._selection = this._saveSelection());
        this._editor.nativeElement.addEventListener('mouseup', () => this._selection = this._saveSelection());
        this._editor.nativeElement.addEventListener('focus', () => this._restoreSelection(this._selection));
    }
    //
    // execute editor commands
    execCommand(cmd: string, parm?: any) {
        this._editor.nativeElement.focus();
        document.execCommand(cmd, false, parm);
    }
    //
    showPicker(picker: input.ColorPicker, e: Event) {
        wijmo.showPopup(picker.hostElement, e.target, false, true, false);
        picker.focus();
    }
    hidePicker(picker: input.ColorPicker) {
        wijmo.hidePopup(picker.hostElement);
    }
    //
    onTabPanelClick(e: Event) {
        switch ((e.target as HTMLElement).id) {
            // format group
            case 'save':
                localStorage.editorContent = this._editor.nativeElement.innerHTML;
                alert('Document Saved to Local Storage.');
                break;
            case 'undo':
            case 'redo':
            case 'preview':
            case 'removeFormat':
            case 'cut':
            case 'copy':
            case 'paste':
            case 'selectAll':
                this.execCommand((e.target as HTMLElement).id);
                break;
            //
            // font group
            case 'bold':
            case 'italic':
            case 'underline':
            case 'strikethrough':
            case 'subscript':
            case 'superscript':
                this.execCommand((e.target as HTMLElement).id);
                break;
            //
            case 'click-me':
                alert('Wijmo Ribbon Sample');
        }
    }
    //
    private _addTooltips(ctl: nav.TabPanel) {
        let tt = new wijmo.Tooltip();
        let els = ctl.hostElement.querySelectorAll('[aria-label]');
        for (let i = 0; i < els.length; i++) {
            tt.setTooltip(els[i], els[i].getAttribute('aria-label'));
        }
    }
    //
    private _saveSelection() {
        let sel: Selection = window.getSelection();
        return sel && sel.rangeCount ? sel.getRangeAt(0) : null;
    }
    //
    private _restoreSelection(range: Range) {
        if (range) {
            let sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
}
//
@NgModule({
    imports: [WjNavModule, WjInputModule, BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

