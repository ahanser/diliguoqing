<template>
  <div>
    <div class="disSelect"
         v-show="leftBounceArrShow">
      <el-select v-model="value"
                 @change="resetRadio"
                 placeholder="请选择"
                 ref="scelct">
        <el-option v-for="item in options"
                   :key="item.id"
                   :label="item.algorithm_name"
                   :value="item.id">
        </el-option>
      </el-select>
      <span class="radio">
        <el-radio v-model="radio"
                  @change="getOptionType"
                  :label=item.label
                  v-for="(item,index) in radioArr"
                  :key=index>{{item.text}}</el-radio>
                 
      </span>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import url from "@/api/port";
export default {
  name: "LeftBounced",
  data() {
    return {
      radio: "1",
      radioArr: [
        {
          label: "1",
          text: "估算",
          
        },
        {
          label: "2",
          text: "分析"
        }
       ],
      options: [],
      value:'1',
      secrchType:'VCI',
      radioType:'1'
    };
  },
  computed: {
    ...mapGetters("quality", ["leftBounceArrShow","resetSelectArr"])
  },
  methods: {
     getOption(){
      this.$http.get(url.getOption).then(res=>{
      let option=JSON.stringify(res)
      let option1=JSON.parse(option)
      this.options=option1.data
      })
    },
    ...mapActions("quality", [
      "leftListArrShow",
      "radioListArr",
      "selectListArr"
    ]),
    init() {
      this.$store.dispatch("quality/leftListArrShow", false);
      this.$store.dispatch("quality/radioListArr", {
        selectType: "植被覆盖度",
        radioType: "1",
        secrchType:'VCI'
      });
    },
    getOptionType(oldval) {

      console.log(this.radio);
     let radioType = {
      selectType: this.options[this.value-1].algorithm_name,
      radioType: this.radio,
      secrchType:this.options[this.value-1].algorithm_type
     };
     this.$store.dispatch("quality/radioListArr", radioType);
    },
    resetRadio(val) {
      //下拉框变化时候重置单选框的选中状态
    this.radio = "1";
    console.log(val);
     let radioType = {
      selectType: this.options[this.value-1].algorithm_name,
      radioType: this.radio,
      secrchType:this.options[this.value-1].algorithm_type
     };
     this.$store.dispatch("quality/radioListArr", radioType);
    }
  },
  watch:{
    resetSelectArr(nl,ol){
        console.log(nl);
        console.log(ol);
     //console.log(this.options[this.value-1].algorithm_name);
      this.value="1"
      this.$store.dispatch("quality/radioListArr", {
        selectType: "植被覆盖度",
        radioType: this.radio,
        secrchType:'VCI'
      });
    }
  },
  mounted() {
    this.init();
    this.getOption();
  }
};
</script>
<style lang="scss">
.disSelect {
  position: absolute;
  background: #fff;
  width: 400px;
  top: 10%;
  border-radius: 3px;
  height: 40px;
  left: 8%;
  z-index: 99;
  .el-select {
    float: left;
    width: 40%;
    height: 40px;
    .el-input__inner {
      height: 40px;
      border: none;
      border: 1px solid #ddd;
      box-sizing: border-box;
    }
  }
  span.radio {
    float: left;
    width: 60%;

    .el-radio {
      height: 40px;
      line-height: 40px;
      margin-left: 15px;
      float: left;
      width: 26%;
    }
  }
}
</style>


