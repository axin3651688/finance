<template lang="html">
    <div :class="[btnClass,cname]">
        <slot/>
    </div>
</template>

<script>
export default {
    props: {
        cname: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            btnClass: "btn",
        }
    },
}
</script>

<style lang="scss" scoped>
@import "@ms/element.scss";
.btn{
  @include myBtn();
}
</style>
