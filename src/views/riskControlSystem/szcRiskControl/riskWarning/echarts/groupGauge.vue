<template>
    <chart :options.sync="receive" auto-resize/>
</template>
<script>
    export default {
        props: {},
        data() {
            return {
                receive : {
                    tooltip : {
                        formatter: "{a} <br/>{b} : {c}%"
                    },
                    series: [
                        {
                            name: '业务指标',
                            type: 'gauge',
                            detail: {formatter:'{value}%'},
                            data: [{value: 50, name: '完成率'}]
                        }
                    ]
                }
            };
        },
        mounted() {},
        watch: {},
        methods: {}
    };
</script>