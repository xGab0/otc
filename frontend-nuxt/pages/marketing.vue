<script setup lang="ts">
import IconPlus from '~/components/icons/IconPlus.vue';
import ModularNavigation from '~/components/navigation/new/ModularNavigation.vue';
import Marketing from '~/layouts/marketing.vue';

definePageMeta({
  middleware: 'auth',
  layout: 'main'
});

const router = useRouter();
</script>

<template>
  <Marketing>
    <NuxtPage />
  </Marketing>
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
        width: 25%;

        span {
          font-size: 26px;
          font-weight: 500;
        }
      }

      &.navigation {
        width: 50%;
        justify-content: center;
      }

      &.controls {
        width: 25%;
        justify-content: right;
      }
    }
  }
}
</style>