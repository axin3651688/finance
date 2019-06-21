import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as chart from '@grapecity/wijmo.chart';
import '@grapecity/wijmo.chart.render';
import * as pdf from '@grapecity/wijmo.pdf';
import { getExpenses } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let flexPie = new chart.FlexPie('#pie', {
        itemsSource: ((totals) => [
            { name: 'Hotel', value: totals.hotel },
            { name: 'Transport', value: totals.transport },
            { name: 'Meal', value: totals.meal },
            { name: 'Fuel', value: totals.fuel },
            { name: 'Misc', value: totals.misc }
        ])(getExpenses().totals),
        binding: 'value',
        bindingName: 'name',
        innerRadius: 0.75,
        dataLabel: {
            content: '{value:c1}',
            position: chart.PieLabelPosition.Inside
        }
    });
    //
    document.querySelector('#btnExport').addEventListener('click', () => {
        let doc = new pdf.PdfDocument({
            ended: (sender, args) => pdf.saveBlob(args.blob, 'Document.pdf')
        });
        //
        flexPie.saveImageToDataUrl(chart.ImageFormat.Svg, (url) => {
            doc.drawText('Total expenses by category:');
            doc.drawSvg(url);
            doc.end();
        });
    });
}
