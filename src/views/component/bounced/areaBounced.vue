<template>
  <div>
    <el-dialog :visible.sync="isRegionFn"
               width="40%" >
      <el-tabs v-model="activeRegion"  
               @tab-click="handleClick" id="tabs">
        <el-tab-pane label="行政区域"
                     name="first">
          <div class="adminRegion" > 
            <div class="adminRegion-table">
              <div class="table-head">
                <div class="selection">
                  <el-checkbox :indeterminate="indeterminate"
                               v-model="ischeckAll"
                               @change="handleCheckAllChange"></el-checkbox>甘肃省
                </div>
              </div>
              <div class="table-body"
                   v-for="(partition,partitionIndex) in distributorsInfo"
                   :key="partitionIndex">
                <div class="selection">
                  <p>
                    <el-checkbox :indeterminate="partition.indeterminate"
                                 v-model="partition.selected"
                                 @change="handleCheckedCountryAllChange(partitionIndex,partition.partitionId,$event)"
                                 :key="partitionIndex"></el-checkbox>{{ partition.partitionName }}
                  </p>
                </div>
                <div class="eachName">
                  <el-checkbox class="eachCheck"
                               v-for="country in partition.country"
                               v-model="country.selected"
                               @change="handleCheckedCountryChange(partitionIndex,country.id,partition.partitionId,$event)"
                               :label="country"
                               :key="country.id">{{country.fieldName}}</el-checkbox>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="生态区域"
                     name="second">
          <div class="adminRegion">
            <div class="adminRegion-table">
              <div class="table-head">
                <div class="selection">
                  <el-checkbox :indeterminate="indeterminate1"
                               v-model="ischeckAll1"
                               @change="handleCheck"></el-checkbox>全选
                </div>
              </div>
              <div class="table-body"
                   v-for="(par,parIndex) in dis"
                   :key="parIndex">
                <div class="selection">
                  <p>
                    <el-checkbox :indeterminate="par.indeterminate1"
                                 v-model="par.selected"
                                 @change="handleCheckedCountry(parIndex,par.partitionId,$event)"
                                 :key="parIndex"></el-checkbox>{{ par.partitionName }}
                  </p>
                </div>
                <div class="eachName">
                  <el-checkbox class="eachCheck"
                               v-for="country in par.country"
                               v-model="country.selected"
                               @change="handleCheckedCountryChange1(parIndex,country.id,par.partitionId,$event)"
                               :label="country"
                               :key="country.id">{{country.fieldName}}</el-checkbox>
                </div>
              </div>
            </div>
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
      childrenArray1: "",
      //行政区域
      ischeckAll: false, //一级全选状态
      activeRegion: "first",
      indeterminate: false,
      distributorsInfo: [
        {
          partitionName: "呼和浩特市",
          selected: false,
          partitionId: 1,
          isIndeterminate: false,
          country: [
            { id: "1", fieldName: "回民区", selected: false },
            { id: "2", fieldName: "新城区", selected: false },
            { id: "3", fieldName: "土默特左旗", selected: false },
            { id: "4", fieldName: "赛罕区", selected: false },
            { id: "5", fieldName: "玉泉区", selected: false },
            { id: "6", fieldName: "托克托县", selected: false },
            { id: "7", fieldName: "和林格尔县", selected: false },
            { id: "8", fieldName: "武川县", selected: false },
            { id: "9", fieldName: "清水河县", selected: false }
          ]
        }, 
        
        {
          partitionName: "包头市",
          selected: false,
          partitionId: 2,
          isIndeterminate: false,
          country: [
              { id: "10", fieldName: "东河区", selected: false },
              { id: "11", fieldName: "九原区", selected: false },
              { id: "12", fieldName: "固阳县", selected: false },
              { id: "13", fieldName: "土默特右旗", selected: false },
              { id: "14", fieldName: "昆都仑区", selected: false },
              { id: "15", fieldName: "白云鄂博矿区", selected: false },
              { id: "16", fieldName: "石拐区", selected: false },
              { id: "17", fieldName: "达尔罕茂明安区", selected: false },
              { id: "18", fieldName: "青山区", selected: false }
          ]
        }
      ],
      indeterminate1:false,
      dis:[
        {
          partitionName: "三北防护林建设工程",
          selected: false,
          partitionId: 1,
          isIndeterminate1: false,
          country: [
            { id: "1", fieldName: "呼伦贝尔沙地", selected: false },
            { id: "2", fieldName: "科尔沁沙地和阿拉善盟", selected: false }
          ]
        },
        {
          partitionName: "重点区域绿化工程",
          selected: false,
          partitionId: 1,
          isIndeterminate1: false,
          country: [
            { id: "1", fieldName: "公路两侧", selected: false },
            { id: "2", fieldName: "城镇周边", selected: false },
            { id: "3", fieldName: "村屯", selected: false },
            { id: "4", fieldName: "矿区园区", selected: false },
            { id: "5", fieldName: "黄河两岸", selected: false },
            { id: "6", fieldName: "大青山前坡", selected: false}
          ]
        },
        {
          partitionName: "天然草原保护",
          selected: false,
          partitionId: 1,
          isIndeterminate1: false,
          country: [
            { id: "1", fieldName: "公路两侧", selected: false },
            { id: "2", fieldName: "城镇周边", selected: false },
            { id: "3", fieldName: "村屯", selected: false },
            { id: "4", fieldName: "矿区园区", selected: false },
            { id: "5", fieldName: "黄河两岸", selected: false },
            { id: "6", fieldName: "大青山前坡", selected: false}
          ]
        }
      ],
      ischeckAll1: false 
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
    ...mapActions("ecolo", ["changeListArr","getMapCity"]),
    ensure() {
      this.isRegionFn = false;
      let arrs = this.distributorsInfo.filter(val => {
        let arr = val.country.filter(v => {
          return v.selected == true;
        });
        return arr.length;
      });
      let arrs1 = this.dis.filter(val => {
        let arr1 = val.country.filter(v => {
          return v.selected == true;
        });
        return arr1.length;
      });
      let array = arrs.concat(arrs1);
       let obj={//存入行政区域的选择项
          areaChecked:array
      };
      var cityId=[];
      var areaId=[];
      for(let i=0;i<this.distributorsInfo.length;i++){
        if(this.distributorsInfo[i].selected==true){
            cityId.push(this.distributorsInfo[i].partitionId);
        }
      }
       let arrs11 = this.distributorsInfo.filter(val => {
        let arr1 = val.country.filter(v => {
           if(v.selected == true){
              areaId.push(v.id);
           }
        });
        
      });
      
      let cityChecked={
        areaId:areaId,
        cityId:cityId
      }
      localStorage.setItem("elocoareaChecked",JSON.stringify(obj));
      this.$store.dispatch("ecolo/changeListArr", array);
      this.$store.dispatch("ecolo/getMapCity", cityChecked);
    },
    //行政区域
    handleCheckAllChange(e) {
      //一级change事件
      this.ischeckAll = e;
      this.indeterminate = false;
      for (var i = 0, len = this.distributorsInfo.length; i < len; i++) {
        //二级全选反选
        this.distributorsInfo[i].selected = e;
        this.distributorsInfo[i].indeterminate = false; //去掉二级不确定状态
        for (
          var j = 0, len1 = this.distributorsInfo[i].country.length;
          j < len1;
          j++
        ) {
          //三级全选反选
          this.distributorsInfo[i].country[j].selected = e;
        }
      }
    },
    closeDialog(){//关闭弹框
          let areaChecked=JSON.parse (localStorage.getItem("elocoareaChecked"));
          if(areaChecked!=null){
              if(areaChecked.areaChecked.length==2){//雁塔和新城全选的情况
                this.distributorsInfo[0].country=areaChecked.areaChecked[0].country;
                 this.distributorsInfo[1].country=areaChecked.areaChecked[1].country;
              }
              if(areaChecked.areaChecked.length==1){//只选择一种情况
                if(areaChecked.areaChecked[0].partitionName=="雁塔区"){//只选择了雁塔区
                    this.distributorsInfo[1].country=areaChecked.areaChecked[0].country;
                     this.distributorsInfo[0].country= [
                            { id: "1", fieldName: "胡家庙", selected: false },
                            { id: "2", fieldName: "五路口", selected: false },
                            { id: "3", fieldName: "石家街", selected: false },
                            { id: "4", fieldName: "辛家庙", selected: false }
                          ];
                }
                if(areaChecked.areaChecked[0].partitionName=="新城区"){//只选择了新城区
                    this.distributorsInfo[0].country=areaChecked.areaChecked[0].country;
                    this.distributorsInfo[1].country=[
                          { id: "9", fieldName: "小寨", selected: false },
                          { id: "10", fieldName: "会展", selected: false }
                        ];
                    
                }
              }

          }


          //获取生态区域的本地数据
         
    },
    handleCheckedCountryAllChange(index, topId, e) {
      //二级change事件
      this.distributorsInfo[index].selected = e; //二级勾选后，子级全部勾选或者取消
      this.distributorsInfo[index].indeterminate = false; //去掉二级不确定状态
      var childrenArray = this.distributorsInfo[index].country;
      // console.log(this.distributorsInfo[index].country);
      if (childrenArray)
        for (var i = 0, len = childrenArray.length; i < len; i++)
          childrenArray[i].selected = e;

      this.getIsCheckAll();
    },
    handleCheckedCountryChange(topIndex, sonId, topId, e) {
      //三级change事件

      this.childrenArray1 = this.distributorsInfo[topIndex].country;
      var tickCount = 0,
        unTickCount = 0,
        len = this.childrenArray1.length;
      for (var i = 0; i < len; i++) {
        if (sonId == this.childrenArray1[i].id)
          this.childrenArray1[i].selected = e;
        if (this.childrenArray1[i].selected == true) tickCount++;
        if (this.childrenArray1[i].selected == false) unTickCount++;
      }
      if (tickCount == len) {
        //三级级全勾选
        this.distributorsInfo[topIndex].selected = true;
        this.distributorsInfo[topIndex].indeterminate = false;
      } else if (unTickCount == len) {
        //三级级全不勾选
        this.distributorsInfo[topIndex].selected = false;
        this.distributorsInfo[topIndex].indeterminate = false;
      } else {
        this.distributorsInfo[topIndex].selected = false;
        this.distributorsInfo[topIndex].indeterminate = true; //添加二级不确定状态
      }
      this.getIsCheckAll();
    },
    getIsCheckAll() {
      var tickCount = 0,
        unTickCount = 0,
        indeterminateCount = 0,
        ArrLength = this.distributorsInfo.length;
      for (var j = 0; j < ArrLength; j++) {
        //全选checkbox状态
        if (this.distributorsInfo[j].selected == true) tickCount++;
        if (this.distributorsInfo[j].selected == false) unTickCount++;
        if (this.distributorsInfo[j].indeterminate == true)
          indeterminateCount++;
      }
      if (tickCount == ArrLength) {
        //二级全勾选
        this.ischeckAll = true;
        this.indeterminate = false;
      } else if (unTickCount == ArrLength) {
        //二级全不勾选
        this.ischeckAll = false;
        if (indeterminateCount > 0) {
          this.indeterminate = true;
        } else {
          this.indeterminate = false;
        }
      } else {
        this.ischeckAll = false;
        this.indeterminate = true; //添加一级不确定状态
      }
    },
    handleClick() {},
    //生态区域
    handleCheck(e) {
      //一级change事件
      this.ischeckAll1 = e;
      this.indeterminate1 = false;
      for (var i = 0, len = this.dis.length; i < len; i++) {
        //二级全选反选
        this.dis[i].selected = e;
        this.dis[i].indeterminate1 = false; //去掉二级不确定状态
        for (var j = 0, len1 = this.dis[i].country.length; j < len1; j++) {
          //三级全选反选
          this.dis[i].country[j].selected = e;
        }
      }
    },
    handleCheckedCountry(index, topId, e) {
      //二级change事件
      this.dis[index].selected = e; //二级勾选后，子级全部勾选或者取消
      this.dis[index].indeterminate1 = false; //去掉二级不确定状态
      var childrenArray = this.dis[index].country;
      if (childrenArray)
        for (var i = 0, len = childrenArray.length; i < len; i++)
          childrenArray[i].selected = e;

      this.getIsCheckAll1();
    },
    handleCheckedCountryChange1(topIndex, sonId, topId, e) {
      //三级change事件

      this.childrenArray1 = this.dis[topIndex].country;
      var tickCount = 0,
        unTickCount = 0,
        len = this.childrenArray1.length;
      for (var i = 0; i < len; i++) {
        if (sonId == this.childrenArray1[i].id)
          this.childrenArray1[i].selected = e;
        if (this.childrenArray1[i].selected == true) tickCount++;
        if (this.childrenArray1[i].selected == false) unTickCount++;
      }
      if (tickCount == len) {
        //三级级全勾选
        this.dis[topIndex].selected = true;
        this.dis[topIndex].indeterminate1 = false;
      } else if (unTickCount == len) {
        //三级级全不勾选
        this.dis[topIndex].selected = false;
        this.dis[topIndex].indeterminate1 = false;
      } else {
        this.dis[topIndex].selected = false;
        this.dis[topIndex].indeterminate1 = true; //添加二级不确定状态
      }
      this.getIsCheckAll1();
    },
    getIsCheckAll1() {
      var tickCount = 0,
        unTickCount = 0,
        indeterminateCount = 0,
        ArrLength = this.dis.length;
      for (var j = 0; j < ArrLength; j++) {
        //全选checkbox状态
        if (this.dis[j].selected == true) tickCount++;
        if (this.dis[j].selected == false) unTickCount++;
        if (this.dis[j].indeterminate1 == true) indeterminateCount++;
      }
      if (tickCount == ArrLength) {
        //二级全勾选
        this.ischeckAll1 = true;
        this.indeterminate1 = false;
      } else if (unTickCount == ArrLength) {
        //二级全不勾选
        this.ischeckAll1 = false;
        if (indeterminateCount > 0) {
          this.indeterminate1 = true;
        } else {
          this.indeterminate1 = false;
        }
      } else {
        this.ischeckAll1 = false;
        this.indeterminate1 = true; //添加一级不确定状态
      }
    },
    getAeraCity(){//获取地区的城市
        let _this=this;
         this.$http.get(url.getAreaCity)
          .then(function (response) {

            _this.distributorsInfo=response.data.city;
          })
          .catch(function (error) {
            console.log(error);
          });
    },
   
  },
   mounted(){
      this.getAeraCity();
      localStorage.clear();//清空保存的状态数据
    }
};
</script>
<style lang="scss" scoped>
.adminRegion {
  margin: 0;
  .adminRegion-table {
    line-height: 36px;
    .el-dialog__body{
      
    }
    .table-head {
      .selection {
        .el-checkbox {
          padding-right: 10px;
        }
      }
    }
    .table-body {
      display: block;
      line-height: 30px;    
      .selection {
        float: left;
        width: 25%;
        p {
          line-height: 30px;
          .el-checkbox {
            padding-right: 10px;
          }
        }
      }
      .eachName {
        float: left;
        width: 75%;
        .eachCheck {
          float: left;
          width: 33.3%;
          text-align: left;
          margin-left: 0;
        }
      }
    }
   
    
  }
  
}
.el-tabs[data-v-3cbd9620]{
      height: 500px;
      overflow-y: auto;
}

</style>

