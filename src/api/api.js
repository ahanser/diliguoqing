export default {
  // 登陆
  'user': {
    'login': './login', //  登陆
     'exit':'./logout'// 退出
  },
  'showMenu':{
     'list':'./ctrl/menu/list'
  }, //不同用户登陆进来显示的菜单
  // 用户管理
  'userManger': {
    'getList': './ctrl/user/list', // 用户管理列表获取 
    'del': './ctrl/user/del', // 删除用户
    'add': './ctrl/user/add', // 新增用户
    'edit': './ctrl/user/edit', // 编辑获取当前编辑项信息
    'update': './ctrl/user/update' // 更新用户编辑

  },
  // 角色管理
  'role': {
    'rolelist': './ctrl/role/list', //  角色列表获取
    'add': './ctrl/role/add', // 增加角色列表  
    'del': './ctrl/role/del', // 删除角色  
    'edit': './ctrl/role/edit',
    'update': './ctrl/role/update',
    'grantPermis':'./ctrl/role/grantPermis', // 角色分配权限
     'getUser' :'./ctrl/role/getUser' //查看当前角色下所属用户
  },
  // 部门管理
  'dept': {
    'deptList': './ctrl/dept/list', // 部门列表的获取
     'child':'./ctrl/dept/child', //获取子部门
      'add':'./ctrl/dept/add',// 新增子部们
      'del':'./ctrl/dept/del',// 删除子部门
      'edit':'./ctrl/dept/edit',//  获取部门详情
       'update':'./ctrl/dept/update',// 部门更新操作
       'getUser':'./ctrl/dept/getUser' // 查看当前部门下所属用户
  },
  // 权限管理
  'authority': {
    'list': './ctrl/menu/permis/list', // 权限管理列表获取
    'add': './ctrl/permis/add', //  权限列表添加
    'bymenu': './ctrl/permis/bymenu', // 查询对应菜单下的权限
    'del': './ctrl/permis/del', //  权限删除
    'edit': './ctrl/permis/edit', //  权限编辑查出对应信息
    'update': './ctrl/permis/update' //权限编辑
  },
  'meun': {
    
    'list': './ctrl/menu/permis/list', // 菜单列表获取
    'add': './ctrl/menu/add', // 添加菜单
    'edit': './ctrl/menu/edit', // 编辑带出当前项
    'child': './ctrl/menu/child', // 详情
    'del':'./ctrl/menu/del',// 删除菜单
    'update':'./ctrl/menu/update' //  菜单更新
  }
}
