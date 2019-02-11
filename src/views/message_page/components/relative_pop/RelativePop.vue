<template>
  <div class="RelativePop" v-clickoutside="handleClose">
    <div class="default-content" @click="showPop=!showPop">
      <slot>默认的内容</slot>
    </div>
    <div :class="['pop-wrap', popClass]" v-if="showPop">
      <div class="pop-content">
        <slot name="pop"></slot>
        <i class="el-icon-close icon-close" v-if="showClose" @click="showPop=false"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RelativePop',
  data() {
    return {
      showPop: false
    }
  },
  props: {
    popClass: {
      type: String,
      default: ''
    },
    showClose: {
      type: Boolean,
      default: true
    }
  },
  directives: {
    clickoutside: {
      bind(el, binding, vnode) {
        // 点击不是本身则关闭弹窗
        function documentHandler(e) {
          if (el.contains(e.target)) return false
          if (binding.expression) binding.value(e)
        }

        // Esc 键关闭弹窗
        function keyboardHandler(e) {
          if (binding.expression && e.key === 'Escape') binding.value(e)
        }

        el.__vueClickOutside__ = documentHandler
        el.__vueKeyboardHandler__ = keyboardHandler
        document.addEventListener('click', documentHandler)
        document.addEventListener('keydown', keyboardHandler)
      },
      unbind(el) {
        document.removeEventListener('click', el.__vueClickOutside__)
        document.removeEventListener('keydown', el.__vueKeyboardHandler__)
        delete el.__vueClickOutside__
        delete el.__vueKeyboardHandler__
      }
    }
  },
  methods: {
    handleClose(e) {
      this.showPop = false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@ms/index.scss";

  .RelativePop {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .default-content {
    height: 100%;
  }

  .pop-content {
    position: relative;
  }

  .pop-wrap, .icon-close {
    position: absolute;
  }

  .icon-close {
    top: 0;
    right: 0;
    padding: 5px;
    color: $colorText4;
    cursor: pointer;
    transition: all .3s;

    &:hover {
      color: $colorTheme;
    }
  }
</style>
