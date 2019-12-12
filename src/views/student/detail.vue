<template>
  <div class="app-container">
    <el-row>
        <el-col :span="3"><img :src="item.avatar" width="50px" height="50px"/></el-col>
        <el-col :span="20" >
            <div class="text-margin">{{item.name}}</div>
            <div class="text-margin">{{item.mobile}}</div>
            <div class="text-margin" v-if="item._human">{{item._human.gender}}</div>
            <div class="text-margin">{{item.school_name}} {{item.academy}} {{item.major}}</div>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="3">户口所在地</el-col>
        <el-col :span="20">{{item.domicile}}</el-col>
    </el-row>
    <el-row>
        <el-col :span="3">出生年月</el-col>
        <el-col :span="20">{{item.birthday}}</el-col>
    </el-row>
    <el-row>
        <el-col :span="3">入学时间</el-col>
        <el-col :span="20">{{item.school_start}}</el-col>
    </el-row>
    <el-row>
        <el-col :span="3">毕业时间</el-col>
        <el-col :span="20">{{item.school_complete}}</el-col>
    </el-row>
    <el-row>
        <el-col :span="3">学生证号</el-col>
        <el-col :span="20">{{item.school_card_id}}</el-col>
    </el-row>
    <el-row>
        <el-col :span="3">学生证照片</el-col>
        <el-col :span="20">
            <img v-if="item.school_card_photo" :src="item.school_card_photo" width="100px" height="100px"/>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="3">邮箱</el-col>
        <el-col :span="20">{{item.email}}</el-col>
    </el-row>
    <el-row>
        <el-col :span="3">职业规划</el-col>
        <el-col :span="20">{{item.interest}}</el-col>
    </el-row>
    <el-row>
        <el-col :span="3">工作经验</el-col>
        <el-col :span="20">
            <div v-html="item.internships"></div>
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
      console.log(this.item)
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