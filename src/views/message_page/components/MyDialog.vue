<template>
  <div class="MyDialog" v-show="showDialog">
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
    closeDialog() {
      debugger;
      this.showDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .MyDialog {
    position: absolute;
    background: #ffffff;
  }
</style>
