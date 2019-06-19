<template>
    <div>this is assessmentIndicators</div>
</template>

<script>
    import {mapGetters} from "vuex"
    export default {
        name: "assessmentIndicators",
        components: {},
        props: {},
        computed: {
            ...mapGetters(["year", "month", "company"])
        },
        watch: {
            /**
             * 监听公司， 年， 月
             */
            company(newValue, oldValue) {
                // this.getReportData();
            },
            year(newValue, oldValue) {
                // this.getReportData();
            },
            month(newValue, oldValue) {
                // this.getReportData();
            }
        },
        data() {
            return {}
        },
        created() {
        },
        mounted() {
        },
        methods: {}
    }
</script>

<style scoped>

</style>