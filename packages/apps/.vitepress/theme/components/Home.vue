<script setup lang="ts">
import { onMounted } from 'vue'
// import NewsLetter from './NewsLetter.vue'
import { load, data, base } from './sponsors'
import VueMasteryModal from './VueMasteryModal.vue'

onMounted(async () => {
  await load()
})
</script>

<template>
  <section id="hero">
    <h1 class="tagline">
     <span class="accent">Lê Văn Thành</span>
    </h1>
    <p class="description">
      Đừng thử đi làm điều mà bạn thích, hãy thích điều mà bạn đang làm.
    </p>
    <p class="actions">
      <a class="get-started" href="/blog/gioi-thieu.html">
        Blog
        <svg
          class="icon"
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 24 24"
        >
          <path
            d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"
          />
        </svg>
      </a>
    </p>
  </section>
<!--  <section id="highlights" class="vt-box-container">-->
<!--    <div class="vt-box">-->
<!--      <h2>Approachable</h2>-->
<!--      <p>-->
<!--        Builds on top of standard HTML, CSS and JavaScript with intuitive-->
<!--        API and world-class documentation.-->
<!--      </p>-->
<!--    </div>-->
<!--    <div class="vt-box">-->
<!--      <h2>Performant</h2>-->
<!--      <p>-->
<!--        Truly reactive, compiler-optimized rendering system that rarely-->
<!--        requires manual optimization.-->
<!--      </p>-->
<!--    </div>-->
<!--    <div class="vt-box">-->
<!--      <h2>Versatile</h2>-->
<!--      <p>-->
<!--        A rich, incrementally adoptable ecosystem that scales between a-->
<!--        library and a full-featured framework.-->
<!--      </p>-->
<!--    </div>-->
<!--  </section>-->

</template>

<style scoped>
section {
  padding: 42px 32px;
}

#hero {
  padding: 96px 32px;
  text-align: center;
}

.tagline {
  font-size: 76px;
  line-height: 1.25;
  font-weight: 900;
  letter-spacing: -1.5px;
  max-width: 960px;
  margin: 0px auto;
}

html:not(.dark) .accent,
.dark .tagline {
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.description {
  max-width: 960px;
  line-height: 1.5;
  color: var(--vt-c-text-2);
  transition: color 0.5s;
  font-size: 22px;
  margin: 24px auto 40px;
}

</style>
