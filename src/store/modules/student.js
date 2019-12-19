import { getStudentList, enableStudent, disableStudent, editStudent} from '@/api/student'

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
  disableStudent({ commit }, studentInfo) {
    const { id } = studentInfo
    return new Promise((resolve, reject) => {
      disableStudent(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //启用
  editStudent({ commit }, studentInfo) {
    const {id, name, en_name, avatar, email, mobile, gender, birthday, domicile, description, degree, school_id, school_start, school_complete, school_card_id, school_card_photo, interest, school_name, academy, major,internships} = studentInfo
    return new Promise((resolve, reject) => {
      editStudent({name: name, en_name: en_name, avatar: avatar, email: email, mobile: mobile, gender: gender, birthday: birthday, domicile: domicile, description: description, degree: degree, school_id: school_id, school_start: school_start, school_complete: school_complete, school_card_id: school_card_id, school_card_photo: school_card_photo, interest: interest, school_name: school_name, academy: academy, major: major,internships: internships}, id).then(response => {
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

