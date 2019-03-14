<template>
  <div class="navMenu" :class="state? '':navLevel">
    <label v-for="navMenu in navMenus" :key="navMenu.code">
      <!--只有一级菜单-->
      <!-- :disabled="disabled"  -->
      <el-tooltip class="item" effect="light" placement="right">
        <div slot="content">{{navMenu.text}}</div>
        <el-menu-item
          v-if="navMenu.leaf==1"
          :key="navMenu.code"
          :data="navMenu"
          :index="navMenu.code"
          @click="shownavMenu(navMenu)"
        >
          <!--图标-->
          <!-- <router-link :to="navMenu.url"> -->
          <img
            :src="navMenu.avatar"
            v-if="navMenu.level===2 && state"
            class="avatarleft fa-margin iconfont"
          >
          <!--标题-->
          <span slot="title" class="eachItem">{{navMenu.text}}</span>
          <!-- </router-link> -->
        </el-menu-item>
      </el-tooltip>
      <!--有多级菜单-->
      <el-submenu v-if="navMenu.leaf==0" :key="navMenu.code" :data="navMenu" :index="navMenu.code">
        <template slot="title">
          <img
            :src="navMenu.avatar"
            v-if="navMenu.level===2 && state"
            class="avatarleft fa-margin iconfont"
          >
          <span>{{navMenu.text}}</span>
        </template>
        <!--递归组件，把遍历的值传回子组件，完成递归调用-->
        <nav-menu :navMenus="navMenu.children" :state="toState"></nav-menu>
      </el-submenu>
    </label>
  </div>
</template>
 
<script>
import { mapGetters, mapActions } from "vuex";
import modeHandle from "utils/modeHandle";
export default {
  name: "NavMenu", //使用递归组件必须要有
  props: ["navMenus", "state","rootLevel"], // 传入子组件的数据
  computed: {
    ...mapGetters(["device", "user"])
  },
  data() {
    return {
      navLevel: "navLevel",
      toState: this.state
    };
  },
  created() {
    let me = this;
  },
  methods: {
    ...mapActions(["ToggleSideBar"]),
    classHandle () {
      
    },
    shownavMenu(e) {
      let flag = this.lookNodeOfCompany(e);
      if(!flag){
        return;
      }
      if (this.device === "mobile") {
        this.ToggleSideBar({ opend: false });
      } else if (e.url.indexOf(".json") > 0 || Cnbi.isEmpty(e.url)) {
        this.$router.push("/main");
        this.$store.public
          ? (this.$store.public.url = e.url)
          : (this.$store.public = { url: e.url });
        modeHandle(e);
      } else {
        this.$router.push({ path: e.url });
      }
    },
    lookNodeOfCompany(e) {
      let me = this,companyId = this.$store.getters.company,treeInfo = this.$store.getters.treeInfo,
          userCompany = this.$store.getters.userCompany;
      let flag = true;
      let arrUrl = ["/sgyj","/cnbi/json/source/tjsp/xsqydkdbqk.json","/cnbi/json/source/tjsp/xsqydydkqk.json"],contiFlag = false;
      for(let i = 0;i < arrUrl.length;i ++){
        let item = arrUrl[i];
        if(e.url == item){
          contiFlag = true;
          break;
        }
      }
      if(!contiFlag){
        return flag;
      }
      if(companyId == treeInfo.scode){
        if(treeInfo.spcode != 0){
          me.$message({
            showClose: true,
            message: '此公司没有查看此报表的权限！',
            type: 'warning'
          });
          flag = false;
          return flag;
        }
      }else if(companyId == userCompany.customerId && companyId != "1001"){
        me.$message({
          showClose: true,
          message: '此公司没有查看此报表的权限！',
          type: 'warning'
        });
        flag = false;
        return flag;
      }
      return flag;
    }
  }
};
</script>
<style scoped>
/* :class="state? navLevelHide:navLevel" */
.navLevel {
  margin-left: -20px;
}
.navLevelHide {
  margin-left: 20px;
}
</style>

