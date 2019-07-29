import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wijmo from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.react.grid';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    ;
    componentWillMount() {
        wijmo.httpRequest("https://services.odata.org/Northwind/Northwind.svc/Categories", {
            data: {
                $format: "json",
                $select: "CategoryID,CategoryName,Description"
            },
            success: (xhr) => {
                this.setState({ data: JSON.parse(xhr.responseText).value });
            }
        });
    }
    render() {
        return <div className="container-fluid">
            {this.state.data
            ? (<wjGrid.FlexGrid isReadOnly={true} itemsSource={this.state.data}>
                        <wjGrid.FlexGridColumn binding="CategoryID">
                        </wjGrid.FlexGridColumn>
                        <wjGrid.FlexGridColumn binding="CategoryName">
                        </wjGrid.FlexGridColumn>
                        <wjGrid.FlexGridColumn binding="Description" width="*">
                        </wjGrid.FlexGridColumn>
                    </wjGrid.FlexGrid>)
            : null}
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
