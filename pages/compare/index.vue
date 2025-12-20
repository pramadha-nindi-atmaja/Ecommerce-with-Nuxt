<template>
  <div class="container-fluid mt-custom">
    <div class="fade-in">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow-sm border-top-orange">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-4">
                <h5><i class="fa fa-columns"></i> PERBANDINGAN PRODUK</h5>
                <button @click="clearCompare" class="btn btn-outline-danger rounded-pill px-3 py-1">
                  <i class="fa fa-trash mr-1"></i> Bersihkan Semua
                </button>
              </div>
              <hr>
              
              <!-- comparison items -->
              <div v-if="comparedProducts.length > 0">
                <div class="table-responsive">
                  <table class="table table-bordered comparison-table">
                    <thead>
                      <tr>
                        <th width="20%" class="bg-light">Spesifikasi</th>
                        <th v-for="product in comparedProducts" :key="product.id" class="text-center">
                          <div class="d-flex flex-column align-items-center">
                            <button @click="removeFromCompare(product.id)" class="btn btn-sm btn-outline-danger rounded-circle mb-2 ml-auto">
                              <i class="fa fa-times"></i>
                            </button>
                            <img :src="product.image" class="img-fluid mb-2" :alt="product.title" style="height: 100px; object-fit: cover;">
                            <h6 class="font-weight-bold">{{ product.title }}</h6>
                            <p class="text-success font-weight-bold">Rp. {{ formatPrice(calculateDiscount(product)) }}</p>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="font-weight-bold bg-light">Kategori</td>
                        <td v-for="product in comparedProducts" :key="product.id" class="text-center">
                          {{ product.category.name }}
                        </td>
                      </tr>
                      <tr>
                        <td class="font-weight-bold bg-light">Harga Awal</td>
                        <td v-for="product in comparedProducts" :key="product.id" class="text-center">
                          <s>Rp. {{ formatPrice(product.price) }}</s>
                        </td>
                      </tr>
                      <tr>
                        <td class="font-weight-bold bg-light">Diskon</td>
                        <td v-for="product in comparedProducts" :key="product.id" class="text-center">
                          <span class="badge badge-danger">{{ product.discount }}%</span>
                        </td>
                      </tr>
                      <tr>
                        <td class="font-weight-bold bg-light">Harga Akhir</td>
                        <td v-for="product in comparedProducts" :key="product.id" class="text-center text-success font-weight-bold">
                          Rp. {{ formatPrice(calculateDiscount(product)) }}
                        </td>
                      </tr>
                      <tr>
                        <td class="font-weight-bold bg-light">Berat</td>
                        <td v-for="product in comparedProducts" :key="product.id" class="text-center">
                          {{ product.weight }} gram
                        </td>
                      </tr>
                      <tr>
                        <td class="font-weight-bold bg-light">Stok</td>
                        <td v-for="product in comparedProducts" :key="product.id" class="text-center">
                          {{ product.stock }} unit
                        </td>
                      </tr>
                      <tr>
                        <td class="font-weight-bold bg-light">Rating</td>
                        <td v-for="product in comparedProducts" :key="product.id" class="text-center">
                          <client-only>
                            <vue-star-rating :rating="parseFloat(product.reviews_avg_rating)" :increment="0.5" :star-size="16" :read-only="true" :show-rating="false" :inline="true"></vue-star-rating>
                            <span class="small text-muted ml-1">({{ product.reviews_count }})</span>
                          </client-only>
                        </td>
                      </tr>
                      <tr>
                        <td class="font-weight-bold bg-light">Aksi</td>
                        <td v-for="product in comparedProducts" :key="product.id" class="text-center">
                          <button @click="addToCart(product.id, calculateDiscount(product), product.weight)" class="btn btn-warning rounded-pill px-3 py-1 mb-2">
                            <i class="fa fa-shopping-cart mr-1"></i> Beli
                          </button>
                          <br>
                          <button @click="toggleWishlist(product)" class="btn btn-sm rounded-pill px-2 py-1" :class="isInWishlist(product.id) ? 'btn-danger' : 'btn-outline-danger'">
                            <i class="fa" :class="isInWishlist(product.id) ? 'fa-heart' : 'fa-heart-o'"></i>
                            {{ isInWishlist(product.id) ? 'Dalam Wishlist' : 'Wishlist' }}
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <!-- empty comparison -->
              <div v-else class="text-center py-5">
                <div class="empty-cart-cls text-center">
                  <div class="mb-4">
                    <i class="fa fa-columns text-muted" style="font-size: 5rem;"></i>
                  </div>
                  <h3 class="font-weight-bold mb-3">Belum Ada Produk untuk Dibandingkan</h3>
                  <p class="text-muted mb-4">Tambahkan produk ke perbandingan untuk melihat perbedaan spesifikasi</p>
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

    //meta
    head() {
      return {
        title: 'Perbandingan Produk - Customer',
      }
    },

    //hook "asyncData"
    async asyncData({ store }) {
      await store.dispatch('web/compare/getComparedProductsData')
      await store.dispatch('web/wishlist/getWishlistData')
    },

    //computed
    computed: {
      //compared products
      comparedProducts() {
        return this.$store.state.web.compare.comparedProducts
      },
      
      //wishlist
      wishlist() {
        return this.$store.state.web.wishlist.wishlist
      },
    },

    //methods
    methods: {
      // clear all compared products
      async clearCompare() {
        await this.$swal.fire({
          title: 'Yakin ingin menghapus semua?',
          text: "Semua produk dalam perbandingan akan dihapus!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Ya, hapus!',
          cancelButtonText: 'Batal',
        }).then(async (result) => {
          if (result.isConfirmed) {
            // clear compare
            await this.$store.dispatch('web/compare/clearCompare')
            
            // sweet alert
            this.$swal.fire({
              title: 'Dihapus!',
              text: 'Semua produk berhasil dihapus dari perbandingan',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
      },
      
      // remove from compare
      async removeFromCompare(productId) {
        await this.$swal.fire({
          title: 'Yakin ingin menghapus?',
          text: "Produk akan dihapus dari perbandingan!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Ya, hapus!',
          cancelButtonText: 'Batal',
        }).then(async (result) => {
          if (result.isConfirmed) {
            // remove from compare
            await this.$store.dispatch('web/compare/removeFromCompare', productId)
            
            // sweet alert
            this.$swal.fire({
              title: 'Dihapus!',
              text: 'Produk berhasil dihapus dari perbandingan',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
      },
      
      // add to cart
      async addToCart(productId, price, weight) {
        // define cart data
        const cartData = {
          product_id: productId,
          qty: 1,
          price: price
        }

        // store to cart
        await this.$store.dispatch('web/cart/storeCart', cartData)
        
        // sweet alert
        this.$swal.fire({
          title: 'Ditambahkan!',
          text: 'Produk berhasil ditambahkan ke keranjang',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
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
            title: 'Dihapus!',
            text: 'Produk dihapus dari wishlist',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          // add to wishlist
          await this.$store.dispatch('web/wishlist/addToWishlist', product)
          this.$swal.fire({
            title: 'Ditambahkan!',
            text: 'Produk ditambahkan ke wishlist',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          })
        }
      },
      
      // check if product is in wishlist
      isInWishlist(productId) {
        return this.wishlist.some(item => item.id === productId)
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
  .comparison-table th, .comparison-table td {
    vertical-align: middle;
  }
  
  .empty-cart-cls img {
    opacity: 0.5;
  }
</style>