<template>
  <div class="container-fluid mt-custom">
    <div class="fade-in">
      <div class="row">
          
          <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4" v-for="product in products.data" :key="product.id">
          <div class="card h-100 border-0 rounded shadow-sm hover-card">
            <div class="card-body p-0 position-relative">
              <div class="card-img-actions overflow-hidden rounded-top"> 
                <img :src="product.image" class="card-img img-fluid w-100" :alt="product.title" style="height: 200px; object-fit: cover;">
              </div>
            </div>
            <div class="card-body bg-white text-center rounded-bottom">
              <div class="mb-2">
                <h6 class="font-weight-semibold mb-1"> 
                  <nuxt-link :to="{name: 'products-slug', params: {slug: product.slug}}" class="text-dark mb-1 text-decoration-none" data-abc="true">{{ product.title }}</nuxt-link> 
                </h6> 
                <nuxt-link :to="{name: 'categories-slug', params: {slug: product.category.slug}}" class="text-muted small text-decoration-none" data-abc="true">{{ product.category.name }}</nuxt-link>
              </div>
              <div class="d-flex justify-content-center align-items-center mb-2">
                <span class="text-muted small mr-2"><s>Rp. {{ formatPrice(product.price) }}</s></span>
                <span class="badge badge-danger">{{ product.discount }}%</span>
              </div>
              <h5 class="mb-2 font-weight-bold text-success">Rp. {{ formatPrice(calculateDiscount(product)) }}</h5>
              <client-only>
                <div class="d-flex justify-content-center align-items-center mb-2">
                  <vue-star-rating :rating="parseFloat(product.reviews_avg_rating)" :increment="0.5" :star-size="16" :read-only="true" :show-rating="false" :inline="true"></vue-star-rating> 
                  <span class="small text-muted ml-1">({{ product.reviews_count }})</span>
                </div>
              </client-only>
            </div>
          </div>
        </div>

      </div>

      <!-- pagination -->
      <div class="row justify-content-center mt-4 mb-4">
          <div class="text-center">
              <b-pagination align="center" :value="products.current_page" :total-rows="products.total"
                  :per-page="products.per_page" @change="changePage" aria-controls="my-table" class="mt-4"></b-pagination>
          </div>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {

    //meta
    head() {
      return {
        title: 'Products - MI STORE - Distributor Xiaomi Indonesia Resmi',
        meta: [{
            hid: 'og:title',
            name: 'og:title',
            content: 'MI STORE - Distributor Xiaomi Indonesia Resmi'
          },
          {
            hid: 'og:site_name',
            name: 'og:site_name',
            content: 'Products - MI STORE - Distributor Xiaomi Indonesia Resmi'
          },
          {
            hid: 'og:image',
            name: 'og:image',
            content: '/images/logo.png'
          },
          {
            hid: 'description',
            name: 'description',
            content: 'Jual Produk Original Xiaomi Indonesia Bergaransi Resmi'
          },
        ]
      }
    },

    //hook "asyncData"
    async asyncData({ store }) {
        await store.dispatch('web/product/getProductsData')
    },

    //computed
    computed: {

        //products
        products() {
            return this.$store.state.web.product.products
        },
    },

    //method
    methods: {

      //method "changePage"
      changePage(page) {

        //commit to mutation "SET_PAGE"
        this.$store.commit('web/product/SET_PAGE', page)

        //dispatch on action "getProductsData"
        this.$store.dispatch('web/product/getProductsData')
      },
    }

}
</script>

<style>

</style>