/**
 * @author sjz
 * @augments 2019年5月14日13:52:35
 * @event 应收、预付、其他分析表的js方法
 */
import Vue from 'vue'
import { ageanalysis,query_sjz,update_sjz } from "~api/cube";
export default {
    // 单位切换数据处理
    getConversion(col, row, $this){
        // debugger
        let consersionId = $this.conversion.id ;
        let data = col.filter(res => { return res.type=="decimal" && res.conversion !="%" });
        data.forEach(element => {
            row.forEach(res => { 
                let cc =  res[element.id] ;
                if(cc && cc!=0 )res[element.id] = cc/consersionId ;
            });
        });
        return row ;
    },
    // 公司切换
    getJsonAdress(jsonId, biNisleaf){
        // debugger
        let cc ;
        // 应收
        if(jsonId === "yszk"){
            if(biNisleaf){
                cc = "/cnbi/json/yskxx/yszk.json" ;
            }else{
                cc = "/cnbi/json/yskxx/yszkej.json" ;
            }
        // 预付
        }else if(jsonId === "yfzk"){
            if(biNisleaf){
                cc = "/nbi/json/yskxx/yfzk.json" ;
            }else{
                cc = "/cnbi/json/yskxx/yfzkej.json" ;
            }
        // 其他
        }else if(jsonId === "qtysk"){
            if(biNisleaf){
                cc = "/cnbi/json/yskxx/qtysk.json" ;
            }else{
                cc = "/cnbi/json/yskxx/qtyskej.json" ;
            }
        }
        return cc ;
    },
    // 日期处理
    getPeriod($params){ 
        let period = "" ;
        if($params.month>0 && $params.month<10){
            period = "0" + $params.month ;
        }else{
            period = $params.month ;
        }
        return period ;
    },
    // 多表头处理
    getColumns(col, $col){
        let me = this ;
        col.forEach(res => { 
            if(res.children && res.children.length > 0){
                me.getColumns(res.children, $col) ;
            }else{
               $col.push(res) ; 
            }
        });
        return $col ;
    },
    // 下钻之后的json请求
    getRequestJson(jsonAdress, $this, newTabName, pool){
        // debugger
        let obj ;
        $this.axios.get(jsonAdress).then(res => { 
            obj = res.data;
            obj = eval("(" + obj + ")");
            obj.closable = true ;
            obj.data = [] ;
            obj.items.forEach((item,index)=>{
                Object.keys(item).forEach(key => {
                    obj[key] = item[key];
                });
            });
            $this.setRequestJson(obj, pool, newTabName) ;
        }); 
    },
    /**比例触发方法(点击之后触发 click事件)
     * @author 4.输入比例时触发（只更新数据）
     * 1. 如果数据未“ ” || 0 的情况下
     */
    changeFormater(me, see){
        // debugger
        let dimItem, sratiotype, paramsr ;
        let $params = me.$store.state.prame.command;
        let username = me.$store.getters.user.user.userName;
        let $this = this ;
        paramsr = {
            suser: username,
            company: $params.company,
            period : $params.year + this.getPeriod($params)               
        } 
        if(see.input3 == "" ){
            see.input3 = "" ; 
            see.value = 0 ;
        }else{
            see.value = see.input3;
            // string类型转number类型
            if(typeof see.value === "string" && see.input3 != ""){
                //输入数字
                see.value = see.value.replace(/[^\d.]/g, "").replace(/^0/, "") - 0;
            }
            if(see.value == 0){
                see.input3 = "" ;
            }else{
                // 千分位两位小数显示
                see.input3 = Math.decimalToLocalString(see.input3) ;
            }
        }
        // debugger
        if(see.id == "1" || see.id == "2"){
            dimItem = "1001" ;
            paramsr.item = dimItem ;
            query_sjz(paramsr).then(res => {
                // debugger
                let data = res.data.data ;
                if(data === null)$this.insertProportion(see.value, see.id, dimItem, me) ;
                if(data.length == 1){
                    let isTrue = data.some(item => { return item.sratiotype == see.id });
                    if(isTrue){
                        $this.updataRequest(dimItem, see.id, me, see) ;
                    }else{
                        $this.insertProportion(see.value, see.id, dimItem, me) ;
                    }
                }else if(data.length >= 2){
                    $this.updataRequest(dimItem, see.id, me, see) ;
                }
            });      

        }else if(see.id == "3" || see.id == "4"){
            dimItem = "1002" ;
            paramsr.item = dimItem ;
            if(see.id == "3")sratiotype = "1" ;
            if(see.id == "4")sratiotype = "2" ;
            query_sjz(paramsr).then(res => {
                // debugger
                let data = res.data.data ;
                if(data === null)$this.insertProportion(see.value, sratiotype, dimItem, me) ;
                if(data.length == 1){
                    let isTrue = data.some(item => { return item.sratiotype == sratiotype });
                    if(isTrue){
                        $this.updataRequest(dimItem, sratiotype, me, see) ;
                    }else{
                        $this.insertProportion(see.value, sratiotype, dimItem, me) ;
                    }
                }else if(data.length >= 2){
                    $this.updataRequest(dimItem, sratiotype, me, see) ;
                }
            });              

        }else if(see.id == "5" || see.id == "6"){
            dimItem = "1003" ;
            paramsr.item = dimItem ;
            if(see.id == "5")sratiotype = "1" ;
            if(see.id == "6")sratiotype = "2" ;          
            query_sjz(paramsr).then(res => {
                // debugger
                let data = res.data.data ;
                if(data === null)$this.insertProportion(see.value, sratiotype, dimItem, me) ;
                if(data.length == 1){
                    let isTrue = data.some(item => { return item.sratiotype == sratiotype });
                    if(isTrue){
                        $this.updataRequest(dimItem, sratiotype, me, see) ;
                    }else{
                        $this.insertProportion(see.value, sratiotype, dimItem, me) ;
                    }
                }else if(data.length >= 2){
                    $this.updataRequest(dimItem, sratiotype, me, see) ;
                }
            });
        }
    },
    /**updataRequest
     * @author 5.更新比例接口
     */
    updataRequest(dimItem, sratiotype, me, see){
        debugger
        let $params = me.$store.state.prame.command;
        let username = me.$store.getters.user.user.userName;
        let datas = me.objer.rows ;
        let paramsr = {
            company: $params.company,
            fact_a: see.value,
            id: 0,
            item: dimItem,
            period: $params.year + this.getPeriod($params),
            sratiotype: sratiotype,
            suser: username
        }
        update_sjz(paramsr).then(res => { 
            if(res.data.code === 200){
                me.$message({message: res.data.msg, type: 'success'});
                me.objer.queryDataAfter(datas, me) ;
            }else{
                me.$message.error(res.data.msg);
            }           
        })
    },
    /**@event 1.期间切换的时候或者刚点击页面的时候--查询--数据库的比例
     * getProportion：接受参数this对象，datas数据
     * 期间切换的时候 或者 刚点击页面的时候 查询 数据库的比例
     * 1. 获取表格的id（json里有写）；
     * 2. 根据唯一id来区分哪一张表格：
     *      （1）yszkej：应收账款二级汇总表1001
     *      （2）yfzkej：预付账款二级汇总表1002
     *      （3）else：其他应收款二级汇总表1003--上两者都不是的情况下
     * 3. 根据表的唯一标识来获取请求查询的数据--查询接口 proportionRequest
     */
    getProportion(me, datas, params){
        // debugger
        // 获取表的标识id
        let name = me.objer2.id ;
        if(name === "yszkej"){
            let dimItem = "1001" ;
            // 查询比例的接口请求
            this.proportionRequest(dimItem, me, datas, params) ;
        }else if(name === "yfzkej"){
            let dimItem = "1002" ;
            // 查询比例的接口请求
            this.proportionRequest(dimItem, me, datas, params) ;
        }else {
            let dimItem = "1003" ;
            // 查询比例的接口请求
            this.proportionRequest(dimItem, me, datas, params) ;
        }   
    },
    /**proportionRequest：接受参数dimItem: 表取数的唯一标识，me：this对象，datas：数据
     * @author 2.查询比例接口 
     * 查询是否有值，有的话就赋值，没有的话就输入值再插入值，有值后更改直接更新
     */
    proportionRequest(dimItem, me, datas, params){ 
        // 用户信息
        let $params = me.$store.state.prame.command;
        let username = me.$store.getters.user.user.userName;
        let proportion = me.objer2.proportion ;
        // 请求向后台传的参数 
        let paramsr = {
            item: dimItem,
            suser: username,
            company: $params.company,
            period : $params.year + this.getPeriod($params)               
        }
        // 请求的接口
        query_sjz(paramsr).then(res => { 
            let data = res.data.data ;
            if(data == null){
                me.$message("暂无比例数据，请输入比例！");
                for(let i=0; i<proportion.length; i++){
                    proportion[i].value = 0 ;
                    proportion[i].input3 = "";
                }
                me.queryEmptyArray = 0 ;
                me.objer.queryDataAfter(datas, me ) ;
            }else{
                if(data.length >= 2)me.queryEmptyArray = 1 ;
                me.$message({message: res.data.msg, type: 'success'});
                let one = data.filter(item => { return item.sratiotype == '1' });
                let two = data.filter(item => { return item.sratiotype == '2' });
                if(one.length > 0){
                    proportion[0].value = one[0].fact_a ;
                    if(one && one[0].fact_a && one[0].fact_a !=0){
                        proportion[0].input3 = Math.decimalToLocalString(one[0].fact_a) ;
                    }else{
                        proportion[0].input3 = "0.00" ;
                    }
                }
                if(two.length > 0){
                    proportion[1].value = two[0].fact_a ;
                    if(two &&two[0].fact_a && two[0].fact_a !=0){
                        proportion[1].input3 = Math.decimalToLocalString(two[0].fact_a) ;
                    }else{
                        proportion[1].input3 = "0.00" ;
                    }
                }
                me.objer.queryDataAfter(datas, me ) ;
            }
        });
    },
    /**insertProportion：接受参数number：初始化0，me：this对象，datas：数据
     * @author 3.插入比例接口
     */
    insertProportion(number, sratiotype, dimItem, me, datas, params){ 
        let $params = me.$store.state.prame.command;
        let username = me.$store.getters.user.user.userName;
        let paramsr= {
            company: $params.company,
            period: $params.year + this.getPeriod($params),
            fact_a: number,
            sratiotype: sratiotype,
            item: dimItem,
            suser: username
        }
        // 请求的接口
        ageanalysis(paramsr).then(res => { 
            if(res.data.code === 200){
                // let proportion = me.objer2.proportion ;
                // for(let i=0; i<proportion.length; i++){
                //     proportion[i].value = 0 ;
                //     proportion[i].input3 = "" ;
                // }
                me.$message({ message: res.data.msg, type: "success" }) ;
                me.objer.queryDataAfter(me.objer2.rows, me ) ;
            }else{
                me.$message.error(res.data.msg);
            }
        })
    }
}