import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';
//
import { Component, enableProdMode, ElementRef, NgModule, Inject, ViewChild, OnInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { DataService, TMenuTree, TMenuItem } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent implements OnInit {
    @ViewChild('menuTarget') private _menuTarget: ElementRef; // element used to show menu commands
    @ViewChild('fileMenu') private _fileMenu: input.Menu;
    @ViewChild('editMenu') private _editMenu: input.Menu;
    @ViewChild('formatMenu') private _formatMenu: input.Menu;
    private _rtl = false;
    //
    menuTree: TMenuTree;
    isAnimated = true;
    openOnHover = true;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.menuTree = dataService.getMenuTree();
    }
    // 
    get rtl(): boolean {
        return this._rtl;
    }
    set rtl(value: boolean) {
        let menubar = <HTMLElement>document.querySelector('.menubar');
        menubar.setAttribute('dir', (this._rtl = value) ? 'rtl' : 'ltr');
        wijmo.Control.refreshAll(menubar);
    }
    //
    ngOnInit() {
        this._fileMenu.itemClicked.addHandler(this.menuItemClicked.bind(this));
        this._editMenu.itemClicked.addHandler(this.menuItemClicked.bind(this));
        this._formatMenu.command = this.formatMenuCommand;
    }
    //
    menuItemClicked(menu: input.Menu) {
        this._menuTarget.nativeElement.innerHTML = `Thank you for clicking <b><i>${menu.text}</i></b>!`;
    }
    //
    formatMenuCommand = {
        executeCommand: (param: TMenuItem) => {
            let ts = this._menuTarget.nativeElement.style;
            let cs = getComputedStyle(this._menuTarget.nativeElement);
            //
            switch (param.prop) {
                case 'face':
                    ts.fontFamily = param.header;
                    break;
                case 'font':
                    switch (param.header) {
                        case 'Bold':
                            ts.fontWeight = ts.fontWeight ? '' : 'bold';
                            break;
                        case 'Italic':
                            ts.fontStyle = ts.fontStyle ? '' : 'italic';
                            break;
                        case 'Underline':
                            ts.textDecoration = ts.textDecoration ? '' : 'underline';
                            break;
                        case 'Larger':
                            ts.fontSize = (parseFloat(cs.fontSize) * 1.2) + 'px';
                            break;
                        case 'Smaller':
                            ts.fontSize = (parseFloat(cs.fontSize) * .8) + 'px';
                            break;
                    }
                    break;
                case 'color':
                    ts.color = param.header.toLowerCase();
                    break;
                case 'background':
                    ts.background = param.header.toLowerCase();
                    break;
            }
        },
        canExecuteCommand: (param: TMenuItem) => {
            let ts = this._menuTarget.nativeElement.style;
            let cs = getComputedStyle(this._menuTarget.nativeElement);
            //
            switch (param.prop) {
                case 'face':
                    return ts.fontFamily != param.header;
                case 'font':
                    switch (param.header) {
                        case 'Larger':
                            return parseFloat(cs.fontSize) < 24;
                        case 'Smaller':
                            return parseFloat(cs.fontSize) > 8;
                    }
                    break;
                case 'color':
                case 'background':
                    let color = param.header.toLowerCase();
                    return ts.color != color && ts.background != color;
            }
            return true;
        }
    }
}
//
@NgModule({
    imports: [WjInputModule, FormsModule, BrowserModule],
    declarations: [AppComponent],
    providers: [DataService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

