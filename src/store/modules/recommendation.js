import { getRecommendationList, applyDeny, applyPass,applyDetail} from '@/api/recommendation'

const actions = {
  // user login
  getRecommendationList({ commit }, studentInfo) {
    const { username, password } = studentInfo
    return new Promise((resolve, reject) => {
        getRecommendationList().then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 通过申请
   applyPass({ commit }, recommendInfo) {
    const {id, reason} = recommendInfo
    return new Promise((resolve, reject) => {
      applyPass({reason: reason}, id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 驳回申请
   applyDeny({ commit }, recommendInfo) {
    const {id, reason} = recommendInfo
    return new Promise((resolve, reject) => {
      applyDeny({reason: reason}, id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取详情
   applyDetail({ commit }, recommendInfo) {
    const {id} = recommendInfo
    return new Promise((resolve, reject) => {
      applyDetail(id).then(response => {
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

