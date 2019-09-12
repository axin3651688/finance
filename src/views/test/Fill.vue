<template>
    <div>
      <transition name="moveL">
          <div class="rotating" style="width:100%;height:56px;background-color:#00a680">               
              
          </div>
      </transition>
    </div>
</template>
<script>
export default {
  
}
</script>

<style lang="scss">
.rotating {
    -webkit-animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-duration: 1s;
    animation-fill-mode: both;
}
@keyframes fadeInRight {
        0% {
            -webkit-transform: translate3d(-100%,0,0);
            opacity: 0;
            transform: translate3d(-100%,0,0);
            background-color: white;
        }
        100% {
            -webkit-transform: translateZ(0);
            opacity: 1;
            transform: translateZ(0);
        }
    }
</style>
