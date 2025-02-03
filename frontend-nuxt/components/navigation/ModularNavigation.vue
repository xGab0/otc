<script setup lang="ts">
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
  <nav class="navigation">
    <!-- Slot per il selector -->
    <div class="bubble">
      <slot ref="bubble" name="bubble" />
    </div>

    <!-- Slot per gli elementi -->
    <div class="elements">
      <slot name="elements">
        <!-- Contenuto di default per gli elementi (opzionale) -->
        <div class="default-element">Default Element</div>
      </slot>
    </div>
  </nav>
</template>

<style scoped>
.navigation {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.selector {
  /* Stili per il contenitore del selector */
  padding: 0.5rem;
  border: 1px solid #ccc;
}

.elements {
  /* Stili per il contenitore degli elementi (es. layout a griglia) */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(32px, 1fr));
  gap: 0.5rem;
}
</style>
