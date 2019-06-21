<template>
  <div class="state">
    <el-dialog :visible.sync="isStateFn" style="padding-top: 20px;"
               title="数据源" 
               @close="closeDialog"
               width="30%">
      <div class="higher"
           v-for="(kind,index) in arrs"
           :key="index">
        <h5 id="scoreTitle">{{kind.name}}</h5>
        <!-- <el-checkbox-group v-model="kind.label.radio">
          <el-checkbox :label="1">{{kind.label.text[0]}}</el-checkbox>
          <el-checkbox :label="2">{{kind.label.text[1]}}</el-checkbox>
        </el-checkbox-group> -->
        <el-checkbox-group id="scoretype"
                           v-model="kind.label.radio">
          <el-checkbox label="GF1"
                       :scoreTyle="kind.name"
                       ref="score">{{kind.label.text[0]}}</el-checkbox>
          <el-checkbox label="GF2"
                       :scoreTyle="kind.name"
                       ref="score"
                       v-show="kind.label.text.length>1">{{kind.label.text[1]}}</el-checkbox>
        </el-checkbox-group>

        <el-select  id="scoreSelect" v-model="kind.value"
                   placeholder="请选择">
          <el-option v-for="item in kind.options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>
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
            radio: ["GF1"],
            text: ["GF1", "GF2"]
          },
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
          ],
          value: "年"
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
        console.log(n, o);
        if (n[0].label.radio.length == 2) {
          n[0].label.radio.splice(0, 1);
        }
      },
      deep: true
    }
  },
  methods: {
    ...mapActions("human", ["stateListArr"]),
    ensure() {
      this.isStateFn = false;
      // this.$store.dispatch("human/stateListArr", this.check);
      console.log(this.check);
       let obj={
          type:this.arrs[0].label.radio
        }
       localStorage.setItem("interferenceType",JSON.stringify(obj));
    },
    closeDialog(){//关闭弹框
         let interferenceType=JSON.parse (localStorage.getItem("interferenceType"));
         if(interferenceType!=null){
            this.arrs[0].label.radio=interferenceType.type;
         }
         
    },
    init() {
      this.$store.dispatch("human/stateListArr", ["高分"]);
    }
  },
  mounted() {
    this.init();
    console.log("组件销毁");
    localStorage.clear();
  },
  destroyed(){
    
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
      width: 80px;
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
    .el-dialog__header {
        padding-top: 20px;
    }
}


</style>


