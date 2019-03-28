

<template>
  <div class="roleM">
    <!-- <el-row class="row">
        <div class="left">
          <el-button  type="primary" @click="handleAdd">添加角色</el-button>
          <el-button  type="success" @click="handleRefresh" icon="el-icon-refresh"></el-button>
        </div>
        <div class="select">
          <el-button  type="primary" @click="handleSelect">选项</el-button>
        </div>
 </el-row> -->
<div class="input-refresh" ref="elememt">
    <el-form class="user-form-inline">
      <el-form-item class="left">
        <el-button  type="primary" @click="handleAdd('add')">添加角色</el-button>
        <el-button  type="success" @click="handleRefresh" icon="el-icon-refresh"></el-button>
      </el-form-item>
      <!-- <el-form-item class="select">
        <el-button  type="primary" @click="handleSelect">选项</el-button>
      </el-form-item> -->
    </el-form>
</div>

 
<el-table
    :data="rolesData"
    border
    stripe
    :height ="heights"
    >
      <el-table-column type="index" label="序号" width="80" header-align="center" align ="center" fixed="left"></el-table-column>
      <el-table-column prop="srolename" label="角色名称" width="240" header-align="center" align ="center" fixed="left"></el-table-column>
      <el-table-column prop="sroledesc" label="角色描述" width="300" header-align="center" align ="center"></el-table-column>
      <el-table-column label="操作" header-align="center" min-width="260px">
        <template slot-scope="scope" v-if="scope.row.roleid != 2">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)" >修改</el-button>
          <el-button size="mini" type="danger" @click="handleDel(scope.$index, scope.row)">删除</el-button>
          <el-button size="mini" type="primary" @click="handleDark(scope.$index, scope.row)">模块授权</el-button>
        </template>
      </el-table-column>
</el-table>
<!-- 分页 -->
        <div class="pagination">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[10, 200, 500, 1000]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.allNum"
            ></el-pagination>
        </div>

    <el-dialog
      title="模块授权"
      :visible.sync="dialogRoleDarkVisible"
      width="50%"
      custom-class="authModule"
      @close="closeDilog('roleDark')"
      >
      
    
        <!-- <el-row>
          <el-tooltip class="item" effect="dark" content="授权" placement="top-start">
            <el-button icon="iconfont icon-pression" circle @click="handleMenuPermiss"></el-button>
          </el-tooltip>
          <el-button icon="el-icon-plus" circle @click="handleMenuAdd"></el-button>
          <el-button icon="el-icon-edit" circle @click="handleMenuEdit"></el-button>
          <el-button icon="el-icon-delete" circle type="danger" @click="handleMenuDel"></el-button>
        </el-row> -->
        <zk-table
          class="menus"
          ref="table"
          index-text="#"
          :data="authData"
          :columns="columns"
          :stripe="props.stripe"
          :border="props.border"
          :show-header="props.showHeader"
          :show-summary="props.showSummary"
          :show-row-hover="props.showRowHover"
          :show-index="props.showIndex"
          :tree-type="props.treeType"
          :is-fold="props.isFold"
          :expand-type="props.expandType"
          :selection-type="props.selectionType"
          @checkbox-click="handleSelectionChange"
          max-height="500px"
          border
        >
         <template slot="rights" slot-scope="scope">
           <el-checkbox-group v-model="scope.row.rightsVal" >
               <el-checkbox v-for="right in scope.row.rights" :label="right" :key="right" @change="handleCheckedRightsChange(scope.row,right)">{{right}}</el-checkbox>
           
          </el-checkbox-group>
        </template>
        </zk-table>
       
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitAddUserForm('addUserForm')">确 定</el-button>
          <el-button @click="dialogRoleDarkVisible = false">取 消</el-button>
        </div>
      </el-dialog>

    <!--添加角色修改界面-->
    <el-dialog
      :title="title + '角色'"
      :visible.sync="dialogRoleFormVisible"
      width="450px"
      @close="closeDilog('roleForm')"
    >
      <el-form :model="roleForm" :rules="rules" ref="roleForm" :label-width="formLabelWidth">
        <el-form-item label="角色名称" prop="srolename" label-width="100px">
          <el-input v-model="roleForm.srolename" autocomplete="off" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="sroledesc" label-width="100px">
          <el-input type="textarea" v-model="roleForm.sroledesc" style="width:300px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('roleForm')">确 定</el-button>
        <el-button @click="dialogRoleFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>

    <!--系统全局变量控制-->
    <!-- <el-dialog
      :title="title + '角色'"
      :visible.sync="dialogSelectFormVisible"
      width="30%"
      @close="closeDilog('selectForm')"
    >
      <el-form :model="selectForm" :rules="rules" ref="selectForm" :label-width="formLabelWidth">
        <template>
            <el-checkbox v-model="checked1">公司名称显示：
                <template>
                    <el-radio v-model="radio1" label="1">全称</el-radio>
                    <el-radio v-model="radio1" label="2">简称</el-radio>
                </template>
            </el-checkbox>
            <el-checkbox v-model="checked2">公司编码显示： 
                <template>
                    <el-radio v-model="radio2" label="1">显示</el-radio>
                    <el-radio v-model="radio2" label="2">不显示</el-radio>
                </template>
            </el-checkbox>
            
            <el-checkbox v-model="checked3">报表填报控制：
                <template>
                    <el-radio v-model="radio3" label="1">控制</el-radio>
                    <el-radio v-model="radio3" label="2">不控制</el-radio>
                </template>
            </el-checkbox>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('roleForm')">确 定</el-button>
        <el-button @click="dialogSelectFormVisible = false">取 消</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>
