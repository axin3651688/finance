<template>
    <div class="container-fluid">
        <div class="row report-names">
            <label for="reports">Selected FlexReport Report:</label>
            <select id="reports" class="combobox" v-model="reportInfo">
                <optgroup v-for="cat in categories" :key="cat.name" :label="cat.text">
                    <option v-for="rep in cat.reports" :key="rep.fileName" :value="cat.name + '/' + rep.fileName + '*' + rep.reportName">
                        {{rep.reportTitle}}
                    </option>
                </optgroup>
            </select>
        </div>

        <wj-report-viewer serviceUrl="https://demos.componentone.com/ASPNET/c1webapi/4.0.20172.105/api/report"
            :filePath="'ReportsRoot/' + filePath" :reportName="reportName" :paginated=true>
        </wj-report-viewer>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.viewer';
    import { getReports } from './data';
    //
    new Vue({
        el: '#app',
        data: {
            categories: null,
            filePath: '',
            reportName: ''
        },
        computed: {
            reportInfo: {
                get() {
                    return `${this.filePath}*${this.reportName}`;
                },
                set(value) {
                    let info = value.split('*');
                    this.filePath = info[0];
                    this.reportName = info[1];
                 }
            }
        },
        created() {
            let reports = getReports(),
                sr = reports.selectedReport;
            //
            this.categories = reports.categories;
            this.reportInfo = `${sr.categoryName}/${sr.reportName}.flxr*${sr.reportName}`;
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