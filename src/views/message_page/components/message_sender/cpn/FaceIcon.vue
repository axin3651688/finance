<template>
  <div class="FaceIcon face-pop" v-clickoutside="closePop">
    <ul>
      <li v-for="face in EMOTION_SPRITES" :key="face.value">
        <div :class="['face-img', face.className]"
             @click="addFaceToInput(face.value)"
             :title="face.value"
        ></div>
      </li>
    </ul>
  </div>
</template>

<script>
import emotion_sprites from '@a/message/data/emotion_sprites.json'

export default {
  name: "FaceIcon",
  props: {
    showFacePop: {
      type: Boolean ,
      default: false
    }
  },
  data() {
    return {
      EMOTION_SPRITES: emotion_sprites.data,  // 聊天表情
    }
  },
  directives: {
    clickoutside: {
      bind (el, binding, vnode) {
        function documentHandler (e) {
          if (el.contains(e.target)) {
            return false
          }
          if (binding.expression) {
            binding.value(e)
          }
        }

        function hideDrop (e) {
          // console.log('按键：', e.key)
          if (binding.expression && e.key === 'Escape') { // 如果绑定了表达式，并且按键是 Escape 则关闭
            binding.value(e)
          }
        }

        el.__vueClickOutside__ = documentHandler
        el.__vueKeydownEsc__ = hideDrop
        document.addEventListener('click', documentHandler)
        document.addEventListener('keydown', hideDrop)
      },
      unbind (el, binding) {
        document.removeEventListener('click', el.__vueClickOutside__)
        document.removeEventListener('keydown', el.__vueKeydownEsc__)
        delete el.__vueClickOutside__
        delete el.__vueKeydownEsc__
      }
    }
  },
  methods: {

    // 把表情加到输入窗口
    addFaceToInput(value) {
      // debugger
      this.$emit('addFaceToInput', value)
    },

    // 向父组件促发 关闭自身弹窗
    closePop(){
      // debugger
      this.$emit('update:showFacePop', false)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@s/message/index.scss";
  @import "@s/message/icons.scss";

  .face-pop {
    $facePopHeight: 206px;
    $colorFaceBorder: #eee;
    position: absolute;
    width: 615px;
    height: $facePopHeight;
    border: 1px solid $colorFaceBorder;
    border-bottom: none;
    background: #ffffff;
    top: -$facePopHeight - 18px;
    left: 0;
    box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.16);;

    ul {
      overflow: hidden;
      height: 100%;
      margin-right: -1px;

      li {
        float: left;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px;
      }
    }
  }
</style>
