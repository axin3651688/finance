<template>
  <div class="Cbsb">
    <el-row class="choice_title">退回消息人</el-row>
    <el-row>
      <el-col :span="3" class="role_bgch">
        <img v-if="useInfo.avatar" :onerror="errorUserPhoto" :src="useInfo.avatar">
        <img v-else src="@a/avatar.jpg" class="img">
        <div class="name">{{useInfo.trueName}}</div>
      </el-col>
    </el-row>
    <div class="input_title">消息内容</div>
    <el-input
      type="textarea"
      :rows="7"
      placeholder="请输入内容"
      class="input"
      resize="none"
      v-model="textarea"
    ></el-input>
    <el-button @click="sendMsg" type="primary" class="send">发 送</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapActions, mapGetters } from "vuex";
import {
  ACK_MODULE_MSG,
  SAVE_MODULE_MSG,
  FIND_USER_ACCOUNT
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
      useInfo: {},
      // lockeduser: this.$store.getters.showDialog.params.lockeduser,
      errorUserPhoto: 'this.src="' + require("@a/avatar.jpg") + '"'
    };
  },
  created() {
    this.getUseInfo(this.lockeduser);
  },
  computed: {
    ...mapGetters(["showMeluList"]),
    // 默认输入框文字
    textarea() {
      let company = this.$store.getters.showDialog.params.title;
      let time = `${this.$store.getters.year}年${this.$store.getters.month}月`;
      let data = "您的【" + time + company + "】报告存在问题，请重新编辑！";
      return data;
    },
    lockeduser() {
      return this.$store.getters.showDialog.params.lockeduser;
    }
  },
  watch: {
    lockeduser: function(val) {
      this.getUseInfo(val);
    }
  },
  methods: {
    ...mapActions(["ShowDialog"]),
    /**
     * @desc    : 根具变化值返回用户整个信息
     * @param   {String} 用户名
     * @returns {Object}
     * @author  : mj
     * @data    : 2019-02-20
     */
    getUseInfo(use) {
      FIND_USER_ACCOUNT(use).then(res => {
        console.log(res.data.data);
        this.$set(this, "useInfo", res.data.data);
      });
    },
    /**
     * @desc    : 点击发送催报数据到后台
     */

    sendMsg() {
      let datas = {
        action: 3, //1：催上报，2：上报通知，3：退回通知，4：修改通知
        companyId: this.companyId, //公司id
        content: this.textarea, //发送内容
        moduleId: 1,
        receiver: this.useInfo.id,
        receiverId: 1,
        senderId: this.userId,
        type: 1
      };
      SAVE_MODULE_MSG(datas).then(res => {
        let data = res.data.data;
        // console.log(data);
        ACK_MODULE_MSG(data)
          .then(res => {
            console.log(res.data.msg);
            this.$confirm("消息已经发送成功！是否继续发送？", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "success"
            })
              .then(() => {
                this.$message({
                  type: "success",
                  message: "请继续编辑!"
                });
                // 清空所有内容
                this.ShowMeluList({ deleteData: "deleteAll" });
              })
              .catch(() => {
                // 清空所有内容,并关闭弹窗
                this.ShowMeluList({ deleteData: "deleteAll" });
                this.ShowDialog({ isShow: false });
              });
          })
          .catch(res => {
            console.log("发送失败!", res.data);
          });
      });
    }
  }
};
</script>



