<template>
  <div class="Cbsb">
    <div>选择消息接收人</div>
    <div class="role_wrapper">
      <div class="role_list">
        <span v-for="o in listDatas" :key="o.id" class="role_item">
          <img :src="o.avatar">
          <div class="name">{{o.trueName}}</div>
        </span>
        <span class="role_item">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkAgMAAAANjH3HAAAACVBMVEVHcEwAAAAAAAAWawmTAAAAA3RSTlMAMhV623REAAAAjklEQVRIx2NgGAWjYBSMApqDFbgkWEMTMMS4FoDIqaEhYE4DksxUkBBTaGgoiBMagZAAigHVMYbCKIQMZ2ioA8gaMMUJlodbDbIbJAOkVMHyKDKqcJkEZJkAnDI4TONElmFFk4E4CsNtEP9wYvEPw1LkMJiKFAYMTA2QcItAcAiGNRRojCbRUTAKRgE2AACrZSvn1k0Z3wAAAABJRU5ErkJggg=="
          >
          <div class="name">共12人</div>
        </span>
      </div>
      <!-- <i class="chaochu role_item"></i>
      <div class="name">共12人</div>-->
    </div>

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
import { companyContactList, saveModuleMsg } from "~api/userClientRest";
export default {
  name: "Cbsb",
  components: {},
  props: {},
  data() {
    return {
      textarea: "",
      listDatas: [],
      trueName: ""
    };
  },
  created() {
    console.log(this.companyId);
    this.getMemberList();
    debugger;
  },
  computed: {
    companyId() {
      return this.$store.getters.user.company.id;
    }
  },
  methods: {
    ...mapActions(["ShowMeluList"]),
    /*   请求下拉框的数据 */
    getMemberList() {
      // debugger;
      // console.log(this.companyId);
      companyContactList(this.companyId).then(res => {
        let data = res.data.data.normal;
        console.log(data);

        this.ShowMeluList({ data: data });
        this.listDatas = data;
      });
    },
    sendMsg() {
      console.log(this.trueName);
      console.log(this.textarea);
      let datas = {
        action: 1,
        companyId: this.companyId,
        content: this.textarea,
        fileId: 0,
        id: 0,
        moduleId: 0,
        receiver: "string",
        receiverId: 0,
        senderId: 0,
        seq: 0,
        type: 0,
        url: "string"
      };
      saveModuleMsg(datas).then(res => {
        let data = res.data;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.Cbsb {
  width: 660px;
  height: 420px;
  position: relative;
  img {
    height: 50px;
    width: 50px;
    border-radius: 5px;
  }
  .role_wrapper {
    i {
      display: inline-block;
      background-size: 100%;
    }
  }
  .role_list {
    display: inline-block;
    padding-top: 20px;
    width: 400px;
    height: 115px;
    overflow: hidden;
    .role_item {
      padding: 0 40px 20px 0;
      display: inline-block;

      .name {
        color: rgba(0, 0, 0, 0.6);
        text-align: center;
        padding-top: 11px;
      }
    }
  }
  .chaochu {
    // @extend img;
    height: 50px;
    width: 50px;
    border-radius: 5px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkAgMAAAANjH3HAAAACVBMVEVHcEwAAAAAAAAWawmTAAAAA3RSTlMAMhV623REAAAAjklEQVRIx2NgGAWjYBSMApqDFbgkWEMTMMS4FoDIqaEhYE4DksxUkBBTaGgoiBMagZAAigHVMYbCKIQMZ2ioA8gaMMUJlodbDbIbJAOkVMHyKDKqcJkEZJkAnDI4TONElmFFk4E4CsNtEP9wYvEPw1LkMJiKFAYMTA2QcItAcAiGNRRojCbRUTAKRgE2AACrZSvn1k0Z3wAAAABJRU5ErkJggg==)
      no-repeat;
  }
  .input_title {
    padding-bottom: 20px;
    color: rgba(0, 0, 0, 0.6);
  }
  .input {
    border-radius: 12px;
    width: 620px;
  }
  .send {
    width: 80px;
    position: absolute;
    bottom: 20px;
    right: 20px;
    padding-right: 20px;
  }
}
</style>


