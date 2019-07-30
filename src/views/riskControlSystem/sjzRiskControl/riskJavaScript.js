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
    getPeriod($params) {
        let month;
        if ($params.month > 0 && $params.month < 10) {
            month = '0' + $params.month;
        } else {
            month = $params.month;
        }
        return month;
    },
    /**
     * @author sjz
     * @event 时间获取---作用于【提交时间】列
     * @name 【风险识别页面引用】
     * @param {*} 
     */
    getTimers() {
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
    getParams(me, value) {
        // debugger
        let $params = me.$store.state.prame.command;
        let departmentname = me.$store.getters.user.dept[0].scode || 0;
        let ngrade, sissubmit, nid, screatetime;
        // 风险等级编码获取
        if (me.optiong.length) {
            ngrade = me.optiong[0].nid;
        } else {
            if (me.newThis.view_row.id >= 0) {
                ngrade = me.newThis.view_row.ngrade;
            } else {
                ngrade = 0;
            }
        }

        // ngrade = me.form.gradename > 0? me.form.gradename : 0 ;
        if (me.newThis.modify_btn == 1) { // 修改弹出框
            // if(me.newThis.view_row.sissubmit == "已提交"){
            //     sissubmit = "Y" ;
            // }else{
            // sissubmit = "N" ;
            sissubmit = value == "save" ? "N" : "Y";
            // }           
            nid = me.newThis.view_row.id;
        } else {
            sissubmit = value == "save" ? "N" : "Y"; // 是否是添加按钮还是提交按钮
            nid = 0;
        }
        let time = this.getTimers(); // 获取时间
        if (value == "sub3") nid = me.newThis.view_row.id;
        // 说明为添加的数据（第一次）
        if (nid === 0) {
            screatetime = this.getTimers();
        } else {
            screatetime = me.form.screatetime;
        }
        let ssubmituser = me.$store.getters.user.user.userName;
        // debugger
        // let ssubmituser = value == "save"? me.form.sfilluser : me.$store.getters.user.user.userName ;me.form.sfilluser
        let params = [{
            "id": nid,
            "period": $params.year + this.getPeriod($params), // 日期
            "company": $params.company, // 公司              
            "department": departmentname, // 部门           
            "sfilluser": ssubmituser, // 用户名          
            "sriskname": me.form.sriskname, // 风险名称        
            "srisktype": me.form.srisktype, // 风险类型         
            "sriskdescription": me.form.sriskdescription, // 风险概述    
            "nprobability": me.form.nprobability, // 风险发生概率
            "ninfluence": me.form.ninfluence, // 风险影响等级     
            "nscore": me.form.nscore, // 风险分值              
            "ngrade": ngrade, // 风险等级
            "sreporttype": me.form.sreporttype, // 报告类型      
            "smeasures": me.form.smeasures, // 采取措施       
            "sproposal": me.form.sproposal, // 应对建议
            "sissubmit": sissubmit, // 提交状态                 
            "sorigin": "添加",
            "screatetime": screatetime, // 创建时间（死的-创建后就不变了，除非删除风险）              
            "ssubmittime": time, // 提交时间（动态）
            "sisclose": "",
            "ssubmituser": ssubmituser // 提交人
        }];
        return params;
    },
    /**
     * @author sjz
     * @event 保存/提交按钮触发-判断风险名称是否重复
     * @name 【风险识别页面引用】
     * @param {*} me 
     * @param {*} val
     */
    isSriskName(me, val){ //debugger
        let isName, data ;
        let name = me.form.sriskname ;
        let id = me.form.id ;
        // 如果val===add，则为添加按钮弹出框；反之则为修改弹出框
        if(val === "add") {
            // 当name === ‘’时，则可以随意添加（要求，只要风险名称不一样就行了），反之则继续
            if(name === "")return false ;
            isName = me.newThis.tableData.some(res => { return res.sriskname == name ; }) ;
        } else {
            // 首先先过滤掉自己，防止自己也变成重复的风险名称而被限制，不能保存 + 提交
            data = me.newThis.tableData.filter(sjk => { return sjk.id !== id ; }) ;
            isName = data.some(item => { return item.sriskname == name ; }) ;
        }
        return isName ;
    },
    /**
     * @author sjz
     * @event 初始化参数
     * @name 【风险识别页面引用】
     * @param {*} me 
     */
    getForm(me) {
        let sfilluser = me.$store.getters.user.user.userName;
        let departmentname = me.$store.getters.user.dept[0].sname;
        let form = {
            sriskname: "", // 风险名称
            srisktype: "", // 风险类型
            departmentname: departmentname, // 填报部门（只读）
            sfilluser: sfilluser, // 填报人（只读）
            sriskdescription: "", // 风险概述
            smeasures: "", // 采取措施
            sproposal: "", // 应对建议
            nprobability: "", // 风险发生概率
            ninfluence: "", // 风险影响程度
            nscore: "", // 风险分值（只读，自动计算，根据R=L*S）
            gradename: "", // 风险等级（只读）
            sreporttype: "", // 报告类型
        }
        return form;
    },
    /**
     * @author sjz
     * @event 看看有没有变化数据的（修改弹出框的保存按钮）（已提交的页面）
     * @name 【风险识别页面引用】
     * @param {*} me 
     */
    getForChange(me) {
        // debugger
        // 看有没有改动的
        // 判断报告类型是否是启用/禁用状态 0=启用 | 1=不启用
        let foom = {} ;
        if(me.newThis.reporttype) {
            for(let keyy in me.form) {
                if(keyy !== "sreporttype" && keyy !== "sreporttypename")foom[keyy] = me.form[keyy] ;
            }
            for (let keys in foom) {
                if (me.form[keys] == me.newThis.view_row[keys]) {
    
                } else {
                    return false ;
                }
            }
        } else {
            for (let keys in me.form) {
                if (me.form[keys] == me.newThis.view_row[keys]) {
    
                } else {
                    return false ;
                }
            }
        }
        return true ;
    },
    /**
     * @author sjz
     * @event 看看有没有变化数据的（修改弹出框的保存按钮）（未提交的页面）
     * @name 【风险识别页面引用】
     * @param {*} me 
     */
    getForChange2(me) {
        // debugger
        // 判断报告类型是否是启用/禁用状态 0=启用 | 1=不启用
        let foom = {} ;
        if(me.newThis.reporttype) {
            for(let keyy in me.form) {
                if(keyy !== "sreporttype" && keyy !== "sreporttypename")foom[keyy] = me.form[keyy] ;
            }
            for (let kk in foom) {
                if (foom[kk] && foom[kk] != "" && foom[kk] != 0) {
                    if (foom[kk] == me.newThis.view_row[kk]) {
    
                    } else {
                        return false ;
                    }
                }
            }
        } else {
            for (let kk in me.form) {
                if (me.form[kk] && me.form[kk] != "" && me.form[kk] != 0) {
                    if (me.form[kk] == me.newThis.view_row[kk]) {
    
                    } else {
                        return false ;
                    }
                }
            }
        }
        return true ;
    },
    /**
     * @author sjz
     * @event 获取得到下达弹出框的公司树数据
     * @name 【风险识别页面引用】
     * @param {*} me 
     */
    getCompanyTree(me) {
        // debugger
        let $params = me.$store.state.prame.command;
        let _sql = ` select scode, sname, spcode, connect_by_isleaf as cisleaf, level as nlevel from dw_dimcompany start with scode = :company connect by prior scode = spcode order by level `;
        _sql = _sql.replace(/:company/g, "'" + $params.company + "'");
        let params = {
            cubeId: 4,
            sql: encodeURI(_sql)
        }
        const _this = this;
        _this.getCompanyTree_request(_this, me, params);
    },
    /**
     * @author sjz
     * @event 获取得到下达弹出框的公司树数据请求方法
     * @name 【风险识别页面引用】
     * @param {*} _this 
     * @param {*} me 
     * @param {*} params 
     */
    getCompanyTree_request(_this, me, params) {
        eva_city_Request(params).then(red => {
            if (red.data.code === 200) {
                _this.elementUI_tree(red.data.data, me, null);
            } else {
                me.$message.error(red.data.msg);
                // return me.getCompanyTree_set(me.comtree2);
                return me.comtree2
            }
        })
    },
    elementUI_tree(data, me, vax) {
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
        // var data = red.data.data;
        if (Array.isArray(data) && data.length > 0) {
            data = tools.sortByKey(data, "scode");
            data = data.filter(function(item) {
                item.id = item.scode;
                // item.label = "(" + item.scode + ") " + item.sname;
                item.label = item.sname;
                return item;
            });
            if (vax === null) {
                data.forEach((ress, index) => {
                    if (index === 0 || ress.id == "1001") ress.disabled = true;
                })
                me.comtree2 = data;
                me.comtree2 = tools.transformToeTreeNodes(setting, data);
                console.log('树形', me.comtree2);
                return me.comtree2
            } else {
                data = tools.transformToeTreeNodes(setting, data);
                return data;
            }
        }
    },
    /**
     * @author sjz
     * @event 默认公司树表全部展开、
     * @name 【风险报告页面引用】
     * @param {*} data 
     */
    getOpenbyDefault(data) {
        let isTrue = false;
        data.forEach(quo2 => { if (quo2.scode === "1001") isTrue = true; });
        if (isTrue) {
            data.forEach(quo2 => { if (quo2.scode === "1001") { quo2._expanded = true } else { quo2._expanded = false } });
        } else {
            data.forEach(quo2 => { quo2._expanded = true; });
        }
        return data;
    },
    /**
     * @author sjz
     * @event 根据sql、cubeId来查询的数据接口请求方法
     * @name 【风险报告页面引用】
     * @param {*} $this     this对象
     * @param {*} sparam    请求参数={ cubeId：4，sql：sql }
     */
    getSql_quertData_all($this, sparam) {
        eva_city_Request(sparam).then(rec => { 
            if (rec.data.code === 200) {
                let data = rec.data.data;
                return $this.setSql_quertData_all(data);
            } else {
                $this.$message.error(rec.data.msg);
            }
        })
    },
    /**
     * @author sjz
     * @event 总述文字
     * @name 【风险报告页面引用】
     * @param {*} directory 
     */
    getReportOverviewText(data) {
        // debugger
        let dd = [];
        let html = "";
        data.forEach((ffq, index) => {
            let fuhao = data.length == index + 1 ? "；" : "，";
            ffq.html = ffq.sname + ffq.ncount + '条' + fuhao;
            dd[index] = ffq.html;
        });

        for (let i = 0; i < dd.length; i++) {
            html += dd[i];
        }
        return html;
    },
    /**
     * @author sjz
     * @event 等级切割
     * @name 【风险报告页面引用】
     * @param {*} value 
     */
    currency(value) {
        // debugger
        let cc ;
        // cc = value.slice(0, 2); //截取第一个到第二个之间的字符 **
        return value;
    },
    /**
     * @author sjz
     * @event 文字加前缀加序号
     * @name 【风险报告页面引用】
     * @param {*} value 
     */
    currency_text(value) {
        let cc = "1、" + value;
        return cc;
    },
    /**
     * @author sjz
     * @event 上报页面的上报按钮的弹出框
     * @name 【风险报告页面引用】
     * @param {*} data 
     * @param {*} me  
     */
    reportDataTree(data, me) { 
        // 由于不能上报给自己，所以过滤掉自己
        let $params = me.$store.state.user.user.user ;
        data = data.filter(res => { return res.suser !== $params.userName })
        // -----
        let objRes = {};
        if (data && data.length > 0) {
            data.forEach(item => {
                if (!objRes[item.scode]) {
                    objRes[item.scode] = item.scode;
                }
            });
        }
        let dptUser = [];
        for (let key in objRes) {
            let objDptUser = {
                id: "",
                label: "",
                children: []
            };
            for (let i = 0; i < data.length; i++) {
                let item = data[i];
                if (item.scode == key) {
                    if (item.usernid) {
                        let objItem = {
                            id: item.suser,
                            label: item.username
                        };
                        objDptUser.id = item.scode;
                        objDptUser.label = item.sname;
                        objDptUser.children.push(objItem);
                    } else {
                        objDptUser.id = item.scode;
                        objDptUser.label = item.sname;
                    }
                }
            }
            dptUser.push(objDptUser);
        }
        dptUser.forEach(rep => { rep.disabled = true }) ;
        return dptUser;
    },
    /**
     * @author sjz
     * @event 上报页面的【退回】【催报】的参数
     * @name 【风险报告页面引用】
     * @param {*} data 
     */
    getBackreportdetailp(me, scope, sisreport, toUsers) {
        // debugger
        let $params = me.$store.state.prame.command;
        let sfilluser = me.$store.getters.user.user.userName;
        let params = {
            company: scope.row.id,
            period: $params.year + this.getPeriod($params),
            sisreport: sisreport,
            sreporttime: this.getTimers(),
            sreportuser: sfilluser,
            toUsers
        }
        return params;
    }
}