//state
export const state = () => ({

    //products
    products: [],

    //page
    page: 1,

    //product
    product: {},
    
    //related products
    relatedProducts: [],
    
    //filters
    filters: {
        category: '',
        maxPrice: '',
        sortBy: ''
    }

})

//mutations
export const mutations = {

    //mutation "SET_PRODUCTS_DATA"
    SET_PRODUCTS_DATA(state, payload) {

        //set value state "products"
        state.products = payload
    },

    //mutation "SET_PAGE"
    SET_PAGE(state, payload) {

        //set value state "page"
        state.page = payload
    },

    //mutation "SET_PRODUCT_DATA"
    SET_PRODUCT_DATA(state, payload) {

        //set value state "product"
        state.product = payload
    },
    
    //mutation "SET_RELATED_PRODUCTS"
    SET_RELATED_PRODUCTS(state, payload) {

        //set value state "relatedProducts"
        state.relatedProducts = payload
    },
    
    //mutation "SET_FILTERS"
    SET_FILTERS(state, payload) {

        //set value state "filters"
        state.filters = payload
    }

}

//actions
export const actions = {

    //get products data
    getProductsData({ commit, state }, payload) {

        //search
        let search = payload ? payload : ''

        //set promise
        return new Promise((resolve, reject) => {

            //build query parameters
            let queryParams = `q=${search}&page=${state.page}`
            
            //add filters if they exist
            if (state.filters.category) {
                queryParams += `&category=${state.filters.category}`
            }
            
            if (state.filters.maxPrice) {
                queryParams += `&max_price=${state.filters.maxPrice}`
            }
            
            if (state.filters.sortBy) {
                queryParams += `&sort_by=${state.filters.sortBy}`
            }

            //fetching Rest API "/api/web/products" with method "GET"
            this.$axios.get(`/api/web/products?${queryParams}`)
            
            //success
            .then((response) => {

                //commit ti mutation "SET_PRODUCTS_DATA"
                commit('SET_PRODUCTS_DATA', response.data.data)

                //resolve promise
                resolve()
            })

        })

    },

    //get detail product
    getDetailProduct({ commit }, payload) {

        //set promise
        return new Promise((resolve, reject) => {

            //get to Rest API "/api/web/products/:slug" with method "GET"
            this.$axios.get(`/api/web/products/${payload}`)

            //success
            .then(response => {

                //commit to mutation "SET_PRODUCT_DATA"
                commit('SET_PRODUCT_DATA', response.data.data)

                //resolve promise
                resolve()

            })

        })

    },
    
    //get related products
    getRelatedProducts({ commit }, payload) {

        //set promise
        return new Promise((resolve, reject) => {

            //fetching Rest API "/api/web/products/:id/related" with method "GET"
            this.$axios.get(`/api/web/products/${payload}/related`)

            //success
            .then((response) => {

                //commit to mutation "SET_RELATED_PRODUCTS"
                commit('SET_RELATED_PRODUCTS', response.data.data)

                //resolve promise
                resolve()
            })

        })

    },
    
    //set filters
    setFilters({ commit, state }, payload) {

        //commit to mutation "SET_FILTERS"
        commit('SET_FILTERS', payload)
        
        //refresh products with new filters
        return state.products
    }

}