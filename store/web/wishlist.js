// state
export const state = () => ({
    // wishlist items
    wishlist: [],
    
    // wishlist count
    wishlistCount: 0
})

// mutations
export const mutations = {
    // mutation "SET_WISHLIST_DATA"
    SET_WISHLIST_DATA(state, payload) {
        // set value state "wishlist"
        state.wishlist = payload
    },
    
    // mutation "SET_WISHLIST_COUNT"
    SET_WISHLIST_COUNT(state, payload) {
        // set value state "wishlistCount"
        state.wishlistCount = payload
    },
    
    // mutation "ADD_TO_WISHLIST"
    ADD_TO_WISHLIST(state, payload) {
        // check if item already exists in wishlist
        const exists = state.wishlist.find(item => item.id === payload.id)
        
        // if not exists, add to wishlist
        if (!exists) {
            state.wishlist.push(payload)
            state.wishlistCount = state.wishlist.length
        }
    },
    
    // mutation "REMOVE_FROM_WISHLIST"
    REMOVE_FROM_WISHLIST(state, payload) {
        // filter out the item to remove
        state.wishlist = state.wishlist.filter(item => item.id !== payload)
        state.wishlistCount = state.wishlist.length
    }
}

// actions
export const actions = {
    // get wishlist data from localStorage
    getWishlistData({ commit }) {
        // set promise
        return new Promise((resolve) => {
            // check if we're in browser environment
            if (process.client) {
                // get wishlist from localStorage
                const wishlist = JSON.parse(localStorage.getItem('wishlist')) || []
                
                // commit to mutation "SET_WISHLIST_DATA"
                commit('SET_WISHLIST_DATA', wishlist)
                
                // commit to mutation "SET_WISHLIST_COUNT"
                commit('SET_WISHLIST_COUNT', wishlist.length)
            }
            
            // resolve promise
            resolve()
        })
    },
    
    // add product to wishlist
    addToWishlist({ commit, state }, payload) {
        // set promise
        return new Promise((resolve) => {
            // commit to mutation "ADD_TO_WISHLIST"
            commit('ADD_TO_WISHLIST', payload)
            
            // save to localStorage
            localStorage.setItem('wishlist', JSON.stringify(state.wishlist))
            
            // resolve promise
            resolve()
        })
    },
    
    // remove product from wishlist
    removeFromWishlist({ commit, state }, payload) {
        // set promise
        return new Promise((resolve) => {
            // commit to mutation "REMOVE_FROM_WISHLIST"
            commit('REMOVE_FROM_WISHLIST', payload)
            
            // save to localStorage
            localStorage.setItem('wishlist', JSON.stringify(state.wishlist))
            
            // resolve promise
            resolve()
        })
    }
}