<template>
  <footer class="footer pt-5 bg-light">
    <div class="container">
      <div class="row">
        <!-- Tentang -->
        <div class="col-lg-3 col-md-6 mb-4">
          <FooterSection title="TENTANG">
            <p class="text-muted">
              Mi Store Official terpercaya di Indonesia. Jual beli aman & harga
              termurah! Belanja sekarang.
            </p>

            <div class="sosmed-icons mt-3">
              <SocialIcon
                v-for="icon in socialLinks"
                :key="icon.name"
                :href="icon.url"
                :icon="icon.icon"
              />
            </div>
          </FooterSection>
        </div>

        <!-- Quick Links -->
        <div class="col-lg-2 col-md-6 mb-4">
          <FooterSection title="LINKS">
            <ul class="list-unstyled">
              <li class="mb-2"><FooterLink to="/">Beranda</FooterLink></li>
              <li class="mb-2"><FooterLink to="/products">Semua Produk</FooterLink></li>
              <li class="mb-2"><FooterLink to="/categories">Kategori</FooterLink></li>
              <li class="mb-2"><FooterLink to="/about">Tentang Kami</FooterLink></li>
              <li class="mb-2"><FooterLink to="/contact">Kontak</FooterLink></li>
              <li class="mb-2"><FooterLink to="/faq">FAQ</FooterLink></li>
            </ul>
          </FooterSection>
        </div>

        <!-- Customer Service -->
        <div class="col-lg-3 col-md-6 mb-4">
          <FooterSection title="LAYANAN PELANGGAN">
            <div class="contact-info">
              <p class="mb-2"><i class="fa fa-phone text-primary"></i> <strong>Telepon:</strong> +62 812 3456 7890</p>
              <p class="mb-2"><i class="fa fa-whatsapp text-success"></i> <strong>WhatsApp:</strong> +62 812 3456 7890</p>
              <p class="mb-2"><i class="fa fa-envelope text-info"></i> <strong>Email:</strong> info@pramadhastore.com</p>
              <p class="mb-2"><i class="fa fa-map-marker-alt text-danger"></i> <strong>Alamat:</strong> Jl. Raya Utama No. 123, Jakarta</p>
            </div>
            
            <div class="mt-3">
              <h5 class="font-weight-bold mb-3">Jam Operasional:</h5>
              <p class="mb-1">
                <i class="fa fa-clock text-warning"></i> <strong>Senin - Jum'at:</strong> 07.00 - 19.00
              </p>
              <p>
                <i class="fa fa-clock text-warning"></i> <strong>Sabtu - Minggu:</strong> 07.00 - 17.00
              </p>
            </div>
          </FooterSection>
        </div>

        <!-- Metode Pembayaran -->
        <div class="col-lg-4 col-md-6 mb-4">
          <FooterSection title="METODE PEMBAYARAN">
            <div class="row">
              <PaymentLogo
                v-for="(logo, index) in paymentLogos"
                :key="index"
                :src="logo.src"
                :width="logo.width"
              />
            </div>
            
            <div class="mt-4">
              <h5 class="font-weight-bold mb-3">Ikuti Kami:</h5>
              <div class="sosmed-icons mt-2">
                <SocialIcon
                  v-for="icon in socialLinks"
                  :key="icon.name + '-2'"
                  :href="icon.url"
                  :icon="icon.icon"
                />
              </div>
            </div>
          </FooterSection>
        </div>
      </div>

      <!-- Newsletter -->
      <div class="row mt-4 pt-4 border-top">
        <div class="col-md-12">
          <FooterSection title="NEWSLETTER">
            <div class="input-group mb-3 rounded-pill overflow-hidden">
              <input
                v-model="email"
                type="email"
                class="form-control border-0"
                placeholder="Masukkan email Anda"
              />
              <div class="input-group-append">
                <button class="btn btn-warning rounded-pill px-4" type="button" @click="subscribeNewsletter">
                  Subscribe
                </button>
              </div>
            </div>
            <p class="text-muted small">Dapatkan penawaran dan promo menarik setiap minggu.</p>
          </FooterSection>
        </div>
      </div>

      <!-- Copyright -->
      <div class="row text-center mt-5 pt-3 border-top">
        <div class="col-md-12">
          <p class="mb-0">© <strong>MI STORE</strong> 2024 • Hak Cipta Dilindungi</p>
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
      email: "",
      socialLinks: [
        { name: "facebook", icon: "fab fa-facebook", url: "https://facebook.com" },
        { name: "instagram", icon: "fab fa-instagram", url: "https://instagram.com" },
        { name: "twitter", icon: "fab fa-twitter", url: "https://twitter.com" },
        { name: "youtube", icon: "fab fa-youtube", url: "https://youtube.com" },
      ],
      paymentLogos: [
        { src: "/images/payment/BCA.png", width: "50px" },
        { src: "/images/payment/BNI.png", width: "45px" },
        { src: "/images/payment/BRI.png", width: "60px" },
        { src: "/images/payment/GOPAY.png", width: "60px" },
        { src: "/images/payment/indomaret-logo.png", width: "60px" },
        { src: "/images/payment/atm-bersama.jpg", width: "40px" },
      ],
    };
  },
  methods: {
    async subscribeNewsletter() {
      if (!this.email) {
        this.$swal.fire({
          icon: 'warning',
          title: 'Peringatan',
          text: 'Silakan masukkan alamat email Anda',
          confirmButtonColor: '#e64a19'
        });
        return;
      }
      
      if (!this.validateEmail(this.email)) {
        this.$swal.fire({
          icon: 'error',
          title: 'Email Tidak Valid',
          text: 'Silakan masukkan alamat email yang valid',
          confirmButtonColor: '#e64a19'
        });
        return;
      }

      try {
        // Add subscriber to store
        const result = await this.$store.dispatch('web/newsletter/addSubscriber', { email: this.email });
        
        if (result.success) {
          this.$swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            html: `Terima kasih telah berlangganan newsletter kami!<br><br>` +
                  `<strong>Kode Diskon Anda: ${result.discountCode}</strong><br>` +
                  `Diskon: ${result.discount}%<br>` +
                  `Berlaku selama 30 hari`,
            confirmButtonColor: '#e64a19'
          });
          
          this.email = "";
        } else {
          this.$swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: result.message,
            confirmButtonColor: '#e64a19'
          });
        }
      } catch (error) {
        this.$swal.fire({
          icon: 'error',
          title: 'Gagal!',
          text: 'Terjadi kesalahan saat berlangganan newsletter',
          confirmButtonColor: '#e64a19'
        });
      }
    },
    validateEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
  },
  components: {
    FooterSection: {
      props: ["title"],
      template: `
        <div>
          <h4 class="font-weight-bold">{{ title }}</h4>
          <hr class="section-divider" />
          <slot></slot>
        </div>
      `,
    },
    SocialIcon: {
      props: ["href", "icon"],
      template: `
        <a :href="href" target="_blank" class="social-icon mr-2">
          <i :class="icon"></i>
        </a>
      `,
    },
    PaymentLogo: {
      props: ["src", "width"],
      template: `
        <div class="col-md-4 col-4 mb-3">
          <div class="card rounded">
            <div class="card-body p-2 text-center">
              <img :src="src" :style="{ width }" />
            </div>
          </div>
        </div>
      `,
    },
    FooterLink: {
      props: ["to"],
      template: `
        <nuxt-link :to="to" class="footer-link">
          <slot></slot>
        </nuxt-link>
      `
    }
  },
};
</script>

<style scoped>
.footer {
  background: linear-gradient(to bottom, #f8f9fa, #ffffff);
  border-top: 5px solid var(--primary);
}

.section-divider {
  border-top: 3px solid rgb(226, 232, 240);
  border-radius: 0.5rem;
}

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
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.social-icon:hover {
  background-color: var(--primary);
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.footer-link {
  color: #666;
  text-decoration: none;
  transition: all 0.3s ease;
}

.footer-link:hover {
  color: var(--primary);
  text-decoration: underline;
}

.contact-info p {
  margin-bottom: 8px;
}

.btn-warning {
  background: var(--gradient-primary);
  border: none;
}

.btn-warning:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
}

.list-unstyled li a {
  color: #666;
  text-decoration: none;
  transition: all 0.3s ease;
}

.list-unstyled li a:hover {
  color: var(--primary);
  text-decoration: underline;
}

.border-top {
  border-top: 1px solid rgba(0,0,0,0.1) !important;
}
</style>