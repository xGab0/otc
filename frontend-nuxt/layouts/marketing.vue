<script setup lang="ts">
import IconPlus from '~/components/icons/IconPlus.vue';
import ModularNavigation from '~/components/navigation/new/ModularNavigation.vue';

const router = useRouter();
</script>

<template>
  <div class="sos">
    <div class="header">
      <div class="section title">
        <!--span>Marketing {{ router.currentRoute.value.path.split('/')[2] }}</span-->
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

    <slot/>
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
        width: 25%;

        span {
          font-size: 28px;
          font-weight: 600;
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