<script setup lang="ts">
import IconChevronLeft from '../icons/chevron/IconChevronLeft.vue';
import IconChevronRight from '../icons/chevron/IconChevronRight.vue';
import IconChevron from '../icons/IconChevron.vue';
import CardCalendarDay from './CardCalendarDay.vue';
import CardShift from './CardShift.vue';

// Definisci il tipo per la prop di tipo stringa (data in formato YYYY-MM-DD)
const { startDate } = defineProps<{ startDate: Date }>();

// Crea una variabile reattiva per i giorni del mese
const daysOfMonth = ref<Date[]>([]);

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

// Guarda la prop "startDate" e rigenera i giorni se cambia
watch(() => startDate, (newDate) => {
  generateDaysOfMonth(newDate);
});

// Chiamato quando il componente è montato
onMounted(() => {
  generateDaysOfMonth(startDate);
});
</script>

<template>
  <div class="card-calendar">
    <div class="header">
      <span>Jenuary 2025</span>
      <div class="flex">
        <IconChevronLeft :width="18" :height="18"/>
        <IconChevronRight :width="18" :height="18"/>
      </div>
    </div>

    <div class="carousel">
      <CardCalendarDay
        v-for="day in daysOfMonth"
          :key="day.toISOString()"
          :date="day"
          :selected="isSameDay(startDate, day)"
      />
    </div>

    <div class="shifts">
      <span>shifts</span>
      <div class="list">
        <CardShift v-for=" in 10"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-calendar {
  display: flex;
  flex-direction: column;
  gap: 6px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      font-size: 18px;
      font-weight: 400;
    }
  }

  .carousel {
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