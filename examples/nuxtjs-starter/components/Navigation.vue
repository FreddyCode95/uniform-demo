<script lang="ts" setup>
export interface NavLink {
  title: string;
  url: string;
}
export interface Props {
  navLinks: Array<NavLink>;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="navigation">
    <span v-for="({ url, title }, i) in navLinks">
      <NuxtLink :key="url" :href="url">{{ title }}</NuxtLink>
    </span>
  </div>
</template>

<style scoped>
.navigation {
  padding: 2rem 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.navigation span {
  padding-left: 2rem;
}

.note {
  font-size: 1rem;
  font-style: italic;
}
</style>
