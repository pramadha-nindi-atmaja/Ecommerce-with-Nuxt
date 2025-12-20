<template>
  <div class="container-fluid mt-custom">
    <div class="fade-in">
      <!-- Filter and Sort Section -->
      <div class="row mb-4">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow-sm">
            <div class="card-body">
              <div class="row">
                <!-- Category Filter -->
                <div class="col-md-3 mb-3">
                  <label class="font-weight-bold mb-2">Kategori</label>
                  <select class="form-control rounded-pill px-3 py-2" v-model="filters.category" @change="applyFilters">
                    <option value="">Semua Kategori</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                      {{ category.name }}
                    </option>
                  </select>
                </div>
                
                <!-- Price Range Filter -->
                <div class="col-md-3 mb-3">
                  <label class="font-weight-bold mb-2">Harga Maksimum</label>
                  <select class="form-control rounded-pill px-3 py-2" v-model="filters.maxPrice" @change="applyFilters">
                    <option value="">Semua Harga</option>
                    <option value="100000">Di bawah Rp 100.000</option>
                    <option value="500000">Di bawah Rp 500.000</option>
                    <option value="1000000">Di bawah Rp 1.000.000</option>
                    <option value="5000000">Di bawah Rp 5.000.000</option>
                  </select>
                </div>
                
                <!-- Sort By -->
                <div class="col-md-3 mb-3">
                  <label class="font-weight-bold mb-2">Urutkan Berdasarkan</label>
                  <select class="form-control rounded-pill px-3 py-2" v-model="sortBy" @change="applySorting">
                    <option value="">Default</option>
                    <option value="price_asc">Harga Terendah</option>
                    <option value="price_desc">Harga Tertinggi</option>
                    <option value="name_asc">Nama A-Z</option>
                    <option value="name_desc">Nama Z-A</option>
                    <option value="rating_desc">Rating Tertinggi</option>
                  </select>
                </div>
                
                <!-- Clear Filters Button -->
                <div class="col-md-3 mb-3 d-flex align-items-end">
                  <button @click="clearFilters" class="btn btn-outline-secondary rounded-pill px-3 py-2">
                    <i class="fa fa-times mr-1"></i>Bersihkan Filter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
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
              <div class="d-grid gap-2 mt-2">
                <button @click="openQuickView(product)" class="btn btn-sm btn-info rounded-pill">
                  <i class="fa fa-eye"></i> Quick View
                </button>
                <button @click="toggleCompare(product)" class="btn btn-sm rounded-pill" :class="isInCompare(product.id) ? 'btn-primary' : 'btn-outline-primary'">
                  <i class="fa" :class="isInCompare(product.id) ? 'fa-columns' : 'fa-columns'"></i>
                  {{ isInCompare(product.id) ? 'Dalam Perbandingan' : 'Bandingkan' }}
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Recently Viewed Products -->
      <div class="row mt-5" v-if="recentlyViewed.length > 0">
        <div class="col-md-12">
          <div class="mb-4">
            <h5 class="text-uppercase"><i class="fa fa-history"></i> BARU SAJA DILIHAT</h5>
            <!-- Solid divider -->
            <hr class="solid">
          </div>
          <div class="row">
            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4" v-for="product in recentlyViewed" :key="product.id">
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
                  <!-- Social Sharing Buttons -->
                  <div class="d-flex justify-content-center mt-2">
                    <a :href="getFacebookShareUrl(product)" target="_blank" class="btn btn-primary btn-sm rounded-circle mr-1" style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-size: 0.7rem;">
                      <i class="fab fa-facebook-f"></i>
                    </a>
                    <a :href="getTwitterShareUrl(product)" target="_blank" class="btn btn-info btn-sm rounded-circle mr-1" style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-size: 0.7rem;">
                      <i class="fab fa-twitter"></i>
                    </a>
                    <a :href="getWhatsAppShareUrl(product)" target="_blank" class="btn btn-success btn-sm rounded-circle" style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-size: 0.7rem;">
                      <i class="fab fa-whatsapp"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End Recently Viewed Products -->

      <!-- pagination -->
      <div class="row justify-content-center mt-4 mb-4">
          <div class="text-center">
              <b-pagination align="center" :value="products.current_page" :total-rows="products.total"
                  :per-page="products.per_page" @change="changePage" aria-controls="my-table" class="mt-4"></b-pagination>
          </div>
      </div>
      
      <!-- Quick View Modal -->
      <b-modal v-model="quickViewModal" size="lg" hide-footer>
        <template #modal-title>
          <h5 class="font-weight-bold">{{ selectedProduct.title }}</h5>
        </template>
        <div class="row" v-if="selectedProduct">
          <div class="col-md-5">
            <img :src="selectedProduct.image" class="img-fluid rounded" :alt="selectedProduct.title" style="width: 100%; height: 300px; object-fit: cover;">
          </div>
          <div class="col-md-7">
            <div class="d-flex align-items-center mb-2">
              <span class="badge badge-danger mr-2">{{ selectedProduct.discount }}% OFF</span>
              <s class="text-muted">Rp. {{ formatPrice(selectedProduct.price) }}</s>
            </div>
            <h4 class="mb-3 font-weight-bold text-success">Rp. {{ formatPrice(calculateDiscount(selectedProduct)) }}</h4>
            
            <div class="mb-3">
              <client-only>
                <vue-star-rating class="mb-2" :rating="parseFloat(selectedProduct.reviews_avg_rating)" :increment="0.5" :star-size="16" :read-only="true" :show-rating="false"></vue-star-rating>
                <span class="small text-muted">({{ selectedProduct.reviews_count }} reviews)</span>
              </client-only>
            </div>
            
            <p class="text-muted mb-3" v-html="selectedProduct.description.substring(0, 150) + '...'"></p>
            
            <div class="d-grid gap-2">
              <button @click="addToCart(selectedProduct.id, calculateDiscount(selectedProduct), selectedProduct.weight)" class="btn btn-warning rounded-pill py-2">
                <i class="fa fa-shopping-cart mr-2"></i>Tambah ke Keranjang
              </button>
              <nuxt-link :to="{name: 'products-slug', params: {slug: selectedProduct.slug}}" class="btn btn-outline-primary rounded-pill py-2">
                <i class="fa fa-info-circle mr-2"></i>Lihat Detail
              </nuxt-link>
            </div>
          </div>
        </div>
      </b-modal>
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
          content: 'Products - MI STORE - Distributor Xiaomi Indonesia Resmi',
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: '/images/logo.png'
        },
        {
          hid: 'description',
          name: 'description',
          content: 'Jual Produk Original Xiaomi Indonesia Bergaransi Resmi',
        },
      ]
    }
  },

  //hook "asyncData"
  async asyncData({ store }) {
    // Get products
    await store.dispatch('web/product/getProductsData')
    
    // Initialize compare
    await store.dispatch('web/compare/getComparedProductsData')
    
    // Initialize recently viewed
    await store.dispatch('web/recentlyViewed/getRecentlyViewed')
    
    // Get categories for filter
    await store.dispatch('web/category/getCategoriesData')
  },

  //data function
  data() {
    return {
      quickViewModal: false,
      selectedProduct: {},
      filters: {
        category: '',
        maxPrice: ''
      },
      sortBy: ''
    }
  },

  //computed
  computed: {
    //products
    products() {
      return this.$store.state.web.product.products
    },
    
    //categories
    categories() {
      return this.$store.state.web.category.categories
    },
    
    //compared products
    comparedProducts() {
      return this.$store.state.web.compare.comparedProducts
    },
    
    // recently viewed products
    recentlyViewed() {
      return this.$store.state.web.recentlyViewed.recentlyViewed
    },
    
    // Facebook share URL for a product
    getFacebookShareUrl() {
      return (product) => {
        const productUrl = `${window.location.origin}/products/${product.slug}`;
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`
      }
    },
    
    // Twitter share URL for a product
    getTwitterShareUrl() {
      return (product) => {
        const productUrl = `${window.location.origin}/products/${product.slug}`;
        return `https://twitter.com/intent/tweet?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(product.title)}`
      }
    },
    
    // WhatsApp share URL for a product
    getWhatsAppShareUrl() {
      return (product) => {
        const productUrl = `${window.location.origin}/products/${product.slug}`;
        return `https://wa.me/?text=${encodeURIComponent(productUrl)}`
      }
    }
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
    
    // format price
    formatPrice(value) {
      let val = (value/1).toFixed(0).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    
    // calculate discount
    calculateDiscount(product) {
      return product.price - (product.price * product.discount / 100)
    },
    
    // open quick view modal
    openQuickView(product) {
      this.selectedProduct = product
      this.quickViewModal = true
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
    
    // apply filters
    applyFilters() {
      // Reset to first page
      this.$store.commit('web/product/SET_PAGE', 1)
      
      // Set filters in store
      this.$store.commit('web/product/SET_FILTERS', {
        category: this.filters.category,
        maxPrice: this.filters.maxPrice
      })
      
      // Fetch filtered products
      this.$store.dispatch('web/product/getProductsData')
    },
    
    // apply sorting
    applySorting() {
      // Reset to first page
      this.$store.commit('web/product/SET_PAGE', 1)
      
      // Set sort in store
      this.$store.commit('web/product/SET_SORT_BY', this.sortBy)
      
      // Fetch sorted products
      this.$store.dispatch('web/product/getProductsData')
    },
    
    // clear filters
    clearFilters() {
      // Reset filters
      this.filters = {
        category: '',
        maxPrice: ''
      }
      
      // Reset sort
      this.sortBy = ''
      
      // Reset store filters and sort
      this.$store.commit('web/product/SET_FILTERS', {
        category: '',
        maxPrice: ''
      })
      this.$store.commit('web/product/SET_SORT_BY', '')
      
      // Reset to first page
      this.$store.commit('web/product/SET_PAGE', 1)
      
      // Fetch all products
      this.$store.dispatch('web/product/getProductsData')
    }
  }
}
</script>

<style>

</style>