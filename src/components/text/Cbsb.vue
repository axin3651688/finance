<template>
  <div class="Cbsb">
    <el-row>
      <el-col :span="8" v-for="o in listDatas" :key="o.id">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="o.avatar" class="image">
          <div style="padding: 14px;">
            <span>{{o.trueName}}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
    <el-button @click="sendMsg" type="primary">发 送</el-button>
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

        this.ShowMeluList = { data: data };
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
  img {
    height: 50px;
    width: 50px;
    border-radius: 5px;
  }
}
</style>


