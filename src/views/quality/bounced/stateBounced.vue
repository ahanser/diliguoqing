<template>
  <div class="state">
    <el-dialog :visible.sync="isStateFn" @close="closeDialog"
               title="数据源"
               width="30%">
       <div class="higher">
        <h5 class="title">高分</h5>
        <el-checkbox-group v-model="checkListTall" style="margin-left:-30px;"
                           class="checkBox">
          <el-checkbox label="GF1"></el-checkbox>
          <el-checkbox label="GF2"></el-checkbox>

        </el-checkbox-group>
        <el-select class="selcetDate"
                   v-model="valueTall"
                   style="width:30%;"
                   placeholder="请选择">
          <el-option v-for="item in valueTalls"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>
      <!-- <div class="higher"  style="margin-top:20px;">
        <h5 class="title">中分</h5>
        <el-checkbox-group v-model="checkList"
                           class="checkBox">
          <el-checkbox label="HJ1"></el-checkbox>
          <el-checkbox label="LANDSAT"></el-checkbox>

        </el-checkbox-group>
        <el-select class="selcetDate"
                   v-model="valueZhong"
                   style="width:30%;"
                   placeholder="请选择">
          <el-option v-for="item in optionsZhong"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="higher"
           style="margin-top:20px;">
        <h5>低分</h5>
        <el-checkbox-group v-model="checkListLowscore"
                           class="checkBox"
                           style="width:166px;">
          <el-checkbox label="MODIS"></el-checkbox>
        </el-checkbox-group> -->
        <!-- <el-checkbox v-model="lowGradechecked" >MODIS</el-checkbox> -->

        <!-- <el-select v-model="valuedi"
                   style="width:30%;"
                   placeholder="请选择">
          <el-option v-for="item in optionsDi"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div> -->
