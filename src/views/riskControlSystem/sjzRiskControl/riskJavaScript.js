
export default {
    /**
     * @author sjz
     * @event 日期处理
     * @param {*} $params 
     */
    getPeriod($params){
        let month ;
        if($params.month > 0 && $params.month < 10){
            month = '0' + $params.month ;
        }else{
            month = $params.month ;
        }
        return month ;
    }
}