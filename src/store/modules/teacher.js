import { getTeacherList, disableTeacher, enableTeacher, addTeacher, deleteTeacher, detailTeacher, updateTeacher} from '@/api/teacher'

const actions = {
  // user login
  getTeacherList({ commit }, studentInfo) {
    const { username, password } = studentInfo
    return new Promise((resolve, reject) => {
        getTeacherList().then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //下架
  disableTeacher({ commit }, teacherInfo) {
    const { id } = teacherInfo
    return new Promise((resolve, reject) => {
      disableTeacher(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //上架
  enableTeacher({ commit }, teacherInfo) {
    const { id } = teacherInfo
    return new Promise((resolve, reject) => {
      enableTeacher(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //新增老师
  addTeacher({ commit }, teacherInfo) {
    const {name, mobile,avatar,company,job_title,school_id,one_word,recommendation,daijiao_ids,order} = teacherInfo
    return new Promise((resolve, reject) => {
      addTeacher({name: name, mobile: mobile,avatar: avatar,company: company,job_title: job_title,school_id: school_id,one_word: one_word,recommendation: recommendation,daijiao_ids: daijiao_ids,order: order}).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //删除
  deleteTeacher({ commit }, teacherInfo) {
    const { id } = teacherInfo
    return new Promise((resolve, reject) => {
      deleteTeacher(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //详情
  detailTeacher({ commit }, teacherInfo) {
    const { id } = teacherInfo
    return new Promise((resolve, reject) => {
      detailTeacher(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //修改
  updateTeacher({ commit }, teacherInfo) {
    const { id,name, mobile,avatar,company,job_title,school_id,one_word,recommendation,daijiao_ids,order } = teacherInfo
    return new Promise((resolve, reject) => {
      updateTeacher({name: name, mobile: mobile,avatar: avatar,company: company,job_title: job_title,school_id: school_id,one_word: one_word,recommendation: recommendation,daijiao_ids: daijiao_ids,order: order},id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  actions
}

