<script setup lang="ts">
import type { OdooUserData } from '~/hooks/odoo/data';
import LogoPrometika from './logos/LogoPrometika.vue';
import LogoPrometikaSlogan from './logos/LogoPrometikaSlogan.vue';

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
    <div class="logo">
      <LogoPrometika/>
      <LogoPrometikaSlogan/>
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
  display: flex;
  justify-content: space-between;

  .logo {
    height: 50px;
    display: flex;
    flex-direction: column;
    gap: 10px;
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