<template>
  <div class="state">
    <el-dialog :visible.sync="isStateFn" @close="closeDialog"
               title="数据源"
               width="30%">
      <div class="higher"
           v-for="(kind,index) in arrs"
           :key="index">
        <h5 id="scoreTitle">{{kind.name}}</h5>
        <el-checkbox-group id="scoretype"
                           v-model="kind.label.radio">
          <el-checkbox label="选项一"
                       :scoreTyle="kind.name"
                       ref="score">{{kind.label.text[0]}}</el-checkbox>
          <el-checkbox label="选项二"
                       :scoreTyle="kind.name"
                       ref="score"
                       v-show="kind.label.text.length>1">{{kind.label.text[1]}}</el-checkbox>
        </el-checkbox-group>

        <el-select v-model="kind.value"
                   id="scoreSelect"
                   placeholder="请选择">
          <el-option v-for="item in kind.options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>

      <P style="color:red;margin-left:30px;">多选，同种数据源类型仅可选择一种</P>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="isStateFn = false">取 消</el-button>
        <el-button type="primary"
                   @click="ensure"
                   style="background:#2E5686;border:none;color:#fff;margin-left:25px;">确 定</el-button>
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
      arrs: [
        {
          name: "高分",
          label: {
            radio: ["选项一"],
            text: ["GF1", "GF2"]
          },
          value: "年",
          options: [
            {
              value: "选项1",
              label: "年"
            },
            {
              value: "选项2",
              label: "月"
            },
            {
              value: "选项3",
              label: "季"
            },
            {
              value: "选项4",
              label: "旬"
            },
            {
              value: "选项5",
              label: "日"
            }
          ]
        },
        {
          name: "中分",
          label: {
            radio: [],
            text: ["HJ1", "LANDSAT"]
          },
          value: "年",
          options: [
            {
              value: "选项1",
              label: "年"
            },
            {
              value: "选项2",
              label: "月"
            },
            {
              value: "选项3",
              label: "季"
            },
            {
              value: "选项4",
              label: "旬"
            },
            {
              value: "选项5",
              label: "日"
            }
          ]
        },
        {
          name: "低分",
          label: {
            radio: [],
            text: ["MODIS"]
          },
          value: "年",
          options: [
            {
              value: "选项1",
              label: "年"
            },
            {
              value: "选项2",
              label: "月"
            },
            {
              value: "选项3",
              label: "季"
            },
            {
              value: "选项4",
              label: "旬"
            },
            {
              value: "选项5",
              label: "日"
            }
          ]
        }
      ]
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
    arrs: {
      handler: function(n, o) {
        console.log(n);
        console.log(o);
        if (n[0].label.radio.length == 2) {
          n[0].label.radio.splice(0, 1);
        }
        if (n[1].label.radio.length == 2) {
          n[1].label.radio.splice(0, 1);
        }
        if (n[2].label.radio.length == 2) {
          n[2].label.radio.splice(0, 1);
        }
      },
      deep: true
    }
  },
  methods: {
    ...mapActions("ecolo", ["stateListArr", "changeState"]),
    ensure() {
      console.log(this.arrs[0].label.radio);
      let arrScore = [];
      console.log(this.$refs.score);
      for (let i = 0; i < this.$refs.score.length; i++) {
        console.log(this.$refs.score[i]._vnode.data.attrs["aria-checked"]);
        if (this.$refs.score[i]._vnode.data.attrs["aria-checked"] == true) {
          arrScore.push(this.$refs.score[i].$el.getAttribute("scoreTyle"));
        }
      }
      console.log(arrScore);
      this.isStateFn = false;

      //存储用户确定确定过的复选框
      console.log(this.arrs[0].label.radio);
        let obj={
          gaofen:this.arrs[0].label.radio,
          zhongfen:this.arrs[1].label.radio,
          difen:this.arrs[2].label.radio
        }
      localStorage.setItem("selectScoreType",JSON.stringify(obj));
      this.$store.dispatch("ecolo/changeState", arrScore);
    },
    closeDialog(){//关闭弹框的事件  
        console.log(JSON.parse (localStorage.getItem("selectScoreType")));
        let selectScoreType=JSON.parse (localStorage.getItem("selectScoreType"));
        if(selectScoreType!=null){
            this.arrs[0].label.radio=selectScoreType.gaofen;
            this.arrs[1].label.radio=selectScoreType.zhongfen;
            this.arrs[2].label.radio=selectScoreType.difen;
        } 
      
    },
    init() {
      this.$store.dispatch("ecolo/changeState", ["高分"]);
    }
  },
  mounted() {
    this.init();
     localStorage.clear();//清空保存的状态数据
  }
};
</script>
<style lang="scss" scoped>
.state {
  .higher {
    h5 {
      margin: 0;
    }
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    #scoreTitle {
      width: 80px;
    }
    #scoretype {
      width: 300px;
    }
    #scoreTitle,
    #scoretype,
    #scoreSelect {
      vertical-align: middle;
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


