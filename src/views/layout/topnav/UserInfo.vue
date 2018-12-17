<template>
  <el-row type="flex" class="row-bg" justify="center">
    <el-col :span="13">
      <img src="../../../assets/infoshow.png" alt class="avataimg">
    </el-col>
    <el-col :span="11">
      <div class="user">
        <img :src="user.avatar" alt class="avatar">
      </div>
      <div class="user-item">
        <div>姓名:{{user.trueName}}</div>
        <div>邮箱:{{user.email}}</div>
        <div>电话:{{user.phone}}</div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "infoshow",
  computed: {
    user() {
      return this.$store.getters.user.user;
    }
  }
};
</script>

<style lang='scss' scoped>
.infoshow {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.row-bg {
  width: 100%;
  height: 100%;
}

.user {
  text-align: center;
  position: relative;
  top: 30%;
}

.user img {
  width: 150px;
  border-radius: 50%;
}

.user span {
  display: block;
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}

.userinfo {
  height: 100%;
  background-color: #eee;
}

.user-item {
  position: relative;
  top: 30%;
  padding: 26px;
  font-size: 16px;
  color: #333;
}
</style>