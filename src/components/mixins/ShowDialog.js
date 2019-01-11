import {
    apiItemDatas
} from 'utils/apiItemDatas'
import {
    findThirdPartData,
} from "~api/interface";
export default {
    methods: {
        // 指标分析里面的点击弹出gialog,通过向vuex传值,包括标题,内容等
        dilogShow(col, scope) {
            if ("showdilog" in col) {
                var params = apiItemDatas(this.tableData)
                /**
                 * 根据sql, params发请求
                 */
                findThirdPartData(params)
                    .then(res => {
                        var data = res.data.data
                        debugger
                        console.log(data);
                        let t = scope.row.text + this.year + "年1-" + this.month + "月" + this.tableData.text + "与上年同期相比，成倍下降的主要原因是：";
                        let d = scope.row;
                        this.ShowDialog({
                            data: data,
                            isShow: true,
                            tittle: t,
                            width: "80%",
                            height: "500px"
                        });
                    })
                    .catch(res => {
                        console.info(res);
                    });
            }
            console.log(this.tableData);

        }
    }
}