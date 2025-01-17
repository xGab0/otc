<script setup lang="ts">
const router = useRouter();
const authStore = useAuthStore();

const username = ref<string>('');
const password = ref<string>('');
</script>

<template>
  <div class="h-dvh flex flex-col justify-center items-center gap-10">
    <div class="flex flex-col gap-2">
      <LogosLogoPrometika/>
      <LogosLogoPrometikaSlogan/>
    </div>

    <div class="card flex flex-col gap-10 p-7">
      <div class="flex flex-col gap-0">
        <div class="text-4xl font-bold">Login</div>
        <div class="text-lg text-gray-600 font-extralight">Inserisci i dati per l'autenticazione</div>
      </div>

      <form class="flex flex-col gap-4">
        <div class="flex flex-col gap-1">
          <label for="input-username" class="font-medium">Username</label>
          <input v-model="username" id="input-username" type="text" placeholder="compila"/>
        </div>

        <div class="flex flex-col gap-1">
          <label for="input-username" class="font-medium">Password</label>
          <input v-model="password" id="input-password" type="password" placeholder="compila">
        </div>
      </form>

      <div class="button text-center" @click="async () => await authStore.login('/odoo', 'odoo-otc-db', 'admin', 'admin')">
        login
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  border-radius: 12px;

  background-color: white;

  border: 1px solid #e5e7eb;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
}

.card-title {
  @apply text-2xl;
}

.card-description {
  @apply text-lg;
  color: rgb(113, 113, 113);
}

input {
  padding-top: .25rem;
  padding-bottom: .25rem;

  padding-left: .75rem;
  padding-right: .75rem;

  border: solid 1px hsl(240 5.9% 90%);
  border-radius: 0.4rem;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);

  outline: none;
}

.button {
  padding-top: .25rem;
  padding-bottom: .25rem;

  padding-left: .75rem;
  padding-right: .75rem;

  border-radius: 0.4rem;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);

  color: hsl(0 0% 98%);
  background-color: hsl(240 5.9% 10%);

  cursor: pointer;
}
</style>
