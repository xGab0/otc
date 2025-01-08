<script setup lang="ts">
import { onMounted, ref } from 'vue';
import IconChevron from './icons/IconChevron.vue'
import IconRhombus from './icons/shapes/IconRhombus.vue'
import IconSquare from './icons/shapes/IconSquare.vue'
onMounted(async () => {
})
</script>

<template>
  <div class="sidebar">
    <div class="section">
      <div class="header">
        <span>crm</span>
      </div>
      <div class="body">
        <div class="option">
          <IconRhombus/>
          <span>Persone</span>
        </div>

        <div class="option">
          <IconRhombus/>
          <span>Aziende</span>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="header">
        <span>ambiente tecnico</span>
      </div>
      <div class="body">
        <div class="option">
          <IconSquare/>
          <span>Moduli</span>
        </div>

        <div class="option">
          <IconSquare/>
          <span>Modelli</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  width: 20%;

  padding-left: 6px;

  display: flex;
  flex-direction: column;
  gap: 50px;

  .section {
    .header {
      span {
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        color: rgb(50, 50, 50);
      }
    }
    .body {
      .option {
        padding-top: 4px;
        padding-bottom: 4px;
        padding-left: 8px;
        display: flex;

        span {

        }
      }
    }
  }
}
</style>
