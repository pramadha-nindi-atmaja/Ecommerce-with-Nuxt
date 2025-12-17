<template>
  <div class="container-fluid mt-custom">
    <div class="fade-in">
    <div class="row">
      <div class="col-md-3">
        <!-- sidebar -->
        <Sidebar />
        <!-- end sidebar -->
      </div>
      <div class="col-md-9">
        <div class="card border-0 rounded shadow-sm border-top-orange">
          <div class="card-body">
            <h5 class="font-weight-bold mb-4"><i class="fa fa-tachometer-alt mr-2"></i>DASHBOARD</h5>

            <div class="row">
              <div class="col-md-12">
                <div class="alert alert-success rounded-pill px-4 py-3 mb-4" role="alert">
                  <i class="fa fa-hand-wave mr-2"></i>Selamat Datang <strong>{{ $auth.user.name }}</strong>
                </div>
              </div>
            </div>

            <div class="row">

              <div class="col-xl-3 col-lg-6 col-md-6 mb-4">
                <div class="card rounded shadow-sm overflow-hidden hover-card">
                  <div class="card-body p-0 d-flex align-items-center">
                    <div class="py-4 px-4 bg-primary text-white">
                      <i class="fas fa-circle-notch fa-spin fa-2x"></i>
                    </div>
                    <div class="px-4 py-3">
                      <div class="text-value font-weight-bold h4 mb-1">{{ pending }}</div>
                      <div class="text-muted text-uppercase font-weight-bold small">PENDING</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xl-3 col-lg-6 col-md-6 mb-4">
                <div class="card rounded shadow-sm overflow-hidden hover-card">
                  <div class="card-body p-0 d-flex align-items-center">
                    <div class="py-4 px-4 bg-success text-white">
                      <i class="fas fa-check-circle fa-2x"></i>
                    </div>
                    <div class="px-4 py-3">
                      <div class="text-value font-weight-bold h4 mb-1">{{ success }}</div>
                      <div class="text-muted text-uppercase font-weight-bold small">SUCCESS</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xl-3 col-lg-6 col-md-6 mb-4">
                <div class="card rounded shadow-sm overflow-hidden hover-card">
                  <div class="card-body p-0 d-flex align-items-center">
                    <div class="py-4 px-4 bg-warning text-dark">
                      <i class="fas fa-exclamation-triangle fa-2x"></i>
                    </div>
                    <div class="px-4 py-3">
                      <div class="text-value font-weight-bold h4 mb-1">{{ expired }}</div>
                      <div class="text-muted text-uppercase font-weight-bold small">EXPIRED</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xl-3 col-lg-6 col-md-6 mb-4">
                <div class="card rounded shadow-sm overflow-hidden hover-card">
                  <div class="card-body p-0 d-flex align-items-center">
                    <div class="py-4 px-4 bg-danger text-white">
                      <i class="fas fa-times-circle fa-2x"></i>
                    </div>
                    <div class="px-4 py-3">
                      <div class="text-value font-weight-bold h4 mb-1">{{ failed }}</div>
                      <div class="text-muted text-uppercase font-weight-bold small">FAILED</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  //import sidebar
  import Sidebar from '@/components/web/sidebar.vue'

  export default {

    //middleware
    middleware: 'isCustomer',

    //layout
    layout: 'default',

    //register components
    components: {
      Sidebar
    },

    //meta
    head() {
      return {
        title: 'Dashboard - Customer',
      }
    },

    async asyncData({ $axios }) {

      //fetching dashboard
      const dashboard = await $axios.$get('/api/customer/dashboard')

      return {
        //count statistik
        'pending': dashboard.data.count.pending,
        'success': dashboard.data.count.success,
        'expired': dashboard.data.count.expired,
        'failed': dashboard.data.count.failed,
      }
    },

  }
</script>

<style>

</style>