<template>
  <header class="section-header fixed-top header-main">
    <section class="header-top py-2">
      <div class="container-fluid">
        <div class="row align-items-center">
          <div class="col-lg-3 col-sm-4 col-md-4 col-5"> 
              <nuxt-link to="/" class="brand-wrap d-flex align-items-center" data-abc="true">
                <img src="/images/xiaomi.png" width="35" class="bg-white p-2 rounded shadow-sm">
                <span class="logo ml-2 font-weight-bold">MI STORE</span>
              </nuxt-link>
          </div>
          <div class="col-lg-4 col-xl-5 col-sm-8 col-md-4 d-none d-md-block">
            <div class="search-wrap">
              <div class="input-group w-100"> 
                <input type="text" class="form-control search-form rounded-left" v-model="search" @keypress.enter="searchData" placeholder="Cari produk...">
                <div class="input-group-append"> 
                  <button @click="searchData" class="btn btn-warning search-button rounded-right"> <i class="fa fa-search"></i> </button> 
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-5 col-xl-4 col-sm-8 col-md-4 col-7">
            <div class="d-flex justify-content-end align-items-center">
              <!-- Language Switcher -->
              <div class="dropdown mr-3 d-none d-md-block">
                <button class="btn btn-light btn-sm dropdown-toggle rounded-pill px-3" type="button" id="languageDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="fa fa-globe"></i> {{ currentLanguage.name }}
                </button>
                <div class="dropdown-menu" aria-labelledby="languageDropdown">
                  <a class="dropdown-item" href="#" @click.prevent="changeLanguage('id')" :class="{ active: lang === 'id' }">
                    🇮🇩 Indonesia
                  </a>
                  <a class="dropdown-item" href="#" @click.prevent="changeLanguage('en')" :class="{ active: lang === 'en' }">
                    🇺🇸 English
                  </a>
                </div>
              </div>
              
              <!-- Compare -->
              <nuxt-link :to="{name: 'compare'}" class="btn btn-info btn-md d-md-block mr-2 rounded-pill px-3" v-if="$auth.loggedIn && $auth.strategy.name == 'customer'">
                <i class="fa fa-columns"></i> 
                <span class="ml-1 badge badge-light">{{ compareCount }}</span>
              </nuxt-link>
              
              <!-- Wishlist -->
              <nuxt-link :to="{name: 'customer-wishlist'}" class="btn btn-warning btn-md d-md-block mr-2 rounded-pill px-3" v-if="$auth.loggedIn && $auth.strategy.name == 'customer'">
                <i class="fa fa-heart"></i> 
                <span class="ml-1 badge badge-light">{{ wishlistCount }}</span>
              </nuxt-link>
              
              <!-- Cart -->
              <nuxt-link :to="{name: 'cart'}" class="btn btn-warning btn-md d-md-block rounded-pill px-3">
                <i class="fa fa-shopping-cart"></i> 
                <span class="ml-1 badge badge-light">{{ cartTotal }}</span>
              </nuxt-link>            </div>
          </div>
        </div>
      </div>
    </section>
    <nav class="navbar navbar-expand-md navbar-main p-0">
      <div class="container-fluid">
        <div class="d-md-none my-2 px-3 w-100">
          <div class="input-group"> 
            <input type="search" name="search" class="form-control rounded-left" v-model="search" @keypress.enter="searchData" placeholder="Cari produk...">
            <div class="input-group-append"> 
              <button @click="searchData" class="btn btn-warning rounded-right"> <i class="fa fa-search"></i></button> 
            </div>
          </div>
        </div> 
        <button class="navbar-toggler collapsed mx-3" type="button" data-toggle="collapse" data-target="#dropdown6"
          aria-expanded="false"> 
          <span class="navbar-toggler-icon"></span> 
        </button>
        <div class="navbar-collapse collapse" id="dropdown6">
          <ul class="navbar-nav mr-auto px-3">
            <li class="nav-item dropdown"> 
              <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown"
                data-abc="true" aria-expanded="false"><i class="fa fa-list-ul"></i> KATEGORI</a>
              <div class="dropdown-menu">
                <nuxt-link :to="{name: 'categories-slug', params: {slug: category.slug}}" class="dropdown-item" v-for="category in categories" :key="category.id">
                  <img :src="category.image" width="50" class="mr-2"> {{ category.name }}
                </nuxt-link>
                <div class="dropdown-divider"></div>
                <nuxt-link :to="{name: 'categories'}" class="dropdown-item active text-center" href="" data-abc="true">
                  LIHAT SEMUA KATEGORI <i class="fa fa-long-arrow-alt-right"></i>
                </nuxt-link>
              </div>
            </li>
            <li class="nav-item"> <nuxt-link :to="{name: 'products'}" class="nav-link" data-abc="true"><i class="fa fa-shopping-bag"></i> SEMUA PRODUK</nuxt-link> </li>
            <li class="nav-item"> <nuxt-link :to="{name: 'about'}" class="nav-link" data-abc="true"><i class="fa fa-info-circle"></i> TENTANG</nuxt-link> </li>
            <li class="nav-item"> <nuxt-link :to="{name: 'contact'}" class="nav-link" data-abc="true"><i class="fa fa-comments"></i> KONTAK</nuxt-link> </li>
            <li class="nav-item"> <nuxt-link :to="{name: 'faq'}" class="nav-link" data-abc="true"><i class="fa fa-question-circle"></i> FAQ</nuxt-link> </li>
          </ul>
          <ul class="navbar-nav ml-auto px-3">
            <!-- Language Switcher Mobile -->
            <li class="nav-item dropdown d-md-none">
              <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-expanded="false">
                <i class="fa fa-globe"></i> {{ currentLanguage.name }}
              </a>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#" @click.prevent="changeLanguage('id')" :class="{ active: lang === 'id' }">
                  🇮🇩 Indonesia
                </a>
                <a class="dropdown-item" href="#" @click.prevent="changeLanguage('en')" :class="{ active: lang === 'en' }">
                  🇺🇸 English
                </a>
              </div>
            </li>
            
            <li class="nav-item dropdown" v-if="!$auth.loggedIn">
              <nuxt-link :to="{name: 'customer-login'}" class="nav-link" href="#" role="button" aria-expanded="false"> <i class="fa fa-user-circle"></i>
                AKUN</nuxt-link>
            </li>
            <li class="nav-item dropdown" v-if="$auth.loggedIn">
              <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                <i class="fa fa-user-circle"></i> {{ $auth.user.name }}
              </a>
              <div class="dropdown-menu dropdown-menu-right">
                <nuxt-link :to="{name: 'customer-dashboard'}" class="dropdown-item">
                  <i class="fa fa-tachometer-alt"></i> Dashboard
                </nuxt-link>
                <nuxt-link :to="{name: 'customer-invoices'}" class="dropdown-item">
                  <i class="fa fa-shopping-bag"></i> Pesanan Saya
                </nuxt-link>
                <nuxt-link :to="{name: 'customer-dashboard'}" class="dropdown-item">
                  <i class="fa fa-user"></i> Profil Saya
                </nuxt-link>
                <nuxt-link :to="{name: 'compare'}" class="dropdown-item">
                  <i class="fa fa-columns"></i> Bandingkan Produk
                </nuxt-link>
                <div class="dropdown-divider"></div>
                <a href="#" class="dropdown-item" @click.prevent="logout">
                  <i class="fa fa-sign-out-alt"></i> Keluar
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
  export default {
    //hook "fetch"
    async fetch() {
      //fething sliders on Rest API
      await this.$store.dispatch('web/category/getCategoriesData')

      if(this.$auth.loggedIn && this.$auth.strategy.name == 'customer') {
        //fething carts on Rest API
        await this.$store.dispatch('web/cart/getCartsData')
        await this.$store.dispatch('web/cart/getCartPrice')
        
        // fetching wishlist data
        await this.$store.dispatch('web/wishlist/getWishlistData')
        
        // fetching compare data
        await this.$store.dispatch('web/compare/getComparedProductsData')
      }
    },

    //computed
    computed: {
      //categories
      categories() {
        return this.$store.state.web.category.categories
      },

      //cartPrice
      cartPrice() {
        return this.$store.state.web.cart.cartPrice
      },

      //cartTotal
      cartTotal() {
        return this.$store.state.web.cart.carts.length
      },
      
      //wishlist count
      wishlistCount() {
        return this.$store.state.web.wishlist.wishlistCount
      },
      
      //compare count
      compareCount() {
        return this.$store.state.web.compare.comparedProducts.length
      },
      
      //current language
      currentLanguage() {
        return this.languages.find(lang => lang.code === this.lang) || this.languages[0]
      }
    },

    //data function
    data() {
      return {
        //state search
        search: '',
        
        //state for language
        lang: 'id',
        
        //available languages
        languages: [
          { code: 'id', name: 'ID' },
          { code: 'en', name: 'EN' }
        ]
      }
    },

    //method
    methods: {
      searchData() {
        if (!this.search.trim()) return;
        
        this.$router.push({
          name: 'search',
          query: {
            q: this.search
          }
        });
      },
      
      logout() {
        this.$auth.logout();
        this.$router.push('/');
      },
      
      changeLanguage(langCode) {
        this.lang = langCode;
        this.$i18n.locale = langCode;
        localStorage.setItem('user-language', langCode);
        
        // Show confirmation message
        this.$swal.fire({
          icon: 'success',
          title: 'Bahasa Berubah',
          text: `Bahasa telah diubah ke ${langCode === 'id' ? 'Indonesia' : 'English'}`,
          timer: 1500,
          showConfirmButton: false
        });
      }
    },
    
    mounted() {
      // Retrieve language preference from localStorage if it exists
      const savedLang = localStorage.getItem('user-language');
      if (savedLang) {
        this.lang = savedLang;
        this.$i18n.locale = savedLang;
      }
    }
  }
</script>

<style scoped>
  .btn {
    font-size: initial;
  }
  
  .nav-item .dropdown-menu {
    min-width: 200px;
  }
  
  .dropdown-item i {
    width: 20px;
    margin-right: 5px;
  }
  
  .logo {
    font-weight: bold;
    font-size: 1.2rem;
  }
  
  .brand-wrap {
    text-decoration: none;
    color: inherit;
  }
  
  .dropdown-toggle::after {
    vertical-align: 0.155em;
  }
  
  .header-top {
    background: linear-gradient(135deg, #e64a19, #c0392b);
  }
  
  .navbar-main {
    background: white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  @media (max-width: 768px) {
    .navbar-toggler {
      border: none;
      outline: none;
    }
    
    .navbar-toggler-icon {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%280, 0, 0, 0.5%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
    }
  }
</style>