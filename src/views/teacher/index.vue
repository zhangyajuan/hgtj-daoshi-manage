<template>
  <div class="app-container">
    <el-row style="margin-bottom:20px;">
        <el-col :span="12">
            <el-button type="primary" size="small" @click="goAddTeacher()">创建导师</el-button>
        </el-col>
        <el-col :span="6" :offset="6" style="text-align:right;">
            <el-input placeholder="请输入老师名称" v-model="searchName" size="small" style="width:150px;"></el-input>
            <el-button type="primary" size="small" @click="getListFuc()">搜索</el-button>
        </el-col>
    </el-row>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="照片" width="130">
        <template slot-scope="scope">
         <img :src="scope.row.avatar" width="100px" height="100px"/>
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          <el-tag @click="goDetail(scope.$index)">{{ scope.row.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="学校" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.school_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="title"  align="center">
        <template slot-scope="scope">
          {{ scope.row.job_title }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="操作" align="center">
        <template slot-scope="scope">
        <el-button type="text" size="small" @click="goEdit(scope.$index)">编辑</el-button>
        <el-button type="text" size="small" @click="deleteTeacher(scope.$index)">删除</el-button>
        <el-button type="text" size="small" v-if="scope.row.disable == 1" @click="enableTeacher(scope.$index)">上架</el-button>
        <el-button type="text" size="small" v-else @click="disableTeacher(scope.$index)">下架</el-button>
        <el-button type="text" size="small">推荐学员</el-button>
      </template>
      </el-table-column>
    </el-table>


  <el-pagination background layout="prev, pager, next" :page-size="pager.page_size" :total="pager.total" style="margin-top: 20px;" @current-change="changePage">
  </el-pagination>
  </div>
</template>

<script>
import { getTeacherList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      pager:{
        total: 0,
        page_size:30
      },
      searchName: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    changePage(e){
        console.log(e);
    },
    fetchData() {
      this.listLoading = true
      this.$store.dispatch('teacher/getTeacherList', this.pager).then((response) => {
        this.list = response.data.data
        this.listLoading = false
      }).catch(() => {
        this.loading = false
      })
    },
    disableTeacher(index) {
      this.listLoading = true
      let data = {
          id: this.list[index].id
      }
      this.$store.dispatch('teacher/disableTeacher', data).then((response) => {
        this.$message({
          message: '老师已下架',
          type: 'success'
        });
        this.listLoading = false
      }).catch(() => {
        this.loading = false
      })
    },
    enableTeacher(index) {
      this.listLoading = true
      let data = {
          id: this.list[index].id
      }
      this.$store.dispatch('teacher/enableTeacher', data).then((response) => {
        
        this.$message({
          message: '老师已上架',
          type: 'success'
        });
        this.listLoading = false
      }).catch(() => {
        this.loading = false
      })
    },
    deleteTeacher(index){
      let _this = this
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.listLoading = true
          let data = {
              id: this.list[index].id
          }
          this.$store.dispatch('teacher/deleteTeacher', data).then((response) => {
            
            this.$message({
              message: '老师已删除',
              type: 'success'
            });
            _this.list.splice(index,1)
            this.listLoading = false
          }).catch(() => {
            this.loading = false
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    goDetail(index){
       this.$router.push({ path: '/teacher/detail', query: this.list[index]})
    },
    goAddTeacher(){
      this.$router.push({ path: '/teacher/add'})
    },
    goEdit(index){
      this.$router.push({ path: '/teacher/edit', query: {id: this.list[index].id}})
    }
  }
}
</script>
