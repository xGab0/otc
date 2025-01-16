<script setup lang="ts">
import type { OdooRecordSyntax } from '~/hooks/odoo/wrapper';

//const { records } = defineProps<{ records: OdooRecordSyntax }>();

const records = ref<any>([
  {
    display_name: 'ciao'
  },
  {
    display_name: 'come'
  },
  {
    display_name: 'stai'
  }
]);
const selected = ref<OdooRecordSyntax>();
const dropdown = ref<boolean>(false);

onMounted(() => {
  //selected.value = records[0];
})
</script>

<template>
  <div class="record selector">
    <button
      @focusin="() => { dropdown = true }"
      @focusout="() => { dropdown = false }"
    >
      seleziona
    </button>

    <div v-if="dropdown" class="dropdown">
      <span v-for="record in records" @click="() => { selected = record }">
        {{ record.display_name }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.record.selector {
}

.dropdown {
  position: absolute;

  display: flex;
  flex-direction: column;

  padding: 10px;
  background-color: white;
}
</style>