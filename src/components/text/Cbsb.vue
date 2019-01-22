<template>
  <div class="page">
    <span class="demonstration">click 激活</span>
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        下拉菜单
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item>双皮奶</el-dropdown-item>
        <el-dropdown-item>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
    <el-button type="primary">发 送</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from "vuex";
import { companyContactList } from "~api/userClientRest";
export default {
  name: "Cbsb",
  components: {},
  props: {},
  data() {
    return {
      textarea: ""
    };
  },
  created() {
    this.getMemberList();
    debugger;
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    getMemberList() {
      let companyId = this.user.company.id;
      companyContactList(companyId).then(res => {
        console.log(res.data.data.normal);
      });
    }
  }
};
</script>

