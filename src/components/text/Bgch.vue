<template>
  <div class="Cbsb">
    <el-row class="choice_title">退回消息人</el-row>
    <el-row>
      <el-col :span="3" class="role_bgch">
        <img src="http://192.168.2.214:8000/group2/M00/00/01/wKgC21vak8mAWsvYAAahrk5cOek851.jpg">
        <div class="name">龚佳新</div>
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
  companyContactList,
  SAVE_MODULE_MSG,
  ACK_MODULE_MSG
} from "~api/userClientRest";
export default {
  name: "Cbsb",
  components: {},
  props: {},
  data() {
    return {
      listDatas: [],
      userId: this.$store.getters.user.user.id,
      companyId: this.$store.getters.user.company.id,
      imgShow: ""
    };
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

    userIds() {
      return "397";
      // 退回消息人id
    }
  },
  methods: {
    ...mapActions(["ShowDialog"]),
    /**
     * @desc    : 点击发送催报数据到后台
     * @author  : mj
     * @data    : 2019-01-25
     */
    sendMsg() {
      // debugger;
      let datas = {
        action: 3,
        companyId: this.companyId,
        content: this.textarea,
        moduleId: 1,
        receiver: this.userIds,
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
            this.$message({
              showClose: true,
              message: "恭喜你，消息成功！",
              type: "success"
            });
            this.ShowDialog({ isShow: false });
          })
          .catch(res => {
            console.log("发送失败!", res.data);
          });
      });
    }
  }
};
</script>



