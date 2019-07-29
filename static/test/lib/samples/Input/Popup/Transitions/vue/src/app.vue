<template>
    <div class="container-fluid">
        <button class="btn btn-primary btn-space" @click="frmLoginPopup.show(true)">
            Log In
        </button>

        <!-- Log In form -->
        <wj-popup class="custom-animation" :fadeIn="false" :shown="shown"
            :hiding="hiding" :initialized="initPopup">
            <form>
                <h4 class="modal-header">
                    Log in
                    <button type="button" tabindex="-1" class="close wj-hide">&times;</button>
                </h4>
                <div class="modal-body">
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
                    <br />
                </div>
                <div class="modal-footer">
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
            },
            shown: function(popup) {
                wijmo.toggleClass(popup.hostElement, 'custom-animation-visible', true);
            },
            hiding: function(popup) {
                wijmo.toggleClass(popup.hostElement, 'custom-animation-visible', false);
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

    /* CSS animations for fading in and out */

    .custom-animation {
        opacity: 0;
        transform: rotate3d(1, .5, .5, 180deg) scale(0.1);
        transition: all ease-in .4s;
    }

    .custom-animation-visible {
        opacity: 1;
        transform: none;
    }

    body {
        margin-bottom: 24pt;
    }
</style>
