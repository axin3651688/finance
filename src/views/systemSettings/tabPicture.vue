<template>
    <div :style="styles">
        <!-- 维度管理——>图片编辑管理(新) -->
        <!-- 
            name : sjz
            time : 2019/3/21 
         -->
        <!-- 
         
            响应式布局：
            1. xs <768px 响应式栅格数或者栅格属性对象
            2. sm ≥768px 响应式栅格数或者栅格属性对象
            3. md ≥992   响应式栅格数或者栅格属性对象
            4. lg ≥1200  响应式栅格数或者栅格属性对象
            注：全局最大为24
            
        -->
        <el-row :gutter="10">
            <el-col :xs="12" :sm="24" :lg="24">
                <div class="pic_first" :style="styler">
                    <div class="text">
                        <span>轮播图一</span>
                    </div>
                    <div class="picture">
                        <img src="@a/loginT/first.jpg">
                    </div>
                    <div class="buttons">
                        <el-button type="primary" disabled>替换文件</el-button>
                        <span>默认图片，不可替换</span>
                    </div>
                </div>
                <div :style="stylex" v-for="item in items">
                    <div class="text">
                        <span>{{ item.text }}</span>
                    </div>
                    <div class="button">
                        <el-upload                            
                            class="avatar-uploader"
                            :action="item.action"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="item.imageUrl" :src="item.imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            <el-button type="primary" >替换文件</el-button>
                            <span>支持jpg、jpeg、png文件</span>
                        </el-upload>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { UploadShow } from '~api/cube';
export default {
    data(){
        return {
            items: [
                { id: '2', text: '轮播图二', action: '/zjb/upload/carousel?id=2', imageUrl: '' },
                { id: '3', text: '轮播图三', action: '/zjb/upload/carousel?id=3', imageUrl: '' },
                { id: '4', text: '轮播图四', action: '/zjb/upload/carousel?id=4', imageUrl: '' }
            ],
            styles: {
                height: "0px",
                backgroundColor: "#fff"
            },
            styler: {
                height: "300px",
                width : "395.5px",
                boxShadow: "0px 0px 10px #ccc",
                float : "left", 
                marginTop : "20px"
            },
            stylex: {
                height: "300px",
                width : "395.5px",
                boxShadow: "0px 0px 10px #ccc",
                float : "left",
                marginTop : "20px"
            }
        }
    },
    created(){
        this.styles.height = document.body.offsetHeight - 40 - 64 - 32 + "px" ;
    },
    mounted(){
        // （1）自适应高度
        this.setTableScollHeight() ;
        // （3）初始化轮播图
        this.initCarousels() ;
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
        },
        // （2.0）上传图片之前的拦截
        beforeAvatarUpload(file, varx){
            if(!file){
                return ;
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            const isJpg = file.type === "image/jpeg" ;
            const isPng = file.type === "image/png" ;
            if((!isJpg && !isPng) || (isPng && isJpg)) {
                this.$message.error('请匹配图片格式.jpeg/ .jpg/ .png !');
                return false ;
            }
            if(!isLt2M) {
                this.$message.error('图片的大小不能超过2M!');
                return false ;

            } 
            return true;
        },
        // （2.1）上传图片成功的方法
        handleAvatarSuccess(res, file, fileList){
            if(res.data.code == 200){
                this.items.forEach(vax => {
                    if(vax.id === res.data.data.name){
                        vax.imageUrl = res.data.data.content + "?t=" + new Date().getTime();
                    }
                })
            }else{
                this.$message.error('图片上传失败了!');
            }
        },
        // （3）初始化轮播图 防止刷新页面的时候图片消失
        initCarousels(){
            // 走马灯轮播请求
            UploadShow().then(ress => {
                let me = this ;
                if(ress.data.code == 200){
                    let datas = ress.data.data;
                    if(datas.length > 0 ){
                        me.items.forEach(element => {
                            datas.forEach(item => {
                                if(element.id === item.name){
                                    element.imageUrl = item.content ;
                                }
                            });
                        });
                        
                    }
                }
            })
        }
    }
}
</script>
<style scoped>
    .text {
        font-weight: bold ;
        text-align: center;
        letter-spacing: 5px;
        font-size: 16px;
        margin-top: 10px;
    }
    /* 第一个默认图片 */
    .picture img {
        height: 180px;
        width : 365.5px;
        margin-top: 15px;
        margin-left: 15px;
    }
    /* 第一个默认按钮 */
    .buttons button {
        width : 150px; 
        margin-top: 20px;
        margin-left: 15px;
    }
    /* 第一个字设置 */
    .buttons span {
        font-size: 13px;
        color: #909399 ;
        margin-left: 30px;
    }
    /* 第二、第三、第四 */
    .avatar {
        height: 180px;
        width : 365.5px;
        margin-top: 15px;
    }
    /* 第二、第三、第四 边框 */
    .avatar-uploader-icon{
        font-size: 28px;
        color: #8c939d;
        width: 365.5px;
        height: 180px;
        line-height: 180px;
        text-align: center;
        border: 1px dashed #d9d9d9;
        margin-top: 15px;
    }
    /* 第二、第三、第四 移入图片边框蓝色 */
    .avatar-uploader-icon:hover {
        border-color: #409EFF;
    }

    /* 第二、第三、第四 按钮 */
    .button button {
        width : 150px; 
        margin-top: 20px;
        margin-left: -34px;
    }
    /* 第二、第三、第四 text字体设置 */
    .button span {
        font-size: 13px;
        color: #909399 ;
        margin-left: 30px;
    }
</style>
