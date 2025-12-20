// state
export const state = () => ({
    // stock notifications
    stockNotifications: []
})

// mutations
export const mutations = {
    // mutation "SET_STOCK_NOTIFICATIONS"
    SET_STOCK_NOTIFICATIONS(state, payload) {
        // set value state "stockNotifications"
        state.stockNotifications = payload
    },
    
    // mutation "ADD_STOCK_NOTIFICATION"
    ADD_STOCK_NOTIFICATION(state, payload) {
        // check if notification already exists
        const exists = state.stockNotifications.find(item => item.product_id === payload.product_id && item.email === payload.email)
        
        // if not exists, add to notifications
        if (!exists) {
            state.stockNotifications.push(payload)
        }
    },
    
    // mutation "REMOVE_STOCK_NOTIFICATION"
    REMOVE_STOCK_NOTIFICATION(state, payload) {
        // filter out the notification to remove
        state.stockNotifications = state.stockNotifications.filter(item => 
            !(item.product_id === payload.product_id && item.email === payload.email)
        )
    }
}

// actions
export const actions = {
    // get stock notifications from localStorage
    getStockNotifications({ commit }) {
        // set promise
        return new Promise((resolve) => {
            // check if we're in browser environment
            if (process.client) {
                // get stock notifications from localStorage
                const stockNotifications = JSON.parse(localStorage.getItem('stockNotifications')) || []
                
                // commit to mutation "SET_STOCK_NOTIFICATIONS"
                commit('SET_STOCK_NOTIFICATIONS', stockNotifications)
            }
            
            // resolve promise
            resolve()
        })
    },
    
    // add stock notification
    addStockNotification({ commit, state }, payload) {
        // set promise
        return new Promise((resolve) => {
            // commit to mutation "ADD_STOCK_NOTIFICATION"
            commit('ADD_STOCK_NOTIFICATION', payload)
            
            // save to localStorage
            localStorage.setItem('stockNotifications', JSON.stringify(state.stockNotifications))
            
            // resolve promise
            resolve()
        })
    },
    
    // remove stock notification
    removeStockNotification({ commit, state }, payload) {
        // set promise
        return new Promise((resolve) => {
            // commit to mutation "REMOVE_STOCK_NOTIFICATION"
            commit('REMOVE_STOCK_NOTIFICATION', payload)
            
            // save to localStorage
            localStorage.setItem('stockNotifications', JSON.stringify(state.stockNotifications))
            
            // resolve promise
            resolve()
        })
    }
}