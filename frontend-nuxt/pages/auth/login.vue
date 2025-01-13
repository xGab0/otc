<script setup lang="ts">
const router = useRouter();
const authStore = useAuthStore();
</script>

<template>
  <div>
    <div>
      <div>
        <label for="input-username">insert username</label>
        <input id="input-username" type="text" placeholder="username"/>
      </div>

      <div>
        <label for="input-username">insert password</label>
        <input id="input-password" type="password" placeholder="password">
      </div>
    </div>

    <div @click="async () => await authStore.login('/odoo', 'odoo-otc-db', 'admin', 'admin')">
      login
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
