<template>
  <div class="baselayout">
    <!-- <el-header :style="{'background':'url('+bg+') no-repeat left center'}"> -->
      <!-- <img class="logo"
           src="../../../static/img/logo.png.png"
           alt=""> -->
           <!-- <h1 class="logoTitle">地理国情遥感监测算法产品平台</h1> -->
      <!-- <ul class="navTab">
        <li v-for="(val,index) in menuList"
            :class="val.id"
            @mouseenter="showActive(val,true)"
            @mouseleave="showActive(val,false)"
            @click="navEvent(val,index)"
            :key="index">
          <router-link :to="{ path: val.path }"><i><img :src="val.hover?val.hoverIcon:val.icon"
                   alt=""
                   srcset="">
            </i>
            <p>{{val.name}}</p>
          </router-link>
        </li>
      </ul> -->
    <!-- </el-header> -->
    <transition name="fade-transform"
                mode="out-in">
      <router-view />
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Path: [],
      bg:require('@../../../static/img/topBack.png'),
    };
  },
  props: {
    menuList: {
      type: Array,
      default() {
        return [
          // 
        ];
      }
    }
  },
  methods: {
    showActive(val, flag) {
      val.hover = flag;
      if (val.click == true) {
        val.hover = true;
      }
    },
    navEvent(val, index) {
      this.menuList.map(val => {
        val.hover = false;
        val.click = false;
      });
      val.click = true;
      val.hover = true;
    },
    pathChage() {
      this.menuList.map(val => {
        this.Path.push(val.path);
      });
      console.log(this.$route.path.replace("/", ""));
      // let _this = this;
      // let num = this.menuList.findIndex(
      //   v => v.path == _this.$route.path.replace("/", "")
      // );
      let num = this.Path.indexOf(this.$route.path.replace("/", ""));
      this.menuList[num].click = true;
      this.menuList[num].hover = true;
    }
  },
  mounted() {
    //this.pathChage();
  }
};
</script>

<style lang="scss" scoped>
.baselayout {
  height: 100%;
  .esri-interactive{
    background-color: #ff3040;
  }
  div{
    &:nth-of-type(1){
         height: calc(100% - 0px)!important;
    }
  }
  .el-header {
    //  background: url("../../../static/img/topBack.png") no-repeat left center;
    background-size: 100% 100%;
    height: 70px !important;
    line-height: 70px;
    .logoTitle{
      color: #ccc;
      font-size: 28px;
      font-weight: 700;
      margin-left: 70px;
    }
    .logo {
      width: 36%;
      vertical-align: middle;
    }
    .navTab {
      float: right;
      list-style: none;
      margin: 0 120px 0 0;
      li {
        float: left;
        color: #fff;

        font-size: 16px;
        margin: 0 5px;
        height: 100px;
        a {
          // float: left;
          height: 100%;
          padding: 0 25px;
          display: block;
          i {
            img {
              transition: all 500ms;
            }
          }
        }
      }
      .distribution,
      .quality,
      .interference,
      .ecological,
      .product {
        i {
          // margin-top: 5px;
          display: block;
          width: 60px;
          height: 60px;
          img {
            width: 100%;
            margin: 0;
          }
        }
        p {
          // display: block;
          line-height: 0px;
          font-weight: normal;
          margin-bottom: 5px;
        }
      }
      li:hover {
        background: #4096f7;
      }
    }
  }
}
</style>