<script setup lang="ts">
import type { Locale } from '../cards/CardCalendar.vue';

const getDayNameByIndex = (index: number, locale = 'it-IT') => {
  const date = new Date(2022, 0, 3);
  date.setDate(date.getDate() + index);
  return date.toLocaleDateString(locale, { weekday: 'short' })
}

const getWeekdayNames = (locale: Locale = 'it-IT') => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    days.push(getDayNameByIndex(i, locale)); // Aggiungi il nome del giorno per ogni indice da 0 a 6
  }
  return days;
}
</script>

<template>
  <div class="grid-weeks">
    <div v-for="(dayName, index) in getWeekdayNames()" class="grid-day-element" :class="{'weekend': index === 5 || index === 6 }">
      <span>{{ dayName }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.grid-weeks {
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
</style>
