<template>
  <div class="userM">
    <div class="input-refresh" ref="elememt">
      <el-form :inline="true" :model="searchForm" class="user-form-inline"  >
        <el-form-item>
          <el-button  type="primary"  @click="handleAdd">添加用户</el-button>
          <el-button type="success" @click="handleRefresh" icon="el-icon-refresh"></el-button>
        </el-form-item>

        <el-form-item >
          <el-input v-model="searchForm.search" placeholder="用户名/真实姓名模糊搜索"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleSearchhandleSearch(searchForm.search)"></el-button>
        </el-form-item>
      </el-form>
    </div>


    <el-table
        :data="userdata"
        style="width: 100%"
        :height="heights"
        border
        stripe
        >
            <el-table-column prop="R" type="index" width="75" label="序列" header-align="center" align ="center" ></el-table-column>
            <el-table-column prop="suser" label="用户名称" width="180" header-align="center" align ="center" ></el-table-column>
            <el-table-column prop="struename" label="真实姓名" width="180" header-align="center"  align ="center" ></el-table-column>
            <el-table-column prop="sphone" label="手机号码" width="180" header-align="center"  align ="center" ></el-table-column>
            <el-table-column prop="csex" label="性别" width="80" header-align="center"  align ="center" ></el-table-column>
            <el-table-column prop="srolename" label="角色" width="180" header-align="center"  align ="center" ></el-table-column>
            <el-table-column prop="semail" label="邮箱" width="180" header-align="center"  align ="center" ></el-table-column>
            <el-table-column prop="companyname" label="所属公司" width="180" header-align="center"  align ="center" ></el-table-column>
            <el-table-column label="操作" header-align="center" min-width="350px">
              <template slot-scope="scope">
                <template v-if="scope.row.cisenabled === 'Y'">
                  <el-button size="mini" @click="handleDisable(scope.$index, scope.row)" type="warning">禁用</el-button>
                </template>
                <template v-else >
                  <el-button size="mini" @click="handleAble(scope.$index, scope.row)" type="success">启用</el-button>
                </template>
                
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" type="primary">修改</el-button>
                <el-button size="mini" @click="handleEditPassword(scope.$index, scope.row)" type="primary">修改密码</el-button>
                <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
                <el-button size="mini" @click="handleAuthorizeCompany(scope.$index, scope.row)" type="primary">公司授权</el-button>
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


    <el-dialog title="新增用户" 
      :visible.sync="dialogAddUserVisible"
      width="450px"
      max-height = "60%"
      @close="closeDilog('addUserForm')"
    >
      <el-form :inline="true" label-width="80px" :model="addUserForm" ref='addUserForm' :rules="rules" class="user-form-inline" id="addUser" >
        <el-form-item label="用户名" prop="suser"  >
          <el-input v-model="addUserForm.suser" placeholder="请填写用户名"  style="width:300px"></el-input>
        </el-form-item>

        <el-form-item label="真实姓名" prop="struename">
          <el-input v-model="addUserForm.struename" placeholder="请填写真实姓名" style="width:300px"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="spassword">
          <el-input type="password" v-model.lazy="addUserForm.spassword"  placeholder="请填写密码" style="width:300px"></el-input>
        </el-form-item>
        

        <el-form-item label="确认密码" prop="spassword2">
          <el-input type="password" v-model.lazy="addUserForm.spassword2" placeholder="请填写确认密码" style="width:300px"></el-input>
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
              :key="item.roleId"
              :label="item.sroleName"
              :value="item.roleId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属公司" prop="company">
            <treeselect class="companyRight" 
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
        </el-form-item> -->

        <!-- <el-form-item label="微信">
          <el-input v-model="addUserForm.phone" placeholder="请填写微信"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitAddUserForm('addUserForm')">确 定</el-button>
        <el-button @click="dialogAddUserVisible = false">取 消</el-button>
      </div>
    </el-dialog>                                                                               

    <el-dialog title="修改用户" 
      :visible.sync="dialogEditUserVisible"
      width="450px"
      max-height = "60%"
      @close="closeDilog('editUserForm')"
    >
      <el-form :inline="true" label-width="80px" :model="editUserForm"  ref='editUserForm' :rules="rules" class="user-form-inline">
        <el-form-item label="用户名" prop="suser" :gutter="20">
          <el-input type="text" v-model="editUserForm.suser" placeholder="请填写用户名" style="width:300px"></el-input>
        </el-form-item>

        <el-form-item label="真实姓名" prop="struename">
          <el-input v-model="editUserForm.struename" placeholder="请填写真实姓名" style="width:300px"></el-input>
        </el-form-item>
        
        <el-form-item label="性别" prop="csex">
          <el-select v-model="editUserForm.csex" placeholder="性别"  style="width:300px">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="roleid">
          <el-select v-model="editUserForm.roleid" placeholder="角色"  style="width:300px">
            <el-option
              v-for="item in rolesData"
              :key="item.roleId"
              :label="item.sroleName"
              :value="item.roleId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属公司" prop="company">
            <treeselect class="companyRight" 
              :options="comtree"
              v-model="editUserForm.company"
              :searchable="true"
              placeholder="请选择所属公司"
               style="width:300px"
              />
            <!-- <pre class="result">{{ value }}</pre> -->
        </el-form-item>

        <el-form-item label="联系电话" prop="sphone">
          <el-input v-model="editUserForm.sphone" placeholder="请填写联系电话"  style="width:300px"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="semail">
          <el-input v-model="editUserForm.semail" placeholder="请填写邮箱"  style="width:300px"></el-input>
        </el-form-item>

        <!-- <el-form-item label="QQ">
          <el-input v-model="editUserForm.phone" placeholder="请填写QQ"></el-input>
        </el-form-item> -->

        <!-- <el-form-item label="微信">
          <el-input v-model="editUserForm.phone" placeholder="请填写微信"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitEditUserForm('editUserForm')">确 定</el-button>
        <el-button @click="dialogEditUserVisible = false">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="修改密码"
      data = scope.row
      :visible.sync="dialogEditPasswordVisible"
      width="450px"
      @close="closeDilog('editPasswordForm')"
    >
          <el-form :model="editPasswordForm" status-icon :rules="rulepwd" ref="editPasswordForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="密码" prop="spassword">
          <el-input type="password" v-model="editPasswordForm.spassword" autocomplete="off" style="width:280px"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="spassword2" style="margin-top:25px">
          <el-input type="password" v-model="editPasswordForm.spassword2" autocomplete="off" style="width:280px"></el-input>
        </el-form-item>
        <el-form-item style="text-align: right;margin-top:20px" >
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
      </div> -->

    </el-dialog>

    <el-dialog
      title="公司授权"
      :visible.sync="dialogCompanyAuthorizationVisible"
      width="30%"
      @close="closeDilog('companyAuthorizationForm')"
    >
       <!-- <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="8"> -->
         <el-form :inline="true" label-width="80px" :model="companyAuthorizationForm"  class="user-form-inline">
            <!-- <el-input placeholder="输入关键字进行过滤" v-model="filterText">
              <el-button slot="append" icon="el-icon-refresh" @click="findNodes()"></el-button>
            </el-input> -->
            <el-tree
              :data="comtree"
              show-checkbox
              node-key="scode"
              :props="props"
              class="filter-tree"
              
              :highlight-current="true"
              :default-expanded-keys="expandKeys"
              ref="comtree"
              
              
            ></el-tree>
        </el-form>
      <!-- </el-col> -->
      <!-- <el-form :inline="true" label-width="80px" :model="addUserForm"  class="user-form-inline">
        <el-form-item label="所属公司" prop="company">
            <treeselect
                :options="comtree"
                :multiple="true"
  
                />
            <pre class="result">{{ value }}</pre>
        </el-form-item>
      </el-form> -->
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitCompanyAuthorizationForm(companyAuthorizationForm)">确 定</el-button>
        <el-button @click="dialogCompanyAuthorizationVisible = false">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import request from "utils/http";
