<script setup lang="ts">
import type { OdooUserData } from '~/hooks/odoo/data';
import LogoPrometika from './logos/LogoPrometika.vue';
import LogoPrometikaSlogan from './logos/LogoPrometikaSlogan.vue';
import IconGrid from './icons/IconGrid.vue';

const { userData } = defineProps<{userData: OdooUserData | undefined}>();

const avatarBase64 = ref<string>('');

onMounted(() => {
  if (userData !== undefined) {
    avatarBase64.value = `data:image/png;base64,${userData.avatar_128}`;
  }
})
</script>

<template>
  <div class="header">
    <div class="brand">
      <IconGrid :width="26" :height="26"/>
      <div class="logo">
        <LogoPrometika style="height: 18px"/>
        <!--LogoPrometikaSlogan style="height: 6px"/-->
      </div>
    </div>

    <div class="profile">
      <span>{{ userData?.display_name }}</span>
      <AvatarPlaceholder v-if="!avatarBase64" name="Gabriele"/>
      <!--img :src="avatarBase64" alt="Avatar utente" /-->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  //padding: 12px;

  display: flex;
  justify-content: space-between;

  border-radius: 16px;
  //background-color: white;

  .brand {
    display: flex;
    align-items: center;
    gap: 6px;

    .logo {
      //height: 30px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }

  .profile {
    display: flex;
    align-items: center;
    gap: 16px;

    span {
      font-size: 16px;
      font-weight: 600;
    }
  }
}
</style>
