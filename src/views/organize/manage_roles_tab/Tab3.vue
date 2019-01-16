<template>
    <div>

        <div class="item-row" v-for="item in data">
            <div class="left-item">
                <img :src="item.avatar" class="left-img"/>
                <div class="left-text">{{item.name}}</div>
            </div>
            <el-switch
                    v-model="item.action"
                    active-value="1"
                    inactive-value="0"
                    active-color="#3BB75E"
                    inactive-color="#ff4949">
            </el-switch>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Tab3",
        props: {
            selectRole: {
                type: Object,
                default: {}
            }
        },
        data() {

            return {
                data: [{
                    avatar: 'https://avatars0.githubusercontent.com/u/33865977?s=400&v=4',
                    name: '分析助手1',
                    action: 0,
                },{
                        avatar: 'https://avatars0.githubusercontent.com/u/33865977?s=400&v=4',
                        name: '分析助手2',
                        action: 1,
                    },{
                        avatar: 'https://avatars0.githubusercontent.com/u/33865977?s=400&v=4',
                        name: '分析助手3',
                        action: 0,
                    },{
                        avatar: 'https://avatars0.githubusercontent.com/u/33865977?s=400&v=4',
                        name: '分析助手4',
                        action: 0,
                    },
                ]
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "@s/green/variables.scss";

    .item-row {
        padding: 14px 40px 14px 40px;
        background: rgba(230, 166, 166, 0);
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px;
        border-bottom-style:solid;
        border-bottom-color: rgba(165,171,177,0.4);

        .left-item {
            display: flex;
            align-items: center;
            justify-content: start;

            .left-img {
                margin-left: 20px;
                height: 46px;
                border-radius: 50%;
                width: 46px;
            }

            .left-text {
                font-size:14px;
                font-family:Microsoft YaHei;
                font-weight:400;
                margin-left: 30px;
                color:rgba(102,102,102,0.80);
                opacity:1;
            }
        }

    }

</style>