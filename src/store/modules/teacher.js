import { getTeacherList, disableTeacher, enableTeacher} from '@/api/teacher'

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
  }
}

export default {
  namespaced: true,
  actions
}

