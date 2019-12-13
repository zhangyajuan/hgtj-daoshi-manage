<template>
  <div class="app-container">
    <el-tag style="width: 100%;">学生信息</el-tag>
    <el-row>
        <el-col :span="3"><img :src="item.student.avatar" width="50px" height="50px"/></el-col>
        <el-col :span="20" >
            <div class="text-margin">{{item.student.name}}</div>
            <div class="text-margin">{{item.student.mobile}}</div>
            <div class="text-margin">{{item.student.school_name}} {{item.student.academy}} {{item.student.major}}</div>
        </el-col>
    </el-row>
    <el-tag style="width: 100%;">导师信息</el-tag>
    <el-row>
        <el-col :span="3"><img :src="item.teacher.avatar" width="50px" height="50px"/></el-col>
        <el-col :span="20" >
            <div class="text-margin">{{item.teacher.name}}</div>
            <div class="text-margin">{{item.teacher.school_name}}</div>
            <div class="text-margin">{{item.teacher.company}}</div>
            <div class="text-margin">{{item.teacher.job_title}}</div>
        </el-col>
    </el-row>
    <el-tag style="width: 100%;">申请信息</el-tag>
    <el-row>
        <el-col :span="3">申请时间</el-col>
        <el-col :span="20">{{item.created_at}}</el-col>
    </el-row>
    <el-row>
        <el-col :span="3">申请状态</el-col>
        <el-col :span="20">{{statusDes[item.status+2]}}</el-col>
    </el-row>
    <el-row v-if="item.letter">
        <el-col :span="3">自荐信</el-col>
        <el-col :span="20">
            <div v-html="item.letter"></div>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import { getTeacherList } from '@/api/table'

export default {
  data() {
    return {
      item: null,
      listLoading: true,
      statusDes: ['导师驳回','系统驳回','待系统审核','待导师审核','导师审核通过']
    }
  },
  created() {
    console.log(this.$route.query)
    if(this.$route.query){
      this.fetchData(this.$route.query.id)
    }
  },
  methods: {
    fetchData(id) {
      this.listLoading = true
      console.log(id)
      this.$store.dispatch('recommendation/applyDetail', {id: id}).then((response) => {
        this.item = response.data
        this.listLoading = false
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>
<style>
.el-row{margin-top: 20px;font-size: 14px}
.text-margin{margin-bottom: 10px;}
</style>