<template>
  <div class="fade-in">
    <div class="text-center mb-4">
      <nuxt-link to="/" class="text-black text-decoration-none">
        <img src="/images/logo.png" width="60" class="mb-3">
        <h3 class="font-weight-bold">MI STORE</h3>
        <p class="text-muted">Administrator Panel</p>
      </nuxt-link>
    </div>
    <div class="card-group">
      <div class="card border-top-orange border-0 shadow-sm rounded">
        <div class="card-body p-4">
          <div class="text-center mb-4">
            <h1 class="font-weight-bold">Login Admin</h1>
            <p class="text-muted">Masuk ke panel administrator</p>
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
                <input class="form-control rounded-right border-left-0" v-model="user.email" :class="{ 'is-invalid': validation.email }" type="email" placeholder="Alamat Email Admin">
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
                <input class="form-control rounded-right border-left-0" v-model="user.password" :class="{ 'is-invalid': validation.password }" type="password" placeholder="Kata Sandi Admin">
              </div>
              <div v-if="validation.password" class="mt-2">
                <b-alert show variant="danger" class="rounded-pill px-3 py-2 mb-0">{{ validation.password[0] }}</b-alert>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <button class="btn btn-warning btn-lg w-100 rounded-pill py-2 transition-medium" type="submit">
                  <i class="fa fa-sign-in-alt mr-2"></i>LOGIN ADMIN
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

    //middleware
    middleware: 'authenticated',

    //layout
    layout: 'auth',

    //meta
    head() {
      return {
        title: 'Login - Administrator',
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
        
        await this.$auth.loginWith('admin', {
            data: {
              email: this.user.email,
              password: this.user.password
            }
          })

          .then(() => {

            //redirect
            this.$router.push({
              name: 'admin-dashboard'
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