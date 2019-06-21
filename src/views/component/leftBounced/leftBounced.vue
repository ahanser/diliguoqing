<template>
  <div>
    <div class="disSelect"
         v-show="leftBounceArrShow">
      <el-select v-model="value"
                 @change="selectType"
                 placeholder="请选择">
        <el-option v-for="(item,index) in options"
                   :key="index"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
      <span class="radio">
        <el-radio v-model="ecolotyArearadio"
                  @change="getRadioType"
                  v-for="(item,index) in ecolotyArea "
                  :label="item.label"
                  :key="index">{{item.text}}</el-radio>

      </span>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "LeftBounced",
  data() {
    return {
      radio: "1",
      options: [
        {
          value: "生态分布",
          label: "生态分布"
        },
        {
          value: "类型转换",
          label: "类型转换"
        }
      ],
      ecolotyArearadio: "1",
      ecolotyArea: [
        {
          radio: "1",
          text: "分布",
          label: "1"
        },
        {
          radio: "1",
          text: "斑块",
          label: "2"
        }
      ],
      zhuanhuanType: [
        {
          radio: "1",
          text: "对比",
          label: "1"
        },
        {
          radio: "2",
          text: "分析",
          label: "2"
        }
      ],
      value: "生态分布",

      selectInput: ""
    };
  },
  computed: {
    ...mapGetters("ecolo", ["leftBounceArrShow","resetSelectArr"])
  },
  watch:{
    resetSelectArr(nl,ol){
          //左侧组件监听到关闭弹框的命令
          this.ecolotyArea=  [
            {
              radio: "1",
              text: "分布",
              label: "1"
            },
            {
              radio: "1",
              text: "斑块",
              label: "2"
            }
          ];
          this.value="生态分布";
          this.ecolotyArearadio="1";
    }
  },
  methods: {
    ...mapActions("ecolo", [
      "leftListArr",
      "leftListArrShow",
      "leftBounceArrSelectType"
    ]),
    selectType(val) {
      console.log(val);
      this.selectInput = val;
      this.ecolotyArearadio = "1";
      if (val == "生态分布") {
        this.ecolotyArea = [
          {
            radio: "",
            text: "分布",
            label: "1"
          },
          {
            radio: "",
            text: "斑块",
            label: "2"
          }
        ];
      }
      if (val == "类型转换") {
        this.ecolotyArea = this.zhuanhuanType;
        console.log(this.ecolotyArearadio);
        
      }
      let obj = {
        //刚切换到类型转换，用户不选单选框。触发的事件。
        inputSelect: this.ecolotyArearadio,
        radioType: val
      };
      this.$store.dispatch("ecolo/leftBounceArrSelectType", obj);
      this.$store.dispatch("ecolo/leftListArr", obj);
      
    },
    getRadioType(val) {
      console.log(val);
      console.log(this.value);
      let toTabData = {
        inputSelect: val,
        radioType: this.value
      };
      console.log(toTabData);
      this.$store.dispatch("ecolo/leftListArr", toTabData);
    },
    init() {
      this.$store.dispatch("ecolo/leftListArrShow", false);
      this.$store.dispatch("ecolo/leftListArr", {
        inputSelect: "1",
        radioType: "生态分布"
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="scss" scoped>
.disSelect {
  position: absolute;
  background: #fff;
  width: 300px;
  top: 16px;
  border-radius: 3px;
  height: 40px;
  left: 8%;
  z-index: 99;
  .el-select {
    float: left;
    width: 30%;
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

    .el-radio {
      height: 40px;
      line-height: 40px;
      margin-left: 15px;
      float: left;
      display: inline;
    }
  }
}
</style>


