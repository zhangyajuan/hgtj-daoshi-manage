import { getSchoolList} from '@/api/school'

const actions = {
  // user login
  getSchoolList({ commit }, schoolInfo) {
    const { page,size,order,direction} = schoolInfo
    return new Promise((resolve, reject) => {
        getSchoolList({page: page,size: size,order: order,direction: direction}).then(response => {
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

