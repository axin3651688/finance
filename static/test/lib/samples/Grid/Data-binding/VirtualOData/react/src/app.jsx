import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjcCore from "@grapecity/wijmo";
import * as wjcGrid from "@grapecity/wijmo.grid";
import * as wjcOData from "@grapecity/wijmo.odata";
import * as wjGrid from '@grapecity/wijmo.react.grid';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderDetails: new wjcOData.ODataCollectionView("https://services.odata.org/Northwind/Northwind.svc", "Order_Details_Extendeds"),
            virtualOrderDetails: new wjcOData.ODataVirtualCollectionView("https://services.odata.org/Northwind/Northwind.svc", "Order_Details_Extendeds", {
                loaded: (sender, e) => {
                    this.setState({
                        totalItemCount: wjcCore.format("{totalItemCount:n0} items", sender)
                    });
                }
            }),
            itemCount: "",
            totalItemCount: ""
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="col-sm-6">
				<h4>ODataCollectionView</h4>
				<p>{this.state.itemCount}</p>
				<wjGrid.FlexGrid itemsSource={this.state.orderDetails} isReadOnly={true} initialized={this.gridInitialized.bind(this)}>
				</wjGrid.FlexGrid>
			</div>

		 	<div className="col-sm-6">
				<h4>ODataVirtualCollectionView</h4>
				<p>{this.state.totalItemCount}</p>
				<wjGrid.FlexGrid itemsSource={this.state.virtualOrderDetails} isReadOnly={true} initialized={this.virtualGridInitialized.bind(this)}> 
				</wjGrid.FlexGrid>
			</div> 
        </div>;
    }
    gridInitialized(flexgrid) {
        flexgrid.formatItem.addHandler((s, e) => {
            // show row indices in row headers
            if (e.panel.cellType == wjcGrid.CellType.RowHeader) {
                e.cell.textContent = (e.row + 1).toString();
            }
        });
        flexgrid.loadedRows.addHandler((sender, e) => {
            this.setState({
                itemCount: wjcCore.format("{length:n0} items", sender.rows)
            });
        });
    }
    virtualGridInitialized(flexgrid) {
        flexgrid.formatItem.addHandler((s, e) => {
            // show row indices in row headers
            if (e.panel.cellType == wjcGrid.CellType.RowHeader) {
                e.cell.textContent = (e.row + 1).toString();
            }
        });
        flexgrid.scrollPositionChanged.addHandler(() => {
            let rng = flexgrid.viewRange;
            this.state.virtualOrderDetails.setWindow(rng.row, rng.row2);
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
