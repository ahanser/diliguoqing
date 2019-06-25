<template>
  <div>
    <el-dialog :visible.sync="isRegionFn" @close="closeDialog"
               width="40%">
      <el-tabs v-model="activeRegion"
               @tab-click="handleClick">
        <el-tab-pane label="人类干扰区域"
                     name="first">
          <div class="adminRegion">
            <el-checkbox :indeterminate="isIndeterminate"
                         v-model="checkAll"
                         @change="handleCheckAllChange">全选</el-checkbox>
            <div style="margin:5px 0 10px 0;"></div>
            <el-checkbox-group v-model="checkedCities"
                               @change="handleCheckedCitiesChange">
              <el-checkbox v-for="city in cities"
                           :label="city"
                           :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-tab-pane>

      </el-tabs>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="isRegionFn = false">取 消</el-button>
        <el-button style="background:#2E5686;border:none;color:#fff;margin-left:25px;"
                   @click="ensure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import url from "@/api/port";
export default {
  name: "AreaBounced",
  data() {
    return {
      activeRegion: "first",
      checkAll: false,
      checkedCities: [],
      cities: [
        "上海",
        "北京",
        "广州",
        "深圳",
        "青岛",
        "济南",
        "西安",
        "河南",
        "重庆",
        "成都",
        "甘肃"
      ],
      isIndeterminate: false
    };
  },
  props: {
    isRegion: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isRegionFn: {
      get() {
        return this.isRegion;
      },
      set() {
        this.$emit("changeBounced", "areaBounced");
      }
    }
  },
  methods: {
    ...mapActions("human", ["changeListArr","getMapCity"]),
    ensure() {
      this.isRegionFn = false;
      // console.log(this.checkedCities);
        let obj={
            checkedCities:this.checkedCities
        }
      localStorage.setItem("interferenceAreatype",JSON.stringify(obj));
      this.$store.dispatch("human/changeListArr", this.checkedCities);
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cities : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    handleClick() {
      // console.log("0000");
    },
    closeDialog(){//关闭弹框
          let selectScoreType=JSON.parse (localStorage.getItem("interferenceAreatype"));
          if(selectScoreType!=null){
               this.checkedCities=selectScoreType.checkedCities;
          }
         
    }
  },
  mounted(){
    localStorage.clear();//清空保存的状态数据
  }
};
</script>
<style lang="scss" scoped>
.adminRegion {
  margin: 0;
  overflow: hidden;
  .el-checkbox-group {
    padding: 0;
    .el-checkbox {
      width: 20%;
      float: left;
      text-align: center;
      margin-left: 0;
      line-height: 30px;
    }
  }
}
</style>

