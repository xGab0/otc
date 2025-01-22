<script setup lang="ts">
import type { Locale } from './CardCalendar.vue';

const { index, lang, date, selected } = defineProps<{ index: number, lang: Locale, date: Date, selected: boolean }>();
const emits = defineEmits<{
  daySelected: [date: Date, index: number]
}>();

// Formatta la data per visualizzarla in un formato leggibile
const dayName = computed(() => date.toLocaleDateString(lang, { weekday: 'short' }));
const dayIndex = computed(() => date.toLocaleDateString(lang, { day: 'numeric' }));

const isWeekend = computed(() => date.getDay() === 0 || date.getDay() === 6) // 0 = domenica, 6 = sabato

</script>

<template>
  <div
    class="card-calendar-day"
    :class="{ 'selected': selected, 'weekend': isWeekend }"
    @mousedown="() => { if (!isWeekend) { emits('daySelected', date, index) } }"
  >
    <span class="day-name">{{ dayName }}</span>
    <span class="day-index">{{ dayIndex }}</span>
  </div>
</template>

<style lang="scss" scoped>
.card-calendar-day {
  padding: 4px 8px 4px 8px;
  border-radius: 12px;

  display: flex;
  flex-direction: column;
  gap: 4px;

  transition: all 0.3s ease-in-out;

  &.selected {
    box-shadow:
      rgba(149, 157, 165, 0.2) 0px 2px 6px,
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

    transform: scale(1.1);
  }

  &.weekend {
    .day-name {
      color: rgb(210, 90, 90);
    }

    .day-index {
      color: darkred;
    }
  }

  &:hover:not(.weekend):not(.selected) {
    background-color: rgb(250, 250, 250);
    cursor: pointer;
  }

  .day-name {
    font-size: 11px;
    font-weight: 600;
    text-align: center;
    letter-spacing: .045rem;
    color: rgb(96, 96, 96);
  }

  .day-index {
    font-size: 16px;
    font-weight: 400;
    text-align: center;
  }
}
</style>