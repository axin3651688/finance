<template>
<!--
    name: sjz
    说明：组织管理的部门管理页面
-->
    <div id="userDepartment">
        <!-- 查找过滤 -->
        <el-input placeholder="输入关键字进行过滤" v-model="filterText" clearable></el-input>
        <!-- 公司 文字提示 -->
        <el-tooltip :content="text" placement="bottom" effect="light">
            <!-- <el-input class="filter_company" @contextmenu.prevent="handleContextMenu" v-model="text" readonly></el-input> -->
            <!-- <p class="filter_company" @contextmenu.prevent="handleContextMenu">{{ text }}</p> -->
            <input type="text"  class="filter_company" @contextmenu.prevent="titleClick" v-model="text" value="1" readonly>
        </el-tooltip>
        <!-- 部门树表 -->
        <el-tree
        class="filter_tree"
        :data="data"
        :props="defaultProps"
        :default-expand-all="defaultExpandAll"
        :filter-node-method="filterNode"
        :expand-on-click-node="false"
        @node-click="nodeClick"
        @node-contextmenu="handleContextMenu"
        ref="tree2">
        </el-tree>
        <!-- 右键菜单 -->
        <div v-show="menuVisible" class="menuVisible">
            <ul id="menu" class="menu">
                <li class="menu__item" @click="addClick"><i class="el-icon-circle-plus-outline add"></i>新增</li>
                <li class="menu__item" v-show="stype != 0" @click="modifyClick"><i class="el-icon-edit-outline modify"></i>修改</li>
                <li class="menu__item" v-show="stype != 0" @click="deleteClick"><i class="el-icon-circle-close-outline delete"></i>删除</li>
                <li class="menu__item" v-show="stype != 0" @click="riskClick"><i class="el-icon-news risk"></i>风险授权</li>
            </ul>
        </div>
        <!-- 菜单 弹框 -->
        <el-dialog
        class="menu_dialog"
        :title="title"
        :visible.sync="dialogVisible"
        width="30%"
        :show-close="false"
        :close-on-click-modal="false">
            <el-alert v-if="stype==2" title="修改时，部门编码不可以修改" type="warning" :closable="false" show-icon></el-alert>
            <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                <el-form-item label="父级节点">
                    <el-input v-model="form.spcode" readonly></el-input>
                </el-form-item>
                <el-form-item label="部门编码" prop="scode">
                    <el-input v-model="form.scode" :readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="部门名称" prop="sname">
                    <el-input v-model="form.sname"></el-input>
                </el-form-item>
                <el-form-item label="部门职责">
                    <el-input type="textarea" v-model="form.sdesc" placeholder="1.文本框可复制、可黏贴；2.文件加载在文本框中显示"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="determineClick('form')">确 定</el-button>
                <el-button @click="cancelClikc('form')">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
