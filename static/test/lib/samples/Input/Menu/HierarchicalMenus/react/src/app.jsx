import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wijmo from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.react.input';
import { getMenuTree } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this._menuTree = getMenuTree();
        this._menuTarget = null;
        this.state = {
            isAnimated: true,
            openOnHover: true
        };
    }
    ;
    componentDidMount() {
        this._menuTarget = this.refs.menuTarget;
    }
    render() {
        return <div className="container-fluid">
            <div className="menubar">
                <wjInput.Menu id="fileMenu" header="File" displayMemberPath="header" subItemsPath="items" showDropDownButton={false} openOnHover={this.state.openOnHover} isAnimated={this.state.isAnimated} itemsSource={this._menuTree.fileMenu} itemClicked={this._menuItemClicked.bind(this)}>
                </wjInput.Menu>

                <wjInput.Menu id="editMenu" header="Edit" displayMemberPath="header" subItemsPath="items" showDropDownButton={false} openOnHover={this.state.openOnHover} isAnimated={this.state.isAnimated} itemsSource={this._menuTree.editMenu} itemClicked={this._menuItemClicked.bind(this)}>
                </wjInput.Menu>

                <wjInput.Menu id="formatMenu" header="Format" displayMemberPath="header" subItemsPath="items" openOnHover={this.state.openOnHover} isAnimated={this.state.isAnimated} itemsSource={this._menuTree.formatMenu} initialized={this._initFormatMenu.bind(this)}>
                </wjInput.Menu>
            </div>

            <p id="menuTarget" ref="menuTarget">
                Wijmo Menus are great!
            </p>

            <label>
                openOnHover
            <input type="checkbox" defaultChecked={this.state.openOnHover} onChange={e => { this._changeOpenOnHover(e.target.checked); }}/>
            </label>
            <label>
                isAnimated
            <input type="checkbox" defaultChecked={this.state.isAnimated} onChange={e => { this._changeAnimation(e.target.checked); }}/>
            </label>
            <label>
                Right-to-Left
            <input type="checkbox" defaultChecked={false} onChange={e => { this._changeRtl(e.target.checked); }}/>
            </label>
        </div>;
    }
    _initFormatMenu(sender) {
        sender.command = {
            executeCommand: (param) => {
                let ts = this._menuTarget.style;
                let cssStyle = window.getComputedStyle(this._menuTarget, null);
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
                                ts.fontSize = (parseFloat(cssStyle.fontSize) * 1.2) + 'px';
                                break;
                            case 'Smaller':
                                ts.fontSize = (parseFloat(cssStyle.fontSize) * .8) + 'px';
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
            canExecuteCommand: (param) => {
                let ts = this._menuTarget.style;
                let cssStyle = window.getComputedStyle(this._menuTarget, null);
                switch (param.prop) {
                    case 'face':
                        return ts.fontFamily != param.header;
                    case 'font':
                        switch (param.header) {
                            case 'Larger':
                                return parseFloat(cssStyle.fontSize) < 24;
                            case 'Smaller':
                                return parseFloat(cssStyle.fontSize) > 8;
                        }
                        break;
                    case 'color':
                    case 'background':
                        let color = param.header.toLowerCase();
                        return ts.color != color && ts.background != color;
                }
                return true;
            }
        };
    }
    _menuItemClicked(sender) {
        this._menuTarget.innerHTML = `Thank you for clicking <b><i>${sender.text}</i></b>!`;
    }
    _changeOpenOnHover(value) {
        this.setState({ openOnHover: value });
    }
    _changeAnimation(value) {
        this.setState({ isAnimated: value });
    }
    _changeRtl(value) {
        let menubar = document.querySelector('.menubar');
        menubar.setAttribute('dir', value ? 'rtl' : 'ltr');
        wijmo.Control.refreshAll(menubar);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
