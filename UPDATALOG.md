#  所有的涉及底层修改的以及代码修改注意事项的，统一在这里备注

## zdk 2019-1-8 16:18:22  ly和boss说所有饼图图例均在下方
    pie.js中的默认legend修改为：
         legend: {
            bottom: 10,
			left: "center",
            data: []
        },

##    zdk 2019-1-8 21:32:27  没做的页面不显示了，不给点 正式开发时记得删除
       if(e.url.indexOf("api/test") > 0 || e.id=== 351){
        alert("正在玩命开发中...");
        return ;
          
      }

      