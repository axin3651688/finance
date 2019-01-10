<template>
  <component v-if="flag" :is="item.options.type" :item="item" class="bgwight"></component>
</template>
<script>
export default {
  props: ["item"],
  data() {
    return {};
  },
  created() {
    debugger;
  },
  components: {
    ShowDialog: () => import("@c/common/OpenDialog")
  }
};
</script>
