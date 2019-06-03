import { eva_city_Request } from "~api/cube.js";
// 引用的tools.js文件
import tools from "utils/tools";
export default {
    /**
     * @author sjz
     * @event 日期处理
     * @name 【风险识别页面引用】
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
    },
    /**
     * @author sjz
     * @event 时间获取---作用于【提交时间】列
     * @name 【风险识别页面引用】
     * @param {*} 
     */
    getTimers(){
        // 1. 获取时间
        let date = new Date();
        // 2. 获取年分
        let year = date.getFullYear();
        // 3. 获取月份
        let month = date.getMonth() + 1;
        //      处理月份：小于10的前缀+'0'，否则返回它本身
        month = month < 10 ? ('0' + month) : month;
        // 4. 获取天数（日）
        let day = date.getDate();
        //      处理天数：小于10的前缀+'0'，否则返回它本身
        day = day < 10 ? ('0' + day) : day;
        // 5. 获取小时
        let hours = date.getHours();
        //      处理小时：小于10的前缀+'0'，否则返回它本身
        hours = hours < 10 ? ('0' + hours) : hours;
        // 6. 获取分钟
        let minutes = date.getMinutes();
        //      处理分钟：小于10的前缀+'0'，否则返回它本身
        minutes = minutes < 10 ? ('0' + minutes) : minutes;
        // 7. 获取秒钟
        let seconds = date.getSeconds();
        //      处理秒钟：小于10的前缀+'0'，否则返回它本身
        seconds = seconds < 10 ? ('0' + seconds) : seconds;
        // 返回需要的格式
        return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    },
    /**
     * @author sjz
     * @event 保存/提交按钮触发时获取的请求参数
     * @name 【风险识别页面引用】
     * @param {*} me 
     * @param {*} value 
     */
    getParams(me, value){ 
        // debugger
        let $params = me.$store.state.prame.command;
        let departmentname = me.$store.getters.user.dept[0].scode ;
        let ngrade, sissubmit, nid ;
        // 风险等级编码获取
        if(me.optiong.length){
            ngrade = me.optiong[0].nid ;
        }else{
            if(me.newThis.view_row.id >= 0){
                ngrade = me.newThis.view_row.ngrade ;
            }else{
                ngrade = 0 ;
            }
        }
        
        // ngrade = me.form.gradename > 0? me.form.gradename : 0 ;
        let time = this.getTimers() ;                   // 获取时间
        if(me.newThis.modify_btn == 1){                 // 修改弹出框
            if(me.newThis.view_row.sissubmit == "已提交"){
                sissubmit = "Y" ;
            }else{
                // sissubmit = "N" ;
                sissubmit = value == "save"? "N" : "Y" ;
            }           
            nid = me.newThis.view_row.id ;
        }else{
            sissubmit = value == "save"? "N" : "Y" ;    // 是否是添加按钮还是提交按钮
            nid = 0 ;
        }
        let ssubmituser = me.$store.getters.user.user.userName ;
        // let ssubmituser = value == "save"? me.form.sfilluser : me.$store.getters.user.user.userName ;me.form.sfilluser
        let params = 
            [{
                "id": nid,                                  
                "period": $params.year + this.getPeriod($params),
                "company": $params.company,               
                "department": departmentname,             
                "sfilluser": ssubmituser,           
                "sriskname": me.form.sriskname,           
                "srisktype": me.form.srisktype,           
                "sriskdescription": me.form.sriskdescription,     
                "nprobability": me.form.nprobability,     
                "ninfluence": me.form.ninfluence,         
                "nscore": me.form.nscore,                 
                "ngrade": ngrade,                         
                "sreporttype": me.form.sreporttype,       
                "smeasures": me.form.smeasures,           
                "sproposal": me.form.sproposal,           
                "sissubmit": sissubmit,                  
                "sorigin": "添加",                        
                "screatetime": time,                      
                "ssubmittime": time,
                "sisclose": "",
                "ssubmituser": ssubmituser
            }];
        return params ;
    },
    /**
     * @author sjz
     * @event 初始化参数
     * @name 【风险识别页面引用】
     * @param {*} me 
     */
    getForm(me){
        let sfilluser = me.$store.getters.user.user.userName;
        let departmentname = me.$store.getters.user.dept[0].sname ;
        let form = {
            sriskname: "",                  // 风险名称
            srisktype: "",                  // 风险类型
            departmentname: departmentname, // 填报部门（只读）
            sfilluser: sfilluser,           // 填报人（只读）
            sriskdescription: "",           // 风险概述
            smeasures: "",                  // 采取措施
            sproposal: "",                  // 应对建议
            nprobability: "",               // 风险发生概率
            ninfluence: "",                 // 风险影响程度
            nscore: "",                     // 风险分值（只读，自动计算，根据R=L*S）
            gradename: "",                  // 风险等级（只读）
            sreporttype: "",                // 报告类型
        }
        return form ;
    },
    /**
     * @author sjz
     * @event 看看有没有变化数据的（修改弹出框的保存按钮）（已提交的页面）
     * @name 【风险识别页面引用】
     * @param {*} me 
     */
    getForChange(me){
        // debugger
        var viewTrue = false ;
        var viewFalse= true ;
        // 看有没有改动的
        for(let keys in me.form){
            if(me.form[keys] == me.newThis.view_row[keys]){
                viewTrue = true ;
            }else{
                viewFalse = false ;
            }
        }
        if(!viewFalse){
            return viewFalse ;
        }else{
            return viewTrue ;
        }       
    },
    /**
     * @author sjz
     * @event 看看有没有变化数据的（修改弹出框的保存按钮）（未提交的页面）
     * @name 【风险识别页面引用】
     * @param {*} me 
     */
    getForChange2(me){
        // debugger
        let isTrue = false ;
        let isFalse= true ;
        for(let kk in me.form){
            if(me.form[kk] && me.form[kk]!="" && me.form[kk]!=0){
                if(me.form[kk] == me.newThis.view_row[kk]){
                    isTrue = true ;
                }else{
                    isFalse = false ;
                }
            }
        }
        if(!isFalse){
            return isFalse;
        }else{
            return isTrue ;
        }
    },
    /**
     * @author sjz
     * @event 获取得到下达弹出框的公司树数据
     * @name 【风险识别页面引用】
     * @param {*} me 
     */
    getCompanyTree(me){
        // debugger
        let $params = me.$store.state.prame.command;
        let _sql = ` select scode, sname, spcode, connect_by_isleaf as cisleaf, level as nlevel from dw_dimcompany start with scode = :company connect by prior scode = spcode order by level ` ;
        _sql = _sql.replace(/:company/g,"'"+$params.company+"'");
        let params = {
            cubeId: 4,
            sql: encodeURI(_sql) 
        }
        const _this = this ;
        _this.getCompanyTree_request(_this,me, params) ;
    },
    /**
     * @author sjz
     * @event 获取得到下达弹出框的公司树数据请求方法
     * @name 【风险识别页面引用】
     * @param {*} _this 
     * @param {*} me 
     * @param {*} params 
     */
    getCompanyTree_request(_this,me, params){
        eva_city_Request(params).then(red => {
            if(red.data.code === 200){
                //封装树对象数据
                const setting = {
                    data: {
                        simpleData: {
                            enable: true,
                            idKey: "scode",
                            pIdKey: "spcode"
                        },
                        key: {
                            name: "scode",
                            children: "children"
                        }
                    }
                };
                var data = red.data.data;
                if (Array.isArray(data) && data.length > 0) {
                    data = tools.sortByKey(data, "scode");
                    data = data.filter(function(item) {
                        item.id = item.scode;
                        item.label = "(" + item.scode + ") " + item.sname;
                        return item;
                    });
                    data.forEach((ress, index) => {
                        if(index === 0 || ress.id=="1001")ress.disabled = true ;
                    })
                    me.comtree2 = data;
                    me.comtree2 = tools.transformToeTreeNodes(setting, data);
                    // return me.getCompanyTree_set(me.comtree2);
                    return me.comtree2
                }
            }else{
                _this.$message.error(red.data.msg) ;
                // return me.getCompanyTree_set(me.comtree2);
                return me.comtree2
            }
        })
    },
    /**
     * @author sjz
     * @event 默认公司树表全部展开、
     * @name 【风险报告页面引用】
     * @param {*} data 
     */
    getOpenbyDefault(data){
        data.forEach(quo2 => {
            quo2._expanded = true ;           
        });
        return data ;
    },
    /**
     * @author sjz
     * @event 根据sql、cubeId来查询的数据接口请求方法
     * @name 【风险报告页面引用】
     * @param {*} $this     this对象
     * @param {*} sparam    请求参数={ cubeId：4，sql：sql }
     */
    getSql_quertData_all($this, sparam){
        eva_city_Request(sparam).then(rec => {
            if(rec.data.code === 200){
                let data = rec.data.data ;
                return $this.setSql_quertData_all(data);
            }else{
                $this.$message.error( rec.data.msg );
            }
        })
    },
    /**
     * @author sjz
     * @event 总述文字
     * @name 【风险报告页面引用】
     * @param {*} directory 
     */
    getReportOverviewText(directory){
        debugger
        let dd = [] ;
        let html = "" ;
        directory.forEach((ffq, index) => {
            let fuhao = directory.length==index+1?"；": "，";
            ffq.html = ffq.sname + ffq.ncount + '条' + fuhao ;
            dd[index] = ffq.html ;
        });
        
        for(let i=0; i<dd.length; i++){
            html += dd[i] ;
        }
        return html ;
    }
}