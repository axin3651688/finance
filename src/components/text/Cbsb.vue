<template>
  <div class="page">
    <el-select v-model="trueName" placeholder="请选择">
      <el-option
        v-for="item of trueNameList"
        :key="item.id"
        :label="item.trueName"
        :value="item.trueName"
      ></el-option>
    </el-select>
    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
    <el-button @click="sendMsg" type="primary">发 送</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from "vuex";
import { companyContactList, saveModuleMsg } from "~api/userClientRest";
export default {
  name: "Cbsb",
  components: {},
  props: {},
  data() {
    return {
      textarea: "",
      trueNameList: [],
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
    /*   请求下拉框的数据 */
    getMemberList() {
      // debugger;
      // console.log(this.companyId);
      companyContactList(this.companyId).then(res => {
        let data = res.data.data.normal;
        this.trueNameList = data;
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

