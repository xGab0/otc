<script setup lang="ts">
import CardAttendances from '~/components/cards/CardAttendances.vue';
import CardContact from '~/components/cards/CardContacts.vue';
import CardTasks from '~/components/cards/CardTasks.vue';
import type { OdooUserData } from '~/hooks/odoo/data';
import ViewContacts from '~/views/ViewContacts.vue';

definePageMeta({
  middleware: 'auth',
  layout: 'main',
  /*pageTransition: {
    name: 'rotate'
  }*/
});

const router = useRouter();
const authStore = useAuthStore();
const userDataStore = useUserDataStore();
const userData = ref<OdooUserData>();

onMounted(async () => {
  await userDataStore.init();
  userData.value = userDataStore.userData;

  console.log('Home | userData');
  console.log(userData.value);

  const tasks = await authStore.odooUser!.searchReadRecord('project.task');

  console.log('Home | tasks');
  console.log(tasks);
})
</script>

<template>
  <div class="cards" v-if="userData">
    <ViewContacts :userData="userData!"/>
    <CardAttendances/>
    <CardTasks/>
  </div>
</template>

<style lang="scss" scoped>
.cards {
  display: flex;
  grid-template-columns: auto auto auto auto;
  gap: 12px;
}

.separator {
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.102);
}

svg {
  height: 22px
}
</style>