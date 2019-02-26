<template>
  <div class="roleM">
    <el-row :gutter="24">
      <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
        <el-row>
          <el-button icon="el-icon-plus" circle @click="handleAdd"></el-button>
          <el-button icon="el-icon-edit" circle @click="handleEdit"></el-button>
          <el-button icon="el-icon-delete" circle type="danger" @click="handleDel"></el-button>
        </el-row>
        <el-aside style="width:100%;background-color: rgb(238, 241, 246);margin-top:5px;">
          <el-menu :default-openeds="['1']" @select="select">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-setting"></i>
                角色列表
              </template>

              <el-menu-item-group>
                <el-menu-item
                  v-for="item in rolesData"
                  :key="item.id"
                  :index="item.id + ''"
                  :note="item.note"
                >{{item.text}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
      </el-col>
      <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
        <el-row>
          <el-tooltip class="item" effect="dark" content="授权" placement="top-start">
            <el-button icon="iconfont icon-pression" circle @click="handleMenuPermiss"></el-button>
          </el-tooltip>
          <el-button icon="el-icon-plus" circle @click="handleMenuAdd"></el-button>
          <el-button icon="el-icon-edit" circle @click="handleMenuEdit"></el-button>
          <el-button icon="el-icon-delete" circle type="danger" @click="handleMenuDel"></el-button>
        </el-row>
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
        ></zk-table>
      </el-col>
    </el-row>

    <!--添加角色修改界面-->
    <el-dialog
      :title="title + '角色'"
      :visible.sync="dialogRoleFormVisible"
      width="30%"
      @close="closeDilog('roleForm')"
    >
      <el-form :model="roleForm" :rules="rules" ref="roleForm" :label-width="formLabelWidth">
        <el-form-item label="角色名称" prop="text">
          <el-input v-model="roleForm.text" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="note">
          <el-input type="textarea" v-model="roleForm.note"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('roleForm')">确 定</el-button>
        <el-button @click="dialogRoleFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import request from "utils/http";
import tools from "utils/tools";
import axios from "axios";
export default {
  created() {},

  data() {
    return {
      rolesData: [],

      //当前选中的菜单节点 -1代表没有选择
      activeRole: {
        id: -1,
        text: "",
        note: ""
      },
      //Dialog title
      title: "",
      //当前的操作 add update del
      opt: {},
      //新增和修改角色框
      dialogRoleFormVisible: false,
      formLabelWidth: "80px",
      roleForm: {
        text: "",
        note: ""
      },
      rules: {
        text: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        note: [
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
      authData: [],
      columns: [
        {
          label: "菜单列表",
          prop: "text",
          width: "250px"
          // headerAlign: "center"
        },
        {
          label: "规则",
          prop: "url",
          width: "250px"
          // headerAlign: "center"
        }
      ]
    };
  },
  mounted() {
    //加载角色列表
    this.findAll();
    //加载菜单列表
    this.findMenu();
  },
  methods: {
    /**
     * @description 查询当前用户的菜单
     */
    findMenu() {
      var _this = this;
      //getters 数据
      var getters = _this.$store.getters;
      request({
        url: "api/api/node_list",
        method: "get",
        params: {
          userId: getters.user.user.id
        }
      }).then(result => {
        if (result.status == 200) {
          if (_.isArray(result.data.data.nodeList)) {
            _this.authData = result.data.data.nodeList;
          }
        }
      });
    },

    handleCheckedPermissChange(value, event) {
      debugger;
      console.log(this.checkedPremiss);
    },

    /**
     * 关闭Dialog 表单重置
     */
    closeDilog(formName) {
      this.roleForm.note = "";
      this.roleForm.text = "";
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
            text: _this.roleForm.text,
            note: _this.roleForm.note
          };
          if (_this.opt.url === "save") {
            obj.companyId = getters.userCompany.id;
          } else {
            if (_this.activeRole.note === _this.roleForm.note) {
              delete obj.note;
            }
            if (_this.activeRole.text === _this.roleForm.text) {
              delete obj.text;
            }
            if (_.isEmpty(obj)) {
              _this.$message({
                type: "warning",
                message: "未做修改"
              });
              return;
            } else {
              obj.roleId = _this.activeRole.id;
            }
          }
          obj.userId = getters.user.user.id;
          axios({
            url: "/api/api/" + _this.opt.url + "_role",
            method: _this.opt.method,
            data: obj,
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              "Content-Type": "application/json; charset=UTF-8"
            }
          }).then(result => {
            if (result.status == 200) {
              _this.resetForm(formName);
              _this.dialogRoleFormVisible = false;
              if (result.data.data) {
                //重新加载
                _this.findAll();
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
          return false;
        }
      });
    },

    /**
     * @description 添加角色
     */
    handleAdd() {
      this.title = tools.opt[0].text;
      this.dialogRoleFormVisible = true;
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
    select(index, indexPath, component) {
      this.activeRole.id = index ? index : -1;
      this.activeRole.text = component.$el.innerText;
      this.activeRole.note = component.$attrs.note;
    },
    handleEdit() {
      if (!this.hasActiveRole()) {
        return;
      }
      this.title = tools.opt[1].text;
      this.dialogRoleFormVisible = true;
      //绑定表单
      this.roleForm.text = this.activeRole.text;
      this.roleForm.note = this.activeRole.note;
      this.opt = tools.opt[1];
    },
    handleDel() {
      if (!this.hasActiveRole()) {
        return;
      }
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
            url: "api/api/" + _this.opt.url + "_role",
            method: "get",
            params: {
              userId: getters.user.user.id,
              roleId: _this.activeRole.id
            }
          }).then(result => {
            if (result.status == 200) {
              if (result.data.data) {
                _this.findAll();
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
    findAll() {
      var _this = this;
      //getters 数据
      var getters = _this.$store.getters;
      request({
        url: "api/api/role_list",
        method: "get",
        params: {
          companyId: getters.userCompany.id,
          userId: getters.user.role.id
        }
      }).then(result => {
        if (result.status == 200) {
          if (_.isArray(result.data.data)) {
            _this.rolesData = result.data.data;
          }
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
</style>