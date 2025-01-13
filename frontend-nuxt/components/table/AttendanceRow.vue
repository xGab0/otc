<script setup lang="ts">
import type { HrAttendance } from '~/hooks/hr';
import IconMore from '../icons/IconMore.vue';

interface Props {
  index: number,
  selected: boolean,
  record: HrAttendance,
  show: [
    ids: boolean,
    employeers: boolean,
    checkIns: boolean,
    checkInsLat: boolean,
    checkInsLon: boolean,
    checkOuts: boolean,
    checkOutsLat: boolean,
    checkOutsLon: boolean,
    workedHours: boolean
  ]
}
const { selected, record, show } = defineProps<Props>();

const emit = defineEmits<{
  (event: 'toggleSelected', index: number, selected: boolean): void
}>()

function formatTime(decimalTime: number) {
  const hours = Math.floor(decimalTime); // Prendi la parte intera (ore)
  const minutes = Math.round((decimalTime - hours) * 60); // Moltiplica la parte decimale per 60 per ottenere i minuti

  // Aggiungi uno zero davanti ai minuti se sono inferiori a 10
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}
</script>

<template>
  <div class="row" :class="selected ? 'selected' : ''">
    <input type="checkbox" :checked="selected" @input="$emit('toggleSelected', index, !selected)"/>

    <div v-if="show[0]" class="column">
      <span>{{record.id}}</span>
    </div>

    <div v-if="show[1]" class="column">
      <span>{{record.employee_id[1]}}</span>
    </div>

    <div v-if="show[2]" class="column">
      <span>{{record.check_in}}</span>
    </div>

    <div v-if="show[3]" class="column">
      <span>{{record.check_in_latitude}}</span>
    </div>

    <div v-if="show[4]" class="column">
      <span>{{record.check_in_longitude}}</span>
    </div>

    <div v-if="show[5]" class="column">
      <span>{{record.check_out}}</span>
    </div>

    <div v-if="show[6]" class="column">
      <span>{{record.check_out_latitude}}</span>
    </div>

    <div v-if="show[7]" class="column">
      <span>{{record.check_out_longitude}}</span>
    </div>

    <div v-if="show[8]" class="column">
      <span>{{formatTime(record.worked_hours)}}</span>
    </div>

    <!--div class="more">
      <IconMore/>
    </div-->
  </div>
</template>

<style lang="scss" scoped>
.row {
  width: 100%;
  display: flex;
  align-items: center;

  padding-top: 4px;
  //padding-left: 12px;
  //padding-right: 12px;
  padding-bottom: 4px;

  border-radius: 8px;

  input {
    margin-right: 16px;
  }

  .column {
    width: 100%;
    text-align: left;

    span {
      font-size: 14px;
      text-wrap: wrap;
    }
  }

  .more {
    width: fit-content;
    display: flex;
    align-items: center;
  }

  // Quando è selected
  &.selected {
    background-color: rgba(240, 240, 250, 1);

    // Quando è hover e selected
    &:hover {
      background-color: darkred;
    }
  }

  // Quando è solo hover, ma non selected
  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
  }
}
</style>
