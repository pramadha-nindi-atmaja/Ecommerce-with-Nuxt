<template>
  <div class="container-fluid mt-custom">
    <div 
      id="mycarousel" 
      class="carousel slide" 
      data-ride="carousel" 
      data-interval="4000"
      @mouseenter="pauseCarousel"
      @mouseleave="resumeCarousel"
    >
      <!-- Indicators -->
      <ol class="carousel-indicators">
        <li 
          v-for="(slider, id) in sliders" 
          :key="slider.id"
          :data-target="#mycarousel" 
          :data-slide-to="id"
          :class="{ active: id === 0 }"
        ></li>
      </ol>
      
      <!-- Slides -->
      <div class="carousel-inner">
        <div 
          class="carousel-item" 
          v-for="(slider, id) in sliders" 
          :class="{ active: id === 0 }" 
          :key="slider.id"
        >
          <a :href="slider.link" target="_blank" :aria-label="`Slide link: ${slider.link}`">
            <img :src="slider.image" class="d-block w-100 rounded" :alt="`Slider image ${id + 1}`">
          </a> 
        </div>
        
        <!-- Loading state -->
        <div v-if="loading" class="carousel-item active">
          <div class="d-flex justify-content-center align-items-center" style="height: 400px;">
            <div class="spinner-border text-warning" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
        
        <!-- Error state -->
        <div v-if="error" class="carousel-item active">
          <div class="d-flex justify-content-center align-items-center" style="height: 400px;">
            <div class="text-center">
              <i class="fa fa-exclamation-triangle fa-3x text-warning"></i>
              <p class="mt-2">Failed to load slider images</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Controls -->
      <a class="carousel-control-prev" href="#mycarousel" role="button" data-slide="prev" aria-label="Previous slide">
        <div class="banner-icons"> <span class="fa fa-angle-left"></span> </div> <span class="sr-only">Previous</span>
      </a> 
      <a class="carousel-control-next" href="#mycarousel" role="button" data-slide="next" aria-label="Next slide">
        <div class="banner-icons"> <span class="fa fa-angle-right"></span> </div> <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: true,
        error: false
      }
    },
    
    //hook "fetch"
    async fetch() {
      try {
        //fething sliders on Rest API
        await this.$store.dispatch('web/slider/getSlidersData')
        this.loading = false
      } catch (err) {
        console.error('Failed to load sliders:', err)
        this.error = true
        this.loading = false
      }
    },

    //computed
    computed: {
      //sliders
      sliders() {
        return this.$store.state.web.slider.sliders
      }
    },
    
    methods: {
      pauseCarousel() {
        // Pause the carousel on hover
        const carousel = document.getElementById('mycarousel')
        if (carousel) {
          $(carousel).carousel('pause')
        }
      },
      
      resumeCarousel() {
        // Resume the carousel when mouse leaves
        const carousel = document.getElementById('mycarousel')
        if (carousel) {
          $(carousel).carousel('cycle')
        }
      }
    },
    
    mounted() {
      // Ensure carousel is properly initialized
      this.$nextTick(() => {
        const carousel = document.getElementById('mycarousel')
        if (carousel) {
          $(carousel).carousel()
        }
      })
    }
  }
</script>

<style scoped>
.carousel-item {
  height: 400px;
  overflow: hidden;
}

.carousel-item img {
  object-fit: cover;
  height: 100%;
  width: 100%;
}

.carousel-indicators {
  bottom: 10px;
}

.carousel-indicators li {
  background-color: rgba(0, 0, 0, 0.5);
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.carousel-indicators .active {
  background-color: #e64a19;
}

.banner-icons {
  background: rgba(0, 0, 0, 0.5);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner-icons span {
  color: white;
  font-size: 24px;
}

.carousel-control-prev,
.carousel-control-next {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.carousel:hover .carousel-control-prev,
.carousel:hover .carousel-control-next {
  opacity: 1;
}

@media (max-width: 768px) {
  .carousel-item {
    height: 250px;
  }
  
  .banner-icons {
    width: 40px;
    height: 40px;
  }
  
  .banner-icons span {
    font-size: 20px;
  }
}
</style>