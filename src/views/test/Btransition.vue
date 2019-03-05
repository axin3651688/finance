<template>
  <div id="app">
    <div class="toggle toggle--text">
      <button @click="toggle">转变</button>
    </div>
    <div class="duration">
      <label for="duration">持续时间（Duration）:</label>
      <input type="range" min="100" max="3000" v-model="duration" id="duration">
      <span>{{duration}}ms</span>
    </div>
    <FadeTransition mode="out-in" :duration="durationNumber">
      <div key="box" v-if="show" class="box"></div>
      <div key="circle" v-else class="circle"></div>
    </FadeTransition>
  </div>
</template>
<script>
import FadeTransition from "./FadeTransition";
export default {
  name: "app",
  components: {
    FadeTransition
  },
  data() {
    return {
      show: true,
      duration: 300
    };
  },
  methods: {
    toggle() {
      this.show = !this.show;
    }
  },
  computed: {
    durationNumber() {
      return parseInt(this.duration);
    }
  }
};
</script>
<style lang="scss" scoped>
.box {
  height: 200px;
  width: 200px;
  background-color: rgb(134, 29, 29);
}
.circle {
  width: 200px;
  height: 200px;
  background-color: red;
  border-radius: 50%;
}
</style>
