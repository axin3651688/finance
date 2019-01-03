<template>
  <div class="MyDialog" v-show="showDialog" id="MyDialog">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "MyDialog",
  data() {
    return {
      showDialog: false
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value(newVal){
      this.showDialog = newVal;
    },
  },
  methods: {
    // 则隐藏弹框
    hidenDialog(e) {
      let elem = e.target || e.srcElement;
      while (elem) { // 循环判断至跟节点，防止点击的是div子元素
        if (elem.id && elem.id === 'MyDialog') {
          return
        }// 如果还有别的div不想点击，就加else if判断
        elem = elem.parentNode
      }
      this.showDialog = false
    }
  },
  mounted() {
    // todo:点击其他地方隐藏 弹出
    document.addEventListener('click', this.hidenDialog)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.hidenDialog)
  }
}
</script>

<style lang="scss" scoped>
  .MyDialog {
    position: absolute;
    background: #ffffff;
  }
</style>
