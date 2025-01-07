<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { OdooConnection, OdooUser } from '../../../typescript/lib/wrapper';

const connection = ref<OdooConnection>();
const user = ref<OdooUser>();

onMounted(async () => {
  console.log('connecting...');

  connection.value = await OdooConnection.connect('/odoo');
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
  <div>prova</div>
</template>

<style lang="scss" scoped>
</style>
