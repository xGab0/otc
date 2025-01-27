<script setup lang="ts">
const { type, name } = defineProps<{type: 'sms' | 'mail', name: string}>();
</script>

<template>
  <span :class="type === 'sms' ? 'sms' : 'mail'">{{ name }}</span>
</template>

<style scoped>
span {
  font-size: 16px;
  font-weight: 500;
  text-transform: capitalize;

  &.sms {
    color: rgb(0, 88, 88);
  }

  &.mail {
    color: rgb(1, 76, 2);
  }
}
</style>