<template>
  <div v-if="showMeluList.isShow" class="OpenMeluList">
    <!-- 遮罩 -->
    <div class="cloak" v-if="cloak"></div>
    <!-- 侧边栏内容 -->
    <div class="content-wrap">
      <!-- 动画 -->
      <transition name="slid">
        <div class="content" v-clickoutside="closePop">
          <div class="content-message-top">
            <span>添加消息接收人</span>
            <!-- <el-checkbox
              class="checkAll"
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
            >全选</el-checkbox>-->
            <span class="iconfont close" @click="closePop">&#xe60e;</span>
          </div>
          <!-- <el-input v-model="search" placeholder="搜索人员" suffix-icon="el-icon-search" class="search"></el-input> -->
          <el-checkbox-group
            v-model="checkedCities"
            @change="handleCheckedCitiesChange"
            class="content-middle"
          >
            <el-checkbox
              v-for="i of listDatas"
              :key="i.id"
              :label="i.trueName"
              class="checkbox-item"
            >
              <div class="useravatar">
                <div class="row">
                  {{listDatas.trueName}}
                  <img :src="i.avatar" alt class="img">
                  <p>{{i.trueName}}</p>
                </div>
              </div>
            </el-checkbox>
          </el-checkbox-group>

          <div style="margin: 15px 0;"></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "OpenMeluList",
  props: {
    showPop: {
      type: Boolean,
      default: false
    },

    cloak: {
      // 是否显示遮罩,默认显示
      type: Boolean,
      default: true
    }
  },
  mounted() {
    console.log(this.cities);
  },
  computed: {
    ...mapGetters(["showMeluList"]),
    listDatas() {
      return this.showMeluList.data;
    },
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
      search: "", //搜索框显示的内容
      showSide: false, // 是否显示边栏
      list: [],
      checkAll: false,
      checkedCities: [],
      cities: this.$store.getters.showMeluList.data,
      isIndeterminate: true
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
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    }
  }
};
</script>

