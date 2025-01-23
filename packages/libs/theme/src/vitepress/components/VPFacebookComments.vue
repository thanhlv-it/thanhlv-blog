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
  const scriptId = "custom-script"; // ID của script
  const existingScript = document.getElementById(scriptId);

  if (existingScript) {
    // Nếu script đã tồn tại, xóa và tải lại
    existingScript.remove();
  }

 setTimeout(() => {
   // Tạo script mới
   const script = document.createElement("script");
   script.id = scriptId;
   script.src = "https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v21.0&appId=241308786939259"; // URL của script
   script.async = true;

   script.onload = () => {
     console.log("Script loaded!");
     window.FB.XFBML.parse();
   };

   // Thêm script vào `head` hoặc `body`
   document.head.appendChild(script);
 },1000);

  return `${domain.value + route.path}`;
});
</script>
<template>
  <div style="border-top: 1px solid var(--vt-c-divider-light); padding-bottom: 20px"></div>
  <div >
    <div  style="padding-bottom: 20px" class="fb-comments" :data-href="dynamicHref" data-width="auto" data-numposts="5"></div>
    <div id="fb-root"></div>
  </div>
 </template>

