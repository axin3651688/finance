
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
    },
    /**
     * @author sjz
     * @event 时间获取---作用于【提交时间】列
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
     * @param {*} me 
     * @param {*} value 
     */
    getParams(me, value){ 
        let $params = me.$store.state.prame.command;
        let departmentname = me.$store.getters.user.dept[0].scode ;
        let ngrade ;
        if(me.optiong.length == 0){
            ngrade = 0 ;
        }else{
            ngrade = me.optiong[0].nid ;
        }
        let time = this.getTimers() ;                   // 获取时间
        let sissubmit = value == "save"? "N" : "Y" ;    // 是否是添加按钮还是提交按钮
        let params = 
             [{
                "id": 0,                                  
                "period": $params.year + this.getPeriod($params),
                "company": $params.company,               
                "department": departmentname,             
                "sfilluser": me.form.sfilluser,           
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
                "ssubmituser": ""
             }];
        return params ;
    },
    /**
     * @author sjz
     * @event 初始化参数
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
    }

}