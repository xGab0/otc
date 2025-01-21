<script setup lang="ts">
import IconMail from '~/components/icons/IconMail.vue';
import IconPhone from '~/components/icons/IconPhone.vue';
import IconWork from '~/components/icons/IconWork.vue';
import CardTask from './CardTask.vue';
</script>

<template>
  <div class="card">
    <span class="title">Tasks</span>

    <div class="content">
      <CardTask v-for=" in 4" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  width: 300px;
  padding: 24px;

  display: flex;
  flex-direction: column;
  gap: 12px;

  border-radius: 32px;
  background-color: white;

  .title {
    font-size: 26px;
    font-weight: 400;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 6px;

    .element {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .key {
        font-size: 13px;
        font-weight: 400;
        color: rgb(82, 82, 82)
      }

      .value {
        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
          font-size: 16px;
          font-weight: 400;
        }
      }
    }
  }
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