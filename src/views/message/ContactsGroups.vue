<template>
  <div class="ContactsGroups">
    <div class="panel-left">
      <ul class="sub-item">
        <li v-for="i in 8" :key="i">
          <figure>
            <div class="img-box">
              <img src>
            </div>
            <div class="info">
              <h3>公司软件群（15人）</h3>
            </div>
          </figure>
          <i class="arrow el-icon-arrow-right"></i>
        </li>
      </ul>
    </div>
    <div class="panel-right">
      <div class="panel-right-top">
        <div class="avatar-box">
          <img src alt class="avatar-img">
        </div>
        <div class="text">
          <h3 class="text-title">公司软件群</h3>
          <p class="text-info">15人</p>
        </div>
        <el-button type="primary" size="medium" class="my-btn">发送信息</el-button>
      </div>
      <div class="panel-right-content">
        <section>
          <h4 class="title">群组成员</h4>
          <div class="content">
            <ul>
              <li v-for="i in 8" :key="i">
                <figure>
                  <div class="img-box">
                    <img src alt>
                  </div>
                  <span class="info">名字</span>
                </figure>
              </li>
            </ul>
          </div>
        </section>
        <section>
          <h4 class="title">最新公告</h4>
          <div class="content">
            <p class="pure-text">今天下班前必须把任务完成</p>
          </div>
        </section>
        <section>
          <h4 class="title">群二维码</h4>
          <div class="content">
            <div class="qr-code">
              <img src alt>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactsGroups"
};
</script>

<style lang="scss" scoped>
@import "@s/green/variables.scss";

.ContactsGroups {
  display: flex;
  height: 100%;

  li {
    list-style: none;
  }
}

.panel-left {
  flex: 0.5;
  height: 100%;
  border-right: 1px solid $colorBorder2;

  ul.sub-item {
    li {
      position: relative;
      height: 60px;
      padding: 0 30px;
      border-right: 6px solid transparent;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        box-shadow: 0 3px 20px rgba(0, 0, 0, 0.15);
        border-right-color: $colorTheme;
      }

      .arrow {
        position: absolute;
        right: 24px;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    figure {
      display: flex;
      align-items: center;
      height: 100%;
      border-bottom: 1px solid $colorBorder2;

      .img-box {
        width: 40px;
        height: 40px;
        overflow: hidden;
        margin-right: 20px;
        border-radius: 8px;
        background: $colorTheme;
      }

      .info {
        font-family: $fontFamilyMain;
        font-weight: 400;
        line-height: 20px;

        h3 {
          height: 19px;
          font-size: 14px;
          font-weight: bold;
          line-height: 20px;
          color: $colorText2;
        }

        p {
          height: 16px;
          font-size: 12px;
          color: $colorText5;
        }
      }
    }
  }
}

.panel-right {
  flex: 0.5;
  padding: 60px 30px 0 30px;

  .panel-right-top {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 58px;

    .avatar-box {
      margin-right: 40px;
      width: 100px;
      height: 100px;
      overflow: hidden;
      border-radius: 14px;
      background: $colorTheme;
    }

    .text {
      font-weight: 400;
      line-height: 20px;

      .text-title {
        height: 40px;
        font-size: 30px;
        color: $colorText1;
      }

      .text-info {
        height: 24px;
        font-size: 18px;
        color: $colorText3;
      }
    }

    .my-btn {
      position: absolute;
      right: 0;
      bottom: 0;
      background: $colorTheme;
    }
  }

  .panel-right-content {
    font-weight: 400;

    section {
      margin-bottom: 40px;
    }

    .title {
      margin-bottom: 10px;
      height: 24px;
      font-size: 18px;
      line-height: 20px;
      color: $colorText3;
    }

    .content {
      ul {
        display: flex;
        flex-wrap: wrap;

        li {
          margin-right: 40px;
          margin-bottom: 30px;

          figure {
            display: flex;
            flex-direction: column;
            align-items: center;

            .img-box {
              overflow: hidden;
              margin-bottom: 10px;
              width: 60px;
              height: 60px;
              border-radius: 50%;
              background: $colorTheme;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.16);

              img {
                width: 100%;
                height: 100%;
              }
            }

            .info {
              height: 21px;
              font-size: 16px;
              font-weight: 400;
              line-height: 20px;
              color: $colorText1;
            }
          }
        }
      }

      .pure-text {
        height: 21px;
        font-size: 16px;
        line-height: 20px;
        color: $colorText1;
      }

      .qr-code {
        width: 100px;
        height: 100px;
        background: #cccccc;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>