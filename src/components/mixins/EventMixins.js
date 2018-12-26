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
        let xtype = me.item.xtype;
        if(me.item.listeners){
          me.item.listeners.forEach(listener => {
            if(listener.type){
              if(xtype === "chart" || xtype === "bi-chart"){
                  this.chartEventHandler(listener);
              }else if(xtype === "table" || xtype === "bi-table"){
                  
              }else if(xtype === "text" || xtype === "bi-text"){
  
              }else if(xtype === "form" || xtype === "tree-grid"){
                this.tableEventHandler(listener)
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
       commonHandler(listener,params,bb){
        let me = this;
          if(listener.way && me[listener.way]){
            me[listener.way](params,listener,bb);
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
                me.commonHandler(listener,params);
                
          });

         },

         /**
          * 表格事件处理
          */
         tableEventHandler(listener){
          // let me = this;
          // this.$children[0].chart.on(listener.type,function(params){
          //    debugger;
          //    me.commonHandler(listener,params);
          // })
        },

         /**
          * 文字事件处理
          */
         textEventHandler(){

         },
         /**
          * 增加到tab的动作  openDilog  openWindow
          * unshift()方法是向数组的开头添加一个或多个元素
          */
         addTab(params,listener,bb){
           debugger;
          let tab = this.$root.$children[0].$children[0].$children[1].$children[0].$children[0].$children[0];
          let module = tab.$parent.$parent;
          if(!bb){
            bb = this.item;
          }
          let text = bb.text;
          let arrs = module.items.filter(bean=>bean.text == text);
          if(arrs.length > 0){
              module.items.forEach((item, index) =>{
                  if(item.tabIndex && item.tabIndex === text ){
                      module.activeTabName = item.tabIndex;
                  }
              });
              return ;
          }
          let action = "push";
          if(listener.location && listener.location == "before"){
            action = "unshift";
          }
          debugger;
          if(listener.sourceApi){
             //配制加载url的情况
             findDesignSource(listener.sourceApi).then(res => {
              let resData = res.data;
              if(resData.data && resData.data.source){
                resData = resData.data.source;
              }
              if(!resData.id){
                resData = eval("(" + resData + ")");
              }
              if(!resData.xtype && resData.items.length > 0){
              }
              resData.id =  bb.id;
              resData.text =  text;
              resData.tabIndex =  text;
              resData.closable =  true;
              module.items[action](resData);
              module.activeTabName = resData.text;
          });
          return ;
        }
          //
          module.items[action]({
          text: text,
          id: bb.id,
          closable:true,
          xtype:'bi-text',
          tabIndex:text,
          });
          module.activeTabName = text;
         }
    },
    /**
     * 表格的单元格事件
     */
    onCellClick(row, column, cell, event){
      console.info(row);
      debugger;
        if(row._drill || row.drill){
            if(cell.cellIndex === 0 ){
               debugger;
            }
        }
    }

    
   
  }
  