<script setup lang="ts">
import type { HrAttendance } from '~/hooks/hr';

const { attendance } = defineProps<{attendance: HrAttendance }>();

function formatTime(decimalTime: number) {
  const hours = Math.floor(decimalTime); // Prendi la parte intera (ore)
  const minutes = Math.round((decimalTime - hours) * 60); // Moltiplica la parte decimale per 60 per ottenere i minuti

  // Aggiungi uno zero davanti ai minuti se sono inferiori a 10
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}
</script>

<template>
  <div class="card-shift">
    <div class="element">
      <span class="key">Check In</span>
      <span class="value">{{ attendance.check_in.split(' ')[1] }}</span>
    </div>

    <div class="element">
      <span class="key">Check Out</span>
      <span class="value">{{ attendance.check_out.split(' ')[1] }}</span>
    </div>

    <div class="element">
      <span class="key">Hours</span>
      <span class="value">{{ formatTime(attendance.worked_hours )}}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-shift {
  display: flex;
  justify-content: space-between;
  gap: 16px;

  padding: 6px 12px 6px 12px;
  border-radius: 16px;
  background-color: rgb(235, 241, 254);

  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;

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