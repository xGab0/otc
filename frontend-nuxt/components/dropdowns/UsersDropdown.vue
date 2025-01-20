<script setup lang="ts">
import type { OdooUserData } from '~/hooks/odoo/data';
import DropdownRadio from './DropdownRadio.vue';

//const elements = defineProps<{elements: any[]}>();
const authStore = useAuthStore();

const users = ref<OdooUserData[]>([]);

const emit = defineEmits<{
  userSelected: [user: OdooUserData, index: number]
}>()

const onOpenDropdown = () => {
  console.log('dropdown opened');
}

const onCloseDropdown = (reason: string) => {
  console.log('dropdown closed: ' + reason);
}

const onElementSelected = (element: any, index: number) => {
  emit('userSelected', element, index);
  console.log('UsersDropdown | selected element: ' + element.display_name);
}

onMounted(async () => {
  users.value = await authStore.odooUser!.searchReadRecord('res.users');
})
</script>

<template>
  <div class="dropdown radio users">
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
.dropdown.radio.users {
  &.radio {
    &.users {
      padding: 8px;
      border-radius: 8px;

      border: solid 1px rgb(224, 224, 224);
      box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
    }
  }
}
</style>