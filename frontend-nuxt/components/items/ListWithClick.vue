<script setup lang="ts">
/*
  Definiamo la prop "items" che contiene la lista degli elementi.
  Qui usiamo TypeScript, ma puoi omettere il tipo se non ti serve.
*/
const props = defineProps<{
  items: any[]
}>()

/*
  Possiamo anche definire degli eventi, ad esempio per notificare il click su un elemento.
*/
const emit = defineEmits<{
  (e: 'item-click', item: any): void
}>()

/*
  Funzione che gestisce il click su un elemento.
  Puoi aggiungere qui la logica di gestione interna al componente.
*/
function handleClick(item: any) {
  console.log('Elemento cliccato:', item)
  // Emette l'evento 'item-click' verso il componente padre (se necessario)
  emit('item-click', item)
}
</script>

<template>
  <div class="dropdown">
    <!-- Iteriamo sugli elementi -->
    <!-- Utilizziamo uno slot scoped per consentire al chiamante di definire il template dell'elemento -->
    <slot v-for="(item, index) in items" name="item" :item :index></slot>
  </div>
</template>

<style lang="scss" scoped>
.dropdown {
  overflow-y: auto;
  max-height: 140px;

  display: flex;
  flex-direction: column;

  scrollbar-color: rgb(181, 181, 181) transparent;
  scrollbar-width: auto;
}</style>