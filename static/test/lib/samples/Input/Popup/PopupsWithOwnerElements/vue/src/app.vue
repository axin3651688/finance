<template>
    <div class="container-fluid">
        <h4>Show on Click, Hide on Blur</h4>
        <button class="btn btn-primary" ref="btnClickBlur">
            Show the Popover
        </button>
        <wj-popup :owner="btnClickBlur" :showTrigger="'Click'" :hideTrigger="'Blur'" class="popover">
            <h3 class="popover-title">
                Title
            </h3>
            <div class="popover-content">
                Hello Popup<br />
                This is a multi-line message! This is a long line in my popover, which uses Bootstrap's
                'popover-content' style.
            </div>
        </wj-popup>

        <hr />

        <h4>Show on Click, Hide on Click</h4>
        <button class="btn btn-primary" ref="btnClickClick" >
            Show the Popover
        </button>
        <wj-popup :owner="btnClickClick" :showTrigger="'Click'" :hideTrigger="'Click'" class="popover">
            <h3 class="popover-title">
                Title
            </h3>
            <div class="popover-content">
                Hello Popup<br />
                This is a multi-line message!
                This is a long line in my popover, which uses Boostrap's 'popover-content' style.
            </div>
        </wj-popup>

        <hr />

        <h4>Show on Click, Hide with Code</h4>
        <button class="btn btn-primary" ref="btnClickNone" >
            Show the Popover
        </button>
        <wj-popup :owner="btnClickNone" :showTrigger="'Click'" :hideTrigger="'None'" class="popover">
            <h3 class="popover-title">
                Title
            </h3>
            <div class="popover-content">
                <form name="popoverForm">
                    <p>
                        Hello Popup<br />
                        This is a multi-line message!</p>
                    <pre>2 + 3 = <span class="">5</span></pre>
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-addon">@</div>
                            <input class="form-control" type="email" placeholder="Enter email">
                        </div>
                    </div>
                    <div class="form-actions">
                        <button class="btn btn-danger wj-hide">Close</button>
                        <button class="btn btn-primary wj-hide-ok">Save changes</button>
                    </div>
                </form>
            </div>
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
                btnClickBlur: null,
                btnClickClick: null,
                btnClickNone: null
            }
        },
        mounted: function(){
            this.btnClickBlur = this.$refs.btnClickBlur;
            this.btnClickClick = this.$refs.btnClickClick;
            this.btnClickNone = this.$refs.btnClickNone;
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
