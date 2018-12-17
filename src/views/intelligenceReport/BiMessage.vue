<template>
    <div>
        <div class="container">
            <div class="left">
                <ul>
                    <li class="addressbook">
                        <img src="@/assets/green/contact_icon.svg" alt="">
                        <h3>通讯录（60人）</h3>
                        <img class="img" src="@/assets/green/contact_list.svg" alt="">
                        <div class="border"></div>
                    </li>
                    <li>
                        <img src="@/assets/green/sys_icon.svg" alt="">
                        <h3>系统消息</h3>
                        <p>今天风险信息系统经过了第一轮测试,显示的值...</p>
                        <img class="img" src="@/assets/green/contact_list.svg" alt="">
                        <div class="border"></div>
                    </li>
                    <li>
                        <img src="@/assets/green/sys_icon.svg" alt="">
                        <h3>通讯录（60人）</h3>
                        <img class="img" src="@/assets/green/contact_list.svg" alt="">
                        <div class="border"></div>
                    </li>
                    <li>
                        <h3>通讯录（60人）</h3>
                        <img class="img" src="@/assets/green/contact_list.svg" alt="">
                        <div class="border"></div>
                    </li>
                    <li>
                        <img src="@/assets/green/sys_icon.svg" alt="">
                        <h3>通讯录（60人）</h3>
                        <img class="img" src="@/assets/green/contact_list.svg" alt="">
                        <div class="border"></div>
                    </li>
                    <li>
                        <img src="@/assets/green/sys_icon.svg" alt="">
                        <h3>通讯录（60人）</h3>
                        <img class="img" src="@/assets/green/contact_list.svg" alt="">
                        <div class="border"></div>
                    </li>
                    <li>
                        <img src="@/assets/green/sys_icon.svg" alt="">
                        <h3>通讯录（60人）</h3>
                        <img class="img" src="@/assets/green/contact_list.svg" alt="">
                        <div class="border"></div>
                    </li>
                </ul>
            </div>
            <div class="right">
                <div class="top">
                    <div class="title">
                    <!-- <img src="" alt=""> -->
                    <div class="img"></div>
                    <div class="titleleft">
                        <h3>张某<span>（客服总监）</span></h3>
                        <p>安徽经邦软件有限公司</p>
                    </div>
                    <div class="titleright">
                        <p class="message">消息</p>
                        <p class="file">文件</p>
                    </div>
                </div>
                    <div class="newmessage">
                        <div class="user">
                            <div class="avater"></div>
                            <div class="usermessage">
                                <h3>张某</h3>
                                <div class="radius"></div>
                                <h5>2018-10-15    15:00</h5>
                            </div>
                        </div>
                        <div class="content">
                            <p>今天你这边需要做的事情有...</p>
                        </div>
                    </div>
                </div>
                <div class="comment">
                    <div class="edit">

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                
            }
        },
        methods:{
           
        }
        
    }
