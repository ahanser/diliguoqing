<template>
  <div class="authorityManger">

    <el-row type="flex"
            class="row-bg">

      <el-col :span="5">

        <div class="authorityTree">

          <el-tree :data="data2"
                   show-checkbox
                   accordion
                   ref="tree"
                   :default-checked-keys="leftActive"
                   :default-expanded-keys="leftActive"
                   highlight-current
                   node-key="id"
                   :props="defaultProps"
                   @node-click="handleNodeClick"
                   @check="handleNodeClick">

          </el-tree>

        </div>

      </el-col>

      <el-col :span="19">

        <div class="authority">

          <div class="addAuthority">

            <el-button type="primary"
                       round
                       size="mini"
                       icon="el-icon-plus"
                       @click="addAuthority()">新增权限</el-button>

          </div>

          <div class="content">

            <el-table :data="datas"
                      style="width: 100%"
                      border>

              <el-table-column label="权限ID">

                <template slot-scope="scope">

                  <span>{{ scope.row.id }}</span>
                </template>
              </el-table-column>
              <el-table-column label="权限名称">
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="权限Url">
                <template slot-scope="scope">
                  <span>{{ scope.row.url}}</span>
                </template>
              </el-table-column>

              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini"
                             type="primary"
                             icon="el-icon-edit"
                             @click="edit(scope.row.id)">

                    {{ $t('table.edit')}}</el-button>

                  <el-button size="mini"
                             type="danger"
                             icon="el-icon-delete"
                             @click="del(scope.row.id,scope.row.index)">

                    {{ $t('table.delete')}}

                  </el-button>
                </template>
              </el-table-column>
            </el-table>

          </div>

        </div>
      </el-col>

    </el-row>

    <!-- 新增权限 -->
    <el-dialog title="新增权限"
               :visible.sync="isAdd"
               width="30%"
               center>
      <el-form :model="addItem"
               label-width="100px">
        <el-form-item label="权限名:">
          <el-input type="text"
                    v-model="addItem.name"></el-input>
        </el-form-item>
        <el-form-item label="权限Url:">
          <el-input type="text"
                    v-model="addItem.url"></el-input>
        </el-form-item>
        <el-form-item label="父资源:">
          <el-select placeholder="请选择"
                     clearable
                     style="width:100%"
                     v-model="addTreeName">
            <el-option style="min-height:150px;overflow-y:scroll">
              <el-tree :data="data2"
                       ref="addTree"
                       accordion
                       node-key="id"
                       :default-checked-keys="addActive"
                       :default-expanded-keys="addActive"
                       show-checkbox
                       :props="defaultProps"
                       @node-click="addTree"
                       @check="addTree">
              </el-tree>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="isAdd= false">取 消</el-button>
        <el-button type="primary"
                   @click="addConfirm()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑权限 -->
    <el-dialog title="编辑权限" 
               :visible.sync="isEdit"
               width="30%"
               center>

      <el-form :model="editItem"
               label-width="100px">
        <el-form-item label="权限名:">
          <el-input type="text"
                    v-model="editItem.name"></el-input>
        </el-form-item>
        <el-form-item label="权限Url:">
          <el-input type="text"
                    v-model="editItem.url"></el-input>
        </el-form-item>
        <el-form-item label="父资源:">
          <el-select placeholder="请选择"
                     clearable
                     style="width:100%"
                     v-model="editTreeName">
            <el-option style="min-height:150px;overflow-y:scroll">
              <el-tree :data="data2"
                       ref="editTree"
                       accordion
                       node-key="id"
                       :default-checked-keys="active"
                       :default-expanded-keys="active"
                       show-checkbox
                       :props="defaultProps"
                       @node-click="editTree"
                       @check="editTree">
              </el-tree>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="isAdd= false">取 消</el-button>
        <el-button type="primary"
                   @click="editConfirm()">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAdd: false, // 新增权限对话框显示

      isEdit: false, //编辑权限显示对话框

      active: [], //  编辑回显得选中树节点

      datas: [], //  后台返回的list  table

      data2: [], //  左侧菜单数

      defaultProps: {
        children: "children",

        label: "label"
      },

      // 新增权限item

      addItem: {
        name: "",

        url: "",

        menuId: null
      },

      //  编辑权限item

      editItem: {
        id: null,
        name: "",

        url: "",

        menuId: null
      },

      // addTreeId:null, // 新增权限id

      addTreeName: "", //  新增权限父资源

      editTreeName: "", //编辑权限父资源
      optionId: "", //编辑删除增加操作id
      leftActive: [], //左侧树形结构默认展开
      addActive: [] //  增加权限每次置空选中节点
    };
  },

  mounted() {
    // this.init();

    this.getList();
    // 初始化左侧第一个根节点选中
    this.activeRoot();
  },

  watch: {
    // 监测addTreeName为空 则把添加menuId 重置为空

    addTreeName() {
      if (this.addTreeName == "") {
        this.addItem.menuId = "";
      }
    },

    editTreeName() {
      if (this.editTreeName == "") {
        this.editItem.menuId = "";
      }
    }
  },

  methods: {
    async activeRoot() {
      let result = await this.$httpGet("authority/list");

      if (result.data.code == 0) {
        //取到根节点并取到根节点的信息
        if (result.data.result.length != 0) {
          let rootId = result.data.result[0].id;
          this.leftActive = [];
          this.leftActive.push(rootId);
          this.byMenu(rootId);
        }
      }
    },

    // 1.获取权限列表

    async getList() {
      let result = await this.$httpGet("authority/list");

      if (result.data.code == 0) {
        var key = "children";

        var key1 = "label";

        function parseJson(arr) {
          arr = arr.slice();
          function toParse(arr) {
            arr.forEach(function(item) {
              if (item.sub && Array.isArray(item.sub)) {
                item[key] = item.sub;
                item[key1] = item.name;

                toParse(item[key]);
              }
              delete item.sub;
              delete item.name;
            });

            return arr;
          }

          return toParse(arr);
        }

        this.data2 = parseJson(result.data.result);
      }
    },
    // 2.左侧权限菜单点击事件

    async handleNodeClick(data) {
      // 对节点进行重置保证每次选中一个节点
      this.$refs.tree.setCheckedKeys([]);

      this.$refs.tree.setCheckedKeys([data.id]);
      this.leftActive = [];

      this.optionId = data.id;
      this.leftActive.push(this.optionId);
      this.byMenu(data.id);
    },
    // 3. 左侧权限数对应请求
    async byMenu(id) {
      let params = "menuId=" + id;
      let result = await this.$httpGet("authority/bymenu", params);
      this.datas = [];
      if (result.data.code == 0) {
        this.datas = result.data.result;
      } else {
        this.$message({
          type: "error",

          message: result.data.msg
        });
      }
    },
    // 4. 增加权限弹出层
    addAuthority() {
      this.isAdd = true;
      this.addActive = [];
      //重置addItem项

      this.addItem = {
        name: "",
        url: "",
        menuId: null
      };

      this.addTreeName = "";
    },
    // 5.新增权限树形菜单编辑
    addTree(data) {
      this.$refs.addTree.setCheckedKeys([]);

      this.$refs.addTree.setCheckedKeys([data.id]);

      this.addItem.menuId = data.id;

      this.addTreeName = data.label;
    },

    //6.新增确定提交

    async addConfirm() {
      let result = await this.$httpPost("authority/add", this.addItem);

      if (result.data.code == 0) {
        this.$message({
          type: "success",

          message: result.data.result
        });

        this.isAdd = false;
        this.byMenu(this.optionId);
        this.getList();
      } else {
        this.$message({
          type: "error",

          message: result.data.msg
        });
      }
    },
    //7.删除权限操作
    del(id, index) {
      let that = this;

      this.$confirm("此操作将永久删除该权限, 是否继续?", "提示", {
        confirmButtonText: "确定",

        cancelButtonText: "取消",

        type: "warning"
      })

        .then(() => {
          let params = "id=" + id;

          let result = that

            .$httpGet("authority/del", params)

            .then(function(res) {
              that.byMenu(that.optionId);
              if (res.data.code == 0) {
                that.$message({
                  type: "success",

                  message: res.data.result
                });

                //that.datas.splice(index, 1);
                //;
                that.getList();
              } else {
                that.$message({
                  type: "success",

                  message: res.data.msg
                });
              }
            })

            .catch(function(error) {
              console.log(error);
            });
        })

        .catch(() => {
          this.$message({
            type: "info",

            message: "已取消删除"
          });

          return;
        });
    },

    //8.点击编辑权限弹出对话框

    async edit(id) {
      let that = this;

      this.isEdit = false;

      // 重新请求树形结构

      this.getList();

      let params = "id=" + id;

      let result = await this.$httpGet("authority/edit", params);

      if (result.data.code == 0) {
        this.isEdit = true;
        this.editItem = {
          id: id,
          name: result.data.result.name,

          url: result.data.result.url,

          menuId: result.data.result.menuId
        };

        this.active = [];

        this.active.push(result.data.result.menuId);

        //递归遍历显示父节点label

        function getArray(data, id) {
          for (var i in data) {
            if (data[i].id == id) {
              that.editTreeName = data[i].label;

              break;
            } else {
              getArray(data[i].children, id);
            }
          }
        }
        getArray(this.data2, result.data.result.menuId);
      }
    },
    //9.编辑权限树形结构
    editTree(data) {
      this.$refs.editTree.setCheckedKeys([]);

      this.$refs.editTree.setCheckedKeys([data.id]);

      this.editItem.menuId = data.id;

      this.editTreeName = data.label;
    },
    // 10.编辑确定
    async editConfirm() {
      let result = await this.$httpPost("authority/update", this.editItem);
      if (result.data.code == 0) {
        this.getList();
        this.$message({
          type: "success",

          message: result.data.result
        });
        this.isEdit = false;
        this.byMenu(this.optionId);
      } else {
        this.$message({
          type: "error",

          message: result.data.msg
        });
      }
    }
  }
};
</script>

<style lang="scss">
.authorityManger {
  .authorityTree {
    margin-top: 60px;
  }

  .addAuthority {
    height: 80px;
    line-height: 80px;
    padding: 0 30px;
  }
}
</style>
