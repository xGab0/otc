<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';

const formattedDate = ref<string>('');
const interval = ref<NodeJS.Timeout>();

const updateFormattedDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  formattedDate.value = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

onMounted(() => {
  updateFormattedDate();
  interval.value = setInterval(updateFormattedDate, 1000);
});

onUnmounted(() => {
  clearInterval(interval.value);
});
</script>

<template>
  {{ formattedDate }}
</template>