<script lang="ts" setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import VPContentDocOutline from './VPContentDocOutline.vue'
import VPContentDocFooter from './VPContentDocFooter.vue'
import VPCarbonAds from './VPCarbonAds.vue'
import { VTLink, VTIconEdit } from '../../core'
import { useConfig } from '../composables/config'
import VPDocFooterLastUpdated from './VPDocFooterLastUpdated.vue'
import VPDmca from './VPDmca.vue'
import VPFacebookComments from "./VPFacebookComments.vue";

const { page, frontmatter } = useData()
const { config } = useConfig()

const hashMatch = /#(\w+)$/

const repoUrl = computed(() => {
  const repo = config.value.editLink?.repo || 'vuejs/docs'
  const appFolder = config.value.editLink?.appFolder || ''
  const branch = repo.match(hashMatch)?.[1] || 'main'
  return `https://github.com/${repo.split('#')[0]}/edit/${branch}/${appFolder}/src/${
    page.value.relativePath
  }`
})

const hasLastUpdated = computed(() => {
  return page.value.lastUpdated && frontmatter.value.lastUpdated !== false;
});
const pageClass = computed(() => {
  const { relativePath } = page.value
  return relativePath.slice(0, relativePath.indexOf('/'))
})
</script>

<template>
  <div
    class="VPContentDoc"
    :class="{ 'has-aside': frontmatter.aside !== false }"
  >
    <div class="container">
      <div class="aside" v-if="frontmatter.aside !== false">
        <div class="aside-container">
          <slot name="aside-top" />
          <VPContentDocOutline
            v-if="page.headers && frontmatter.outline !== false"
          />
          <slot name="aside-mid" />
          <VPCarbonAds v-if="config.carbonAds && frontmatter.ads !== false" />
          <slot name="aside-bottom" />
        </div>
      </div>
      <div class="content"  :class="{ 'not-outline': frontmatter.outline === false }">
        <slot name="content-top" />
        <main>
          <div  class="author"  v-if="frontmatter.authors && frontmatter.authors.length > 0">
            <div class="aside-container" style="margin: auto;text-align: center ; width: auto;">
              <slot name="author" />
            </div>
          </div>
          <Content class="vt-doc" :class="pageClass" />
          <div  class="author"  v-if="frontmatter.authors && frontmatter.authors.length > 0">
            <div class="aside-container" style="margin: auto;text-align: center ; width: auto;">
              <slot name="author" />
            </div>
          </div>
          <VPFacebookComments v-if="frontmatter.comment_fb == true" />
        <div
        style='display: flex;'>
          <VPDmca v-if="frontmatter.dmca == true || frontmatter.dmca == undefined" />
          <p
            class="edit-link"
            v-if="config.editLink && frontmatter.editLink !== false"
          >
            <VTIconEdit class="vt-icon" />
            <VTLink :href="repoUrl" :no-icon="true">{{
                config.editLink.text
              }}</VTLink>

          </p>
          <VPDocFooterLastUpdated v-if="frontmatter.lastUpdated !== false" />
        </div>

        </main>
        <slot name="content-bottom" />
        <VPContentDocFooter v-if="frontmatter.footer !== false" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.VPContentDoc {
  padding: 32px 24px 96px;
}

.vt-doc {
  margin-bottom: 54px;
}

.content {
  margin: 0 auto;
  max-width: 688px;
  position: relative;
}

.aside {
  position: relative;
  display: none;
  flex-shrink: 0;
  padding-left: 64px;
  width: 320px;
}
.author {
  position: relative;
  flex-shrink: 0;
  width: 100%;
  padding-bottom: 60px;
}

.aside-container {
  position: sticky;
  width: 224px;
  top: calc(var(--vt-nav-height) + var(--vt-banner-height, 0px) + 24px);
  bottom: 0;
}

.aside-container::-webkit-scrollbar {
  display: none;
}

.edit-link {
  margin: 0 0 32px;
  /* text-align: center; */
}

.edit-link .vt-link {
  font-size: 14px;
  color: var(--vt-c-brand);
  font-weight: 500;
}

.vt-icon {
  width: 18px;
  height: 18px;
  color: var(--vt-c-brand);
  display: inline-block;
  margin-right: 8px;
  position: relative;
  top: -1px;
}

@media (min-width: 768px) {
  .VPContentDoc {
    padding: 48px 32px 96px;
  }
}

@media (min-width: 960px) {
  .VPContentDoc {
    padding: 64px 64px 96px;
  }
}

@media (min-width: 1280px) {
  .VPContentDoc {
    padding: 64px 0 96px 64px;
  }
  .VPContentDoc:not(.has-sidebar.has-aside) {
    padding-left: calc((100vw - 688px) / 2);
  }
  .VPContentDoc.has-aside:not(.has-sidebar) {
    padding-left: calc((100vw - 688px - 320px) / 2);
  }
  .container {
    display: flex;
  }
  .content {
    min-width: 688px;
    margin: 0;
    order: 1;
  }
  .not-outline {
    max-width: max-content;
  }
  .VPContentDoc:not(.has-aside) .content {
    min-width: 688px;
  }
  .aside {
    display: block;
    order: 2;
  }
  .author {
    display: none;
    order: 2;
  }
}

@media (min-width: 1440px) {
  .VPContentDoc {
    padding: 64px 0 96px 96px;
  }
  .aside {
    padding-left: 96px;
  }
}
</style>
