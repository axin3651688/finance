<template>
    <div class="container-fluid">
        <div class="col-md-12">
            <div class="row">
                <wj-report-viewer serviceUrl="https://demos.componentone.com/ASPNET/c1webapi/4.0.20172.105/api/report"
                    filePath="ReportsRoot/Formatting/AlternateBackground.flxr" reportName="AlternateBackground"
                    :viewMode="viewMode" :mouseMode="mouseMode" :fullScreen="fullScreen" :zoomFactor="zoomFactor"
                    :viewModeChanged="viewModeChanged" :fullScreenChanged="fullScreenChanged" :zoomFactorChanged="zoomFactorChanged">
                </wj-report-viewer>
            </div>
            <br />
            <div class="row">
                <div class="form-horizontal">
                    <div class="form-group">
                        <div class="col-md-3">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" v-model="continuousViewMode" />
                                    Continuous View Mode
                                </label>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <label for="mouseModeMenu">MouseMode</label>
                            <wj-combo-box id="mouseModeMenu" :itemsSource="mouseModeOptions" :text="mouseMode" :textChanged="mouseModeTextChanged">
                            </wj-combo-box>
                        </div>
                        <div class="col-md-2">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" v-model="fullScreen" /> Full Screen
                                </label>
                            </div>
                        </div>
                        <div class="col-mod-4">
                            <label class="col-md-2 control-label">Zoom Factor</label>
                            <div class="col-md-2">
                                <wj-input-number :value="zoomFactor" :min=0.05 :max=10 :step=0.1 format="n2" :valueChanged="zoomFactorValueChanged">
                                </wj-input-number>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import * as viewer from '@grapecity/wijmo.viewer';
    import '@grapecity/wijmo.vue2.input';
    import '@grapecity/wijmo.vue2.viewer';
    //
    new Vue({
        el: '#app',
        data: {
            viewMode: viewer.ViewMode.Single,
            mouseMode: 'SelectTool',
            mouseModeOptions: ['SelectTool', 'MoveTool', 'RubberbandTool', 'MagnifierTool'],
            fullScreen: false,
            zoomFactor: 1
        },
        computed: {
            continuousViewMode: {
                get() {
                    return this.viewMode;
                },
                set(value) {
                    this.viewMode = value ? viewer.ViewMode.Continuous : viewer.ViewMode.Single;
                }
            }
        },
        methods: {
            viewModeChanged(sender) {
                this.viewMode = sender.viewMode;
            },
            mouseModeTextChanged(sender) {
                this.mouseMode = sender.text;
            },
            fullScreenChanged(sender) {
                this.fullScreen = sender.fullScreen;
            },
            zoomFactorChanged(sender) {
                this.zoomFactor = sender.zoomFactor;
            },
            zoomFactorValueChanged(sender) {
                this.zoomFactor = sender.value;
            }
        }
    });
</script>

<style>
    body {
        margin-bottom: 24px;
    }

    .container-fluid .wj-viewer {
        width: 100%;
        display: block;
    }
</style>