<template>
  <el-dialog
    :modal="true"
    :modal-append-to-body="true"
    :visible.sync="showDialog.isShow"
    :width="showDialog.width"
    :height="showDialog.height"
    :close-on-click-modal="false"
    :show-close="true"
    :close-on-press-escape="true"
  >
    <span slot="title" class="dialog-title">
      <img src="@a/icons/jsnk/laba.svg">
      <span>{{showDialog.tittle}}</span>
    </span>
    <BiModule></BiModule>
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