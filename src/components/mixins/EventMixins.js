/**
 * event事件公共处理
 * type[
 *    click,dbclick,rowclick,cellclick,menucontextclick
 * ]
*    listeners:[{
        "type":"click",
        "way":"addTab",
        "handler":($vue,params)=>{
            console.info(params);
                debugger; 
        }
  }]
 */
import {findDesignSource } from "~api/interface";
export default {
    mounted() {
        let me = this;
        debugger;
        let xtype = me.item.xtype;
        if(me.item.listeners){
          me.item.listeners.forEach(listener => {
            if(listener.type){
              if(xtype === "chart" || xtype === "bi-chart"){
                  this.chartEventHandler(listener);
              }else if(xtype === "table" || xtype === "bi-table"){
  
              }else if(xtype === "text" || xtype === "bi-text"){
  
              }
            }else{
              console.error("没有为事件对象配制type属性，"+me.item.text);
            }
            
          });
        }
    },
    methods: {
       /**
        * 事件通用处理
        */
       commonHandler(listener,params){
        let me = this;
          if(listener.way && me[listener.way]){
            me[listener.way](params,listener);
          }
          if(listener.handler){
            listener.handler(me,params);
          }else{
            console.log("没有设置回调函数，你真的不想干点什么了吗：",listener);
          }
       },

         /**
          * 图形事件处理
          */
         chartEventHandler(listener){
             let me = this;
             this.$children[0].chart.on(listener.type,function(params){
                debugger;
                me.commonHandler(listener,params);
                
          });

         },

         /**
          * 表格事件处理
          */
         tableEventHandler(){

         },

         /**
          * 文字事件处理
          */
         textEventHandler(){

         },
         /**
          * 增加到tab的动作  openDilog  openWindow
          */
         addTab(params,listener){
          let tab = this.$root.$children[0].$children[0].$children[1].$children[0].$children[0].$children[0];
          let module = tab.$parent.$parent;
          let bb = this.item,text = bb.text;
          let arrs = module.items.filter(bean=>bean.text == text);
          if(arrs.length > 0){
              module.items.forEach((item, index) =>{
                  if(item.tabIndex && item.tabIndex === text ){
                      module.activeTabName = item.tabIndex;
                  }
              });
              return ;
          }
          debugger;
          if(listener.sourceApi){
             //配制加载url的情况
             findDesignSource(listener.sourceApi).then(res => {
              let resData = res.data;
              if(!resData.id){
                resData = eval("(" + resData + ")");
              }
              resData.id =  bb.id;
              resData.text =  text;
              resData.tabIndex =  text;
              resData.closable =  true;
              module.items.push(resData);
              module.activeTabName = resData.text;
          });
          return ;
        }
          //
          module.items.push({
          text: text,
          id: bb.id,
          closable:true,
          xtype:'bi-text',
          tabIndex:text,
          });
          module.activeTabName = text;
         }
    }

    
   
  }
  