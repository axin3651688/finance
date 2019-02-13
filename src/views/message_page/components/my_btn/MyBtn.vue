<template lang="html">
    <div class="btn">
        <slot/>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import "@ms/mixins.scss";
.btn{
  @include myBtn();
}
</style>
