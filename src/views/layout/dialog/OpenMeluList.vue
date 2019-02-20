<template>
  <div v-if="showMeluList.isShow" class="OpenMeluList">
    <!-- 遮罩 -->
    <div class="cloak"></div>
    <!-- 侧边栏内容 -->
    <div class="content-wrap">
      <!-- 动画 -->
      <transition name="slid">
        <div class="content" v-clickoutside="closePop">
          <div class="content-message-top">
            <span>添加消息接收人</span>
            <el-checkbox
              class="checkAll"
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
            >全选</el-checkbox>
            <span class="iconfont close" @click="closePop">&#xe60e;</span>
          </div>
          <div class="sheach">
            <el-input v-model="nameSearch" placeholder="搜索人员" suffix-icon="el-icon-search"></el-input>
          </div>
          <el-scrollbar style="height: 100%">
            <el-checkbox-group
              v-model="checkedItem"
              @change="handleCheckedChange"
              class="content-middle"
              v-for="i of filterData"
              :key="i.id"
            >
              <img v-if="i.avatar" :onerror="logo" :src="i.avatar" class="img">
              <img v-else src="@a/avatar.jpg" class="img">
              <el-checkbox :label="i" class="checkbox-item">{{i.trueName}}</el-checkbox>
            </el-checkbox-group>
          </el-scrollbar>
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
  data() {
    return {
      nameSearch: "", //搜索框显示的内容
      showSide: false, // 是否显示边栏
      checkAll: false,
      checkedItem: [],
      isIndeterminate: false,
      errorUserPhoto: 'this.src="' + require("@a/avatar.jpg") + '"'
    };
  },

  computed: {
    ...mapGetters(["showMeluList"]),
    listDatas() {
      return this.showMeluList.data;
    },
    listName() {
      return this.filterData.map(function(user) {
        return user.trueName;
      });
    },
    /**
     * @desc    : 通过输入关键子对人名进行筛选搜索
     * @returns {Arry}
     * @author  : mj
     * @data    : 2019-02-12
     */
    filterData: function() {
      debugger;
      var items = this.listDatas;
      var searchRegex = new RegExp(this.nameSearch, "i");
      var arr = [];
      for (var i = 0, j = items.length; i < j; i++) {
        // debugger;
        if (searchRegex.test(items[i].trueName)) {
          arr.push(items[i]);
        }
      }
      return arr;
    }
  },

  // 自定义指令
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
  filters: {},

  methods: {
    ...mapActions(["ShowMeluList"]),
    closePop() {
      this.ShowMeluList({ isShow: false });
    },
    handleCheckAllChange(val) {
      debugger;
      this.checkedItem = val ? this.listDatas : [];
      this.isIndeterminate = false;
      // console.log(this.checkedItem);
      this.ShowMeluList({ checkedItem: this.checkedItem });
    },
    handleCheckedChange(value) {
      debugger;
      console.log(value);
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.listDatas.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.listDatas.length;
      this.ShowMeluList({ checkedItem: value });
    }
  }
};
</script>

