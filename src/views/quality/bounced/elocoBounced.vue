<template>
  <div> 
    <el-dialog :visible.sync="isEcoloFn" @close="closeDialog"
               width="40%"
               title="生态类型"
               class="Ecological">
      <div>
        <el-row v-for="(item,index) in items"
                :key="index">
          <el-col :span="5">
            <el-checkbox v-model="item.check">{{item.kind}}</el-checkbox>
          </el-col>
          <el-col :span="18" :offset="1">
            <span class="ecologicType" v-for="(val,index) in item.text" :key="index">{{val}}</span>
          </el-col>
        </el-row>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="isEcoloFn = false">取 消</el-button>
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
  name: "ElocoBounced",
  props: {
    isEcolo: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isEcoloFn: {
      get() {
        return this.isEcolo;
      },
      set() {
        this.$emit("changeBounced", "elocoBounced");
      }
    }
  },
  data() {
    return {
      items: [
        {
          check: true,
          kind: "一级类型",
          text:[
            "森林生态系统",
            "草地生态系统",
            "农田生态系统",
            "灌从生态系统",
            "湿地生态系统",
            "城镇生态系统"
          ]
        },
        {
          check: false,
          kind: "二级类型",
          text:[
            "针叶林",
            "草木荒原",
            "草甸",
            "阔叶林",
            "典型草原(沙地)",
            "湖泊",
            "河流"
          ]
        }
      ]
    };
  },
  methods: {
    ...mapActions("quality",["kindListArr"]),
    ensure() {
      let arr1=this.items.filter(val=>{
          return val.check==true
      })
      console.log(arr1)
      this.isEcoloFn = false;
       let obj={
          level1:this.items[0].check,
          level2:this.items[1].check
          
        }
      localStorage.setItem("levelType",JSON.stringify(obj));
      this.$store.dispatch("quality/kindListArr", arr1);
    },
    closeDialog(){//点击关闭弹框的事件
          let levelType=JSON.parse (localStorage.getItem("levelType"));
          if(levelType!=null){
               this.items[0].check=levelType.level1;
               this.items[1].check=levelType.level2;
          }
         
    }
  },
  mounted(){
     localStorage.clear();//清空保存的状态数据
  }
};
</script>
<style lang="scss">
.Ecological {
  .ecologicType {
    font-size: 12px;
    display: inline-block;
    width: 32%;
    text-align: left;
    font-size: 14px;
    color: #333;
  }
  .el-dialog__header {
    padding-top: 20px;
  }
  .el-row {
    line-height: 40px;
  }
}
</style>

