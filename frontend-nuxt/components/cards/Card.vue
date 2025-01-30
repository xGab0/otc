<script setup lang="ts">
interface Props {
  title: string,
  subtitle?: string
}

const { title, subtitle = '' } = defineProps<Props>();
</script>

<template>
  <div class="card">
    <div class="data">
      <div class="description">
        <span class="title">{{ title }}</span>
        <span class="subtitle">{{ subtitle }}</span>
      </div>
      <slot name="header"></slot>
    </div>
    <slot name="body"></slot>
  </div>
</template>

<style lang="scss" scoped>
.card {
  width: 100%;
  padding: .575rem .775rem .875rem .775rem;

  display: flex;
  flex-direction: column;
  gap: 20px;

  border-radius: 20px;
  //background-color: white;
  background-color: rgb(242, 242, 242);

  border: solid 1px rgb(234, 234, 234);
  box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 4px 0px;

  > .data {
    display: flex;
    justify-content: space-between;
    align-items: start;

    > .description {
      display: flex;
      flex-direction: column;

      > .title {
        font-size: 20px;
        font-weight: 500;
        color: rgb(71, 71, 71);
      }

      > .subtitle {
        font-size: 14px;
        font-weight: 400;
        color: rgb(114, 114, 114);
      }
    }
  }
}
</style>