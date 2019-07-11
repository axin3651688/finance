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
    ...mapGetters(["device", "user","showDims"])
  },
  data() {
    return {
      navLevel: "navLevel",
      toState: this.state
    };
  },
  created() {
    let me = this;
    let navmenuCall = JSON.parse(localStorage.getItem("navmenuCall"));
    if(navmenuCall)me.hideDims(navmenuCall);
    // console.log(this.navMenus);

  },
  /**
   * 组件生成之后的回调
   */
  mounted() {
    // //缓存中的侧边栏的内容。
    // let siderState = JSON.parse(localStorage.siderState);
    // if(siderState){
    //   this.$refs.leftMenu.open(siderState.pid);
    //   // this.handleOpen(siderState.code,[siderState.pid + ""])
    // }
  },
  methods: {
    ...mapActions(["ToggleSideBar"]),
    /**
     * 如果是系统设置下的节点就隐藏导航栏的单位切换。
     * @author szc 2019年4月9日15:43:44
     */
    hideDims (e) {
      let arr = ['8'];
      if(arr.indexOf(e.pid) == -1){
        return;
      }
      let companyFlag = false;
      if(e.code == "802"){
        companyFlag = true;
      }
      let me = this,showDims = this.showDims;
      showDims.conversion = false;
      showDims.year = false;
      showDims.month = false;
      showDims.company = companyFlag;
      showDims.day = false;
    },
    /**
     * 关闭抽取的提示框
     * @author szc 2019年4月19日14:22:11
     */
    closeMessageOfExtra () {
      if(this.$store.extraMessage){
        let extraMessage = this.$store.extraMessage;
        extraMessage.close();
        delete this.$store.extraMessage;
      }
    },
    /**
     * 有时会添加一些东西在状态管理中，所以这个地方可以进行删除、或者别的操作。
     * @author szc 2019年4月1日16:11:42
     */
    changeBefore(e){
      // debugger;
      let me = this;
      //删除十三个月的问题
      me.$store.monthConfig? delete me.$store.monthConfig:"";
      let monthId = this.$store.getters.month;
      if(monthId == 13){
        this.$store.dispatch("GetSideMid", {month:12});
      }
      //季度年度的判断。
      if(typeof(monthId) == "string" && (monthId.indexOf("Q") != -1 || monthId.indexOf("年") != -1)){
        this.$store.dispatch("GetSideMid", {month:12});
      }
      //如果是系统设置下的节点就隐藏导航栏的切换。
      this.hideDims(e);
      //处理抽取的成功之后的提示，自动关闭。
      this.closeMessageOfExtra();
    },
    shownavMenu(e) {
      localStorage.removeItem("navmenuCall");
      localStorage.setItem("navmenuCall",JSON.stringify(e));
      //在此加一个页面上面的title。2019年3月26日11:47:15 szc
      document.title = e.text;
      // //把地址传到vuex对象中监听。此时没有什么作用，在此注释掉。
      // let siderState = {openPid:e.pid};
      // this.$store.dispatch("setSiderState", siderState);
      //在此把点击的节点放到缓存中。
      let siderState = JSON.stringify(e);
      localStorage.setItem("siderState",siderState);
      //因为后面会从缓存中取这个东西，所以手动改变一下，不然请求的不是想要的。
      if(e && e.url){
        localStorage.setItem("module_api_cache",e.url);
      }
      //点击之前要进行的操作。
      this.changeBefore(e);
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
      // if(companyId == treeInfo.scode){
      //   if(treeInfo.spcode != 0){
      //     me.$message({
      //       showClose: true,
      //       message: '此公司没有查看此报表的权限！',
      //       type: 'warning'
      //     });
      //     flag = false;
      //     return flag;
      //   }
      // }
      // else if(companyId == userCompany.customerId && companyId != "1001"){
      //   me.$message({
      //     showClose: true,
      //     message: '此公司没有查看此报表的权限！',
      //     type: 'warning'
      //   });
      //   flag = false;
      //   return flag;
      // }
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

