<template>
    <div class="container-fluid">
        <ul>
            <li v-for="item in data.items" :key="item.CategoryID">
                {{ item.CategoryID }} <b>{{ item.CategoryName }}</b> {{ item.Description }}
            </li>
        </ul>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import * as wijmo from '@grapecity/wijmo';
    
    new Vue({
        el: '#app',
        data: function () {
            return { 
                data: _getData()
            }
        }
    })

    function _getData(){
        var view = new wijmo.CollectionView();
        //
        // populate it with data from a server
        wijmo.httpRequest('https://services.odata.org/Northwind/Northwind.svc/Categories', {
            data: {
                $format: 'json',
                $select: 'CategoryID,CategoryName,Description'
            },
            success: (xhr) => {
                // got the data, assign it to the CollectionView
                let response = JSON.parse(xhr.response);
                let data = response.d ? response.d.results : response.value;
                //
                // use the result as the sourceCollection
                view.sourceCollection = data;
            }
        });
        return view;
    }
</script>
