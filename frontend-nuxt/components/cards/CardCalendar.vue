<script setup lang="ts">
import type { HrAttendance } from '~/hooks/hr';
import IconChevronLeft from '../icons/chevron/IconChevronLeft.vue';
import IconChevronRight from '../icons/chevron/IconChevronRight.vue';
import CardCalendarDay from './CardCalendarDay.vue';
import CardGeneric from './CardGeneric.vue';
import CardShift from './CardShift.vue';

export type Locale = `${string}-${string}`;

// Definisci il tipo per la prop di tipo stringa (data in formato YYYY-MM-DD)
const { attendances, lang, monthDate } = defineProps<{ attendances: HrAttendance[], lang: Locale, monthDate: Date }>();

// Crea una variabile reattiva per i giorni del mese
const daysOfMonth = ref<Date[]>([]);
const selectedDayIndex = ref<number>(new Date().getDate() - 1);
//const daySelected = ref<Date>(new Date());

const selectedDay = computed(() => {
  console.log('selectedDay');
  return daysOfMonth.value[selectedDayIndex.value];
})

const filteredAttendancesForDayIndex = (dayIndex: number): HrAttendance[] => {
  return attendances.filter(attendance => {
    console.log('Selected Day Index changed:', dayIndex);

    // odoo put false in not initialized fields
    if (attendance.check_out === false) return false;

    const checkInDate = new Date(attendance.check_in);

    console.log('NEW currentDayAttendances');

    console.log(
      `
        ${selectedDay.value.getFullYear()} === ${checkInDate.getFullYear()} &&
        ${selectedDay.value.getMonth()} === ${checkInDate.getMonth()} &&
        ${selectedDay.value.getDay()} === ${checkInDate.getDay()}
      `
    )

    return  selectedDay.value.getFullYear() === checkInDate.getFullYear() &&
            selectedDay.value.getMonth() === checkInDate.getMonth() &&
            selectedDay.value.getDay() === checkInDate.getDay()
  })
}

const filterAttendancesForDayIndex = (dayIndex: number): void => {
  newCurrentDayAttendances.value = filteredAttendancesForDayIndex(dayIndex);
}

watch(selectedDayIndex, (newSelectedDayIndex) => {
  filterAttendancesForDayIndex(newSelectedDayIndex);

  console.log(attendances);
  console.log(newCurrentDayAttendances.value);
})


const monthName = computed(() => monthDate.toLocaleDateString(lang, { month: 'short' }))

// Funzione che genera tutti i giorni del mese dato un "startDate"
const generateDaysOfMonth = (date: Date) => {
  const month = date.getMonth(); // Ottieni il mese (0-11)
  const year = date.getFullYear(); // Ottieni l'anno (YYYY)

  // Primo giorno del mese
  const firstDay = new Date(year, month, 1);
  // Ultimo giorno del mese
  const lastDay = new Date(year, month + 1, 0);

  const days: Date[] = [];

  // Aggiungi tutti i giorni del mese all'array
  for (let d = firstDay; d <= lastDay; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d)); // Usa un oggetto Date
  }

  daysOfMonth.value = days; // Imposta i giorni
};

function isSameDay(date1: Date, date2: Date): boolean {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
}

function isSelected(index: number): boolean {
  return index == selectedDayIndex.value;
}

function formatTime(decimalTime: number) {
  const hours = Math.floor(decimalTime); // Prendi la parte intera (ore)
  const minutes = Math.round((decimalTime - hours) * 60); // Moltiplica la parte decimale per 60 per ottenere i minuti

  // Aggiungi uno zero davanti ai minuti se sono inferiori a 10
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function getAttendancesTotalTime(attendances: HrAttendance[]): string {
  const totalWorkedHours = attendances.reduce((total, attendance) => total + attendance.worked_hours, 0);
  return formatTime(totalWorkedHours); // Restituisci il tempo totale formattato
}

const handleDaySelected = (date: Date, index: number) => {
  selectedDayIndex.value = index;
}

// Guarda la prop "monthDate" e rigenera i giorni se cambia
watch(() => monthDate, (newDate) => {
  generateDaysOfMonth(newDate);
});

const newCurrentDayAttendances = ref<HrAttendance[]>(filteredAttendancesForDayIndex(selectedDayIndex.value));

// Chiamato quando il componente è montato
onMounted(async () => {
  console.log('CardCalendar | onMounted')

  generateDaysOfMonth(monthDate);
  filterAttendancesForDayIndex(selectedDayIndex.value);
});

// :selected="isSameDay(monthDate, day)"
</script>

<template>
  <div class="card-calendar">
    <div class="header">
      <div class="carousel-months">
        <span>{{ monthName }} 2025</span>
        <div class="flex">
          <IconChevronLeft :width="18" :height="18"/>
          <IconChevronRight :width="18" :height="18"/>
        </div>
      </div>

      <div class="carousel-days">
        <CardCalendarDay
          v-for="(day, index) in daysOfMonth"
            :key="day.toISOString()"
            :index
            :lang
            :date="day"
            :selected="isSelected(index)"
            @mousedown="() => { selectedDayIndex = index; console.log('day changed to ' + index)}"
            @day-selected="handleDaySelected"
        />
      </div>
    </div>

    <div class="stats">
      <span>stats</span>
      <div class="flex justify-left gap-2">
        <CardGeneric message="Ore totali" :value="getAttendancesTotalTime(newCurrentDayAttendances)"/>
        <CardGeneric message="Turni" :value="newCurrentDayAttendances.length"/>
      </div>
    </div>

    <div class="shifts">
      <span>shifts</span>
      <div class="list">
        <CardShift v-for="attendance in newCurrentDayAttendances" :attendance/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-calendar {
  display: flex;
  flex-direction: column;
  gap: 16px;

  .header {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .carousel-months {
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        font-size: 18px;
        font-weight: 400;
      }
    }

    .carousel-days {
      width: 300px;

      overflow-x: scroll;
      padding-bottom: 6px;

      display: flex;
      gap: 8px;

      scrollbar-color: rgb(215, 215, 215) transparent;
      scrollbar-width: thin;

      &:hover {
        scrollbar-color: rgb(215, 215, 215) rgba(0, 0, 0, 0.01);
      }
    }
  }

  .stats {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .shifts {
    display: flex;
    flex-direction: column;
    gap: 6px;

    .list {
      overflow-y: scroll;
      max-height: 300px;
      padding-right: 6px;

      display: flex;
      flex-direction: column;
      gap: 6px;

      scrollbar-color: rgb(215, 215, 215) transparent;
      scrollbar-width: thin;

      &:hover {
        scrollbar-color: rgb(215, 215, 215) rgba(0, 0, 0, 0.01);
      }
    }
  }
}
</style>
