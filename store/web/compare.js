// state
export const state = () => ({
    // compared products
    comparedProducts: []
})

// mutations
export const mutations = {
    // mutation "SET_COMPARED_PRODUCTS"
    SET_COMPARED_PRODUCTS(state, payload) {
        // set value state "comparedProducts"
        state.comparedProducts = payload
    },
    
    // mutation "ADD_TO_COMPARE"
    ADD_TO_COMPARE(state, payload) {
        // check if item already exists in compared products
        const exists = state.comparedProducts.find(item => item.id === payload.id)
        
        // if not exists and we have less than 4 products, add to compared products
        if (!exists && state.comparedProducts.length < 4) {
            state.comparedProducts.push(payload)
        }
    },
    
    // mutation "REMOVE_FROM_COMPARE"
    REMOVE_FROM_COMPARE(state, payload) {
        // filter out the item to remove
        state.comparedProducts = state.comparedProducts.filter(item => item.id !== payload)
    },
    
    // mutation "CLEAR_COMPARE"
    CLEAR_COMPARE(state) {
        // clear all compared products
        state.comparedProducts = []
    }
}

// actions
export const actions = {
    // get compared products data from localStorage
    getComparedProductsData({ commit }) {
        // set promise
        return new Promise((resolve) => {
            // check if we're in browser environment
            if (process.client) {
                // get compared products from localStorage
                const comparedProducts = JSON.parse(localStorage.getItem('comparedProducts')) || []
                
                // commit to mutation "SET_COMPARED_PRODUCTS"
                commit('SET_COMPARED_PRODUCTS', comparedProducts)
            }
            
            // resolve promise
            resolve()
        })
    },
    
    // add product to compare
    addToCompare({ commit, state }, payload) {
        // set promise
        return new Promise((resolve) => {
            // commit to mutation "ADD_TO_COMPARE"
            commit('ADD_TO_COMPARE', payload)
            
            // save to localStorage
            localStorage.setItem('comparedProducts', JSON.stringify(state.comparedProducts))
            
            // resolve promise
            resolve()
        })
    },
    
    // remove product from compare
    removeFromCompare({ commit, state }, payload) {
        // set promise
        return new Promise((resolve) => {
            // commit to mutation "REMOVE_FROM_COMPARE"
            commit('REMOVE_FROM_COMPARE', payload)
            
            // save to localStorage
            localStorage.setItem('comparedProducts', JSON.stringify(state.comparedProducts))
            
            // resolve promise
            resolve()
        })
    },
    
    // clear all compared products
    clearCompare({ commit }) {
        // set promise
        return new Promise((resolve) => {
            // commit to mutation "CLEAR_COMPARE"
            commit('CLEAR_COMPARE')
            
            // remove from localStorage
            localStorage.removeItem('comparedProducts')
            
            // resolve promise
            resolve()
        })
    }
}