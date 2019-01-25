<template>
  <div class="Cbsb">
    <el-row>选择消息接收人</el-row>
    <el-row :gutter="20">
      <el-col :span="3" v-for="o in showDatas" :key="o.id" class="role_list">
        <img :src="o.avatar">
        <div class="name">{{o.trueName}}</div>
      </el-col>
      <el-col :span="2" v-if="listLength>4">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkAgMAAAANjH3HAAAACVBMVEVHcEwAAAAAAAAWawmTAAAAA3RSTlMAMhV623REAAAAjklEQVRIx2NgGAWjYBSMApqDFbgkWEMTMMS4FoDIqaEhYE4DksxUkBBTaGgoiBMagZAAigHVMYbCKIQMZ2ioA8gaMMUJlodbDbIbJAOkVMHyKDKqcJkEZJkAnDI4TONElmFFk4E4CsNtEP9wYvEPw1LkMJiKFAYMTA2QcItAcAiGNRRojCbRUTAKRgE2AACrZSvn1k0Z3wAAAABJRU5ErkJggg=="
        >
        <div class="name">共{{listLength}}人</div>
      </el-col>
      <el-col :span="2">
        <img
          @click="ShowMeluList({isShow:true})"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkAgMAAAANjH3HAAAACVBMVEVHcEwAAAAAAAAWawmTAAAAA3RSTlMAMhV623REAAAAjklEQVRIx2NgGAWjYBSMApqDFbgkWEMTMMS4FoDIqaEhYE4DksxUkBBTaGgoiBMagZAAigHVMYbCKIQMZ2ioA8gaMMUJlodbDbIbJAOkVMHyKDKqcJkEZJkAnDI4TONElmFFk4E4CsNtEP9wYvEPw1LkMJiKFAYMTA2QcItAcAiGNRRojCbRUTAKRgE2AACrZSvn1k0Z3wAAAABJRU5ErkJggg=="
        >
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
      textarea: "",
      listDatas: [],
      userId: this.$store.getters.user.user.id,
      companyId: this.$store.getters.user.company.id
    };
  },
  created() {
    this.getMemberList(this.companyId);
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
    ...mapActions(["ShowMeluList"]),
    /**
     * @desc    : 请求下拉框的数据，装到vuex中
     * @param   {String} 公司ID
     * @returns {String}
     * @author  : mj
     * @data    : 2019-01-25
     */
    getMemberList(companyId) {
      companyContactList(companyId).then(res => {
        let data = res.data.data.normal;
        console.log(data);
        this.ShowMeluList({ data: data });
        this.listDatas = data;
      });
    },
    /**
     * @desc    : 点击发送催报数据到后台
     * @param   {String} 参数名
     * @param   {Object} 参数名
     * @returns {String}
     * @author  : mj
     * @data    : 2019-01-25
     */

    sendMsg() {
      // debugger;
      // console.log(this.showMeluList.checkedItem);
      // console.log(this.textarea);
      let datas = {
        action: 1,
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
        ACK_MODULE_MSG(data).then(res => {
          console.log(res.data.msg);
        });
      });
    }
  }
};
</script>



