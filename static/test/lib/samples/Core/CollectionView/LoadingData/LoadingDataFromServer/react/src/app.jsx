import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wijmo from '@grapecity/wijmo';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: new wijmo.CollectionView()
        };
    }
    ;
    componentWillMount() {
        wijmo.httpRequest('https://services.odata.org/Northwind/Northwind.svc/Categories', {
            data: {
                $format: 'json',
                $select: 'CategoryID,CategoryName,Description'
            },
            success: (xhr) => {
                // got the data, assign it to the CollectionView
                let response = JSON.parse(xhr.response);
                let data = response.d ? response.d.results : response.value;
                //
                // use the result as the sourceCollection
                this.setState((state) => {
                    state.view.sourceCollection = data;
                    return state;
                });
            }
        });
    }
    render() {
        return <div className="container-fluid">
            {this.state.view.items.map(item => <li key={item.CategoryID}>
                        {item.CategoryID} <b>{item.CategoryName}</b> {item.Description}
                    </li>)}
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
