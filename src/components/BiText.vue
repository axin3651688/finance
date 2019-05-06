<template>
  <component :is="item.options.type" :item="item" class="bgwight"></component>
</template>
<script>
export default {
  name: "BiText",
  props: ["item"],
  data() {
    return {};
  },
  created() {
    debugger;
  },
  components: {
    Cbsb: () => import("./text/Cbsb.vue"),//催报
    Bgch: () => import("./text/Bgch.vue"),//报告撤回
    Zjl: () => import("./text/Zjl.vue")
  }
};
</script>
