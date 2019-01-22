<template>
  <div v-show="showMeluList.isShow" class="Pop">
    <!-- 遮罩 -->
    <div class="pop-cloak" v-if="cloak"></div>
    <!-- 侧边栏内容 -->
    <div class="pop-content-wrap" :style="styleObj">
      <!-- 动画 -->
      <transition name="slid">
        <div class="pop-content" v-clickoutside="closePop" v-show="showSide">
          <div class="message">
            <p>添加消息接收人</p>
          </div>
          <el-input v-model="search" placeholder="搜索人员" suffix-icon="el-icon-search" class="search"></el-input>
          <div class="useravatar"></div>
          <!-- <button @click="closePop">close</button> -->
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Pop",
  props: {
    showPop: {
      type: Boolean,
      default: false
    },
    position: {
      // 位置 top\right\bottom\left
      type: String,
      default: "right"
    },
    size: {
      // 大小，可以是高，也可以是宽，看是放在上下还是左右
      type: Number,
      default: 300
    },
    cloak: {
      // 是否显示遮罩,默认显示
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters(["showMeluList"]),
    styleObj() {
      let obj = {};
      switch (this.position) {
        case "top":
          obj.top = 0;
          obj.left = 0;
          obj.right = 0;
          obj.height = this.size + "px";
          break;
        case "right":
          obj.top = 0;
          obj.bottom = 0;
          obj.right = 0;
          obj.width = this.size + "px";
          break;
        case "bottom":
          obj.left = 0;
          obj.bottom = 0;
          obj.right = 0;
          obj.height = this.size + "px";
          break;
        case "left":
          obj.left = 0;
          obj.bottom = 0;
          obj.top = 0;
          obj.width = this.size + "px";
          break;
      }
      return obj;
    }
  },
  data() {
    return {
      search:'',//搜索框显示的内容
      showSide: false // 是否显示边栏
    };
  },
  directives: {
    clickoutside: {
      bind(el, binding, vnode) {
        function documentHandler(e) {
          if (el.contains(e.target)) {
            return false;
          }
          if (binding.expression) {
            binding.value(e);
          }
        }

        function hideDrop(e) {
          // console.log('按键：', e.key)
          if (binding.expression && e.key === "Escape") {
            // 如果绑定了表达式，并且按键是 Escape 则关闭
            binding.value(e);
          }
        }

        el.__vueClickOutside__ = documentHandler;
        el.__vueKeydownEsc__ = hideDrop;
        document.addEventListener("click", documentHandler);
        document.addEventListener("keydown", hideDrop);
      },
      unbind(el, binding) {
        document.removeEventListener("click", el.__vueClickOutside__);
        document.removeEventListener("keydown", el.__vueKeydownEsc__);
        delete el.__vueClickOutside__;
        delete el.__vueKeydownEsc__;
      }
    }
  },
  methods: {
    ...mapActions(["ShowMeluList"]),
    closePop() {
      this.ShowMeluList({ isShow: false });
    }
  },
  mounted() {
    this.showSide = true;
  }
};
</script>
<style lang="scss">
.Pop{
  .el-input__inner{
    width:260px;
    height:40px;
    background:rgba(242,242,242,1);
    border:1px solid rgba(0,0,0,0.2);
    opacity:1;
    border-radius:8px;
    margin-top: 20px;
  }
  .el-input{
    width: 220px;
    line-height: 40px;
  }
  .el-input__suffix {
    top: 10px;
    left: 230px;
  }
}
</style>

<style lang="scss" scoped>
.slid-enter-active,
.slid-leave-active {
  transition: margin 0.26s;
}

.slid-enter,
.slid-leave-to {
  margin-left: 300px;
  opacity: 0;
}

.Pop {
  z-index: 9999;
}
.Pop,
.pop-cloak {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
}

.pop-cloak {
  background: rgba(0, 0, 0, 0.2);
}

.pop-content-wrap {
  position: absolute;
}

.pop-content {
  width: 100%;
  height: 100%;
  background: #fff;
  box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.4);
}

.message{
  width:300px;
  height:60px;
  background:rgba(255,255,255,1);
  box-shadow:-3px 0px 20px rgba(0,0,0,0.16);
  opacity:1;
  padding:0 20px;
  p{
    font-size:16px;
    font-family:Microsoft YaHei;
    font-weight:bold;
    line-height:60px;
    color:rgba(0,0,0,0.60);
    opacity:1;
  }
}
.search{
  padding:0 20px;
}
.useravatar{
  margin-top:25px;
}
</style>
