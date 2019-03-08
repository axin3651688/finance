#树表展开Jtreegrid说明

![可爱的四系乃](https://p1.ssl.qhmsg.com/t0167955e5f22953246.jpg)

**基于vue.js实现树形表格的封装（vue-tree-table）**： [地址](https://github.com/sijinglei/vue-tree-table) 
 
----------
  **说明** 
   1. 本组件为异步加载数据,目前只能用于树表展开
   2. 通过 ` this.$bus.$on`接收子组件的点击事件，
   3. 文件在pages里面创建好后，要在其里面的index进行导入
   4. 目前连线暂未实现
   5. 由于是异步获取数据,所以不能一次性把数据查出来,只能先把数据清空,再查跟元素
   
   
  
