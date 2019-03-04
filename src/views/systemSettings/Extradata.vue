<template>
  <div class="extradata">
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
          :default-expanded-keys="expandKeys"
          :show-checkbox="true"
          ref="comtree"
          @node-click="handleClick"
          @node-contextmenu="handleContextMenu"
        ></el-tree>
      </el-col>
      <!--抽取操作-->
      <el-col :xs="14" :sm="14" :md="14" :lg="14" :xl="16">
        <el-alert
          title="温馨提示"
          description="非单户公司不能选择，暂不支持不能跨年选择"
          type="warning"
          show-icon
          :closable="false"
        ></el-alert>
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="120px"
          style="margin-top:5px;"
        >
          <el-form-item label="开始期间" prop="startperiod">
            <el-date-picker
              v-model="form.startperiod"
              type="month"
              placeholder="🔛"
              value-format="yyyyMM"
              :editable="false"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="结束期间" prop="endperiod">
            <el-date-picker
              v-model="form.endperiod"
              type="month"
              placeholder="🔚"
              value-format="yyyyMM"
              :editable="false"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="性质" prop="nature">
            <el-checkbox-group v-model="form.nature">
              <el-checkbox label="EAS" name="nature" border>EAS</el-checkbox>
              <el-checkbox label="YS" name="nature" border>预算</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="是否覆盖数据" prop="vartype" v-model="form.vartype">
            <el-radio-group v-model="form.vartype">
              <el-radio border label="Y">是</el-radio>
              <el-radio border label="N">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="extraing('form')">抽取数据</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <!-- 帐套数右键菜单 -->
    <div v-show="contextMenuVisible" id="rMenu">
      <ul id="contextmenu">
        <li tabindex="-1" class="menu_item" @click="checkAll">全选反选</li>
        <li tabindex="-1" class="menu_item" @click="checkCurAll">当前节点下所有节点</li>
        <!-- <li tabindex="-1" class="menu_item" @click="checkCurCased">当前节点下一级节点</li> -->
        <!-- <li tabindex="-1" class="menu_item" @click="checkCurSame">当前节点同级节点</li> -->
      </ul>
    </div>
  </div>
