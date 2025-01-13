<script setup lang="ts">
import IconExport from '../icons/IconExport.vue';
import IconTrash from '../icons/IconTrash.vue';

</script>

<template>
  <div class="button">
    <IconExport/>
    <span>Sort</span>
  </div>
</template>

<style lang="scss" scoped>
.button {
  width: fit-content;

  padding-top: 4px;
  padding-left: 8px;
  padding-right: 8px;
  padding-bottom: 4px;

  border-radius: 12px;
  border: dashed 2px rgb(222, 222, 222);

  display: flex;
  align-items: center;
  gap: 6px;

  span {
    font-size: 13px;
    font-weight: 500;
    //color: darkcyan
  }
}
</style>
