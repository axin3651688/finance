/**
 * 使用vue - bus有两点需要注意， 第一是$bus.on应该在created钩子内使用，
 * 如果在mounted使用， 它可能接收不到其他组件来自created钩子内发出的事件；
 * 第二点是使用了$bus.on在beforeDestory钩子里应该需要使用$bus.off解除，
 * 因为组件销毁后， 就没有必要把监听的句柄存储在vue - bus里面了
 * 用完一定要销毁,否则会导致监听增加,后续触发不会引起视图更新
 * this.$bus.off("**");
 */
const install = (Vue) => {
  const Bus = new Vue({
    methods: {
      emit(event, ...args) {
        this.$emit(event, ...args);
      },
      on(event, callback) {
        this.$on(event, callback);
      },
      off(event, callback) {
        this.$off(event, callback);
      }
    }
  });
  Vue.prototype.$bus = Bus;
};
export default install;
