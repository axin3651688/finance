<template >
    <div >
        <bi-item v-if="layout.xtype == 'form'"  :item = "items" ></bi-item> 
        <el-row  v-if="layout.xtype === 'column'">
            <el-col >
                <bi-item :item = "items"  :config = "config" ></bi-item>                      
            </el-col>
        </el-row>
        <div v-if="layout.xtype === 'border'"  >
            <h2>{{layout.xtype}}</h2>
        </div>
        <el-tabs v-if="layout.xtype === 'tab'">
            <el-tab-pane   :label="item.text" :name="item.id">
                <bi-item :item = "items" ></bi-item>         
            </el-tab-pane>
        </el-tabs>
        <el-collapse v-if="layout.xtype === 'accordion'" v-model="activeName" accordion>
            <el-collapse-item  :title="item.text" :name="index">
                <bi-item :item = "items" ></bi-item>         
            </el-collapse-item>
       </el-collapse>
        <div v-if="layout.xtype === 'absolute'"  >
             <bi-item :item = "items" ></bi-item>         
        </div>

    </div>
</template>
<script>
import BiItem from "../components/item2";
//import {createRandomDatas} from "../../utils/math" v-model="activeName" @tab-click="handleClick"
export default {
  components: {
    BiItem
  },
  data() {
    return {
      id: 0,
      text: "",
      rows: [],
      columns: [],
      dataUrl: "",
      datas: {},
      flag: false,
      config: {
        random: {}
      },
      layout: {
        xtype: ""
      },
      items: [
        // {xtype: "bi-text",id:"text",text:"利润表模型测试"},
        { xtype: "bi-table", id: "lrb", text: "利润表" },
        { xtype: "bi-chart", id: "text", text: "图形模型测试" }
        //  , {xtype: "bi-table",id:"zcfzb",text:"资产负债表"}
      ]
    };
  },

  created() {
    debugger;
    let array = window.location.search.split("?"),
      module = "jsnk/zbfx";
    if (array.length == 2) {
      module = array[1];
      module = module.replace("-", "/");
    }
    let api = "cnbi/json/source/" + module + ".json";
    // this.axios.get(api).then(response => {
    this.axios.get("/apis/test").then(response => {
      let bean = response.data;
      if (!bean.id) {
        bean = eval("(" + bean + ")");
      }
      for (let key in bean) {
        this.$set(this, key, bean[key]);
      }
      if (!bean.datas) {
        console.warn(bean.text + "沿未初始数据！去加载数据吧！");
      }
      document.title = bean.text;

      console.log(this.items);
      debugger;
      this.loadItem(this);
    });
  },
  methods: {
    loadItem() {
      let config = this.config;
      debugger;
      if (config) {
        config.rows = config.rows || this.rows;
        config.columns = config.columns || this.columns;
        config.type = config.type || 2;
        this.config = config;
        console.log(this.config);
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>


