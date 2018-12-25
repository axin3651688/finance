<template>
  <div class="TopBar">
    <div class="topbar-left">
      TopBar
    </div>
    <div class="topbar-right">
      right
    </div>
  </div>
</template>

<script>
export default {
  name: "TopBar"
}
</script>

<style lang="scss" scoped>
  @import "@s/green/variables.scss";
  @import "../../styles/layout.scss";

  .TopBar {
    @include flex();
    height: $sizeTopBarHeight;

    .left, .right {
      height: 100%;
    }

    .topbar-left {
      width: $sizeNavBarWidth;
    }

    .topbar-right {
      position: relative;
      overflow: hidden;
      flex: 1;
      &:after {
        $afterWidth: 20px;
        position: absolute;
        display: block;
        content: '';
        width: $afterWidth;
        background: $colorTheme;
        left: -$afterWidth;
        top: 0;
        bottom: 0;
        box-shadow: 5px 0 20px 0 rgba(0,0,0,.2);
      }
    }
  }
</style>