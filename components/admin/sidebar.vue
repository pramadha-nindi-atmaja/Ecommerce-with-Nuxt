<template>
  <ul class="c-sidebar-nav">

    <li class="c-sidebar-nav-item"><nuxt-link :to="{name: 'admin-dashboard'}" class="c-sidebar-nav-link" href="index.html">
        <svg class="c-sidebar-nav-icon">
          <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-speedometer"></use>
        </svg> Dashboard</nuxt-link></li>

    <li class="c-sidebar-nav-title">MASTER DATA</li>

    <li class="c-sidebar-nav-item"><nuxt-link :to="{name: 'admin-categories'}" class="c-sidebar-nav-link">
        <svg class="c-sidebar-nav-icon">
          <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-folder"></use>
        </svg> Categories</nuxt-link>
    </li>

    <li class="c-sidebar-nav-item"><nuxt-link :to="{name: 'admin-products'}" class="c-sidebar-nav-link">
        <svg class="c-sidebar-nav-icon">
          <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-layers"></use>
        </svg> Products</nuxt-link>
    </li>

    <li class="c-sidebar-nav-title">ORDERS</li>
    
    <li class="c-sidebar-nav-item"><nuxt-link :to="{name: 'admin-invoices'}" class="c-sidebar-nav-link">
        <svg class="c-sidebar-nav-icon">
          <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-cart"></use>
        </svg> Invoices</nuxt-link>
    </li>

    <li class="c-sidebar-nav-item"><nuxt-link :to="{name: 'admin-reports'}" class="c-sidebar-nav-link">
        <svg class="c-sidebar-nav-icon">
          <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-chart-pie"></use>
        </svg> Reports</nuxt-link>
    </li>

    <li class="c-sidebar-nav-title">OTHERS</li>

    <li class="c-sidebar-nav-item"><nuxt-link :to="{name: 'admin-customers'}" class="c-sidebar-nav-link">
        <svg class="c-sidebar-nav-icon">
          <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-user"></use>
        </svg> Customers</nuxt-link>
    </li>

    <li class="c-sidebar-nav-item"><nuxt-link :to="{name: 'admin-sliders'}" class="c-sidebar-nav-link">
        <svg class="c-sidebar-nav-icon">
          <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-laptop"></use>
        </svg> Sliders</nuxt-link>
    </li>

    <li class="c-sidebar-nav-item"><nuxt-link :to="{name: 'admin-users'}" class="c-sidebar-nav-link">
        <svg class="c-sidebar-nav-icon">
          <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-group"></use>
        </svg> Users</nuxt-link>
    </li>

    <li class="c-sidebar-nav-item"><nuxt-link :to="{name: 'admin-settings'}" class="c-sidebar-nav-link">
        <svg class="c-sidebar-nav-icon">
          <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-settings"></use>
        </svg> Settings</nuxt-link>
    </li>

    <li class="c-sidebar-nav-divider"></li>

    <li class="c-sidebar-nav-item">
      <a @click.prevent="logout" class="c-sidebar-nav-link">
        <svg class="c-sidebar-nav-icon">
          <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-account-logout"></use>
        </svg> Logout
      </a>
    </li>
  </ul>
</template>

<script>
  export default {
    methods: {
      logout() {
        // Call your logout action or method here
        this.$store.dispatch('auth/logout')
          .then(() => {
            this.$router.push({ name: 'login' });
          });
      }
    }
  }
</script>

<style scoped>
  a.nuxt-link-active {
    background: rgba(255,255,255,.05)!important;
  }
  
  .c-sidebar-nav-link {
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .c-sidebar-nav-link:hover {
    background: rgba(255,255,255,.03)!important;
  }
</style>