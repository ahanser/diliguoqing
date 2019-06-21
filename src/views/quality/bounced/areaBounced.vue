<template>
  <div>
    <el-dialog :visible.sync="isRegionFn" @close="closeDialog" id="dialog"
               width="55%">
      <el-tabs v-model="activeRegion"
               @tab-click="handleClick">
        <el-tab-pane label="行政区域"
                     name="first">
          <div class="adminRegion">
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
                                 :key="partitionIndex"></el-checkbox>
                                 {{ partition.partitionName }}
                  </p>
                </div>
                <div class="eachName">
                  <el-checkbox class="eachCheck"
                               v-for="country in partition.country"
                               v-model="country.selected"
                               @change="handleCheckedCountryChange(partitionIndex,country.id,partition.partitionId,$event,partition)"
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
              <el-button style="background:#2E5686;border:none;color:#fff;margin-left:25px;"
                   @click="ensure">确 定</el-button>
        <el-button @click="isRegionFn = false" style="background:#2E5686;border:none;color:#fff;margin-left:25px;">取 消</el-button>
      
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
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
      
      ],
      indeterminate1: false,
      dis: [
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
            { id: "6", fieldName: "大青山前坡", selected: false }
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
            { id: "6", fieldName: "大青山前坡", selected: false }
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
     ...mapGetters("quality", [
      "getallLaterIsDone",
    ]),
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
    ...mapActions("quality", ["changeListArr","getParameters","getMapCity","launchCityArr","launchCityName"]),
    ensure() {
      
      this.isRegionFn = false;
      
      let arrs = this.distributorsInfo.filter(val => {
          if(val.country){
               let arr = val.country.filter(v => {
                return v.selected == true;
              });
              return arr.length;
          }else{
              console.log(val);
             
              if(val.selected == true){
                return 1
                
              }
              
          }
          // else{
          //   let arr = val.filter(v =>{
          //      return v.selected == true;
          //   })
          //     return arr.length;
          // }
       
      });
    
      if(arrs.length==0){
         this.$message({
          message: '请选择至少一个区域',
          type: 'warning'
         }) 
          this.isRegionFn = true;
      }
      let arrs1 = this.dis.filter(val => {
        if(val.country){
            let arr1 = val.country.filter(v => {
                return v.selected == true;
              });
        return arr1.length;
        }
      
      });
      let array = arrs.concat(arrs1);
      console.log(arrs, arrs1);
      console.log(array);
        let obj={//存入行政区域的选择项
          areaChecked:array
      };

       var cityId=[];//选中的城市pid
       var areaId=[];//选中的区域的id
       var cityCode=[];//选中的城市code码
       var distribCode=[];//选择的县的code码
       var areaName=[];//选择的单个地区（县、市）的名字
        var exportCode=[];//选择的单个地区（县、市）的code
       var ecocoId=[];
      for(let i=0;i<this.distributorsInfo.length;i++){
        if(this.distributorsInfo[i].selected==true){
            cityId.push(this.distributorsInfo[i].partitionId);
        }
      }
       if(this.ischeckAll==true){
        areaName.push("甘肃省");
        exportCode.push("620000000000");
      }
       let arrs11 = this.distributorsInfo.filter(val => {
         if(val.selected==true){
                if(areaName.length=="0"){
                     areaName.push(val.partitionName);
                }
                if(exportCode.length=="0"){
                    exportCode.push(val.areaCode);
                }
              }
         if(val.country){
            let arr1 = val.country.filter(v => {
           if(v.selected == true){
             console.log("TCL: ensure -> v", v)
              areaId.push(v.id);
              cityCode.push(val.areaCode);
              distribCode.push(v.areaCode);
                if(areaName.length=="0"){
                  areaName.push(v.fieldName);
              }
               if(exportCode.length=="0"){
                    exportCode.push(v.areaCode);
               }
           }
        });
      }else{
        if(val.selected == true){
              areaId.push("082789a3cd00414c8674414e6f95381f");
              cityCode.push("620200000000");
              distribCode.push("620200000000");
              if(areaName.length=="0"){
                  areaName.push("嘉峪关市");
              }
               if(exportCode.length=="0"){
                    exportCode.push("620200000000");
               }
        }
      }
        
        
    });
      function uniq(array){
          var temp = []; //一个新的临时数组
          for(var i = 0; i < array.length; i++){
              if(temp.indexOf(array[i]) == -1){
                  temp.push(array[i]);
              }
          }
          return temp;
      }
    
      var parametersObj={
          cityCode:uniq(cityCode).join(";")
      }
       let cityChecked={
        areaId:areaId,
        cityId:cityId,
        ecocoId:ecocoId,
        exportCode:exportCode
      }
      console.log(cityChecked);
      
      

         // console.log(distribCode);//拼接的城市code码
          //console.log("codecode");
            if(cityChecked.areaId.length>=80){
             this.loading = this.$loading({
                lock: true,
                text: '正在绘制区域,请稍等......',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
          }
        this.$store.dispatch("quality/getMapCity", cityChecked);
        this.$store.dispatch("quality/changeListArr", array);
        this.$store.dispatch("quality/getParameters", parametersObj);
        this.$store.dispatch("quality/launchCityArr", distribCode);//发射的选择的县的code码
        this.$store.dispatch("quality/launchCityName", areaName);//发射的选择的县、市或者甘肃省的名字
    },
     closeDialog(){//关闭弹框
          let areaChecked=JSON.parse (localStorage.getItem("qualityareaChecked"));
          console.log(areaChecked);
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
                    console.log("0000");
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
    //行政区域
    handleCheckAllChange(e) {
      //一级change事件
   
      
      this.ischeckAll = e;
      this.indeterminate = false;
      console.log(this.distributorsInfo.length);
      for (var i = 0, len = this.distributorsInfo.length; i < len; i++) {
        //二级全选反选
        this.distributorsInfo[i].selected = e;
        this.distributorsInfo[i].indeterminate = false; //去掉二级不确定状态
        if(i!=1){
            for (var j = 0, len1 = this.distributorsInfo[i].country.length; j < len1;j++){
              //三级全选反选
              this.distributorsInfo[i].country[j].selected = e;
            }
        }
        
     
        
      }
       //this.removeEcoleStatus();
    },

    handleCheckedCountryAllChange(topIndex, topId, e) {
      //二级change事件
      console.log(topIndex, topId, e);
      
      this.distributorsInfo[topIndex].selected = e; //二级勾选后，子级全部勾选或者取消
      this.distributorsInfo[topIndex].indeterminate = false; //去掉二级不确定状态
      if(topIndex!=1){
      var childrenArray = this.distributorsInfo[topIndex].country;
      // console.log(this.distributorsInfo[index].country);
      if (childrenArray)
        for (var i = 0, len = childrenArray.length; i < len; i++)
          childrenArray[i].selected = e;

      this.getIsCheckAll();
       //this.removeEcoleStatus();
         let arrs11 = this.distributorsInfo.filter((val,index) => {
          
        if(index!=topIndex){
          //console.log(val);
          val.selected=false;
          val.isIndeterminate=false;
          val.indeterminate=false;
          if(val.country){ 
            let arr1 = val.country.filter(v => {
              v.selected=false;
          })}
         
        }
       
        
         });
      }else{
         var childrenArray = this.distributorsInfo[topIndex]
      // console.log(this.distributorsInfo[index].country);
      if (childrenArray)
        for (var i = 0, len = childrenArray.length; i < len; i++)
          childrenArray[i].selected = e;

      this.getIsCheckAll();
       //this.removeEcoleStatus();
         let arrs11 = this.distributorsInfo.filter((val,index) => {
          
        if(index!=topIndex){
          //console.log(val);
          val.selected=false;
          val.isIndeterminate=false;
          val.indeterminate=false;
          if(val.country){ 
            let arr1 = val.country.filter(v => {
              v.selected=false;
          })}
         
        }
       
        
         });
      }
      
    },
    handleCheckedCountryChange(topIndex, sonId, topId, e,item) {
      //三级change事件
    if(topIndex!=1){
      this.childrenArray1 = this.distributorsInfo[topIndex].country;
			console.log("TCL: handleCheckedCountryChange -> this.childrenArray1", this.childrenArray1)
    
      //console.log(this.childrenArray1);
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
      //this.removeEcoleStatus();
      let arrs11 = this.distributorsInfo.filter((val,index) => {
         if(index!=topIndex){
           val.indeterminate=false;
           val.selected=false;
          //  this.indeterminate=false;
         }
        if(val.country){
            let arr1 = val.country.filter((v,index) => {
          
          if(v.id!=sonId){
            v.selected=false; 
          }
          if(v.id==sonId){
            //console.log("11111");
            //console.log(val);
            val.indeterminate=false;
            this.indeterminate=false;

          }
          if(v.selected==true){
            val.indeterminate=true;
            this.indeterminate=true;
          }
          
        });
        }
      
       
       
      });
    }
   
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

    //生态区域
    // handleCheck(e) {
    //   //一级change事件
    //   this.ischeckAll1 = e;
    //   this.indeterminate1 = false;
    //   for (var i = 0, len = this.dis.length; i < len; i++) {
    //     //二级全选反选
    //     this.dis[i].selected = e;
    //     this.dis[i].indeterminate1 = false; //去掉二级不确定状态
    //     if(i!=1){
    //           for (var j = 0, len1 = this.dis[i].country.length; j < len1; j++) {
    //       //三级全选反选
    //       this.dis[i].country[j].selected = e;
    //        }
    //     }
      
    //   }
    // },
    handleCheckedCountry(index, topId, e) {
      //二级change事件
      this.dis[index].selected = e; //二级勾选后，子级全部勾选或者取消
      this.dis[index].indeterminate1 = false; //去掉二级不确定状态
      if(index!=1){
                var childrenArray = this.dis[index].country;
                if (childrenArray)
        for (var i = 0, len = childrenArray.length; i < len; i++)
          childrenArray[i].selected = e;

      this.getIsCheckAll1();
      }
    
      
    },
    handleCheckedCountryChange1(topIndex, sonId, topId, e) {
      //三级change事件
      if(topIndex!=1){
             this.childrenArray1 = this.dis[topIndex].country;
      console.log(this.childrenArray1);
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
      this.removeAdministrative();
       let arrs11 = this.dis.filter((val,index) => {
         console.log(index);
         console.log(val);
         if(index!=topIndex){
           val.isIndeterminate=false;
           val.indeterminate1=false;
           val.isIndeterminate1=false;
           val.selected=false;
         }
         if(val.country){
             let arr1 = val.country.filter(v => {
          if(v.id!=sonId){
            v.selected=false; 
          }
           if(v.id==sonId){
            console.log("11111");
            console.log(val);
            val.indeterminate1=false;
            this.indeterminate1=false;

          }
          if(v.selected==true){
            val.indeterminate1=true;
            this.indeterminate1=true;
          }
        });
         }
      
        
      });
      }
     
    },
    handleClick(){},
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
        console.log(url.getAreaCity); 
        let _this=this;
         this.$http.get(url.getAreaCity)
          .then(function (response) {
            console.log(":::::");
            console.log(response);
            if(response.status=="200"){
                _this.distributorsInfo=response.data.city;
            }
            
          })
          .catch(function (error) {
            console.log(error);
          });
    },
      removeAdministrative(){//去掉行政区域的复选框的状态
        let arrs11 = this.distributorsInfo.filter(val => {
          
          if(val.selected==true){
            val.selected=false;
          }
          if(val.indeterminate==true){
              val.indeterminate=false;
          }
          if( val.country){
            let arr1 = val.country.filter(v => {
         
          if(v.selected==true){
            v.selected=false;
          }
        });
          }
        
        
      });
      this.indeterminate=false;
      this.ischeckAll=false;
      console.log(this.distributorsInfo);
    },
      
  },
   mounted(){
        this.getAeraCity();
        localStorage.clear();//清空保存的状态数据
   },
   watch:{
      getallLaterIsDone(newVal,oldVal){
 
        
        console.log("TCL: getallLaterIsDone -> newVal", newVal)
        var _this=this;
        if(newVal.status=="1"){
          setTimeout(function(){
            _this.loading.close();
          },1000);
        }
        
        
    }
   }
};
</script>
<style lang="scss" scoped>
.table-body{
  overflow: hidden;
}
.adminRegion {
  margin: 0;
  .adminRegion-table {
    line-height: 36px;
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
          display: block;
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
#dialog{
  .el-tabs__content{
    background: red;
  }
}
.el-tab-pane{
      height: 400px;
      overflow-y: auto;
  
}
</style>

