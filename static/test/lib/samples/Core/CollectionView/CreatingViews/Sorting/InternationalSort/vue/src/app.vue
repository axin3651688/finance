<template>
    <div class="container-fluid">
        <button class="btn" v-on:click="sort(true)">Sort Ascending</button>
        <button class="btn" v-on:click="sort(false)">Sort Descending</button>

        <div class="row">
            <div class="col-xs-6">
                <h4>
                    JavaScript array.sort:
                </h4>
                <ol>
                    <li v-for="item in array" :key="item">
                       {{ item }}
                    </li>
                </ol>
            </div>
            <div class="col-xs-6">
                <h4>
                    CollectionView.sort:
                </h4>
                <ol>
                    <li v-for="item in view.items" :key="item">
                        {{ item }}
                    </li>
                </ol>
            </div>
        </div>
    </div>
</template>

<script>
    import "bootstrap.css";
    import "@grapecity/wijmo.styles/wijmo.css";
    import Vue from 'vue';
    import * as wijmo from '@grapecity/wijmo';
    import { getData } from './data';
    
    new Vue({
        el: '#app',
        data: function(){
            return {
                array: getData(),
                view: new wijmo.CollectionView(getData())
            }
        },
        methods:{
            sort(ascending) {
                // sort JavaScript array
                this.array.sort();
                if (!ascending) {
                    this.array.reverse();
                }
                //
                // sort CollectionView
                this.view.sortDescriptions.clear();
                this.view.sortDescriptions.push(new wijmo.SortDescription(null, ascending));
            }
        },
        mounted: function(){
            this.sort(true);
        }
    })
</script>
