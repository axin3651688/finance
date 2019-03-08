<template>
  <div class="SwitchBtnGroup">
    <div :class="['btn', {active: activeBtn === value1}]" @click="switchCase(value1)">
      消息
    </div>
    <div :class="['btn', {active: activeBtn === value2}]" @click="switchCase(value2)">
      文件
    </div>
  </div>
</template>

<script>
export default {
  name: 'SwitchBtnGroup',
  props: {
    value1: {
      type: String,
      required: true
    },
    value2: {
      type: String,
      required: true
    },
    defaultValue: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      activeBtn: this.defaultValue
    };
  },
  methods: {
    switchCase(val) {
      this.activeBtn = val;
      this.$emit('switchCase', val);
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "@ms/index.scss";

  .SwitchBtnGroup {
    display: inline-block;
    $btnHeight: 24px;
    border-radius: $btnHeight / 2;
    overflow: hidden;
    background: #ffffff;

    .btn {
      display: inline-block;
      line-height: $btnHeight;
      padding: 0 20px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.20);
      background: $colorThemePrimary;
      cursor: pointer;
    }

    .btn.active {
      background: $colorTheme;
      color: #ffffff;
    }
  }
</style>
