<template>


    <el-table
            :data="tableData5"
            stripe
            row-key="id" :expand-row-keys="expands"    @row-click="rowClick"  :row-class-name="isShowIcon"
            style="width: 100%"  class="main_table" :header-cell-style="getRowClass">


        <el-table-column type="expand">



            <!--<el-table-->
                    <!--:data="tableData"-->
                    <!--style="width: 100%">-->

                <!--<el-table-column-->
                        <!--label="商品 ID"-->
                        <!--prop="id">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                        <!--label="商品名称"-->
                        <!--prop="name">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                        <!--label="描述"-->
                        <!--prop="desc">-->
                <!--</el-table-column>-->
            <!--</el-table>-->





            <div slot-scope="props"  class="expandItem">


                <span style="width: 190px" >123123</span>
                <span style="width: 190px ;margin-left: 10px;" >一级部门</span>
                <span style="width: 190px ;margin-left: 18px;">龚佳新</span>

                <div  class="expandItem_horn" style="width: 55%">

                    <div class="leftIcon_title">
                        <img src="@a/user_icon/tianjiazibumen_icon.svg">
                        <span class="itemSpan">添加子部门</span>
                    </div>

                    <div class="leftIcon_title1">
                        <img src="@a/user_icon/tianjiachengyuan_icon.svg">
                        <span class="itemSpan1">添加成员</span>
                    </div>

                    <div class="leftIcon_title2">
                        <img src="@a/user_icon/jinyong_icon.svg">
                        <span class="itemSpan2">修改</span>
                    </div>

                    <div class="leftIcon_title3">
                        <img src="@a/user_icon/jinyong_icon.svg">
                        <span class="itemSpan3">移除</span>
                    </div>

                </div>


            </div>
        </el-table-column>


        <el-table-column
                label="部门名称"  width="190" align="center"
                prop="id" >
        </el-table-column>

        <el-table-column
                label="级别" width="190" align="center"
                prop="name">
        </el-table-column>

        <el-table-column
                label="负责人" width="190" align="center"
                prop="desc">
        </el-table-column>

        <el-table-column
                label="操作" min-width="55%" align="center"
                >

            <div slot-scope="scope" class="template_edit">

                <div class="leftIcon_title">
                    <img src="@a/user_icon/tianjiazibumen_icon.svg">
                    <span class="itemSpan">添加子部门</span>
                </div>

                <div class="leftIcon_title1">
                    <img src="@a/user_icon/tianjiachengyuan_icon.svg">
                    <span class="itemSpan1">添加成员</span>
                </div>

                <div class="leftIcon_title2">
                    <img src="@a/user_icon/jinyong_icon.svg">
                    <span class="itemSpan2">修改</span>
                </div>

                <div class="leftIcon_title3">
                    <img src="@a/user_icon/jinyong_icon.svg">
                    <span class="itemSpan3">移除</span>
                </div>

            </div>

        </el-table-column>


    </el-table>
</template>



<script>
    export default {
        data() {
            return {
                tableData5: [{
                    id: '12987122',
                    name: '一级部门',
                    category: '江浙小吃、小吃零食',
                    desc: '龚佳新',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }, {
                    id: '12987123',
                    name: '一级部门',
                    category: '江浙小吃、小吃零食',
                    desc: '龚佳新',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }, {
                    id: '12987125',
                    name: '一级部门',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }, {
                    id: '12987126',
                    name: '一级部门',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }],

                expands:[],
                cuttentid:null,
            }
        },

        mounted() {

        },
        methods: {
            //设置表格第一行的颜色
            getRowClass({ row, column, rowIndex, columnIndex }) {
                if (rowIndex == 0) {
                    return 'background:rgba(221,235,246,1);font-size:16px;' +
                        'font-family:Microsoft YaHei;' +
                        'font-weight:bold;' +
                        'line-height:21px;' +
                        'color:rgba(19,84,143,1);' +
                        'opacity:1;';
                } else {
                    return ''
                }
            },

            isShowIcon(row, index){
                // if(row.row.child.length>0)
                    return ''
                // else
                //     return 'hiderow'
                // return 'hiderow'

            },
            rowClick(row, event, column) {

                if(row.id==this.cuttentid){
                    this.expands = [];
                    this.cuttentid='';
                }else {
                    this.expands = [];
                    this.expands.push(row.id);
                    this.cuttentid=row.id;
                }




            },

            // toggleRowExpansion(row){
            //     this.expands = [];
            //     this.expands.push(row.id);
            // }
        },

    }



