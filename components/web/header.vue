<template>
  <header class="section-header fixed-top">
    <section class="header-main border-bottom">
      <div class="container-fluid">
        <div class="row align-items-center">
          <div class="col-lg-3 col-sm-4 col-md-4 col-5"> 
              <nuxt-link to="/" class="brand-wrap" data-abc="true">
                <img src="/images/xiaomi.png" width="35" class="bg-light p-2 rounded">
                <span class="logo">MI STORE</span>
              </nuxt-link>
          </div>
          <div class="col-lg-4 col-xl-5 col-sm-8 col-md-4 d-none d-md-block">
            <div class="search-wrap">
              <div class="input-group w-100"> 
                <input type="text" class="form-control search-form" v-model="search" @keypress.enter="searchData" style="width:55%;" placeholder="mau belanja apa hari ini ?">
                <div class="input-group-append"> 
                  <button @click="searchData" class="btn btn-primary search-button"> <i class="fa fa-search"></i> </button> 
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-5 col-xl-4 col-sm-8 col-md-4 col-7">
            <div class="d-flex justify-content-end">
              <nuxt-link :to="{name: 'wishlist'}" class="btn btn-light btn-md d-md-block mr-2" v-if="$auth.loggedIn">
                <i class="fa fa-heart"></i>
                <span class="badge badge-danger" v-if="wishlistCount > 0">{{ wishlistCount }}</span>
              </nuxt-link>
              <nuxt-link :to="{name: 'cart'}" class="btn search-button btn-md d-md-block ml-4">
                <i class="fa fa-shopping-cart"></i> 
                <span class="ml-2">{{ cartTotal }}</span> | Rp. {{ formatPrice(cartPrice) }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <nav class="navbar navbar-expand-md navbar-main border-bottom p-2">
      <div class="container-fluid">
        <div class="d-md-none my-2">
          <div class="input-group"> 
            <input type="search" name="search" class="form-control" v-model="search" @keypress.enter="searchData" placeholder="mau belanja apa hari ini ?">
            <div class="input-group-append"> 
              <button @click="searchData" class="btn btn-warning"> <i class="fa fa-search"></i></button> 
            </div>
          </div>
        </div> 
        <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#dropdown6"
          aria-expanded="false"> <span class="navbar-toggler-icon"></span> </button>
        <div class="navbar-collapse collapse" id="dropdown6">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown"
                data-abc="true" aria-expanded="false"><i class="fa fa-list-ul"></i> KATEGORI</a>
              <div class="dropdown-menu">
                <nuxt-link :to="{name: 'categories-slug', params: {slug: category.slug}}" class="dropdown-item" v-for="category in categories" :key="category.id">
                  <img :src="category.image" width="50"> {{ category.name }}
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
          <ul class="navbar-nav ml-auto">
            <li class="nav-item dropdown" v-if="!$auth.loggedIn">
              <nuxt-link :to="{name: 'customer-login'}" class="nav-link" href="#" role="button" aria-expanded="false"> <i class="fa fa-user-circle"></i>
                ACCOUNT</nuxt-link>
            </li>
            <li class="nav-item dropdown" v-if="$auth.loggedIn">
              <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                <i class="fa fa-user-circle"></i> {{ $auth.user.name }}
              </a>
              <div class="dropdown-menu dropdown-menu-right">
                <nuxt-link :to="{name: 'customer-dashboard'}" class="dropdown-item">
                  <i class="fa fa-tachometer-alt"></i> Dashboard
                </nuxt-link>
                <nuxt-link :to="{name: 'customer-orders'}" class="dropdown-item">
                  <i class="fa fa-shopping-bag"></i> Pesanan Saya
                </nuxt-link>
                <nuxt-link :to="{name: 'customer-profile'}" class="dropdown-item">
                  <i class="fa fa-user"></i> Profil Saya
                </nuxt-link>
                <div class="dropdown-divider"></div>
                <a href="#" class="dropdown-item" @click.prevent="logout">
                  <i class="fa fa-sign-out-alt"></i> Logout
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
        
        //fetching wishlist data
        await this.$store.dispatch('web/wishlist/getWishlistData')
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
      
      //wishlistCount
      wishlistCount() {
        return this.$store.state.web.wishlist ? this.$store.state.web.wishlist.items.length : 0
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
          { code: 'id', name: 'Indonesia' },
          { code: 'en', name: 'English' }
        ]
      }
    },

    //method
    methods: {
      searchData() {
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
  
  .badge {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(25%, -25%);
  }
  
  .nav-item .dropdown-menu {
    min-width: 200px;
  }
  
  .dropdown-item i {
    width: 20px;
    margin-right: 5px;
  }
</style>