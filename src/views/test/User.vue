<template>
  <div class="userM">
    <div class="input-refresh" ref="elememt">
      <el-form :inline="true" :model="searchForm" class="user-form-inline">
        <el-form-item>
          <el-button type="primary" @click="handleAdd">添加用户</el-button>
          <el-button type="success" @click="handleRefresh" icon="el-icon-refresh"></el-button>
        </el-form-item>

        <el-form-item>
          <el-input v-model="searchForm.search" placeholder="用户名/真实姓名模糊搜索"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleSearchhandleSearch(searchForm.search)"
          ></el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="userdata" style="width: 100%" :height="heights" border stripe>
      <el-table-column
        prop="R"
        type="index"
        width="50"
        label="序列"
        header-align="center"
        align="center"
      ></el-table-column>
      <el-table-column prop="suser" label="用户名称" width="100" header-align="center" align="center"></el-table-column>
      <el-table-column
        prop="struename"
        label="真实姓名"
        width="120"
        header-align="center"
        align="center"
      ></el-table-column>
      <el-table-column prop="sphone" label="手机号码" width="120" header-align="center" align="center"></el-table-column>
      <el-table-column prop="csex" label="性别" width="60" header-align="center" align="center"></el-table-column>
      <el-table-column prop="srolename" label="角色" width="180" header-align="center" align="center"></el-table-column>
      <el-table-column prop="semail" label="邮箱" width="180" header-align="center" align="center"></el-table-column>
      <el-table-column
        prop="companyname"
        label="所属公司"
        width="280"
        header-align="center"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" header-align="center" min-width="350px" fixed="right">
        <template slot-scope="scope">
          <template v-if="scope.row.cisenabled === 'Y'">
            <el-button size="mini" @click="handleDisable(scope.$index, scope.row)" type="warning">禁用</el-button>
          </template>
          <template v-else>
            <el-button size="mini" @click="handleAble(scope.$index, scope.row)" type="success">启用</el-button>
          </template>

          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" type="primary">修改</el-button>
          <el-button
            size="mini"
            @click="handleEditPassword(scope.$index, scope.row)"
            type="primary"
          >修改密码</el-button>
          <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
          <el-button
            size="mini"
            @click="handleAuthorizeCompany(scope.$index, scope.row)"
            type="primary"
          >公司授权</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 500, 1000]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.allNum"
      ></el-pagination>
    </div>

    <el-dialog
      title="新增用户"
      :visible.sync="dialogAddUserVisible"
      width="480px"
      max-height="60%"
      @close="closeDilog('addUserForm')"
    > 
      <div class="dialog-body">
        <div>
          <label class="el-form-item__label" style="width: 100px;margin-top:40px;">上传图片</label>
          <!-- <el-input v-model="addUserForm.suser" placeholder="选择图片" style="width:100px"></el-input> -->
          <div class="uploadHead" style="display:inline-block;margin-top:40px;">
            <el-upload
              class="upload-demo"
              action="avar/upload/avar"
              :auto-upload="false"
              :show-file-list="false"
              :data="{suser:addUserForm.suser}"
              :on-success="handleAvatarSuccess"
              :on-change="changeFile"
              :before-upload="beforeAvatarUpload"
              ref="uploadPhoto"
              >
              <el-button size="small" type="primary">点击上传</el-button>
              <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
          </div>
          <div class="showUploadHead">
            <img class="imgClass" v-if="true" :src="addPhotoUrl">
          </div>
        </div>
        
        <el-form
          :inline="true"
          label-width="100px"
          :model="addUserForm"
          ref="addUserForm"
          :rules="rules"
          class="user-form-inline"
          id="addUser"
        >
          <el-form-item label="用户名" prop="suser">
            <el-input v-model="addUserForm.suser" placeholder="请填写用户名" style="width:300px"></el-input>
          </el-form-item>

          <el-form-item label="真实姓名" prop="struename">
            <el-input v-model="addUserForm.struename" placeholder="请填写真实姓名" style="width:300px"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="spassword">
            <el-input
              type="password"
              v-model.lazy="addUserForm.spassword"
              placeholder="请填写密码"
              style="width:300px"
            ></el-input>
          </el-form-item>

          <el-form-item label="确认密码" prop="spassword2">
            <el-input
              type="password"
              v-model.lazy="addUserForm.spassword2"
              placeholder="请填写确认密码"
              style="width:300px"
            ></el-input>
          </el-form-item>

          <el-form-item label="性别" prop="csex">
            <el-select v-model="addUserForm.csex" placeholder="性别" style="width:300px">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="角色" prop="roleid">
            <el-select v-model="addUserForm.roleid" placeholder="角色" style="width:300px">
              <el-option
                v-for="item in rolesData"
                :key="item.roleid"
                :label="item.srolename"
                :value="item.roleid"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="所属公司" prop="company">
            <treeselect
              class="companyRight"
              v-model="addUserForm.company"
              :options="comtree"
              placeholder="请选择所属公司"
              style="width:300px"
            />
            <!-- <pre class="result">{{ value }}</pre> -->
          </el-form-item>

          <el-form-item label="联系电话" prop="sphone">
            <el-input v-model="addUserForm.sphone" placeholder="请填写联系电话" style="width:300px"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="semail">
            <el-input v-model="addUserForm.semail" placeholder="请填写邮箱" style="width:300px"></el-input>
          </el-form-item>

          <!-- <el-form-item label="QQ">
            <el-input v-model="addUserForm.phone" placeholder="请填写QQ"></el-input>
          </el-form-item>-->
          <!-- <el-form-item label="微信">
            <el-input v-model="addUserForm.phone" placeholder="请填写微信"></el-input>
          </el-form-item>-->
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitAddUserForm('addUserForm')">确 定</el-button>
        <el-button @click="dialogAddUserVisible = false">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="修改用户"
      :visible.sync="dialogEditUserVisible"
      width="450px"
      max-height="60%"
      @close="closeDilog('editUserForm')"
    >
      <div>
        <label class="el-form-item__label" style="width: 100px;margin-top:20px;">修改头像</label>
        <!-- <el-input v-model="addUserForm.suser" placeholder="选择图片" style="width:100px"></el-input> -->
        <div class="uploadHead" style="display:inline-block;margin-top:20px;">
          <el-upload
            class="upload-demo"
            action="/zjb/upload/avar"
            :auto-upload="false"
            :show-file-list="false"
            :data="{suser:editUserForm.suser}"
            :on-success="handleAvatarSuccess"
            :on-change="changeFile"
            :before-upload="beforeAvatarUpload"
            ref="editPhoto"
            >
            <el-button size="small" type="primary">点击上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </div>
        <div class="showUploadHead">
          <img class="imgClass" v-if="true" :src="editPhotoUrl">
        </div>
      </div>
      <el-form
        :inline="true"
        label-width="100px"
        :model="editUserForm"
        ref="editUserForm"
        :rules="rules"
        class="user-form-inline"
      >
        <el-form-item label="用户名" prop="suser" :gutter="20">
          <el-input
            type="text"
            v-model="editUserForm.suser"
            :disabled="true"
            placeholder="请填写用户名"
            style="width:300px"
          ></el-input>
        </el-form-item>

        <el-form-item label="真实姓名" prop="struename">
          <el-input v-model="editUserForm.struename" placeholder="请填写真实姓名" style="width:300px"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="csex">
          <el-select v-model="editUserForm.csex" placeholder="性别" style="width:300px">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="roleid">
          <el-select v-model="editUserForm.roleid" placeholder="角色" style="width:300px">
            <el-option
              v-for="item in rolesData"
              :key="item.roleid"
              :label="item.srolename"
              :value="item.roleid"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属公司" prop="company">
          <treeselect
            class="companyRight"
            :options="comtree"
            v-model="editUserForm.company"
            :searchable="true"
            placeholder="请选择所属公司"
            style="width:300px"
          />
          <!-- <pre class="result">{{ value }}</pre> -->
        </el-form-item>

        <el-form-item label="联系电话" prop="sphone">
          <el-input v-model="editUserForm.sphone" placeholder="请填写联系电话" style="width:300px"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="semail">
          <el-input v-model="editUserForm.semail" placeholder="请填写邮箱" style="width:300px"></el-input>
        </el-form-item>

        <!-- <el-form-item label="QQ">
          <el-input v-model="editUserForm.phone" placeholder="请填写QQ"></el-input>
        </el-form-item>-->
        <!-- <el-form-item label="微信">
          <el-input v-model="editUserForm.phone" placeholder="请填写微信"></el-input>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitEditUserForm('editUserForm')">确 定</el-button>
        <el-button @click="dialogEditUserVisible = false">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="修改密码"
      data="scope.row"
      :visible.sync="dialogEditPasswordVisible"
      width="450px"
      @close="closeDilog('editPasswordForm')"
    >
    
      <el-form
        :model="editPasswordForm"
        status-icon
        :rules="rulepwd"
        ref="editPasswordForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="密码" prop="spassword">
          <el-input
            type="password"
            v-model="editPasswordForm.spassword"
            autocomplete="off"
            style="width:280px"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="spassword2">
          <el-input
            type="password"
            v-model="editPasswordForm.spassword2"
            autocomplete="off"
            style="width:280px"
          ></el-input>
        </el-form-item>
        <el-form-item style="text-align: right;margin-top:20px">
          <el-button type="primary" @click="submitEditPasswordForm('editPasswordForm')">提交</el-button>
          <el-button @click="resetForm('editPasswordForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- <el-form :model="editPasswordForm"  ref="editPasswordForm" :rules="rulepwd" label-width="80px">
        <el-form-item label="密码" prop="spassword">
          <el-input type="password" v-model="editPasswordForm.spassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="spassword2">
          <el-input type="password" v-model="editPasswordForm.spassword2"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitEditPasswordForm(editPasswordForm)">确 定</el-button>
        <el-button @click="dialogEditPasswordVisible = false">取 消</el-button>
      </div>-->
    </el-dialog>

    <el-dialog
      title="公司授权"
      :visible.sync="dialogCompanyAuthorizationVisible"
      width="30%"
      @close="closeDilog('companyAuthorizationForm')"
    >
      <el-form
        :inline="true"
        label-width="80px"
        :model="companyAuthorizationForm"
        class="user-form-inline"
      >
        <!-- <el-input placeholder="输入关键字进行过滤" v-model="filterText">
              <el-button slot="append" icon="el-icon-refresh" @click="findNodes()"></el-button>
        </el-input>-->
         <el-tree
          :data="companysTree"
          show-checkbox
          node-key="id"
          :props="defaultProps"
          class="filter-tree"
          :highlight-current="true"
          :default-expanded-keys="expandKeys"
          :default-checked-keys="showNodes"
          ref="companysTree"
        ></el-tree>
      </el-form>
      
      <!-- <el-form :inline="true" label-width="80px" :model="addUserForm"  class="user-form-inline">
        <el-form-item label="所属公司" prop="company">
            <treeselect
                :options="comtree"
                :multiple="true"
  
                />
            <pre class="result">{{ value }}</pre>
        </el-form-item>
      </el-form>-->
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="submitCompanyAuthorizationForm(companyAuthorizationForm)"
        >确 定</el-button>
        <el-button @click="dialogCompanyAuthorizationVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import request from "utils/http";
