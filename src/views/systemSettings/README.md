# systemSettings---系统设置
  + log --- 日志管理
  + online --- 在线用户
  + EVA --- eva表
  + cityResults2 --- 市管企业经营业绩情况表
  + cityResults --- 市管企业经营业绩情况表（旧的，弃用）
  + dimension --- 维度管理
    - tabPicture --- 图片编辑管理
    - tabIndustry -- 行业板块管理

# 接口
  - 路径：src/api/cube.js
  - import { dataRequest } from '~api/cube';
  - 
  + cube.js
    - import request from 'utils/http'
    - 写法：
    ~~~
        // sjz 日志管理接口
        export function dataRequest(data) {
            return request({
                url: '/api/api/find_sys_log?cubeId=7',
                method: 'post',
                data:data
            })
        }
        // sjz 在线用户接口
        export function onlineRequest(data) {
            return request({
                url: '/api/api/online_user_list',
                method: 'post',
                data: data
            })
        }
    ~~~ 
    ~~~
        let item = {
                "page": currentPage,
                "pageSize": pagesize,
                "type":me.searchForm.stype,
                "username": me.searchForm.username
        };
        dataRequest(item).then(res => {
            // debugger
            //获取总数据
            me.allNum = res.data.data.allNum;
            //获取行信息渲染
            me.tableData = res.data.data.pageData;
        });
    ~~~


# 样式引入
  - 路径：src/styles/public/system.scss
  - @import '~@s/public/system.scss';

# 动态设置自适应窗口页面
~~~
1. 
export default{
    data(){
        return{
            // 窗口的原始高度
            offsetHeight: document.body.offsetHeight
        }
    }
} 
~~~ 

~~~ 
2. 
mounted(){
    const me = this
    // 页面大小改变时触发  主要用来自适应页面的布局的 注：一个组件只能写一个页面触发，写多个也只有一个生效
    window.onresize = () => {
        debugger
        return (() => {
            window.offsetHeight = document.body.offsetHeight;
            me.offsetHeight = window.offsetHeight;
        })()
    }
}
~~~ 

~~~
3. 
watch:{
    // 监听offsetHeight属性值的变化，打印并观察offsetHeight发生变化的值：
    offsetHeight(val){
        debugger
        if(!this.timer){
            debugger
            // 一旦监听到的offsetHeight值改变，就将其重新赋给data里的offsetHeight
            this.offsetHeight = val
            this.timer = true
            let me = this
            setTimeout(function(){
                // 计算得到的高度 仿写
                me.heights = document.body.offsetHeight - me.inputRefresh - 70 - 64 - 30;
                // 打印offsetHeight变化的值
                console.log(me.offsetHeight)
                me.timer = false
            },300)
        }
    }
} 
~~~ 
~~~
4. 自适应高度方法（推荐）
mounted(){
    // （1）自适应高度
    this.setTableScollHeight() ;
},
methods: {
    // （1）自适应高度方法
    setTableScollHeight(res){
        // debugger
        this.styles.height = document.body.offsetHeight - 40 - 64 - 32 + "px" ;
        const me = this ;
        window.onresize = function temp(){
            me.styles.height = document.body.offsetHeight - 40 - 64 - 32 + "px" ;
        }
    }
}
~~~