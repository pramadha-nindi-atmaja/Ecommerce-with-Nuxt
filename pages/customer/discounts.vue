<template>
  <div class="container-fluid mt-custom mb-5">
    <div class="fade-in">
      <div class="row">
        <div class="col-md-4">
          <!-- sidebar -->
          <Sidebar />
        </div>
        <div class="col-md-8">
          <div class="card border-0 rounded shadow-sm">
            <div class="card-body">
              <h4 class="font-weight-bold mb-4"><i class="fa fa-ticket-alt mr-2"></i>Kode Diskon Saya</h4>
              
              <div v-if="unusedDiscountCodes.length > 0">
                <div class="alert alert-info rounded mb-4">
                  <i class="fa fa-info-circle mr-2"></i>
                  Anda memiliki {{ unusedDiscountCodes.length }} kode diskon yang belum digunakan. Gunakan kode diskon ini saat checkout untuk mendapatkan potongan harga.
                </div>
                
                <div class="row">
                  <div class="col-md-6 mb-4" v-for="discountCode in unusedDiscountCodes" :key="discountCode.code">
                    <div class="card border-left-primary shadow-sm h-100">
                      <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                          <div>
                            <h5 class="font-weight-bold text-primary">{{ discountCode.code }}</h5>
                            <p class="mb-1">Diskon: <strong>{{ discountCode.discount }}%</strong></p>
                            <p class="text-muted small mb-0">
                              Berlaku sampai: {{ formatDate(discountCode.expiryDate) }}
                            </p>
                          </div>
                          <div class="text-right">
                            <button @click="copyDiscountCode(discountCode.code)" class="btn btn-sm btn-outline-primary">
                              <i class="fa fa-copy"></i> Salin
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div v-else>
                <div class="text-center py-5">
                  <i class="fa fa-ticket-alt fa-3x text-muted mb-3"></i>
                  <h5 class="font-weight-bold mb-2">Tidak Ada Kode Diskon</h5>
                  <p class="text-muted mb-4">Anda belum memiliki kode diskon. Berlangganan newsletter untuk mendapatkan kode diskon.</p>
                  <nuxt-link to="/" class="btn btn-warning rounded-pill px-4">
                    <i class="fa fa-home mr-2"></i>Berlangganan Sekarang
                  </nuxt-link>
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
import Sidebar from '~/components/web/sidebar.vue'

export default {
  layout: 'default',
  
  //middleware
  middleware: 'isCustomer',
  
  //components
  components: {
    Sidebar
  },
  
  //head
  head() {
    return {
      title: 'Kode Diskon - MI STORE',
      meta: [{
        hid: 'description',
        name: 'description',
        content: 'Lihat dan kelola kode diskon Anda di MI STORE'
      }]
    }
  },
  
  //asyncData
  async asyncData({ store }) {
    // initialize newsletter data
    await store.dispatch('web/newsletter/getSubscribers')
    await store.dispatch('web/newsletter/getDiscountCodes')
  },
  
  //computed
  computed: {
    // get unused discount codes for current user
    unusedDiscountCodes() {
      // In a real application, you would filter by user email
      // For now, we'll show all unused discount codes
      return this.$store.getters['web/newsletter/unusedDiscountCodes']
    }
  },
  
  //methods
  methods: {
    // format date
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    },
    
    // copy discount code to clipboard
    copyDiscountCode(code) {
      navigator.clipboard.writeText(code).then(() => {
        this.$swal.fire({
          title: 'Berhasil!',
          text: 'Kode diskon telah disalin ke clipboard',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        });
      }).catch(() => {
        this.$swal.fire({
          title: 'Gagal!',
          text: 'Terjadi kesalahan saat menyalin kode diskon',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      });
    }
  }
}
</script>

<style scoped>
.border-left-primary {
  border-left: 4px solid #007bff !important;
}

.card:hover {
  transform: translateY(-3px);
  transition: all 0.3s ease;
}
</style>