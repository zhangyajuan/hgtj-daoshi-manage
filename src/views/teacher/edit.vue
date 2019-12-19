<template>
  <div class="app-container">
    <el-form :rules="rules" ref="formData" :model="formData" label-width="120px" size="small">
      <div class="tag-style" style="margin-bottom:30px;width:100%;">基本信息</div>
      <el-row>
        <el-col :span="15">
        <el-form-item label="姓名" prop="name" >
          <el-input v-model="formData.name" />
        </el-form-item>

        <el-form-item label="头像"   prop="photo">
          <el-upload
          class="avatar-uploader"
          action="https://hgbc-daoshi.oss-cn-beijing.aliyuncs.com/"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          ref="upload"
          :http-request="onUpload"
          @on-change="upload"
          >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="formData.mobile"/>
        </el-form-item>
        <el-form-item label="毕业院校" prop="school_id">
          <el-select v-model="formData.school_id" placeholder="选择学校" style="width:30%">
              <el-option v-for="item in schools" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公司名称" prop="company" >
          <el-input v-model="formData.company" />
        </el-form-item>
        <el-form-item label="职位/Title" prop="job_title" >
          <el-input v-model="formData.job_title" />
        </el-form-item>
        <el-form-item label="给学员的一句话" prop="one_word" >
          <el-input v-model="formData.one_word" />
        </el-form-item>
        <el-form-item label="个人简介" prop="recommendation" >
          <div>
            <tinymce v-model="formData.recommendation" :height="300"/>
          </div>
        </el-form-item>
      
      </el-col>
      </el-row>
      <el-row style="margin-top:20px;">
      <el-col :span="15" style="text-align:center;">
        <el-button type="primary" size="small" class="el-button_fc8433" @click="onSubmit()">确定</el-button>
        <el-button type="primary" size="small" class="el-button_fc8433" @click="onCancel()">取消</el-button>
      </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import crypto from 'crypto'
import { validPhone } from '@/utils/validate'
import Tinymce from '@/components/Tinymce'
import {client} from '@/utils/upload-ali'
const OSS = require('ali-oss');
export default {
  components: { Tinymce },
  data() {
      var valiIcon = (rule, value, callback) => {
         if (!this.formData.avatar) {
           callback(new Error('请上传图片'));
         } else {
           callback();
        }
        }
      let valiPwd = (rule, value, callback) => {
         if (value&&value.length>5&&value.length<15) {
           callback();
         } else {
           callback(new Error('请填写密码,且长度在6-15之间'));
        }
        }
      const valiPhone = (rule, value, callback) => {
        if (!validPhone(value)){
          callback(new Error('请输入正确的11位手机号码'))
        }else {
          callback()
      }
    }
    const progress = async function (p) {
      console.log(p);
    }
    return {
      formData: {
        name: '',
        mobile: '',
        avatar: '',
        company: '',
        job_title: '',
        school_id: '',
        one_word: '',
        recommendation: '',
        daijiao_ids: '',
        order: 0,
        id: 0
      },
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' },
          {  min:2,max: 10, message: '长度在 10 个字符', trigger: 'blur' }
        ],
        mobile:[{ required: true, validator: valiPhone, trigger: 'blur' }],
        company:[ { required: true, message: '请输入公司名称', trigger: 'change' }],
        job_title:[ { required: true, message: '请输入职位/Title', trigger: 'change' }],
        one_word: [ { required: true, message: '请输入给学员的一句话', trigger: 'change' }],
        recommendation: [ { required: true, message: '请输入个人简介', trigger: 'change' }],
        loginName:[
          { required: true, message: '请输入账号', trigger: 'blur' },
          ],
        password:[
          { required: true, validator: valiPwd, trigger: 'blur' },
          ],
        avatar:[
          {required:true, validator: valiIcon, trigger: 'change' }
          ],
      },
      imageUrl: '',
      schools:[],
      content: ''
    }
  },
  methods: {
    onSubmit() {
      let data ={...this.formData}
      data.avatar = this.imageUrl
      this.$refs.formData.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('teacher/updateTeacher' , data).then(() => {
            this.$router.push({ path: this.redirect || '/teacher/teacher' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onCancel() {
      this.$router.back(-1);

    },

    beforeAvatarUpload(file) {
      const isImage = (file.type === 'image/jpeg' || file.type ==='image/png');
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isImage) {
        this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isImage && isLt2M;
    },
    onUpload(param){
      var _this = this
      const file = param.file;
      var md5 = crypto.createHash("md5");
      md5.update(param.file.name);
      var f_name = md5.digest('hex');
      let name = `daoshi/avatar/` + f_name + '.jpg' 
      // 上传
      let clientObj = client();
      console.log(clientObj)
      clientObj.put(name, file).then(function (response) {
        console.log(response)
          if (response.res.status === 200) {
            console.log('上传了')
            _this.imageUrl = response.url
          }
        }).catch(function (err) {
            console.error('error: ', err)
        }); 
      
    },
    upload(file, fileList){

       // this.$refs.formData.validateField(valid => {
       //        if (valid) {
       //            console.log('vue 图片上传钩子函数')
       //        }else{
       //          console.log("buxing")
       //        }
       //    })
    },
    getSchoolList(){
        let _this = this
        let data={
          page: 1,
          size: 100,
          order: 'order',
          direction: 'desc'
        }
        this.$store.dispatch('school/getSchoolList' , data).then((response) => {
            _this.schools = response.data.data
            _this.loading = false
          }).catch(() => {
            _this.loading = false
          })
    },
    getTeacherDetail(id){
        let _this = this
        let data = {
              id: id
          }
        this.$store.dispatch('teacher/detailTeacher' , data).then((response) => {
            _this.formData = response.data
            _this.imageUrl = response.data.avatar
            _this.loading = false
          }).catch(() => {
            _this.loading = false
          })
    }
  },
  created() {
    if(this.$route.query){
        this.formData.id = this.$route.query.id
        this.getTeacherDetail(this.$route.query.id)
    }
  },
  mounted() {
    this.getSchoolList()
  }
}

</script>

<style scoped>
.line{
  text-align: center;
}
</style>


<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>