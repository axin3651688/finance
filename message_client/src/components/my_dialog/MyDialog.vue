<template>
  <div class="MyDialog" v-if="showDialog" id="MyDialog">
    <slot></slot>
    <div class="close-btn" v-if="showClose">
      <i class="el-dialog__close el-icon el-icon-close"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyDialog',
  data() {
    return {
      showDialog: false
    };
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    value(newVal) {
      this.showDialog = newVal;
    }
  },
  methods: {
    // 则隐藏弹框
    hidenDialog(e) {
      let elem = e.target || e.srcElement;
      while (elem) { // 循环判断至跟节点，防止点击的是div子元素
        if (elem.id && elem.id === 'MyDialog') {
          return;
        }// 如果还有别的div不想点击，就加else if判断
        elem = elem.parentNode;
      }
      this.showDialog = false;
    }
  },
  mounted() {
    document.addEventListener('click', this.hidenDialog);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.hidenDialog);
  }
};
</script>

<style lang="scss" scoped>
  @import "@ms/variables.scss";

  .MyDialog {
    position: relative;
    background: #ffffff;

    .close-btn {
      position: absolute;
      top: 3px;
      right: 3px;
      padding: 5px;
      color: $colorText4;
      cursor: pointer;
      transition: all .3s;

      &:hover {
        color: $colorTheme;
      }
    }
  }

</style>
