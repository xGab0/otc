<script setup lang="ts">
interface Props {
  date: Date,
  showYear?: boolean,
  showMonth?: boolean,
  showDay?: boolean
}

const {
  date,
  showYear = true,
  showMonth = true,
  showDay = true
} = defineProps<Props>();

function formatDateToText(date: Date): [year: string, month: string, day: string] {
  const formatter = new Intl.DateTimeFormat('it-IT', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const formattedDate = formatter.format(date);

  const [day, month, year] = formattedDate.split(' ');
  
  return [year, month, day];
}

const formattedDate = ref<[year: string, month: string, day: string]>(formatDateToText(date));
</script>

<template>
  <span v-if="showYear" class="year">{{ formattedDate[0] }}</span>
  <span v-if="showMonth" class="month">{{ formattedDate[1] }}</span>
  <span v-if="showDay" class="day">{{ formattedDate[2] }}</span>
</template>

<style lang="scss" scoped>
span {
  color: rgb(147, 116, 13);

  &.year {
    font-size: 12px;
    font-weight: 500;
    color: rgb(80, 80, 80);
  }

  &.month {
    font-size: 12px;
    font-weight: 500;
    text-transform: capitalize;
    color: rgb(80, 80, 80);
  }

  &.day {
    font-size: 12px;
    font-weight: 500;
    color: rgb(80, 80, 80);
  }
}

/*
span {
  font-size: 12px;
  font-weight: 500;
  color: rgb(100, 77, 0);

  &.year {
  }

  &.month {
    text-transform: capitalize;
  }

  &.day {

  }
}
*/
</style>