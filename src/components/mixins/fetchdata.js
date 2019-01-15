import {
    apiItemDatas
} from 'utils/apiItemDatas'
import {
    findThirdPartData,
} from "~api/interface";
export default {
    methods: {
        // 指标分析里面的点击弹出gialog,通过向vuex传值,包括标题,内容等
        fetchData(code) {
            var params = apiItemDatas(this.item, code)
            /**
             * 根据sql, params发请求
             */
            console.log(params);
            debugger
            findThirdPartData(params)
                .then(res => {
                    var data = res.data.data
                    debugger
                    console.log(data);
                    let t = scope.row.text + this.year + "年1-" + this.month + "月" + this.tableData.text + "与上年同期相比，成倍下降的主要原因是：";
                    let d = scope.row;

                })
                .catch(res => {
                    console.info(res);
                });


        }
    }
}