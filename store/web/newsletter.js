export const state = () => ({
  subscribers: [],
  discountCodes: []
})

export const mutations = {
  SET_SUBSCRIBERS(state, subscribers) {
    state.subscribers = subscribers
  },
  
  ADD_SUBSCRIBER(state, subscriber) {
    state.subscribers.push(subscriber)
  },
  
  REMOVE_SUBSCRIBER(state, email) {
    state.subscribers = state.subscribers.filter(subscriber => subscriber.email !== email)
  },
  
  SET_DISCOUNT_CODES(state, discountCodes) {
    state.discountCodes = discountCodes
  },
  
  ADD_DISCOUNT_CODE(state, discountCode) {
    state.discountCodes.push(discountCode)
  }
}

export const actions = {
  // get newsletter subscribers
  getSubscribers({ commit }) {
    return new Promise((resolve) => {
      // check if we're in browser environment
      if (process.client) {
        // get subscribers from localStorage
        const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers')) || []
        
        // commit to mutation "SET_SUBSCRIBERS"
        commit('SET_SUBSCRIBERS', subscribers)
      }
      
      // resolve promise
      resolve()
    })
  },
  
  // add newsletter subscriber
  addSubscriber({ commit, state }, payload) {
    return new Promise((resolve) => {
      // check if subscriber already exists
      const exists = state.subscribers.find(subscriber => subscriber.email === payload.email)
      
      if (exists) {
        resolve({ success: false, message: 'Email sudah terdaftar' })
        return
      }
      
      // add timestamp
      payload.timestamp = new Date().toISOString()
      
      // commit to mutation "ADD_SUBSCRIBER"
      commit('ADD_SUBSCRIBER', payload)
      
      // save to localStorage
      localStorage.setItem('newsletterSubscribers', JSON.stringify(state.subscribers))
      
      // generate discount code for new subscriber
      const discountCode = {
        code: `WELCOME${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        email: payload.email,
        discount: 10, // 10% discount
        used: false,
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
      }
      
      // commit to mutation "ADD_DISCOUNT_CODE"
      commit('ADD_DISCOUNT_CODE', discountCode)
      
      // save discount codes to localStorage
      const discountCodes = JSON.parse(localStorage.getItem('discountCodes')) || []
      discountCodes.push(discountCode)
      localStorage.setItem('discountCodes', JSON.stringify(discountCodes))
      
      // resolve promise
      resolve({ 
        success: true, 
        message: 'Berhasil berlangganan newsletter', 
        discountCode: discountCode.code,
        discount: discountCode.discount
      })
    })
  },
  
  // remove newsletter subscriber
  removeSubscriber({ commit, state }, email) {
    return new Promise((resolve) => {
      // commit to mutation "REMOVE_SUBSCRIBER"
      commit('REMOVE_SUBSCRIBER', email)
      
      // save to localStorage
      localStorage.setItem('newsletterSubscribers', JSON.stringify(state.subscribers))
      
      // resolve promise
      resolve()
    })
  },
  
  // get discount codes
  getDiscountCodes({ commit }) {
    return new Promise((resolve) => {
      // check if we're in browser environment
      if (process.client) {
        // get discount codes from localStorage
        const discountCodes = JSON.parse(localStorage.getItem('discountCodes')) || []
        
        // commit to mutation "SET_DISCOUNT_CODES"
        commit('SET_DISCOUNT_CODES', discountCodes)
      }
      
      // resolve promise
      resolve()
    })
  },
  
  // validate discount code
  validateDiscountCode({ state }, code) {
    return new Promise((resolve) => {
      // find discount code
      const discountCode = state.discountCodes.find(dc => dc.code === code && !dc.used)
      
      // check if discount code exists and hasn't expired
      if (discountCode) {
        const expiryDate = new Date(discountCode.expiryDate)
        const currentDate = new Date()
        
        if (expiryDate > currentDate) {
          resolve({ 
            valid: true, 
            discount: discountCode.discount,
            code: discountCode.code
          })
        } else {
          resolve({ valid: false, message: 'Kode diskon sudah kadaluarsa' })
        }
      } else {
        resolve({ valid: false, message: 'Kode diskon tidak valid' })
      }
    })
  },
  
  // use discount code
  useDiscountCode({ commit, state }, code) {
    return new Promise((resolve) => {
      // find discount code
      const discountCodeIndex = state.discountCodes.findIndex(dc => dc.code === code && !dc.used)
      
      if (discountCodeIndex !== -1) {
        // mark as used
        const updatedDiscountCodes = [...state.discountCodes]
        updatedDiscountCodes[discountCodeIndex].used = true
        
        // commit to mutation "SET_DISCOUNT_CODES"
        commit('SET_DISCOUNT_CODES', updatedDiscountCodes)
        
        // save to localStorage
        localStorage.setItem('discountCodes', JSON.stringify(updatedDiscountCodes))
        
        resolve({ success: true, message: 'Kode diskon berhasil digunakan' })
      } else {
        resolve({ success: false, message: 'Kode diskon tidak valid atau sudah digunakan' })
      }
    })
  }
}

export const getters = {
  // get subscriber count
  subscriberCount(state) {
    return state.subscribers.length
  },
  
  // get unused discount codes
  unusedDiscountCodes(state) {
    return state.discountCodes.filter(dc => !dc.used)
  }
}