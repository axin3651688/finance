import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjcCore from '@grapecity/wijmo';
import * as wjcGrid from "@grapecity/wijmo.react.grid";
import * as wjcOData from '@grapecity/wijmo.odata';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }
    render() {
        return <div className="container-fluid">
            <wjcGrid.FlexGrid isReadOnly={true} alternatingRowStep={0} headersVisibility="Column" itemsSource={this.state.data} initialized={this.initializeGrid.bind(this)}>
            </wjcGrid.FlexGrid>
            <div id="pagerOd" className="wj-control wj-content wj-pager">
                <div className="wj-input-group">
                    <span className="wj-input-group-btn">
                        <button id="btnFirstOd" type="button" className="wj-btn wj-btn-default">
                            <span className="wj-glyph-left"></span>
                            <span className="wj-glyph-left"></span>
                        </button>
                    </span>
                    <span className="wj-input-group-btn">
                        <button id="btnPrevOd" type="button" className="wj-btn wj-btn-default">
                            <span className="wj-glyph-left"></span>
                        </button>
                    </span>
                    <input id="spanCurrentOd" disabled={true} type="text" className="wj-form-control"/>
                    <span className="wj-input-group-btn">
                        <button id="btnNextOd" type="button" className="wj-btn wj-btn-default">
                            <span className="wj-glyph-right"></span>
                        </button>
                    </span>
                    <span className="wj-input-group-btn">
                        <button id="btnLastOd" type="button" className="wj-btn wj-btn-default">
                            <span className="wj-glyph-right"></span>
                            <span className="wj-glyph-right"></span>
                        </button>
                    </span>
                </div>
            </div>
        </div>;
    }
    initializeGrid(flex) {
        var url = 'https://services.odata.org/Northwind/Northwind.svc';
        var viewOd = new wjcOData.ODataCollectionView(url, 'Customers', {
            pageSize: 6,
            pageOnServer: true,
            sortOnServer: true,
            pageChanged: updateCurrentPageOd,
            loaded: updateCurrentPageOd
        });
        this.setState({
            data: viewOd
        });
        // update pager status
        viewOd.onPageChanged();
        function updateCurrentPageOd() {
            var curr = wjcCore.format('Page {index:n0} of {cnt:n0}', {
                index: viewOd.pageIndex + 1,
                cnt: viewOd.pageCount
            });
            document.getElementById('spanCurrentOd').value = curr;
        }
        //
        // implement pager
        document.getElementById('pagerOd').addEventListener('click', function (e) {
            var btn = wjcCore.closest(e.target, 'button');
            var id = btn ? btn.id : '';
            switch (id) {
                case 'btnFirstOd':
                    viewOd.moveToFirstPage();
                    break;
                case 'btnPrevOd':
                    viewOd.moveToPreviousPage();
                    break;
                case 'btnNextOd':
                    viewOd.moveToNextPage();
                    break;
                case 'btnLastOd':
                    viewOd.moveToLastPage();
                    break;
            }
        });
    }
    _getData() {
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
