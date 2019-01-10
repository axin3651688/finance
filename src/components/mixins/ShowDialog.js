export default {
    methods: {
        // 指标分析里面的点击弹出gialog,通过向vuex传值,包括标题,内容等
        dilogShow(col, scope) {
            if ("showdilog" in col) {
                console.log(scope.row);
                let t = scope.row.text + this.year + "年1-" + this.month + "月" + this.tableData.text + "与上年同期相比，成倍下降的主要原因是：";
                let d = scope.row;
                this.ShowDialog({
                    data: d,
                    isShow: true,
                    tittle: t,
                    width: "35%",
                    height: "1000px"
                });
            }
            // console.log(this.tableData);
            // debugger;
        }
    }
}