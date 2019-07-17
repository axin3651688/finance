<template>
  <div class="companyM">
    <el-row :gutter="24">
      <!--公司树-->
      <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="8">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText">
          <el-button slot="append" icon="el-icon-refresh" @click="refreshNodes()"></el-button>
        </el-input>

         <el-tree
          :style="contentStyleObj"
          :data="treedata"
          node-key="scode"
          :props="props"
          :filter-node-method="filterNode"
          :highlight-current="true"
          :expand-on-click-node="false"
          :default-expanded-keys="expandKeys"
          ref="comtree"
          @node-click="handClick"
          @node-drag-start="handleDragStart"
          @node-drag-enter="handleDragEnter"
          @node-drag-leave="handleDragLeave"
          @node-drag-over="handleDragOver"
          @node-drag-end="handleDragEnd"
          @node-drop="handleDrop"
          draggable
          :allow-drop="allowDrop"
          :allow-drag="allowDrag"
          :render-content="renderContent"
          >
      
      <!-- <span  slot-scope="{ node }">
        <span :class="[node.cisdel === 'N' ? 'noDelCss' : 'delCss' ]">{{ node.label }}</span>
      </span> -->
    </el-tree>
        <!-- <el-tree
          :style="contentStyleObj"
          :data="treedata"
          node-key="scode"
          :props="props"
          :filter-node-method="filterNode"
          :highlight-current="true"
          :expand-on-click-node="false"
          :default-expanded-keys="expandKeys"
          ref="comtree"
          @node-click="handClick"
          @node-drag-start="handleDragStart"
          @node-drag-enter="handleDragEnter"
          @node-drag-leave="handleDragLeave"
          @node-drag-over="handleDragOver"
          @node-drag-end="handleDragEnd"
          @node-drop="handleDrop"
          draggable
          :allow-drop="allowDrop"
          :allow-drag="allowDrag"
        ></el-tree> -->
      </el-col>
      <!--公司表单-->
      <el-col :xs="14" :sm="14" :md="14" :lg="14" :xl="16">
        <el-form
          :rules="rules"
          ref="form"
          :model="form"
          :disabled="forbidden"
          label-width="140px"
          class="comForm"
        >
          <el-form-item label="公司编码" prop="scode">
            <el-input class="elform" v-model="form.scode" placeholder="请填写公司编码" :disabled="scodeDisabled"></el-input>
          </el-form-item>

          <!-- <el-form-item label="公司名称(含编码)" prop="sname" style="display:none">
            <el-input class="elform" v-model="form.sname"></el-input>
          </el-form-item> -->

          <el-form-item label="公司名称" prop="sname">
            <el-input class="elform" v-model="form.sname" placeholder="请填写公司名称"></el-input>
          </el-form-item>

          <!-- <el-form-item label="公司简称" prop="">
            <el-input class="elform" v-model="form.sname" placeholder="请填写公司简称"></el-input>
          </el-form-item> -->

          <el-form-item label="上级公司编码" prop="spcode">
            <el-input class="elform" v-model="form.spcode" disabled></el-input>
          </el-form-item>

          <el-form-item label="EAS账套编码" prop="ssrccode">
            <el-input class="elform" v-model="form.ssrccode" @change="EASChange" placeholder="请填写EAS账套编码">
              <template slot="prepend" v-if="form.ssrccode === '0'">虚拟汇总</template>
              <template slot="prepend" v-else-if="form.ssrccode === '1'">虚拟录入</template>
              <template slot="prepend" v-else>EAS源编码</template>
            </el-input>
            <el-alert
              class="elform"
              type="warning"
              title="填写1代表虚拟录入 0代表虚拟汇总 其余请填写EAS源编码"
              show-icon
              :closable="false"
            ></el-alert>
          </el-form-item>

          <el-form-item label="EAS账套ID" prop="seascomcode">
            <el-input class="elform" v-model="form.seascomcode" placeholder="请填写EAS账套ID">
              <template slot="prepend" >EAS源ID</template>
            </el-input>
          </el-form-item>
          <!-- <el-form-item label="集团合计持股比例" prop="npercent">
            <el-input v-model.number="form.npercent" placeholder="请填写持股比例">
              <template slot="prepend" v-if="form.npercent - 0 === -1">托管</template>
              <template slot="prepend" v-else>持股比例</template>
              <template slot="append" v-if="form.npercent - 0 !== -1">%</template>
            </el-input>
            <el-alert type="warning" title="填写-1代表托管" show-icon :closable="false"></el-alert>
          </el-form-item> -->

          <el-form-item label="内部行业" prop="sindcode">
            <el-select class="elform" v-model="form.sindcode" placeholder="请选择行业">
              <el-option
                v-for=" (item,index) in sindcodes "
                :key="index"
                :label="item.sname"
                :value="item.scode"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="国资委行业" prop="sindcodedetail">
            <el-select class="elform" v-model="form.sindcodedetail" placeholder="请选择行业">
              <el-option
                v-for=" (item,index) in sindcodee "
                :key="index"
                :label="item.sname"
                :value="item.scode"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="公司规模" prop="sindsrange">
            <el-select class="elform" v-model="form.sindsrange" placeholder="请选择规模类型">
              <el-option
                v-for=" (item,index) in sindcoded "
                :key="index"
                :label="item.sname"
                :value="item.scode"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="企业法人" prop="scorporation">
            <el-input class="elform" v-model="form.scorporation" placeholder="输入姓名"></el-input>
          </el-form-item>

          <el-form-item label="联系电话" prop="scorporatetel">
            <el-input class="elform" v-model="form.scorporatetel" placeholder="输入有效的电话"></el-input>
          </el-form-item>

          <el-form-item label="公司地址" prop="saddress">
            <el-input class="elform" v-model="form.saddress" placeholder="最大字符200"></el-input>
          </el-form-item>

          <el-form-item label="是否本部单位" prop="sisbase">
            <el-select class="elform" v-model="form.sisbase">
              <el-option
                v-for=" (item ,index) in property2s "
                :key="index"
                :label="item.text"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="是否重点单位" prop="property1">
            <el-select class="elform" v-model="form.property1">
              <el-option
                v-for=" (item ,index) in property1s "
                :key="index"
                :label="item.text"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="elform2">
            <template v-if="addButten === 1"> 
              <el-button type="primary" @click="add" :disabled="addDisabled">新增</el-button>
            </template>
            <!-- <el-button type="primary" @click="update">修改</el-button> -->
            <template v-if="preserveButten === 1">
              <el-button type="success" @click="save('form')">保存</el-button>
            </template>
            <!-- <el-button type="danger" @click="remove">删除</el-button> -->
            <template v-if="delButten === 1">
              <!-- <template v-if="form.cisdel === 'N'">
                <el-button type="warning" @click="remove('禁用')">禁用</el-button>
              </template>
              <template v-else>
                <el-button type="success" @click="remove('启用')">启用</el-button>
              </template> -->
              <template>
                <el-button type="warning" plain @click="remove('禁用')">禁用</el-button>
              </template>
              <!-- <template>
                <el-button type="success" plain @click="remove('启用')">启用</el-button>
              </template> -->
            </template>
            <!-- <el-button >取消</el-button> -->
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
/*
拖动公司数
 @node-drag-start="handleDragStart"
          @node-drag-enter="handleDragEnter"
          @node-drag-leave="handleDragLeave"
          @node-drag-over="handleDragOver"
          @node-drag-end="handleDragEnd"
          @node-drop="handleDrop"
          draggable
          :allow-drop="allowDrop"
          :allow-drag="allowDrag"
 */
