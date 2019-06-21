<template>
  <div>
    <el-menu class="navbar"
             mode="horizontal">
      <hamburger :toggle-click="toggleSideBar"
                 :is-active="sidebar.opened"
                 class="hamburger-container" />
      <breadcrumb />

      <screenfull class="screenfull right-menu-item" />

      <!-- <lang-select class="international right-menu-item"/> -->

      <span @click="showThemeDialog"
            class="changeColor">主题色</span>
    </el-menu>

    <el-dialog title="主题色切换"
               :visible.sync="themeDialogVisible"
               width="30%"
               center>
      <el-form :model="colors"
               :rules="rules"
               ref="form"
               class="theme-form"
               label-position="top"
               label-width="70px">
        <el-form-item label="主题"
                      prop="primary">
          <el-color-picker v-model="colors.primary"></el-color-picker>
        </el-form-item>
        <el-form-item class="color-buttons">
          <el-button type="primary"
                     @click="submitForm">确认</el-button>
          <el-button @click="resetForm">重置颜色</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import Screenfull from "@/components/Screenfull";
import LangSelect from "@/components/LangSelect";
import generateColors from "@/utils/color";
import objectAssign from "object-assign";
export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    LangSelect
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"])
  },

  data() {
    const colorValidator = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("颜色选择不能为空"));
      } else if (!/^#[\dabcdef]{6}$/i.test(value)) {
        return callback(new Error("颜色选择不能为空"));
      } else {
        callback();
      }
    };
    return {
      colors: {
        primary: "#409eff"
      },
      rules: {
        primary: [{ validator: colorValidator, trigger: "blur" }]
      },
      originalStylesheetCount: -1,
      originalStyle: "",
      //primaryColor: '#409eff',
      themeDialogVisible: false,
      styleFiles: [],
      fontFiles: ["element-icons.ttf", "element-icons.woff"],
      fonts: [],
      canDownload: false,
      query: {
        name: "",
        date: []
      }
    };
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("toggleSideBar");
    },
    showThemeDialog() {
      this.themeDialogVisible = true;
    },

    logout() {
      let that = this;

      this.$store.dispatch("LogOut").then(() => {
        that.$router.push({
          path: "/login"
        });

        // In order to re-instantiate the vue-router object to avoid bugs
      });
    },

    writeNewStyle() {
      let cssText = this.originalStyle;
      Object.keys(this.colors).forEach(key => {
        cssText = cssText.replace(
          new RegExp("(:|\\s+)" + key, "g"),
          "$1" + this.colors[key]
        );
      });

      if (this.originalStylesheetCount === document.styleSheets.length) {
        const style = document.createElement("style");
        style.innerText = cssText;
        document.head.appendChild(style);
      } else {
        document.head.lastChild.innerText = cssText;
      }
    },

    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.themeDialogVisible = false;
          //this.primaryColor = this.colors.primary

          this.colors = objectAssign(
            {},
            this.colors,
            generateColors(this.colors.primary)
          );

          // this.canDownload = true
          this.$store.state.app.primaryColor = this.colors.primary;
          this.writeNewStyle();
        } else {
          return false;
        }
      });
    },

    resetForm() {
      this.$refs.form.resetFields();
    },

    getStyleTemplate(data) {
      const colorMap = {
        "#3a8ee6": "shade-1",
        "#409eff": "primary",
        "#53a8ff": "light-1",
        "#66b1ff": "light-2",
        "#79bbff": "light-3",
        "#8cc5ff": "light-4",
        "#a0cfff": "light-5",
        "#b3d8ff": "light-6",
        "#c6e2ff": "light-7",
        "#d9ecff": "light-8",
        "#ecf5ff": "light-9"
      };
      Object.keys(colorMap).forEach(key => {
        const value = colorMap[key];
        data = data.replace(new RegExp(key, "ig"), value);
      });
      return data;
    },

    getFile(url, isBlob = false) {
      return new Promise((resolve, reject) => {
        const client = new XMLHttpRequest();
        client.responseType = isBlob ? "blob" : "";
        client.onreadystatechange = () => {
          if (client.readyState !== 4) {
            return;
          }
          if (client.status === 200) {
            const urlArr = client.responseURL.split("/");
            resolve({
              data: client.response,
              url: urlArr[urlArr.length - 1]
            });
          } else {
            reject(new Error(client.statusText));
          }
        };
        client.open("GET", url);
        client.send();
      });
    },

    getIndexStyle() {
      this.getFile("//unpkg.com/element-ui/lib/theme-chalk/index.css").then(
        ({ data }) => {
          this.originalStyle = this.getStyleTemplate(data);
        }
      );
    },

    getSeparatedStyles() {
      this.getFile("//unpkg.com/element-ui/lib/theme-chalk/")
        .then(({ data }) => {
          return data
            .match(/href="[\w-]+\.css"/g)
            .map(str => str.split('"')[1]);
        })
        .then(styleFiles => {
          return Promise.all(
            styleFiles.map(file => {
              return this.getFile(
                `//unpkg.com/element-ui/lib/theme-chalk/${file}`
              );
            })
          );
        })
        .then(files => {
          this.styleFiles = files.map(file => {
            return {
              name: file.url,
              data: this.getStyleTemplate(file.data)
            };
          });
        });
    },

    getFontFiles() {
      Promise.all(
        this.fontFiles.map(font => {
          return this.getFile(
            `//unpkg.com/element-ui/lib/theme-chalk/fonts/${font}`,
            true
          );
        })
      ).then(fonts => {
        this.fonts = fonts;
      });
    }
  },
  created() {
    this.getIndexStyle();
    this.getSeparatedStyles();
    this.getFontFiles();
  },

  mounted() {
    this.$nextTick(() => {
      this.originalStylesheetCount = document.styleSheets.length;
    });
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .changeColor {
    position: absolute;
    right: 150px;
    top: 0;
    display: block;
    height: 50px;
    line-height: 50px;
    outline: none;
  }
  .changeColor:hover {
    cursor: pointer;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

