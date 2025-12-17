<template>
  <div class="container mt-custom mb-3">
    <div class="fade-in">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <div class="card-group">
          <div class="card border-top-orange border-0 shadow-sm rounded">
            <div class="card-body p-4">
              <div class="text-center mb-4">
                <h3 class="font-weight-bold">LOGIN</h3>
                <p class="text-muted">Masuk ke akun Anda</p>
              </div>
              <div v-if="validation.message" class="mt-2">
                <b-alert show variant="danger" class="rounded-pill px-3 py-2 mb-3">{{ validation.message }}</b-alert>
              </div>
              <form @submit.prevent="login">
                <div class="form-group mb-3">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text rounded-left bg-light border-0">
                        <i class="fa fa-envelope text-muted"></i>
                      </span>
                    </div>
                    <input class="form-control rounded-right border-left-0" v-model="user.email" type="email" placeholder="Alamat Email">
                  </div>
                  <div v-if="validation.email" class="mt-2">
                    <b-alert show variant="danger" class="rounded-pill px-3 py-2 mb-0">{{ validation.email[0] }}</b-alert>
                  </div>
                </div>
                <div class="form-group mb-4">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text rounded-left bg-light border-0">
                        <i class="fa fa-lock text-muted"></i>
                      </span>
                    </div>
                    <input class="form-control rounded-right border-left-0" v-model="user.password" type="password" placeholder="Kata Sandi">
                  </div>
                  <div v-if="validation.password" class="mt-2">
                    <b-alert show variant="danger" class="rounded-pill px-3 py-2 mb-0">{{ validation.password[0] }}</b-alert>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <button class="btn btn-warning btn-lg w-100 rounded-pill py-2 transition-medium" type="submit">
                      <i class="fa fa-sign-in-alt mr-2"></i>LOGIN
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center mt-4">
      <p class="text-muted mb-2">Belum punya akun?</p>
      <nuxt-link :to="{name: 'customer-register'}" class="btn btn-outline-warning rounded-pill px-4 py-2">
        <i class="fa fa-user-plus mr-2"></i>Daftar Sekarang
      </nuxt-link>
    </div>
    </div>
  </div>
</template>

<script>
  export default {

    //middleware
    middleware: 'authenticated',

    //layout
    layout: 'default',

    //meta
    head() {
      return {
        title: 'Login - Customer',
      }
    },

    data() {
      return {
        //state user
        user: {
          email: '',
          password: '',
        },
        //validation
        validation: []
      }
    },

    methods: {
      async login() {

        await this.$auth.loginWith('customer', {
            data: {
              email: this.user.email,
              password: this.user.password
            }
          })

          .then(() => {

            //fething carts on Rest API
            this.$store.dispatch('web/cart/getCartsData')
            this.$store.dispatch('web/cart/getCartPrice')

            //redirect
            this.$router.push({
              name: 'customer-dashboard'
            })

          })

          .catch(error => {
            //assign validation
            this.validation = error.response.data
          })
      }

    }

  }
</script>

<style>

</style>