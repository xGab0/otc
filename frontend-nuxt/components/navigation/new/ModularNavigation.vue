<script setup lang="ts">
const { pages } = defineProps<{ pages: string[] }>();

const emit = defineEmits<{
  selected: [page: string, index: number]
}>()

const bubble = ref<HTMLElement>();
const selectedIndex = ref<number>(0);
const selectedSpan = ref<HTMLElement | null>(null);

// Funzione per spostare solo orizzontalmente il bubble
const moveBubble = (event: MouseEvent) => {
  if (bubble.value && event.target instanceof HTMLElement) {
    const span = event.target as HTMLElement;

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
  }
}
</script>

<template>
  <div class="navigation">
    <div ref="bubble" class="bubble"/>

    <span v-for="(page, index) in pages"
      @click="(event) => {
        selectedIndex = index;
        emit('selected', page, index);
        moveBubble(event);
      }"
      :class="{ 'selected': index === selectedIndex}"
    >
      {{ page }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.navigation {
  position: relative;
  width: fit-content;

  padding: 4px;
  display: flex;
  gap: 10px;

  border-radius: 14px;
  //background-color: rgb(244, 244, 244);

  border: solid 1px rgb(236, 236, 236);
  box-shadow: inset rgba(0, 0, 0, 0.1) 0px 0px 10px;

  .bubble {
    position: absolute;
    z-index: 1;
    
    width: 30px;
    height: 30px;

    border-radius: 10px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 4px;

    transition: left 0.1s ease;
  }

  span {
    z-index: 2;

    padding-left: 8px;
    padding-right: 8px;
    padding-top: 8px;
    padding-bottom: 8px;

    font-size: 13px;
    font-weight: 600;

    cursor: pointer;
  }
}
</style>