<template>
<div>
    <div v-html="divContent" class="div_content">
    </div>
</div>
</template>
<script>
export default {
    name:"bidiv",
    props: [ "dataDiv" ],
    data() {
        return {
            divContent:""
        };
    },
    created() {
        debugger;
        this.update();
    },
    watch: {},
    methods: {
        update () {
            debugger;
            if(this.dataDiv){
                this.divContent = this.dataDiv.htmlContent;
            }
        }
    }
};
</script>
<style lang='scss' scoped>
.div_content {
    text-align: center;
    font-weight: bold;
    /* height: 300px; */
    line-height: 60px;
    font-size: 20px;
    background-color: #ddd;
}
</style>

