<template>
  <div class="container mt-custom mb-5">
    <div class="fade-in">
      <div class="row">

        <div class="col-md-4 mb-4">
          <div class="card border-0 rounded shadow-sm hover-card">
            <div class="card-body p-2">
              <img :src="product.image" class="w-100 rounded" :alt="product.title" style="height: 300px; object-fit: cover;">
            </div>
          </div>
        </div>

        <div class="col-md-8">
          <div class="card border-0 rounded shadow-sm">
            <div class="card-body">
              <h3 class="font-weight-bold">{{ product.title }}</h3>
              <div class="d-flex align-items-center mb-3">
                <div class="mr-3">
                  <span class="badge badge-danger">{{ product.discount }}% OFF</span>
                </div>
                <div>
                  <s class="text-muted">Rp. {{ formatPrice(product.price) }}</s>
                </div>
              </div>
              <h4 class="mb-4 font-weight-bold text-success">Rp. {{ formatPrice(calculateDiscount(product)) }}</h4>
              
              <div class="mb-4">
                <h6 class="font-weight-bold mb-3">Deskripsi Produk</h6>
                <div v-html="product.description" class="text-muted"></div>
              </div>
              
              <div class="table-responsive mb-4">
                <table class="table table-sm table-borderless">
                  <tbody>
                    <client-only>
                    <tr>
                      <th class="pl-0 w-25" scope="row"><strong>BERAT</strong></th>
                      <td><strong>{{ product.weight }}</strong> gram</td>
                    </tr>
                    <tr>
                      <th class="pl-0 w-25" scope="row"><strong>STOK</strong></th>
                      <td><strong>{{ product.stock }}</strong> unit</td>
                    </tr>
                    </client-only>
                  </tbody>
                </table>
              </div>
              
              <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                <button @click="addToCart(product.id, calculateDiscount(product), product.weight)" class="btn btn-lg btn-warning rounded-pill px-4 py-2 mr-2 flex-fill">
                  <i class="fa fa-shopping-cart mr-2"></i>TAMBAH KE KERANJANG
                </button>
                <button @click="toggleWishlist(product)" class="btn btn-lg rounded-pill px-4 py-2 flex-fill" :class="isInWishlist(product.id) ? 'btn-danger' : 'btn-outline-danger'">
                  <i class="fa" :class="isInWishlist(product.id) ? 'fa-heart mr-2' : 'fa-heart-o mr-2'"></i>
                  {{ isInWishlist(product.id) ? 'Dalam Wishlist' : 'Tambah ke Wishlist' }}
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="row mt-4">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow-sm">
            <div class="card-body">
              <h5 class="font-weight-bold mb-4"><i class="fa fa-comments mr-2"></i>ULASAN PRODUK ( <strong>{{ product.reviews_count }}</strong> ulasan )</h5>
              <div class="reviews-container" v-if="product.reviews && product.reviews.length > 0">
                <div class="card mb-3 border-0 shadow-sm rounded" v-for="review in product.reviews" :key="review.id">
                  <div class="card-body">
                    <div class="d-flex">
                      <div class="review-avatar mr-3">
                        <img :src="`https://ui-avatars.com/api/?name=${review.customer.name}&background=4e73df&color=ffffff&size=100'`" class="rounded-circle" width="50" height="50">
                      </div>
                      <div class="flex-grow-1">
                        <div class="d-flex justify-content-between">
                          <h6 class="mb-1 font-weight-bold">{{ review.customer.name }}</h6>
                          <small class="text-muted">{{ formatDate(review.created_at) }}</small>
                        </div>
                        <client-only>
                          <vue-star-rating class="mb-2" :rating="review.rating" :star-size="16" :read-only="true" :show-rating="false">
                          </vue-star-rating>
                        </client-only>
                        <p class="mb-0 text-muted" style="font-style: italic;">
                          {{ review.review }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-center py-5" v-else>
                <i class="fa fa-comment-alt fa-2x text-muted mb-3"></i>
                <p class="text-muted mb-0">Belum ada ulasan untuk produk ini</p>
              </div>
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
        title: `${this.product.title} - MI STORE - Distributor Xiaomi Indonesia Resmi`,
        meta: [{
            hid: 'og:title',
            name: 'og:title',
            content: `${this.product.title} - MI STORE - Distributor Xiaomi Indonesia Resmi`,
          },
          {
            hid: 'og:site_name',
            name: 'og:site_name',
            content: `${this.product.title} - MI STORE - Distributor Xiaomi Indonesia Resmi`,
          },
          {
            hid: 'og:image',
            name: 'og:image',
            content: this.product.image
          },
          {
            hid: 'description',
            name: 'description',
            content: `${this.product.title.substr(0, 30)}...`,
          },
        ]
      }
    },

    //hook "asyncData"
    async asyncData({ store, route }) {
      await store.dispatch('web/product/getDetailProduct', route.params.slug)
      // initialize wishlist
      await store.dispatch('web/wishlist/getWishlistData')
    },

    //computed
    computed: {

      //product
      product() {
        return this.$store.state.web.product.product
      },
      
      //wishlist
      wishlist() {
        return this.$store.state.web.wishlist.wishlist
      },
    },

    //method
    methods: {
      
      // format date
      formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('id-ID', options);
      },

      //method "addToCart"
      async addToCart(productId, price, weight) {

        //check loggedIn "false"
        if (!this.$auth.loggedIn) {

          //redirect
          return this.$router.push({
            name: 'customer-login'
          })
        }

        //check customer role
        if (this.$auth.strategy.name != "customer") {

          //redirect
          return this.$router.push({
            name: 'customer-login'
          })
        }

        //dispatch to action "storeCart" vuex
        await this.$store.dispatch('web/cart/storeCart', {
            product_id: productId,
            price: price,
            qty: 1,
            weight: weight
          })

          //success add to cart
          .then(() => {

            //sweet alert
            this.$swal.fire({
              title: 'BERHASIL!',
              text: "Product Berhasil Ditambahkan di Keranjang!",
              icon: 'success',
              showConfirmButton: false,
              timer: 3000
            })

          })

      },
      
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