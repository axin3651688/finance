export default {
    /**
     * 请求参数上添加sql语句。
     * @author szc 2019年5月21日14:15:22
     */
    paramsOfSql(params, data, sqlId) {
        let me = this;
        if (data && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                let item = data[i];
                if (item.id == sqlId) {
                    params.sql = item.sql;
                    break;
                }
            }
        }
        return params;
    }
}