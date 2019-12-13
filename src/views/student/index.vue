<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
         <el-tag @click="goDetail(scope.$index)"> {{ scope.row.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="学校" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.school_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学院" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.academy }}</span>
        </template>
      </el-table-column>
      <el-table-column label="专业"  align="center">
        <template slot-scope="scope">
          {{ scope.row.major }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="操作" align="center">
        <template slot-scope="scope">
        <el-button type="text" size="small">编辑</el-button>
        <el-button type="text" v-if="scope.row.disable == 1" size="small" @click="enableStudent(scope.$index)">启用</el-button>
        <el-button type="text" v-else size="small" @click="disableStudent(scope.$index)">禁用</el-button>
        <el-button type="text" size="small">匹配导师</el-button>
      </template>
      </el-table-column>
    </el-table>


  <el-pagination background layout="prev, pager, next" :page-size="pager.page_size" :total="pager.total" style="margin-top: 20px;" @current-change="changePage">
  </el-pagination>
  </div>
</template>

<script>

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      pager:{
        total: 0,
        page_size:30
      },
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
      this.$store.dispatch('student/getStudentList', this.pager).then((response) => {
        //this.$router.push({ path: this.redirect || '/' })
        this.list = response.data.data
        this.listLoading = false
      }).catch(() => {
        this.loading = false
      })
    },
    disableStudent(index) {
      this.listLoading = true
      let data = {
          id: this.list[index].id
      }
      this.$store.dispatch('student/disableStudent', data).then((response) => {
        this.$message({
          message: '已禁用',
          type: 'success'
        });
        this.listLoading = false
      }).catch(() => {
        this.loading = false
      })
    },
    enableStudent(index) {
      this.listLoading = true
      let data = {
          id: this.list[index].id
      }
      this.$store.dispatch('student/enableStudent', data).then((response) => {
        
        this.$message({
          message: '已启用',
          type: 'success'
        });
        this.listLoading = false
      }).catch(() => {
        this.loading = false
      })
    },
    goDetail(index){
       this.$router.push({ path: '/student/detail', query: this.list[index]})
    }
  }
}
</script>
