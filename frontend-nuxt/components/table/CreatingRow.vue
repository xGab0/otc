<script setup lang="ts">
import type { HrAttendance } from '~/hooks/hr';
import IconMore from '../icons/IconMore.vue';
import BadgeDynamic from '../badges/BadgeDynamic.vue';
import RealtimeDate from '../items/RealtimeDate.vue';

interface Props {
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
const { record, show } = defineProps<Props>();

function formatTime(decimalTime: number) {
  const hours = Math.floor(decimalTime); // Prendi la parte intera (ore)
  const minutes = Math.round((decimalTime - hours) * 60); // Moltiplica la parte decimale per 60 per ottenere i minuti

  // Aggiungi uno zero davanti ai minuti se sono inferiori a 10
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

onMounted(() => {

  console.log(`
      CreatingRow | onMounted
      - record: ${record}
    `);
})
</script>

<template>
  <div class="row">
    <div v-if="show[0]" class="column">
      <span>{{record.id}}</span>
    </div>

    <div v-if="show[1]" class="column">
      <span v-if="record.employee_id" class="employee">{{record.employee_id.display_name}}</span>
      <BadgesBadgeDynamic v-else name="select" :color="{r: 255, g: 241, b: 214}"/>
    </div>

    <div v-if="show[2]" class="column">
      <span><RealtimeDate/></span>
    </div>

    <div v-if="show[3]" class="column">
      <span>{{record.check_in_latitude}}</span>
    </div>

    <div v-if="show[4]" class="column">
      <span>{{record.check_in_longitude}}</span>
    </div>

    <div v-if="show[5]" class="column">
      <BadgeDynamic name="not compilable" :color="{r: 243, g: 239, b: 251}"/>
    </div>

    <div v-if="show[6]" class="column">
      <BadgeDynamic name="not compilable" :color="{r: 243, g: 239, b: 251}"/>
    </div>

    <div v-if="show[7]" class="column">
      <BadgeDynamic name="not compilable" :color="{r: 243, g: 239, b: 251}"/>
    </div>

    <div v-if="show[8]" class="column">
      <BadgeDynamic name="not compilable" :color="{r: 243, g: 239, b: 251}"/>
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

  padding-top: 6px;
  padding-left: 30px;
  //padding-right: 12px;
  padding-bottom: 6px;

  border-radius: 8px;

  background-color: rgb(220, 233, 255);

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

  // Quando è solo hover, ma non selected
  &:hover {
    background-color: rgb(201, 221, 255);
  }
}
</style>