import tools from "utils/tools";
import { mapGetters } from "vuex";
import {
  isValiatePhone,
  isValiateUsername,
  isValiatePw,
  isValiateEmail
} from "utils/validate";
//import ExTable from "utils/table";
import store from "@/store";
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  components: {
    Treeselect
  },
  computed: {
    ...mapGetters([
      "user","company"
    ])
  },
  /**
   * 三个间隔    10*3
   * 查询背景    60*1
   * 分页背景    70*1
   * 导航栏高度  64*1
   */
  created() {
    let me = this;
    if (document.getElementsByClassName("input-refresh").length > 0) {
      // 得到表单的高度并赋值
      me.inputRefresh = document.getElementsByClassName(
        "input-refresh"
      )[0].offsetHeight;
      if (me.inputRefresh == 0) {
        me.heights = document.body.offsetHeight - 60 - 70 - 64 - 30;
      } else {
        // 计算当前页面的高度 得出表格的高度
        me.heights =
          document.body.offsetHeight - me.inputRefresh - 70 - 64 - 30;
      }
    } else {
      me.heights = document.body.offsetHeight - 60 - 70 - 64 - 30;
    }
    // 跳转到请求数据方法
    me.fetchRemoteData(me.currentPage, me.pagesize);
    //获取公司
    me.getCompany();
    //获取角色信息
    me.getRoles();

    //
  },
  data() {
    let _this = this;
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!isValiatePw(value) || value.length > 18) {
        callback(new Error("1到12位（字母，数字，下划线，减号）"));
      } else {
        if (_this.editPasswordForm.spassword2 !== "") {
          _this.$refs.editPasswordForm.validateField("spassword2");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      }
      //  else if (!isValiatePw(value)) {
      //   callback(
      //     new Error(
      //       "最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符"
      //     )
      //   );
      // }
      else if (value !== _this.editPasswordForm.spassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      //修改用户的图片。
      editPhotoUrl:"",
      //新增用户时的图片地址
      addPhotoUrl:"",
      props: {
        label: "sname",
        children: "children"
      },
      defaultProps:{
        label: "scomname",
        children: "children"
      },
      selectUser:"",
      // 分页---默认第一页
      currentPage: 1,
      // 分页---默认每页100行数据
      pagesize: 100,
      allNum: 0,
      comvalue: null,
      comtree: [],
      //默认展开节点
      expandKeys: [],
      companysTree:[],
      companyAuthorizationForm: {},
      // 窗口的原始高度
      offsetHeight: document.body.offsetHeight,
      // form表单的原始高度
      inputRefresh: 0,
      // 表格初始化高度为 0 等待计算赋值
      heights: 0,

      showNodes:[],//选中的节点（公司授权）
      searchForm: {},
      addUserForm: {
        suser: "",
        struename: "",
        spassword: "",
        spassword2: "",
        csex: "男",
        roleid: "",
        sphone: "",
        semail: "",
        cisenabled: "Y",
        cauthorize: "Y",
        company: "",
        value: ""
      },
      // usercompany:null,//用户所属公司编码
      //修改密码
      editPasswordForm: {
        spassword: "",
        spassword2: ""
      },
      editUserForm: {
        suser: "",
        struename: "",
        csex: "",
        roleid: "",
        sphone: "",
        cisenabled: "Y",
        cauthorize: "Y",
        semail: "",
        company: "",
        avatar:""
      },
      userdata: [],
      maxHeight: 600,
      dialogAddUserVisible: false,
      dialogEditPasswordVisible: false,
      dialogEditUserVisible: false,
      dialogCompanyAuthorizationVisible: false,
      rolesData: [],
      rulepwd: {
        spassword: [{ validator: validatePass, trigger: "blur" }],
        spassword2: [{ validator: validatePass2, trigger: "blur" }]
      },
      rules: {
        //新增用户验证
        suser: [
          { required: true, message: "必填项" },
          {
            validator: (rule, value, callback) => {
              //const reg = /^[\w_-]{6,16}$/;
              let len = _this.getByteLen(value);
              if (len === 0) {
                callback(new Error("请输入有效字符"));
              } else if (len > 20) {
                callback(new Error("用户名超出长度"));
              } else {
                //编辑界面不需要验证同名
                if (this.scodeDisabled || this.dialogEditUserVisible) {
                  callback();
                } else {
                  //验证是否同名
                  // setTimeout(() => {
                  request({
                    url: "/zjb/sys/user/validate",
                    method: "get",
                    params: {
                      suser: value
                    }
                  }).then(result => {
                    if (result.status == 200) {
                      if (result.data.code == 200) {
                        callback();
                      } else {
                        callback(new Error("用户名已存在"));
                      }
                    }
                  });
                }
                // }, 500);
              }
            },
            trigger: "blur" //触发
          },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符"
          }
        ],
        struename: [
          { required: true, message: "必填项", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let len = _this.getByteLen(value);
              if (len === 0) {
                callback(new Error("请输入真实姓名"));
              } else if (len > 400) {
                callback(new Error("用户名超出长度"));
              }
              callback();
            }
          }
        ],
        spassword: [
          { required: true, message: "必填项" },
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请输入密码"));
              } else if (!isValiatePw(value)) {
                callback(new Error("1到12位（字母，数字，下划线，减号）"));
              } else {
                if (_this.addUserForm.spassword2 !== "") {
                  _this.$refs.addUserForm.validateField("spassword2");
                }
                callback();
              }
            }
          }
        ],
        spassword2: [
          { required: true, message: "必填项" },
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请再次输入密码"));
              }
              // else if (!isValiatePw(value)) {
              //   callback(
              //     new Error(
              //       "最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符"
              //     )
              //   );
              // }
              else if (value !== _this.addUserForm.spassword) {
                callback(new Error("两次输入密码不一致!"));
              } else {
                callback();
              }
            }
          }
        ],
        roleid: [
          { required: true, message: "必选项" }
        ],
        company: [
          // { required: true, message: "必填项", trigger: "blur" },
          { required: true, message: "必选项" }
        ],
        sphone: [
          { required: true, message: "必填项", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              // const reg = /(?:^1[3456789]|^9[28])\d{9}$/;//电话号码验证
              if (!isValiatePhone(value)) {
                callback(new Error("请输入有效的手机号码"));
              }
              callback();
            }
          }
        ],
        csex: [{ required: true, message: "必填项" }],
        roleid: [{ required: true, message: "必填项" }],
        semail: [
          { required: true, message: "必填项", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请填写邮箱"));
              } else {
                //if (value !== '') {
                //var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                if (!isValiateEmail(value)) {
                  callback(new Error("请输入有效的邮箱"));
                }
                // }
                callback();
              }
            }
          }
        ]
      }
    };
  },

  watch: {
    maxHeight(newV) {
      if (!this.timer) {
        this.maxHeight = newV;
        this.timer = true;
        let that = this;
        setTimeout(function() {
          that.timer = false;
        }, 400);
      }
    },
    //切换公司
    company(newV) {
      this.getData("company", newV);
    },
    //监听修改表单变化
    "form.suser": {
      handler(nowVal, oldV) {
        this.watchField("suser", nowVal);
      },
      deep: true
    },
    "form.struename": {
      handler(nowVal, oldV) {
        this.watchField("struename", nowVal);
      },
      deep: true
    },
    "form.csex": {
      handler(nowVal, oldV) {
        this.watchField("csex", nowVal);
      },
      deep: true
    },
    "form.roleid": {
      handler(nowVal, oldV) {
        this.watchField("roleid", nowVal);
      },
      deep: true
    },
    "form.sphone": {
      handler(nowVal, oldV) {
        this.watchField("sphone", nowVal);
      },
      deep: true
    },
    "form.semail": {
      handler(nowVal, oldV) {
        this.watchField("semail", nowVal);
      },
      deep: true
    },
    "form.company": {
      handler(nowVal, oldV) {
        this.watchField("company", nowVal);
      },
      deep: true
    },
    // 监听offsetHeight属性值的变化，打印并观察offsetHeight发生变化的值：
    offsetHeight(val) {
      if (!this.timer) {
        // 一旦监听到的offsetHeight值改变，就将其重新赋给data里的offsetHeight
        this.offsetHeight = val;
        this.timer = true;
        let me = this;
        setTimeout(function() {
          // 打印offsetHeight变化的值
          me.heights =
            document.body.offsetHeight - me.inputRefresh - 70 - 64 - 30;
          console.log(me.offsetHeight);
          me.timer = false;
        }, 300);
      }
    }
  },
  mounted() {
    // console.log(store);
    this.addUserForm.company = store.getters.company;
    // const that = this;
    // window.onresize = () =>{
    //   return (() => {
    //     this.maxHeight = tools.setTableMaxHeight(subHeight);
    //     this.$refs.userTable.fetchData();
    //   })();
    // };
    // this.maxHeight = tools.setTableMaxHeight(subHeight);
    // this.$refs.userTable.fetchData();
    // const me = this
    // 页面大小改变时触发  主要用来自适应页面的布局的 注：一个组件只能写一个页面触发，写多个也只有一个生效
    window.onresize = () => {
      return (() => {
        window.offsetHeight = document.body.offsetHeight;
        this.offsetHeight = window.offsetHeight;
        this.inputRefresh = document.getElementsByClassName(
          "input-refresh"
        )[0].offsetHeight;
      })();
    };
  },
  methods: {

    setTreeHeight() {
      this.contentStyleObj.height = `${document.documentElement.clientHeight -
        124}px`;
      // 然后监听window的resize事件．在浏览器窗口变化时高度．
      const that = this;
      window.onresize = function temp() {
        that.contentStyleObj.height = `${document.documentElement.clientHeight -
          124}px`;
      };
    },
    /**
     * 文件改变时的回调。
     */
    changeFile (file,fileList) {
      //限制上传的图片的大小。
      // let sizePhoto = file.size / 1024 / 1024 < 1;
      // if(!sizePhoto && file.status == "ready"){
      //   this.$message.error('上传头像图片大小不能超过1MB!');
      //   return;
      // }
      let me = this,photoUrl = "";
      let imgFile = file.raw;
      if(this.dialogAddUserVisible){
        photoUrl = 'addPhotoUrl';
      }else if(this.dialogEditUserVisible){
        photoUrl = 'editPhotoUrl';
      }
      //上传头像预览
      let fr = new FileReader();
      fr.onload = function (e) {
          me[photoUrl] = fr.result;
      };
      fr.readAsDataURL(imgFile);
    },
    /**
     * 上传头像之前的拦截方法。
     */
    beforeAvatarUpload (res,file) {
      // const isLt2M = res.size / 1024 / 1024 < 1;
      // // if (!isLt2M) {
        
      // // }
      // return isLt2M;
      // let me = this;
      // var imgFile = res;
      // var fr = new FileReader();
      // fr.onload = function () {
      //     me.addPhotoUrl = fr.result;
      // };
      // fr.readAsDataURL(imgFile);
      // let me = this;
    },
    /**
     * 上传头像成功之后的回调
     */
    handleAvatarSuccess (file) {
      let me = this;
      if(file && file.data.code == 200){
        if(me.editUserForm.suser === this.user.user.userName){
          //因为有一个地方设置的是缓存的内容，所以这边统一一下，缓存的内容，不然的话，找不到会报错。
          let database = JSON.parse(localStorage.database);
          database.user.avatar = file.data.data;
          //重新给缓存存储新的地址对象。这个地方主要是刷新的时候用的。
          let obj = JSON.stringify(database); //转化为JSON字符串
          localStorage.setItem("database", obj); //返回{"a":1,"b":2}
          this.$store.dispatch("setUser", database);
        }else {
          //这个方法调了两遍，可以优化，暂时这样。
          this.findAll(me.currentPage,me.pagesize);
        } 
        //修改成功之后，用户名置空，防止新增的时候上面的判断也有时成立。
        this.editUserForm.suser = "";
      }else{
        this.$message.error('上传头像出错！');
      }
    },
    closeDilog(dialog) {
      console.log("close..." + dialog);
    },

    // 切换公司时触发
    getData(vax, value) {
      let me = this;
      // if(vax === 'year') {
      //     me.yearId = me.$store.getters[vax] ;
      // } else if(vax === 'month') {
      //     me.monthId = me.$store.getters[vax] ;
      // } else if(vax === 'company') {
      me.companyId = me.$store.getters[vax];
      // } else {
      //     me.conversionId = me.$store.getters[vax] ;
      // }
      // 重新发送请求数据
      me.findAll(this.currentPage, this.pagesize);
    },
    /**
     * @value 字符串的长度（可以是汉字）
     */
    getByteLen(value) {
      var isempty =
        typeof value === "undefined" || value === null || value === "";
      if (!isempty) {
        var cn = value.match(/[^\x00-\xff]/g);
        return value.length + (cn == null ? 0 : cn.length);
      }
      return 0;
    },
    /**
     * @addUserForm 新增用户表单数据
     */
    submitAddUserForm(formName) {
      //上传图片的请求。
      // this.submitPhotoOfAdd();
      this.$refs[formName].validate(valid => {
        if (valid) {
          const _this = this;
          let addUserForm = _this.addUserForm;
          request({
            url: "/zjb/sys/user/add",
            method: "post",
            data: {
              suser: addUserForm.suser,
              struename: addUserForm.struename,
              spassword: addUserForm.spassword,
              spassword2: addUserForm.spassword2,
              csex: addUserForm.csex,
              roleid: addUserForm.roleid,
              sphone: addUserForm.sphone,
              semail: addUserForm.semail,
              cisenabled: addUserForm.cisenabled,
              cauthorize: addUserForm.cauthorize,
              company: addUserForm.company
            }
          }).then(result => {
            // if (result.status == 200) {
            //   this.$message({
            //         type: "success",
            //         message: "新增成功!"
            //       });
            //   _this.fetchRemoteData(_this.currentPage,_this.pagesize);
            // }

            if (result.status == 200) {
              if (result.data.code === 0) {
                _this.$message.error(result.data.msg);
              } else {
                _this.$message({
                  type: "success",
                  message: result.data.msg
                });
                // //上传图片的请求。
                _this.submitPhotoOfAdd();
                //重新加载
                _this.dialogAddUserVisible = false;
                _this.fetchRemoteData(_this.currentPage, _this.pagesize);
              }
            } else {
              _this.dialogAddUserVisible = false;
              _this.$message.error(result.statusText);
            }
          });

          //alert('submit!');
        } else {
          // _this.$message({
          //     type: "error",
          //     message: '未修改！'
          //   });
          //alert('未修改!');
          return false;
        }
      });
    },
    /**
     * 新增用户时，上传图片的请求
     */
    submitPhotoOfAdd () {
      let me = this,$refId = "";
      if(this.dialogEditUserVisible){
        $refId = "editPhoto"
      }else if (this.dialogAddUserVisible) {
        $refId = "uploadPhoto";
      }
      let $upload = this.$refs[$refId];
      $upload.submit();
    },
    /**
     * @addUserForm 修改用户表单数据
     */
    submitEditUserForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const _this = this;
          let editUserForm = _this.editUserForm;
          // return false;
          request({
            url: "/zjb/sys/user/update",
            method: "post",
            data: {
              suser: editUserForm.suser,
              struename: editUserForm.struename,
              csex: editUserForm.csex,
              roleid: editUserForm.roleid,
              sphone: editUserForm.sphone,
              semail: editUserForm.semail,
              cisenabled: editUserForm.cisenabled,
              cauthorize: editUserForm.cauthorize,
              company: editUserForm.company
            }
          }).then(result => {
            if (result.status == 200) {
              if (result.data.code === 0) {
                _this.$message.error(result.data.msg);
              } else {
                _this.$message({
                  type: "success",
                  message: result.data.msg
                });
                //修改图片的请求。
                _this.submitPhotoOfAdd();
                //重新加载
                _this.dialogEditUserVisible = false;
                _this.fetchRemoteData(_this.currentPage, _this.pagesize);
              }
            } else {
              _this.dialogEditUserVisible = false;
              _this.$message.error(result.statusText);
            }
            // if (result.code == 200) {
            //   this.$message({
            //         type: "success",
            //         message: "修改成功!"
            //       });
            // }
          });
        } else {
          //console.log('error submit!!');
          return false;
        }
      });
    },
    /**
     * @editPasswordForm 修改密码
     * @param 监控字段
     * @param nowVal 新值
     * zb
     */
    submitEditPasswordForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const _this = this;
          let editPasswordForm = _this.editPasswordForm;
          request({
            url: "/zjb/sys/user/update_pwd",
            method: "post",
            params: {
              suser: editPasswordForm.suser,
              password: editPasswordForm.spassword
            }
          }).then(result => {
            if (result.status == 200) {
              if (result.data.code === 0) {
                _this.$message.error(result.data.msg);
              } else {
                _this.$message({
                  type: "success",
                  message: result.data.msg
                });
                //重新加载
                _this.dialogEditPasswordVisible = false;
                _this.fetchRemoteData(_this.currentPage, _this.pagesize);
              }
            } else {
              _this.dialogEditPasswordVisible = false;
              _this.$message.error(result.statusText);
            }
          });
        } else {
          //console.log('error submit!!');
          return false;
        }
      });
    },
    //pagesize改变时触发 ---- 分页功能
    handleSizeChange: function(size) {
      this.pagesize = size;
      this.findAll(this.currentPage, this.pagesize);
    },
    //currentPage改变时会触发 --- 分页功能
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.findAll(this.currentPage, this.pagesize);
    },
    /**
     * @description 监控表单变化
     * @param 监控字段
     * @param nowVal 新值
     * zb
     */
    watchField(field, nowVal) {
      this.activeForm[field] = nowVal;
    },
    /**
     * @description 添加用户
     */
    handleAdd() {
      this.title = tools.opt[0].text;
      this.dialogAddUserVisible = true;
      this.opt = tools.opt[0];
    },
    /**
     * @description 修改用户
     */
    handleEdit(index, row) {
      this.title = tools.opt[1].text;
      this.dialogEditUserVisible = true;
      this.opt = tools.opt[1];
      this.editUserForm.suser = row.suser;
      this.editUserForm.struename = row.struename;
      this.editUserForm.csex = row.csex;
      this.editUserForm.roleid = row.roleid;
      this.editUserForm.cisenabled = row.cisenabled;
      this.editUserForm.cauthorize = row.cauthorize;
      this.editUserForm.sphone = row.sphone;
      this.editUserForm.semail = row.semail;
      this.editUserForm.company = row.company;
      this.editUserForm.avatar = row.avatar;
      //修改头像图片
      this.editPhotoUrl = row.avatar;
    },
    /**
     * @description 刷新
     */
    handleRefresh() {
      let _this = this;
      _this.findAll(_this.currentPage, _this.pagesize);
    },
    /**
     * @description 修改密码 zb
     */
    handleEditPassword(index, row) {
      this.title = tools.opt[0].text;
      this.dialogEditPasswordVisible = true;
      this.opt = tools.opt[0];
      this.editPasswordForm.suser = row.suser;
    },
    /**
     * @description 修改密码重置按钮 zb
     */
    resetForm(editPasswordForm) {
      this.$refs[editPasswordForm].resetFields();
    },
    /**
     * @description 用户启用
     */
    handleAble(index, row) {
      const _this = this;
      request({
        url: "/zjb/sys/user/enabled",
        method: "get",
        params: {
          suser: row.suser
        }
      }).then(result => {
        if (result.status == 200) {
          if (result.data.code === 0) {
            _this.$message.error(result.data.msg);
          } else {
            _this.$message({
              type: "success",
              message: result.data.msg
            });
            //重新加载
            _this.fetchRemoteData(_this.currentPage, _this.pagesize);
          }
        } else {
          _this.$message.error(result.statusText);
        }
      });
    },

    /**
     * @description 用户禁用
     */
    handleDisable(index, row) {
      const _this = this;
      request({
        url: "/zjb/sys/user/remove",
        method: "get",
        params: {
          suser: row.suser
        }
      }).then(result => {
        if (result.status == 200) {
          if (result.data.code === 0) {
            _this.$message.error(result.data.msg);
          } else {
            _this.$message({
              type: "success",
              message: result.data.msg
            });
            //重新加载
            _this.fetchRemoteData(_this.currentPage, _this.pagesize);
          }
        } else {
          _this.$message.error(result.statusText);
        }
      });
    },

    /**
     * @description 公司授权
     */
    handleAuthorizeCompany(index, row) {
      this.title = tools.opt[0].text;
      //this.dialogCompanyAuthorizationVisible = true;
      this.opt = tools.opt[0];
      this.companyAuthorizationForm.suser = row.suser;
      this.showNodes =[];//清空节点的选中（公司授权）
      this.selectUser = row.suser;
      this.getUserCompany(row);//根据当前用户获取公司权限
    },
    getUserCompany(row){
        var _this = this;
      //getters 数据
      let getters = _this.$store.getters;
      let user=getters.user.user.userName;
      let currentRoleId = getters.user.role.id;
      request({
        url: "/zjb/sys/menupermission/query_companys_permission",
        method: "get",
        params:{
            userId:row.suser,
            roleId:row.roleid,
            currentUserId:user,
            currentRoleId:currentRoleId
        }
      }).then(result => { 
      if (result.status == 200 && result.data.code == 200) {
          _this.dialogCompanyAuthorizationVisible = true;
          //封装树对象数据
          const setting = {
            data: {
              simpleData: {
                enable: true,
                idKey: "scomcode",
                pIdKey: "spcode"
              },
              key: {
                name:"scomcode",
                children: "children"
              }
            }
          };
          var data = result.data.data;
          if (Array.isArray(data) && data.length > 0) {
            data = tools.sortByKey(data, "scomcode");
            data = data.filter(function(item) {
               if(item.scomcode == item.scomcode2){
                    _this.showNodes.push(item.scomcode);
               }
               
              // if (item.scode == "1001") {
              //   //因为排序后的第一个不是天津食品集团，所以只能根据其编码来添加展开的问题
              //   item.open = true; //展开此节点
              //   _this.expandKeys.push(item.scode);
              // }
              item.id = item.scomcode;
              item.label =  item.scomname;
             // item.sname = item.label;
              return item;
            });
            data[0].open = true;
            _this.expandKeys.push(data[0].scomcode);
            _this.companysTree = tools.transformToeTreeNodes(setting, data);
          }


        } else if (result.status == 200 && result.data.code != 200) {
          //alert (result.data.msg);
          //友情提示：用户是否用权限对别的用户授权
          _this.$message({
            "message":result.data.msg,
            "type":"warning"
          });
          _this.dialogCompanyAuthorizationVisible = false;
          return ;
        }

      });
    },
    /**
     * @description 打开弹出层
     */
    handleOpen(index, row) {
      this.dialogRolesVisible = true;
      this.handleInfo(index, row);
    },

    /**
     * @description 查询当前记录详细页
     * @param index 索引
     * @param row 选择行
     * */
    handleInfo(index, row) {
      var _this = this;
      //getters 数据
      let getters = _this.$store.getters;
      request({
        url: "/api/api/role_list",
        method: "get",
        params: {
          companyId: getters.userCompany.id,
          userId: row.id
        }
      }).then(result => {
        if (result.status == 200) {
          if (_.isArray(result.data.data)) {
            _this.rolesData = result.data.data;
          }
        }
      });
    },
    onSubmit() {
      console.log("submit!");
    },

    handleSearchhandleSearch(search) {
      //this.fetchRemoteData(currentPage, pageSize);
      this.blurrySelect(this.currentPage, this.pagesize, search);
    },

    fetchRemoteData(currentPage, pageSize) {
      //设置分页总数
      //const pagination = this.$refs.userTable.pagination;
      //获取表格数据
      this.findAll(currentPage, pageSize);
    },

    /**
     * 获取公司
     */
    getCompany() {
      const _this = this;
      //var getters = _this.$store.getters;
      //请求数据
      request({
        url: "/zjb/sys/dimcompany/query_all",
        method: "get"
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
                name: "scode",
                children: "children"
              }
            }
          };
          var data = result.data.data;
          if (Array.isArray(data) && data.length > 0) {
            data = tools.sortByKey(data, "scode");
            data = data.filter(function(item) {
              // if (item.scode == "1001") {
              //   //因为排序后的第一个不是天津食品集团，所以只能根据其编码来添加展开的问题
              //   item.open = true; //展开此节点
              //   _this.expandKeys.push(item.scode);
              // }
              item.id = item.scode;
              item.label = "(" + item.scode + ") " + item.sname;
              item.sname = item.label;
              return item;
            });
            _this.comtree = data;
            data[0].open = true;
            _this.expandKeys.push(data[0].scode);
            _this.comtree = tools.transformToeTreeNodes(setting, data);
          }
        }
      });
    },
    /**
     * 获取角色信息
     */
    getRoles() {
      const _this = this;
      //var getters = _this.$store.getters;
      //请求数据
      request({
        url: "/zjb/sys/role/findAll",
        method: "get"
      }).then(result => {
        let data = result.data.data;
        _this.rolesData = data;
      });
    },
    /**
     * @description 分页查询数据，用于服务端分页
     * @param currentPage 当前页码
     * @param pageSize 每页条数
     * @param pagination
     * @returns 结果返回｛data_list: [...], total: ..｝
     */
    findAll(currentPage, pageSize, pagination) {
      var _this = this;
      //getters 数据
      let getters = _this.$store.getters;
      request({
        // url: "/api/api/my_contact_list",
        url: "/zjb/sys/user/query_comid",
        method: "get",
        params: {
          companyId: getters.company,
          pageNum: currentPage,
          pageSize: pageSize
        }
      }).then(result => {
        if (result.status == 200) {
          if(result.data.data){
            const data = result.data.data;
            _this.userdata = data.datas;
            _this.allNum = data.total;
          }else{
            _this.userdata = [];
            _this.allNum = 0;
          }

          
        }
      });
    },

    /**
     * @description 分页查询数据，用于服务端分页
     * @param currentPage 当前页码
     * @param pageSize 每页条数
     * @param pagination
     * @returns 结果返回｛data_list: [...], total: ..｝
     *
     * 模糊查询
     * zb
     */
    blurrySelect(currentPage, pageSize, search) {
      var _this = this;
      //getters 数据
      if (search) {
        let getters = _this.$store.getters;
        request({
          // url: "/api/api/my_contact_list",
          url: "/zjb/sys/user/query_blur",
          method: "get",
          params: {
            str: search,
            pageNum: currentPage,
            pageSize: pageSize
          }
        }).then(result => {
          if (result.status == 200) {
            const data = result.data.data;

            // let len =0;
            // if(data && data.length > 0){
            //     len = data.length;
            // }
            // let a = currentPage-1,b = currentPage-0;

            // let num1 = a*(pageSize-0);
            // let num2 = b*(pageSize-0);
            // let userdata = [];
            // if(data && data.length > 0){
            //     for(let i=0;i<data.length;i++){
            //         if(i > (num1-1) && i < num2){
            //             userdata.push(data[i]);
            //         }
            //     }
            // }
            _this.userdata = data.datas;
            // if (_.isPlainObject(data)) {

            //   _this.userdata = data.list;
            //   //手动实现分页

            _this.allNum = data.total;

            // }
          }
        });
      } else {
        _this.findAll(currentPage, pageSize);
      }
    },

    submitCompanyAuthorizationForm(companyAuthorizationForm) {
      let _this = this;
      let getters = _this.$store.getters;
      let suser = companyAuthorizationForm.suser;
      let userId = _this.selectUser;
      let currentUserId = getters.user.user.userName;
      let companys = _this.$refs.companysTree.getCheckedKeys();
      let _companys = [];
      if(companys && companys.length > 0){
        for(let i =0;i<companys.length;i++){
          let obj = {
            scomcode: companys[i],
            suser: suser,
            usercompanyid: null
          }
          _companys.push(obj);
        }
        
      }
      let pramer = {
            suser:userId,
            currentSuser:currentUserId,
            userCompanys: _companys
          };
        pramer = JSON.stringify(pramer);

     // let _companys = companys.toString();
      request({
        url: "/zjb/sys/usercompany/grantcompanys",
        method: "post",
        headers	:{'Content-Type': 'application/json'},
        data: pramer
      }).then(result => {
        if (result.status == 200) {
          if (result.data.code === 0) {
            _this.$message.error(result.data.msg);
          } else {
            _this.$message({
              type: "success",
              message: result.data.msg
            });
            //重新加载
            _this.dialogCompanyAuthorizationVisible = false;
            _this.fetchRemoteData(_this.currentPage, _this.pagesize);
          }
        } else {
          _this.dialogCompanyAuthorizationVisible = false;
          _this.$message.error(result.statusText);
        }
      });
    }
  }
};
</script>
<style scoped>
/* .userM {
  margin-top: 10px;
} */

.info {
  cursor: pointer;
}
.companyRight {
  float: right;
}
.input-refresh {
  width: 100%;
  /* height: 80px; line-height: 80px; */
  /* max-height: 160px; */
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #fff;
}
.el-form-item {
  margin-bottom: 10px;
  margin-top: 10px;
}
lable[for="company"] {
  width: 70%;
}
</style>
<style lang="scss" scoped>
  .showUploadHead {
    float: right;
    display: inline-block;
    height: 130px;
    width: 100px;
    // top: -20px;
    right: 55px;
    position: relative;
  }
  //图片的样式
  .imgClass {
    height: 120px;
    width: 120px;
    border-radius: 50%;
    overflow: hidden;
  }
  .uploadHead {
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
  //新增用户的样式调整 2019年3月27日10:54:51 szc
  .dialog-body {
    max-height: 400px;
    overflow: auto;
  }
  
</style>



