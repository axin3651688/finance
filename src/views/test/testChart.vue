<template>
  <div class="page">
    <el-row :gutter="24">
      <el-col :span="6" class="aa">
        <BiPieLuntai></BiPieLuntai>
      </el-col>
      <el-col :span="12">
        <BiPieLuntai></BiPieLuntai>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import BiPieLuntai from "@c/charts/BiPieLuntai";
export default {
  name: "",
  data() {
    return {};
  },
  components: { BiPieLuntai }
};
</script>

<style  lang="scss" scoped>
.aa {
  background: rgb(236, 154, 154);
}
</style>
