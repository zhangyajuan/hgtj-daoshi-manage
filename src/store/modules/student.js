import { getStudentList, enableStudent, disableStudent} from '@/api/student'

const actions = {
  // user login
  getStudentList({ commit }, studentInfo) {
    const { username, password } = studentInfo
    return new Promise((resolve, reject) => {
        getStudentList().then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //禁用
  disableStudent({ commit }, teacherInfo) {
    const { id } = teacherInfo
    return new Promise((resolve, reject) => {
      disableStudent(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //启用
  enableStudent({ commit }, teacherInfo) {
    const { id } = teacherInfo
    return new Promise((resolve, reject) => {
      enableStudent(id).then(response => {
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

