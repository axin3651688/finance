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

<style lang="scss">
@import "../../styles/element.scss";
.btn{
  @include btn;
}
</style>
