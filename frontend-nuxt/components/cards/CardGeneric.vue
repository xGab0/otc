<script setup lang="ts">
const { message, value } = defineProps<{ message: string, value: any }>();
</script>

<template>
  <div class="card-generic">
    <span class="message">{{ message }}</span>
    <span class="value">{{ value }}</span>
  </div>
</template>

<style lang="scss" scoped>
.card-generic {
  width: fit-content;

  display: flex;
  flex-direction: column;
  gap: 2px;

  padding: 4px 10px 4px 10px;
  border-radius: 8px;

  text-align: center;
  background-color: rgb(245, 245, 245);
  box-shadow:
    rgba(0, 0, 0, 0.05) 0px 1px 2px 0px,
    inset 0px 0px 0px 2px rgba(0, 0, 0, 0.01);

  .message {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: .015rem;
  }

  .value {
    font-size: 18px;
    font-weight: 600;
  }
}
</style>