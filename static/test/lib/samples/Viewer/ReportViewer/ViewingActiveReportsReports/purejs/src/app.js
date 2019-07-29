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
        serviceUrl: 'https://ardemos.grapecity.com/AR12-ReportsGallery/ActiveReports.ReportService.asmx'
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
            let optGroup = createComboOptionGroup(cat.name);
            //
            cat.reports.forEach(rep => {
                let option = createComboOption(rep.reportName, rep.filePath);
                //
                option.selected = cat.name === selCat && rep.reportName === selRep;
                optGroup.appendChild(option);
            });
            //
            lbReports.appendChild(optGroup);
        });
    }
    //
    function loadReport() {
        reportViewer.filePath = lbReports.value;
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
