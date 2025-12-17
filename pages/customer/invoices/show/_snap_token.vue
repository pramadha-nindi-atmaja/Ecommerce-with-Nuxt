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
              <h5 class="font-weight-bold mb-4"><i class="fa fa-shopping-cart mr-2"></i>DETAIL ORDER</h5>
              
              <div class="row">
                <div class="col-md-12">
                  <div class="table-responsive">
                    <table class="table table-bordered">
                      <client-only>
                        <tr>
                          <td class="font-weight-bold" style="width: 25%">
                            NO. INVOICE
                          </td>
                          <td style="width: 1%">:</td>
                          <td>
                            {{ invoice.invoice }}
                          </td>
                        </tr>
                        <tr>
                          <td class="font-weight-bold">
                            FULL NAME
                          </td>
                          <td>:</td>
                          <td>
                            {{ invoice.name }}
                          </td>
                        </tr>
                        <tr>
                          <td class="font-weight-bold">
                            PHONE
                          </td>
                          <td>:</td>
                          <td>
                            {{ invoice.phone }}
                          </td>
                        </tr>
                        <tr>
                          <td class="font-weight-bold">
                            COURIER / SERVICE / COST
                          </td>
                          <td>:</td>
                          <td>
                            {{ invoice.courier }} / {{ invoice.courier_service }} / Rp.
                            {{ formatPrice(invoice.courier_cost)  }}
                          </td>
                        </tr>
                        <tr>
                          <td class="font-weight-bold">
                            CITY
                          </td>
                          <td>:</td>
                          <td>
                            {{ invoice.city.name }}
                          </td>
                        </tr>
                        <tr>
                          <td class="font-weight-bold">
                            PROVINCE
                          </td>
                          <td>:</td>
                          <td>
                            {{ invoice.province.name }}
                          </td>
                        </tr>
                        <tr>
                          <td class="font-weight-bold">
                            ADDRESS
                          </td>
                          <td>:</td>
                          <td>
                            {{ invoice.address }}
                          </td>
                        </tr>
                        <tr>
                          <td class="font-weight-bold">
                            GRAND TOTAL
                          </td>
                          <td>:</td>
                          <td class="font-weight-bold text-success h5">
                            Rp. {{ formatPrice(invoice.grand_total)  }}
                          </td>
                        </tr>
                        <tr>
                          <td class="font-weight-bold">
                            STATUS
                          </td>
                          <td>:</td>
                          <td>
                            <button @click="payment(invoice.snap_token)" v-if="invoice.status == 'pending'"
                              class="btn btn-info rounded-pill px-4 py-2">
                              <i class="fa fa-credit-card mr-2"></i>BAYAR SEKARANG
                            </button>
                            <span v-else-if="invoice.status == 'success'" class="badge badge-success px-3 py-2">
                              <i class="fa fa-check-circle mr-1"></i> {{ invoice.status }}
                            </span>
                            <span v-else-if="invoice.status == 'expired'" class="badge badge-warning px-3 py-2">
                              <i class="fa fa-exclamation-triangle mr-1"></i> {{ invoice.status }}
                            </span>
                            <span v-else-if="invoice.status == 'failed'" class="badge badge-danger px-3 py-2">
                              <i class="fa fa-times-circle mr-1"></i> {{ invoice.status }}
                            </span>
                          </td>
                        </tr>
                      </client-only>
                    </table>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div class="card border-0 rounded shadow-sm border-top-orange mt-4">
            <div class="card-header bg-white">
              <h5 class="font-weight-bold mb-0"><i class="fa fa-shopping-cart mr-2"></i>DETAIL ITEMS</h5>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered">
                  <tbody>
                    <client-only>
                      <tr v-for="order in invoice.orders" :key="order.id" class="hover-card">
                        <td class="b-none" width="25%">
                          <div class="wrapper-image-cart">
                            <img :src="order.product.image" class="img-fluid rounded" style="width: 100%; height: 100px; object-fit: cover;">
                          </div>
                        </td>
                        <td class="b-none" width="50%">
                          <h5 class="font-weight-bold">{{ order.product.title }}</h5>
                          <div class="mb-2">
                            <span class="badge badge-secondary mr-2">QTY: {{ order.qty }}</span>
                          </div>
                          <!-- modal button -->
                          <button v-if="invoice.status == 'success'" type="button" class="btn btn-warning rounded-pill px-3 py-1" data-toggle="modal"
                            :data-target="'#modal-'+order.id">
                            <i class="fa fa-star mr-1"></i>BERIKAN ULASAN
                          </button>

                          <!-- Modal -->
                          <div class="modal fade" ref="modal" :id="'modal-'+order.id" tabindex="-1" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title" id="exampleModalLabel">ULASAN PRODUK</h5>
                                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div class="modal-body">
                                  <div class="row justify-content-center">
                                    <div class="col-md-7">
                                      <vue-star-rating v-model="rating.star" :show-rating="false" :star-size="30">
                                      </vue-star-rating>
                                    </div>
                                  </div>
                                  <div class="row mt-4">
                                    <div class="col-md-12">
                                      <div class="form-group">
                                        <label class="font-weight-bold mb-2">ULASAN</label>
                                        <textarea class="form-control rounded" id="alamat" rows="3" placeholder="Masukkan Ulasan Produk"
                                          v-model="rating.review"></textarea>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="modal-footer">
                                  <button type="button" class="btn btn-secondary rounded-pill px-4" data-dismiss="modal">TUTUP</button>
                                    <button v-if="rating.star && rating.review" @click.prevent="storeReview(order.id, order.product.id)" type="button"
                                    class="btn btn-warning rounded-pill px-4" data-dismiss="modal">KIRIM</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td class="b-none text-right">
                          <p class="m-0 font-weight-bold">Rp. {{ formatPrice(order.price) }}</p>
                        </td>
                      </tr>
                    </client-only>
                  </tbody>
                </table>
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
        title: 'Detail Order - Customer',
      }
    },

    //hook "asyncData"
    async asyncData({ store, route }) {
      await store.dispatch('customer/invoice/getDetailInvoice', route.params.snap_token)
    },

    //computed
    computed: {
      invoice() {
        return this.$store.state.customer.invoice.invoice
      }
    },

    //data function
    data() {
      return {
        //state rating
        rating: {
          star: 0,
          review: ''
        },
      }
    },

    //method
    methods: {

      //method "payment"  
      payment(snap_token) {
        window.snap.pay(snap_token, {

          onSuccess: function () {
            router.push({
              name: 'invoices-show-snap_token',
              params: {
                snap_token: snap_token
              }
            })
          },
          onPending: function () {
            router.push({
              name: 'invoices-show-snap_token',
              params: {
                snap_token: snap_token
              }
            })
          },
          onError: function () {
            router.push({
              name: 'invoices-show-snap_token',
              params: {
                snap_token: snap_token
              }
            })
          }
        })
      },

      //method "storeReview"
      async storeReview(orderId, productId) {

        //define formData
        let formData = new FormData();

        formData.append('rating', this.rating.star)
        formData.append('review', this.rating.review)
        formData.append('order_id', orderId)
        formData.append('product_id', productId)

        //sending data to action "storeReview" vuex
        await this.$store.dispatch('customer/review/storeReview', formData)
            
        //success
        .then(() => {

          //feresh data
          this.$nuxt.refresh()

          //clear state
          this.rating.star = 0
          this.rating.review = ''

          //sweet alert
          this.$swal.fire({
            title: 'BERHASIL!',
            text: "Ulasan Berhasil Disimpan!",
            icon: 'success',
            showConfirmButton: false,
            timer: 3000
          })

          //redirect route same page
          this.$router.push({ path: this.$route.path });

        })

        .catch(() => {
              
          //sweet alert
          this.$swal.fire({
            title: 'GAGAL!',
            text: "Anda sudah membuat ulasan untuk produk ini!",
            icon: 'error',
            showConfirmButton: false,
            timer: 3000
          })

        })

      }
    }

  }
</script>

<style>

</style>