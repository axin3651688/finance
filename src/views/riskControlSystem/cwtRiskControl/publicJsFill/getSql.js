/**
 * @功能 通过sqlKey获取sql文件的方法
 * @author cwt
 * @time 2019-5-22
 */
export default {
    getSqlByKey(params){
        debugger;
        let sqlId = params.sqlId;

        this.axios.get("/cnbi/json/source/tjsp/riskSql/cwtRiskControlSql/riskSql.json").then(res =>{
            debugger;
            let ress = res;
        })
    }
}