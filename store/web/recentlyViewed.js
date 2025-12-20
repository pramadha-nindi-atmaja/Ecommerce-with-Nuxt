// state
export const state = () => ({
    // recently viewed products
    recentlyViewed: []
})

// mutations
export const mutations = {
    // mutation "SET_RECENTLY_VIEWED"
    SET_RECENTLY_VIEWED(state, payload) {
        // set value state "recentlyViewed"
        state.recentlyViewed = payload
    },
    
    // mutation "ADD_RECENTLY_VIEWED"
    ADD_RECENTLY_VIEWED(state, payload) {
        // check if product already exists in recently viewed
        const existsIndex = state.recentlyViewed.findIndex(item => item.id === payload.id)
        
        // if exists, remove it first
        if (existsIndex !== -1) {
            state.recentlyViewed.splice(existsIndex, 1)
        }
        
        // add to the beginning of the array
        state.recentlyViewed.unshift(payload)
        
        // limit to 10 products
        if (state.recentlyViewed.length > 10) {
            state.recentlyViewed = state.recentlyViewed.slice(0, 10)
        }
    }
}

// actions
export const actions = {
    // get recently viewed products from localStorage
    getRecentlyViewed({ commit }) {
        // set promise
        return new Promise((resolve) => {
            // check if we're in browser environment
            if (process.client) {
                // get recently viewed from localStorage
                const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || []
                
                // commit to mutation "SET_RECENTLY_VIEWED"
                commit('SET_RECENTLY_VIEWED', recentlyViewed)
            }
            
            // resolve promise
            resolve()
        })
    },
    
    // add product to recently viewed
    addRecentlyViewed({ commit, state }, payload) {
        // set promise
        return new Promise((resolve) => {
            // commit to mutation "ADD_RECENTLY_VIEWED"
            commit('ADD_RECENTLY_VIEWED', payload)
            
            // save to localStorage
            localStorage.setItem('recentlyViewed', JSON.stringify(state.recentlyViewed))
            
            // resolve promise
            resolve()
        })
    }
}