<script setup lang="ts">
import { ref, defineProps } from 'vue';
import Routes from './Routes.vue';

const { selectedPage, routes, pages } = defineProps({
  selectedPage: { type: Number, required: true },
  routes: { type: Array, required: true },
  pages: { type: Array, required: true }
});

const bubble = ref<HTMLElement | null>(null); // Riferimento al bubble

// Funzione per spostare il bubble
function moveBubble(index: number) {
  if (bubble.value) {
    const span = document.querySelectorAll('span')[index];

    // Ottieni la posizione dell'elemento in relazione al suo parent
    const rect = span.getBoundingClientRect();
    const parentRect = (span.parentElement as HTMLElement).getBoundingClientRect();

    // Calcola il margine sinistro rispetto al parent
    const marginLeft = rect.left - parentRect.left;

    // Posiziona il bubble in base alla posizione calcolata
    bubble.value.style.left = `${marginLeft}px`;

    // Imposta la dimensione del bubble in base alla dimensione dello span
    bubble.value.style.width = `${rect.width}px`;
    bubble.value.style.height = `${rect.height}px`;

    emit('pageChanged', index);
  }
}


// Definire gli eventi che il componente emette
const emit = defineEmits<{
  (event: 'pageChanged', index: number): void;
}>();

</script>

<template>
  <div class="navigation">
    <div ref="bubble" class="bubble"/>
    <Routes :routes="routes" @moveBubble="moveBubble" :selectedPage="selectedPage"/>
    <div class="pages">
      <slot :name="'page-' + selectedPage" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.navigation {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bubble {
  position: absolute;
  background-color: aqua;
  width: 30px;
  height: 30px;
  transition: left 0.3s ease;
}

.routes {
  display: flex;
  gap: 50px;
}

.pages {
  margin-top: 20px;
}
</style>
