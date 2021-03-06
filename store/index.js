const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => {
    return {
        user: null
    }
}

export const mutations = {
    setUser(state, data) {
        state.user = data;
    }
}

export const actions = {
    // 如果是服务端渲染时，会自动调用此特殊的action
    nuxtServerInit({commit}, {req}) {
        let user = null;
        if (req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie);
            try {
                user = JSON.parse(parsed.user)
            } catch (e) {
            }
        }
        commit('setUser', user);
    }
}
