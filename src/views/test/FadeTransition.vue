<!-- FadeTransition.vue -->
<template>
  <transition
    name="fade"
    v-bind="$attrs"
    v-on="hooks"
    enter-active-class="fadeIn"
    leave-active-class="fadeOut"
  >
    <slot/>
  </transition>
</template>
<script>
export default {
  name: "FadeTransition",
  props: {
    duration: {
      type: Number,
      default: 300
    }
  },
  computed: {
    hooks() {
      return {
        beforeEnter: this.setDuration,
        afterEnter: this.cleanUpDuration,
        beforeLeave: this.setDuration,
        afterLeave: this.cleanUpDuration,
        ...this.$listeners
      };
    }
  },
  methods: {
    setDuration(el) {
      el.style.animationDuration = `${this.duration}ms`;
    },
    cleanUpDuration(el) {
      el.style.animationDuration = "";
    }
  }
};
</script>
<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.fadeIn {
  animation-name: fadeIn;
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

.fadeOut {
  animation-name: fadeOut;
}
</style>