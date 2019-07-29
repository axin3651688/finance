<template>
    <div class="container-fluid">
        <p>
            This paragraph has a
            <b id='span1'>span with a tooltip</b>.
        </p>
        <p>
            This paragraph has a
            <b id='span2'>span with a tooltip</b>
            whose content is taken from another element.
        </p>
        <p>The button below also have tooltip:</p>
        <button id='btnAddNew'
            class="btn btn-default"
        >addNew</button>

        <div id="spanTooltip" style="display:none">
            <div class="panel panel-info">
                <div class="panel-heading">Title</div>
                <div class="panel-body">This is the second span.</div>
            </div>
        </div>
    </div>
</template>

<script>
    import "bootstrap.css";
    import "@grapecity/wijmo.styles/wijmo.css";
    import Vue from "vue";
    import * as wijmo from "@grapecity/wijmo";

    let App = Vue.extend({
        name: "app",
        mounted: function() {
            let tt = new wijmo.Tooltip();
            tt.setTooltip("#span1", "This is the <b>first</b> span.");
            tt.setTooltip("#span2", "#spanTooltip");
            tt.setTooltip(
                "#btnAddNew",
                "Click to add 1,000 items using the <b>addNew</b> method."
            );
        }
    });

    new Vue({ render: h => h(App) }).$mount("#app");
</script>
