<template>
  <div>
    <el-form :inline="true"
             class="header">
      <el-form-item label="开始时间"
                    class="timeSelect">
        <el-date-picker align="right"
                        type="date"
                        :clearable="false"
                        @change="smallEndTime"
                        :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        v-model="startTime">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间"
                    class="timeSelect">
        <el-date-picker align="right"
                        type="date"
                        :clearable="false"
                        @change="bigStartTime"
                        :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        v-model="endTime">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="changeBouncedFn('areaBounced')">区域</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="changeBouncedFn('stateBounced')">数据源</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="search"
                   style="background:#2E5686;border:none;color:#fff;margin-left:25px;">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 查询提示@start -->
    <el-dialog title="提示"
               :visible.sync="searchQuality"
               width="30%">
      <span style="font-size:18px;color:#333">区域和数据源不能为空</span>
    </el-dialog>
    <!-- 查询提示@end -->

  <!-- 查询列表显示 -->
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import url from "@/api/port";
export default {
  name: "SearchHeader",
  data() {
    return {
      eventArr: "123",
      startTime: "",
      endTime: "",
      tabs:[],
      lastStartDate:"",
      lastEndDate:"",
      searchQuality: false,
      pickerOptions:{//时间选择器
          disabledDate:(time)=>{
            
              return time.getTime() > Date.now();
            }
      },
    };
  },
  computed: {
    ...mapGetters("quality", [
      "getterListArr",
      "kindBounceArr",
      "stateBounceArr",
      "rightBounceArr",
      "stateBounceArr",
      "leftBounceArrShow",
      "stateValArr",
      "parametersObj",//区域传来的参数对象
      "sourceTypeSelectedOBj",//数据源传来的参数
 
    ])
  },
   watch:{
      startTime:function(newV,oldV){
        
        this.lastStartDate=oldV;
      },
      endTime:function(newv,oldv){
        this.lastEndDate=oldv;
      },
     
    },
    mounted(){
      this.getOption()
    },
  methods: {
    getOption(){
      this.$http.get(url.getOption).then(res=>{
      let option=JSON.stringify(res)
      let option1=JSON.parse(option)
      console.log(option1.data);
      
      })
    },
    ...mapActions("quality", [
      "rightListArr",
      "leftListArrShow",
      "changeListArr",
      "changeState",
      "stateListArr",
      "resetSelect",
      "getCityName",
      "launchSearchData",//点击查询向右侧组件传入的文件列表的数组数据
      "launchDateObj",//点击查询发射的开始时间和结束时间
    ]),
    changeBouncedFn(data) {
      this.$emit("changeBounced", data);
    },
    search() {
    
      //console.log(this.getterListArr);
      //console.log(this.stateBounceArr);
      //console.log(this.parametersObj);//区域城市的code码
      //console.log(this.sourceTypeSelectedOBj);//数据源选中的中分、高分类型
      //console.log(this.endTime);
      var date={
        startTime:this.startTime,
        endTime:this.endTime
      };
      //console.log(this.stateValArr);
     
      if(this.$store.getters["quality/getterListArr"].length) {
        this.$store.dispatch("quality/rightListArr", true);
        this.$store.dispatch("quality/leftListArrShow", true);
        this.$store.dispatch("quality/stateListArr", this.stateValArr);
        this.$store.dispatch("quality/launchDateObj", date);
        var _this=this;
         this.$http.post(url.searchButton, {
            "areaCode": _this.parametersObj.cityCode,
            "algorithmType": 'VCI',
            "sourceCycleType":_this.sourceTypeSelectedOBj,
            "endDate":_this.endTime,
            "startDate":_this.startTime
          })
          .then(function (response) {
     
            console.log(response);
         
            var listRightArr=[];
            var tallScoreFlie=[];//高分的文件列表 
            var zhongScoreFlie=[];//中分的文件列表
            var diScoreFlie=[];

            for(let i=0;i<response.data.length;i++){
                if(response.data[i].sourceType=="GF2" || response.data[i].sourceType=="GF1"){//高分的文件列表 
                    tallScoreFlie.push(response.data[i].dateFolderName);
                }
                if(response.data[i].sourceType=="HJ1" || response.data[i].sourceType=="LANDSAT"){//中分的文件列表
                    zhongScoreFlie.push(response.data[i].dateFolderName);
                }
                if(response.data[i].sourceType=="modis" ){
                    diScoreFlie.push(response.data[i].dateFolderName);
                }
            }
            //console.log(tallScoreFlie);
            //console.log(diScoreFlie);
             var a=_this.stateValArr;
             for(let i =0;i<a.length;i++){
               console.log(a[i].name);
               if(a[i].name=="高分"){
                 a[i].flies=tallScoreFlie;
               }
                if(a[i].name=="低分"){
                 a[i].flies=diScoreFlie;
               }
                if(a[i].name=="中分"){
                 a[i].flies=zhongScoreFlie;
               }
             }

           //console.log(a);
            _this.$store.dispatch("quality/launchSearchData", a);//获取到高分、中分和低分的文件列表传入右侧组件
            console.log('默认的文件列表');
         
            _this.getfileList(_this.parametersObj.cityCode,'VCI',_this.startTime,_this.sourceTypeSelectedOBj,_this.endTime);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        this.searchQuality = true;
        this.$store.dispatch("quality/rightListArr", false);
        this.$store.dispatch("quality/leftListArrShow", false);
      }
      if (this.stateBounceArr != 0) {
        this.$store.dispatch("quality/scoreListArr", this.stateBounceArr);
      }
      
       let obj={//点击查询清空右侧数据组件的复选框
          radioType:"1",
          selectType:"植被覆盖度",
          searchType:"VCI"
        };
         this.$store.dispatch("quality/resetSelect", obj);
        

         //console.log(this.startTime);
        

    },
   
    getTime() {
      let date = new Date();
      let y = date.getFullYear();
      let yy = date.getFullYear() - 1; //上一年的时间
      let m = date.getMonth() + 1;
      m=m>10?m:"0"+m
      let d = date.getDate();
       d=d>10?d:"0"+d
      let time = y + "-" + m + "-" + d; //当前的时间

      let time1 = yy + "-" + m + "-" + d; //上一年的时间
      this.endTime = time;
      this.startTime = time1;
    },
     smallEndTime(){//开始事件不能大于结束时间
     
     
      var startYear=this.startTime.substr(0,4);
      var startMouth=this.startTime.substr(5,2);
      var startDay=this.startTime.substr(8,2);
      var endYear=this.endTime.substr(0,4);
      var endtMouth=this.endTime.substr(5,2);
      var endtDay=this.endTime.substr(8,2);
      console.log(startMouth);
      if(startYear>endYear){
            const h = this.$createElement;
              this.$message({
                message: h('p', null, [
                  h('span', null, '开始时间不能大于'),
                  h('i', { style: 'color: teal' }, '结束时间')
                ]),duration:2000
              });
              if(this.lastStartDate!=""){
                this.startTime=this.lastStartDate;
              }
              
      }else if(startYear==endYear){
          if(startMouth>endtMouth){
               const h = this.$createElement;
              this.$message({
                message: h('p', null, [
                  h('span', null, '开始时间不能大于'),
                  h('i', { style: 'color: teal' }, '结束时间')
                ]),duration:2000
              });
              if(this.lastStartDate!=""){
                this.startTime=this.lastStartDate;
              }
          }else if(startMouth==endtMouth){
            if(startDay>=endtDay){
                   const h = this.$createElement;
                    this.$message({
                      message: h('p', null, [
                        h('span', null, '开始时间不能大于'),
                        h('i', { style: 'color: teal' }, '结束时间')
                      ]), 
                      duration:2000
                    }
                   );
                     if(this.lastStartDate!=""){
                      this.startTime=this.lastStartDate;
                    }
            }
            
          }
      }
     
    },
     bigStartTime(){//结束时间不能早于开始时间
        var startYear=this.startTime.substr(0,4);
        var startMouth=this.startTime.substr(5,2);
        var startDay=this.startTime.substr(8,2);
        var endYear=this.endTime.substr(0,4);
        var endtMouth=this.endTime.substr(5,2);
        var endtDay=this.endTime.substr(8,2);
        console.log(endtDay);
        if(startYear>endYear){
              const h = this.$createElement;
                this.$message({
                  message: h('p', null, [
                    h('span', null, '结束时间不能小于'),
                    h('i', { style: 'color: teal' }, '开始时间')
                  ]),duration:2000
                });
                if(this.lastEndDate!=''){
                  this.endTime=this.lastEndDate;
                }
        }else if(startYear==endYear){
            if(startMouth>endtMouth){
                const h = this.$createElement;
                this.$message({
                  message: h('p', null, [
                    h('span', null, '结束时间不能小于'),
                    h('i', { style: 'color: teal' }, '开始时间')
                  ]),duration:2000
                });
                 if(this.lastEndDate!=''){
                  this.endTime=this.lastEndDate;
                }
            }else if(startMouth==endtMouth){
              if(startDay>=endtDay){
                    const h = this.$createElement;
                      this.$message({
                        message: h('p', null, [
                          h('span', null, '结束时间不能小于'),
                          h('i', { style: 'color: teal' }, '开始时间')
                        ]), 
                        duration:2000
                      }
                    );
                     if(this.lastEndDate!=''){
                      this.endTime=this.lastEndDate;
                    }
              }
            }
        }
    }
  },
  created() {
    this.getTime();
  },
  beforeDestroy() {
    this.$store.dispatch("quality/rightListArr", false);
    this.$store.dispatch("quality/leftListArrShow", false);
    this.$store.dispatch("quality/changeListArr", []);
  }
};
</script>
<style lang="scss">
.header {
  height: 60px;
  padding: 10px 100px;
  text-align: left;
  background: #eeeeee;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 0px 2px;
  .timeSelect {
    float: left;
    width: 20%;
    label {
      width: 35%;
      float: left;
    }
    .el-form-item__content {
      float: left;
      width: 65%;
      padding: 0;
      .el-date-editor.el-input,
      .el-date-editor.el-input__inner {
        width: 100%;
      }
    }
  }
}
</style>