</template>
<script>
import request from "utils/http";
import tools from "utils/tools";
import axios from "axios";
import moment from "moment";
let nowDate = moment().format("YYYY-MM");
export default {
  created() {
    this.findNodes();
  },
  data() {
    return {
      filterText: "",
      expandKeys: [],
      props: {
        label: "text",
        children: "children"
      },
      treedata: [],
      contextMenuVisible: false,
      //右键 选中的节点
      contextMenuActive: null,
      ischeckAll: false,
      iscurAll: false,
      // iscurCased:false,
      // iscurSame: false,
      rules: {
        startperiod: [
          { required: true, message: "必选项" },
          {
            validator: (rule, value, callback) => {
              this.$refs["form"].clearValidate();
              var endperiod = this.form.endperiod.replace(/-/g, "");
              var value = value.replace(/-/g, "").substring(0, 6);
              if (endperiod < value) {
                callback(new Error("开始时间不能大于结束时间"));
              }
              if (endperiod.substring(0, 4) !== value.substring(0, 4)) {
                callback(new Error("不能跨年选择"));
              }
              return callback();
            }
          }
        ],
        endperiod: [
          { required: true, message: "必选项" },
          {
            validator: (rule, value, callback) => {
              this.$refs["form"].clearValidate();
              var startperiod = this.form.startperiod.replace(/-/g, "");
              var value = value.replace(/-/g, "").substring(0, 6);
              if (startperiod > value) {
                callback(new Error("结束时间不能小于开始时间"));
              }
              if (startperiod.substring(0, 4) !== value.substring(0, 4)) {
                callback(new Error("不能跨年选择"));
              }
              return callback();
            }
          }
        ],
        nature: [{ required: true, message: "必选项" }],
        vartype: [{ required: true, message: "必选项" }]
      },
      form: {
        startperiod: nowDate,
        endperiod: nowDate,
        //是否覆盖数据 Y是覆盖  N 不覆盖
        vartype: "Y",
        nature: ["EAS"]
      }
    };
  },

  methods: {
    extraing(formName) {
      let _this = this;
      //获取选中公司
      let comtree = _this.$refs.comtree;
      let coms = comtree.getCheckedKeys();
      if (_.isArray(coms) && coms.length > 0) {
        //验证
        _this.$refs[formName].validate(valid => {
          if (valid) {
            // console.log(coms, _this.form);
            //处理参数数据
            let text =
              _this.form.vartype === "Y"
                ? "勾选了覆盖数据"
                : "修改的数据将保留";
            _this
              .$confirm(text + ", 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              })
              .then(() => {
                axios({
                  url: "tjsp/extradata/import",
                  method: "post",
                  data: {
                    varnature: _.join(_this.form.nature, ","),
                    varcompany: "'" + _.join(coms, "','") + "'",
                    varyear: _this.form.startperiod.substring(0, 4),
                    orgmonth:
                      _.replace(_this.form.startperiod, /-/g, "").substring(
                        4,
                        6
                      ) - 0,
                    endmonth:
                      _.replace(_this.form.endperiod, /-/g, "").substring(
                        4,
                        6
                      ) - 0
                  },
                  headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/json; charset=UTF-8"
                  }
                }).then(result => {
                  if (result.status == 200) {
                    if (result.data.data) {
                      this.$message({
                        type: "success",
                        message: "loading"
                      });
                    }
                  }
                });
              })
              .catch(e => {
                console.error(e);
                _this.$message({
                  type: "info",
                  message: "已取消操作"
                });
              });
          } else {
            _this.$message.error("数据未验证通过");
            return false;
          }
        });
      } else {
        _this.$message.error("还未选择帐套");
        return false;
      }
    },

    /**
     * @description 右键菜单列表事件
     */
    checkOpt(event, optName) {
      event.stopPropagation();
      let contextMenuActive = this.contextMenuActive;
      if (!contextMenuActive) {
        return false;
      }
      let comtree = this.$refs.comtree;
      let treedata = this.treedata;
      if (_.isArray(treedata)) {
        let root = treedata[0];
        let rootNode = comtree.getNode(root.scode);
        if (optName === "all") {
          this.ischeckAll = !this.ischeckAll;
          comtree.setChecked(rootNode, this.ischeckAll, true);
        } else if (optName === "curAll") {
          this.iscurAll = !this.iscurAll;
          comtree.setChecked(contextMenuActive, this.iscurAll, true);
        }
        this.contextMenuVisible = false;
      }
      // console.log(comtree);
    },

    /**
     * @description 右键菜单列表事件 全选
     */
    checkAll(event) {
      this.checkOpt(event, "all");
    },
    checkCurAll(event) {
      this.checkOpt(event, "curAll");
    },
    // checkCurCased(event) {
    //   this.checkOpt(event, "curCased");
    // },
    // checkCurSame(event) {
    //   this.checkOpt(event, "curSame");
    // },

    /**
     * @description 节点点击事件
     */
    handleClick(node, nodeTarget, el) {
      if (node.ctype !== "1") {
        return false;
      }
      this.$refs.comtree.setChecked(node, !nodeTarget.checked, true);
    },

    /**
     *@description  右键菜单
     */
    handleContextMenu(event, node, nodeTarget, el) {
      // 此处阻止冒泡是因为节点层级过深, 必须阻止
      event.stopPropagation();
      if (node.ctype === "1") {
        return false;
      }

      this.contextMenuVisible = true;
      //
      var x = event.clientX + document.body.scrollLeft;
      var y = event.clientY + document.body.scrollTop;

      let leftmenu = document.querySelector(".leftmenu");
      let contextmenu = document.querySelector("#rMenu");
      contextmenu.style.top = y + "px";
      contextmenu.style.left = x - leftmenu.offsetWidth + "px";
      this.contextMenuActive = nodeTarget;
      //其它地方绑定事件隐藏 右键菜单
      // document.onmousedown = _event => {
      //   var _event = _event || window.event;
      //   if (!(event.target.id == "rMenu")) {
      //     setTimeout(() => {
      //       this.contextMenuVisible = false;
      //     }, 1000);
      //   }
      // };
    },

    //获取当前公司树选择的节点
    currentNode() {
      return this.$refs.comtree.getCurrentNode();
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
            data.forEach(element => {
              if (element.ctype !== "1") {
                element.disabled = true;
              }
            });
            _this.treedata = tools.transformToeTreeNodes(setting, data);
          }
        }
      });
    },

    //过滤节点
    filterNode(value, data) {
      if (!value) return true;
      return data.text.indexOf(value) !== -1;
    }
  }
};
</script>
<style scoped>
.extradata {
  margin-top: 10px;
}
#rMenu {
  position: absolute;
  top: 0;
  text-align: left;
  padding: 2px;
}
#rMenu ul {
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
}
#rMenu ul li {
  cursor: pointer;
  position: relative;
  display: block;
  padding: 0.75rem 1.25rem;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
}
</style>


      