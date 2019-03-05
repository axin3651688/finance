

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
    >
      <el-table-column type="index" label="序号" width="80" header-align="center" align ="center" ></el-table-column>
      <el-table-column prop="srolename" label="角色名称" width="240" header-align="center" align ="center"></el-table-column>
      <el-table-column prop="sroledesc" label="角色描述" width="300" header-align="center" align ="center"></el-table-column>
      <el-table-column label="操作" header-align="center" min-width="260px">
        <template slot-scope="scope">
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
      @close="closeDilog('roleDark')"
      >
      
      <template ref="roleDark">
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
          max-height="500px"
          border
        >
         <template slot="rights" slot-scope="scope">
           <el-checkbox-group v-model="scope.row.rightsVal" @change="handleCheckedRightsChange(scope.row,right)">
               <el-checkbox v-for="right in scope.row.rights" :label="right" :key="right">{{right}}</el-checkbox>
             <!-- <template v-if="scope.row.nadd === 0 || scope.row.nadd === 1"  >
                <el-checkbox :value="scope.row.nadd">新增</el-checkbox>
             </template>

             <template v-if="scope.row.ndel === 0 || scope.row.ndel === 1">
                <el-checkbox :value="scope.row.ndel" >删除</el-checkbox>
             </template>

             <template v-if="scope.row.nupdate === 0 || scope.row.nupdate === 1">
                <el-checkbox :value="scope.row.nupdate" >修改</el-checkbox>
             </template>

             <template v-if="scope.row.nexp === 0 || scope.row.nexp === 1">
                <el-checkbox :value="scope.row.nexp" >导出</el-checkbox>
             </template>

             <template v-if="scope.row.nimp === 0 || scope.row.nimp === 1">
                <el-checkbox :value="scope.row.nimp" >导入</el-checkbox>
             </template>

             <template v-if="scope.row.nfill === 0 || scope.row.nfill === 1">
                <el-checkbox :value="scope.row.nfill" >填报</el-checkbox>
             </template>

             <template v-if="scope.row.nrep === 0 || scope.row.nrep === 1">
                <el-checkbox :value="scope.row.nrep" >上报</el-checkbox>
             </template>

             <template v-if="scope.row.nper === 0 || scope.row.nper === 1">
                <el-checkbox :value="scope.row.nper" >授权</el-checkbox>
             </template>

             <template v-if="scope.row.nwarn === 0 || scope.row.nwarn === 1">
                <el-checkbox :value="scope.row.nwarn" >预警</el-checkbox>
             </template> -->
          
          </el-checkbox-group>
        </template>
        </zk-table>
        </template>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitAddUserForm('addUserForm')">确 定</el-button>
          <el-button @click="dialogAddUserVisible = false">取 消</el-button>
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
        <el-form-item label="角色名称" prop="srolename">
          <el-input v-model="roleForm.srolename" autocomplete="off" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="sroledesc">
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
  created() {},

  data() {
    return {
      right:["新增","修改"],

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
        isFold: false,
        expandType: false,
        selectionType: true
      },
      checkedPremiss: [],
      authData: [ ],
      columns: [
        {
          label: "菜单列表",
          prop: "sname",
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
      ]
    };
  },
  mounted() { 
    //加载角色列表
    this.findAll(this.pageNum,this.pageSize);
    
  },
  methods: {
    /**
     * @description 查询当前用户的菜单
     */
    findMenu(roleId) { 
      var _this = this;
      //getters 数据
      var getters = _this.$store.getters;
      request({
        url: "/zjb/sys/role/query_roleid",
        method: "get",
        params:{
            roleid:roleId
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
                  if((item.nadd || item.nadd === 0) && item.nadd != -1){
                    item.rights.push("新增");
                    if(item.nadd === 1){
                        item.rightsVal.push("新增");
                    }
                  }
                  if((item.ndel || item.ndel === 0) && item.ndel != -1){
                    item.rights.push("删除");
                    if(item.ndel === 1){
                        item.rightsVal.push("删除");
                    }
                  }
                  if((item.nupdate || item.nupdate === 0) && item.nupdate != -1){
                    item.rights.push("修改");
                    if(item.nupdate != 1){
                        item.rightsVal.push("修改");
                    }
                  }
                  if((item.nexp || item.nexp === 0) && item.nexp != -1){
                    item.rights.push("导出");
                    if(item.nexp === 1){
                        item.rightsVal.push("导出");
                    }
                  }
                  if((item.nimp || item.nimp === 0) && item.nimp != -1 ){
                    item.rights.push("导入");
                    if(item.nimp === 1){
                        item.rightsVal.push("导入");
                    }
                  }
                  if((item.nfill || item.nfill === 0) && item.nfill != -1 ){
                    item.rights.push("填报");
                    if(item.nfill === 1){
                        item.rightsVal.push("填报");
                    }
                  }
                  if((item.nrep || item.nrep === 0) && item.nrep != -1){
                    item.rights.push("上报");
                    if(item.nrep === 1){
                        item.rightsVal.push("上报");
                    }
                  }
                  if((item.nper || item.nper === 0) && item.nper != -1){
                    item.rights.push("授权");
                    if(item.nper === 1){
                        item.rightsVal.push("授权");
                    }
                  }
                  if((item.nwarn || item.nwarn === 0) && item.nwarn != -1 ){
                    item.rights.push("预警");
                    if(item.nwarn === 1){
                        item.rightsVal.push("预警");
                    }
                  }
                  item.id = item.scode; 
                return item.label = item.sname;
            });
            _this.authData = data;
            //data[0].open = true;
           // _this.expandKeys.push(data[0].scode);
            _this.authData = tools.transformToeTreeNodes(setting, data);
          }
        }
        // if (result.status == 200) {
        //   if (_.isArray(result.data.data)) {
        //     _this.authData = result.data.data;
        //   }
        // }
      });
    },

    handleCheckedRightsChange(row,val){ 

    },

    handleCheckedPermissChange(value, event) {
       ;
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
      this.opt = tools.opt[0];
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
              if (result.data.data) {
                _this.findAll(_this.pageNum,_this.pageSize);
                this.$message({
                  type: "success",
                  message: "删除成功!"
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







