<script setup lang="ts">
import IconChevronLeft from '../icons/chevron/IconChevronLeft.vue';
import IconChevronRight from '../icons/chevron/IconChevronRight.vue';

const generateMonths = (yearIndex: number): Date[] => {
  const dates: Date[] = [];

  for (let i = 0; i < 12; i++) {
    dates.push(new Date(yearIndex, i));
  }

  return dates;
}

const months = ref<Date[]>(generateMonths(2025));
const monthIndex = ref<number>(0);

const prevMonth = () => {
  return monthIndex.value == 0 ? 11 : monthIndex.value--;
}

const nextMonth = () => {
  return monthIndex.value == 11 ? 0 : monthIndex.value++;
}

const monthName = computed(() => months.value[monthIndex.value].toLocaleDateString('it-IT', { month: 'short' }))
</script>

<template>
  <div class="carousel-months">
    <span>{{ monthName }} 2025</span>
    <div class="flex">
      <IconChevronLeft :width="18" :height="18" @mousedown="prevMonth"/>
      <IconChevronRight :width="18" :height="18" @mousedown="nextMonth"/>
    </div>
  </div>

  <div class="carousel-days">
    <GridCalendar :attendances="[]" lang="it-IT" :year-index="2025" :month-index="monthIndex" :month-date="new Date()" />
  </div>
</template>

<style lang="scss" scoped>
  .carousel-months {
    display: flex;
    justify-content: space-between;
    align-items: center;

    > span {
      font-size: 18px;
      font-weight: 400;
    }
  }
</style>