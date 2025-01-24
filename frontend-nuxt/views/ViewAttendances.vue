<script setup lang="ts">
import CardAttendance from '~/components/cards/CardAttendance.vue';
import CardGeneric from '~/components/cards/CardGeneric.vue';
import CardShift from '~/components/cards/CardShift.vue';
import WidgetCalendar from '~/components/widget/WidgetCalendar.vue';
import type { HrAttendance } from '~/hooks/hr';
import type { LogicFilter, ModelQueryBuilder } from '~/hooks/odoo/wrapper';

const authStore = useAuthStore();
const userDataStore = useUserDataStore();

const queryBuilder = ref<ModelQueryBuilder<HrAttendance>>();
const attendances = ref<HrAttendance[]>([]);
const currentAttendance = computed(() => attendances.value.find(attendance => attendance.check_out === false))

const selectedDay = ref<Date>(new Date());
const selectedDayAttendances = computed(() => attendances.value.filter(attendance => {
  // odoo put false in not initialized fields
  if (attendance.check_out === false) return false;

  const checkInDate = new Date(attendance.check_in);

  console.log(`selectedDay `, selectedDay.value, ` is equals to `, checkInDate);

  console.log(
      `
        year  ${selectedDay.value.getFullYear()} === ${checkInDate.getFullYear()}
        month ${selectedDay.value.getMonth()}    === ${checkInDate.getMonth()}
        day   ${selectedDay.value.getDate()}    === ${checkInDate.getDate()}
      `
    )


  return selectedDay.value.getFullYear() === checkInDate.getFullYear() &&
         selectedDay.value.getMonth() === checkInDate.getMonth() &&
         selectedDay.value.getDate() === checkInDate.getDate()
}))

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

onMounted(async () => {
  const filters: LogicFilter[] = [['employee_id', '=', userDataStore.userData?.employee_id[0]]];

  queryBuilder.value = authStore.odooUser!.modelQueryBuilder<HrAttendance>('hr.attendance');
  attendances.value = await queryBuilder.value.searchReadRecords(filters);

  console.log('CardCalendar | attendances');
  console.log('employee_id = ' + userDataStore.userData?.employee_id[0]);
  console.log(attendances.value);
})
</script>

<template>
  <div class="body">
    <CardAttendance v-if="currentAttendance"/>

    <div class="content">
      <WidgetCalendar
        :attendances lang="it-IT"
        @day-selected="(date, index) => {
          selectedDay = date;
          console.log(date);
        }"
      />
    </div>
  </div>

  <div class="stats">
    <span>stats</span>
    <div class="flex justify-left gap-2">
      <CardGeneric message="Ore totali" :value="getAttendancesTotalTime(selectedDayAttendances)"/>
      <CardGeneric message="Turni" :value="selectedDayAttendances.length"/>
    </div>
  </div>

  <div class="shifts">
    <span>shifts</span>
    <div class="list">
      <CardShift v-for="attendance in selectedDayAttendances" :attendance/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .body {
    display: flex;
    flex-direction: column;
    gap: 18px;
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
</style>