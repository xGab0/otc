<script setup lang="ts">
import BadgeDynamic from '../badges/BadgeDynamic.vue';

</script>

<template>
  <!--BadgeDynamic name="max priority" :color="{r: 255, g: 240, b: 240}" /-->
  <div class="card-task">
    <div class="header">
      <span class="key">Complete the new frontend</span>
      <div class="tags">
        <span>max priority</span>
        <span>breaking</span>
      </div>
    </div>
    

    <div class="element">
      <span class="key">Checkin</span>
      <span class="value">10:47:32</span>
    </div>

    <div class="element">
      <span class="key">Checkin</span>
      <span class="value">10:47:32</span>
    </div>

    <div class="element">
      <span class="key">Hours</span>
      <span class="value">1:32</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-task {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;

  padding: 6px 12px 6px 12px;
  border-radius: 16px;
  background-color: rgb(235, 241, 254);

  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;

  .header {
    span {
      font-size: 18px;
      font-weight: 500;
    }

    .tags {
      display: flex;
      gap: 4px;

      span {
        padding: 0 4px 0 4px;
        border-radius: 6px;

        font-size: 11px;
        font-weight: 500;
        letter-spacing: .02rem;
        color: rgb(110, 19, 5);

        background-color: rgb(255, 223, 218);
      }
    }
  }

  .element {
    display: flex;
    flex-direction: column;

    .key {
      font-size: 13px;
      font-weight: 300;
      color: rgb(82, 82, 82)
    }

    .value {
      font-size: 14px;
      font-weight: 400;
    }
  }
}
</style>