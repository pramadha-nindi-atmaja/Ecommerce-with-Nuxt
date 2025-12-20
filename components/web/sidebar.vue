<template>
  <div class="card border-0 rounded shadow-sm border-top-orange">
    <div class="card-body p-0">
      <div class="p-4 border-bottom">
        <h5 class="font-weight-bold mb-0"><i class="fa fa-user-circle mr-2"></i>ACCOUNT MENU</h5>
      </div>
      <ul class="list-group list-group-flush">
        <nuxt-link :to="{name: 'customer-dashboard'}"
          class="list-group-item text-decoration-none text-dark d-flex align-items-center px-4 py-3">
          <i class="fa fa-tachometer-alt mr-3"></i> Dashboard
        </nuxt-link>

        <nuxt-link :to="{name: 'customer-invoices'}" class="list-group-item text-decoration-none text-dark d-flex align-items-center px-4 py-3">
          <i class="fa fa-shopping-cart mr-3"></i> My Orders
        </nuxt-link>
        
        <nuxt-link :to="{name: 'customer-tracking'}" class="list-group-item text-decoration-none text-dark d-flex align-items-center px-4 py-3">
          <i class="fa fa-truck mr-3"></i> Lacak Pesanan
        </nuxt-link>

        <nuxt-link to="/customer/profile" class="list-group-item text-decoration-none text-dark d-flex align-items-center px-4 py-3" v-if="false">
          <i class="fa fa-user mr-3"></i> Profile
        </nuxt-link>

        <nuxt-link :to="{name: 'customer-wishlist'}" class="list-group-item text-decoration-none text-dark d-flex align-items-center px-4 py-3">
          <i class="fa fa-heart mr-3"></i> Wishlist
          <span class="badge badge-danger ml-auto" v-if="wishlistCount > 0">{{ wishlistCount }}</span>
        </nuxt-link>
        
        <nuxt-link :to="{name: 'customer-discounts'}" class="list-group-item text-decoration-none text-dark d-flex align-items-center px-4 py-3">
          <i class="fa fa-ticket-alt mr-3"></i> Kode Diskon
        </nuxt-link>

        <nuxt-link to="/customer/reviews" class="list-group-item text-decoration-none text-dark d-flex align-items-center px-4 py-3" v-if="false">
          <i class="fa fa-star mr-3"></i> My Reviews
        </nuxt-link>

        <a @click="logout" class="list-group-item text-decoration-none text-dark d-flex align-items-center px-4 py-3"
          style="cursor: pointer;">
          <i class="fa fa-sign-out-alt mr-3"></i> Logout
        </a>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    //hook "fetch"
    async fetch() {
      // initialize wishlist
      await this.$store.dispatch('web/wishlist/getWishlistData')
    },
    
    //computed
    computed: {
      //wishlist count
      wishlistCount() {
        return this.$store.state.web.wishlist.wishlistCount;
      }
    },

    //method
    methods: {
      //method "logout"
      async logout() {
        // Show confirmation dialog
        this.$swal.fire({
          title: 'Konfirmasi Logout',
          text: 'Apakah Anda yakin ingin keluar?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#e64a19',
          cancelButtonColor: '#6c757d',
          confirmButtonText: 'Ya, Logout',
          cancelButtonText: 'Batal'
        }).then(async (result) => {
          if (result.isConfirmed) {
            //logout auth
            await this.$auth.logout()

            //set state
            this.$store.commit('web/cart/SET_CARTS_DATA', [])
            this.$store.commit('web/cart/SET_CART_PRICE', 0)

            //redirect route customer login
            this.$router.push({
              name: 'customer-login'
            })

            // Show success message
            this.$swal.fire({
              title: 'Berhasil!',
              text: 'Anda telah berhasil logout.',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
  a.nuxt-link-active {
    background: rgba(230, 74, 25, 0.1) !important;
    border-left: 3px solid #e64a19;
  }
  
  .list-group-item {
    border: none;
    transition: all 0.3s ease;
    position: relative;
  }
  
  .list-group-item:hover {
    background: rgba(0, 0, 0, 0.05);
  }
  
  .list-group-item:hover:not(.nuxt-link-active)::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 3px;
    background: rgba(230, 74, 25, 0.3);
  }
  
  .badge {
    font-size: 0.7rem;
  }
  
  h5 {
    font-weight: 600;
    color: #333;
  }
  
  .border-bottom {
    border-bottom: 1px solid rgba(0,0,0,0.1) !important;
  }
</style>