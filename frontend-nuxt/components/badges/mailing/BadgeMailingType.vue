<script setup lang="ts">
const { type } = defineProps<{type: 'sms' | 'mail'}>();
</script>

<template>
  <span :class="type === 'sms' ? 'sms' : 'mail'">{{ type }}</span>
</template>

<style scoped>
span {
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;

  padding-left: .375rem;
  padding-right: .375rem;
  padding-top: .125rem;
  padding-bottom: .125rem;

  border-radius: 6px;

  &.sms {
    color: rgb(0, 149, 149);
    background-color: rgba(0, 250, 250, 0.144);
  }

  &.mail {
    color: rgb(1, 107, 3);
    background-color: rgba(26, 255, 0, 0.144);
  }
}
</style>