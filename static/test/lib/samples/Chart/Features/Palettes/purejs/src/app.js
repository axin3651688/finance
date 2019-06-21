import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjChart from '@grapecity/wijmo.chart';
import * as wjInput from '@grapecity/wijmo.input';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the chart
    let theChart = new wjChart.FlexChart('#theChart', {
        header: 'Country GDP',
        itemsSource: getData(),
        bindingX: 'country',
        series: [
            { binding: '2014', name: '2014' },
            { binding: '2015', name: '2015' },
            { binding: '2016', name: '2016' }
        ]
    });
    //
    // select the chart palette
    let thePalette = new wjInput.ComboBox('#thePalette', {
        itemsSource: 'Standard,Cocoa,Coral,Dark,HighContrast,Light,Midnight,Modern,Organic,Slate,Zen,Cyborg,Superhero,Flatly,Darkly,Cerulan'.split(','),
        selectedIndexChanged: (s) => {
            let pal = s.text.toLowerCase();
            theChart.palette = wjChart.Palettes[pal];
        }
    });
}
