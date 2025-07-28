<template>
  <footer class="pt-5" style="background: rgb(255, 255, 255); border-top: 5px solid rgb(230 74 26);">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-5 mb-4">
          <h4 class="font-weight-bold">TENTANG</h4>
          <hr style="border-top: 3px solid rgb(226, 232, 240); border-radius: 0.5rem;">
          <p> Mi Store Official Terpercaya di Indonesia. Jual Beli Aman &amp; Harga Termurah! Belanja
            sekarang. </p>
          <div class="sosmed-icons mt-3">
            <a href="https://facebook.com" target="_blank" class="social-icon mr-2">
              <i class="fab fa-facebook fa-lg"></i>
            </a>
            <a href="https://instagram.com" target="_blank" class="social-icon mr-2">
              <i class="fab fa-instagram fa-lg"></i>
            </a>
            <a href="https://twitter.com" target="_blank" class="social-icon mr-2">
              <i class="fab fa-twitter fa-lg"></i>
            </a>
            <a href="https://youtube.com" target="_blank" class="social-icon">
              <i class="fab fa-youtube fa-lg"></i>
            </a>
          </div>
        </div>
        <div class="col-md-3 mb-4">
          <h4 class="font-weight-bold">METODE PEMBAYARAN</h4>
          <hr style="border-top: 3px solid rgb(226, 232, 240); border-radius: 0.5rem;">
          <div class="row">
            <div class="col-md-4 col-4 mb-3">
              <div class="card  rounded">
                <div class="card-body p-2 text-center"><img
                    src="/images/payment/BCA.png" style="width: 50px;"></div>
              </div>
            </div>
            <div class="col-md-4 col-4 mb-3">
              <div class="card  rounded">
                <div class="card-body p-2 text-center"><img
                    src="/images/payment/BNI.png" style="width: 45px;"></div>
              </div>
            </div>
            <div class="col-md-4 col-4 mb-3">
              <div class="card  rounded">
                <div class="card-body p-2 text-center"><img
                    src="/images/payment/BRI.png" style="width: 60px;"></div>
              </div>
            </div>
            <div class="col-md-4 col-4 mb-3">
              <div class="card  rounded">
                <div class="card-body p-2 text-center"><img
                    src="/images/payment/GOPAY.png" style="width: 60px;"></div>
              </div>
            </div>
            <div class="col-md-4 col-4 mb-3">
              <div class="card  rounded">
                <div class="card-body p-2 text-center"><img
                    src="/images/payment/indomaret-logo.png" style="width: 60px;">
                </div>
              </div>
            </div>
            <div class="col-md-4 col-4 mb-3">
              <div class="card  rounded">
                <div class="card-body p-2 text-center"><img
                    src="/images/payment/atm-bersama.jpg" style="width: 40px;"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <h4 class="font-weight-bold">JAM OPERASIONAL</h4>
          <hr style="border-top: 3px solid rgb(226, 232, 240); border-radius: 0.5rem;">
          <p><i class="fa fa-clock"></i> Toko Buka Setiap Hari : <br><br> <strong>Senin - Jum'at</strong> ( 07.00 s/d
            19.00 ) <br> <strong>Sabtu - Minggu</strong> ( 07.00 s/d 17.00 ) </p>
          <div class="contact-info mt-3">
            <p><i class="fa fa-phone"></i> <strong>Telepon:</strong> +62 812 3456 7890</p>
            <p><i class="fa fa-envelope"></i> <strong>Email:</strong> info@yanstore.com</p>
            <p><i class="fa fa-map-marker-alt"></i> <strong>Alamat:</strong> Jl. Raya Utama No. 123, Jakarta</p>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-12">
          <h4 class="font-weight-bold">NEWSLETTER</h4>
          <hr style="border-top: 3px solid rgb(226, 232, 240); border-radius: 0.5rem;">
          <div class="input-group mb-3">
            <input type="email" class="form-control" placeholder="Masukkan email Anda" v-model="email">
            <div class="input-group-append">
              <button class="btn btn-primary" type="button" @click="subscribeNewsletter">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
      <div class="row text-center mt-3 pb-3">
        <div class="col-md-12">
          <hr> © <strong>YAN STORE</strong> 2024 • Hak Cipta Dilindungi 
          <div class="mt-2">
            <a href="#" class="footer-link mr-3">Syarat & Ketentuan</a>
            <a href="#" class="footer-link mr-3">Kebijakan Privasi</a>
            <a href="#" class="footer-link">Bantuan</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    data() {
      return {
        email: ''
      }
    },
    methods: {
      subscribeNewsletter() {
        if (!this.email) {
          alert('Silakan masukkan alamat email Anda');
          return;
        }
        
        if (!this.validateEmail(this.email)) {
          alert('Silakan masukkan alamat email yang valid');
          return;
        }
        
        // Simulasi pengiriman data ke server
        console.log('Email berlangganan:', this.email);
        alert('Terima kasih telah berlangganan newsletter kami!');
        this.email = '';
      },
      validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }
    }
  }
</script>

<style scoped>
  .social-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: #f5f5f5;
    border-radius: 50%;
    color: #333;
    text-decoration: none;
    transition: all 0.3s ease;
  }
  
  .social-icon:hover {
    background-color: rgb(230, 74, 26);
    color: white;
    transform: translateY(-3px);
  }
  
  .footer-link {
    color: #666;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  .footer-link:hover {
    color: rgb(230, 74, 26);
    text-decoration: underline;
  }
  
  .contact-info p {
    margin-bottom: 8px;
  }
  
  .btn-primary {
    background-color: rgb(230, 74, 26);
    border-color: rgb(230, 74, 26);
  }
  
  .btn-primary:hover {
    background-color: rgb(200, 60, 20);
    border-color: rgb(200, 60, 20);
  }
</style>