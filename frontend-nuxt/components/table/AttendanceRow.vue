<script setup lang="ts">
import type { HrAttendance } from '~/hooks/hr';
import IconMore from '../icons/IconMore.vue';
import BadgeDynamic from '../badges/BadgeDynamic.vue';
import TimeDifference from '../items/TimeDifference.vue';

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
      <span class="employee">{{record.employee_id[1]}}</span>
    </div>

    <div v-if="show[2]" class="column">
      <span>{{ record.check_in }}</span>
    </div>

    <div v-if="show[3]" class="column">
      <span>{{record.check_in_latitude}}</span>
    </div>

    <div v-if="show[4]" class="column">
      <span>{{record.check_in_longitude}}</span>
    </div>

    <div v-if="show[5]" class="column">
      <span v-if="record.check_out">{{record.check_out}}</span>
      <BadgeDynamic v-if="!record.check_out" name="still going" :color="{r: 243, g: 239, b: 251}"/>
    </div>

    <div v-if="show[6]" class="column">
      <span>{{record.check_out_latitude}}</span>
    </div>

    <div v-if="show[7]" class="column">
      <span>{{record.check_out_longitude}}</span>
    </div>

    <div v-if="show[8]" class="column">
      <span v-if="record.check_out">{{formatTime(record.worked_hours)}}</span>
      <TimeDifference v-else :start-date="new Date(record.check_in)" :show-seconds="true"/>
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

  padding-top: 0.375rem;
  padding-left: .35rem;
  padding-right: .35rem;
  padding-bottom: 0.375rem;

  border-radius: 8px;

  input {
    margin-right: 16px;
  }

  .column {
    width: 100%;
    text-align: left;

    .employee {
      color: rgb(0, 91, 91);
      cursor: pointer;
    }

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
      background-color: rgb(226, 236, 255);
    }
  }

  // Quando è solo hover, ma non selected
  &:hover {
    background-color: rgba(0, 0, 0, 0.025);
  }
}
</style>
