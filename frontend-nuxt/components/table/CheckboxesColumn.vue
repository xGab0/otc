<script setup lang="ts">
interface Props {
  length: number
}
const { length } = defineProps<Props>();
</script>

<template>
  <div class="column">
    <div class="header">
      <span>.</span>
    </div>

    <div class="rows">
      <div class="row" v-for="index in length">
        <input type="checkbox"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.column {
  display: flex;
  flex-direction: column;
  gap: 16px;

  .header {

  }

  .rows {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .row {
        min-height: 20px;

        display: flex;
        align-items: center;
    }
  }
}
</style>
