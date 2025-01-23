<script setup lang="ts">
import type { HrAttendance } from '~/hooks/hr';
import type { Locale } from '../cards/CardCalendar.vue';

export type WeekdayNames = [string, string, string, string, string, string, string];
export type CalendarPageDays = [
  prevMonthDays: Date[],
  currentMonthDays: Date[],
  nextMonthDays: Date[]
];

const { attendances, lang, yearIndex, monthIndex, monthDate } = defineProps<{
  attendances: HrAttendance[],
  lang: Locale,
  yearIndex: number,
  monthIndex: number,
  monthDate: Date
}>();

//const daysOfMonth = ref<Date[]>([]);

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

  return days;
  //daysOfMonth.value = days; // Imposta i giorni
};

function getDayNameByIndex(index: number, locale = 'it-IT') {
  const date = new Date(2022, 0, 3);
  date.setDate(date.getDate() + index);
  return date.toLocaleDateString(locale, { weekday: 'short' })
}

function getWeekdayNames(locale = 'it-IT') {
  const days = [];
  for (let i = 0; i < 7; i++) {
    days.push(getDayNameByIndex(i, locale)); // Aggiungi il nome del giorno per ogni indice da 0 a 6
  }
  return days;
}

const getDayName = (date: Date, locale: Locale = 'it-IT'): string => {
  return date.toLocaleDateString(locale, { weekday: 'short' })
}

function getStartDayOfMonth(date: Date) {
  // Otteniamo il giorno della settimana del primo giorno del mese (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}

/*
function generateCalendarDays(selectedDate: Date): Date[] {
  const startDay = getStartDayOfMonth(selectedDate); // Ottieni il giorno della settimana del primo giorno
  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate(); // Numero di giorni nel mese corrente
  const calendarDays = [];

  // Calcolare i giorni del mese precedente per riempire la prima riga
  const daysInPrevMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 0).getDate(); // Numero di giorni nel mese precedente
  const prevMonthDaysToShow = startDay === 0 ? 6 : startDay - 1; // Quanti giorni del mese precedente dobbiamo mostrare

  // Aggiungere i giorni del mese precedente
  for (let i = prevMonthDaysToShow; i >= 0; i--) {
    calendarDays.push(daysInPrevMonth - i); // Calcola il giorno del mese precedente
  }

  // Aggiungi i giorni del mese corrente
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return calendarDays;
}
*/

/*
function generateCalendarDates(selectedDate: Date): Date[] {
  const startDay = getStartDayOfMonth(selectedDate); // Ottieni il giorno della settimana del primo giorno
  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate(); // Numero di giorni nel mese corrente
  const calendarDates = [];

  // Calcolare i giorni del mese precedente per riempire la prima riga
  const daysInPrevMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 0).getDate(); // Numero di giorni nel mese precedente
  const prevMonthDaysToShow = startDay === 0 ? 6 : startDay - 1; // Quanti giorni del mese precedente dobbiamo mostrare

  // Aggiungere i giorni del mese precedente
  for (let i = prevMonthDaysToShow - 1; i >= 0; i--) {
    // Calcola il giorno del mese precedente (e crea un oggetto Date)
    const prevMonthDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, daysInPrevMonth - i);
    calendarDates.push(prevMonthDate);
  }

  // Aggiungi i giorni del mese corrente
  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
    calendarDates.push(currentDate);
  }

  return calendarDates;
}
*/

const generateDays = (selectedDate: Date, rows: number = 6, cols: number = 7): CalendarPageDays => {
  const startDay = getStartDayOfMonth(selectedDate); // Giorno della settimana del primo giorno del mese
  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate(); // Numero di giorni nel mese corrente

  const prevMonthDays: Date[] = [];
  {
    // Calcolare i giorni del mese precedente per riempire la prima riga
    const daysInPrevMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 0).getDate(); 
    const prevMonthDaysToShow = startDay === 0 ? 6 : startDay - 1; // Quanti giorni del mese precedente dobbiamo mostrare

    // Aggiungere i giorni del mese precedente
    for (let i = prevMonthDaysToShow - 1; i >= 0; i--) {
      const prevMonthDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, daysInPrevMonth - i);
      prevMonthDays.push(prevMonthDate);
    }
  }

  const currentMonthDays: Date[] = [];
  {
    // Aggiungere i giorni del mese corrente
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
      currentMonthDays.push(currentDate);
    }
  }

  const nextMonthDays: Date[] = [];
  {
    // Calcolare i giorni del mese successivo (riempire la griglia)
    const totalCells = rows * cols; // Numero totale di celle nella griglia
    const remainingCells = totalCells - (prevMonthDays.length + currentMonthDays.length); // Celle vuote da riempire con il mese successivo

    const nextMonthStartDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1).getDay(); // Giorno della settimana del primo giorno del mese successivo
    const nextMonthDaysToAdd = remainingCells; // Aggiungi i giorni successivi per riempire la griglia

    // Aggiungere i giorni del mese successivo per riempire la griglia
    for (let i = 1; i <= nextMonthDaysToAdd; i++) {
      const nextMonthDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, i);
      nextMonthDays.push(nextMonthDate);
    }
  }

  return [prevMonthDays, currentMonthDays, nextMonthDays];
}

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

