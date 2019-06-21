<template>
    <div class="container-fluid">
        <button class="btn btn-primary btn-space" @click="frmLoginPopup.show(true)">
            Log In
        </button>

        <!-- Log In form -->
        <wj-popup :isDraggable="true" :initialized="initPopup">
            <form>
                <div class="wj-dialog-header">
                    Log in
                    <button type="button" tabindex="-1" class="close wj-hide">&times;</button>
                </div>
                <div class="wj-dialog-body">
                    <label>
                        Email:
                        <input class="form-control" required type="email" />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input class="form-control" type="password" required pattern=".{4,}"
                            title="Please enter 4 characters or more." />
                    </label>
                </div>
                <div class="wj-dialog-footer">
                    <button class="btn btn-primary" type="submit">
                        Log in
                    </button>
                </div>
            </form>
        </wj-popup>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            return {
                frmLoginPopup: null
            }
        },
        methods: {
            initPopup: function(popup){
                this.frmLoginPopup = popup;
            }
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .modal-body {
        min-width: 300px;
    }

    input:invalid {
        border-color: red;
    }

    body {
        margin-bottom: 24pt;
    }
</style>
