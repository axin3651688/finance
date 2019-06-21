import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjCore from "@grapecity/wijmo";
import * as wjcGrid from "@grapecity/wijmo.react.grid";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }
    componentDidMount() {
        this.setState({
            data: this._getData()
        });
    }
    render() {
        return <div className="container-fluid">
            <wjcGrid.FlexGrid alternatingRowStep={0} headersVisibility="Column" itemsSource={this.state.data} initialized={this.initializeGrid.bind(this)}></wjcGrid.FlexGrid>
            <div id="pager" className="wj-control wj-content wj-pager">
                <div className="wj-input-group">
                    <span className="wj-input-group-btn">
                        <button id="btnFirst" type="button" className="wj-btn wj-btn-default">
                            <span className="wj-glyph-left"></span>
                            <span className="wj-glyph-left"></span>
                        </button>
                    </span>
                    <span className="wj-input-group-btn">
                        <button id="btnPrev" type="button" className="wj-btn wj-btn-default">
                            <span className="wj-glyph-left"></span>
                        </button>
                    </span>
                    <input id="spanCurrent" disabled={true} type="text" className="wj-form-control"/>
                    <span className="wj-input-group-btn">
                        <button id="btnNext" type="button" className="wj-btn wj-btn-default">
                            <span className="wj-glyph-right"></span>
                        </button>
                    </span>
                    <span className="wj-input-group-btn">
                        <button id="btnLast" type="button" className="wj-btn wj-btn-default">
                            <span className="wj-glyph-right"></span>
                            <span className="wj-glyph-right"></span>
                        </button>
                    </span>
                </div>
            </div>
        </div>;
    }
    initializeGrid(flex) {
        this.data = this._getData();
    }
    _getData() {
        let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(',');
        let products = 'Piano,Violin,Flute,Guitar,Cello'.split(',');
        let data = [];
        for (let i = 0; i < 10000; i++) {
            data.push({
                id: i,
                country: countries[i % countries.length],
                product: products[i % products.length],
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000
            });
        }
        // create a CollectionView with 20 items per page
        let view = new wjCore.CollectionView(data, {
            pageSize: 6,
            pageChanged: updateCurrentPage
        });
        //
        // update pager status
        view.onPageChanged();
        function updateCurrentPage() {
            var curr = wjCore.format('Page {index: n0} of {cnt: n0}', {
                index: view.pageIndex + 1,
                cnt: view.pageCount
            });
            document.getElementById('spanCurrent').value = curr;
        }
        document.getElementById('pager').addEventListener('click', function (e) {
            var btn = wjCore.closest(e.target, 'button');
            var id = btn ? btn.id : '';
            switch (id) {
                case 'btnFirst':
                    view.moveToFirstPage();
                    break;
                case 'btnPrev':
                    view.moveToPreviousPage();
                    break;
                case 'btnNext':
                    view.moveToNextPage();
                    break;
                case 'btnLast':
                    view.moveToLastPage();
                    break;
            }
        });
        // done
        return view;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
