<script setup lang='ts'>
import {useData, useRoute} from 'vitepress'
import {data as blogs} from './all.data'
import {AUTHORS} from '@theme/components/constants'
import {computed} from 'vue'
import {VPTeamMembers} from 'vitepress/theme'

const {frontmatter} = useData()
const {frontmatter: data} = useData()

const route = useRoute()

function findCurrentIndex() {
  return blogs.findIndex((p) => p.url === route.path)
}

function generateUniqueId() {
  return `id-${Math.random().toString(36).substr(2, 9)}-${Date.now()}`;
}

const members = computed(() => blogs[findCurrentIndex()]?.authors?.map((key) => AUTHORS[key]) || [])

</script>

<template>
  <div v-if='frontmatter.authors'>
    <a class='sponsors-aside-text'>Tác giả</a>
    <VPTeamMembers :key="generateUniqueId()" size='small' :members='members' />
  </div>
</template>

<style>
.sponsors-aside-text {
  color: var(--vt-c-text-3);
  display: block;
  margin: 3em 0 1em;
  font-weight: 700;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}
</style>
