<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import {useRoute} from 'vitepress';

const route = useRoute();

const domain = ref('');

onMounted(() => {
  // Lấy domain từ URL hiện tại
  domain.value = window.location.hostname;
  console.log('Domain Name:', domain.value);
});

const dynamicHref = computed(() => {
  return `//www.dmca.com/Protection/Status.aspx?ID=8febc2ec-f016-49e9-8483-8b1afed383d4&cdnrdr=1&refurl=${domain.value + route.path}`;
});
</script>
<template>
  <p>
    <a target="_blank" :href="dynamicHref"
       title="DMCA.com Protection Status" class="dmca-badge">
      <img style="margin: auto" class="no-zoom"
           src="https://images.dmca.com/Badges/dmca_protected_sml_120m.png?ID=8febc2ec-f016-49e9-8483-8b1afed383d4"
           alt="DMCA.com Protection Status" />
    </a>
  </p>
</template>

