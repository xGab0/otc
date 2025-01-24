<script setup lang="ts">
import type { HrAttendance } from '~/hooks/hr';
import type { Locale } from '../cards/CardCalendar.vue';

interface Props {
  index: number,
  lang: Locale,
  date: Date,
  type: 'prev' | 'curr' | 'next'
  selected?: boolean,
  attendances: HrAttendance[]
}

const { index, lang = "it-IT", date, selected = false, attendances } = defineProps<Props>();
const isWeekend = computed(() => date.getDay() === 0 || date.getDay() === 6) // 0 = domenica, 6 = sabato

onMounted(() => {
  console.log('GridCalendarDay | Mounted [' + index + ']');
  console.log('- attendances: ', attendances);
})

onUpdated(() => {
  console.log('GridCalendarDay | Componente aggiornato');
})
</script>

<template>
  <div class="card" :class="{
    'prev': type === 'prev',
    'curr': type === 'curr',
    'next': type === 'next',
    'selected': selected,
    'weekend': isWeekend
  }">
    <span>{{ date.getDate() }}</span>
    <!--div class="elements">
      <div v-for="(item, index) in attendances" class="element" />
    </div-->
  </div>
</template>

<style lang="scss" scoped>
.card {
  width: 100%;
  height: 100%;

  > span {
    vertical-align: middle;
    user-select: none;
    line-height: normal;
  }

  &.prev {
    > span {
      opacity: 0.5;
    }

    &.weekend {
      > span {
        color: darkred;
      }
    }
  }

  &.curr {
    > span {
      //color: gray;
    }

    &.weekend {
      > span {
        color: darkred;
      }
    }
  }

  &.next {
    > span {
      opacity: 0.5;
    }

    &.weekend {
      > span {
        color: darkred;
      }
    }
  }

  .elements {
    width: 100%;
    padding-left: 3px;
    padding-right: 3px;

    display: grid;
    grid-template-columns: auto;
    grid-template-rows: repeat(2, auto);
    row-gap: 2px;

    .element {
      width: 100%;
      height: 3px;

      border-radius: 2px;
      background-color: gray;

      &:nth-child(1) {
        background-color: #538c9d;
      }

      &:nth-child(2) {
        background-color: #6c9dac;
      }

      &:nth-child(3) {
        background-color: #82afbd;
      }

      &:nth-child(4) {
        background-color: #a7cbd6;
      }
    }
  }

  .selected {
    border-radius: 6px;
    background-color: #538c9d;

    > span {
      color: white;
    }

    .element {
      width: 100%;
      height: 3px;

      border-radius: 2px;
      background-color: gray;

      &:nth-child(1) {
        background-color: white;
      }

      &:nth-child(2) {
        background-color: white;
      }

      &:nth-child(3) {
        background-color: white;
      }

      &:nth-child(4) {
        background-color: white;
      }
    }

    &:hover {
      //background-color: white;
    }
  }

  &:hover:not(.prev):not(.next) {
    border-radius: 6px;
    outline: solid 1px rgb(199, 199, 199);

    cursor: pointer;
  }
}
</style>
