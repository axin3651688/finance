import {
    debounce
} from "@/utils";
export default {
    mounted() {
        // 自适应屏幕大小
        this.__resizeHandler = debounce(() => {
            if (this.chart) {
                this.chart.resize();
            }
        }, 100);
        window.addEventListener("resize", this.__resizeHandler);
    },
    beforeDestroy() {
        if (!this.chart) {
            return;
        }
        window.removeEventListener("resize", this.__resizeHandler);
        this.chart.dispose();
        this.chart = null;
    },

}