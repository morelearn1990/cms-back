const state = {
    username: '',
    accessToken: ''
}

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {
    //更新用户信息
    updateUserInfo(state, newUserInfo) {
        state.userInfo = newUserInfo;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}