<script setup lang="ts">
import type { OdooField } from '~/hooks/odoo/fields';
import RecordSelector from './selectors/RecordSelector.vue';
import UsersDropdown from './dropdowns/UsersDropdown.vue';

const { fields } = defineProps<{ fields: OdooField[] }>();

const authStore = useAuthStore();

const employee = ref<string>();
const checkin = ref<string>();
const users = ref();
const dropdown = ref<boolean>(false);

onMounted(async () => {
  users.value = await authStore.odooUser!.searchReadRecord('res.users');

  console.log('RecordCreator | prop:fields');
  console.log(fields);

  console.log('RecordCreator | users');
  console.log(users.value);
});
</script>

<template>
  <div v-if="users" class="record creator">
    <span class="title">Nuovo record</span>

    <form>
      <div>
        <span>Users Dropdown</span>
        <UsersDropdown/>
      </div>

      <div>
        <span>Checkin</span>
        <input type="text" placeholder="checkin" readonly/>
      </div>

      <div>
        <span>Checkin Latitude</span>
        <input type="text" placeholder="checkin latitude" readonly/>
      </div>

      <div>
        <span>Checkin Longitude</span>
        <input type="text" placeholder="checkin longitude" readonly/>
      </div>
    </form>

    <span>Crea</span>
  </div>
</template>

<style lang="scss" scoped>
.record.creator {
  display: flex;
  flex-direction: column;
  gap: 30px;

  .title {
    font-size: 26px;
    font-weight: 600;
  }

  form {
    display: grid;
    grid-template-columns: repeat(max(2), auto);
    grid-template-rows: max(3);

    row-gap: 30px;
    column-gap: 30px;

    div {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    span {
      font-weight: 500;
    }
  }
}

.dropdown {
  position: absolute;

  display: flex;
  flex-direction: column;

  padding: 10px;
  background-color: white;
}
</style>