import request from "utils/http";
import tools from "utils/tools";
import axios from "axios";
import Vue from "vue";
export default {
  created() {
    this.findNodes();
    this.findDim();
  },
  data() {
    return {
      contentStyleObj: {
        height: 500,
        overflow: "auto"
      },
      filterText: "",
      // rootNode: "1001",
      props: {
        label: "codename",
        children: "children"
        // cisdel:"cisdel"
      },
      // EAS id 输入框是否禁用
      easDisabled: true ,
      treedata: [],
      //默认展开节点
      expandKeys: [],
      //右对齐
      labelPosition: "right",
      // 行业维度数据
      sindcodes: [],
      // 国资委行业
      sindcodee: [],
      // 公司规模数据
      sindcoded: [],
      sindcodesAll: [],
      property1s: [{ id: "1", text: "是" }, { id: "0", text: "否" }],
      property2s: [{ id: "Y", text: "是" }, { id: "N", text: "否" }],
      wformArr: [
        "scode",            // 公司编码
        "sfullname",        // 公司全称
        "spcode",           // 父级编码
        "sindcode",         // 内部行业
        "property1",        // 重点单位
        "sisbase",          // 是否本部
        "npercent",         // 集团合计持股比例
        "ssrccode",         // EAS公司源编码
        "seascomcode",      // EAS公司id
        "sindcodedetail",   // 国资委行业
        "scorporation",     // 企业法人
        "sindsrange",       // 公司规模
        "scorporatetel",    // 联系电话
        "saddress",         // 公司地址
        "sname"             // 公司简称
      ],
      //表单对象
      form: {
        scode: "",          // 公司编码
        sfullname: "",      // 公司名称
        spcode: "",         // 上级公司编码
        sindcode: "",       // 行业
        property1: "",      // 重点单位
        sisbase: "",        // 是否本部
        npercent: 0,        // 集团合计持股比例
        // cisleaf: "",     // 是否叶子节点
        nlevel: "",         // 级次
        ssrccode: "",       // EAS公司源编码
        seascomcode: "",    // EAS公司id
        cisdel: "",         // 是否删除
        // text: ""
        sindcodedetail:"",  // 国资委行业
        scorporation: "",   // 企业法人
        sindsrange:"",      // 公司规模
        scorporatetel:"",   // 联系电话
        saddress: "",       // 公司地址
        sname: ""           // 公司简称
      },
      //表单验证
      rules: {
        scode: [
          { required: true, message: "必填项" },
          {
            validator: (rule, value, callback) => {
              const reg = /^[0-9]+$/;
              if (!reg.test(value)) {
                callback(new Error("必须为数字"));
              } else {
                if (this.scodeDisabled) {
                  callback();
                } else {
                  //验证是否同名
                  // setTimeout(() => {
                  request({
                    url: "/zjb/sys/dimcompany/validate",
                    method: "get",
                    params: {
                      scode: value
                    }
                  }).then(result => {
                    if (result.status == 200) {
                      if (result.data.code == 200) {
                        callback();
                      } else {
                        callback(new Error("存在相同的编码"));
                      }
                    }
                  });
                }
                // }, 500);
              }
            },
            trigger: "blur"
          },
          {
            min: 1,
            max: 18,
            message: "长度在 1 到 18 个字符"
          }
        ],
        sname: [
          // { required: true, message: "必填项", trigger: "blur" },
          // { min: 1, max: 100, message: "长度在 1 到 100 个字符"}
          {
            validator: (rule, value, callback) => { //debugger
              if(!value){
                callback(new Error("必填项"));
              }else{
                callback();
              }
            },
            required: true,
            trigger: "change"
          }
        ],
        ssrccode: [{ required: true, message: "必填项" }],
        // seascomcode: [{ required: true, message: "必填项" }] ,
        npercent: [
          // { required: true, message: "必填项", trigger: "blur" },
          { type: "number", message: "集团合计持股比例必须为数字" }
        ],
        sindcode: [
          {
            //除虚拟汇总外，为必录项
            validator: (rule, value, callback) => { //debugger
              var ssrccode = this.form.ssrccode;
              if (ssrccode !== "0" && !value) {
                callback(new Error("必填项"));
              } else {
                callback();
              }
            },
            required: true,
            trigger: "change"
          }
        ],
        property1: [{ required: true, message: "必填项" }]
      },

      forbidden: false,
      //动态更新表单存储 添加和更新操作
      activeForm: {},
      //当前的操作 add update remove
      opt: {},
      //scodeDisabled
      scodeDisabled: false,
      //新增按钮是否可操作设置
      addDisabled: true,
      //新增按钮是否显示
      addButten:1,
      //保存按钮是否显示
      preserveButten:1,
      //启用或禁用按钮是否显示
      delButten:1

    };
  },
  watch: {
    //监听公司树筛选
    filterText(val) {
      this.$refs.comtree.filter(val);
    },

    //监听表单变化
    "form.scode": {
      handler(nowVal, oldV) {
        this.watchField("scode", nowVal);
      },
      deep: true
    },
    "form.sname": {
      handler(nowVal, oldV) {
        this.watchField("sname", nowVal);
      },
      deep: true
    },
    "form.spcode": {
      handler(nowVal, oldV) {
        this.watchField("spcode", nowVal);
      },
      deep: true
    },
    "form.sindcode": {
      handler(nowVal, oldV) {
        this.watchField("sindcode", nowVal);
      },
      deep: true
    },
    "form.ssrccode": {
      handler(nowVal, oldV) {
        this.watchField("ssrccode", nowVal);
      },
      deep: true
    },
    "form.property1": {
      handler(nowVal, oldV) {
        this.watchField("property1", nowVal);
      },
      deep: true
    },
    "form.npercent": {
      handler(nowVal, oldV) {
        this.watchField("npercent", nowVal);
      },
      deep: true
    }
  },
  mounted() {
    let database = JSON.parse(localStorage.getItem("database"));
    let menupermisson = database.menupermisson;
    let data = menupermisson.filter( item =>{
          return item.text == "公司管理"
    });
    if(data && data.length > 0){
       this.addButten = data[0].nadd;
       this.preserveButten = data[0].nupdate;
       this.delButten = data[0].ndel;
    }
    this.setTreeHeight();
    // 公司规模数据请求
    // this.getSindsrange();
  },
  methods: {
    /***
     * 
     * 节点自定义操作
     */
    renderContent(h, { node, data, store }){
      var css = node.data.cisdel === 'N' ? 'noDelCss' : 'company_cisdel';
      return (
            <span class={css}>{node.label}</span>
          );
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
    EASChange(value){
      debugger
      if(value == 0 || value == 1 || value == ""){
        this.easDisabled = true ;
      }else {
        this.easDisabled = false ;
      }
    },
    /**
     * @description 监控表单变化
     * @param 监控字段
     * @param nowVal 新值
     */
    watchField(field, nowVal) {
      this.activeForm[field] = nowVal;
    },

    //获取当前公司树选择的节点
    currentNode() {
      return this.$refs.comtree.getCurrentNode();
    },

    //请求维度信息
    findDim() { 
      const _this = this;
      request({
        url: "/zjb/select/query",
        method: "get",
        params: {
          sqlKey:"Dim.companyParamMenus"
        }
      }).then(result => {
        if (result.status == 200) { //debugger
          if(result.data.code === 200){
            // 国资委行业
            _this.sindcodee = result.data.data[0].indsclassify ;
            // 内部行业
            _this.sindcodes = result.data.data[0].industry ;
            // 公司规模
            _this.sindcoded = result.data.data[0].indsrange ;
          }
        }
      });
    },

    /**
     * 刷新公司节点
     * zb
     */
    refreshNodes(){
        this.filterText="";
        this.findNodes();
    },

    //请求节点数据
    findNodes() { //debugger
      const _this = this;
      var getters = _this.$store.getters;
      let username = this.$store.state.user.user.user.username;
      //请求数据
      request({
        url: "/zjb/sys/dimcompany/query_all",
        method: "get"
      }).then(result => { //debugger
        console.log(result);
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
          // debugger
          var data = result.data.data;
          if (Array.isArray(data) && data.length > 0) {
            data = tools.sortByKey(data, "scode");
            //找到根节点。
            // let roots = this.parseRootOfTree(data);
            data = data.filter(function(item) { //debugger
              if (item.scode == "1001") {
                //因为排序后的第一个不是天津食品集团，所以只能根据其编码来添加展开的问题
                item.open = true; //展开此节点
                _this.expandKeys.push(item.scode);
              }
              item.codename = "(" + item.scode + ")" + item.sname; //拼写公司编码+公司名称
              item.label = "(" + item.scode + ")" + item.sname
              return item.cisdel != "Y";
            });
            
            //data[0].open = true;
            // _this.expandKeys.push(data[0].scode);
            _this.treedata = tools.transformToeTreeNodes(setting, data);
          }
        }
      });
    },
    parseRootOfTree (data) {
      let me = this;

    },
    /**
     * @description 处理添加功能
     * 注意问题：当前选中公司的状态，后台处理
     */
    add(formName) { //debugger
      //clear 表单
      this.form.spcode = this.form.scode;   // 父级编码
      this.form.scode = "";         // 公司编码
      this.form.sname = "";         // 公司简称
      this.form.sindcode = "";      // 内部行业
      this.form.property1 = "";     // 重点单位
      this.form.sisbase = "";       // 是否本部
      this.form.npercent = 0;       // 集团合计持股比例
      this.form.ssrccode = "";      // EAS公司源编码
      this.form.seascomcode = "";   // EAS公司id
      this.form.sindcodedetail = "";  // 国资委行业
      this.form.scorporation = "";    // 企业法人
      this.form.sindsrange = "";      // 公司规模
      this.form.scorporatetel = "";   // 联系电话
      this.form.saddress = "";        // 公司地址
      this.form.sfullname = "";       // 公司全称
      this.form.nlevel = this.form.nlevel + 1;  // 层级

      //处理添加
      this.opt = tools.opt[0];
      this.scodeDisabled = false;
      this.addDisabled = true;
    },
    // update(formName) {},
    remove(formName) {
      // debugger
      var _this = this;
      var cur = _this.currentNode();
      if (!cur) {
        _this.$message({
          type: "warning",
          message: "请选择帐套，再做操作"
        });
        return false;
      }
      _this.opt = tools.opt[2];
      _this.$confirm("此操作将"+formName+"该公司, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          request({
            url: "/zjb/sys/dimcompany/remove",
            method: "get",
            params: {
              scodes: _this.form.scode,
              cisdel: _this.form.cisdel
            }
          }).then(result => { //debugger
            if (result.status == 200) {
              this.forbidden = true;

              this.activeForm = {};
              //重新加载
              _this.findNodes();
              this.$message({
                type: "success",
                message: "操作成功"
                // message: result.data.msg
              });
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
    save(formName) { debugger
      var _this = this;
      //console.log("表单变化：", this.activeForm);
      //比对变化
      var cur = _this.currentNode();
      if (!cur) {
        _this.$message({
          type: "warning",
          message: "请选择帐套，再做操作"
        });
        return false;
      }
      let form = _this.form; //右侧form表单中的参数  zb
      var wformArr = _this.wformArr;
      if (_this.opt && _this.opt.url !== "save") {
        wformArr.forEach(ele => {
          let curItem = cur[ele];
          if(ele == "npercent" && !isNaN(curItem)){
            curItem = curItem * 100;
          }
          if (curItem === this.activeForm[ele]) {
            Vue.delete(this.activeForm, ele);
          }
        });
      }
      if (_this.opt && _this.opt.url === "save") {
        _this.opt.url = "add";
      }
      // if (_this.currentNode() && _.isEmpty(this.activeForm)) {
      //   _this.$message({
      //     type: "warning",
      //     message: "未做修改"
      //   });
      //   return;
      // }
      // sjz 无更改不需要保存修改
      if(_this.isEmpty(form, cur)){
        _this.$message({ type: "warning", message: "未做修改" })
        return;
      }   
      //验证
      _this.$refs[formName].validate(valid => { debugger
          if (valid) {
            //保存操作
            var obj = _.cloneDeep(_this.activeForm);
            if (_this.opt && _this.opt.url === "add") {
              obj.spcode = _this.form.spcode ? _this.form.spcode : "-1";
            }
            //修改操作
            else {
              _this.opt = tools.opt[1];
              //自身编码
              obj.scode = _this.form.scode;
            }
            // console.log("参数对象：", obj);
            _this.activeForm = {};
            request({
              url: "/zjb/sys/dimcompany/" + _this.opt.url,
              method: "post",
              data: {
                // projectDimDto:{
                scode: form.scode, //公司编码
                sname: form.sname, //公司名称
                spcode: form.spcode, //上级公司编码
                sindcode: form.sindcode, //内部行业
                property1: form.property1, //重点单位
                sisbase: form.sisbase,    // 是否本部
                // npercent: form.npercent === -1 ? -1 : form.npercent / 100, //集团合计持股比例
                // cisleaf: "", //是否叶子节点
                nlevel: form.nlevel, //级次
                ssrccode: form.ssrccode, //EAS公司源编码
                seascomcode: form.seascomcode,  // EAS公司id
                cisdel: form.cisdel, //是否删除
                // 
                sindcodedetail: form.sindcodedetail,  // 国资委行业
                scorporation: form.scorporation,      // 企业法人
                sindsrange: form.sindsrange,          // 公司规模
                scorporatetel: form.scorporatetel,    // 联系电话
                saddress: form.saddress,              // 公司地址
                sfullname: form.sfullname             // 公司简称
                // }
              }
            }).then(result => { //debugger
              // resolve(response.data);
              this.forbidden = true;
              this.scodeDisabled = false;
              this.addDisabled = true;
              if (result.status == 200) {
                if (result.data.code === 0) {
                  _this.$message.error(result.data.msg);
                } else {
                  _this.$message({
                    type: "success",
                    message: result.data.msg
                  });
                  //重新加载
                  _this.findNodes();
                }
              } else {
                _this.$message.error(result.statusText);
              }
            });

            //   axios.post("/api/api/" + _this.opt.url +"_dim_project?cubeId="+4+"&dim=company",{

            //         "id": form.id,//公司编码
            //         "text": form.text,//公司名称
            //         "pid": form.pid,//上级公司编码
            //         "dataMap":{
            //           "sindcode": form.sindcode, //行业
            //           "property1": form.property1, //重点单位
            //           "npercent": form.npercent, //集团合计持股比例
            //           // cisleaf: "", //是否叶子节点
            //           "nlevel": form.nlevel, //级次
            //           "ssrccode": form.ssrccode, //EAS公司源编码
            //           "cisdel": form.cisdel //是否删除
            //         }

            //   },{
            // headers: {
            //     'Content-Type': 'application/json; charset=UTF-8'
            // }})
            //   .then(result => {
            //     // resolve(response.data);
            //     this.forbidden = true;
            //     this.scodeDisabled = false;
            //     this.addDisabled = true;
            //     if (result.status == 200) {
            //       if (result.data.code === 0) {
            //         _this.$message.error(result.data.msg);
            //       } else {
            //         _this.$message({
            //           type: "success",
            //           message: result.data.data
            //         });
            //         //重新加载
            //         _this.findNodes();
            //       }
            //     } else {
            //       _this.$message.error(result.statusText);
            //     }
            //   });
          } else {
            _this.$message.error("数据未验证通过");
            return false;
          }
        },
        err => {
          reject(err);
        }
      );
    },
    // 是否有更改
    isEmpty(form, cur){
      // debugger
      let isTrue ; 
      for(let key in form){
          if(form[key] == cur[key]) {
              isTrue = true ;
          } else {
              return false ;
          }
      }
      return isTrue ;
    },
    //过滤节点
    filterNode(value, data) { 
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

    /**
     * 节点点击事件
     * @description 点击触发右边表单内容填充
     * @param snode 返回数据data 的对象
     * @param node tree 节点对象
     * @param el 节点组件本身
     *  */
    handClick(snode, node, el) { //debugger
      // console.log(this.form, snode, node);
      //根据动态生成行业的选择条数。
      // this.companyOfInsNumber(snode);
      this.form.sname = snode.sname;        // sfullname;公司全称
      this.form.scode = snode.scode;        // 公司编码
      this.form.spcode = snode.spcode;      // 父级编码
      this.form.nlevel = snode.nlevel;      // 级次
      this.form.sindcode = snode.sindcode;  // 内部行业
      // this.form.cisleaf = snode.cisleaf;
      this.form.ssrccode = snode.ssrccode;  // EAS公司源编码
      this.form.seascomcode = snode.seascomcode;  // EAS公司id
      this.form.cisdel = snode.cisdel;      // 是否删除
      // this.form.npercent = snode.npercent;  // 集团合计持股比例
      this.form.property1 = snode.property1;// 是否重点单位
      this.form.sisbase = snode.sisbase;    // 是否本部
      this.form.sindcodedetail = snode.sindcodedetail;  // 国资委行业
      this.form.scorporation = snode.scorporation;      // 企业法人
      this.form.sindsrange = snode.sindsrange;          // 公司规模
      this.form.scorporatetel = snode.scorporatetel;    // 联系电话
      this.form.saddress = snode.saddress;              // 公司地址
      this.form.sfullname = snode.sfullname;            // 公司简称
      if (this.form.npercent - 0 !== -1) {
        this.form.npercent = this.form.npercent * 100;
      }
      //根节点
      if (this.form.nlevel - 0 === 1) {
        this.form.spcode = 0 ;
      }
      //默认为修改状态
      this.opt = tools.opt[1];
      //表单可编辑状态
      this.forbidden = false;
      this.scodeDisabled = true;
      this.activeForm = {};
      this.addDisabled = false;
    },
    /**
     * 根据公司生成不同的行业条数，差额公司的行业有差额。
     * @author szc 2019年4月12日15:27:27
     */
    companyOfInsNumber (snode) {
      debugger
      let me = this,sign = 'R',sindcodesAll = me.sindcodesAll;
      if(snode && snode.stype == sign){
        me.sindcodes = sindcodesAll;
      }else {
        me.sindcodes = sindcodesAll.filter(item => {
          item.id = item.id + "";
          return item.id != "12";
        });
      }
    },

    /**
     * @description 移动公司节点操作
     */
    dropNode1(draggingNode, dropNode) {
      console.log(draggingNode, dropNode);
      var opt = tools.opt[3];
      var _this = this;
      request({
        url: "/zjb/sys/company/" + opt.url,
        method: opt.method,
        data: {
          //源
          "draggingscode": draggingNode.data.scode,
          "draggingspcode": draggingNode.data.spcode,
          //目标
          "dropscode": dropNode.data.scode,
          "dropspcode": dropNode.data.spcode
          // ,dropisleaf: dropNode.data.cisleaf
        }
      }).then(result => {
        if (result.status == 200) {
          if (result.data.code === 0) {
            _this.$message.error(result.data.msg);
          } else {
            _this.$message({
              type: "success",
              message: result.data.data
            });
            _this.findNodes();
          }
        } else {
          _this.$message.error(result.statusText);
        }
      });
      //重新加载
      
    },

    /**
     * @description 开始移动节点
     */
    handleDragStart(node, ev) {
      // console.log("tree handleDragEnter: ", dropNode.label, dropType);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
    //  if (draggingNode.data.scode !== dropNode.data.scode) {
    //     draggingNode.goon = true;
    //     this.$confirm(
    //       "将目标公司【" +
    //         draggingNode.label +
    //         "】移动到公司【" +
    //         dropNode.label +
    //         "】下, 是否继续?",
    //       "提示",
    //       {
    //         confirmButtonText: "确定",
    //         cancelButtonText: "取消",
    //         type: "warning"
    //       }
    //     )
    //       .then(() => {
    //         //暂时禁用
    //         //this.dropNode(draggingNode, dropNode);
    //       })
    //       .catch(() => {
    //         this.findNodes();
    //       });
    //   }
      //console.log("tree handleDragEnter: ", dropNode.label, dropType);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      //console.log("tree handleDragLeave: ", dropNode.label, dropType);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      // console.log("tree drag over: ", dropNode.label);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      //console.log("tree drag end: ", dropNode && dropNode.label, dropType);
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      if (draggingNode.data.scode !== dropNode.data.scode) {
        draggingNode.goon = true;
        this.$confirm(
          "将目标公司【" +
            draggingNode.label +
            "】移动到公司【" +
            dropNode.label +
            "】下, 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            //暂时禁用
            this.dropNode1(draggingNode, dropNode);
          })
          .catch(() => {
            this.findNodes();
          });
      }
    },
    allowDrop(draggingNode, dropNode, type) {
      return true;
    },
    allowDrag(draggingNode) {
      let node = draggingNode.data;//移动的节点
      //根节点不允许拖拽
      if ( !node.nisleaf || draggingNode.level === 1) {
        return false;
      }
      return true;
    }
  }
};
</script>

<style scoped>
.elform {
  width: 420px;
  height: 40px;
}
.elform2 {
  /* margin-left: 188px; */
  text-align: right;
}
.comForm {
  /* background-color: beige; */
  width: 560px;
}
</style>

<style>
span.company_cisdel {
  color: rgb(255, 0, 0); 
}

</style>
<style scoped>
.companyM {
  margin-top: 10px;
}

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




