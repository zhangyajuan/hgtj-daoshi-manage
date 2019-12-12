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
      <el-table-column align="center" label="学员" width="130">
        <template slot-scope="scope">
         <el-tag @click="goStudentDetail(scope.row.student)"> {{ scope.row.student.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="学校" align="center">
        <template slot-scope="scope">
          {{ scope.row.student.school_name }}
        </template>
      </el-table-column>
      <el-table-column label="学院" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.student.academy  }}</span>
        </template>
      </el-table-column>
      <el-table-column label="专业" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.student.major  }}</span>
        </template>
      </el-table-column>
      <el-table-column label="导师"  align="center">
        <template slot-scope="scope">
          <el-tag @click="goTeacherDetail(scope.row.teacher)">{{ scope.row.teacher.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态"  align="center">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="操作" align="center">
        <template slot-scope="scope">
        <el-button type="text" size="small" @click="showReason(scope.$index, 'pass')">通过</el-button>
        <el-button type="text" size="small" @click="showReason(scope.$index, 'deny')">驳回</el-button>
      </template>
      </el-table-column>
    </el-table>
    <el-dialog title="请输入通过/驳回原因" :visible.sync="dialogTypeFormVisible">
      <el-form>
        <el-form-item label="原因" >
          <el-input v-model="reason" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideReason()">取 消</el-button>
        <el-button type="primary" @click="saveData()">确 定</el-button>
      </div>
    </el-dialog>

  <el-pagination background layout="prev, pager, next" :page-size="pager.page_size" :total="pager.total" style="margin-top: 20px;" @current-change="changePage">
  </el-pagination>
  </div>
</template>

<script>
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
      reason: '',
      listLoading: true,
      pager:{
        total: 0,
        page_size:30
      },
      dialogTypeFormVisible: false,
      currentIndex: -1,
      currentType: ''
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
       this.$store.dispatch('recommendation/getRecommendationList', this.pager).then((response) => {
        //this.$router.push({ path: this.redirect || '/' })
        this.list = response.data.data
        this.listLoading = false
      }).catch(() => {
        this.loading = false
      })
    },
    showReason(index, type){
        this.currentIndex = index
        this.currentType = type
        this.dialogTypeFormVisible = true
    },
    hideReason(){
        this.currentIndex = -1
        this.currentType = ''
        this.reason = ''
        this.dialogTypeFormVisible = false
    },
    saveData(){
        if(this.currentType == 'pass'){
          this.setApplyPass(this.currentIndex)
        }
        else if(this.currentType == 'deny'){
          this.setApplyDeny(this.currentIndex)
        }
    },
    setApplyDeny(index) {
      let _this = this
        this.listLoading = true
        let data = {
          id: this.list[index].id,
          reason: this.reason
        }
       this.$store.dispatch('recommendation/applyDeny', data).then((response) => {
        _this.hideReason()
        this.listLoading = false
      }).catch(() => {
        this.loading = false
      })
    },
    setApplyPass(index){
      let _this = this
        this.listLoading = true
        let data = {
          id: this.list[index].id,
          reason: this.reason
        }
       this.$store.dispatch('recommendation/applyPass', data).then((response) => {
        _this.hideReason()
        this.listLoading = false
      }).catch(() => {
        this.loading = false
      })
    },
    goTeacherDetail(item){
       this.$router.push({ path: '/teacher/detail', query: item})
    },
    goStudentDetail(item){
       this.$router.push({ path: '/student/detail', query: item})
    }
  }
}
</script>