<script>
import request from "utils/http";
import tools from "utils/tools";
console.log(tools);
//import ExTable from "utils/table";
import Vue from "vue";
export default {
//     components: {
//     ExTable
//   },
  created() {
    this.heights = document.documentElement.clientHeight-217;
  },

  data() {
    return {
      right:[],
      //rightAll:["",];
      rightDatas:[],//模块授权修改权限后的数据
      rightAllDatas:[],//模块授权原始数据
      pageNum: 1,
      // 分页---默认每页100行数据
      pageSize: 10,
      allNum:0,
      rolesData: [],
      radio1: '1',
      radio2: '1',
      radio3: '1',
      radio4: '1',

      checked1: '1',
      checked2: '1',
      checked3: '1',
      selectRoleId:"",

      //当前选中的菜单节点 -1代表没有选择
      activeRole: {
        id: -1,
        srolename: "",
        sroledesc: ""
      },
      selectForm:[],
      //Dialog title
      title: "",
      //当前的操作 add update del
      opt: {},
      //新增和修改角色框
      dialogRoleFormVisible: false,
      //角色权限
      dialogRoleDarkVisible: false,
      //系统全局变量控制
      dialogSelectFormVisible: false,
      formLabelWidth: "80px",
      roleForm: {
        sroledesc: "",
        srolename: ""
      },
      rules: {
        srolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        sroledesc: [
          { min: 0, max: 40, message: "长度在 0 到 40 个字符", trigger: "blur" }
        ]
      },

      props: {
        stripe: true,
        border: true,
        showHeader: true,
        showSummary: false,
        showRowHover: true,
        showIndex: false,
        treeType: true,
        isFold: true,
        expandType: false,
        selectionType: true
      },
      checkedPremiss: [],
      authData: [ ],//模块授权生成树表的数据
      columns: [
        {
          label: "菜单列表",
          prop: "menusname",
          width: "200px"
          // headerAlign: "center"
        },
        {
          label: "功能权限",
          // prop: "nadd",
          type:'template',
          width: "300px",
          template:"rights"
        }
      ],
      heights:0
    };
  },
  mounted() { 
    //加载角色列表
    this.findAll(this.pageNum,this.pageSize);
    //设置表格高度（自适应）
    this.setTableScollHeight();
  },
  methods: {
    /**
     * 设置表格高度
     */
    setTableScollHeight(){
        this.heights = document.documentElement.clientHeight-217;
        const me = this;
        window.onresize = function temp(){
            me.heights = document.documentElement.clientHeight-217;
        }
    },
    /**
     * 设置模块授权中全选
     */
    setSelectAll(){
      let _this = this;
      let label = document.querySelector(".authModule .el-dialog__body label");
      label.innerHTML = "";
      //.getSelection(".authModule .el-dialog__body label");

    },

    /**
     * 菜单列表取消选中设置
     */
    changeSelectDatas(changeDatas,row){
        if(changeDatas && changeDatas.length > 0){
          for(let i = 0;i <changeDatas.length;i++){
                if(changeDatas[i].id == row.id){
                    changeDatas[i].rightsVal = [];
                    changeDatas[i].nadd2 = 0;
                    changeDatas[i].ndel2 = 0;
                    changeDatas[i].nupdate2 = 0;
                    changeDatas[i].nexp2 = 0;
                    changeDatas[i].nimp2 = 0; 
                    changeDatas[i].nfill2 = 0;
                    changeDatas[i].nrep2 = 0;
                    changeDatas[i].nper2 = 0;
                    changeDatas[i].nwarn2 = 0; 
                    changeDatas[i].scode2 = null; 
                } 
           }
        }
    },
    /**
     * 菜单列表选中设置
     */
    changeSelectScodes(changeDatas,row){
        if(changeDatas && changeDatas.length > 0){
          for(let i = 0;i <changeDatas.length;i++){
                if(changeDatas[i].id == row.id){ 
                    changeDatas[i].scode2 = changeDatas[i].scode; 
                } 
           }
        }
    },
    /**
     * 
     */
    handleSelectionChange(rowIndex,changeDatas){
      let _this = this;
      let row = rowIndex.row;
      if(row._isChecked){
        _this.changeSelectDatas(changeDatas,row);
          if(row.children && row.children){
            for(let j = 0;j < row.children.length;j++){
              _this.changeSelectDatas(changeDatas,row.children[j]);

              if(row.children[j].children && row.children[j].children.length > 0){
                  for(let k = 0;k < row.children[j].children.length;k++){
                    _this.changeSelectDatas(changeDatas,row.children[j].children[k]);

                    if(row.children[j].children[k].children && row.children[j].children[k].children.length > 0){
                        for(let l = 0;l < row.children[j].children[k].children.length;l++){
                           _this.changeSelectDatas(changeDatas,row.children[j].children[k].children[l]);

                           if(row.children[j].children[k].children[l].children && row.children[j].children[k].children[l].children.length > 0){
                               for(let m = 0;m < row.children[j].children[k].children[l].children.length;m++){

                                    _this.changeSelectDatas(changeDatas,row.children[j].children[k].children[l].children[m]);
                               }
                           }
                        }
                    }
                  }
              }
            }

          }
        }else{
          _this.changeSelectScodes(changeDatas,row);
          if(row.children && row.children){
            for(let j = 0;j < row.children.length;j++){
              _this.changeSelectScodes(changeDatas,row.children[j]);

              if(row.children[j].children && row.children[j].children.length > 0){
                  for(let k = 0;k < row.children[j].children.length;k++){
                    _this.changeSelectScodes(changeDatas,row.children[j].children[k]);

                    if(row.children[j].children[k].children && row.children[j].children[k].children.length > 0){
                        for(let l = 0;l < row.children[j].children[k].children.length;l++){
                           _this.changeSelectScodes(changeDatas,row.children[j].children[k].children[l]);

                           if(row.children[j].children[k].children[l].children && row.children[j].children[k].children[l].children.length > 0){
                               for(let m = 0;m < row.children[j].children[k].children[l].children.length;m++){

                                    _this.changeSelectScodes(changeDatas,row.children[j].children[k].children[l].children[m]);
                               }
                           }
                        }
                    }
                  }
              }
            }

          }

        }
        // row.rightsVal = [];
        // row.nadd2 = 0;
        // row.ndel2 = 0;
        // row.nupdate2 = 0;
        // row.nexp2 = 0;
        // row.nimp2 = 0; 
        // row.nfill2 = 0;
        // row.nrep2 = 0;
        // row.nper2 = 0;
        // row.nwarn2 = 0; 
        _this.rightDatas = changeDatas;
      
    },
    /**
     * @description 查询当前用户的菜单
     */
    findMenu(roleId) { 
      var _this = this;
      //getters 数据
      var getters = _this.$store.getters;
      request({
        url: "/zjb/sys/menupermission/query_full_permission",
        method: "get",
        params:{
            roleId:roleId,
            currentRoleId:getters.user.role.id
            //currentRoleId:2
        }
      }).then(result => { 
      if (result.status == 200 && result.data.code == 200) {
          //封装树对象数据
          const setting = {
            data: {
              simpleData: {
                enable: true,
                idKey: "scode",
                pIdKey: "spcode"
              },
              key: {
                name:"scode",
                children: "children"
              }
            }
          };
          var data = result.data.data;

          if (Array.isArray(data) && data.length > 0) {
            data = tools.sortByKey(data, "scode");
            data = data.filter(function(item){ 
                  item.rights = [];
                  item.rightsVal = [];
                  if(item.nadd && item.nadd === 1){
                    item.rights.push("新增");
                    if(item.nadd2 === 1){
                        item.rightsVal.push("新增");
                    }
                  }
                  if(item.ndel && item.ndel === 1 ){
                    item.rights.push("删除");
                    if(item.ndel2 === 1){
                        item.rightsVal.push("删除");
                    }
                  }
                  if(item.nupdate && item.nupdate === 1){
                    item.rights.push("修改");
                    if(item.nupdate2 === 1){
                        item.rightsVal.push("修改");
                    }
                  }
                  if(item.nexp && item.nexp === 1){
                    item.rights.push("导出");
                    if(item.nexp2 === 1){
                        item.rightsVal.push("导出");
                    }
                  }
                  if(item.nimp && item.nimp === 1){
                    item.rights.push("导入");
                    if(item.nimp2 === 1){
                        item.rightsVal.push("导入");
                    }
                  }
                  if(item.nfill && item.nfill === 1){
                    item.rights.push("填报");
                    if(item.nfill2 === 1){
                        item.rightsVal.push("填报");
                    }
                  }
                  if(item.nrep && item.nrep === 1){
                    item.rights.push("上报");
                    if(item.nrep2 === 1){
                        item.rightsVal.push("上报");
                    }
                  }
                  if(item.nper && item.nper === 1){
                    item.rights.push("授权");
                    if(item.nper2 === 1){
                        item.rightsVal.push("授权");
                    }
                  }
                  if(item.nwarn && item.nwarn === 1 ){
                    item.rights.push("预警");
                    if(item.nwarn2 === 1){
                        item.rightsVal.push("预警");
                    }
                  }
                  if(item.scode && item.scode2){
                        item._isChecked = true;
                  }else{
                        item._isChecked = false;
                  }
                  item.id = item.scode; 
                return item.label = item.menusname;
            });
             _this.authData = data;
            _this.rightAllDatas= JSON.parse(JSON.stringify(data));
            _this.rightDatas = data;
            //data[0].open = true;
           // _this.expandKeys.push(data[0].scode);
            _this.authData = tools.transformToeTreeNodes(setting, data);
            
          }
          _this.setSelectAll();
        }
        // if (result.status == 200) {
        //   if (_.isArray(result.data.data)) {
        //     _this.authData = result.data.data;
        //   }
        // }
      });
    },

    handleCheckedRightsChange(row,val){ 
       var me = this;
       let rightDatas = me.rightDatas;
       if(val == "新增"){
         if(row.nadd2 ===1){
           row.nadd2 = 0;
         }else{
            row.nadd2 = 1;
            if(!row._isChecked)row._isChecked = true;
         }
       }else if(val == "删除"){
         if(row.ndel2 ===1){
           row.ndel2 = 0;
         }else{
            row.ndel2 = 1;
            if(!row._isChecked)row._isChecked = true;
         }

       }else if(val == "修改"){
         if(row.nupdate2 ===1){
           row.nupdate2 = 0;
         }else{
            row.nupdate2 = 1;
            if(!row._isChecked)row._isChecked = true;
         }

       }else if(val == "导出"){
         if(row.nexp2 ===1){
           row.nexp2 = 0;
         }else{
            row.nexp2 = 1;
            if(!row._isChecked)row._isChecked = true;
         }

       }else if(val == "导入"){
         if(row.nimp2 ===1){
           row.nimp2 = 0;
         }else{
            row.nimp2 = 1;
            if(!row._isChecked)row._isChecked = true;
         }

       }else if(val == "填报"){
         if(row.nfill2 ===1){
           row.nfill2 = 0;
         }else{
            row.nfill2 = 1;
            if(!row._isChecked)row._isChecked = true;
         }

       }else if(val == "上报"){
         if(row.nrep2 ===1){
           row.nrep2 = 0;
         }else{
            row.nrep2 = 1;
            if(!row._isChecked)row._isChecked = true;
         }

       }else if(val == "授权"){
         if(row.nper2 ===1){
           row.nper2 = 0;
         }else{
            row.nper2 = 1;
            if(!row._isChecked)row._isChecked = true;
         }

       }else {
         if(row.nwarn2 ===1){
           row.nwarn2 = 0;
         }else{
            row.nwarn2 = 1;
            if(!row._isChecked)row._isChecked = true;
         }

       }
        if(rightDatas && rightDatas.length > 0){
          for(let i = 0;i < rightDatas.length;i++){
              if(rightDatas[i].id == row.id){
                rightDatas[i] = row;
                break;
              }
          }
          
        }
    },
/**
 * 授权
 */
    submitAddUserForm(){
      let _this = this;
      var getters = _this.$store.getters;
      let roleId = _this.selectRoleId;
      let currentRoleId = getters.user.role.id;
      let rightDatas = _this.rightDatas;
      let authData = _this.rightAllDatas;
      let changeDatas = [];
      if(authData && rightDatas && rightDatas.length>0 && authData.length>0){
         for(let i = 0;i< rightDatas.length;i++){
            let data = authData.filter(function(item){
              if(rightDatas[i].id == item.id){              
                  if(rightDatas[i].nadd2  != item.nadd2 || rightDatas[i].ndel2  != item.ndel2 || rightDatas[i].ndel2  != item.ndel2 || rightDatas[i].nupdate2  != item.nupdate2
                   || rightDatas[i].nexp2  != item.nexp2 || rightDatas[i].nimp2  != item.nimp2 || rightDatas[i].nfill2  != item.nfill2 || rightDatas[i].nrep2  != item.nrep2
                    || rightDatas[i].nper2  != item.nper2 || rightDatas[i].nwarn2  != item.nwarn2 || rightDatas[i].scode2  != item.scode2){
                      return item;

                  }
              }

            });
            if(data.length >0 ){
                changeDatas.push(data);
            }
          //  for(let j = 0;j<authData.length;j++){
          //     if(rightDatas[i].id == authData[j].id){
          //        if()
          //     }
          //  }

         }
      }
      if(changeDatas.length >0){
        let data = [];
        if(rightDatas.length>0){
            for(let i =0;i<rightDatas.length;i++){
              if(rightDatas[i].scode2){
                var obj = {             
                    nadd: rightDatas[i].nadd2,
                    ndel: rightDatas[i].ndel2,
                    nexp: rightDatas[i].nexp2,
                    nfill:rightDatas[i].nfill2,
                    nimp: rightDatas[i].nimp2,
                    nper: rightDatas[i].nper2,
                    nrep: rightDatas[i].nrep2,
                    nupdate: rightDatas[i].nupdate2,
                    nwarn: rightDatas[i].nwarn2,
                    roleid: rightDatas[i].roleid2,
                    scode: rightDatas[i].scode2 
                }
                data.push(obj);

              }
              
            }
        }
        let pramer = {
            currentRoleId:currentRoleId,  
            roleId:roleId,
            menuPermissions: data
          };
        //  pramer = JSON.parse(JSON.stringify(pramer));
        pramer = JSON.stringify(pramer);
        request({
          url: "/zjb/sys/menupermission/permission",
          method: "post",
          headers	:{'Content-Type': 'application/json'},
          data: pramer
        }).then(result => { 
          if (result.status == 200) {
              _this.dialogRoleDarkVisible = false;
              if (result.data.code == 200) {
                this.$message({
                  type: "success",
                  message: result.data.msg
                });
              }
            } else {
              tools.showMes(result.data.msg, "error");
            }
        });

      }else{
         this.$message({
                  type: "warning",
                  message: "未做修改"
                });
      }
      

    },

    handleCheckedPermissChange(value, event) {
      console.log(this.checkedPremiss);
    },

    //pageSize改变时触发 ---- 分页功能
    handleSizeChange: function(size) { 
      this.pageSize = size;
      this.findAll(this.pageNum,this.pageSize);
    },
    //pageNum改变时会触发 --- 分页功能
    handleCurrentChange: function(pageNum) { 
      this.pageNum = pageNum;
      this.findAll(this.pageNum,this.pageSize);
    },
    /**
     * 关闭Dialog 表单重置
     */
    closeDilog(formName) {
      this.roleForm.sroledesc = "";
      this.roleForm.srolename = "";
      // this.resetForm(formName);
    },

    /**
     * @description 重置表单
     */
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    /**
     * @description 保存表单操作
     */
    submitForm(formName) { 
      var _this = this;
      //判断新增还是修改
      this.$refs[formName].validate(valid => { 
        if (valid) {
          //getters 数据
          var getters = _this.$store.getters;
          var obj = {
            srolename: _this.roleForm.srolename,
            sroledesc: _this.roleForm.sroledesc
          };
          if (_this.opt.url === "save") {
            obj.companyId = getters.userCompany.id;
            request({
              url: "/zjb/sys/role/save",
              method: "post",
              params: {
                srolename: obj.srolename,
                sroledesc: obj.sroledesc
              }
            }).then(result => {
            if (result.status == 200) {
              _this.resetForm(formName);
              _this.dialogRoleFormVisible = false;
              if (result.data.data) {
                //重新加载
                _this.findAll(_this.pageNum,_this.pageSize);
                this.$message({
                  type: "success",
                  message: result.data.msg
                });
              }
            } else {
              tools.showMes(result.data.msg, "error");
            }
          });

            
          } else {
            if (_this.activeRole.sroledesc === _this.roleForm.sroledesc) {
              delete obj.sroledesc;
            }
            if (_this.activeRole.srolename === _this.roleForm.srolename) {
              delete obj.srolename;
            }
            if (_.isEmpty(obj)) {
              _this.$message({
                type: "warning",
                message: "未做修改"
              });
              return;
            } else { 
              obj.roleId = _this.activeRole.id;
              request({
                url: "/zjb/sys/role/update",
                method: "post",
                data: {
                  roleid: obj.roleId,
                  sroledesc: obj.sroledesc,
                  srolename: obj.srolename
                }
              }).then(result => { 
                  if (result.status == 200) {
                    _this.resetForm(formName);
                    _this.dialogRoleFormVisible = false;
                    if (result.data.msg) {
                      //重新加载
                      _this.findAll(_this.pageNum,_this.pageSize);
                      this.$message({
                        type: "success",
                        message: result.data.msg
                      });
                    }
                  } else {
                    tools.showMes(result.data.msg, "error");
                  }
                });

            }
          }
         // obj.userId = getters.user.user.id;

          
          


          // axios({
          //   url: "a/role/" + _this.opt.url ,
          //   method: _this.opt.method,
          //   data: obj,
          // }).then(result => {
          //   if (result.status == 200) {
          //     _this.resetForm(formName);
          //     _this.dialogRoleFormVisible = false;
          //     if (result.data.data) {
          //       //重新加载
          //       _this.findAll(_this.pageNum,_this.pageSize);
          //       this.$message({
          //         type: "success",
          //         message: result.data.msg
          //       });
          //     }
          //   } else {
          //     tools.showMes(result.data.msg, "error");
          //   }
          // });
        } else {
          return false;
        }
      });
    },

    /**
     * @description 刷新
     */
    handleRefresh(){

    },
    /**
     * @description 添加角色
     */
    handleAdd() { 
      this.title = "新增";
      this.dialogRoleFormVisible = true;
      this.opt = tools.opt[0];
      this.roleForm.srolename = "";
      this.roleForm.sroledesc = "";
    },

    /**
     * @description 角色授权
     */
    handleDark(index,row) { 
      this.title = tools.opt[0].srolename;
      this.dialogRoleDarkVisible = true;
      this.rightDatas = [];
      this.opt = tools.opt[0];
      this.selectRoleId = row.roleid;
      //加载菜单列表
      this.findMenu(row.roleid);
    },

    /**
     * @description 角色授权
     */
    handleSelect() { 
      this.title = tools.opt[0].srolename;
      this.dialogSelectFormVisible = true;
      this.opt = tools.opt[0];
    },

    /**
     * @description 是否有选中的角色
     * @returns 0 代表有没有 1 代表有
     */
    hasActiveRole() {
      //判断是否有选中一个角色
      if (this.activeRole.id === -1) {
        tools.showMes("请先选择一个角色", "warning");
        return 0;
      }
      return 1;
    },

    /**
     * @description 获取选择的角色id
     * @param index 索引即为角色id
     * @param indexPath 选中菜单项的 index path
     * @param component 当前组件
     */
    // select(index, indexPath, component) { 
    //   this.activeRole.id = index ? index : -1;
    //   this.activeRole.srolename = component.$el.innerText;
    //   this.activeRole.sroledesc = component.$attrs.sroledesc;
    // },
    handleEdit(index, row) { 
    //   if (!this.hasActiveRole()) {
    //     return;
    //   }
      this.title = "修改";
      this.dialogRoleFormVisible = true;
      //绑定表单
      this.activeRole.id = row.roleid ? row.roleid : -1;
      this.activeRole.srolename = row.srolename;
      this.activeRole.sroledesc = row.sroledesc;
      this.roleForm.srolename = row.srolename;
      this.roleForm.sroledesc = row.sroledesc;
     // this.roleForm.text = this.activeRole.text;
      //this.roleForm.note = this.activeRole.note;
      this.opt = tools.opt[1];
      

    },
    handleDel(index,row) { 
      // if (!this.hasActiveRole()) {
      //   return;
      // }
      var _this = this;
      this.opt = tools.opt[2];
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //getters 数据
          var getters = _this.$store.getters;
          request({
            url: "/zjb/sys/role/remove",
            method: "get",
            params: {
              roleid: row.roleid
            }
          }).then(result => {
            if (result.status == 200) {
              if (result.data.code == 200) {
                _this.findAll(_this.pageNum,_this.pageSize);
                this.$message({
                  type: "success",
                  message: result.data.msg
                });
              }
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //获取当前用户的角色列表
    findAll(pageNum,pageSize) { 
      var _this = this;
      //getters 数据
      var getters = _this.$store.getters;
      request({
        url: "/zjb/sys/role/query_page",
        method: "get",
        params: {
          pageNum: pageNum,
          pageSize: pageSize
        }
      }).then(result => { 
        if (result.status == 200) {
            const data = result.data.data;
            _this.rolesData = data.datas;
            _this.allNum = data.total;
        }
      });
    }
  }
};
</script>
<style scoped>
.roleM {
  margin-top: 10px;
}
.menus {
  margin-top: 5px;
}
div.left {
    float: left;
}
div.select {
    float: right;
}
.el-checkbox{
    margin-left: 30px;
}
/* .input-refresh {
    width: 100%;
   
    text-align: center;
    margin-bottom: 10px;
    background-color: #fff;
} */
</style>







