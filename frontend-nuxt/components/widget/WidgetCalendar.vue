<script setup lang="ts">
import type { HrAttendance } from '~/hooks/hr';
import IconChevronLeft from '../icons/chevron/IconChevronLeft.vue';
import IconChevronRight from '../icons/chevron/IconChevronRight.vue';
import type { Locale } from '../cards/CardCalendar.vue';

const { attendances, lang } = defineProps<{
  attendances: HrAttendance[],
  lang: Locale,
}>();

const emit = defineEmits<{
  daySelected: [date: Date, index: number]
}>()


const generateMonths = (yearIndex: number): Date[] => {
  const dates: Date[] = [];

  for (let i = 0; i < 12; i++) {
    dates.push(new Date(yearIndex, i));
  }

  return dates;
}

const months = ref<Date[]>(generateMonths(2025));
const monthIndex = ref<number>(0);
const month = computed(() => months.value[monthIndex.value]);
const monthName = computed(() => month.value.toLocaleDateString('it-IT', { month: 'short' }))

const prevMonth = () => {
  return monthIndex.value == 0 ? 11 : monthIndex.value--;
}

const nextMonth = () => {
  return monthIndex.value == 11 ? 0 : monthIndex.value++;
}

watch(months, (newMonths, oldMonths) => {
  console.log('Months cambiato', oldMonths, newMonths)
})

onUpdated(() => {
  console.log('WidgetCalendar | Componente aggiornato');
})
</script>

<template>
  <div class="carousel-months">
    <span>{{ monthName }} 2025</span>
    <div class="flex">
      <div class="selector">
        <IconChevronLeft :width="18" :height="18" @mousedown="prevMonth" />
      </div>

      <div class="selector">
        <IconChevronRight :width="18" :height="18" @mousedown="nextMonth" />
      </div>
    </div>
  </div>

  <div class="carousel-days">
    <GridCalendar
      :attendances
      lang="it-IT"
      :year-index="2025"
      :month-index="monthIndex"
      @day-selected="(date, index) => emit('daySelected', date, index)"
    />
  </div>
</template>

<style lang="scss" scoped>
.carousel-months {
  display: flex;
  justify-content: space-between;
  align-items: center;

  text-transform: capitalize;

  .selector {
    &:hover {
      border-radius: 6px;
      outline: solid 1px rgb(199, 199, 199);

      cursor: pointer;
    }
  }

  > span {
    font-size: 18px;
    font-weight: 400;
  }
}
</style>