/*
function generateCalendarDates(selectedDate: Date, rows: number = 5, cols: number = 7): Date[] {
  const startDay = getStartDayOfMonth(selectedDate); // Giorno della settimana del primo giorno del mese
  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate(); // Numero di giorni nel mese corrente
  const calendarDates: Date[] = [];

  // Calcolare i giorni del mese precedente per riempire la prima riga
  const daysInPrevMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 0).getDate(); 
  const prevMonthDaysToShow = startDay === 0 ? 6 : startDay - 1; // Quanti giorni del mese precedente dobbiamo mostrare

  // Aggiungere i giorni del mese precedente
  for (let i = prevMonthDaysToShow - 1; i >= 0; i--) {
    const prevMonthDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, daysInPrevMonth - i);
    calendarDates.push(prevMonthDate);
  }

  // Aggiungere i giorni del mese corrente
  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
    calendarDates.push(currentDate);
  }

  // Calcolare i giorni del mese successivo (riempire la griglia)
  const totalCells = rows * cols; // Numero totale di celle nella griglia
  const remainingCells = totalCells - calendarDates.length; // Celle vuote da riempire con il mese successivo

  const nextMonthStartDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1).getDay(); // Giorno della settimana del primo giorno del mese successivo
  const nextMonthDaysToAdd = remainingCells; // Aggiungi i giorni successivi per riempire la griglia

  // Aggiungere i giorni del mese successivo per riempire la griglia
  for (let i = 1; i <= nextMonthDaysToAdd; i++) {
    const nextMonthDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, i);
    calendarDates.push(nextMonthDate);
  }

  return calendarDates;
}
*/

const daysOfMonth = computed(() => {
  const days: CalendarPageDays = generateMonthDays(yearIndex, monthIndex);

  console.log('monthIndex: ' + monthIndex);
  console.log('days: ' + days[1].length);

  return days;
});
</script>

<template>
  <div>
    <div class="grid-days-name">
      <div v-for="(dayName, index) in getWeekdayNames()" class="grid-day-element" :class="{'weekend': index === 5 || index === 6 }">
        <span>{{ dayName }}</span>
      </div>
    </div>
    <div class="grid-days">
      <div v-for="(date, index) in daysOfMonth[0]" class="cell">
        <GridCalendarDay :index :lang :date type="prev" />
      </div>

      <div v-for="(date, index) in daysOfMonth[1]" class="cell">
        <GridCalendarDay :index :lang :date type="curr" />
      </div>

      <div v-for="(date, index) in daysOfMonth[2]" class="cell">
        <GridCalendarDay :index :lang :date type="next" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.grid-days-name {
  display: grid;
  grid-template-columns: repeat(7, minmax(40px, 1fr));

  .grid-day-element {
    display: table-cell;
    text-align: center;

    > span {
      vertical-align: baseline;
      user-select: none;

      font-size: 11px;
      font-weight: 500;
      text-transform: uppercase;
    }

    &.weekend {
      > span {
        color: darkred;
      }
    }
  }
}

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