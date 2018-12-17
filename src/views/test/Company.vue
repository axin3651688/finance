<template>
  <div class="companyM">
    <el-row :gutter="24">
      <!--公司树-->
      <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="8">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
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
        <el-form :rules="rules" ref="form" :model="form" label-width="140px" class="comForm">
          <el-form-item label="公司编码" prop="scode">
            <el-input v-model="form.scode" disabled></el-input>
          </el-form-item>

          <el-form-item label="公司名称" prop="sname">
            <el-input v-model="form.sname" placeholder="请填写公司名称"></el-input>
          </el-form-item>

          <el-form-item label="上级公司编码" prop="spcode">
            <el-input v-model="form.spcode" disabled></el-input>
          </el-form-item>

          <el-form-item label="EAS账套编码" prop="ssrccode">
            <el-input v-model="form.ssrccode" placeholder="请填写EAS账套编码"></el-input>
            <el-alert
              type="warning"
              title="填写1代表虚拟录入 0代表虚拟汇总 其余请填写EAS源编码"
              show-icon
              :closable="false"
            ></el-alert>
          </el-form-item>

          <el-form-item label="集团合计持股比例" prop="npercent">
            <el-input v-model.number="form.npercent" placeholder="请填写持股比例"></el-input>
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
            <el-button type="primary" @click="add">新增</el-button>
            <el-button type="primary" @click="update">修改</el-button>

            <el-button type="success" @click="save">保存</el-button>

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
      //表单对象
      form: {
        sname: "",
        spcode: "",
        sindcode: "1",
        property1: "",
        npercent: 0,
        cisleaf: "",
        nlevel: "",
        ssrccode: "",
        cisdel: ""
      },
      //表单验证
      rules: {
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
          { required: true, message: "必填项", trigger: "blur" },
          { type: "number", message: "集团合计持股比例必须为数字" }
        ],
        property1: [{ required: true, message: "必填项" }]
      }
    };
  },
  watch: {
    filterText(val) {
      this.$refs.comtree.filter(val);
    }
  },

  methods: {
    //请求维度信息
    findDim() {
      const _this = this;
      request({
        url: "/get/cube/find_dim" + tools.datasourceId + "/INDUSTRY/company",
        method: "get"
      }).then(result => {
        if (result.status == 200) {
          _this.sindcodes = result.data.data;
        }
      });
    },

    //请求节点数据
    findNodes() {
      const _this = this;
      //请求数据
      request({
        url: "/tjsp/company/findAll",
        method: "get"
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
          data = tools.sortByKey(data, "scode");
          _this.expandKeys.push(data[0].scode);
          _this.treedata = tools.transformToeTreeNodes(setting, data);
        }
      });
    },

    add(formName) {},
    update(formName) {},
    remove(formName) {},
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
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
      console.log(this.form, snode, node);
      // debugger;
      this.form.sname = snode.sname;
      this.form.scode = snode.scode;
      this.form.spcode = snode.spcode;
      this.form.nlevel = snode.nlevel;
      this.form.sindcode = snode.sindcode;
      this.form.cisleaf = snode.cisleaf;
      this.form.ssrccode = snode.ssrccode;
      this.form.cisdel = snode.cisdel;
      this.form.npercent = snode.npercent;
      this.form.property1 = snode.property1;
    },

    handleDragStart(node, ev) {
      console.log("drag start", node);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log("tree drag enter: ", dropNode.label);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log("tree drag leave: ", dropNode.label);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log("tree drag over: ", dropNode.label);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log("tree drag end: ", dropNode && dropNode.label, dropType);
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log("tree drop: ", dropNode.label, dropType);
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === "二级 3-1") {
        return type !== "inner";
      } else {
        return true;
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf("三级 3-2-2") === -1;
    }
  }
};
</script>
<style scoped>
.companyM {
  margin-top: 10px;
}
</style>




