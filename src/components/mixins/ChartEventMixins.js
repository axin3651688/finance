/**
 * echart图形点击事件公共处理
 * 
 */
export default {
    mounted() {
        let me = this;
        if(me.item.mixins.methods.itemClick){
          this.$children[0].chart.on('click',function(params){
             me.item.mixins.methods.itemClick(me,params);
          });
        }
    },

    
   
  }
  