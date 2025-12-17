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
            <h5 class="font-weight-bold mb-4"><i class="fa fa-shopping-cart mr-2"></i>MY ORDERS</h5>

            <div class="form-group mb-4">
              <div class="input-group rounded-pill overflow-hidden">
                <input type="text" class="form-control border-0" v-model="search" @keypress.enter="searchData" placeholder="Cari berdasarkan no. invoice">
                <div class="input-group-append">
                  <button @click="searchData" class="btn btn-warning rounded-pill px-4">
                    <i class="fa fa-search mr-2"></i>SEARCH
                  </button>
                </div>
              </div>
            </div>

            <b-table striped bordered hover :items="invoices.data" :fields="fields" show-empty class="rounded shadow-sm">
              <template v-slot:cell(grand_total)="row">
                <span class="font-weight-bold">Rp. {{ formatPrice(row.item.grand_total) }}</span>
              </template>
              <template v-slot:cell(status)="row">
                <span v-if="row.item.status == 'pending'" class="badge badge-primary px-3 py-2">
                  <i class="fa fa-circle-notch fa-spin mr-1"></i> {{ row.item.status }}
                </span>
                <span v-if="row.item.status == 'success'" class="badge badge-success px-3 py-2">
                  <i class="fa fa-check-circle mr-1"></i> {{ row.item.status }}
                </span>
                <span v-if="row.item.status == 'expired'" class="badge badge-warning px-3 py-2">
                  <i class="fa fa-exclamation-triangle mr-1"></i> {{ row.item.status }}
                </span>
                <span v-if="row.item.status == 'failed'" class="badge badge-danger px-3 py-2">
                  <i class="fa fa-times-circle mr-1"></i> {{ row.item.status }}
                </span>
              </template>
              <template v-slot:cell(actions)="row">
                <b-button :to="{name: 'customer-invoices-show-snap_token', params: {snap_token: row.item.snap_token}}" variant="outline-primary" size="sm" class="rounded-pill">
                  <i class="fa fa-eye mr-1"></i>DETAIL
                </b-button>
              </template>
            </b-table>

            <!-- pagination -->
            <b-pagination align="right" :value="invoices.current_page" :total-rows="invoices.total"
              :per-page="invoices.per_page" @change="changePage" aria-controls="my-table" class="mt-4"></b-pagination>

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
        title: 'Invoices - Customer',
      }
    },

    //data function
    data() {
      return {
        //table header
        fields: [{
            label: 'No. Invoice',
            key: 'invoice'
          },
          {
            label: 'Grand Total',
            key: 'grand_total'
          },
          {
            label: 'Status Payment',
            key: 'status',
            tdClass: 'text-center'
          },
          {
            label: 'Actions',
            key: 'actions',
            tdClass: 'text-center'
          }
        ],

        //state search
        search: ''
      }
    },

    //hook "asyncData"
    async asyncData({ store }) {
      await store.dispatch('customer/invoice/getInvoicesData')
    },

    //computed
    computed: {

      //invoices
      invoices() {
        return this.$store.state.customer.invoice.invoices
      },
    },

    //method
    methods: {

        //method "searchData"
        searchData() {

            //commit to mutation "SET_PAGE"
            this.$store.commit('customer/invoice/SET_PAGE', 1)

            //dispatch on action "getInvoicesData"
            this.$store.dispatch('customer/invoice/getInvoicesData', this.search)
        },

        //method "changePage"
        changePage(page) {

            //commit to mutation "SET_PAGE"
            this.$store.commit('customer/invoice/SET_PAGE', page)

            //dispatch on action "getInvoicesData"
            this.$store.dispatch('customer/invoice/getInvoicesData', this.search)
        },
    }

  }
</script>

<style>

</style>