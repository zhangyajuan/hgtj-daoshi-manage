<template>
  <div class="app-container">
    <el-form :rules="rules" ref="formData" :model="formData" label-width="120px" size="small">
      <div class="tag-style" style="margin-bottom:30px;width:100%;">基本信息</div>
      <el-row>
        <el-col :span="15">
        <el-form-item label="姓名" prop="name" >
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="性别" prop="gender" >
            <el-radio v-model="formData.gender" label="1">男</el-radio>
            <el-radio v-model="formData.gender" label="2">女</el-radio>
        </el-form-item>

        <el-form-item label="头像"   prop="avatar">
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
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="formData.mobile"/>
        </el-form-item>
        <el-form-item label="户口所在地" prop="domicile" >
          <el-input v-model="formData.domicile" />
        </el-form-item>
        <el-form-item label="出生年月" prop="birthday" >
          <el-date-picker v-model="formData.birthday" type="date" placeholder="选择出生日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="入学时间" prop="school_start" >
          <el-date-picker v-model="formData.school_start" type="date" placeholder="选择出生日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="毕业时间" prop="school_complete" >
          <el-date-picker v-model="formData.school_complete" type="date" placeholder="选择出生日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="在读学校" prop="school_id">
          <el-select v-model="formData.school_id" placeholder="选择学校" style="width:30%">
              <el-option v-for="item in schools" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="在读学院" prop="academy" >
          <el-input v-model="formData.academy" />
        </el-form-item>
        <el-form-item label="在读专业" prop="major" >
          <el-input v-model="formData.major" />
        </el-form-item>
        <el-form-item label="在读学位" prop="degree" >
           <el-select v-model="formData.degree" placeholder="选择学位" style="width:30%">
              <el-option v-for="item in degrees" :key="item.id" :label="item.value" :value="item.id">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学生证号" prop="school_card_id" >
          <el-input v-model="formData.school_card_id" />
        </el-form-item>
        <el-form-item label="学生证照片"   prop="school_card_phone">
          <el-upload
          class="avatar-uploader"
          action="https://hgbc-daoshi.oss-cn-beijing.aliyuncs.com/"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          ref="upload"
          :http-request="onUpload1"
          @on-change="upload"
          >
          <img v-if="imageUrl_card" :src="imageUrl_card" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" >
          <el-input v-model="formData.email" />
        </el-form-item>
        <el-form-item label="职业规划" prop="interest" >
          <el-input v-model="formData.interest" />
        </el-form-item>
        <el-form-item label="实习经历" prop="internships" >
          <div>
            <tinymce v-model="formData.internships" :height="300"/>
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
        id: 0,
        name: '',
        en_name: '',
        avatar: '',
        email: '',
        mobile: '',
        gender: 0,
        birthday: '',
        domicile: '',
        description: '',
        degree: 0,
        school_id: 0,
        school_start: '',
        school_complete: '',
        school_card_id: 0,
        school_card_photo: '',
        interest: '',
        school_name: '',
        academy: '',
        major: '',
        internships: ''
      },
      degrees:[
          { 'id': 1, value:'本科'}, 
          { 'id': 2, value:'硕士'}, 
          { 'id': 3, value:'博士'}
          ],
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' },
          {  min:2,max: 10, message: '长度在 10 个字符', trigger: 'blur' }
        ],
        mobile:[{ required: true, validator: valiPhone, trigger: 'blur' }],
        avatar:[{required:true, validator: valiIcon, trigger: 'change' }],
        email:[ { required: true, message: '请输入邮箱地址', trigger: 'change' }],
        gender:[ { required: true, message: '请选择性别', trigger: 'change' }],
        birthday: [ { required: true, message: '请选择出生日期', trigger: 'change' }],
        domicile: [ { required: true, message: '请输入户口所在地', trigger: 'change' }],
        degree: [ { required: true, message: '请选择学位', trigger: 'change' }],
        school_id: [ { required: true, message: '请选择在读学校', trigger: 'change' }],
        school_start: [ { required: true, message: '请选择入学时间', trigger: 'change' }],
        school_complete: [ { required: true, message: '请选择毕业时间', trigger: 'change' }],
        school_card_id: [ { required: true, message: '请输入学生证号', trigger: 'change' }],
        school_card_photo: [ { required: true, message: '请上传学生证照片', trigger: 'change' }],
        interest: [ { required: true, message: '请输入职业规划', trigger: 'change' }],
        academy: [ { required: true, message: '请输入在读院系', trigger: 'change' }],
        major: [ { required: true, message: '请输入专业', trigger: 'change' }],
      },
      imageUrl: '',
      schools:[],
      content: '',
      imageUrl_card: ''
    }
  },
  methods: {
    onSubmit() {
      let data ={...this.formData}
      data.avatar = this.imageUrl
      data.school_card_photo = this.imageUrl_card
      data.birthday = data.birthday.getFullYear()+'-'+(data.birthday.getMonth()+1)+'-'+data.birthday.getDate()
      data.school_start =  data.school_start.getFullYear()+'-'+(data.school_start.getMonth()+1)+'-'+data.school_start.getDate()
      data.school_complete =  data.school_complete.getFullYear()+'-'+(data.school_complete.getMonth()+1)+'-'+data.school_complete.getDate()
      this.$refs.formData.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('student/editStudent' , data).then(() => {
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
    onUpload1(param){
      var _this = this
      const file = param.file;
      var md5 = crypto.createHash("md5");
      md5.update(param.file.name);
      var f_name = md5.digest('hex');
      let name = `daoshi/school_card/` + f_name + '.jpg' 
      // 上传
      let clientObj = client();
      console.log(clientObj)
      clientObj.put(name, file).then(function (response) {
        console.log(response)
          if (response.res.status === 200) {
            console.log('上传了')
            _this.imageUrl_card = response.url
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
    }
  },
  created() {
    if(this.$route.query){
        console.log(this.$route.query)
        this.formData = this.$route.query
        this.imageUrl = this.formData.avatar
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