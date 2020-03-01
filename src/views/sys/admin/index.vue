<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="small">
          查询搜索
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="输入搜索：">
            <el-input v-model="listQuery.keyword" class="input-width" placeholder="用户名/昵称" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="adminTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="帐号" align="center">
          <template slot-scope="scope">{{scope.row.username}}</template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">{{scope.row.nickName}}</template>
        </el-table-column>
        <el-table-column label="邮箱" align="center">
          <template slot-scope="scope">{{scope.row.email}}</template>
        </el-table-column>
        <el-table-column label="添加时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="最后登录" width="160" align="center">
          <template slot-scope="scope">{{scope.row.loginTime | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="是否启用" width="140" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.status">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleSelectRole(scope.$index, scope.row)">分配角色
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleUpdate(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[10,15,20]"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      append-to-body :close-on-click-modal="false"
      :title="isEdit?'编辑用户':'添加用户'"
      :visible.sync="dialogVisible"
      width="650px">
      <el-form :model="admin"
               ref="adminForm"
               :inline="true"
               label-width="76px"
               size="small">
        <el-form-item label="用户名">
          <el-input v-model="admin.username" placeholder="请输入用户名" style="width: 220px"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="admin.nickName" placeholder="请输入昵称" style="width: 190px"></el-input>
        </el-form-item>
        <span v-if="!isEdit">
        <el-form-item label="邮箱">
          <el-input v-model="admin.email" placeholder="请输入邮箱" style="width: 220px">
            <span slot="suffix" @click="sendCode(admin.email)">
            <el-button type="primary" size="mini" :class="{disabled: !this.canClick}">
              {{content}}
            </el-button>
              </span>
          </el-input>
        </el-form-item>
        <el-form-item label="动态码">
          <el-input v-model="admin.code" placeholder="请输入动态码" style="width: 190px"></el-input>
        </el-form-item>
          </span>
        <el-form-item label="密码">
          <el-input v-model="admin.password" type="password" placeholder="请输入密码" style="width: 220px"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="admin.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">不启用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="admin.note"
                    type="textarea"
                    :rows="2"
                    style="width: 500px"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="分配角色"
      :visible.sync="allocDialogVisible"
      width="30%">
      <el-select v-model="allocRoleIds" multiple placeholder="请选择" size="small" style="width: 80%">
        <el-option
          v-for="item in allRoleList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="allocDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleAllocDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
    import {fetchList,createAdmin,updateAdmin,updateStatus,deleteAdmin,getRoleByAdmin,allocRole} from '@/api/admin';
    import {fetchAllRoleList} from '@/api/role';
    import {formatDate} from '@/utils/date';
    const defaultListQuery = {
        pageNum: 1,
        pageSize: 10,
        keyword: null
    };
    const defaultAdmin = {
        id: null,
        username: null,
        password: null,
        nickName: null,
        email: null,
        note: null,
        code: null,
        status: 1
    };
    export default {
        name: 'adminList',
        data() {
            return {
                content: '验证码',
                totalTime: 60,
                canClick: true,
                count: "",//倒计时
                listQuery: Object.assign({}, defaultListQuery),
                list: null,
                total: null,
                listLoading: false,
                dialogVisible: false,
                admin: Object.assign({}, defaultAdmin),
                isEdit: false,
                allocDialogVisible: false,
                allocRoleIds:[],
                preAllocRoleIds:[],
                allRoleList:[],
                allocAdminId:null,
            }
        },
        created() {
            this.getList();
            this.getAllRoleList();
        },
        filters: {
            formatDateTime(time) {
                if (time == null || time === '') {
                    return 'N/A';
                }
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
            }
        },
        methods: {
            sendCode(email) {
                function checkEmail(email) {
                    let regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                    if (regEmail.test(email)) {
                        return true;
                    } else {
                        return false;
                    }
                }

                if (checkEmail(email)) {
                    if (!this.canClick) return  //改动的是这两行代码
                    this.loading = true;
                    this.$store.dispatch('EmailCode',this.admin.email).then(() => {
                        this.loading = false;
                        /*this.$message({
                            message: "验证码发送成功",
                            type: "success",
                            duration: 3000
                        })*/
                    }).catch(() => {
                        this.loading = false
                    })
                    this.canClick = false
                    this.content = this.totalTime + 's后重新发送'
                    let clock = window.setInterval(() => {
                        this.totalTime--
                        this.content = this.totalTime + 's后重新发送'
                        if (this.totalTime < 0) {
                            window.clearInterval(clock)
                            this.content = '重新发送验证码'
                            this.totalTime = 60
                            this.canClick = true  //这里重新开启
                        }
                    }, 1000)
                } else {
                    this.$message({
                        type: 'error',
                        message: "邮箱格式错误"
                    });
                    console.log('参数验证不合法！');
                    return false
                }
            },
            handleResetSearch() {
                this.listQuery = Object.assign({}, defaultListQuery);
            },
            handleSearchList() {
                this.listQuery.pageNum = 1;
                this.getList();
            },
            handleSizeChange(val) {
                this.listQuery.pageNum = 1;
                this.listQuery.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.pageNum = val;
                this.getList();
            },
            handleAdd() {
                this.dialogVisible = true;
                this.isEdit = false;
                this.admin = Object.assign({},defaultAdmin);
            },
            handleStatusChange(index, row) {
                this.$confirm('是否要修改该状态?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    updateStatus(row.id, {status: row.status}).then(response => {
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消修改'
                    });
                    this.getList();
                });
            },
            handleDelete(index, row) {
                this.$confirm('是否要删除该用户?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteAdmin(row.id).then(response => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getList();
                    });
                });
            },
            handleUpdate(index, row) {
                this.dialogVisible = true;
                this.isEdit = true;
                this.admin = Object.assign({},row);
            },
            handleDialogConfirm() {
                this.$confirm('是否要确认?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if (this.isEdit) {
                        updateAdmin(this.admin.id,this.admin).then(response => {
                            this.$message({
                                message: '修改成功！',
                                type: 'success'
                            });
                            this.dialogVisible =false;
                            this.getList();
                        })
                    } else {
                        createAdmin(this.admin).then(response => {
                            this.$message({
                                message: '添加成功！',
                                type: 'success'
                            });
                            this.dialogVisible =false;
                            this.getList();
                        })
                    }
                })
            },
            handleAllocDialogConfirm(){
                let addRoleIds=new Array();
                let delRoleIds=[].concat(this.preAllocRoleIds);
                console.info(delRoleIds);
                console.info(this.preAllocRoleIds);
                console.info(this.allocRoleIds);
                for(var i=0,l=this.allocRoleIds.length;i<l;i++){
                    console.info(this.preAllocRoleIds.indexOf(this.allocRoleIds[i]));
                    if (this.preAllocRoleIds.indexOf(this.allocRoleIds[i])===-1){
                        addRoleIds.push(this.allocRoleIds[i]);
                    }else{
                        delRoleIds.splice(delRoleIds.indexOf(this.allocRoleIds[i]),1);
                    }
                }
                console.info(addRoleIds);
                console.info(delRoleIds);
                if (delRoleIds.length===0 && addRoleIds.length===0){
                    this.allocDialogVisible=false;
                }else{
                    this.$confirm('是否要确认?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let params = new URLSearchParams();
                        params.append("adminId", this.allocAdminId);
                        params.append("addRoleIds", addRoleIds);
                        params.append("delRoleIds",this.preAllocRoleIds);
                        allocRole(params).then(response => {
                            this.$message({
                                message: '分配成功！',
                                type: 'success'
                            });
                            this.allocDialogVisible = false;
                        })
                    })
                }
            },
            handleSelectRole(index,row){
                this.allocAdminId = row.id;
                this.allocDialogVisible = true;
                this.getRoleListByAdmin(row.id);
            },
            getList() {
                this.listLoading = true;
                fetchList(this.listQuery).then(response => {
                    this.listLoading = false;
                    this.list = response.data.list;
                    this.total = response.data.total;
                });
            },
            getAllRoleList() {
                fetchAllRoleList().then(response => {
                    this.allRoleList = response.data;
                });
            },
            getRoleListByAdmin(adminId) {
                getRoleByAdmin(adminId).then(response => {
                    let allocRoleList = response.data;
                    this.allocRoleIds=[];
                    if(allocRoleList!=null&&allocRoleList.length>0){
                        for(let i=0;i<allocRoleList.length;i++){
                            this.allocRoleIds.push(allocRoleList[i].id);
                        }
                    }
                    this.preAllocRoleIds=this.allocRoleIds;
                });
            }
        }
    }
</script>
<style></style>
