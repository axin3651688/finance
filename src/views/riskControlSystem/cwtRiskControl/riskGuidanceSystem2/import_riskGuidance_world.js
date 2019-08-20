/**
 * @name sjz
 * @description 2019年7月24日14:38:25
 * @description 风险指引制度导出 js文件
 */
// Qs是axios里面自带的
import Qs from 'qs'
export default {
    importRiskGuidanceWorld(me, stype){
        let jsonBean = {
            "text": "风险指引",
            "level": 0,
            "leaf": 0,
            "type": null,
            "content": null,
            "children": []
        }
        if(me.directory.length > 0) {
            // 渲染目录
            for(let i = 0; i < me.directory.length; i++) {
                jsonBean.children.push({
                    "text": me.directory[i].sname,
                    "level": 1,
                    "leaf": 0,
                    "type": null,
                    "content": null,
                    "children":[]
                });
            }
            jsonBean.children.forEach(res => { 
                let dd = me.content.filter(item => { return res.text === item.catalogname && item.nlevel === 1 }) ;
                if(dd.length > 0) {
                    dd.forEach(ress => {
                        res.children.push({
                            "text": null,
                            "level": 2,
                            "id": ress.id,
                            "pid": ress.pid,
                            "leaf": 0,
                            "type": null,
                            "content": ress.scontent,
                            "children":[]
                        })
                    })
                }
            })
            // debugger
            jsonBean.children.forEach(res => {
                if(res.children.length > 0) {
                    res.children.forEach(element => {
                        let ff = me.content.filter(item => { return item.nlevel === 2 && element.id === item.pid }) ;
                        ff.forEach(ress => {
                            element.children.push({
                                "text": null,
                                "level": 3,
                                "id": ress.id,
                                "pid": ress.pid,
                                "leaf": 0,
                                "type": null,
                                "content": ress.scontent,
                                "children":[]
                            })
                        })
                    })
                }
            })
            jsonBean.children.forEach(res => { 
                if(res.children.length > 0) {
                    res.children.forEach(element => { 
                        if(element.children.length > 0) {
                            element.children.forEach(element2 => {
                                let gg = me.content.filter(item => { return item.nlevel === 3 && element2.id === item.pid }) ;
                                gg.forEach(item2 => {
                                    element2.children.push({
                                        "text": null,
                                        "level": 4,
                                        "id": item2.id,
                                        "pid": item2.pid,
                                        "leaf": 0,
                                        "type": null,
                                        "content": item2.scontent,
                                        "children":[]
                                    })
                                })
                            })
                        }
                    })
                }
            })
        }
        // return false ;
        // debugger
        let $params = me.$store.state.prame.command;
        // 参数
        let params = {
            jsonBean: JSON.stringify(jsonBean) ,
            company: $params.company ,
            year: $params.year ,
            month: this.getPeriod($params) ,
            text: "风险指引" ,
            textId: me.titleName[0].id 
        }
        // 导出类型  走导出请求方法
        if(stype === "import") {
            params.soprateType = "export" ;
            this.exportDocxRequest(params, me) ;
        }
        // 预览类型  走预览请求方法
        if(stype === "preview") {
            params.soprateType = "review" ;
            this.previewRequest(params, me) ;
        }
    },
    /**
     * 月份处理
     * @param {*} $params 
     */
    getPeriod($params) {
        let mm ;
        if($params.month > 0 && $params.month < 10) {
            mm = '0' + $params.month ;
        } else {
            mm = $params.month ;
        }
        return mm ;
    },
    // 导出方法
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
        me.axios.post('/exp/showPdfandExportPdf',Qs.stringify(params), {headers:{'Content-Type':'application/x-www-form-urlencoded'}, responseType:'blob'}).then((res)=>{
            console.log(res)
            if(res.status === 200) {
                let blob = new Blob([res.data], {
                    type: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                });
                if (window.navigator.msSaveOrOpenBlob) {
                    navigator.msSaveBlob(blob);
                } else {
                    let elink = document.createElement("a");
                    elink.download = '风险指引制度' + '.pdf' ;
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
    },
    // 预览方法
    previewRequest(params, me) {
        me.axios.post(
            '/exp/showPdfandExportPdf',
            Qs.stringify(params)
        ).then((res)=>{
            if(res.status === 200) { 
                if(res.data.code === 200) {
                    // debugger
                    me.previewURL = res.data.data ;
                    let a = document.getElementById(me.review)
                    a.setAttribute("onclick",'');
                    a.click();
                } else {
                    me.$message.error(res.data.msg) ;
                }
            } else {
                me.$message.error('发生了个小意外！请联系开发人员哦！') ;
            }
        })
    }
}