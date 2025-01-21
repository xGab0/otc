<script setup lang="ts">
import IconChevronLeft from '../icons/chevron/IconChevronLeft.vue';
import IconChevronRight from '../icons/chevron/IconChevronRight.vue';
import IconChevron from '../icons/IconChevron.vue';

const { date, selected } = defineProps<{ date: Date, selected: boolean }>();

// Formatta la data per visualizzarla in un formato leggibile
const formattedDayName = date.toLocaleDateString('it-IT', { weekday: 'short' });
const formattedDayIndex = date.toLocaleDateString('it-IT', { day: 'numeric' });
</script>

<template>
  <div class="card-calendar-day" :class="{ 'selected': selected}">
    <span class="day-name">{{ formattedDayName }}</span>
    <span class="day-index">{{ formattedDayIndex }}</span>
  </div>
</template>

<style lang="scss" scoped>
.card-calendar-day {
  padding: 4px 8px 4px 8px;
  border-radius: 12px;

  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  gap: 4px;

  &.selected {
    box-shadow:
      rgba(149, 157, 165, 0.2) 0px 8px 24px,
      inset 0px 0px 0px 1px rgba(0, 0, 0, 0.03);

      .day-name {
        font-size: 12px;
        font-weight: 500;
        text-align: center;
        color: rgb(54, 88, 114);
      }

      .day-index {
        font-size: 17px;
        font-weight: 400;
        text-align: center;
        color: rgb(41, 81, 112);
      }
  }

  .day-name {
    font-size: 11px;
    font-weight: 500;
    text-align: center;
    color: rgb(96, 96, 96);
  }

  .day-index {
    font-size: 16px;
    font-weight: 400;
    text-align: center;
  }
}
</style>