<!-- 
      <P style="color:red;margin-left:30px;">多选，同种数据源类型仅可选择一种</P> -->
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="ensure"
                   style="background:#2E5686;border:none;color:#fff;margin-right:40px;">确 定</el-button>
        <el-button @click="isStateFn = false" style="background:#2E5686;border:none;color:#fff;margin-right:50px;">取 消</el-button>
       
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "StateBounced",
  data() {
    return {
      optionsZhong: [
        {
          value: "COAY",
          label: "年"
        },
        {
          value: "COAM",
          label: "月"
        },
        {
          value: "COAQ",
          label: "季"
        },
        {
          value: "COTD",
          label: "旬"
        },
        {
          value: "COOD",
          label: "日"
        }
      ],
      valueTalls:[
         {
          value: "COAY",
          label: "年"
        },
        {
          value: "COAM",
          label: "月"
        },
        {
          value: "COAQ",
          label: "季"
        },
        {
          value: "COTD",
          label: "旬"
        },
        {
          value: "COOD",
          label: "日"
        }
      ],
      optionsDi: [
        {
          value: "COAY",
          label: "年"
        },
        {
          value: "COAM",
          label: "月"
        },
        {
          value: "COAQ",
          label: "季"
        },
        {
          value: "COTD",
          label: "旬"
        },
        {
          value: "COOD",
          label: "日"
        }
      ],
      valueZhong: "COAY", //中分
      valuedi: "COAY",//低分
      valueTall:"COAY",//高分
      checkListLowscore: [], //低分
      checkListTall:["GF1"],//高分的复选框
      checkList: [] //中分的复选框
    };
  },
  props: {
    isState: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isStateFn: {
      get() {
        return this.isState;
      },
      set() {
        this.$emit("changeBounced", "stateBounced");
      }
    }
  },
  watch: {
    checkList: function(newval, oldval) {
      if (newval.length == 2) {
        newval.splice(0, 1);
      }
    },
    checkListTall:function(newval,oldval){
      if (newval.length == 2) {
        newval.splice(0, 1);
      }
    }
  },
  methods: {
    ...mapActions("quality", ["stateListArr", "changeState"," launchStatesourceType"]),
    
    ensure() {
     
      let scoreTypeArr = [];
      console.log(this.checkList);
      if (this.checkListTall[0] == "GF1" || this.checkListTall[0] == "GF2") {//做的点击中分和低分下的月份
        var year;
        if(this.valueTall=="COAY"){
          year="年";

        }
         if(this.valueTall=="COAM"){
          year="月";
          
        }
         if(this.valueTall=="COAQ"){
          year="季";
          
        }
         if(this.valueTall=="COTD"){
          year="旬";
          
        }
         if(this.valueTall=="COOD"){
          year="日";
          
        }
        var tallObj={
              name:"高分",
              source:this.checkListTall[0],
              cycle:this.valueTall,
              year:year,
              flies:""
        }
        scoreTypeArr.push(tallObj);
         this.isStateFn = false;
      }else{
          this.$message({
          message: '请选择至少一个选项',
          type: 'warning'
        });
        return
      }
     
      if (this.checkList[0] == "HJ1" || this.checkList[0] == "LANDSAT") {//做的点击中分和低分下的月份
        var year;
        if(this.valueZhong=="COAY"){
          year="年";

        }
         if(this.valueZhong=="COAM"){
          year="月";
          
        }
         if(this.valueZhong=="COAQ"){
          year="季";
          
        }
         if(this.valueZhong=="COTD"){
          year="旬";
          
        }
         if(this.valueZhong=="COOD"){
          year="日";
          
        }
        var zhongObj={
              name:"中分",
              source:this.checkList[0],
              cycle:this.valueZhong,
              year:year,
              flies:""
        }
        scoreTypeArr.push(zhongObj);
      }
      if (this.checkListLowscore == "MODIS") {//做的点击中分和低分下的月份
           var year;
            if(this.valuedi=="COAY"){
              year="年";

            }
            if(this.valuedi=="COAM"){
              year="月";
              
            }
            if(this.valuedi=="COAQ"){
              year="季";
              
            }
            if(this.valuedi=="COTD"){
              year="旬";
              
            }
            if(this.valuedi=="COOD"){
              year="日";
              
            }
            var diObj={
                name:"低分",
                source:this.checkListLowscore[0],
                cycle:this.valuedi,
                year:year,
                flies:""
          }
        scoreTypeArr.push(diObj);
      }
      console.log(scoreTypeArr);
      
        let obj={
          zhongfen:this.checkList,
          difen:this.checkListLowscore
        }
   
      console.log(this.checkListTall);
      console.log(this.valueTall);
        
        var strZhongSourceType;
        if(this.checkList.length!=0 &&this.checkListLowscore.length==0 ){//只选中分
          strZhongSourceType="source:"+this.checkList[0]+",cycle:"+this.valueZhong;
        }
        if(this.checkList.length==0 &&this.checkListLowscore.length!=0 ){//只选低分
          strZhongSourceType="source:"+this.checkListLowscore[0]+",cycle:"+this.valuedi;
        }
         if(this.checkList.length==0 &&this.checkListTall.length!=0 ){//只选高分分
          strZhongSourceType="source:"+this.checkListTall[0]+",cycle:"+this.valueTall;
        }
         if(this.checkList.length!=0 &&this.checkListLowscore.length!=0 ){//选择了中分和低分
          strZhongSourceType="source:"+this.checkListLowscore[0]+",cycle:"+this.valuedi+";source:"+this.checkList[0]+",cycle:"+this.valueZhong;
        }
         if(this.checkList.length!=0 &&this.checkListTall.length!=0 ){//选择了中分和高分
          strZhongSourceType="source:"+this.checkListTall[0]+",cycle:"+this.valueTall+";source:"+this.checkList[0]+",cycle:"+this.valueZhong;
        }
        if(this.checkListLowscore.length!=0 &&this.checkListTall.length!=0 ){//选择了低分和高分
          strZhongSourceType="source:"+this.checkListTall[0]+",cycle:"+this.valueTall+";source:"+this.checkListLowscore[0]+",cycle:"+this.valuedi;
        }
         if(this.checkListLowscore.length!=0 &&this.checkListTall.length!=0 && this.checkList.length!=0){//选择了低分和高分 中分
          strZhongSourceType="source:"+this.checkListTall[0]+",cycle:"+this.valueTall+";source:"+this.checkListLowscore[0]+",cycle:"+this.valuedi+";source:"+this.checkList[0]+",cycle:"+this.valueZhong;
        }
        console.log(strZhongSourceType);

      localStorage.setItem("qualityselectScoreType",JSON.stringify(obj));
      this.$store.dispatch("quality/changeState", scoreTypeArr);
      if(strZhongSourceType!=undefined){
        this.$store.dispatch("quality/launchStatesourceType", strZhongSourceType);//数据源传的选中的中分、高分的类型
      }
    },
    closeDialog(){//点击关闭弹框的事件
      let qualityselectScoreType=JSON.parse (localStorage.getItem("qualityselectScoreType"));
      if(qualityselectScoreType!=null){
           this.checkList=qualityselectScoreType.zhongfen;
           this.checkListLowscore=qualityselectScoreType.difen;
      }
     
    },
    init() {
      this.$store.dispatch("quality/changeState", [//不点击确定的时候，默认传递高分GF1的数据
                {
                  cycle: "COAY",
                  flies: [],
                  name: "高分",
                  source: "GF1",
                  year: "年"
                }]
                );
       var  strZhongSourceType="source:"+this.checkListTall[0]+",cycle:"+this.valueTall;
       this.$store.dispatch("quality/launchStatesourceType", strZhongSourceType);////不点击确定的时候，默认传递高分GF1的数据参数
    }
  },
  mounted() {
    this.init();
     localStorage.clear();//清空保存的状态数据
  }
};
</script>
<style lang="scss">
.state {
  .higher {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h5 {
      margin: 0;
    }
  }

  .middle,
  .low {
    line-height: 36px;
    margin-bottom: 10px;
    h5 {
      float: left;

      line-height: 36px;
      width: 10%;
      margin: 0 5px;
    }
    .el-select {
      float: right;
      margin-left: 5px;
      width: 38%;
      .el-input--small .el-input__inner {
        line-height: 36px;
        height: 36px;
      }
    }
  }
}
.el-dialog__header {
  padding-top: 20px;
}
</style>


