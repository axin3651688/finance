import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as viewer from '@grapecity/wijmo.viewer';
import { getReports } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let reportViewer = new viewer.ReportViewer('#reportViewer', {
        serviceUrl: 'https://demos.componentone.com/ASPNET/c1webapi/4.0.20172.105/api/report'
    });
    let lbReports = document.querySelector('#reports');
    lbReports.addEventListener('change', () => loadReport());
    //
    // fill reports list
    fillReportList(getReports());
    loadReport();
    //
    function fillReportList(reports) {
        let selCat = reports.selectedReport.categoryName, selRep = reports.selectedReport.reportName;
        //
        reports.categories.forEach(cat => {
            let catName = cat.name, optGroup = createComboOptionGroup(cat.text);
            //
            cat.reports.forEach(rep => {
                let option = createComboOption(rep.reportTitle, `${catName}/${rep.fileName}*${rep.reportName}`);
                //
                option.selected = (catName === selCat && rep.reportName === selRep);
                optGroup.appendChild(option);
            });
            //
            lbReports.appendChild(optGroup);
        });
    }
    //
    function loadReport() {
        let info = lbReports.value.split('*');
        reportViewer.filePath = 'ReportsRoot/' + info[0];
        reportViewer.reportName = info[1];
        reportViewer.paginated = true;
    }
    //
    function createComboOptionGroup(text) {
        let optGroup = document.createElement('optgroup');
        optGroup.label = text;
        return optGroup;
    }
    //
    function createComboOption(text, value) {
        let option = document.createElement('option');
        option.innerHTML = text;
        option.value = value;
        return option;
    }
}
