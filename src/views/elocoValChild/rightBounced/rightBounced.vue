<template>
  <div>
    <!-- 高分弹框 -->
    <div class="switchTab"
         v-show="rightBounceArr">
      <el-tabs v-model="activeName"
               @tab-click="handleClick1"
               type="border-card">
        <el-tab-pane label="高分"
                     name="first">
          <ul class="switchTabKind">
            <li v-for="(item,index) in liList"
                v-on:click="addClass(index)"
                v-bind:class="{ curr:index==current}"
                :key="index">{{item.title}}</li>
          </ul>
          <span>
            <el-checkbox-group v-model="checkedCities11"
                               :max="1">
              <el-checkbox v-for="city in cities"
                           :label="city"
                           :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </span>
        </el-tab-pane>
        <!-- <el-tab-pane label="中分" name="second">中分</el-tab-pane> -->
        <el-button type="primary"
                   size="mini"
                   @click="bouncedEchart"
                   style="background:#2E5686;border:none;color:#fff;margin:0 15px 15px 0;float:right">确定</el-button>
      </el-tabs>
      <div class="bounceEcharts"
           v-show="ok">
        <i v-show="ok1"><img src="static/img/shengtai.png" /><em @click="ok1=false">X</em></i>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "RightBounced",
  data() {
    return {
      ok: false,
      ok1: false,
      ok2: false,
      current: 0,
      liList: [
        { title: "年" },
        { title: "季" },
        { title: "月" },
        { title: "旬" },
        { title: "日" }
      ],
      checkedCities11: ["201812230000COOD"],
      cities: [
        "201812230000COOD",
        "201811230000COOD",
        "201810230000COOD",
        "201809230000COOD",
        "201807230000COOD",
        "201806230000COOD",
        "201805230000COOD",
        "201804230000COOD",
        "201801230000COOD"
      ],
      activeName: "first"
    };
  },
  computed: {
    ...mapGetters("val", ["rightBounceArr"])
  },
  watch: {
    rightBounceArr(nl, ol) {
      console.log(nl, ol);
    }
  },
  methods: {
    handleClick1(tab, event) {
      console.log(tab, event);
    },
    addClass: function(index) {
      this.current = index;
    },
    bouncedEchart() {
      this.ok = true;
      this.ok1 = true;
    },
    ...mapActions("val", ["rightListArr"]),
    init() {
      this.$store.dispatch("val/rightListArr", false);
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="scss">
.switchTab {
  position: absolute;
  top: 30px;
  right: 4%;
  width: 17%;
  background: #fff;
  z-index: 99;
  border-radius: 5px;
  .el-tab-pane {
    // display: inline-block!important;
    float: left;

    width: 100%;
    .switchTabKind {
      display: block;
      width: 100%;
      margin: 0;
      padding: 0;
      height: 36px;
      border-bottom: 1px solid rgb(204, 185, 185);
      li {
        float: left;
        width: 20%;
        line-height: 36px;
        list-style: none;
        text-align: center;
        cursor: pointer;
      }
      li.curr {
        background: #0a2e54;
        color: #fff;
        font-size: 14px;
      }
    }
    .el-checkbox {
      display: block;
      margin: 10px 0 20px 30px;
    }
  }
  .bounceEcharts {
    position: fixed;
    top: 300px;
    left: 100px;
    right: 100px;
    z-index: 999;
    i {
      float: left;
      width: 500px;
      padding: 60px;
      background: #fff;
      margin-right: 100px;
      position: relative;
      img {
        width: 90%;
      }
      em {
        position: absolute;
        right: 25px;
        top: 15px;
        font-size: 24px;
        font-style: normal;
        font-weight: normal;
      }
    }
    b {
      float: left;
      width: 310px;
      padding: 60px;
      background: #fff;
      position: relative;
      img {
        width: 100%;
      }
      em {
        position: absolute;
        right: 25px;
        top: 15px;
        font-size: 24px;
        font-style: normal;
        font-weight: normal;
      }
    }
  }
}
</style>