</script>



<style>
    #table2 .el-table__expanded-cell{
        padding:0 !important;
        border-bottom: none;
    }
    .hiderow .el-table__expand-column .el-icon {
        visibility: hidden;
    }
</style>


<style lang="scss" scoped>
    /*@import "@s/green/variables.scss";*/


    #table2 .el-table__expanded-cell{
        padding:0 !important;
        border-bottom: none;
    }
    .hiderow .el-table__expand-column .el-icon {
        visibility: hidden;
    }


    .containerMain {
        padding-left: 0 !important;
        height: 100vh;
    }


    /deep/ .el-input__inner {
        height: 30px;
        line-height: 30px;
    }
    /deep/.el-input__icon {
        height: 100%;
        width: 25px;
        text-align: center;
        -webkit-transition: all .3s;
        transition: all .3s;
        line-height: 0px;
    }
    .input-with-select {
        width: 220px;
        height: 30px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
        opacity: 1;
        margin: 20px 0 0 20px;
        border-radius: 8px;
    }


    .expandItem{

        display: flex;
        width: 100%;
        /*padding: 0 10px 80 0px;*/
        margin-left: 80px;

        .expandItem_horn{

            display: flex;
            flex-direction: row;
            text-align: center;
            /*width: 100%;*/
            justify-content: space-evenly;
            margin-left: -44px;

            .leftIcon_title {

                display: flex;
                flex-direction: row;

                .itemSpan {
                    /*width: 120px;*/
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:19px;
                    color:rgba(24,144,255,1);
                    opacity:1;
                    padding-left: 10px;
                }
            }



            .leftIcon_title1 {

                display: flex;
                flex-direction: row;

                .itemSpan1 {
                    /*width: 120px;*/
                    font-size: 14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:19px;
                    color:rgba(72,88,239,1);
                    opacity:1;
                    padding-left: 10px;
                }
            }


            .leftIcon_title2 {

                display: flex;
                flex-direction: row;

                .itemSpan2 {
                    /*width: 120px;*/
                    font-size: 14px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    line-height: 19px;
                    color: rgba(28, 141, 10, 1);
                    opacity: 1;
                    opacity: 1;
                    padding-left: 10px;
                }
            }

            .leftIcon_title3 {

                display: flex;
                flex-direction: row;

                .itemSpan3 {
                    font-size: 14px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    line-height: 19px;
                    color: rgba(229, 51, 51, 1);
                    opacity: 1;
                    padding-left: 10px;
                }
            }



        }
    }

    .main_table{
        /*margin : 20px;*/
        border-radius:20px 20px 0px 0px;



        .template_edit {

            display: flex;
            flex-direction: row;
            text-align: center;
            justify-content: space-evenly;


            .leftIcon_title {

                display: flex;
                flex-direction: row;

                .itemSpan {
                    /*width: 120px;*/
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:19px;
                    color:rgba(24,144,255,1);
                    opacity:1;
                    padding-left: 10px;
                }
            }



            .leftIcon_title1 {

                display: flex;
                flex-direction: row;

                .itemSpan1 {
                    /*width: 120px;*/
                    font-size: 14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:19px;
                    color:rgba(72,88,239,1);
                    opacity:1;
                    padding-left: 10px;
                }
            }


            .leftIcon_title2 {

                display: flex;
                flex-direction: row;

                .itemSpan2 {
                    /*width: 120px;*/
                    font-size: 14px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    line-height: 19px;
                    color: rgba(28, 141, 10, 1);
                    opacity: 1;
                    opacity: 1;
                    padding-left: 10px;
                }
            }

            .leftIcon_title3 {

                display: flex;
                flex-direction: row;

                .itemSpan3 {
                    font-size: 14px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    line-height: 19px;
                    color: rgba(229, 51, 51, 1);
                    opacity: 1;
                    padding-left: 10px;
                }
            }

        }



        box-shadow:0px 10px 20px rgba(8,69,81,0.1);
        .row-user-col {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;

            .row-user-avatar {
                margin-left: 20px;
                height: 40px;
                border-radius: 50%;
                width: 40px;
            }
            .row-user-name{
                font-size:14px;
                font-family:Microsoft YaHei;
                font-weight:400;
                margin-left: 40px;
                color:rgba(102,102,102,1);
                opacity:1;
            }
        }


    }
</style>