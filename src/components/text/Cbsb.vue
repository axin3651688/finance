<template>
  <div class="Cbsb">
    <el-row class="choice_title">选择消息接收人</el-row>
    <el-row>
      <el-col :span="3" v-for="(o,index) in showDatas" :key="o.id" class="role_add">
        <img v-if="o.avatar" :onerror="errorUserPhoto" @click="deleteData(index)" :src="o.avatar">
        <img v-else src="@a/avatar.jpg" class="img">
        <i class="iconfont icon-shanchuguanbicha2 item_img"></i>
        <div class="name">{{o.trueName}}</div>
      </el-col>
      <el-col :span="3" v-if="listLength>4" class="role_add">
        <i class="iconfont icon-more item_img"></i>
        <div class="name">共{{listLength}}人</div>
      </el-col>
      <el-col :span="3" class="role_add">
        <i @click.stop="ShowMeluList({isShow:true})" class="iconfont icon-jia item_imgadd"></i>
      </el-col>
    </el-row>
    <div class="input_title">消息内容</div>
    <el-input type="textarea" :rows="7" class="input" resize="none" v-model="textContent"></el-input>
    <el-button @click="sendMsg" type="primary" class="send01">发 送</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapActions, mapGetters } from "vuex";
import {
  companyContactList,
  SAVE_MODULE_MSG

} from "~api/interface";
export default {
  name: "Cbsb",
  components: {},
  props: {},
  data() {
    return {
      listDatas: [],
      userId: this.$store.getters.user.user.id,
      companyId: this.$store.getters.user.company.id,
      imgShow: "",
      textContent: this.textarea(),
      errorUserPhoto: 'this.src="' + require("@a/avatar.jpg") + '"'
    };
  },
  created() {
    debugger;
    console.log("我进来了");
    
    this.getMemberList(this.companyId,"this.companyIdthis.companyIdthis.companyIdthis.companyId");
  },
  computed: {
    ...mapGetters(["showMeluList"]),
    // 选中长度
    listLength() {
      return this.showMeluList.checkedItem.length;
    },

    // 选中的各位id
    userIds() {
      let ids = this.showMeluList.checkedItem.map(function(user) {
        return user.id;
      });
      let b = ids.join(",");
      return b;
    },
    /**
     * @desc    : 显示头像的数据，最多4个，多余的截取前四个
     * @returns {Object}
     * @author  : mj
     * @data    : 2019-01-25
     */
    showDatas() {
      let a = this.showMeluList.checkedItem;
      let b = a.length > 3 ? a.slice(0, 4) : a;
      return b;
    }
  },
  methods: {
    // 默认输入框文字
    textarea() {
      let company = this.$store.getters.showDialog.params.title;
      let time = `${this.$store.getters.year}年${this.$store.getters.month}月`;
      return time + company + "财务分析报告未及时上报，请上报！";
    },
    ...mapActions(["ShowMeluList", "ShowDialog"]),
    /**
     * @desc    : 请求下拉框的数据，装到vuex中
     * @param   {String} 公司ID
     * @author  : mj
     * @data    : 2019-01-25
     */
    getMemberList(companyId) {
      // 如果vuex已经有数据,那么将不再发请求,要不然每次点都会发
      if (this.showMeluList.data.length > 0) {
        return null;
      } else
        companyContactList(companyId).then(res => {
          let data = res.data.data.normal;
          console.log(data);
          this.ShowMeluList({ data: data });
          this.listDatas = data;
        });
    },
    deleteData(index) {
      // console.log("删除我", index);
      // 提交删除操作
      this.ShowMeluList({ deleteData: index });
    },
    /**
     * @desc    : 点击发送催报数据到后台
     * @author  : mj
     * @data    : 2019-01-25
     */

    sendMsg() {
      debugger;
      let datas = {
        action: 1,
        companyId: this.companyId,
        content: this.textContent,
        moduleId: 1,
        receiver: this.userIds,
        receiverId: 1,
        senderId: this.userId,
        type: 1
      };
      console.log(datas,"消息已经发送成功！");
      
      SAVE_MODULE_MSG(datas).then(res => {
        this.$message({
              message: "消息已经发送成功！",
              type: "success"
            });
        let data = res.data.data;
        // 清空所有内容,并关闭弹窗
            this.ShowMeluList({ deleteData: "deleteAll" });
            this.ShowDialog({ isShow: false });      
      }).catch(res => {
            // 清空所有内容,并关闭弹窗
            this.ShowMeluList({ deleteData: "deleteAll" });
            this.ShowDialog({ isShow: false });
          });;
    }
  }
};
</script>
<style lang="scss" scoped>
.send01 {
    width: 80px;
    position: relative;
    bottom: -13px;
    left: 541px;
}
</style>



