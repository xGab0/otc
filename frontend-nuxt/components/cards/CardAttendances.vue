<script setup lang="ts">
import CardAttendance from './CardAttendance.vue';
import CardCalendar from './CardCalendar.vue';
import type { LogicFilter, ModelQueryBuilder } from '~/hooks/odoo/wrapper';
import type { HrAttendance } from '~/hooks/hr';

const authStore = useAuthStore();
const userDataStore = useUserDataStore();

const queryBuilder = ref<ModelQueryBuilder<HrAttendance>>();
const attendances = ref<HrAttendance[]>([]);
const currentAttendance = computed(() => attendances.value.find(attendance => attendance.check_out === false))

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
  <div class="card">
    <span class="title">Attendances</span>

    <div class="body">
      <CardAttendance v-if="currentAttendance"/>

      <div class="content">
        <WidgetCalendar :attendances lang="it-IT" />

        <!--GridCalendar :attendances lang="it-IT" :month-date="new Date()"/ -->
        <!--CardCalendar :attendances lang="it-IT" :month-date="new Date()"/-->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  padding: 12px 24px 0 24px;

  display: flex;
  flex-direction: column;
  gap: 12px;

  border-radius: 24px;
  background-color: white;

  .title {
    font-size: 26px;
    font-weight: 400;
  }

  .body {
    display: flex;
    flex-direction: column;
    gap: 18px;

    .content {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
  }
}

.separator {
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.102);
}

svg {
  height: 22px
}
</style>
