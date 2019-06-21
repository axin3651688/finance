<template>
    <div class="container-fluid">
        <div class="row report-names">
            <label for="reports">Selected SSRS Report:</label>
            <select id="reports" class="combobox" v-model="filePath">
                <optgroup v-for="cat in categories" :key="cat.name" :label="cat.text">
                    <option v-for="rep in cat.reports" :key="rep.reportPath" :value="'c1ssrs/' + rep.reportPath">
                        {{rep.reportTitle}}
                    </option>
                <optgroup>
            </select>
        </div>

        <wj-report-viewer serviceUrl="https://demos.componentone.com/ASPNET/c1webapi/4.0.20172.105/api/report"
            :filePath="filePath">
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
            filePath: ''
        },
        created() {
            let reports = getReports();
            //
            this.categories = reports.categories;
            this.filePath = `c1ssrs/${reports.selectedReport.categoryName}/${reports.selectedReport.reportName}`;
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