// 引入部门添加、删除、修改接口
import {department_add, department_delete, department_update} from "~api/cube.js" ;
export default {
    props: {
        text: String,       // 公司文字
        data: Object,       // 树表数据
        newThis: Object     // 父组件的this对象
    },
    data(){
        // 验证--部门编码 + 部门名称
        var scodeValue = (rule, value, callback) => { 
            if (!value) {
                callback(new Error('部门编码不能为空'));
            }else{
                let data = [], is ;
                data = this.getDataArray(data, this.data) ;
                is = data.some(res => { return res.id === value }) ;
                if(is && this.stype == 1){
                    callback(new Error('部门编码以重复')); 
                }else{
                    callback();
                }
            }
        };
        // var snameValue = (rule, value, callback) => {
        //     if (!value) {
        //         callback(new Error('部门名称不能为空'));
        //     }else{
        //         let data = [], is ;
        //         data = this.getDataArray(data, this.data) ;
        //         is = data.some(res => { return res.sname === value }) ;
        //         if(is){
        //             callback(new Error('部门名称以重复')); 
        //         }else{
        //             callback();
        //         }
        //     }
        // };
        return {
            filterText: "",
            defaultExpandAll: true,     // 是否默认全部展开 false：否/ true：是
            menuVisible: false,         // 右键点击的弹框
            dataSource: [],             // 树表的数据
            stype: 0 ,                  // 状态：0代表公司；1代表添加；2代表修改；3代表删除；4代表授权
            dialogVisible: false,       // 菜单按钮弹框 默认为隐藏
            title: "",                  // 弹框的title标题
            nodeValue: {},              // 节点的信息
            readonly: false ,           // 只读属性
            department: {} ,            // 添加修改的参数
            defaultProps: {
                children: 'children',
                label: 'label',
                value: 'id'
            },
            form: {
                spcode: "",         // 父级编码
                scode: "",          // 部门编码
                sname: "",          // 部门名称
                sdesc: ""           // 部门职责 
            },
            // 验证
            rules: {
                // scode: [{ required: true, message: '请输入部门编码', trigger: 'blur' }],
                // sname: [{ required: true, message: '请输入部门名称', trigger: 'blur' }]
                scode: [ { required: true, validator: scodeValue, trigger: 'blur' } ]
                // sname: [ { required: true, validator: snameValue, trigger: 'blur' } ]
            }
        }
    },
    watch: {
        /**
         * 输入关键字进行过滤
         */
        filterText(val) {
            this.$refs.tree2.filter(val);
        }
    },
    methods: {
        /**
         * 对树形数据的处理 都放在一个数组里 即把children里的数组数据拿出来
         */
        getDataArray(data, ary){
            ary.forEach(res => {
                data.push(res) ;
                if(res.children && res.children.length > 0)this.getDataArray(data, res.children) ;
            });
            return data ;
        },
        /**
         * 对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏
         */
        filterNode(value, data) { 
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        /**
         *@description  右键菜单
        */
        handleContextMenu(MouseEvent, node, nodeTarget, el) {
            // debugger
            if(node!=undefined)this.stype = 100;
            this.nodeValue = node ;
            this.menuVisible = false // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
            this.menuVisible = true // 显示模态窗口，跳出自定义菜单栏
            var menu = document.querySelector('#menu')
            // menu.style.left = MouseEvent.clientX -150 + 'px'
            menu.style.left = "234px" ;
            document.addEventListener('click', this.foo) // 给整个document添加监听鼠标事件，点击任何位置执行foo方法
            menu.style.top = MouseEvent.clientY - 10 + 'px'
        },
        /**
         * @description 取消鼠标监听事件 菜单栏
         */
        foo() { 
            this.menuVisible = false
            document.removeEventListener('click', this.foo) // 要及时关掉监听，不关掉的是一个坑，不信你试试，虽然前台显示的时候没有啥毛病，加一个alert你就知道了
        },
        /**
         * @description 鼠标右键 点击公司时触发
         */
        titleClick(MouseEvent){ 
            
            this.stype = 0 ;
            this.handleContextMenu(MouseEvent) ;
        },
        /**
         * @description 1. 鼠标右键 菜单 添加按钮
         */
        addClick(MouseEvent){ 
            let node = this.nodeValue ;
            if(node != undefined){
                this.form.spcode = node.id || 0 ;
            }else {
                this.form.spcode = 0 ;
            }
            this.form.scode = "" ;
            this.form.sname = "" ;
            this.form.sdesc = "" ;
            this.readonly = false ;
            this.stype = 1 ;
            this.title = "部门添加" ;
            this.dialogVisible = true ;
        },
        /**
         * @description 2. 鼠标右键 菜单 修改按钮
         */
        modifyClick(MouseEvent){ 
            let node = this.nodeValue ;
            if(node != undefined){
                this.form.spcode = node.spcode || 0 ;
                this.form.scode = node.scode || 0 ;
                this.form.sname = node.sname ;
                this.form.sdesc = node.sdesc || "" ;
            }else {
                this.form.spcode = 0 ;
            }
            this.readonly = true ;
            this.stype = 2 ;
            this.title = "部门修改" ;
            this.dialogVisible = true ;
        },
        /**
         * @description 3. 鼠标右键 菜单 删除按钮
         */
        deleteClick(MouseEvent){ 
            let node = this.nodeValue ;
            let me = this ;
            me.stype = 3 ;
            let vax = { id: node.scomcode } ;
            let data = {
                scode: node.scode ,
                scomcode: node.scomcode
            }
            me.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                department_delete(data).then(res => { // 删除请求
                    if(res.data.code === 200){
                        me.$message({ type: 'success',message: '删除成功!'});
                        me.newThis.getCompanyRight(vax) ;
                    }else{
                        me.$message.error(res.data.msg) ;
                    }
                });               
            }).catch(() => {
                me.$message({ type: 'info', message: '已取消删除'});          
            });
        },
        /**
         * @description 4. 鼠标右键 菜单 授权按钮
         */
        riskClick(MouseEvent){
            this.stype = 4 ;
            this.$message('暂无此功能！')
        },
        /**
         * @description 5. 鼠标右键 菜单 弹框 确认按钮
         */
        determineClick(vax){
            if(this.stype == 1){    // 添加状态
                this.addClick_new(vax) ;
            }else{
                this.modifyClick_new(vax) ;  
            }
        },
        /**
         * @description 6. 鼠标右键 菜单 弹框 取消按钮
         */
        cancelClikc(vax){
            this.dialogVisible = false ;
            this.$refs[vax].resetFields();
        },
        // 添加确认
        addClick_new(val){
            let node = this.nodeValue ;
            let form = this.form ;
            let $params = this.$store.state.prame.command;
            let me = this ;
            me.$refs[val].validate((valid) => { 
                if (valid) {
                    let vax = { id: $params.company } ;
                    let data = [{
                        spcode: form.spcode,      // 部门父级
                        sname: form.sname,        // 部门名称
                        scode: form.scode,        // 部门编码
                        scomcode: $params.company,// 所属公司编码
                        sdesc: form.sdesc         // 部门职责
                    }]
                    department_add(data).then(res => {  // 添加请求
                        if(res.data.code === 200){
                            me.$message({ message: res.data.msg, type: "success" }) ;
                            me.newThis.getCompanyRight(vax) ;
                            me.cancelClikc('form') ;
                        }else{
                            me.$message.error(res.data.msg) ;
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        // 修改确认
        modifyClick_new(val){ 
            let node = this.nodeValue ;
            let form = this.form ;
            let $params = this.$store.state.prame.command;
            let me = this ;
            if(me.getmodifyValue(node,form)){   // true
                me.$message({ message: "暂无改动!", type: "warning"}) ;
                return false ;
            }
            me.$refs[val].validate((valid) => { 
                if (valid) {
                    let vax = { id: $params.company } ;                    
                    let data = {
                        spcode: form.spcode,      // 部门父级
                        sname: form.sname,        // 部门名称
                        scode: form.scode,        // 部门编码
                        scomcode: $params.company,// 所属公司编码
                        sdesc: form.sdesc         // 部门职责
                    }
                    department_update(data).then(res => { 
                        if(res.data.code === 200){
                            me.$message({ message: res.data.msg, type: "success" }) ;
                            me.newThis.getCompanyRight(vax) ;
                            me.cancelClikc('form') ;
                        }else{
                            me.$message.error(res.data.msg) ;
                        }
                    }) ;
                    
                } else {
                    return false;
                }
            });
        },
        // 修改确认 是否有变动 没有变动提示‘ 暂无改动！ ’，有变动则可以修改
        getmodifyValue(node, form){ 
            let isTrue = true, isFalse = false ;
            for(let key in form){
                if(node["spcode"] == null)node["spcode"] = 0 ;
                if(node["sdesc"] == null)node["sdesc"] = "" ;
                if(node[key] == form[key]) {
                    isTrue = true ;
                } else {
                    return false ;
                }
            }
            return isTrue ;
        },
        // 节点被点击时的回调,共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。
        //修改成点击哪个显示哪个部门的人员，不包含它的孩子。
        nodeClick(data, node, $this){
            // debugger
            let ary = [], ary2 = [] ;
            // this.getnodeClick(data, ary) ;
            ary.push(data.id);
            let userArray = this.newThis.userdata ;                  // 父组件用户表的数据
            let userArray_cloning = this.newThis.userdata_cloning ;  // 父组件用户表数据的克隆体
            userArray_cloning.forEach((res, index) => {
                ary.forEach((red, index) => { 
                    if(res.sdepartmentid == red)ary2.push(res) ;
                }) ;
            }) ;
            this.newThis.allNum = ary2.length;
            this.newThis.userdata = ary2 ;
        },
        nodeClick_old(data, node, $this){
            // debugger
            let ary = [], ary2 = [] ;
            data = [data];
            this.getnodeClick(data, ary) ;
            let userArray = this.newThis.userdata ;                  // 父组件用户表的数据
            let userArray_cloning = this.newThis.userdata_cloning ;  // 父组件用户表数据的克隆体
            userArray_cloning.forEach((res, index) => {
                ary.forEach((red, index) => { 
                    if(res.sdepartmentid == red)ary2.push(res) ;
                }) ;
            }) ;
            this.newThis.userdata = ary2 ;
        },
        // 得到点击的节点数据，并且拿出children的数据，如果没有children，则拿自己
        getnodeClick(data, ary) {
            data.forEach((res, index) => {
                ary.push(res.id) ;
                if(res.children && res.children.length > 0)this.getnodeClick(res.children, ary) ;
            });
        }
    }
}
</script>

<style scoped>
#userDepartment {
    padding: 10px 10px 10px 10px ;
}
.menu {
    height: 120px;
    width: 150px;
    list-style:none	;
    text-align: left;
    cursor: pointer;
    position: absolute;
    background-color: #fff ;
}
.menu li {
    cursor: pointer;
    position: relative;
    display: block;
    padding: 0.75rem 1.25rem;
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.125)
}
.menu li i {
    margin-right: 5px ;
}
li:hover {
    color: #1790ff ;
}
.add { color: #1790ff; }
.modify { color: #ffd04b; }
.delete { color: #ff0000; }
.risk { color: #179800; }
</style>
<style>
.filter_company .el-input__inner{
    border-bottom: 2px solid #409EFF;
    border-top: 1px solid #fff;
    border-left: 1px solid #fff;
    border-right: 1px solid #fff;
    border-radius: 0px;
    font-size: 16px;
    cursor: pointer;
}
.filter_company:hover { color: #1790ff; }
.filter_company {
    border-bottom: 2px solid #409EFF;; 
    border-top: 1px solid #fff;
    border-left: 1px solid #fff;
    border-right: 1px solid #fff;
    border-radius: 0px;
    font-size: 16px;
    padding: 10px 0 10px 0;
    cursor: pointer;
    width: 100%;
    margin-bottom: 10px;
}
.menu_dialog .el-dialog__header {
    /* background: #1790ff ; */
    background: #409EFF ;
    padding: 10px 20px 10px 20px ;
}
.menu_dialog .el-dialog__body {
    padding: 20px 20px 0px 20px ;
}
.menu_dialog .el-textarea .el-textarea__inner{
    height: 100px;
}
</style>