</script>
<style lang="scss" scoped>
    #app .containerMain{
        padding-left:0px ;
        padding-right:0px;
        width: 100%;
        height: 100%;
        .container{
            // position: relative;
            width: 100%;
            height: 100%; 
            overflow: hidden; 
            .left{
                width: 300px;
                height: 100%;
                float: left;
                background:rgba(255,255,255,1);
                box-shadow:3px 0px 20px rgba(0,0,0,0.1);
                opacity:1;
                ul{
                    width: 100%;
                    height: 100%;
                    li{
                        position: relative;
                        overflow: hidden;
                        padding:20px 20px;
                        img{
                            width: 46px;
                        }
                        p{
                            font-size:12px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            line-height:16px;
                            color:rgba(0,0,0,0.70);
                            opacity:1;
                        }
                        .img{
                            width: 20px;
                            float:right;
                        }
                        .border{
                            width: 300px;
                            height: 1px;
                            background:rgba(0,0,0,0.2);
                            opacity:1;
                            position: absolute;
                            bottom: 0;
                            left: 0;
                        }
                    }
                    .addressbook{
                        width: 100%;
                        padding:27px 20px;
                        background:rgba(255,255,255,1);
                        box-shadow:3px 0px 20px rgba(0,0,0,0.1);
                        img{
                            width: 46px;
                            float: left;
                        }
                        h3{
                            font-size:16px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            float: left;
                            color:rgba(0,0,0,1);
                            opacity:1;
                            margin:15px 0 0 20px;
                        }
                        .img{
                            width: 20px;
                            float: right;
                            margin-top:13px;
                            border-radius: 50%;
                        }
                    }
                }
            }
            .right{
                position: absolute;
                // bottom: 0;
                left:300px;
                width: calc(100% - 300px);
                height: 100%;
                background:rgba(235,236,236,1);
                // background-color: #000;
                opacity:1;
                padding:40px;
                .title{
                    position: relative;
                    overflow: hidden;
                    .img{
                        width: 80px;
                        height: 80px;
                        background-color: green;
                        border-radius: 50%;
                        // margin-top:60px;
                        float: left;
                    }
                    .titleleft{
                        float: left;
                        margin:20px 0 0 30px;
                        h3{
                            font-size:18px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            opacity:1;
                            span{
                                color:rgba(0,0,0,0.60);
                            }
                        }
                        p{
                            font-size:16px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            margin-top:8px;
                            color:rgba(0,0,0,0.80);
                            opacity:1;
                        }
                    }
                    .titleright{
                        height: 24px;
                        width: 160px;
                        display: flex;
                        position: absolute;
                        right: 360px;
                        top:30px;
                        padding:0;
                        .message{
                            width: 80px;
                            height: 24px;
                            background:rgba(24,146,113,1);
                            opacity:1;
                            border-radius:66px 0px 0px 66px;
                            font-size:14px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            line-height:24px;
                            color:rgba(255,255,255,1);
                            opacity:1;
                            text-align: center;
                        }
                        .file{
                            height:24px;
                            width: 80px;
                            background:rgba(0,0,0,0.1);
                            opacity:1;
                            border-radius:0px 66px 66px 0px;
                            font-size:14px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            line-height:24px;
                            color:rgba(0,0,0,0.20);
                            opacity:1;
                            text-align: center;
                        }
                    }
                }
                .top{
                    background:rgba(235,236,236,1);
                    opacity:1;
                    padding:40px 30px 0 40px;
                    box-sizing: border-box;
                    .newmessage{
                        background-color: #fff;
                        width: 100%;
                        padding:10px 0 20px 20px;
                        box-sizing: border-box !important;
                        background:rgba(255,255,255,1);
                        box-shadow:0px 20px 30px rgba(8,69,81,0.1);
                        opacity:1;
                        border-radius:12px !important;
                        .user{
                            overflow: hidden;
                            height: 40px;
                            .avater{
                                width: 40px;
                                height: 40px;
                                background-color: orange;
                                border-radius:50%;
                                float: left;
                            }
                            .usermessage{
                                float:left;
                                margin-left:20px;
                                line-height: 20px;
                                position: relative;
                                h3{
                                    font-size:14px;
                                    font-family:Microsoft YaHei;
                                    font-weight:400;
                                    line-height:20px;
                                    color:rgba(0,0,0,1);
                                    opacity:1;
                                }
                                .radius{
                                    width:10px;
                                    height:10px;
                                    background:rgba(239,60,60,1);
                                    border-radius:50%;
                                    opacity:1;
                                    position: absolute;
                                    left:160px;
                                    top: 15px;
                                }
                                h5{
                                    font-size:14px;
                                    font-family:Microsoft YaHei;
                                    font-weight:400;
                                    line-height:20px;
                                    color:rgba(0,0,0,0.40);
                                    opacity:1;
                                }
                            }
                        }
                    }
                }
                .comment{
                    height: 200px;
                    width: 100%;
                    background-color: pink;
                    position: relative;
                    bottom: 0;
                    opacity:1;
                    padding:40px 30px 0 40px;
                    box-sizing: border-box;
                    .edit{
                        background-color: #fff;
                        width: 100%;
                        padding:10px 0 20px 20px;
                        box-sizing: border-box !important;
                        background:rgba(255,255,255,1);
                    }
                }
                        
            }
        }
    }
</style>