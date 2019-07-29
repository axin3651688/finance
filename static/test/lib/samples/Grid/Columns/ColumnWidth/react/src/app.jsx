import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(500)
        };
    }
    render() {
        return <div className="container-fluid">
            <h4>
					Example 1:
			</h4>
			<p>
					This grid has four columns. The first is 80 pixels wide and can be resized between
					40 and 160 pixels. The other three have widths of 2*, *, and *, and cannot be
					resized using the mouse.
			</p>
			<p>
					Notice that the second column is twice as wide as the third and fourth columns, and that
					they keep these proportions even as you resize the first column or the whole grid.
			</p>
            
            <wjGrid.FlexGrid itemsSource={this.state.data}>
                <wjGrid.FlexGridColumn header="Date" binding="start" width={80} minWidth={40} maxWidth={160}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn header="Product" binding="product" width="2*" allowResizing={false}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn header="Revenue" binding="amount" width="*" allowResizing={false}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn header="Expense" binding="amount2" format="n0" width="*" allowResizing={false}></wjGrid.FlexGridColumn>
            </wjGrid.FlexGrid>
            <br />
			<br />
			<h4>
					Example 2:
			</h4>
			<p>
					This grid shows how you can make any column stretch to fill the available space. In this case,
					we set the width of the second column to * to achieve that effect.
			</p>
			<p>
					We also set the minimum width of the second column to 100 pixels in order to prevent it from
					getting too narrow when the other columns in the grid are resized, and we prevent users from
					resizing this column with the mouse.
			</p>

            <wjGrid.FlexGrid itemsSource={this.state.data}>
                <wjGrid.FlexGridColumn header="Date" binding="start" width={80}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn header="Product" binding="product" width="*" minWidth={100} allowResizing={false}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn header="Revenue" binding="amount" format="n0" width={120}></wjGrid.FlexGridColumn>
            </wjGrid.FlexGrid>

            <br />
			<br />
			<h4>
					Example 3:
			</h4>
			<p>
					This example sets all widths to *, which means the space available is divided equally among them.
					Resize the browser and notice how the grid resizes and the columns fill it up equally.
			</p>
			<p>
					Also, unlike the other examples, this one sets the allowResizing property of the entire grid rather
					than an individual column. We set this one to None, but you may also choose Columns, Rows, or Both.
			</p>
            <wjGrid.FlexGrid itemsSource={this.state.data}>
                <wjGrid.FlexGridColumn header="Date" binding="start" width="*"></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn header="Product" binding="product" width="*" minWidth={100}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn header="Revenue" binding="amount" format="n0" width="*"></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn header="Expense" binding="amount2" format="n0" width="*"></wjGrid.FlexGridColumn>
            </wjGrid.FlexGrid>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
