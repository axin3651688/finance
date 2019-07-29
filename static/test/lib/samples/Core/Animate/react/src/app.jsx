import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wijmo from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.animate = () => {
            wijmo.animate((pct) => {
                //
                // calculate transform for given percent (zero to one)
                let xform = '';
                if (pct < 1) {
                    if (pct > 0.5)
                        pct = pct - 1;
                    xform = 'rotateY( ' + (pct * 180) + 'deg)';
                }
                //
                // apply the transform to the grid element
                this.state.control.hostElement.style.transform = xform;
            }, 2000); // animate for two seconds
        };
        this.initialized = (control) => {
            this.setState({ control: control });
        };
        this.state = {
            data: getData(),
            control: {}
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <button className="btn btn-default" onClick={this.animate}>
                Flip the Grid
            </button>

            <wjGrid.FlexGrid itemsSource={this.state.data} initialized={this.initialized}>
            </wjGrid.FlexGrid>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
