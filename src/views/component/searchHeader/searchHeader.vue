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
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions"
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
                         value-format="yyyy-MM-dd"
                          :picker-options="pickerOptions"
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
      <span style="font-size:18px;color:#333">请分别选择对应的区域、数据类型以及数据源</span>
    </el-dialog>
    <!-- 查询提示@end -->
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
// import rightBouncedVue from '../rightBounced/rightBounced.vue';
export default {
  name: "SeacherHeader",
  data() {
    return {
      eventArr: "123",
      startTime: "",
      endTime: "",
      pickerOptions:{//时间选择器
          disabledDate:(time)=>{
            
              return time.getTime() > Date.now();
            }
        },
      searchQuality: false
    };
  },
  computed: {
    ...mapGetters("ecolo", [
      "getterListArr",
      "kindBounceArr",
      "stateBounceArr",
      "rightBounceArr",
      "leftBounceArrShow",
      "stateValArr"
    ])
  },
  methods: {
    ...mapActions("ecolo", [
      "rightListArr",
      "leftListArrShow",
      "changeListArr",
      "changeState",
      "stateListArr",
      "resetSelect"
    ]),
    changeBouncedFn(data) {
      this.$emit("changeBounced", data);
    },
    search() {
      console.clear();
      
      if (this.$store.getters["ecolo/getterListArr"].length) {
        this.$store.dispatch("ecolo/rightListArr", true);
        this.$store.dispatch("ecolo/leftListArrShow", true);
        this.$store.dispatch("ecolo/stateListArr", this.stateValArr);
      } else {
        this.searchQuality = true;
        this.$store.dispatch("ecolo/rightListArr", false);
        this.$store.dispatch("ecolo/leftListArrShow", false);
      }

        let obj={//，清空右侧组件的复选框
          inputSelect:"1",
          radioType:"生态分布"
          };
          this.$store.dispatch("ecolo/resetSelect", obj);
        
    },
    getTime() {
      let date = new Date();
      let y = date.getFullYear();
      let yy = date.getFullYear() - 1; //上一年的时间
      let m = date.getMonth() + 1;
      let d = date.getDate();
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
      if(startYear>endYear){
            const h = this.$createElement;
              this.$message({
                message: h('p', null, [
                  h('span', null, '开始时间不能大于'),
                  h('i', { style: 'color: teal' }, '结束时间')
                ]),duration:1000
              });
      }else if(startYear==endYear){
          if(startMouth>endtMouth){
               const h = this.$createElement;
              this.$message({
                message: h('p', null, [
                  h('span', null, '开始时间不能大于'),
                  h('i', { style: 'color: teal' }, '结束时间')
                ]),duration:1000
              });
          }else if(startMouth==endtMouth){
            if(startDay>=endtDay){
                   const h = this.$createElement;
                    this.$message({
                      message: h('p', null, [
                        h('span', null, '开始时间不能大于'),
                        h('i', { style: 'color: teal' }, '结束时间')
                      ]), 
                      duration:1000
                    }
                   );
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
        if(startYear>endYear){
              const h = this.$createElement;
                this.$message({
                  message: h('p', null, [
                    h('span', null, '开始时间不能大于'),
                    h('i', { style: 'color: teal' }, '结束时间')
                  ]),duration:1000
                });
        }else if(startYear==endYear){
            if(startMouth>endtMouth){
                const h = this.$createElement;
                this.$message({
                  message: h('p', null, [
                    h('span', null, '开始时间不能大于'),
                    h('i', { style: 'color: teal' }, '结束时间')
                  ]),duration:1000
                });
            }else if(startMouth==endtMouth){
              if(startDay>=endtDay){
                    const h = this.$createElement;
                      this.$message({
                        message: h('p', null, [
                          h('span', null, '开始时间不能大于'),
                          h('i', { style: 'color: teal' }, '结束时间')
                        ]), 
                        duration:1000
                      }
                    );
              }
            }
        }
    }
  },
  created() {
    this.getTime();
  },
  beforeDestroy() {
    this.$store.dispatch("ecolo/rightListArr", false);
    this.$store.dispatch("ecolo/leftListArrShow", false);
    this.$store.dispatch("ecolo/changeListArr", []);
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


