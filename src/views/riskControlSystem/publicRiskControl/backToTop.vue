<template>
    <div>
        <div
                class="toTop"
                id="toTop"
                v-show="toTopBtnShow"
                ref="toTopBtn"
        >
            <span>{{scrollTop}}</span>
            <span class="toTop-txt">回到顶部</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "backToTop",
        components: {},
        props: {},
        data() {
            return {
                toTopBtnShow: false,
                scrollTop: 0
            }
        },
        created() {
        },
        watch: {},
        mounted() {
            // window.addEventListener('scroll', this.handleScroll, true);
        },
        destroyed() {
            // window.removeEventListener('scroll', this.handleScroll, true);
        },
        methods: {
            handleScroll: function () {
                // let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
                // 设备/屏幕高度
                // let scrollObj = document.getElementById('main-container'); // 滚动区域
                // let scrollTop = scrollObj.scrollTop; // div 到头部的距离
                // let scrollTop =  document.getElementById('main-container').scrollY;
                // let scrollTop =  document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
                // let scrollTop =  window.scrollY;
                // console.log(scrollTop);
                // let scrollHeight = scrollObj.scrollHeight; // 滚动条的总高度
                //滚动条到底部的条件
                // if (scrollTop + clientHeight === scrollHeight) {
                //     // div 到头部的距离 + 屏幕高度 = 可滚动的总高度
                // }
            }
        }
    }
</script>

<style scoped>
    .toTop {
        position: fixed;
        bottom: 120px;
        right: 60px;
        border: 1px solid red;
        padding: 5px;
    }

    .toTop-txt {
    }

    .toTop:hover .toTop-txt {
        cursor: pointer;
    }

    .toTop:hover {
    }
</style>