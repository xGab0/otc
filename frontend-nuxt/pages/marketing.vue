<script setup lang="ts">
import IconPlus from '~/components/icons/IconPlus.vue';
import ModularNavigation from '~/components/navigation/new/ModularNavigation.vue';

const router = useRouter();
</script>

<template>
  <div class="sos">
    <div class="header">
      <div class="section title">
        <span>Marketing</span>
      </div>

      <div class="section navigation">
        <ModularNavigation :pages="['dashboard', 'plans', 'groups', 'campaigns']" @selected="(page, index) => {
          router.push(`/marketing/${page}`)
        }"/>
      </div>

      <div class="section controls">
        <IconPlus />
      </div>
    </div>

    <NuxtPage />
  </div>
</template>

<style lang="scss" scoped>
.sos {
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 20px;

  padding: .875rem;
  border-radius: 24px;
  //background-color: rgb(242, 242, 242);
  background-color: white;

  > .header {
    display: flex;
    justify-content: space-between;

    > .section {
      display: flex;
      align-items: center;

      &.title {
        width: 20%;

        span {
          font-size: 26px;
          font-weight: 500;
        }
      }

      &.navigation {
        width: 60%;
        justify-content: center;
      }

      &.controls {
        width: 20%;
        justify-content: right;
      }
    }
  }
}
</style>