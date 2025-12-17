<template>
  <div class="container-fluid mt-custom">
    <div class="fade-in">
      <div class="row">
          <div class="col-md-12">
              <h3 class="font-weight-bold mb-4">CATEGORY : <strong>{{ category.name.toUpperCase() }}</strong></h3>
              <!-- Solid divider -->
              <hr class="solid">
          </div>
      </div>
      <div class="row">
          
          <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4" v-for="product in category.products" :key="product.id">
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
    </div>
  </div>
</template>

<script>
export default {

    //meta
    head() {
      return {
        title: `Category : ${this.category.name}  - MI STORE - Distributor Xiaomi Indonesia Resmi`,
        meta: [{
            hid: 'og:title',
            name: 'og:title',
            content: `Category : ${this.category.name}  - MI STORE - Distributor Xiaomi Indonesia Resmi`
          },
          {
            hid: 'og:site_name',
            name: 'og:site_name',
            content: `Category : ${this.category.name}  - MI STORE - Distributor Xiaomi Indonesia Resmi`
          },
          {
            hid: 'og:image',
            name: 'og:image',
            content: `${this.category.image}`
          },
          {
            hid: 'description',
            name: 'description',
            content: `Category : ${this.category.name}  - MI STORE - Distributor Xiaomi Indonesia Resmi`
          },
        ]
      }
    },

    //hook "asyncData"
    async asyncData({ store , route}) {
      await store.dispatch('web/category/getDetailCategory', route.params.slug)
    },

    //computed
    computed: {

      //category
      category() {
        return this.$store.state.web.category.category
      },
    },

}
</script>

<style>

</style>