<template>
    <div class="main">

    </div>
</template>

<script>

    import {FIND_ROLE_ACCREDIT_FUNCTION} from '~api/organize.js';
    export default {
        name: "Tab2",
        props: {
            selectRole: {
                type: Object,
                default: {}
            }
        },
        watch: {
            selectRole(val) {
                this.getData()
            }
        },
        data() {

            return {

            }
        },
        created() {

        },
        methods: {
           getData(){
               FIND_ROLE_ACCREDIT_FUNCTION(this.selectRole.id).then(res => {
                   this.rightList = res.data.data
                   //复制一份元数据
                   this.preList = JSON.parse(JSON.stringify(res.data.data))
                   let temp = []
                   res.data.data.forEach(right => {
                       if (right.accredit != 0) {
                           console.log('right.accredit!=0', right)
                           temp.push(right)
                       }
                   })
                   this.checkedList = temp
                   console.log('请求FIND_ROLE_ACCREDIT_ADMIN：', res.data.data)
               }).catch(err => {
                   console.log('请求FIND_ROLE_ACCREDIT_ADMIN：', err)
               });
           }
        },
    }
</script>

<style lang="scss" scoped>
    @import "@s/green/variables.scss";

    .main {
        padding: 30px;

        /deep/.el-checkbox__label {
            font-size: 14px;
            font-family: Microsoft YaHei;
        }
    }
</style>