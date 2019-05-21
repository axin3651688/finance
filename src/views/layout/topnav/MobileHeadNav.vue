<template>
  <div class="MobileHeadNav">
    <div class="topcontent">
      <div @click="showDilog" v-if="showDims.company">
        <span class="title">公司选择:</span>
        <el-button type="text" class="underline">{{companyName}}</el-button>
      </div>

      <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="false" v-dialogDrag>
        <span slot="title" class="dialog-title">
          <span>选择公司</span>
          <el-input placeholder="输入关键字搜索" v-model="filterText"></el-input>
        </span>
        <companyTree @click="getname" :filterText="filterText"/>
        <span slot="footer" class="dialog-footer"></span>
      </el-dialog>
      <div>
        <el-dropdown trigger="click" v-if="showDims.year">
          <el-button type="text">
            <span class="title">日期选择:</span>
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
      </div>

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
    </div>
    <!-- <i class="iconfont icon-liebiao1 img" @click.stop="openHead"></i> -->
  </div>
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
      flag: "",
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
      ],
      filterText: ""
    };
  },
  components: {
    Hamburger,
    CompanyTree
  },
  created() {
    // console.log("vvv",this.user.company.id)
    this.value = this.year + this.month + this.date;
    // console.log(this.value);
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
        if (i <= 13) {
          this.months.push(i + "月");
        } else if (i < 17) {
          this.months.push(this.monthCount + 1 - i + "季度");
        }
      }
    }
    debugger;
    //判断客户端
    if(this.device == "mobile"){
      this.showDims.company = false;
    }

  },
  mounted() {},
  computed: {
    ...mapGetters([
      "user",
      "device",
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
  watch:{
    showDims (newValue,oldValue) {
      debugger;
    }
  },
  methods: {
    openHead() {
      this.flag = !this.flag;
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
      this.GetSideMid({
        company: typeof e.id == "string" ? e.id : e.customerId,
        companyName: e.text
      });
      this.GettRreeInfo(e);
      this.dialogVisible = false;
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
    sayhidden() {
      this.isShow = true;
    }
  }
};
</script>



