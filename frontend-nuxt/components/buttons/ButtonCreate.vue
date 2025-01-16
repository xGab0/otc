<script setup lang="ts">
import IconPlus from '../icons/IconPlus.vue';
import IconTrash from '../icons/IconTrash.vue';

</script>

<template>
  <div class="button">
    <IconPlus/>
    <span>New Record</span>
  </div>
</template>

<style lang="scss" scoped>
.button {
  width: fit-content;

  padding-top: 4px;
  padding-left: 8px;
  padding-right: 12px;
  padding-bottom: 4px;

  border-radius: 12px;

  display: flex;
  align-items: center;
  gap: 6px;
  background-color: rgb(225, 255, 231);

  span {
    font-size: 13px;
    font-weight: 500;
    color: rgb(56, 103, 60)
  }
}
</style>
