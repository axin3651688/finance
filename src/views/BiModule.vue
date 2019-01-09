<template >
  <div v-if="flag ">
    <bi-item
      v-if="layout.xtype === 'form'"
      v-for="(item,index) in items"
      v-bind:key="item.id"
      v-bind:index="index"
      :item="item"
      :config.sync="config"
      :datas.sync="datas"
      v-on:getDatas="generateApiModelDatas"
      ref="mychild"
    ></bi-item>
    <el-row :gutter="24" v-if="layout.xtype === 'column'">
      <el-col
        v-for="(item,index) in items"
        v-bind:key="item.id"
        v-bind:index="index"
        :lg="item.weight"
        :sm="item.weight*2"
        :xs="item.weight*4"
        :style="{'padding-top':item.class_top ? item.class:'24px'}"
      >
        <bi-item
          :item.sync="item"
          :config.sync="config"
          :datas.sync="datas"
          v-on:getDatas="generateApiModelDatas"
          ref="mychild"
        ></bi-item>
      </el-col>
    </el-row>
    <div
      v-if="layout.xtype === 'border'"
      v-for="(item,index) in items"
      v-bind:key="item.id"
      v-bind:index="index"
    >
      <h2>{{layout.xtype}}</h2>
    </div>
    <el-tabs v-if="layout.xtype === 'tab'" v-model="activeTabName" @tab-remove="removeTab">
      <!--start @tab-click="handleTabClick"  -->
      <el-tab-pane
        v-for="(item,index) in items"
        v-bind:key="item.id"
        v-bind:index="index"
        :label="item.text"
        :v-if="item.show"
        :name="item.tabIndex || index"
        :closable="item.closable||false"
      >
        <el-row
          v-if="item.layout && item.layout.xtype === 'column'"
          :gutter="24"
          :style="{'padding-right':item.class_pr ? item.class:'24px'}"
        >
          <el-col
            v-for="(item1,index1) in item.children"
            v-bind:key="item1.id"
            v-bind:index="index1"
            :lg="item1.weight"
            :sm="item1.weight*2"
            :xs="item1.weight*4"
          >
            <bi-item
              :item.sync="item1"
              :config.sync="config"
              :datas.sync="datas"
              v-on:getDatas="generateApiModelDatas"
              ref="mychild"
            ></bi-item>
          </el-col>
        </el-row>
        <bi-item
          v-else
          :item.sync="item"
          :config.sync="config"
          :datas.sync="datas"
          v-on:getDatas="generateApiModelDatas"
          ref="mychild"
        />
      </el-tab-pane>
      <!--end-->
    </el-tabs>
    <el-collapse v-if="layout.xtype === 'accordion'" v-model="activeName" accordion>
      <el-collapse-item
        v-for="(item,index) in items"
        v-bind:key="item.id"
        v-bind:index="index"
        :title="item.text"
        :name="index"
      >
        <bi-item
          :item.sync="item"
          :config.sync="config"
          :datas.sync="datas"
          v-on:getDatas="generateApiModelDatas"
          ref="mychild"
        ></bi-item>
      </el-collapse-item>
    </el-collapse>
    <div
      v-if="layout.xtype === 'absolute'"
      v-for="(item,index) in items"
      v-bind:key="item.id"
      v-bind:index="index"
    >
      <bi-item
        :item.sync="item"
        :config.sync="config"
        :datas.sync="datas"
        v-on:getDatas="generateApiModelDatas"
        ref="mychild"
      ></bi-item>
    </div>
  </div>
</template>
<script>
import BiItem from "@c/BiItem";
import { mapGetters, mapActions } from "vuex";
import { findThirdPartData, findDesignSource } from "~api/interface";
import { getClientParams } from "../utils/index";
import { generatePeriod } from "../utils/period";
import { rowsOfChildrenContent, closeTabTaget } from "../utils/math";

