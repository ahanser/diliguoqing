<template>
<div class="dept">

    <el-row type="flex" class="row-bg">

        <el-col :span="5">

            <div class="deptTree">

                <el-tree :data="data2" show-checkbox accordion ref="tree" highlight-current node-key="id"  :default-checked-keys="leftActive"   :default-expanded-keys="leftActive"  @node-click="handleNodeClick" :props="defaultProps" @check="handleNodeClick">

                </el-tree>

            </div>

        </el-col>

        <el-col :span="19">

            <div class="deptList">

                <div class="addDept">

                    <el-button type="primary" round size="mini" icon="el-icon-plus" @click="addDept()">新增部门</el-button>

                </div>

                <div class="content">

                    <el-table :data="datas" style="width: 100%" border>

                        <el-table-column label="部门ID">

                            <template slot-scope="scope">

                                <span >{{ scope.row.id }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="部门名称">

                            <template slot-scope="scope">

                                <span >{{ scope.row.name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="部门描述">

                            <template slot-scope="scope">

                                <span >{{ scope.row.remark }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column label="操作" width="420">
                            <template slot-scope="scope">
                                <el-button size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row.id)">

                                    {{ $t('table.edit')}}</el-button>

                                <el-button size="mini" type="danger" icon="el-icon-delete" @click="del(scope.row.id,scope.row.index)">

                                    {{ $t('table.delete')}}

                                </el-button>
                                <el-button size="mini" icon="el-icon-search" @click="ownUser(scope.row.id)">查看用户</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                </div>
            </div>

        </el-col>

    </el-row>

    <!-- 新增部门 -->
    <el-dialog title="新增部门" :visible.sync="isAdd" width="30%" center>
        <el-form :model="addItem" label-width="100px">
            <el-form-item label="部门名称:">
                <el-input type="text" v-model="addItem.name"></el-input>
            </el-form-item>
            <el-form-item label="部门描述:">
                <el-input type="text" v-model="addItem.remark"></el-input>
            </el-form-item>
            <el-form-item label="父资源:">
                <el-select placeholder="请选择" clearable style="width:100%" v-model="addTreeName">
                    <el-option style="min-height:150px;overflow-y:scroll">
                        <el-tree :data="data2" ref="addTree" accordion node-key="id" show-checkbox :props="defaultProps" @node-click="addTree"  @check="addTree">
                        </el-tree>
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isAdd= false">取 消</el-button>
          <el-button type="primary" @click="addConfirm()" >确 定</el-button>
        </span>
    </el-dialog>
    <!-- 编辑部门 -->
    <el-dialog title="编辑部门" :visible.sync="isEdit" width="30%" center>
        <el-form :model="editItem" label-width="100px">
            <el-form-item label="部门名称:">
                <el-input type="text" v-model="editItem.name"></el-input>
            </el-form-item>
            <el-form-item label="部门描述:">
                <el-input type="text" v-model="editItem.remark"></el-input>
            </el-form-item>
            <el-form-item label="父资源:">
                <el-select placeholder="请选择" clearable style="width:100%" v-model="editTreeName">
                    <el-option style="min-height:150px;overflow-y:scroll">
                        <el-tree :data="data2" ref="editTree" :default-checked-keys="active" :default-expanded-keys="active" accordion node-key="id"  @node-click="editTree" show-checkbox :props="defaultProps" @check="editTree">
                        </el-tree>
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isAdd= false">取 消</el-button>
          <el-button type="primary" @click="editConfirm()" >确 定</el-button>
        </span>
    </el-dialog>
    <!-- 部门所属用户展示 -->
    <el-dialog
      title="用户列表"
      :visible.sync="isown"
      width="50%"
     >
          <el-table :data="ownlist" style="width: 100%" border>

        <el-table-column label="用户ID">

            <template slot-scope="scope">

                <span >{{ scope.row.id}}</span>
            </template>
        </el-table-column>
        <el-table-column label="用户名">
            <template slot-scope="scope">
                <span>{{ scope.row.username }}</span>
            </template>
        </el-table-column>

        <el-table-column label="真实姓名">
            <template slot-scope="scope">
                <span>{{ scope.row.name}}</span>
            </template>
        </el-table-column>
        <el-table-column label="创建者">
            <template slot-scope="scope">
                <span>{{ scope.row.creator}}</span>
            </template>
        </el-table-column>
        <el-table-column label="角色">
            <template slot-scope="scope">
                <span>{{ scope.row.role==null? " ": scope.row.role.name}}</span>
            </template>
        </el-table-column>
             <el-table-column label="部门">
            <template slot-scope="scope">
                <span>{{ scope.row.dept==null? " ": scope.row.dept.name}}</span>
            </template>
        </el-table-column> -->
        <el-table-column label="状态">
            <template slot-scope="scope">
                <span>{{ scope.row.enable|  isEnable}}</span>
            </template>
        </el-table-column>
    

    </el-table>

     
    </el-dialog>
</div>
</template>

<script>
export default {
  data() {
    return {
      isown: false, //  所属用户展示
      ownlist: [], //所属用户列表
      isAdd: false, // 新增权限对话框显示

      isEdit: false, //编辑权限显示对话框

      active: [], //  编辑回显得选中树节点

      datas: [],

      data2: [],

      defaultProps: {
        children: "children",

        label: "label"
      },
      addItem: {
        name: "",
        remark: "",
        parentId: 0
      },

      editItem: {
        id: null,
        name: "",
        remark: "",
        parentId: 0
      },
      editTreeName: "", //编辑权限父资源
      addTreeName: "",
      optionId: "", //编辑删除增加操作id
      leftActive: [] //左侧树形结构默认展开
    };
  },

  mounted() {
    // this.init();

    this.getList();
    this.activeRoot()
  },
  filters: {
    // 禁用跟启用过滤器
    isEnable(val) {
      if (val) {
        return "启用";
      } else {
        return "禁用";
      }
    }
  },
  watch: {
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
   async  activeRoot(){
        let result = await this.$httpGet("meun/list");

      if (result.data.code == 0) { 
         //取到根节点并取到根节点的信息
          if(result.data.result.length!=0) {
             let rootId =  result.data.result[0].id
      

           this.leftActive=[]

     
            this.leftActive.push(rootId)
            this.getChild(rootId);
          }
         
     
       
      }
    },
    // 查看部门所属用户
    // 查看当前角色所属用户
    async ownUser(id) {
      let params = "id=" + id;

      let result = await this.$httpGet("dept/getUser", params);
      if (result.data.code == 0) {
        if (result.data.result.length > 0) {
          this.isown = true;
          this.ownlist = result.data.result;
          //console.log( result.data.result)
        } else {
          this.$message({
            type: "error",

            message: "暂无用户"
          });
        }
      } else {
        this.$message({
          type: "error",

          message: result.data.msg
        });
      }
    },
    async getList() {
      let result = await this.$httpGet("dept/deptList");

      if (result.data.code == 0) {
        console.log(result);

        var key = "children";

        var key1 = "label";

        function parseJson(arr) {
          arr = arr.slice();

          function toParse(arr) {
            arr.forEach(function(item) {
              if (item.childDept && Array.isArray(item.childDept)) {
                item[key] = item.childDept;

                item[key1] = item.name;

                toParse(item[key]);
              }

              delete item.childDept;

              delete item.name;
            });

            return arr;
          }

          return toParse(arr);
        }

        this.data2 = parseJson(result.data.result);

        console.log(this.data2);
      }
    },

    handleNodeClick(data) {
      this.$refs.tree.setCheckedKeys([]);

      this.$refs.tree.setCheckedKeys([data.id]);
      this.leftActive = [];

      this.optionId = data.id;
      this.leftActive.push(this.optionId);

      this.getChild(data.id);
    },
    editTree(data) {
      this.$refs.editTree.setCheckedKeys([]);

      this.$refs.editTree.setCheckedKeys([data.id]);

      this.editItem.parentId = data.id;

      this.editTreeName = data.label;
    },
    // 点击节点获取子部门

    async getChild(id) {
      let params = "id=" + id;

      let result = await this.$httpGet("dept/child", params);

      if (result.data.code == 0) {
        this.datas = result.data.result;
      } else {
        this.$message({
          type: "error",

          message: result.data.msg
        });
      }
    },
    addTree(data) {
      this.$refs.addTree.setCheckedKeys([]);

      this.$refs.addTree.setCheckedKeys([data.id]);

      this.addItem.parentId = data.id;

      this.addTreeName = data.label;

      console.log(data);
    },
    addDept() {
      this.isAdd = true;
      this.addItem = {
        name: "",
        remark: "",
        parentId: 0
      };
    },
    async edit(id) {
      let that = this;
      that.editTreeName = "";
      this.isEdit = false;

      // 重新请求树形结构

      this.getList();

      let params = "id=" + id;

      let result = await this.$httpGet("dept/edit", params);
      console.log(result);

      if (result.data.code == 0) {
        this.isEdit = true;
        this.editItem = {
          id: id,
          name: result.data.result.name,

          remark: result.data.result.remark,

          parentId: result.data.result.parentId
        };

        this.active = [];

        this.active.push(result.data.result.parentId);

        // //递归遍历显示父节点label

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

            .$httpGet("dept/del", params)

            .then(function(res) {
              console.log(res);

              if (res.data.code == 0) {
                that.getChild(that.optionId);
                that.$message({
                  type: "success",

                  message: res.data.msg
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
    async addConfirm() {
      let result = await this.$httpPost("dept/add", this.addItem);

      if (result.data.code == 0) {
        // this.datas = result.data.result;
        this.getChild(this.optionId);
        this.$message({
          type: "success",

          message: result.data.result
        });
        this.isAdd = false;
        this.getList();
      } else {
        this.$message({
          type: "error",

          message: result.data.msg
        });
      }
      console.log(this.addItem);
    },
    async editConfirm() {
      let result = await this.$httpPost("dept/update", this.editItem);
      if (result.data.code == 0) {
        this.getChild(this.optionId);
        this.$message({
          type: "success",

          message: result.data.result
        });
        this.getList();
        this.isEdit = false;
      } else {
        this.$message({
          type: "error",

          message: result.data.msg
        });
      }

      //console.log(this.editItem)
    }
  }
};
</script>

<style lang="scss">
.dept {
  .deptTree {
    margin-top: 60px;
  }

  .addDept {
    height: 80px;
    line-height: 80px;
  }

  .addAuthority {
    padding: 30px;
  }
}
</style>
