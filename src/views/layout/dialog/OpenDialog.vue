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
    v-dialogDrag
  >
    <span slot="title" class="dialog-title">
      <!-- <img src="@a/icons/jsnk/laba.svg"> -->
      <span>{{showDialog.tittle}}</span>
    </span>
    <el-button @click.stop="ShowMeluList({isShow:true})">打开</el-button>
    <BiModule :dialogData="showDialog.api"></BiModule>
  </el-dialog>
</template>
<script>
/* 这个组件绑定在BorderPage中,创立的原因是很多地方都需要弹框,
  但是不可能每个地方去声明引入一个组件,
  尤其在表格里面点击不可能去再创立;此组件可以在任何地方都直接调用,向vuex中传入json地址和标题,以及其他配置项,它就可以展示你要的效果 */
import { mapActions, mapGetters } from "vuex";
import BiModule from "@v/BiModule.vue";
export default {
  components: {
    BiModule
  },
  computed: {
    ...mapGetters(["showDialog", "showMeluList"])
  },
  methods: {
    ...mapActions(["ShowDialog", "ShowMeluList"])
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