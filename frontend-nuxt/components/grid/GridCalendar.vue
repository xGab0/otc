<script setup lang="ts">
import type { HrAttendance } from '~/hooks/hr';
import type { Locale } from '../cards/CardCalendar.vue';

export type WeekdayNames = [string, string, string, string, string, string, string];
export type CalendarPageDays = [
  prevMonthDays: Date[],
  currentMonthDays: Date[],
  nextMonthDays: Date[]
];

const { attendances, lang, yearIndex, monthIndex } = defineProps<{
  attendances: HrAttendance[],
  lang: Locale,
  yearIndex: number,
  monthIndex: number
}>();

const emit = defineEmits<{
  daySelected: [date: Date, index: number]
}>()

const isWeekend = (date: Date): boolean => { return date.getDay() === 0 || date.getDay() === 6 }

const generateMonthDays = (yearIndex: number, monthIndex: number, rows: number = 6, cols: number = 7): CalendarPageDays => {
  const startDay = new Date(yearIndex, monthIndex, 1).getDay(); // Giorno della settimana del primo giorno del mese
  const daysInMonth = new Date(yearIndex, monthIndex + 1, 0).getDate(); // Numero di giorni nel mese corrente

  const prevMonthDays: Date[] = [];
  {
    // Calcolare i giorni del mese precedente per riempire la prima riga
    const daysInPrevMonth = new Date(yearIndex, monthIndex, 0).getDate();
    const prevMonthDaysToShow = startDay === 0 ? 6 : startDay - 1; // Quanti giorni del mese precedente dobbiamo mostrare

    // Aggiungere i giorni del mese precedente
    for (let i = prevMonthDaysToShow - 1; i >= 0; i--) {
      const prevMonthDate = new Date(yearIndex, monthIndex - 1, daysInPrevMonth - i);
      prevMonthDays.push(prevMonthDate);
    }
  }

  const currentMonthDays: Date[] = [];
  {
    // Aggiungere i giorni del mese corrente
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(yearIndex, monthIndex, day);
      currentMonthDays.push(currentDate);
    }
  }

  const nextMonthDays: Date[] = [];
  {
    // Calcolare i giorni del mese successivo (riempire la griglia)
    const totalCells = rows * cols; // Numero totale di celle nella griglia
    const remainingCells = totalCells - (prevMonthDays.length + currentMonthDays.length); // Celle vuote da riempire con il mese successivo

    const nextMonthStartDay = new Date(yearIndex, monthIndex + 1, 1).getDay(); // Giorno della settimana del primo giorno del mese successivo
    const nextMonthDaysToAdd = remainingCells; // Aggiungi i giorni successivi per riempire la griglia

    // Aggiungere i giorni del mese successivo per riempire la griglia
    for (let i = 1; i <= nextMonthDaysToAdd; i++) {
      const nextMonthDate = new Date(yearIndex, monthIndex + 1, i);
      nextMonthDays.push(nextMonthDate);
    }
  }

  return [prevMonthDays, currentMonthDays, nextMonthDays];
}

const filteredAttendancesForDay = (date: Date): HrAttendance[] => {
  return attendances.filter(attendance => {
    // odoo put false in not initialized fields
    if (attendance.check_out === false) return false;

    const checkInDate = new Date(attendance.check_in);

    /*
    console.log('NEW currentDayAttendances');

    console.log(
      `
        ${date.getFullYear()} === ${checkInDate.getFullYear()} &&
        ${date.getMonth()} === ${checkInDate.getMonth()} &&
        ${date.getDay()} === ${checkInDate.getDay()}
      `
    )
    */

    return  date.getFullYear() === checkInDate.getFullYear() &&
            date.getMonth() === checkInDate.getMonth() &&
            date.getDay() === checkInDate.getDay()
  })
}

const daysOfMonth = computed(() => {
  const days: CalendarPageDays = generateMonthDays(yearIndex, monthIndex);

  console.log('monthIndex: ' + monthIndex);
  console.log('days: ' + days[1].length);

  return days;
});

const selectedDayIndex = ref<number>(0);

const selectDay = (date: Date, index: number) => {
  if (isWeekend(date)) return;
  selectedDayIndex.value = index;

  emit('daySelected', date, index);

  console.log('GridCalendar | Day selected: ', selectedDayIndex.value);
}

onUpdated(() => {
  console.log('GridCalendar | Componente aggiornato');
})
</script>

<template>
  <div>
    <GridCalendarWeek v-once />
    <div class="grid-days">
      <div v-for="(date, index) in daysOfMonth[0]" class="cell">
        <GridCalendarDay
          :index
          :lang
          :date
          type="prev"
          :attendances="[]"
        />
      </div>

      <div v-for="(date, index) in daysOfMonth[1]" class="cell">
        <GridCalendarDay
          :key="index"
          :index
          :lang
          :date
          type="curr"
          :selected="index === selectedDayIndex"
          :attendances="filteredAttendancesForDay(date)"
          @mousedown="selectDay(date, index)"
        />
      </div>

      <div v-for="(date, index) in daysOfMonth[2]" class="cell">
        <GridCalendarDay
          :index
          :lang
          :date
          type="next"
          :attendances="[]"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.grid-days {
  display: grid;
  grid-template-columns: repeat(7, minmax(40px, 1fr));
  grid-template-rows: repeat(6, minmax(40px, 1fr));

  .cell {
    display: table-cell;
    text-align: center;
    aspect-ratio: 1;
  }
}
</style>
