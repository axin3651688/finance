<template>
  <div class="Cbsb">
    <div class="text">
      <p>1.农场转型升级收回林业，增加收入23.82万元。</p>
      <p>2.变电所今年1月电费收入为:114.22万元，较上年同期的53.12万元，增加了61.10万元，上升原因用电用水量上升了。</p>
      <p>3.医院今年营业收入比上年同期增加13.53万元原因是后期中因病患者就诊量大、增加了新农合业务[而去年同期没有开展]。</p>
    </div>
    <el-button @click="sendMsg" type="primary" class="send">关 闭</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapActions } from "vuex";

export default {
  name: "Cbsb",
  components: {},
  props: {},
  data() {
    return {};
  },
  created() {
    // this.ShowDialog({ tittle: "2222222222222222" });
  },

  methods: {
    ...mapActions(["ShowDialog"]),

    /**
     * @desc    : 点击发送催报数据到后台
     */

    sendMsg() {
      this.ShowDialog({ isShow: false });
    }
  }
};
</script>
<style lang="scss" scoped>
.text {
  padding: 20px 20px;
  font-size: 16px;
  width: 620px;
  height: 300px;
  border: 1px solid#409EFF;
}
</style>




