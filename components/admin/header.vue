<template>
  <header class="c-header c-header-light c-header-fixed c-header-with-subheader">
    <!-- Sidebar toggler (mobile) -->
    <button
      class="c-header-toggler c-class-toggler d-lg-none mfe-auto"
      type="button"
      data-target="#sidebar"
      data-class="c-sidebar-show"
    >
      <svg class="c-icon c-icon-lg">
        <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-menu"></use>
      </svg>
    </button>

    <!-- Sidebar toggler (desktop) -->
    <button
      class="c-header-toggler c-class-toggler mfs-3 d-md-down-none"
      type="button"
      data-target="#sidebar"
      data-class="c-sidebar-lg-show"
    >
      <svg class="c-icon c-icon-lg">
        <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-menu"></use>
      </svg>
    </button>

    <!-- Right side menu -->
    <ul class="c-header-nav ml-auto mr-4">
      <li class="c-header-nav-item dropdown">
        <a
          class="c-header-nav-link"
          data-toggle="dropdown"
          href="#"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <div class="c-avatar">
            <img
              class="c-avatar-img"
              :src="userAvatar"
              :alt="user.name"
            />
          </div>
        </a>

        <div class="dropdown-menu dropdown-menu-right pt-0">
          <!-- Quick Menu -->
          <div class="dropdown-header bg-light py-2 rounded">
            <strong>QUICK MENU</strong>
          </div>

          <DropdownItem to="admin-categories" icon="cil-folder" label="Categories" />
          <DropdownItem to="admin-products" icon="cil-layers" label="Products" />
          <DropdownItem to="admin-customers" icon="cil-user" label="Customers" />

          <div class="dropdown-divider"></div>

          <div class="dropdown-header bg-light py-2 rounded">
            <strong>ORDERS</strong>
          </div>

          <DropdownItem to="admin-invoices" icon="cil-cart" label="Invoices" />

          <div class="dropdown-divider"></div>

          <a class="dropdown-item" role="button" @click="logout">
            <svg class="c-icon mr-2">
              <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-account-logout"></use>
            </svg>
            Logout
          </a>
        </div>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$auth.user || {};
    },
    userAvatar() {
      const name = encodeURIComponent(this.user.name || "User");
      return `https://ui-avatars.com/api/?name=${name}&background=4e73df&color=ffffff&size=100`;
    },
  },
  methods: {
    async logout() {
      try {
        await this.$auth.logout();
        this.$router.push({ name: "admin-login" });
      } catch (error) {
        console.error("Logout failed:", error);
      }
    },
  },
  components: {
    DropdownItem: {
      props: ["to", "icon", "label"],
      template: `
        <nuxt-link :to="{ name: to }" class="dropdown-item">
          <svg class="c-icon mr-2">
            <use :xlink:href="'@/node_modules/@coreui/icons/sprites/free.svg#' + icon"></use>
          </svg>
          {{ label }}
        </nuxt-link>
      `,
    },
  },
};
</script>

<style scoped>
.c-avatar-img {
  border-radius: 50%;
  object-fit: cover;
}

.dropdown-item {
  transition: background 0.2s ease;
}

.dropdown-item:hover {
  background: rgba(0, 0, 0, 0.05);
}
</style>
