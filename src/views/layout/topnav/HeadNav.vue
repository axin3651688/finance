<template>
  <header class="head-nav">
    <hamburger
      :toggle-click="ToggleSideBar"
      :is-active="sidebar.opened"
      class="hamburger-container"
    />
    <div class="topcontent">
      <span @click="showDilog" v-if="showDims.company">
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

      <el-dropdown trigger="click" v-if="showDims.year">
        <el-button type="text">
          <i class="el-icon-date iconclass shuxian"></i>
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
      <el-dropdown trigger="click" v-if="showDims.month">
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
        <el-button type="text" class="underline">
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
    <el-dialog
      custom-class="info-dialog"
      :visible.sync="isShow"
      v-if="isShow"
      :modal-append-to-body="false"
    >
      <div class="img-box">
        <!-- <img src="../../../assets/infoshow.png"> -->
        <img src="../../../assets/123.png"> <!-- zdk 加的 -->
      </div>
      <el-row class="row-bg">
        <div class="user">
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
      <el-button @click="isShow = false" class="btn-primary">关闭</el-button>
    </el-dialog>
  </header>
</template>

<script>
import Hamburger from "@v/layout/sidebar/Hamburger";
import { mapGetters, mapActions } from "vuex";
import CompanyTree from "@v/common/CompanyTree";
import { getClientParams } from "utils/index";
import { logout } from "~api/interface.js";
export default {
  name: "Headnav",
  data() {
    return {
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
    CompanyTree
  },
  created() {
    this.value = this.year + this.month + this.date;
    console.log(this.value);
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
    this.months = [];
    for (let i = 1; i <= this.monthCount; i++) {
      if (this.monthCount == 4) {
        this.months.push(i + "季度");
      } else if (this.monthCount >= 12) {
        if (i < 13) {
          this.months.push(i + "月");
        } else if (i < 17) {
          this.months.push(this.monthCount + 1 - i + "季度");
        }
      }
    }
  },
  mounted() {},
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

  methods: {
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
      // console.log("a:", e);
      this.treeInfo = e;
      this.companyId = typeof e.id == "string" ? e.id : e.customerId;
      this.companyName_cache = e.text;
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
    }
  }
};
</script>
<style lang="scss">
.head-nav {
  .button {
    padding: 7px 20px !important;
  }
}
</style>
