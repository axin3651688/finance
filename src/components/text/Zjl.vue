<template>
  <div class="Cbsb" style="overflow:auto;">
    <div class="cause">
      <div class="text" style="overflow-y:auto;" id="content">
          <ul v-if='this.showData.length' style="min-height:150px; padding-inline-start: 30px;">
              <li v-html="this.showData"  >{{this.showData.length}}</li>
          </ul>
          <div v-if='!this.showData.length'  style="min-height:150px;background:#faebcc;text-align:center;padding-top:45px;font-size:18px;">
            <strong>温馨提示：</strong> 还未填报原因！
          </div>
      </div>
      
      <!-- <div class="mfooter" style="margin-top: -10px;"> -->
      <div class="btn-group" id="Btn" style="float: right; margin-top:60px;">
          <el-button @click="sendMsg" type="primary" class="send" id="CloseBtn">
                关  &nbsp;  闭  
          </el-button>
      </div>
      <!-- </div> -->
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
import { mapActions, mapGetters } from "vuex";
import { queryCellDetail } from "~api/interface";
export default {
  name: "Zjl",
  components: {},
  props: [{
    showDialog:Object,
    default:''
    }],
  data() {
    return {
      showData:''
    };
  },
  computed: {
    ...mapGetters(['user', "companyId","saveInlocal"]),
    cubeId(){
      return this.user.license.id
    }
  },
  created() {
    this.showDetail();
  },

  methods: {
    ...mapActions(["ShowDialog"]),

    /**
     * @desc    : 点击发送催报数据到后台
     */

    sendMsg() {
      this.ShowDialog({ isShow: false });
    },

    showDetail() {
      debugger;
      let _companyId = this.companyId;
      let _getters = this.$store.getters;

      let year = _getters.year,
        month = _getters.month;

      let _month = month < 9 ? "0" + month : month;

      let _period = year + _month + "";
      let localStorage = this.localStorage;
      // let cubeId = ;

      let _sql =
        "SELECT  c.scontent AS cause FROM sys_source_comment c INNER JOIN sys_topic_source s ON s.nid = c.nsource WHERE s.smoduleid IN ('report') AND s.scontent LIKE '%/_"+ _companyId +"_"+ _period +"_1-mainlastYear_1%' ESCAPE '/' ORDER BY s.createtime DESC";
      let params = {
        cubeId: this.cubeId,
        sql: encodeURI(_sql)
      };

      queryCellDetail(params).then(res => {
        debugger;
        let data = res.data.data[0];
        if(data){
          this.showData = data.cause;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.text {
  font-size: 16px;
  width: 620px;
  // padding: 10px;
  padding-top: 10px;
  max-height: 350px;
  overflow: auto;
  line-height:35px;
  background-color: #f5f5f5;
}
.text ul{
  list-style:none;
}
</style>






