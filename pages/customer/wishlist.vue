<template>
  <div class="container-fluid mt-custom">
    <div class="fade-in">
    <div class="row">
      <div class="col-md-3">
        <!-- sidebar -->
        <Sidebar />
        <!-- end sidebar -->
      </div>
      <div class="col-md-9">
        <div class="card border-0 rounded shadow-sm border-top-orange">
          <div class="card-body">
            <h5><i class="fa fa-heart"></i> MY WISHLIST</h5>
            <hr>
            
            <!-- wishlist items -->
            <div v-if="wishlist.length > 0">
              <div class="row">
                <div class="col-xl-4 col-lg-6 mb-4" v-for="product in wishlist" :key="product.id">
                  <div class="card h-100 border-0 rounded shadow-sm hover-card">
                    <div class="card-body p-0 position-relative">
                      <div class="card-img-actions overflow-hidden rounded-top"> 
                        <img :src="product.image" class="card-img img-fluid w-100" :alt="product.title" style="height: 200px; object-fit: cover;">
                      </div>
                      <div class="position-absolute top-0 right-0 m-2">
                        <button @click="removeFromWishlist(product.id)" class="btn btn-danger rounded-circle p-2">
                          <i class="fa fa-times"></i>
                        </button>
                      </div>
                    </div>
                    <div class="card-body bg-white rounded-bottom">
                      <div class="mb-2">
                        <h6 class="font-weight-semibold mb-1"> 
                          <nuxt-link :to="{name: 'products-slug', params: {slug: product.slug}}" class="text-dark mb-1 text-decoration-none" data-abc="true">{{ product.title }}</nuxt-link> 
                        </h6> 
                        <nuxt-link :to="{name: 'categories-slug', params: {slug: product.category.slug}}" class="text-muted small text-decoration-none" data-abc="true">{{ product.category.name }}</nuxt-link>
                      </div>
                      <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="text-muted small mr-2"><s>Rp. {{ formatPrice(product.price) }}</s></span>
                        <span class="badge badge-danger">{{ product.discount }}%</span>
                      </div>
                      <h5 class="mb-3 font-weight-bold text-success">Rp. {{ formatPrice(calculateDiscount(product)) }}</h5>
                      <div class="d-grid gap-2">
                        <button @click="addToCart(product)" class="btn btn-success rounded-pill py-2">
                          <i class="fa fa-shopping-cart mr-2"></i> Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- empty wishlist -->
            <div v-else class="text-center py-5">
              <div class="empty-cart-cls text-center">
                <div class="mb-4">
                  <i class="fa fa-heart text-muted" style="font-size: 5rem;"></i>
                </div>
                <h3 class="font-weight-bold mb-3">Wishlist Anda Kosong</h3>
                <p class="text-muted mb-4">Tambahkan produk ke wishlist untuk menyimpannya untuk nanti</p>
                <nuxt-link :to="{name: 'products'}" class="btn btn-warning btn-lg rounded-pill px-4 py-2" data-abc="true">
                  <i class="fa fa-shopping-bag mr-2"></i>BELANJA SEKARANG
                </nuxt-link>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  //import sidebar
  import Sidebar from '@/components/web/sidebar.vue'

  export default {

    //middleware
    middleware: 'isCustomer',

    //layout
    layout: 'default',

    //register components
    components: {
      Sidebar
    },

    //meta
    head() {
      return {
        title: 'Wishlist - Customer',
      }
    },

    //hook "asyncData"
    async asyncData({ store }) {
      await store.dispatch('web/wishlist/getWishlistData')
    },

    //computed
    computed: {

      //wishlist
      wishlist() {
        return this.$store.state.web.wishlist.wishlist
      },
    },

    //methods
    methods: {
      
      // remove from wishlist
      async removeFromWishlist(productId) {
        await this.$swal.fire({
          title: 'ARE YOU SURE?',
          text: "YOU WANT TO REMOVE THIS PRODUCT FROM WISHLIST!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'YES, REMOVE!',
          cancelButtonText: 'CANCEL',
        }).then(async (result) => {
          if (result.isConfirmed) {
            // remove from wishlist
            await this.$store.dispatch('web/wishlist/removeFromWishlist', productId)
            
            // sweet alert
            this.$swal.fire({
              title: 'REMOVED!',
              text: 'Product removed from wishlist',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
      },
      
      // add to cart
      async addToCart(product) {
        // define cart data
        const cartData = {
          product_id: product.id,
          qty: 1,
          price: this.calculateDiscount(product)
        }

        // store to cart
        await this.$store.dispatch('web/cart/storeCart', cartData)
        
        // sweet alert
        this.$swal.fire({
          title: 'ADDED!',
          text: 'Product added to cart successfully',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })
      },
      
      // calculate discount
      calculateDiscount(product) {
        const discount = (product.price * product.discount) / 100
        return product.price - discount
      }
    }

  }
</script>

<style scoped>
  .empty-cart-cls img {
    opacity: 0.5;
  }
</style>