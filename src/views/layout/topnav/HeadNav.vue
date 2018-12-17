<template>
  <header class="head-nav">
    <hamburger
      :toggle-click="ToggleSideBar"
      :is-active="sidebar.opened"
      class="hamburger-container"
    />
    <div class="topcontent">
      <span @click="showDilog" class="choosecompany">
        <i class="el-icon-search iconclass"></i>
        <el-button type="text" class="underline">{{companyName}}</el-button>
      </span>

      <el-dialog title="选择公司" :visible.sync="dialogVisible" :modal-append-to-body="false">
        <companyTree @click="getname"/>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleQoose">确 定</el-button>
        </span>
      </el-dialog>

      <i class="el-icon-date iconclass"></i>
      <el-dropdown trigger="click">
        <el-button type="text" class="underline">
          {{year+"年"}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item,index) of years"
            :key="index"
            @click.native="GetSideMid({year:item.substring(0, 4)})"
          >{{item}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <!-- <el-date-picker
        class="year_month"
        v-model="value4"
        type="month"
        :editable="false"
        placeholder="请选择年、月"
        format="yyyy 年 ▾ ― MM 月 ▾"
      ></el-date-picker>-->
      <el-dropdown trigger="click">
        <el-button type="text" class="underline">
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
      <!-- 消息提醒 -->
      <el-badge :value="12">
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
    <el-dialog width="30%" :visible.sync="isShow" v-if="isShow" :modal-append-to-body="false">
      <infoshow></infoshow>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">关闭</el-button>
      </span>
    </el-dialog>
  </header>
</template>

<script>
import Hamburger from "@v/layout/sidebar/Hamburger";
import { mapGetters, mapActions } from "vuex";
import CompanyTree from "@v/common/CompanyTree";
import Infoshow from "./UserInfo";
import { getClientParams } from "utils/index";
export default {
  name: "Headnav",
  data() {
    return {
      value4: "",
      companyId: "",
      companyName_cache: "",
      isShow: false,
      dialogVisible: false,
      isCollapse: true,
      inputCompany: "",
      chooseYear: "",
      chooseMoth: "",
      yearCount:4,
      monthCount:12,//[4,12,16]
      years: [],
      months: []
    };
  },
  components: {
    Hamburger,
    CompanyTree,
    Infoshow
  },
  created(){
      let bean = getClientParams();
      if(bean.yearCount && bean.yearCount > 0 ){
         this.$set(this, "yearCount",bean.yearCount);
      }
      this.years = [];
      let year = new Date().getFullYear();
      for(let i= year;i> year-this.yearCount;i--){
          this.years.push(i+"年");
      }
      if(bean.monthCount && bean.monthCount > 0 ){
         this.$set(this, "monthCount",bean.monthCount);
      }
      this.months = [];
      for(let i=1;i<=this.monthCount;i++){
        if(this.monthCount == 4){
             this.months.push(i+"季度");
        }else if(this.monthCount >= 12){
             if(i < 13){
                    this.months.push(i+"月"); 
             } else if(i<17){
                this.months.push((this.monthCount+1-i)+"季度"); 
             }
        }
      
      }
  },
  computed: {
    ...mapGetters([
      "user",
      "sidebar",
      "userCompany",
      "year",
      "month",
      "company",
      "companyName"
    ])
  },
  mounted() {
    // console.log(this.user);
    // let api = "/json/source/jsnk/zczefdtjb.json";
    // this.axios.get(api).then(response => {
    //   console.log(response.data);
    // });
  },
  methods: {
    ...mapActions([
      "ToggleSideBar",
      "ReWrightName",
      "updataCountAsync",
      "GetSideMid"
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
    showInfoList() {
      this.$router.push("/infoshow");
    },
    getname(e) {
      //   console.log(e);
      this.companyId = e.id;
      this.companyName_cache = e.text;
    },
    showDilog() {
      this.dialogVisible = true;
    },
    logout() {
      // 清除token
      localStorage.removeItem("authorization");
      localStorage.removeItem("database");
      this.$store.dispatch("clearCurrentState");
      this.$router.push("/login");
    },
    // 公司点击确定事件
    handleQoose() {
      //   console.log(this.company);
      //   console.log(this.companyName);
      //   点击确定,把子组件选择的id,neme存到Vuex中
      this.GetSideMid({ company: this.companyId });
      this.GetSideMid({ companyName: this.companyName_cache });
      this.dialogVisible = false;
    },
    sayhidden() {
      this.isShow = true;
    }
  }
};
</script>
<style lang='scss'>
// .head-nav {
//   .year_month {
//     position: relative;
//     .el-input__inner {
//       border: 0px;
//       font-size: 16px;
//     }
//     .el-input__prefix {
//       color: #000;
//     }
//   }
// }
</style>