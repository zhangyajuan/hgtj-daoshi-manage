<template>
  <div class="app-container">
    <el-row>
        <el-col :span="3"><img :src="item.avatar" width="100px" height="100px"/></el-col>
        <el-col :span="20" >
            <div class="text-margin">{{item.name}}</div>
            <div class="text-margin">{{item.school_name}}</div>
            <div class="text-margin">{{item.company}}</div>
            <div class="text-margin">{{item.job_title}}</div>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="3">给学生的一句话</el-col>
        <el-col :span="20">{{item.one_word}}</el-col>
    </el-row>
    <el-row>
        <el-col :span="3">简介</el-col>
        <el-col :span="20">
            <div v-html="item.recommendation"></div>
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
    }
  },
  created() {
    //this.fetchData()
    if(this.$route.query){
      this.item = this.$route.query
    }
  },
  methods: {
    fetchData() {
      this.listLoading = true
      this.$store.dispatch('teacher/getTeacherList', this.pager).then((response) => {
        this.list = response.data.data
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