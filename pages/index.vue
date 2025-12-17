<template>
  <div class="mr-custom mb-5">
    <div class="fade-in">

    <!-- slider -->
    <Slider />
    <!-- end slider -->

    <!-- product -->
    <div class="container-fluid mt-4 mb-5">
      <div class="mb-4">
        <h5 class="text-uppercase"><i class="fa fa-shopping-bag"></i> PRODUK TERBARU</h5>
        <!-- Solid divider -->
        <hr class="solid">
      </div>
      <div class="row">

        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4" v-for="product in products.data" :key="product.id">
          <div class="card h-100 border-0 rounded shadow-sm transition-medium hover-card">
            <div class="card-body p-0 position-relative">
              <div class="card-img-actions overflow-hidden rounded-top"> 
                <img :src="product.image" class="card-img img-fluid w-100" :alt="product.title" style="height: 200px; object-fit: cover;">
              </div>
              <div class="position-absolute top-0 right-0 m-2">
                <button @click="toggleWishlist(product)" class="btn btn-wishlist rounded-circle p-2" :class="isInWishlist(product.id) ? 'active' : ''">
                  <i class="fa" :class="isInWishlist(product.id) ? 'fa-heart text-white' : 'fa-heart-o text-danger'"></i>
                </button>
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

      <div class="row justify-content-center mt-4">
          <div class="text-center">
            <nuxt-link :to="{name: 'products'}" class="btn btn-lg btn-warning rounded-pill px-4 py-2 shadow transition-medium">
              <i class="fa fa-arrow-down mr-2"></i>LIHAT LEBIH BANYAK
            </nuxt-link>
          </div>
        </div>

    </div>
    <!-- end product -->

    </div>
  </div>
</template>

<script>
  //import slider
  import Slider from '@/components/web/slider.vue'

  export default {

    //register components
    components: {
      Slider
    },

    //meta
    head() {
      return {
        title: 'MI STORE - Distributor Xiaomi Indonesia Resmi',
        meta: [{
            hid: 'og:title',
            name: 'og:title',
            content: 'MI STORE - Distributor Xiaomi Indonesia Resmi'
          },
          {
            hid: 'og:site_name',
            name: 'og:site_name',
            content: 'MI STORE - Distributor Xiaomi Indonesia Resmi'
          },
          {
            hid: 'og:image',
            name: 'og:image',
            content: '/images/logo.png'
          },
          {
            hid: 'description',
            name: 'description',
            content: 'Official Toko Online Penjualan Produk Xiaomi'
          },
        ]
      }
    },

    //hook "asyncData"
    async asyncData({ store }) {
      await store.dispatch('web/product/getProductsData')
      // initialize wishlist
      await store.dispatch('web/wishlist/getWishlistData')
    },

    //computed
    computed: {

      //products
      products() {
        return this.$store.state.web.product.products
      },
      
      //wishlist
      wishlist() {
        return this.$store.state.web.wishlist.wishlist
      }
    },
    
    //methods
    methods: {
      
      // toggle wishlist
      async toggleWishlist(product) {
        // check if product is already in wishlist
        const exists = this.wishlist.find(item => item.id === product.id)
        
        if (exists) {
          // remove from wishlist
          await this.$store.dispatch('web/wishlist/removeFromWishlist', product.id)
          this.$swal.fire({
            title: 'Removed!',
            text: 'Product removed from wishlist',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          // add to wishlist
          await this.$store.dispatch('web/wishlist/addToWishlist', product)
          this.$swal.fire({
            title: 'Added!',
            text: 'Product added to wishlist',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          })
        }
      },
      
      // check if product is in wishlist
      isInWishlist(productId) {
        return this.wishlist.some(item => item.id === productId)
      }
    }

  }
</script>

<style>

</style>
