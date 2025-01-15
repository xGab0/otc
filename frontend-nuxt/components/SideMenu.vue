<script setup lang="ts">
import IconUser from './icons/IconUser.vue';
import LogoPrometika from './icons/LogoPrometika.vue';
import IconRhombus from './icons/shapes/IconRhombus.vue';

const authStore = useAuthStore();

const users = ref();
const models = ref();
const views = ref();

onMounted(async () => {
  users.value = await authStore.odooUser!.searchReadRecord('res.users');
  models.value = await authStore.odooUser!.searchReadRecord('ir.model');
  views.value = await authStore.odooUser!.searchReadRecord('ir.ui.view');

  console.log('SideMenu | users');
  console.log(users.value);

  console.log('SideMenu | models');
  console.log(models.value);

  console.log('SideMenu | views');
  console.log(views.value);
})
</script>

<template>
  <div class="sidebar">
    <div class="section">
      <!--LogoPrometika/-->

      <div class="header">
        <span>generale</span>
      </div>

      <div class="body">
        <div class="element">
          <IconUser/>
          <span>utenti</span>
          <!--span v-for="user in users">{{ user.display_name }}</span-->
        </div>

        <div class="element">
          <IconUser/>
          <span>modelli</span>
        </div>

        <div class="element">
          <IconUser/>
          <span>presenze</span>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="header">
        <span>generale</span>
      </div>

      <div class="body">
        <div class="element">
          <IconRhombus/>
          <span>contatti</span>
        </div>

        <div class="element">
          <IconRhombus/>
          <span>aziende</span>
        </div>

        <div class="element">
          <IconRhombus/>
          <span>persone</span>
        </div>

        <div class="element">
          <IconRhombus/>
          <span>modelli</span>
        </div>

        <div class="element">
          <IconRhombus/>
          <span>presenze</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  margin-right: 24px;
  padding-left: 50px;
  padding-right: 50px;

  display: flex;
  flex-direction: column;
  gap: 100px;

  .section {
    display: flex;
    flex-direction: column;
    gap: 6px;

    .header {
      span {
        font-family: system-ui;
        font-size: 14px;
        font-weight: 600;
        color: rgb(76, 76, 76);
      }
    }

    .body {
      display: flex;
      flex-direction: column;

      .element {
        padding-right: 50px;
        padding-top: 8px;
        padding-bottom: 8px;

        border-radius: 8px;

        display: flex;
        align-items: center;
        gap: 6px;

        svg {
          width: 16px;
          height: 16px;
        }

        span {
          //font-family: Arial, Helvetica, sans-serif;
          font-size: 16px;
          font-weight: 500;
        }

        &:hover {
          background-color: white;
          box-shadow: 0px 2px 3px 0px rgb(229, 229, 229);

          cursor: pointer;
        }
      }
    }
  }
}
</style>