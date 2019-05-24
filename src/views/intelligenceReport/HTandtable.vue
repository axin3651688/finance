<template>
<div>
  <SBiDiv v-if="divShow" :dataDiv="divContent"></SBiDiv>
  <div v-else-if="fillShow" class="shuju">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <!-- 手工填报页面 -->
      <el-tab-pane label="手工填报" name="second">
        <div class="manually_report">
          <div class="dropdown">匹配报表:</div>
          <el-dropdown trigger="click" v-if="list.length">
            <el-button type="text" class="underline">
              <span class="pleaseoptions">{{reportHeader}}</span>
              <i class="el-icon-arrow-down el-icon_right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item,index) of list"
                @click.native="matching(list,index,item)"
                :key="index"
              >{{item.title}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div class="left">
            <el-button @click="saveData" class="button">保存</el-button>
            <el-button @click="rowData" class="button" v-show="showAddButton">新增</el-button>
          </div>
          <div class="right">
            <template v-for="(item,index) in buttonsOperation">
              <el-button v-if="item.disabled" disabled class="button" :key="index" @click="buttonsHandle(item)">
                {{ item.text }}
              </el-button>
              <el-button  v-else class="button" :key="index" @click="buttonsHandle(item)">
                {{ item.text }}
              </el-button>
            </template>
          </div>
        </div>
        <!-- 上报的人员modal -->
        <SRModal v-if="true" v-on:sendfillmessage="sendFillMessageHandle" :modalConfig.sync="modalConfig"></SRModal>
        <FillModal :modalConfig.sync="fillModalConfig"></FillModal>
        <!-- <hot-table  v-if="newSettings" :settings="newSettings" ref="hotTableComponent" :height=" heights" class="table"></hot-table> -->
        <hot-table
          v-if="settings.data && settings.data.length>0"
          :settings="settings"
          ref="hotTableComponent"
          :height=" heights"
          class="table"
        ></hot-table>
        </el-tab-pane>
      <!-- 模板的下载与导入 -->
      <el-tab-pane label="Excel导入" name="first">
        <el-button size="small" type="primary" @click="templateDownload" class="template">模板下载</el-button>
        <el-dialog title="模板操作" :visible.sync="isShow" width="30%">
          <!-- <span>这是一段信息</span> -->
          <!-- <el-checkbox-group v-model="checked"> -->
          <el-checkbox
            v-for="item of list"
            :key="item.id"
            class="checkbox"
            @change="select($event, item)"
          >{{item.title}}</el-checkbox>
          <!-- </el-checkbox-group> -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="Download">确 定</el-button>
          </span>
        </el-dialog>
        <el-upload
          class="upload-demo upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
        >
          <el-button size="small" type="primary">文件选择</el-button>
          <div slot="tip" class="el-upload__tip"></div>
        </el-upload>
        <div class="dropdown">匹配报表:</div>
        <el-dropdown trigger="click" v-if="list.length" class="options">
          <el-button type="text" class="underline">
            <span class="pleaseoptions">{{importHeader}}</span>
            <i class="el-icon-arrow-down el-icon_right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item,index) of list"
              @click.native="importDropdownMenu(list,index)"
              :key="index"
            >{{item.title}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="文件名称:" class="button">
            <el-input v-model="excelname" class="input" :disabled="edit"></el-input>
          </el-form-item>
        </el-form>
        <el-button class="button" @click="uploadFiles">导入</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</div>
</template>
<script>
import { mapGetters } from "vuex";
import { HotTable } from "@handsontable/vue";
import Handsontable from "handsontable-pro";
import SBiDiv from "@c/SBiDiv";
import SRModal from "@v/intelligenceReport/SRModal";
import FillModal from "@v/intelligenceReport/szcModal/FillModal";
import {
    importExcel,
    inquire,
    save,
    download,
    del,
    financingDown,
    mechanism,
    queryUserByCompany,
    sendFillMessage,
    saveReport,
    queryStateOfTable
} from "@/api/fill.js";
import EventMixins from "./mixins/szcFillBtnOpe";
// import BiModule from "@v/BiModule.vue";
export default {
  mixins: [EventMixins],
  components: {
    HotTable,
    SBiDiv,
    SRModal,
    FillModal
    // BiModule
  },
  data() {
    return {
      fillModalConfig: {},//审阅的弹出框。
      buttonsOperation:[],//包含上报、审阅等操作按钮。
      //上报人员的modal框的显示。
      modalConfig:{},
      //控制显示区域块
      divShow:false,
      fillShow:true,
      divContent:{},
      selectedOptions: [],
      financingOptions: [],
      dialogVisible: false,
      showAddButton: false,//新增按钮的显示与否
      values: null, //填报的数据
      datas: null, //存储查询要传递的数据
      columns: [], //存储请求返回回来的列
      dataDict: [], //应收下拉的数据
      financing: [], //融资下拉的其他数据
      mechanismdown: [], //融资下拉的机构名称数据
      cubeId: null, //天津食品的id
      title: null, //下载模板的名称
      tableData: [],
      rowdata: false, //新增行按钮的默认显示状态
      fixed: null, //是不是三张主表
      templateId: null, //模板的id
      years: null, //年月的拼接
      row: [],
      // options:"这是导入页面给的填报模板",
      files: null, //excel导入需要传递的参数
      reportHeader: "请选择", //填报匹配的名称
      importHeader: "请选择", //导入匹配的名称
      heights: document.body.offsetHeight - 360,
      subject: null, //匹配模板的subject
      dropdownid: null, //匹配的id
      checked: false, //复选框的状态
      activeName2: "second", //tab默认显示
      isShow: false, //下载模板弹框的显示和隐藏
      excelname: "加载文件名称 不可编辑",
      // imgfd:null,
      uploadfile: null, //存储下拉匹配文件下载要传递的参数
      edit: true, //不可编辑
      list: [], //存储的下拉匹配模板的数据
      form: {
        region: ""
      },
      newrow: false, //新增按钮的隐藏
      table: [],
      // del: Function,
      delid: null,
      index: "", //  数据的索引
      // show: false,
      // flag: false,
      root: "test-hot",
      // newSettings: null,
      settings: {
        data: [], //数据，可以是数据，对象
        startCols: 6,
        hiddenColumns: [],
        minCols: 5,
        maxCols: 20,
        rowHeaders: true, //行表头
        colHeaders: true, //表头数据
        nestedHeaders: [],//多表头
        autoWrapRow: true, //自动换行
        fillHandle: false, //选中拖拽复制  true, false
        fixedColumnsLeft: 0, //固定左边列数
        fixedRowsTop: 0, //固定上边列数
        mergeCells: [], //合并
        columns: [],
        manualColumnFreeze: true, //手动固定列
        manualColumnMove: true, //手动移动列
        manualRowMove: true, //手动移动行
        manualColumnResize: true, //手工更改列距
        manualRowResize: true, //手动更改行距
        comments: true, //添加注释
        stretchH: "none", //根据宽度横向扩展，last:只扩展最后一列，none：默认不扩展
        afterChange: Function,
        cells: Function
        // ,beforeValidate: Function
        // ,
        // beforeOnCellMouseDown: Function,
        // afterOnCellMouseDown: Function,
        // afterRenderer: Function,
        // ,afterSelection: Function
        // ,afterValidate: Function
        // ,afterRenderer: Function
        // ,afterRender: Function
        // afterBeginEditing: Function,
        // afterCellMetaReset: Function
        // ,
        // getCellEditor: Function//获取编辑器
        // ,
        // beforeChange: Function
        
        // ,
        // afterGetCellMeta: Function,
        // setDataAtCell: Function
        // ,
        // getDataAtRow: Function
      }
    };
  },
  watch: {
    templateId(val) {
      
      this.tableData = [];
    },
    year(val) {
      //清楚以前的数据。
      if (this.activeName2 == "second") {
        this.clearDataOfBefore();
        this.tableData = [];
        let period = this.datas.period;
        let year = period.substring(0, 4);
        let newyear = period.replace(year, val);
        this.datas.period = newyear;
        console.log(this.datas);
        this.reportData(this.datas);
      }
    },
    month(val) {
      //清楚以前的数据。
      if (this.activeName2 == "second") {
        this.clearDataOfBefore();
        this.tableData = [];
        let period = this.datas.period;
        let date;
        if (this.month < 10) {
          date = this.year + "0" + val;
        } else {
          date = this.year + val;
        }
        this.datas.period = date;
        // console.log("ss",this.datas)
        this.reportData(this.datas);
      }
    },
    company(val,oldVal) {
      
      //判断不是合并公司才给填报
      // let flag = this.rightOfLeafCompany();
      // if(!flag){
      //   return;
      // }
      //切换公司之后可能有些选项没有但是页面还展示出来了，所以处理掉。
      let flag = this.contentOfCompany();
      //公司的显示选项的控制。
      this.listOld && this.listOld.length > 0? this.list = this.parseResultOfCompany(this.listOld):"";
      this.divShow = false;
      this.fillShow = true;
      //清楚以前的数据。
      this.clearDataOfBefore();
      if (this.activeName2 == "second") {
        this.tableData = [];
        let company = this.datas? this.datas.company:oldVal;
        let newcompany = company.replace(company, val);
        this.datas? this.datas.company = newcompany:"";
        // console.log(this.datas);
        !flag || this.reportData(this.datas);
      }
      //上报、审阅按钮切换公司展示 or 隐藏。
      this.contentOfButtons(flag);
    }
  },
  created() {
    this.financing = [
      {
        id: "20",
        text: "担保方式"
      },
      {
        id: "2001",
        text: "抵押",
        pid: "20"
      },
      {
        id: "2002",
        text: "质押",
        pid: "20"
      },
      {
        id: "2003",
        text: "保证",
        pid: "20"
      },
      {
        id: "2004",
        text: "留置",
        pid: "20"
      },
      {
        id: "2005",
        text: "定金",
        pid: "20"
      },
      {
        id: "21",
        text: "还款来源"
      },
      {
        id: "2101",
        text: "自有资金",
        pid: "21"
      },
      {
        id: "2102",
        text: "集团借款",
        pid: "21"
      },
      {
        id: "2103",
        text: "借新还旧",
        pid: "21"
      },
      {
        id: "1700",
        text: "是否金融机构"
      },
      {
        id: "1",
        text: "是",
        pid: "1700"
      },
      {
        id: "0",
        text: "否",
        pid: "1700"
      },
      {
        id: "1800",
        text: "是否集团担保"
      },
      {
        id: "1",
        text: "是",
        pid: "1800"
      },
      {
        id: "0",
        text: "否",
        pid: "1800"
      }
    ];
    //
    this.dataDict = [
      {
        id: "1400",
        text: "客商性质"
      },
      {
        id: "1001",
        text: "国有",
        pid: "1400"
      },
      {
        id: "1002",
        text: "民营",
        pid: "1400"
      },
      {
        id: "1003",
        text: "个体",
        pid: "1400"
      },
      {
        id: "1004",
        text: "外资",
        pid: "1400"
      },
      {
        id: "1005",
        text: "合资",
        pid: "1400"
      },
      {
        id: "1006",
        text: "集体",
        pid: "1400"
      },
      {
        id: "1007",
        text: "个人",
        pid: "1400"
      },
      {
        id: "1500",
        text: "非正常分类"
      },
      {
        id: "1106",
        text: "核算不规范",
        pid: "1500"
      },
      {
        id: "1107",
        text: "其他",
        pid: "1500"
      },
      {
        id: "1101",
        text: "向系统外出借资金",
        pid: "1500"
      },
      {
        id: "1102",
        text: "成本费用挂账",
        pid: "1500"
      },
      {
        id: "1104",
        text: "为其他企业代偿金融机构的贷款",
        pid: "1500"
      },
      {
        id: "1105",
        text: "长期挂账、未及时清理",
        pid: "1500"
      },
      {
        id: "1103",
        text: "通过融资性贸易、赊销业务、虚假贸易等虚增应收",
        pid: "1500"
      },
      {
        id: "1600",
        text: "债务人状况"
      },
      {
        id: "1201",
        text: "债务人经营困难",
        pid: "1600"
      },
      {
        id: "1202",
        text: "债务人改制或退出",
        pid: "1600"
      },
      {
        id: "1203",
        text: "债务人停业",
        pid: "1600"
      },
      {
        id: "1204",
        text: "债务人失踪",
        pid: "1600"
      },
      {
        id: "1205",
        text: "超过诉讼时效",
        pid: "1600"
      },
      {
        id: "1700",
        text: "是否内部"
      },
      {
        id: "1",
        text: "是",
        pid: "1700"
      },
      {
        id: "0",
        text: "否",
        pid: "1700"
      },
      {
        id: "1800",
        text: "是否正常"
      },
      {
        id: "1",
        text: "是",
        pid: "1800"
      },
      {
        id: "0",
        text: "否",
        pid: "1800"
      }
    ];
    this.axios.get("/cnbi/json/source/tjsp/template.json").then(res => {
      
      // this.list = res.data.data;
      this.listOld = res.data.data;
      this.list = this.parseResultOfCompany(res.data.data);
      // console.log(res)
      this.cubeId = res.data.config.cube.cubeId;
    });
    //隐藏单位，默认是元。
    this.hideConverseOfYuan();
    //操作按钮显示的内容。
    this.contentOfButtons();
  },
  mounted() {
    let data = 10;
    //融资情况明细表除机构名称下拉数据
    financingDown(data).then(res => {
      this.financingOptions = res.data.data;
      // console.log("下拉", this.financingOptions);
    });
    window.addEventListener("resize", this.resizeTable);
    this.settings.afterChange = this.afterChange;
    this.settings.beforeValidate = this.beforeValidate;
    // this.settings.beforeOnCellMouseDown = this.beforeOnCellMouseDown;
    // this.settings.afterOnCellMouseDown = this.afterOnCellMouseDown;
    // this.settings.afterRenderer = this.afterRenderer;
    // this.settings.afterSelection = this.afterSelection;
    // this.settings.afterValidate = this.afterValidate;
    // this.settings.afterRenderer = this.afterRenderer;
    // this.settings.afterRender = this.afterRender;
    // this.settings.afterBeginEditing = this.afterOnCellCornerDblClick;
    // this.settings.afterCellMetaReset = this.beforeAutofill;
    //融资情况明细表的下拉数据 机构名称
    mechanism().then(res => {
      this.mechanismdown = res.data.data;
    });
    //合并公司没有填报的权限
    // let flag = this.rightOfLeafCompany();
    // if(flag){
    //   this.divShow = false;
    //   this.fillShow = true;
    // }
    this.contentOfButtons();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeTable);
  },
  computed: {
    ...mapGetters(["user", "year", "month", "company","showDims"])
  },
  methods: {
    /**
     * 上报、审阅的按钮的操作。
     * @author szc 2019年4月29日15:54:06
     * 1:上报,2:申请退回,3:审阅,4:退回,0:催报,5:撤回
     */
    buttonsHandle (item) {
      // return;
      let me = this;
      if(item){
        if(item.id == '1'){
          this.currentItem = item;
          this.reportHandle();
          // this.reportHandler(item);
        }else if(item.id == '2'){
          // this.applicationForRefundStation();
          this.applicationForRefund(item);
        }else if(item.id == '3') {
          this.reviewHandler(item);
        }else if(item.id == '4') {
          this.returnHandler(item);
        }else if(item.id == '0') {
          this.urgeToReport(item);
        }else if(item.id == '5') {
          this.revoke(item);
        }
      }
    },
    /**
     * 申请退回的选择人的操作。
     * @author szc 2019年5月5日15:22:07
     */
    applicationForRefundStation () {
      let me = this;
      this.modalConfig = {
        title:"申请退回人员",
        eventListener:"sendfillmessage",//事件监听方法名
        dialogVisible:true,
        checkbox:true,
        type:"tree",
        id:'userReportRT',
        title: "申请退回人员",
        datas: [],
        props:{
          label: "label",
          children: "children"
        }
      };
      this.modalConfig.datas = this.queryUserByCompany();
    },
    /**
     * 操作按钮显示的内容。
     * @author szc 2019年4月29日14:14:09
     */
    contentOfButtons (flag) {
      let me = this,buttons = [],isleaf = this.$store.getters.treeInfo.nisleaf,tableState = me.tableState,
          spcode = this.$store.getters.treeInfo.spcode;
      if((!this.templateId || (typeof(flag) != "undefined" && !flag)) && isleaf != 0){
        me.buttonsOperation = [];
        return
      }
      // //集团年度目标考核值。
      // let arrTems = ['10'];
      // if(arrTems.indexOf(this.templateId) != -1){
      //   me.buttonsOperation = [];
      //   return;
      // }
      this.axios.get("/cnbi/json/source/tjsp/szcJson/fillButtons.json").then(res => {
        buttons = res.data;
        if(isleaf == 1){
          let arr1 = ['2','1','5'];
          buttons = buttons.filter(item => {
            return arr1.indexOf(item.id) != -1;
          });
          me.buttonsOperation = buttons;
        }else {
          let arr0 = ['2','1','5','0','4'];
          if(me.reportHeader != "请选择" && spcode != "0"){
            arr0 = ['0','4'];
          }
          buttons = buttons.filter(item => {
            return arr0.indexOf(item.id) == -1;
          });
          me.buttonsOperation = buttons;
        }
      });
    },
    /**
     * 切换公司之后，去掉不该显示的选项。
     * @author szc 2019年4月26日13:40:45
     */
    contentOfCompany () {
      debugger;
      let me = this;
      let listSelects = this.list,flag = false;
      let currentSelects = this.parseResultOfCompany(this.listOld);
      //当前的情况是只存在个数为 1、2、11的情况，所以目前可以用 length来判断。
      if(listSelects && listSelects.length > 0 && currentSelects && currentSelects.length > 0){
        let arrSel = [];
        currentSelects.forEach(item => {
          arrSel.push(item.templateId);
        });
        if(listSelects.length == currentSelects.length && this.templateId && arrSel.indexOf(this.templateId) != -1){
          flag = true;
          return flag;
        }else {
          me.reportHeader = "请选择";
          this.settings.data = [];
        }
      }
      return flag;
    },
    /**
     * 通过公司来转换下拉选中应该有的结果。
     * @author szc 2019年4月26日11:24:14
     */
    parseResultOfCompany (data) {
      let me = this,nisleaf = this.$store.getters.treeInfo.nisleaf,spcode = this.$store.getters.treeInfo.spcode;
      console.log("公司：---------------------------",this.$store);
      if(data && data.length == 0){
        return;
      }
      if(nisleaf == 0){
        if(spcode == 0){
          let arr = ['10','12']
          data = data.filter(item => {
            return arr.indexOf(item.templateId) != -1;
          });
        }else {
          let arr = ['10']
          data = data.filter(item => {
            return arr.indexOf(item.templateId) != -1;
          });
        }
      }else {
        let arr = ['10','12'];
        data = data.filter(item => {
          return arr.indexOf(item.templateId) == -1;
        });
      }
      return data;
    },
    // afterRender (aa,cc,dd,ee,ff,gg,hh) {
    //   debugger;
    //   let me = this,row = 8,column = me.selectCoulmn;
    //   let cellTD = me.$refs.hotTableComponent.hotInstance.getCell(8,0);
    //   // if(aa){
    //     cellTD.className = cellTD.className? cellTD.className + " " + "htInvalid":"htInvalid";
    //     cellTD.innerText = "垃圾";
    //   // }
    // },
    afterRenderer (aa,cc,dd,ee,ff,gg,hh) {
      if(cc < 8){
        return
      }
      let me = this,row = dd,column = me.selectCoulmn;
      let cellTD = me.$refs.hotTableComponent.hotInstance.getCell(row,column);
      // if(aa){
        cellTD.className = cellTD.className? cellTD.className + " " + "htInvalid":"htInvalid";
        cellTD.innerText = "垃圾";
      // }
    },
    beforeValidate (aa,cc,dd,ee,ff,gg,hh) {
      // debugger;
    },
    afterValidate (aa,cc,dd,ee,ff,gg,hh) {
      let me = this,row = dd,column = me.selectCoulmn;
      let cellTD = me.$refs.hotTableComponent.hotInstance.getCell(row,column);
      // if(aa){
        cellTD.className = cellTD.className? cellTD.className + " " + "htInvalid":"htInvalid";
        cellTD.innerText = "垃圾";
      // }
    },
    beforeAutofill (aa,cc,dd,ee,ff,gg,hh) {},
    afterOnCellCornerDblClick (aa,cc,dd,ee,ff,gg,hh) {
      let me = this;
    },
    afterSelection (aa,cc,dd,ee,ff,gg,hh) {
      let me = this;
      if(aa == dd && cc == ee){
        me.selectCoulmn = cc;
      }else {
        me.selectCoulmn = cc;
      }
    },
    // afterRenderer (aa,cc,dd,ee,ff,gg,hh) {
    //   // debugger;
    //   let me = this;
    // },
    /**
     * 鼠标按下单元格之前的处理。
     * @author szc 2019年4月22日11:35:10
     */
    beforeOnCellMouseDown (aa,cc,dd,ee,ff,gg) {
      let me = this;
    },
    afterOnCellMouseDown (aa,cc,dd,ee,ff,gg) {
      let me = this;
    },
    /**
     * 隐藏元单位的切换，默认是元。
     * @author szc 2019年4月9日14:54:50
     */
    hideConverseOfYuan () {
      let me = this;
      let showDims = this.showDims;
      if(showDims){
        showDims.company = true,
        showDims.year = true,
        showDims.month = true,
        showDims.conversion = false;
      }
    },
    /**
     * 上报的处理按钮。
     * @author szc 2019年4月2日16:29:19
     */
    reportHandle () {
      // return;
      let me = this;
      //判断如果没有保存，提示他去保存。
      if(me.tableData && me.tableData.length > 0){
        me.$message({
          message:"请先保存填写的数据，再上报！",
          type:"warning"
        });
        return;
      }
      //判断有没有选择上报的表。
      // if(!me.templateId){
      //   this.$message({
      //     message: '请选择要上报的报表！',
      //     type: 'warning'
      //   });
      //   return;
      // }
      this.modalConfig = {
        title:"上报人员",
        eventListener:"sendfillmessage",//事件监听方法名
        dialogVisible:true,
        checkbox:true,
        type:"tree",
        id:'userReport',
        title: "上报人员",
        datas: [
          {
            id: 1,
            label: '一级 1'
          }, {
            id: 2,
            label: '一级 2',
            children: [{
              id: 5,
              label: '二级 2-1'
            }, {
              id: 6,
              label: '二级 2-2'
            }]
          }, {
            id: 3,
            label: '一级 3',
            children: [{
              id: 7,
              label: '二级 3-1'
            }, {
              id: 8,
              label: '二级 3-2'
            }]
          }
        ],
        footConfig:{
          footBtn:true
        },
        props:{
          label: "label",
          children: "children"
        }
      }
      this.modalConfig.datas = this.queryUserByCompany();
    },
    /**
     * 查询上报的目标人员。
     * @author szc 2019年4月2日16:10:51
     */
    queryUserByCompany(){
      
      let me = this,companyId = this.$store.getters.treeInfo.spcode,userData = [];
      let params = {company:companyId};
      queryUserByCompany(params).then(res => {
        if(res.data.code == 200){
          //转换成对应的格式。
          userData = me.parseTypeOfTree(res.data.data);
          me.modalConfig.datas = userData;
          // return userData;
        }else {
          this.$message.error(res.data.data);
        }
      });
      // return userData;
    },
    parseTypeOfTree (data) {
      
      let me = this;
      data.forEach(item => {
        if(item){
          item.label = item.susername;
        }
      });
      return data;
    },
    /**
     * 选择上报人员之后的点击确定之后的流程。
     * @author szc 2019年4月2日16:52:43
     */
    sendFillMessageHandle (nodes) {
      let me = this,userStr = "",arr = [];
      let itemSel = this.currentItem;
      if(nodes && nodes.length == 0){
        me.$message({
          message:"人员不能为空！",
          type:"warning"
        });
        return;
      }
      if(itemSel){
        if(itemSel.id == '1'){
          nodes.forEach(item => {
            arr.push(item.suser);
          });
          userStr = arr.join(',');
          this.reportHandler(userStr);
          this.modalConfig.dialogVisible = false;
        }else if(itemSel.id == '2'){
          nodes.forEach(item => {
            arr.push(item.suser);
          });
          userStr = arr.join(',');
          this.applicationForRefund(userStr);
          this.modalConfig.dialogVisible = false;
        }else if(itemSel.id == '3') {
          this.reviewHandler(itemSel);
        }else if(itemSel.id == '4') {
          this.returnHandler(itemSel);
        }else if(itemSel.id == '0') {
          this.urgeToReport(itemSel);
        }
      }
      // userStr = nodes.join(',');
      
      // let me = this,paramsArr = [],company = this.$store.getters.company,suser = this.$store.getters.user.user.userName,
      //     period = this.years,tableid = this.templateId;
      // if(!nodes || (nodes && nodes.length == 0)){
      //   return;
      // }
      // for(let i = 0;i <nodes.length;i ++){
      //   let item = nodes[i];
      //   let param = {company:company,fromuser:suser,period:period,tableid:tableid,touser:item.suser};
      //   paramsArr.push(param);
      // }
      // if(paramsArr && paramsArr.length > 0){
      //   sendFillMessage(paramsArr).then(res => {
      //     if(res.code == 200){
      //       this.$message({
      //         message:"上报成功！",
      //         type:"success"
      //       });
      //     }else{
      //       this.$message({
      //         message:"上报失败！",
      //         type:"error"
      //       });
      //     }
      //   });
      // }
    },
    rightOfLeafCompany() {
      let me = this,companyId = this.$store.getters.company,treeInfo = this.$store.getters.treeInfo,
          userCompany = this.$store.getters.userCompany;
      let flag = true,html = "<p>此公司无填报权限，请切换至单体公司！</p>";
      //第一次登陆的时候有事treeInfo可能会是id
      if(companyId == treeInfo.scode || companyId == treeInfo.id){
        if(treeInfo.nisleaf == 0){
          this.divShow = true;
          this.fillShow = false;
          this.divContent = {htmlContent:html};
          flag = false;
          return flag;
        }
      }else if((companyId == userCompany.customerId || companyId == userCompany.id) && userCompany.nisleaf == 0){
        this.divShow = true;
        this.fillShow = false;
        this.divContent = {htmlContent:html};
        flag = false;
        return flag;
      }else{
        this.divShow = false;
        this.fillShow = true;
      }
      return flag;
    },
    //根据是否金融机构判断机构名称是下拉数据还是直接填写
    mechanismdownData(row, columns) {
      let source = [];
      this.mechanismdown.forEach(item => {
        source.push(item.text);
      });
      let record = this.settings.data[row];
      if (record.cismenu === "否" || record.cismenu == 0) {
        return;
      }
      return source;
    },
    resizeTable() {
      this.heights = document.body.offsetHeight - 360;
    },
    //融资页面的下拉数据  除机构名称
    financingOptionsData(id) {
      let array = this.financing.filter(item => item.pid === id);
      let source = [];
      array.forEach(element => {
        source.push(element.text);
      });
      return source;
    },
    //应收账款分析表  表格里面下拉的数据
    getDropDownSource(id) {
      let array = this.dataDict.filter(item => item.pid === id);
      let source = [];
      array.forEach(element => {
        source.push(element.text);
      });
      return source;
    },
    changeAddOrReduce(changes) {
      // 
      let me = this,
        rowIndex,
        arr = ["sstartdate", "srepaydate"],
        name,
        rowData;
      if (changes && changes.length > 0) {
        rowIndex = changes[0][0];
        name = changes[0][1];
        if (arr.indexOf(name) != -1) {
          
          rowData = this.$refs.hotTableComponent.hotInstance.getDataAtRow(
            rowIndex
          );
          if (rowData && rowData.length > 0) {
            this.handleStateOfPeriod(rowData, rowIndex);
          }
        }
      }
    },
    handleStateOfPeriod(rowData, rowIndex) {
      // 
      let me = this,
        startIndex = 4,
        repaymentIndex = 10,
        month = this.$store.getters.month,
        year = this.$store.getters.year;
      let startPeriod = rowData[startIndex],
        repaymentPeriod = rowData[repaymentIndex];
      let arrStart,
        arrRepayment,
        stateStr = "";
      if (startPeriod) {
        arrStart = startPeriod.split("/");
      }
      if (repaymentPeriod) {
        arrRepayment = repaymentPeriod.split("/");
      }
      //两个日期都存在
      if (arrStart && arrRepayment) {
        if (
          arrStart[0] == year &&
          arrStart[1] - 0 == month &&
          arrRepayment[1] - 0 != month
        ) {
          stateStr = "新增";
        } else if (
          arrStart[1] - 0 != month &&
          arrRepayment[0] == year &&
          arrRepayment[1] - 0 == month
        ) {
          stateStr = "减少";
        } else {
          stateStr = "";
        }
      } else if (
        arrStart &&
        arrStart[0] == year &&
        !arrRepayment &&
        arrStart[1] - 0 == month
      ) {
        stateStr = "新增";
      } else if (
        arrRepayment &&
        arrRepayment[0] == year &&
        arrRepayment[1] - 0 == month &&
        !arrStart
      ) {
        stateStr = "减少";
      } else {
        stateStr = "";
      }
      this.$refs.hotTableComponent.hotInstance.setDataAtCell(
        rowIndex,
        12,
        stateStr
      );
    },
    //修改的数据[行，列，老值，新值]
    afterChange(changes, source) {
      let obj = {},index,key,values,reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9](0-9)?$)/,
          indexs,value,modify,datas = this.settings.data,row;
      //判断没有值没有改变直接返回。
      if(changes && changes[0][2] && changes[0][3] &&　changes[0][2] === changes[0][3]){
        return;
      }
      let me = this;
      // return
      //融资的新增与减少的判断
      if (this.templateId == "7") {
        this.changeAddOrReduce(changes);
      }
      if (changes && changes.length > 0) {
        changes.forEach(it => {
          index = it[0];
          key = it[1];
          values = it[3];
          obj[key] = values;
          obj["index"] = index;
          // obj["colId"] = key;
          obj["row"] = values;
          me.values = values;
          //融资的status可以传过去 空字符串 ""
          if (values == "" && key != "status" && me.templateId != "7") {
            values = 0;
          }
          let arr = datas.filter(record => {
            return record.cusuppliername != null;
          });
          function res(arr) {
            var tmp = [];
            var copy = [];
            arr.forEach(item => {
              if (copy.indexOf(item.cusuppliername) === -1) {
                copy.push(item.cusuppliername);
              } else {
                if (tmp.indexOf(item.cusuppliername) === -1) {
                  me.$message({
                    type: "error",
                    message: "商客名称重复，请重新输入"
                  });
                  tmp.push(item.cusuppliername);
                }
              }
            });
            return tmp;
          }
          var result = res(arr);
          let changeRecord = me.tableData.filter(record => {
            return record.index === index && record.colId === key;
          })[0];
          let changen = me.tableData.filter(record => {
            return record.index === index;
          })[0];

          if (me.fixed === 1) {
            if (changeRecord) {
              if (reg.test(values) === true) {
                changeRecord[key] = values;
              }
            } else {
              
              if (reg.test(values) === true) {
                let bb = { index: index };
                bb[key] = values;
                bb["colId"] = key;
                me.tableData.push(bb);
              }
            }
          }
          if (me.fixed === 0) {
            if (changen) {
              changen[key] = values;
            } else if (me.templateId == 8) {
              // if (index != 0) {
                let bb = { index: index };
                bb[key] = values;
                me.tableData.push(bb);
              // }
            } else if(me.templateId == 9) {
              //添加一个基本情况表的item编码。
              let changeRow = datas[index];
              let bb = { index: index,item: changeRow.item };
              bb[key] = values;
              me.tableData.push(bb);
            }else if(me.templateId == 10) {
              //添加一个基本情况表的item编码。
              let changeRow = datas[index];
              let bb = { index: index,company: changeRow.company };
              bb[key] = values;
              me.tableData.push(bb);
            }else if(me.templateId == 12) {
              //添加一个基本情况表的item编码。
              let changeRow = datas[index];
              let bb = { index: index,item: changeRow.item };
              bb[key] = values;
              me.tableData.push(bb);
            }else {
              
              if ((key == "cismenu" && "cismenu" != 1) || "cismenu" != 0) {
                let bb = { index: index };
                bb[key] = values;
                me.tableData.push(bb);
              }
            }
            // })
          }
        
        
        // localStorage.setItem("saveData",JSON.stringify(this.tableData))
        me.tableData.forEach(e => {
          indexs = e.index;
          value = e;
        });
        datas.forEach((item, i) => {
          modify = item;
          if (i === indexs) {
            if (
              value.A ||
              value.A == "" ||
              value.B ||
              value.B == "" ||
              value.C ||
              value.C == "" ||
              value.D ||
              value.D == "" ||
              value.E ||
              value.E == "" ||
              value.F ||
              value.F == "" ||
              value.G ||
              value.G == "" ||
              value.H ||
              value.H == ""
            ) {
              value["id"] = modify.id;
              value["nid"] = modify.nid;
              if (value["nid"] == null) {
                value["nid"] = 0;
              }
            } else if (
              value.A_ ||
              value.A_ == "" ||
              value.B_ ||
              value.B_ == "" ||
              value.C_ ||
              value.C_ == "" ||
              value.D_ ||
              value.D_ == "" ||
              value.E_ ||
              value.E_ == "" ||
              value.F_ ||
              value.F_ == ""
            ) {
              // console.log("2",modify.id_)
              value["id_"] = modify.id_;
            } else {
              // value["id"] = modify.id;
              // value["id_"] = modify.id_;
              value["nid"] = modify.nid;
              if (value["nid"] == null) {
                value["nid"] = 0;
              }
            }
          }
        });
        });
      }
      console.log("this.tableData", this.tableData);
    },
    //应收账款分析表 判断是否控制填报
    reRenderCell(row, columns) {
      // debugger;
      if (this.fixed == 0 && this.templateId == 4) {
        if(columns == 7){
          let record = this.settings.data[row];
          if(!record){
            return true;
          }
          if (record.isinside === "是" || record.isinside == 1) {
            if(record.isnormal){
              delete record.isnormal;
            }
            //如果是是或是1，清空后面的内容。
            let arrItems = ['isnormal','scontenta','scontentb','E','F','G','H'];
            this.clearRowOfAfter(row,arrItems,columns);
          }
          //如果选择是否内部
        }
        if (columns > 7) {
          let record = this.settings.data[row];
          if(!record){
            return true;
          }
          if (record.isinside === "是" || record.isinside == 1 || !record.isinside) {
            //8
            return true;
          }
        }
        if (columns > 8) {
          //isnature isnormal
          let record = this.settings.data[row];
          if (record.isnormal === "是" || record.isnormal == 1) {
            return true;
          }
        }
      }
      return false;
    },
    /**
     * 根据前面的选择清空后面的内容。
     * @author szc 2019年4月30日13:51:46
     */
    clearRowOfAfter (row,arrItems,columns) {
      // debugger;
      let me = this;
      let record = this.settings.data[row];
      if(record && arrItems && arrItems.length > 0){
        arrItems.forEach(item => {
          if(record[item] || record[item] == '否') {
            typeof(record[item]) == "number"? record[item] = null:record[item] = null;
          }
        });
      }
      this.settings.data[row] = record;
    },
    /**
     * 还款来源的限制。
     * @author szc 2019年4月17日11:41:42
     */
    paymentLimit(row, columns) {
      let me = this;
      if (this.templateId == 7) {
        if (columns == 11) {
          let record = this.settings.data[row];
          if(!record){
            return true;
          }
          if (!record.srepaydate) {
            let arrItems = ['repaysource'];
            this.clearRepayDate(row,arrItems,columns);
            return true;
          }
        }
      }
      return false;
    },
    /**
     * 融资情况明细表
     * @author szc 2019年5月10日10:36:42
     */
    clearRepayDate (row,arrItems,columns) {
      let me = this;
      let record = this.settings.data[row];
      if(record && arrItems && arrItems.length > 0){
        arrItems.forEach(item => {
          if(record[item]) {
            record[item] = "";
          }
        });
      }
      this.settings.data[row] = record;
    },
    // 设置单元格的只读和下拉方法
    cells(row, columns, prop, params, pp) {
      // 
      let cellMeta = {},me = this,tableState = me.tableState;
      if(this.templateId == "2"){
        if(columns == 0 || columns == 1 || columns == 3 || columns == 4){
          cellMeta.readOnly = true;
        }
      }else if (this.fixed === 1) {
        if (columns == 0 || columns == 1 || columns == 5 || columns == 4) {
          cellMeta.readOnly = true;
        }
      }
      if (this.templateId == 3) {
        if (
          (row >= 48 && row <= 70 && (columns == 2 || columns == 3))
        ) {
          cellMeta.readOnly = true;
        }
        
      }
      if (this.templateId == 2) {
        if ((row === 28 && columns === 5)) {
          cellMeta.readOnly = true;
        }
      }
      if (this.templateId == 4) {
        cellMeta.readOnly = this.reRenderCell(row, columns);
        //console.info("after-----"+row+"==="+columns+"==="+ cellMeta.readOnly);
      }
      //声明一个存放条件限制的数组。此时只针对预付、其他表的填报。
      let restrictItems = ['5','6'];
      if(restrictItems.indexOf(this.templateId) != -1){
        cellMeta.readOnly = this.limitItemOfFill(row,columns);
      }
      if (this.templateId == 7) {
        //添加一个还款来源的限制。
        cellMeta.readOnly = this.paymentLimit(row, columns);
        if (columns == 1) {
          cellMeta.source = this.mechanismdownData(row, columns);
          cellMeta.type = "dropdown";
        }
        if (columns == 2) {
          // 
          // this.getCellEditor = this.$refs.hotTableComponent.hotInstance.getCellEditor(row,columns);
          // this.getCellEditor = this.settings.getCellEditor(row,columns);
          cellMeta.source = this.typeOfFinancing();
          cellMeta.type = "dropdown";
        }
        if (columns == 12) {
          cellMeta.readOnly = true;
        }
      }
      if (this.templateId == 8) {
        //资金集中度的填写限制 改成第一行可编辑
        if ((columns == 0 || columns == 2)) {
          cellMeta.readOnly = false;
        } else {
          cellMeta.readOnly = true;
        }
      }else if(this.templateId == 9){
        //基本情况表的判断只读的列
        if(columns == 0 || (row < 4 && columns == 1) || (row == 0 && columns == 2) || (row == 8 && columns >= 1)){
          cellMeta.readOnly = true;
        }else {
          cellMeta.readOnly = false;
        }
      }else if (this.templateId == 10) {
        //集团年度目标考核建议值。
        if(columns != 2 && columns != 1){
          cellMeta.readOnly = true;
        }else {
          cellMeta.readOnly = false;
        }
      }else if (this.templateId == 12) {
        //市管企业利润总额考核调整表。
        if(columns == 0){
          cellMeta.readOnly = true;
        }else {
          cellMeta.readOnly = false;
        }
      }
      [1,2,3].indexOf(tableState) != -1? cellMeta.readOnly = true:"";
      return cellMeta;
    },
    /**
     * 填报表的列与列之间的限制的判断添加。
     * 2019年3月29日14:06:43  szc
     */
    limitItemOfFill (row,columns) {
      let me = this;
      if (this.fixed == 0) {
        if (columns > 7) {
          let record = this.settings.data[row];
          if(!record){return true}
          if (record.isinside === "是" || record.isinside == 1 || !record.isinside) {
            //如果是是或是1，清空后面的内容。
            let arrItems = ['isnormal','scontenta','scontentb','E','F','G','H'];
            this.clearRowOfAfter(row,arrItems,columns);
            return true;
          }
        }
        if (columns > 8) {
          let record = this.settings.data[row];
          if (record.isnormal === "是" || record.isnormal == 1) {
            return true;
          }
        }
      }
      return false;

    },
    //请求查询回来的数据的类型
    getHandsoneTableColType(type) {
      if (type) {
        if (type === "decimal") {
          return "numeric";
        } else if (type == "string") {
          return "text";
        }
      }
      return "text";
    },
    // 判断是decimal类型的加上千分两位小数显示
    decimalDefaultRenderer(
      instance,
      td,
      row,
      col,
      prop,
      value,
      cellProperties
    ) {
      while (td.firstChild) {
        td.removeChild(td.firstChild);
      }
      var flagElement = document.createElement("DIV");
      flagElement.style.textAlign = "right";
      //添加一个市管企业的户数，不用格式化数据。
      let arr = ['12'];
      if (value != null && !isNaN(value)) {
        flagElement.innerText = arr.indexOf(this.templateId) != -1? (value == ""? "":parseInt(value)):Math.decimalToLocalString(value);
        td.appendChild(flagElement);
      }
    },
    //把请求回来的数据生成表格给需要操作的列添加方法
    convertHansoneTableColumns(columns, rows,res) {
      let me = this,arrTem = ['9','12','10','11'],tableState = me.tableState;
      if (this.fixed === 0 && arrTem.indexOf(this.templateId) == -1) {
        columns.push({ id: "caozuo", text: "操作", type: "string" });
        this.rowdata = true;
      }
      let newCoulmns = [],
        colHeaders = [],
        hiddenColumns = {
          indicators: false
        },
        hiddenCols = [];
      for (let i = 0, len = columns.length; i < len; i++) {
        let col = columns[i];
        if (col.hidden) {
          hiddenColumns.indicators = true;
          hiddenCols.push(i);
        } else {
          let cc = {
            type: this.getHandsoneTableColType(col.type),
            data: col.id
          };
          if (col.renderer || cc.source) {
            cc.renderer = col.renderer;
            cc.source = col.source;
          } else {
            if (col.type === "decimal") {
              cc.renderer = this.decimalDefaultRenderer;
            } else if (col.id === "caozuo") {
              cc.renderer = this.flags;
              cc.readOnly = true;
            } else if (col.id === "isnature") {// 客商性质
              cc.source = this.getDropDownSource("1400");
              cc.renderer = this.flagrenderer;
              cc.type = "dropdown";
            } else if (col.id === "isinside") {//isinside
              cc.source = this.getDropDownSource("1700");
              cc.renderer = this.flagrenderer;
              // cc.type = "autocomplete";
              cc.type = "dropdown";
              cc.readOnly = false;
              console.log(rows);
            } else if (col.id === "isnormal") {// 是否正常
              cc.source = this.getDropDownSource("1800");
              cc.renderer = this.flagrenderer;
              cc.type = "dropdown";
              cc.readOnly = false;
            } else if (col.id === "scontenta") {// 非正常分类
              cc.source = this.getDropDownSource("1500");
              // cc.renderer = this.flagrenderer
              cc.type = "dropdown";
              cc.readOnly = false;
            } else if (col.id === "scontentb") {// 债务人状况
              cc.source = this.getDropDownSource("1600");
              // cc.renderer = this.flagrenderer
              cc.type = "dropdown";
            } else if (col.id === "guarantee") {
              cc.source = this.financingOptionsData("20");
              cc.renderer = this.financingrenderer;
              cc.type = "dropdown";
            } else if (col.id === "repaysource") {
              cc.source = this.financingOptionsData("21");
              cc.renderer = this.financingrenderer;
              cc.type = "dropdown";
            } else if (col.id === "sstartdate") {
              (cc.type = "date"), (cc.dateFormat = "YYYY/MM/DD");
            } else if (col.id === "senddate") {
              (cc.type = "date"), (cc.dateFormat = "YYYY/MM/DD");
            } else if (col.id === "srepaydate") {
              (cc.type = "date"), (cc.dateFormat = "YYYY/MM/DD");
            } else if (col.id === "cismenu") {
              
              cc.source = this.financingOptionsData("1700");
              cc.renderer = this.financingrenderer;
              cc.type = "dropdown";
            } else if (col.id === "cisguarantee") {
              cc.source = this.financingOptionsData("1800");
              cc.renderer = this.financingrenderer;
              cc.type = "dropdown";
            } else if (col.id === "finance") {
              cc.source = this.typeOfFinancing();
              cc.type = "dropdown";
            }
            //资金集中情况表的render方法重新写里面的内容。
            if(this.templateId == "8"){
              let arr = ['B'];
              if(arr.indexOf(col.id) != -1){
                cc.renderer = this.handleTemplate8;
              }
            }
            // else if (this.templateId == "7") {
            //   cc.allowInvalid = true;
            //   // cc.invalidCellClassName = "htInvalid";
            //   // cc.validator = this.emailValidator;
            //   // cc.validator = /^(?:\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b|null)$/;
            // }
          }
          newCoulmns.push(cc);
          colHeaders.push(col.text);
          // if(me.templateId != 9 || (me.templateId == 9 && cc && cc.data != "item")){
          //   newCoulmns.push(cc);
          //   colHeaders.push(col.text);
          // }
          
        }
      }
      //基本情况表、市管企业不显示编码。过滤掉
      if((this.templateId == 9 || this.templateId == 12) && newCoulmns && newCoulmns.length > 0){
        newCoulmns = newCoulmns.filter(item => {
          return item.data != "item";
        });
        colHeaders = colHeaders.filter(item => {
          return item != "项目编码";
        });
      }
      //集团经营目标不显示公司编码过滤掉
      if((this.templateId == 10) && newCoulmns && newCoulmns.length > 0){
        let arrIds = ['company','lrwc','lrtbzjl','yewc','yetbzjl'],
            arrTexts = ['公司编码','营业收入-上年实际完成','营业收入-同比增减率%','利润总额-上年实际完成','利润总额-同比增减率%'];
        newCoulmns = newCoulmns.filter(item => {
          // return item.data != "company";
          return arrIds.indexOf(item.data) == -1;
        });
        colHeaders = colHeaders.filter(item => {
          // return item != "公司编码";
          return arrTexts.indexOf(item) == -1;
        });
      }
      debugger;
      //资金集中情况表。
      if(this.templateId == 8 && rows && rows.length > 0){
        if(rows[0] && rows[0].accountbanks == ""){
          rows = rows.splice(1,rows.length)
        }
      }
      this.settings.columns = newCoulmns;
      this.settings.cells = this.cells;
      
      // this.getCellEditor = this.$refs.hotTableComponent.hotInstance.getCellEditor(1,2);
      //
      // this.settings.afterGetCellMeta = this.afterGetCellMeta;
      // this.settings.setDataAtCell = this.setDataAtCell;
      // this.settings.setDataAtCell = this.setDataAtCell;
      // this.settings.beforeChange = this.beforeChange;
      this.settings.colHeaders = colHeaders;
      //判断第九个设置成多表头。
      
      // this.settings.colHeaders = true;
      // this.settings.rowHeaders = true;
      // if(this.templateId == 9){
      //   this.settings.nestedHeaders = [
      //     ['F', {label: 'G', colspan: 2}, {label: 'H', colspan: 2}],
      //     ['V','B','N','M','K']
      //   ];
      // }
      // this.settings.nestedHeaders = res.data.data.columnsShow;
      let parseItems = ['4','5','6'];
      //新加一个装换成相应的数字显示成文字处理。
      if(this.templateId == 7 && rows && rows.length > 0){
        let itemNames = [//guarantee repaysource
          {"text":"cismenu","type":"single"},
          {"text":"cisguarantee","type":"single"},
          {"text":"guarantee","type":"MSeries","root":"financing"},
          {"text":"repaysource","type":"MSeries","root":"financing"}
        ];
        this.parseNumberToString(itemNames,rows);
      }else if(parseItems.indexOf(this.templateId) != -1 && rows && rows.length > 0) {
        let itemNames = [//guarantee repaysource isnormal
          {"text":"isinside","type":"single"},
          {"text":"isnormal","type":"single"},
          {"text":"isnature","type":"MSeries","root":"dataDict"}
        ];
        this.parseNumberToString(itemNames,rows);
      }
      this.settings.data = rows;
      //资金集中情况表，数据为0 的设置为空,为了填报的时候，避免出现零。
      // if(this.templateId == "8" && rows && rows.length > 0){
      //   if(rows[0]){
      //     rows[0].accountbanks == "" || rows[0].accountbanks == "SH" || !rows[0].accountbanks? rows[0].accountbanks = "合计":"";
      //   }
      //   rows.forEach(item => {
      //     if(item["B"] == 0){
      //       item["B"] = "";
      //     }
      //   });
      // }
      rows = rows && rows.length > 0? rows:[{}];
      //有待修复
      me.settings.data = rows;
      setTimeout(() => {
        var p = /(\d{4})(\d{2})(\d{2})/;
        let newarr = [];
        rows.forEach(item => {
          if (item.senddate) {
            var b = item.senddate.replace(p, "$1/$2/$3");
            item.senddate = b;
          }
          if (item.srepaydate) {
            var d = item.srepaydate.replace(p, "$1/$2/$3");
            item.srepaydate = d;
          }
          if (item.sstartdate) {
            var g = item.sstartdate.replace(p, "$1/$2/$3");
            item.sstartdate = g;
          }
        });
        me.settings.data = rows;
      }, 100);
    },
    /**
     * 处理资金集中情况表。
     * @author szc 2019年4月22日10:57:40
     */
    handleTemplate8 (instance, td, row, col, prop, value, cellProperties) {
      let me = this;
      if (!value) {
        return;
      }
      if (/[\u4e00-\u9fa5]/.test(value)) {
        td.innerHTML = value;
        return;
      }
      let text = value;
      // let datas = this.financing.filter(item => item.id === value);
      // if (datas.length == 0) {
      //   td.innerHTML = "";
      //   return;
      // } else {
      //   text = datas.length > 0 ? datas[0].text : value;
      // }
      td.innerHTML = text;
    },
    /**
     * 
     */
    emailValidator (value, callback) {
      let me = this;
      setTimeout(function(){
        if (value == "2019/04/03" || value == "") {
          callback(true);
        }
        else {
          callback(false);
        }
      }, 1000);
      // if(value == "是" || value == ""){
      //   // return true;
      //   callback(true);
      // }else{
      //   // return false;
      //   callback(false);
      // }
    },
    /**
     * 有些查询出来的是 1 or 0 or 别的， 在此转换成要显示的字符串。
     * 2019年3月26日10:41:04 szc
     */
    parseNumberToString(itemNames,rows) {
      let me = this;
      if(itemNames && itemNames.length > 0){
        for(let i = 0; i < itemNames.length;i ++){
          let item = itemNames[i];
          if(item.type == "single"){
            rows.forEach(tt => {
              tt[item.text] && tt[item.text] == 1? tt[item.text] = "是":(tt[item.text] == 0? tt[item.text] = "否":"");
            });
          }
          if(item.type == "MSeries"){
            for(let j = 0; j < rows.length;j ++){
              let rowItem = rows[j];
              let filItem = me[item.root].filter(filIt => {
                return filIt.id == rowItem[item.text];
              });
              if(filItem && filItem.length > 0){
                rowItem[item.text] = filItem[0].text;
              }
            }
          }
        }
      }
    },
    financeValidator(instance, td, row, col, prop, value, cellProperties) {
      
      let me = this;

    },
    contentEditor (aa,bb,cc,dd,ee,ff,gg,hh) {
      
      let me = this;
    },
    contentOfFinance (instance, td, row, col, prop, value, cellProperties) {
      
      let me = this;
      if (!false) {
        let el = document.createElement("DIV");
        // el.className = "flag";
        // el.id = "flag";
        el.innerHTML = value;
        td.appendChild(el);
        el.style.color = "red";
        el.style.cursor = "pointer";
        Handsontable.dom.addEvent(el, "dblclick", function(event) {
          
          let $select = document.createElement("SELECT");
          let $option = document.createElement("option");
          let $option2 = document.createElement("option");
          $option.text = "hello";
          $option2.text = "hi";
          $select.add($option);
          $select.add($option2);
          $select.style.float = "right";
          $select.style.position = ""
          td.appendChild($select);
        });
      }
    },
    getCellEditor (row,col) {
      
      let me = this;
    },
    beforeChange(changes, params) {
      // 
      let me = this;
    },
    afterGetCellMeta(row, col, params, pp, dd) {
      // 
      let me = this;
    },
    afterCellChange(row, col, params) {
      
      let me = this,
        rowData;
      if (row[0][1] != "sstartdate") {
        return;
      } else {
        rowData = this.$refs.hotTableComponent.hotInstance.getDataAtRow(
          row[0][0]
        );
      }
    },
    setDataAtCell() {
      
    },
    //点击保存数据
    saveData() {
      let that = this;
      //判断是不是有改动。
      if(this.tableData && this.tableData.length == 0){
        this.$message({
          message: '没有改动！',
          type: 'warning'
        });
        return;
      }
      let arrTems = ['4','5','6'];
      this.tableData.forEach(item => {
        //isinside
        // a = item
        let keys = Object.keys(item);
        let flag = false;
        for (let key of keys) {
          if (item.isinside == "是") {
            if (
              key === "isinside" &&
              (item.isinside == "是" || item.isinside == 1)
            ) {
              flag = true;
              continue;
            }
            if (flag) {
              item.scontentb = null;
              item.scontenta = null;
              item.isnormal = null;
              item.E = null;
              item.F = null;
              item.G = null;
              item.H = null;
            }
          } else if (item.isnormal == "是") {
            if (
              key === "isnormal" &&
              (item.isinside == "否" || item.isinside == 1) &&
              (item.isnormal == "是" || item.isnormal == 1)
            ) {
              flag = true;
              continue;
            }
            if (flag) {
              item.scontentb = null;
              item.scontenta = null;
              item.E = null;
              item.F = null;
              item.G = null;
              item.H = null;
            }
          }
          //融资的传递的参数的替换financingOptions
          if(that.templateId == "7" && key == "finance" && item){
            that.parseTypeOfFinance(key,item);
          }
          //应收、预付、其他等表的转换。
          if(arrTems.indexOf(that.templateId) != -1 && item) {
            let keys = ['scontenta','scontentb'];
            that.parseTypeIdOfContent(keys,item);
          } 
        }
      });
      // if (this.templateId == 7) {
      //   this.tableData.forEach(item => {
      //     // if(item.senddate || item.srepaydate || item.sstartdate){
      //     //     return (item.sstartdate.replace(/\//g,""))
      //     // }
      //   });
      // }
      let period = this.parsePeriod();
      let objs = {
        cubeId: this.cubeId,
        dims: {
          company: this.company,
          period: period
        },
        subject: this.subject,
        templateId: this.templateId,
        rows: this.tableData,
        fixed: this.fixed,
        user: this.user.user.userName
      };
      console.log(objs);
      let newtabledata = this.settings.data;
      let x;
      let me = this;
      let arr = newtabledata.filter(record => {
        x = record;
        return record.cusuppliername != null;
      });

      function res(arr) {
        var tmp = [];
        var copy = [];
        arr.forEach(item => {
          if (copy.indexOf(item.cusuppliername) === -1) {
            copy.push(item.cusuppliername);
          } else {
            if (tmp.indexOf(item.cusuppliername) === -1) {
              me.$message({
                type: "error",
                message: "商客名称重复,不可以保存，请更改"
              });
              tmp.push(item.cusuppliername);
            }
          }
        });
        return tmp;
      }
      var result = res(arr);
      if (result.length === 0) {
        save(objs).then(res => {
          // console.log("保存", res);
          this.reportData(this.datas);
          if (res.data.code === 200) {
            me.$message({
              message: res.data.msg,
              type: "success"
            });
            me.tableData = [];
            //保存成功之后
            // this.afterSaveData();
          } else {
            me.$message({
              message: "保存失败",
              type: "error"
            });
          }
        });
      }
    },
    /**
     * 转换日期。
     * @author szc 2019年5月7日15:55:29
     */
    parsePeriod () {
      let me = this,paramsStore = this.$store.getters,year = paramsStore.year,month = paramsStore.month,period = "";
      if(month > 9){
        period = year + "" + month;
      }else {
        period = year + "0" + month;
      }
      return period;
    },
    /**
     * 应收、预付、其他表的填报。
     */
    parseTypeIdOfContent (keys,item) {
      let me = this;
      let financingOptions = this.dataDict;
      if(financingOptions && financingOptions.length > 0) {
        for(let i = 0;i < financingOptions.length;i++) {
          let itemOp = financingOptions[i];
          for(let j = 0;j < keys.length;j++){
            let keyItem = keys[j];
            if(item[keyItem] == itemOp.text) {
              item[keyItem] = itemOp.id;
            };
          }
        }
      }
    },
    /**
     * 转换融资的 融资类型的转换
     */
    parseTypeOfFinance(key,itemOut) {
      
      let me = this;
      let financingOptions = this.financingOptions;
      if(financingOptions && financingOptions.length > 0){
        for(let i = 0;i < financingOptions.length;i ++){
          let item = financingOptions[i];
          if(itemOut[key] == item.text){
            itemOut[key] = item.id;
            break;
          }

        }
        // financingOptions.forEach(item => {
        //   if(itemOut[key] == item.text){
        //     itemOut[key] = item.id;
        //     return;
        //   }
        // });
      } 
    },
    afterSaveData() {
      
      let me = this;
      let curParams = this.$store.curParams,
        strSign = "success";
      if (curParams) {
        this.afterSaveReportData(curParams);
      }
    },
    afterSaveReportData(datas) {
      
      // console.log("请求", datas);
      // console.log("传递的data", this.datas);
      let me = this;
      inquire(this.datas).then(res => {
        console.log("查询", res);
        let columns = res.data.data.columns;
        let rows = res.data.data.rows;
        // me.settings.data = rows;
        // me.columns = res.data.data.columns;
        // // me.settings = res.data.data.rows
        // // me.$set(me.settings, "data",null)
        // // me.$set(me.settings, "data",res.data.data.rows)
        me.convertHansoneTableColumns(columns, rows);
      });
    },
    // 点击添加一行
    rowData() {
      this.$refs.hotTableComponent.hotInstance.alter("insert_row", this.index);
    },
    //填报页面下拉获取要传递的数据
    matching(list, index, item) {
      let date;
      if (this.month < 10) {
        date = this.year + "0" + this.month;
      } else {
        date = this.year + this.month;
      }
      this.years = date;
      this.reportHeader = list[index].title;
      this.dropdownid = list[index].sourceId;
      this.fixed = list[index].fixed;
      this.subject = list[index].subject;
      this.templateId = list[index].templateId;
      this.api = item.url;
      let excelUploadParaDto = {
        company: this.company,
        period: this.years,
        subject: this.subject,
        templateId: this.templateId,
        fixed: this.fixed
      };
      this.datas = excelUploadParaDto;
      //当前的参数保存在大对象里
      this.$store.curParams = this.datas;
      //按钮新增的显示与否
      this.showOrHideOfButtonForAdd(index,item);
      //三张主表加十三个审计月。
      this.mainTableMonth();
      //清楚以前的数据。
      this.clearDataOfBefore();
      this.reportData(this.datas);
      //上报、审阅按钮的内容。
      this.contentOfButtons();
    },
    /**
     * 清楚以前的数据。
     */
    clearDataOfBefore () {
      let me = this;
      me.settings.colHeaders = [],me.settings.columns = [],me.settings.data = [];
    },
    /**
     * 三张主表加十三个审计月。
     * @author szc 2019年4月20日15:03:07
     */
    mainTableMonth () {
      let me = this,arr = ['1','2','3'];
      if(arr.indexOf(this.templateId) != -1){
        let monthConfig = {value:13,id:"month"};
        me.$store.monthConfig = monthConfig;
      }else {
        let monthConfig = {value:12,id:"month"};
        me.$store.monthConfig = monthConfig;
      }
    },
    /**
     * 控制按钮显示与否
     */
    showOrHideOfButtonForAdd(index,item) {
      let me = this;
      let arr = ['0','1','2','3','9','12','10','11'],flag = true;
      for(let i = 0;i < arr.length;i ++){
        let arrItem = arr[i];
        if(arrItem == item.templateId){
          flag = false;
          break;
        }
      }
      this.showAddButton = flag;
    },
    //请求获取填报页面
    reportData(datas) {
      
      // console.log("请求", datas);
      // console.log("传递的data", this.datas);
      let me = this;
      inquire(this.datas).then(res => {
        
        console.log("查询", res);
        let columns = res.data.data.columns;
        let rows = res.data.data.rows;
        me.columns = res.data.data.columns;
        // me.settings = res.data.data.rows;
        // me.$set(me.settings, "data",null)
        // me.$set(me.settings, "data", res.data.data.rows);
        if(this.templateId == "7" && rows && rows.length > 0){
          this.parseNameOfFinance(rows);
        }
        //查询当前选中报表的状态。
        me.queryStateOfFillTable(columns,rows,res);
        // me.convertHansoneTableColumns(columns, rows,res);
      });
    },
    /**
     * 查询当前选中的table的状态。
     * @author szc 2019年5月8日19:16:48
     */
    queryStateOfFillTable(columns,rows,res) {
        let me = this,
            company = me.$store.getters.company;
        //查询选中的报表状态。
        let stateParams = {
            company: company,
            period: me.parsePeriod(),
            templateid: me.templateId
        };
        queryStateOfTable(stateParams).then(res => {
            let arr = ['2','5'],states = [1,4,3,2];
            if (res.data.code == 200) {
                me.tableState = res.data.data.statemun;
            } else if (res.data.code == 1001) {
                me.tableState = "";
            }
            me.convertHansoneTableColumns(columns, rows,res);
            //如果是上报过了，按钮就显示已上报。
            if(states.indexOf(me.tableState) != -1 && me.buttonsOperation && me.buttonsOperation.length > 0){
              me.buttonsOperation.forEach(it => {
                if(me.tableState == 1 || me.tableState == 3){
                  if(it.id == 1){
                    it.disabled = true;
                    it.text = "已上报";
                  }else if(arr.indexOf(it.id) != -1) {
                    it.disabled = false;
                  }
                }
                if(me.tableState == 4){
                  if(it.id == 1){
                    it.disabled = false;
                    it.text = "上报";
                  }else if(arr.indexOf(it.id) != -1) {
                    it.disabled = true;
                  }
                }else if(me.tableState == 2) {
                  if(it.id == 1){
                    it.disabled = true;
                    it.text = "上报";
                  }else if(it.id == 2) {
                    it.disabled = false;
                  }else {
                    it.disabled = true;
                  }
                }
                // if(it.id == 1){
                //   it.disabled = true;
                //   it.text = "已上报";
                // }else if(arr.indexOf(it.id) != -1) {
                //   it.disabled = true;
                // }
              });
            }else if(me.buttonsOperation && me.buttonsOperation.length > 0){
              me.buttonsOperation.forEach(it => {
                if(it.id == 1){
                  it.disabled = false;
                  it.text = "上报";
                }else if(arr.indexOf(it.id) != -1) {
                  it.disabled = true;
                }
              });
            }
        })
    },
    /**
     * 转换融资类型作为名字
     */
    parseNameOfFinance(rows) {
      let me = this,key = "finance";
      let financingOptions = this.financingOptions;
      if(financingOptions && financingOptions.length > 0){
        for(let i = 0;i < rows.length;i ++){
          let rowItem = rows[i];
          for(let j = 0;j < financingOptions.length;j ++){
            let item = financingOptions[j];
            if(rowItem[key] == item.id){
              rowItem[key] = item.text;
              break;
            }
          }
        }
      }
    },
    //tab栏的切换
    handleClick(tab, event) {
      //console.log(tab, event);
    },
    //表格的导入需要传递的参数
    beforeAvatarUpload(file) {
      
      let date;
      if (this.month < 10) {
        date = this.year + "0" + this.month;
      } else {
        date = this.year + this.month;
      }
      this.years = date;
      this.excelname = file.name;
      console.log("this.years", this.years);
      let fd = new FormData();
      fd.set("file", file);
      
      fd.set("period", this.years);
      fd.set("user", this.user.user.username);
      fd.set("company", this.company);
      // console.log(this.dropdownid)
      if (this.dropdownid) {
        fd.set("templateId", this.dropdownid);
      }
      if (this.subject) {
        fd.set("subject", this.subject);
      }
      //这个地方存在为 0 的情况，所以改成这样。
      if (this.fixed != null) {
        fd.set("fixed", this.fixed);
      }
      this.uploadfile = fd;
      this.files = fd;
      return true;
    },
    // 表格的导入
    submitUpload(file) {
      let me = this;
      var regExp = /([\u4e00-\u9fa5]+)/gi;
      var title = this.excelname; //[\u4e00-\u9fa5]
      var titlename = title.match(regExp);
      console.log(title);
      if (titlename[0] != this.importHeader) {
        this.$message({
          message: "模板名字不匹配",
          type: "error"
        });
      } else {
        // console.log(titlename[0]);
        this.$confirm('此操作将覆盖以前的数据内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          importExcel(me.files).then(res => {
            if (res.data.code === 200) {
              me.subject = null;
              me.fixed = null;
              me.templateId = null;
              this.$message({
                message: "模板匹配 导入成功",
                type: "success"
              });
            } else {
              this.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已撤回导入！'
          });          
        });
        // importExcel(me.files).then(res => {
        //   if (res.data.code === 200) {
        //     me.subject = null;
        //     me.fixed = null;
        //     me.templateId = null;
        //     this.$message({
        //       message: "模板匹配 导入成功",
        //       type: "success"
        //     });
        //   } else {
        //     this.$message({
        //       message: res.data.msg,
        //       type: "error"
        //     });
        //   }
        // });
      }
    },
    //导入按钮的点击事件调用导入
    uploadFiles() {
      
      this.submitUpload(this.files);
    },
    // 点击导入的下拉菜单获取对应的数据
    importDropdownMenu(list, index) {
      
      this.importHeader = list[index].title;
      this.dropdownid = list[index].templateId;
      this.subject = list[index].subject;
      this.fixed = list[index].fixed;
      if (this.uploadfile) {
        this.uploadfile.set("templateId", this.dropdownid);
        // this.uploadfile.append("subject", this.subject);
        this.uploadfile.set("subject", this.subject);
        this.uploadfile.set("fixed", this.fixed);
        this.files = this.uploadfile;
        console.log("要传递的上传文件的数据", this.files);
      }
    },
    //模板下载弹框页面的请求
    templateDownload() {
      
      this.isShow = true;
      this.axios.get("/cnbi/json/source/tjsp/template.json").then(res => {
        console.log(res);
        this.list = res.data.data;
      });
    },
    // 下载模板弹框的取消
    cancel() {
      this.isShow = false;
    },
    // 弹框的确定 模板下载
    Download() {
      this.isShow = false;
      if (this.templateIds != null) {
        let params;
        if(this.templateIds.length > 0){
          params = this.templateIds;
        }
        download(params).then(res => {
          console.log("模板的下载", res);
          const content = res.data;
          const blob = new Blob([content], {
            type: "application/vnd.ms-excel"
          });
          // console.log(blob)
          let str = res.headers["content-disposition"];
          let index = str.lastIndexOf(".");
          let h = str.substring(index + 1, str.length);
          // let h = "xls";
          let name;
          if(params.length > 1){
            name = "天津报表模板"
          }else {
            name = this.templateItems[0].title;
          }
          const fileName = name + "." + h;
          if ("download" in document.createElement("a")) {
            // 非IE下载
            const elink = document.createElement("a");
            elink.download = fileName;
            elink.style.display = "none";
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink);
          } else {
            // IE10+下载
            navigator.msSaveBlob(blob, fileName);
          }
        });
      }
    },
    //模板下载选择的表格
    select(val, item) {
      this.downloadTemplateItems(val, item);
      // console.log("option:", val);
      // console.log("option data:", item);
      // this.templateId = item.templateId;
      // this.title = item.title;
    },
    /**
     * 下载模板的指标信息（主要是id）
     * @author szc 2019年4月11日19:25:49
     */
    downloadTemplateItems (val, item) {
      let me = this,arr = this.templateIds || [],templateItems = this.templateItems || [];
      if(val){
        arr.push(item.templateId - 0);
        templateItems.push(item);
      }else{
        if(arr.length > 0){
          arr = arr.filter(it => {
            return it != item.templateId;
          });
          templateItems = templateItems.filter(tt => {
            return tt.templateId != item.templateId;
          });
        }
      }
      this.templateIds = arr;
      this.templateItems = templateItems;
    },
    //插入了删除
    flags(instance, td, row, col, prop, value, cellProperties) {
      let arr = this.$refs.hotTableComponent.hotInstance;
      // console.log("arr",arr)
      let list = this.settings.data;
      var code = value;
      while (td.firstChild) {
        td.removeChild(td.firstChild);
      }
      if (!value) {
        var el = document.createElement("DIV");
        el.className = "flag";
        el.id = "flag";
        el.innerHTML = "删除";
        td.appendChild(el);
        // if (this.templateId == 8) {
        //   let dd = document.getElementsByTagName("td")[5];
        //   if (dd && dd != "undefined") {
        //     dd.innerText = "";
        //   }
        // }
        el.style.color = "red";
        el.style.cursor = "pointer";
        let me = this;
        let date;
        if (this.month < 10) {
          date = this.year + "0" + this.month;
        } else {
          date = this.year + this.month;
        }
        this.years = date;
        Handsontable.dom.addEvent(el, "click", function(event) {
          // arr.alter("remove_row", row);//删除当前行
          let tabledata = me.tableData;
          let datas = me.settings.data;
          let nid;
          datas.forEach((item, index) => {
            if (index === row) {
              nid = item.nid;
            }
          });
          //新增行的数据删除
          let rows;
          me.tableData.forEach((item, index) => {
            if (item.index === row) {
              rows = item;
              console.log(rows);
            }
          });
          let a = me.tableData;
          //融资情况表加一个删除的判断。针对保存之后会刷新来加的。
          let rzFlag = false;
          
          let deleteItems = ['4','5','6','7','8','10','11'];
          if((deleteItems.indexOf(me.templateId) != -1) && nid == null){
            rzFlag = me.deleteHandle(nid,row);
            if(rzFlag){
              return;
            }
          }
          if (nid != 0) {
            let data = {
              // company:me.company,
              // period:me.years,
              nid: nid,
              templateId: me.templateId
            };
            console.log("ee", row, data);
            me.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })

              .then(() => {
                
                // arr.alter("remove_row", row); //删除当前行
                del(data).then(res => {
                  console.log("删除", res);
                  if (res.data.code === 200) {
                    me.reportData(me.datas);
                    me.$message({
                      type: "success",
                      message: "删除成功!"
                    });
                  }
                });
              })
              .catch(() => {
                me.$message({
                  type: "info",
                  message: "已取消删除"
                });
              });
          } else {
            a.splice(a.indexOf(rows), 1);
            arr.alter("remove_row", row); //删除当前行
            console.log("删除后的数组", me.tableData);
          }
        });
      }
    },
    /**
     * 融资情况表填报的删除处理。
     */
    deleteHandle (nid,row) {
      let me = this,arrData = this.settings.data;
      let arrItem,flag = true;
      //暂时没有任何提示直接删除没有保存的数据。
      arrItem = arrData.filter((item,index) => {
        return index == row;
      });
      let $hot = this.$refs.hotTableComponent.hotInstance.alter("remove_row", row);
      return flag;
    },
    //应收账款分析表单元格下拉 把编码转成文字
    flagrenderer(instance, td, row, col, prop, value, cellProperties) {
      if (!value) {
        td.innerHTML = "";
        return;
      }
      if (/[\u4e00-\u9fa5]/.test(value)) {
        td.innerHTML = value;
        return;
      }
      let text = value;
      let datas = this.dataDict.filter(item => item.id === value);
      if (datas.length == 0) {
        td.innerHTML = "";
        return;
      } else {
        text = datas.length > 0 ? datas[0].text : value;
      }
      td.innerHTML = text;
    },
    //融资页面单元格下拉除机构名称的其他数据  把编码转成文字
    financingrenderer(instance, td, row, col, prop, value, cellProperties) {
      
      if (!value) {
        td.innerHTML = "";
        return;
      }
      if (/[\u4e00-\u9fa5]/.test(value)) {
        td.innerHTML = value;
        return;
      }
      let text = value;
      let datas = this.financing.filter(item => item.id === value);
      if (datas.length == 0) {
        td.innerHTML = "";
        return;
      } else {
        text = datas.length > 0 ? datas[0].text : value;
      }
      td.innerHTML = text;
    },
    //融资页面单元格融资类型下拉
    typeOfFinancing() {
      let source = [];
      let str = "",finanData = [];
      if(this.financingOptions && this.financingOptions.length > 0) {
        finanData = this.financingOptions.filter(item => {
          return item.isleaf == '1';
        });
      }
      finanData.forEach(item => {
        source.push(item.text);
        // if(item.isleaf == "1"){
        //   str = "&nbsp;&nbsp;&nbsp;&nbsp;";
        //   source.push(str + item.text);
        // }else {
        //   source.push(item.text);
        // }
      });
      return source;
    }
  }
};
</script>
<style scoped >
.manually_report {
  padding: 20px 10px;
  background-color: #ccc;
}
.table {
  margin-top: 70px;
  height: 100%;
}
.button,
.options {
  margin-top: 20px;
}
.template {
  float: left;
  margin-right: 20px;
}
.input {
  width: 220px;
}
.checkbox {
  display: block;
  color: #606266;
  font-size: 24px;
}
.dropdown {
  display: inline;
  color: #606266;
  font-size: 16px;
}
.underline {
  border: 1px solid #dcdfe6;
  width: 240px;
  margin-left: 10px;
  background-color: #f5f7fa;
}
.pleaseoptions {
  float: left;
  margin-left: 20px;
}
.el-icon_right {
  float: right;
  margin-right: 10px;
}
.right {
  float: right;
  margin-right: 100px;
  top: -2px;
  position: relative;
}
.left {
  display: inline-block;
  top: -2px;
  position: relative;
  margin-left: 40px;
}
/* .htInvalid {
  background-color: red;
} */
</style>
<style lang="scss">
.shuju {
  .el-checkbox + .el-checkbox {
    margin-left: 0px;
  }
  .el-dialog__body {
    padding: 10px 20px 30px 20px;
  }
  .el-button--text {
    color: #606266;
  }
  .el-form-item__label {
    text-align: left;
  }
  label {
    font-weight: normal;
    font-size: 16px;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    background-color: #ccc;
  }
  .el-tabs__item:hover,
  .el-tabs__item.is-active {
    font-weight: bold;
  }
  .handsontable .htDimmed {
    // background-color: #ccc;
    background-color: #fff;
    color: #222;
  }
  .handsontable td.htInvalid {
    background-color: transparent !important;
  }

  //   .el-input__inner {
  //     padding: 0px;
  //   }
  //   .el-input--suffix .el-input__inner {
  //     border: none;
  //   }
  //   .el-input__inner {
  //     background: transparent;
  //     &::placeholder {
  //       color: transparent;
  //     }
  //   }
  //   .el-cascader {
  //     background: transparent;
  //     height: 27px;
  //   }

  //   .el-cascader .el-icon-arrow-down {
  //     display: none;
  //   }
  //   .el-cascader__label {
  //     padding: 0px;
  //     background: transparent;
  //     opacity: 0;
  //     width: 100%;
  //     height: 100%;
  //   }
  //   .el-table__body .el-table__row td {
  //     padding: 4px 0;
  //   }
}
</style>