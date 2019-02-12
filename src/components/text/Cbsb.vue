<template>
  <div class="Cbsb">
    <el-row class="choice_title">选择消息接收人</el-row>
    <el-row>
      <el-col :span="3" v-for="(o,index) in showDatas" :key="o.id" class="role_add">
        <img @click="deleteData(index)" :src="o.avatar">
        <i class="iconfont icon-shanchuguanbicha2 item_img"></i>
        <div class="name">{{o.trueName}}</div>
      </el-col>
      <el-col :span="3" v-if="listLength>4" class="role_add">
        <i class="iconfont icon-more item_img"></i>
        <div class="name">共{{listLength}}人</div>
      </el-col>
      <el-col :span="3" class="role_add">
        <i @click="ShowMeluList({isShow:true})" class="iconfont icon-jia item_imgadd"></i>
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
      companyId: this.$store.getters.user.company.id,
      imgShow: ""
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
    ...mapActions(["ShowMeluList", "ShowDialog"]),
    /**
     * @desc    : 请求下拉框的数据，装到vuex中
     * @param   {String} 公司ID
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
        ACK_MODULE_MSG(data)
          .then(res => {
            console.log(res.data.msg);
            this.$confirm("消息已经发送成功!是否继续发送?", "提示", {
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
                this.textarea = "";
                this.ShowMeluList({ deleteData: "deleteAll" });
              })
              .catch(() => {
                // 清空所有内容
                this.textarea = "";
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



