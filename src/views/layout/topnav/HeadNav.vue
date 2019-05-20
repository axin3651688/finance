<template>
<div>
  <header class="head-nav">
    <hamburger
      :toggle-click="ToggleSideBar"
      :is-active="sidebar.opened"
      class="hamburger-container"
    />
    <div class="topcontent">
        <div style="display:inline-block;">
            <span @click="showDilog" v-if="showDims.company" style="display:inline-block;">
                <!-- <i class="el-icon-search iconclass"></i> -->
                <el-tooltip :content="companyName" placement="bottom" effect="light">
                  <el-button type="text" class="underline">{{companyName}}</el-button>
                </el-tooltip>
            </span>
        </div>
      <el-dialog title="选择公司" :visible.sync="dialogVisible" :modal-append-to-body="false">
        <companyTree @click="getname"/>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleQoose">确 定</el-button>
        </span>
      </el-dialog>

      <el-dropdown trigger="click" v-if="showDims.year">
        <el-button type="text">
          <!-- <i class="el-icon-date iconclass shuxian"></i> -->
          <span class="underline">
            {{year+"年"}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item,index) of years"
            :key="index"
            @click.native="GetSideMid({year:item.substring(0, 4)})"
          >{{item}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown trigger="click" v-if="showDims.month" @visible-change="dropChange">
        <el-button type="text" class="monthUnderline">
          {{month+"月"}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item,index) of months"
            :key="index"
            @click.native="GetSideMid({month:item.substr(0, item.length - 1)})"
          >{{item}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!--  -->
      <!-- 日  日历 -->
      <el-date-picker
        v-if="showDims.day"
        v-model="value"
        @change="logTimeChange"
        type="date"
        placeholder="选择日期"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd"
      ></el-date-picker>
      <!-- 单位 -->
      <el-dropdown trigger="click" v-if="showDims.conversion">
        <el-button type="text" class="monthUnderline">
          {{conversion.text}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item,index) of unit"
            :key="index"
            @click.native="GetSideMid({conversion:item})"
          >{{item.text}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 消息提醒 -->
      <el-badge :value="messageValue" @click.native="messageHandle">
        <i class="el-icon-bell iconclass"></i>
      </el-badge>
      <span class="username">
        <!-- 下啦箭头 -->
        <el-dropdown trigger="click" @command="setDialogInfo">
          <span class="dropdown">
            <img :src="user.user.avatar" alt class="avatar">
            <span class="name">{{user.user.trueName}}</span>
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" class="headlistUp">
            <el-dropdown-item command="info">
              <i class="info"></i>
              <span @sayhidden="sayhidden">个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item command="info">
              <i class="manage"></i>
              <span>管理互动</span>
            </el-dropdown-item>
            <el-dropdown-item command="info">
              <i class="about"></i>
              <span>关于软件</span>
            </el-dropdown-item>
            <el-dropdown-item command="info" class="icon-bottom">
              <i class="help"></i>
              <span>帮助</span>
            </el-dropdown-item>
            <el-dropdown-item command="logout">
              <i class="logout"></i>
              <span>退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
    </div>
    <el-dialog
      custom-class="info-dialog"
      :visible.sync="isShow"
      v-if="isShow"
      :modal-append-to-body="false"
    >
      <div class="img-box"></div>
      <el-row class="row-bg" style="text-align:center">
        <div class="user">
          <!-- :http-request="uploadAvar" -->
          <!-- <el-upload
            class="avatar-uploader"
            action="avar/upload/avar"
            :data="{suser:'szc'}"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="true" :src="user.user.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <!-- <div v-if="true" slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1MB</div> -->
          <!--</el-upload> -->
          <img :src="user.user.avatar" class="avatar">
        </div>
        <div class="user-item">
          <div class="item">
            <i>姓名:</i>
            <span>{{user.user.trueName}}</span>
          </div>
          <div class="item">
            <i>邮箱:</i>
            <span>{{user.user.email}}</span>
          </div>
          <div class="item">
            <i>电话:</i>
            <span>{{user.user.phone}}</span>
          </div>
        </div>
      </el-row>
      <!-- <el-button @click="isShow = false" class="btn-primary">关闭</el-button> -->
    </el-dialog>
  </header>
  <div class="messageCtn">
    <SRModal v-if="true" v-on:checkfilldata="checkFillDataHandle" :modalConfig.sync="modalConfig"></SRModal>
  </div>
</div>
</template>

<script>
import Hamburger from "@v/layout/sidebar/Hamburger";
import { mapGetters, mapActions } from "vuex";
import CompanyTree from "@v/common/CompanyTree";
import { getClientParams } from "utils/index";
import { logout } from "~api/interface.js";
import SRModal from "@v/intelligenceReport/SRModal";
import request from 'utils/http'
import {
  smallBell,
  smallBellCount,
  editStateOfMessage,
  ageeReturn
} from "@/api/fill.js"
export default {
  name: "Headnav",
  data() {
    return {
      modalConfig:{},//审阅展示的modal配置
      messageValue:1,//消息数
      // avarUrl:"",
      companyId: "",
      companyName_cache: "",
      treeInfo: {},
      isShow: false,
      dialogVisible: false,
      isCollapse: true,
      yearCount: 4,
      monthCount: 12, //[4,12,16]
      years: [],
      months: [],
      value: "",
      y: [],
      m: [],
      day: [],
      unit: [
        { id: 1, text: "元" },
        { id: 1000, text: "千元" },
        { id: 10000, text: "万元" },
        { id: 100000000, text: "亿元" }
      ]
    };
  },
  components: {
    Hamburger,
    CompanyTree,
    SRModal
  },
  created() {
    //头像图片显示。
    // let userCng = this.$store.getters.user.user;
    // this.avarUrl = userCng.avarUrl? userCng.avarUrl:userCng.avatar;
    this.value = this.year + this.month + this.date;
    let bean = getClientParams();
    if (bean.yearCount && bean.yearCount > 0) {
      this.$set(this, "yearCount", bean.yearCount);
    }
    this.years = [];
    let year = new Date().getFullYear();
    for (let i = year; i > year - this.yearCount; i--) {
      this.years.push(i + "年");
    }
    if (bean.monthCount && bean.monthCount > 0) {
      this.$set(this, "monthCount", bean.monthCount);
    }
    //用来区分配置的月的个数的显示。
    if(this.$store.monthConfig && this.$store.monthConfig.value){
      let monthConfig = this.$store.monthConfig,monthValue = monthConfig.value;
      this.$set(this, "monthCount", monthValue);
    }
    this.months = [];
    for (let i = 1; i <= this.monthCount; i++) {
      if (this.monthCount == 4) {
        this.months.push(i + "季度");
      } else if (this.monthCount >= 12) {
        if (i <= 13) {
          this.months.push(i + "月");
        } else if (i < 17) {
          this.months.push(this.monthCount + 1 - i + "季度");
        }
      }
    }
  },
  /**
   * 页面加载之后的回调。
   */
  mounted() {
    let me = this;
    // debugger;
    //看看缓存中是否有公司，名称放上去。
    let treeInfo = localStorage.treeInfo;
    treeInfo? treeInfo = JSON.parse(treeInfo):treeInfo = this.$store.getters.treeInfo;
    if(treeInfo && treeInfo.codename){
      // this.companyName = treeInfo.text;
      this.GetSideMid({
        company: treeInfo.scode,
        companyName: treeInfo.codename
      });
    }
    // let interval = setInterval(() => this.getMessage(),10000);
    // this.interval = interval;
  },
  computed: {
    ...mapGetters([
      "user",
      "sidebar",
      "userCompany",
      "year",
      "month",
      "company",
      "companyName",
      "showDims",
      "date",
      "conversion"
    ])
  },
  // watch: {
  //   monthCount () {
  //     debugger;
  //     let me = this;

  //   }
  // },
  methods: {
    
    handleAvatarSuccess (e) {
      if(e && e.data.code == 200){
        //因为有一个地方设置的是缓存的内容，所以这边统一一下，缓存的内容，不然的话，找不到会报错。
        let database = JSON.parse(localStorage.database);
        database.user.avatar = e.data.data;
        this.$store.dispatch("setUser", database);
        // let userCurrent = this.$store.state.user.user.user;
        // userCurrent.avatar = e.data.data;
        // this.$store.dispatch("setUser", userCurrent);
        // this.$store.state.user.user.user.avatar = e.data.data;
      }else{
        this.$message.error('上传头像出错！');
      }
    },
    beforeAvatarUpload(file){
      let me = this;
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过1MB!');
      }
      return isLt2M;

    },
    //隐藏与显示的回调
    dropChange (flag,dd) {
      let me = this,monthConfig = this.$store.monthConfig;
      if(flag){
        this.changeBecauseOfNode();
      }
    },
    changeBecauseOfNode(){
      let me = this;
      let bean = getClientParams();
      if (bean.monthCount && bean.monthCount > 0) {
        this.$set(this, "monthCount", bean.monthCount);
      }
      //用来区分配置的月的个数的显示。
      if(this.$store.monthConfig && this.$store.monthConfig.value){
        let monthConfig = this.$store.monthConfig,monthValue = monthConfig.value;
        this.$set(this, "monthCount", monthValue);
      }else {
        //设置一个默认的月份
        this.$set(this, "monthCount", 12);
      }
      this.months = [];
      for (let i = 1; i <= this.monthCount; i++) {
        if (this.monthCount == 4) {
          this.months.push(i + "季度");
        } else if (this.monthCount >= 12) {
          if (i <= 13) {
            this.months.push(i + "月");
          } else if (i < 17) {
            this.months.push(this.monthCount + 1 - i + "季度");
          }
        }
      }
    },
    // 日期
    logTimeChange(val) {
      this.y = val.slice(0, 4);
      this.m = val.slice(5, 7);
      this.day = val.slice(8, 10);
      this.GetSideMid({ year: this.y, month: this.m, date: this.day });
      console.log(this.day);
      // console.log(val)
    },
    ...mapActions([
      "ToggleSideBar",
      "ReWrightName",
      "updataCountAsync",
      "GetSideMid",
      "GettRreeInfo"
    ]),
    setDialogInfo(cmdItem) {
      //    console.log(cmdItem)
      switch (cmdItem) {
        case "info":
          this.isShow = true;
          //   this.showInfoList();
          break;
        case "logout":
          this.logout();
          break;
      }
    },
    getname(e) {
      console.log("a:", e);
      this.treeInfo = e;
      // this.companyId = typeof e.id == "string" ? e.id : e.customerId;
      this.companyId = typeof e.scode == "string" ? e.scode : "";
      // console.log(this.companyId);
      // this.companyName_cache = e.text;codename
      this.companyName_cache = e.codename;
    },
    showDilog() {
      this.dialogVisible = true;
    },
    logout() {
      // todo备以后用,先不删
      // localStorage.removeItem("database");
      // this.$store.dispatch("clearCurrentState");
      logout()
        .then(res => {
          // console.log(res.data.msg);
          // 清除token
          localStorage.removeItem("authorization");
          this.$router.push("/login");
        })
        .catch(res => {
          console.error("退出请求失败");
          // localStorage.removeItem("authorization");
          // this.$router.push("/login");
        });
    },
    // 公司点击确定事件
    handleQoose() {
      //   点击确定,把子组件选择的id,neme存到Vuex中
      this.GetSideMid({
        company: this.companyId,
        companyName: this.companyName_cache
      });
      this.GettRreeInfo(this.treeInfo);
      this.dialogVisible = false;
    },
    sayhidden() {
      this.isShow = true;
    },
    /**
     * 获取消息提示框的数据内容。
     * @author szc 2019年4月2日19:28:10
     */
    getMessage(){
      let me = this,suser = this.$store.getters.user.user.userName,router = me.$router;
      request({
        url: '/zjb/sys/Msg/query_nolook_count?user=' + suser,
        method: 'get',
        validateStatus: function(status) {
            if (status == 999) {
              window.clearInterval(me.interval);
              me.relanding();
            }else if(status == 911) {
              me.$message({
                message:"用户未登录！",
                type:"warning"
              });
              window.clearInterval(me.interval);
              router.push("/login");
            }else if (status == 912) {
              window.clearInterval(me.interval);
              me.dropLine();
            }
            return status; // 默认的
        },
      }).then(res => {
        if(res.data.code == 200){
          this.messageValue = res.data.data;
        }
      });
      // smallBellCount.call(me,suser).then(res => {
      //   debugger;
      //   if(res.data.code == 200){
      //     console.log("ddddddd",res.data);
      //     this.messageValue = res.data.data;
      //   }else if (res.data.code == 999) {
      //     me.relanding();
      //   }
      // });
    },
    /**
     * 掉线操作。
     * @author szc 2019年5月15日09:22:57
     */
    dropLine () {
      let me = this;
      this.$confirm('你的账号长时间没有操作，已掉线，需要重新登录！', '提示', {
        confirmButtonText: '确定',
        // cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        me.$router.push("/login");
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '出错了！！！'
        });          
      });
    },
    /**
     * 重新登录
     */
    relanding () {
      let me = this;
      this.$confirm('你的账号已在别处登录，如非本人操作可能你的账号信息已泄露，请修改密码，重新登录！', '提示', {
        confirmButtonText: '确定',
        // cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        me.$router.push("/login");
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '出错了！'
        });          
      });
    },
    /**
     * 点击消息展示上报的表的条目内容信息。
     * @author szc 2019年4月2日20:12:14
     */
    messageHandle () {
      debugger
      let me = this,storeParams = me.$store.getters;
      if(this.messageValue == 0){
        this.$message({
          message:"暂无消息！",
          type:"warning"
        });
        return;
      };
      let params = {
        pageNum:0,
        pageSize:20,
        account:storeParams.user.user.userName
      };
      smallBell(params).then(res => {
        debugger;
        if(res.data.code == 200){
          // console.log("ddddddd",res.data);
          this.showCkeckContent(res.data.data);
        }
      });
      // this.axios.get("/cnbi/json/source/tjsp/szcJson/messageContent.json").then(res => {
      //   if(res.data.code == 200){
      //     this.showCkeckContent(res.data.data);
      //   }else {
      //     this.$message.error("请求出错！");
      //   }
      // });
    },
    /**
     * 展示审阅内容的配置。
     * @author szc 2019年4月2日20:22:36
     */
    showCkeckContent (data) {
      let me = this;
      this.modalConfig = {
        title:"报表审阅",//modal框标题
        rowListener:"checkfilldata",//事件监听方法名
        dialogVisible:true,
        width:"70%",
        type:"s-table",//要显示的类型
        id:'userReport',//modal框的id
        datas: {
          tHeader:[
            {
              prop:"sfromuser",
              label:"上报人"
            },
            {
              prop:"stouser",
              label:"接收人"
            },
            {
              prop:"screatetime",
              label:"上报时间"
            },
            {
              prop:"scontent",
              label:"上报内容"
            },
            {
              prop:"operation",
              label:"操作"
            }
          ],
          datas:data.datas
        },
        footConfig:{
          footBtn:false
        }
      }
    },
    /**
     * 查看点击行所在的报表，审阅。
     * @author szc 2019年4月3日14:38:13
     */
    checkFillDataHandle (rowData,sign) {
      debugger;
      let me = this,id = rowData.id;
      let params = {
        id:id
      };
      if(sign){
        if(sign == "agree"){
          me.ageeOrNoReturnHandler(rowData,true);
        }else if(sign == "noAgree") {
          me.ageeOrNoReturnHandler(rowData,false);
        }else if(sign == "unread") {
          editStateOfMessage (params).then(res => {
            if(res.data.code == 200){
              rowData.sislook = 'Y';
              me.$message({
                message:"操作成功！",
                type:"success"
              });
            }else {
              me.$message.error(res.data.data);
            }
          });
        }
      }
      // editStateOfMessage (params).then(res => {
      //   if(res.data.code == 200){
      //     me.$message({
      //       message:"修改成功！",
      //       type:"success"
      //     });
      //   }else {
      //     me.$message.error(res.data.data);
      //   }
      // });
    },
    /**
     * 同意申请退回。
     * @author szc 2019年5月10日20:40:42
     */
    ageeOrNoReturnHandler (rowData,flag) {
      debugger;
      let me = this,storeParams = me.$store.getters,statemun = 4;
      statemun = flag? 4:3;
      let params = {
        supdateuser:storeParams.user.user.userName,
        nreportnum:0,
        supdatetime:new Date(),
        statemun:statemun,
        id:rowData.sinfoid,
        flag:flag
      };
      ageeReturn (params).then(res => {
        if(res.data.code == 200) {
          let resParams = {
            pageNum:0,
            pageSize:20,
            account:storeParams.user.user.userName
          },
          msgParams = {
            id:rowData.id
          };
          editStateOfMessage(msgParams).then(res => {
            if(res.data.code == 200){
              smallBell(resParams).then(res => {
                if(res.data.code == 200){
                  me.modalConfig.datas.datas = res.data.data.datas;
                }
              });
            }
          });
          // me.$message({
          //   message:res.data.data,
          //   type:"success"
          // });
        }
      });
    },
    /**
     * 不同意申请退回。
     * @author szc 2019年5月10日20:52:17
     */
    noAgeeReturnHandler (rowData) {

    }
  }
};
</script>
<style lang="scss">
  //消息弹出框的表头样式
  .messageCtn {
    .el-table {
      height: 100%;
      max-height: 400px;
    }
  }
</style>
<style lang="scss" scoped>
  .user {
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
  
</style>