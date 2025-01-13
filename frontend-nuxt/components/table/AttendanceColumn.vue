<script setup lang="ts">
interface Props {
  name: string,
  data: any[]
}
const { name, data } = defineProps<Props>();
</script>

<template>
  <div class="column">
    <div class="header">
      <span>{{name}}</span>
    </div>

    <div class="rows">
      <div class="row" v-for="(item, index) in data">
        <span>{{ item }}</span>
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
      align-items: center;

      //border-bottom: solid 2px black;
    }
  }
}
</style>
