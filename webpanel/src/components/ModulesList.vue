<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { OdooConnection, OdooUser } from '../../../typescript/lib/wrapper';
import { OdooModule } from '../../../typescript/lib/module';

const connection = ref<OdooConnection>();
const user = ref<OdooUser>();

const models = ref<any>();
const modelFields = ref<any>();

onMounted(async () => {
  console.log('connecting...');

  connection.value = await OdooConnection.connect('/odoo');
  user.value = await connection.value.login('odoo-otc-db', 'admin', 'admin');

  console.log('connected');

  const modules = await user.value.getAllModules();
  console.log("Modules:");
  console.log(modules);

  /*
  const module: OdooModule = user.value.getModule('hr_attendance_geolocation');
  const moduleModels = await module.searchReadModels();
  console.log("Module models:");
  console.log(moduleModels);
  */

  models.value = await user.value.searchReadRecord('ir.model');
  modelFields.value = await user.value.searchModelFieldTypes('hr.attendance');

  //console.log(models.value);
})
</script>

<template>
  <div v-for="model in models">
    {{model.name}}
  </div>
</template>

<style lang="scss" scoped>
</style>
