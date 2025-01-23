<script setup lang="ts">
import type { Locale } from '../cards/CardCalendar.vue';

interface Props {
  index: number,
  lang: Locale,
  date: Date,
  type: 'prev' | 'curr' | 'next'
  selected?: boolean
}

const {index, lang = "it-IT", date, selected = false } = defineProps<Props>();
const isWeekend = computed(() => date.getDay() === 0 || date.getDay() === 6) // 0 = domenica, 6 = sabato
</script>

<template>
  <div class="card" :class="{
    'prev': type === 'prev',
    'curr': type === 'curr',
    'next': type === 'next',
    'weekend': isWeekend
  }">
    <span>{{ date.getDate() }}</span>
  </div>
</template>

<style lang="scss" scoped>
.card {
  width: 100%;
  height: 100%;

  > span {
    vertical-align: middle;
    user-select: none;
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

  &:hover {
    border-radius: 6px;
    outline: solid 1px rgb(199, 199, 199);

    cursor: pointer;
  }
}
</style>