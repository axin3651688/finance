<template>
  <!--
    组织管理页面
  -->
  <div class="userM">
    <el-container class="userM_main">
      <el-aside class="aside" width="350px" :style="asideHeight">
        <!-- 引用组件 部门 -->
        <user-department ref="department" :text="company_title" :data="comtree2" :newThis="me"></user-department>
      </el-aside>
      <el-main>  
      <!-- 导入弹框 -->
      <div v-if="dialogFormVisible3">
          <user-importDialog :newThis="me"></user-importDialog>
      </div>   
      <!-- 按钮 行 -->
      <div class="input-refresh" ref="elememt">
        <el-form :inline="true" :model="searchForm" class="user-form-inline" style="float: left">
          <el-form-item>
            <template v-if="addButten === 1">
              <el-button type="primary" plain icon="el-icon-circle-plus-outline" @click="handleAdd">添加用户</el-button>
            </template>
            <el-button type="success" plain @click="handleRefresh" icon="el-icon-refresh">刷新</el-button>
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="searchForm" class="user-form-inline" style="float: right">
          <el-form-item>
            <!-- 
              1、如果表单里有一个type=”submit”的按钮，回车键生效。 
              2、如果表单里只有一个type=”text”的input，不管按钮是什么type，回车键生效。 
              3、如果按钮不是用input，而是用button，并且没有加type，IE下默认为type=button，FX默认为type=submit。 
              4、其他表单元素如textarea、select不影响，radio checkbox不影响触发规则，但本身在FX下会响应回车键，在IE下不响应。 
              5、type=”image”的input，效果等同于type=”submit”，不知道为什么会设计这样一种type，不推荐使用，应该用CSS添加背景图合适些。 
                 实际应用的时候，要让表单响应回车键很容易，保证表单里有个type=”submit”的按钮就行。而当只有一个文本框又不希望响应回车键怎么办呢？
                 我的方法有点别扭，就是再写一个无意义的文本框，隐藏起来。根据第3条规则，我们在用button的时候，尽量显式声明type以使浏览器表现一致。 
             -->
            <el-input v-show="false"></el-input>
            <el-input v-model="searchForm.search" placeholder="用户名/真实姓名模糊搜索" @keyup.enter.native="handleSearchhandleSearch(searchForm.search)"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain icon="el-icon-search" @click="handleSearchhandleSearch(searchForm.search)" ></el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain @click="importBtn"><i class="iconfont icon-daoru"></i>导入</el-button>
            <el-button type="primary" plain @click="exportBtn"><i class="iconfont icon-daochu"></i>导出</el-button> 
          </el-form-item>
        </el-form>
      </div>
      <!-- 显示表格 -->
      <el-table :data="userdata" style="width: 100%" :height="heights" border stripe ref="tableData" id="publicTable">
        <el-table-column prop="R" type="index" width="50" label="序列" header-align="center" align="center"></el-table-column>
        <el-table-column
        v-for="item in tableColumn"
        :key="item.id"
        :prop="item.id"
        :label="item.text"
        :width="item.width"
        :align="item.align"
        :show-overflow-tooltip="item.showOverflow"
        header-align="center">

        </el-table-column>
        <!-- <el-table-column prop="suser" label="用户名称" width="150" header-align="center" align="center"></el-table-column>
        <el-table-column prop="struename" label="真实姓名" width="120" header-align="center" align="center"></el-table-column>
        <el-table-column prop="sphone" label="手机号码" width="120" header-align="center" align="center"></el-table-column>
        <el-table-column prop="csex" label="性别" width="60" header-align="center" align="center"></el-table-column>
        <el-table-column prop="srolename" label="角色" width="180" header-align="center" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="semail" label="邮箱" width="220" header-align="center" align="center"></el-table-column>
        <el-table-column prop="companyname" label="所属公司" width="280" header-align="center" align="center" show-overflow-tooltip></el-table-column> -->
        <template v-if="delButten !== 0 && editButten !== 0  && authorizeButten !== 0" >
          <el-table-column label="操作" width="85" header-align="center" align="center">
            <template slot-scope="scope">
              <!-- <template v-if="delButten === 1">
                <template v-if="scope.row.cisenabled === 'Y'">
                  <el-button size="mini" @click="handleDisable(scope.$index, scope.row)" type="warning" plain>禁用</el-button>
                </template>
                <template v-else>
                  <el-button size="mini" @click="handleAble(scope.$index, scope.row)" type="success" plain>启用</el-button>
                </template>
              </template>
              <template v-if="editButten === 1">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" type="primary" plain>修改</el-button>
              </template>
              <template v-if="editButten === 1"> 
                <el-button size="mini" @click="handleEditPassword(scope.$index, scope.row)" type="primary" plain>修改密码</el-button>
              </template>
              <template v-if="authorizeButten === 1"> 
                <el-button size="mini" @click="handleAuthorizeCompany(scope.$index, scope.row)" type="primary" plain>公司授权</el-button>
              </template> -->
              <!-- @click="handleEdit(scope.$index, scope.row)" -->
              <el-dropdown>
                <span class="el-dropdown-link">
                  <i class="el-icon-menu el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" class="el-dropdown-click">
                  <el-dropdown-item v-if="delButten === 1 && scope.row.cisenabled === 'Y'" @click.native="handleDisable(scope.$index, scope.row)" :disabled="getDisabled(scope)">
                      <span ><i class="iconfont icon-jinyong "></i>禁用</span>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="delButten === 1 && scope.row.cisenabled === 'N'" @click.native="handleAble(scope.$index, scope.row)" :disabled="getDisabled(scope)">
                      <span ><i class="iconfont icon-qiyong"></i>启用</span>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="editButten === 1" @click.native="handleEdit(scope.$index, scope.row)" :disabled="getDisabled(scope)">
                      <span ><i class="el-icon-edit-outline"></i>修改</span>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="editButten === 1" @click.native="handleEditPassword(scope.$index, scope.row)" :disabled="getDisabled(scope)"> 
                      <span ><i class="iconfont icon-mima"></i>修改密码</span>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="authorizeButten === 1" @click.native="handleAuthorizeCompany(scope.$index, scope.row)" :disabled="getDisabled(scope)">
                      <span ><i class="iconfont icon-shouquan"></i>公司授权</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </template>
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
        width="901.5px"
        max-height="60%"
        :close-on-click-modal="false"
        :show-close="true"
        @before-close="cancelClick"
        @close="closeDilog('addUserForm')"
      > 
        <div class="dialog-body">
          <!-- <div style="border: 1px solid #ccc;height: 130px;">
            <label class="el-form-item__label" style="width: 100px;margin-top:40px;">上传图片</label>
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
              </el-upload>
            </div>
            <div class="showUploadHead">
              <img class="imgClass" v-if="true" :src="addPhotoUrl">
            </div>
          </div> -->
          <div style="height:2px;border:1px solid #606266;marginTop: -20px;marginBottom:10px"></div>
          <el-form
            :inline="true"
            label-width="100px"
            :model="addUserForm"
            ref="addUserForm"
            :rules="rules"
            class="user-form-inline"
            id="addUser"
          >
            <el-form-item prop="src" style="height: 130px; width: 100%;lineHeight: 130px;">
              <div style="width: 500px;height: 128px; marginLeft:45%;">
                <div style="float: left;lineHeight: 130px;fontSize: 16px;fontWeight:bold;fontFamily:'微软雅黑'">
                  <span>头像设置：</span>
                </div>
                <el-upload
                style="lineHeight: 130px;float: left;"
                class="upload-demo"
                action="/zjb/upload/avar"
                :auto-upload="false"
                :show-file-list="false"
                :data="{suser:addUserForm.suser}"
                :on-success="handleAvatarSuccess"
                :on-change="changeFile"
                :before-upload="beforeAvatarUpload"
                ref="uploadPhoto"
                >
                  <el-button size="small" type="primary" plain>点击上传</el-button>
                  <span style="color: #909399 ; fontSize: 12px; marginLeft: 15px;">支持png、jpeg、jpg文件</span>
                </el-upload>
                <img class="imgClass" v-if="true" :src="addPhotoUrl">
              </div>
            </el-form-item>

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
                @select="companyRight"
                style="width:300px;"
              >
              
               <label slot="option-label" slot-scope="{ node }" >
                  <span style="font-weight:normal"> {{ node.label }} </span>
                </label>
              </treeselect>
              <!-- <pre class="result">{{ value }}</pre> -->
            </el-form-item>
            <el-form-item label="所属部门" prop="department">
              <treeselect
                class="companyDepartment"
                v-model="addUserForm.department"
                :options="comtree2"
                placeholder="请选择所属部门"
                style="width:300px"
              >
              <label slot="option-label" slot-scope="{ node }" >
                  <span style="font-weight:normal"> {{ node.label }} </span>
                </label>
               </treeselect>  
              <!-- <pre class="result">{{ value }}</pre> -->
            </el-form-item>
            <el-form-item label="联系电话" prop="sphone">
              <el-input v-model="addUserForm.sphone" placeholder="请填写联系电话" style="width:300px"></el-input>
            </el-form-item>

            <el-form-item label="邮箱" prop="semail">
              <el-input v-model="addUserForm.semail" placeholder="请填写邮箱" style="width:300px"></el-input>
            </el-form-item>
            <!-- 新增用户的 -->
            <el-form-item label="政治面貌" prop="landscape">
              <el-select v-model="addUserForm.landscape" placeholder="请选择政治面貌" style="width:300px">
                <el-option v-for="item in landscapes" :key="item.scode" :label="item.sname" :value="item.scode"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="教育程度" prop="education">
              <el-select v-model="addUserForm.education" placeholder="请选择教育程度" style="width:300px">
                <el-option v-for="item in educations" :key="item.scode" :label="item.sname" :value="item.scode"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="专业职称" prop="professionalTitle">
              <el-select v-model="addUserForm.professionalTitle" placeholder="请选择专业职称" style="width:300px">
                <el-option v-for="item in professionalTitles" :key="item.scode" :label="item.sname" :value="item.scode"></el-option>
                
              </el-select>
            </el-form-item>

            <el-form-item label="现任职务" prop="currentPosition">
              <el-select v-model="addUserForm.currentPosition" placeholder="请选择现任职务" style="width:300px">
                <el-option v-for="item in currentPositions" :key="item.scode" :label="item.sname" :value="item.scode"></el-option>
                
              </el-select>
            </el-form-item>
          </el-form>
            
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitAddUserForm('addUserForm')">确 定</el-button>
          <el-button @click="cancelClick">取 消</el-button>
        </div>
      </el-dialog>

      <el-dialog
        title="修改用户"
        :visible.sync="dialogEditUserVisible"
        width="901.5px"
        max-height="60%"
        @close="closeDilog('editUserForm')"
      >
        <!-- <div>
          <label class="el-form-item__label" style="width: 100px;margin-top:20px;">修改头像</label>
          <el-input v-model="addUserForm.suser" placeholder="选择图片" style="width:100px"></el-input>width="450px"
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
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
          <div class="showUploadHead">
            <img class="imgClass" v-if="true" :src="editPhotoUrl">
          </div>
        </div> -->
        <div style="height:2px;border:1px solid #606266;marginTop: -20px;marginBottom:10px"></div>
        <el-form
          :inline="true"
          label-width="100px"
          :model="editUserForm"
          ref="editUserForm"
          :rules="rules"
          class="user-form-inline"
        >
          <el-form-item prop="src" style="height: 130px; width: 100%;lineHeight: 130px;">
            <div style="width: 500px;height: 128px; marginLeft:45%;">
              <div style="float: left;lineHeight: 130px;fontSize: 16px;fontWeight:bold;fontFamily:'微软雅黑'">
                <span>头像设置：</span>
              </div>
              <el-upload
              style="lineHeight: 130px;float: left;"
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
                <el-button size="small" type="primary" plain>点击上传</el-button>
                <span style="color: #909399 ; fontSize: 12px; marginLeft: 15px;">支持png、jpeg、jpg文件</span>
              </el-upload>
              <img class="imgClass" v-if="true" :src="editPhotoUrl">
            </div>
          </el-form-item>
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
              @select="companyRight"
            />
            <!-- <pre class="result">{{ value }}</pre> -->
          </el-form-item>
          <el-form-item label="所属部门" prop="department">
              <treeselect
                class="companyDepartment"
                v-model="editUserForm.department"
                :options="comtree2"
                placeholder="请选择所属部门"
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
          <el-form-item label="政治面貌" prop="landscape">
            <el-select v-model="editUserForm.landscape" placeholder="请选择政治面貌" style="width:300px">
              <el-option v-for="item in landscapes" :key="item.scode" :label="item.sname" :value="item.scode"></el-option>             
            </el-select>
          </el-form-item>

            <el-form-item label="教育程度" prop="education">
              <el-select v-model="editUserForm.education" placeholder="请选择教育程度" style="width:300px">
                <el-option v-for="item in educations" :key="item.scode" :label="item.sname" :value="item.scode"></el-option>
                
              </el-select>
            </el-form-item>

            <el-form-item label="专业职称" prop="professionalTitle">
              <el-select v-model="editUserForm.professionalTitle" placeholder="请选择专业职称" style="width:300px">
                <el-option v-for="item in professionalTitles" :key="item.scode" :label="item.sname" :value="item.scode"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="现任职务" prop="currentPosition">
              <el-select v-model="editUserForm.currentPosition" placeholder="请选择现任职务" style="width:300px">
                <el-option v-for="item in currentPositions" :key="item.scode" :label="item.sname" :value="item.scode"></el-option>
              </el-select>
          </el-form-item>
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
      </el-dialog>

      <el-dialog
        title="公司授权"
        :visible.sync="dialogCompanyAuthorizationVisible"
        width="30%"
        @close="closeDilog('companyAuthorizationForm')"
      >
        <div class="dialog-body">
        <el-form
          :inline="true"
          label-width="80px"
          :model="companyAuthorizationForm"
          class="user-form-inline"
        >
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
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            @click="submitCompanyAuthorizationForm(companyAuthorizationForm)"
          >确 定</el-button>
          <el-button @click="dialogCompanyAuthorizationVisible = false">取 消</el-button>
        </div>
      </el-dialog>
      </el-main>
    </el-container>
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
// 部门
import userDepartment from "./userDepartment"
// 导入
import userImportDialog from "./userImportDialog"
export default {
  components: {
    Treeselect,
    userDepartment,
    userImportDialog
  },
  computed: {
    ...mapGetters([
      "user","company"
    ])
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
      dialogFormVisible3: false ,
      me: this ,
      // sjz -- 添加弹出框的
      landscapes: [] ,         // 政治面貌
      educations: [] ,         // 教育程度
      professionalTitles: [],  // 专业职称
      currentPositions: [] ,   // 现任职务
      /**--------------------------------------------------------------- */
      company_title: "",        // 公司名称获取
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
      comtree2: [],
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
      asideHeight: {
        height: "100%"
      },
      // asideHeight: "height: 500px",

      //启用或禁用按钮是否显示
      delButten:1,
      //修改按钮是否显示
      editButten:1,
      //新增按钮是否显示
      addButten:1,
      //授权按钮是否显示
      authorizeButten:1,

      showNodes:[],//选中的节点（公司授权）
      searchForm: {},
      // 新添弹出框
      addUserForm: {
        suser: "",            // 用户名
        struename: "",        // 真实姓名
        spassword: "",        // 密码
        spassword2: "",       // 确认密码
        csex: "男",           // 性别
        roleid: "",           // 角色
        sphone: "",           // 电话
        semail: "",           // 邮箱
        cisenabled: "Y",      // 启用/禁用
        cauthorize: "Y",      // 授权
        company: "",          // 公司
        department: null,     // 部门
        value: "",            // 角色的value
        landscape: "",        // 政治面貌
        education: "",        // 教育程度
        professionalTitle: "",  // 专业职称
        currentPosition: "" ,   // 现任职务
        avatar:""               // 图片
      },
      // usercompany:null,//用户所属公司编码
      //修改密码
      editPasswordForm: {
        spassword: "",
        spassword2: ""
      },
      // 修改弹出框
      editUserForm: {
        suser: "",          // 用户名      
        struename: "",      // 真实姓名
        csex: "",           // 性别
        roleid: "",         // 角色
        sphone: "",         // 电话
        cisenabled: "Y",    // 禁用/启用
        cauthorize: "Y",    // 授权
        semail: "",         // 邮箱
        company: "",        // 公司
        department: null ,  // 部门
        landscape: "",      // 政治面貌
        education: "",      // 教育程度
        professionalTitle: "",  // 专业职称
        currentPosition: "" ,   // 现任职务
        avatar:""           // 图片
      },
      tableColumn: [        // 表格列
        { id: "suser", text: "用户名称", width: "130", align: "center" },
        { id: "struename", text: "真实姓名", width: "130", align: "center" },
        { id: "sphone", text: "联系电话", width: "120", align: "center" },
        { id: "csex", text: "性别", width: "60", align: "center" },
        { id: "srolename", text: "角色", width: "180", align: "center", showOverflow: true },
        { id: "semail", text: "邮箱", width: "220", align: "center" },
        { id: "companyname", text: "所属公司", width: "280", align: "center", showOverflow: true }
      ],
      template: "组织管理",  // 组件名称
      userdata: [],         // 用户表数据
      userdata_cloning: [], // 用户表数据克隆
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
        department: [
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
  /**
   * 三个间隔    10*3
   * 查询背景    60*1
   * 分页背景    70*1
   * 导航栏高度  64*1
   */
  created() {
    let me = this;
    let $com = me.$store.state.prame.command;
    me.company_title = $com.companyName ;

    if (document.getElementsByClassName("input-refresh").length > 0) {
      // 得到表单的高度并赋值
      me.inputRefresh = document.getElementsByClassName("input-refresh")[0].offsetHeight;
      if (me.inputRefresh == 0) {
        me.heights = document.body.offsetHeight - 60 - 70 - 64 - 30;
        me.asideHeight.height = document.body.offsetHeight -64 - 10 + "px";
      } else {
        // 计算当前页面的高度 得出表格的高度
        me.heights =
          document.body.offsetHeight - me.inputRefresh - 70 - 64 - 30;
        me.asideHeight.height = document.body.offsetHeight -64 - 10 + "px";
      }
    } else {
      me.heights = document.body.offsetHeight - 60 - 70 - 64 - 30;
      me.asideHeight.height = document.body.offsetHeight -64 - 10 + "px";
    }
    // 跳转到请求数据方法
    me.fetchRemoteData(me.currentPage, me.pagesize);
    //获取公司
    me.getCompany();
    //获取角色信息
    me.getRoles();
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
      let $com = this.$store.state.prame.command;
      this.company_title = $com.companyName ;
      this.addUserForm.company = this.$store.getters.company;
      let $params = this.$store.state.prame.command;
      let vax = { id: $params.company } ;
      this.getCompanyRight(vax) ;       // 部门数据请求
      this.getData("company", newV);
    },
    // "searchForm.search": {
    //   handler(nowVal, oldV){ debugger
    //     // this.$refs.tableData.filter(nowVal);

    //   },
    //   deep: true
    // },
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
            me.asideHeight.height = document.body.offsetHeight -64 - 10 + "px";
          console.log(me.offsetHeight);
          me.timer = false;
        }, 300);
      }
    }
  },
  mounted() {
    // debugger
    // console.log(store);
    this.addUserForm.company = this.$store.getters.company;
    let $params = this.$store.state.prame.command;
    let vax = { id: $params.company } ;
    this.getCompanyRight(vax) ;
    // 页面大小改变时触发  主要用来自适应页面的布局的 注：一个组件只能写一个页面触发，写多个也只有一个生效
    window.onresize = () => {
      return (() => { 
        window.offsetHeight = document.body.offsetHeight;
        this.offsetHeight = window.offsetHeight;
        this.inputRefresh = document.getElementsByClassName( "input-refresh" )[0].offsetHeight;
        this.asideHeight.height = document.body.offsetHeight -64 - 10 + "px";
      })();
    };
    let database = JSON.parse(localStorage.getItem("database"));
    let menupermisson = database.menupermisson;
    let data = menupermisson.filter( item =>{
          return item.text == "用户管理"
    });
    if(data && data.length > 0){
       this.addButten = data[0].nadd || 0;
       this.editButten = data[0].nupdate  || 0;
       this.delButten = data[0].ndel || 0;
       this.authorizeButten = data[0].nper || 0;
    }
  },
  methods: {
    doFilter(scope) {
      debugger
    },
    // sjz\
    getDisabled(scope){
      // debugger
      let information = this.user.user ;
      // let information = this.$store.getters.user.user ;
      let disabled = true ;
      if(information.roleName === "管理员" || information.roleName === "超级管理员") {
          disabled = false ;
      } else {
          if(information.userName === scope.row.suser) {
              disabled = false ;
          } else {
              disabled = true ;
          }
      }
      return disabled ;
    },
    // sjz 添加用户--选择所属公司时触发
    companyRight(vax,val){
      // debugger
      let me = this ;
      me.getCompanyRight(vax) ;
    },
    // 部门请求数据方法
    getCompanyRight(vax){
      // debugger
      let me = this ;
      // 所属部门请求
      request({
        url: "/zjb/department/query_byscomcode",
        method: "get",
        params: {
          scomcode: vax.id 
        }
      }).then(result => { 
        if (result.status == 200) { 
          if (result.data.code == 200) { 
            // debugger
            // me.$message({message:'查询成功', type:"success"});
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
                item.id = item.scode;
                item.label = "(" + item.scode + ") " + item.sname;
                // item.sname = item.label;
                return item;
              });
              me.comtree2 = data;
              data[0].open = true;
              me.expandKeys.push(data[0].scode);
              me.comtree2 = tools.transformToeTreeNodes(setting, data);
              me.addUserForm.department = me.comtree2[0].id ;
              // me.addUserForm.department = 1 ;
            }
          } else {
            // debugger
            me.comtree2 = [] ;
            me.addUserForm.department = null ;
            me.editUserForm.department = null ;
            me.$message("暂无部门数据");
          }
        }
      });
    },
    // 政治面貌请求
    getLandscape(){
      let me = this ;
      request({
        url: "/zjb/politicalstatus/query_all",
        method: "get",
      }).then(wsx => {
        if(wsx.data.code === 200){
          me.landscapes = wsx.data.data ;
        }
      })
    },
    // 教育程度请求 
    getEducation(){ 
      let me = this ;
      request({
        url: "/zjb/educationlevel/query_all",
        method: "get",
      }).then(edc => { 
        if(edc.data.code === 200){
          me.educations = edc.data.data ;
        }
      })
    },
    // 专业职称请求
    getProfessionalTitle(){
      let me = this ;
      request({
        url: "/zjb/professionaltitle/query_all",
        method: "get",
      }).then(rfv => { 
        if(rfv.data.code === 200){ 
          me.professionalTitles = rfv.data.data ;
        }
      })
    },
    // 现任职务请求 
    getCurrentPosition(){
      let me = this ;
      request({
        url: "/zjb/currentjob/query_all",
        method: "get",
      }).then(qaz => { 
        if(qaz.data.code === 200){
          me.currentPositions = qaz.data.data ;
        }
      })
    },
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
      let me = this,photoUrl = "";
      let imgFile = file.raw;
      if(this.dialogAddUserVisible){
        photoUrl = 'addPhotoUrl';
      }else if(this.dialogEditUserVisible){
        photoUrl = 'editPhotoUrl';
        //修改图片的改变监听。
        this.editUserMessage.avatar = imgFile;
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
              suser: addUserForm.suser,             // 用户名
              struename: addUserForm.struename,     // 真实姓名
              spassword: addUserForm.spassword,     // 密码
              spassword2: addUserForm.spassword2,   // 确认密码
              csex: addUserForm.csex,               // 性别
              roleid: addUserForm.roleid,           // 角色
              sphone: addUserForm.sphone,           // 电话
              semail: addUserForm.semail,           // 邮箱
              cisenabled: addUserForm.cisenabled,   // 禁用/启用
              cauthorize: addUserForm.cauthorize,   // 授权
              company: addUserForm.company,         // 公司
              sdepartmentid: addUserForm.department,// 部门
              /**------------- */
              spoliticsstatus: addUserForm.landscape,     // 政治面貌
              squalifications: addUserForm.education,     // 教育程度
              sprofessionaltitle: addUserForm.professionalTitle,    // 专业职称
              spresentpost: addUserForm.currentPosition             // 现任职务     
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
                _this.$message({ type: "success", message: result.data.msg });
                // //上传图片的请求。
                _this.submitPhotoOfAdd();
                //重新加载
                // _this.dialogAddUserVisible = false;
                _this.cancelClick() ;
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
        // $refId = "uploadPhoto";
      }else if (this.dialogAddUserVisible) {
        $refId = "uploadPhoto";
      }
      let $upload = this.$refs[$refId];
      $upload.submit();
    },
    /**
     * 修改用户信息时改变的内容。
     * @author szc 2019年4月16日15:40:22
     */
    changeOfFormEdit () {
      // debugger;
      let me = this,editUserMessage = me.editUserMessage,editUserForm = me.editUserForm;
      let flag = true;
      if(editUserMessage && editUserForm){
        for(let key in editUserMessage){
          if(editUserMessage[key] != editUserForm[key]){
            flag = false;
            return flag;
          }
          // for(let keyIt in editUserForm) {

          // }
        }
      }
      return flag;
    },
    /**
     * @addUserForm 修改用户表单数据
     */
    submitEditUserForm(formName) {
      // debugger;
      //判断表单中的内容是不是修改、改变了。
      let changeFlag = this.changeOfFormEdit();
      if(changeFlag){
        this.$message({ message: "没有修改内容！", type: "warning" });
        return;
      }
      this.$refs[formName].validate(valid => {  
        if (valid) {
          const _this = this;
          let editUserForm = _this.editUserForm;
          // return false;this.editPhotoUrl = row.avatar;
          request({
            url: "/zjb/sys/user/update",
            method: "post",
            data: {
              // avatar: _this.editPhotoUrl,                 // 图片
              suser: editUserForm.suser,                  // 用户名
              struename: editUserForm.struename,          // 真实姓名
              csex: editUserForm.csex,                    // 性别
              roleid: editUserForm.roleid,                // 角色
              sphone: editUserForm.sphone,                // 电话
              semail: editUserForm.semail,                // 邮箱
              cisenabled: editUserForm.cisenabled,        // 禁用/启用
              cauthorize: editUserForm.cauthorize,        // 授权
              company: editUserForm.company,              // 公司
              sdepartmentid: editUserForm.department,     // 部门
              /**-------------- */ 
              spoliticsstatus: editUserForm.landscape,     // 政治面貌
              squalifications: editUserForm.education,     // 教育程度
              sprofessionaltitle: editUserForm.professionalTitle,    // 专业职称
              spresentpost: editUserForm.currentPosition             // 现任职务      
            }
          }).then(result => { //debugger
            if (result.status == 200) {
              if (result.data.code === 0) {
                _this.$message.error(result.data.msg);
              } else {
                _this.$message({ type: "success", message: result.data.msg });
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
      debugger;
      this.editActiveForm? this.editActiveForm[field] = nowVal:this.editActiveForm = {},this.editActiveForm[field] = nowVal;
    },
    /**
     * 添加弹出框取消按钮 dialogAddUserVisible = false
     */
    cancelClick(){
      let cc = this.addUserForm ;
      for(let key in cc){
        if(key!="cauthorize" && key!="cisenabled" && key!="company" && key!="csex" && key!="department") {
            cc[key] = "" ;
        }
      }
      this.$refs["addUserForm"].resetFields();
      this.dialogAddUserVisible = false;
    },
    /**
     * @description 添加用户
     */
    handleAdd() {
      debugger
      this.title = tools.opt[0].text;
      this.dialogAddUserVisible = true;
      this.opt = tools.opt[0];
      let $params = this.$store.state.prame.command;
      let vax = { id: $params.company } ;
      // let vax = this.comtree[0] ;
      // 部门请求方法
      this.getCompanyRight(vax);
      // 政治面貌请求方法
      this.getLandscape() ;
      // 教育程度请求
      this.getEducation() ;     
      // 专业职称请求    
      this.getProfessionalTitle(); 
      // 现任职务请求 
      this.getCurrentPosition() ;   
    },
    /**
     * @description 修改用户
     */
    handleEdit(index, row) { 
      debugger
      let vax = { id : row.company } ;
      this.getCompanyRight(vax);    // 部门请求
      this.getLandscape() ;         // 政治面貌请求
      this.getEducation() ;         // 教育程度请求
      this.getProfessionalTitle();  // 专业职称请求
      this.getCurrentPosition() ;   // 现任职务请求
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
      this.editUserForm.department = row.sdepartmentid;
      // 到时修改--------
      this.editUserForm.landscape = row.spoliticsstatus ;     // 政治面貌
      this.editUserForm.education = row.squalifications ;     // 教育程度
      this.editUserForm.professionalTitle = row.sprofessionaltitle ;    // 专业职称
      this.editUserForm.currentPosition = row.spresentpost ;            // 现任职务
      //修改头像图片
      this.editPhotoUrl = row.avatar;
      //把当前点击的用户绑定到this上
      this.editUserMessage = {
        suser: row.suser,
        struename: row.struename,
        csex: row.csex,
        roleid: row.roleid,
        cisenabled: row.cisenabled,
        cauthorize: row.cauthorize,
        sphone: row.sphone,
        semail: row.semail,
        company: row.company,
        department: row.sdepartmentid,
        avatar: this.imgFile || row.avatar,
        landscape: row.spoliticsstatus ,     // 政治面貌
        education: row.squalifications ,     // 教育程度
        professionalTitle: row.sprofessionaltitle ,    // 专业职称
        currentPosition: row.spresentpost              // 现任职务
      };
    },
    /**
     * @description 刷新
     */
    handleRefresh() { debugger
      let _this = this;
      this.searchForm.search = "";
      _this.findAll(_this.currentPage, _this.pagesize);
      let cc = this.$refs["department"] ;
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
    
    handleSearchhandleSearch(search) { //debugger
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
    findAll(currentPage, pageSize, pagination) { //debugger
      var _this = this;
      //getters 数据
      let getters = _this.$store.getters;
      let userId = _this.user.user ;
      request({
        // url: "/api/api/my_contact_list",
        url: "/zjb/sys/user/query_comid",
        method: "get",
        params: {
          companyId: getters.company,
          pageNum: currentPage,
          pageSize: pageSize
        }
      }).then(result => {  //debugger
        if (result.status == 200) { 
          if(result.data.data){
            const data = result.data.data;
            _this.userdata = data.datas;
            _this.userdata_cloning = _this.userdata ;
            _this.allNum = data.total;
                            // _this.user.user.userName = 
            _this.userdata.forEach(res => {
              if(res.suser === userId.userName){
                userId.roleName = res.srolename;
              }
            })
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
    },

    /**
     * @description 导入按钮
     */
    importBtn(){
        // this.$message('暂无此功能！')
        this.dialogFormVisible3 = true ;
    },
    /**
     * @description 导出按钮
     */
    exportBtn(){ 
      let me = this ;
      me.downloadLoading = true ;
      me.$confirm('是否导出该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        import('./excel/SJZExport2ExcelTable').then(excel => { // debugger
              //制造一个columns格式传过去。
            let rootColmuns = [],columns = me.tableColumn;
            let firstItem = columns[0];
            columns = columns.filter((item,index) => {
                return index != 0;
            });
            columns.push(firstItem);
            // me.parseColmns(columns,rootColmuns);
            excel.export_table_to_excel("publicTable",me.template,rootColmuns);
            me.$message({ type: 'success', message: '导出成功!' });
        })
      }).catch(() => {
          me.$message({ type: 'info', message: '已取消' });          
      });
    }
  }
};
</script>
<style scoped>
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 2px;
  height: 2px;
  background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 1px rgba(112, 238, 90, 0.3);
  border-radius: 1px;
  background-color: #f5f5f5;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 1px;
  -webkit-box-shadow: inset 0 0 1px rgba(69, 226, 64, 0.3);
  background-color: #9fd467;
}
</style>
<style>

.userM_main .el-aside {
  /* border: 1px solid aquamarine; */
  /* width: 500px; */
  /* min-width: 300px; */
  margin-top: 10px;
  margin-right: 10px;
  background-color: #fff;
}
.userM_main .el-main {
  padding: 0 ;
}
.user-form-inline .el-button{
  height: 40px;
  font-size: 13px;
}
.input-refresh .el-button {
  height: 40px;
  font-size: 13px;
}
.user-form-inline .icon-daoru, .icon-daochu {
  padding-right: 5px ;
}
/* 分页样式 */
.pagination {
    height: 70px;
    width: 100%;
    background-color: #fff;
    margin-top: 10px;
    padding-top: 21px;
}
.pagination .el-pagination {
    text-align: right ;
}
.el-dropdown-link .el-icon--right {
    font-size: 18px ;
    cursor: pointer	;
}
.el-dropdown-link .el-icon--right:hover { color: #1790ff }
/* 表格里的按钮图标 */
.el-dropdown-click li span i { padding-right: 5px; }
.el-dropdown-click li span .icon-jinyong { color: #ffd04b; }
.el-dropdown-click li span .icon-qiyong { color: #179800; }
.el-dropdown-click li span .el-icon-edit-outline { color: #ff0000; }
.el-dropdown-click li span .icon-mima { color: #ffd000; }
.el-dropdown-click li span .icon-shouquan { color: #1790ff; }
/* 表头背景颜色的设定 */
    .has-gutter tr th {
        background-color: rgb(240, 248, 255) !important;
        color: #606266;
    }
/* 固定列表头的颜色设定  加重覆盖*/
.el-table--border th, .el-table__fixed-right-patch{
    background-color: rgb(240, 248, 255);
}
/** 这是对表行的行高设置*/
    .el-table__body tr, .el-table__body td {
        padding: 0;
        height: 32px;
    }
</style>

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
  height: 60px;
  /* height: 80px; line-height: 80px; */
  /* max-height: 160px; */
  /* text-align: center; */
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
    float: left;
    margin-top: 3.5px;
    margin-left: 15px;
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
    // max-height: 400px;
    // overflow: auto;
  }
  
</style>



