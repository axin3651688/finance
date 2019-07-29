<template>
    <div class="container-fluid">
        <div class="row show-grid">
            <div class="col-md-1 grid-title">Date</div>
            <div class="col-md-2">
                <wj-input-date :format="'d'" :value="data.date" :min="minDate"
                    :max="maxDate"></wj-input-date>
            </div>
            <div class="col-md-2 grid-title">Slip No
            </div>
            <div class="col-md-2">
                <input :value="slipNo" type="text" class="form-control" />
            </div>
            <div class="col-md-2 grid-title">Settlement</div>
            <div class="col-md-2">
                <input :value="settlement" type="text" class="form-control" />
            </div>
        </div>
        <wj-multi-row :initialized="initSlip" :itemsSource="items" :layoutDefinition="layoutDefinition"></wj-multi-row>
        <div class="row show-grid">
            <div style="width:125px;" class="summary-cell">Debtor Sum</div>
            <div style="width:125px;" class="summary-cell"><span v-html="debtorSum"></span></div>
            <div style="width:125px;" class="summary-cell">Creditor Sum</div>
            <div style="width:125px;" class="summary-cell"><span v-html="creditorSum"></span></div>
            <div style="width:110px;" class="summary-cell">Balance</div>
            <div style="width:100px;" class="summary-cell"><span v-html="balance"></span></div>
        </div>
        <div class="pull-right btn-group">
            <button class="btn btn-default" @click="onGotoPageClick('first')" id="first">
                <span class="glyphicon glyphicon-fast-backward"></span>
            </button>
            <button class="btn btn-default" @click="onGotoPageClick('previous')" id="previous">
                <span class="glyphicon glyphicon-backward"></span>
            </button>
            <button id="current" type="button" class="btn" disabled style="width:100px" v-html="currentDescription">
            </button>
            <button class="btn btn-default" @click="onGotoPageClick('next')" id="next">
                <span class="glyphicon glyphicon-forward"></span>
            </button>
            <button class="btn btn-default" @click="onGotoPageClick('last')" id="last">
                <span class="glyphicon glyphicon-fast-forward"></span>
            </button>
        </div>
        <div class="btn-group">
            <button class="btn btn-default" @click="onExportXlsxClick">
                Export to Excel
            </button>
            <button class="btn btn-default" @click="onExportPdfClick">
                Export to PDF
            </button>
        </div>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';
    import '@grapecity/wijmo.vue2.grid.multirow';
    import * as wjCore from '@grapecity/wijmo';
    import * as wjFilter from '@grapecity/wijmo.grid.filter';
    import * as wjPdf from '@grapecity/wijmo.pdf';
    import * as wjGridXlsx from '@grapecity/wijmo.grid.xlsx';
    import * as wjXlsx from '@grapecity/wijmo.xlsx';
    import * as wjGridPdf from '@grapecity/wijmo.grid.pdf';
    import { generateSlipData, generateLayoutDef } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            let data = generateSlipData(50);
            return {
                data: data,
                items: new wjCore.CollectionView(data.items),
                layoutDefinition: generateLayoutDef(),
                minDate: new Date(data.date.getFullYear(), 0, 1),
                maxDate: new Date(data.date.getFullYear(), 11, 31),
                transferSlip: null,
                cv: null,
                slipNo: '',
                settlement: '',
                debtorSum: '',
                creditorSum: '',
                balance: '',
                currentDescription : ''
            }
        },
        methods: {
            initSlip: function(slip){
                this.transferSlip = slip;
            },
            onGotoPageClick: function(command) {
                let cv = this.cv;
                if (command === 'first') {
                    cv.moveToFirstPage();
                } else if (command === 'previous') {
                    cv.moveToPreviousPage();
                } else if (command === 'next') {
                    cv.moveToNextPage();
                } else if (command === 'last') {
                    cv.moveToLastPage();
                }
            },
            onExportXlsxClick: function() {
                let workbook = wjGridXlsx.FlexGridXlsxConverter.save(this.transferSlip);
                let workbookRow = new wjXlsx.WorkbookRow();
                let workbookFill = new wjXlsx.WorkbookFill();
                workbookFill.color = '#8080FF';
                let workbookFont = new wjXlsx.WorkbookFont();
                workbookFont.bold = true;
                let workbookStyle = new wjXlsx.WorkbookStyle();
                workbookStyle.fill = workbookFill;
                workbookStyle.font = workbookFont;
                workbookStyle.hAlign = wjXlsx.HAlign.Center;
                let workbookCell = new wjXlsx.WorkbookCell();
                workbookCell.value = 'Date';
                workbookCell.style = workbookStyle;
                workbookRow.cells.push(workbookCell);
                workbookCell = new wjXlsx.WorkbookCell();
                workbookCell.value = this.data.date;
                let dateCellStyle = new wjXlsx.WorkbookStyle();
                dateCellStyle.format = 'MM/dd/yyyy';
                workbookCell.style = dateCellStyle;
                workbookRow.cells.push(workbookCell);
                workbookCell = new wjXlsx.WorkbookCell();
                workbookCell.value = 'Slip No'
                workbookCell.style = workbookStyle;
                workbookRow.cells.push(workbookCell);
                workbookCell = new wjXlsx.WorkbookCell();
                workbookCell.value = this.data.slipNo;
                workbookRow.cells.push(workbookCell);
                workbookCell = new wjXlsx.WorkbookCell();
                workbookCell.value = 'Settlement';
                workbookCell.style = workbookStyle;
                workbookRow.cells.push(workbookCell);
                workbookCell = new wjXlsx.WorkbookCell();
                workbookCell.value = this.data.settlement;
                workbookRow.cells.push(workbookCell);
                workbook.sheets[0].rows.splice(0, 0, workbookRow);
                workbook.sheets[0].frozenPane.rows = 3;

                workbookRow = new wjXlsx.WorkbookRow();
                workbookFill = new wjXlsx.WorkbookFill();
                workbookFill.color = '#99B4D1';
                workbookStyle = new wjXlsx.WorkbookStyle();
                workbookStyle.fill = workbookFill;
                workbookStyle.hAlign = wjXlsx.HAlign.Center;
                workbookCell = new wjXlsx.WorkbookCell();
                workbookCell.value = 'Debtor Sum';
                workbookCell.style = workbookStyle;
                workbookRow.cells.push(workbookCell);
                workbookCell = new wjXlsx.WorkbookCell();
                workbookCell.value = this.debtorSum;
                workbookCell.style = workbookStyle;
                workbookRow.cells.push(workbookCell);
                workbookCell = new wjXlsx.WorkbookCell();
                workbookCell.value = 'Creditor Sum';
                workbookCell.style = workbookStyle;
                workbookRow.cells.push(workbookCell);
                workbookCell = new wjXlsx.WorkbookCell();
                workbookCell.value = this.creditorSum;
                workbookCell.style = workbookStyle;
                workbookRow.cells.push(workbookCell);
                workbookCell = new wjXlsx.WorkbookCell();
                workbookCell.value = 'Balance';
                workbookCell.style = workbookStyle;
                workbookRow.cells.push(workbookCell);
                workbookCell = new wjXlsx.WorkbookCell();
                workbookCell.value = this.balance;
                workbookCell.style = workbookStyle;
                workbookRow.cells.push(workbookCell);
                workbook.sheets[0].rows.push(workbookRow);
                workbook.saveAsync('TransferSlip.xlsx');
            },
            onExportPdfClick: function() {
                let doc = new wjPdf.PdfDocument({
                    header: {
                        declarative: {
                            text: '\t&[Page]\\&[Pages]'
                        }
                    },
                    footer: {
                        declarative: {
                            text: '\t&[Page]\\&[Pages]'
                        }
                    },
                    ended: function (sender, args) {
                        wjPdf.saveBlob(args.blob, 'TransferSlip.pdf')
                    }
                }),
                    settings = {
                        styles: {
                            cellStyle: {
                                backgroundColor: '#ffffff',
                                borderColor: '#c6c6c6'
                            },
                            altCellStyle: {
                                backgroundColor: '#f9f9f9'
                            },
                            headerCellStyle: {
                                backgroundColor: '#eaeaea'
                            }
                        }
                    }, font, drawTextSetting, thinPen = new wjPdf.PdfPen('#000000', 0.5);

                // Draw header of the transfer slip.
                doc.paths
                    .rect(0.5, 0.5, 50, 21)
                    .fill('#8080FF')
                    .moveTo(0, 0).lineTo(334, 0)
                    .moveTo(334, 0).lineTo(334, 22)
                    .moveTo(0, 22).lineTo(334, 22)
                    .moveTo(0, 0).lineTo(0, 22).stroke(thinPen);
                doc.drawText('Date', 3.5, 5.5, drawTextSetting);
                doc.drawText(wjCore.Globalize.format(this.data.date, 'd'), 53.5, 5.5, drawTextSetting);
                doc.paths
                    .rect(130.5, 0.5, 50, 21)
                    .fill('#8080FF');
                doc.drawText('Slip No', 133.5, 5.5, drawTextSetting);
                doc.drawText(this.data.slipNo, 183.5, 5.5, drawTextSetting);
                doc.paths
                    .rect(230.5, 0.5, 50, 21)
                    .fill('#8080FF');
                doc.drawText('Settlement', 233.5, 5.5, drawTextSetting);
                doc.drawText(this.data.settlement, 283.5, 5.5, drawTextSetting);
                doc.moveDown();

                // Draw the body of the transfer slip.
                wjGridPdf.FlexGridPdfConverter.draw(this.transferSlip, doc, null, null, settings);

                // Draw the footer of the transfer slip.
                doc.paths
                    .rect(0.5, 274.5, 380, 21)
                    .fill('#99B4D1')
                    .moveTo(0, 274).lineTo(381, 274)
                    .moveTo(381, 274).lineTo(381, 296)
                    .moveTo(0, 296).lineTo(381, 296)
                    .moveTo(0, 274).lineTo(0, 296)
                    .moveTo(60, 274).lineTo(60, 296)
                    .moveTo(120, 274).lineTo(120, 296)
                    .moveTo(180, 274).lineTo(180, 296)
                    .moveTo(240, 274).lineTo(240, 296)
                    .moveTo(320, 274).lineTo(320, 296).stroke(thinPen);
                doc.drawText('Debtor Sum', 3.5, 279.5, drawTextSetting);
                doc.drawText(this.debtorSum, 63.5, 279.5, drawTextSetting);
                doc.drawText('Creditor Sum', 123.5, 279.5, drawTextSetting);
                doc.drawText(this.creditorSum, 183.5, 279.5, drawTextSetting);
                doc.drawText('Balance', 243.5, 279.5, drawTextSetting);
                doc.drawText(this.balance, 323.5, 279.5, drawTextSetting);

                doc.end();
            },
            _updateSummary: function() {
                let debtor = wjCore.getAggregate(wjCore.Aggregate.Sum, this.cv.items, 'debtorAmt'),
                    creditor = wjCore.getAggregate(wjCore.Aggregate.Sum, this.cv.items, 'creditorAmt');
                this.debtorSum = wjCore.Globalize.format(debtor, 'c');
                this.creditorSum = wjCore.Globalize.format(creditor, 'c');
                this.balance = wjCore.Globalize.format(debtor - creditor, 'c');
            },
            _currentPageChanged: function() {
                let curr = wjCore.format('{current:n0} / {count:n0}', {
                    current: this.cv.pageIndex + 1,
                    count: this.cv.pageCount
                });
                this.currentDescription = curr;
                if (this.cv.pageIndex === 0) {
                    document.querySelector('#first').setAttribute('disabled', 'true');
                    document.querySelector('#previous').setAttribute('disabled', 'true');
                } else {
                    document.querySelector('#first').removeAttribute('disabled');
                    document.querySelector('#previous').removeAttribute('disabled');
                }
                if (this.cv.pageIndex === this.cv.pageCount - 1) {
                    document.querySelector('#last').setAttribute('disabled', 'true');
                    document.querySelector('#next').setAttribute('disabled', 'true');
                } else {
                    document.querySelector('#last').removeAttribute('disabled');
                    document.querySelector('#next').removeAttribute('disabled');
                }
            }
        },
        mounted: function(){
            this.items.pageSize = 5;
            this.slipNo = this.data.slipNo;
            this.settlement = this.data.settlement;
            // console.log(this.transferSlip);

            let filter = new wjFilter.FlexGridFilter(this.transferSlip);
            this.transferSlip.rowHeaders.columns.clear();
            this.cv = this.transferSlip.collectionView;
            this._currentPageChanged();
            this._updateSummary();
            this.transferSlip.cellEditEnded.addHandler(() => {
                this._updateSummary();
            });
            this.cv.pageChanged.addHandler(() => {
                this._updateSummary();
                this._currentPageChanged();
            });
            this.cv.collectionChanged.addHandler((sender, e) => {
                let debtorAmt, creditorAmt;

                if (e.action === wjCore.NotifyCollectionChangedAction.Change && !!e.item) {
                    debtorAmt = +e.item.debtorAmt;
                    creditorAmt = +e.item.creditorAmt;
                    if (!isNaN(debtorAmt)) {
                        e.item.debtorTax = e.item.debtorAmt * 0.09;
                    }
                    if (!isNaN(creditorAmt)) {
                        e.item.creditorTax = e.item.creditorAmt * 0.09;
                    }
                }
            });
        }
    });

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
.wj-multirow {
    max-height: 400px;
    margin: 6px 0;
}

.show-grid {
    margin-left: 6px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 4px;
}
.show-grid [class^=col-] {
    padding-top: 5px;
    padding-bottom: 5px;
    border-style: solid solid solid none;
    border-width: 1px;
    border-color: #000000;
    height: 44px;
}

.show-grid > .grid-title {
    background-color: #8080ff;
    font-size: 18px;
    font-weight: bold;
}

.show-grid > .summary-cell {
    padding: 5px;
    border-style: solid solid solid none;
    border-width: 1px;
    border-color: #000000;
    background-color: #99B4D1;
    font-weight: bold;
    text-align: center;
    float: left;
}

.show-grid > div:first-child {
    border-left-style: solid;
    border-radius: 4px 0px 0px 4px;
}

.show-grid > div:last-child {
    border-radius: 0px 4px 4px 0px;
}
</style>
