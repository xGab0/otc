<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { OdooConnection, OdooUser } from '../../../typescript/lib/wrapper';

const connection = ref<OdooConnection>();
const user = ref<OdooUser>();
const modelFields = ref<any>();

onMounted(async () => {
  console.log('connecting...');

  connection.value = await OdooConnection.connect('/odoo');
  user.value = await connection.value.login('odoo-otc-db', 'admin', 'admin');

  console.log('connected');

  modelFields.value = await user.value.searchModelFieldTypes('hr.attendance');
  console.log(modelFields.value);
  /*
  connection.value = await OdooConnection.connect('http://localhost:8070/jsonrpc');
  user.value = await connection.value.login('odoo-otc-db', 'admin', 'admin');

  console.log('connected...');

  const modelFieldsType = await user.searchModelFieldTypes('hr.attendance');
  console.log(modelFieldsType);
  */
})
</script>

<template>
  <div v-for="field in modelFields">
    {{field.string}}
  </div>
</template>

<style lang="scss" scoped>
</style>
