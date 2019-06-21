import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.getData()
        };
    }
    render() {
        return <div className="container-fluid">
			<wjGrid.FlexGrid deferResizing={true} itemsSource={this.state.data}>
                <wjGrid.FlexGridColumn header="ID" binding="id" width={60} allowResizing={false}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn header="Country" binding="country"></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn header="Sales" binding="sales"></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn header="Expenses" binding="expenses"></wjGrid.FlexGridColumn>
            </wjGrid.FlexGrid>

			<div className="panel panel-warning">
				<div className="panel-heading">
					The grid also allows you to resize multiple columns
					at once. Select a range of columns and press the 'control'
					key while resizing them with the mouse, and all selected
					columns will be resized at once.
				</div>
			</div>
				
			<div className="panel panel-warning">
				<div className="panel-heading">
					Wijmo uses the HTML5 drag/drop API for column resizing.
					Unfortunately, most mobile devices do not support this API.
					If you want to support column resizing on mobile devices,
					we suggest you use the 
					<a href="https://github.com/Bernardo-Castilho/dragdroptouch" target="_blank">
						DragDropTouch polyfill
					</a>.
				</div>
			</div>
        </div>;
    }
    getData() {
        // generate some random data
        let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','), data = [];
        for (let i = 0; i < countries.length; i++) {
            data.push({
                id: i,
                country: countries[i],
                downloads: Math.round(Math.random() * 20000),
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000
            });
        }
        return data;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
