<template>
  <footer class="footer pt-5">
    <div class="container-fluid">
      <div class="row">
        <!-- Tentang -->
        <div class="col-md-5 mb-4">
          <FooterSection title="TENTANG">
            <p>
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

        <!-- Metode Pembayaran -->
        <div class="col-md-3 mb-4">
          <FooterSection title="METODE PEMBAYARAN">
            <div class="row">
              <PaymentLogo
                v-for="(logo, index) in paymentLogos"
                :key="index"
                :src="logo.src"
                :width="logo.width"
              />
            </div>
          </FooterSection>
        </div>

        <!-- Jam Operasional -->
        <div class="col-md-4 mb-4">
          <FooterSection title="JAM OPERASIONAL">
            <p>
              <i class="fa fa-clock"></i> Toko Buka Setiap Hari :
              <br /><br />
              <strong>Senin - Jum'at</strong> (07.00 - 19.00)
              <br />
              <strong>Sabtu - Minggu</strong> (07.00 - 17.00)
            </p>

            <div class="contact-info mt-3">
              <p><i class="fa fa-phone"></i> <strong>Telepon:</strong> +62 812 3456 7890</p>
              <p><i class="fa fa-envelope"></i> <strong>Email:</strong> info@yanstore.com</p>
              <p><i class="fa fa-map-marker-alt"></i> <strong>Alamat:</strong> Jl. Raya Utama No. 123, Jakarta</p>
            </div>
          </FooterSection>
        </div>
      </div>

      <!-- Newsletter -->
      <div class="row mt-4">
        <div class="col-md-12">
          <FooterSection title="NEWSLETTER">
            <div class="input-group mb-3">
              <input
                v-model="email"
                type="email"
                class="form-control"
                placeholder="Masukkan email Anda"
              />
              <div class="input-group-append">
                <button class="btn btn-primary" type="button" @click="subscribeNewsletter">
                  Subscribe
                </button>
              </div>
            </div>
          </FooterSection>
        </div>
      </div>

      <!-- Copyright -->
      <div class="row text-center mt-3 pb-3">
        <div class="col-md-12">
          <hr />
          © <strong>YAN STORE</strong> 2024 • Hak Cipta Dilindungi
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
    subscribeNewsletter() {
      if (!this.email) return alert("Silakan masukkan alamat email Anda");
      if (!this.validateEmail(this.email))
        return alert("Silakan masukkan alamat email yang valid");

      console.log("Email berlangganan:", this.email);
      alert("Terima kasih telah berlangganan newsletter kami!");
      this.email = "";
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
  },
};
</script>

<style scoped>
.footer {
  background: #fff;
  border-top: 5px solid rgb(230, 74, 26);
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
