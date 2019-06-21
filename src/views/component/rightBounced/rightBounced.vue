<template>
  <div>
    <!-- 高分弹框 -->
    <div class="switchTab"
         v-show="rightBounceArr">
      <el-tabs v-model="activeName"
               @tab-click="handleClick1"
               type="border-card">
        <el-tab-pane :label="item"
                     v-for="(item,index) in tabPlane"
                     :name="item"
                     :key="index">
          <ul class="switchTabKind">
            <li v-for="(item,index) in liList"
                v-on:click="addClass(index)"
                v-bind:class="{ curr:index==current}"
                :key="index">{{item.title}}</li>
          </ul>
          <span>
            <el-checkbox-group v-model="checkedCities11"
                               :min="minSelect"
                               :max="maxSelect">
              <el-checkbox v-for="city in cities"
                           :label="city"
                           :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </span>
          <el-button type="primary"
                     size="mini"
                     @click="bouncedEchart"
                     style="background:#2E5686;border:none;color:#fff;margin:0 15px 15px 0;float:right">确定</el-button>
        </el-tab-pane>

      </el-tabs>
      
      <!-- <div class="bounceEcharts"
           v-show="ok">
        <i v-show="ok4"><img src="static/img/ban.png" /><em @click="ok4=false">X</em></i>
        <i v-show="ok1"><img src="static/img/fenbuBounce1.png" /><em @click="ok1=false">X</em></i>
        <b v-show="ok2"><img src="static/img/fenbuBounce2.png" /><em @click="ok2=false">X</em></b>

        <i v-show="ok3"><img src="static/img/fenbuBounce1.png" /><em @click="ok3=false">X</em></i>

      </div>
      <div class="bounceEcharts"
           v-show="ok22">
        <i v-show="ok12"><img src="static/img/compare.png" /><em @click="ok12=false">X</em></i>
        <i v-show="ok13"><img src="static/img/fnxi.png" /><em @click="ok13=false">X</em></i>
      </div> -->
    </div>
    <el-dialog 
        title=""
        :visible.sync="dialogVisibleFenbu"
        width="60%"
        >
        <div class="fenbuImg" style="display:inline-block ;width:100%;vertical-align: bottom;" >
           <div style="width:30%;float:left;margin-right:5%; position: relative;">
            <img :src="ecologicalImg1" alt="" style="width:90%;">
            <span style="position: absolute;right:10px;top:10px;">X</span>
          </div>
          <div style="width:65%;float:left; position: relative;">
            <img :src="ecologicalImg2" alt="" style="width:90%;">
            <span style="position: absolute;right:10px;top:10px;">X</span>
          </div>
         
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleFenbu = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisibleFenbu = false">确 定</el-button>
        </span>
  </el-dialog>
      <el-dialog 
            title=""
            :visible.sync="dialogVisibleFenbusame"
            width="60%"
            >
            <div class="fenbuImg" style="display:inline-block ;width:100%;vertical-align: bottom;" >
              <div style="width:45%;float:left;margin-right:5%; position: relative;vertical-align: baseline">
                <img :src="ecologicalsameImg1" alt="" style="width:90%;">
                <span style="position: absolute;right:10px;top:10px;">X</span>
              </div>
              <div style="width:45%;float:left; position: relative;vertical-align: bottom">
                <img :src="ecologicalsameImg2" alt="" style="width:90%;">
                <span style="position: absolute;right:10px;top:10px;">X</span>
              </div>
            
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisibleFenbusame = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisibleFenbusame = false">确 定</el-button>
            </span>
      </el-dialog>
       <el-dialog 
            title=""
            :visible.sync="dialogVisibletylesame"
            width="60%"
            >
            <div class="fenbuImg" style="display:inline-block ;width:100%;text-align: center;" >
              <div style="width:80%;float:left;margin:0 auto; position: relative;">
                <img :src="tylesameImg" alt="" style="width:90%;">
                <span style="position: absolute;right:10px;top:10px;">X</span>
              </div>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisibletylesame = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisibletylesame = false">确 定</el-button>
            </span>
      </el-dialog>
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
      ok3: false,
      ok4: false,
      ok12: false,
      ok13: false,
      ok22: false,
      ecologicalImg1:"",
      ecologicalImg2:"",
      ecologicalsameImg1:"",//生态分布的图片1的路径
      ecologicalsameImg2:"",//生态分布的图片2的路径
      dialogVisibleFenbu:false,
      dialogVisibleFenbusame:false,//生态分布的弹框显示
      dialogVisibletylesame:false,//类型转换的弹框显示
      tylesameImg:"",//类型转换图片路径
      
      current: 0,
      liList: [
        { title: "年" },
        { title: "季" },
        { title: "月" },
        { title: "旬" },
        { title: "日" }
      ],

      tabPlane: [
        //   {
        //   label:"高分",
        //   name:"first"
        // },  {label:"中分",
        //   name:"second"
        // }
      ],
      minSelect: 0,
      maxSelect: 2,
      checkedCities11: [],
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
      leftSelectType: "",
      activeName: "",
      leftCheck: ""
    };
  },
  computed: {
    ...mapGetters("ecolo", [
      "getterListArr",
      "kindBounceArr",
      "stateBounceArr",
      "rightBounceArr",
      "leftBounceArr",
      "leftBounceArrSelectType",
      "resetSelectArr"
      // "stateValArr"
    ])
  },
  watch: {
    rightBounceArr(nl, ol) {
      // console.log(nl,ol)
    },
    // stateValArr(nl, ol) {
    //   console.clear();
    //   console.log(nl);
    // },
    stateBounceArr(nl, ol) {
      console.log(nl, ol);
      this.tabPlane = nl;
      this.activeName = this.tabPlane[0];
    },
    leftBounceArr(nl, ol) {
        
      if (nl.radioType == "类型转换") {
        this.leftSelectType = nl;
      }
      if (nl.radioType == "生态分布") {
        this.leftCheck = nl;
      }
      if (nl.inputSelect == 2 && nl.radioType == "生态分布") {
        this.minSelect = 0;
        this.maxSelect = 2;
        this.checkedCities11 = [];
      }
      if (nl.inputSelect == 1 && nl.radioType == "生态分布") {
        this.minSelect = 0;
        this.maxSelect = 2;
        this.checkedCities11 = [];
      }
      if (nl.inputSelect == 2 && nl.radioType == "类型转换") {
        console.log("类型转换");
        this.minSelect = 0;
        this.maxSelect = 2;
        this.checkedCities11 = [];
      }
      if (nl.inputSelect == 1 && nl.radioType == "类型转换") {
        console.log("类型转换1111");
        this.minSelect = 0;
        this.maxSelect = 2;
        this.checkedCities11 = [];
      }
    },
    leftBounceArrSelectType(nl, ol) {
      console.log(nl);
      this.leftSelectType = nl;
      if (nl.radioType == "类型转换") {
        this.minSelect = 0;
        this.maxSelect = 2;
        this.checkedCities11 = [];
      }
    },
    resetSelectArr(nl,ol){//监听右侧弹框
       console.log(nl);
       this.checkedCities11 = [];

    }
  },
  methods: {
    ...mapActions("ecolo", ["rightListArr","resetSelect"]),
    handleClick1(tab, event) {
      console.log(tab, event);
    },
    addClass: function(index) {
      this.current = index;
    },
    bouncedEchart(){
      console.log(this.leftBounceArr);
      if(this.leftBounceArr.radioType=="生态分布"&&this.leftBounceArr.inputSelect=="1"){
           if (this.checkedCities11.length == 0) {
            const h = this.$createElement;
            this.$message({
              message: h("p", null, [
                h("span", null, "请选择至少"),
                h("i", { style: "color: teal" }, "一个城市")
              ]),
              duration: 1000
            });
            return;
          }
          if(this.checkedCities11.length==1){
            this.ecologicalImg1="static/img/fenbuBounce2.png";
            this.ecologicalImg2="static/img/fenbuBounce1.png";
            this.dialogVisibleFenbu=true;
          }
           if(this.checkedCities11.length==2){
            this.ecologicalsameImg1="static/img/fenbuBounce1.png";
            this.ecologicalsameImg2="static/img/fenbuBounce1.png";
            this.dialogVisibleFenbusame=true;
          }
          
      }

       if(this.leftBounceArr.radioType=="生态分布"&&this.leftBounceArr.inputSelect=="2"){
           if (this.checkedCities11.length == 0) {
            const h = this.$createElement;
            this.$message({
              message: h("p", null, [
                h("span", null, "请选择至少"),
                h("i", { style: "color: teal" }, "一个城市")
              ]),
              duration: 1000
            });
            return;
          }
           if(this.checkedCities11.length==1){
            this.ecologicalImg1="static/img/ban.png";
            this.ecologicalImg2="static/img/fenbuBounce1.png";
            this.dialogVisibleFenbu=true;
          }
           if(this.checkedCities11.length==2){
            this.ecologicalsameImg1="static/img/fenbuBounce1.png";
            this.ecologicalsameImg2="static/img/fenbuBounce1.png";
            this.dialogVisibleFenbusame=true;
          }
      }

      if(this.leftBounceArr.radioType=="类型转换"&&this.leftBounceArr.inputSelect=="1"){
           if (this.checkedCities11.length != 2) {
              const h = this.$createElement;
              this.$message({
                message: h("p", null, [
                  h("span", null, "请选择"),
                  h("i", { style: "color: teal" }, "两个城市")
                ]),
                duration: 1000
              });
              return;
            }
            this.tylesameImg="static/img/compare.png";
            this.dialogVisibletylesame=true;

      }
       if(this.leftBounceArr.radioType=="类型转换"&&this.leftBounceArr.inputSelect=="2"){
           if (this.checkedCities11.length != 2) {
            const h = this.$createElement;
            this.$message({
              message: h("p", null, [
                h("span", null, "请选择"),
                h("i", { style: "color: teal" }, "两个城市")
              ]),
              duration: 1000
            });
            return;
          }
           this.tylesameImg="static/img/fnxi.png";
           this.dialogVisibletylesame=true;
      }
    },
    

    init() {
      this.$store.dispatch("ecolo/rightListArr", false);
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
  width: 15%;
  background: #fff;
  z-index: 99;
  border-radius: 5px;
  .el-tab-pane {
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
  el-dialog{
     .fenbuImg{
       background: red;
       
      div{
        float: left;
        
      }
      div:nth-child(1){
        img{
          width: 10%;
        }
      }
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
        cursor: pointer;
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


