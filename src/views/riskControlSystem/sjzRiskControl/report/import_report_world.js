/**
 * @name sjz
 * @description 2019年7月3日08:59:11
 * @description 风险报告导出 js文件
 */
// 引用公用 js 方法
import mini from "@v/riskControlSystem/sjzRiskControl/riskJavaScript.js";
// Qs是axios里面自带的
import Qs from 'qs'
import { stringify } from 'querystring';
export default {
    importReportWorld(me) {  
        let _this = this ;
        // json 导出传的值（文字）
        let jsonBean = {
            "text": me.textBody2,
            "level": 0,
            "leaf": 0,
            "type": null,
            "content": null,
            "children": [
                {
                    "text": "总述",
                    "level": 1,
                    "leaf": 0,
                    "type": null,
                    "content": me.html2,
                    "children": null
                }
            ]
        }
        // 固定显示的
        let context = ["风险名称","风险评估","风险概述","采取措施","应对建议"] ;
        // 如果目录有数据，说明报告不为空 
        if(me.directory.length > 0) {
            // 循环目录
            for(let i=0; i<me.directory.length; i++) {
                jsonBean.children.push({
                    text: me.directory[i].text,
                    level: 1,
                    leaf: 0,
                    type: null,
                    content: null,
                    children: []
                });
            }
            // 两个数据匹配，相同的放入各自的里面
            jsonBean.children.forEach((element, index) => { 
                me.dataReport.forEach((item, index) => { 
                    let text = element.text.slice(2, element.text.length) ; 
                    // 风险名称，风险评估，风险概述，采取措施，应对建议
                    let context2 = [item.sriskname, item.text1+"<br>"+item.text2, item.sriskdescription, item.smeasures, item.sproposal] ;
                    // debugger
                    if(text === item.srootrisktypename) {
                        element.children.push({
                            text: null,
                            level: 2,
                            leaf: 1,
                            type: "text",
                            content: item.srisktypename + '' + item.ngradename + '' + me.textTitle + ' 识别人：' + item.ssubmituser ,
                            children: []
                        });
                        // debugger
                        // context 固定显示的数据就5个
                        for(let k=0; k<context.length; k++) {
                            element.children.push({
                                text: null,
                                level: 2,
                                leaf: 0,
                                type: "text",
                                content: "<strong>"+ context[k] + "：",
                                children: [{
                                    text: null,
                                    level: 3,
                                    leaf: 1,
                                    type: "text",
                                    content: context2[k],
                                    children: []
                                }]
                            })
                        }
                    }
                });
            });
        }
        debugger
        let $params = me.$store.state.prame.command;
        // var data = Qs.stringify({"matterIds":"1,2,3"});
        // 参数
        let params = {
            jsonBean: JSON.stringify(jsonBean) ,
            company: $params.company ,
            year: $params.year ,
            month: mini.getPeriod($params) ,
            text: me.textBody
        }
        this.exportDocxRequest(params, me) ;
    },
    exportDocxRequest(params, me) { 
        /**风险报告world导出请求
         * 
         * 是个坑
         * （1）用Qs.stringify()将对象序列化成URL的形式，Qs是axios里面自带的，所以直接引入就可以了
         * ---------------------------------------------------------------------------------------------------/
         * （2）设置请求头里的'Content-Type'为'application/x-www-form-urlencoded'
         * ---------------------------------------------------------------------------------------------------/
         * （3）为何要设置请求头里的'Content-Type'：
         *      我们使用不同请求方式时，参数的传输方式是不一样的，但是服务端在取我们接口的请求参数时，用的方法其实却是一样的，
         *      都是使用request.getParameter(key)来获取，其实是因为tomcat在中间会对请求参数进行解析处理，处理完把解析出来的表单参数放在request parameter map中，
         *      所以后端就可以通过request.getParameter(key)来统一获取数据，而tomcat解析的时候是怎么知道当前的请求是post请求的呢，
         *      就是通过'contentType'，当'contentType'为"application/x-www-form-urlencoded",它才会去读取请求体数据。
         * ----------------------------------------------------------------------------------------------------/
         * （4）为何要用Qs.stringify()将对象序列化成URL的形式：
         *      用post请求参数是以键值对的形式存在请求体里，用Qs.stringify()就是把传入的对象转换为键值对。
         */
        me.axios.post('/exp/exportDocx',Qs.stringify(params), {headers:{'Content-Type':'application/x-www-form-urlencoded'}, responseType:'blob'}).then((res)=>{
            console.log(res)
            if(res.status === 200) {
                let blob = new Blob([res.data], {
                    type: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                });
                if (window.navigator.msSaveOrOpenBlob) {
                    navigator.msSaveBlob(blob);
                } else {
                    let elink = document.createElement("a");
                    elink.download = me.textBody + '.docx' ;
                    elink.style.display = "none";
                    elink.href = URL.createObjectURL(blob);
                    document.body.appendChild(elink);
                    elink.click();
                    document.body.removeChild(elink);
                    me.$message({ message: "导出成功！", type: "success" }) ;
                }
            } else {
                me.$message.error('发生了个小意外！请联系开发人员哦！') ;
            }
        })
    }
}