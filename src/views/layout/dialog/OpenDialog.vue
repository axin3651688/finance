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
    :before-close="closePop"
    class="OpenDialog"
  >
    
    <span slot="title" class="dialog-title">
      <!-- <i class="iconfont icon-shanchuguanbicha2 item_img"></i> -->
      <!-- <img src="@a/icons/jsnk/laba.svg"> -->
      <!-- <button @click="radio" v-if="showDialog.button">{{showDialog.button}}</button> -->
      <span>{{showDialog.tittle}}</span>
    </span>
    <audio ref="bobao" style="margin-bottom:30px" @click="radio" v-if="showDialog.button" controls>
      <source src="./1_201606_1-1416001.mp3" type="audio/mpeg">
        您的浏览器不支持 audio 元素。
    </audio>
    <BiModule v-if="showDialog.isShow" :dialogData="showDialog.api"></BiModule>
    
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
    ...mapGetters(["showDialog", "showMeluList"]),
    target() {
      return this.showDialog.api;
    },
    button() {
      let bu = this.showDialog.button?true:false;
      alert(this.showDialog.button+bu);
      console.trace(this.bu)
      return bu;
    }
  },
  methods: {
    ...mapActions(["ShowDialog"]),
    closePop() {
      debugger;
      this.ShowDialog({ isShow: false });
    },
    radio(){
      debugger
      this.$refs.bobao.play()
      console.log('bobao---------')
      
      // let audio=document.createElement("audio");
      // audio.src='@static/mp3/1_201606_1-1416001.mp3';//路径
      
      // let audio = new Audio('@static/mp3/sfdsf.mp3');
      // audio.play();
     
    }
  }
};
</script>
<style  lang='scss' >
.OpenDialog {
  .dialog-title {
    font-size: 18px;
    font-weight: bold;

    color: rgba(15, 109, 217, 1);
  }
  .el-dialog__header {
    margin-right: 20px;
  }
}
</style>