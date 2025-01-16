<script setup lang="ts">
import type { OdooUserData } from '~/hooks/odoo/data';
import DropdownRadio from './DropdownRadio.vue';

//const elements = defineProps<{elements: any[]}>();
const authStore = useAuthStore();

const users = ref<OdooUserData[]>();

const onOpenDropdown = () => {
  console.log('dropdown opened');
}

const onCloseDropdown = (reason: string) => {
  console.log('dropdown closed: ' + reason);
}

const onElementSelected = (element: any, index: number) => {
  console.log('selected element: ' + element.display_name);
}

onMounted(async () => {
  users.value = await authStore.odooUser!.searchReadRecord('res.users');
})
</script>

<template>
  <div>
    <DropdownRadio
      v-if="users"
      :elements="users"
      @open-dropdown="onOpenDropdown"
      @close-dropdown="onCloseDropdown"
      @select-element="onElementSelected"
    />
  </div>
</template>

<style lang="scss" scoped>
.dropdown.radio {

}
</style>