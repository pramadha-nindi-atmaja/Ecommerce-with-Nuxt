<template>
  <div class="container mt-custom mb-5">
    <div class="fade-in">
      <div class="row">
        <div class="col-md-4 mb-4">
          <div class="card border-0 rounded shadow-sm hover-card">
            <div class="card-body p-2">
              <!-- Main Image Display -->
              <div class="main-image-container mb-3 position-relative" @click="openImageZoom">
                <img :src="selectedImage" class="w-100 rounded cursor-pointer" :alt="product.title" style="height: 300px; object-fit: cover;">
                <div class="zoom-indicator">
                  <i class="fa fa-search-plus"></i>
                </div>
              </div>
              
              <!-- Thumbnails Gallery -->
              <div class="thumbnail-gallery d-flex overflow-auto pb-2">
                <div class="thumbnail-item mr-2" v-for="(image, index) in productImages" :key="index">
                  <img :src="image" @click="selectImage(image)" class="img-thumbnail cursor-pointer" :class="{ 'active': selectedImage === image }" style="height: 60px; width: 60px; object-fit: cover;">
                </div>
              </div>
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
              
              <!-- Stock Status -->
              <div class="mb-3">
                <span class="badge" :class="product.stock > 0 ? 'badge-success' : 'badge-danger'">
                  <i class="fa" :class="product.stock > 0 ? 'fa-check-circle' : 'fa-times-circle'"></i>
                  {{ product.stock > 0 ? `Tersedia (${product.stock} unit)` : 'Stok Habis' }}
                </span>
              </div>
              
              <!-- Social Sharing Buttons -->
              <div class="mb-4">
                <p class="font-weight-bold mb-2">Bagikan Produk:</p>
                <div class="d-flex">
                  <a :href="getFacebookShareUrl" target="_blank" class="btn btn-primary rounded-circle mr-2" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                  <a :href="getTwitterShareUrl" target="_blank" class="btn btn-info rounded-circle mr-2" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
                    <i class="fab fa-twitter"></i>
                  </a>
                  <a :href="getWhatsAppShareUrl" target="_blank" class="btn btn-success rounded-circle mr-2" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
                    <i class="fab fa-whatsapp"></i>
                  </a>
                  <button @click="copyProductLink" class="btn btn-secondary rounded-circle" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
                    <i class="fa fa-link"></i>
                  </button>
                </div>
              </div>
              
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
              
              <!-- Stock Notification Form (shown when product is out of stock) -->
              <div class="mb-4" v-if="product.stock <= 0">
                <div class="alert alert-warning rounded">
                  <h6 class="font-weight-bold mb-3"><i class="fa fa-bell mr-2"></i>Notifikasi Stok</h6>
                  <p>Produk ini sedang kosong. Daftarkan email Anda untuk mendapatkan notifikasi ketika produk tersedia kembali.</p>
                  
                  <form @submit.prevent="subscribeToStockNotification">
                    <div class="form-group">
                      <label class="font-weight-bold mb-2">Email</label>
                      <input type="email" v-model="stockNotificationForm.email" class="form-control rounded-pill px-3 py-2" placeholder="Masukkan email Anda" required>
                    </div>
                    
                    <button type="submit" class="btn btn-warning rounded-pill px-4 py-2" :disabled="isSubscribing">
                      <span v-if="isSubscribing"><i class="fa fa-spinner fa-spin"></i> Memproses...</span>
                      <span v-else><i class="fa fa-bell mr-2"></i> Beri tahu saya saat tersedia</span>
                    </button>
                  </form>
                </div>
              </div>
              
              <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                <button @click="addToCart(product.id, calculateDiscount(product), product.weight)" class="btn btn-lg btn-warning rounded-pill px-4 py-2 mr-2 flex-fill" :disabled="product.stock <= 0">
                  <i class="fa fa-shopping-cart mr-2"></i>{{ product.stock > 0 ? 'TAMBAH KE KERANJANG' : 'STOK HABIS' }}
                </button>
                <button @click="toggleWishlist(product)" class="btn btn-lg rounded-pill px-4 py-2 flex-fill" :class="isInWishlist(product.id) ? 'btn-danger' : 'btn-outline-danger'">
                  <i class="fa" :class="isInWishlist(product.id) ? 'fa-heart mr-2' : 'fa-heart-o mr-2'"></i>
                  {{ isInWishlist(product.id) ? 'Dalam Wishlist' : 'Tambah ke Wishlist' }}
                </button>
                <button @click="toggleCompare(product)" class="btn btn-lg rounded-pill px-4 py-2 flex-fill" :class="isInCompare(product.id) ? 'btn-primary' : 'btn-outline-primary'">
                  <i class="fa" :class="isInCompare(product.id) ? 'fa-columns mr-2' : 'fa-columns mr-2'"></i>
                  {{ isInCompare(product.id) ? 'Dalam Perbandingan' : 'Bandingkan' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Image Zoom Modal -->
      <b-modal v-model="imageZoomModal" size="xl" hide-footer centered>
        <template #modal-title>
          <h5 class="font-weight-bold">{{ product.title }}</h5>
        </template>
        <div class="text-center">
          <img :src="selectedImage" class="img-fluid rounded" style="max-height: 70vh; object-fit: contain;" :alt="product.title">
        </div>
        <div class="thumbnail-gallery d-flex justify-content-center mt-3 overflow-auto pb-2">
          <div class="thumbnail-item mr-2" v-for="(image, index) in productImages" :key="index">
            <img :src="image" @click="selectImage(image)" class="img-thumbnail cursor-pointer" :class="{ 'active': selectedImage === image }" style="height: 60px; width: 60px; object-fit: cover;">
          </div>
        </div>
      </b-modal>

      <!-- Related Products -->
      <div class="row mt-5" v-if="relatedProducts.length > 0">
        <div class="col-md-12">
          <div class="mb-4">
            <h5 class="text-uppercase"><i class="fa fa-thumbs-up"></i> PRODUK TERKAIT</h5>
            <!-- Solid divider -->
            <hr class="solid">
          </div>
          <div class="row">
            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4" v-for="product in relatedProducts" :key="product.id">
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
      <!-- End Related Products -->

      <div class="row mt-4">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow-sm">
            <div class="card-body">
              <h5 class="font-weight-bold mb-4"><i class="fa fa-comments mr-2"></i>ULASAN PRODUK ( <strong>{{ product.reviews_count }}</strong> ulasan )</h5>
              
              <!-- Review Submission Form -->
              <div class="mb-4" v-if="$auth.loggedIn && $auth.strategy.name == 'customer'">
                <h6 class="font-weight-bold mb-3">Tulis Ulasan Anda</h6>
                <form @submit.prevent="submitReview">
                  <div class="form-group mb-3">
                    <label class="font-weight-bold mb-2">Rating</label>
                    <div class="d-flex align-items-center">
                      <vue-star-rating v-model="reviewForm.rating" :star-size="30" :show-rating="false" @rating-selected="setRating"></vue-star-rating>
                      <span class="ml-2 font-weight-bold">{{ reviewForm.rating }} dari 5 bintang</span>
                    </div>
                  </div>
                  
                  <div class="form-group mb-3">
                    <label class="font-weight-bold mb-2">Ulasan</label>
                    <textarea v-model="reviewForm.review" class="form-control rounded" rows="4" placeholder="Bagikan pengalaman Anda dengan produk ini..." required></textarea>
                  </div>
                  
                  <button type="submit" class="btn btn-warning rounded-pill px-4 py-2" :disabled="isSubmitting">
                    <span v-if="isSubmitting"><i class="fa fa-spinner fa-spin"></i> Mengirim...</span>
                    <span v-else><i class="fa fa-paper-plane mr-2"></i> Kirim Ulasan</span>
                  </button>
                </form>
              </div>
              
              <div class="alert alert-info rounded" v-else-if="$auth.strategy.name != 'customer'">
                <i class="fa fa-info-circle mr-2"></i>Anda harus masuk sebagai pelanggan untuk memberikan ulasan.
              </div>
              
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
      // initialize compare
      await store.dispatch('web/compare/getComparedProductsData')
      // initialize recently viewed
      await store.dispatch('web/recentlyViewed/getRecentlyViewed')
      // initialize stock notifications
      await store.dispatch('web/stockNotification/getStockNotifications')
      // fetch related products
      await store.dispatch('web/product/getRelatedProducts', route.params.slug)
    },

    //data function
    data() {
      return {
        selectedImage: '',
        imageZoomModal: false,
        reviewForm: {
          rating: 0,
          review: ''
        },
        isSubmitting: false,
        stockNotificationForm: {
          email: ''
        },
        isSubscribing: false
      }
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
      
      //compared products
      comparedProducts() {
        return this.$store.state.web.compare.comparedProducts
      },
      
      // recently viewed products
      recentlyViewed() {
        return this.$store.state.web.recentlyViewed.recentlyViewed
      },
      
      // stock notifications
      stockNotifications() {
        return this.$store.state.web.stockNotification.stockNotifications
      },
      
      // related products
      relatedProducts() {
        return this.$store.state.web.product.relatedProducts
      },
      
      //product images
      productImages() {
        // For now, we'll use the main image multiple times to simulate a gallery
        // In a real application, this would come from the product data
        if (this.product && this.product.image) {
          return [
            this.product.image,
            this.product.image,
            this.product.image,
            this.product.image
          ]
        }
        return []
      },
      
      // Facebook share URL
      getFacebookShareUrl() {
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`
      },
      
      // Twitter share URL
      getTwitterShareUrl() {
        return `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(this.product.title)}`
      },
      
      // WhatsApp share URL
      getWhatsAppShareUrl() {
        return `https://wa.me/?text=${encodeURIComponent(window.location.href)}`
      }
    },

    //watch
    watch: {
      product: {
        handler(newProduct) {
          if (newProduct && newProduct.image) {
            this.selectedImage = newProduct.image;
            
            // Add to recently viewed (only for real products, not empty objects)
            if (newProduct.id) {
              this.$store.dispatch('web/recentlyViewed/addRecentlyViewed', newProduct);
            }
          }
        },
        immediate: true
      }
    },

    //method
    methods: {
      
      // format date
      formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('id-ID', options);
      },

      // select image
      selectImage(image) {
        this.selectedImage = image;
      },

      // open image zoom modal
      openImageZoom() {
        this.imageZoomModal = true;
      },

      // close image zoom modal
      closeImageZoom() {
        this.imageZoomModal = false;
      },

      // set rating
      setRating(rating) {
        this.reviewForm.rating = rating;
      },

      // submit review
      async submitReview() {
        // Validate form
        if (this.reviewForm.rating === 0) {
          this.$swal.fire({
            title: 'Peringatan!',
            text: 'Silakan berikan rating untuk produk ini',
            icon: 'warning',
            showConfirmButton: false,
            timer: 2000
          });
          return;
        }

        if (!this.reviewForm.review.trim()) {
          this.$swal.fire({
            title: 'Peringatan!',
            text: 'Silakan tulis ulasan Anda',
            icon: 'warning',
            showConfirmButton: false,
            timer: 2000
          });
          return;
        }

        // Set submitting state
        this.isSubmitting = true;

        try {
          // Submit review to API
          await this.$axios.post(`/api/web/reviews`, {
            product_id: this.product.id,
            rating: this.reviewForm.rating,
            review: this.reviewForm.review
          });

          // Success message
          this.$swal.fire({
            title: 'Berhasil!',
            text: 'Ulasan Anda telah dikirim',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          });

          // Reset form
          this.reviewForm.rating = 0;
          this.reviewForm.review = '';

          // Refresh product data to show new review
          await this.$store.dispatch('web/product/getDetailProduct', this.$route.params.slug);
        } catch (error) {
          // Error message
          this.$swal.fire({
            title: 'Gagal!',
            text: 'Terjadi kesalahan saat mengirim ulasan',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
          });
        } finally {
          // Reset submitting state
          this.isSubmitting = false;
        }
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
      },
      
      // toggle compare
      async toggleCompare(product) {
        // check if product is already in compare
        const exists = this.comparedProducts.find(item => item.id === product.id)
        
        if (exists) {
          // remove from compare
          await this.$store.dispatch('web/compare/removeFromCompare', product.id)
          this.$swal.fire({
            title: 'Removed!',
            text: 'Product removed from comparison',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          // add to compare
          await this.$store.dispatch('web/compare/addToCompare', product)
          this.$swal.fire({
            title: 'Added!',
            text: 'Product added to comparison',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          })
        }
      },
      
      // check if product is in compare
      isInCompare(productId) {
        return this.comparedProducts.some(item => item.id === productId)
      },
      
      // copy product link to clipboard
      copyProductLink() {
        navigator.clipboard.writeText(window.location.href).then(() => {
          this.$swal.fire({
            title: 'Berhasil!',
            text: 'Link produk telah disalin ke clipboard',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          });
        }).catch(() => {
          this.$swal.fire({
            title: 'Gagal!',
            text: 'Terjadi kesalahan saat menyalin link produk',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
          });
        });
      },
      
      // subscribe to stock notification
      async subscribeToStockNotification() {
        // Validate form
        if (!this.stockNotificationForm.email.trim()) {
          this.$swal.fire({
            title: 'Peringatan!',
            text: 'Silakan masukkan email Anda',
            icon: 'warning',
            showConfirmButton: false,
            timer: 2000
          });
          return;
        }

        // Set subscribing state
        this.isSubscribing = true;

        try {
          // Subscribe to stock notification
          await this.$axios.post(`/api/web/stock-notifications`, {
            product_id: this.product.id,
            email: this.stockNotificationForm.email
          });

          // Success message
          this.$swal.fire({
            title: 'Berhasil!',
            text: 'Anda akan menerima notifikasi ketika produk tersedia kembali',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          });

          // Reset form
          this.stockNotificationForm.email = '';

          // Refresh stock notifications data
          await this.$store.dispatch('web/stockNotification/getStockNotifications');
        } catch (error) {
          // Error message
          this.$swal.fire({
            title: 'Gagal!',
            text: 'Terjadi kesalahan saat mendaftar notifikasi',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
          });
        } finally {
          // Reset subscribing state
          this.isSubscribing = false;
        }
      }

    }
  }
</script>

<style>
.cursor-pointer {
  cursor: pointer;
}

.thumbnail-item .img-thumbnail.active {
  border-color: #ffc107;
  border-width: 2px;
}

.main-image-container {
  position: relative;
}

.zoom-indicator {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
}
</style>