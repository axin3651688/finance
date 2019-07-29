<template>
    <div class="container-fluid">
        <div class="row report-names">
            <label for="reports">Selected ActiveReports Report:</label>
            <select id="reports" class="combobox" v-model="filePath">
                <optgroup v-for="cat in categories" :key="cat.name" :label="cat.name">
                    <option v-for="rep in cat.reports" :key="rep.filePath" :value="rep.filePath">
                        {{rep.reportName}}
                    </option>
                </optgroup>
            </select>
        </div>

        <wj-report-viewer serviceUrl="https://ardemos.grapecity.com/AR12-ReportsGallery/ActiveReports.ReportService.asmx"
            :filePath="filePath">
        </wj-report-viewer>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import "@grapecity/wijmo.styles/wijmo.css";
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.viewer';
    import { getReports } from './data';
    //
    new Vue({
        el: '#app',
        data: {
            filePath: '',
            categories: null
        },
        created() {
            let reports = getReports();
            //
            this.categories = reports.categories;
            // Get the selected report's filePath property
            this.filePath  = reports
                .categories.filter(cat => cat.name === reports.selectedReport.categoryName)[0]
                .reports.filter(rep => rep.reportName === reports.selectedReport.reportName)[0]
                .filePath;
        }
    });
</script>

<style>
    body {
        margin-bottom: 24px;
    }

    label {
        margin-right: 3px;
    }

    .container-fluid .wj-viewer {
        width: 100%;
        display: block;
    }

    .report-names {
        margin: 10px;
    }

    @media print {
        .report-names {
            display: none;
        }
    }
</style>