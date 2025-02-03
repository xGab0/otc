<script setup lang="ts">
const { elements, selectedElements } = defineProps<{elements: any[], selectedElements: any[]}>();

const buttonRef = ref<HTMLElement>();
const dropdownRef = ref<HTMLElement>(); 

const show = ref<boolean>(false);
const selected = ref<any[]>();

const filteredElements = computed(() => {
  return elements.filter(item => !selectedElements.includes(item));
});


const emit = defineEmits<{
  selectElement: [element: any, index: number]
  openDropdown: []
  closeDropdown: [reason: string]
}>()

const handleFocusOut = (event: FocusEvent) => {
  console.log('DropdownRadio | handleFocusOut: called');
  console.log(event.relatedTarget)

  // Verifica se il focus si sposta dentro il bottone o il dropdown
  if (
    (buttonRef.value && buttonRef.value.contains(event.relatedTarget as Node)) || 
    (dropdownRef.value && dropdownRef.value.contains(event.relatedTarget as Node))
  ) {
    // Se il focus è dentro il bottone o il dropdown, non fare nulla
    event.stopImmediatePropagation();
    console.log('DropdownRadio | handleFocusOut: cancelled');

    return; // Esci dalla funzione senza nascondere il dropdown
  }

  // Se il focus è uscito sia dal bottone che dal dropdown, nascondi il dropdown
  show.value = false;
  console.log('DropdownRadio | handleFocusOut: hide');
};

// Funzione per chiudere il dropdown se clicchi fuori
const handleDocumentClick = (event: MouseEvent) => {
  if (
    buttonRef.value && !buttonRef.value.contains(event.target as Node) &&
    dropdownRef.value && !dropdownRef.value.contains(event.target as Node)
  ) {
    show.value = false; // Nascondi il dropdown se clicchi fuori
    emit('closeDropdown', 'focusout');
    console.log('DropdownRadio | handleDocumentClick: hide');
  }
};

const initEvent = () => {
  if (show.value) return;

  document.addEventListener('click', handleDocumentClick);
  show.value = true;

  emit('openDropdown');
}

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick);
})
</script>

<template>
  <div class="jesus">
    <div
      ref="buttonRef"
      @mousedown="() => { initEvent() }"
    >
      add elements
    </div>

    <div v-if="show" ref="dropdownRef" class="dropdown multiselector" @click.stop>
      <ul>
        <li v-for="item in items">
          <slot name="item" v-bind="item"></slot>
        </li>
      </ul>

      <!--span v-for="(element, index) in filteredElements"
        @mousedown="() => {
          selected = element;
          show = false;

          emit('closeDropdown', 'section');
          emit('selectElement', element, index);
        }"
      >
        {{ element.display_name }}
      </span-->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.jesus {
  position: relative;
}
.dropdown.multiselector {
  position: absolute;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 12px;

  background-color: white;
}
</style>