<template>
  <div class="companyM">
    <el-row :gutter="24">
      <!--公司树-->
      <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="8">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText">
          <el-button slot="append" icon="el-icon-refresh" @click="findNodes()"></el-button>
        </el-input>
        <el-tree
          :data="treedata"
          node-key="scode"
          :props="props"
          class="filter-tree"
          :filter-node-method="filterNode"
          :highlight-current="true"
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
        ></el-tree>
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
            <el-input v-model="form.scode" :disabled="scodeDisabled"></el-input>
          </el-form-item>

          <el-form-item label="公司名称(含编码)" prop="text" style="display:none">
            <el-input v-model="form.text"></el-input>
          </el-form-item>

          <el-form-item label="公司名称" prop="sname">
            <el-input v-model="form.sname" placeholder="请填写公司名称"></el-input>
          </el-form-item>

          <el-form-item label="上级公司编码" prop="spcode">
            <el-input v-model="form.spcode" disabled></el-input>
          </el-form-item>

          <el-form-item label="EAS账套编码" prop="ssrccode">
            <el-input v-model="form.ssrccode" placeholder="请填写EAS账套编码">
              <template slot="prepend" v-if="form.ssrccode === '0'">虚拟汇总</template>
              <template slot="prepend" v-else-if="form.ssrccode === '1'">虚拟录入</template>
              <template slot="prepend" v-else>EAS源编码</template>
            </el-input>
            <el-alert
              type="warning"
              title="填写1代表虚拟录入 0代表虚拟汇总 其余请填写EAS源编码"
              show-icon
              :closable="false"
            ></el-alert>
          </el-form-item>

          <el-form-item label="集团合计持股比例" prop="npercent">
            <el-input v-model.number="form.npercent" placeholder="请填写持股比例">
              <template slot="prepend" v-if="form.npercent - 0 === -1">托管</template>
              <template slot="prepend" v-else>持股比例</template>
              <template slot="append" v-if="form.npercent - 0 !== -1">%</template>
            </el-input>
            <el-alert type="warning" title="填写-1代表托管" show-icon :closable="false"></el-alert>
          </el-form-item>

          <el-form-item label="行业" prop="sindcode">
            <el-select v-model="form.sindcode" placeholder="请选择行业">
              <el-option
                v-for=" item in sindcodes "
                :key="item.id"
                :label="item.text"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="是否重点单位" prop="property1">
            <el-select v-model="form.property1">
              <el-option
                v-for=" item in property1s "
                :key="item.id"
                :label="item.text"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="add" :disabled="addDisabled">新增</el-button>
            <!-- <el-button type="primary" @click="update">修改</el-button> -->
            <el-button type="success" @click="save('form')">保存</el-button>

            <el-button type="danger" @click="remove">删除</el-button>
            <!-- <el-button >取消</el-button> -->
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import request from "utils/http";
import tools from "utils/tools";
import Vue from "vue";
export default {
  created() {
    this.findNodes();
    this.findDim();
  },
  data() {
    return {
      filterText: "",
      // rootNode: "1001",
      props: {
        label: "text",
        children: "children"
      },
      treedata: [],
      //默认展开节点
      expandKeys: [],
      //右对齐
      labelPosition: "right",
      //行业维度数据
      sindcodes: [],
      property1s: [{ id: "1", text: "是" }, { id: "0", text: "否" }],
      wformArr: [
        "scode",
        "sname",
        "sindcode",
        "property1",
        "npercent",
        "ssrccode"
      ],
      //表单对象
      form: {
        scode: "", //公司编码
        sname: "", //公司名称
        spcode: "", //上级公司编码
        sindcode: "", //行业
        property1: "", //重点单位
        npercent: 0, //集团合计持股比例
        // cisleaf: "", //是否叶子节点
        nlevel: "", //级次
        ssrccode: "", //EAS公司源编码
        cisdel: "", //是否删除
        text: ""
      },
      //表单验证
      rules: {
        scode: [
          { required: true, message: "必填项" },
          {
            validator: (rule, value, callback) => {
              const reg = /[0-9]+/;
              if (!reg.test(value)) {
                callback(new Error("必须为数字"));
              } else {
                if (this.scodeDisabled) {
                  callback();
                } else {
                  //验证是否同名
                  // setTimeout(() => {
                  request({
                    url: "/tjsp/company/find",
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
          { required: true, message: "必填项", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符"
            // trigger: "blur"
          }
        ],
        ssrccode: [{ required: true, message: "必填项" }],
        npercent: [
          // { required: true, message: "必填项", trigger: "blur" },
          { type: "number", message: "集团合计持股比例必须为数字" }
        ],
        sindcode: [
          {
            //除虚拟汇总外，为必录项
            validator: (rule, value, callback) => {
              var ssrccode = this.form.ssrccode;
              if (ssrccode !== "0" && !value) {
                callback(new Error("必填项"));
              } else {
                callback();
              }
            },
            trigger: "change"
          }
        ],
        property1: [{ required: true, message: "必填项" }]
      },

      forbidden: true,
      //动态更新表单存储 添加和更新操作
      activeForm: {},
      //当前的操作 add update remove
      opt: {},
      //scodeDisabled
      scodeDisabled: true,
      //addDisabled
      addDisabled: false
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

  methods: {
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
        url: "/get/cube/find_dim" + tools.datasourceId + "/INDUSTRY/company",
        method: "get"
      }).then(result => {
        if (result.status == 200) {
          //  处理维度id 既有Integer 又有 String
          // 过滤抵消差额
          _this.sindcodes = _.filter(result.data.data, function(element) {
            element.id = element.id + "";
            return element.id != "12";
          });
        }
      });
    },

    //请求节点数据
    findNodes() {
      const _this = this;
      var getters = _this.$store.getters;
      //请求数据
      request({
        url: "/tjsp/company/findAll",
        method: "get",
        params: {
          scode: "1001" //getters.companyId ? getters.companyId :
        }
      }).then(result => {
        if (result.status == 200 && result.data.code == 200) {
          //封装树对象数据
          const setting = {
            data: {
              simpleData: {
                idKey: "scode",
                pIdKey: "spcode"
              },
              key: {
                children: "children"
              }
            }
          };
          var data = result.data.data;
          if (Array.isArray(data) && data.length > 0) {
            data = tools.sortByKey(data, "scode");
            _this.expandKeys.push(data[0].scode);
            _this.treedata = tools.transformToeTreeNodes(setting, data);
          }
        }
      });
    },

    /**
     * @description 处理添加功能
     * 注意问题：当前选中公司的状态，后台处理
     */
    add(formName) {
      //clear 表单
      this.form.scode = "";
      this.form.sname = "";
      this.form.sindcode = "";
      this.form.property1 = "";
      this.form.npercent = 0;
      this.form.ssrccode = "";
      //处理添加
      this.opt = tools.opt[0];
      this.scodeDisabled = false;
      this.addDisabled = true;
    },
    // update(formName) {},
    remove(formName) {
      var _this = this;
      var cur = _this.currentNode();
      _this.opt = tools.opt[2];
      _this
        .$confirm("此操作将永久删除该公司, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          request({
            url: "tjsp/company/" + _this.opt.url,
            method: "get",
            params: {
              scode: cur.scode
            }
          }).then(result => {
            if (result.status == 200) {
              if (result.data.data) {
                //重新加载
                _this.findNodes();
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
    save(formName) {
      var _this = this;
      //console.log("表单变化：", this.activeForm);
      //比对变化
      var cur = _this.currentNode();
      var wformArr = _this.wformArr;

      if (_this.opt && _this.opt.url !== "save") {
        wformArr.forEach(ele => {
          if (cur[ele] === this.activeForm[ele]) {
            Vue.delete(this.activeForm, ele);
          }
        });
      }
      if (_this.currentNode() && _.isEmpty(this.activeForm)) {
        _this.$message({
          type: "warning",
          message: "未做修改"
        });
        return;
      }

      //验证
      _this.$refs[formName].validate(valid => {
        if (valid) {
          //保存操作
          var obj = _.cloneDeep(_this.activeForm);
          if (_this.opt && _this.opt.url === "save") {
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
          // return;
          request({
            url: "/tjsp/company/" + _this.opt.url,
            method: _this.opt.method,
            data: obj
          }).then(result => {
            this.forbidden = true;
            this.scodeDisabled = false;
            this.addDisabled = true;
            if (result.status == 200) {
              if (result.data.code === 0) {
                _this.$message.error(result.data.msg);
              } else {
                _this.$message({
                  type: "success",
                  message: result.data.data
                });
                //重新加载
                _this.findNodes();
              }
            } else {
              _this.$message.error(result.statusText);
            }
          });
        } else {
          _this.$message.error("数据未验证通过");
          return false;
        }
      });
    },

    //过滤节点
    filterNode(value, data) {
      if (!value) return true;
      return data.text.indexOf(value) !== -1;
    },

    /**
     * 节点点击事件
     * @description 点击触发右边表单内容填充
     * @param snode 返回数据data 的对象
     * @param node tree 节点对象
     * @param el 节点组件本身
     *  */
    handClick(snode, node, el) {
      // console.log(this.form, snode, node);
      // debugger;
      this.form.sname = snode.sname;
      this.form.text = snode.text;
      this.form.scode = snode.scode;
      this.form.spcode = snode.spcode;
      this.form.nlevel = snode.nlevel;
      this.form.sindcode = snode.sindcode;
      // this.form.cisleaf = snode.cisleaf;
      this.form.ssrccode = snode.ssrccode;
      this.form.cisdel = snode.cisdel;
      this.form.npercent = snode.npercent;
      this.form.property1 = snode.property1;
      if (this.form.npercent - 0 !== -1) {
        this.form.npercent = this.form.npercent;
      }
      //根节点
      if (this.form.nlevel - 0 === 1) {
        this.form.spcode = snode.scode;
      }
      //默认为修改状态
      this.opt = tools.opt[1];
      //表单可编辑状态
      // this.forbidden = false;
      this.scodeDisabled = true;
      this.activeForm = {};
      this.addDisabled = false;
    },

    /**
     * @description 移动公司节点操作
     */
    dropNode(draggingNode, dropNode) {
      console.log(draggingNode, dropNode);
      var opt = tools.opt[3];
      var _this = this;
      request({
        url: "/tjsp/company/" + opt.url,
        method: opt.method,
        data: {
          //源
          draggingscode: draggingNode.data.scode,
          draggingspcode: draggingNode.data.spcode,
          //目标
          dropscode: dropNode.data.scode,
          dropspcode: dropNode.data.spcode
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
          }
        } else {
          _this.$message.error(result.statusText);
        }
      });
      //重新加载
      _this.findNodes();
    },

    /**
     * @description 开始移动节点
     */
    handleDragStart(node, ev) {
      // console.log("tree handleDragEnter: ", dropNode.label, dropType);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
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
            //this.dropNode(draggingNode, dropNode);
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
      //根节点不允许拖拽
      if (draggingNode.level === 1) {
        return false;
      }
      return true;
    }
  }
};
</script>
<style scoped>
.companyM {
  margin-top: 10px;
}
</style>




