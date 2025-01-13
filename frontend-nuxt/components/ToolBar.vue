<script setup lang="ts">
import IconExport from './icons/IconExport.vue';
import IconTrash from './icons/IconTrash.vue';

</script>

<template>
  <div class="toolbar">
    <div class="element">
      <span>3 of 200 selected</span>
    </div>

    <div class="element">
      <IconExport/>
      <span>export</span>
    </div>

    <div class="element">
      <IconTrash/>
      <span>delete</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.toolbar {
  width: fit-content;

  padding-left: 4px;
  padding-right: 4px;
  padding-top: 4px;
  padding-bottom: 4px;

  display: flex;
  align-items: center;
  gap: 10px;

  border-radius: 12px;
  //border: solid 1px rgb(228, 228, 228);
  box-shadow: inset rgb(230, 230, 230) 0px -2px 0px 0px, rgb(234, 234, 234) 0px 2px 6px 1px;

  /*
  box-shadow: 
    rgba(50, 50, 93, 0.1) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px,
    inset rgba(82, 82, 82, 0.1) 1px 3px 1px -2px;
    */
  
  .element {
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 6px;
    padding-bottom: 6px;

    display: flex;
    align-items: center;

    border-radius: 8px;

    span {
      font-size: 16px;
    }

    &:hover {
      cursor: pointer;
      background-color: rgb(242, 242, 242);
    }
  }
}
</style>