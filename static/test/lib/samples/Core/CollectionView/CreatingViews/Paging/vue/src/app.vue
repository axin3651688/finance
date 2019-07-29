<template>
    <div class="container-fluid">
        <h4>
            Client-Side Paging:
        </h4>
        <wj-flex-grid :items-source="view" :show-alternating-rows=false headers-visibility="Column">
        </wj-flex-grid>
        <div v-on:click="updateViewPager($event)">
            <button id="btnFirst" class="btn"><span class="wj-glyph-step-backward"></span></button>
            <button id="btnPrev" class="btn"><span class="wj-glyph-left"></span></button>
            &nbsp;&nbsp;&nbsp;Page {{ view.pageIndex + 1 | number:0 }} of {{ view.pageCount | number:0 }}&nbsp;&nbsp;&nbsp;
            <button id="btnNext" class="btn"><span class="wj-glyph-right"></span></button>
            <button id="btnLast" class="btn"><span class="wj-glyph-step-forward"></span></button>
        </div>
        <br />
        <h4>
            Server-Side Paging:
        </h4>
        <wj-flex-grid :items-source="odataView" :show-alternating-rows=false headers-visibility="Column" :is-read-only=true>
        </wj-flex-grid>
        <div v-on:click="updateOdataViewPager($event)">
            <button id="btnFirstOd" class="btn"><span class="wj-glyph-step-backward"></span></button>
            <button id="btnPrevOd" class="btn"><span class="wj-glyph-left"></span></button>
            &nbsp;&nbsp;&nbsp;Page {{ odataView.pageIndex + 1 | number:0 }} of {{ odataView.pageCount | number:0 }}&nbsp;&nbsp;&nbsp;
            <button id="btnNextOd" class="btn"><span class="wj-glyph-right"></span></button>
            <button id="btnLastOd" class="btn"><span class="wj-glyph-step-forward"></span></button>
        </div>
    </div>
</template>

<script>
    import "bootstrap.css";
    import "@grapecity/wijmo.styles/wijmo.css";
    import Vue from 'vue';
    import * as wijmo from '@grapecity/wijmo';
    import { getData } from './data';
    import { WjGridModule } from '@grapecity/wijmo.vue2.grid';
    import * as odata from '@grapecity/wijmo.odata';
    
    new Vue({
        el: '#app',
        data: function(){
            return {
                view:  new wijmo.CollectionView(getData(), {
                    pageSize: 6
                }),
            //
            // use ODataCollectionView to demonstrate server-based paging
                odataView: new odata.ODataCollectionView('https://services.odata.org/Northwind/Northwind.svc', 'Customers', {
                    pageSize: 6,
                    pageOnServer: true,
                    sortOnServer: true
                })
            }
        },
        methods:{
            updateViewPager(e) {
                let btn = wijmo.closest(e.target, 'button'),
                    id = btn ? btn.id : '';
                //
                switch (id) {
                    case 'btnFirst':
                        this.view.moveToFirstPage();
                        break;
                    case 'btnPrev':
                        this.view.moveToPreviousPage();
                        break;
                    case 'btnNext':
                        this.view.moveToNextPage();
                        break;
                    case 'btnLast':
                        this.view.moveToLastPage();
                        break;
                }
            },
            //
            updateOdataViewPager(e) {
                let btn = wijmo.closest(e.target, 'button'),
                    id = btn ? btn.id : '';
                //
                switch (id) {
                    case 'btnFirstOd':
                        this.odataView.moveToFirstPage();
                        break;
                    case 'btnPrevOd':
                        this.odataView.moveToPreviousPage();
                        break;
                    case 'btnNextOd':
                        this.odataView.moveToNextPage();
                        break;
                    case 'btnLastOd':
                        this.odataView.moveToLastPage();
                        break;
                }
            }
        }
    })
</script>
