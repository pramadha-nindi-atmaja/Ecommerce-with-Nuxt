<template>
  <div class="card border-0 rounded shadow-sm border-top-orange">
    <div class="card-body">
      <h5><i class="fa fa-user-circle"></i> ACCOUNT MENU</h5>
      <hr>
      <ul class="list-group">
        <nuxt-link :to="{name: 'customer-dashboard'}"
          class="list-group-item text-decoration-none text-dark">
          <i class="fa fa-tachometer-alt"></i> Dashboard
        </nuxt-link>

        <nuxt-link :to="{name: 'customer-invoices'}" class="list-group-item text-decoration-none text-dark">
          <i class="fa fa-shopping-cart"></i> My Orders
        </nuxt-link>

        <nuxt-link to="/customer/profile" class="list-group-item text-decoration-none text-dark" v-if="false">
          <i class="fa fa-user"></i> Profile
        </nuxt-link>

        <nuxt-link to="/customer/wishlist" class="list-group-item text-decoration-none text-dark" v-if="false">
          <i class="fa fa-heart"></i> Wishlist
          <span class="badge badge-danger float-right" v-if="wishlistCount > 0">{{ wishlistCount }}</span>
        </nuxt-link>

        <nuxt-link to="/customer/reviews" class="list-group-item text-decoration-none text-dark" v-if="false">
          <i class="fa fa-star"></i> My Reviews
        </nuxt-link>

        <a @click="logout" class="list-group-item text-decoration-none text-dark"
          style="cursor: pointer;">
          <i class="fa fa-sign-out-alt"></i> Logout
        </a>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    //computed
    computed: {
      //wishlist count (placeholder)
      wishlistCount() {
        return 0; // This would be connected to a wishlist store if implemented
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
    padding: 12px 15px;
    transition: all 0.3s ease;
  }
  
  .list-group-item:hover {
    background: rgba(0, 0, 0, 0.05);
  }
  
  .list-group-item i {
    width: 20px;
    margin-right: 10px;
  }
  
  .badge {
    font-size: 0.7rem;
  }
  
  h5 {
    font-weight: 600;
    color: #333;
  }
</style>