<template>
  <div class="container-fluid mt-custom">
    <div class="fade-in">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card border-0 rounded shadow-sm border-top-orange">
            <div class="card-body">
              <h5 class="font-weight-bold mb-4"><i class="fa fa-truck mr-2"></i> Lacak Pesanan</h5>
              <hr>
              
              <!-- Tracking Form -->
              <div class="mb-4">
                <form @submit.prevent="trackOrder">
                  <div class="form-group">
                    <label class="font-weight-bold mb-2">Masukkan Nomor Pesanan atau Tracking Number</label>
                    <div class="input-group">
                      <input type="text" v-model="trackingNumber" class="form-control rounded-left px-3 py-2" placeholder="Contoh: INV-20230001 atau TRK123456789" required>
                      <div class="input-group-append">
                        <button type="submit" class="btn btn-warning rounded-right px-4 py-2" :disabled="isTracking">
                          <span v-if="isTracking"><i class="fa fa-spinner fa-spin"></i></span>
                          <span v-else><i class="fa fa-search mr-1"></i> Lacak</span>
                        </button>
                      </div>
                    </div>
                    <small class="form-text text-muted">Masukkan nomor pesanan Anda atau nomor tracking pengiriman</small>
                  </div>
                </form>
              </div>
              
              <!-- Order Tracking Info -->
              <div v-if="order" class="mt-4">
                <div class="card border-0 rounded shadow-sm mb-4">
                  <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                      <h6 class="font-weight-bold mb-0">Informasi Pesanan</h6>
                      <span class="badge" :class="getStatusBadgeClass(order.status)">
                        {{ getOrderStatusText(order.status) }}
                      </span>
                    </div>
                    
                    <div class="row">
                      <div class="col-md-6">
                        <table class="table table-borderless table-sm">
                          <tr>
                            <td class="font-weight-bold">Nomor Pesanan:</td>
                            <td>{{ order.invoice }}</td>
                          </tr>
                          <tr>
                            <td class="font-weight-bold">Tanggal Pesanan:</td>
                            <td>{{ formatDate(order.created_at) }}</td>
                          </tr>
                          <tr>
                            <td class="font-weight-bold">Total Pembayaran:</td>
                            <td class="font-weight-bold text-success">Rp. {{ formatPrice(order.grand_total) }}</td>
                          </tr>
                        </table>
                      </div>
                      <div class="col-md-6">
                        <table class="table table-borderless table-sm">
                          <tr>
                            <td class="font-weight-bold">Metode Pembayaran:</td>
                            <td>{{ order.payment_method || 'Midtrans' }}</td>
                          </tr>
                          <tr>
                            <td class="font-weight-bold">Kurir:</td>
                            <td>{{ order.courier }} - {{ order.courier_service }}</td>
                          </tr>
                          <tr>
                            <td class="font-weight-bold">Nomor Resi:</td>
                            <td>{{ order.tracking_number || '-' }}</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Order Items -->
                <div class="card border-0 rounded shadow-sm mb-4">
                  <div class="card-body">
                    <h6 class="font-weight-bold mb-3">Detail Produk</h6>
                    <div class="table-responsive">
                      <table class="table">
                        <thead class="thead-light">
                          <tr>
                            <th>Produk</th>
                            <th class="text-center">Harga</th>
                            <th class="text-center">Jumlah</th>
                            <th class="text-right">Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in order.order_items" :key="item.id">
                            <td>
                              <div class="d-flex align-items-center">
                                <img :src="item.product.image" class="img-fluid rounded mr-3" style="width: 60px; height: 60px; object-fit: cover;">
                                <div>
                                  <h6 class="mb-0 font-weight-bold">{{ item.product.title }}</h6>
                                  <small class="text-muted">{{ item.product.category.name }}</small>
                                </div>
                              </div>
                            </td>
                            <td class="text-center">Rp. {{ formatPrice(item.price) }}</td>
                            <td class="text-center">{{ item.qty }}</td>
                            <td class="text-right font-weight-bold">Rp. {{ formatPrice(item.price * item.qty) }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                
                <!-- Shipping Progress -->
                <div class="card border-0 rounded shadow-sm mb-4">
                  <div class="card-body">
                    <h6 class="font-weight-bold mb-3">Status Pengiriman</h6>
                    <div class="timeline-steps d-flex justify-content-between">
                      <div class="step" :class="{ 'completed': isStepCompleted('pending'), 'active': isStepActive('pending') }">
                        <div class="circle">
                          <i class="fa fa-receipt"></i>
                        </div>
                        <div class="text">Pesanan Dibuat</div>
                        <div class="date" v-if="order.created_at">{{ formatDate(order.created_at) }}</div>
                      </div>
                      
                      <div class="step" :class="{ 'completed': isStepCompleted('processing'), 'active': isStepActive('processing') }">
                        <div class="circle">
                          <i class="fa fa-box"></i>
                        </div>
                        <div class="text">Diproses</div>
                        <div class="date" v-if="order.processed_at">{{ formatDate(order.processed_at) }}</div>
                      </div>
                      
                      <div class="step" :class="{ 'completed': isStepCompleted('shipped'), 'active': isStepActive('shipped') }">
                        <div class="circle">
                          <i class="fa fa-truck"></i>
                        </div>
                        <div class="text">Dikirim</div>
                        <div class="date" v-if="order.shipped_at">{{ formatDate(order.shipped_at) }}</div>
                      </div>
                      
                      <div class="step" :class="{ 'completed': isStepCompleted('delivered'), 'active': isStepActive('delivered') }">
                        <div class="circle">
                          <i class="fa fa-home"></i>
                        </div>
                        <div class="text">Diterima</div>
                        <div class="date" v-if="order.delivered_at">{{ formatDate(order.delivered_at) }}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Shipping Address -->
                <div class="card border-0 rounded shadow-sm">
                  <div class="card-body">
                    <h6 class="font-weight-bold mb-3">Alamat Pengiriman</h6>
                    <div class="row">
                      <div class="col-md-6">
                        <p class="mb-1"><strong>{{ order.customer_name }}</strong></p>
                        <p class="mb-1">{{ order.customer_phone }}</p>
                        <p class="mb-0">{{ order.customer_address }}</p>
                        <p class="mb-0">{{ order.customer_city }}, {{ order.customer_province }}</p>
                        <p class="mb-0">{{ order.customer_postal_code }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- No Order Found -->
              <div v-else-if="orderNotFound" class="text-center py-5">
                <div class="mb-4">
                  <i class="fa fa-exclamation-triangle text-warning" style="font-size: 4rem;"></i>
                </div>
                <h5 class="font-weight-bold mb-3">Pesanan Tidak Ditemukan</h5>
                <p class="text-muted mb-4">Maaf, kami tidak dapat menemukan pesanan dengan nomor "{{ trackingNumber }}". Silakan periksa kembali nomor pesanan Anda.</p>
                <button @click="resetTracking" class="btn btn-warning rounded-pill px-4 py-2">
                  <i class="fa fa-redo mr-2"></i>Coba Lagi
                </button>
              </div>
              
              <!-- Instructions -->
              <div v-else class="text-center py-5">
                <div class="mb-4">
                  <i class="fa fa-truck text-muted" style="font-size: 4rem;"></i>
                </div>
                <h5 class="font-weight-bold mb-3">Lacak Status Pengiriman Pesanan Anda</h5>
                <p class="text-muted mb-4">Masukkan nomor pesanan atau nomor tracking untuk melihat status pengiriman terbaru.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    //middleware
    middleware: 'isCustomer',

    //layout
    layout: 'default',

    //meta
    head() {
      return {
        title: 'Lacak Pesanan - Customer',
      }
    },

    //data function
    data() {
      return {
        trackingNumber: '',
        isTracking: false,
        order: null,
        orderNotFound: false
      }
    },

    //methods
    methods: {
      // track order
      async trackOrder() {
        if (!this.trackingNumber.trim()) {
          this.$swal.fire({
            title: 'Peringatan!',
            text: 'Silakan masukkan nomor pesanan atau tracking number',
            icon: 'warning',
            showConfirmButton: false,
            timer: 2000
          });
          return;
        }

        // Set tracking state
        this.isTracking = true;
        this.orderNotFound = false;

        try {
          // Track order
          const response = await this.$axios.get(`/api/web/orders/tracking/${this.trackingNumber}`);
          
          // Set order data
          this.order = response.data.data;
        } catch (error) {
          // Order not found
          this.orderNotFound = true;
          this.order = null;
        } finally {
          // Reset tracking state
          this.isTracking = false;
        }
      },
      
      // reset tracking
      resetTracking() {
        this.trackingNumber = '';
        this.order = null;
        this.orderNotFound = false;
      },
      
      // format date
      formatDate(date) {
        if (!date) return '-';
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(date).toLocaleDateString('id-ID', options);
      },
      
      // get order status text
      getOrderStatusText(status) {
        const statusMap = {
          'pending': 'Menunggu Pembayaran',
          'paid': 'Sudah Dibayar',
          'processing': 'Sedang Diproses',
          'shipped': 'Dikirim',
          'delivered': 'Diterima',
          'cancelled': 'Dibatalkan'
        };
        return statusMap[status] || status;
      },
      
      // get status badge class
      getStatusBadgeClass(status) {
        const classMap = {
          'pending': 'badge-warning',
          'paid': 'badge-info',
          'processing': 'badge-primary',
          'shipped': 'badge-secondary',
          'delivered': 'badge-success',
          'cancelled': 'badge-danger'
        };
        return classMap[status] || 'badge-secondary';
      },
      
      // check if step is completed
      isStepCompleted(step) {
        if (!this.order) return false;
        
        const statusOrder = ['pending', 'processing', 'shipped', 'delivered'];
        const currentStatusIndex = statusOrder.indexOf(this.order.status);
        const stepIndex = statusOrder.indexOf(step);
        
        return stepIndex <= currentStatusIndex;
      },
      
      // check if step is active
      isStepActive(step) {
        if (!this.order) return false;
        return this.order.status === step;
      }
    }
  }
</script>

<style scoped>
.timeline-steps {
  margin: 2rem 0;
}

.step {
  text-align: center;
  position: relative;
  flex: 1;
}

.step:not(:last-child):after {
  content: '';
  position: absolute;
  top: 20px;
  left: 50%;
  right: -50%;
  height: 2px;
  background-color: #e0e0e0;
  z-index: 1;
}

.step.completed:not(:last-child):after {
  background-color: #28a745;
}

.step .circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 10px;
  position: relative;
  z-index: 2;
  color: #6c757d;
}

.step.completed .circle {
  background-color: #28a745;
  color: white;
}

.step.active .circle {
  background-color: #ffc107;
  color: white;
  border: 2px solid #ffc107;
  box-shadow: 0 0 0 3px rgba(255, 193, 7, 0.3);
}

.step .text {
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 5px;
}

.step .date {
  font-size: 0.75rem;
  color: #6c757d;
}

.step.completed .text,
.step.completed .date {
  color: #28a745;
}

.step.active .text {
  color: #ffc107;
  font-weight: 600;
}
</style>