import tools from "utils/tools";
import { mapGetters} from "vuex";
import {isValiatePhone} from "utils/validate";
import {isValiateUsername} from "utils/validate";
import {isValiatePw} from "utils/validate";
console.log({isValiatePw});
import {isValiateEmail} from "utils/validate";
//import ExTable from "utils/table";
import store from "@/store";
 // import the component
import Treeselect from '@riophae/vue-treeselect'
  // import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  components: {
    Treeselect 
  },
  /**
   * 三个间隔    10*3
   * 查询背景    60*1
   * 分页背景    70*1
   * 导航栏高度  64*1
   */
  created() {
    debugger
        let me =this;
        if(document.getElementsByClassName('input-refresh').length>0){
            // 得到表单的高度并赋值
            me.inputRefresh = document.getElementsByClassName('input-refresh')[0].offsetHeight;
            if (me.inputRefresh == 0) {
                me.heights = document.body.offsetHeight - 60 - 70 - 64 - 30;
            } else {
                // 计算当前页面的高度 得出表格的高度
                me.heights = document.body.offsetHeight - me.inputRefresh - 70 - 64 - 30;
            }
            
        } else {
            me.heights = document.body.offsetHeight - 60 - 70 - 64 - 30;
            
        }   
        // 跳转到请求数据方法
        me.fetchRemoteData(me.currentPage,me.pagesize);
        //获取公司
        me.getCompany();
        //获取角色信息
        me.getRoles();
  },
  data() {
     let _this = this;
     var validatePass = (rule, value, callback) => {
        if (value === '') {
          debugger
          callback(new Error('请输入密码'));
        }else if (!isValiatePw(value)) {
          callback(new Error("请输入有效的密码"));
        } else {
          if (_this.editPasswordForm.spassword2 !== '') {
            _this.$refs.editPasswordForm.validateField('spassword2');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        }else if (!isValiatePw(value)) {
            callback(new Error("请输入有效的密码"));
        } else if (value !== _this.editPasswordForm.spassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
        props: {
          label: "sname",
          children: "children"
        },
        // 分页---默认第一页
        currentPage: 1,
        // 分页---默认每页100行数据
        pagesize: 100,
        allNum:0,
        comvalue:null,
        comtree: [ ],
        //默认展开节点
        expandKeys: [],
        companyAuthorizationForm:[],
        // 窗口的原始高度
            offsetHeight: document.body.offsetHeight,
        // form表单的原始高度
            inputRefresh: 0,
        // 表格初始化高度为 0 等待计算赋值
            heights: 0,    

      searchForm: {},
      addUserForm:{
        suser:"",
        struename:"",
        spassword:"",
        spassword2:"",
        csex:"男",
        roleid:"",
        sphone:"",
        semail:"",
        cisenabled:"Y",
        cauthorize:"Y",
        company:"",
        value:''      
      },
      // usercompany:null,//用户所属公司编码
      //修改密码
      editPasswordForm:{
        spassword:"",
        spassword2:""
      },
      editUserForm:{},
      userdata: [],
      maxHeight:600,
      dialogAddUserVisible: false,
      dialogEditPasswordVisible: false,
      dialogEditUserVisible: false,
      dialogCompanyAuthorizationVisible: false,
      rolesData: [],
      rulepwd:{
         spassword: [
            { validator: validatePass, trigger: 'blur' }
          ],
          spassword2: [
            { validator: validatePass2, trigger: 'blur' }
          ],
      },
      rules:{//新增用户验证
          suser: [
          { required: true, message: "必填项" },
          {
            validator: (rule, value, callback) => { 
              //const reg = /^[\w_-]{6,16}$/;
              let len = _this.getByteLen(value);
              if (len === 0) {
                 callback(new Error("请输入有效字符"));
              }else if(len>20){
                 callback(new Error("用户名超出长度"));
              } else {
                if (this.scodeDisabled) {
                  callback();
                } else {
                  //验证是否同名
                  // setTimeout(() => {
                  request({
                    url: "/a/sys/user/validate",
                    method: "get",
                    params: {
                      username: value
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
        struename: [{ required: true, message: "必填项", trigger: "blur" },
          {
            validator: (rule, value, callback) => { 

              let len = _this.getByteLen(value);
              if (len === 0) {
                 callback(new Error("请输入真实姓名"));
              }else if(len>400){
                 callback(new Error("用户名超出长度"));
              }
              callback();
            }
          } ],
        spassword: [{ required: true, message: "必填项" },
        {
           validator: (rule, value, callback) => { 
              if (value === '') {
                callback(new Error('请输入密码'));
              }else if (!isValiatePw(value)) {
                  callback(new Error("请输入有效的密码"));
              } else {
                if (_this.addUserForm.spassword2 !== '') {
                  _this.$refs.addUserForm.validateField('spassword2');
                }
                callback();
              }
            }
        }
            ],
        spassword2: [{ required: true, message: "必填项" },
        {
            validator: (rule, value, callback) => { 
              if (value === '') {
                callback(new Error('请再次输入密码'));
              }else if (!isValiatePw(value)) {
                  callback(new Error("请输入有效的密码"));
              } else if (value !== _this.addUserForm.spassword) {
                callback(new Error('两次输入密码不一致!'));
              } else {
                callback();
              }
            }
            
          }],
        company: [
          // { required: true, message: "必填项", trigger: "blur" },
          { required: true, message: "必选项" }
        ],
        sphone: [
          // { required: true, message: "必填项", trigger: "blur" },
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
        csex: [{ required: true, message: "必填项" } ],
        semail: [
          // { required: true, message: "必填项", trigger: "blur" },
          {
            validator: (rule, value, callback) => { 
              if (value === '') {
                callback(new Error('请填写邮箱'));
              } else {
                //if (value !== '') { 
                  //var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                  if(!isValiateEmail(value)){
                    callback(new Error('请输入有效的邮箱'));
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
    maxHeight(newV){ 
      if(!this.timer){
        this.maxHeight = newV;
        this.timer = true;
        let that = this;
        setTimeout(function(){
          that.timer = false;
        },400);
      }
    },
    //切换公司
    company(newV) {debugger
      this.getData('company',newV);
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
    offsetHeight(val){
      debugger
      if(!this.timer){
          debugger
          // 一旦监听到的offsetHeight值改变，就将其重新赋给data里的offsetHeight
          this.offsetHeight = val
          this.timer = true
          let me = this
          setTimeout(function(){
              // 打印offsetHeight变化的值
              me.heights = document.body.offsetHeight - me.inputRefresh - 70 - 64 - 30;
              console.log(me.offsetHeight)
              me.timer = false
          },300)
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
        // debugger
        return (() => {
            window.offsetHeight = document.body.offsetHeight;
            this.offsetHeight = window.offsetHeight;
            this.inputRefresh = document.getElementsByClassName('input-refresh')[0].offsetHeight;
        })()
    }
  },
  computed: {
    ...mapGetters([ "company"])
  },
  methods: {
    // 切换公司时触发
    getData(vax, value){
        // debugger
        let me = this ;
        // if(vax === 'year') {
        //     me.yearId = me.$store.getters[vax] ;
        // } else if(vax === 'month') {
        //     me.monthId = me.$store.getters[vax] ;
        // } else if(vax === 'company') {
            me.companyId = me.$store.getters[vax] ;
        // } else {
        //     me.conversionId = me.$store.getters[vax] ;
        // }
        // 重新发送请求数据
        me.findAll(this.currentPage, this.pagesize);
    },
    /**
     * @value 字符串的长度（可以是汉字）
     */
    getByteLen(value){
        var isempty = typeof value === 'undefined' || value === null || value === ''
        if(!isempty){
            var cn= value.match(/[^\x00-\xff]/g);
            return value.length + (cn == null ? 0 : cn.length);
        }
        return 0;
    },
    /**
     * @addUserForm 新增用户表单数据
     */
    submitAddUserForm(formName){ 
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const _this = this;
            let addUserForm = _this.addUserForm;
            request({
              url: "/a/sys/user/add",
              method: "post",
              data:{
                "suser":addUserForm.suser,
                "struename":addUserForm.struename,
                "spassword":addUserForm.spassword,
                "spassword2":addUserForm.spassword2,
                "csex":addUserForm.csex,
                "roleid":addUserForm.roleid,
                "sphone":addUserForm.sphone,
                "semail":addUserForm.semail,
                "cisenabled":addUserForm.cisenabled,
                "cauthorize":addUserForm.cauthorize,
                "company":"1001"
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
                  //重新加载
                  _this.dialogAddUserVisible = false;
                  _this.fetchRemoteData(_this.currentPage,_this.pagesize);
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
     * @addUserForm 修改用户表单数据
     */
    submitEditUserForm(formName){ 
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const _this = this;
            let editUserForm = _this.editUserForm;
            request({
              url: "/a/sys/user/update",
              method: "post",
              data:{
                "suser":editUserForm.suser,
                "struename":editUserForm.struename,
                "csex":editUserForm.csex,
                "roleid":editUserForm.roleid,
                "sphone":editUserForm.sphone,
                "semail":editUserForm.semail,
                "cisenabled":editUserForm.cisenabled,
                "cauthorize":editUserForm.cauthorize,
                "company":"1001"
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
                  _this.dialogEditUserVisible = false;
                  _this.fetchRemoteData(_this.currentPage,_this.pagesize);
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
    submitEditPasswordForm(formName){

        this.$refs[formName].validate((valid) => {
          if (valid) {
            const _this = this;
            let editPasswordForm = _this.editPasswordForm;
            request({
              url: "/a/sys/user/update_pwd",
              method: "post",
              params:{
                "suser":editPasswordForm.suser,
                "password":editPasswordForm.spassword
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
                  _this.fetchRemoteData(_this.currentPage,_this.pagesize);
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
      this.title = tools.opt[0].text;
      this.dialogEditUserVisible = true;
      this.opt = tools.opt[0];
      this.editUserForm.suser = row.suser;
      this.editUserForm.struename = row.struename;
      this.editUserForm.csex = row.csex;
      this.editUserForm.roleid = row.roleid;
      this.editUserForm.sphone = row.sphone;
      this.editUserForm.semail = row.semail;
      this.editUserForm.company = row.company;

    },
    /**
     * @description 刷新
     */
    handleRefresh(){
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
    resetForm(editPasswordForm){
      debugger
      this.$refs[editPasswordForm].resetFields();
    },
   /**
     * @description 用户启用
     */
    handleAble(index, row) { 
      const _this = this;
        request({
          url: "/a/sys/user/enabled",
          method: "get",
          params:{
            "suser":row.suser
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
              _this.fetchRemoteData(_this.currentPage,_this.pagesize);
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
          url: "/a/sys/user/remove",
          method: "get",
          params:{
            "suser":row.suser
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
              _this.fetchRemoteData(_this.currentPage,_this.pagesize);
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
      this.dialogCompanyAuthorizationVisible = true;
      this.opt = tools.opt[0];
      this.companyAuthorizationForm.suser = row.suser;
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
      var getters = _this.$store.getters;
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
      this.blurrySelect(this.currentPage, this.pagesize,search);
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
    getCompany(){
       const _this = this;
      //var getters = _this.$store.getters;
      //请求数据
      request({
        url: "/a/sys/dimcompany/query_all",
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
                name:"scode",
                children: "children"
              }
            }
          };
          var data = result.data.data;
          if (Array.isArray(data) && data.length > 0) {
            data = tools.sortByKey(data, "scode");
            data = data.filter(function(item){ 
                  if(item.scode == "1001"){//因为排序后的第一个不是天津食品集团，所以只能根据其编码来添加展开的问题
                      item.open = true;//展开此节点
                      _this.expandKeys.push(item.scode);
                  }
                  item.id = item.scode; 
                  item.label =  "("+item.scode+") "+item.sname;
                  item.sname = item.label;
                return item;
            });
            _this.comtree = data;
           // data[0].open = true;
            //_this.expandKeys.push(data[0].scode);
            _this.comtree = tools.transformToeTreeNodes(setting, data);
          }
        }
      });
    },
      /**
     * 获取角色信息
     */
    getRoles(){
       const _this = this;
      //var getters = _this.$store.getters;
      //请求数据
      request({
        url: "/a/sys/role/findAll",
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
      var getters = _this.$store.getters;
      request({
        // url: "/api/api/my_contact_list",
        url:'/a/sys/user/query_comid',
        method: "get",
        params: {
          companyId: getters.company,
          pageNum:currentPage,
          pageSize:pageSize
        }
      }).then(result => { 
        if (result.status == 200) {
          const data = result.data.data;
          _this.userdata = data.datas;
          _this.allNum = data.total;
             
          
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
      if(search){
        var getters = _this.$store.getters;
        request({
          // url: "/api/api/my_contact_list",
          url:'/a/sys/user/query_blur',
          method: "get",
          params: {
            str: search,
            pageNum:currentPage,
            pageSize:pageSize
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
      }else{
          _this.findAll(currentPage, pageSize);
      
      }
    },

    submitCompanyAuthorizationForm(companyAuthorizationForm){ 
        let _this = this;
        let companys = _this.$refs.comtree.getCheckedKeys();
        let _companys = companys.toString();
        request({
          url: "/a/sys/user/authorize_com",
          method: "get",
          params:{
            "suser":companyAuthorizationForm.suser,
            "scodes":_companys
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
              _this.dialogCompanyAuthorizationVisible = false;
              _this.fetchRemoteData(_this.currentPage,_this.pagesize);
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
.el-form-item{
    margin-bottom: 10px;
    margin-top: 10px;
}
 lable[for='company']  {
    width: 70%;
}

</style>




