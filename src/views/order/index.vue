<template>
    <div class="menuManger">

        <el-row type="flex"
                class="row-bg">

            <el-col :span="5">

                <div class="menuTree">

                    <el-tree :data="data2"
                             show-checkbox
                             accordion
                             ref="tree"
                             highlight-current
                             node-key="id"
                             :default-checked-keys="leftActive"
                             :default-expanded-keys="leftActive"
                             :props="defaultProps"
                             @node-click="handleNodeClick"
                             @check="handleNodeClick">

                    </el-tree>

                </div>

            </el-col>

            <el-col :span="19">

                <div class="content">

                    <div class="addMenu">

                        <el-button type="primary"
                                   round
                                   size="mini"
                                   icon="el-icon-plus"
                                   @click="addMenu()">新增菜单</el-button>

                    </div>

                    <el-table :data="datas"
                              style="width: 100%"
                              border>

                        <el-table-column label="菜单ID">

                            <template slot-scope="scope">

                                <span>{{ scope.row.id }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="菜单名称">
                            <template slot-scope="scope">
                                <span>{{ scope.row.name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="菜单Url">
                            <template slot-scope="scope">
                                <span>{{ scope.row.path}}</span>
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

            </el-col>

        </el-row>
        <!-- 新增菜单 -->
        <el-dialog title="新增菜单"
                   :visible.sync="isAdd"
                   width="30%"
                   center>
            <el-form :model="addItem"
                     label-width="100px">
                <el-form-item label="菜单名:">
                    <el-input type="text"
                              v-model="addItem.name"></el-input>
                </el-form-item>
                <el-form-item label="菜单Url:">
                    <el-input type="text"
                              v-model="addItem.path"></el-input>
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

        <el-dialog title="编辑菜单"
                   :visible.sync="isEdit"
                   width="30%"
                   center>
            <el-form :model="addItem"
                     label-width="100px">
                <el-form-item label="菜单名:">
                    <el-input type="text"
                              v-model="editItem.name"></el-input>
                </el-form-item>
                <el-form-item label="菜单Url:">
                    <el-input type="text"
                              v-model="editItem.path"></el-input>
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
                <el-button @click="isEdit= false">取 消</el-button>
                <el-button type="primary"
                           @click="editConfirm()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  data() {
    return {
      isAdd: false, // 新增权限对话框显示

      isEdit: false, //编辑权限显示对话框

      datas: [],

      data2: [],
      active: [], //  编辑回显得选中树节点
      addTreeName: "",
      editTreeName: "",
      addItem: {
        name: "",

        path: "",

        parentId: 0
      },

      editItem: {
        id: null,

        name: "",

        path: "",

        parentId: 0
      },

      defaultProps: {
        children: "children",

        label: "label"
      },
      optionId: "", //编辑删除增加操作id
      leftActive: [] //左侧树形结构默认展开
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
        this.addItem.parentId = "";
      }
    },

    editTreeName() {
      if (this.editTreeName == "") {
        this.editItem.parentId = "";
      }
    }
  },

  methods: {
    async activeRoot() {
      let result = await this.$httpGet("meun/list");

      if (result.data.code == 0) {
        //取到根节点并取到根节点的信息
        if (result.data.result.length != 0) {
          let rootId = result.data.result[0].id;

          this.leftActive = [];

          this.leftActive.push(rootId);
          this.details(rootId);
        }
      }
    },
    //1.获取菜单列表
    async getList() {
      let result = await this.$httpGet("meun/list");

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

    //2.单条项的详情
    async details(id) {
      let params = "id=" + id;

      let result = await this.$httpGet("meun/child", params);

      this.datas = [];

      this.datas = result.data.result;
    },
    //3.菜单列表点击显示右侧内容
    handleNodeClick(data) {
      this.$refs.tree.setCheckedKeys([]);

      this.$refs.tree.setCheckedKeys([data.id]);
      this.leftActive = [];

      this.optionId = data.id;
      this.leftActive.push(this.optionId);

      this.details(data.id);
    },
    //4.点击弹出增加菜单弹出层
    addMenu() {
      this.isAdd = true;

      (this.addItem = {
        name: "",

        path: "",

        parentId: 0
      }),
        (this.addTreeName = "");
    },
    //5.新增树形结构点击
    addTree(data) {
      this.$refs.addTree.setCheckedKeys([]);

      this.$refs.addTree.setCheckedKeys([data.id]);

      this.addItem.parentId = data.id;

      this.addTreeName = data.label;

      console.log(data);
    },
    //6.增加菜单提交
    async addConfirm() {
      let result = await this.$httpPost("meun/add", this.addItem);

      if (result.data.code == 0) {
        this.$message({
          type: "success",

          message: result.data.result
        });

        this.isAdd = false;
        this.details(this.optionId);
        this.getList();
      } else {
        this.$message({
          type: "error",

          message: result.data.msg
        });
      }

      // console.log( this.addItem)
    },
    // 7.删除菜单操作
    del(id, index) {
      // console.log(id)

      let that = this;

      this.$confirm("此操作将永久删除该菜单, 是否继续?", "提示", {
        confirmButtonText: "确定",

        cancelButtonText: "取消",

        type: "warning"
      })

        .then(() => {
          let params = "id=" + id;

          let result = that

            .$httpGet("meun/del", params)

            .then(function(res) {
              if (res.data.code == 0) {
                that.details(that.optionId);
                that.$message({
                  type: "success",

                  message: res.data.result
                });

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

    // 8.点击编辑弹出对话框

    async edit(id) {
      let that = this;

      this.isEdit = false;

      // 重新请求树形结构

      this.getList();

      let params = "id=" + id;

      let result = await this.$httpGet("meun/edit", params);

      if (result.data.code == 0) {
        this.isEdit = true;

        this.editItem = {
          id: id,

          name: result.data.result.name,

          path: result.data.result.path,

          parentId: result.data.result.parentId
        };

        console.log(result);
      }

      this.active = [];

      this.active.push(result.data.result.parentId);

      function getArray(data, id) {
        for (var i in data) {
          if (data[i].id == id) {
            that.editTreeName = data[i].label;

            console.log(data[i].label);

            break;
          } else {
            getArray(data[i].children, id);
          }
        }
      }

      getArray(this.data2, result.data.result.parentId);
    },
    //9.编辑权限树形结构
    editTree(data) {
      this.$refs.editTree.setCheckedKeys([]);

      this.$refs.editTree.setCheckedKeys([data.id]);

      this.editItem.parentId = data.id;

      this.editTreeName = data.label;
    },
    // 10.编辑确定
    async editConfirm() {
      let result = await this.$httpPost("meun/update", this.editItem);
      if (result.data.code == 0) {
        this.getList();
        this.$message({
          type: "success",

          message: result.data.result
        });
        this.isEdit = false;
        this.details(this.optionId);
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
.menuManger {
  .menuTree {
    margin-top: 60px;
  }

  .addMenu {
    padding: 30px;
  }
}
</style>
