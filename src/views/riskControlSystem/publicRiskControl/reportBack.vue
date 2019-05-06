<template>
    <div class="app-container">
        <tree-table :data="data" :columns="columns" border></tree-table>
    </div>
</template>

<script>
    import treeTable from '../publicRiskControl/treeTable'

    export default {
        name: 'treeTableDemo',
        components: {
            treeTable
        },
        data() {
            return {
                columns: [
                    {
                        text: '公司名称',
                        value: 'companyName',
                    },
                    {
                        text: '反馈状态',
                        value: 'feedState',
                        width: 200
                    },
                    {
                        text: '操作',
                        value: 'handle'
                    }
                ],
                data: [
                    {
                        companyName: '(1001)天津食品集团有限公司(合并)',
                        feedState: '已反馈',
                        handle: '反馈',
                        children: [
                            {
                                companyName: ' (100101)天津农垦渤海农业集团有限公司(托管汇总)',
                                feedState: '已反馈',
                                handle: '反馈',
                                children: [
                                    {
                                        companyName: '(10010101)天津农垦渤海农业集团有限公司(合并)',
                                        feedState: '已反馈',
                                        handle: '反馈',
                                        children: [
                                            {
                                                companyName: ' (1001010101)天津农垦渤海农业集团有限公司(本部)',
                                                feedState: '已反馈',
                                                handle: '反馈'
                                            },
                                            {
                                                companyName: '(1001010102)天津农垦龙天畜牧养殖有限公司',
                                                feedState: '已反馈',
                                                handle: '关闭'
                                            }
                                        ]
                                    },
                                    {
                                        companyName: '(10010102)天津市宝德包装有限公司',
                                        feedState: '未反馈',
                                        handle: '反馈'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    }
</script>

<style>

</style>

