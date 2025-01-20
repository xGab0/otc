<script setup lang="ts">
import { onMounted, ref } from 'vue';

const { startDate, showSeconds } = defineProps<{startDate: Date, showSeconds: boolean;}>();

const formattedHours = ref<string>('');
const interval = ref<NodeJS.Timeout>();

// Funzione per calcolare la differenza in ore e minuti
const calculateTimeDifference = () => {
  const now = new Date();
  
  // Calcola la differenza in millisecondi
  const diffInMs = now.getTime() - startDate.getTime();
  
  // Converte la differenza in minuti e secondi
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  
  // Converte in ore, minuti e secondi
  const hours = Math.floor(diffInMinutes / 60);
  const minutes = diffInMinutes % 60;
  const seconds = diffInSeconds % 60;

  // Ritorna il formato `ore:minuti`, con zero davanti se necessario
  formattedHours.value = showSeconds
    ? `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    : `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    
};

onMounted(() => {
  calculateTimeDifference();
  interval.value = setInterval(calculateTimeDifference, 1000);
});

onUnmounted(() => {
  clearInterval(interval.value);
});
</script>

<template>
  <span>{{ formattedHours }}</span>
</template>