export default {
  name: "BiModule",
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
      datas: [],
      flag: false,
      config: {},
      activeTabName: "0",
      api: null,
      source_id: 0,
      scope: 0,
      token: "",
      layout: {
        xtype: "form"
      },
      items: [
        { xtype: "bi-text", id: "text", text: "文字测试" },
        { xtype: "bi-table", id: "lrb", text: "表格测试" },
        { xtype: "bi-chart", id: "text", text: "图形测试" }
      ],
      chartOptions: {},
      debug: 0
    };
  },
  //1.从路由获取参数mid,路由没有就从localstory获取,再从地址栏获取
  created() {
    debugger;
    let bean = getClientParams();
    this.setScopeDatas(bean);
    this.loadModule();
  },

  mounted() {
     debugger;
    // this.GetSideMid({ company: 138, year: 2014, month: 2 });
  },
  computed: {
    ...mapGetters(["year", "month", "company", "module_api", "conversion"])
  },
  watch: {
    module_api(newid) {
      this.changeMonduleBefore(newid);
      this.activeTabName = "0";
      this.flag = false; //神奇的操作，由龚佳新推导出来，没有这一行，this.datas不能及时清理的问题，真的太坑！
      this.loadModuleAfter(localStorage.module);
    },

    year(newyear) {
      this.changeYearBefore(newyear, this);
      this.updateView("year");
    },

    month(newmonth) {
      this.changeMonthBefore(newmonth, this);
      this.updateView("month");
      console.log("改变", newmonth);
    },
    company(newId) {
      this.changeCompanyBefore(newId, this);
      console.log("改变", newId);
      this.updateView("company");
    },
    // //循环当前组件的孩子，动态给datas调用切换单位的方法即可
    conversion(unit, older) {
      let $cc = this.$refs.mychild,
        tempDatas = this.datas;
      if (tempDatas.length > 0) {
        this.datas = Math.convertUnit(
          unit.id,
          tempDatas,
          this.config.columns || this.columns,
          older.id
        );
      }
      if ($cc) {
        let ii = 0;
        $cc.forEach(children => {
          let cItem = children.item;
          if (cItem) {
            if (!children.hasConfig) {
              children.$set(children.item, "datas", this.datas);
              children.setItems(children.item, true);
            } else {
              let cc = cItem.datas;
              if (cc.length > 0) {
                cc = Math.convertUnit(
                  unit.id,
                  cc,
                  cItem.config.columns,
                  older.id
                );
                children.$set(children.item, "datas", cc);
                children.setItems(children.item, true);
              }
            }

            ii++;
          }
        });
      }
    }
  },

  methods: {
    ...mapActions(["GetSideMid", "ShowDims"]),
    /**
     * 更新模块之前调用的方法
     */
    changeMonduleBefore() {},
    /**
     * 更新年之前调用的方法
     */
    changeYearBefore() {},
    /**
     * 更新月之前调用的方法
     */
    changeMonthBefore() {},

    /**
     * 更新公司之前调用的方法
     */
    changeCompanyBefore() {},
    /**
     * 设置item是否隐藏或显示
     */
    showSet(items) {
      // let flag = true;
      items.forEach(item => {
        let funName = item.showFun;
        if (typeof funName == "function") {
          item.show = item.showFun(this.$store);
        } else {
          item.show = true;
        }
        let cc = item.children;
        if (cc && cc.length > 0) {
          this.showSet(cc);
        }
        // if (item.show == true && flag) {
        //   item.tabIndex = "0";
        //   flag = false;
        // }
      });
    },
    /**
     * 动态设置参数至本组件
     */
    setScopeDatas(bean, type) {
      //
      if (type == 1 && !bean.id) {
        //bean = bean.replace(/[\r\n]/g, "");去除空格换行的
        //如果是缓存或是字符串的情况
        bean = eval("(" + bean + ")");
      }
      if (bean.items) {
        this.showSet(bean.items);
      }
      for (let key in bean) {
        this.$set(this, key, bean[key]);
      }
      if (type == 1) {
        //设置页面标题
        document.title = bean.text;
      }
      /**
       * showDims控制顶部导航栏的显示及隐藏
       *
       */
      if (bean.hasOwnProperty("showDims")) {
        // debugger;
        this.ShowDims(bean.showDims);
      } else {
        this.ShowDims({
          company: true,
          year: true,
          month: true,
          day: false,
          conversion: false
        });
      }
      return this;
    },
    /**
     * 加载模块资源前置逻辑处理
     * fromClick  来自点击
     */
    loadModule() {
      this.debug = 1; //临时的动作
      if (this.module_api) {
        this.api = this.module_api;
      }
      //临时测试用
      if (this.source_id) {
        this.api = this.source_id;
      }
      //如果是测试环境，直接从远程加载，避免手动清理缓存的痛苦 debug=1
      if (this.debug) {
        this.loadRemoteSource(this.api);
        return;
      }
      //如果是非测试环境
      let cache = localStorage.module;
      if (!Cnbi.isEmpty(cache)) {
        this.loadModuleAfter(cache);
        return;
      }
      this.loadRemoteSource(this.api);
    },

    /**
     * 加载加载模块资源
     */
    loadRemoteSource(api) {
      this.activeTabName = "0";
      // api = "cnbi/json/source/ts.json";
      if (!api) {
        api = localStorage.module_api_cache;
        console.warn(
          "从localStorage.module_api_cache获取了模块加载地址：" + api
        );
      }
      if (!api) {
        let msg = "未能获取需要加载的模块，请检查！";
        console.error(msg);
        this.$notify.error({
          title: "错误",
          message: msg
        });
        return;
      }

      findDesignSource(api).then(res => {
        //
        let source = res.data; //默认认为是从文件服务器加载进来的
        let dbData = source.data;
        if (dbData && dbData.source) {
          //说明是从数据库来的
          source = dbData.source;
        }
        this.loadModuleAfter(source);
      });
    },
    /**
     * 纠正错误的配制项目,
     * 强制配制到config里就不存在这种情况了
     */
    correctWrongConfig() {
      this.config.rows = this.config.rows || this.rows;
      this.config.columns = this.config.columns || this.columns;
      this.config.type = this.config.type || 2;
    },
    /**
     * 加载模块之后的处理
     */
    loadModuleAfter(source) {
      this.setScopeDatas(source, 1);
      this.correctWrongConfig();
      if (this.config && this.config.columns.length > 0) {
        this.generateApiModelDatas(this, null, "company");
      } else {
        //解决当父亲没有配制config的情况
        this.flag = true;
      }
      // else {
      //   this.datas = this.datas;
      //   //  item.config = this.config;
      // }
    },
    /**
     * 获取模块的参数
     *  */

    getModuleParams(item, changeDim) {
      let config = item.config,
        needDims = config.needDims;
      if (!needDims) {
        return;
      }
      let ns = needDims.filter(dim => dim === changeDim);
      if (!ns || ns.length == 0) {
        console.info(item.text + "不依赖【" + changeDim + "】维度!");
        return;
      }
      if (!needDims || needDims.length < 1) {
        throw new Error("未定义正确的needDims=['company','year','month']参数");
        return;
      }
      let params = this.$store.state.prame.command;
      let datas = {};
      needDims.forEach(element => {
        let val = params[element];
        //
        if (!val && element === "company") {
          val = params[element + "Id"];
        }
        if (element != "conversion") {
          datas[element] = val;
        }
      });
      if (datas.year && datas.month) {
        // let date = new Date();
        // datas.year =  date.getFullYear();
        // datas.month =  date.getMonth()-1;
        datas.month =
          datas.month - 0 < 10 ? "0" + datas.month : "" + datas.month;
        datas.period = datas.year + "" + datas.month;
      }
      //孙子成，请在此处加一个periodCount,compareType=[0&-1,-1&-0]的解析
      //目标：在datas.comparePeriod= 调用period.js的一个方法
      // debugger
      let vars = config.generateVar;
      if (vars && vars.periodCount && vars.compareType) {
        let reverse = vars.reverse || false;
        let year = datas.year,
          month = datas.month;
        year = { id: year, text: "年" };
        month = { id: month, text: "月" };
        let periodArr = generatePeriod(
          vars.periodCount,
          vars.compareType,
          year,
          month,
          reverse
        );
        let index = 0;
        if (reverse) {
          index = periodArr.length - 2;
        }
        datas.comparePeriod = periodArr[index].id;
        if (vars.varName) {
          item.config[vars.varName] = periodArr;
        }
        //datas.period = periodArr.map(p=>p.id).join(",");
      }
      return datas;
    },
    /**
     * 更新vuex属性过来更新组件数据的
     */
    updateView(changeDim) {//updateView(null)
      console.log(this.config);
      if (this.config) {
        this.generateApiModelDatas(this, null, changeDim);
      }
      let me = this;
      //this.$forceUpdate();//并不管用
      let $cc = this.$refs.mychild;
      if ($cc) {
        let $cc = this.$refs.mychild;
        $cc.forEach(children => {
          let ii = children.item;
          if (ii && ii.config && children.hasConfig) {
            let cc = ii.config;
            me.generateApiModelDatas(ii, children, changeDim);
          }
        });
      }
    },
    /**
     * 取数总接口
     * item vue组件对象
     * $childVue   vue子组件对象
     */
    generateApiModelDatas(item, $childVue, changeDim) {
      debugger;
      try {
        let params = this.getModuleParams(item, changeDim);
        if (!params) return;
        let config = item.config;
        Cnbi.paramsHandler(config, params);
        // debugger
        //在此加了查询数据之前的拦截处理
        if (item.queryDataBefore && typeof item.queryDataBefore == "function") {
          params = item.queryDataBefore(params, config, this);
        }
        config.type = config.type || 1;
        if (config.sql) {
          params.sql = config.sql;
          this.setDatas(item, params, $childVue);
        } else if (config.cube) {
          this.setDatas(item, params, $childVue);
        } else if (config.defined) {
          return config.datas;
        } else if (config.random) {
          this.queryDataAfter(item, Math.createRandomDatas(config), $childVue);
        }
      } catch (error) {
        console.log(item);
        console.error(error);
      }
    },
    /**
     * 设置组件数据
     */
    setChlidComponent(datas) {
      let $cc = this.$refs.mychild;
      if ($cc) {
        let ii = 0;
        $cc.forEach(children => {
          if (children.item) {
            // console.info(children.item + "---setChlidComponent---");
            let cc = children.item.config;
            console.log(cc);
            if (cc && children.hasConfig) {
            } else {
              //  console.info(ii + "--" + children.item.id + "--" + children.item.text);
              children.$set(children.item, "datas", datas);
              children.setItems(children.item, true);
            }
            ii++;
          }
        });
      }
    },
    /**
     * 获取数据后的操作处理
     */
    queryDataAfter(item, datas, $childVue) {
      debugger;
      let params = this.$store.state.prame.command;
      let unit = params.conversion;
      if (unit && unit.id > 1 && datas && datas.length > 0) {
        datas = Math.convertUnit(unit.id, datas, item.config.columns);
      }
      /**
       * 在此处加了最外层的查询成功的拦截 szc 2018-12-26 11:49:17
       */
      if (item.__queryDataAfter && typeof item.__queryDataAfter == "function") {
        //
        datas = item.__queryDataAfter(datas);
      }
      //
      //在此加了查询数据之后的拦截处理
      else if (
        item.queryDataAfter &&
        typeof item.queryDataAfter == "function" &&
        !item.correctWrongConfig
      ) {
        //
        datas = item.queryDataAfter(datas);
      }
      //
      item.datas = datas;
      if (!$childVue) {
        this.$set(this, "datas", datas);
        this.$set(this, "flag", true);
        this.setChlidComponent(datas);
      } else {
        $childVue.setItems(item, true);
      }
      //  this.units(datas)
    },
    __queryDataAfter(datas) {
      return datas;
    },
    /**
     * 设置模型数据
     */
    setDatas(item, params, $childVue) {
      // debugger
      findThirdPartData(params)
        .then(res => {
          this.queryDataAfter(item, res.data.data, $childVue);
        })
        .catch(res => {
          console.info(res);
        });
    },
    handleTabClick(tab, event) {
      console.log(tab, event);
    },
    getActiveTabName(item) {
      return item.id;
    },
    removeTab(targetName) {
      let tabs = this.items;
      let tabName = this.activeTabName;
      if (tabName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.text === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              tabName = nextTab.text;
            }
          }
        });
      }
      this.activeTabName = tabName;
      this.items = tabs.filter(tab => tab.text !== targetName);
      if (this.items.length == 1) {
        this.activeTabName = "0";
      }
    },
    /**
     * @author szc 2018年12月28日 書於经邦软件公司
     * 切换公司、日期、关闭打开的tab页的操作。
     */
    closeTabTaget(params, $vue) {
      let me = this;
      let tabs = $vue.items;
      let tabName = $vue.activeTabName;
      $vue.items = tabs.filter(tab => !tab.from);
      if ($vue.items && $vue.items.length > 1) {
        $vue.activeTabName = $vue.items[0].text;
      } else {
        $vue.activeTabName = "0";
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.majun_right {
  // 指标分析右边距离
  padding-right: 24px;
}
.majun_top {
  // 风险分析顶部距离
  padding-top: 24px;
}
</style>


