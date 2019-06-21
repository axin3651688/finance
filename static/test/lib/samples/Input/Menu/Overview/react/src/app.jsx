import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjInput from '@grapecity/wijmo.react.input';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.menuItemClicked = (menu) => {
            alert(`You selected option **${menu.selectedIndex}** from menu **${menu.header}**`);
        };
        this.state = {
            itemSourceFile: [
                '<div><span class="glyphicon glyphicon-asterisk"></span>&nbsp;&nbsp;<b>New</b><br><small><i>create a new file</i></small></div>',
                '<div><span class="glyphicon glyphicon-folder-open"></span>&nbsp;&nbsp;<b>Open</b><br><small><i>open an existing file or folder</i></small></div>',
                '<div><span class="glyphicon glyphicon-floppy-disk"></span>&nbsp;&nbsp;<b>Save</b><br><small><i>save the current file</i></small></div>',
                '<div class="wj-separator"></div>',
                '<div><span class="glyphicon glyphicon-remove"></span>&nbsp;&nbsp;<b>Exit</b><br><small><i>exit the application</i></small></div>'
            ],
            itemSourceEdit: [
                '<div><span class="glyphicon glyphicon-scissors"></span>&nbsp;&nbsp;<b>Cut</b><br><small><i>move the current selection to the clipboard</i></small></div>',
                '<div><span class="glyphicon glyphicon-copy"></span>&nbsp;&nbsp;<b>Copy</b><br><small><i>copy the current selection to the clipboard</i></small></div>',
                '<div><span class="glyphicon glyphicon-paste"></span>&nbsp;&nbsp;<b>Paste</b><br><small><i>insert clipboard content at the cursor position</i></small></div>'
            ]
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <wjInput.Menu header="File" itemClicked={this.menuItemClicked} itemsSource={this.state.itemSourceFile}>
            </wjInput.Menu>

            <wjInput.Menu header="Edit" itemClicked={this.menuItemClicked} itemsSource={this.state.itemSourceEdit}>
            </wjInput.Menu>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
