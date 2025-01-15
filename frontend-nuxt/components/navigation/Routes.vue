<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const { routes, selectedPage } = defineProps({
  routes: { type: Array, required: true },
  selectedPage: { type: Number, required: true }
});

// Definire gli eventi che il componente emette
const emit = defineEmits<{
  (event: 'moveBubble', index: number): void;
}>();

function handleClick(index: number) {
  // Emetti l'evento 'moveBubble' con l'indice della route selezionata
  emit('moveBubble', index);
}
</script>

<template>
  <div class="routes">
    <span
      v-for="(route, index) in routes"
      :key="index"
      :class="{ selected: selectedPage === index }"
      @click="handleClick(index)"
    >
      {{ route.name }}
    </span>
  </div>
</template>

<style scoped lang="scss">
.routes {
  display: flex;
  gap: 20px;
}

span {
  cursor: pointer;
  padding: 8px 16px;
}

span.selected {
  font-weight: bold;
  color: blue;
}
</style>
