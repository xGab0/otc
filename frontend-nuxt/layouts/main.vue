<script setup lang="ts">
import type { OdooUserData } from '~/hooks/odoo/data';

const userDataStore = useUserDataStore();
const userData = ref<OdooUserData>();

onMounted(async () => {
  await userDataStore.init();
  userData.value = userDataStore.userData;

  console.log('Home | userData');
  console.log(userData.value);
})
</script>

<template>
  <div class="flex flex-col separation">
    <div>
      <Header :userData/>
    </div>
    <div class="flex separation">
      <SideMenu />
      <slot/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.separation {
  gap: 1rem
}
</style>