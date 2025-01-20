<script setup lang="ts">
const { collapsed } = defineProps<{
  collapsed: boolean
}>()
</script>

<template>
  <div class="dropdown-list" :class="{ show: collapsed }">
    <div>
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.dropdown-list {
  display: grid;
  grid-template-columns: 0fr;
  grid-template-rows: 0fr;
  opacity: 0;

  transition: .2s ease-in-out;
  transition: opacity .01 ease-out;

  > div {
    overflow: hidden;
  }

  &.show {
    opacity: 1;
  }
}
.dropdown-list.show {
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}
</style>