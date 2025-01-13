<script setup lang="ts">
</script>

<template>
  <div class="filter-container">
    <div class="filter" v-for=" in 3">
      <div class="key">
        key
      </div>

      <div class="operator">
        operator
      </div>

      <div class="value">
        value
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filter-container {
  .filter {
    width: fit-content;

    padding-left: 12px;
    padding-right: 12px;
    padding-top: 4px;
    padding-bottom: 4px;


    display: flex;
    align-items: center;
    gap: 8px;

    border-radius: 12px;
    background-color: rgb(244, 244, 244);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

    .operator {
      padding-top: 4px;
      padding-bottom: 4px;

      padding-left: 6px;
      padding-right: 6px;
      border-radius: 8px;

      background-color: white;
      box-shadow: 0px 0px 2px 1px rgb(224, 224, 224);
    }
  }
}
</style>