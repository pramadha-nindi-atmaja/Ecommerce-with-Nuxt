<template>
  <ul class="c-sidebar-nav">
    <!-- Dashboard -->
    <SidebarItem 
      to="admin-dashboard" 
      icon="cil-speedometer" 
      label="Dashboard" 
    />

    <!-- Master Data -->
    <SidebarTitle label="MASTER DATA" />
    <SidebarItem to="admin-categories" icon="cil-folder" label="Categories" />
    <SidebarItem to="admin-products" icon="cil-layers" label="Products" />

    <!-- Orders -->
    <SidebarTitle label="ORDERS" />
    <SidebarItem to="admin-invoices" icon="cil-cart" label="Invoices" />
    <SidebarItem to="admin-reports" icon="cil-chart-pie" label="Reports" />

    <!-- Others -->
    <SidebarTitle label="OTHERS" />
    <SidebarItem to="admin-customers" icon="cil-user" label="Customers" />
    <SidebarItem to="admin-sliders" icon="cil-laptop" label="Sliders" />
    <SidebarItem to="admin-users" icon="cil-group" label="Users" />
    <SidebarItem to="admin-settings" icon="cil-settings" label="Settings" />

    <li class="c-sidebar-nav-divider"></li>

    <!-- Logout -->
    <li class="c-sidebar-nav-item">
      <a @click.prevent="logout" class="c-sidebar-nav-link">
        <svg class="c-sidebar-nav-icon">
          <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-account-logout"></use>
        </svg>
        Logout
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  methods: {
    async logout() {
      try {
        await this.$store.dispatch('auth/logout')
        this.$router.push({ name: 'login' })
      } catch (error) {
        console.error('Logout failed:', error)
      }
    }
  },
  components: {
    SidebarItem: {
      props: ['to', 'icon', 'label'],
      template: `
        <li class="c-sidebar-nav-item">
          <nuxt-link :to="{ name: to }" class="c-sidebar-nav-link">
            <svg class="c-sidebar-nav-icon">
              <use :xlink:href="'@/node_modules/@coreui/icons/sprites/free.svg#' + icon"></use>
            </svg>
            {{ label }}
          </nuxt-link>
        </li>
      `
    },
    SidebarTitle: {
      props: ['label'],
      template: `<li class="c-sidebar-nav-title">{{ label }}</li>`
    }
  }
}
</script>

<style scoped>
a.nuxt-link-active {
  background: rgba(255, 255, 255, 0.05) !important;
}

.c-sidebar-nav-link {
  cursor: pointer;
  transition: background 0.3s ease;
}

.c-sidebar-nav-link:hover {
  background: rgba(255, 255, 255, 0.03) !important;
}
</style>
