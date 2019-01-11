<template>
  <el-dialog
    :modal="true"
    :modal-append-to-body="false"
    :visible.sync="showDialog.isShow"
    :width="showDialog.width"
    :height="showDialog.height"
    :close-on-click-modal="false"
    :show-close="true"
    :close-on-press-escape="true"
    lock-scroll
  >
    <span slot="title" class="dialog-title">
      <img src="@a/icons/jsnk/laba.svg">
      <span>{{showDialog.tittle}}</span>
    </span>
    <BiModule :dialogData="dialogData"></BiModule>
    <span>{{showDialog.data}}</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="ShowDialog({isShow:false})">关 闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mapActions } from "vuex";
import BiModule from "@v/BiModule.vue";
export default {
  props: ["showDialog"],
  created() {},
  components: {
    BiModule
  },
  data() {
    return {
      dialogData: "cnbi/json/source/chart/bar.json"
    };
  },
  methods: {
    ...mapActions(["ShowDialog"])
  }
};
</script>
<style  lang='scss' scoped>
.dialog-title {
  font-size: 18px;
  img {
    height: 18px;
    padding-right: 10px;
  }
}
</style>