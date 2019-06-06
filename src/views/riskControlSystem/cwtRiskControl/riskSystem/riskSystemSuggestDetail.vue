<template>
    <div>
        <template v-for="item in riskSystemSuggestDetailData">
            <div class="suggest-detail">
                <span class="suggest-detail-date">{{item.proposedDate}}</span>
                <span class="suggest-detail-user">【{{item.publishDept}}】{{item.proposedUser}}</span>
            </div>
            <div>
                <el-input
                        class="suggest-detail-content"
                        type="textarea"
                        :rows="3"
                        disabled
                        v-model="item.proposedContent"
                >
                </el-input>
            </div>
        </template>

    </div>
</template>

<script>
    export default {
        name: "riskSystemSuggestDetail",
        components: {},
        props: {
            riskSystemSuggestDetailData: Array
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
    .suggest-detail {
        margin-bottom: 16px;
    }

    .suggest-detail-date {
        padding: 4px 20px;
        background-color: #996699;
        color: #fff;
        border-radius: 14px;
    }

    .suggest-detail-user {
        margin-left: 16px;
        padding: 4px 20px;
        background-color: #78A126;
        color: #fff;
        border-radius: 14px;
    }

    .suggest-detail-content {
        margin-bottom: 30px;
    }
</style>