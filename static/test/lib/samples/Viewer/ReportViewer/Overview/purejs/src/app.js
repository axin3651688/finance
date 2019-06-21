import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as input from '@grapecity/wijmo.input';
import * as viewer from '@grapecity/wijmo.viewer';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let reportViewer = new viewer.ReportViewer('#reportViewer', {
        serviceUrl: 'https://demos.componentone.com/ASPNET/c1webapi/4.0.20172.105/api/report',
        filePath: 'ReportsRoot/Formatting/AlternateBackground.flxr',
        reportName: 'AlternateBackground',
        zoomFactorChanged: (sender) => {
            zoomFactor.value = sender.zoomFactor;
        }
    });
    //
    document.querySelector('#cbContinuousViewMode').addEventListener('click', (e) => {
        reportViewer.viewMode = e.target.checked
            ? viewer.ViewMode.Continuous
            : viewer.ViewMode.Single;
    });
    //
    let mouseMode = new input.Menu('#lbMouseMode', {
        itemClicked: (sender) => {
            reportViewer.mouseMode = sender.selectedValue;
            updateMenuHeader(sender, 'Mouse Mode');
        }
    });
    updateMenuHeader(mouseMode, 'Mouse Mode');
    //
    document.querySelector('#cbFullScreen').addEventListener('click', e => {
        reportViewer.fullScreen = e.target.checked;
    });
    //
    let zoomFactor = new input.InputNumber('#txtZoomFactor', {
        min: 0.05,
        max: 10,
        step: 0.1,
        format: 'n2',
        value: reportViewer.zoomFactor,
        valueChanged: (sender) => {
            if (sender.value >= sender.min && sender.value <= sender.max) {
                reportViewer.zoomFactor = sender.value;
            }
        }
    });
    //
    //
    function updateMenuHeader(menu, header) {
        menu.header = header + ': <b>' + menu.text + '</b>';
    }
}
